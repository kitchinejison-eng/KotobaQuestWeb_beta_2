// node tests/verify-beta82-articulation-mic-retry.cjs
// Covers second-tap restart, stale Android callback isolation, and timeout recovery.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const app=read('app.js');
const bridgeSource=read('android-bridge-android.js');
const html=read('index.html');
const worker=read('service-worker.js');
assert(html.includes('android-bridge-android.js?v=beta84-ink'));
assert(worker.includes('./android-bridge-android.js?v=beta84-ink'));
assert(worker.includes('kotoba-quest-beta85-scene-quiz'));
assert(app.includes('前の録音を終了しています。続けて聞き取りを始めます…'));
assert(app.includes('speechRecognition !== recognition'));
assert(app.includes('}, 15000);'),'Speech timeout recovery missing');

const nativeCalls=[];
const page={KotobaNativeBridge:{
 startRecognition:()=>{},
 startRecognitionWithSession:(lang,mode,id)=>nativeCalls.push({type:'start',lang,mode,id}),
 cancelRecognitionForSession:id=>nativeCalls.push({type:'cancel',id}),
 stopRecognitionForSession:id=>nativeCalls.push({type:'stop',id}),
 hasMicrophonePermission:()=>true,
 requestMicrophonePermission:()=>{},
 openMicrophoneSettings:()=>{},
 speak:()=>{}
}};
vm.runInNewContext(bridgeSource,{window:page});
const first=new page.SpeechRecognition();
let firstEnds=0,secondEnds=0,secondResults=0;
first.onend=()=>firstEnds++;
first.start();
assert.equal(nativeCalls.length,1);
assert.equal(nativeCalls[0].mode,'');
first.abort();
assert.deepEqual(nativeCalls.at(-1),{type:'cancel',id:nativeCalls[0].id});
const second=new page.SpeechRecognition();
second.kotobaMode='articulationNavigator';
second.onend=()=>secondEnds++;
second.onresult=()=>secondResults++;
second.start();
const oldId=nativeCalls[0].id;
const newId=nativeCalls.at(-1).id;
assert.notEqual(oldId,newId);
assert.equal(nativeCalls.at(-1).mode,'articulationNavigator');
page.__kotobaNativeSpeechEvent('end',null,oldId);
page.__kotobaNativeSpeechEvent('result',{alternatives:['誤った古い答え'],isFinal:true},oldId);
assert.equal(secondEnds,0,'An old end event stopped the next recording');
assert.equal(secondResults,0,'An old result was delivered to the next recording');
page.__kotobaNativeSpeechEvent('result',{alternatives:['あ'],isFinal:true},newId);
page.__kotobaNativeSpeechEvent('end',null,newId);
assert.equal(secondResults,1);
assert.equal(secondEnds,1);
assert.equal(page.__activeAndroidSpeechRecognition,null);

// On browser distribution the native Java file is not bundled; Android archive
// is checked separately by the release packaging process.
const maybeJava=path.join(root,'../../java/jp/co/aristoteles/kotobaquest/MainActivity.java');
if(fs.existsSync(maybeJava)){
 const java=fs.readFileSync(maybeJava,'utf8');
 assert(java.includes('startRecognitionWithSession(String language, String mode, String sessionId)'));
 assert(java.includes('cancelRecognitionForSession(String sessionId)'));
 assert(java.includes('postSpeechEvent("end", null, thisSession)'));
}

const helpers=app.slice(app.indexOf('var __awaiter ='),app.indexOf('var __read ='));
const voice=app.slice(app.indexOf('function startFoundationVoiceRecognition('),app.indexOf('function renderVoiceReadTest('));
const button={disabled:false,innerHTML:''};
let started=0,aborted=0,recognizers=[];
class FakeRecognition {
 constructor(){this.onstart=null;this.onend=null;recognizers.push(this);}
 start(){started++;}
 abort(){aborted++;}
}
let timer=0;const callbacks=new Map();
const env={
 Promise,window:{isSecureContext:true,AndroidSpeech:null,
  setTimeout:(fn,ms)=>{const id=++timer;callbacks.set(id,{fn,ms});return id;},
  clearTimeout:id=>callbacks.delete(id)},
 selectedActivity:'articulationNavigator',activityRunToken:7,current:0,
 articulationSelectedGroup:'vowel',voiceRecognitionBusy:false,speechRecognition:null,
 answered:false,microphonePermissionGranted:true,
 getSpeechRecognitionClass:()=>FakeRecognition,requestMicrophoneAccess:async()=>true,
 '$':id=>id==='voiceStartBtn'?button:{textContent:'',classList:{add(){},toggle(){}}},
 showVoiceTestStatus(){},stopMicrophoneStream(){},updateArticulationNavLive(){},
 windowSpeechStub:null,
 markVoiceReadStep(){},document:{querySelectorAll:()=>[]},
 setTimeout:(fn,ms)=>env.window.setTimeout(fn,ms),clearTimeout:id=>env.window.clearTimeout(id)
};
vm.createContext(env);
vm.runInContext(helpers+voice,env);
(async()=>{
 const q={answer:'あ'},practice={target:'あ',accept:['あ']};
 await env.startFoundationVoiceRecognition(q,practice,'repeat');
 assert.equal(started,1);
 assert.equal(env.voiceRecognitionBusy,true);
 assert.equal(button.disabled,false,'Second tap is blocked by a disabled mic button');
 const old=recognizers[0];
 await env.startFoundationVoiceRecognition(q,practice,'repeat');
 assert.equal(aborted,1);
 assert.equal(env.voiceRecognitionBusy,false);
 const restart=[...callbacks.values()].find(x=>x.ms===400);
 assert(restart,'Second press did not schedule a fresh capture');
 old.onend();
 assert.equal(started,1);
 restart.fn();
 await Promise.resolve();await Promise.resolve();
 assert.equal(started,2,'Second press did not start a new recognizer');
 assert.equal(env.voiceRecognitionBusy,true);
 old.onend();
 assert.equal(env.voiceRecognitionBusy,true,'Stale end event cleared the new microphone state');
 const watchdog=[...callbacks.values()].find(x=>x.ms===15000);
 assert(watchdog,'Recording timeout watchdog not armed');
 watchdog.fn();
 assert.equal(env.voiceRecognitionBusy,false,'Timeout did not unlock the microphone');
 assert.equal(button.disabled,false);
 console.log('PASS: beta8.2 mic second tap, Android session isolation and timeout recovery.');
})().catch(e=>{console.error(e);process.exitCode=1;});
