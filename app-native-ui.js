(function(){
  'use strict';
  if(window.__nativeAppUIInstalled) return;
  window.__nativeAppUIInstalled = true;

  var THEME_KEY='kotobaquest_theme_v3';
  var VOLUME_KEY='kotobaquest_volume_v3';
  var MUSIC_KEY='kotobaquest_music_v3';
  var defaultVolume=60;
  var BGM_GAIN=0.32;
  var bgmAudio=null;

  function $(id){ return document.getElementById(id); }
  function load(key, fallback){ try{ var v=localStorage.getItem(key); return v===null?fallback:v; }catch(e){ return fallback; } }
  function save(key,val){ try{ localStorage.setItem(key,String(val)); }catch(e){} }

  function showNative(id){
    document.querySelectorAll('.screen').forEach(function(s){ s.classList.remove('active'); });
    var el=$(id); if(el) el.classList.add('active');
    window.scrollTo(0,0);
  }
  function openTitle(){ showNative('titleScreen'); }
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

  function updateMicStatus(){
    var status=$('micPermissionStatus'), btn=$('micPermissionBtn');
    if(!status) return;
    if(window.AndroidSpeech && typeof window.AndroidSpeech.hasMicrophonePermission==='function'){
      var ok=false;
      try{ ok=!!window.AndroidSpeech.hasMicrophonePermission(); }catch(e){}
      status.textContent=ok ? '✅ マイクは許可されています。' : '⚠️ マイクの使用許可が必要です。';
      if(btn) btn.textContent=ok ? 'マイクを確認する' : 'マイクを許可する';
    }else{
      status.textContent='音声練習を開始すると、マイクの許可を確認します。';
      if(btn) btn.textContent='マイクを確認する';
    }
  }

  function requestMic(){
    if(window.AndroidSpeech && typeof window.AndroidSpeech.hasMicrophonePermission==='function'){
      var ok=false;
      try{ ok=!!window.AndroidSpeech.hasMicrophonePermission(); }catch(e){}
      if(ok){ updateMicStatus(); return; }
      try{
        if(typeof window.AndroidSpeech.requestMicrophonePermission==='function') window.AndroidSpeech.requestMicrophonePermission();
      }catch(e){}
      setTimeout(function(){ updateMicStatus(); },1200);
      return;
    }
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
      navigator.mediaDevices.getUserMedia({audio:true}).then(function(){ updateMicStatus(); }).catch(function(){ updateMicStatus(); });
    }
  }

  function openSettings(){ showNative('settings'); updateMicStatus(); }
  // 起動ロゴと会話イベントは独立ページで管理します。



  function startAI(){
    showNative('home');
    setTimeout(function(){
      if(typeof selectCategory==='function') selectCategory('test');
      setTimeout(function(){
        if(typeof startActivity==='function') startActivity('localAIConversation');
      },80);
    },80);
  }

  function setup(){
    if(window.__nativeAppUIReady) return;
    window.__nativeAppUIReady=true;
    setTheme(load(THEME_KEY,'blue'));

    var vol=Number(load(VOLUME_KEY,defaultVolume));
    if(!isFinite(vol)) vol=defaultVolume;
    vol=Math.max(0,Math.min(100,vol));
    var range=$('masterVolume'), output=$('volumeValue');
    if(range) range.value=vol;
    if(output) output.textContent=vol+'%';
    window.__appMasterVolume=vol/100;
    var audio=getBgmAudio(); if(audio) audio.volume=vol/100;
    if(window.AndroidSpeech && window.AndroidSpeech.setVolume){ try{ window.AndroidSpeech.setVolume(vol/100); }catch(e){} }
    updateMusicUI();


    var start=$('titleStartBtn');
    if(start) start.addEventListener('click',function(){
      ensureToneAudio();
      startMusic();
      tone(520,0.08,0,0.04);
      showNative('home');
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
      if(output) output.textContent=n+'%';
      var audio=getBgmAudio(); if(audio) audio.volume=getBgmVolume();
      if(window.AndroidMusic && window.AndroidMusic.setVolume){ try{ window.AndroidMusic.setVolume(getBgmVolume()); }catch(e){} }
      if(window.AndroidSpeech && window.AndroidSpeech.setVolume){ try{ window.AndroidSpeech.setVolume(n/100); }catch(e){} }
    });
    var testSound=$('testSoundBtn'); if(testSound) testSound.addEventListener('click',function(){ tone(660,0.12,0,0.06); tone(880,0.18,0.13,0.06); });
    ['blue','red','yellow'].forEach(function(t){
      var id='theme'+t.charAt(0).toUpperCase()+t.slice(1), b=$(id);
      if(b) b.addEventListener('click',function(){ setTheme(t); });
    });
    var mic=$('micPermissionBtn'); if(mic) mic.addEventListener('click',requestMic);
    var micSettings=$('micOpenSettingsBtn'); if(micSettings) micSettings.addEventListener('click',function(){
      try{ if(window.AndroidSpeech && typeof window.AndroidSpeech.openMicrophoneSettings==='function') window.AndroidSpeech.openMicrophoneSettings(); }catch(e){}
    });
    window.__nativeMicPermissionCallback=function(granted){
      updateMicStatus();
      if(granted){
        try{ tone(880,0.10,0,0.05); }catch(e){}
        var status=$('micPermissionStatus');
        if(status) status.textContent='✅ マイクの許可が完了しました。';
      }
    };
    var ai=$('aiStartBtn'); if(ai) ai.addEventListener('click',startAI);
    updateMicStatus();
    if(window.location.hash === '#records'){
      showNative('records');
      try{ if(typeof renderRecords==='function') renderRecords(); }catch(e){}
    }else if(window.location.hash === '#home'){
      showNative('home');
    }else{
      // index.html はメイン画面専用。ロゴ・会話イベントを再生しません。
      showNative('titleScreen');
    }
  }

  window.__nativeAppUI={boot:setup, startMusic:startMusic, stopMusic:stopMusic, setTheme:setTheme};
})();
