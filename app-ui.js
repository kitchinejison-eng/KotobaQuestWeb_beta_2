(function(){
  'use strict';
  if(window.__webAppUIInstalled) return;
  window.__webAppUIInstalled = true;

  var THEME_KEY='kotobaquest_theme_v3';
  var VOLUME_KEY='kotobaquest_volume_v3';
  var MUSIC_KEY='kotobaquest_music_v3';
  var defaultVolume=60;
  var BGM_GAIN=0.32;
  var bgmAudio=null;

  function $(id){ return document.getElementById(id); }
  function load(key, fallback){ try{ var v=localStorage.getItem(key); return v===null?fallback:v; }catch(e){ return fallback; } }
  function save(key,val){ try{ localStorage.setItem(key,String(val)); }catch(e){} }

  function showScreen(id){
    document.querySelectorAll('.screen').forEach(function(s){ s.classList.remove('active'); });
    var el=$(id); if(el) el.classList.add('active');
    document.body.classList.toggle('title-home-mode',id==='titleScreen');
    window.scrollTo(0,0);
  }
  function openTitle(){
    showScreen('titleScreen');
    if(window.location.hash==='#community'){
      try{ history.replaceState(null,'',window.location.pathname+'#title'); }catch(e){}
    }
  }

  function openCommunity(){
    ensureToneAudio();
    tone(660,0.08,0,0.04);
    if(window.location.hash==='#community'){
      showScreen('communityBoard');
      if(typeof window.__communityBoardRefresh==='function') window.__communityBoardRefresh();
    }else{
      window.location.hash='#community';
    }
  }
  window.__openCommunityBoard=openCommunity;
  window.__closeCommunityBoard=function(){ openTitle(); };

  window.addEventListener('hashchange',function(){
    var hash=window.location.hash;
    if(hash==='#community'){
      showScreen('communityBoard');
      if(typeof window.__communityBoardRefresh==='function') window.__communityBoardRefresh();
    }else if(hash==='#records'){
      showScreen('records');
      try{ if(typeof renderRecords==='function') renderRecords(); }catch(e){}
    }else if(hash==='#home'){
      showScreen('home');
    }else if(hash==='#title' || hash===''){
      showScreen('titleScreen');
    }
  });
  window.__showTitleScreen=openTitle;

  function setTheme(theme){
    if(theme!=='red' && theme!=='yellow') theme='blue';
    document.body.setAttribute('data-theme',theme);
    save(THEME_KEY,theme);
    ['blue','red','yellow'].forEach(function(t){
      var b=$('theme'+t.charAt(0).toUpperCase()+t.slice(1));
      if(b) b.classList.toggle('selected',t===theme);
    });
  }

  function getVolume(){
    var n=Number(load(VOLUME_KEY,defaultVolume));
    if(!isFinite(n)) n=defaultVolume;
    n=Math.max(0,Math.min(100,n));
    return n/100;
  }
  function getBgmVolume(){ return getVolume()*BGM_GAIN; }
  window.__appMasterVolume=getVolume();

  function ensureToneAudio(){
    try{
      var AudioCtx=window.AudioContext||window.webkitAudioContext;
      if(!window.__appAudio && AudioCtx) window.__appAudio=new AudioCtx();
      if(window.__appAudio && window.__appAudio.state==='suspended') window.__appAudio.resume();
      return window.__appAudio;
    }catch(e){ return null; }
  }

  function tone(freq,dur,delay,level){
    var ctx=ensureToneAudio(), vol=getVolume();
    if(!ctx || vol<=0) return;
    var osc=ctx.createOscillator(), gain=ctx.createGain();
    var t=ctx.currentTime+(delay||0), v=(level||0.05)*vol;
    osc.type='sine';
    osc.frequency.setValueAtTime(freq,t);
    gain.gain.setValueAtTime(0.0001,t);
    gain.gain.linearRampToValueAtTime(v,t+0.02);
    gain.gain.linearRampToValueAtTime(0.0001,t+dur);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(t); osc.stop(t+dur+0.03);
  }

  function getBgmAudio(){
    if(!bgmAudio) bgmAudio=$('bgmAudio');
    if(!bgmAudio){
      bgmAudio=document.createElement('audio');
      bgmAudio.id='bgmAudio';
      bgmAudio.src='BGM/seishishitauchu.mp3';
      bgmAudio.loop=true;
      bgmAudio.preload='auto';
      bgmAudio.setAttribute('playsinline','');
      bgmAudio.style.display='none';
      document.body.appendChild(bgmAudio);
    }
    bgmAudio.volume=getBgmVolume();
    return bgmAudio;
  }

  function startMusic(){
    if(load(MUSIC_KEY,'1')!=='1') return;
    var audio=getBgmAudio();
    if(!audio) return;
    audio.volume=getBgmVolume();
    var p=audio.play();
    if(p && typeof p.catch==='function') p.catch(function(){ /* ユーザー操作後に再試行します */ });
  }
  function stopMusic(){
    var audio=getBgmAudio();
    if(!audio) return;
    try{ audio.pause(); audio.currentTime=0; }catch(e){}
  }
  function updateMusicUI(){
    var on=load(MUSIC_KEY,'1')==='1';
    var b=$('musicMiniBtn'); if(b){ b.textContent=on?'ON':'OFF'; b.classList.toggle('off',!on); }
    var sw=$('musicOn'); if(sw) sw.checked=on;
  }

  function getSpeechRecognitionClass(){
    return window.SpeechRecognition || window.webkitSpeechRecognition || null;
  }

  function updateMicStatus(message){
    var status=$('micPermissionStatus'), btn=$('micPermissionBtn');
    if(!status) return;
    if(message){ status.textContent=message; return; }
    if (window.AndroidSpeech && typeof window.AndroidSpeech.hasMicrophonePermission === 'function') {
      var nativeGranted = false;
      try { nativeGranted = !!window.AndroidSpeech.hasMicrophonePermission(); } catch(e) {}
      status.textContent = nativeGranted ? '✅ Androidのマイクは許可されています。' : '⚠️ 音声練習の前にAndroidのマイク使用許可が必要です。';
      if(btn) btn.textContent = nativeGranted ? 'マイクを確認する' : 'マイクを許可する';
      return;
    }
    var secure=!!window.isSecureContext;
    var micApi=!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    var speechApi=!!getSpeechRecognitionClass();
    if(!secure){
      status.textContent='マイクを使うにはHTTPSで開く必要があります。GitHub Pagesの公開URLを使ってください。';
    }else if(!micApi){
      status.textContent='このブラウザではマイクAPIを使えません。最新のChrome、Edge、または対応するSafariをお試しください。';
    }else if(!speechApi){
      status.textContent='マイク自体は使えますが、このブラウザでは音声認識に対応していない可能性があります。最新のChromeなどをお試しください。';
    }else{
      status.textContent='マイクと音声認識に対応しています。「マイクを許可・テストする」を押すと許可を確認できます。';
    }
    if(btn) btn.textContent='マイクを許可・テストする';
  }

  function requestMic(){
    if (window.AndroidSpeech && typeof window.AndroidSpeech.hasMicrophonePermission === 'function') {
      var granted = false;
      try { granted = !!window.AndroidSpeech.hasMicrophonePermission(); } catch(e) {}
      if (granted) { updateMicStatus('✅ Androidのマイクは許可されています。'); return; }
      updateMicStatus('Androidのマイク使用許可を確認しています…');
      window.__nativeMicPermissionCallback = function(ok){
        window.__nativeMicPermissionCallback = null;
        updateMicStatus(ok ? '✅ Androidのマイク使用許可を確認しました。' : '⚠️ マイクが許可されませんでした。Androidのアプリ設定を確認してください。');
      };
      try { window.AndroidSpeech.requestMicrophonePermission(); }
      catch(e) { updateMicStatus('マイクの許可を確認できませんでした。'); }
      return;
    }
    if(!window.isSecureContext){
      updateMicStatus('マイクを使うにはHTTPSで開く必要があります。GitHub Pagesの公開URLを使ってください。');
      return;
    }
    if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
      updateMicStatus('このブラウザではマイクAPIが使えません。最新のChrome、Edge、または対応するSafariをお試しください。');
      return;
    }
    updateMicStatus('ブラウザのマイク許可を確認しています…');
    navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true}})
      .then(function(stream){
        stream.getTracks().forEach(function(track){track.stop();});
        updateMicStatus(getSpeechRecognitionClass()
          ? '✅ マイクの許可を確認しました。音声課題で「マイクで話す」を押してください。'
          : '✅ マイクの許可を確認しました。ただし、このブラウザでは自動音声認識が使えない場合があります。');
      })
      .catch(function(error){
        var name=error && error.name;
        var message='マイクを使用できません。ブラウザのサイト設定をご確認ください。';
        if(name==='NotAllowedError' || name==='SecurityError') message='マイクが許可されていません。アドレスバーのサイト設定でマイクを「許可」にしてください。';
        else if(name==='NotFoundError') message='マイクが見つかりません。端末のマイクや接続を確認してください。';
        else if(name==='NotReadableError') message='マイクを他のアプリが使用している可能性があります。';
        updateMicStatus('⚠️ '+message);
      });
  }

  function openSettings(){ showScreen('settings'); updateMicStatus(); }
  // 起動ロゴと会話イベントは独立ページで管理します。



  function startAI(){
    // 先にホームでUIを初期化し、そのまま会話画面へ移動。
    showScreen('home');
    if(typeof startActivity==='function') {
      try { startActivity('localAIConversation'); }
      catch(e) {
        console.error('会話画面を開けませんでした',e);
        var notice=$('aiStartErrorMessage');
        if(!notice){notice=document.createElement('p');notice.id='aiStartErrorMessage';notice.style.cssText='padding:12px;color:#a00000;';$('home').prepend(notice);}
        notice.textContent='会話画面の表示に失敗しました。ページを再読み込みしてください。';
      }
    }
  }


  function setup(){
    if(window.__webAppUIReady) return;
    window.__webAppUIReady=true;
    setTheme(load(THEME_KEY,'blue'));

    var vol=Number(load(VOLUME_KEY,defaultVolume));
    if(!isFinite(vol)) vol=defaultVolume;
    vol=Math.max(0,Math.min(100,vol));
    var range=$('masterVolume'), output=$('volumeValue');
    if(range) range.value=vol;
    if(output) output.textContent=vol+'%';
    window.__appMasterVolume=vol/100;
    if(window.AndroidSpeech && typeof window.AndroidSpeech.setVolume==='function'){try{window.AndroidSpeech.setVolume(vol/100);}catch(e){}}
    var audio=getBgmAudio(); if(audio) audio.volume=vol/100;
    
    updateMusicUI();


    var quickChat=$('titleAiChatBtn');
    if(quickChat) quickChat.addEventListener('click',startAI);
    var start=$('titleStartBtn');
    if(start) start.addEventListener('click',function(){
      ensureToneAudio();
      startMusic();
      tone(520,0.08,0,0.04);
      showScreen('home');
    });
    var community=$('titleCommunityBtn');
    if(community) community.addEventListener('click',openCommunity);
    var communityBack=$('communityBackBtn');
    if(communityBack) communityBack.addEventListener('click',openTitle);

    var dungeon=$('titleDungeonBtn');
    if(dungeon) dungeon.addEventListener('click',function(){
      // 同じアプリ内の画面移動だと記録し、遷移後にダンジョン側でBGMを再開できるようにします。
      try{sessionStorage.setItem('kotobaquest_entering_dungeon','1');}catch(e){}
      stopMusic();
      ensureToneAudio();
      tone(740,0.09,0,0.05);
      window.location.href='kotoba-dungeon.html?v=75';
    });
    var title=$('titleScreen');
    if(title) title.addEventListener('pointerdown',function(){
      if(load(MUSIC_KEY,'1')==='1') startMusic();
    },{passive:true});
    var records=$('titleRecordsBtn'); if(records) records.addEventListener('click',function(){ if(typeof openRecords==='function') openRecords(); });
    var settings=$('titleSettingsBtn'); if(settings) settings.addEventListener('click',openSettings);
    var homeTitle=$('homeToTitleBtn'); if(homeTitle) homeTitle.addEventListener('click',openTitle);
    var genreSettings=$('genreSettingsBtn'); if(genreSettings) genreSettings.addEventListener('click',openSettings);
    var settingsBack=$('settingsBackBtn'); if(settingsBack) settingsBack.addEventListener('click',openTitle);
    var recordBack=$('recordsHomeBtn'); if(recordBack) recordBack.addEventListener('click',openTitle);

    var mini=$('musicMiniBtn'); if(mini) mini.addEventListener('click',function(){
      var on=load(MUSIC_KEY,'1')==='1';
      save(MUSIC_KEY,on?'0':'1');
      updateMusicUI();
      if(on) stopMusic(); else startMusic();
    });
    var music=$('musicOn'); if(music) music.addEventListener('change',function(){
      save(MUSIC_KEY,this.checked?'1':'0');
      updateMusicUI();
      if(this.checked) startMusic(); else stopMusic();
    });
    if(range) range.addEventListener('input',function(){
      var n=Number(this.value); if(!isFinite(n)) n=defaultVolume;
      n=Math.max(0,Math.min(100,n));
      save(VOLUME_KEY,n);
      window.__appMasterVolume=n/100;
      if(window.AndroidSpeech && typeof window.AndroidSpeech.setVolume==='function'){try{window.AndroidSpeech.setVolume(n/100);}catch(e){}}
      if(output) output.textContent=n+'%';
      var audio=getBgmAudio(); if(audio) audio.volume=getBgmVolume();
    });
    var testSound=$('testSoundBtn'); if(testSound) testSound.addEventListener('click',function(){ tone(660,0.12,0,0.06); tone(880,0.18,0.13,0.06); });
    ['blue','red','yellow'].forEach(function(t){
      var id='theme'+t.charAt(0).toUpperCase()+t.slice(1), b=$(id);
      if(b) b.addEventListener('click',function(){ setTheme(t); });
    });
    var mic=$('micPermissionBtn'); if(mic) mic.addEventListener('click',requestMic);
    var micSettings=$('micOpenSettingsBtn'); if(micSettings) micSettings.addEventListener('click',function(){
      if(window.AndroidSpeech && typeof window.AndroidSpeech.openMicrophoneSettings==='function'){
        try{window.AndroidSpeech.openMicrophoneSettings();}catch(e){}
        return;
      }
      var help=$('micBrowserHelp');
      if(help) help.classList.toggle('hidden');
      updateMicStatus(help && !help.classList.contains('hidden') ? 'マイクの許可は、ブラウザのアドレスバー横にあるサイト設定から変更できます。' : null);
    });
    var ai=$('aiStartBtn'); if(ai) ai.addEventListener('click',startAI);
    updateMicStatus();
    if(window.location.hash === '#records'){
      showScreen('records');
      try{ if(typeof renderRecords==='function') renderRecords(); }catch(e){}
    }else if(window.location.hash === '#community'){
      showScreen('communityBoard');
      if(typeof window.__communityBoardRefresh==='function') window.__communityBoardRefresh();
    }else if(window.location.hash === '#home'){
      showScreen('home');
    }else{
      // index.html はメイン画面専用。ロゴ・会話イベントを再生しません。
      showScreen('titleScreen');
    }
  }

  function stopAllPageAudio(){
    stopMusic();
    try{ if(window.speechSynthesis) window.speechSynthesis.cancel(); }catch(e){}
    try{ if(window.AndroidSpeech && typeof window.AndroidSpeech.stopTts==='function') window.AndroidSpeech.stopTts(); }catch(e){}
    try{ if(window.__appAudio && window.__appAudio.state==='running') window.__appAudio.suspend(); }catch(e){}
  }
  window.addEventListener('pagehide',stopAllPageAudio);
  window.addEventListener('beforeunload',stopAllPageAudio);
  document.addEventListener('visibilitychange',function(){
    if(document.hidden){
      stopAllPageAudio();
      var enteringDungeon=false;try{enteringDungeon=sessionStorage.getItem('kotobaquest_entering_dungeon')==='1';}catch(e){}
      if(!enteringDungeon){save(MUSIC_KEY,'0');updateMusicUI();}
    }
  });

  window.__webAppUI={boot:setup, startMusic:startMusic, stopMusic:stopMusic, setTheme:setTheme};
})();
