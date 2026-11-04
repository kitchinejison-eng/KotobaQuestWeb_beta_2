/* ことばクエスト｜発音トレーニング Ver.60
 * 発音部位・調音方法・練習形式を切り替え、共通トレーニング記録と達成度を連動して保存します。
 * 自己確認の記録は、医学的な構音評価や発音の正確性判定ではありません。
 */
(function () {
  'use strict';
  if (window.__pronunciationTrainingInstalled) return;
  window.__pronunciationTrainingInstalled = true;

  var STORAGE_KEY = 'kotobaquest_pronunciation_progress_v1';
  var PLACE_CATEGORIES = [
    { id: 'bilabial', name: '両唇音', kana: 'パ・バ・マ行', note: '上下のくちびるを使う音。例：ぱ・ば・ま。', countLabel: '日本語の基本練習' },
    { id: 'labiodental', name: '唇歯音', kana: '英語 f・v', note: '上の前歯と下唇を使う音。標準的な日本語の基本音には通常含めず、外国語音の拡張課題として扱います。', countLabel: '拡張用・日本語基本問題なし' },
    { id: 'dental', name: '歯音', kana: '英語 th', note: '舌先を歯の間付近に置く音。英語の th などが代表例で、日本語の基本練習とは分けます。', countLabel: '拡張用・日本語基本問題なし' },
    { id: 'alveolar', name: '歯茎音', kana: 'タ・サ・ナ・ラ・ツなど', note: '舌先・舌端を歯茎付近に近づけて作る音。例：た、さ、な、ら、つ。', countLabel: '日本語の基本練習' },
    { id: 'alveoloPalatal', name: '歯茎硬口蓋音', kana: 'シ・チ・ジ系', note: '「し・ち・じ」など。文献により後部歯茎音／歯茎硬口蓋音の呼び方に幅があるため、基本画面ではまとめて扱います。', countLabel: '日本語の基本練習' },
    { id: 'palatal', name: '硬口蓋付近の音', kana: 'ヤ行・ニ・ヒなど', note: 'ヤ行の接近音や、ニ・ヒなどの口蓋寄りの音。かなの行だけで一律に同じ音とみなさず、例外を説明します。', countLabel: '日本語の基本練習' },
    { id: 'velar', name: '軟口蓋音', kana: 'カ・ガ行', note: '舌の奥を軟口蓋に近づけて作る音。例：か、き、く、け、こ／が行。', countLabel: '日本語の基本練習' },
    { id: 'uvular', name: '口蓋垂音', kana: 'のどの奥の音', note: '口蓋垂付近で作る音。標準的な日本語の基本発音練習には通常含めず、必要な場合だけ別教材にします。', countLabel: '拡張用・日本語基本問題なし' },
    { id: 'glottal', name: '声門音', kana: 'ハ・ヘ・ホなど', note: '声門付近で作る音。ハ行は母音環境で音が変わり、「ひ」は [ç]、「ふ」は [ɸ] に近い音になる点に注意します。', countLabel: '日本語の基本練習' },
    { id: 'vowelSpecial', name: '母音・特殊拍', kana: 'あいうえお・ん・っ・長音', note: '子音の調音位置とは別枠です。母音、撥音「ん」、促音「っ」、長音などを練習します。', countLabel: '別枠の基礎練習' }
  ];

  var MANNER_CATEGORIES = [
    { id: 'plosive', name: '破裂音', kana: 'パ・バ・タ・ダ・カ・ガ', note: 'いったん息の通り道を閉じて、開放します。' },
    { id: 'fricative', name: '摩擦音', kana: 'サ・ザ・シ・ハなど', note: '狭いすき間に息を通して摩擦を作ります。' },
    { id: 'affricate', name: '破擦音', kana: 'ツ・チ・ジなど', note: '閉鎖のあと、摩擦を伴って開放します。' },
    { id: 'nasal', name: '鼻音', kana: 'マ・ナ・ニ・ンなど', note: '鼻へ息を通します。「ん」は後ろの音によって実際の音が変わります。' },
    { id: 'tap', name: 'はじき音', kana: 'ラ行', note: '舌先などが短く一度触れる音。標準的な日本語のラ行は通常はじき音として説明します。' },
    { id: 'approximant', name: '接近音', kana: 'ヤ行・ワなど', note: '発音器官を近づけますが、強い摩擦は作りません。' },
    { id: 'other', name: 'その他・特殊な音', kana: '母音・長音・促音など', note: '母音、長短の違い、モーラ構成など。子音の調音方法と分けて扱います。' }
  ];

  var FORMAT_CATEGORIES = [
    { id: 'listen', name: '音を聞いて選ぶ', note: 'お手本を聞いて、合う単語を選択します。' },
    { id: 'syllable', name: '音節・モーラ練習', note: 'かなを区切りながら、1拍ずつ声に出します。' },
    { id: 'word', name: '単語を読む', note: 'ひらがな・単語を見て声に出します。' },
    { id: 'sentence', name: '短い文を読む', note: '単語から短文へ、無理のない速さで練習します。' },
    { id: 'pair', name: '似た音を聞き分ける', note: '2つのお手本を聞き、同じか違うかを選びます。' },
    { id: 'select', name: '音が入る言葉を選ぶ', note: '指定された音が含まれる単語を選びます。' }
  ];

  function uniq(arr) {
    var out = [];
    (arr || []).forEach(function (x) { if (x && out.indexOf(x) < 0) out.push(x); });
    return out;
  }
  function safeText(value) { return String(value == null ? '' : value); }
  function currentUserProfile() {
    try {
      if (window.KotobaQuestUserProfile && typeof window.KotobaQuestUserProfile.getCurrent === 'function') {
        return window.KotobaQuestUserProfile.getCurrent();
      }
    } catch (e) {}
    return { profileId: 'unconfigured', displayName: '未設定', recordCode: '' };
  }
  function esc(value) {
    return safeText(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function loadState() {
    var saved = null;
    try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); } catch (e) {}
    if (!saved || saved.version !== 1) saved = { version: 1, taxonomy: {}, items: {}, reviewIds: [], history: [], practiceLog: [] };
    if (!saved.taxonomy) saved.taxonomy = {};
    if (!saved.items) saved.items = {};
    if (!saved.reviewIds) saved.reviewIds = [];
    if (!saved.history) saved.history = [];
    if (!saved.practiceLog) saved.practiceLog = [];
    return saved;
  }
  var state = loadState();
  if (!state.practiceLog) state.practiceLog = [];
  function saveState() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {} }
  function metric(id) {
    if (!state.taxonomy[id]) state.taxonomy[id] = { attempts: 0, correct: 0, incorrect: 0, sessions: 0, previousSessionPct: null, lastSessionPct: null };
    return state.taxonomy[id];
  }
  function itemMetric(id) {
    if (!state.items[id]) state.items[id] = { attempts: 0, correct: 0, incorrect: 0 };
    return state.items[id];
  }
  function pct(m) { return m && m.attempts ? Math.round(m.correct * 100 / m.attempts) : null; }
  function rank(value) {
    if (value === null || value === undefined) return '記録なし';
    if (value >= 90) return 'よくできました';
    if (value >= 80) return 'あと少し';
    if (value >= 60) return 'もう一度練習';
    return '基礎から練習';
  }
  function getQuestion(source, index) {
    try { return window.QUESTIONS && window.QUESTIONS[source] ? window.QUESTIONS[source][index] : null; } catch (e) { return null; }
  }
  function makeLegacy(spec) {
    var q = getQuestion(spec.source, spec.index);
    if (!q) return null;
    var out = {
      id: spec.id,
      origin: '既存問題：' + spec.source + '[' + (spec.index + 1) + ']',
      source: spec.source,
      type: spec.type || 'self',
      format: spec.format,
      place: uniq(spec.place),
      manner: uniq(spec.manner),
      prompt: spec.prompt || q.question || '声に出して練習しましょう。',
      display: spec.display || q.prompt || q.voiceText || q.answer || '',
      target: spec.target || q.voiceText || (spec.source === 'mouth' ? (spec.display || '') : q.prompt || q.answer || ''),
      audioText: spec.audioText || q.voiceText || q.answer || q.prompt || '',
      choices: spec.choices || q.choices || [],
      answer: spec.answer || q.answer || '',
      reviewNote: spec.reviewNote || ''
    };
    if (spec.type === 'listen') {
      out.target = spec.target || q.answer || q.voiceText || '';
      out.audioText = out.target;
      out.choices = spec.choices || q.choices || [];
      out.answer = spec.answer || q.answer || '';
    }
    if (spec.type === 'pair') {
      out.a = spec.a; out.b = spec.b; out.answer = spec.answer;
    }
    return out;
  }

  /* 既存問題は出典を残し、問題形式と音のタグを付けて再利用します。 */
  var LEGACY_SPECS = [
    { id:'legacy_sound_1', source:'sound', index:0, type:'choice', format:'select', prompt:'「と」の音が入る言葉を選びましょう。', display:'目標の音：と', place:['alveolar','velar'], manner:['plosive'], reviewNote:'「とけい」は「と」の音で始まります。' },
    { id:'legacy_sound_2', source:'sound', index:1, type:'choice', format:'select', prompt:'「か」の音が入る言葉を選びましょう。', display:'目標の音：か', place:['velar','alveolar'], manner:['plosive','fricative'], reviewNote:'「かさ」は「か」の音で始まります。' },
    { id:'legacy_sound_3', source:'sound', index:2, type:'choice', format:'select', prompt:'「ら」の音が入る言葉を選びましょう。', display:'目標の音：ら', place:['alveolar','velar'], manner:['fricative','plosive','tap'], reviewNote:'「さくら」には「ら」の音があります。' },
    { id:'legacy_repeat_1', source:'repeat', index:0, type:'self', format:'word', display:'りんご', place:['alveolar','velar'], manner:['tap','nasal','plosive'] },
    { id:'legacy_repeat_2', source:'repeat', index:1, type:'self', format:'word', display:'ありがとう', place:['alveolar','velar'], manner:['tap','plosive'] },
    { id:'legacy_repeat_3', source:'repeat', index:2, type:'self', format:'sentence', display:'おはようございます', place:['glottal','alveolar','velar'], manner:['fricative','plosive','nasal'] },
    { id:'legacy_repeat_4', source:'repeat', index:3, type:'self', format:'sentence', display:'コーヒーください', place:['velar','glottal','alveolar'], manner:['plosive','fricative'] },
    { id:'legacy_mouth_1', source:'mouth', index:0, type:'self', format:'syllable', display:'あ・い・う・え・お', target:'あ、い、う、え、お', place:['vowelSpecial'], manner:['other'] },
    { id:'legacy_mouth_2', source:'mouth', index:1, type:'self', format:'syllable', display:'あ・い・う・え・お', target:'あ、い、う、え、お', place:['vowelSpecial'], manner:['other'] },
    { id:'legacy_voiceRead_1', source:'voiceRead', index:0, type:'self', format:'word', display:'りんご', place:['alveolar','velar'], manner:['tap','nasal','plosive'] },
    { id:'legacy_voiceRead_2', source:'voiceRead', index:1, type:'self', format:'word', display:'コーヒー', place:['velar','glottal'], manner:['plosive','fricative'] },
    { id:'legacy_voiceRead_3', source:'voiceRead', index:2, type:'self', format:'word', display:'さくら', place:['alveolar','velar'], manner:['fricative','plosive','tap'] },
    { id:'legacy_voiceRead_4', source:'voiceRead', index:3, type:'self', format:'word', display:'ありがとう', place:['alveolar','velar'], manner:['tap','plosive'] },
    { id:'legacy_voiceRead_5', source:'voiceRead', index:4, type:'self', format:'sentence', display:'おはようございます', place:['glottal','alveolar','velar'], manner:['fricative','plosive','nasal'] },
    { id:'legacy_voiceRead_6', source:'voiceRead', index:5, type:'self', format:'sentence', display:'コーヒーください', place:['velar','glottal','alveolar'], manner:['plosive','fricative'] },
    { id:'legacy_voiceRead_7', source:'voiceRead', index:6, type:'self', format:'sentence', display:'今日は晴れです', place:['glottal','alveolar','velar'], manner:['fricative','plosive','tap'] },
    { id:'legacy_voiceRead_8', source:'voiceRead', index:7, type:'self', format:'sentence', display:'手を洗います', place:['alveolar','bilabial'], manner:['plosive','tap','fricative','nasal'] },
    { id:'legacy_stepup_1', source:'stepup', index:0, type:'self', format:'sentence', display:'単語：りんご → 短文：りんごを食べます。', target:'りんご。りんごを食べます。', place:['alveolar','velar','bilabial'], manner:['tap','nasal','plosive','fricative'] },
    { id:'legacy_stepup_2', source:'stepup', index:1, type:'self', format:'sentence', display:'単語：さくら → 短文：さくらが咲いています。', target:'さくら。さくらが咲いています。', place:['alveolar','velar'], manner:['fricative','plosive','tap'] },
    { id:'legacy_mora_1', source:'mora', index:0, type:'self', format:'syllable', display:'さ・く・ら', target:'さくら', place:['alveolar','velar'], manner:['fricative','plosive','tap'] },
    { id:'legacy_mora_2', source:'mora', index:1, type:'self', format:'syllable', display:'り・ん・ご', target:'りんご', place:['alveolar','velar'], manner:['tap','nasal','plosive'] },
    { id:'legacy_mora_3', source:'mora', index:2, type:'self', format:'syllable', display:'ひ・ま・わ・り', target:'ひまわり', place:['palatal','bilabial','alveolar'], manner:['fricative','nasal','approximant','tap'] },
    { id:'legacy_mora_4', source:'mora', index:3, type:'self', format:'syllable', display:'た・ん・ぽ・ぽ', target:'たんぽぽ', place:['alveolar','bilabial'], manner:['plosive','nasal'] },
    { id:'legacy_mora_5', source:'mora', index:4, type:'self', format:'syllable', display:'え・ん・ぴ・つ', target:'えんぴつ', place:['alveolar','bilabial'], manner:['plosive','nasal','affricate'] },
    { id:'legacy_mora_6', source:'mora', index:5, type:'self', format:'syllable', display:'た・ま・ご', target:'たまご', place:['alveolar','bilabial','velar'], manner:['plosive','nasal'] },
    { id:'legacy_mora_7', source:'mora', index:6, type:'self', format:'syllable', display:'く・る・ま', target:'くるま', place:['velar','alveolar','bilabial'], manner:['plosive','tap','nasal'] },
    { id:'legacy_mora_8', source:'mora', index:7, type:'self', format:'syllable', display:'パ・ン', target:'パン', place:['bilabial','alveolar'], manner:['plosive','nasal'] },
    { id:'legacy_mora_9', source:'mora', index:8, type:'self', format:'syllable', display:'か・さ', target:'かさ', place:['velar','alveolar'], manner:['plosive','fricative'] },
    { id:'legacy_mora_10', source:'mora', index:9, type:'self', format:'syllable', display:'テ・レ・ビ', target:'テレビ', place:['alveolar','bilabial'], manner:['plosive','tap'] },
    { id:'legacy_accent_1', source:'accent', index:0, type:'self', format:'word', display:'さくら', place:['alveolar','velar'], manner:['fricative','plosive','tap'], reviewNote:'アクセント（声の高さ）は調音位置・調音方法とは別の練習要素です。' },
    { id:'legacy_accent_2', source:'accent', index:1, type:'self', format:'word', display:'ひまわり', place:['palatal','bilabial','alveolar'], manner:['fricative','nasal','approximant','tap'], reviewNote:'アクセント（声の高さ）は調音位置・調音方法とは別の練習要素です。' },
    { id:'legacy_sentenceRhythm_1', source:'sentenceRhythm', index:0, type:'self', format:'sentence', display:'お昼を食べます。', place:['alveolar','bilabial'], manner:['plosive','nasal','fricative'] },
    { id:'legacy_sentenceRhythm_2', source:'sentenceRhythm', index:1, type:'self', format:'sentence', display:'きのう買い物に行きました。', place:['velar','alveolar','bilabial'], manner:['plosive','nasal','fricative','tap'] },
    { id:'legacy_listen_1', source:'listen', index:0, type:'listen', format:'listen', display:'お手本を聞いて、聞こえた言葉を選びましょう。', place:['alveolar','velar'], manner:['tap','nasal','plosive'] },
    { id:'legacy_listen_2', source:'listen', index:1, type:'listen', format:'listen', display:'お手本を聞いて、聞こえた言葉を選びましょう。', place:['velar','alveolar'], manner:['plosive'] },
    { id:'legacy_listen_3', source:'listen', index:2, type:'listen', format:'listen', display:'お手本を聞いて、聞こえた言葉を選びましょう。', place:['alveolar','velar'], manner:['plosive','nasal'] }
  ];

  var NEW_EXERCISES = [
    { id:'new_vowels', origin:'新規追加', type:'self', format:'syllable', prompt:'母音を順番に、口の形を変えながら言ってみましょう。', display:'あ・い・う・え・お', target:'あ、い、う、え、お', place:['vowelSpecial'], manner:['other'] },
    { id:'new_bilabial_p', origin:'新規追加', type:'self', format:'syllable', prompt:'上下のくちびるを使って、パ行を練習します。', display:'ぱ・ぴ・ぷ・ぺ・ぽ', target:'ぱ、ぴ、ぷ、ぺ、ぽ', place:['bilabial'], manner:['plosive'] },
    { id:'new_bilabial_b', origin:'新規追加', type:'self', format:'syllable', prompt:'上下のくちびるを使って、バ行を練習します。', display:'ば・び・ぶ・べ・ぼ', target:'ば、び、ぶ、べ、ぼ', place:['bilabial'], manner:['plosive'] },
    { id:'new_bilabial_m', origin:'新規追加', type:'self', format:'syllable', prompt:'鼻へ息を通しながら、マ行を練習します。', display:'ま・み・む・め・も', target:'ま、み、む、め、も', place:['bilabial'], manner:['nasal'] },
    { id:'new_alveolar_t', origin:'新規追加', type:'self', format:'syllable', prompt:'舌先を使い、タ行の音をゆっくり練習します。', display:'た・て・と', target:'た、て、と', place:['alveolar'], manner:['plosive'] },
    { id:'new_alveolar_s', origin:'新規追加', type:'self', format:'syllable', prompt:'息をすき間から出して、サ行を練習します。', display:'さ・す・せ・そ', target:'さ、す、せ、そ', place:['alveolar'], manner:['fricative'] },
    { id:'new_alveolar_n', origin:'新規追加', type:'self', format:'syllable', prompt:'鼻へ息を通しながら、ナ行を練習します。', display:'な・ぬ・ね・の', target:'な、ぬ、ね、の', place:['alveolar'], manner:['nasal'] },
    { id:'new_alveolar_r', origin:'新規追加', type:'self', format:'syllable', prompt:'ラ行は舌先を軽く一度触れさせるイメージで練習します。', display:'ら・り・る・れ・ろ', target:'ら、り、る、れ、ろ', place:['alveolar'], manner:['tap'] },
    { id:'new_alveolo_shi', origin:'新規追加', type:'self', format:'syllable', prompt:'シ系の音をゆっくり練習します。無理に強く息を出さなくて大丈夫です。', display:'し・しゃ・しゅ・しょ', target:'し、しゃ、しゅ、しょ', place:['alveoloPalatal'], manner:['fricative'] },
    { id:'new_alveolo_chi', origin:'新規追加', type:'self', format:'syllable', prompt:'チ系の音は、閉じたあとに摩擦を伴って開く音です。', display:'ち・ちゃ・ちゅ・ちょ', target:'ち、ちゃ、ちゅ、ちょ', place:['alveoloPalatal'], manner:['affricate'] },
    { id:'new_alveolo_ji', origin:'新規追加', type:'self', format:'syllable', prompt:'ジ系の音を、ゆっくり聞いてから練習します。', display:'じ・じゃ・じゅ・じょ', target:'じ、じゃ、じゅ、じょ', place:['alveoloPalatal'], manner:['affricate','fricative'] },
    { id:'new_palatal_y', origin:'新規追加', type:'self', format:'syllable', prompt:'ヤ行の音を、母音につなげるように練習します。', display:'や・ゆ・よ', target:'や、ゆ、よ', place:['palatal'], manner:['approximant'] },
    { id:'new_velar_k', origin:'新規追加', type:'self', format:'syllable', prompt:'舌の奥を使ってカ行を練習します。', display:'か・き・く・け・こ', target:'か、き、く、け、こ', place:['velar'], manner:['plosive'] },
    { id:'new_velar_g', origin:'新規追加', type:'self', format:'syllable', prompt:'舌の奥を使ってガ行を練習します。', display:'が・ぎ・ぐ・げ・ご', target:'が、ぎ、ぐ、げ、ご', place:['velar'], manner:['plosive'] },
    { id:'new_glottal_h', origin:'新規追加', type:'self', format:'syllable', prompt:'ハ・ヘ・ホを、のどに力を入れすぎず練習します。', display:'は・へ・ほ', target:'は、へ、ほ', place:['glottal'], manner:['fricative'] },
    { id:'new_word_pan', origin:'新規追加', type:'self', format:'word', prompt:'単語を見て、ゆっくり声に出してみましょう。', display:'パン', target:'パン', place:['bilabial','alveolar'], manner:['plosive','nasal'] },
    { id:'new_word_mame', origin:'新規追加', type:'self', format:'word', prompt:'単語を見て、マ行の鼻音を意識してみましょう。', display:'まめ', target:'まめ', place:['bilabial'], manner:['nasal'] },
    { id:'new_word_sakana', origin:'新規追加', type:'self', format:'word', prompt:'単語を見て、サ行とカ行の音を意識してみましょう。', display:'さかな', target:'さかな', place:['alveolar','velar'], manner:['fricative','plosive'] },
    { id:'new_word_tsuki', origin:'新規追加', type:'self', format:'word', prompt:'「つ」は破擦音の練習例です。', display:'つき', target:'つき', place:['alveolar','velar'], manner:['affricate','plosive'] },
    { id:'new_word_chizu', origin:'新規追加', type:'self', format:'word', prompt:'チ系の音を含む単語を読んでみましょう。', display:'ちず', target:'ちず', place:['alveoloPalatal'], manner:['affricate'] },
    { id:'new_word_hana', origin:'新規追加', type:'self', format:'word', prompt:'ハ行とな行の音を意識して読みます。', display:'はな', target:'はな', place:['glottal','alveolar'], manner:['fricative','nasal'] },
    { id:'new_sentence_1', origin:'新規追加', type:'self', format:'sentence', prompt:'単語をつなげて、短い文をゆっくり読みましょう。', display:'パンを食べます。', target:'パンを食べます。', place:['bilabial','alveolar','velar'], manner:['plosive','nasal','fricative'] },
    { id:'new_sentence_2', origin:'新規追加', type:'self', format:'sentence', prompt:'聞きやすい速さで、短い文を読んでみましょう。', display:'さかなを食べます。', target:'さかなを食べます。', place:['alveolar','velar','bilabial'], manner:['fricative','plosive','nasal'] },
    { id:'new_pair_same_kasa', origin:'新規追加', type:'pair', format:'pair', prompt:'2つのお手本を聞いて、同じ言葉か違う言葉か選びましょう。', a:'かさ', b:'かさ', answer:'同じ', place:['velar','alveolar'], manner:['plosive','fricative'] },
    { id:'new_pair_kasa_kata', origin:'新規追加', type:'pair', format:'pair', prompt:'2つのお手本を聞いて、同じ言葉か違う言葉か選びましょう。', a:'かさ', b:'かた', answer:'違う', place:['velar','alveolar'], manner:['plosive','fricative'] },
    { id:'new_pair_kaki_kagi', origin:'新規追加', type:'pair', format:'pair', prompt:'2つのお手本を聞いて、同じ言葉か違う言葉か選びましょう。', a:'かき', b:'かぎ', answer:'違う', place:['velar'], manner:['plosive'] },
    { id:'new_pair_saru_zaru', origin:'新規追加', type:'pair', format:'pair', prompt:'2つのお手本を聞いて、同じ言葉か違う言葉か選びましょう。', a:'さる', b:'ざる', answer:'違う', place:['alveolar'], manner:['fricative'] }
  ];

  function buildBank() {
    var bank = [];
    LEGACY_SPECS.forEach(function (spec) { var q = makeLegacy(spec); if (q) bank.push(q); });
    NEW_EXERCISES.forEach(function (q) { bank.push(q); });
    return bank;
  }

  var screen = null;
  var activeTab = 'places';
  var activeFilter = null;
  var session = null;
  var lastResult = null;
  var bank = [];

  function ensureScreen() {
    if (screen) return screen;
    screen = document.createElement('section');
    screen.id = 'pronunciationTrainingScreen';
    screen.className = 'screen pronunciation-screen';
    screen.setAttribute('aria-label', '発音トレーニング');
    screen.innerHTML = '<div class="pt-wrap">' +
      '<header class="pt-header"><button class="pt-back" id="ptBack" type="button" aria-label="ことばクエストに戻る">← 戻る</button><div><div class="pt-brand">ことばクエスト</div><h1>発音トレーニング</h1></div><span class="pt-head-icon" aria-hidden="true">👄</span></header>' +
      '<div id="ptMain"></div>' +
      '<p class="pt-safety-note">この記録は練習の目安です。本人の自己確認や選択結果を保存するもので、医学的な発音能力の評価・診断ではありません。</p>' +
      '</div>';
    document.body.appendChild(screen);
    screen.querySelector('#ptBack').addEventListener('click', function () { closeToApp(); });
    screen.addEventListener('click', onScreenClick);
    return screen;
  }
  function closeToApp() {
    if (window.__showTitleScreen && typeof window.__showTitleScreen === 'function') {
      window.__showTitleScreen();
    } else {
      var all = document.querySelectorAll('.screen');
      Array.prototype.forEach.call(all, function (s) { s.classList.remove('active'); });
      var title = document.getElementById('titleScreen'); if (title) title.classList.add('active');
    }
  }
  function showScreen() {
    var all = document.querySelectorAll('.screen');
    Array.prototype.forEach.call(all, function (s) { s.classList.remove('active'); });
    ensureScreen().classList.add('active');
    if (window.scrollTo) window.scrollTo(0, 0);
  }
  function categoriesFor(filter) {
    if (!filter) return bank.slice();
    if (filter.kind === 'place') return bank.filter(function (q) { return (q.place || []).indexOf(filter.id) >= 0; });
    if (filter.kind === 'manner') return bank.filter(function (q) { return (q.manner || []).indexOf(filter.id) >= 0; });
    if (filter.kind === 'format') return bank.filter(function (q) { return q.format === filter.id; });
    if (filter.kind === 'review') return bank.filter(function (q) { return state.reviewIds.indexOf(q.id) >= 0; });
    return bank.slice();
  }
  function shuffleList(items) { return items.slice().sort(function () { return Math.random() - 0.5; }); }
  function beginSession(filter) {
    activeFilter = filter || null;
    var pool = categoriesFor(activeFilter);
    if (!pool.length) {
      activeTab = activeFilter && activeFilter.kind === 'review' ? 'review' : 'places';
      renderHome();
      return;
    }
    var chosen = shuffleList(pool).slice(0, Math.min(5, pool.length));
    session = { filter: activeFilter, items: chosen, index: 0, correct: 0, incorrect: 0, answered: 0, answers: [], categoryIds: [], startedAt: Date.now() };
    chosen.forEach(function (q) { session.categoryIds = session.categoryIds.concat(q.place || [], q.manner || []); });
    session.categoryIds = uniq(session.categoryIds);
    session.categoryIds.forEach(function (id) { metric(id).sessions += 1; });
    saveState();
    renderQuestion();
  }
  function selectedFilterName(filter) {
    if (!filter) return 'すべての発音練習';
    if (filter.kind === 'place') { var p = PLACE_CATEGORIES.filter(function (x) { return x.id === filter.id; })[0]; return p ? p.name : '部位別'; }
    if (filter.kind === 'manner') { var m = MANNER_CATEGORIES.filter(function (x) { return x.id === filter.id; })[0]; return m ? m.name : '発音の仕方別'; }
    if (filter.kind === 'format') { var f = FORMAT_CATEGORIES.filter(function (x) { return x.id === filter.id; })[0]; return f ? f.name : '練習形式'; }
    if (filter.kind === 'review') return '苦手・復習';
    return '発音練習';
  }
  function renderHome() {
    activeFilter = null; session = null;
    var main = screen.querySelector('#ptMain');
    var tabs = '<nav class="pt-tabs" aria-label="発音トレーニングの分類">' +
      tabButton('places','発音する場所別') + tabButton('manners','発音の仕方別') + tabButton('formats','問題タイプ') + tabButton('review','苦手・復習') + tabButton('progress','達成度') + '</nav>';
    var summary = summaryHtml();
    var body = '';
    if (activeTab === 'places') {
      body = '<section class="pt-section"><h2>発音する場所別</h2><p class="pt-lead">練習したい音のグループを選ぶと、関連する既存問題と新しい練習問題から出題します。</p><div class="pt-card-grid">' + PLACE_CATEGORIES.map(function (c) { return categoryCard(c, 'place'); }).join('') + '</div></section>' +
        '<div class="pt-notice"><strong>分類の整理</strong><p>「後部歯茎音」と「歯茎硬口蓋音」は学術的な説明で呼び方に幅があるため、初期版では「シ・チ・ジ系」を歯茎硬口蓋音としてまとめています。唇歯音・歯音・口蓋垂音は標準的な日本語の基本問題と分けました。</p></div>';
    } else if (activeTab === 'manners') {
      body = '<section class="pt-section"><h2>発音の仕方別</h2><p class="pt-lead">同じ場所で作る音でも、息の出し方や舌・唇の動きで分類できます。</p><div class="pt-card-grid">' + MANNER_CATEGORIES.map(function (c) { return categoryCard(c, 'manner'); }).join('') + '</div></section>';
    } else if (activeTab === 'formats') {
      body = '<section class="pt-section"><h2>問題タイプから選ぶ</h2><p class="pt-lead">聞く・かなを読む・単語・文・似た音の聞き分けを選択します。</p><div class="pt-card-grid">' + FORMAT_CATEGORIES.map(function (c) { return formatCard(c); }).join('') + '</div></section>';
    } else if (activeTab === 'review') {
      var reviewQs = categoriesFor({ kind: 'review' });
      body = '<section class="pt-section"><h2>苦手・復習</h2><p class="pt-lead">マイク回答や選択問題で不正解になった問題を、もう一度練習します。</p>' +
        (reviewQs.length ? '<p class="pt-summary-line">復習候補：' + reviewQs.length + '問</p><button class="pt-primary-btn" type="button" data-action="start-review">復習を始める</button><div class="pt-review-list">' + reviewQs.map(function (q) { return '<div class="pt-review-row"><strong>' + esc(q.display || q.prompt || q.target) + '</strong><small>' + esc(q.origin) + '</small></div>'; }).join('') + '</div>' : '<div class="pt-empty"><span>🌱</span><strong>復習候補はまだありません</strong><p>回答が見本と一致しなかった問題は、ここに自動で追加されます。</p></div>') + '</section>';
    } else {
      body = renderProgress();
    }
    main.innerHTML = tabs + summary + body;
  }
  function tabButton(tab, label) { return '<button type="button" class="pt-tab' + (activeTab === tab ? ' active' : '') + '" data-tab="' + tab + '" aria-pressed="' + (activeTab === tab ? 'true' : 'false') + '">' + label + '</button>'; }
  function categoryCard(c, kind) {
    var m = metric(c.id), value = pct(m), desc = c.note || '';
    var extra = c.countLabel ? '<span class="pt-card-small">' + esc(c.countLabel) + '</span>' : '';
    return '<button type="button" class="pt-category-card' + (c.countLabel && c.countLabel.indexOf('拡張用') === 0 ? ' pt-card-muted' : '') + '" data-action="start-category" data-kind="' + kind + '" data-id="' + c.id + '">' +
      '<span class="pt-card-top"><strong>' + esc(c.name) + '</strong><span class="pt-card-arrow">›</span></span>' +
      '<span class="pt-card-kana">' + esc(c.kana) + '</span><span class="pt-card-note">' + esc(desc) + '</span>' + extra +
      '<span class="pt-card-progress">' + (value === null ? 'まだ記録はありません' : '正解率 ' + value + '% ・ ' + m.attempts + '回回答') + '</span></button>';
  }
  function formatCard(c) {
    var count = categoriesFor({ kind: 'format', id: c.id }).length;
    return '<button type="button" class="pt-category-card" data-action="start-format" data-id="' + c.id + '"><span class="pt-card-top"><strong>' + esc(c.name) + '</strong><span class="pt-card-arrow">›</span></span><span class="pt-card-note">' + esc(c.note) + '</span><span class="pt-card-progress">出題候補 ' + count + '問</span></button>';
  }
  function summaryHtml() {
    var all = Object.keys(state.items).reduce(function (sum, id) { var x = state.items[id]; return sum + x.attempts; }, 0);
    var correct = Object.keys(state.items).reduce(function (sum, id) { var x = state.items[id]; return sum + x.correct; }, 0);
    var incorrect = Object.keys(state.items).reduce(function (sum, id) { var x = state.items[id]; return sum + x.incorrect; }, 0);
    var value = all ? Math.round(correct * 100 / all) : null;
    return '<section class="pt-summary"><div><span class="pt-stat-label">これまでの回答</span><strong>' + all + '回</strong></div><div><span class="pt-stat-label">正解／できた</span><strong>' + correct + '</strong></div><div><span class="pt-stat-label">復習</span><strong>' + state.reviewIds.length + '問</strong></div><div><span class="pt-stat-label">正解率</span><strong>' + (value === null ? '—' : value + '%') + '</strong></div></section>';
  }
  function renderProgress() {
    function tableRows(categories, group) {
      return categories.map(function (c) {
        var m = metric(c.id), value = pct(m), delta = (m.previousSessionPct === null || m.lastSessionPct === null) ? '—' : ((m.lastSessionPct - m.previousSessionPct > 0 ? '+' : '') + (m.lastSessionPct - m.previousSessionPct) + 'pt');
        return '<div class="pt-progress-row"><div class="pt-progress-name"><strong>' + esc(c.name) + '</strong><small>' + esc(c.kana || '') + '</small></div><div><strong>' + (value === null ? '—' : value + '%') + '</strong><small>' + m.correct + '正解／' + m.incorrect + '復習</small></div><div><strong>' + m.sessions + '回</strong><small>練習回数</small></div><div><strong>' + delta + '</strong><small>前回セッション比</small></div><div><span class="pt-rank">' + esc(rank(value)) + '</span></div></div>';
      }).join('');
    }
    var history = state.history.slice(-8).reverse();
    var micHistory = (state.practiceLog || []).slice(-15).reverse();
    var profile = currentUserProfile();
    return '<section class="pt-section"><h2>達成度・結果</h2><p class="pt-lead">記録対象：' + esc(profile.displayName || '未設定') + (profile.recordCode ? ' ／ 管理番号：' + esc(profile.recordCode) : '') + '<br>正解率＝正解数÷回答数×100。マイク回答や選択問題の結果は、発音トレーニングの達成度と共通のトレーニング記録に連動して保存されます。</p>' +
      '<h3 class="pt-subheading">発音する場所別</h3><div class="pt-progress-table">' + tableRows(PLACE_CATEGORIES, 'place') + '</div>' +
      '<h3 class="pt-subheading">発音の仕方別</h3><div class="pt-progress-table">' + tableRows(MANNER_CATEGORIES, 'manner') + '</div>' +
      '<h3 class="pt-subheading">最近の練習履歴</h3>' + (history.length ? '<div class="pt-history-list">' + history.map(function (h) { return '<div class="pt-history-row"><span>' + esc(h.date) + '</span><strong>' + esc(h.label) + '</strong><span>' + h.correct + '/' + h.total + '（' + h.pct + '%）</span></div>' + (h.items && h.items.length ? '<div class="pt-history-detail">取り組んだ問題：' + h.items.map(function (it) { return esc(it.label) + (it.correct ? '（できた）' : '（復習）'); }).join('、') + '</div>' : ''); }).join('') + '</div>' : '<div class="pt-empty"><p>練習を完了すると、ここに履歴が残ります。</p></div>') +
      '<h3 class="pt-subheading">マイク練習の記録（最近15件）</h3>' + (micHistory.length ? '<div class="pt-history-list">' + micHistory.map(function (h) { return '<div class="pt-history-row pt-mic-history-row"><span>' + esc(h.date.replace('T',' ').replace('Z','')) + '</span><strong>' + esc(h.item || h.id) + '</strong><span>' + (h.transcript ? '認識：' + esc(h.transcript) : (h.error ? 'エラー：' + esc(h.error) : '記録済み・文字起こしなし')) + '</span></div>'; }).join('') + '</div>' : '<div class="pt-empty"><p>マイク練習を行うと、問題ごとに記録します。</p></div>') +
      '<div class="pt-record-link"><p><strong>完了した発音トレーニング：' + state.history.length + 'セッション</strong><br>セッションの正解数・問題数・正答率を、アプリ共通のトレーニング記録にも保存します。</p><button type="button" class="pt-secondary-btn" data-action="open-training-records">📅 トレーニング記録を見る</button></div>' +
      '<button type="button" class="pt-secondary-btn" data-action="reset-progress">発音トレーニングの達成度を初期化</button></section>';
  }
  function renderQuestion() {
    if (!session) return renderHome();
    if (session.index >= session.items.length) return renderResult();
    var q = session.items[session.index];
    var main = screen.querySelector('#ptMain');
    var percent = Math.round((session.index) * 100 / session.items.length);
    var html = '<div class="pt-quiz-head"><button type="button" class="pt-text-btn" data-action="quit-session">‹ 分類に戻る</button><span>' + esc(selectedFilterName(session.filter)) + '</span><span>' + (session.index + 1) + ' / ' + session.items.length + '</span></div>' +
      '<div class="pt-progress-track"><span style="width:' + percent + '%"></span></div>' +
      '<article class="pt-question-card"><div class="pt-question-label">' + esc(formatName(q.format)) + '</div><h2>' + esc(q.prompt || 'お手本を聞いて練習しましょう。') + '</h2>';
    if (q.type === 'listen') {
      html += '<div class="pt-audio-target"><span>🔊</span><strong>お手本を聞いてみましょう</strong><button type="button" class="pt-audio-btn" data-action="speak-target" data-id="' + q.id + '">🔊 お手本を再生</button></div>';
      html += choicesHtml(q.choices, q.id);
    } else if (q.type === 'choice') {
      html += '<div class="pt-target-word">' + esc(q.display || '') + '</div>';
      html += choicesHtml(q.choices, q.id);
    } else if (q.type === 'pair') {
      html += '<div class="pt-pair-tools"><button class="pt-audio-btn" type="button" data-action="speak-a" data-id="' + q.id + '">🔊 1つ目を聞く</button><button class="pt-audio-btn" type="button" data-action="speak-b" data-id="' + q.id + '">🔊 2つ目を聞く</button><button class="pt-secondary-btn" type="button" data-action="speak-pair" data-id="' + q.id + '">続けて聞く</button></div><p class="pt-pair-hint">文字は回答後に確認できます。聞き取れないときは何度でも再生してください。</p>';
      html += '<div class="pt-choice-list"><button class="pt-choice" type="button" data-action="answer" data-answer="同じ" data-id="' + q.id + '">同じ</button><button class="pt-choice" type="button" data-action="answer" data-answer="違う" data-id="' + q.id + '">違う</button></div>';
    } else {
      html += '<div class="pt-target-word' + (q.format === 'sentence' ? ' pt-target-sentence' : '') + '">' + esc(q.display || q.target || '') + '</div>';
      html += '<div class="pt-practice-tips"><strong>練習のポイント</strong><p>' + esc(q.reviewNote || '自分のペースで声に出します。お手本を何度聞いても大丈夫です。') + '</p><button type="button" class="pt-audio-btn" data-action="speak-target" data-id="' + q.id + '">🔊 お手本を聞く</button></div>';
      html += '<div class="pt-selfcheck"><p>表示された言葉を声に出して、マイクで答えてください。</p><button class="pt-primary-btn pt-mic-answer-btn" type="button" data-action="mic-answer" data-id="' + q.id + '">🎙️ マイクで答える</button><p class="pt-mic-answer-note">認識された言葉を見本と照合します。聞き取りの誤りで不正解になる場合もあります。</p></div>';
    }
    if (q.type !== 'self') html += '<div class="pt-mic-practice-bar"><button type="button" class="pt-secondary-btn pt-mic-practice-btn" data-action="mic-practice" data-id="' + q.id + '">🎙️ マイクで発音を練習</button><p>認識された文字を表示します。発音の医学的・音響的な正確性を自動判定する機能ではありません。</p></div>';
    html += '<div id="ptFeedback" class="pt-feedback" aria-live="polite"></div></article>';
    main.innerHTML = html;
    // The pronunciation screen scrolls independently from the page.
    // Every newly displayed question must start at the top.
    if (total > 0 && window.KotobaDailyStreak) {
      var resultPanel = screen.querySelector('.pt-result');
      if (resultPanel) {
        var dailySlot = document.createElement('div');
        dailySlot.className = 'daily-streak-slot';
        var questionLog = resultPanel.querySelector('.pt-question-log');
        resultPanel.insertBefore(dailySlot, questionLog || resultPanel.lastElementChild);
        window.KotobaDailyStreak.finish(dailySlot);
      }
    }
    screen.scrollTop = 0;
    if (document.scrollingElement) document.scrollingElement.scrollTop = 0;
    try { window.scrollTo({top:0,left:0,behavior:'instant'}); } catch (e) { window.scrollTo(0,0); }
  }
  function formatName(id) { var f = FORMAT_CATEGORIES.filter(function (x) { return x.id === id; })[0]; return f ? f.name : '発音練習'; }
  function choicesHtml(choices, id) {
    return '<div class="pt-choice-list">' + (choices || []).map(function (choice) { return '<button class="pt-choice" type="button" data-action="answer" data-answer="' + esc(choice) + '" data-id="' + id + '">' + esc(choice) + '</button>'; }).join('') + '</div>';
  }
  function speak(text) {
    if (!text) return;
    try {
      if (typeof window.speak === 'function') { window.speak(text); return; }
    } catch (e) {}
    try {
      if (window.speechSynthesis && window.SpeechSynthesisUtterance) {
        window.speechSynthesis.cancel();
        var u = new window.SpeechSynthesisUtterance(String(text)); u.lang = 'ja-JP'; window.speechSynthesis.speak(u);
      }
    } catch (e2) {}
  }
  function findQuestion(id) { return session && session.items.filter(function (q) { return q.id === id; })[0]; }
  function onScreenClick(event) {
    var target = event.target;
    while (target && target !== screen && !target.getAttribute('data-action') && !target.getAttribute('data-tab')) target = target.parentNode;
    if (!target || target === screen) return;
    if (target.getAttribute('data-tab')) {
      activeTab = target.getAttribute('data-tab'); session = null; renderHome(); return;
    }
    var action = target.getAttribute('data-action');
    var id = target.getAttribute('data-id');
    if (action === 'start-category') beginSession({ kind: target.getAttribute('data-kind'), id: id });
    else if (action === 'start-format') beginSession({ kind: 'format', id: id });
    else if (action === 'start-review') beginSession({ kind: 'review', id: 'review' });
    else if (action === 'answer') submitAnswer(id, target.getAttribute('data-answer'));
    else if (action === 'speak-target') { var q1 = findQuestion(id); if (q1) speak(q1.audioText || q1.target || q1.display); }
    else if (action === 'speak-a') { var qa = findQuestion(id); if (qa) speak(qa.a); }
    else if (action === 'speak-b') { var qb = findQuestion(id); if (qb) speak(qb.b); }
    else if (action === 'speak-pair') { var qp = findQuestion(id); if (qp) { speak(qp.a); window.setTimeout(function () { speak(qp.b); }, 1300); } }
    else if (action === 'mic-practice') startMicPractice(id, false);
    else if (action === 'mic-answer') startMicPractice(id, true);
    else if (action === 'quit-session') { session = null; activeTab = 'places'; renderHome(); }
    else if (action === 'reset-progress') resetProgress();
    else if (action === 'open-training-records') {
      session = null;
      if (typeof window.openRecords === 'function') window.openRecords();
      else { activeTab = 'progress'; renderHome(); }
    }
    else if (action === 'next-question') { if (session) { session.index += 1; renderQuestion(); } }
    else if (action === 'repeat-session') beginSession(lastResult ? lastResult.filter : null);
    else if (action === 'open-review-result') { activeTab = 'review'; session = null; renderHome(); }
    else if (action === 'back-to-categories') { session = null; activeTab = lastResult && lastResult.filter && lastResult.filter.kind === 'manner' ? 'manners' : (lastResult && lastResult.filter && lastResult.filter.kind === 'format' ? 'formats' : (lastResult && lastResult.filter && lastResult.filter.kind === 'review' ? 'review' : 'places')); renderHome(); }
  }
  function normalizeSpeech(value) {
    var source = String(value == null ? '' : value);
    // app.js が提供する読み辞書を使い、漢字変換（例：林檎／りんご）を読みの形にそろえます。
    try {
      var sharedNormalizer = window.normalizeSpeechTextForTraining || window.normalizeSpeechText;
      if (typeof sharedNormalizer === 'function') return sharedNormalizer(source);
    } catch (e) {}
    // フォールバック：app.js が無い環境でも代表的な漢字表記を処理します。
    var normalized = source.normalize('NFKC')
      .replace(/[ァ-ヶ]/g, function (ch) { return String.fromCharCode(ch.charCodeAt(0) - 0x60); });
    var aliases = [
      ['今日は晴れです','きょうははれです'], ['手を洗います','てをあらいます'], ['手を洗う','てをあらう'],
      ['おはようございます','おはようございます'], ['林檎','りんご'], ['苹果','りんご'], ['桜','さくら'], ['時計','とけい'],
      ['傘','かさ'], ['向日葵','ひまわり'], ['手を','てを'], ['洗います','あらいます'], ['洗う','あらう'], ['晴れ','はれ'],
      ['今日','きょう'], ['昨日','きのう'], ['明日','あした'], ['橋','はし'], ['箸','はし'], ['端','はし'],
      ['猫','ねこ'], ['犬','いぬ'], ['靴','くつ'], ['鞄','かばん'], ['卵','たまご'], ['玉子','たまご'], ['花','はな'],
      ['学校','がっこう'], ['先生','せんせい'], ['友達','ともだち'], ['日本語','にほんご'], ['下さい','ください'],
      ['食べます','たべます'], ['食べる','たべる'], ['行きました','いきました'], ['行きます','いきます'], ['行く','いく']
    ].sort(function (a, b) { return b[0].length - a[0].length; });
    aliases.forEach(function (pair) { normalized = normalized.split(pair[0]).join(pair[1]); });
    return normalized.replace(/[\s、。，．！？!?.,「」『』（）()［］\[\]・：:；;—\-]/g, '').toLowerCase();
  }
  function startMicPractice(id, answerMode) {
    answerMode = !!answerMode;
    var q = findQuestion(id); if (!q) return;
    if (answerMode && session && session.answers.some(function (a) { return a.id === q.id; })) return;
    var Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var main = screen.querySelector('#ptMain');
    var output = main.querySelector('#ptMicTranscript');
    if (!output) {
      output = document.createElement('div'); output.id = 'ptMicTranscript'; output.className = 'pt-mic-transcript'; output.setAttribute('aria-live','polite');
      var feedback = main.querySelector('#ptFeedback');
      if (feedback) feedback.parentNode.insertBefore(output, feedback); else main.appendChild(output);
    }
    var label = q.display || q.target || q.prompt || q.audioText || q.answer || q.id;
    var expected = q.target || q.audioText || q.display || '';
    var profile = currentUserProfile();
    var entry = { date: new Date().toISOString(), id: q.id, item: safeText(label), origin: safeText(q.origin || ''), transcript: '', kind: answerMode ? 'microphone-answer' : 'microphone', userProfileId: profile.profileId || 'unconfigured', userName: profile.displayName || '未設定', userCode: profile.recordCode || '' };
    state.practiceLog.push(entry);
    if (state.practiceLog.length > 200) state.practiceLog = state.practiceLog.slice(-200);
    var im = itemMetric(q.id); im.micAttempts = (im.micAttempts || 0) + 1; im.label = safeText(label); im.origin = safeText(q.origin || '');
    saveState();
    if (!Recognition) {
      if (output) output.textContent = 'この環境では音声認識に対応していません。対応ブラウザーで開き、マイク権限を確認してください。';
      return;
    }
    try {
      var recognition = new Recognition();
      var handled = false;
      recognition.lang = 'ja-JP'; recognition.continuous = false; recognition.interimResults = true; recognition.maxAlternatives = 3;
      if (output) output.textContent = '🎙️ 聞き取り中です。「' + label + '」を声に出してください。';
      var micButton = main.querySelector('button[data-action="mic-answer"],button[data-action="mic-practice"]');
      if (micButton) micButton.disabled = true;
      recognition.onresult = function (event) {
        var result = event.results && event.results[event.results.length - 1];
        if (!result || !result[0]) return;
        var text = '';
        var matched = false;
        var expectedText = normalizeSpeech(expected);
        // 候補をすべて照合。漢字表記の第1候補が不一致でも、読みが一致する別候補があれば正解にします。
        for (var i = 0; i < result.length; i++) {
          var candidate = String((result[i] && result[i].transcript) || '').trim();
          if (!candidate) continue;
          if (!text) text = candidate;
          if (answerMode && expectedText && normalizeSpeech(candidate) === expectedText) {
            text = candidate;
            matched = true;
            break;
          }
        }
        if (!text) return;
        entry.transcript = text; saveState();
        if (output) output.textContent = '認識した言葉：' + text;
        if (answerMode && result.isFinal && !handled) {
          handled = true;
          if (output) output.textContent = '認識した言葉：' + text + ' ／ お手本：' + (q.display || expected || label);
          submitAnswer(q.id, matched ? '__mic_correct__' : '__mic_wrong__', text);
        }
      };
      recognition.onerror = function (event) {
        entry.error = event.error || 'unknown'; saveState();
        if (output) output.textContent = 'マイクを利用できません（' + (event.error || 'unknown') + '）。マイク権限を確認し、もう一度お試しください。';
        if (micButton) micButton.disabled = false;
      };
      recognition.onend = function () {
        saveState();
        if (answerMode && !handled) {
          if (output) output.textContent = '音声を認識できませんでした。正解・不正解にはせず、もう一度マイクで答えてください。';
          if (micButton) micButton.disabled = false;
        } else if (!answerMode && output && output.textContent.indexOf('聞き取り中') >= 0) {
          output.textContent = '音声を認識できませんでした。「' + label + '」の練習記録は保存されています。もう一度お試しください。';
          if (micButton) micButton.disabled = false;
        }
      };
      recognition.start();
    } catch (e) { entry.error = 'start-failed'; saveState(); if (output) output.textContent = 'マイクを開始できませんでした。マイク権限と接続を確認してください。'; var retryButton = main.querySelector('button[data-action="mic-answer"],button[data-action="mic-practice"]'); if (retryButton) retryButton.disabled = false; }
  }

  function submitAnswer(id, answer, recognizedText) {
    if (!session) return;
    var q = findQuestion(id); if (!q) return;
    if (session.answers.some(function (a) { return a.id === q.id; })) return;
    var correct = false, isSelf = false, feedbackText = '';
    if (q.type === 'self') {
      isSelf = true;
      correct = answer === '__self_ok__' || answer === '__mic_correct__';
      if (answer === '__mic_correct__') feedbackText = '認識した言葉が見本と一致しました。';
      else if (answer === '__mic_wrong__') feedbackText = '認識した言葉「' + safeText(recognizedText || '') + '」が見本と一致しなかったため、復習候補に追加しました。自動で次の問題へ進みます。';
      else feedbackText = correct ? '自己確認として「できた」を記録しました。' : '復習候補に追加しました。無理せず、あとで再挑戦できます。';
    } else if (q.type === 'pair') {
      correct = answer === q.answer;
      feedbackText = correct ? '正解です。1つ目は「' + q.a + '」、2つ目は「' + q.b + '」でした。' : '正解は「' + q.answer + '」です。1つ目は「' + q.a + '」、2つ目は「' + q.b + '」でした。';
    } else {
      correct = String(answer) === String(q.answer);
      feedbackText = correct ? '正解です！' : '正解は「' + q.answer + '」です。お手本を聞き、もう一度練習できます。';
    }
    session.answered += 1;
    if (correct) session.correct += 1; else session.incorrect += 1;
    session.answers.push({ id: q.id, correct: correct, isSelf: isSelf, answer: answer });
    var im = itemMetric(q.id); im.attempts += 1; im.label = safeText(q.display || q.target || q.prompt || q.audioText || q.id); im.origin = safeText(q.origin || ''); im.lastResult = correct ? '正解・できた' : '不正解・復習'; if (correct) im.correct += 1; else im.incorrect += 1;
    (q.place || []).concat(q.manner || []).forEach(function (catId) { var m = metric(catId); m.attempts += 1; if (correct) m.correct += 1; else m.incorrect += 1; });
    if (correct) state.reviewIds = state.reviewIds.filter(function (x) { return x !== q.id; });
    else if (state.reviewIds.indexOf(q.id) < 0) state.reviewIds.push(q.id);
    saveState();
    if (correct) { if (typeof window.playCorrectSound === 'function') window.playCorrectSound(); speak('正解です。できました。'); }
    else if (typeof window.playWrongSound === 'function') window.playWrongSound();
    var main = screen.querySelector('#ptMain');
    var fb = main.querySelector('#ptFeedback');
    if (fb) {
      fb.className = 'pt-feedback ' + (correct ? 'good' : 'needs-review');
      fb.innerHTML = '<strong>' + (correct ? (isSelf ? '○ 認識できました' : '○ 正解') : (isSelf ? '△ 復習候補に追加' : '△ もう一度練習')) + '</strong><p>' + esc(correct ? (answer === '__mic_correct__' ? feedbackText : '正解です。できました。' + (feedbackText ? ' ' + feedbackText : '')) : feedbackText) + '</p>' +
        (q.type === 'self' ? '' : '<button type="button" class="pt-audio-btn" data-action="speak-target" data-id="' + q.id + '">🔊 お手本を聞く</button>') +
        '<button type="button" class="pt-primary-btn" data-action="next-question">' + (session.index === session.items.length - 1 ? '結果を見る' : '次の問題へ') + '　›</button>';
      Array.prototype.forEach.call(main.querySelectorAll('button[data-action="answer"]'), function (b) { b.disabled = true; });
      Array.prototype.forEach.call(main.querySelectorAll('button[data-action="answer"],button[data-action="mic-answer"]'), function (b) { b.disabled = true; });
    }
    if (!correct) {
      var answeredIndex = session.index;
      var nextButton = main.querySelector('button[data-action="next-question"]');
      if (nextButton) nextButton.textContent = '次の問題へ（自動で進みます）　›';
      window.setTimeout(function () {
        if (session && session.index === answeredIndex && session.items[answeredIndex] && session.items[answeredIndex].id === q.id) {
          session.index += 1; renderQuestion();
        }
      }, 1500);
    }
  }
  function saveSharedTrainingRecord(s, label, total, value, finishedAt) {
    if (!s || s.sharedRecordSaved) return !!(s && s.sharedRecordSaved);
    var finished = finishedAt instanceof Date ? finishedAt : new Date(finishedAt || Date.now());
    var started = new Date(s.startedAt || finished.getTime());
    var data = {
      finishedAt: finished,
      startedAt: started,
      score: Number(s.correct || 0),
      total: Number(total || 0),
      rate: Number(value || 0),
      category: '発音トレーニング',
      genre: '発音トレーニング',
      activity: String(label || '発音トレーニング'),
      kind: 'pronunciationTraining',
      // 共通画面の「AI会話ターン」には数えないため turns は 0 のままにします。
      turns: 0
    };
    try {
      if (typeof window.saveTrainingRecord === 'function') {
        window.saveTrainingRecord(data);
        s.sharedRecordSaved = true;
        return true;
      }
      // app.js が読み込めない単独利用時にも、同じ共通記録へ保存します。
      var key = 'aphasiaTrainingRecordsV4';
      var records = [];
      try { records = JSON.parse(localStorage.getItem(key) || '[]'); } catch (ignore) { records = []; }
      if (!Array.isArray(records)) records = [];
      records.push({
        id: String(finished.getTime()) + '-pron-' + Math.random().toString(36).slice(2, 8),
        date: finished.getFullYear() + '-' + String(finished.getMonth() + 1).padStart(2, '0') + '-' + String(finished.getDate()).padStart(2, '0'),
        time: finished.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
        startedAt: started.toISOString(), finishedAt: finished.toISOString(),
        durationSec: Math.max(0, Math.round((finished.getTime() - started.getTime()) / 1000)),
        category: data.category, genre: data.genre, activity: data.activity,
        score: data.score, total: data.total, rate: data.rate, kind: data.kind, turns: 0,
        userProfileId: currentUserProfile().profileId || 'unconfigured',
        userName: currentUserProfile().displayName || '未設定',
        userCode: currentUserProfile().recordCode || ''
      });
      records.sort(function (a, b) { return new Date(a.finishedAt) - new Date(b.finishedAt); });
      localStorage.setItem(key, JSON.stringify(records));
      s.sharedRecordSaved = true;
      return true;
    } catch (e) {
      try { console.warn('発音トレーニングを共通記録へ保存できませんでした。', e); } catch (ignore2) {}
      return false;
    }
  }

  function renderResult() {
    var s = session;
    if (!s) return renderHome();
    var total = s.answered, value = total ? Math.round(s.correct * 100 / total) : 0;
    // 分類ごとの直近セッション成績を保存し、前回との差を表示します。
    s.categoryIds.forEach(function (catId) {
      var related = s.answers.filter(function (a) { var q = s.items.filter(function (x) { return x.id === a.id; })[0]; return q && ((q.place || []).indexOf(catId) >= 0 || (q.manner || []).indexOf(catId) >= 0); });
      if (!related.length) return;
      var m = metric(catId), good = related.filter(function (a) { return a.correct; }).length;
      m.previousSessionPct = m.lastSessionPct;
      m.lastSessionPct = Math.round(good * 100 / related.length);
    });
    var label = selectedFilterName(s.filter);
    var result = { filter: s.filter, correct: s.correct, incorrect: s.incorrect, total: total, pct: value, answers: s.answers.slice() };
    lastResult = result;
    var now = new Date();
    var date = now.getFullYear() + '/' + ('0' + (now.getMonth()+1)).slice(-2) + '/' + ('0' + now.getDate()).slice(-2) + ' ' + ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2);
    var profile = currentUserProfile();
    state.history.push({ date: date, label: label, correct: s.correct, total: total, pct: value, userProfileId: profile.profileId || 'unconfigured', userName: profile.displayName || '未設定', userCode: profile.recordCode || '', items: s.answers.map(function (a) { var q = s.items.filter(function (x) { return x.id === a.id; })[0]; return { id: a.id, label: q ? safeText(q.display || q.target || q.prompt || q.id) : a.id, origin: q ? safeText(q.origin || '') : '', correct: !!a.correct, micAttempts: (state.items[a.id] && state.items[a.id].micAttempts) || 0 }; }) });
    if (state.history.length > 50) state.history = state.history.slice(-50);
    saveState();
    var sharedRecordSaved = saveSharedTrainingRecord(s, label, total, value, now);
    var reviewItems = s.answers.filter(function (a) { return !a.correct; }).map(function (a) { return s.items.filter(function (q) { return q.id === a.id; })[0]; }).filter(Boolean);
    var questionListHtml = '<section class="pt-question-log"><h3>今回取り組んだ問題</h3><ol>' + s.items.map(function (q, index) { var a = s.answers.filter(function (x) { return x.id === q.id; })[0]; return '<li><strong>' + esc(q.display || q.target || q.prompt || q.id) + '</strong><small>' + esc(q.origin || q.format || '発音練習') + ' ・ ' + (a ? (a.correct ? '正解／できた' : '不正解／復習') : 'マイク練習のみ・未回答') + ' ・ マイク ' + ((state.items[q.id] && state.items[q.id].micAttempts) || 0) + '回</small></li>'; }).join('') + '</ol></section>';
    screen.querySelector('#ptMain').innerHTML = '<section class="pt-result"><div class="pt-result-icon">' + (value >= 80 ? '🌟' : '🌱') + '</div><h2>トレーニング結果</h2><p class="pt-lead">' + esc(label) + '</p><div class="pt-result-score"><strong>' + value + '%</strong><span>正解率／自己確認率</span></div><div class="pt-result-metrics"><div><strong>' + s.correct + '</strong><span>正解・できた</span></div><div><strong>' + s.incorrect + '</strong><span>不正解・復習</span></div><div><strong>' + total + '</strong><span>回答数</span></div></div><p class="pt-rank-line">' + esc(rank(value)) + '</p>' + questionListHtml +
      (reviewItems.length ? '<div class="pt-notice"><strong>復習が必要な問題：' + reviewItems.length + '問</strong><p>' + reviewItems.map(function (q) { return esc(q.display || q.prompt || q.target); }).join('、') + '</p><button type="button" class="pt-secondary-btn" data-action="open-review-result">復習リストを開く</button></div>' : '<p class="pt-success-note">このセッションの問題はすべて「できた／正解」として記録されました。</p>') +
      '<p class="pt-record-sync-status" role="status">' + (sharedRecordSaved ? '✓ 達成度と共通のトレーニング記録に保存しました。' : '発音トレーニングの達成度には保存しましたが、共通のトレーニング記録への保存は確認できませんでした。') + '</p>' +
      '<div class="pt-result-actions"><button class="pt-primary-btn" type="button" data-action="repeat-session">同じ分類でもう一度</button><button class="pt-secondary-btn" type="button" data-action="back-to-categories">分類に戻る</button><button class="pt-secondary-btn" type="button" data-action="open-training-records">📅 トレーニング記録を見る</button><button class="pt-text-btn" type="button" data-tab="progress">達成度を見る</button></div></section>';
    screen.scrollTop = 0;
    if (document.scrollingElement) document.scrollingElement.scrollTop = 0;
    try { window.scrollTo({top:0,left:0,behavior:'instant'}); } catch (e) { window.scrollTo(0,0); }
    session = null;
  }
  function resetProgress() {
    if (!window.confirm('発音トレーニングの記録と復習リストを初期化します。よろしいですか？')) return;
    state = { version: 1, taxonomy: {}, items: {}, reviewIds: [], history: [], practiceLog: [] };
    saveState(); renderHome();
  }

  window.__pronunciationTraining = {
    open: function () {
      bank = buildBank();
      showScreen();
      activeTab = 'places';
      session = null;
      renderHome();
    },
    getInventory: function () { if (!bank.length) bank = buildBank(); return bank.map(function (q) { return { id:q.id, origin:q.origin, target:q.target || q.display, place:q.place, manner:q.manner, format:q.format }; }); }
  };
})();
