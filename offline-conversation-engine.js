/* ことばクエスト V90 — 端末内会話エンジン。
 * 外部モデル、CDN、通信、WebGPU、APIキーを使用しない。
 * ルール・文脈・単語抽出による会話練習用エンジンであり、生成LLMではない。
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.KotobaOfflineConversation = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  var scenes = {
    cafe: {
      name: 'カフェで注文', role: '店員',
      start: ['いらっしゃいませ。ご注文はお決まりですか？', 'こんにちは。今日は何をお飲みになりますか？'],
      steps: [
        { ask: 'どんな飲み物にしますか？', keys: ['コーヒー','紅茶','お茶','水','ジュース','カフェラテ','ラテ','オレンジ','牛乳','抹茶'] },
        { ask: 'サイズは、S・M・Lのどれにしますか？', keys: ['S','M','L','小さい','ふつう','普通','大きい','ホット','アイス'] },
        { ask: '店内で飲みますか？ お持ち帰りですか？', keys: ['店内','持ち帰り','テイクアウト','ここ','家','はい','いいえ'] },
        { ask: 'ほかにご注文はありますか？', keys: ['ある','ない','いいえ','はい','大丈夫','以上','ください'] },
        { ask: 'ありがとうございます。お会計に進んでもよろしいですか？', keys: ['はい','お願いします','大丈夫','いいえ'] }
      ], done: 'ご注文ありがとうございます。どうぞごゆっくり。',
      items: ['コーヒー', '紅茶', 'ジュース', 'お茶', '水']
    },
    shopping: {
      name: 'お店で買い物', role: '店員',
      start: ['いらっしゃいませ。今日は何をお探しですか？','こんにちは。何かお手伝いしましょうか？'],
      steps: [
        { ask: 'どんな商品がほしいですか？', keys: ['パン','りんご','バナナ','お菓子','牛乳','服','本','野菜','これ','飲み物'] },
        { ask: 'いくつ必要ですか？', keys: ['ひとつ','ふたつ','1','2','3','一個','二個','一つ','二つ','個'] },
        { ask: '袋は使いますか？', keys: ['はい','いいえ','いる','いらない','お願いします','大丈夫'] },
        { ask: 'お支払いは現金ですか？ カードですか？', keys: ['現金','カード','電子','スマホ','ペイ'] }
      ], done: 'お買い上げありがとうございます。またお越しください。', items: ['パン','りんご','バナナ','牛乳','お菓子']
    },
    greeting: {
      name: 'あいさつ・雑談', role: '会話相手',
      start: ['こんにちは。今日はどんな気分ですか？','おはようございます。今日はどんなことをしましたか？'],
      steps: [
        { ask: '今日はどんな気分ですか？', keys: [] },
        { ask: '今日は何をして過ごしましたか？', keys: [] },
        { ask: '最近、楽しかったことはありますか？', keys: [] },
        { ask: '明日は何をしたいですか？', keys: [] }
      ], done: 'いろいろお話しできて楽しかったです。また話しましょう。'
    },
    station: {
      name: '駅で道を聞く', role: '駅員',
      start: ['こんにちは。どちらへ行きたいですか？','何かお困りですか？ 行きたい場所を教えてください。'],
      steps: [
        { ask: 'どちらへ行きたいですか？', keys: ['改札','出口','トイレ','ホーム','駅','電車','バス','売店'] },
        { ask: '急いでいますか？', keys: ['はい','いいえ','急い','ゆっくり','大丈夫'] },
        { ask: '案内板を見ながら進めそうですか？', keys: ['はい','いいえ','わかり','大丈夫','むずかしい'] }
      ], done: '気をつけてお出かけください。わからなければ駅員に聞いてください。'
    },
    clinic: {
      name: '受付で話す', role: '受付',
      start: ['こんにちは。受付です。今日はどのようなご用件ですか？','こんにちは。予約の確認でしょうか？'],
      steps: [
        { ask: '今日はどのようなご用件ですか？', keys: ['予約','診察','薬','相談','検査','受付'] },
        { ask: '予約はされていますか？', keys: ['はい','いいえ','予約','してい','してません'] },
        { ask: '受付で確認したいことはありますか？', keys: [] }
      ], done: 'ありがとうございます。受付では順番にご案内します。'
    },
    home: {
      name: '家での会話', role: '家族',
      start: ['おかえりなさい。今日はどんな一日でしたか？','今日は何をして過ごしましたか？'],
      steps: [
        { ask: '今日はどんな一日でしたか？', keys: [] },
        { ask: '夕ごはんは何が食べたいですか？', keys: [] },
        { ask: '明日は何か予定がありますか？', keys: [] },
        { ask: '何か手伝ってほしいことはありますか？', keys: [] }
      ], done: '話してくれてありがとう。またお話ししようね。'
    },
    free: {
      name: '自由なおしゃべり', role: '会話相手',
      start: ['こんにちは。今日は何について話したいですか？', 'こんにちは。好きなことや気になることを教えてください。'],
      steps: [], done: ''
    }
  };
  var normalizers = [/[\u3000\s]+/g, /[！!。．、，,？?]+$/g];
  function normalize(v) {
    var s = String(v == null ? '' : v).normalize('NFKC').trim();
    for (var i=0;i<normalizers.length;i++) s=s.replace(normalizers[i], i===0?' ':'');
    return s;
  }
  function containsAny(s, words) { return words.some(function (w) { return s.indexOf(w) >= 0; }); }
  function choose(a, state) { if (!a || !a.length) return ''; var x = ((state.seed * 1103515245 + 12345) >>> 0); state.seed = x; return a[x % a.length]; }
  function pickTopic(text) {
    var banks = [
      ['食べ物', ['ごはん','料理','おいしい','食べ','パン','ラーメン','カレー','寿司','お寿司','うどん','果物','お菓子','昼食','夕飯','朝食']],
      ['飲み物', ['コーヒー','お茶','紅茶','ジュース','飲み物','飲む','水']],
      ['天気', ['天気','晴れ','雨','曇り','雪','暑い','寒い','風']],
      ['趣味', ['趣味','音楽','歌','ゲーム','映画','本','読書','散歩','絵','スポーツ']],
      ['家族', ['家族','父','母','子ども','孫','兄','姉','弟','妹','友達']],
      ['買い物', ['買い物','お店','スーパー','買う','値段','会計']],
      ['お出かけ', ['出かけ','外出','駅','電車','バス','公園','旅行','散歩']],
      ['仕事', ['仕事','学校','勉強','宿題','職場','通所']],
      ['気分', ['楽しい','嬉しい','うれしい','悲しい','さみしい','寂しい','つらい','困った','疲れ','元気','不安','心配']]
    ];
    for (var i=0;i<banks.length;i++) if(containsAny(text,banks[i][1])) return banks[i][0];
    return '';
  }
  function newSession(sceneKey, seed) {
    var key = scenes[sceneKey] ? sceneKey : 'free';
    var state = { sceneKey: key, step: 0, turns: 0, recent: [], slots: {}, topic:'', lastQuestion:'', seed: Number(seed) || (Date.now() & 0x7fffffff), ended: false };
    var opener = choose(scenes[key].start, state);
    state.lastQuestion=opener;
    return { state: state, opening: opener, scenario: scenes[key].name, role:scenes[key].role };
  }
  function interestQuestion(topic, state) {
    var bank = {
      '食べ物':['どんな食べ物が好きですか？','最近食べておいしかったものは何ですか？','それはいつ食べましたか？'],
      '飲み物':['普段は何を飲むことが多いですか？','温かい飲み物と冷たい飲み物、どちらが好きですか？'],
      '天気':['こんな日は何をして過ごしたいですか？','雨の日と晴れの日、どちらが好きですか？'],
      '趣味':['どんなところが好きですか？','いつから好きになったのですか？','次は何をしてみたいですか？'],
      '家族':['その人とどんなことをするのが好きですか？','最近いっしょに過ごしたことはありますか？'],
      '買い物':['何を買う予定ですか？','どのお店によく行きますか？'],
      'お出かけ':['どこに行ってみたいですか？','誰と行きたいですか？'],
      '仕事':['今日はどんなことをしましたか？','明日は何をする予定ですか？'],
      '気分':['何があったか、少しだけ話しますか？','今したいことはありますか？']
    };
    return choose(bank[topic] || ['もう少し教えてもらえますか？','それについて、どんな気持ちですか？','ほかにも話したいことはありますか？'], state);
  }
  function contextualReply(text, state) {
    var s = normalize(text).toLowerCase();
    var knownTopic = pickTopic(s);
    if (knownTopic) state.topic=knownTopic;
    if (containsAny(s,['自殺','死にたい','消えたい','自分を傷つけ','命を絶','殺したい'])) return 'とてもつらい気持ちなのですね。ここだけで抱えず、近くの信頼できる人に今の気持ちを伝えてください。すぐ危険があるときは緊急窓口へ連絡してください。';
    if (containsAny(s,['胸が痛い','呼吸できない','意識がない','息ができない','倒れた'])) return '急いで助けを求めてください。緊急の症状なら119番などの緊急通報を利用してください。';
    if (containsAny(s,['何ができる','どんなai','あなたは誰','あなたはなに','aiなの','人工知能'])) return '私は、ことばクエストの端末内会話パートナーです。短い言葉の練習や、カフェ・買い物などの会話ができます。ネット通信はしません。';
    if (containsAny(s,['インターネット','オフライン','通信','ダウンロード'])) return 'この会話は、端末に入っている会話エンジンだけで動いています。インターネットは使いません。何について話しますか？';
    if (containsAny(s,['ありがとう','ありがと','助かった'])) return choose(['どういたしまして。またお話ししましょう。','こちらこそ、話してくれてありがとう。'],state);
    if (containsAny(s,['さようなら','またね','バイバイ','おしまい','終わり'])) { state.ended=true;return 'お話ししてくれてありがとう。またいつでも声をかけてください。'; }
    if (containsAny(s,['おはよう','こんにちは','こんばんは','はじめまして'])) return choose(['こんにちは。今日は何について話しましょうか？','お話しできてうれしいです。今日はどんな気分ですか？'],state);
    if (containsAny(s,['助けて','わからない','難しい','むずかしい','言えない','言葉が出ない'])) return '大丈夫です。「はい」「いいえ」など、短い返事でも練習できます。もう一度、ゆっくり質問しましょうか？';
    if (containsAny(s,['疲れた','つかれた','しんどい','つらい','悲しい','さびしい','寂しい','不安','こわい','怖い'])) return 'そう感じているのですね。話してくれてありがとう。今は休みたいですか？ それとも少し話したいですか？';
    if (containsAny(s,['楽しい','うれしい','嬉しい','よかった','最高','好き'])) return 'いいですね。'.concat(interestQuestion(state.topic || '趣味',state));
    if (containsAny(s,['嫌い','きらい','苦手'])) return 'そうなんですね。無理に好きになる必要はありません。ほかに好きなことはありますか？';
    if (containsAny(s,['天気予報','今日の天気','いま何時','現在時刻','最新ニュース','今のニュース'])) return '私は最新の天気やニュースを取得できません。ここでは、言葉の練習を一緒にしましょう。どんな話題が好きですか？';
    if (/^[0-9０-９]+[＋+－\-*×÷/][0-9０-９]+(?:は|=|？|\?)?$/.test(s)) {
      var m=s.match(/^(\d+)([+\-－*×÷/])(\d+)/);
      if(m) { var a=Number(m[1]),b=Number(m[3]), v=m[2]==='+'?a+b:m[2]==='-'||m[2]==='－'?a-b:m[2]==='*'||m[2]==='×'?a*b:b? a/b:null; if(v!==null && Number.isFinite(v)) return String(v)+'です。ほかにも計算してみますか？'; }
    }
    if (containsAny(s,['どうして','なぜ','教えて','とは','何ですか','なんですか','どうやって'])) {
      if(state.topic) return 'いい質問ですね。詳しい知識を調べる機能はありませんが、'.concat(interestQuestion(state.topic,state));
      return 'ご質問ありがとう。私は会話の練習用なので、知らないことを正確に調べることはできません。知りたいことを、もう少し短く言ってみますか？';
    }
    if (containsAny(s,['はい','うん','そう','もちろん','いいです','いいよ','大丈夫'])) {
      return choose(['ありがとうございます。'.concat(interestQuestion(state.topic,state)),'そうなんですね。'.concat(interestQuestion(state.topic,state))],state);
    }
    if (containsAny(s,['いいえ','ちがう','違う','いや','ないです','ありません'])) return 'わかりました。別のお話にしましょうか？ 好きなことを一つ教えてください。';
    if (s.length <= 2) return 'うん、聞いています。もう少しだけ教えてもらえますか？';
    if (state.topic) return choose(['そうなんですね。','教えてくれてありがとう。','なるほど。'],state)+interestQuestion(state.topic,state);
    return choose(['お話ししてくれてありがとう。今のことを、もう少し聞かせてください。','なるほど。そこから、どんなことがありましたか？','話してくれてありがとうございます。それについてどう感じましたか？'],state);
  }
  function respond(state, text) {
    if (!state || !scenes[state.sceneKey]) throw Error('会話の開始が必要です');
    var s=normalize(text);
    if(!s) return {reply:'短い言葉で大丈夫です。何か一言、入力してみてください。', state:state};
    if (s.length > 500) s=s.slice(0,500);
    state.turns++;
    state.recent.push(s);
    if (state.recent.length>8) state.recent.shift();
    var bank=scenes[state.sceneKey];
    if(state.sceneKey==='free' || state.ended) {
      var freeReply=contextualReply(s,state);
      state.lastQuestion=freeReply;
      return {reply:freeReply,state:state};
    }
    if (containsAny(s,['終わり','やめる','おしまい','さようなら','またね'])) {
      state.ended=true;
      return {reply:bank.done || 'お話ししてくれてありがとう。また話しましょう。',state:state};
    }
    if(containsAny(s,['わからない','難しい','むずかしい','ヒント','教えて','例を'])) {
      var current=bank.steps[Math.min(state.step, bank.steps.length-1)];
      var sample=current && current.keys && current.keys.length? '「'+current.keys[0]+'」や「'+current.keys[Math.min(1,current.keys.length-1)]+'」などでもいいですよ。':'「はい」「いいえ」などの短い言葉でも大丈夫です。';
      return {reply:sample+' '+(current?current.ask:'一言で答えてみましょう。'),state:state};
    }
    if (containsAny(s,['ありがとう','ありがとうございます']) && state.step>0) return {reply:'どういたしまして。'+(bank.steps[state.step]?bank.steps[state.step].ask:bank.done),state:state};
    if (state.step >= bank.steps.length) {
      state.ended=true;
      return {reply:bank.done,state:state};
    }
    var step=bank.steps[state.step];
    // V91: 雑談や質問には反応し、勝手に会話のステップを進めない。
    // 質問内容から外れた返事で「サイズは？」へ進む不具合を防止。
    var qtext=s.toLowerCase();
    var globalQuestion=containsAny(qtext,['何ができる','あなたは誰','通信','オフライン','今日の天気','何時','最新','ニュース']);
    if (globalQuestion) return {reply:contextualReply(s,state)+' '+step.ask,state:state};
    if (step.keys && step.keys.length && !step.keys.some(function(w){
      var token=String(w).normalize('NFKC').toLowerCase();
      return token.length===1 ? qtext===token || qtext.indexOf(token+'サイズ')>=0 : qtext.indexOf(token)>=0;
    })) {
      if (containsAny(qtext,['こんにちは','おはよう','こんばんは']) && state.step===0) {
        return {reply:'こんにちは。'+step.ask,state:state};
      }
      if (containsAny(qtext,['すき','好き','ゲーム','旅行','テレビ','音楽','天気','疲れた','つらい'])) {
        return {reply:contextualReply(s,state)+' '+step.ask,state:state};
      }
      return {reply:'教えてくれてありがとうございます。'+step.ask+' わからなければ「ヒント」と入力できます。',state:state};
    }
    if(state.step===0 && containsAny(s,['こんにちは','おはよう','こんばんは','はじめまして']) && s.length <= 12) return {reply:'こんにちは。'+step.ask,state:state};
    var normalized=s.toLowerCase();
    if(state.sceneKey==='cafe' && state.step===0) {
      var item=bank.items.find(function(x){return normalized.includes(x.toLowerCase());});
      if(item) state.slots.item=item;
    }
    if(state.sceneKey==='shopping' && state.step===0) {
      var item2=bank.items.find(function(x){return normalized.includes(x.toLowerCase());});
      if(item2) state.slots.item=item2;
    }
    if(state.sceneKey==='station' && state.step===0) state.slots.destination=s.slice(0,35);
    if(state.sceneKey==='cafe' && state.step===1) state.slots.size=s.slice(0,12);
    if(state.sceneKey==='shopping' && state.step===1) state.slots.quantity=s.slice(0,12);
    if(state.sceneKey==='cafe' && state.step===3 && containsAny(normalized,['はい','ある','もう一つ','追加']) && !containsAny(normalized,['ない','いいえ'])) {
      state.step=0; return {reply:'かしこまりました。追加のご注文は何にしますか？',state:state};
    }
    state.step++;
    var lead=choose(['ありがとうございます。','かしこまりました。','そうなんですね。'],state);
    if(state.step<bank.steps.length) {
      var next=bank.steps[state.step].ask;
      if(state.sceneKey==='cafe' && state.step===1 && state.slots.item) lead=state.slots.item+'ですね。';
      if(state.sceneKey==='station' && state.step===1) lead='行き先を教えてくれてありがとうございます。';
      return {reply:lead+' '+next,state:state};
    }
    state.ended=true;
    var ending=bank.done;
    if (state.sceneKey==='cafe' && state.slots.item) ending=state.slots.item+'のご注文、ありがとうございます。どうぞごゆっくり。';
    if (state.sceneKey==='shopping' && state.slots.item) ending=state.slots.item+'のお買い上げ、ありがとうございます。またお越しください。';
    return {reply:ending,state:state};
  }
  return { version:'91.0', kind:'offline-contextual-rule-engine', newSession:newSession, respond:respond, scenes:scenes };
});
