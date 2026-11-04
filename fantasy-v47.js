/* ことばファンタジーDX Ver.47：ヒント見直し・問題追加・導入演出のランダム化 */
(function(){
'use strict';
if (typeof QUIZZES === 'undefined') return;

// 既存のヒントから、正解そのものや正解の読みを直接示す部分を取り除く。
if (QUIZZES[0]) { QUIZZES[0].hintText='💡 ことわざ全体の意味と、前後の言葉のつながりを考えてみよう。'; QUIZZES[0].hintSpeech='ヒント。ことわざ全体の意味と、前後の言葉のつながりを考えてみよう。'; }
if (QUIZZES[1]) { QUIZZES[1].qHtml='「一期一会」の 正しい 読み方は？'; QUIZZES[1].qSpeech='表示された四字熟語の読み方を、選択肢から選びましょう。'; QUIZZES[1].hintText='💡 漢字の形と、これまでに見聞きした言葉を思い出してみよう。'; QUIZZES[1].hintSpeech='ヒント。漢字の形と、これまでに見聞きした言葉を思い出してみよう。'; }
if (QUIZZES[2]) { QUIZZES[2].hintText='💡 ことわざの前半と後半をつなげて、全体の意味を考えてみよう。'; QUIZZES[2].hintSpeech='ヒント。ことわざの前半と後半をつなげて、全体の意味を考えてみよう。'; }
if (QUIZZES[3]) { QUIZZES[3].hintText='💡 ことばの中の情景を思い浮かべ、全体の意味から考えてみよう。'; QUIZZES[3].hintSpeech='ヒント。ことばの中の情景を思い浮かべ、全体の意味から考えてみよう。'; }
if (QUIZZES[4]) { QUIZZES[4].hintText='💡 うまくいかないときにも続ける気持ちを表す、ことわざの意味を考えてみよう。'; QUIZZES[4].hintSpeech='ヒント。うまくいかないときにも続ける気持ちを表す、ことわざの意味を考えてみよう。'; }
if (QUIZZES[5]) { QUIZZES[5].hintText='💡 ことわざ全体が伝えたいことを、自分の言葉で考えてみよう。'; QUIZZES[5].hintSpeech='ヒント。ことわざ全体が伝えたいことを、自分の言葉で考えてみよう。'; }

function quiz(question, choices, answerIndex, hint, explanation){
  return {
    qHtml: question,
    qSpeech: question.replace(/<[^>]*>/g,'').replace(/[「」『』]/g,''),
    opts: choices.map(function(text){return {html:text,speech:text.replace(/<[^>]*>/g,'')};}),
    a: answerIndex,
    hintText:'💡 '+hint,
    hintSpeech:'ヒント。'+hint,
    expHtml:'【ことばのポイント】'+explanation,
    expSpeech:explanation
  };
}
var added = [
 quiz('朝、会った人への あいさつは どれ？',['おやすみなさい','おはようございます','さようなら','いただきます'],1,'一日の始まりに使うあいさつです。','あいさつは、時間や場面に合わせて使い分けます。'),
 quiz('のどが かわいたとき、相手に何と伝えますか？',['水をください','本をください','くつをください','電車をください'],0,'飲んで体をうるおすものを考えてみましょう。','必要なものを短い言葉でお願いできます。'),
 quiz('食事の前にすることとして自然なのは？',['電話をする','靴を洗う','手を洗う','窓を閉める'],2,'食べる前に、手を清潔にする習慣です。','食事の前は手を洗うと衛生的です。'),
 quiz('雨の日、ぬれないように使うものは？',['時計','えんぴつ','スプーン','かさ'],3,'広げて頭の上にさす道具を考えましょう。','雨の日には傘を使うことがあります。'),
 quiz('今の時刻を知るために見るものは？',['お皿','時計','くつした','まくら'],1,'時間を知らせる道具です。','時計を見ると時刻を確認できます。'),
 quiz('電車に乗る場所はどこですか？',['駅','台所','薬局','お風呂'],0,'線路や改札、ホームがある場所です。','電車は駅から乗ることができます。'),
 quiz('お店で品物の値段を知りたいときは？',['また来ます','いただきます','これはいくらですか','おやすみなさい'],2,'値段を尋ねる言い方を選びましょう。','分からないことは店員さんに尋ねられます。'),
 quiz('病院で頭が痛いことを伝えるなら？',['お腹がすきました','頭が痛いです','よく眠れました','電車に乗ります'],1,'今の体の状態を伝える言葉です。','体調は、感じていることを具体的に伝えます。'),
 quiz('相手の説明が聞き取れなかったときは？',['もう一度説明してください','分かりました','先に帰ります','いただきます'],0,'もう一度聞きたいことを伝えます。','分からないときは、繰り返しをお願いできます。'),
 quiz('疲れたので少し休みたいときは？',['もっと急いでください','これをください','少し休みたいです','お会計をお願いします'],2,'今の体調と、したいことを考えましょう。','休憩が必要なときは、相手に伝えて構いません。'),
 quiz('相手に迷惑をかけてしまったときの言葉は？',['ごめんなさい','いただきます','おかえりなさい','いってきます'],0,'謝るときに使う言葉です。','場面に合ったあいさつや言葉を選びます。'),
 quiz('相手が手伝ってくれたときの言葉は？',['いりません','さようなら','もう一度','ありがとうございます'],3,'助けてもらった気持ちを伝えます。','感謝の気持ちは言葉で伝えられます。'),
 quiz('寒い日に体を温かくするためにすることは？',['冷たい水をかぶる','上着を着る','窓を全部開ける','靴を脱いで外へ出る'],1,'体を冷やさないための行動を考えましょう。','気温に合わせて服装を調整します。'),
 quiz('暗い部屋を明るくしたいときは？',['電気をつける','本を閉じる','靴を洗う','電話を切る'],0,'部屋の明るさを変える操作です。','照明を使うと部屋を明るくできます。'),
 quiz('「大きい」の反対に近い言葉は？',['長い','重い','小さい','高い'],2,'大きさを比べる言葉です。','反対の意味を考えると語彙を広げられます。'),
 quiz('「買う」と反対の意味に近い言葉は？',['売る','使う','選ぶ','作る'],0,'お店で品物とお金のやりとりを考えましょう。','買うと売るは反対の関係です。'),
 quiz('荷物が重くて持てないとき、どう伝えますか？',['もう大丈夫です','手伝ってください','おやすみなさい','お会計です'],1,'助けが必要なことを伝えます。','困ったときは、具体的に手伝いを頼めます。'),
 quiz('相手の声が小さくて聞こえません。何と伝えますか？',['よく聞こえます','もう帰ります','もう少し大きな声でお願いします','いりません'],2,'聞き取りにくいことを伝え、お願いしましょう。','聞こえにくいときは、話し方を調整してもらえます。'),
 quiz('料理を食べるときに使う道具はどれ？',['まくら','くつした','スプーン','かさ'],2,'食事のときに手に持つ道具を考えましょう。','食べるものに合わせて道具を使います。'),
 quiz('歯をきれいにするために使うものは？',['はぶらし','はさみ','定規','鍵'],0,'歯みがきで使う道具です。','歯ブラシは歯をみがくために使います。'),
 quiz('お店で袋が必要なときは？',['袋をお願いします','診察に来ました','道を教えてください','電話を切ります'],0,'買ったものを入れる物をお願いする言葉です。','必要な物を具体的にお願いできます。'),
 quiz('約束に遅れそうなとき、相手に伝えることは？',['もう着きました','少し遅れます','おやすみなさい','いただきます'],1,'予定どおりに行けないことを知らせます。','予定が変わるときは、早めに連絡します。'),
 quiz('駅で乗り場が分からないときは？',['駅員さんに聞く','その場で目を閉じる','店で会計する','お風呂に入る'],0,'駅の案内をしてくれる人に尋ねられます。','分からないときは、駅員さんに確認できます。'),
 quiz('家の鍵を閉めるのは、主にいつですか？',['家を出るとき','ご飯を食べるときだけ','歯をみがくときだけ','テレビを見るとき'],0,'家を離れる場面を考えましょう。','外出時には戸締まりを確認します。'),
 quiz('食べ物が熱すぎてすぐに食べられません。どうしますか？',['急いで飲み込む','少し冷ましてから食べる','床に置く','目を閉じて食べる'],1,'やけどをしないための行動です。','熱い食べ物は無理せず冷ましてから食べます。')
];
Array.prototype.push.apply(QUIZZES, added);

// 起動時の案内キャラクターと台詞を毎回ランダムに変更。
var INTRO_CHARACTERS = [
 {name:'ねこまる',src:'images/ivent/cat_1_crop.png?v=69',rareImages:['images/ivent/cat_1_crop_2.png?v=69','images/ivent/cat_1.png?v=69'],greetings:['やあ！　今日も言葉の冒険へ出発だ！','こんにちは！　また会えてうれしいな！','待っていたよ。ことばの世界へようこそ！'],encourage:['あせらなくて大丈夫。ひとつずつ考えてみよう。','君のペースで進めば大丈夫だよ。','迷ったら、問題をもう一度ゆっくり読もう。'],tips:['選択肢をよく見比べると、考えやすくなるよ。','答えを急がず、最後まで問題を読んでみよう。','分からないときはヒントを使ってみよう。'],starts:['準備はいいかな？　冒険を始めよう！','それじゃあ、スタート！','さあ、今日の冒険をはじめよう！']},
 {name:'こねこ',src:'images/ivent/2_neko.PNG?v=69',greetings:['こんにちは！　いっしょに冒険しよう！','やった、来てくれたね！','ことばの冒険へようこそ！'],encourage:['まちがえても大丈夫。次の問題でまた挑戦！','ゆっくりでいいよ。ひとつずついこう。','自分のペースで進めようね。'],tips:['問題の大事なところに注目してみてね。','迷ったら選択肢を比べてみよう。','ヒントは考える助けに使ってね。'],starts:['それじゃあ、スタート！','さあ、冒険に出発だ！','準備ができたら始めよう！']},
 {name:'しらす隊長',src:'images/ivent/3_sirasu.PNG?v=69',greetings:['冒険者よ、よく来た！','本日の訓練を始めよう！','ことばの世界へ、ようこそ！'],encourage:['あわてず、問題を最後まで読もう。','一問ずつ落ち着いて進めばよい。','考える時間も大切な訓練だ。'],tips:['選択肢の意味を順番に確認しよう。','問題文と選択肢をよく見比べよう。','必要ならヒントを活用しよう。'],starts:['準備完了！　出発だ！','訓練開始！　健闘を祈る！','さあ、挑戦を始めよう！']},
 {name:'クロ',src:'images/ivent/3_neko2.PNG?v=69',greetings:['ニャッ！　ことばの世界へようこそ。','待ってたよ。今日は何問解けるかな？','やあ、また冒険に来たね！'],encourage:['君のペースで進めばいいよ。','わからないときは、深呼吸して考えよう。','一つずつ、落ち着いていこう。'],tips:['選択肢をゆっくり見くらべるんだ。','大事な言葉を見つけてみよう。','ヒントを見て、もう一度考えてみてね。'],starts:['さあ、冒険を始めよう！','行こう！　新しい問題が待っているよ！','準備はいい？　スタート！']},
 {name:'大根猫',src:'images/ivent/cat_1_crop2.png?v=69',greetings:['にゃーん！　大根猫がやってきたよ！','元気いっぱい、大根猫だよ！'],encourage:['ゆっくり考えてみよう。','すぐに分からなくても大丈夫。'],tips:['問題をよく見てみよう。','必要なら聞き直してみよう。'],starts:['一緒に冒険へ行こう！','さあ、始めよう！']},
 {name:'黒丸',src:'images/ivent/cat_05_1.png?v=69',rareImages:['images/ivent/cat_05_2.png?v=69'],greetings:['にゃっ。ぼくは黒丸。よろしく。','黒丸だよ。今日も一緒に進もう。'],encourage:['ひとつずつ、落ち着いていこう。','自分のペースで大丈夫だよ。'],tips:['選択肢をよく見くらべてね。','大事な言葉に注目してみよう。'],starts:['準備ができたら出発だよ。','さあ、冒険を始めよう！']},
 {name:'かぼちゃおじいさん',src:'images/ivent/1_oji.png?v=69',rareImages:['images/ivent/2_oji.png?v=69'],greetings:['ほっほっほ、わしはかぼちゃおじいさんじゃ。','よく来たのう。わしが案内しよう。'],encourage:['急がず一歩ずつ進むのがよいぞ。','考える時間を大切にしなさい。'],tips:['問題文をよく読むと手がかりが見つかるぞ。','選択肢を一つずつ比べるのじゃ。'],starts:['では、旅に出発しよう。','さあ、冒険へ進もうぞ。']},
 {name:'ことばガイド',src:'images/ivent/avatar_default_03.png?v=69',greetings:['ことばファンタジーDXへようこそ！','今日も言葉の練習を始めましょう。','冒険の準備ができました！'],encourage:['問題を読み、答えをよく考えて選びましょう。','一度に全部できなくても大丈夫です。','ご自身のペースで進めてください。'],tips:['ヒントは答えそのものではなく、考える手助けです。','選択肢を比べ、場面に合うものを考えましょう。','分からないときは、もう一度読み直してみましょう。'],starts:['それでは、冒険を始めましょう！','準備ができたらスタートです！','さあ、一緒に始めましょう！']}
];
function randomChoice(items){return items[Math.floor(Math.random()*items.length)];}
if (typeof startConversationEvent === 'function' && typeof EVENT_STEPS !== 'undefined') {
 startConversationEvent = function(){
  eventIndex = 0;
  var character = INTRO_CHARACTERS[Math.floor(Math.random()*INTRO_CHARACTERS.length)];
  var isRare = Array.isArray(character.rareImages) && character.rareImages.length > 0 && Math.random() < 0.05;
  var displayImage = isRare ? randomChoice(character.rareImages) : character.src;
  activeEventCharacter = {name:character.name, image:displayImage, isRare:isRare, baseImage:character.src};
  var image = document.querySelector('#eventOverlay .event-character img');
  if(image){
   image.onerror = function(){if(this.src !== character.src){this.onerror=null;this.src=character.src;var w=this.closest('.event-character');if(w)w.classList.remove('rare-event');}};
   image.src=displayImage;image.alt=character.name;
  }
  var wrap = document.querySelector('#eventOverlay .event-character');
  if(wrap)wrap.classList.toggle('rare-event',isRare);
  if(typeof setRandomKotobaEventBackground === 'function')setRandomKotobaEventBackground(document.querySelector('#eventOverlay .event-bg'));
  else {
   var bgs=['back_1.jpg','back_2.jpg','back_3.jpg','back_4.jpg','back_5.jpg'];
   var bg=document.querySelector('#eventOverlay .event-bg');
   if(bg){var last='';try{last=sessionStorage.getItem('kotoba-last-event-bg')||'';}catch(e){}var choices=bgs.filter(function(x){return x!==last;});var name=randomChoice(choices.length?choices:bgs);try{sessionStorage.setItem('kotoba-last-event-bg',name);}catch(e){}bg.style.backgroundImage='linear-gradient(rgba(0,0,0,.08), rgba(0,0,0,.18)), url("images/ivent/'+name+'?v=69")';bg.dataset.background=name;}
  }
  EVENT_STEPS.splice(0,EVENT_STEPS.length);
  [randomChoice(character.greetings),randomChoice(character.encourage),randomChoice(character.tips),randomChoice(character.starts)].forEach(function(line){EVENT_STEPS.push({name:character.name,text:line});});
  renderEventStep();
 };
}

// 別アプリ・タブを閉じる／切り替えるとき、読み上げとゲーム音を止めます。
function stopFantasyAudio(){try{if(window.speechSynthesis)window.speechSynthesis.cancel();}catch(e){}try{if(typeof audioCtx!=='undefined'&&audioCtx&&audioCtx.state==='running')audioCtx.suspend();}catch(e){}try{if(typeof clearGameActionTimers==='function')clearGameActionTimers();}catch(e){}}
window.addEventListener('pagehide',stopFantasyAudio);
window.addEventListener('beforeunload',stopFantasyAudio);
document.addEventListener('visibilitychange',function(){if(document.hidden)stopFantasyAudio();});
})();
