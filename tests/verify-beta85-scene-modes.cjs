// node tests/verify-beta85-scene-modes.cjs
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');

const root=path.resolve(__dirname,'..');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const source=read('v47-improvements.js');
const modes=read('aphasia-modes.js');
const app=read('app.js');
const html=read('index.html');
const cache=read('service-worker.js');

const gestureSource=source.slice(source.indexOf('var GESTURE_ACTION_ITEMS = ['),source.indexOf('// 実生活ロールプレイ：模範文'));
const gestureEnv={QUESTIONS:{},optsV:(answer,other)=>[answer,...other]};
vm.runInNewContext(gestureSource,gestureEnv);
const gestures=gestureEnv.QUESTIONS.gesture;
assert.equal(gestures.length,15,'Expected 15 reviewed action photographs');
assert.equal(new Set(gestures.map(q=>q.image)).size,gestures.length,'Duplicate gesture photos');
assert.equal(new Set(gestures.map(q=>q.answer)).size,gestures.length,'Duplicate gesture actions');
for(const q of gestures){
 const file=path.join(root,q.image);
 assert(fs.existsSync(file),`Missing JPG for action: ${file}`);
 const bytes=fs.readFileSync(file);
 assert(bytes[0]===255&&bytes[1]===216,`Not a JPG image: ${file}`);
 assert.equal(q.choices.length,4,'Action should have exactly 4 choices');
 assert.equal(new Set(q.choices).size,4,'Duplicate choice in action quiz');
 assert(q.choices.includes(q.answer),'Correct action absent');
 assert.equal(q.hint,undefined,'Gesture hints must be removed');
}

const roleplaySource=source.slice(source.indexOf('var ROLEPLAY_ITEMS = ['),source.indexOf('// ---------------------------------------\n// UI helpers'));
const roleplayEnv={QUESTIONS:{},optsV:(answer,other)=>[answer,...other],indexedSceneJpg:(prefix,i)=>`images/scenes-jpg/${prefix}-${String(i).padStart(2,'0')}.jpg`};
vm.runInNewContext(roleplaySource,roleplayEnv);
const roleplay=roleplayEnv.QUESTIONS.roleplay;
assert.equal(roleplay.length,30);
for(const q of roleplay){
 assert(fs.existsSync(path.join(root,q.image)),`Missing daily-life JPG: ${q.image}`);
 assert.equal(q.choices.length,4,'Situation cards should be 4-choice');
 assert.equal(new Set(q.choices).size,4,'Duplicate choice in situation quiz');
 assert(q.choices.includes(q.answer),'Correct card missing');
}

const gestureUI=modes.slice(modes.indexOf('function renderGesture(q)'),modes.indexOf('function renderRecall(q, mode)'));
const roleplayUI=modes.slice(modes.indexOf('function renderRoleplay(q)'),modes.indexOf('function renderCustomQuestion()'));
assert(gestureUI.includes("sceneChoiceButtons(q,wrap,status,'gesture')"),'Gesture is not image/4-choice');
assert(!/markClearPracticeDone|addOptionalTextEntry|hintButton|まねる|'できた'/.test(gestureUI),'Old gesture practice controls still render');
assert(roleplayUI.includes('startClearModeMic(status,mic'),'Missing situation microphone');
assert(roleplayUI.includes("sceneChoiceButtons(q,wrap,status,'roleplay')"),'Missing situation word cards');
assert(!/markClearPracticeDone|addOptionalTextEntry|文字で答える|できた/.test(roleplayUI),'Old self-report or text input still renders');
assert(source.includes("if(selectedActivity==='gesture'||selectedActivity==='roleplay'){oldSpeakQuestionV47();return;}"),'Stale imitation TTS is overriding the exercise');
assert(app.includes('["naming", "cue", "gesture", "roleplay"].indexOf(selectedActivity)'),'Question attempts not included in training records');
for(const value of ['style.css','app.js','aphasia-modes.js','v47-improvements.js']){
 assert(html.includes(`${value}?v=beta85-scene-quiz`),`Stale browser asset: ${value}`);
 assert(cache.includes(`./${value}?v=beta85-scene-quiz`),`Stale offline asset: ${value}`);
}

const scoreSource=modes.slice(modes.indexOf('function newRecallStats()'),modes.indexOf('function markPracticeDone('));
const elements={score:{textContent:''},feedback:{textContent:'',className:''},nextBtn:{classList:{remove(){}}},game:{classList:{contains:()=>true}}};
const state={window:{},current:0,questions:[{answer:'手を上げる'}],selectedActivity:'gesture',score:0,answered:false,
 recallAttempts:0,recallHintsUsed:0,recallAdvanceTimer:null,activityRunToken:1,
 '$':id=>elements[id],document:{querySelectorAll:()=>[]},
 playCorrectSound(){},playWrongSound(){},announceCorrect(){},disableModeInputs(){},
 setTimeout(fn){state.advance=fn;return 1;},clearTimeout(){},nextQuestion(){state.current++;}
};
vm.createContext(state);vm.runInContext(scoreSource,state);
state.window.kotobaRecallRunStats=state.newRecallStats();
state.markRecallWrong({textContent:''},'誤った動き');
state.markCorrect();
assert.equal(state.score,0,'Retry correctness must not inflate the initial-accuracy score');
assert.equal(state.window.kotobaRecallRunStats.afterRetryCorrect,1);
assert.equal(state.window.kotobaRecallRunStats.totalAttempts,2);
state.advance();assert.equal(state.current,1);
state.selectedActivity='roleplay';state.current=0;state.score=0;state.answered=false;state.recallAttempts=0;
state.window.kotobaRecallRunStats=state.newRecallStats();
state.questions=[{answer:'水をください'}];
state.markCorrect();
assert.equal(state.score,1,'First-try situation answer should score once');
assert.equal(state.window.kotobaRecallRunStats.firstTryCorrect,1);
state.current=0;state.answered=false;state.recallAttempts=0;
for(let i=0;i<3;i++)state.markRecallWrong({textContent:''},'別の言葉');
assert.equal(state.window.kotobaRecallRunStats.incorrect,1,'3 misses should count as one incorrect question');
console.log('PASS: beta8.5 unique JPG action quizzes, situation card/mic UI, no self-done/text/hints, scoring and cache.');
