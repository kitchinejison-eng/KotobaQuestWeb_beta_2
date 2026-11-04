/* V104: connect the real Android SpeechRecognizer to the Web Speech API. */
(function () {
  'use strict';

  var nativeSpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
  var bridge = window.KotobaNativeBridge;
  // Pair each native callback with its originating recording, even when it
  // arrives after the next question has already started.
  var speechSessionSequence = 0;
  // MainActivity exposes KotobaNativeBridge; the older JS expected an
  // AndroidSpeech object that did not exist, so recognition never started.
  if (bridge && typeof bridge.startRecognition === 'function') {
    window.AndroidSpeech = {
      start: function (lang, mode, sessionId) {
        if (typeof bridge.startRecognitionWithSession === 'function')
          bridge.startRecognitionWithSession(lang || 'ja-JP', mode || '', sessionId || '');
        else if (mode === 'articulationNavigator' && typeof bridge.startRecognitionForMode === 'function')
          bridge.startRecognitionForMode(lang || 'ja-JP', mode);
        else bridge.startRecognition(lang || 'ja-JP');
      },
      stop: function (sessionId) {
        if (typeof bridge.stopRecognitionForSession === 'function') bridge.stopRecognitionForSession(sessionId || '');
        else bridge.stopRecognition();
      },
      abort: function (sessionId) {
        if (typeof bridge.cancelRecognitionForSession === 'function') bridge.cancelRecognitionForSession(sessionId || '');
        else bridge.cancelRecognition();
      },
      // The native bridge already provides Android TextToSpeech. Expose it to
      // the same API that app.js uses for all manually requested audio cues.
      speak: function (text) {
        if (typeof bridge.speak !== 'function') throw new Error('Native TTS is unavailable');
        bridge.speak(String(text || ''), 0.88, 1.0, 1.0, 'kotoba-manual-' + Date.now());
      },
      stopTts: function () { if (typeof bridge.cancelSpeech === 'function') bridge.cancelSpeech(); },
      hasMicrophonePermission: function () { return !!bridge.hasMicrophonePermission(); },
      requestMicrophonePermission: function () { bridge.requestMicrophonePermission(); },
      openMicrophoneSettings: function () { bridge.openMicrophoneSettings(); }
    };
  }

  function AndroidSpeechRecognition() {
    this.lang = 'ja-JP';
    this.continuous = false;
    this.interimResults = true;
    this.maxAlternatives = 3;
    this.onstart = null;
    this.onresult = null;
    this.onerror = null;
    this.onend = null;
    this.__sessionId = null;
  }

  AndroidSpeechRecognition.prototype.start = function () {
    this.__sessionId = 'kotoba-mic-' + (++speechSessionSequence);
    window.__activeAndroidSpeechRecognition = this;
    if (!window.AndroidSpeech) {
      this.__emitError('not-supported');
      return;
    }
    try { window.AndroidSpeech.start(this.lang || 'ja-JP', this.kotobaMode || '', this.__sessionId); }
    catch (e) { this.__emitError('client'); }
  };

  AndroidSpeechRecognition.prototype.abort = function () {
    try { if (window.AndroidSpeech) window.AndroidSpeech.abort(this.__sessionId); } catch (e) {}
  };
  AndroidSpeechRecognition.prototype.stop = function () {
    try { if (window.AndroidSpeech) window.AndroidSpeech.stop(this.__sessionId); } catch (e) {}
  };

  AndroidSpeechRecognition.prototype.__emitStart = function () {
    try { if (typeof this.onstart === 'function') this.onstart(); } catch (e) {}
  };
  AndroidSpeechRecognition.prototype.__emitResult = function (texts, isFinal) {
    var words = Array.isArray(texts) ? texts : [texts];
    var item = words.filter(function (t) { return !!t; }).map(function (text, index) {
      return {transcript: String(text), confidence: Math.max(0.1, 1 - index * 0.1)};
    });
    item.isFinal = !!isFinal;
    var event = {resultIndex: 0, results: [item]};
    try { if (typeof this.onresult === 'function') this.onresult(event); } catch (e) {}
  };
  AndroidSpeechRecognition.prototype.__emitError = function (error) {
    try { if (typeof this.onerror === 'function') this.onerror({error: String(error || 'unknown')}); } catch (e) {}
  };
  AndroidSpeechRecognition.prototype.__emitEnd = function () {
    try { if (typeof this.onend === 'function') this.onend(); } catch (e) {}
    if (window.__activeAndroidSpeechRecognition === this) window.__activeAndroidSpeechRecognition = null;
  };

  window.AndroidSpeechRecognition = AndroidSpeechRecognition;
  // Android WebViewではネイティブブリッジを使用。通常のWebではブラウザー標準APIを優先。
  if (window.AndroidSpeech) {
    window.SpeechRecognition = AndroidSpeechRecognition;
    window.webkitSpeechRecognition = AndroidSpeechRecognition;
  }

  function sessionTarget(sessionId) {
    var current = window.__activeAndroidSpeechRecognition;
    if (!current) return null;
    // Missing IDs are accepted for old installed Android clients only.
    if (sessionId != null && sessionId !== '' && sessionId !== current.__sessionId) return null;
    return current;
  }

  window.__androidSpeechDispatch = {
    start: function (sessionId) { var r = sessionTarget(sessionId); if (r) r.__emitStart(); },
    result: function (text, isFinal, sessionId) { var r = sessionTarget(sessionId); if (r) r.__emitResult(text, isFinal); },
    error: function (error, sessionId) { var r = sessionTarget(sessionId); if (r) r.__emitError(error); },
    end: function (sessionId) { var r = sessionTarget(sessionId); if (r) r.__emitEnd(); },
    permission: function (granted) {
      window.__androidMicGranted = !!granted;
      try { if (window.__nativeMicPermissionCallback) window.__nativeMicPermissionCallback(!!granted); } catch (e) {}
    }
  };

  // Events emitted by MainActivity.java, including Android permissions.
  window.__kotobaNativeSpeechEvent = function (type, payload, sessionId) {
    var nativeEvent = window.__androidSpeechDispatch;
    if (type === 'start') nativeEvent.start(sessionId);
    else if (type === 'result' || type === 'partial') {
      var alternatives = payload && Array.isArray(payload.alternatives) ? payload.alternatives : [];
      if (alternatives.length) nativeEvent.result(alternatives, type === 'result' || !!payload.isFinal, sessionId);
    }
    else if (type === 'error') nativeEvent.error(payload || 'unknown', sessionId);
    else if (type === 'end') nativeEvent.end(sessionId);
  };
  window.__kotobaAndroidMicPermissionResult = function (granted) {
    window.__androidSpeechDispatch.permission(!!granted);
  };

  // Digital Ink Recognition for the writing-copy exercise. Native ML Kit
  // returns text candidates asynchronously; no hand-drawn input is uploaded.
  var inkSequence = 0;
  var pendingInkRequests = Object.create(null);
  window.KotobaHandwritingRecognize = function (cells) {
    if (!bridge || typeof bridge.recognizeHandwriting !== 'function')
      return Promise.reject(new Error('handwriting-unavailable'));
    return new Promise(function (resolve, reject) {
      var id = 'kotoba-ink-' + (++inkSequence);
      var timeout = window.setTimeout(function () {
        if (!pendingInkRequests[id]) return;
        delete pendingInkRequests[id];
        reject(new Error('handwriting-timeout'));
      }, 90000);
      pendingInkRequests[id] = { resolve:resolve, reject:reject, timeout:timeout };
      try { bridge.recognizeHandwriting(JSON.stringify({cells:cells}), id); }
      catch (error) {
        window.clearTimeout(timeout);delete pendingInkRequests[id];reject(error);
      }
    });
  };
  window.__kotobaNativeHandwritingEvent = function (id, result) {
    var pending = pendingInkRequests[id];
    if (!pending) return;
    window.clearTimeout(pending.timeout);
    delete pendingInkRequests[id];
    if (result && result.status === 'ok' && Array.isArray(result.texts)) pending.resolve(result);
    else pending.reject(new Error(result && result.code || 'handwriting-failed'));
  };
})();
