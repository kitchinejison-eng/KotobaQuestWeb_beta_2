/* V86: 会話イベントの文字表示音。会話の読み上げ音声は使用しません。 */
(function () {
  'use strict';
  var soundUrl = 'sounds/message-display-3.mp3';
  var pending = null;
  var active = [];
  function stopActive() {
    active.forEach(function (audio) {
      try { audio.pause(); audio.currentTime = 0; } catch (e) {}
    });
    active = [];
  }
  function playInstance(instance) {
    try {
      instance.currentTime = 0;
      var promise = instance.play();
      if (promise && typeof promise.then === 'function') {
        promise.then(function () { if (pending === instance) pending = null; })
          .catch(function () { pending = instance; });
      }
    } catch (e) { pending = instance; }
  }
  function play() {
    // セリフを連続で進めても前の通知音と重ならないようにします。
    stopActive();
    pending = null;
    var audio = new Audio(soundUrl);
    audio.preload = 'auto';
    audio.volume = 0.78;
    active.push(audio);
    audio.addEventListener('ended', function () {
      active = active.filter(function (item) { return item !== audio; });
    });
    playInstance(audio);
  }
  function stop() {
    stopActive();
    pending = null;
  }
  // 自動再生が制限される環境では、最初のユーザー操作後に直前の表示音を再試行します。
  document.addEventListener('pointerdown', function () {
    if (pending) {
      var audio = pending;
      pending = null;
      playInstance(audio);
    }
  }, { passive: true });
  window.KQEventMessageSound = { play: play, stop: stop };
})();
