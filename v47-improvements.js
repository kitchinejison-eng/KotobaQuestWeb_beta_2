/* ことばクエスト Ver.47
   脳トレと失語症トレーニングの実用性改善。答えを選択前に出さない。 */
(function(){
'use strict';
if (typeof QUESTIONS === 'undefined' || typeof renderQuestion !== 'function') return;
var $v = function(id){ return document.getElementById(id); };
function shuffleV(arr){ var a=arr.slice(); for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;} return a; }
function setActivityName(id, name, desc){
  [GENRES, TRAINING_CATEGORIES].forEach(function(groups){(groups||[]).forEach(function(group){(group.activities||[]).forEach(function(item){if(item[0]===id){item[1]=name;if(desc)item[2]=desc;}});});});
}
setActivityName('matching','文字・画像マッチング','文字を見て、名前のない絵カードから合う絵を選びます。');
setActivityName('anagram','文字並べ替え','ばらばらの文字タイルを押して、言葉を組み立てます。');
setActivityName('copy','写字・見写し','見本を見ながら、画面の用紙に指やマウスで実際に書きます。');
setActivityName('tf','○×・意味理解','文を読んで意味を考え、○か×を選びます。違っても正解はすぐに表示しません。');
setActivityName('gesture','画像の動作を答える','写真を見て、人物の動きを4つの選択肢から答えます。');
setActivityName('roleplay','生活の場面で伝える','買い物・病院・カフェなどの場面写真を見て、言葉カードかマイクで答えます。');

// 絵・画像は画面に文字名を重ねず、文字とJPG写真を対応させる課題に使います。
// beta4: 認知・理解の絵合わせは専用JPGを使用する。
// ファイルを独立させることで他ジャンルの写真を変えずに差し替えできる。
var MATCH_JPG_FILES = {
 'りんご':'apple.jpg','バナナ':'banana.jpg','みかん':'mandarin.jpg',
 'コーヒー':'coffee.jpg','さくら':'sakura.jpg','手洗い':'handwash.jpg',
 'ごはん':'rice.jpg','おふろ':'bath.jpg','晴れ':'sunny.jpg',
 'コップ':'cup.jpg','タオル':'towel.jpg','おさら':'plate.jpg',
 'えんぴつ':'enpitsu.jpg','バス':'bus.jpg','くるま':'kuruma.jpg',
 'くつ':'kutu.jpg','かさ':'kasa.jpg','くま':'kuma.jpg',
 'ねこ':'neko.jpg','みず':'mizu.jpg','とけい':'tokei.jpg',
 'かばん':'kaban.jpg','ほん':'hon.jpg','いす':'isu.jpg',
 'さくらんぼ':'sakuranbo.jpg','スマートフォン':'smartphone.jpg',
 'じてんしゃ':'jitensha.jpg','たまご':'tamago.jpg','パン':'pan.jpg',
 'せっけん':'sekken.jpg','めがね':'megane.jpg'
};
// 元のSVG候補一覧を経由せず、最初から専用JPGだけを参照する。
var MATCH_ITEMS = Object.keys(MATCH_JPG_FILES).map(function(label){
 return {label:label,image:'images/quiz-jpg/matching/'+MATCH_JPG_FILES[label],emoji:''};
});
QUESTIONS.matching = MATCH_ITEMS.map(function(item){
 return {kind:'picture-match', question:'この文字に合う絵を選びましょう。', target:item.label, answer:item.label, image:item.image, emoji:item.emoji, hint:'文字をゆっくり見て、絵の形や使い道を思い浮かべましょう。'};
});

// 意味理解は答えを明かさない共通ヒントにし、30問を登録。
var TF_ITEMS = [
 ['バナナは食べ物です。','○'],['魚は空を飛びます。','×'],['雨の日に傘を使うことがあります。','○'],['電車は線路を走ります。','○'],['靴は手にはめて使います。','×'],['時計を見ると時間が分かります。','○'],['りんごは飲み物です。','×'],['歯みがきは歯をきれいにするためにします。','○'],['お風呂では体を洗うことがあります。','○'],['夏は毎日必ず雪が降ります。','×'],['病院では診察を受けることがあります。','○'],['椅子に座るときは、立ったまま座ります。','×'],['パンは食べ物です。','○'],['水は飲むことができます。','○'],['夜に会った人へのあいさつは、いつも「おはようございます」です。','×'],['駅には電車が来ることがあります。','○'],['手袋は手にはめて使います。','○'],['傘は雨を飲むための道具です。','×'],['食事をすると、おなかがいっぱいになることがあります。','○'],['電話を使って、離れた人と話すことができます。','○'],['はさみは紙を切るときに使います。','○'],['冷蔵庫は食べ物を温めるために使います。','×'],['信号が赤のときは、必ず進んでよいです。','×'],['薬は自分の判断で、いつも決められた量より多く飲みます。','×'],['台所は料理をする場所の一つです。','○'],['駅では改札や案内表示を見かけることがあります。','○'],['桜は一年中、必ず満開です。','×'],['すべての魚は海に住んでいます。','×'],['手を洗うときは水やせっけんを使うことがあります。','○'],['電話を切る前に、相手へあいさつをすることがあります。','○']
];
QUESTIONS.tf = TF_ITEMS.map(function(x,i){return {kind:'true-false', question:'文の内容を考えましょう。', prompt:x[0], statement:x[0], answer:x[1], hint:'文を最後まで読み、実際の生活や経験と照らし合わせましょう。', itemNo:i+1};});

// 文字並べ替え：見本の答えは表示せず、文字タイルから組み立てる。
var ANAGRAM_ITEMS = [
 ['りんご',['ご','り','ん'],'食べ物の名前です。'],['さくら',['ら','さ','く'],'花の名前です。'],['くるま',['ま','く','る'],'乗り物の名前です。'],['でんしゃ',['ゃ','で','し','ん'],'乗り物の名前です。'],['とけい',['い','と','け'],'時間を見る道具です。'],['みず',['ず','み'],'飲み物です。'],['はさみ',['み','は','さ'],'文房具の一つです。'],['かばん',['ん','か','ば'],'持ち物を入れるものです。'],['たまご',['ご','た','ま'],'料理に使う食材です。'],['かさ',['さ','か'],'雨の日に使います。'],['ほん',['ん','ほ'],'読んだり、見たりするものです。'],['めがね',['ね','め','が'],'目にかける道具です。'],['くつした',['た','く','し','つ'],'足にはくものです。'],['たまねぎ',['ぎ','た','ね','ま'],'野菜の名前です。'],['はみがき',['き','は','み','が'],'歯をきれいにする習慣です。'],['おにぎり',['り','お','ぎ','に'],'ごはんで作る食べ物です。'],['てぶくろ',['ろ','て','ぶ','く'],'寒い日に手にはめます。'],['かがみ',['み','か','が'],'自分の姿を映します。'],['しんぶん',['ん','し','ぶ','ん'],'ニュースなどが載っています。'],['つくえ',['え','つ','く'],'勉強や作業に使う家具です。'],['いちご',['ご','い','ち'],'赤い果物です。'],['ふとん',['ん','ふ','と'],'寝るときに使います。'],['とまと',['と','ま','と'],'赤い野菜・食材の一つです。'],['すいか',['か','す','い'],'夏に食べることの多い果物です。'],['おさら',['ら','お','さ'],'食事を盛りつけます。'],['すぷーん',['ー','す','ん','ぷ'],'食事に使う道具です。'],['はぶらし',['し','は','ら','ぶ'],'歯をみがく道具です。'],['えき',['き','え'],'電車に乗り降りする場所です。'],['やさい',['い','や','さ'],'畑などで育つ食べ物です。'],['としょかん',['ん','と','か','しょ'],'本を読んだり借りたりする場所です。']
];
QUESTIONS.anagram = ANAGRAM_ITEMS.map(function(x,i){return {kind:'anagram',question:'文字タイルを正しい順番に並べましょう。',answer:x[0],tokens:x[1],hint:'文字を一つずつ声に出して、言葉のまとまりを考えましょう。',itemNo:i+1};});

// 写字：1～4文字の短い課題。漢字・ひらがな・カタカナを混ぜて練習します。
var COPY_ITEMS = [
 '山','川','水','木','花','空','雨','手','足','人','日','月','本','田','口','目','耳','火','犬','猫',
 '家','道','駅','鍵','靴','傘','魚','鳥','星','朝','夜','春','夏','秋','冬',
 '学校','病院','電話','時計','名前','食事','財布','電車','自転車','机','図書館',
 'いぬ','ねこ','みず','そら','はな','かさ','くつ','りんご','さくら','おはよう',
 'バス','パン','コップ','ノート','カメラ','トマト','テレビ'
];
QUESTIONS.copy = COPY_ITEMS.map(function(x,i){return {kind:'handwriting',question:'見本と同じ文字を、1文字ずつ書き写してください。書き終わると自動で判定します。',prompt:x,answer:x,hint:'一文字ずつ、形と順番に注目して書きましょう。',itemNo:i+1};});

// 動作画像の4択問題。旧式の自己申告/まねる課題の定義は互換性のため残し、出題には使用しない。
function optsV(answer, distractors){return shuffleV([answer].concat(distractors));}
var GESTURE_ITEMS = [
 {scene:'お店の商品がほしいです。商品を指さしながら、何と言いますか？',img:'images/scenes/shop.svg',emoji:'🛍️',a:'これをください',o:['これはいくらですか','袋をお願いします','少し考えます']},
 {scene:'相手にお礼を伝えます。軽くおじぎをするとき、言葉を添えるなら？',img:'images/scenes/conversation.svg',emoji:'🙏',a:'ありがとうございます',o:['すみません','お願いします','大丈夫です']},
 {scene:'トイレに行きたいです。トイレの表示を指さして、何と伝えますか？',img:'images/scenes/toilet.svg',emoji:'🚻',a:'トイレはどこですか',o:['出口はどこですか','手を洗う場所はどこですか','水をください']},
 {scene:'相手の言葉が聞き取れません。耳に手を当てて、何と伝えますか？',img:'images/scenes/conversation.svg',emoji:'👂',a:'もう一度言ってください',o:['ゆっくり話してください','文字で書いてください','もう一度見せてください']},
 {scene:'荷物が重くて困っています。手を差し出して、何と頼みますか？',img:'images/scenes/work.svg',emoji:'📦',a:'手伝ってください',o:['これを持ってください','少し待ってください','別のものをください']},
 {scene:'少し待ってほしいです。手のひらで合図をしながら、何と伝えますか？',img:'images/scenes/conversation.svg',emoji:'✋',a:'少し待ってください',o:['もう一度お願いします','ゆっくりお願いします','先にどうぞ']},
 {scene:'ひざが痛いです。痛い場所を指さしながら、何と伝えますか？',img:'images/scenes/hospital.svg',emoji:'🩹',a:'ここが痛いです',o:['気分が悪いです','ここがかゆいです','少し休みたいです']},
 {scene:'駅で行き先が分かりません。案内表示を指さしながら、何と頼みますか？',img:'images/scenes/transit.svg',emoji:'🚉',a:'行き方を教えてください',o:['駅まで何分ですか','出口はどこですか','切符売り場はどこですか']},
 {scene:'もう一度見たいです。相手に繰り返しの合図をして、何と伝えますか？',img:'images/scenes/conversation.svg',emoji:'🔁',a:'もう一度見せてください',o:['もう一度説明してください','ゆっくり話してください','文字で書いてください']},
 {scene:'話す速さをゆっくりにしてほしいです。手で合図をしながら、何と頼みますか？',img:'images/scenes/conversation.svg',emoji:'🐢',a:'ゆっくり話してください',o:['もう一度言ってください','文字で書いてください','少し大きな声でお願いします']},
 {scene:'話をいったん止めてほしいです。手のひらで合図をして何と伝えますか？',img:'images/scenes/work.svg',emoji:'✋',a:'ちょっと待ってください',o:['少し時間をください','あとでお願いします','今はできません']},
 {scene:'うなずく動作に言葉を添えて、相手に同意を伝えます。どの言葉が合いますか？',img:'images/scenes/conversation.svg',emoji:'🙂',a:'はい',o:['いいえ','分かりません','もう一度お願いします']},
 {scene:'首を横に振って断ります。言葉でも伝えるなら？',img:'images/scenes/conversation.svg',emoji:'🙅',a:'いいえ',o:['はい','ありがとうございます','お願いします']},
 {scene:'昼に知り合いに会いました。手を振りながら、何とあいさつしますか？',img:'images/scenes/conversation.svg',emoji:'👋',a:'こんにちは',o:['おはようございます','こんばんは','お疲れさまです']},
 {scene:'説明が分からず困っています。首をかしげて、何と伝えますか？',img:'images/scenes/conversation.svg',emoji:'❓',a:'よく分かりません',o:['もう一度教えてください','文字で書いてください','少し考えます']},
 {scene:'いくつかの商品から選びました。選んだ物を指さして何と伝えますか？',img:'images/scenes/shop.svg',emoji:'👉',a:'こちらにします',o:['少し考えます','値段を教えてください','これを見せてください']},
 {scene:'食事を注文します。メニューを指さしながら何と伝えますか？',img:'images/scenes/cafe.svg',emoji:'🍽️',a:'これをお願いします',o:['メニューを見せてください','水をください','おすすめはどれですか']},
 {scene:'座って休みたいです。椅子を指さしながら何と伝えますか？',img:'images/scenes/home.svg',emoji:'🪑',a:'少し休みたいです',o:['水をください','横になりたいです','今日は帰ります']},
 {scene:'もう一つほしいです。指を一本立てて何と伝えますか？',img:'images/scenes/cafe.svg',emoji:'☝️',a:'もう一つください',o:['あと一つお願いします','これで大丈夫です','もう少しください']},
 {scene:'相手にこちらへ来てほしいです。手招きをして何と伝えますか？',img:'images/scenes/conversation.svg',emoji:'🫴',a:'こちらに来てください',o:['あちらへ行ってください','こちらで待ってください','あとで来てください']}
];
var GESTURE_HINTS = [
 '欲しい品物を指さすと、相手に伝わりやすくなります。','感謝を示すときのあいさつです。',
 '建物内で目的の場所を探すときの質問です。','聞き取れなかったことを耳の動きで表します。',
 '一人では重い物を運べない場面です。','手のひらを相手に向ける合図です。',
 '体のどこがつらいかを指で示します。','地図や案内板を相手と一緒に見ます。',
 '先ほど見たものを再び見たい場面です。','相手の話す速さを変えてほしい場面です。',
 '作業をいったん止める動きに注目しましょう。','首を縦に動かす意味を考えましょう。',
 '首を横に動かす意味を考えましょう。','昼間に知り合いと出会った場面です。',
 '説明を理解できず困ったときの表現です。','いくつかの品物の中から選び終えた場面です。',
 '飲食店で注文する商品を指しています。','疲れたときに座れる場所を示しています。',
 '立てた指の数に注目しましょう。','手の動きで相手を自分の方へ呼ぶ場面です。'
];
function indexedSceneJpg(prefix, index){return 'images/scenes-jpg/'+prefix+'-'+String(index).padStart(2,'0')+'.jpg';}
// 動きを見て意味を答える4択問題。写真の人物が実際に行っている動作に合わせ、
// 同じ指さし写真の乱用や、複数の選択肢が正しく見える組み合わせを避ける。
var GESTURE_ACTION_ITEMS = [
 ['gesture-00.jpg','商品を指さす',['おじぎをする','手を振る','耳に手を当てる']],
 ['gesture-01.jpg','おじぎをする',['手を上げる','ひざを押さえる','手のひらで止める']],
 ['gesture-02.jpg','方向を指し示す',['おじぎをする','耳に手を当てる','手でバツを作る']],
 ['gesture-03.jpg','耳に手を当てる',['地図を指さす','うなずく','手を振る']],
 ['gesture-04.jpg','箱を持ち上げる',['おじぎをする','指を一本立てる','手でバツを作る']],
 ['gesture-05.jpg','手のひらで止める',['地図を指さす','ひざを押さえる','おじぎをする']],
 ['gesture-06.jpg','ひざを押さえる',['手を振る','方向を指し示す','手を上げる']],
 ['gesture-07.jpg','地図を指さす',['耳に手を当てる','手でバツを作る','ひざを押さえる']],
 ['gesture-10.jpg','手を上げる',['おじぎをする','椅子を指す','うなずく']],
 ['gesture-11.jpg','うなずく',['手を振る','耳に手を当てる','箱を持ち上げる']],
 ['gesture-12.jpg','手でバツを作る',['手を上げる','おじぎをする','地図を指さす']],
 ['gesture-13.jpg','手を振る',['ひざを押さえる','手のひらで止める','商品を指さす']],
 ['gesture-14.jpg','頭に手を当てる',['うなずく','箱を持ち上げる','椅子を指す']],
 ['gesture-b-01.jpg','椅子を指す',['おじぎをする','手でバツを作る','耳に手を当てる']],
 ['gesture-b-02.jpg','指を一本立てる',['ひざを押さえる','うなずく','手のひらで止める']]
];
QUESTIONS.gesture = GESTURE_ACTION_ITEMS.map(function(x,i){return {kind:'gesture-choice',question:'この人は、どのような動きをしていますか？',prompt:'写真の人の動きを見て、4つから選んでください。',sceneLabel:'人物の動作の写真',image:'images/scenes-jpg/'+x[0],answer:x[1],choices:optsV(x[1],x[2]),itemNo:i+1};});

// 実生活ロールプレイ：模範文を見せず、実際の状況に合う返答を4択で練習。
var ROLEPLAY_ITEMS = [
 ['カフェでコーヒーを1杯注文したいです。','images/scenes/cafe.svg','コーヒーをください',['お水をください','お茶をください','お会計をお願いします']],
 ['お店で商品の値段を知りたいです。','images/scenes/shop.svg','これはいくらですか',['これをください','袋をお願いします','カードは使えますか']],
 ['病院の受付に来ました。診察を受けることを最初に伝えます。','images/scenes/hospital.svg','診察に来ました',['予約しています','薬の説明をお願いします','頭が痛いです']],
 ['外出中にトイレに行きたくなりました。場所を尋ねます。','images/scenes/toilet.svg','トイレはどこですか',['出口はどこですか','手を洗う場所はどこですか','駅はどこですか']],
 ['頭が痛くて、スタッフに状態を伝えます。','images/scenes/hospital.svg','頭が痛いです',['お腹が痛いです','気分が悪いです','少し休みたいです']],
 ['相手の説明が聞き取れませんでした。','images/scenes/conversation.svg','もう一度説明してください',['ゆっくり話してください','文字で書いてください','もう少し大きな声でお願いします']],
 ['説明より文字を見たほうが分かりやすいです。','images/scenes/work.svg','文字で書いてください',['ゆっくり話してください','声を大きくしてください','もう一度説明してください']],
 ['重い荷物を運ぶのが難しく、助けが必要です。','images/scenes/work.svg','手伝ってください',['これを持ってください','少し待ってください','ゆっくりお願いします']],
 ['作業を続けて疲れました。休みたいです。','images/scenes/work.svg','少し休みたいです',['今日は早く帰りたいです','水を飲みたいです','続けても大丈夫です']],
 ['店員さんに商品をすすめられましたが、必要ありません。','images/scenes/shop.svg','いりません',['少し考えます','これをください','値段を教えてください']],
 ['食事のときに水がほしいです。','images/scenes/cafe.svg','水をください',['お茶をください','メニューを見せてください','お会計をお願いします']],
 ['レストランでメニューの商品を注文します。','images/scenes/cafe.svg','これをお願いします',['これはいくらですか','メニューを見せてください','お水をください']],
 ['食事が終わり、支払いをしたいです。','images/scenes/cafe.svg','お会計をお願いします',['レシートをください','カードで払えますか','メニューをお願いします']],
 ['約束の時間に少し遅れそうです。相手へ連絡します。','images/scenes/conversation.svg','少し遅れます',['あと5分で着きます','予定を変更したいです','今日は行けません']],
 ['朝、事業所で人に会いました。あいさつをします。','images/scenes/work.svg','おはようございます',['こんにちは','お疲れさまです','よろしくお願いします']],
 ['相手が手伝ってくれました。お礼を伝えます。','images/scenes/conversation.svg','ありがとうございます',['すみません','お願いします','大丈夫です']],
 ['駅でエレベーターの場所を知りたいです。駅員さんに尋ねます。','images/scenes/transit.svg','エレベーターはどこですか',['出口はどこですか','トイレはどこですか','切符売り場はどこですか']],
 ['近くの駅がどこにあるか分かりません。場所を尋ねます。','images/scenes/transit.svg','駅はどこですか',['この電車はどこへ行きますか','切符をください','ここで降ります']],
 ['買い物袋が必要です。店員さんに伝えます。','images/scenes/shop.svg','袋をお願いします',['レジ袋はありますか','袋は有料ですか','袋は大丈夫です']],
 ['初めて使うパソコンの操作が分からず、職員に教えてほしいです。','images/scenes/work.svg','パソコンの操作を教えてください',['パソコンを片付けてください','この画面を閉じてください','今は休みたいです']],
 ['相手が早口で、話を追いにくいです。','images/scenes/conversation.svg','ゆっくり話してください',['もう一度言ってください','文字で書いてください','声を大きくしてください']],
 ['家族に今日の予定を聞かれました。今日は買い物に行く予定です。','images/scenes/home.svg','今日は買い物に行きます',['今日は家で過ごします','今日は事業所に行きます','今日は病院に行きます']],
 ['夜、家の部屋が暗いので照明をつけてほしいです。','images/scenes/home.svg','電気をつけてください',['電気を消してください','カーテンを閉めてください','電気がつきません']],
 ['薬局で、受け取った薬について全体的な説明をお願いしたいです。','images/scenes/hospital.svg','薬の説明をお願いします',['薬をもう一つください','お水をください','次の予約はいつですか']],
 ['駅で電車の乗り場を確認したいです。','images/scenes/transit.svg','何番線ですか',['電車は何時に来ますか','この電車はどこ行きですか','切符はどこで買いますか']],
 ['周りが騒がしく、相手の声が小さくて聞こえません。','images/scenes/conversation.svg','もう少し大きな声でお願いします',['ゆっくり話してください','文字で書いてください','もう一度見せてください']],
 ['作業のやり方が分からず、確認したいです。','images/scenes/work.svg','やり方をもう一度教えてください',['見本を見せてください','手順を書いてください','一緒にやってください']],
 ['花の植え替えを自分でできます。手伝おうとする人へ伝えます。','images/scenes/work.svg','自分でできます',['見守っていてください','必要なときにお願いします','少しだけ手伝ってください']],
 ['体調が悪く、今日は早く帰りたいです。','images/scenes/home.svg','体調が悪いので帰りたいです',['少し休んでから続けたいです','具合が悪いです','病院に行きたいです']],
 ['予約した時間に病院へ来ました。受付に伝えます。','images/scenes/hospital.svg','予約しています',['受付はどこですか','保険証はこちらです','診察券を忘れました']]
];
var ROLEPLAY_HINTS = [
 '店員さんに、飲みたいものを注文する場面です。','買う前に価格を確認する場面です。',
 '病院の窓口で、来た目的を最初に伝えます。','公共の場所で設備の場所を尋ねます。',
 '体の一部に不調があることを医療者に伝えます。','聞き取れなかった説明を確認する場面です。',
 '耳で聞くより、目で読んだ方が分かりやすいと伝えます。','重いものを運ぶときのお願いです。',
 '作業の途中で体を休めたいと伝えます。','すすめられた品物を必要ないときの返事です。',
 '食事と一緒に飲みたいものを頼みます。','メニューを指さして注文する場面です。',
 '食後に支払いをしたい場面です。','待ち合わせの相手に時間の変更を知らせます。',
 '朝、人に会ったときのあいさつです。','助けてくれた相手への気持ちを表します。',
 '階段が難しいときに使う設備を探しています。','駅へ行く道順を尋ねます。',
 '買ったものを入れるために必要な物を頼みます。','画面操作が分からないことをスタッフに伝えます。',
 '相手が話す速さを調整してほしい場面です。','家族に、今日の外出予定を説明します。',
 '暗い部屋を明るくするためのお願いです。','薬の使い方を薬剤師に確認します。',
 '電車に乗る場所を確認する質問です。','騒音のため、音量を変えてもらいたい場面です。',
 '手順をもう一度教わりたいときのお願いです。','自力で作業を続けられることを伝えます。',
 '体調が悪く、予定より早く帰りたい場面です。','病院の受付で、事前に決めた日時を伝えます。'
];
QUESTIONS.roleplay = ROLEPLAY_ITEMS.map(function(x,i){var a=x[2];return {kind:'four-choice',question:'場面を見て、相手に伝える言葉を考えましょう。',prompt:x[0],scene:x[0],sceneLabel:'実生活ロールプレイ',image:indexedSceneJpg(i<16?'roleplay-a':'roleplay-b',i<16?i:i-16),answer:a,choices:optsV(a,x[3]),hint:ROLEPLAY_HINTS[i]};});

// ---------------------------------------
// UI helpers and accessible answer handling
// ---------------------------------------
// Gesture and roleplay now belong to the accessible practice renderer in
// aphasia-modes.js.  Routing them here reintroduced the old 4-choice screen.
var V47_IDS = ['matching','anagram','copy','tf'];
// 実生活ロールプレイは「最初の回答」で正答率を計算します。
var roleplayAnswered = 0;
var roleplayWrong = 0;
var roleplayAdvanceTimer = null;
function el(tag, cls, text){var n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;}
function btn(text, cls, click){var b=el('button',cls,text);b.type='button';b.addEventListener('click',click);return b;}
function core(q, title, kind){
 answered=false;
 var prog=$v('progress');if(prog)prog.textContent=(current+1)+' / '+questions.length;updateScoreV47(kind);
 var cat=$v('categoryLabel');if(cat)cat.textContent=selectedCategory?selectedCategory.name:(kind==='matching'||kind==='anagram'||kind==='copy'||kind==='tf'?'脳トレ':'失語症のトレーニング');
 if($v('questionLabel'))$v('questionLabel').textContent=title||q.question||'問題';
 if($v('trainingTitle'))$v('trainingTitle').textContent=(selectedCategory?selectedCategory.name:'トレーニング')+'｜'+({matching:'文字・画像マッチング',anagram:'文字並べ替え',copy:'写字・見写し',tf:'○×・意味理解',gesture:'画像の動作を答える',roleplay:'生活の場面で伝える'}[selectedActivity]||'練習');
 var visual=$v('visualArea');if(visual)visual.classList.add('hidden');
 var prompt=$v('promptText');if(prompt){prompt.textContent='';prompt.classList.add('hidden');}
 var ins=$v('instruction');if(ins)ins.classList.add('hidden');
 var hint=$v('hint');if(hint){hint.textContent=q.hint||'';hint.classList.add('hidden');}
 var hb=$v('hintBtn');if(hb){hb.classList.toggle('hidden',!hintEnabled||!q.hint);hb.textContent='💡 ヒント';}
 var sb=$v('speakBtn');if(sb)sb.textContent='🔊 問題を聞く';
 var area=$v('answerArea');if(area){area.innerHTML='';area.className='answer-area v47-answer-area';}
 var fb=$v('feedback');if(fb){fb.textContent='';fb.className='feedback';}
 var next=$v('nextBtn');if(next){next.classList.add('hidden');next.textContent='次へ →';}
 if($v('game'))$v('game').classList.remove('aphasia-clear-mode-active');document.body.classList.remove('aphasia-clear-mode-active');
 return area;
}
function updateScoreV47(kind){
 var scr=$v('score');if(!scr)return;
 if(selectedActivity==='roleplay'){
  var rate=roleplayAnswered?Math.round(score/roleplayAnswered*100):0;
  scr.textContent='正解 '+score+'/'+roleplayAnswered+(roleplayAnswered?'・'+rate+'%':'・—');
  scr.title='回答した問題の正答率。正解 '+score+'問、不正解 '+roleplayWrong+'問';
  scr.setAttribute('aria-label','正解 '+score+'問、回答 '+roleplayAnswered+'問、正答率 '+(roleplayAnswered?rate+'%':'まだ回答なし'));
  return;
 }
 scr.textContent=(kind==='copy'?'初回正解 ':'正解 ')+score;
}
function completeCorrectV47(button, message, kind){
 if(answered)return;answered=true;
 if(selectedActivity==='roleplay')roleplayAnswered++;
 score++;updateScoreV47(kind);if(button)button.classList.add('v47-correct');
 var fb=$v('feedback');if(fb){fb.textContent='正解です。できました。'+(message && message.indexOf('正解です。できました。')<0?' '+message:'');fb.className='feedback ok';}
 if(typeof playCorrectSound==='function')playCorrectSound();
 if(typeof announceCorrect==='function')announceCorrect();
 document.querySelectorAll('.v47-option-button,.v47-picture-button,.v47-token,.tf-choice').forEach(function(b){b.disabled=true;});
 var next=$v('nextBtn');if(next)next.classList.remove('hidden');
}
function wrongNoRevealV47(button, msg){
 if(answered)return;
 if(button){button.classList.add('v47-wrong');button.disabled=true;}
 answered=true;
 if(selectedActivity==='roleplay'){roleplayAnswered++;roleplayWrong++;updateScoreV47('roleplay');}
 document.querySelectorAll('.v47-option-button,.v47-picture-button,.v47-token,.tf-choice').forEach(function(b){b.disabled=true;});
 var fb=$v('feedback');
 var text=msg||'不正解です。次の問題へ進みます。';
 if(fb){fb.textContent='不正解です。'+(text.indexOf('不正解です')===0?text.substring('不正解です'.length).replace(/^。?/, '。'):' '+text)+' 次の問題へ進みます。';fb.className='feedback ng';}
 if(typeof playWrongSound==='function')playWrongSound();
 if(roleplayAdvanceTimer)clearTimeout(roleplayAdvanceTimer);
 var questionAtAnswer=current;
 roleplayAdvanceTimer=setTimeout(function(){
  roleplayAdvanceTimer=null;
  var game=$v('game');
  if(current===questionAtAnswer && game && game.classList.contains('active') && typeof nextQuestion==='function')nextQuestion();
 },1400);
}
function renderFourChoiceV47(q, mode){
 var area=core(q,q.question,'choice');if(!area)return;
 var wrap=el('div','v47-task-panel v47-scenario-panel');
 var top=el('div','v47-scene-top');
 if(q.image){var im=el('img','v47-scene-image');im.src=q.image;im.alt=q.sceneLabel||'場面のイラスト';im.onerror=function(){this.style.display='none';};top.appendChild(im);}
 else if(q.emoji)top.appendChild(el('div','v47-scene-emoji',q.emoji));
 top.appendChild(el('div','v47-scene-prompt',q.prompt||q.scene||''));wrap.appendChild(top);
 wrap.appendChild(el('p','v47-short-instruction',mode==='gesture'?'身ぶりと一緒に使う言葉を選びましょう。':'相手に伝える言葉を4つから選びましょう。'));
 var grid=el('div','v47-four-grid');shuffleV(q.choices||[]).forEach(function(choice){var b=btn(choice,'v47-option-button',function(){if(answered)return;if(choice===q.answer)completeCorrectV47(b,'⭕ いい選択です！',null);else wrongNoRevealV47(b,'もう一度、場面を考えてみましょう。正解はまだ表示しません。');});grid.appendChild(b);});wrap.appendChild(grid);
 area.appendChild(wrap);
}
function renderMatchingV47(q){
 var area=core(q,'文字に合う絵を選びましょう。','match');var wrap=el('div','v47-task-panel');
 wrap.appendChild(el('p','v47-mode-instruction','この文字と同じものの絵を、下から1つ選んでください。'));
 wrap.appendChild(el('div','v47-match-target',q.target));
 var grid=el('div','v47-picture-grid');var options=shuffleV([MATCH_ITEMS.find(function(x){return x.label===q.target;} )].concat(shuffleV(MATCH_ITEMS.filter(function(x){return x.label!==q.target;})).slice(0,3)));
 options.forEach(function(item,index){var b=btn('','v47-picture-button',function(){if(answered)return;if(item.label===q.target)completeCorrectV47(b,'⭕ 合う絵を選べました！');else wrongNoRevealV47(b,'この絵ではないようです。ほかの絵も見てみましょう。');});b.setAttribute('aria-label','絵カード '+(index+1));var im=el('img','v47-picture-img');im.src=item.image;im.alt='';im.onerror=function(){this.style.display='none';b.appendChild(el('span','v47-picture-fallback','画像を読み込めません'));};b.appendChild(im);grid.appendChild(b);});wrap.appendChild(grid);area.appendChild(wrap);
}
function renderTrueFalseV47(q){
 // ○×問題は、アプリ共通の問題文エリアと回答ボタンを使います。
 // 独自の入れ子カードをなくし、既存のトレーニング画面と同じ見た目に戻します。
 var area=core(q,'文の内容が正しいか答えましょう。','tf');
 if(!area)return;
 var statement=$v('promptText');
 if(statement){statement.textContent=q.statement||q.prompt||'';statement.classList.remove('hidden');}
 var instruction=el('p','tf-question-instruction','この文は正しいですか？');
 area.appendChild(instruction);
 var grid=el('div','choices tf-choice-grid');
 [['○　あっている','○'],['×　ちがう','×']].forEach(function(pair,index){
  var b=btn(pair[0],'choice tf-choice '+(index===0?'tf-choice-true':'tf-choice-false'),function(){
   if(answered)return;
   if(pair[1]===q.answer)completeCorrectV47(b,'判断できました！');
   else wrongNoRevealV47(b,'もう一度考えてみましょう。文の意味を確認してください。');
  });
  b.setAttribute('aria-label',pair[0]);
  grid.appendChild(b);
 });
 area.appendChild(grid);
}
function renderAnagramV47(q){
 var area=core(q,'ばらばらの文字を並べましょう。','anagram');var wrap=el('div','v47-task-panel v47-anagram-panel');wrap.appendChild(el('p','v47-mode-instruction','文字を1つずつ押して、上の枠に言葉を作ります。'));
 var answerLine=el('div','v47-built-word','ここに並びます');answerLine.setAttribute('aria-live','polite');var tokenGrid=el('div','v47-token-grid');var status=el('p','v47-status','');status.setAttribute('aria-live','polite');var chosen=[];var tokens=shuffleV(q.tokens||[]);
 function redraw(){answerLine.innerHTML='';if(!chosen.length){answerLine.textContent='ここに並びます';return;}chosen.forEach(function(x,i){var b=btn(x.ch,'v47-picked-token',function(){if(answered)return;var found=chosen.splice(i,1)[0];var source=tokenGrid.querySelector('[data-token-id="'+found.id+'"]');if(source)source.disabled=false;redraw();});answerLine.appendChild(b);});}
 tokens.forEach(function(t,i){var b=btn(t,'v47-token',function(){if(answered||b.disabled)return;chosen.push({ch:t,id:i});b.disabled=true;redraw();status.textContent='選んだ文字は '+chosen.length+' 文字です。';});b.dataset.tokenId=String(i);tokenGrid.appendChild(b);});
 var actions=el('div','v47-action-row');actions.appendChild(btn('1つ戻す','v47-secondary-button',function(){if(answered||!chosen.length)return;var x=chosen.pop();var source=tokenGrid.querySelector('[data-token-id="'+x.id+'"]');if(source)source.disabled=false;redraw();}));actions.appendChild(btn('やり直す','v47-secondary-button',function(){if(answered)return;chosen=[];tokenGrid.querySelectorAll('button').forEach(function(b){b.disabled=false;});redraw();status.textContent='最初から並べられます。';}));actions.appendChild(btn('答え合わせ','v47-primary-button',function(){if(answered)return;if(chosen.length!==tokens.length){status.textContent='すべての文字を使ってください。';return;}var built=chosen.map(function(x){return x.ch;}).join('');if(built===q.answer)completeCorrectV47(null,'⭕ 言葉を組み立てられました！');else{wrongNoRevealV47(null,'文字の順番が違うようです。次の問題へ進みます。');}}));
 wrap.append(answerLine,tokenGrid,actions,status);area.appendChild(wrap);
}
function newCopyRunStats(){return {attempted:0,matched:0,firstTryCorrect:0,afterRetryCorrect:0,incorrect:0,ungraded:0,results:[]};}
var copyCleanupV83=null;
// Use two conventional handwriting decoding passes. No target text is sent to
// the recognizer. The whole-word pass may resolve one ambiguous character,
// only when the individual decoder also suggested that written character.
function copyRecognitionEvidenceV84(reading,expected){
 var text=Array.from(String(expected||''));
 var top=Array.isArray(reading)?reading:(reading&&reading.texts);
 if(!Array.isArray(top)||top.length!==text.length)return null;
 function norm(s){return String(s||'').normalize('NFKC').trim().replace(/\s+/g,'');}
 var local=top.every(function(s,i){return norm(s)===norm(text[i]);});
 var candidates=reading&&reading.cellCandidates,phrases=reading&&reading.phraseCandidates;
 var contextual=false;
 if(!local&&text.length>1&&Array.isArray(phrases)&&norm(phrases[0])===norm(text.join(''))&&Array.isArray(candidates)){
  var mismatches=[];top.forEach(function(s,i){if(norm(s)!==norm(text[i]))mismatches.push(i);});
  if(mismatches.length===1){var i=mismatches[0];contextual=Array.isArray(candidates[i])&&candidates[i].some(function(s){return norm(s)===norm(text[i]);});}
 }
 return {matched:local||contextual,predicted:contextual?Array.from(norm(phrases[0])):top.map(String),individualReading:top.map(String),method:local?'single-character':(contextual?'word-context':'unmatched')};
}
function renderCopyV47(q){
 if(copyCleanupV83)copyCleanupV83();
 var area=core(q,'見本を一文字ずつ書き写しましょう。','copy');
 var wrap=el('div','v47-task-panel v47-copy-panel');
 var target=Array.from(String(q.prompt||''));
 wrap.appendChild(el('p','v47-mode-instruction','見本と同じ文字を各枠に書いてください。書き終えて少し待つと自動で照合します。間違えた場合は最大3回まで挑戦できます。'));
 wrap.appendChild(el('div','v47-copy-model-label','見本（'+target.length+'文字）'));
 wrap.appendChild(el('div','v47-copy-model',q.prompt||''));
 var board=el('div','v47-copy-cells v47-copy-count-'+target.length);board.style.setProperty('--copy-count',String(target.length));
 var status=el('p','v47-status','一文字ずつ枠の中へ、指・タッチペン・マウスで書いてください。');status.setAttribute('aria-live','polite');
 var attemptLabel=el('p','v47-copy-attempt','挑戦 1 / 3');
 var cells=[],checking=false,disposed=false,attempts=0,pendingTimer=null,nextTimer=null,retryTimer=null,changeId=0;
 var startIndex=current,startRunToken=activityRunToken,startStats=window.kotobaCopyRunStats;
 function active(){var game=$v('game');return !disposed&&game&&game.classList.contains('active')&&selectedActivity==='copy'&&current===startIndex&&activityRunToken===startRunToken&&window.kotobaCopyRunStats===startStats;}
 function clearTimers(){[pendingTimer,nextTimer,retryTimer].forEach(function(t){if(t!==null)clearTimeout(t);});pendingTimer=nextTimer=retryTimer=null;}
 copyCleanupV83=function(){disposed=true;clearTimers();};
 function draw(cell){
  var g=cell.canvas.getContext('2d');if(!g)return;
  g.clearRect(0,0,260,260);g.fillStyle='#fff';g.fillRect(0,0,260,260);
  g.strokeStyle='#d9e5ef';g.lineWidth=2;g.setLineDash([7,7]);
  g.beginPath();g.moveTo(130,12);g.lineTo(130,248);g.moveTo(12,130);g.lineTo(248,130);g.stroke();g.setLineDash([]);
  g.strokeStyle='#164d86';g.fillStyle='#164d86';g.lineWidth=9;g.lineCap='round';g.lineJoin='round';
  cell.strokes.forEach(function(s){if(!s.points.length)return;g.beginPath();g.moveTo(s.points[0].x,s.points[0].y);s.points.slice(1).forEach(function(p){g.lineTo(p.x,p.y);});if(s.points.length===1){g.arc(s.points[0].x,s.points[0].y,4.5,0,Math.PI*2);g.fill();}else g.stroke();});
 }
 function enough(cell){var length=0,minX=260,maxX=0,minY=260,maxY=0;
  cell.strokes.forEach(function(s){s.points.forEach(function(p){minX=Math.min(minX,p.x);maxX=Math.max(maxX,p.x);minY=Math.min(minY,p.y);maxY=Math.max(maxY,p.y);});for(var i=1;i<s.points.length;i++){var a=s.points[i-1],b=s.points[i];length+=Math.hypot(b.x-a.x,b.y-a.y);}});
  return length>=40&&Math.max(maxX-minX,maxY-minY)>=32;
 }
 function clearInk(message){cells.forEach(function(c){c.strokes=[];c.activeStroke=null;draw(c);});changeId++;if(message)status.textContent=message;}
 function schedule(){
  clearTimeout(pendingTimer);pendingTimer=null;if(!active()||answered||checking||retryTimer!==null)return;
  if(!cells.every(enough)){status.textContent='各枠に文字を書いてください。すべて書けたら自動で照合します。';return;}
  status.textContent='書き終わったらそのまま少しお待ちください。';
  pendingTimer=setTimeout(function(){pendingTimer=null;recognizeAnswer();},3100);
 }
 function pos(c,e){var r=c.canvas.getBoundingClientRect();return{x:Math.min(260,Math.max(0,(e.clientX-r.left)*260/r.width)),y:Math.min(260,Math.max(0,(e.clientY-r.top)*260/r.height)),t:Date.now()};}
 target.forEach(function(char,i){
  var outer=el('div','v47-copy-cell');var heading=el('div','v47-copy-cell-label',(i+1)+'文字目');
  var canvas=el('canvas','v47-copy-pad');canvas.width=260;canvas.height=260;
  canvas.setAttribute('aria-label',(i+1)+'文字目の手書き入力欄');canvas.style.touchAction='none';
  var cell={canvas:canvas,strokes:[],activeStroke:null,pointer:null};cells.push(cell);
  canvas.addEventListener('pointerdown',function(e){if(!active()||answered||checking||retryTimer!==null)return;e.preventDefault();clearTimeout(pendingTimer);pendingTimer=null;changeId++;cell.pointer=e.pointerId;cell.activeStroke={points:[pos(cell,e)]};cell.strokes.push(cell.activeStroke);try{canvas.setPointerCapture(e.pointerId);}catch(err){}draw(cell);});
  canvas.addEventListener('pointermove',function(e){if(!cell.activeStroke||cell.pointer!==e.pointerId)return;e.preventDefault();cell.activeStroke.points.push(pos(cell,e));draw(cell);});
  function end(e){if(!cell.activeStroke||cell.pointer!==e.pointerId)return;cell.activeStroke.points.push(pos(cell,e));cell.activeStroke=null;cell.pointer=null;draw(cell);schedule();}
  canvas.addEventListener('pointerup',end);canvas.addEventListener('pointercancel',end);
  var undo=btn('↶ 1画戻す','v47-copy-undo',function(){if(!active()||answered||checking||retryTimer!==null)return;cell.strokes.pop();draw(cell);changeId++;schedule();});
  outer.append(heading,canvas,undo);board.appendChild(outer);draw(cell);
 });
 async function recognizeWithBrowser(){
  var recognizer=await navigator.createHandwritingRecognizer({languages:['ja']});
  if(!recognizer||typeof recognizer.startDrawing!=='function')throw new Error('recognizer-unavailable');
  try{
   var texts=[],cellCandidates=[];
   for(var i=0;i<cells.length;i++){
    var d=recognizer.startDrawing({recognitionType:'text',alternatives:3});
    cells[i].strokes.forEach(function(s){var stroke=new window.HandwritingStroke();s.points.forEach(function(p){stroke.addPoint(p);});d.addStroke(stroke);});
    var predictions=await d.getPrediction();var options=Array.isArray(predictions)?predictions.map(function(p){return String(p.text||'');}):[];
    texts.push(options[0]||'');cellCandidates.push(options);
    try{d.clear();}catch(e){}
   }
   var phraseCandidates=[];
   if(cells.length>1){
    var wd=recognizer.startDrawing({recognitionType:'text',alternatives:3});
    cells.forEach(function(c,i){c.strokes.forEach(function(s){var stroke=new window.HandwritingStroke();s.points.forEach(function(p){stroke.addPoint({x:p.x+280*i,y:p.y,t:p.t});});wd.addStroke(stroke);});});
    try{var guesses=await wd.getPrediction();phraseCandidates=Array.isArray(guesses)?guesses.map(function(p){return String(p.text||'');}):[];}catch(e){}
    try{wd.clear();}catch(e){}
   }
   return {texts:texts,cellCandidates:cellCandidates,phraseCandidates:phraseCandidates};
  }finally{try{recognizer.finish();}catch(e){}}
 }
 async function recognizeInk(){
  if(window.KotobaNativeBridge&&typeof window.KotobaNativeBridge.recognizeHandwriting==='function'&&typeof window.KotobaHandwritingRecognize==='function')
   return window.KotobaHandwritingRecognize(cells.map(function(c){return {strokes:c.strokes.map(function(s){return {points:s.points};})};}));
  if(typeof navigator.createHandwritingRecognizer==='function'&&typeof window.HandwritingStroke==='function')return recognizeWithBrowser();
  throw new Error('handwriting-unavailable');
 }
 function finish(matched,predicted,recognitionMethod){
  if(!active()||answered)return;answered=true;clearTimers();
  var stats=window.kotobaCopyRunStats;stats.attempted++;
  var first=matched&&attempts===1;
  if(matched){stats.matched++;if(first){stats.firstTryCorrect++;score++;}else stats.afterRetryCorrect++;}
  else stats.incorrect++;
  stats.results.push({target:target.join(''),predicted:predicted.join(''),result:matched?'matched':'incorrect',attempts:attempts,firstTryCorrect:first,recognitionMethod:recognitionMethod||'single-character'});
  updateScoreV47('copy');
  var feedback=$v('feedback');if(feedback){feedback.textContent=matched?(first?'正解です！ 見本と一致しました。':'見本と一致しました（再挑戦で正解）。'):'3回一致しませんでした。次の問題へ進みます。';feedback.className=matched?'feedback ok':'feedback ng';}
  if(matched&&typeof playCorrectSound==='function')playCorrectSound();
  if(!matched&&typeof playWrongSound==='function')playWrongSound();
  status.textContent='認識した文字：「'+predicted.join('')+'」　見本：「'+target.join('')+'」';
  nextTimer=setTimeout(function(){nextTimer=null;if(active()&&answered)nextQuestion();},1500);
 }
 async function recognizeAnswer(){
  if(!active()||answered||checking||!cells.every(enough))return;
  checking=true;var captured=changeId;status.textContent='手書きの文字を読み取り、見本と照合しています…';
  try{
   var reading=await recognizeInk();
   if(!active()||answered||captured!==changeId)return;
   var evidence=copyRecognitionEvidenceV84(reading,target.join(''));
   if(!evidence)throw new Error('invalid-recognition-result');
   var predicted=evidence.predicted;
   attempts++;attemptLabel.textContent='挑戦 '+Math.min(attempts+1,3)+' / 3';
   var match=evidence.matched;
   if(match||attempts>=3){finish(match,predicted,evidence.method);return;}
   status.textContent='認識した文字「'+predicted.join('')+'」は見本と一致しません。もう一度書いてください（残り'+(3-attempts)+'回）。';
   if(typeof playWrongSound==='function')playWrongSound();
   retryTimer=setTimeout(function(){retryTimer=null;if(active()&&!answered)clearInk('もう一度、各枠に書いてください。');},1600);
  }catch(error){
   if(!active()||answered)return;
   status.textContent=String(error&&error.message)==='handwriting-unavailable'?'このブラウザーでは日本語の手書き自動判定が使えません。対応するAndroidアプリ版をご利用ください。':'手書き認識を起動できませんでした。通信状況を確認して、もう一度書いてください（この問題は採点されていません）。';
  }finally{checking=false;}
 }
 var actions=el('div','v47-action-row');actions.appendChild(btn('🧽 全部消す','v47-secondary-button',function(){if(!active()||answered||checking||retryTimer!==null)return;clearTimeout(pendingTimer);pendingTimer=null;clearInk('消しました。見本を見て書き直してください。');}));
 wrap.append(board,actions,attemptLabel,status);area.appendChild(wrap);
 if(!(window.KotobaNativeBridge&&typeof window.KotobaNativeBridge.recognizeHandwriting==='function')&&!(typeof navigator.createHandwritingRecognizer==='function'&&typeof window.HandwritingStroke==='function'))
  status.textContent='このブラウザーでは日本語の手書き自動判定が使えません。対応するAndroidアプリ版をご利用ください。';
}

var oldStartActivityV47=startActivity;
startActivity=function(activityId){
 if(roleplayAdvanceTimer){clearTimeout(roleplayAdvanceTimer);roleplayAdvanceTimer=null;}
 if(copyCleanupV83)copyCleanupV83();
 roleplayAnswered=0;roleplayWrong=0;
 window.kotobaCopyRunStats=activityId==='copy'?newCopyRunStats():null;
 return oldStartActivityV47.apply(this,arguments);
};
var oldRenderQuestionV47=renderQuestion;
renderQuestion=function(){
 if(V47_IDS.indexOf(selectedActivity)<0){oldRenderQuestionV47();return;}
 var q=questions[current];if(!q)return;
 if(selectedActivity==='matching')renderMatchingV47(q);
 else if(selectedActivity==='tf')renderTrueFalseV47(q);
 else if(selectedActivity==='anagram')renderAnagramV47(q);
 else if(selectedActivity==='copy')renderCopyV47(q);
 else renderFourChoiceV47(q,selectedActivity);
};
var oldSpeakQuestionV47=speakQuestion;
speakQuestion=function(){var q=questions[current];if(!q)return;
 if(selectedActivity==='matching'){speak('文字は、'+q.target+'。この文字に合う絵を選びましょう。',true);return;}
 if(selectedActivity==='anagram'){speak('ばらばらの文字を正しい順番に並べましょう。',true);return;}
 if(selectedActivity==='copy'){speak('見本を見ながら、実際に書いてみましょう。'+(q.prompt||''),true);return;}
 if(selectedActivity==='tf'){speak('文を読んで、正しいかどうか考えましょう。'+(q.statement||q.prompt||''),true);return;}
 // These modes have their own question-specific instructions in aphasia-modes.js.
 if(selectedActivity==='gesture'||selectedActivity==='roleplay'){oldSpeakQuestionV47();return;}
 oldSpeakQuestionV47();
};
var oldShowHintV47=showHint;
showHint=function(){
 if(V47_IDS.indexOf(selectedActivity)>=0){var q=questions[current];if(!q||!q.hint)return;var h=$v('hint');if(h){h.textContent=q.hint;h.classList.remove('hidden');}if(voiceEnabled)speak('ヒント。'+q.hint);if(typeof playButtonSound==='function')playButtonSound();return;}
 oldShowHintV47();
};
var sb=$v('speakBtn');if(sb){sb.removeEventListener('click',oldSpeakQuestionV47);sb.addEventListener('click',speakQuestion);}
var hb=$v('hintBtn');if(hb){hb.removeEventListener('click',oldShowHintV47);hb.addEventListener('click',showHint);}
// BGMなどを画面から離れた後に残さない。非表示になったら音楽設定もOFFへ。
function stopPageAudio(){
 var a=$v('bgmAudio');if(a){try{a.pause();a.currentTime=0;}catch(e){}}
 try{if(window.speechSynthesis)window.speechSynthesis.cancel();}catch(e){}
 try{if(window.__appAudio && window.__appAudio.state==='running')window.__appAudio.suspend();}catch(e){}
}
window.addEventListener('pagehide',stopPageAudio);
window.addEventListener('beforeunload',stopPageAudio);
document.addEventListener('visibilitychange',function(){if(document.hidden){stopPageAudio();var enteringDungeon=false;try{enteringDungeon=sessionStorage.getItem('kotobaquest_entering_dungeon')==='1';}catch(e){}if(!enteringDungeon){try{localStorage.setItem('kotobaquest_music_v3','0');}catch(e){}var b=$v('musicMiniBtn');if(b){b.textContent='OFF';b.classList.add('off');}}}});
})();
