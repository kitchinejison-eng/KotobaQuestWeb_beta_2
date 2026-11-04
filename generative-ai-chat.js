/* V103: five-question AI conversation quiz. Real local LLM provides optional hints;
 * correctness and progression are deterministic, accessible, and offline. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const native = () => !!(window.KotobaLocalAI && typeof window.KotobaLocalAI.ask === 'function');
  const pendingNative = new Map();
  let sequence = 0, quizEpoch = 0, busy = false, engine = null, loading = null;
  let quizRecognition = null;

  function note(message) {
    const el = $('genAIstatus');
    if (!el) return;
    el.textContent = String(message || '').slice(0, 300);
    el.hidden = !el.textContent;
  }
  function bubble(who, message) {
    const log = $('genAIlog');
    if (!log) return null;
    const el = document.createElement('div');
    el.className = 'local-ai-chat-message ' + (who === 'user' ? 'user' : 'assistant');
    const title = document.createElement('span');
    title.textContent = who === 'user' ? 'あなた' : 'クイズガイド';
    const body = document.createElement('p');
    body.textContent = message;
    el.append(title, body);
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
    return body;
  }
  function normalizeAnswer(value) {
    return String(value || '').normalize('NFKC').toLowerCase()
      .replace(/[\u30a1-\u30f6]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60))
      .replace(/[\s\u3000。、！？!?.・]/g, '');
  }
  function isCorrect(question, response) {
    const input = normalizeAnswer(response);
    if (!input || input.length > 70) return false;
    return [question.answer].concat(question.aliases || []).some(answer => {
      const target = normalizeAnswer(answer);
      if (!target) return false;
      if (input === target) return true;
      // Accept short natural replies such as 「傘です」「かさだと思う」.
      return input.startsWith(target) && input.length <= target.length + 8 &&
        /^(です|だよ|だ|かな|だと思う|だと思います|を使う|を使います|ですね|ですか)$/.test(input.slice(target.length));
    });
  }
  function setBusy(value) {
    busy = value;
    for (const id of ['genAIsend', 'genAImic', 'genAIhint', 'genAIreset']) {
      const button = $(id);
      if (button) button.disabled = value;
    }
  }
  function errText(error) { return error && error.message ? error.message : String(error); }

  // Used by the Kotlin WebView bridge and by the startup-only download gate.
  window.__kotobaNativeAIResponse = function (id, success, response) {
    const item = pendingNative.get(Number(id));
    if (!item) return;
    pendingNative.delete(Number(id));
    if (success) item.resolve(response);
    else item.reject(new Error(response));
  };
  window.__kotobaNativeAIChunk = function (id, text) {
    const item = pendingNative.get(Number(id));
    if (item && item.onChunk) item.onChunk(String(text || ''));
  };
  window.__kotobaNativeAIStatus = function (message) {
    const text = String(message || '');
    if (busy) note(text);
    window.dispatchEvent(new CustomEvent('kotoba-native-ai-status', {detail:{message:text}}));
  };
  function nativeAsk(text, onChunk) {
    return new Promise((resolve, reject) => {
      const id = ++sequence;
      const timer = setTimeout(() => {
        pendingNative.delete(id);
        reject(new Error('端末内AIのヒントが20秒以内に返らなかったため、通常のヒントを使います。'));
      }, 20000);
      pendingNative.set(id, {
        onChunk,
        resolve: value => { clearTimeout(timer); resolve(value); },
        reject: error => { clearTimeout(timer); reject(error); }
      });
      try { window.KotobaLocalAI.ask(text, id); }
      catch (error) { pendingNative.delete(id); clearTimeout(timer); reject(error); }
    });
  }
  async function webEngine() {
    if (engine) return engine;
    if (loading) return loading;
    loading = (async () => {
      if (!window.isSecureContext || !navigator.gpu) throw new Error('WebGPUまたはHTTPSに対応していません。');
      const pkg = await import('https://esm.run/@mlc-ai/web-llm@0.2.87');
      const model = pkg.prebuiltAppConfig.model_list.find(x => /Qwen2(?:\.5)?-0\.5B-Instruct.*q4f16/i.test(x.model_id));
      if (!model) throw new Error('Web版の対応AIモデルを取得できませんでした。');
      engine = await pkg.CreateMLCEngine(model.model_id, {initProgressCallback: p => note(p.text || 'AIを準備中…')});
      return engine;
    })();
    try { return await loading; } catch (error) { loading = null; throw error; }
  }

  async function requestHint(question, epoch) {
    if (busy) return;
    const fallback = 'ヒント：' + (question.hint || '問題をもう一度読んでみましょう。');
    const modelReady = native() && (!window.KotobaLocalAI.hasModel || window.KotobaLocalAI.hasModel());
    if (native() && !modelReady) { bubble('assistant', fallback); note('AIデータがないため通常のヒントを表示しています。'); return; }
    const hintButton = $('genAIhint');
    if (hintButton.disabled) return;
    hintButton.disabled = true;
    // Give the learner an immediate, reliable hint. The optional AI refinement
    // should never block answering or automatic progression.
    const output = bubble('assistant', fallback);
    note('AIも追加のヒントを考えています。待たずに答えて大丈夫です。');
    try {
      const prompt = 'あなたは日本語のことばクイズのヒント役です。' +
        '問題は「' + question.question + '」、答えは「' + question.answer + '」です。' +
        '正解の単語を絶対に書かず、やさしい日本語で1文だけヒントを出してください。前置きや謝罪は不要です。';
      let generated;
      if (native()) generated = await nativeAsk(prompt);
      else {
        const web = await webEngine();
        const result = await web.chat.completions.create({messages:[
          {role:'system',content:'日本語で短いヒントだけを返してください。正解は書かないでください。'},
          {role:'user',content:prompt}
        ],temperature:0.7,max_tokens:75});
        generated = result.choices?.[0]?.message?.content || '';
      }
      if (epoch !== quizEpoch) return;
      generated = String(generated || '').trim();
      const normalized = normalizeAnswer(generated);
      const exposesAnswer = [question.answer].concat(question.aliases || []).some(a =>
        normalizeAnswer(a).length >= 1 && normalized.includes(normalizeAnswer(a)));
      // Tiny models may reveal the answer or produce unrelated long boilerplate.
      output.textContent = !generated || generated.length > 90 || exposesAnswer || /ご不明な点|ご相手/.test(generated)
        ? fallback : 'AIのヒント：' + generated;
      note('');
    } catch (error) {
      if (epoch === quizEpoch) {
        output.textContent = fallback;
        note('AIが応答しなかったため、通常のヒントを表示しました。');
        console.warn('[KotobaQuest quiz hint]', errText(error));
      }
    } finally {
      if (epoch === quizEpoch && !busy) hintButton.disabled = false;
    }
  }

  function stopQuizRecognition() {
    if (!quizRecognition) return;
    const old = quizRecognition;
    quizRecognition = null;
    try { old.abort(); } catch (ignored) {}
  }

  async function startQuizRecognition(question, epoch) {
    if (busy || epoch !== quizEpoch) return;
    if (quizRecognition) {
      try { quizRecognition.stop(); } catch (error) { stopQuizRecognition(); }
      return;
    }
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      note('この端末は音声認識に対応していません。マイクの設定と音声認識サービスを確認してください。');
      return;
    }
    const button = $('genAImic');
    const field = $('genAIinput');
    button.disabled = true;
    button.textContent = '🎤 マイクを準備中…';
    try {
      if (typeof window.requestMicrophoneAccess === 'function') await window.requestMicrophoneAccess();
      if (epoch !== quizEpoch) return;
      const recognition = new Recognition();
      quizRecognition = recognition;
      recognition.lang = 'ja-JP';
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 5;
      recognition.onstart = () => {
        if (epoch !== quizEpoch) return;
        button.disabled = false;
        button.textContent = '🎤 聞き取りを終了';
        note('話してください。答えを聞き取っています…');
      };
      recognition.onresult = event => {
        if (epoch !== quizEpoch || busy) return;
        const results = event && event.results;
        if (!results || !results.length) return;
        const current = results[results.length - 1];
        const alternatives = [];
        for (let i = 0; i < current.length; i++) {
          const text = current[i] && current[i].transcript;
          if (text) alternatives.push(String(text).trim());
        }
        if (!alternatives.length) return;
        const matching = alternatives.find(text => isCorrect(question, text));
        field.value = matching || alternatives[0];
        if (current.isFinal) {
          if (matching) {
            note('「' + matching + '」と認識しました。正解です！');
            stopQuizRecognition();
            const send = $('genAIsend');
            if (send) send.click();
          } else {
            note('「' + field.value + '」と認識しました。確認して答えるか、もう一度マイクで話してください。');
          }
        }
      };
      recognition.onerror = event => {
        if (epoch !== quizEpoch) return;
        const code = event && event.error || 'unknown';
        if (code === 'aborted') return;
        const message = code === 'not-allowed' ? 'マイクが許可されていません。Androidのアプリ設定で許可してください。' :
          code === 'service-not-allowed' ? '音声認識サービスが見つかりません。Googleの音声認識サービスを確認してください。' :
          code === 'no-speech' ? '音声が聞き取れませんでした。もう一度お試しください。' :
          '音声認識エラー：' + code;
        note(message);
      };
      recognition.onend = () => {
        if (quizRecognition === recognition) quizRecognition = null;
        if (epoch !== quizEpoch || busy) return;
        button.disabled = false;
        button.textContent = '🎤 マイクで答える';
      };
      recognition.start();
    } catch (error) {
      if (epoch === quizEpoch) {
        note('マイクを開始できませんでした。アプリのマイク許可を確認してください。' + (error && error.name || ''));
        button.disabled = false;
        button.textContent = '🎤 マイクで答える';
      }
      quizRecognition = null;
    }
  }

  function render(question) {
    const area = $('answerArea');
    if (!area || !question) return;
    const epoch = ++quizEpoch;
    stopQuizRecognition();
    busy = false;
    area.textContent = '';
    const panel = document.createElement('div');
    panel.className = 'ai-conversation-panel';
    panel.innerHTML =
      '<div class="ai-test-badge">🤖 AI会話クイズ</div>' +
      '<p class="ai-note" id="genAIquizProgress">第' + (question.quizNumber || 1) + '問 / ' + (question.quizTotal || 5) + '問</p>' +
      '<p>答えを入力してください。正解したら自動で次へ進みます。まちがえても何度でも挑戦できます。</p>' +
      '<div id="genAIlog" class="local-ai-chat-log" aria-live="polite"></div>' +
      '<label for="genAIinput">あなたの答え</label>' +
      '<textarea id="genAIinput" class="ai-response-input" rows="2" placeholder="こたえを入力"></textarea>' +
      '<div class="ai-response-buttons">' +
        '<button type="button" id="genAIsend" class="voice-start-btn">こたえる</button>' +
        '<button type="button" id="genAImic" class="voice-mic-check-btn">🎤 マイクで答える</button>' +
        '<button type="button" id="genAIhint" class="voice-example-btn">🤖 AIにヒントを聞く</button>' +
        '<button type="button" id="genAIreset" class="voice-example-btn">5問をやりなおす</button>' +
      '</div>' +
      '<div id="genAIstatus" class="voice-test-status" role="status" hidden></div>' +
      '<p class="ai-note">AIは追加ヒントを作ります。採点は正解の言葉と表記違いで確認します。</p>';
    area.appendChild(panel);
    bubble('assistant', '第' + (question.quizNumber || 1) + '問。' + question.question);
    if (native()) try { window.KotobaLocalAI.reset(); } catch (error) { console.warn(errText(error)); }
    const field = $('genAIinput');
    const send = $('genAIsend');
    send.onclick = () => {
      if (busy || epoch !== quizEpoch) return;
      const answer = field.value.trim();
      if (!answer) { note('答えを入力してください。'); return; }
      field.value = '';
      bubble('user', answer);
      if (isCorrect(question, answer)) {
        // Android keyboard focus can force WebView back down after a page jump.
        if (typeof field.blur === 'function') field.blur();
        bubble('assistant', '正解です！ つぎの問題へ進みます。');
        note('正解！ 自動で次へ進みます。');
        setBusy(true);
        const accepted = window.KotobaAIQuizBridge && window.KotobaAIQuizBridge.correct();
        if (!accepted) { setBusy(false); note('進行できませんでした。画面を開き直してください。'); }
      } else {
        bubble('assistant', 'おしいです。もう一度考えてみましょう。');
        note('まちがえても大丈夫です。ヒントを使って、もう一度答えましょう。');
        if (typeof field.focus === 'function') field.focus();
      }
    };
    field.addEventListener('keydown', event => {
      if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); send.click(); }
    });
    $('genAIhint').onclick = () => { if (!busy) requestHint(question, epoch); };
    $('genAImic').onclick = () => { startQuizRecognition(question, epoch); };
    $('genAIreset').onclick = () => {
      if (busy) return;
      if (window.KotobaAIQuizBridge && window.KotobaAIQuizBridge.restart) window.KotobaAIQuizBridge.restart();
    };
  }
  window.renderOfflineAIConversation = render;
  window.KotobaGenerativeAI = {render, initialize:webEngine, isCorrect, normalizeAnswer};
  window.KotobaAIQuizStopMicrophone = stopQuizRecognition;
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopQuizRecognition(); });
  window.addEventListener('pagehide', stopQuizRecognition);
})();
