/*
 * ============================================================
 * 失語症トレーニング｜エジソン・キッチン
 * ============================================================
 * このJavaScriptは「ゲームの動き」を担当します。
 *
 * しくみ：
 *   ① GENRES にジャンル・課題を登録
 *   ② ユーザーがジャンルを選択
 *   ③ そのジャンルの「課題」を選択
 *   ④ QUESTIONS に入っている問題をランダム出題
 *   ⑤ 正解・不正解を判定して得点を更新
 *   ⑥ 音声読み上げ・効果音を実行
 *   ⑦ 最後に結果を表示
 *
 * 医療的な評価機能ではなく、「ブラウザ上で取り組める教材・試作ゲーム」
 * として作っています。問題や難易度は現場に合わせて編集してください。
 * ============================================================
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var _a, _b, _c, _d, _e;
// ------------------------------------------------------------
// 1. ジャンル定義
// ------------------------------------------------------------
// ここを増やせば、ジャンル選択画面にも自動で追加されます。
var GENRES = [
    {
        id: "speech",
        icon: "🗣️",
        name: "発話・言語",
        description: "呼称、復唱、キューイング、自動言動・穴埋めなど、言葉を出す練習。",
        activities: [
            ["naming", "絵・実物の呼称", "写真や絵を見て名前を選ぶ"],
            ["repeat", "復唱・唱和", "聞いた言葉をまねして声に出す"],
            ["cue", "キューイング", "語頭音や特徴のヒントから言葉を引き出す"],
            ["fill", "穴埋め・自動言動", "定型句や数唱の続きを完成させる"]
        ]
    },
    {
        id: "articulation",
        icon: "👄",
        name: "構音・発声",
        description: "口の準備、発音部位、単語から短文への段階的な発声課題。",
        activities: [
            ["mouth", "口・発声ウォームアップ", "口を大きく動かす・母音を選ぶ"],
            ["sound", "発音部位別", "指定された音が入る言葉を選ぶ"],
            ["stepup", "単語→短文", "単語から短文へ段階的に練習する"]
        ]
    },
    {
        id: "rhythm",
        icon: "👏",
        name: "音律・リズム",
        description: "拍・モーラ、アクセント、文章リズムなどを意識する課題。",
        activities: [
            ["mora", "手拍子＋モーラ選択", "手拍子で数えたあと、拍数を選択肢から選びます"],
            ["accent", "アクセント", "どこを強く読むかを選ぶ"],
            ["sentenceRhythm", "文章リズム", "自然な文章を選んで読む"]
        ]
    },
    {
        id: "comprehension",
        icon: "👂",
        name: "受容・理解",
        description: "聴覚的選択、指示動作、意味理解など、聞いて理解する課題。",
        activities: [
            ["listen", "聴覚的指差し・選択", "聞いた言葉に合うものを選ぶ"],
            ["instruction", "聴覚的指示", "指示を読んで行動を選ぶ"],
            ["tf", "○×・意味理解", "文の内容が正しいか判断する"]
        ]
    },
    {
        id: "readingWriting",
        icon: "📖",
        name: "読み・書き",
        description: "文字と画像の照合、写字、アナグラムなどの読み書き課題。",
        activities: [
            ["matching", "文字・画像マッチング", "文字に合う絵を選ぶ"],
            ["copy", "写字・見写し", "表示された文字を書き写したら完了を押す"],
            ["anagram", "文字並べ替え", "文字を正しい順番に並べる"]
        ]
    },
    {
        id: "practical",
        icon: "🤝",
        name: "実用・非言語",
        description: "ジェスチャー、描画、コミュニケーションボード、ロールプレイなど。",
        activities: [
            ["gesture", "ジェスチャー", "場面に合う伝え方を選ぶ"],
            ["board", "コミュニケーションボード", "伝えたい内容に合う項目を選ぶ"],
            ["roleplay", "実生活ロールプレイ", "カフェ・買い物などの場面で答える"],
            ["aac", "デジタル・AAC活用", "音声ボタンで伝える言葉を選ぶ"]
        ]
    },
    {
        id: "voiceTest",
        icon: "🎤",
        name: "音読・音声認識テスト",
        description: "表示された言葉を声に出して読み、マイクで認識した言葉が合っているか確認するテスト版。",
        activities: [
            ["voiceRead", "ことばを読んでみよう", "表示された言葉を読み、音声認識で確認します"]
        ]
    },
    {
        id: "legacyKotobaQuest",
        icon: "🗡️",
        name: "ことばクエストZ",
        description: "クラシック版のシンプルなバトル形式。問題に答えて敵を倒します。",
        activities: [
            ["kotobaQuestClassic", "ことばクエストZ", "クラシック版のバトル画面でことば問題に挑戦します。3回間違えるとゲームオーバーです。"]
        ]
    }
];
// ------------------------------------------------------------
// 1.5. 4つのトレーニングカテゴリ
// ------------------------------------------------------------
// 上段の4カテゴリから選ぶと、そのカテゴリに登録された課題だけを表示します。
var TRAINING_CATEGORIES = [
    {
        id: "basic",
        icon: "👄",
        name: "発音・発声トレーニング",
        description: "口の準備、発音、復唱、音読、リズムを段階的に練習します。",
        activities: [
            ["articulationNavigator","構音筋ビジュアルナビゲーション","口の断面図で舌や唇の位置を確認しながら練習します。"],
            ["pronunciationTraining","発音トレーニング","発音する場所・仕方・問題タイプを選び、達成度と復習を記録します。"],
            ["mouth","口・発声ウォームアップ","口を大きく動かし、母音などを練習します。"],
            ["sound","発音の練習","指定された音が入る言葉を選んで練習します。"],
            ["stepup","単語→短文","単語から短い文章へ段階的に練習します。"],
            ["repeat","復唱・唱和","聞いた言葉を声に出してまねします。"],
            ["mora","手拍子＋モーラ選択","手拍子で数えたあと、拍数を選びます。"],
            ["accent","アクセント","自然なアクセントを意識して読みます。"],
            ["sentenceRhythm","文章リズム","意味のまとまりを意識して文章を読みます。"],
            ["voiceRead","音読・音声認識テスト","表示された言葉を読み、音声認識で確認します。"]
        ]
    },
    {
        id: "brain",
        icon: "🧠",
        name: "認知・理解トレーニング",
        description: "聞く・読む・判断する・照らし合わせる練習です。",
        activities: [
            ["listen","聞いて選ぶ","聞いた言葉に合うものを選びます。"],
            ["instruction","指示を理解する","指示を読んで合う動作を選びます。"],
            ["tf","○×・意味理解","文章の内容が合っているか考えます。"],
            ["matching","文字・絵マッチング","文字に合う絵を選びます。"],
            ["copy","写字・見写し","言葉や文章を書き写します。"],
            ["anagram","文字並べ替え","文字を正しい順に並べます。"]
        ]
    },
    {
        id: "aphasia",
        icon: "🗣️",
        name: "失語症・言語トレーニング",
        description: "言葉を思い出す・組み立てる練習です。",
        activities: [
            ["naming","絵・実物の呼称","絵や写真を見て名前を選びます。"],
            ["cue","ヒントで言葉を出す","語頭音や特徴のヒントから言葉を探します。"],
            ["fill","穴埋め・自動言語","定型句や数字の続きを完成させます。"]
        ]
    },
    {
        id: "test",
        icon: "💬",
        name: "日常会話・コミュニケーション",
        description: "生活場面での会話と意思伝達を練習します。",
        activities: [
            ["gesture","ジェスチャー","言葉以外の伝え方を選びます。"],
            ["board","コミュニケーションボード","伝えたい内容に合う項目を選びます。"],
            ["roleplay","実生活ロールプレイ","カフェ・買い物などの場面で練習します。"],
            ["aac","デジタル・AAC","場面から言葉を選び、音声で伝える練習をします。"],
            ["localAIConversation","端末内AI会話","チャット形式で5問の一問一答。正解すると自動で次へ進みます。"]
        ]
    },
    {
        id: "readingMemory",
        icon: "📖",
        name: "朗読・記憶トレーニング",
        description: "おはなしを読んで、覚えた内容をクイズで確認します。",
        activities: [
            ["readingMemory1","朗読・想起① かぼちゃおじいさんと わかめおじいさん","おにぎりのおはなしを読んで5問に答えます。"],
            ["readingMemory2","朗読・想起② しらす爺さんの温泉旅行（あんパン）","秋の熱海旅行のおはなしを読んで5問に答えます。"],
            ["readingMemory3","朗読・想起③ しらす爺さんの温泉旅行（しらす煎餅）","秋の熱海旅行のおはなしを読んで5問に答えます。"]
        ]
    },
    {
        id: "pictogram3d",
        icon: "🟢",
        name: "3D・判断クイズ",
        description: "3Dワールドの○×エリアへ移動して全4問に挑戦。全問正解5枚、一部正解1枚、全問不正解0枚のメダルを獲得します。",
        activities: [
            ["pictogram3d","ピクトグラム ○× 3Dクイズ","草原・ビーチ・牧場・森からランダムに選ばれる3D空間で○×を選びます。"]
        ]
    },
    {
        id: "kotobaQuest",
        icon: "⚔️",
        name: "ことばRPG",
        description: "言葉の問題に答えながら、2種類のバトルゲームを楽しみます。",
        activities: [
            ["kotobaQuest","ことばファンタジーDX","サイドビューRPGで問題に答えてモンスターを倒します。"],
            ["kotobaQuestClassic","ことばクエストZ","昔ながらのバトル画面で挑戦。3回間違えるとゲームオーバーです。"]
        ]
    }
];
var FOUNDATION_VOICE_ACTIVITIES = new Set(["mouth", "sound", "stepup", "accent", "sentenceRhythm"]);
// ------------------------------------------------------------
// 2. 問題データ
// ------------------------------------------------------------
// 共通項目：question / answer / choices / hint / voiceText / emoji / image
// type：quiz = 選択、speak = 声に出して練習、complete = 「できた」で進む、anagram = 並べ替え
var QUESTIONS = {
    naming: [
        { question: "これは何でしょう？", image: "images/apple.jpg", answer: "りんご", hint: "赤や緑の果物です。", choices: ["りんご", "みかん", "バナナ", "ぶどう"], voiceText: "これは、りんごです。" },
        { question: "これは何でしょう？", image: "images/banana.jpg", answer: "バナナ", hint: "黄色くて、皮をむいて食べます。", choices: ["りんご", "バナナ", "もも", "すいか"], voiceText: "これは、バナナです。" },
        { question: "これは何でしょう？", image:  "images/orenge.jpg", answer: "みかん", hint: "オレンジ色の小さな果物です。", choices: ["ぶどう", "みかん", "なし", "りんご"], voiceText: "これは、みかんです。" },
        { question: "これは何でしょう？", emoji: "🐶", answer: "いぬ", hint: "「ワンワン」と鳴く動物です。", choices: ["ねこ", "いぬ", "うさぎ", "さる"], voiceText: "これは、いぬです。" },
        { question: "これは何でしょう？", emoji: "🐱", answer: "ねこ", hint: "「ニャー」と鳴く動物です。", choices: ["いぬ", "ねこ", "きつね", "くま"], voiceText: "これは、ねこです。" },
        { question: "これは何でしょう？", emoji: "☕", answer: "コーヒー", hint: "黒っぽい飲み物です。", choices: ["おちゃ", "コーヒー", "ぎゅうにゅう", "ジュース"], voiceText: "これは、コーヒーです。" }
    ],
    repeat: [
        { question: "聞いた言葉を声に出してまねしてみましょう。", answer: "できた", prompt: "りんご", image: "assets/images/voice/apple.svg", hint: "ゆっくり、はっきり言ってみましょう。", choices: ["できた", "もう一度"], voiceText: "りんご" },
        { question: "聞いた言葉を声に出してまねしてみましょう。", answer: "できた", prompt: "ありがとう", hint: "自然な速さで言ってみましょう。", choices: ["できた", "もう一度"], voiceText: "ありがとう" },
        { question: "聞いた言葉を声に出してまねしてみましょう。", answer: "できた", prompt: "おはようございます", hint: "区切ってから言っても大丈夫です。", choices: ["できた", "もう一度"], voiceText: "おはようございます" },
        { question: "聞いた言葉を声に出してまねしてみましょう。", answer: "できた", prompt: "コーヒーください", hint: "短い文章を続けて言ってみましょう。", choices: ["できた", "もう一度"], voiceText: "コーヒーください" }
    ],
    cue: [
        { question: "ヒントを見て言葉を選びましょう。", answer: "りんご", prompt: "赤くて、丸くて、食べる果物。『り』から始まります。", hint: "最初の音は『り』です。", choices: ["りんご", "みかん", "パン", "くつ"] },
        { question: "ヒントを見て言葉を選びましょう。", answer: "とけい", prompt: "時間を確認するもの。『と』から始まります。", hint: "最初の音は『と』です。", choices: ["テレビ", "とけい", "電話", "ほん"] },
        { question: "ヒントを見て言葉を選びましょう。", answer: "かさ", prompt: "雨の日に使うもの。『か』から始まります。", hint: "雨の日に使います。", choices: ["かさ", "くつ", "かばん", "ぼうし"] }
    ],
    fill: [
        { question: "文の続きを選びましょう。", answer: "たべます", image: "images/mesi.jpg", prompt: "ごはんを（　　）。", hint: "口に入れて食べる動作です。", choices: ["たべます", "のみます", "ねます", "みます"] },
        { question: "文の続きを選びましょう。", answer: "はいります", image: "images/furo.jpg", prompt: "おふろに（　　）。", hint: "お風呂の中に入ることです。", choices: ["はいります", "かいます", "よみます", "かきます"] },
        { question: "数字を順番に言ってみましょう。", image: "images/1.2.3.jpg", answer: "1・2・3", prompt: "1 → 2 → ？", hint: "次の数字です。", choices: ["1・2・3", "3・2・1", "1・3・2"] },
        { question: "挨拶・決まり文句。", answer: "おはよう", image: "images/kuma.jpg", prompt: "（　　）ございます。", hint: "朝ごはんを口に入れます。", choices: ["おはよう", "こんちは", "ハロー", "ヒーロー"] }
    ],
    mouth: [
        { question: "大きく口を動かす母音です。どれを練習しますか？", answer: "あ・い・う・え・お", hint: "5つの母音を順番に言います。", choices: ["あ・い・う・え・お", "か・き・く・け・こ", "さ・し・す・せ・そ"], voiceText: "あ、い、う、え、お" },
        { question: "次の練習をまねしてみましょう。", answer: "できた", prompt: "『あ・い・う・え・お』を口を大きく動かして言う", hint: "無理のない範囲で行います。", choices: ["できた", "もう一度"], voiceText: "あ、い、う、え、お" },
        { question: "舌を前に出す練習をしてみましょう。", answer: "できた", prompt: "ゆっくり舌を前に出して戻す", hint: "痛みがある場合は無理をしません。", choices: ["できた", "もう一度"] }
    ],
    sound: [
        { question: "『た・だ・な・ら』の音が入る言葉を選びましょう。", answer: "とけい", hint: "『と』はタ行の音です。", choices: ["とけい", "りんご", "さかな", "くま"] },
        { question: "『か・が』の音が入る言葉を選びましょう。", answer: "かさ", hint: "最初が『か』です。", choices: ["かさ", "ねこ", "ほん", "みかん"] },
        { question: "『な・ら』の音が入る言葉を選びましょう。", answer: "さくら", hint: "『ら』の音があります。", choices: ["さくら", "ばなな", "とけい", "いぬ"] }
    ],
    stepup: [
        { question: "まず単語を言ってから、短文にしてみましょう。", answer: "できた", prompt: "単語：りんご → 短文：りんごを食べます。", hint: "単語だけでも、文章まで言えてもOKです。", choices: ["できた", "もう一度"], voiceText: "りんご。りんごを食べます。" },
        { question: "まず単語を言ってから、短文にしてみましょう。", answer: "できた", prompt: "単語：さくら → 短文：さくらが咲いています。", hint: "ゆっくり言ってみましょう。", choices: ["できた", "もう一度"], voiceText: "さくら。さくらが咲いています。" }
    ],
    mora: [
        { question: "『さ・く・ら』を1拍ずつ手拍子しましょう。", answer: "3拍", prompt: "さ・く・ら", moraCount: 3, hint: "『さ・く・ら』の3回に合わせて、1回ずつ手を叩きます。", choices: ["2拍", "3拍", "4拍", "5拍"], voiceText: "さくら" },
        { question: "『り・ん・ご』を1拍ずつ手拍子しましょう。", answer: "3拍", prompt: "り・ん・ご", moraCount: 3, hint: "『り・ん・ご』の3回に合わせて、1回ずつ手を叩きます。", choices: ["2拍", "3拍", "4拍", "5拍"], voiceText: "りんご" },
        { question: "『ひ・ま・わ・り』を1拍ずつ手拍子しましょう。", answer: "4拍", prompt: "ひ・ま・わ・り", moraCount: 4, hint: "4つの音に合わせて、4回手を叩きます。", choices: ["2拍", "3拍", "4拍", "5拍"], voiceText: "ひまわり" },
        { question: "『た・ん・ぽ・ぽ』を1拍ずつ手拍子しましょう。", answer: "4拍", prompt: "た・ん・ぽ・ぽ", moraCount: 4, hint: "『た・ん・ぽ・ぽ』に合わせて4回です。", choices: ["2拍", "3拍", "4拍", "5拍"], voiceText: "たんぽぽ" },
        { question: "『え・ん・ぴ・つ』を1拍ずつ手拍子しましょう。", answer: "4拍", prompt: "え・ん・ぴ・つ", moraCount: 4, hint: "4つの音に合わせて、4回手を叩きます。", choices: ["2拍", "3拍", "4拍", "5拍"], voiceText: "えんぴつ" },
        { question: "『た・ま・ご』を1拍ずつ手拍子しましょう。", answer: "3拍", prompt: "た・ま・ご", moraCount: 3, hint: "『た・ま・ご』の3回です。", choices: ["2拍", "3拍", "4拍", "5拍"], voiceText: "たまご" },
        { question: "『く・る・ま』を1拍ずつ手拍子しましょう。", answer: "3拍", prompt: "く・る・ま", moraCount: 3, hint: "『く・る・ま』に合わせて3回です。", choices: ["2拍", "3拍", "4拍", "5拍"], voiceText: "くるま" },
        { question: "『パ・ン』を1拍ずつ手拍子しましょう。", answer: "2拍", prompt: "パ・ン", moraCount: 2, hint: "『パ・ン』の2回です。", choices: ["2拍", "3拍", "4拍", "5拍"], voiceText: "パン" },
        { question: "『か・さ』を1拍ずつ手拍子しましょう。", answer: "2拍", prompt: "か・さ", moraCount: 2, hint: "『か・さ』の2回です。", choices: ["2拍", "3拍", "4拍", "5拍"], voiceText: "かさ" },
        { question: "『テ・レ・ビ』を1拍ずつ手拍子しましょう。", answer: "3拍", prompt: "テ・レ・ビ", moraCount: 3, hint: "『テ・レ・ビ』に合わせて3回です。", choices: ["2拍", "3拍", "4拍", "5拍"], voiceText: "テレビ" }
    ],
    accent: [
        { question: "アクセントを意識して読んでみましょう。", answer: "できた", prompt: "さくら（自然な日本語のアクセントを意識）", hint: "正しさだけでなく、声に出してみることを大切にします。", choices: ["できた", "もう一度"], voiceText: "さくら" },
        { question: "アクセントを意識して読んでみましょう。", answer: "できた", prompt: "ひまわり（自然な日本語のアクセントを意識）", hint: "ゆっくりで大丈夫です。", choices: ["できた", "もう一度"], voiceText: "ひまわり" }
    ],
    sentenceRhythm: [
        { question: "文章を声に出して読んでみましょう。", answer: "できた", prompt: "お昼を食べます。", hint: "助詞『を』も含めて、ゆっくり読みます。", choices: ["できた", "もう一度"], voiceText: "お昼を食べます。" },
        { question: "文章を声に出して読んでみましょう。", answer: "できた", prompt: "きのう買い物に行きました。", hint: "意味のまとまりで区切って読んでも大丈夫です。", choices: ["できた", "もう一度"], voiceText: "きのう買い物に行きました。" }
    ],
    listen: [
        { question: "音声を聞いて、合うものを選びましょう。", answer: "りんご", emoji: "🍎", hint: "赤い果物です。", choices: ["りんご", "くつ", "でんしゃ", "かさ"], voiceText: "りんご" },
        { question: "音声を聞いて、合うものを選びましょう。", answer: "くつ", emoji: "👟", hint: "足にはきます。", choices: ["ほん", "くつ", "とけい", "パン"], voiceText: "くつ" },
        { question: "音声を聞いて、合うものを選びましょう。", answer: "でんしゃ", emoji: "🚃", hint: "線路の上を走ります。", choices: ["ひこうき", "くるま", "でんしゃ", "ふね"], voiceText: "でんしゃ" }
    ],
    instruction: [
        { question: "指示を読んで、行うべき動作を選びましょう。", answer: "手をあげる", hint: "そのままの動作を選びます。", prompt: "『手をあげる』", choices: ["手をあげる", "目を閉じる", "立ち上がる", "座る"] },
        { question: "指示を読んで、行うべき動作を選びましょう。", answer: "ペンを置く", hint: "机の上にペンを置く動作です。", prompt: "『ペンを置く』", choices: ["ペンを持つ", "ペンを置く", "ペンを投げる", "本を閉じる"] },
        { question: "指示を読んで、行うべき動作を選びましょう。", answer: "座る", hint: "椅子に座る動作です。", prompt: "『座る』", choices: ["歩く", "座る", "走る", "手をあげる"] }
    ],
    tf: [
        { question: "文の内容が正しいか答えましょう。", answer: "○", prompt: "『バナナは食べ物です。』", hint: "バナナについて考えます。", choices: ["○", "×"] },
        { question: "文の内容が正しいか答えましょう。", answer: "×", prompt: "『魚は空を飛びます。』", hint: "魚がいる場所を考えます。", choices: ["○", "×"] },
        { question: "文の内容が正しいか答えましょう。", answer: "○", prompt: "『雨の日に傘を使います。』", hint: "傘を使う場面を考えます。", choices: ["○", "×"] }
    ],
    matching: [
        { question: "文字に合う絵を選びましょう。", answer: "🍎 りんご", prompt: "りんご", hint: "赤い果物です。", choices: ["🍎 りんご", "🐶 いぬ", "🚃 でんしゃ", "☕ コーヒー"] },
        { question: "文字に合う絵を選びましょう。", answer: "🐶 いぬ", prompt: "いぬ", hint: "ワンワンと鳴きます。", choices: ["🐱 ねこ", "🐶 いぬ", "🐟 さかな", "🌸 さくら"] },
        { question: "文字に合う絵を選びましょう。", answer: "☕ コーヒー", prompt: "コーヒー", hint: "飲み物です。", choices: ["🍞 パン", "☕ コーヒー", "👟 くつ", "📖 ほん"] }
    ],
    copy: [
        { question: "表示された言葉を書き写しましょう。終わったら『できた』を押します。", answer: "できた", prompt: "りんご", hint: "見ながら、ゆっくり書き写します。", choices: ["できた", "もう一度"], voiceText: "りんご" },
        { question: "表示された言葉を書き写しましょう。終わったら『できた』を押します。", answer: "できた", prompt: "さくら", hint: "文字の形をよく見ます。", choices: ["できた", "もう一度"], voiceText: "さくら" },
        { question: "表示された短い文を書き写しましょう。終わったら『できた』を押します。", answer: "できた", prompt: "今日は晴れです。", hint: "一文字ずつ確認して書きます。", choices: ["できた", "もう一度"], voiceText: "今日は晴れです。" }
    ],
    anagram: [
        { question: "文字を正しい順番に並べましょう。", answer: "ゆうき", prompt: "『き・ゆ・う』", hint: "正しい言葉は人の名前にも使われます。", choices: ["ゆうき"], tokens: ["き", "ゆ", "う"] },
        { question: "文字を正しい順番に並べましょう。", answer: "りんご", prompt: "『ご・り・ん』", hint: "赤い果物です。", choices: ["りんご"], tokens: ["ご", "り", "ん"] },
        { question: "文字を正しい順番に並べましょう。", answer: "さくら", prompt: "『ら・さ・く』", hint: "春の花です。", choices: ["さくら"], tokens: ["ら", "さ", "く"] }
    ],
    gesture: [
        { question: "言葉が出にくいとき、どう伝える方法がありますか？", answer: "指さしする", hint: "言葉以外の方法も立派なコミュニケーションです。", choices: ["指さしする", "黙るだけ", "伝えるのをあきらめる", "どこにも示さない"] },
        { question: "『ありがとう』を言葉以外で伝える方法として選びましょう。", answer: "おじぎをする", hint: "日本でよく使われる身振りです。", choices: ["おじぎをする", "背を向ける", "目を閉じる", "逃げる"] }
    ],
    board: [
        { question: "コミュニケーションボードで『水がほしい』と伝えるなら？", answer: "💧 水", hint: "飲み物・必要なものを指します。", choices: ["💧 水", "🛏️ 休みたい", "🚽 トイレ", "🍚 ごはん"] },
        { question: "『トイレに行きたい』と伝えるなら？", answer: "🚽 トイレ", hint: "場所を指します。", choices: ["🚽 トイレ", "💧 水", "📞 電話", "☕ コーヒー"] },
        { question: "『痛い』と伝えるなら？", answer: "🤕 痛い", hint: "体の状態を伝えます。", choices: ["🤕 痛い", "😊 元気", "🍎 食べる", "🛏️ 寝る"] }
    ],
    roleplay: [
        { question: "カフェでコーヒーを注文します。何と言いますか？", answer: "コーヒーください", hint: "『ください』を使って伝えます。", choices: ["コーヒーください", "コーヒーは走ります", "コーヒーを閉めます", "コーヒーを読みます"], voiceText: "コーヒーください" },
        { question: "買い物で支払いをするとき、どんな言葉が使えますか？", answer: "お願いします", hint: "店員さんに丁寧に伝えます。", choices: ["お願いします", "おやすみなさい", "いただきます", "いってきます"], voiceText: "お願いします" },
        { question: "困ったとき、相手に助けを求めるなら？", answer: "手伝ってください", hint: "助けを依頼する言葉です。", choices: ["手伝ってください", "いただきます", "おかえりなさい", "おやすみなさい"], voiceText: "手伝ってください" }
    ],
    aac: [
        { question: "音声ボタンから相手に伝える言葉を選びましょう。", answer: "水がほしいです", hint: "必要なものを一つ選びます。", choices: ["水がほしいです", "大丈夫です", "帰ります", "わかりません"], voiceText: "水がほしいです" },
        { question: "音声ボタンから相手に伝える言葉を選びましょう。", answer: "わかりません", hint: "理解できないときに使います。", choices: ["わかりません", "おいしいです", "こんにちは", "ありがとう"], voiceText: "わかりません" },
        { question: "音声ボタンから相手に伝える言葉を選びましょう。", answer: "トイレに行きたいです", hint: "場所への希望を伝えます。", choices: ["トイレに行きたいです", "眠いです", "こんにちは", "またね"], voiceText: "トイレに行きたいです" }
    ],
    voiceRead: [
        { question: "表示された言葉を読んでみましょう。", prompt: "りんご", image: "images/apple.jpg", hint: "ゆっくり、はっきり読んでみましょう。", voiceText: "りんご" },
        { question: "表示された言葉を読んでみましょう。", prompt: "コーヒー", image: "images/cofe.jpg", hint: "声に出して、そのまま読みます。", voiceText: "コーヒー" },
        { question: "表示された言葉を読んでみましょう。", prompt: "さくら", image: "images/sakura.jpg", hint: "一文字ずつ確認しながら読みます。", voiceText: "さくら" },
        { question: "表示された言葉を読んでみましょう。", prompt: "ありがとう", image: "images/arigatou.jpg", hint: "落ち着いて、ゆっくり話してみましょう。", voiceText: "ありがとう" },
        { question: "表示された言葉を読んでみましょう。", prompt: "おはようございます", image: "images/oha.jpg", hint: "区切って読んでも大丈夫です。", voiceText: "おはようございます" },
        { question: "表示された言葉を読んでみましょう。", prompt: "コーヒーください", image: "images/cofe2.jpg", hint: "文章として声に出してみましょう。", voiceText: "コーヒーください" },
        { question: "表示された言葉を読んでみましょう。", prompt: "今日は晴れです", image: "images/hare.jpg", hint: "意味を思い浮かべながら読みます。", voiceText: "今日は晴れです" },
        { question: "表示された言葉を読んでみましょう。", prompt: "手を洗います", image: "images/tearai.jpg", hint: "ゆっくり一文を読みます。", voiceText: "手を洗います" }
    ],
    // ============================================================
    // クラシック版ことばクエスト用の問題
    // answer = 正解、choices = 選択肢、enemy = 敵の見た目、
    // enemyName = 敵の名前、image = 問題画像です。
    // imageには images/xxx.jpg のようにJPGも指定できます。
    // ============================================================
    kotobaQuestClassic: [
        { question: "赤くて丸い果物はどれ？", answer: "りんご", choices: ["りんご", "バナナ", "みかん", "ぶどう"], image: "images/apple.jpg", enemy: "👹", enemyName: "ことばおに" },
        { question: "黄色くて、皮をむいて食べる果物は？", answer: "バナナ", choices: ["りんご", "バナナ", "さくら", "コーヒー"], enemy: "👾", enemyName: "もじモンスター" },
        { question: "飲み物の名前はどれ？", answer: "コーヒー", choices: ["さくら", "コーヒー", "りんご", "くつ"], image: "images/cofe.jpg", enemy: "🧟", enemyName: "ことばゾンビ" },
        { question: "春の花の名前はどれ？", answer: "さくら", choices: ["コーヒー", "くつ", "さくら", "バナナ"], image: "images/sakura.jpg", enemy: "🐲", enemyName: "ことばドラゴン" },
        { question: "朝のあいさつはどれ？", answer: "おはようございます", choices: ["おやすみなさい", "こんにちは", "おはようございます", "いただきます"], image: "images/oha.jpg", enemy: "👺", enemyName: "あいさつおに" },
        { question: "カフェで注文するときの言葉は？", answer: "コーヒーください", choices: ["コーヒーください", "コーヒーを読みます", "コーヒーは走ります", "コーヒーを閉めます"], image: "images/cofe2.jpg", enemy: "🧌", enemyName: "ことばゴーレム" },
        { question: "雨の日に使うものはどれ？", answer: "かさ", choices: ["かさ", "くつ", "とけい", "パン"], enemy: "👻", enemyName: "ことばおばけ" },
        { question: "体調や状態を伝える言葉はどれ？", answer: "痛い", choices: ["痛い", "りんご", "コーヒー", "さくら"], enemy: "🦹", enemyName: "ことばナイト" },
        { question: "相手にお礼を伝える言葉はどれ？", answer: "ありがとう", choices: ["ありがとう", "おやすみ", "さようなら", "ただいま"], image: "images/arigatou.jpg", enemy: "🐺", enemyName: "ことばウルフ" },
        { question: "手をきれいにする動作はどれ？", answer: "手を洗います", choices: ["手を洗います", "本を読みます", "コーヒーを飲みます", "電車に乗ります"], image: "images/tearai.jpg", enemy: "🦖", enemyName: "ことばティラノ" }
    ],
    aiConversation: [
        { question: "AI会話：カフェで注文", prompt: "カフェで飲み物を注文する場面", hint: "短い言葉でも大丈夫です。自分の言葉で答えてみましょう。", scene: "カフェで飲み物を注文" },
        { question: "AI会話：買い物", prompt: "お店で買い物をする場面", hint: "欲しいものやお願いを伝えてみましょう。", scene: "お店で買い物" },
        { question: "AI会話：あいさつ", prompt: "初対面の人にあいさつする場面", hint: "あいさつや簡単な受け答えをしてみましょう。", scene: "初対面の人にあいさつ" },
        { question: "AI会話：道を聞く", prompt: "駅で道を聞く場面", hint: "場所や行き方を短く伝えてみましょう。", scene: "駅で道を聞く" }
    ]
};
// ------------------------------------------------------------
// 3. ゲームの状態
// ------------------------------------------------------------
var selectedGenre = null;
var selectedCategory = null;
var selectedActivity = null;
var questions = [];
var current = 0;
var score = 0;
var answered = false;
var hintEnabled = true;
var voiceEnabled = true;
var audioContext = null;
var microphoneStream = null;
var microphonePermissionGranted = false;
var microphonePermissionCheckPromise = null;
var activityStartedAt = null;
var speechRecognition = null;
var voiceRecognitionBusy = false;
var aiConversationState = {
    scenario: "",
    goal: "",
    partnerMessage: "",
    history: [],
    waiting: false,
    initialized: false
};
var aiInputRecognition = null;
var moraPracticeState = { clapCount: 0, expected: 0, clapConfirmed: false, recognition: null, clapActive: false };
window.__androidClapDispatch = window.__androidClapDispatch || {
    started: function(){ moraPracticeState.clapActive = true; var el=$("moraClapStatus"); if(el){el.className="mora-status listening"; el.textContent="手拍子を数えています。言葉に合わせて1回ずつ叩いてください。";} },
    count: function(n){ moraPracticeState.clapCount = Number(n)||0; updateMoraClapUI(); },
    stopped: function(n){ moraPracticeState.clapActive = false; moraPracticeState.clapCount = Number(n)||0; updateMoraClapUI(); finishMoraClapRound(); },
    error: function(msg){ moraPracticeState.clapActive = false; var el=$("moraClapStatus"); if(el){el.className="mora-status error"; el.textContent="❌ "+(msg||"手拍子検出に失敗しました。");} var b=$("moraClapStartBtn"); if(b)b.disabled=false; }
};
// ============================================================
// ことばクエストの状態
// mistakes = 間違い回数
// lives    = 残りのハート
// defeated = 倒した敵の数
// ============================================================
var kotobaQuestState = {
    mistakes: 0,
    lives: 3,
    defeated: 0,
    total: 0,
    gameOver: false
};
var $ = function (id) { return document.getElementById(id); };
// ------------------------------------------------------------
// 4. 共通処理
// ------------------------------------------------------------
function shuffle(arr) {
    return __spreadArray([], __read(arr), false).sort(function () { return Math.random() - 0.5; });
}
function show(id) {
    document.querySelectorAll(".screen").forEach(function (screen) { return screen.classList.remove("active"); });
    $(id).classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
}
function getAudioContext() {
    if (!audioContext) {
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext)
            audioContext = new AudioContext();
    }
    return audioContext;
}
function playTone(frequency, duration, type, volume, delay) {
    if (type === void 0) { type = "sine"; }
    if (volume === void 0) { volume = 0.06; }
    if (delay === void 0) { delay = 0; }
    var ctx = getAudioContext();
    if (!ctx)
        return;
    if (ctx.state === "suspended")
        ctx.resume();
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    var start = ctx.currentTime + delay;
    var end = start + duration;
    var master = (typeof window.__appMasterVolume === "number") ? Math.max(0, Math.min(1, window.__appMasterVolume)) : 1;
    var actualVolume = Math.max(0, volume * master);
    if (actualVolume <= 0) return;
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(actualVolume, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, end);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(end + 0.02);
}
function playCorrectSound() {
    playTone(660, 0.12, "sine", 0.06, 0);
    playTone(880, 0.18, "sine", 0.06, 0.12);
}
function announceCorrect() {
    // すべての「正解／できた」判定で共通して流す成功音声です。
    if (voiceEnabled) speak("正解です。できました。");
}
function playWrongSound() {
    playTone(180, 0.22, "triangle", 0.05, 0);
}
function playButtonSound() {
    playTone(520, 0.06, "sine", 0.035, 0);
}
// ------------------------------------------------------------
// 5. 日本語音声読み上げ
// ------------------------------------------------------------
function speak(text) {
    var _a;
    if (!voiceEnabled || !text)
        return;
    // Android版では端末のTextToSpeechを使います。
    if ((_a = window.AndroidSpeech) === null || _a === void 0 ? void 0 : _a.speak) {
        try {
            window.AndroidSpeech.speak(String(text));
            return;
        }
        catch (_) { }
    }
    if (!("speechSynthesis" in window))
        return;
    window.speechSynthesis.cancel();
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = 0.88;
    utterance.pitch = 1.0;
    utterance.onstart = function () { $("voiceStatus").textContent = "音声再生中…"; };
    utterance.onend = function () { $("voiceStatus").textContent = ""; };
    utterance.onerror = function () { $("voiceStatus").textContent = "音声を再生できませんでした。"; };
    window.speechSynthesis.speak(utterance);
}
// ------------------------------------------------------------
// 6. 4カテゴリの選択画面
// ------------------------------------------------------------
function renderCategories() {
    var grid = $("categoryGrid");
    if (!grid)
        return;
    grid.innerHTML = "";
    TRAINING_CATEGORIES.forEach(function (category) {
        var button = document.createElement("button");
        button.type = "button";
        button.className = "category-card";
        button.innerHTML = "\n      <span class=\"category-icon\">".concat(category.icon, "</span>\n      <span class=\"category-name\">").concat(category.name, "</span>\n      <span class=\"category-description\">").concat(category.description, "</span>\n      <span class=\"category-count\">").concat(category.activities.length, "\u3064\u306E\u8AB2\u984C</span>\n    ");
        button.addEventListener("click", function () { return selectCategory(category.id); });
        grid.appendChild(button);
    });
}
function selectCategory(categoryId) {
    selectedCategory = TRAINING_CATEGORIES.find(function(c){ return c.id === categoryId; }) || null;
    selectedActivity = null;
    if (!selectedCategory) return;
    var icon = $("selectedGenreIcon"), name = $("selectedGenreName"), desc = $("selectedGenreDescription");
    if (icon) icon.textContent = selectedCategory.icon;
    if (name) name.textContent = selectedCategory.name;
    if (desc) desc.textContent = selectedCategory.description;
    var panel = $("activityPanel"), grid = $("categoryGrid");
    if (panel) panel.classList.remove("hidden");
    if (grid) grid.style.display = "none";
    var cards = $("activityCards");
    if (cards) {
        cards.innerHTML = "";
        selectedCategory.activities.forEach(function(item){
            var id=item[0], title=item[1], description=item[2];
            var b=document.createElement("button");
            b.type="button";
            b.className="activity-card-native";
            b.innerHTML='<span class="activity-card-icon">' + ((id === "localAIConversation" || id === "aiConversation") ? "🧠" : "▶") + '</span><span class="activity-card-text"><strong>' + title + '</strong><small>' + description + '</small></span><span class="activity-card-arrow">›</span>';
            b.addEventListener("click", function(){ startActivity(id); });
            cards.appendChild(b);
        });
    }
    var select=$("activitySelect");
    if(select){
        select.innerHTML='<option value="">課題を選んでください</option>';
        selectedCategory.activities.forEach(function(item){
            var o=document.createElement("option"); o.value=item[0]; o.textContent=item[1]; o.dataset.description=item[2]; select.appendChild(o);
        });
    }
    window.scrollTo({top:0,behavior:"smooth"});
}
function updateActivitySelection() {
    var _a;
    var select = $("activitySelect");
    var option = select.options[select.selectedIndex];
    selectedActivity = select.value || null;
    $("activityDescription").textContent = ((_a = option === null || option === void 0 ? void 0 : option.dataset) === null || _a === void 0 ? void 0 : _a.description) || "課題を選ぶと、ここに説明が表示されます。";
    $("startSelectedBtn").disabled = !selectedActivity;
}
function selectGenre(genreId) {
    // 旧処理との互換用：内部ジャンルから該当する7カテゴリへ移動します。
    var category = TRAINING_CATEGORIES.find(function (c) { return c.activities.some(function (a) { var _a; return (_a = GENRES.find(function (g) { return g.id === genreId; })) === null || _a === void 0 ? void 0 : _a.activities.some(function (x) { return x[0] === a[0]; }); }); });
    if (category)
        selectCategory(category.id);
}
// ------------------------------------------------------------
// 7. 課題開始
// ------------------------------------------------------------
function startActivity(activityId) {
    // 「ことばファンタジーDX」はUD版RPG画面を開きます。
    if (activityId === "kotobaQuest") {
        selectedActivity = activityId;
        if (window.AndroidApp && typeof window.AndroidApp.openKotobaQuest === "function") {
            window.AndroidApp.openKotobaQuest();
        } else {
            window.location.href = "kotoba-quest-ud.html";
        }
        return;
    }
    if (activityId === "readingMemory1" || activityId === "readingMemory2" || activityId === "readingMemory3" || activityId === "readingMemory") {
        var storyId = activityId === "readingMemory2" ? "2" : (activityId === "readingMemory3" ? "3" : "1");
        if (window.__readingMemoryMode && typeof window.__readingMemoryMode.open === "function") {
            window.__readingMemoryMode.open(storyId);
        } else {
            window.location.href = "reading-memory.html?story=" + encodeURIComponent(storyId);
        }
        return;
    }
    selectedActivity = activityId;
    var genreEntry = GENRES.find(function (g) { return g.activities.some(function (a) { return a[0] === activityId; }); });
    selectedGenre = genreEntry || null;
    hintEnabled = $("hintOn").checked;
    voiceEnabled = $("voiceOn").checked;
    var bank = QUESTIONS[activityId] || [];
    var count = Number($("questionCount").value);
    if (activityId === "aiConversation" || activityId === "localAIConversation") {
        questions = Array.from({length: Math.min(Math.max(count || 5, 3), 10)}, function(){
            return { question: "生成AIチャット", prompt: "AIと会話してみましょう。短い返事でも大丈夫です。", hint: "言いたいことを一つだけ伝えてみましょう。" };
        });
    }
    else {
        questions = shuffle(bank).slice(0, Math.min(count, bank.length));
    }
    current = 0;
    score = 0;
    activityStartedAt = Date.now();
    if (activityId === "kotobaQuestClassic") {
        kotobaQuestState = { mistakes: 0, lives: 3, defeated: 0, total: questions.length, gameOver: false };
    }
    if (activityId === "aiConversation" || activityId === "localAIConversation") {
        aiConversationState = { scenario: "", goal: "", partnerMessage: "", history: [], waiting: false, initialized: false, turnCount: 0 };
    }
    if (!questions.length) {
        alert("この課題にはまだ問題が入っていません。");
        return;
    }
    $("trainingTitle").textContent = "".concat(selectedCategory ? selectedCategory.name : "トレーニング", "\uFF5C").concat(getActivityName(activityId));
    show("game");
    renderQuestion();
    if (activityId === "kotobaQuestClassic") {
        showClassicQuestIntro();
    }
    playButtonSound();
}

function showClassicQuestIntro() {
    var oldOverlay = document.getElementById("classicQuestIntroOverlay");
    if (oldOverlay) oldOverlay.remove();

    var steps = [
        { name: "ことばガイド", text: "こんにちは！ ことばクエストZへ ようこそ。" },
        { name: "ことばガイド", text: "問題に答えると、目の前のモンスターを倒せます。" },
        { name: "ことばガイド", text: "まちがいは3回まで。あわてずに、ゆっくり選びましょう。" },
        { name: "ことばガイド", text: "それでは、クラシック版の冒険をはじめましょう！" }
    ];
    var index = 0;
    var overlay = document.createElement("div");
    overlay.id = "classicQuestIntroOverlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "ことばクエストZの会話イベント");
    overlay.style.cssText = "position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;padding:18px;background:rgba(7,18,37,.90);box-sizing:border-box;";
    overlay.innerHTML = '<div style="width:min(720px,100%);background:#142744;border:3px solid #8bc5ff;border-radius:22px;box-shadow:0 18px 50px rgba(0,0,0,.45);padding:clamp(20px,4vw,34px);color:#fff;box-sizing:border-box;">' +
        '<div style="display:flex;align-items:center;gap:14px;margin-bottom:18px;">' +
        '<div aria-hidden="true" style="flex:none;width:64px;height:64px;display:flex;align-items:center;justify-content:center;font-size:38px;background:#24496f;border-radius:18px;">🎮</div>' +
        '<div><div id="classicQuestIntroName" style="font-weight:800;font-size:clamp(17px,3vw,22px);color:#9ed2ff;">ことばガイド</div><div style="font-size:13px;opacity:.85;">ことばクエストZ｜会話イベント</div></div></div>' +
        '<div id="classicQuestIntroText" aria-live="polite" style="min-height:100px;display:flex;align-items:center;font-size:clamp(20px,3.8vw,28px);line-height:1.8;font-weight:700;white-space:pre-wrap;margin-bottom:22px;"></div>' +
        '<button id="classicQuestIntroNext" type="button" style="display:block;width:100%;min-height:58px;border:0;border-radius:14px;background:#42a66c;color:#fff;font-size:20px;font-weight:800;cursor:pointer;box-shadow:0 4px 0 #277546;">つぎへ　▼</button>' +
        '</div>';
    document.body.appendChild(overlay);

    var nameEl = overlay.querySelector("#classicQuestIntroName");
    var textEl = overlay.querySelector("#classicQuestIntroText");
    var nextEl = overlay.querySelector("#classicQuestIntroNext");
    function renderStep() {
        var step = steps[index];
        nameEl.textContent = step.name;
        textEl.textContent = step.text;
        nextEl.textContent = index === steps.length - 1 ? "ゲームを始める　▶" : "つぎへ　▼";
        if (window.KQEventMessageSound) window.KQEventMessageSound.play();
    }
    nextEl.addEventListener("click", function () {
        playButtonSound();
        if (index < steps.length - 1) {
            index++;
            renderStep();
        } else {
            overlay.remove();
        }
    });
    renderStep();
}

function getActivityName(activityId) {
    if (selectedGenre) {
        var found = selectedGenre.activities.find(function (a) { return a[0] === activityId; });
        if (found)
            return found[1];
    }
    if (selectedCategory) {
        var found = selectedCategory.activities.find(function (a) { return a[0] === activityId; });
        if (found)
            return found[1];
    }
    return activityId === "localAIConversation" ? "生成AIチャットトレーニング" : "トレーニング";
}
// ------------------------------------------------------------
// 8. 問題表示
// ------------------------------------------------------------
function renderQuestion() {
    var _a;
    answered = false;
    var q = questions[current];
    $("progress").textContent = "".concat(current + 1, " / ").concat(questions.length);
    $("score").textContent = "\u6B63\u89E3 ".concat(score);
    $("categoryLabel").textContent = selectedCategory ? selectedCategory.name : (selectedGenre ? selectedGenre.name : "トレーニング");
    $("questionLabel").textContent = q.question || "問題";
    $("promptText").textContent = q.prompt || "";
    $("promptText").classList.toggle("hidden", !q.prompt);
    $("hint").textContent = q.hint || "";
    $("hint").classList.add("hidden");
    $("hintBtn").classList.toggle("hidden", !hintEnabled || !q.hint);
    $("feedback").textContent = "";
    $("feedback").className = "feedback";
    $("nextBtn").classList.add("hidden");
    $("voiceStatus").textContent = "";
    $("answerArea").innerHTML = "";
    // 問題画像があれば画像、なければ絵文字を表示
    var image = $("questionImage");
    var emoji = $("emoji");
    (_a = $("visualArea")) === null || _a === void 0 ? void 0 : _a.classList.toggle("voice-read-hide-default-visual", selectedActivity === "voiceRead");
    image.classList.add("hidden");
    emoji.classList.remove("hidden");
    emoji.textContent = q.emoji || "❓";
    image.removeAttribute("src");
    if (q.image) {
        image.onload = function () {
            image.classList.remove("hidden");
            emoji.classList.add("hidden");
        };
        image.onerror = function () {
            image.classList.add("hidden");
            emoji.classList.remove("hidden");
        };
        image.alt = "".concat(q.answer || "問題", "\u306E\u753B\u50CF");
        image.src = q.image;
    }
    // クラシック版だけ旧式の敵バトル画面を使用します。新しいUD版は別画面のままです。
    if (selectedActivity === "kotobaQuestClassic") {
        renderKotobaQuest(q);
    }
    else if (selectedActivity === "voiceRead") {
        renderVoiceReadTest(q);
    }
    else if (selectedActivity === "mora") {
        renderMoraQuestion(q);
    }
    else if (FOUNDATION_VOICE_ACTIVITIES.has(selectedActivity)) {
        renderFoundationVoiceTest(q);
    }
    else if (selectedActivity === "aiConversation" || selectedActivity === "localAIConversation") {
        if (typeof renderPseudoAIConversation === "function")
            renderPseudoAIConversation(q);
    }
    else if (selectedActivity === "anagram" && q.tokens) {
        renderAnagram(q);
    }
    else {
        renderChoices(q);
    }
    // 音声認識対象の基礎トレーニングは、画面上の「お手本を聞く」から再生します。
    // それ以外は従来どおり自動読み上げします。
    if (voiceEnabled && q.voiceText && selectedActivity !== "voiceRead" && selectedActivity !== "kotobaQuestClassic" && !FOUNDATION_VOICE_ACTIVITIES.has(selectedActivity)) {
        setTimeout(function () { return speak(q.voiceText); }, 250);
    }
}
function renderAIConversation(q) {
    var _a, _b, _c;
    var area = $("answerArea");
    if (!area)
        return;
    if (aiInputRecognition) {
        try {
            aiInputRecognition.abort();
        }
        catch (_) { }
        aiInputRecognition = null;
    }
    var isFirst = !aiConversationState.initialized;
    var wrap = document.createElement("div");
    wrap.className = "ai-conversation-panel";
    wrap.innerHTML = "\n    <div class=\"ai-test-badge\">\uD83E\uDD16 \u7AEF\u672B\u5185AI\u4F1A\u8A71</div>\n    <div class=\"ai-scene-label\">\u5834\u9762</div>\n    <div id=\"aiScenario\" class=\"ai-scenario\">".concat(escapeHtml(aiConversationState.scenario || q.scene || q.prompt || "AIが会話問題を作ります"), "</div>\n    <div class=\"ai-goal-box\">\n      <strong>\u4ECA\u65E5\u306E\u76EE\u6A19</strong>\n      <div id=\"aiGoal\">").concat(escapeHtml(aiConversationState.goal || "会話相手の言葉を聞いて、自分の言葉で返してみましょう。"), "</div>\n    </div>\n    <div class=\"ai-partner-title\">\uD83D\uDCAC \u4F1A\u8A71\u76F8\u624B</div>\n    <div id=\"aiPartnerMessage\" class=\"ai-partner-message\">").concat(isFirst ? "AIが会話問題を作っています…" : escapeHtml(aiConversationState.partnerMessage), "</div>\n    <div id=\"aiHintBox\" class=\"ai-hint-box\">").concat(escapeHtml(q.hint || "短い言葉でも大丈夫です。"), "</div>\n    <label class=\"ai-response-label\" for=\"aiResponseInput\">\u3042\u306A\u305F\u306E\u8FD4\u4E8B</label>\n    <textarea id=\"aiResponseInput\" class=\"ai-response-input\" rows=\"3\" placeholder=\"\u3053\u3053\u306B\u8FD4\u4E8B\u3092\u5165\u529B\u3067\u304D\u307E\u3059\u3002\u30DE\u30A4\u30AF\u3067\u8A71\u3059\u3053\u3068\u3082\u3067\u304D\u307E\u3059\u3002\"></textarea>\n    <div class=\"ai-response-buttons\">\n      <button type=\"button\" id=\"aiMicBtn\" class=\"voice-mic-check-btn\">\uD83C\uDFA4 \u30DE\u30A4\u30AF\u3067\u8A71\u3059</button>\n      <button type=\"button\" id=\"aiSpeakPartnerBtn\" class=\"voice-example-btn\">\uD83D\uDD0A \u76F8\u624B\u306E\u8A00\u8449\u3092\u8AAD\u3080</button>\n      <button type=\"button\" id=\"aiSendBtn\" class=\"voice-start-btn\">\u9001\u4FE1\u3059\u308B</button>\n    </div>\n    <div id=\"aiStatus\" class=\"voice-test-status\">").concat(isFirst ? "AIが問題を準備しています…" : "返事を入力して「送信する」を押してください。", "</div>\n    <div id=\"aiFeedback\" class=\"ai-feedback\"></div>\n    <button type=\"button\" id=\"aiRegenerateBtn\" class=\"voice-example-btn\">\uD83D\uDD04 \u65B0\u3057\u3044\u4F1A\u8A71\u3092\u81EA\u52D5\u751F\u6210</button>\n    <div class=\"ai-note\">\u203B\u3053\u308C\u306FOpenAI API\u3092\u4F7F\u308F\u306A\u3044\u7591\u4F3CAI\u3067\u3059\u3002\u3042\u3089\u304B\u3058\u3081\u7528\u610F\u3057\u305F\u5834\u9762\u30FB\u8A00\u8449\u3092\u7D44\u307F\u5408\u308F\u305B\u3066\u6BCE\u56DE\u9055\u3046\u4F1A\u8A71\u3092\u81EA\u52D5\u751F\u6210\u3057\u307E\u3059\u3002\u533B\u5B66\u7684\u306A\u8A55\u4FA1\u30FB\u8A3A\u65AD\u3067\u306F\u3042\u308A\u307E\u305B\u3093\u3002\u500B\u4EBA\u60C5\u5831\u306F\u5165\u529B\u3057\u306A\u3044\u3067\u304F\u3060\u3055\u3044\u3002</div>\n  ");
    area.appendChild(wrap);
    (_a = $("aiMicBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", startAIInputRecognition);
    (_b = $("aiSpeakPartnerBtn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () { return speak(aiConversationState.partnerMessage || ""); });
    (_c = $("aiSendBtn")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", submitAIConversation);
    if (isFirst)
        generateAIConversationStart(q);
}
// ------------------------------------------------------------
// 生成AIチャット：外部通信なしで、アプリ内のルールから会話を自動生成します。
// ------------------------------------------------------------
var PSEUDO_AI_BANK = {
    cafe: {
        label: "カフェで注文",
        goals: ["欲しい飲み物を伝える", "注文を短い言葉で伝える", "店員さんの質問に答える"],
        roles: ["店員さん", "カフェのスタッフ"],
        openers: [
            "こんにちは。今日は何をお飲みになりますか？",
            "いらっしゃいませ。ご注文はお決まりですか？",
            "こんにちは。飲み物を一つご注文いただけますか？"
        ],
        keywords: ["コーヒー", "お茶", "紅茶", "水", "ジュース", "ラテ", "ください", "お願いします"],
        next: [
            "ありがとうございます。サイズはいかがしますか？",
            "かしこまりました。ほかにご注文はありますか？",
            "ありがとうございます。少々お待ちください。"
        ]
    },
    shopping: {
        label: "お店で買い物",
        goals: ["欲しいものを伝える", "値段を聞く", "会計で返事をする"],
        roles: ["店員さん", "お店のスタッフ"],
        openers: [
            "こんにちは。何をお探しですか？",
            "いらっしゃいませ。何かお手伝いしましょうか？",
            "こちらのお店では、どんなものをお探しですか？"
        ],
        keywords: ["パン", "コーヒー", "りんご", "水", "値段", "いくら", "これ", "ください", "お願いします"],
        next: [
            "こちらですね。ほかに何かありますか？",
            "ありがとうございます。こちらのお値段は500円です。",
            "かしこまりました。こちらでよろしいですか？"
        ]
    },
    greeting: {
        label: "あいさつ・雑談",
        goals: ["あいさつをする", "簡単な質問に答える", "短い会話を続ける"],
        roles: ["知り合い", "スタッフ", "新しく会った人"],
        openers: [
            "こんにちは。今日は元気ですか？",
            "おはようございます。今日はどんな予定ですか？",
            "こんにちは。最近どうしていますか？"
        ],
        keywords: ["こんにちは", "おはよう", "元気", "はい", "いいえ", "仕事", "休み", "大丈夫", "ありがとう"],
        next: [
            "そうなんですね。もう少し教えてください。",
            "ありがとうございます。今日はゆっくり過ごしてくださいね。",
            "なるほど。次は何をしますか？"
        ]
    },
    station: {
        label: "駅で道を聞く",
        goals: ["行きたい場所を伝える", "道を聞く", "相手の説明に返事をする"],
        roles: ["駅員さん", "道を教えてくれる人"],
        openers: [
            "こんにちは。何かお困りですか？",
            "どうしましたか？駅の中をご案内しましょうか？",
            "行きたい場所はありますか？"
        ],
        keywords: ["トイレ", "改札", "出口", "横須賀", "衣笠", "ホーム", "どこ", "行きたい", "お願いします"],
        next: [
            "わかりました。まず右に進んでください。",
            "はい。その場所なら、次の案内板を見てください。",
            "大丈夫です。必要なら一緒に確認しましょう。"
        ]
    },
    clinic: {
        label: "受付で話す",
        goals: ["用件を伝える", "名前や予約を伝える", "簡単な質問に答える"],
        roles: ["受付の人", "スタッフ"],
        openers: [
            "こんにちは。今日はどうされましたか？",
            "こんにちは。受付ですね。ご用件を教えてください。",
            "予約はされていますか？"
        ],
        keywords: ["予約", "診察", "名前", "薬", "待ちます", "お願いします", "はい", "いいえ"],
        next: [
            "ありがとうございます。こちらで少しお待ちください。",
            "確認しました。順番になったらお呼びします。",
            "わかりました。ほかに伝えたいことはありますか？"
        ]
    },
    home: {
        label: "家での会話",
        goals: ["予定を伝える", "お願いをする", "今日のことを話す"],
        roles: ["家族", "同居している人"],
        openers: [
            "今日はどんな一日でしたか？",
            "明日は何をする予定ですか？",
            "何か手伝ってほしいことはありますか？"
        ],
        keywords: ["仕事", "通所", "買い物", "休み", "ごはん", "コーヒー", "手伝って", "明日", "今日"],
        next: [
            "そうなんですね。無理をしないでくださいね。",
            "わかりました。予定を教えてくれてありがとうございます。",
            "では、その予定で大丈夫そうですね。"
        ]
    }
};
function pseudoRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function pseudoGenerateScenario(seed) {
    var keys = Object.keys(PSEUDO_AI_BANK);
    var key = (seed === null || seed === void 0 ? void 0 : seed.scenarioKey) && PSEUDO_AI_BANK[seed.scenarioKey] ? seed.scenarioKey : pseudoRandomItem(keys);
    var bank = PSEUDO_AI_BANK[key];
    var goal = pseudoRandomItem(bank.goals);
    var role = pseudoRandomItem(bank.roles);
    var opener = pseudoRandomItem(bank.openers);
    return {
        scenarioKey: key,
        scenario: bank.label,
        goal: "".concat(goal, "\u3002\u76F8\u624B\u306F").concat(role, "\u3067\u3059\u3002"),
        partnerMessage: opener,
        history: [{ role: "assistant", content: opener }]
    };
}
function pseudoEvaluateReply(state, userText) {
    var bank = PSEUDO_AI_BANK[state.scenarioKey] || PSEUDO_AI_BANK.cafe;
    var normalized = normalizeSpeechText(userText);
    var hasKeyword = bank.keywords.some(function (k) { return normalized.includes(normalizeSpeechText(k)); });
    var isPolite = /ください|お願いします|ありがとう|はい|大丈夫|こんにちは|おはよう/.test(userText);
    var matched = normalized.length >= 2 && (hasKeyword || isPolite || normalized.length >= 6);
    var feedback;
    if (matched) {
        feedback = normalized.length <= 5
            ? "短い言葉でも、伝えたい内容がわかりやすい返事です。"
            : "自分の言葉で返事ができています。会話を続けられています。";
    }
    else {
        feedback = "短い言葉でも大丈夫です。言いたいことを一つ選んで、もう一度言ってみましょう。";
    }
    var reply = pseudoRandomItem(bank.next);
    if (normalized.indexOf("ありがとう") >= 0)
        reply = "こちらこそ、ありがとうございます。もう一つ話してみましょう。";
    else if (normalized.indexOf("ください") >= 0 || normalized.indexOf("お願いします") >= 0)
        reply = "わかりました。では、その内容で進めましょう。";
    else if (normalized.indexOf("わからない") >= 0 || normalized.indexOf("むずかしい") >= 0 || normalized.indexOf("難しい") >= 0)
        reply = "大丈夫です。短い言葉で大丈夫です。たとえば「お願いします」でも伝わります。";
    else if (normalized.length >= 8)
        reply = "ありがとうございます。しっかり伝わりました。もう少し会話を続けてみましょう。";
    return {
        matched: matched,
        feedback: feedback,
        partnerMessage: reply
    };
}
function renderPseudoAIConversation(q) {
    var _a, _b, _c, _d;
    var area = $("answerArea");
    if (!area)
        return;
    if (aiInputRecognition) {
        try {
            aiInputRecognition.abort();
        }
        catch (_) { }
        aiInputRecognition = null;
    }
    var previousTurns = Number(aiConversationState.turnCount || 0);
    var state = pseudoGenerateScenario(q);
    aiConversationState = __assign(__assign({}, state), { waiting: false, initialized: true, turnCount: previousTurns });
    var wrap = document.createElement("div");
    wrap.className = "ai-conversation-panel";
    wrap.innerHTML = "\n    <div class=\"ai-test-badge\">\uD83E\uDD16 \u7AEF\u672B\u5185AI\u4F1A\u8A71\uFF08\u81EA\u52D5\u751F\u6210\uFF09</div>\n    <div class=\"ai-scene-label\">\u5834\u9762</div>\n    <div id=\"aiScenario\" class=\"ai-scenario\">".concat(escapeHtml(state.scenario), "</div>\n    <div class=\"ai-goal-box\"><strong>\u4ECA\u65E5\u306E\u76EE\u6A19</strong><div id=\"aiGoal\">").concat(escapeHtml(state.goal), "</div></div>\n    <div class=\"ai-partner-title\">\uD83D\uDCAC \u4F1A\u8A71\u76F8\u624B</div>\n    <div id=\"aiPartnerMessage\" class=\"ai-partner-message\">").concat(escapeHtml(state.partnerMessage), "</div>\n    <div id=\"aiHintBox\" class=\"ai-hint-box\">\u77ED\u3044\u8FD4\u4E8B\u3067\u3082\u5927\u4E08\u592B\u3067\u3059\u3002\u81EA\u5206\u306E\u8A00\u8449\u3067\u7B54\u3048\u3066\u307F\u307E\u3057\u3087\u3046\u3002</div>\n    <label class=\"ai-response-label\" for=\"aiResponseInput\">\u3042\u306A\u305F\u306E\u8FD4\u4E8B</label>\n    <textarea id=\"aiResponseInput\" class=\"ai-response-input\" rows=\"3\" placeholder=\"\u3053\u3053\u306B\u8FD4\u4E8B\u3092\u5165\u529B\u3067\u304D\u307E\u3059\u3002\u30DE\u30A4\u30AF\u3067\u8A71\u3059\u3053\u3068\u3082\u3067\u304D\u307E\u3059\u3002\"></textarea>\n    <div class=\"ai-response-buttons\">\n      <button type=\"button\" id=\"aiMicBtn\" class=\"voice-mic-check-btn\">\uD83C\uDFA4 \u30DE\u30A4\u30AF\u3067\u8A71\u3059</button>\n      <button type=\"button\" id=\"aiSpeakPartnerBtn\" class=\"voice-example-btn\">\uD83D\uDD0A \u76F8\u624B\u306E\u8A00\u8449\u3092\u8AAD\u3080</button>\n      <button type=\"button\" id=\"aiSendBtn\" class=\"voice-start-btn\">\u9001\u4FE1\u3059\u308B</button>\n    </div>\n    <div id=\"aiStatus\" class=\"voice-test-status\">\u8FD4\u4E8B\u3092\u5165\u529B\u3057\u3066\u300C\u9001\u4FE1\u3059\u308B\u300D\u3092\u62BC\u3057\u3066\u304F\u3060\u3055\u3044\u3002</div>\n    <div id=\"aiFeedback\" class=\"ai-feedback\"></div>\n    <button type=\"button\" id=\"aiRegenerateBtn\" class=\"voice-example-btn\">\uD83D\uDD04 \u65B0\u3057\u3044\u4F1A\u8A71\u3092\u81EA\u52D5\u751F\u6210</button>\n    <div class=\"ai-note\">\u203B\u30A4\u30F3\u30BF\u30FC\u30CD\u30C3\u30C8\u3092\u4F7F\u308F\u306A\u3044\u7AEF\u672B\u5185AI\u3067\u3059\u3002\u5834\u9762\u30FB\u76EE\u6A19\u30FB\u4F1A\u8A71\u6587\u3092\u81EA\u52D5\u7684\u306B\u7D44\u307F\u5408\u308F\u305B\u3066\u3044\u307E\u3059\u3002\u533B\u5B66\u7684\u306A\u8A55\u4FA1\u30FB\u8A3A\u65AD\u3067\u306F\u3042\u308A\u307E\u305B\u3093\u3002</div>\n  ");
    area.appendChild(wrap);
    (_a = $("aiMicBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", startAIInputRecognition);
    (_b = $("aiSpeakPartnerBtn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () { return speak(aiConversationState.partnerMessage || ""); });
    (_c = $("aiSendBtn")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", submitPseudoAIConversation);
    (_d = $("aiRegenerateBtn")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () {
        aiConversationState = __assign(__assign({}, pseudoGenerateScenario(q)), { waiting: false, initialized: true, turnCount: 0 });
        $("aiScenario").textContent = aiConversationState.scenario;
        $("aiGoal").textContent = aiConversationState.goal;
        $("aiPartnerMessage").textContent = aiConversationState.partnerMessage;
        $("aiFeedback").textContent = "";
        $("aiResponseInput").value = "";
        $("aiStatus").textContent = "新しい会話を作りました。返事をしてみましょう。";
        speak(aiConversationState.partnerMessage);
        answered = false;
    });
    speak(state.partnerMessage);
}
function submitPseudoAIConversation() {
    if (aiConversationState.waiting || !aiConversationState.initialized)
        return;
    var input = $("aiResponseInput");
    var text = String((input === null || input === void 0 ? void 0 : input.value) || "").trim();
    if (!text) {
        showAIStatus("返事を入力するか、マイクで話してください。", "error");
        return;
    }
    var judged = pseudoEvaluateReply(aiConversationState, text);
    aiConversationState.turnCount = (aiConversationState.turnCount || 0) + 1;
    aiConversationState.history.push({ role: "user", content: text });
    aiConversationState.partnerMessage = judged.partnerMessage;
    aiConversationState.history.push({ role: "assistant", content: judged.partnerMessage });
    if (judged.matched)
        score++;
    $("aiFeedback").innerHTML = "<strong>".concat(judged.matched ? "⭕ 伝わりました" : "🔁 もう一度練習してみましょう", "</strong><br>").concat(escapeHtml(judged.feedback));
    $("aiPartnerMessage").textContent = judged.partnerMessage;
    $("aiResponseInput").value = "";
    $("score").textContent = "\u6B63\u89E3 ".concat(score);
    $("aiStatus").textContent = judged.matched ? "会話が続きました。" : "短い返事でも大丈夫です。別の言い方を試してみましょう。";
    speak(judged.partnerMessage);
    $("nextBtn").classList.remove("hidden");
    answered = true;
}
function submitAIConversation() {
    // 旧UI互換：生成AIチャットへ統一
    submitPseudoAIConversation();
}
function startAIInputRecognition() {
    return __awaiter(this, void 0, void 0, function () {
        var Recognition, btn, error_1, recognition, finalText;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Recognition = getSpeechRecognitionClass();
                    if (!Recognition) {
                        showAIStatus("このブラウザは音声認識に対応していません。Chromeなどで試してください。", "error");
                        return [2 /*return*/];
                    }
                    if (!window.isSecureContext && !window.AndroidSpeech) {
                        showAIStatus("HTTPSまたはlocalhostで開いてください。", "error");
                        return [2 /*return*/];
                    }
                    btn = $("aiMicBtn");
                    if (btn) {
                        btn.disabled = true;
                        btn.textContent = "🎤 聞いています…";
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, requestMicrophoneAccess()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    showAIStatus("❌ マイクを使用できません。ブラウザの許可を確認してください。", "error");
                    if (btn) {
                        btn.disabled = false;
                        btn.textContent = "🎤 マイクで話す";
                    }
                    return [2 /*return*/];
                case 4:
                    recognition = new Recognition();
                    aiInputRecognition = recognition;
                    recognition.lang = "ja-JP";
                    recognition.continuous = false;
                    recognition.interimResults = true;
                    finalText = "";
                    recognition.onstart = function () { return showAIStatus("話してください…", "listening"); };
                    recognition.onresult = function (event) {
                        var _a, _b;
                        var text = "";
                        for (var i = event.resultIndex; i < event.results.length; i++)
                            text += ((_a = event.results[i][0]) === null || _a === void 0 ? void 0 : _a.transcript) || "";
                        if ($("aiResponseInput"))
                            $("aiResponseInput").value = text;
                        if ((_b = event.results[event.results.length - 1]) === null || _b === void 0 ? void 0 : _b.isFinal)
                            finalText = text.trim();
                    };
                    recognition.onerror = function (event) {
                        showAIStatus("\u274C \u97F3\u58F0\u8A8D\u8B58\u30A8\u30E9\u30FC\uFF1A".concat(event.error || "unknown"), "error");
                        if (btn) {
                            btn.disabled = false;
                            btn.textContent = "🎤 マイクで話す";
                        }
                        aiInputRecognition = null;
                    };
                    recognition.onend = function () {
                        if (finalText && $("aiResponseInput"))
                            $("aiResponseInput").value = finalText;
                        if (btn) {
                            btn.disabled = false;
                            btn.textContent = "🎤 マイクで話す";
                        }
                        aiInputRecognition = null;
                        if (finalText)
                            showAIStatus("認識しました。「送信する」でAIに返事を送れます。", "ok");
                    };
                    recognition.start();
                    return [2 /*return*/];
            }
        });
    });
}
function showAIStatus(text, type) {
    if (type === void 0) { type = ""; }
    var el = $("aiStatus");
    if (!el)
        return;
    el.className = "voice-test-status ".concat(type).trim();
    el.textContent = text;
}
function getSpeechRecognitionClass() {
    return window.AndroidSpeechRecognition || window.SpeechRecognition || window.webkitSpeechRecognition || null;
}
function normalizeSpeechText(text) {
    return String(text || "")
        .normalize("NFKC")
        .replace(/[\s、。,.・!?！？「」『』（）()［］\[\]【】]/g, "")
        .replace(/[ァ-ヶ]/g, function (ch) { return String.fromCharCode(ch.charCodeAt(0) - 0x60); })
        .toLowerCase();
}
function levenshtein(a, b) {
    var prev = Array.from({ length: b.length + 1 }, function (_, i) { return i; });
    for (var i = 1; i <= a.length; i++) {
        var cur = [i];
        for (var j = 1; j <= b.length; j++) {
            cur[j] = Math.min(cur[j - 1] + 1, prev[j] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        }
        for (var j = 0; j < cur.length; j++)
            prev[j] = cur[j];
    }
    return prev[b.length];
}
function speechMatch(target, transcript) {
    var a = normalizeSpeechText(target), b = normalizeSpeechText(transcript);
    if (!a || !b)
        return { matched: false, similarity: 0 };
    if (a === b || a.includes(b) || b.includes(a))
        return { matched: true, similarity: 1 };
    var dist = levenshtein(a, b), max = Math.max(a.length, b.length);
    var similarity = max ? 1 - dist / max : 1;
    return { matched: similarity >= 0.82, similarity: similarity };
}
function showVoiceTestStatus(text, type) {
    if (type === void 0) { type = ""; }
    var status = $("voiceTestStatus");
    if (!status)
        return;
    status.className = "voice-test-status ".concat(type).trim();
    status.textContent = text;
}
function browserVoiceDiagnostics() {
    var Recognition = getSpeechRecognitionClass();
    var androidNative = !!window.AndroidSpeech;
    var secure = window.isSecureContext || androidNative;
    var mediaOk = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) || androidNative;
    var inFrame = window.top !== window.self;
    return { Recognition: Recognition, secure: secure, mediaOk: mediaOk, inFrame: inFrame, androidNative: androidNative };
}
function stopMicrophoneStream() {
    if (microphoneStream) {
        microphoneStream.getTracks().forEach(function (track) { return track.stop(); });
        microphoneStream = null;
    }
}
function requestMicrophoneAccess() {
    return __awaiter(this, void 0, void 0, function () {
        var d;
        var _this = this;
        var _a, _b;
        return __generator(this, function (_c) {
            d = browserVoiceDiagnostics();
            // Android版はJavaのSpeechRecognizerが端末マイクを直接使うため、
            // WebViewのgetUserMedia()は使いません。
            if (window.AndroidSpeech) {
                microphonePermissionGranted = !!((_b = (_a = window.AndroidSpeech).hasMicrophonePermission) === null || _b === void 0 ? void 0 : _b.call(_a));
                // Android native版は「開始」時にOS権限ダイアログを出せるため、
                // 権限がまだ無くてもここでは処理を中断しません。
                return [2 /*return*/, true];
            }
            if (!d.mediaOk)
                throw new Error("MEDIA_UNAVAILABLE");
            // このページで一度許可を取得したら、以後は getUserMedia() を繰り返し呼びません。
            // ブラウザ側のサイト権限が「許可」なら、そのまま音声認識を開始します。
            if (microphonePermissionGranted)
                return [2 /*return*/, true];
            if (microphonePermissionCheckPromise)
                return [2 /*return*/, microphonePermissionCheckPromise];
            microphonePermissionCheckPromise = (function () { return __awaiter(_this, void 0, void 0, function () {
                var permission, error, permissionError_1, stream;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, , 6, 7]);
                            if (!((_a = navigator.permissions) === null || _a === void 0 ? void 0 : _a.query)) return [3 /*break*/, 4];
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, navigator.permissions.query({ name: "microphone" })];
                        case 2:
                            permission = _b.sent();
                            if (permission.state === "granted") {
                                microphonePermissionGranted = true;
                                return [2 /*return*/, true];
                            }
                            if (permission.state === "denied") {
                                error = new DOMException("Microphone permission denied", "NotAllowedError");
                                throw error;
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            permissionError_1 = _b.sent();
                            // Permissions APIに対応していない場合は、getUserMedia()で一度だけ確認します。
                            if ((permissionError_1 === null || permissionError_1 === void 0 ? void 0 : permissionError_1.name) === "NotAllowedError")
                                throw permissionError_1;
                            return [3 /*break*/, 4];
                        case 4: return [4 /*yield*/, navigator.mediaDevices.getUserMedia({
                                audio: {
                                    echoCancellation: true,
                                    noiseSuppression: true,
                                    autoGainControl: true
                                }
                            })];
                        case 5:
                            stream = _b.sent();
                            // 許可確認だけが目的なので、取得した診断用ストリームはすぐ解放します。
                            stream.getTracks().forEach(function (track) { return track.stop(); });
                            microphonePermissionGranted = true;
                            return [2 /*return*/, true];
                        case 6:
                            microphonePermissionCheckPromise = null;
                            return [7 /*endfinally*/];
                        case 7: return [2 /*return*/];
                    }
                });
            }); })();
            return [2 /*return*/, microphonePermissionCheckPromise];
        });
    });
}
function runMicrophoneCheck() {
    return __awaiter(this, void 0, void 0, function () {
        var status, detail, Recognition, secure, inFrame, results, granted, devices, inputs, activeLabel, error_2, code, message;
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    status = $("voiceTestStatus");
                    detail = $("voiceMicDetail");
                    Recognition = getSpeechRecognitionClass();
                    secure = window.isSecureContext;
                    inFrame = window.top !== window.self;
                    if (detail)
                        detail.textContent = "確認しています…";
                    showVoiceTestStatus(microphonePermissionGranted ? "マイク許可は確認済みです…" : "最初の1回だけマイクを確認しています…", "listening");
                    results = [];
                    results.push("\u97F3\u58F0\u8A8D\u8B58\uFF1A".concat(Recognition ? "対応" : "未対応"));
                    results.push("\u30DE\u30A4\u30AFAPI\uFF1A".concat(((_a = navigator.mediaDevices) === null || _a === void 0 ? void 0 : _a.getUserMedia) ? "対応" : (window.AndroidSpeech ? "Androidネイティブ" : "未対応")));
                    results.push("\u5B89\u5168\u306A\u63A5\u7D9A\uFF1A".concat(secure ? "OK" : "NG"));
                    if (inFrame)
                        results.push("埋め込み表示：あり");
                    // Androidアプリ内では、ここでOSのマイク許可を確認します。
                    if (window.AndroidSpeech) {
                        granted = !!((_c = (_b = window.AndroidSpeech).hasMicrophonePermission) === null || _c === void 0 ? void 0 : _c.call(_b));
                        if (!granted) {
                            (_e = (_d = window.AndroidSpeech).requestMicrophonePermission) === null || _e === void 0 ? void 0 : _e.call(_d);
                            microphonePermissionGranted = false;
                            showVoiceTestStatus("マイクの許可が必要です。Androidの許可画面が出たら『許可』を押してください。", "listening");
                            if (detail)
                                detail.textContent = results.join("／") + "／Android権限：未許可";
                            return [2 /*return*/, false];
                        }
                        microphonePermissionGranted = true;
                        results.push("Android権限：許可");
                        showVoiceTestStatus("⭕ マイクを使用できます。", "ok");
                        if (detail)
                            detail.textContent = results.join("／");
                        return [2 /*return*/, true];
                    }
                    if (!secure) {
                        showVoiceTestStatus("このページは安全な接続ではないため、マイクを使えません。HTTPSまたはlocalhostで開いてください。", "error");
                        if (detail)
                            detail.textContent = results.join("／");
                        return [2 /*return*/, false];
                    }
                    if (!Recognition) {
                        showVoiceTestStatus("このブラウザは音声認識に対応していません。Google Chromeで試してください。", "error");
                        if (detail)
                            detail.textContent = results.join("／");
                        return [2 /*return*/, false];
                    }
                    if (!((_f = navigator.mediaDevices) === null || _f === void 0 ? void 0 : _f.getUserMedia)) {
                        showVoiceTestStatus("このブラウザではマイク機能を利用できません。", "error");
                        if (detail)
                            detail.textContent = results.join("／");
                        return [2 /*return*/, false];
                    }
                    _j.label = 1;
                case 1:
                    _j.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, requestMicrophoneAccess()];
                case 2:
                    _j.sent();
                    return [4 /*yield*/, navigator.mediaDevices.enumerateDevices()];
                case 3:
                    devices = _j.sent();
                    inputs = devices.filter(function (d) { return d.kind === "audioinput"; });
                    results.push("\u30DE\u30A4\u30AF\u53F0\u6570\uFF1A".concat(inputs.length));
                    activeLabel = ((_h = (_g = microphoneStream === null || microphoneStream === void 0 ? void 0 : microphoneStream.getAudioTracks) === null || _g === void 0 ? void 0 : _g.call(microphoneStream)[0]) === null || _h === void 0 ? void 0 : _h.label) || "マイク";
                    showVoiceTestStatus(inputs.length ? "⭕ マイクを使用できます。" : "⚠ マイク機器が見つかりません。", inputs.length ? "ok" : "error");
                    if (detail)
                        detail.textContent = results.join("／") + "\uFF0F\u4F7F\u7528\u4E2D\uFF1A".concat(activeLabel);
                    stopMicrophoneStream();
                    return [2 /*return*/, inputs.length > 0];
                case 4:
                    error_2 = _j.sent();
                    code = (error_2 === null || error_2 === void 0 ? void 0 : error_2.name) || "UNKNOWN";
                    message = "マイクを使用できません。ブラウザのマイク許可を確認してください。";
                    if (code === "NotAllowedError" || code === "SecurityError") {
                        message = "マイクが許可されていません。アドレスバーのマイク設定で『許可』にしてください。";
                    }
                    else if (code === "NotFoundError") {
                        message = "マイクが見つかりません。PC・スマホのマイク接続を確認してください。";
                    }
                    else if (code === "NotReadableError") {
                        message = "マイクは見つかりましたが、他のアプリが使用中の可能性があります。";
                    }
                    showVoiceTestStatus("\u274C ".concat(message), "error");
                    if (detail)
                        detail.textContent = results.join("／") + "\uFF0F\u30A8\u30E9\u30FC\uFF1A".concat(code);
                    stopMicrophoneStream();
                    return [2 /*return*/, false];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function getFoundationVoicePractice(q) {
    var activity = selectedActivity;
    var target = q.voiceText || q.answer || q.prompt || "";
    var accept = [];
    if (activity === "mouth") {
        if (q.voiceText) {
            target = q.voiceText;
            accept = [q.voiceText, q.voiceText.replace(/[、。]/g, "")];
        }
        else if (q.answer === "できた") {
            // 「舌を前に出す」などの動作は音声認識だけでは直接判定できないため、
            // 動作後に「できた」と話して確認する方式にします。
            target = "できた";
            accept = ["できた", "出来た"];
        }
        else {
            target = q.answer || q.prompt || "";
            accept = [target];
        }
    }
    else if (activity === "sound") {
        target = q.answer || "";
        // 音声認識が漢字で返した場合も、同じ言葉として正解にします。
        // 例：とけい／時計、かさ／傘、さくら／桜
        var pronunciationAliases = {
            "とけい": ["とけい", "時計"],
            "かさ": ["かさ", "傘"],
            "さくら": ["さくら", "桜"]
        };
        accept = pronunciationAliases[target] || [target];
    }
    else if (activity === "stepup") {
        target = q.voiceText || q.prompt || "";
        accept = [target, (q.prompt || "").replace(/[：→「」『』。（）()]/g, "")];
    }
    else if (activity === "mora") {
        target = q.answer || "";
        var moraMap = {
            "2拍": ["2拍", "二拍", "にはく", "に はく", "2はく"],
            "3拍": ["3拍", "三拍", "さんはく", "さん はく", "3はく"],
            "4拍": ["4拍", "四拍", "よんはく", "よん はく", "4はく"],
            "5拍": ["5拍", "五拍", "ごはく", "ご はく", "5はく"]
        };
        accept = moraMap[target] || [target];
    }
    else if (activity === "accent") {
        target = q.voiceText || q.prompt || "";
        accept = [target, (q.voiceText || "").replace(/[、。]/g, "")];
    }
    else if (activity === "sentenceRhythm") {
        target = q.voiceText || q.prompt || "";
        accept = [target, (q.voiceText || "").replace(/[、。]/g, "")];
    }
    return { target: target, accept: __spreadArray([], __read(new Set(accept.filter(Boolean))), false) };
}
function foundationSpeechMatch(target, transcript, accept) {
    var e_1, _a;
    var normalizedTranscript = normalizeSpeechText(transcript);
    var candidates = __spreadArray([target], __read((accept || [])), false).filter(Boolean)
        .map(normalizeSpeechText)
        .filter(Boolean);
    if (!normalizedTranscript || !candidates.length) {
        return { matched: false, similarity: 0 };
    }
    var best = { matched: false, similarity: 0 };
    try {
        for (var candidates_1 = __values(candidates), candidates_1_1 = candidates_1.next(); !candidates_1_1.done; candidates_1_1 = candidates_1.next()) {
            var candidate = candidates_1_1.value;
            if (normalizedTranscript === candidate ||
                normalizedTranscript.includes(candidate) ||
                candidate.includes(normalizedTranscript)) {
                return { matched: true, similarity: 1 };
            }
            var dist = levenshtein(candidate, normalizedTranscript);
            var max = Math.max(candidate.length, normalizedTranscript.length);
            var similarity = max ? 1 - dist / max : 1;
            if (similarity > best.similarity) {
                best = { matched: similarity >= 0.78, similarity: similarity };
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (candidates_1_1 && !candidates_1_1.done && (_a = candidates_1.return)) _a.call(candidates_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return best;
}
function renderFoundationVoiceTest(q) {
    var _this = this;
    var _a, _b, _c, _d;
    var area = $("answerArea");
    if (!area)
        return;
    if (speechRecognition) {
        try {
            speechRecognition.abort();
        }
        catch (_) { }
        speechRecognition = null;
    }
    stopMicrophoneStream();
    voiceRecognitionBusy = false;
    (_a = $("visualArea")) === null || _a === void 0 ? void 0 : _a.classList.add("voice-read-hide-default-visual");
    var practice = getFoundationVoicePractice(q);
    var target = practice.target;
    var titles = {
        mouth: "口・発声ウォームアップ",
        sound: "発音の練習",
        stepup: "単語→短文",
        mora: "拍・モーラ",
        accent: "アクセント",
        sentenceRhythm: "文章リズム"
    };
    var guides = {
        mouth: q.answer === "できた"
            ? "口の練習をしたあと、「できた」と声に出してください。"
            : "お手本を聞いて、同じように声に出してみましょう。",
        sound: "答えだと思う言葉を、声に出して言ってみましょう。",
        stepup: "単語から短い文章まで、ゆっくり声に出してみましょう。",
        mora: "答えの拍数を、声に出して答えてみましょう。",
        accent: "言葉のアクセントを意識して、声に出してみましょう。",
        sentenceRhythm: "意味のまとまりを意識して、ゆっくり読んでみましょう。"
    };
    var wrap = document.createElement("div");
    wrap.className = "voice-read-accessible-panel foundation-voice-panel";
    wrap.innerHTML = "\n    <div class=\"voice-read-progress\" aria-label=\"\u57FA\u790E\u30C8\u30EC\u30FC\u30CB\u30F3\u30B0\u306E\u6D41\u308C\">\n      <div class=\"voice-read-step active\"><span>1</span><strong>\u898B\u308B</strong></div>\n      <div class=\"voice-read-arrow\">\u2192</div>\n      <div class=\"voice-read-step\"><span>2</span><strong>\u805E\u304F</strong></div>\n      <div class=\"voice-read-arrow\">\u2192</div>\n      <div class=\"voice-read-step\"><span>3</span><strong>\u8A71\u3059</strong></div>\n      <div class=\"voice-read-arrow\">\u2192</div>\n      <div class=\"voice-read-step\"><span>4</span><strong>\u78BA\u8A8D</strong></div>\n    </div>\n\n    <div class=\"voice-read-action-card foundation-intro-card\">\n      <div class=\"voice-read-action-head\">\n        <span class=\"voice-read-action-number\">1</span>\n        <div>\n          <strong>".concat(escapeHtml(titles[selectedActivity] || "基礎トレーニング"), "</strong>\n          <small>").concat(escapeHtml(guides[selectedActivity] || "お手本を聞いて、声に出してみましょう。"), "</small>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"voice-read-visual-card\">\n      <div class=\"voice-read-word-box foundation-word-box\">\n        <div class=\"voice-read-small-label\">\u58F0\u306B\u51FA\u3059\u7B54\u3048</div>\n        <div id=\"voiceReadTarget\" class=\"voice-read-target\">").concat(escapeHtml(target), "</div>\n        <div class=\"voice-read-easy-message\">\u3086\u3063\u304F\u308A\u3067\u5927\u4E08\u592B\u3067\u3059</div>\n      </div>\n    </div>\n\n    <div class=\"voice-read-action-card\">\n      <div class=\"voice-read-action-head\">\n        <span class=\"voice-read-action-number\">2</span>\n        <div><strong>\u304A\u624B\u672C\u3092\u805E\u304F</strong><small>\u4F55\u5EA6\u805E\u3044\u3066\u3082\u5927\u4E08\u592B\u3067\u3059</small></div>\n      </div>\n      <button type=\"button\" id=\"voiceReadExampleBtn\" class=\"voice-read-example-btn\">\uD83D\uDD0A \u304A\u624B\u672C\u3092\u805E\u304F</button>\n    </div>\n\n    <div class=\"voice-read-action-card mic-card\">\n      <div class=\"voice-read-action-head\">\n        <span class=\"voice-read-action-number\">3</span>\n        <div><strong>\u81EA\u5206\u306E\u58F0\u3067\u7B54\u3048\u308B</strong><small>\u30DE\u30A4\u30AF\u3092\u62BC\u3057\u3066\u8A71\u3057\u3066\u304F\u3060\u3055\u3044</small></div>\n      </div>\n      <div class=\"voice-read-mic-area\">\n        <button type=\"button\" id=\"voiceStartBtn\" class=\"voice-read-mic-button\">\n          <span class=\"voice-read-mic-icon\">\uD83C\uDFA4</span>\n          <span class=\"voice-read-mic-main\">\u30DE\u30A4\u30AF\u3067\u8A71\u3059</span>\n          <span class=\"voice-read-mic-sub\">\u3053\u3053\u3092\u62BC\u3057\u3066\u30B9\u30BF\u30FC\u30C8</span>\n        </button>\n        <button type=\"button\" id=\"voiceMicCheckBtn\" class=\"voice-read-check-button\">\uD83C\uDFA7 \u30DE\u30A4\u30AF\u3092\u78BA\u8A8D</button>\n      </div>\n      <div id=\"voiceTestStatus\" class=\"voice-read-status\" aria-live=\"polite\">\n        \u300C\u30DE\u30A4\u30AF\u3067\u8A71\u3059\u300D\u3092\u62BC\u3057\u3066\u3001\u7B54\u3048\u3092\u58F0\u306B\u51FA\u3057\u3066\u304F\u3060\u3055\u3044\u3002\n      </div>\n      <div id=\"voiceMicDetail\" class=\"voice-read-mic-detail\"></div>\n    </div>\n\n    <div class=\"voice-read-result-card\">\n      <div class=\"voice-read-action-head\">\n        <span class=\"voice-read-action-number\">4</span>\n        <div><strong>\u8A8D\u8B58\u3057\u305F\u8A00\u8449</strong><small>\u30DE\u30A4\u30AF\u304C\u805E\u304D\u53D6\u3063\u305F\u5185\u5BB9\u3067\u3059</small></div>\n      </div>\n      <div id=\"voiceTranscript\" class=\"voice-read-transcript\" aria-live=\"polite\">\u307E\u3060\u3042\u308A\u307E\u305B\u3093</div>\n      <div id=\"voiceReadJudgement\" class=\"voice-read-judgement\">\u3053\u3053\u306B\u5224\u5B9A\u304C\u8868\u793A\u3055\u308C\u307E\u3059</div>\n    </div>\n\n    <div class=\"voice-read-support\">\n      <span>\uD83D\uDCA1</span>\n      <div>\n        <strong>\u3046\u307E\u304F\u8A00\u3048\u306A\u304F\u3066\u3082\u5927\u4E08\u592B</strong><br>\n        \u3086\u3063\u304F\u308A\u3001\u3082\u3046\u4E00\u5EA6\u8A71\u3057\u3066\u307F\u307E\u3057\u3087\u3046\u3002\n      </div>\n    </div>\n  ");
    area.appendChild(wrap);
    (_b = $("voiceReadExampleBtn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
        markVoiceReadStep(2);
        speak(target);
    });
    (_c = $("voiceMicCheckBtn")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
        var ok;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, runMicrophoneCheck()];
                case 1:
                    ok = _a.sent();
                    if (ok)
                        markVoiceReadStep(3);
                    return [2 /*return*/];
            }
        });
    }); });
    (_d = $("voiceStartBtn")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () {
        markVoiceReadStep(3);
        startFoundationVoiceRecognition(q, practice);
    });
    var d = browserVoiceDiagnostics();
    var detail = $("voiceMicDetail");
    if (detail) {
        detail.textContent = [
            "\u97F3\u58F0\u8A8D\u8B58\uFF1A".concat(d.Recognition ? "対応" : "未対応"),
            "\u30DE\u30A4\u30AF\uFF1A".concat(d.mediaOk ? "対応" : "未対応"),
            "\u63A5\u7D9A\uFF1A".concat(d.secure ? "OK" : "HTTPS/localhost推奨")
        ].join("　｜　");
    }
}
function startFoundationVoiceRecognition(q, practice) {
    return __awaiter(this, void 0, void 0, function () {
        var Recognition, startBtn, error_3, code, msg, recognition, transcript, judgement, handledFinal;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Recognition = getSpeechRecognitionClass();
                    if (!Recognition) {
                        showVoiceTestStatus("このブラウザでは音声認識を利用できません。Google Chromeで試してください。", "error");
                        return [2 /*return*/];
                    }
                    if (!window.isSecureContext && !window.AndroidSpeech) {
                        showVoiceTestStatus("HTTPSまたはlocalhostで開いてください。マイクを利用できません。", "error");
                        return [2 /*return*/];
                    }
                    if (voiceRecognitionBusy)
                        return [2 /*return*/];
                    if (speechRecognition) {
                        try {
                            speechRecognition.abort();
                        }
                        catch (_) { }
                        speechRecognition = null;
                    }
                    startBtn = $("voiceStartBtn");
                    if (startBtn) {
                        startBtn.disabled = true;
                        startBtn.innerHTML = "<span class=\"voice-read-mic-icon\">\uD83C\uDFA4</span><span class=\"voice-read-mic-main\">\u805E\u3044\u3066\u3044\u307E\u3059\u2026</span><span class=\"voice-read-mic-sub\">\u58F0\u3092\u51FA\u3057\u3066\u304F\u3060\u3055\u3044</span>";
                    }
                    showVoiceTestStatus(microphonePermissionGranted
                        ? "マイク許可は確認済みです。話してください…"
                        : "最初の1回だけマイクの使用許可を確認しています…", "listening");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, requestMicrophoneAccess()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    code = (error_3 === null || error_3 === void 0 ? void 0 : error_3.name) || "UNKNOWN";
                    msg = "マイクを開始できませんでした。";
                    if (code === "NotAllowedError" || code === "SecurityError")
                        msg = "マイクが拒否されています。ブラウザのマイク設定で許可してください。";
                    else if (code === "NotFoundError")
                        msg = "マイクが見つかりません。接続を確認してください。";
                    else if (code === "NotReadableError")
                        msg = "マイクを他のアプリが使用中の可能性があります。";
                    else if (code === "MEDIA_UNAVAILABLE")
                        msg = "この環境ではマイクAPIを利用できません。";
                    showVoiceTestStatus("\u274C ".concat(msg), "error");
                    if (startBtn) {
                        startBtn.disabled = false;
                        startBtn.innerHTML = "<span class=\"voice-read-mic-icon\">\uD83C\uDFA4</span><span class=\"voice-read-mic-main\">\u3082\u3046\u4E00\u5EA6\u8A71\u3059</span><span class=\"voice-read-mic-sub\">\u3053\u3053\u3092\u62BC\u3057\u3066\u518D\u8A66\u884C</span>";
                    }
                    stopMicrophoneStream();
                    return [2 /*return*/];
                case 4:
                    recognition = new Recognition();
                    speechRecognition = recognition;
                    recognition.lang = "ja-JP";
                    recognition.continuous = false;
                    recognition.interimResults = true;
                    recognition.maxAlternatives = 3;
                    voiceRecognitionBusy = true;
                    answered = false;
                    showVoiceTestStatus("話してください…", "listening");
                    transcript = $("voiceTranscript");
                    judgement = $("voiceReadJudgement");
                    if (transcript) {
                        transcript.textContent = "認識中…";
                        transcript.className = "voice-read-transcript";
                    }
                    if (judgement) {
                        judgement.textContent = "認識した言葉を確認しています…";
                        judgement.className = "voice-read-judgement";
                    }
                    handledFinal = false;
                    recognition.onresult = function (event) {
                        var _a;
                        var finalText = "";
                        var interimText = "";
                        for (var i = event.resultIndex; i < event.results.length; i++) {
                            var txt = ((_a = event.results[i][0]) === null || _a === void 0 ? void 0 : _a.transcript) || "";
                            if (event.results[i].isFinal)
                                finalText += txt;
                            else
                                interimText += txt;
                        }
                        var currentText = (finalText || interimText).trim();
                        if (transcript && currentText)
                            transcript.textContent = currentText;
                        if (finalText && !handledFinal) {
                            handledFinal = true;
                            var judged = foundationSpeechMatch(practice.target, finalText, practice.accept);
                            voiceRecognitionBusy = false;
                            answered = true;
                            if (judged.matched) {
                                score++;
                                showVoiceTestStatus("\u2B55 \u5408\u3063\u3066\u3044\u307E\u3059\uFF01\uFF08".concat(Math.round(judged.similarity * 100), "%\uFF09"), "ok");
                                if (judgement) {
                                    judgement.textContent = "⭕ 合っています！";
                                    judgement.className = "voice-read-judgement ok";
                                }
                                if (transcript)
                                    transcript.className = "voice-transcript ok";
                                $("feedback").textContent = "⭕ 声をしっかり認識できました。";
                                $("feedback").className = "feedback ok";
                                playCorrectSound();
                                announceCorrect();
                            }
                            else {
                                showVoiceTestStatus("\u274C \u3082\u3046\u4E00\u5EA6\u8A71\u3057\u3066\u307F\u307E\u3057\u3087\u3046\uFF08".concat(Math.round(judged.similarity * 100), "%\uFF09"), "ng");
                                if (judgement) {
                                    judgement.textContent = "\u274C \u304A\u624B\u672C\u306F\u300C".concat(practice.target, "\u300D\u3067\u3059\u3002");
                                    judgement.className = "voice-read-judgement ng";
                                }
                                if (transcript)
                                    transcript.className = "voice-transcript ng";
                                $("feedback").textContent = "❌ 認識した答えとお手本が違います。";
                                $("feedback").className = "feedback ng";
                                playWrongSound();
                            }
                            $("score").textContent = "\u6B63\u89E3 ".concat(score);
                            $("nextBtn").classList.remove("hidden");
                            stopMicrophoneStream();
                            if (startBtn) {
                                startBtn.disabled = false;
                                startBtn.innerHTML = "<span class=\"voice-read-mic-icon\">\uD83C\uDFA4</span><span class=\"voice-read-mic-main\">\u3082\u3046\u4E00\u5EA6\u8A71\u3059</span><span class=\"voice-read-mic-sub\">\u518D\u6311\u6226\u3067\u304D\u307E\u3059</span>";
                            }
                            markVoiceReadStep(4);
                        }
                    };
                    recognition.onerror = function (event) {
                        voiceRecognitionBusy = false;
                        var msg = "音声認識でエラーが発生しました。";
                        if (event.error === "not-allowed" || event.error === "service-not-allowed")
                            msg = "音声認識が許可されませんでした。マイクとサイトの権限を確認してください。";
                        else if (event.error === "audio-capture")
                            msg = "マイクから音声を取得できません。マイクの接続・Windowsの入力設定を確認してください。";
                        else if (event.error === "no-speech")
                            msg = "声が認識されませんでした。もう一度ゆっくり話してください。";
                        else if (event.error === "network")
                            msg = "音声認識サービスへの接続に失敗しました。インターネット接続を確認してください。";
                        else if (event.error === "language-not-supported")
                            msg = "日本語の音声認識に対応していない環境です。Chromeで試してください。";
                        showVoiceTestStatus("\u274C ".concat(msg), "error");
                        stopMicrophoneStream();
                        if (startBtn) {
                            startBtn.disabled = false;
                            startBtn.innerHTML = "<span class=\"voice-read-mic-icon\">\uD83C\uDFA4</span><span class=\"voice-read-mic-main\">\u3082\u3046\u4E00\u5EA6\u8A71\u3059</span><span class=\"voice-read-mic-sub\">\u518D\u8A66\u884C\u3057\u3066\u304F\u3060\u3055\u3044</span>";
                        }
                    };
                    recognition.onend = function () {
                        voiceRecognitionBusy = false;
                        stopMicrophoneStream();
                        if (startBtn && !answered) {
                            startBtn.disabled = false;
                            startBtn.innerHTML = "<span class=\"voice-read-mic-icon\">\uD83C\uDFA4</span><span class=\"voice-read-mic-main\">\u3082\u3046\u4E00\u5EA6\u8A71\u3059</span><span class=\"voice-read-mic-sub\">\u518D\u8A66\u884C\u3067\u304D\u307E\u3059</span>";
                        }
                    };
                    try {
                        recognition.start();
                    }
                    catch (_) {
                        voiceRecognitionBusy = false;
                        stopMicrophoneStream();
                        showVoiceTestStatus("❌ 音声認識を開始できませんでした。「マイクを確認」を押してからもう一度試してください。", "error");
                        if (startBtn) {
                            startBtn.disabled = false;
                            startBtn.innerHTML = "<span class=\"voice-read-mic-icon\">\uD83C\uDFA4</span><span class=\"voice-read-mic-main\">\u3082\u3046\u4E00\u5EA6\u8A71\u3059</span><span class=\"voice-read-mic-sub\">\u518D\u8A66\u884C\u3057\u3066\u304F\u3060\u3055\u3044</span>";
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function renderVoiceReadTest(q) {
    var _this = this;
    var _a, _b, _c, _d, _e;
    var area = $("answerArea");
    if (!area)
        return;
    if (speechRecognition) {
        try {
            speechRecognition.abort();
        }
        catch (_) { }
        speechRecognition = null;
    }
    stopMicrophoneStream();
    voiceRecognitionBusy = false;
    // 音読テストでは、通常の上部画像エリアを使わず、問題画像と読む言葉を同じカードにまとめます。
    (_a = $("visualArea")) === null || _a === void 0 ? void 0 : _a.classList.add("voice-read-hide-default-visual");
    var target = q.voiceText || q.prompt || q.answer || "";
    var wrap = document.createElement("div");
    wrap.className = "voice-read-accessible-panel";
    wrap.innerHTML = "\n    <div class=\"voice-read-progress\" aria-label=\"\u97F3\u8AAD\u30C6\u30B9\u30C8\u306E\u6D41\u308C\">\n      <div class=\"voice-read-step active\"><span>1</span><strong>\u898B\u308B</strong></div>\n      <div class=\"voice-read-arrow\">\u2192</div>\n      <div class=\"voice-read-step\"><span>2</span><strong>\u805E\u304F</strong></div>\n      <div class=\"voice-read-arrow\">\u2192</div>\n      <div class=\"voice-read-step\"><span>3</span><strong>\u8A71\u3059</strong></div>\n      <div class=\"voice-read-arrow\">\u2192</div>\n      <div class=\"voice-read-step\"><span>4</span><strong>\u78BA\u8A8D</strong></div>\n    </div>\n\n    <div class=\"voice-read-visual-card\">\n      <div class=\"voice-read-image-box\">\n        <img id=\"voiceReadImage\" class=\"voice-read-image\" src=\"".concat(escapeHtml(q.image || ""), "\" alt=\"").concat(escapeHtml(target), "\u306E\u753B\u50CF\">\n        <div id=\"voiceReadEmoji\" class=\"voice-read-image-emoji\">").concat(escapeHtml(q.emoji || "👀"), "</div>\n      </div>\n      <div class=\"voice-read-word-box\">\n        <div class=\"voice-read-small-label\">\u3053\u306E\u8A00\u8449\u3092\u8AAD\u3093\u3067\u304F\u3060\u3055\u3044</div>\n        <div id=\"voiceReadTarget\" class=\"voice-read-target\">").concat(escapeHtml(target), "</div>\n        <div class=\"voice-read-easy-message\">\u3086\u3063\u304F\u308A\u3067\u5927\u4E08\u592B\u3067\u3059</div>\n      </div>\n    </div>\n\n    <div class=\"voice-read-action-card\">\n      <div class=\"voice-read-action-head\">\n        <span class=\"voice-read-action-number\">2</span>\n        <div><strong>\u304A\u624B\u672C\u3092\u805E\u304F</strong><small>\u307E\u305A\u805E\u3044\u3066\u3082OK\u3067\u3059</small></div>\n      </div>\n      <button type=\"button\" id=\"voiceReadExampleBtn\" class=\"voice-read-example-btn\">\n        \uD83D\uDD0A \u304A\u624B\u672C\u3092\u805E\u304F\n      </button>\n    </div>\n\n    <div class=\"voice-read-action-card mic-card\">\n      <div class=\"voice-read-action-head\">\n        <span class=\"voice-read-action-number\">3</span>\n        <div><strong>\u81EA\u5206\u306E\u58F0\u3067\u8AAD\u3093\u3067\u307F\u308B</strong><small>\u30DE\u30A4\u30AF\u3092\u62BC\u3057\u3066\u8A71\u3057\u3066\u304F\u3060\u3055\u3044</small></div>\n      </div>\n      <div class=\"voice-read-mic-area\">\n        <button type=\"button\" id=\"voiceStartBtn\" class=\"voice-read-mic-button\">\n          <span class=\"voice-read-mic-icon\">\uD83C\uDFA4</span>\n          <span class=\"voice-read-mic-main\">\u30DE\u30A4\u30AF\u3067\u8A71\u3059</span>\n          <span class=\"voice-read-mic-sub\">\u3053\u3053\u3092\u62BC\u3057\u3066\u30B9\u30BF\u30FC\u30C8</span>\n        </button>\n        <button type=\"button\" id=\"voiceMicCheckBtn\" class=\"voice-read-check-button\">\uD83C\uDFA7 \u30DE\u30A4\u30AF\u3092\u78BA\u8A8D</button>\n      </div>\n      <div id=\"voiceTestStatus\" class=\"voice-read-status\" aria-live=\"polite\">\n        \u300C\u30DE\u30A4\u30AF\u3092\u78BA\u8A8D\u300D\u3092\u62BC\u3057\u3066\u6E96\u5099\u3059\u308B\u304B\u3001\u305D\u306E\u307E\u307E\u300C\u30DE\u30A4\u30AF\u3067\u8A71\u3059\u300D\u3092\u62BC\u3057\u3066\u304F\u3060\u3055\u3044\u3002\n      </div>\n      <div id=\"voiceMicDetail\" class=\"voice-read-mic-detail\"></div>\n    </div>\n\n    <div class=\"voice-read-result-card\">\n      <div class=\"voice-read-action-head\">\n        <span class=\"voice-read-action-number\">4</span>\n        <div><strong>\u8A8D\u8B58\u3057\u305F\u8A00\u8449</strong><small>\u30DE\u30A4\u30AF\u304C\u805E\u304D\u53D6\u3063\u305F\u5185\u5BB9\u3067\u3059</small></div>\n      </div>\n      <div id=\"voiceTranscript\" class=\"voice-read-transcript\" aria-live=\"polite\">\u307E\u3060\u3042\u308A\u307E\u305B\u3093</div>\n      <div id=\"voiceReadJudgement\" class=\"voice-read-judgement\">\u3053\u3053\u306B\u300C\u5408\u3063\u3066\u3044\u307E\u3059\u300D\u300C\u3082\u3046\u4E00\u5EA6\u300D\u304C\u8868\u793A\u3055\u308C\u307E\u3059</div>\n    </div>\n\n    <div class=\"voice-read-support\">\n      <span>\uD83D\uDCA1</span>\n      <div><strong>\u3046\u307E\u304F\u8A00\u3048\u306A\u304F\u3066\u3082\u5927\u4E08\u592B</strong><br>\u3086\u3063\u304F\u308A\u3001\u3082\u3046\u4E00\u5EA6\u8AAD\u3093\u3067\u307F\u307E\u3057\u3087\u3046\u3002</div>\n    </div>\n  ");
    area.appendChild(wrap);
    var image = $("voiceReadImage");
    var emoji = $("voiceReadEmoji");
    if (image) {
        image.addEventListener("load", function () {
            image.classList.remove("hidden");
            emoji === null || emoji === void 0 ? void 0 : emoji.classList.add("hidden");
        });
        image.addEventListener("error", function () {
            image.classList.add("hidden");
            emoji === null || emoji === void 0 ? void 0 : emoji.classList.remove("hidden");
        });
        if (!q.image) {
            image.classList.add("hidden");
            emoji === null || emoji === void 0 ? void 0 : emoji.classList.remove("hidden");
        }
    }
    (_b = $("voiceReadExampleBtn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
        markVoiceReadStep(2);
        speak(target);
    });
    (_c = $("voiceMicCheckBtn")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
        var ok;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, runMicrophoneCheck()];
                case 1:
                    ok = _a.sent();
                    if (ok)
                        markVoiceReadStep(3);
                    return [2 /*return*/];
            }
        });
    }); });
    (_d = $("voiceStartBtn")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () {
        markVoiceReadStep(3);
        startVoiceRecognition(q);
    });
    var d = browserVoiceDiagnostics();
    var detail = $("voiceMicDetail");
    if (detail) {
        detail.textContent = [
            "\u97F3\u58F0\u8A8D\u8B58\uFF1A".concat(d.Recognition ? "対応" : "未対応"),
            "\u30DE\u30A4\u30AF\uFF1A".concat(d.mediaOk ? "対応" : "未対応"),
            "\u63A5\u7D9A\uFF1A".concat(d.secure ? "OK" : "HTTPS/localhost推奨")
        ].join("　｜　");
    }
    (_e = $("voiceReadImage")) === null || _e === void 0 ? void 0 : _e.setAttribute("draggable", "false");
}
function markVoiceReadStep(stepNumber) {
    document.querySelectorAll(".voice-read-step").forEach(function (el, index) {
        el.classList.toggle("active", index + 1 <= stepNumber);
    });
}
function escapeHtml(text) {
    return String(text).replace(/[&<>'"]/g, function (ch) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", "\"": "&quot;" }[ch]); });
}
function startVoiceRecognition(q) {
    return __awaiter(this, void 0, void 0, function () {
        var Recognition, startBtn, error_4, code, msg, recognition, transcript;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Recognition = getSpeechRecognitionClass();
                    if (!Recognition) {
                        showVoiceTestStatus("このブラウザでは音声認識を利用できません。Google Chromeで試してください。", "error");
                        return [2 /*return*/];
                    }
                    if (!window.isSecureContext && !window.AndroidSpeech) {
                        showVoiceTestStatus("HTTPSまたはlocalhostで開いてください。マイクを利用できません。", "error");
                        return [2 /*return*/];
                    }
                    if (voiceRecognitionBusy)
                        return [2 /*return*/];
                    if (speechRecognition) {
                        try {
                            speechRecognition.abort();
                        }
                        catch (_) { }
                        speechRecognition = null;
                    }
                    startBtn = $("voiceStartBtn");
                    if (startBtn) {
                        startBtn.disabled = true;
                        startBtn.textContent = "🎤 マイクを確認中…";
                    }
                    showVoiceTestStatus(microphonePermissionGranted ? "マイク許可は確認済みです。音声認識を開始します…" : "最初の1回だけマイクの使用許可を確認しています…", "listening");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, requestMicrophoneAccess()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    code = (error_4 === null || error_4 === void 0 ? void 0 : error_4.name) || "UNKNOWN";
                    msg = "マイクを開始できませんでした。";
                    if (code === "NotAllowedError" || code === "SecurityError")
                        msg = "マイクが拒否されています。ブラウザのマイク設定で許可してください。";
                    else if (code === "NotFoundError")
                        msg = "マイクが見つかりません。接続を確認してください。";
                    else if (code === "NotReadableError")
                        msg = "マイクを他のアプリが使用中の可能性があります。";
                    else if (code === "MEDIA_UNAVAILABLE")
                        msg = "この環境ではマイクAPIを利用できません。";
                    showVoiceTestStatus("\u274C ".concat(msg), "error");
                    if (startBtn) {
                        startBtn.disabled = false;
                        startBtn.textContent = "🎤 もう一度話す";
                    }
                    stopMicrophoneStream();
                    return [2 /*return*/];
                case 4:
                    recognition = new Recognition();
                    speechRecognition = recognition;
                    recognition.lang = "ja-JP";
                    recognition.continuous = false;
                    recognition.interimResults = true;
                    recognition.maxAlternatives = 3;
                    // processLocally は強制しません。環境によって日本語のローカル音声モデルが無いと開始できないためです。
                    voiceRecognitionBusy = true;
                    if (startBtn) {
                        startBtn.textContent = "🎤 聞いています…";
                    }
                    showVoiceTestStatus("話してください…", "listening");
                    transcript = $("voiceTranscript");
                    if (transcript)
                        transcript.textContent = "認識中…";
                    recognition.onresult = function (event) {
                        var _a;
                        var finalText = "", interimText = "";
                        for (var i = event.resultIndex; i < event.results.length; i++) {
                            var txt = ((_a = event.results[i][0]) === null || _a === void 0 ? void 0 : _a.transcript) || "";
                            if (event.results[i].isFinal)
                                finalText += txt;
                            else
                                interimText += txt;
                        }
                        var currentText = (finalText || interimText).trim();
                        if (transcript && currentText)
                            transcript.textContent = currentText;
                        if (finalText) {
                            var target = q.voiceText || q.prompt || q.answer;
                            var judged = speechMatch(target, finalText);
                            voiceRecognitionBusy = false;
                            answered = true;
                            if (judged.matched) {
                                score++;
                                showVoiceTestStatus("\u2B55 \u5408\u3063\u3066\u3044\u307E\u3059\uFF01\uFF08".concat(Math.round(judged.similarity * 100), "%\uFF09"), "ok");
                                $("voiceReadJudgement") && ($("voiceReadJudgement").textContent = "⭕ 合っています！", $("voiceReadJudgement").className = "voice-read-judgement ok");
                                markVoiceReadStep(4);
                                if (transcript)
                                    transcript.className = "voice-transcript ok";
                                $("feedback").textContent = "⭕ 認識した言葉が合っています。";
                                $("feedback").className = "feedback ok";
                                playCorrectSound();
                                announceCorrect();
                            }
                            else {
                                showVoiceTestStatus("\u274C \u3082\u3046\u4E00\u5EA6\u8AAD\u3093\u3067\u307F\u307E\u3057\u3087\u3046\uFF08".concat(Math.round(judged.similarity * 100), "%\uFF09"), "ng");
                                $("voiceReadJudgement") && ($("voiceReadJudgement").textContent = "❌ もう一度読んでみましょう", $("voiceReadJudgement").className = "voice-read-judgement ng");
                                markVoiceReadStep(3);
                                if (transcript)
                                    transcript.className = "voice-transcript ng";
                                $("feedback").textContent = "\u274C \u304A\u624B\u672C\u306F\u300C".concat(target, "\u300D\u3067\u3059\u3002");
                                $("feedback").className = "feedback ng";
                                playWrongSound();
                            }
                            $("score").textContent = "\u6B63\u89E3 ".concat(score);
                            $("nextBtn").classList.remove("hidden");
                            stopMicrophoneStream();
                            if (startBtn) {
                                startBtn.disabled = false;
                                startBtn.textContent = "🎤 もう一度話す";
                            }
                        }
                    };
                    recognition.onerror = function (event) {
                        voiceRecognitionBusy = false;
                        var msg = "音声認識でエラーが発生しました。";
                        if (event.error === "not-allowed" || event.error === "service-not-allowed")
                            msg = "音声認識が許可されませんでした。マイクとサイトの権限を確認してください。";
                        else if (event.error === "audio-capture")
                            msg = "マイクから音声を取得できません。マイクの接続・Windowsの入力設定を確認してください。";
                        else if (event.error === "no-speech")
                            msg = "声が認識されませんでした。もう一度ゆっくり話してください。";
                        else if (event.error === "network")
                            msg = "音声認識サービスへの接続に失敗しました。インターネット接続を確認してください。";
                        else if (event.error === "language-not-supported")
                            msg = "日本語の音声認識に対応していない環境です。Chromeで試してください。";
                        showVoiceTestStatus("\u274C ".concat(msg), "error");
                        stopMicrophoneStream();
                        if (startBtn) {
                            startBtn.disabled = false;
                            startBtn.textContent = "🎤 もう一度話す";
                        }
                    };
                    recognition.onend = function () {
                        voiceRecognitionBusy = false;
                        stopMicrophoneStream();
                        if (startBtn && !answered) {
                            startBtn.disabled = false;
                            startBtn.textContent = "🎤 もう一度話す";
                        }
                    };
                    try {
                        recognition.start();
                    }
                    catch (_) {
                        voiceRecognitionBusy = false;
                        stopMicrophoneStream();
                        showVoiceTestStatus("❌ 音声認識を開始できませんでした。『マイクを確認』を押してからもう一度試してください。", "error");
                        if (startBtn) {
                            startBtn.disabled = false;
                            startBtn.textContent = "🎤 もう一度話す";
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// ============================================================
// ことばクエスト：画面を作る
// ============================================================
// 1問につき1体の敵を表示します。
// 選択肢を押すと answer() → answerKotobaQuest() の順で判定されます。
function renderKotobaQuest(q) {
    var _a;
    var area = $("answerArea");
    if (!area)
        return;
    (_a = $("visualArea")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
    var hearts = "❤️".repeat(Math.max(0, kotobaQuestState.lives)) +
        "🖤".repeat(Math.max(0, 3 - kotobaQuestState.lives));
    var wrap = document.createElement("div");
    wrap.className = "kotoba-quest-panel";
    wrap.innerHTML = "\n    <div class=\"quest-hud\">\n      <div class=\"quest-hud-title\">\u2694\uFE0F \u3053\u3068\u3070\u30AF\u30A8\u30B9\u30C8\uFF08\u30AF\u30E9\u30B7\u30C3\u30AF\uFF09</div>\n      <div class=\"quest-hud-stats\">\n        <span id=\"questEnemyCount\">\u6575 ".concat(kotobaQuestState.defeated + 1, " / ").concat(kotobaQuestState.total, "</span>\n        <span id=\"questDefeated\">\u6483\u7834 ").concat(kotobaQuestState.defeated, "</span>\n        <span id=\"questLives\">\u6B8B\u308A ").concat(hearts, "</span>\n      </div>\n    </div>\n\n    <div class=\"quest-battle\">\n      <div class=\"quest-enemy-card\" id=\"questEnemyCard\">\n        <div class=\"quest-enemy-label\">\u4ECA\u56DE\u306E\u6575</div>\n        <div class=\"quest-enemy-emoji\">").concat(escapeHtml(q.enemy || "👹"), "</div>\n        <div class=\"quest-enemy-name\">").concat(escapeHtml(q.enemyName || "ことばモンスター"), "</div>\n        <div class=\"quest-enemy-hp\">HP \u2588</div>\n      </div>\n\n      <div class=\"quest-vs\">VS</div>\n\n      <div class=\"quest-player-card\">\n        <div class=\"quest-player-icon\">\uD83E\uDDD1\u200D\uD83D\uDE80</div>\n        <div class=\"quest-player-name\">\u3053\u3068\u3070\u52C7\u8005</div>\n        <div class=\"quest-rule\">\u6B63\u89E3\u3059\u308B\u3068\u653B\u6483\uFF01</div>\n      </div>\n    </div>\n\n    <div class=\"quest-question-card\">\n      ").concat(q.image ? "\n        <div class=\"quest-question-image-box\">\n          <img class=\"quest-question-image\" src=\"".concat(escapeHtml(q.image), "\" alt=\"").concat(escapeHtml(q.answer || "問題"), "\">\n        </div>\n      ") : "", "\n      <div class=\"quest-question-text\">").concat(escapeHtml(q.question || "問題"), "</div>\n      <div class=\"quest-question-help\">\u6B63\u3057\u3044\u7B54\u3048\u3092\u9078\u3093\u3067\u3001\u6575\u3092\u653B\u6483\u3057\u307E\u3057\u3087\u3046\u3002</div>\n    </div>\n\n    <div id=\"questFeedback\" class=\"quest-feedback\" aria-live=\"polite\"></div>\n    <div id=\"questChoices\" class=\"quest-choices\"></div>\n  ");
    area.appendChild(wrap);
    var image = wrap.querySelector(".quest-question-image");
    image === null || image === void 0 ? void 0 : image.addEventListener("error", function () { var _a; return (_a = image.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add("hidden"); });
    shuffle(q.choices || []).forEach(function (choice) {
        var button = document.createElement("button");
        button.type = "button";
        button.className = "quest-choice";
        button.textContent = choice;
        button.addEventListener("click", function () { return answer(button, choice); });
        $("questChoices").appendChild(button);
    });
    // 問題文を最初に読み上げます。音声設定がOFFなら読み上げません。
    if (voiceEnabled && q.question) {
        setTimeout(function () { return speak(q.question); }, 250);
    }
}
// ハート、撃破数、現在の敵番号を更新します。
function updateKotobaQuestHud() {
    var hearts = "❤️".repeat(Math.max(0, kotobaQuestState.lives)) +
        "🖤".repeat(Math.max(0, 3 - kotobaQuestState.lives));
    if ($("questEnemyCount"))
        $("questEnemyCount").textContent =
            "\u6575 ".concat(Math.min(kotobaQuestState.defeated + 1, kotobaQuestState.total), " / ").concat(kotobaQuestState.total);
    if ($("questDefeated"))
        $("questDefeated").textContent =
            "\u6483\u7834 ".concat(kotobaQuestState.defeated);
    if ($("questLives"))
        $("questLives").textContent =
            "\u6B8B\u308A ".concat(hearts);
}
// 正解なら敵を倒し、間違いならハートを1個減らします。
function answerKotobaQuest(button, choice) {
    if (answered || kotobaQuestState.gameOver)
        return;
    answered = true;
    var q = questions[current];
    var buttons = document.querySelectorAll(".quest-choice");
    buttons.forEach(function (b) { return b.disabled = true; });
    var correct = String(choice).trim() === String(q.answer).trim();
    var enemyCard = $("questEnemyCard");
    var feedback = $("questFeedback");
    if (correct) {
        score++;
        kotobaQuestState.defeated++;
        button.classList.add("correct");
        enemyCard === null || enemyCard === void 0 ? void 0 : enemyCard.classList.add("defeated");
        if (feedback) {
            feedback.className = "quest-feedback success";
            feedback.innerHTML = "\u2694\uFE0F <strong>\u6B63\u89E3\uFF01</strong> ".concat(escapeHtml(q.enemyName || "敵"), "\u3092\u5012\u3057\u305F\uFF01");
        }
        $("score").textContent = "\u6B63\u89E3 ".concat(score);
        updateKotobaQuestHud();
        playCorrectSound();
        announceCorrect();
        // 少しだけ撃破演出を見せてから「次の問題」を出します。
        setTimeout(function () { var _a; return (_a = $("nextBtn")) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden"); }, 350);
        return;
    }
    kotobaQuestState.mistakes++;
    kotobaQuestState.lives--;
    button.classList.add("wrong");
    buttons.forEach(function (b) {
        if (b.textContent === q.answer)
            b.classList.add("correct");
    });
    updateKotobaQuestHud();
    playWrongSound();
    // 3回間違えたら、その場でゲームオーバーです。
    if (kotobaQuestState.mistakes >= 3) {
        kotobaQuestState.gameOver = true;
        if (feedback) {
            feedback.className = "quest-feedback gameover";
            feedback.innerHTML = "\uD83D\uDC80 <strong>\u30B2\u30FC\u30E0\u30AA\u30FC\u30D0\u30FC</strong><br>3\u56DE\u9593\u9055\u3048\u307E\u3057\u305F\u3002\u6B63\u89E3\u306F\u300C".concat(escapeHtml(q.answer), "\u300D\u3067\u3059\u3002");
        }
        speak("ゲームオーバーです。");
        setTimeout(function () { return finishGame(true); }, 650);
        return;
    }
    if (feedback) {
        feedback.className = "quest-feedback damage";
        feedback.innerHTML = "\uD83D\uDCA5 <strong>\u30DF\u30B9\uFF01</strong> \u30CF\u30FC\u30C8\u304C1\u3064\u6E1B\u308A\u307E\u3057\u305F\u3002<br>\u6B63\u89E3\u306F\u300C".concat(escapeHtml(q.answer), "\u300D\u3067\u3059\u3002");
    }
    speak("\u6B8B\u308A\u306F".concat(kotobaQuestState.lives, "\u56DE\u3067\u3059\u3002"));
    $("nextBtn").classList.remove("hidden");
}
function updateMoraClapUI() {
    var countEl=$("moraClapCount");
    if(countEl) countEl.textContent=String(moraPracticeState.clapCount);
    document.querySelectorAll(".mora-beat-dot").forEach(function(dot,index){ dot.classList.toggle("hit",index<moraPracticeState.clapCount); });
}
function startMoraClap() {
    var q=questions[current];
    if(!q||!window.AndroidSpeech||typeof window.AndroidSpeech.startClapDetection!=="function"){var e=$("moraClapStatus");if(e){e.className="mora-status error";e.textContent="❌ このAndroid版では手拍子検出を利用できません。";}return;}
    if(moraPracticeState.recognition){try{moraPracticeState.recognition.abort();}catch(_){} moraPracticeState.recognition=null;}
    moraPracticeState.clapCount=0;moraPracticeState.expected=Number(q.moraCount||0);moraPracticeState.clapConfirmed=false;moraPracticeState.clapActive=true;
    updateMoraClapUI();$("moraClapStartBtn").disabled=true;$("moraClapStopBtn").disabled=false;$("moraClapCheckBtn").disabled=true;
    var status=$("moraClapStatus");if(status){status.className="mora-status listening";status.textContent="準備中…";}
    speak("手拍子を始めます。"+q.moraCount+"回、1拍ずつ手を叩いてください。");
    window.AndroidSpeech.startClapDetection();
}
function stopMoraClap(){if(window.AndroidSpeech&&typeof window.AndroidSpeech.stopClapDetection==="function")window.AndroidSpeech.stopClapDetection();}
function finishMoraClapRound(){
    var expected=moraPracticeState.expected,actual=moraPracticeState.clapCount,status=$("moraClapStatus"),start=$("moraClapStartBtn"),stop=$("moraClapStopBtn"),check=$("moraClapCheckBtn");
    if(start)start.disabled=false;if(stop)stop.disabled=true;
    if(actual===expected&&expected>0){moraPracticeState.clapConfirmed=true;if(status){status.className="mora-status ok";status.textContent="⭕ 手拍子はぴったりです！ "+actual+"回";}if(check)check.disabled=false;speak("手拍子は正解です。次に、拍数を選んでください。");}
    else{moraPracticeState.clapConfirmed=false;if(status){status.className="mora-status ng";status.textContent="❌ "+actual+"回でした。もう一度、1拍ずつ叩いてみましょう。";}if(check)check.disabled=true;speak("もう一度、1拍ずつ叩いてみましょう。");}
}
function confirmMoraClapAndShowChoices(){
    if(!moraPracticeState.clapConfirmed) return;
    var area=$("moraChoiceArea"), status=$("moraChoiceStatus"), check=$("moraClapCheckBtn");
    if(area){
        area.querySelectorAll(".mora-choice-button").forEach(function(button){ button.disabled=false; });
    }
    if(status){
        status.className="mora-status listening";
        status.textContent="手拍子を確認しました。拍数を選んでください。";
    }
    if(check) check.disabled=true;
}
function renderMoraQuestion(q){
    var area=$("answerArea");if(!area)return;
    if(window.AndroidSpeech&&typeof window.AndroidSpeech.stopClapDetection==="function"){try{window.AndroidSpeech.stopClapDetection();}catch(_){} }
    if(moraPracticeState.recognition){try{moraPracticeState.recognition.abort();}catch(_){} }
    moraPracticeState={clapCount:0,expected:Number(q.moraCount||0),clapConfirmed:false,recognition:null,clapActive:false};
    var units=(q.prompt||"").split("・").filter(Boolean),beats=units.map(function(unit){return '<span class="mora-beat-dot"><span>'+escapeHtml(unit)+'</span></span>';}).join('<span class="mora-beat-arrow">→</span>');
    var choices=shuffle(q.choices||["2拍","3拍","4拍","5拍"]);
    var choicesHtml=choices.map(function(choice){return '<button type="button" class="choice mora-choice-button" disabled>'+escapeHtml(choice)+'</button>';}).join("");
    var wrap=document.createElement("div");wrap.className="mora-practice-v2";
    wrap.innerHTML='<div class="mora-step-card"><strong>① 手拍子で数えます</strong><span>言葉に合わせて、1拍ずつ手を叩いてください。</span></div>'
      +'<div class="mora-word-card mora-word-card-v2"><div class="mora-small-label">1拍ずつ</div><div class="mora-word-separated">'+beats+'</div><div class="mora-help">1つの丸＝1拍です</div></div>'
      +'<div class="mora-counter"><div class="mora-counter-number" id="moraClapCount">0</div><div>手拍子</div></div>'
      +'<div class="mora-button-row"><button type="button" id="moraClapStartBtn" class="mora-action primary">👏 手拍子を始める</button><button type="button" id="moraClapStopBtn" class="mora-action secondary" disabled>■ 手拍子を止める</button></div>'
      +'<div id="moraClapStatus" class="mora-status">「手拍子を始める」を押してください。</div>'
      +'<button type="button" id="moraClapCheckBtn" class="mora-action check" disabled>手拍子を確認する</button>'
      +'<div class="mora-step-card mora-step-card-second"><strong>② 拍数を選びます</strong><span>手拍子で数えた拍数を、下の選択肢から選んでください。</span></div>'
      +'<div id="moraChoiceArea" class="mora-choices">'+choicesHtml+'</div>'
      +'<div id="moraChoiceStatus" class="mora-status">まず手拍子をして、確認してください。</div>'
      +'<div class="mora-tip">手拍子はこれまでどおり、言葉に合わせて1回ずつはっきり叩きます。拍数の答えは、声に出さず選択肢をタップして選べます。</div>';
    area.appendChild(wrap);
    $("moraClapStartBtn").addEventListener("click",startMoraClap);
    $("moraClapStopBtn").addEventListener("click",stopMoraClap);
    $("moraClapCheckBtn").addEventListener("click",confirmMoraClapAndShowChoices);
    wrap.querySelectorAll(".mora-choice-button").forEach(function(button){
        button.addEventListener("click",function(){answer(button,button.textContent);});
    });
    updateMoraClapUI();
}
function renderChoices(q) {
    var choices = shuffle(q.choices || []);
    choices.forEach(function (choice) {
        var button = document.createElement("button");
        button.className = "choice";
        button.textContent = choice;
        button.addEventListener("click", function () { return answer(button, choice); });
        $("answerArea").appendChild(button);
    });
}
function renderAnagram(q) {
    var selected = [];
    var work = document.createElement("div");
    work.className = "anagram-work";
    var result = document.createElement("div");
    result.className = "anagram-result";
    result.textContent = "並べた文字：";
    var tokenGrid = document.createElement("div");
    tokenGrid.className = "token-grid";
    var check = document.createElement("button");
    check.className = "primary small-primary";
    check.textContent = "答え合わせ";
    check.disabled = true;
    var reset = document.createElement("button");
    reset.className = "secondary inline-btn";
    reset.textContent = "やり直す";
    q.tokens.forEach(function (token, index) {
        var b = document.createElement("button");
        b.className = "token";
        b.textContent = token;
        b.dataset.index = index;
        b.addEventListener("click", function () {
            if (b.disabled || answered)
                return;
            selected.push({ token: token, button: b });
            b.disabled = true;
            result.textContent = "\u4E26\u3079\u305F\u6587\u5B57\uFF1A".concat(selected.map(function (s) { return s.token; }).join(""));
            check.disabled = selected.length !== q.tokens.length;
        });
        tokenGrid.appendChild(b);
    });
    check.addEventListener("click", function () {
        var built = selected.map(function (s) { return s.token; }).join("");
        var fakeButton = document.createElement("button");
        fakeButton.textContent = built;
        answer(fakeButton, built);
    });
    reset.addEventListener("click", function () {
        selected.length = 0;
        result.textContent = "並べた文字：";
        check.disabled = true;
        tokenGrid.querySelectorAll("button").forEach(function (b) { return b.disabled = false; });
    });
    work.append(result, tokenGrid, check, reset);
    $("answerArea").appendChild(work);
}
// ------------------------------------------------------------
// 9. 回答処理
// ------------------------------------------------------------
function answer(button, choice) {
    if (selectedActivity === "kotobaQuestClassic") {
        answerKotobaQuest(button, choice);
        return;
    }
    if (answered)
        return;
    var q = questions[current];
    document.querySelectorAll(".choice").forEach(function (b) { return b.disabled = true; });
    document.querySelectorAll(".token").forEach(function (b) { return b.disabled = true; });
    var correct = choice === q.answer;
    if (correct) {
        score++;
        button.classList.add("correct");
        $("feedback").textContent = "⭕ できました！";
        $("feedback").classList.add("ok");
        playCorrectSound();
        announceCorrect();
    }
    else {
        button.classList.add("wrong");
        document.querySelectorAll(".choice").forEach(function (b) {
            if (b.textContent === q.answer)
                b.classList.add("correct");
        });
        $("feedback").textContent = "\u274C \u6B63\u89E3\u306F\u300C".concat(q.answer, "\u300D\u3067\u3059\u3002");
        $("feedback").classList.add("ng");
        playWrongSound();
        speak("\u6B63\u89E3\u306F\u3001".concat(q.answer, "\u3067\u3059\u3002"));
    }
    $("score").textContent = "\u6B63\u89E3 ".concat(score);
    $("nextBtn").classList.remove("hidden");
}
// ------------------------------------------------------------
// 10. ヒント・次へ・結果
// ------------------------------------------------------------
function showHint() {
    var q = questions[current];
    if (!q)
        return;
    $("hint").classList.remove("hidden");
    playButtonSound();
    if (voiceEnabled && q.hint)
        speak("\u30D2\u30F3\u30C8\u3002".concat(q.hint));
}
function speakQuestion() {
    var q = questions[current];
    if (!q)
        return;
    var text = q.voiceText || q.prompt || q.question || q.answer;
    speak(text);
}
function nextQuestion() {
    if (speechRecognition) {
        try {
            speechRecognition.abort();
        }
        catch (_) { }
    }
    if (aiInputRecognition) {
        try {
            aiInputRecognition.abort();
        }
        catch (_) { }
        aiInputRecognition = null;
    }
    voiceRecognitionBusy = false;
    playButtonSound();
    current++;
    if (current >= questions.length)
        finishGame();
    else
        renderQuestion();
}
function finishGame(gameOver) {
    if (gameOver === void 0) { gameOver = false; }
    if (!questions.length) return;
    var rate = Math.round(score / questions.length * 100);
    var isClassicQuest = selectedActivity === "kotobaQuestClassic";
    if (isClassicQuest && gameOver) {
        $("resultIcon") && ($("resultIcon").textContent = "💀");
        $("resultTitle").textContent = "ことばクエストZ｜ゲームオーバー";
        $("resultScore").textContent = "".concat(kotobaQuestState.defeated, "体 撃破");
        $("resultRate").textContent = "正解 ".concat(score, "問 ／ 間違い ").concat(kotobaQuestState.mistakes, "回");
        $("resultMessage").textContent = "3回間違えました。もう一度挑戦して、敵を倒していきましょう。";
    }
    else if (isClassicQuest) {
        $("resultIcon") && ($("resultIcon").textContent = "🏆");
        $("resultTitle").textContent = "ことばクエストZ｜クリア";
        $("resultScore").textContent = "".concat(kotobaQuestState.defeated, "体 撃破");
        $("resultRate").textContent = "正解 ".concat(score, "問 ／ 間違い ").concat(kotobaQuestState.mistakes, "回");
        $("resultMessage").textContent = "クエストクリア！敵をすべて倒しました。";
    }
    else {
        $("resultIcon") && ($("resultIcon").textContent = "🎉");
        $("resultTitle").textContent = "".concat(selectedCategory ? selectedCategory.name : (selectedGenre ? selectedGenre.name : "トレーニング"), "｜").concat(getActivityName(selectedActivity));
        $("resultScore").textContent = "".concat(score, " / ").concat(questions.length);
        $("resultRate").textContent = "正答率 ".concat(rate, "%");
        $("resultMessage").textContent =
            rate === 100 ? "すばらしいです！全問できました。" :
                rate >= 80 ? "とてもよくできました！" :
                    rate >= 60 ? "よく取り組みました。もう一度挑戦してみましょう。" :
                        "お疲れさまでした。無理のないペースで取り組みましょう。";
    }
    saveTrainingRecord({
        finishedAt: new Date(),
        startedAt: activityStartedAt ? new Date(activityStartedAt) : new Date(),
        score: score,
        total: questions.length,
        rate: rate,
        category: selectedCategory ? selectedCategory.name : "",
        genre: selectedGenre ? selectedGenre.name : "トレーニング",
        activity: getActivityName(selectedActivity),
        kind: (selectedActivity === "aiConversation" || selectedActivity === "localAIConversation") ? "aiConversation" : "training",
        turns: Number(aiConversationState.turnCount || 0)
    });
    playCorrectSound();
    show("result");
}
// ------------------------------------------------------------
// 11. ボタンイベント
// ------------------------------------------------------------
(_a = $("activitySelect")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", updateActivitySelection);
(_b = $("startSelectedBtn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () { if (selectedActivity)
    startActivity(selectedActivity); });
$("hintBtn").addEventListener("click", showHint);
$("speakBtn").addEventListener("click", speakQuestion);
$("nextBtn").addEventListener("click", nextQuestion);
$("retryBtn").addEventListener("click", function () { return startActivity(selectedActivity); });
$("resultHomeBtn").addEventListener("click", function () { return show("home"); });
(_c = $("resultRecordBtn")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", openRecords);
$("homeBtn").addEventListener("click", function () { return show("home"); });
(_d = $("allGenreBtn")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () {
    var _a;
    $("activityPanel").classList.add("hidden");
    var categoryGrid = $("categoryGrid"); if (categoryGrid) categoryGrid.style.display = "";
    selectedGenre = null;
    selectedCategory = null;
    selectedActivity = null;
    var select = $("activitySelect");
    if (select)
        select.innerHTML = '<option value="">課題を選んでください</option>';
    (_a = $("activityPanel")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
});
document.addEventListener("click", function () {
    var ctx = getAudioContext();
    if (ctx && ctx.state === "suspended")
        ctx.resume();
}, { once: true });
// 最初に4カテゴリを作ります。
renderCategories();
// ============================================================
// 12. 記録・カレンダー・Excel出力
// ============================================================
var RECORDS_KEY = "aphasiaTrainingRecordsV4";
var NOTES_KEY = "aphasiaTrainingNotesV4";
var LEGACY_RECORD_KEYS = ["aphasiaTrainingRecordsV3", "aphasiaTrainingRecordsV2"];
var LEGACY_NOTE_KEYS = ["aphasiaTrainingNotesV3", "aphasiaTrainingNotesV2"];
var selectedRecordDate = formatDateKey(new Date());
var recordMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
function loadRecords() {
    var e_2, _a;
    try {
        var current_1 = localStorage.getItem(RECORDS_KEY);
        if (current_1)
            return JSON.parse(current_1);
        try {
            for (var LEGACY_RECORD_KEYS_1 = __values(LEGACY_RECORD_KEYS), LEGACY_RECORD_KEYS_1_1 = LEGACY_RECORD_KEYS_1.next(); !LEGACY_RECORD_KEYS_1_1.done; LEGACY_RECORD_KEYS_1_1 = LEGACY_RECORD_KEYS_1.next()) {
                var key = LEGACY_RECORD_KEYS_1_1.value;
                var legacy = localStorage.getItem(key);
                if (legacy) {
                    var parsed = JSON.parse(legacy);
                    if (Array.isArray(parsed) && parsed.length) {
                        localStorage.setItem(RECORDS_KEY, JSON.stringify(parsed));
                        return parsed;
                    }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (LEGACY_RECORD_KEYS_1_1 && !LEGACY_RECORD_KEYS_1_1.done && (_a = LEGACY_RECORD_KEYS_1.return)) _a.call(LEGACY_RECORD_KEYS_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    catch (_) { }
    return [];
}
function saveRecords(records) {
    localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
}
function loadNotes() {
    var e_3, _a;
    try {
        var current_2 = localStorage.getItem(NOTES_KEY);
        if (current_2)
            return JSON.parse(current_2);
        try {
            for (var LEGACY_NOTE_KEYS_1 = __values(LEGACY_NOTE_KEYS), LEGACY_NOTE_KEYS_1_1 = LEGACY_NOTE_KEYS_1.next(); !LEGACY_NOTE_KEYS_1_1.done; LEGACY_NOTE_KEYS_1_1 = LEGACY_NOTE_KEYS_1.next()) {
                var key = LEGACY_NOTE_KEYS_1_1.value;
                var legacy = localStorage.getItem(key);
                if (legacy) {
                    var parsed = JSON.parse(legacy);
                    if (parsed && typeof parsed === "object") {
                        localStorage.setItem(NOTES_KEY, JSON.stringify(parsed));
                        return parsed;
                    }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (LEGACY_NOTE_KEYS_1_1 && !LEGACY_NOTE_KEYS_1_1.done && (_a = LEGACY_NOTE_KEYS_1.return)) _a.call(LEGACY_NOTE_KEYS_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
    }
    catch (_) { }
    return {};
}
function saveTrainingRecord(data) {
    var finishedAt = data.finishedAt instanceof Date ? data.finishedAt : new Date(data.finishedAt);
    var startedAt = data.startedAt instanceof Date ? data.startedAt : new Date(data.startedAt);
    var record = {
        id: "".concat(finishedAt.getTime(), "-").concat(Math.random().toString(36).slice(2, 8)),
        date: formatDateKey(finishedAt),
        time: finishedAt.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" }),
        startedAt: startedAt.toISOString(),
        finishedAt: finishedAt.toISOString(),
        durationSec: Math.max(0, Math.round((finishedAt - startedAt) / 1000)),
        category: data.category || "",
        genre: data.genre || "",
        activity: data.activity || "",
        score: Number(data.score || 0),
        total: Number(data.total || 0),
        rate: Number(data.rate || 0),
        kind: data.kind || "training",
        turns: Number(data.turns || 0)
    };
    var records = loadRecords();
    records.push(record);
    records.sort(function (a, b) { return new Date(a.finishedAt) - new Date(b.finishedAt); });
    saveRecords(records);
    selectedRecordDate = record.date;
}
function formatDateKey(d) {
    var x = d instanceof Date ? d : new Date(d);
    var y = x.getFullYear();
    var m = String(x.getMonth() + 1).padStart(2, "0");
    var day = String(x.getDate()).padStart(2, "0");
    return "".concat(y, "-").concat(m, "-").concat(day);
}
function parseDateKey(key) {
    var _a = __read(key.split("-").map(Number), 3), y = _a[0], m = _a[1], d = _a[2];
    return new Date(y, m - 1, d);
}
function japaneseDate(key) {
    var d = parseDateKey(key);
    return "".concat(d.getFullYear(), "\u5E74").concat(d.getMonth() + 1, "\u6708").concat(d.getDate(), "\u65E5");
}
function monthKey(d) {
    var x = d instanceof Date ? d : new Date(d);
    return "".concat(x.getFullYear(), "-").concat(String(x.getMonth() + 1).padStart(2, "0"));
}
function getDayRecords(key) { return loadRecords().filter(function (r) { return r.date === key; }); }
function getMonthRecords(d) {
    var mk = monthKey(d);
    return loadRecords().filter(function (r) { return r.date.startsWith(mk); });
}
function getDayNote(key) { return loadNotes()[key] || ""; }
function setDayNote(key, note) {
    var notes = loadNotes();
    if (note.trim())
        notes[key] = note;
    else
        delete notes[key];
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}
function durationText(sec) {
    var s = Number(sec || 0);
    var min = Math.floor(s / 60), rem = s % 60;
    return min ? "".concat(min, "\u5206").concat(rem ? " ".concat(rem, "\u79D2") : "") : "".concat(rem, "\u79D2");
}
function calcDaySummary(records) {
    var total = records.filter(function (r) { return r.kind !== "aiConversation"; }).reduce(function (n, r) { return n + r.total; }, 0);
    var score = records.filter(function (r) { return r.kind !== "aiConversation"; }).reduce(function (n, r) { return n + r.score; }, 0);
    var turns = records.reduce(function (n, r) { return n + Number(r.turns || 0); }, 0);
    var sec = records.reduce(function (n, r) { return n + r.durationSec; }, 0);
    return {
        sessions: records.length,
        total: total,
        score: score,
        rate: total ? Math.round(score / total * 100) : 0,
        minutes: Math.round(sec / 60 * 10) / 10,
        turns: turns
    };
}
function openRecords() {
    selectedRecordDate = selectedRecordDate || formatDateKey(new Date());
    recordMonth = parseDateKey("".concat(selectedRecordDate.slice(0, 7), "-01"));
    show("records");
    renderRecords();
}
function renderRecords() {
    renderCalendar();
    renderMonthSummary();
    renderSelectedDay();
}
function renderMonthSummary() {
    var wrap = $("monthStats");
    if (!wrap)
        return;
    var rs = getMonthRecords(recordMonth);
    var days = new Set(rs.map(function (r) { return r.date; })).size;
    var summary = calcDaySummary(rs);
    wrap.innerHTML = [
        [days, "実施日数"], [summary.sessions, "実施回数"],
        [summary.total, "問題数"], [summary.score, "正解数"],
        ["".concat(summary.rate, "%"), "月平均正答率"], [summary.turns, "AI会話ターン"]
    ].map(function (_a) {
        var _b = __read(_a, 2), value = _b[0], label = _b[1];
        return "<div class=\"record-stat\"><strong>".concat(value, "</strong><span></span><small>").concat(label, "</small></div>");
    }).join("");
}
function updateSelectedDateForMonth() {
    var y = recordMonth.getFullYear(), m = recordMonth.getMonth();
    var currentDay = parseDateKey(selectedRecordDate).getDate();
    var maxDay = new Date(y, m + 1, 0).getDate();
    var day = Math.min(currentDay, maxDay);
    selectedRecordDate = "".concat(y, "-").concat(String(m + 1).padStart(2, "0"), "-").concat(String(day).padStart(2, "0"));
}
function renderCalendar() {
    var wrap = $("calendar");
    if (!wrap)
        return;
    var y = recordMonth.getFullYear();
    var m = recordMonth.getMonth();
    $("recordMonthLabel").textContent = "".concat(y, "\u5E74").concat(m + 1, "\u6708");
    wrap.innerHTML = "";
    ["日", "月", "火", "水", "木", "金", "土"].forEach(function (w) {
        var el = document.createElement("div");
        el.className = "calendar-weekday";
        el.textContent = w;
        wrap.appendChild(el);
    });
    var first = new Date(y, m, 1).getDay();
    var days = new Date(y, m + 1, 0).getDate();
    var records = loadRecords();
    for (var i = 0; i < first; i++) {
        var blank = document.createElement("div");
        blank.className = "calendar-day blank";
        wrap.appendChild(blank);
    }
    var _loop_1 = function (day) {
        var key = "".concat(y, "-").concat(String(m + 1).padStart(2, "0"), "-").concat(String(day).padStart(2, "0"));
        var rs = records.filter(function (r) { return r.date === key; });
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "calendar-day" + (key === selectedRecordDate ? " selected" : "") + (rs.length ? " has-record" : "");
        var count = rs.length ? "<span class=\"day-count\">".concat(rs.length, "</span>") : "";
        btn.innerHTML = "<span class=\"day-number\">".concat(day, "</span>").concat(rs.length ? '<span class="day-check">✅</span>' : '').concat(count);
        btn.addEventListener("click", function () { selectedRecordDate = key; renderCalendar(); renderSelectedDay(); });
        wrap.appendChild(btn);
    };
    for (var day = 1; day <= days; day++) {
        _loop_1(day);
    }
}
function renderSelectedDay() {
    var key = selectedRecordDate || formatDateKey(new Date());
    var rs = getDayRecords(key);
    var summary = calcDaySummary(rs);
    $("selectedDateLabel").textContent = "".concat(japaneseDate(key), " \u306E\u8A18\u9332");
    $("dayStats").innerHTML = "\n    <div class=\"record-stat\"><strong>".concat(summary.sessions, "</strong><span>\u56DE</span><small>\u5B9F\u65BD\u56DE\u6570</small></div>\n    <div class=\"record-stat\"><strong>").concat(summary.total, "</strong><span>\u554F</span><small>\u554F\u984C\u6570</small></div>\n    <div class=\"record-stat\"><strong>").concat(summary.score, "</strong><span>\u554F</span><small>\u6B63\u89E3\u6570</small></div>\n    <div class=\"record-stat\"><strong>").concat(summary.rate, "%</strong><span></span><small>\u5E73\u5747\u6B63\u7B54\u7387</small></div>\n    <div class=\"record-stat\"><strong>").concat(summary.minutes, "</strong><span>\u5206</span><small>\u5B9F\u65BD\u6642\u9593</small></div>");
    var list = $("dayRecordList");
    list.innerHTML = "";
    if (!rs.length) {
        list.innerHTML = '<div class="no-record">この日のトレーニング記録はありません。</div>';
    }
    else {
        rs.slice().reverse().forEach(function (r, i) {
            var row = document.createElement("div");
            row.className = "day-record-item";
            row.innerHTML = "<div class=\"record-item-main\"><strong>".concat(r.genre, "</strong><span>").concat(r.activity, "</span></div><div class=\"record-item-meta\"><span>").concat(r.time, "</span><span>").concat(r.score, " / ").concat(r.total, "\u554F</span><span>").concat(r.rate, "%</span><span>").concat(durationText(r.durationSec), "</span></div>");
            list.appendChild(row);
        });
    }
    var note = $("dayNote");
    if (note) {
        note.value = getDayNote(key);
        note.setAttribute("data-date", key);
    }
    var dayBtn = $("exportDayBtn");
    if (dayBtn)
        dayBtn.textContent = "\uD83D\uDCE5 ".concat(japaneseDate(key), "\u3092Excel\u51FA\u529B");
    var monthBtn = $("exportMonthBtn");
    if (monthBtn)
        monthBtn.textContent = "\uD83D\uDCE5 ".concat(key.slice(0, 7).replace("-", "年"), "\u6708\u3092Excel\u51FA\u529B");
}
// ---------- XLSX: 外部ライブラリ不要の簡易Excel出力 ----------
function xmlEscape(v) { return String(v !== null && v !== void 0 ? v : "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;"); }
function colName(n) { var s = ""; while (n > 0) {
    var r = (n - 1) % 26;
    s = String.fromCharCode(65 + r) + s;
    n = Math.floor((n - 1) / 26);
} return s; }
function cellXml(row, col, value, styleId) {
    if (styleId === void 0) { styleId = 0; }
    var ref = colName(col) + row;
    if (value === null || value === undefined || value === "")
        return "<c r=\"".concat(ref, "\" t=\"inlineStr\" s=\"").concat(styleId, "\"><is><t></t></is></c>");
    if (typeof value === "number" && Number.isFinite(value))
        return "<c r=\"".concat(ref, "\" t=\"n\" s=\"").concat(styleId, "\"><v>").concat(value, "</v></c>");
    return "<c r=\"".concat(ref, "\" t=\"inlineStr\" s=\"").concat(styleId, "\"><is><t xml:space=\"preserve\">").concat(xmlEscape(value), "</t></is></c>");
}
function sheetXml(rows, options) {
    if (options === void 0) { options = {}; }
    var safeRows = Array.isArray(rows) ? rows : [];
    var maxCols = Math.max(1, safeRows.reduce(function (m, r) { return Math.max(m, r.length); }, 0));
    var maxRow = Math.max(1, safeRows.length);
    var dim = "A1:".concat(colName(maxCols)).concat(maxRow);
    var headerRows = new Set(options.headerRows || []);
    var out = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><worksheet xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\"><dimension ref=\"".concat(dim, "\"/>");
    if (options.freezeRows)
        out += "<sheetViews><sheetView workbookViewId=\"0\"><pane ySplit=\"".concat(options.freezeRows, "\" topLeftCell=\"A").concat(options.freezeRows + 1, "\" activePane=\"bottomLeft\" state=\"frozen\"/></sheetView></sheetViews>");
    if (options.widths && options.widths.length) {
        out += '<cols>';
        options.widths.forEach(function (w, i) { if (w)
            out += "<col min=\"".concat(i + 1, "\" max=\"").concat(i + 1, "\" width=\"").concat(Number(w).toFixed(1), "\" customWidth=\"1\"/>"); });
        out += '</cols>';
    }
    out += '<sheetData>';
    safeRows.forEach(function (r, ri) { var rn = ri + 1; var style = headerRows.has(rn) ? 1 : (rn === 1 && options.titleStyle ? 2 : 0); out += "<row r=\"".concat(rn, "\">"); r.forEach(function (v, ci) { return out += cellXml(rn, ci + 1, v, style); }); out += '</row>'; });
    out += '</sheetData>';
    if (options.autoFilter && safeRows.length > 1) {
        var filterRow = Number((options.headerRows || [])[0] || 1);
        out += "<autoFilter ref=\"A".concat(filterRow, ":").concat(colName(maxCols)).concat(maxRow, "\"/>");
    }
    return out + '</worksheet>';
}
function xlsxStyles() { return "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><styleSheet xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\"><fonts count=\"2\"><font><sz val=\"11\"/><name val=\"Aptos\"/></font><font><b/><sz val=\"11\"/><name val=\"Aptos\"/></font></fonts><fills count=\"2\"><fill><patternFill patternType=\"none\"/></fill><fill><patternFill patternType=\"solid\"><fgColor rgb=\"FFDCEEFF\"/><bgColor indexed=\"64\"/></patternFill></fill></fills><borders count=\"2\"><border/><border><left style=\"thin\"/><right style=\"thin\"/><top style=\"thin\"/><bottom style=\"thin\"/></border></borders><cellXfs count=\"3\"><xf numFmtId=\"0\" fontId=\"0\" fillId=\"0\" borderId=\"0\"/><xf numFmtId=\"0\" fontId=\"1\" fillId=\"1\" borderId=\"1\" applyFont=\"1\" applyFill=\"1\" applyBorder=\"1\"/><xf numFmtId=\"0\" fontId=\"1\" fillId=\"0\" borderId=\"1\" applyFont=\"1\" applyBorder=\"1\"/></cellXfs></styleSheet>"; }
function xlsxEntries(sheets) {
    var entries = [];
    entries.push(["[Content_Types].xml", "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Types xmlns=\"http://schemas.openxmlformats.org/package/2006/content-types\"><Default Extension=\"rels\" ContentType=\"application/vnd.openxmlformats-package.relationships+xml\"/><Default Extension=\"xml\" ContentType=\"application/xml\"/><Override PartName=\"/xl/workbook.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml\"/><Override PartName=\"/xl/styles.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml\"/>".concat(sheets.map(function (_, i) { return "<Override PartName=\"/xl/worksheets/sheet".concat(i + 1, ".xml\" ContentType=\"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml\"/>"); }).join(""), "</Types>")]);
    entries.push(["_rels/.rels", "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Relationships xmlns=\"http://schemas.openxmlformats.org/package/2006/relationships\"><Relationship Id=\"rId1\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument\" Target=\"xl/workbook.xml\"/></Relationships>"]);
    entries.push(["xl/workbook.xml", "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><workbook xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\" xmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\"><workbookPr/><bookViews><workbookView xWindow=\"0\" yWindow=\"0\" windowWidth=\"18000\" windowHeight=\"12000\"/></bookViews><sheets>".concat(sheets.map(function (s, i) { return "<sheet name=\"".concat(xmlEscape(s.name), "\" sheetId=\"").concat(i + 1, "\" r:id=\"rId").concat(i + 1, "\"/>"); }).join(""), "</sheets><calcPr calcId=\"191029\" fullCalcOnLoad=\"1\"/></workbook>")]);
    entries.push(["xl/_rels/workbook.xml.rels", "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Relationships xmlns=\"http://schemas.openxmlformats.org/package/2006/relationships\">".concat(sheets.map(function (_, i) { return "<Relationship Id=\"rId".concat(i + 1, "\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet\" Target=\"worksheets/sheet").concat(i + 1, ".xml\"/>"); }).join(""), "<Relationship Id=\"rId").concat(sheets.length + 1, "\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles\" Target=\"styles.xml\"/></Relationships>")]);
    entries.push(["xl/styles.xml", xlsxStyles()]);
    sheets.forEach(function (sh, i) { return entries.push(["xl/worksheets/sheet".concat(i + 1, ".xml"), sheetXml(sh.rows, sh)]); });
    return entries;
}
function utf8(str) { return new TextEncoder().encode(String(str)); }
function crc32(data) {
    var e_4, _a;
    var table = crc32.table;
    if (!table) {
        table = new Uint32Array(256);
        for (var n = 0; n < 256; n++) {
            var c_1 = n;
            for (var k = 0; k < 8; k++)
                c_1 = (c_1 & 1) ? (0xEDB88320 ^ (c_1 >>> 1)) : (c_1 >>> 1);
            table[n] = c_1 >>> 0;
        }
        crc32.table = table;
    }
    var c = 0xFFFFFFFF;
    try {
        for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
            var b = data_1_1.value;
            c = table[(c ^ b) & 255] ^ (c >>> 8);
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
        }
        finally { if (e_4) throw e_4.error; }
    }
    return (c ^ 0xFFFFFFFF) >>> 0;
}
function concatBytes(parts) {
    var e_5, _a;
    var len = parts.reduce(function (n, p) { return n + p.length; }, 0), out = new Uint8Array(len);
    var o = 0;
    try {
        for (var parts_1 = __values(parts), parts_1_1 = parts_1.next(); !parts_1_1.done; parts_1_1 = parts_1.next()) {
            var p = parts_1_1.value;
            out.set(p, o);
            o += p.length;
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (parts_1_1 && !parts_1_1.done && (_a = parts_1.return)) _a.call(parts_1);
        }
        finally { if (e_5) throw e_5.error; }
    }
    return out;
}
function makeZip(entries) {
    var e_6, _a;
    var parts = [], central = [];
    var offset = 0;
    var _loop_2 = function (name, text) {
        var nameBytes = utf8(name), data = utf8(text), crc = crc32(data), flags = 0x0800;
        var local = new Uint8Array(30 + nameBytes.length + data.length);
        var o = 0;
        var w16 = function (n) { local[o++] = n & 255; local[o++] = (n >>> 8) & 255; };
        var w32 = function (n) { local[o++] = n & 255; local[o++] = (n >>> 8) & 255; local[o++] = (n >>> 16) & 255; local[o++] = (n >>> 24) & 255; };
        w32(0x04034b50);
        w16(20);
        w16(flags);
        w16(0);
        w16(0);
        w16(0);
        w32(crc);
        w32(data.length);
        w32(data.length);
        w16(nameBytes.length);
        w16(0);
        local.set(nameBytes, o);
        o += nameBytes.length;
        local.set(data, o);
        parts.push(local);
        var c = new Uint8Array(46 + nameBytes.length);
        o = 0;
        var cw16 = function (n) { c[o++] = n & 255; c[o++] = (n >>> 8) & 255; };
        var cw32 = function (n) { c[o++] = n & 255; c[o++] = (n >>> 8) & 255; c[o++] = (n >>> 16) & 255; c[o++] = (n >>> 24) & 255; };
        cw32(0x02014b50);
        cw16(20);
        cw16(20);
        cw16(flags);
        cw16(0);
        cw16(0);
        cw16(0);
        cw32(crc);
        cw32(data.length);
        cw32(data.length);
        cw16(nameBytes.length);
        cw16(0);
        cw16(0);
        cw16(0);
        cw16(0);
        cw32(0);
        cw32(offset);
        c.set(nameBytes, o);
        central.push(c);
        offset += local.length;
    };
    try {
        for (var entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
            var _b = __read(entries_1_1.value, 2), name = _b[0], text = _b[1];
            _loop_2(name, text);
        }
    }
    catch (e_6_1) { e_6 = { error: e_6_1 }; }
    finally {
        try {
            if (entries_1_1 && !entries_1_1.done && (_a = entries_1.return)) _a.call(entries_1);
        }
        finally { if (e_6) throw e_6.error; }
    }
    var centralStart = offset, centralData = concatBytes(central), end = new Uint8Array(22);
    var e = 0;
    var ew16 = function (n) { end[e++] = n & 255; end[e++] = (n >>> 8) & 255; };
    var ew32 = function (n) { end[e++] = n & 255; end[e++] = (n >>> 8) & 255; end[e++] = (n >>> 16) & 255; end[e++] = (n >>> 24) & 255; };
    ew32(0x06054b50);
    ew16(0);
    ew16(0);
    ew16(entries.length);
    ew16(entries.length);
    ew32(centralData.length);
    ew32(centralStart);
    ew16(0);
    return concatBytes(__spreadArray(__spreadArray([], __read(parts), false), [centralData, end], false));
}
function downloadBlob(blob, name) {
    // Android WebView(file:///android_asset/)では<a download>だけでは端末保存できないため、
    // ネイティブ保存ブリッジへ渡します。PC/通常ブラウザでは従来のダウンロードを使用します。
    if (window.AndroidFiles && typeof window.AndroidFiles.saveBase64 === "function") {
        try {
            var mime = blob.type || "application/octet-stream";
            var toBase64 = function (buffer) {
                var bytes = new Uint8Array(buffer), binary = "";
                var chunk = 0x8000;
                for (var i = 0; i < bytes.length; i += chunk) {
                    binary += String.fromCharCode.apply(null, bytes.subarray(i, Math.min(i + chunk, bytes.length)));
                }
                return btoa(binary);
            };
            if (blob.arrayBuffer) {
                blob.arrayBuffer().then(function (buffer) {
                    window.AndroidFiles.saveBase64(name, mime, toBase64(buffer));
                }).catch(function (err) {
                    console.error("Android Excel save failed", err);
                    alert("Excelファイルを保存できませんでした。もう一度お試しください。");
                });
            } else {
                var reader = new FileReader();
                reader.onload = function () {
                    var dataUrl = String(reader.result || "");
                    var comma = dataUrl.indexOf(",");
                    window.AndroidFiles.saveBase64(name, mime, comma >= 0 ? dataUrl.slice(comma + 1) : dataUrl);
                };
                reader.onerror = function () { alert("Excelファイルを読み込めませんでした。"); };
                reader.readAsDataURL(blob);
            }
            return;
        } catch (e) {
            console.error("Android Excel save exception", e);
        }
    }
    var a = document.createElement("a");
    var url = URL.createObjectURL(blob);
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 1000);
}
function exportXlsx(name, sheets) { var zip = makeZip(xlsxEntries(sheets)); downloadBlob(new Blob([zip], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), name); }
function exportDayXlsx() {
    var key = selectedRecordDate, rs = getDayRecords(key), sum = calcDaySummary(rs), note = getDayNote(key);
    if (!rs.length && !note.trim()) {
        if (!confirm("".concat(japaneseDate(key), "\u306B\u306F\u8A18\u9332\u304C\u3042\u308A\u307E\u305B\u3093\u3002\u7A7A\u306EExcel\u3092\u4F5C\u6210\u3057\u307E\u3059\u304B\uFF1F")))
            return;
    }
    var rows = [["失語症トレーニング｜1日の記録"], ["日付", japaneseDate(key)], [], ["実施回数", sum.sessions, "問題数", sum.total, "正解数", sum.score, "平均正答率", "".concat(sum.rate, "%")], [], ["時刻", "カテゴリ", "ジャンル", "課題", "記録種別", "正解", "問題数", "正答率", "AI会話ターン", "所要時間"]];
    rs.forEach(function (r) { return rows.push([r.time, r.category || "", r.genre, r.activity, r.kind === "aiConversation" ? "AI会話" : "通常トレーニング", r.score, r.total, "".concat(r.rate, "%"), r.turns || 0, durationText(r.durationSec)]); });
    rows.push([], ["メモ", note]);
    exportXlsx("\u5931\u8A9E\u75C7\u30C8\u30EC\u30FC\u30CB\u30F3\u30B0_".concat(key, ".xlsx"), [{ name: "1日の記録", rows: rows, headerRows: [6], titleStyle: true, freezeRows: 6, widths: [12, 22, 18, 28, 10, 10, 12, 14], autoFilter: true }]);
}
function exportMonthXlsx() {
    var mk = monthKey(recordMonth), rs = getMonthRecords(recordMonth), notes = loadNotes(), byDay = {};
    var monthHasNotes = Object.keys(notes).some(function (k) { return k.startsWith(mk) && String(notes[k] || "").trim(); });
    if (!rs.length && !monthHasNotes) {
        if (!confirm("".concat(recordMonth.getFullYear(), "\u5E74").concat(recordMonth.getMonth() + 1, "\u6708\u306B\u306F\u8A18\u9332\u304C\u3042\u308A\u307E\u305B\u3093\u3002\u7A7A\u306EExcel\u3092\u4F5C\u6210\u3057\u307E\u3059\u304B\uFF1F")))
            return;
    }
    rs.forEach(function (r) { var _a; var _b; return ((_a = byDay[_b = r.date]) !== null && _a !== void 0 ? _a : (byDay[_b] = [])).push(r); });
    var summary = [["失語症トレーニング｜月間記録"], ["対象月", "".concat(recordMonth.getFullYear(), "\u5E74").concat(recordMonth.getMonth() + 1, "\u6708")], [], ["日付", "実施回数", "問題数", "正解数", "平均正答率", "実施時間(分)"]];
    Object.keys(byDay).sort().forEach(function (key) { var ss = calcDaySummary(byDay[key]); summary.push([key, ss.sessions, ss.total, ss.score, "".concat(ss.rate, "%"), ss.minutes]); });
    var detail = [["日付", "時刻", "カテゴリ", "ジャンル", "課題", "記録種別", "正解", "問題数", "正答率", "AI会話ターン", "所要時間"]];
    rs.slice().sort(function (a, b) { return a.finishedAt.localeCompare(b.finishedAt); }).forEach(function (r) { return detail.push([r.date, r.time, r.category || "", r.genre, r.activity, r.kind === "aiConversation" ? "AI会話" : "通常トレーニング", r.score, r.total, "".concat(r.rate, "%"), r.turns || 0, durationText(r.durationSec)]); });
    var noteRows = [["日付", "メモ"]];
    Object.keys(notes).filter(function (k) { return k.startsWith(mk); }).sort().forEach(function (k) { return noteRows.push([k, notes[k]]); });
    exportXlsx("\u5931\u8A9E\u75C7\u30C8\u30EC\u30FC\u30CB\u30F3\u30B0_".concat(mk, ".xlsx"), [
        { name: "月間集計", rows: summary, headerRows: [4], titleStyle: true, freezeRows: 4, widths: [14, 12, 12, 12, 16, 16], autoFilter: true },
        { name: "実施記録", rows: detail, headerRows: [1], freezeRows: 1, widths: [14, 10, 22, 18, 28, 10, 10, 12, 14], autoFilter: true },
        { name: "日別メモ", rows: noteRows, headerRows: [1], freezeRows: 1, widths: [14, 60], autoFilter: true }
    ]);
}
function initRecordEvents() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    (_a = $("recordsBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", openRecords);
    (_b = $("recordsHomeBtn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () { return show("home"); });
    (_c = $("prevMonthBtn")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () { recordMonth = new Date(recordMonth.getFullYear(), recordMonth.getMonth() - 1, 1); updateSelectedDateForMonth(); renderRecords(); });
    (_d = $("nextMonthBtn")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () { recordMonth = new Date(recordMonth.getFullYear(), recordMonth.getMonth() + 1, 1); updateSelectedDateForMonth(); renderRecords(); });
    (_e = $("todayMonthBtn")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", function () { var d = new Date(); recordMonth = new Date(d.getFullYear(), d.getMonth(), 1); selectedRecordDate = formatDateKey(d); renderRecords(); });
    (_f = $("exportDayBtn")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", exportDayXlsx);
    (_g = $("exportMonthBtn")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", exportMonthXlsx);
    (_h = $("dayNote")) === null || _h === void 0 ? void 0 : _h.addEventListener("input", function (e) {
        setDayNote(e.target.getAttribute("data-date") || selectedRecordDate, e.target.value);
        var status = $("dayNoteStatus");
        if (status) {
            status.textContent = "自動保存しました";
            clearTimeout(window.__memoStatusTimer);
            window.__memoStatusTimer = setTimeout(function () { return status.textContent = ""; }, 1200);
        }
    });
    (_j = $("clearRecordsBtn")) === null || _j === void 0 ? void 0 : _j.addEventListener("click", function () {
        if (confirm("保存されているトレーニング記録とメモをすべて削除します。よろしいですか？")) {
            localStorage.removeItem(RECORDS_KEY);
            localStorage.removeItem(NOTES_KEY);
            LEGACY_RECORD_KEYS.forEach(function (k) { return localStorage.removeItem(k); });
            LEGACY_NOTE_KEYS.forEach(function (k) { return localStorage.removeItem(k); });
            renderRecords();
            alert("記録を削除しました。");
        }
    });
}
initRecordEvents();
