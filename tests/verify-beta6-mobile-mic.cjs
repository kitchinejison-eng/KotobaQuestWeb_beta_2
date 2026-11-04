// node tests/verify-beta6-mobile-mic.cjs
// Check the scoped phone/tablet microphone layout without changing the
// established articulation question flow or the tablet/desktop 3D HUD.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const web = fs.existsSync(path.join(root, 'app.js')) ? root : path.join(root, 'app/src/main/assets/www');
const read = file => fs.readFileSync(path.join(web, file), 'utf8');
const html = read('index.html');
const css = read('responsive-beta6.css');
const game = read('pictogram-3d.html');
const app = read('app.js');
const worker = read('service-worker.js');

assert(html.includes('responsive-beta6.css?v=6'), 'Mobile/tablet microphone stylesheet is missing');
assert(html.includes('app.js?v=beta85-scene-quiz'), 'Browser must load fresh microphone code');
assert(worker.includes('kotoba-quest-beta85-scene-quiz'), 'Offline cache needs a new version');
assert(worker.includes('./responsive-beta6.css?v=6'), 'Offline cache needs mobile microphone styles');
assert(worker.includes('./app.js?v=beta85-scene-quiz'), 'Offline cache needs fresh microphone code');

assert(/@media\s*\(max-width:480px\)\s*and\s*\(orientation:portrait\)/.test(css), 'Portrait phone breakpoint missing');
assert(/@media\s*\(min-width:481px\)\s*and\s*\(max-width:950px\)\s*and\s*\(orientation:portrait\)/.test(css), 'Tablet-specific microphone layout missing');
assert(css.includes('.artnav-v1-voice-slot .foundation-voice-panel'), 'Microphone controls are not scoped to articulation');
assert(css.includes('grid-template-columns:minmax(0,1fr)'), 'Narrow phone mic controls must stack vertically');
assert(css.includes('grid-template-columns:repeat(2,minmax(0,1fr))'), 'Tablet microphone controls must keep two columns');
assert(!css.includes('body{'), 'This stylesheet should not change overall tablet layout');

assert(game.includes('id="mobileHelp"'), 'Mobile help disclosure missing');
assert(game.includes('<summary>操作方法</summary>'), 'Mobile help should not cover the game by default');
assert(game.includes('#start .panel{width:100%;max-height:calc(100dvh - 16px)'), 'Phone start screen must scroll within viewport');
assert(game.includes('max-height:32dvh'), 'Phone question panel must not cover the play area');
assert(game.includes('camera.fov=(innerWidth<=480&&innerHeight>innerWidth)?74:66'), 'Phone camera field of view missing');
assert(game.includes('#npcCoach2D{top:auto;right:7px;bottom:'), 'Phone mascot must not cover answers');
assert(game.includes('class="action-ja"'), 'Phone action button names should be in Japanese');

assert(app.includes('window.__nativeMicPermissionCallback'), 'Android microphone callback required');
assert(app.includes('Android microphone permission request timed out'), 'Android permission prompt needs a timeout');
assert(app.includes('microphonePermissionCheckPromise = nativePermissionRequest'), 'Duplicate permission prompts must be avoided');
assert(app.includes('scheduleArticulationAutoNext();'), 'Random five-question navigation must auto-advance');
assert(app.includes('pictogram-3d.html?v=beta6-mobile-mic'), '3D game link needs cache busting');
if (web !== root) {
  const gradle = fs.readFileSync(path.join(root, 'app/build.gradle'), 'utf8');
  assert(gradle.includes('versionCode 126') && gradle.includes("versionName 'Ver_beta_8.2'"), 'Android app version not updated');
}

// Parse both inline scripts, as well as the application code, without
// downloading Three.js or requiring Android Studio.
new vm.Script(app, { filename:'app.js' });
new vm.Script(read('service-worker.js'), { filename:'service-worker.js' });
for (const script of game.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)) {
  new vm.Script(script[1], { filename:'pictogram-3d inline script' });
}

// Exercise the actual Android permission function in isolation. It should
// create one OS permission prompt for rapid double taps, then release the
// pending request after either permission or denial so retry is possible.
async function checkPermissionLifecycle() {
  const helpers = app.slice(app.indexOf('var __awaiter ='), app.indexOf('var __read ='));
  const requestFn = app.slice(app.indexOf('function requestMicrophoneAccess()'), app.indexOf('function runMicrophoneCheck()'));
  let nativeRequests = 0;
  const activeTimeouts = new Map();
  let timeoutSeq = 0;
  const testWindow = {
    AndroidSpeech: {
      start() {},
      hasMicrophonePermission: () => false,
      requestMicrophonePermission: () => { nativeRequests++; }
    },
    setTimeout: fn => { const id = ++timeoutSeq; activeTimeouts.set(id, fn); return id; },
    clearTimeout: id => { activeTimeouts.delete(id); }
  };
  const context = {
    window:testWindow,
    navigator:{},
    Promise,
    microphonePermissionGranted:false,
    microphonePermissionCheckPromise:null,
    browserVoiceDiagnostics: () => ({ secure:true, mediaOk:true })
  };
  vm.createContext(context);
  vm.runInContext(helpers + requestFn, context);

  const first = context.requestMicrophoneAccess();
  const second = context.requestMicrophoneAccess();
  assert.equal(nativeRequests, 1, 'Double taps must not trigger a second Android OS prompt');
  assert.equal(typeof testWindow.__nativeMicPermissionCallback, 'function');
  testWindow.__nativeMicPermissionCallback(true);
  assert.deepEqual(await Promise.all([first, second]), [true, true]);
  assert.equal(context.microphonePermissionCheckPromise, null, 'Permission prompt must release pending request');
  assert.equal(activeTimeouts.size, 0, 'Permission prompt timeout must be canceled');

  const denied = context.requestMicrophoneAccess();
  assert.equal(nativeRequests, 2, 'Permission check must be reusable');
  testWindow.__nativeMicPermissionCallback(false);
  await assert.rejects(denied, error => error.name === 'NotAllowedError');
  assert.equal(context.microphonePermissionCheckPromise, null, 'Denied permission must allow retry');

  const hanging = context.requestMicrophoneAccess();
  assert.equal(nativeRequests, 3, 'Third attempt must still reach Android');
  assert.equal(activeTimeouts.size, 1, 'Missing callback must be guarded by a timeout');
  [...activeTimeouts.values()][0]();
  await assert.rejects(hanging, error => error.name === 'TimeoutError');
  assert.equal(context.microphonePermissionCheckPromise, null, 'Timeout must release pending request');
}

checkPermissionLifecycle().then(() => {
  console.log('PASS: Beta 6 phone HUD, tablet microphone, Android permission lifecycle, and cache version.');
}).catch(error => { console.error(error); process.exitCode = 1; });
