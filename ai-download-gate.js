/* Android startup: show an optional game-style additional-data prompt only if the AI model is missing. */
(function () {
  'use strict';
  const SESSION_KEY = 'kotoba_ai_download_prompt_seen_v99';
  let dialog = null;

  function dismiss() {
    if (dialog) dialog.remove();
    dialog = null;
  }

  function maybeShow() {
    if (dialog || !window.KotobaLocalAI || typeof window.KotobaLocalAI.hasModel !== 'function') return;
    try {
      if (sessionStorage.getItem(SESSION_KEY) === '1' || window.KotobaLocalAI.hasModel()) return;
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch (error) {
      // If storage is unavailable, the model-presence check still prevents needless prompts.
      try { if (window.KotobaLocalAI.hasModel()) return; } catch (ignored) { return; }
    }

    dialog = document.createElement('div');
    dialog.className = 'ai-download-gate';
    dialog.id = 'aiDownloadGate';
    dialog.innerHTML =
      '<section class="ai-download-gate-card" role="dialog" aria-modal="true" aria-labelledby="aiDownloadTitle" aria-describedby="aiDownloadDescription">' +
      '<div class="ai-download-gate-icon" aria-hidden="true">📦</div>' +
      '<p class="ai-download-gate-kicker">ことばクエスト 追加データ</p>' +
      '<h2 id="aiDownloadTitle">ダウンロードするデータがあります</h2>' +
      '<p id="aiDownloadDescription">AI会話を使うための無料データ（約347MB）です。Wi-Fiでのダウンロードをおすすめします。あとで取得することもできます。</p>' +
      '<div class="ai-download-gate-info"><span>🤖 端末内AI会話</span><strong>AI利用料 0円</strong></div>' +
      '<progress id="aiDownloadProgress" max="100" value="0" hidden aria-label="ダウンロードの進捗"></progress>' +
      '<p class="ai-download-gate-status" id="aiDownloadStatus" role="status" aria-live="polite">必要なデータがまだ保存されていません。</p>' +
      '<div class="ai-download-gate-actions"><button type="button" id="aiDownloadStart">ダウンロードする</button><button type="button" id="aiDownloadLater">あとで</button></div>' +
      '<p class="ai-download-gate-footnote">AIデータを保存済みの場合、この案内は表示されません。</p>' +
      '</section>';
    document.body.appendChild(dialog);
    const start = document.getElementById('aiDownloadStart');
    const later = document.getElementById('aiDownloadLater');
    const status = document.getElementById('aiDownloadStatus');
    const progress = document.getElementById('aiDownloadProgress');
    later.addEventListener('click', dismiss);
    start.addEventListener('click', function () {
      if (start.dataset.completed === '1') { dismiss(); return; }
      start.disabled = true;
      progress.hidden = false;
      status.textContent = 'ダウンロードを準備しています…';
      later.textContent = '画面を閉じる（ダウンロードは続行）';
      try { window.KotobaLocalAI.downloadModel(); }
      catch (error) {
        status.textContent = '開始できませんでした。もう一度お試しください。';
        start.disabled = false;
        later.textContent = 'あとで';
      }
    });
    start.focus();
  }

  window.addEventListener('kotoba-native-ai-status', function (event) {
    if (!dialog) return;
    const message = String(event.detail && event.detail.message || '');
    const status = document.getElementById('aiDownloadStatus');
    const start = document.getElementById('aiDownloadStart');
    const later = document.getElementById('aiDownloadLater');
    const progress = document.getElementById('aiDownloadProgress');
    if (!status || !start || !later || !progress) return;
    status.textContent = message;
    const match = message.match(/(\d+)%/);
    if (match) { progress.hidden = false; progress.value = Math.min(100, Number(match[1])); }
    if (/ダウンロードが完了|すでに保存済み/.test(message)) {
      progress.hidden = false;
      progress.value = 100;
      start.disabled = false;
      start.textContent = 'はじめる';
      start.dataset.completed = '1';
      later.hidden = true;
    } else if (/失敗|不足|できません/.test(message)) {
      start.disabled = false;
      start.textContent = 'もう一度試す';
      later.textContent = 'あとで';
    }
  });
  window.addEventListener('kotoba-profile-ready', maybeShow);
  window.KotobaAIDownloadGate = {maybeShow: maybeShow};
})();
