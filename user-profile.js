/* ==========================================================
 * ことばクエスト V62 ユーザー設定
 * 記録用の表示名と任意の管理番号を端末内に保存します。
 * ========================================================== */
(function () {
  'use strict';
  var STORAGE_KEY = 'kotobaquest_user_profile_v1';
  var returnTo = 'titleScreen';
  var setupMode = 'first';
  function $(id) { return document.getElementById(id); }
  function loadProfile() {
    try {
      var parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      return parsed && typeof parsed === 'object' ? parsed : null;
    } catch (e) { return null; }
  }
  function hasProfile() {
    var p = loadProfile();
    return !!(p && p.profileId && String(p.displayName || '').trim());
  }
  function createId() {
    var date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    return 'KQ-' + date + '-' + Math.random().toString(36).slice(2, 8).toUpperCase();
  }
  function getCurrent() {
    var p = loadProfile();
    if (!p) return { profileId: 'unconfigured', displayName: '未設定', recordCode: '', createdAt: '', updatedAt: '' };
    return {
      profileId: String(p.profileId || 'unconfigured'),
      displayName: String(p.displayName || '未設定'),
      recordCode: String(p.recordCode || ''),
      createdAt: String(p.createdAt || ''),
      updatedAt: String(p.updatedAt || '')
    };
  }
  function safeShow(id) {
    document.querySelectorAll('.screen').forEach(function (screen) { screen.classList.remove('active'); });
    var el = $(id);
    if (el) el.classList.add('active');
    window.scrollTo(0, 0);
  }
  function refreshSummaries() {
    var p = getCurrent();
    var summary = hasProfile()
      ? '記録対象：' + p.displayName + (p.recordCode ? ' ／ 管理番号：' + p.recordCode : '')
      : 'ユーザー設定はまだ完了していません。初回起動時に設定してください。';
    var settings = $('settingsUserProfileSummary');
    if (settings) settings.textContent = summary + (hasProfile() ? ' ／ 記録・Excelに反映されます。' : '');
    var records = $('recordsUserSummary');
    if (records) records.textContent = summary + '。新しい記録には、この設定を保存します。';
  }
  function openSetup(mode) {
    setupMode = mode === 'settings' ? 'settings' : 'first';
    returnTo = setupMode === 'settings' ? 'settings' : 'titleScreen';
    var p = getCurrent();
    var nameInput = $('setupUserDisplayName');
    var codeInput = $('setupUserRecordCode');
    if (nameInput) nameInput.value = hasProfile() && p.displayName !== '未設定' ? p.displayName : '';
    if (codeInput) codeInput.value = p.recordCode || '';
    var heading = $('userSetupHeading');
    var intro = $('userSetupIntro');
    var saveBtn = $('saveUserProfileBtn');
    var guestBtn = $('guestUserProfileBtn');
    var cancelBtn = $('cancelUserProfileBtn');
    var status = $('userProfileStatus');
    if (heading) heading.textContent = setupMode === 'settings' ? 'ユーザー設定を編集' : 'はじめてのユーザー設定';
    if (intro) intro.textContent = setupMode === 'settings'
      ? '記録用の表示名や管理番号を変更できます。新しい記録とExcel出力に反映されます。過去の記録には、実施時点の情報が残ります。'
      : 'トレーニング記録やExcel出力に使う表示名を設定します。あとから「設定」画面で変更できます。';
    if (saveBtn) saveBtn.textContent = setupMode === 'settings' ? '保存して設定へ戻る' : '設定を保存して始める';
    if (guestBtn) guestBtn.hidden = setupMode !== 'first';
    if (cancelBtn) cancelBtn.hidden = setupMode !== 'settings';
    if (status) status.textContent = '';
    safeShow('userSetup');
    if (nameInput) window.setTimeout(function () { nameInput.focus(); }, 0);
  }
  function persist(displayName, recordCode) {
    var old = loadProfile();
    var now = new Date().toISOString();
    var name = String(displayName || '').trim().slice(0, 60);
    var code = String(recordCode || '').trim().slice(0, 40);
    if (!name) return { ok: false, message: '記録に表示する名前を入力してください。' };
    var p = {
      version: 1,
      profileId: old && old.profileId ? String(old.profileId) : createId(),
      displayName: name,
      recordCode: code,
      createdAt: old && old.createdAt ? old.createdAt : now,
      updatedAt: now
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
      refreshSummaries();
      return { ok: true, profile: p };
    } catch (e) {
      return { ok: false, message: '保存できませんでした。ブラウザーの保存設定や空き容量を確認してください。' };
    }
  }
  function finishSetup() {
    var name = $('setupUserDisplayName');
    var code = $('setupUserRecordCode');
    var result = persist(name ? name.value : '', code ? code.value : '');
    var status = $('userProfileStatus');
    if (!result.ok) {
      if (status) status.textContent = result.message;
      if (name) name.focus();
      return;
    }
    safeShow(returnTo);
    refreshSummaries();
    if (setupMode === 'first') window.dispatchEvent(new Event('kotoba-profile-ready'));
  }
  function startAsGuest() {
    var code = $('setupUserRecordCode');
    var result = persist('ゲストユーザー', code ? code.value : '');
    var status = $('userProfileStatus');
    if (!result.ok) { if (status) status.textContent = result.message; return; }
    safeShow('titleScreen');
    refreshSummaries();
    window.dispatchEvent(new Event('kotoba-profile-ready'));
  }
  function cancelSetup() { safeShow('settings'); refreshSummaries(); }
  function init() {
    var form = $('userProfileForm');
    if (form) form.addEventListener('submit', function (event) { event.preventDefault(); finishSetup(); });
    var guest = $('guestUserProfileBtn');
    if (guest) guest.addEventListener('click', startAsGuest);
    var cancel = $('cancelUserProfileBtn');
    if (cancel) cancel.addEventListener('click', cancelSetup);
    var edit = $('editUserProfileBtn');
    if (edit) edit.addEventListener('click', function () { openSetup('settings'); });
    refreshSummaries();
  }
  window.KotobaQuestUserProfile = {
    getCurrent: getCurrent,
    hasProfile: hasProfile,
    openSetup: openSetup,
    refreshSummaries: refreshSummaries
  };
  init();
})();
