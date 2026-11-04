// node tests/verify-beta83-handwriting.cjs
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const logic=read('v47-improvements.js');
const css=read('v47-improvements.css');
const bridge=read('android-bridge-android.js');
const source=logic.slice(logic.indexOf('var COPY_ITEMS = ['),logic.indexOf('QUESTIONS.copy ='));
const env={};vm.createContext(env);vm.runInContext(source,env);
assert(env.COPY_ITEMS.length>=50,'Variety of copy questions is required');
assert(env.COPY_ITEMS.every(t=>Array.from(t).length>=1&&Array.from(t).length<=4),'Each prompt must be at most 4 characters');
assert(env.COPY_ITEMS.some(t=>/[一-龯]/.test(t)),'Include Kanji in copy questions');
assert(env.COPY_ITEMS.some(t=>/[ぁ-ゔ]/.test(t)),'Include Hiragana');
assert(env.COPY_ITEMS.some(t=>/[ァ-ヶ]/.test(t)),'Include Katakana');
assert.equal(new Set(env.COPY_ITEMS).size,env.COPY_ITEMS.length,'No duplicate copy questions');
assert(logic.includes("var canvas=el('canvas','v47-copy-pad')"),'One drawing canvas per character');
assert(logic.includes('target.forEach(function(char,i)'));
assert(logic.includes('pendingTimer=setTimeout(function(){pendingTimer=null;recognizeAnswer();},3100)'), 'Auto recognition after writing pause');
assert(logic.includes('stats.results.push({target:target.join'), 'Persist actual recognition');
assert(logic.includes('clearInk(') && logic.includes('1画戻す'));
assert(css.includes('grid-template-columns:repeat(2,minmax(0,1fr))'),'Mobile 2-column writing layout');
assert(css.includes('touch-action:none'),'Prevent unintended scrolling during writing');
assert(bridge.includes('window.KotobaHandwritingRecognize'));
assert(bridge.includes('pendingInkRequests'));

// Verify first-attempt scoring and after-retry accounting against the actual finish() function.
const statsSrc=logic.slice(logic.indexOf('function newCopyRunStats()'),logic.indexOf('var copyCleanupV83'));
const finishSrc=logic.slice(logic.indexOf(' function finish(matched,predicted,recognitionMethod){'),logic.indexOf(' async function recognizeAnswer(){'));
function runCase(attempts, matched){
 const s={answered:false,attempts,score:0,nextTimer:null,target:['学','校'],
  q:{prompt:'学校'},status:{textContent:''},window:{},
  active:()=>true,clearTimers:()=>{},updateScoreV47:()=>{},
  $v:()=>({textContent:'',className:''}),setTimeout:()=>12345,
  nextQuestion:()=>{},playCorrectSound:()=>{},playWrongSound:()=>{}};
 vm.createContext(s);vm.runInContext(statsSrc+finishSrc,s);
 s.window.kotobaCopyRunStats=s.newCopyRunStats();
 s.finish(matched,['学',matched?'校':'雨']);
 return s;
}
let s=runCase(1,true);assert.equal(s.score,1);assert.equal(s.window.kotobaCopyRunStats.firstTryCorrect,1);assert.equal(s.window.kotobaCopyRunStats.matched,1);
s=runCase(2,true);assert.equal(s.score,0);assert.equal(s.window.kotobaCopyRunStats.afterRetryCorrect,1);assert.equal(s.window.kotobaCopyRunStats.matched,1);
s=runCase(3,false);assert.equal(s.score,0);assert.equal(s.window.kotobaCopyRunStats.incorrect,1);assert.equal(s.window.kotobaCopyRunStats.matched,0);
assert.equal(s.window.kotobaCopyRunStats.results[0].predicted,'学雨');
console.log('PASS: beta8.3 1–4 character Japanese copy prompts, responsive stroke capture and exact-score accounting.');
