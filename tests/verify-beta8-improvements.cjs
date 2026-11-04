// node tests/verify-beta8-improvements.cjs
// Functional browser checks: 50 independent scene photos, custom-mode routing,
// three-try marking, first-answer accuracy and explicit speech controls.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const vm=require('node:vm');
let chromium=null;
try{chromium=require('playwright').chromium;}catch(e){/* Browsers are optional for portable static checks. */}
const root=path.resolve(__dirname,'..');
const jpg=path.join(root,'images','scenes-jpg');
const sceneFiles=[
 ...Array.from({length:16},(_,i)=>`gesture-${String(i).padStart(2,'0')}.jpg`),
 ...Array.from({length:4},(_,i)=>`gesture-b-${String(i).padStart(2,'0')}.jpg`),
 ...Array.from({length:16},(_,i)=>`roleplay-a-${String(i).padStart(2,'0')}.jpg`),
 ...Array.from({length:14},(_,i)=>`roleplay-b-${String(i).padStart(2,'0')}.jpg`)
];
assert.equal(sceneFiles.length,50);
const hashes=[];
for(const f of sceneFiles){
 const bytes=fs.readFileSync(path.join(jpg,f));
 assert.equal(bytes[0],0xff,`Not JPG: ${f}`);assert.equal(bytes[1],0xd8);
 hashes.push(crypto.createHash('sha256').update(bytes).digest('hex'));
}
assert.equal(new Set(hashes).size,50,'A daily-life scene photo is duplicated');
const dog=fs.readFileSync(path.join(root,'images/quiz-jpg/naming/inu.jpg'));
const hand=fs.readFileSync(path.join(root,'images/tearai.jpg'));
assert(!dog.equals(hand),'Dog and handwash pictures must be distinct');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const aphasia=read('aphasia-modes.js');
const v47=read('v47-improvements.js');
const app=read('app.js');
const bridge=read('android-bridge-android.js');
assert(v47.includes("var V47_IDS = ['matching','anagram','copy','tf'];"),'Gesture/roleplay hijacked by old renderer');
assert(aphasia.includes('markRecallWrong(status,transcript)'),'Voice errors do not count toward 3 attempts');
assert(aphasia.includes('markRecallWrong(status,input.value.trim())'),'Typed errors do not count toward 3 attempts');
assert(aphasia.includes('scheduleRecallNext()'),'Automatic next-question progression missing');
assert(aphasia.includes("speak('これは何でしょうか？',true)"),'Question replay not distinct from explanation');
assert(bridge.includes('bridge.speak(String(text ||'), 'Native Android TTS is disconnected');
assert(app.includes('if (data.recall) record.recall = data.recall;'),'Answer-attempt data is not persisted');
assert(app.includes('afterRetryCorrect')&&app.includes('totalAttempts'),'Excel export omits retry data');
// Exercise the actual recall scoring functions without any browser dependency.
const recallSource=aphasia.slice(aphasia.indexOf('function newRecallStats()'),aphasia.indexOf('function markPracticeDone('));
const elements={
 score:{textContent:''},feedback:{textContent:'',className:''},
 nextBtn:{classList:{remove(){}}},answerArea:{querySelectorAll:()=>[]},
 game:{classList:{contains:()=>true}}
};
const env={
 window:{},selectedActivity:'naming',current:0,questions:[{answer:'いぬ'}],
 score:0,answered:false,recallAttempts:0,recallHintsUsed:0,recallAdvanceTimer:null,activityRunToken:3,
 '$':id=>elements[id], document:{createElement:()=>({}),querySelectorAll:()=>[]},
 playCorrectSound(){},playWrongSound(){},announceCorrect(){},disableModeInputs(){},
 setTimeout(fn){env.advance=fn;return 1;},clearTimeout(){},nextQuestion(){env.current++;}
};
vm.createContext(env);vm.runInContext(recallSource,env);
env.window.kotobaRecallRunStats=env.newRecallStats();
const feedback={textContent:''};
for(let i=0;i<3;i++)env.markRecallWrong(feedback,'あやまり');
assert.equal(env.answered,true);
assert.equal(env.score,0);
assert.equal(env.window.kotobaRecallRunStats.incorrect,1);
assert.equal(env.window.kotobaRecallRunStats.totalAttempts,3);
env.advance();assert.equal(env.current,1);
env.current=0;env.answered=false;env.recallAttempts=0;
env.window.kotobaRecallRunStats=env.newRecallStats();
env.markCorrect('正解');
assert.equal(env.score,1);
assert.equal(env.window.kotobaRecallRunStats.firstTryCorrect,1);
env.current=0;env.answered=false;env.recallAttempts=1;
env.markCorrect('再挑戦で正解');
assert.equal(env.score,1,'Retry must not increase initial-accuracy score');
assert.equal(env.window.kotobaRecallRunStats.afterRetryCorrect,1);
console.log('PASS: 50 distinct JPG scene assets and voice/score/renderer structural checks.');
const port=Number(process.env.KOTOBA_TEST_PORT||8765);
(async()=>{
 if(!chromium){console.log('SKIP: Playwright not installed; structural checks passed.');return;}
 const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844},permissions:['microphone']});
  const jsErrors=[];
  page.on('pageerror',e=>jsErrors.push(e.message));
  await page.goto(`http://127.0.0.1:${port}/index.html#title`,{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>typeof window.startActivity==='function'&&typeof window.renderQuestion==='function',{timeout:10000});
  await page.evaluate(()=>{document.getElementById('questionCount').value='5';window.startActivity('gesture');});
  assert.equal(await page.locator('.clear-gesture').count(),1,'Old 4-choice renderer hijacked gesture mode');
  const gestureSrc=await page.locator('#questionImage').getAttribute('src');
  assert(gestureSrc.includes('scenes-jpg')&&gestureSrc.endsWith('.jpg'));
  await page.evaluate(()=>window.startActivity('roleplay'));
  assert.equal(await page.locator('.clear-roleplay').count(),1,'Old 4-choice renderer hijacked roleplay mode');
  const roleplaySrc=await page.locator('#questionImage').getAttribute('src');
  assert(roleplaySrc.includes('scenes-jpg')&&roleplaySrc.endsWith('.jpg'));
  await page.evaluate(()=>{window.startActivity('cue');window.__spoken=[];window.speak=function(t,forced){window.__spoken.push({text:t,forced:!!forced});};});
  assert.equal(await page.locator('.clear-recall.cue-mode').count(),1);
  assert(await page.locator('#visualArea').evaluate(e=>e.classList.contains('hidden')),'Cue answer picture is exposed before hint');
  await page.locator('#speakBtn').click();
  await page.getByRole('button',{name:'問題をもう一度聞く'}).click();
  const speech=await page.evaluate(()=>window.__spoken);
  assert(speech.length>=2&&speech.every(e=>e.forced),'Manual playback not forced on');
  assert.notEqual(speech[0].text,speech[1].text,'Explanation and question replay have same content');
  await page.getByRole('button',{name:'画像のヒントを見る'}).click();
  assert(!(await page.locator('#visualArea').evaluate(e=>e.classList.contains('hidden'))),'Picture hint stays hidden after opening');
  await page.evaluate(()=>window.startActivity('naming'));
  const firstIndex=await page.evaluate(()=>window.current);
  await page.locator('.clear-alternative summary').click();
  const field=page.locator('.clear-alternative input');
  const submit=page.getByRole('button',{name:'入力した言葉で進む'});
  for(let i=0;i<3;i++){
   await field.fill('関係のない言葉');await submit.click();
  }
  assert.equal(await page.evaluate(()=>window.score),0,'Wrong answer increased first-try score');
  await page.waitForTimeout(1650);
  assert.notEqual(await page.evaluate(()=>window.current),firstIndex,'Third wrong answer did not auto advance');
  const currentWord=await page.evaluate(()=>window.questions[window.current].answer);
  await page.locator('.clear-alternative summary').click();
  await page.locator('.clear-alternative input').fill(currentWord);
  await page.getByRole('button',{name:'入力した言葉で進む'}).click();
  assert.equal(await page.evaluate(()=>window.score),1,'First-attempt correct answer not counted');
  assert.equal(await page.evaluate(()=>window.kotobaRecallRunStats.incorrect),1);
  assert.equal(await page.evaluate(()=>window.kotobaRecallRunStats.firstTryCorrect),1);
  assert.equal(jsErrors.length,0,'JavaScript page errors: '+jsErrors.join('; '));
  console.log('PASS: 50 unique JPG scenes, gesture/roleplay routing, native voice command intent, cue hints, 3 strikes, first-try scoring.');
 }finally{await browser.close();}
})().catch(error=>{
 if(/socket\(\) failed: Operation not permitted|browserType.launch.*Target page|Executable doesn't exist/.test(error.message)){
  console.log('SKIP: Headless Chromium unavailable in restricted runner; structural checks passed.');
 }else{console.error(error);process.exitCode=1;}
});
