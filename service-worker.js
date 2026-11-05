const CACHE_NAME = 'kotoba-quest-beta87-multipass-ocr';
// Keep the articulation random-quiz assets and all new JPG question cards available offline.
const QUIZ_JPG_FILES = {
  matching: 'apple banana mandarin coffee sakura handwash rice bath sunny cup towel plate enpitsu bus kuruma kutu kasa kuma neko mizu tokei kaban hon isu sakuranbo smartphone jitensha tamago pan sekken megane'.split(' '),
  listen: 'apple kutu densya kasa hon tokei pan kuruma hikouki fune'.split(' '),
  naming: 'apple banana orenge inu neko cofe hasami'.split(' '),
  cue: 'kutsushita kagi fuutou makura'.split(' '),
  fill: 'mesi furo 1.2.3 morning'.split(' '),
  instruction: 'raise-hand close-eyes stand-up sit hold-pen put-pen throw-pen close-book walk run'.split(' ')
};
const QUIZ_JPG_ASSETS = Object.entries(QUIZ_JPG_FILES).flatMap(([section, names]) =>
  names.map(name => './images/quiz-jpg/' + section + '/' + name + '.jpg')
);
const SCENE_JPG_ASSETS = [
  ...Array.from({length:16},(_,i)=>'./images/scenes-jpg/gesture-'+String(i).padStart(2,'0')+'.jpg'),
  ...Array.from({length:4},(_,i)=>'./images/scenes-jpg/gesture-b-'+String(i).padStart(2,'0')+'.jpg'),
  ...Array.from({length:16},(_,i)=>'./images/scenes-jpg/roleplay-a-'+String(i).padStart(2,'0')+'.jpg'),
  ...Array.from({length:14},(_,i)=>'./images/scenes-jpg/roleplay-b-'+String(i).padStart(2,'0')+'.jpg')
];
const APP_SHELL = [
  './',
  './index.html',
  './logo.html',
  './opening-event.html',
  './manifest.webmanifest?v=105',
  './assets/icons/icon-192.png',
  './style.css?v=beta85-scene-quiz',
  './title-responsive-beta3.css?v=3',
  './articulation-random-beta4.css?v=4',
  './responsive-beta6.css?v=6',
  './browser-responsive.css?v=89',
  './v47-improvements.css?v=beta84-ink',
  './pronunciation-training.css?v=89',
  './encoding-safe.js',
  './android-bridge-android.js?v=beta84-ink',
  './event-message-sound.js?v=89',
  './offline-conversation-engine.js?v=91',
  './app.js?v=beta85-scene-quiz',
  './user-profile.js?v=69',
  './aphasia-modes.js?v=beta85-scene-quiz',
  './app-ui.js?v=beta3',
  './generative-ai-chat.js?v=104',
  './ai-download-gate.js?v=99',
  './ai-download-gate.css?v=99',
  './pictogram-3d.html',
  './daily-streak.js?v=108',
  './daily-streak.css?v=108',
  './kotoba-dungeon.html',
  './reading-memory.html',
  './community-board.js',
  './reading-memory-mode.js',
  './ocr/browser-japanese-ocr.js?v=beta87-multipass-ocr',
  './ocr/vendor/tesseract.min.js',
  './ocr/vendor/worker.min.js',
  './v47-improvements.js?v=beta87-multipass-ocr',
  './v57-task-rebuild.js?v=beta8-fixes',
  './pronunciation-training.js?v=69',
  ...QUIZ_JPG_ASSETS,
  ...SCENE_JPG_ASSETS
];
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.all(APP_SHELL.map(async path => {
      try {
        const request = new Request(new URL(path, self.registration.scope).href, { cache: 'reload' });
        const response = await fetch(request);
        if (response.ok) await cache.put(request, response.clone());
      } catch (_) { /* Keep install resilient; requested files cache as they are used. */ }
    }));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => event.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.filter(k => k.startsWith('kotoba-quest-') && k !== CACHE_NAME).map(k => caches.delete(k)));
  await self.clients.claim();
})()));
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin === self.location.origin) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        const response = await fetch(request);
        if (response && response.ok && response.type !== 'opaque') {
          try { await cache.put(request, response.clone()); } catch (_) {}
        }
        return response;
      } catch (error) {
        const cached = await cache.match(request, { ignoreSearch: true });
        if (cached) return cached;
        if (request.mode === 'navigate') {
          const shell = await cache.match(new URL('index.html', self.registration.scope).href, { ignoreSearch: true });
          if (shell) return shell;
        }
        throw error;
      }
    })());
  }
});
