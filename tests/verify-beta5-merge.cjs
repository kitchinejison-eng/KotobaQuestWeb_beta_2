// node tests/verify-beta5-merge.cjs
// A focused regression test for the restored random articulation quiz and JPG cards.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const web = fs.existsSync(path.join(root, 'app.js')) ? root : path.join(root, 'app/src/main/assets/www');
const read = file => fs.readFileSync(path.join(web, file), 'utf8');
const app = read('app.js');
const html = read('index.html');
const v47 = read('v47-improvements.js');
const v57 = read('v57-task-rebuild.js');
const worker = read('service-worker.js');

const start = app.indexOf('var ARTICULATION_GROUPS = [');
const stop = app.indexOf('var FOUNDATION_VOICE_ACTIVITIES =', start);
assert(start >= 0 && stop > start, 'Articulation random quiz source was lost');

const timers = new Map();
let timerSequence = 0;
let nextCalls = 0;
const status = { textContent: '' };
const game = { classList: { contains: name => name === 'active' } };
const context = {
  selectedActivity: 'articulationNavigator',
  answered: true,
  current: 0,
  activityRunToken: 4,
  questions: new Array(5),
  $: id => ({ artnavAutoNextNotice: status, game }[id]),
  nextQuestion: () => { nextCalls++; },
  setTimeout: (fn, delay) => { timers.set(++timerSequence, { fn, delay }); return timerSequence; },
  clearTimeout: id => timers.delete(id)
};
vm.createContext(context);
vm.runInContext(app.slice(start, stop), context);

const seen = new Set();
for (let i = 0; i < 150; i++) {
  const quiz = Array.from(context.buildRandomArticulationQuiz());
  assert.equal(quiz.length, 5, 'Exactly five random questions are required');
  assert.equal(new Set(quiz.map(x => x.navGroup)).size, 5, 'The groups must be distinct');
  for (const question of quiz) {
    assert(question.voiceText === question.answer, 'Microphone target must match the prompt');
    assert(question.navGuide && question.navPlace && question.navSteps.length > 0, 'Side diagram and explanation are missing');
  }
  seen.add(quiz.map(x => x.navGroup).join(','));
}
assert(seen.size > 1, 'Quiz order must vary across sessions');
assert(app.includes('buildRandomArticulationQuiz()'), 'The app must use random articulation questions');
assert(/questions = activityId === "articulationNavigator" \? bank :/.test(app), 'Five articulation questions must ignore the general count setting');
assert(app.includes('renderArticulationNavigator(q)'), 'The updated question UI must be reachable');
assert(app.includes('artnav-v4-current'), 'The non-selectable current articulation section must be present');
assert(app.includes('scheduleArticulationAutoNext();'), 'Recognition completion must schedule auto-advance');

context.scheduleArticulationAutoNext();
assert.equal(timers.size, 1);
let pending = Array.from(timers.values())[0];
assert.equal(pending.delay, 1350);
pending.fn();
assert.equal(nextCalls, 1, 'A final microphone answer should advance exactly one question');
context.scheduleArticulationAutoNext();
pending = Array.from(timers.values()).at(-1);
context.activityRunToken++;
pending.fn();
assert.equal(nextCalls, 1, 'A previous session must not advance the new session');
context.cancelArticulationAutoNext();
timers.clear();
context.answered = false;
context.scheduleArticulationAutoNext();
assert.equal(timers.size, 0, 'Unanswered question must never schedule auto-advance');

const expected = { matching:31, listen:10, naming:7, cue:4, fill:4, instruction:10 };
for (const [section, count] of Object.entries(expected)) {
  const folder = path.join(web, 'images/quiz-jpg', section);
  const images = fs.readdirSync(folder).filter(f => f.endsWith('.jpg'));
  assert.equal(images.length, count, `${section} image total`);
  images.forEach(name => assert(fs.statSync(path.join(folder, name)).size > 1000));
}
const hashes = fs.readdirSync(path.join(web, 'images/quiz-jpg/matching')).map(name =>
  crypto.createHash('sha256').update(fs.readFileSync(path.join(web, 'images/quiz-jpg/matching', name))).digest('hex'));
assert.equal(new Set(hashes).size, hashes.length, 'Matching answer pictures must not be identical');
assert.equal((app.match(/images\/quiz-jpg\/naming\//g) || []).length, 6);
assert.equal((app.match(/images\/quiz-jpg\/fill\//g) || []).length, 4);
assert(v47.includes('MATCH_JPG_FILES') && v57.includes('LISTEN_JPG_FILES') && v57.includes('actionJpg'));
assert(html.includes('articulation-random-beta4.css?v=4'), 'The original articulation CSS is missing');
assert(html.includes('v57-task-rebuild.js?v=beta8-fixes'), 'The JPG-only card renderer is not loaded');
assert(worker.includes('articulation-random-beta4.css?v=4') && worker.includes('...QUIZ_JPG_ASSETS'));

console.log('PASS: Random 5, voice auto-advance guards, side diagram, and 66 JPG assets.');
