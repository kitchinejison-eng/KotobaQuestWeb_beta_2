// node tests/verify-beta7-all-jpg.cjs
// Validate every image-bearing quiz in the requested two training categories.
// Reading-aloud and story recall modes are intentionally out of scope.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const web = fs.existsSync(path.join(root, 'app.js')) ? root : path.join(root, 'app/src/main/assets/www');
const read = f => fs.readFileSync(path.join(web, f), 'utf8');
const aphasia = read('aphasia-modes.js');
const v47 = read('v47-improvements.js');
const v57 = read('v57-task-rebuild.js');
const html = read('index.html');
const worker = read('service-worker.js');

function arrayFrom(source, marker) {
  const p = source.indexOf(marker);
  assert(p >= 0, 'Could not find ' + marker);
  const start = source.indexOf('[', p);
  const end = source.indexOf('\n];', start);
  assert(end > start, marker + ' is missing array terminator');
  return JSON.parse(source.slice(start, end + 2));
}
function objectFrom(source, marker) {
  const p = source.indexOf(marker);
  assert(p >= 0, 'Could not find ' + marker);
  const start = source.indexOf('{', p);
  const end = source.indexOf('\n};', start);
  assert(end > start, marker + ' is missing object terminator');
  return vm.runInNewContext('(' + source.slice(start, end + 2) + ')');
}
function assertJpg(asset, description) {
  assert(asset && asset.endsWith('.jpg'), description + ' should be JPG: ' + asset);
  const file = path.join(web, asset);
  assert(fs.existsSync(file), description + ' missing: ' + asset);
  const header = fs.readFileSync(file).subarray(0, 3);
  assert(header[0] === 0xff && header[1] === 0xd8 && header[2] === 0xff,
    description + ' is not actually JPEG: ' + asset);
  assert(fs.statSync(file).size > 1000, description + ' seems empty: ' + asset);
}

const naming = arrayFrom(aphasia, 'QUESTIONS.naming = [');
const cue = arrayFrom(aphasia, 'QUESTIONS.cue = [');
assert.equal(naming.length, 28);
assert.equal(cue.length, 24);
assert(naming.every(q => q.image && !q.image.endsWith('.svg')));
for (const q of naming) assertJpg(q.image, 'Naming ' + q.answer);

const cueWithoutNaming = {
  'くつした': 'images/quiz-jpg/cue/kutsushita.jpg',
  'かぎ': 'images/quiz-jpg/cue/kagi.jpg',
  'ふうとう': 'images/quiz-jpg/cue/fuutou.jpg',
  'まくら': 'images/quiz-jpg/cue/makura.jpg'
};
const namingWords = new Set(naming.map(q => q.answer));
for (const q of cue) {
  if (namingWords.has(q.answer)) continue;
  assert(cueWithoutNaming[q.answer], 'Cue image missing for ' + q.answer);
  assertJpg(cueWithoutNaming[q.answer], 'Cue ' + q.answer);
}
assert(aphasia.includes('extraCueJpg'), 'Cue-only JPG assignment code missing');
assert(!aphasia.slice(aphasia.indexOf('QUESTIONS.naming = ['), aphasia.indexOf('QUESTIONS.cue = [')).includes('.svg'),
  'Aphasia naming still contains SVG');

const matchFiles = objectFrom(v47, 'var MATCH_JPG_FILES =');
assert.equal(Object.keys(matchFiles).length, 31);
for (const [word, filename] of Object.entries(matchFiles)) assertJpg('images/quiz-jpg/matching/' + filename, 'Matching ' + word);
assert(!v47.slice(0, v47.indexOf('var TF_ITEMS')).includes('.svg'), 'Matching data still contains SVG');
assert(v47.includes('Object.keys(MATCH_JPG_FILES).map'), 'Matching must build its cards directly from JPG map');

const pictureFiles = objectFrom(v57, 'var pictureJpg=');
for (const [word, filename] of Object.entries(pictureFiles)) assertJpg('images/quiz-jpg/' + filename, 'Listening/picture-map ' + word);
assert(!v57.includes('.svg'), 'Listening/selection image map still contains SVG');

const listenFiles = objectFrom(v57, 'var LISTEN_JPG_FILES=');
assert.equal(Object.keys(listenFiles).length, 10);
for (const [word, filename] of Object.entries(listenFiles)) assertJpg('images/quiz-jpg/listen/' + filename, 'Listening ' + word);
const instructionFiles = objectFrom(v57, 'var actionJpg=');
assert.equal(Object.keys(instructionFiles).length, 10);
for (const [action, filename] of Object.entries(instructionFiles)) assertJpg('images/quiz-jpg/instruction/' + filename, 'Instruction ' + action);
for (const filename of ['mesi.jpg','furo.jpg','1.2.3.jpg','morning.jpg']) assertJpg('images/quiz-jpg/fill/' + filename, 'Sentence completion');

assert(html.includes('aphasia-modes.js?v=beta85-scene-quiz'));
assert(html.includes('v47-improvements.js?v=beta85-scene-quiz'));
assert(html.includes('v57-task-rebuild.js?v=beta8-fixes'));
assert(worker.includes('kotoba-quest-beta85-scene-quiz'));
assert(worker.includes("cue: 'kutsushita kagi fuutou makura'"));
assert(worker.includes("naming: 'apple banana orenge inu neko cofe hasami'"));
new vm.Script(aphasia);
new vm.Script(v47);
new vm.Script(v57);

console.log('PASS: 28 naming, 24 cue, 31 matching, 10 listening, 10 instruction, 4 fill images are all real JPG files.');
