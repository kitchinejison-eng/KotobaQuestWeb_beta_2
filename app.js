/*
 * ============================================================
 * ことばクエスト ブラウザ版｜エジソン・キッチン
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
        id: "articulationNavigator",
        icon: "👄",
        name: "構音筋ビジュアルナビゲーション",
        description: "唇・舌先・舌の奥・息の通り道を図で確認し、お手本を聞いて発音を練習します。",
        activities: [
            ["articulationNavigator", "構音筋ビジュアルナビゲーションを始める", "発音する場所を図で確認し、お手本とマイクで練習します。"]
        ]
    },
    {
        id: "pictogram3d",
        icon: "🟢",
        name: "ピクトグラム ○× 3Dクイズ",
        description: "草原・ビーチ・牧場・森からランダムに選ばれる3Dワールドで○×エリアを選ぶクイズ。全問正解で5枚、1問以上正解で1枚、全問不正解は0枚。",
        activities: [
            ["pictogram3d", "ピクトグラム ○× 3Dクイズ", "草原・ビーチ・牧場・森からランダムに選ばれる3D空間で全4問に挑戦します。全問正解で5枚、1問以上正解で1枚、全問不正解は0枚。"]
        ]
    },
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
        id: "pronunciationTraining",
        icon: "👄",
        name: "発音トレーニング",
        description: "発音する場所・仕方・問題形式を選び、練習結果と復習を記録します。",
        activities: [
            ["pronunciationTraining", "発音トレーニングを始める", "部位別・仕方別・聞き分け・音読を練習します"]
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
            ["aac", "デジタル・AAC活用", "場面から自分で言葉を選び、確定後に音声で伝える練習"]
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
// 1.5. トレーニングカテゴリ
// ------------------------------------------------------------
// 「始める」からカテゴリを選び、登録された課題へ進みます。育成モードはタイトル画面から直接開きます。
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
// V115.1: ジャンル・課題と関連する練習分野の説明。
// これは診断名による受講制限や治療効果の表示ではありません。
var TRAINING_NEEDS = {
    higher: { label: "高次脳機能障害", description: "注意・記憶・判断・段取り・やりとりを練習する課題との関連を示します。" },
    aphasia: { label: "失語症", description: "言葉を聞く・理解する・思い出す・話す・読む・書く課題との関連を示します。" },
    intellectual: { label: "知的障害", description: "絵や言葉を使い、理解・選択・意思表示を自分のペースで練習する例です。" },
    stuttering: { label: "吃音", description: "発話のリズムやペースを意識する活動例です。流暢さを採点・矯正するものではありません。" },
    cognitive: { label: "認知機能の維持", description: "記憶・注意・言語・判断を使う活動例です。認知症の予防効果を保証するものではありません。" }
};
var TRAINING_ACTIVITY_NEEDS = {
    articulationNavigator: [["aphasia"], "発音位置を見て、声に出す"],
    pronunciationTraining: [["aphasia", "intellectual"], "音と文字・発音を結びつける"],
    mouth: [["aphasia", "intellectual"], "口の動きと発声を意識する"],
    sound: [["aphasia", "intellectual"], "音を聞き分け、声に出す"],
    stepup: [["aphasia", "intellectual"], "単語から短文へ言葉をつなぐ"],
    repeat: [["aphasia", "intellectual"], "聞いた言葉を繰り返す"],
    mora: [["aphasia", "stuttering"], "音の拍とリズムを意識する"],
    accent: [["aphasia", "stuttering"], "発話の抑揚を意識する"],
    sentenceRhythm: [["aphasia", "stuttering"], "文を区切り、自分のペースで読む"],
    voiceRead: [["aphasia", "intellectual"], "文字を見て音読する"],
    listen: [["higher", "aphasia", "intellectual"], "聞き取り・選択・注意"],
    instruction: [["higher", "aphasia", "intellectual"], "指示の理解・手順の把握"],
    tf: [["higher", "aphasia", "cognitive"], "意味理解・判断"],
    matching: [["aphasia", "intellectual", "cognitive"], "文字と絵の対応・認識"],
    copy: [["higher", "aphasia", "intellectual"], "見て書く・注意を向ける"],
    anagram: [["higher", "aphasia", "cognitive"], "文字の順序・言葉の組み立て"],
    naming: [["aphasia"], "物の名前を思い出す"],
    cue: [["aphasia"], "ヒントから言葉を探す"],
    fill: [["aphasia", "intellectual"], "言葉や定型句を補う"],
    gesture: [["aphasia", "intellectual", "higher"], "身振りによる意思伝達"],
    board: [["aphasia", "intellectual"], "絵や選択肢で意思を伝える"],
    roleplay: [["aphasia", "higher", "intellectual"], "生活場面での理解・会話"],
    aac: [["aphasia", "intellectual"], "補助的な手段で意思を伝える"],
    localAIConversation: [["aphasia", "higher", "intellectual"], "質問の理解と一問一答"],
    readingMemory1: [["higher", "aphasia", "cognitive"], "朗読・内容理解・想起"],
    readingMemory2: [["higher", "aphasia", "cognitive"], "朗読・内容理解・想起"],
    readingMemory3: [["higher", "aphasia", "cognitive"], "朗読・内容理解・想起"],
    pictogram3d: [["higher", "intellectual", "cognitive"], "選択・判断・空間の把握"],
    kotobaQuest: [["higher", "aphasia", "cognitive"], "言葉の理解と判断"],
    kotobaQuestClassic: [["higher", "aphasia", "cognitive"], "言葉の理解と判断"]
};
function trainingNeedBadges(activityIds) {
    return activityIds.map(function(id) { return TRAINING_NEEDS[id]; }).filter(Boolean)
        .map(function(need) { return '<span class="training-need-badge">' + escapeHtml(need.label) + '</span>'; }).join("");
}
function categoryNeedIds(category) {
    var ids = [];
    category.activities.forEach(function(activity) {
        var related = TRAINING_ACTIVITY_NEEDS[activity[0]];
        (related ? related[0] : []).forEach(function(id) { if (ids.indexOf(id) === -1) ids.push(id); });
    });
    return ids;
}
// 構音ナビゲーション：口腔側面図へ連動する構音グループ（教育用の概略分類）。
// 外来語の f/v と日本語の「ふ」、硬口蓋と歯茎硬口蓋の違いも明記します。
var ARTICULATION_GROUPS = [
    { id:"bilabial", name:"両唇音", icon:"👄", place:"lips", letters:["ま","み","む","め","も"],
      instruction:"上下の唇をそっと閉じ、鼻に響かせるように声を出します。",
      action:"上下の唇を閉じる", focus:"唇", note:"「ま行」は唇を使う鼻音です。無理に強く閉じなくて大丈夫です。" },
    { id:"labiodental", name:"唇歯音", icon:"🦷", place:"labiodental", letters:["ファ","フィ","フェ","フォ","ヴァ"],
      instruction:"外国語の f/v の口の形の参考練習です。上の前歯を下唇に軽く近づけます。",
      action:"上の歯を下唇に近づける", focus:"唇と歯",
      note:"※日本語の「ふ」は通常、両唇摩擦音 [ɸ] として説明されます。この分類は外来語の口の形を比べる参考です。" },
    { id:"alveolar", name:"歯音・歯茎音", icon:"😁", place:"alveolar", letters:["た","て","と","な","ね"],
      instruction:"舌先を上の前歯の後ろや歯茎の近くに動かして発音します。",
      action:"舌先を上の歯茎へ近づける", focus:"舌先・歯茎",
      note:"「た行」の一部と「な行」の一部を例にしています。音によって接触位置は異なります。" },
    { id:"palatal", name:"硬口蓋音", icon:"🗣️", place:"palatal", letters:["や","ゆ","よ","し","ち"],
      instruction:"舌の前側を上あごの前の方へ近づける感覚を確かめます。",
      action:"舌の前側を上あごへ近づける", focus:"硬口蓋付近",
      note:"「し」「ち」は厳密には歯茎硬口蓋付近の音です。図は位置の比較用です。" },
    { id:"velar", name:"軟口蓋音", icon:"👅", place:"velar", letters:["か","き","く","け","こ"],
      instruction:"舌の奥を上あごの奥の柔らかい部分へ近づけて発音します。",
      action:"舌の奥を持ち上げる", focus:"舌の奥・軟口蓋",
      note:"「か行」を例にしています。母音に合わせて舌の位置は変わります。" },
    { id:"glottal", name:"声門音", icon:"🎵", place:"glottal", letters:["は","へ","ほ"],
      instruction:"のどの奥から、息を無理なく流すイメージで発音します。",
      action:"のどの奥から息を流す", focus:"声門付近",
      note:"日本語の「ひ」は硬口蓋付近、「ふ」は両唇付近で作るため、ここでは「は・へ・ほ」を例にします。" }
];
var articulationSelectedGroup = "bilabial";
var articulationAttemptedIndexes = new Set();
var articulationCorrectIndexes = new Set();
var articulationSkippedIndexes = new Set();
var articulationAutoNextTimer = null;
function getArticulationGroup(id) {
    return ARTICULATION_GROUPS.find(function(group) { return group.id === id; }) || ARTICULATION_GROUPS[0];
}
function buildArticulationGroupQuestions(groupId) {
    var group = getArticulationGroup(groupId);
    return group.letters.map(function(letter, index) {
        return { question:"「" + letter + "」の音が出る場所を見ながら、発音してみましょう。",
            answer:letter, voiceText:letter, navPlace:group.place, navGroup:group.id,
            navTitle:group.name + "「" + letter + "」", navLabel:group.focus, navGuide:group.instruction,
            navSteps:[group.action + "感覚を確かめます。","お手本を聞き、「" + letter + "」とゆっくり声を出します。"],
            navSequence:index, hint:group.note };
    });
}
// Ver_beta_4: 6種類から5種類を無作為に選び、各種類から1音ずつ抽選。
// 一回の練習で同じ構音・同じ音に偏らず、問題の順番も毎回変わります。
function articulationShuffle(items) {
    var result = items.slice();
    for (var i = result.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = result[i]; result[i] = result[j]; result[j] = temp;
    }
    return result;
}
function buildRandomArticulationQuiz() {
    var pickedGroups = articulationShuffle(ARTICULATION_GROUPS).slice(0, 5);
    return articulationShuffle(pickedGroups.map(function(group) {
        var candidates = buildArticulationGroupQuestions(group.id);
        return candidates[Math.floor(Math.random() * candidates.length)];
    }));
}
function cancelArticulationAutoNext() {
    if (articulationAutoNextTimer !== null) {
        clearTimeout(articulationAutoNextTimer);
        articulationAutoNextTimer = null;
    }
}
function scheduleArticulationAutoNext() {
    if (selectedActivity !== "articulationNavigator" || !answered) return;
    cancelArticulationAutoNext();
    var run = activityRunToken;
    var index = current;
    var status = $("artnavAutoNextNotice");
    if (status) status.textContent = index === questions.length - 1
        ? "回答を確認しました。まもなく結果を表示します…"
        : "回答を確認しました。まもなく次の問題へ進みます…";
    articulationAutoNextTimer = setTimeout(function() {
        articulationAutoNextTimer = null;
        var game = $("game");
        if (selectedActivity !== "articulationNavigator" || activityRunToken !== run || current !== index || !answered || !game || !game.classList.contains("active")) return;
        nextQuestion();
    }, 1350);
}
var FOUNDATION_VOICE_ACTIVITIES = new Set(["mouth", "sound", "stepup", "accent", "sentenceRhythm", "repeat", "articulationNavigator"]);
// ------------------------------------------------------------
// 2. 問題データ
// ------------------------------------------------------------
// 共通項目：question / answer / choices / hint / voiceText / emoji / image
// type：quiz = 選択、speak = 声に出して練習、complete = 「できた」で進む、anagram = 並べ替え
var QUESTIONS = {
    articulationNavigator: [
        { question: "口の開き方を見ながら「あ」を練習しましょう。", answer: "あ", voiceText: "あ", navPlace: "mouth", navTitle: "母音「あ」", navLabel: "口の開き", navGuide: "口を開き、あごや舌に力を入れすぎず、自然に声を出します。", navSteps: ["口を開く様子を鏡で確認します。", "「あ」と短く、無理のない声で言います。"], hint: "痛みや疲れがあるときは無理をせず休みましょう。" },
        { question: "唇と舌の前の方を意識して「い」を練習しましょう。", answer: "い", voiceText: "い", navPlace: "front", navTitle: "母音「い」", navLabel: "口の前の方", navGuide: "口を横に軽く開き、舌の前の方を意識して声を出します。", navSteps: ["口を軽く横に開きます。", "「い」とゆっくり声に出します。"], hint: "口の形を見ながら、自分のペースで行います。" },
        { question: "唇の形を意識して「う」を練習しましょう。", answer: "う", voiceText: "う", navPlace: "lips", navTitle: "母音「う」", navLabel: "唇の形", navGuide: "唇を軽くすぼめます。強く突き出しすぎなくて大丈夫です。", navSteps: ["唇を軽くすぼめます。", "「う」と短く声に出します。"], hint: "唇の形には個人差があります。楽な動かし方で練習しましょう。" },
        { question: "上下の唇を使う「ぱ」を練習しましょう。", answer: "ぱ", voiceText: "ぱ", navPlace: "lips", navTitle: "唇を使う音「ぱ」", navLabel: "上下の唇", navGuide: "上下の唇を一度閉じ、軽く開くときに「ぱ」と声を出します。", navSteps: ["上下の唇を軽く閉じます。", "唇を開きながら「ぱ」と言います。"], hint: "息を強く出しすぎず、楽に発音します。" },
        { question: "唇を閉じて出す「ま」を練習しましょう。", answer: "ま", voiceText: "ま", navPlace: "lips", navTitle: "唇を使う音「ま」", navLabel: "上下の唇", navGuide: "唇を閉じ、声を鼻に響かせるように「ま」と言います。", navSteps: ["上下の唇を軽く閉じます。", "力を抜いて「ま」と声に出します。"], hint: "音声認識の結果は目安です。聞き取りにくい場合はお手本と聞き比べましょう。" },
        { question: "舌先を意識して「た」を練習しましょう。", answer: "た", voiceText: "た", navPlace: "front", navTitle: "舌先を使う音「た」", navLabel: "舌先", navGuide: "舌先を上の歯のすぐ後ろ付近につけ、離す動きを意識します。", navSteps: ["舌先を上の歯のすぐ後ろ付近へ近づけます。", "舌先を離しながら「た」と言います。"], hint: "舌の位置は音や人によって異なることがあります。無理に動かさないでください。" },
        { question: "舌先を軽く使う「ら」を練習しましょう。", answer: "ら", voiceText: "ら", navPlace: "front", navTitle: "舌先を使う音「ら」", navLabel: "舌先", navGuide: "舌先を上の歯のすぐ後ろ付近に軽く触れて、すぐ離すイメージです。", navSteps: ["舌先を軽く上へ動かします。", "「ら」と声に出します。"], hint: "舌先を強く押しつける必要はありません。" },
        { question: "舌の奥を意識して「か」を練習しましょう。", answer: "か", voiceText: "か", navPlace: "back", navTitle: "舌の奥を使う音「か」", navLabel: "舌の奥", navGuide: "舌の奥の方を口の天井の奥へ近づけるイメージで声を出します。", navSteps: ["舌の奥の方を意識します。", "「か」とゆっくり声に出します。"], hint: "図は位置の目安です。実際の舌の動きは音によって異なります。" },
        { question: "息の通り道を意識して「さ」を練習しましょう。", answer: "さ", voiceText: "さ", navPlace: "air", navTitle: "息を使う音「さ」", navLabel: "息の通り道", navGuide: "舌と歯の間の狭いすき間を息が通るイメージで「さ」と言います。", navSteps: ["口の中に小さなすき間を作るイメージを持ちます。", "息を強くしすぎず「さ」と言います。"], hint: "この画面は発音の練習を助ける目安で、医学的な評価・診断ではありません。" },
        { question: "口の形と音をまとめて「あ・い・う・え・お」と練習しましょう。", answer: "あいうえお", voiceText: "あ、い、う、え、お", navPlace: "mouth", navTitle: "母音をつなげる", navLabel: "口の形を切り替える", navGuide: "口の形を少しずつ変えながら、5つの母音を自分のペースで言います。", navSteps: ["あ・い・う・え・おを見ながら準備します。", "ひとつずつ区切って声に出します。"], hint: "途中で休んでも大丈夫です。" }
    ],
    naming: [
        { question: "これは何でしょう？", image: "images/quiz-jpg/naming/apple.jpg", answer: "りんご", hint: "赤や緑の果物です。", choices: ["りんご", "みかん", "バナナ", "ぶどう"], voiceText: "これは、りんごです。" },
        { question: "これは何でしょう？", image: "images/quiz-jpg/naming/banana.jpg", answer: "バナナ", hint: "黄色くて、皮をむいて食べます。", choices: ["りんご", "バナナ", "もも", "すいか"], voiceText: "これは、バナナです。" },
        { question: "これは何でしょう？", image: "images/quiz-jpg/naming/orenge.jpg", answer: "みかん", hint: "オレンジ色の小さな果物です。", choices: ["ぶどう", "みかん", "なし", "りんご"], voiceText: "これは、みかんです。" },
        { question: "これは何でしょう？", image: "images/quiz-jpg/naming/inu.jpg", answer: "いぬ", hint: "「ワンワン」と鳴く動物です。", choices: ["ねこ", "いぬ", "うさぎ", "さる"], voiceText: "これは、いぬです。" },
        { question: "これは何でしょう？", image: "images/quiz-jpg/naming/neko.jpg", answer: "ねこ", hint: "「ニャー」と鳴く動物です。", choices: ["いぬ", "ねこ", "きつね", "くま"], voiceText: "これは、ねこです。" },
        { question: "これは何でしょう？", image: "images/quiz-jpg/naming/cofe.jpg", answer: "コーヒー", hint: "黒っぽい飲み物です。", choices: ["おちゃ", "コーヒー", "ぎゅうにゅう", "ジュース"], voiceText: "これは、コーヒーです。" }
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
        { question: "文の続きを選びましょう。", answer: "たべます", image: "images/quiz-jpg/fill/mesi.jpg", prompt: "ごはんを（　　）。", hint: "口に入れて食べる動作です。", choices: ["たべます", "のみます", "ねます", "みます"] },
        { question: "文の続きを選びましょう。", answer: "はいります", image: "images/quiz-jpg/fill/furo.jpg", prompt: "おふろに（　　）。", hint: "お風呂の中に入ることです。", choices: ["はいります", "かいます", "よみます", "かきます"] },
        { question: "数字を順番に言ってみましょう。", image: "images/quiz-jpg/fill/1.2.3.jpg", answer: "1・2・3", prompt: "1 → 2 → ？", hint: "次の数字です。", choices: ["1・2・3", "3・2・1", "1・3・2"] },
        { question: "あいさつの続きを選びましょう。", answer: "おはよう", image: "images/quiz-jpg/fill/morning.jpg", prompt: "（　　）ございます。", hint: "朝、人に会ったときに使うあいさつです。", choices: ["おはよう", "こんにちは", "こんばんは", "さようなら"] },],
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
        { question: "見本と同じ文字を1文字ずつ書き写しましょう。", answer: "山", prompt: "山", hint: "文字の形をよく見ます。", voiceText: "山" },
        { question: "見本と同じ文字を1文字ずつ書き写しましょう。", answer: "学校", prompt: "学校", hint: "文字の形をよく見ます。", voiceText: "学校" },
        { question: "見本と同じ文字を1文字ずつ書き写しましょう。", answer: "りんご", prompt: "りんご", hint: "文字の形をよく見ます。", voiceText: "りんご" }
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
        { question: "のどがかわいて、飲み物が必要なときはどのカードを選びますか？", answer: "💧 水", hint: "今の体に必要な飲み物を選びましょう。", choices: ["💧 水", "🛏️ 休みたい", "🚽 トイレ", "🍚 ごはん"] },
        { question: "お手洗いに行きたいときに、どのカードを選びますか？", answer: "🚽 トイレ", hint: "施設の中で行きたい場所を表すカードです。", choices: ["🚽 トイレ", "💧 水", "📞 電話", "☕ コーヒー"] },
        { question: "体のどこかがつらいとき、状態を伝えるカードはどれですか？", answer: "🤕 痛い", hint: "元気な状態ではないことを知らせるカードです。", choices: ["🤕 痛い", "😊 元気", "🍎 食べる", "🛏️ 寝る"] }
    ],
    roleplay: [
        { question: "カフェでコーヒーを注文します。何と言いますか？", answer: "コーヒーください", hint: "『ください』を使って伝えます。", choices: ["コーヒーください", "コーヒーは走ります", "コーヒーを閉めます", "コーヒーを読みます"], voiceText: "コーヒーください" },
        { question: "買い物で支払いをするとき、どんな言葉が使えますか？", answer: "お願いします", hint: "店員さんに丁寧に伝えます。", choices: ["お願いします", "おやすみなさい", "いただきます", "いってきます"], voiceText: "お願いします" },
        { question: "困ったとき、相手に助けを求めるなら？", answer: "手伝ってください", hint: "助けを依頼する言葉です。", choices: ["手伝ってください", "いただきます", "おかえりなさい", "おやすみなさい"], voiceText: "手伝ってください" }
    ],
    // デジタル・AAC活用：正解例の自動読み上げや、答えそのものを示すヒントは設定しません。
    // promptは場面、hintは考え方の支援だけを示します。voiceTextは意図的に持たせません。
    aac: [
        { question: "場面を考えて、相手に伝えたいことを選びましょう。", prompt: "のどがかわいて、飲み物が必要です。", emoji: "🥤", answer: "水がほしいです", hint: "今、体に必要なものは何かを考えてみましょう。", choices: ["水がほしいです", "少し休みたいです", "大丈夫です", "ありがとう"] },
        { question: "場面を考えて、相手に伝えたいことを選びましょう。", prompt: "外出中、トイレに行きたくなりました。", emoji: "🚻", answer: "トイレに行きたいです", hint: "行きたい場所や、今したいことに注目しましょう。", choices: ["少し休みたいです", "トイレに行きたいです", "おなかがすきました", "大丈夫です"] },
        { question: "場面を考えて、相手に伝えたいことを選びましょう。", prompt: "頭が痛くて、つらいと感じています。", emoji: "🤕", answer: "頭が痛いです", hint: "今の体の状態を、相手に知らせる言葉を考えましょう。", choices: ["頭が痛いです", "おなかがすきました", "こんにちは", "帰ります"] },
        { question: "場面を考えて、相手に伝えたいことを選びましょう。", prompt: "ふたが固くて開けられず、困っています。", emoji: "🫙", answer: "手伝ってください", hint: "自分だけでは難しいとき、相手に何をお願いできるか考えましょう。", choices: ["手伝ってください", "もう大丈夫です", "おいしいです", "さようなら"] },
        { question: "場面を考えて、相手に伝えたいことを選びましょう。", prompt: "作業を続けて、疲れを感じています。今の状態を伝えたいです。", emoji: "🪑", answer: "少し休みたいです", hint: "今の気持ちと、これからどうしたいかを考えましょう。", choices: ["少し休みたいです", "もっと大きな声で", "ありがとう", "水をください"] },
        { question: "場面を考えて、相手に伝えたいことを選びましょう。", prompt: "相手の説明がよく分かりませんでした。", emoji: "💬", answer: "もう一度お願いします", hint: "分からないときは、相手に説明を繰り返してもらう方法があります。", choices: ["もう一度お願いします", "わかりました", "帰ります", "おなかがすきました"] },
        { question: "場面を考えて、相手に伝えたいことを選びましょう。", prompt: "店員さんに商品をすすめられましたが、必要ありません。", emoji: "🛍️", answer: "いりません", hint: "ほしいときと、必要ないときで伝え方を考えましょう。", choices: ["いりません", "ください", "助けてください", "おはようございます"] },
        { question: "場面を考えて、相手に伝えたいことを選びましょう。", prompt: "相手の声が小さくて、言葉が聞き取れません。", emoji: "👂", answer: "もう一度言ってください", hint: "聞き取りにくいときに、相手にお願いできることを考えましょう。", choices: ["もう一度言ってください", "よく聞こえます", "おいしいです", "休みたいです"] },
        { question: "場面を考えて、相手に伝えたいことを選びましょう。", prompt: "用事が終わり、家に帰りたいと思っています。", emoji: "🏠", answer: "帰りたいです", hint: "今いる場所から、次にどうしたいかを考えましょう。", choices: ["帰りたいです", "ここにいたいです", "水がほしいです", "もう一度お願いします"] },
        { question: "場面を考えて、相手に伝えたいことを選びましょう。", prompt: "近くの機械の音が大きく、気になります。", emoji: "🔊", answer: "音が大きいです", hint: "周りの環境で困っていることを、相手に知らせる方法を考えましょう。", choices: ["音が大きいです", "静かでいいです", "おなかがすきました", "ありがとう"] },
        { question: "場面を考えて、相手に伝えたいことを選びましょう。", prompt: "おなかがすいて、何か食べたいと思っています。", emoji: "🍽️", answer: "何か食べたいです", hint: "今ほしいものが、食べ物・飲み物・休憩のどれに近いか考えましょう。", choices: ["何か食べたいです", "トイレに行きたいです", "もう大丈夫です", "さようなら"] },
        { question: "場面を考えて、相手に伝えたいことを選びましょう。", prompt: "相手が荷物を運ぶのを手伝ってくれました。", emoji: "🤝", answer: "ありがとうございます", hint: "相手がしてくれたことへの気持ちを考えましょう。", choices: ["ありがとうございます", "いりません", "もう一度お願いします", "頭が痛いです"] },
        { question: "場面を考えて、相手に伝えたいことを選びましょう。", prompt: "相手から話しかけられ、あいさつを返したいです。", emoji: "👋", answer: "こんにちは", hint: "人と会ったときに使う、短いあいさつを考えましょう。", choices: ["こんにちは", "おやすみなさい", "手伝ってください", "音が大きいです"] },
        { question: "場面を考えて、相手に伝えたいことを選びましょう。", prompt: "返事を考えるのに、少し時間が必要です。", emoji: "⏳", answer: "少し待ってください", hint: "すぐに返事ができないとき、相手にどうお願いできるでしょう。", choices: ["少し待ってください", "もう帰ります", "ありがとう", "いりません"] },
        { question: "場面を考えて、相手に伝えたいことを選びましょう。", prompt: "説明を聞くより、文字を見たほうが分かりやすいです。", emoji: "📝", answer: "文字で書いてください", hint: "自分にとって分かりやすい伝え方を相手にお願いしましょう。", choices: ["文字で書いてください", "もっと早く話してください", "帰りたいです", "おなかがすきました"] },
        { question: "場面を考えて、相手に伝えたいことを選びましょう。", prompt: "今は手伝いが必要なく、自分でできそうです。", emoji: "👍", answer: "自分でできます", hint: "助けが必要なときと、自分でできるときの違いを考えましょう。", choices: ["自分でできます", "手伝ってください", "もう一度お願いします", "少し休みたいです"] }
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
// 復唱・唱和モード：唱和は「お手本を先に再生→終了後にマイク開始」とし、読み上げ音声の誤認識を防ぎます。
var repeatPracticeMode = "repeat";
var repeatQuestionScored = false;
var chorusListeningAfterExample = false;
var chorusFlowToken = 0;
var aiConversationState = {
    scenario: "",
    goal: "",
    partnerMessage: "",
    history: [],
    waiting: false,
    initialized: false
};
var aiInputRecognition = null;
var moraPracticeState = { mode: null, clapCount: 0, expected: 0, clapConfirmed: false, recognition: null, clapActive: false };
// モーラの方法は1回のトレーニング開始時に選び、全問題で使います。終了後は必ず初期化します。
var moraSessionMode = null;
var moraLaunchTimer = null;
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
function scrollPageToTop() {
    var reset = function () {
        // browser-responsive.css uses smooth scrolling globally. Force an
        // immediate jump when a question changes, even inside Android WebView.
        var root = document.documentElement;
        var body = document.body;
        var previousRoot = root && root.style ? root.style.scrollBehavior : "";
        var previousBody = body && body.style ? body.style.scrollBehavior : "";
        if (root && root.style) root.style.scrollBehavior = "auto";
        if (body && body.style) body.style.scrollBehavior = "auto";
        try { window.scrollTo({ top: 0, left: 0, behavior: "instant" }); }
        catch (_) { try { window.scrollTo(0, 0); } catch (ignored) {} }
        if (document.scrollingElement) document.scrollingElement.scrollTop = 0;
        if (root) root.scrollTop = 0;
        if (body) body.scrollTop = 0;
        var active = document.querySelector(".screen.active");
        if (active) active.scrollTop = 0;
        if (root && root.style) root.style.scrollBehavior = previousRoot;
        if (body && body.style) body.style.scrollBehavior = previousBody;
    };
    reset();
    if (typeof window.requestAnimationFrame === "function") window.requestAnimationFrame(reset);
}
function shuffle(arr) {
    return __spreadArray([], __read(arr), false).sort(function () { return Math.random() - 0.5; });
}
function show(id) {
    if (id !== "game") cancelArticulationAutoNext();
    if (id !== "game" && typeof window.KotobaAIQuizStopMicrophone === "function") window.KotobaAIQuizStopMicrophone();
    document.querySelectorAll(".screen").forEach(function (screen) { return screen.classList.remove("active"); });
    $(id).classList.add("active");
    document.body.classList.toggle("title-home-mode", id === "titleScreen");
    document.body.classList.toggle("artnav-v1-wide", id === "game" && selectedActivity === "articulationNavigator");
    scrollPageToTop();
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
// 共通フィードバック音はユーザー提供MP3を優先し、再生できない環境では従来の電子音にフォールバックします。
var feedbackAudioPool = {};
var wrongAnnouncementPending = false;
var wrongAnnouncementTimer = null;
function playFeedbackAudio(kind) {
    var src = kind === "correct" ? "sounds/quiz-correct-3.mp3" : "sounds/quiz-wrong-1.mp3";
    try {
        if (!window.Audio) return false;
        var audio = feedbackAudioPool[kind];
        if (!audio) {
            audio = new Audio(src);
            audio.preload = "auto";
            feedbackAudioPool[kind] = audio;
        }
        var master = (typeof window.__appMasterVolume === "number") ? window.__appMasterVolume : 0.6;
        try {
            var storedVolume = Number(localStorage.getItem("kotobaquest_volume_v3"));
            if (isFinite(storedVolume) && localStorage.getItem("kotobaquest_volume_v3") !== null) master = storedVolume / 100;
        } catch (_) { }
        audio.volume = Math.max(0, Math.min(1, master));
        audio.currentTime = 0;
        var promise = audio.play();
        if (promise && typeof promise.catch === "function") {
            promise.catch(function () { playFeedbackToneFallback(kind); });
        }
        return true;
    } catch (_) { return false; }
}
function playFeedbackToneFallback(kind) {
    if (kind === "correct") {
        playTone(660, 0.12, "sine", 0.06, 0);
        playTone(880, 0.18, "sine", 0.06, 0.12);
    } else {
        playTone(250, 0.12, "triangle", 0.075, 0);
        playTone(175, 0.18, "triangle", 0.075, 0.13);
    }
}
function playCorrectSound() {
    if (!playFeedbackAudio("correct")) playFeedbackToneFallback("correct");
}
function announceCorrect() {
    // すべての正解判定で使う統一メッセージです。
    if (voiceEnabled) speak("正解です。できました。");
}
function playWrongSound() {
    if (!playFeedbackAudio("wrong")) playFeedbackToneFallback("wrong");
    // 呼び出し元が直後に正解例を読み上げる場合も「不正解です」を省略しません。
    wrongAnnouncementPending = true;
    if (wrongAnnouncementTimer) clearTimeout(wrongAnnouncementTimer);
    wrongAnnouncementTimer = setTimeout(function () {
        if (!wrongAnnouncementPending) return;
        wrongAnnouncementPending = false;
        wrongAnnouncementTimer = null;
        speak("不正解です。");
    }, 100);
}
function playButtonSound() {
    playTone(520, 0.06, "sine", 0.035, 0);
}
// ------------------------------------------------------------
// 5. 日本語音声読み上げ
// ------------------------------------------------------------
function speak(text, force) {
    if (wrongAnnouncementPending) {
        if (wrongAnnouncementTimer) clearTimeout(wrongAnnouncementTimer);
        wrongAnnouncementTimer = null;
        wrongAnnouncementPending = false;
        if (String(text).indexOf("不正解です") !== 0) text = "不正解です。" + String(text || "");
    }
    // Explicitly pressed playback buttons must work even if automatic audio
    // is disabled in training settings.
    if ((!voiceEnabled && !force) || !text)
        return;
    // AndroidアプリではOS標準のTextToSpeechを優先します。
    if (window.AndroidSpeech && typeof window.AndroidSpeech.speak === "function") {
        try { window.AndroidSpeech.speak(String(text)); return; } catch (_) { }
    }
    if (!("speechSynthesis" in window)) {
        if ($("voiceStatus")) $("voiceStatus").textContent = "この端末では読み上げ機能を利用できません。";
        return;
    }
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
// 6. 7ジャンルの選択画面
// ------------------------------------------------------------
function renderCategories() {
    var grid = $("categoryGrid");
    if (!grid)
        return;
    var guide = $("trainingNeedsGuideItems");
    if (guide) {
        guide.innerHTML = Object.keys(TRAINING_NEEDS).map(function(key) {
            var item = TRAINING_NEEDS[key];
            return '<div class="training-need-explanation"><strong>' + escapeHtml(item.label) + '</strong><span>' + escapeHtml(item.description) + '</span></div>';
        }).join("");
    }
    grid.innerHTML = "";
    TRAINING_CATEGORIES.forEach(function (category) {
        var button = document.createElement("button");
        button.type = "button";
        button.className = "category-card";
        button.innerHTML = '<span class="category-icon">' + category.icon + '</span>' +
            '<span class="category-name">' + escapeHtml(category.name) + '</span>' +
            '<span class="category-description">' + escapeHtml(category.description) + '</span>' +
            '<span class="category-needs" aria-label="関連する練習分野">' + trainingNeedBadges(categoryNeedIds(category)) + '</span>' +
            '<span class="category-count">' + category.activities.length + 'つの課題</span>';
        button.addEventListener("click", function () { return selectCategory(category.id); });
        grid.appendChild(button);
    });
}
function selectCategory(categoryId) {
    // ピクトグラム3Dクイズは独立した3Dゲーム画面で開きます。
    if (categoryId === "pictogram3d") {
        
        window.location.href = "pictogram-3d.html?v=beta6-mobile-mic";
        return;
    }
    // コトバ・ダンジョンは独立モードとして専用画面を開きます。
    if (categoryId === "kotobaDungeon") {
        
        window.location.href = "kotoba-dungeon.html?v=87";
        return;
    }
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
            var needInfo = TRAINING_ACTIVITY_NEEDS[id] || [[], ""];
            b.innerHTML='<span class="activity-card-icon">' + ((id === "localAIConversation" || id === "aiConversation") ? "🧠" : "▶") + '</span><span class="activity-card-text"><strong>' + escapeHtml(title) + '</strong><small>' + escapeHtml(description) + '</small>' +
                '<span class="activity-card-focus">練習すること：' + escapeHtml(needInfo[1]) + '</span><span class="activity-card-needs">' + trainingNeedBadges(needInfo[0]) + '</span></span><span class="activity-card-arrow">›</span>';
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
    // 旧処理との互換用：内部ジャンルから該当する7ジャンルへ移動します。
    var category = TRAINING_CATEGORIES.find(function (c) { return c.activities.some(function (a) { var _a; return (_a = GENRES.find(function (g) { return g.id === genreId; })) === null || _a === void 0 ? void 0 : _a.activities.some(function (x) { return x[0] === a[0]; }); }); });
    if (category)
        selectCategory(category.id);
}
// The answers are checked locally, not by a small LLM. This makes the
// five-question score reproducible and allows hiragana/kanji synonyms.
var AI_CHAT_QUIZ_BANK = [
    {question:"雨の日に、頭がぬれないように使うものは？",answer:"かさ",aliases:["傘","かさをさす","傘をさす"],hint:"開いて、頭の上に持ちます。",emoji:"☔"},
    {question:"歯をみがくときに使う道具は？",answer:"はぶらし",aliases:["歯ブラシ","ハブラシ"],hint:"歯みがき粉をつけます。",emoji:"🪥"},
    {question:"今の時刻を知るために見るものは？",answer:"とけい",aliases:["時計"],hint:"針や数字で時間がわかります。",emoji:"🕒"},
    {question:"寝るときに、頭の下に置くものは？",answer:"まくら",aliases:["枕"],hint:"寝具の一つです。",emoji:"🛏️"},
    {question:"雪が降ることが多い季節は？",answer:"ふゆ",aliases:["冬"],hint:"12月や1月のころです。",emoji:"❄️"},
    {question:"春に咲く、ピンク色で有名な花は？",answer:"さくら",aliases:["桜","サクラ"],hint:"お花見でよく見ます。",emoji:"🌸"},
    {question:"鉛筆で書いた字を消す道具は？",answer:"けしごむ",aliases:["消しゴム","ケシゴム"],hint:"こすると文字が消えます。",emoji:"✏️"},
    {question:"手紙やはがきを出す場所は？",answer:"ゆうびんきょく",aliases:["郵便局"],hint:"切手や郵便を扱う場所です。",emoji:"✉️"},
    {question:"足にはいて外を歩くものは？",answer:"くつ",aliases:["靴","シューズ"],hint:"左右で一組です。",emoji:"👟"},
    {question:"夏に食べる、大きくて中が赤い果物は？",answer:"すいか",aliases:["西瓜","スイカ"],hint:"外側は緑色で、しま模様があります。",emoji:"🍉"},
    {question:"ラーメンを食べるときによく使う二本の道具は？",answer:"はし",aliases:["箸","おはし","お箸"],hint:"二本で食べ物をつかみます。",emoji:"🍜"},
    {question:"パンケーキを焼くときに使う、平たい鍋は？",answer:"ふらいぱん",aliases:["フライパン"],hint:"持ち手がついた調理器具です。",emoji:"🥞"},
    {question:"目が見えやすいように顔にかけるものは？",answer:"めがね",aliases:["眼鏡","メガネ"],hint:"レンズが二つあります。",emoji:"👓"},
    {question:"暑い日に、飲み物を冷たくするために入れるものは？",answer:"こおり",aliases:["氷","コオリ"],hint:"水を凍らせたものです。",emoji:"🧊"},
    {question:"料理をしょっぱい味にする調味料は？",answer:"しお",aliases:["塩"],hint:"白い粒の調味料です。",emoji:"🧂"}
];
var activityRunToken = 0;
// ------------------------------------------------------------
// 7. 課題開始
// ------------------------------------------------------------
function startActivity(activityId) {
    // Ver.53 発音トレーニングは独立した記録・復習画面で開きます。
    if (activityId === "pronunciationTraining" && window.__pronunciationTraining && typeof window.__pronunciationTraining.open === "function") {
        window.__pronunciationTraining.open();
        return;
    }
    // 「ことばファンタジーDX」はUD版RPG画面を開きます。
    if (activityId === "kotobaQuest") {
        selectedActivity = activityId;
        
        window.location.href = "kotoba-quest-ud.html?v=104";
        return;
    }
    if (activityId === "readingMemory1" || activityId === "readingMemory2" || activityId === "readingMemory3" || activityId === "readingMemory") {
        var storyId = activityId === "readingMemory2" ? "2" : (activityId === "readingMemory3" ? "3" : "1");
        if (window.__readingMemoryMode && typeof window.__readingMemoryMode.open === "function") {
            window.__readingMemoryMode.open(storyId);
        } else {
            
            window.location.href = "reading-memory.html?story=" + encodeURIComponent(storyId) + "&v=104";
        }
        return;
    }
    selectedActivity = activityId;
    activityRunToken++;
    cancelArticulationAutoNext();
    var gameElement = $("game");
    if (gameElement) gameElement.classList.toggle("ai-quiz-mode", activityId === "aiConversation" || activityId === "localAIConversation");
    if (gameElement) gameElement.classList.toggle("articulation-nav-mode", activityId === "articulationNavigator");
    if (moraLaunchTimer) { clearTimeout(moraLaunchTimer); moraLaunchTimer = null; }
    if (activityId === "mora") {
        cleanupBrowserClapDetection(false);
        moraSessionMode = null;
        moraPracticeState = { mode: null, clapCount: 0, expected: 0, clapConfirmed: false, recognition: null, clapActive: false };
    }
    if (activityId === "repeat") { repeatPracticeMode = "repeat"; repeatQuestionScored = false; }
    var genreEntry = GENRES.find(function (g) { return g.activities.some(function (a) { return a[0] === activityId; }); });
    selectedGenre = genreEntry || null;
    hintEnabled = $("hintOn").checked;
    voiceEnabled = $("voiceOn").checked;
    var bank = activityId === "articulationNavigator"
        ? buildRandomArticulationQuiz()
        : (QUESTIONS[activityId] || []);
    var count = Number($("questionCount").value);
    if (activityId === "aiConversation" || activityId === "localAIConversation") {
        questions = shuffle(AI_CHAT_QUIZ_BANK).slice(0, 5).map(function (item, index) {
            return Object.assign({}, item, {quizNumber:index + 1, quizTotal:5, voiceText:item.question, prompt:"AI会話クイズ：こたえを入力してください。正解すると自動で次へ進みます。"});
        });
    }
    else {
        // 構音ナビは設定画面の共通問題数に左右されず、毎回ランダム5問。
        questions = activityId === "articulationNavigator" ? bank : shuffle(bank).slice(0, Math.min(count, bank.length));
    }
    current = 0;
    score = 0;
    if (activityId === "articulationNavigator") {
        articulationAttemptedIndexes = new Set();
        articulationCorrectIndexes = new Set();
        articulationSkippedIndexes = new Set();
    }
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
        '<button id="classicQuestIntroSkip" type="button" style="display:block;width:100%;min-height:48px;margin-top:12px;border:2px solid #9ed2ff;border-radius:14px;background:transparent;color:#fff;font-size:17px;font-weight:800;cursor:pointer;">会話をスキップして始める ▶</button>' +
        '</div>';
    document.body.appendChild(overlay);

    var nameEl = overlay.querySelector("#classicQuestIntroName");
    var textEl = overlay.querySelector("#classicQuestIntroText");
    var nextEl = overlay.querySelector("#classicQuestIntroNext");
    var skipEl = overlay.querySelector("#classicQuestIntroSkip");
    function finishIntro() {
        if (window.KQEventMessageSound) window.KQEventMessageSound.stop();
        overlay.remove();
    }
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
            finishIntro();
        }
    });
    skipEl.addEventListener("click", function () { playButtonSound(); finishIntro(); });
    renderStep();
}

function getActivityName(activityId) {
    if (activityId === "articulationNavigator") {
        // 5問が別々の構音にまたがるため、履歴の課題名は固定。
        // 個々の種類は record.articulation.sounds[].group に保存します。
        return "構音筋ビジュアルナビゲーション";
    }
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
function renderArticulationNavigatorLegacy(q) {
    var area = $("answerArea");
    if (!area) return;
    var place = q.navPlace || "mouth";
    var labels = [["mouth", "口の開き"], ["lips", "上下の唇"], ["front", "舌先・舌前部"], ["back", "舌の奥"], ["air", "息の通り道"]];
    var activeName = (labels.find(function (x) { return x[0] === place; }) || labels[0])[1];
    var chips = labels.map(function (item) { return '<span class="articulation-nav-chip ' + (item[0] === place ? 'is-active' : '') + '">' + item[1] + '</span>'; }).join("");
    // 座標はユーザー提供の無注釈・矢状断図（1379×752）上の概算位置です。
    var marks = {
      mouth: {x:475,y:292,rx:210,ry:92},
      lips:  {x:245,y:282,rx:72,ry:82},
      front: {x:478,y:365,rx:115,ry:43},
      back:  {x:666,y:380,rx:112,ry:55},
      air:   {x:440,y:270,rx:190,ry:28}
    };
    var m = marks[place] || marks.mouth;
    var panel = document.createElement("section");
    panel.className = "articulation-nav-panel";
    panel.innerHTML =
      '<div class="articulation-nav-kicker">👄 構音筋ビジュアルナビゲーション</div>' +
      '<h3 class="articulation-nav-title">' + escapeHtml(q.navTitle || q.voiceText || "発音の練習") + '</h3>' +
      '<p class="articulation-nav-guide">' + escapeHtml(q.navGuide || "図を見ながら、無理のない範囲で声に出しましょう。") + '</p>' +
      '<div class="articulation-nav-diagram-wrap articulation-nav-real-diagram">' +
        '<div class="articulation-nav-live-heading">今、意識する場所：<strong>' + escapeHtml(activeName) + '</strong></div>' +
        '<div class="articulation-nav-image-stage">' +
          '<img class="articulation-nav-anatomy" src="assets/articulation-mouth-unlabelled.jpg" alt="発音に関係する口・舌・のどの断面図" />' +
          '<svg class="articulation-nav-overlay" viewBox="0 0 1379 752" preserveAspectRatio="none" aria-hidden="true">' +
            (place === 'air' ? '<path class="nav-air-highlight" d="M185 275 Q300 255 440 265 T625 290" />' : '') +
            '<ellipse class="nav-real-highlight" cx="' + m.x + '" cy="' + m.y + '" rx="' + m.rx + '" ry="' + m.ry + '" />' +
            '<circle class="nav-real-dot" cx="' + m.x + '" cy="' + m.y + '" r="12" />' +
          '</svg>' +
        '</div>' +
        '<div class="articulation-nav-diagram-caption">色付きの範囲は、今回の音で意識する部位の目安です。</div>' +
      '</div>' +
      '<div class="articulation-nav-parts" aria-label="主に意識する場所">' + chips + '</div>' +
      '<div class="articulation-nav-live-status" id="articulationNavLiveStatus" aria-live="polite">準備完了：お手本を聞き、色付きの場所を意識して発音してください。</div>' +
      '<ol class="articulation-nav-steps">' + (q.navSteps || []).map(function (step) { return '<li>' + escapeHtml(step) + '</li>'; }).join("") + '</ol>' +
      '<p class="articulation-nav-note">※図は発音部位を理解するための目安です。マイク音声から実際の舌・唇の位置や筋肉の動きを直接測定しているわけではありません。</p>';
    area.appendChild(panel);
    renderFoundationVoiceTest(q);
}
// Ver_beta_4: 構音グループは選択させず、ランダム5問の各音に合わせて側面図を切り替えます。
// 既存のマイクと採点を使い、回答確定後は自動的に次の問題へ進みます。
function renderArticulationNavigator(q) {
    var area = $("answerArea");
    if (!area) return;
    var group = getArticulationGroup(q.navGroup || articulationSelectedGroup);
    articulationSelectedGroup = group.id;
    var positions = {
        lips:       { x:263, y:323, rx:70, ry:82 },
        labiodental:{ x:302, y:319, rx:78, ry:65 },
        alveolar:   { x:421, y:298, rx:90, ry:51 },
        palatal:    { x:517, y:256, rx:120, ry:47 },
        velar:      { x:692, y:309, rx:99, ry:60 },
        glottal:    { x:765, y:573, rx:80, ry:72 }
    };
    var m = positions[group.place] || positions.lips;
    // 未出題の答えは先に見せない。音の一覧は進捗表示専用です。
    var sounds = questions.map(function(item, index) {
        return '<span class="artnav-v1-sound ' + (index === current ? 'is-selected' : '') +
            (articulationCorrectIndexes.has(index) ? ' is-done' : '') +
            '" role="listitem" aria-current="' + (index === current ? 'step' : 'false') + '">' +
            (index <= current ? escapeHtml(item.answer) : String(index + 1)) + '</span>';
    }).join("");
    var partLabels = [
        ["歯","23%","30%"],["唇","15%","43%"],["硬口蓋","38%","17%"],
        ["軟口蓋","65%","24%"],["舌","43%","58%"],["声門","74%","76%"]
    ].map(function(item) {
        return '<span class="artnav-v1-part-label" style="left:' + item[1] + ';top:' + item[2] + '">' + item[0] + '</span>';
    }).join("");
    var panel = document.createElement("section");
    panel.className = "artnav-v1";
    panel.innerHTML =
        '<header class="artnav-v1-banner"><span class="artnav-v1-quest">🚩 ことばクエスト</span>' +
        '<div><div class="artnav-v1-kicker">Ver_beta_5 ・ ランダム5問</div>' +
        '<h2>構音筋ビジュアルナビゲーション</h2><p>音の出る場所を見ながら、発音を練習しよう</p></div><span aria-hidden="true" class="artnav-v1-spark">✦</span></header>' +
        '<div class="artnav-v1-grid">' +
          '<aside class="artnav-v1-groups artnav-v4-current" aria-label="今回の構音の説明">' +
            '<h3>今回の構音</h3>' +
            '<div class="artnav-v4-current-card"><span class="artnav-v4-current-icon" aria-hidden="true">' + group.icon + '</span>' +
              '<strong>' + escapeHtml(group.name) + '</strong><span>' + escapeHtml(group.focus) + '</span></div>' +
            '<p class="artnav-v4-guide-description">' + escapeHtml(group.instruction) + '</p>' +
            '<p class="artnav-v4-guide-tip">📍 この表示は選択ボタンではありません。出題された音に合わせて自動で切り替わります。</p>' +
          '</aside>' +
          '<section class="artnav-v1-middle" aria-label="口腔の側面図"><h3>👄 ' + escapeHtml(group.name) + 'のしくみ</h3>' +
            '<div class="articulation-nav-real-diagram artnav-v1-diagram">' +
              '<div class="articulation-nav-image-stage"><img class="articulation-nav-anatomy" src="assets/articulation-mouth-unlabelled.jpg" alt="口・歯・舌・上あご・のどの側面図">' +
                '<svg class="articulation-nav-overlay" viewBox="0 0 1379 752" preserveAspectRatio="none" aria-hidden="true">' +
                  '<ellipse class="nav-real-highlight" cx="' + m.x + '" cy="' + m.y + '" rx="' + m.rx + '" ry="' + m.ry + '"></ellipse>' +
                  '<circle class="nav-real-dot" cx="' + m.x + '" cy="' + m.y + '" r="12"></circle>' +
                '</svg>' + partLabels + '</div>' +
              '<p class="artnav-v1-action">💡 ' + escapeHtml(group.action) + '</p>' +
              '<p class="artnav-v1-guide">' + escapeHtml(group.instruction) + '</p>' +
              '<div id="articulationNavLiveStatus" class="articulation-nav-live-status" aria-live="polite">お手本を聞いてから、マイクで練習しましょう。</div>' +
            '</div></section>' +
          '<section class="artnav-v1-practice"><h3>🎙️ 発音してみよう</h3>' +
            '<div class="artnav-v1-flow-label" id="artnavFlowLabel" aria-live="polite">問題 ' + (current + 1) + ' / ' + questions.length + '　・　ランダム出題</div>' +
            '<div class="artnav-v1-sounds" role="list" aria-label="問題の順番">' + sounds + '</div>' +
            '<p class="artnav-v1-target">「' + escapeHtml(q.answer) + '」を発音してみよう</p>' +
            '<div class="artnav-v1-voice-slot"></div>' +
            '<div class="artnav-v4-auto-notice" id="artnavAutoNextNotice" role="status" aria-live="polite">マイクで答えると自動的に次の問題へ進みます。</div>' +
            '<button type="button" id="artnavSkipQuestion" class="artnav-v1-skip">この問題をスキップ</button>' +
            '<div class="artnav-v1-progress"><div><strong>トレーニング進捗</strong><span id="artnavProgressCount">0 / ' + questions.length + '</span></div>' +
            '<div id="artnavProgressDots" class="artnav-v1-progress-dots" aria-label="練習済みの音"></div></div>' +
          '</section></div>' +
          '<p class="artnav-v1-footnote">※音声認識は言葉を文字にする補助機能です。舌や唇の実際の動き、発音の正確さを医学的に判定するものではありません。<br>' +
          escapeHtml(group.note) + '<br>問題は6種類の構音から5問をランダムに出題します。構音の種類を自分で選ぶ操作はありません。</p>';
    area.appendChild(panel);
    renderFoundationVoiceTest(q);
    var voicePanel = area.querySelector(".foundation-voice-panel");
    var slot = panel.querySelector(".artnav-v1-voice-slot");
    if (voicePanel && slot) slot.appendChild(voicePanel);
    var skip = $("artnavSkipQuestion");
    if (skip) skip.addEventListener("click", function() {
        if (answered) return;
        cancelArticulationAutoNext();
        articulationSkippedIndexes.add(current);
        answered = true;
        if (speechRecognition) { try { speechRecognition.abort(); } catch (_) {} speechRecognition = null; }
        nextQuestion();
    });
    updateArticulationProgressUI();
}
function updateArticulationProgressUI() {
    var count = $("artnavProgressCount");
    var dots = $("artnavProgressDots");
    var completedIndexes = new Set(articulationAttemptedIndexes);
    articulationSkippedIndexes.forEach(function(index) { completedIndexes.add(index); });
    var completed = completedIndexes.size;
    if (count) count.textContent = completed + " / " + questions.length;
    var skip = $("artnavSkipQuestion");
    if (skip) skip.disabled = answered;
    var flow = $("artnavFlowLabel");
    if (flow) flow.textContent = "問題 " + (current + 1) + " / " + questions.length +
        (answered ? "　・　回答を確認しました" : "　・　マイクで回答してください");
    if (dots) {
        dots.innerHTML = questions.map(function(q, index) {
            var state = articulationCorrectIndexes.has(index) ? "is-correct" :
                (articulationSkippedIndexes.has(index) ? "is-skipped" :
                    (articulationAttemptedIndexes.has(index) ? "is-practiced" : ""));
            return '<span class="artnav-v1-dot ' + state + '" aria-label="' + escapeHtml(q.answer) +
                '：' + (state === "is-correct" ? "認識できました" : (state === "is-skipped" ? "スキップ" : (state ? "練習済み" : "未練習"))) + '">' +
                (state === "is-correct" ? "✓" : (state === "is-skipped" ? "－" : (index + 1))) + '</span>';
        }).join("");
    }
}
function updateArticulationNavLive(message, listening) {
    var status = $("articulationNavLiveStatus");
    var panel = document.querySelector(".articulation-nav-real-diagram");
    if (status) status.textContent = message;
    if (panel) panel.classList.toggle("is-listening", !!listening);
}

function renderQuestion() {
    var _a;
    answered = false;
    if (selectedActivity === "repeat") repeatQuestionScored = false;
    var q = questions[current];
    $("progress").textContent = "".concat(current + 1, " / ").concat(questions.length);
    $("score").textContent = "\u6B63\u89E3 ".concat(score);
    $("categoryLabel").textContent = selectedCategory ? selectedCategory.name : (selectedGenre ? selectedGenre.name : "トレーニング");
    $("questionLabel").textContent = q.question || "問題";
    $("speakBtn").textContent = selectedActivity === "aac" ? "🔊 場面を聞く" :
        (selectedActivity === "aiConversation" || selectedActivity === "localAIConversation") ? "🔊 問題を聞く" : "🔊 お手本を聞く";
    $("hintBtn").textContent = selectedActivity === "aac" ? "💡 考え方のヒント" : "💡 ヒント";
    $("promptText").textContent = q.prompt || "";
    $("promptText").classList.toggle("hidden", !q.prompt);
    $("hint").textContent = q.hint || "";
    $("hint").classList.add("hidden");
    $("hintBtn").classList.toggle("hidden", !hintEnabled || !q.hint);
    $("feedback").textContent = "";
    $("feedback").className = "feedback";
    $("nextBtn").classList.add("hidden");
    $("nextBtn").textContent = selectedActivity === "mora" ? "次のモーラ問題へ →" : "次へ →";
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
    if (selectedActivity === "aac") {
        renderAACPractice(q);
    }
    else if (selectedActivity === "kotobaQuestClassic") {
        renderKotobaQuest(q);
    }
    else if (selectedActivity === "voiceRead") {
        renderVoiceReadTest(q);
    }
    else if (selectedActivity === "mora") {
        renderMoraQuestion(q);
    }
    else if (selectedActivity === "articulationNavigator") {
        renderArticulationNavigator(q);
    }
    else if (FOUNDATION_VOICE_ACTIVITIES.has(selectedActivity)) {
        renderFoundationVoiceTest(q);
    }
    else if (selectedActivity === "aiConversation" || selectedActivity === "localAIConversation") {
        if (typeof renderOfflineAIConversation === "function")
            renderOfflineAIConversation(q);
    }
    else if (selectedActivity === "anagram" && q.tokens) {
        renderAnagram(q);
    }
    else {
        renderChoices(q);
    }
    // 音声認識対象の基礎トレーニングは、画面上の「お手本を聞く」から再生します。
    // それ以外は従来どおり自動読み上げします。
    if (voiceEnabled && q.voiceText && selectedActivity !== "aac" && selectedActivity !== "voiceRead" && selectedActivity !== "kotobaQuestClassic" && selectedActivity !== "mora" && !FOUNDATION_VOICE_ACTIVITIES.has(selectedActivity)) {
        setTimeout(function () { return speak(q.voiceText); }, 250);
    }
    scrollPageToTop();
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
    wrap.innerHTML = "\n    <div class=\"ai-test-badge\">\uD83E\uDD16 \u7AEF\u672B\u5185AI\u4F1A\u8A71</div>\n    <div class=\"ai-scene-label\">\u5834\u9762</div>\n    <div id=\"aiScenario\" class=\"ai-scenario\">".concat(escapeHtml(aiConversationState.scenario || q.scene || q.prompt || "AIが会話問題を作ります"), "</div>\n    <div class=\"ai-goal-box\">\n      <strong>\u4ECA\u65E5\u306E\u76EE\u6A19</strong>\n      <div id=\"aiGoal\">").concat(escapeHtml(aiConversationState.goal || "会話相手の言葉を聞いて、自分の言葉で返してみましょう。"), "</div>\n    </div>\n    <div class=\"ai-partner-title\">\uD83D\uDCAC \u4F1A\u8A71\u30C1\u30E3\u30C3\u30C8</div>\n    <div id=\"localAiChatLog\" class=\"local-ai-chat-log\" aria-live=\"polite\"><div class=\"local-ai-chat-message assistant\"><span>AI</span><p>").concat(isFirst ? "AIが会話問題を作っています…" : escapeHtml(aiConversationState.partnerMessage), "</p></div></div>\n    <div id=\"aiHintBox\" class=\"ai-hint-box\">").concat(escapeHtml(q.hint || "短い言葉でも大丈夫です。"), "</div>\n    <label class=\"ai-response-label\" for=\"aiResponseInput\">\u3042\u306A\u305F\u306E\u8FD4\u4E8B</label>\n    <textarea id=\"aiResponseInput\" class=\"ai-response-input\" rows=\"3\" placeholder=\"\u3053\u3053\u306B\u8FD4\u4E8B\u3092\u5165\u529B\u3067\u304D\u307E\u3059\u3002\u30DE\u30A4\u30AF\u3067\u8A71\u3059\u3053\u3068\u3082\u3067\u304D\u307E\u3059\u3002\"></textarea>\n    <div class=\"ai-response-buttons\">\n      <button type=\"button\" id=\"aiMicBtn\" class=\"voice-mic-check-btn\">\uD83C\uDFA4 \u30DE\u30A4\u30AF\u3067\u8A71\u3059</button>\n      <button type=\"button\" id=\"aiSpeakPartnerBtn\" class=\"voice-example-btn\">\uD83D\uDD0A \u76F8\u624B\u306E\u8A00\u8449\u3092\u8AAD\u3080</button>\n      <button type=\"button\" id=\"aiSendBtn\" class=\"voice-start-btn\">\u9001\u4FE1\u3059\u308B</button>\n    </div>\n    <div id=\"aiStatus\" class=\"voice-test-status\">").concat(isFirst ? "AIが問題を準備しています…" : "返事を入力して「送信する」を押してください。", "</div>\n    <div id=\"aiFeedback\" class=\"ai-feedback\"></div>\n    <button type=\"button\" id=\"aiRegenerateBtn\" class=\"voice-example-btn\">\uD83D\uDD04 \u65B0\u3057\u3044\u4F1A\u8A71\u3092\u81EA\u52D5\u751F\u6210</button>\n    <div class=\"ai-note\">\u203B\u3053\u308C\u306FOpenAI API\u3092\u4F7F\u308F\u306A\u3044\u7591\u4F3CAI\u3067\u3059\u3002\u3042\u3089\u304B\u3058\u3081\u7528\u610F\u3057\u305F\u5834\u9762\u30FB\u8A00\u8449\u3092\u7D44\u307F\u5408\u308F\u305B\u3066\u6BCE\u56DE\u9055\u3046\u4F1A\u8A71\u3092\u81EA\u52D5\u751F\u6210\u3057\u307E\u3059\u3002\u533B\u5B66\u7684\u306A\u8A55\u4FA1\u30FB\u8A3A\u65AD\u3067\u306F\u3042\u308A\u307E\u305B\u3093\u3002\u500B\u4EBA\u60C5\u5831\u306F\u5165\u529B\u3057\u306A\u3044\u3067\u304F\u3060\u3055\u3044\u3002</div>\n  ");
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
var AI_CONVERSATION_SCENARIOS = {
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
function aiRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function createAIConversationScenario(seed) {
    var keys = Object.keys(AI_CONVERSATION_SCENARIOS);
    var key = (seed === null || seed === void 0 ? void 0 : seed.scenarioKey) && AI_CONVERSATION_SCENARIOS[seed.scenarioKey] ? seed.scenarioKey : aiRandomItem(keys);
    var bank = AI_CONVERSATION_SCENARIOS[key];
    var goal = aiRandomItem(bank.goals);
    var role = aiRandomItem(bank.roles);
    var opener = aiRandomItem(bank.openers);
    return {
        scenarioKey: key,
        scenario: bank.label,
        goal: "".concat(goal, "\u3002\u76F8\u624B\u306F").concat(role, "\u3067\u3059\u3002"),
        partnerMessage: opener,
        history: [{ role: "assistant", content: opener }]
    };
}
// V90: インターネットからモデルを取得しない会話エンジン（LLMではありません）。
var kotobaAiBusy = false;
var kotobaOfflineState = null;
function aiAddChatMessage(role, content) {
    var log = $("localAiChatLog");
    if (!log) return null;
    var bubble = document.createElement("div");
    bubble.className = "local-ai-chat-message " + (role === "user" ? "user" : "assistant");
    var label = document.createElement("span");
    label.textContent = role === "user" ? "あなた" : "会話パートナー";
    var paragraph = document.createElement("p");
    paragraph.textContent = content || "";
    bubble.appendChild(label);
    bubble.appendChild(paragraph);
    log.appendChild(bubble);
    log.scrollTop = log.scrollHeight;
    return paragraph;
}
function aiSetStatus(message, kind) {
    var node = $("aiStatus");
    if (!node) return;
    node.textContent = message;
    node.dataset.state = kind || "info";
}
function aiBeginLocalSession(sceneKey) {
    var engine = window.KotobaOfflineConversation;
    if (!engine) { aiSetStatus("会話エンジンを読み込めませんでした。", "error"); return; }
    var session = engine.newSession(sceneKey);
    kotobaOfflineState = session.state;
    aiConversationState.scenario = session.scenario;
    aiConversationState.goal = "" + session.role + "と、自分の言葉で会話してみましょう。";
    aiConversationState.partnerMessage = session.opening;
    aiConversationState.history = [{ role: "assistant", content: session.opening }];
    aiConversationState.initialized = true;
    aiConversationState.waiting = false;
    aiConversationState.turnCount = 0;
    if ($("aiScenario")) $("aiScenario").textContent = session.scenario;
    if ($("aiGoal")) $("aiGoal").textContent = aiConversationState.goal;
    if ($("localAiChatLog")) $("localAiChatLog").textContent = "";
    aiAddChatMessage("assistant", session.opening);
    if ($("aiFeedback")) $("aiFeedback").textContent = "";
    if ($("aiResponseInput")) $("aiResponseInput").value = "";
    if ($("aiPartnerMessage")) $("aiPartnerMessage").textContent = session.opening;
    aiSetStatus("会話を始められます。文字入力は通信不要です。");
}
function renderOfflineAIConversation(q) {
    var area = $("answerArea");
    if (!area) return;
    if (aiInputRecognition) { try { aiInputRecognition.abort(); } catch (_) {} aiInputRecognition = null; }
    var wrap = document.createElement("div");
    wrap.className = "ai-conversation-panel";
    wrap.innerHTML = `
      <div class="ai-test-badge">💬 端末内会話（通信不要）</div>
      <label class="ai-response-label" for="aiLocalSceneSelect">会話の場面を選ぶ</label>
      <select id="aiLocalSceneSelect" class="ai-response-input" style="min-height:48px; padding:10px"></select>
      <div class="ai-scene-label">会話のテーマ</div>
      <div id="aiScenario" class="ai-scenario"></div>
      <div class="ai-goal-box"><strong>今日の目標</strong><div id="aiGoal"></div></div>
      <div class="ai-partner-title">💬 会話チャット</div>
      <div id="aiPartnerMessage" style="display:none"></div>
      <div id="localAiChatLog" class="local-ai-chat-log" aria-live="polite"></div>
      <div id="aiHintBox" class="ai-hint-box">自由に話しかけられます。場面練習をしたいときは、上のメニューから選んでください。</div>
      <label class="ai-response-label" for="aiResponseInput">あなたの返事</label>
      <textarea id="aiResponseInput" class="ai-response-input" rows="3" maxlength="500" placeholder="ここに返事を入力してください。通信なしで動きます。"></textarea>
      <div class="ai-response-buttons">
        <button type="button" id="aiSpeakPartnerBtn" class="voice-example-btn">🔊 相手の言葉を読む</button>
        <button type="button" id="aiSendBtn" class="voice-start-btn">送信する</button>
      </div>
      <div id="aiStatus" class="voice-test-status">通信なしで会話できます。</div>
      <div id="aiFeedback" class="ai-feedback"></div>
      <button type="button" id="aiRegenerateBtn" class="voice-example-btn">🔄 新しい会話を始める</button>
      <div class="ai-note">この会話は端末内のルールと文脈を使う軽量エンジンです。生成型の大規模言語モデル（LLM）ではありません。外部モデルのダウンロード、APIキー、WebGPU、インターネット接続は不要です。医学的な診断はできません。</div>
    `;
    area.appendChild(wrap);
    var select = $("aiLocalSceneSelect");
    var engine = window.KotobaOfflineConversation;
    if (!engine) { aiSetStatus("オフライン会話ファイルが見つかりません。", "error"); return; }
    Object.keys(engine.scenes).forEach(function (key) {
        var opt = document.createElement("option"); opt.value = key;
        opt.textContent = engine.scenes[key].name; select.appendChild(opt);
    });
    var sceneKey = q && q.scenarioKey && engine.scenes[q.scenarioKey] ? q.scenarioKey : "free";
    select.value = sceneKey;
    aiBeginLocalSession(sceneKey);
    select.addEventListener("change", function () { aiBeginLocalSession(select.value); });
    $("aiSpeakPartnerBtn").addEventListener("click", function () { speak(aiConversationState.partnerMessage || ""); });
    $("aiSendBtn").addEventListener("click", submitOfflineAIConversation);
    $("aiResponseInput").addEventListener("keydown", function (event) {
        if (event.key === "Enter" && !event.shiftKey && !event.isComposing && event.keyCode !== 229) {
            event.preventDefault(); submitOfflineAIConversation();
        }
    });
    $("aiRegenerateBtn").addEventListener("click", function () { aiBeginLocalSession(select.value); });
    // 自動読み上げは端末のTTS設定に依存。文字会話自体は完全オフライン。
}
function submitOfflineAIConversation() {
    if (kotobaAiBusy) return;
    if (!aiConversationState.initialized || !kotobaOfflineState) { aiSetStatus("会話の開始に失敗しました。『新しい会話を始める』を押してください。", "error"); return; }
    var input = $("aiResponseInput");
    var userText = String(input && input.value || "").trim();
    if (!userText) { aiSetStatus("短い返事でも大丈夫です。入力して送信してください。", "error"); return; }
    kotobaAiBusy = true;
    var sendButton = $("aiSendBtn");
    if (sendButton) sendButton.disabled = true;
    try {
        var result = window.KotobaOfflineConversation.respond(kotobaOfflineState, userText);
        input.value = "";
        aiAddChatMessage("user", userText);
        aiAddChatMessage("assistant", result.reply);
        aiConversationState.partnerMessage = result.reply;
        aiConversationState.history.push({role:"user",content:userText},{role:"assistant",content:result.reply});
        aiConversationState.turnCount++;
        if ($("aiPartnerMessage")) $("aiPartnerMessage").textContent = result.reply;
        if ($("aiFeedback")) $("aiFeedback").textContent = "自分の言葉で会話を続けられました。";
        aiSetStatus("端末内で返事を作成しました。インターネット通信は使っていません。");
    } catch (error) {
        aiSetStatus("会話エンジンで問題が発生しました。新しい会話を始めてください。", "error");
        console.error("Offline conversation error", error);
    } finally { kotobaAiBusy = false; if (sendButton) sendButton.disabled = false; }
}
function submitAIConversation() {
    // 旧UI互換：生成AIチャットへ統一
    submitOfflineAIConversation();
}
function startAIInputRecognition() {
    return __awaiter(this, void 0, void 0, function () {
        var Recognition, btn, error_1, recognition, finalText;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Recognition = getSpeechRecognitionClass();
                    if (!Recognition) {
                        showAIStatus("このブラウザは音声認識に対応していない可能性があります。最新のChromeまたは対応するSafari・Edgeでお試しください。", "error");
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
    return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}
// 音声認識は同じ言葉でも「りんご／林檎」「さくら／桜」のように表記が変わるため、
// 代表的な読みをひらがなへ寄せてから比較します。診断ではなく練習用の寛容な照合です。
var JAPANESE_SPEECH_READING_ALIASES = [
    ["車椅子", "くるまいす"], ["向日葵", "ひまわり"], ["日本語", "にほんご"], ["日本人", "にほんじん"], ["日本", "にほん"],
    ["おはようございます", "おはようございます"], ["林檎", "りんご"], ["苹果", "りんご"],
    ["明後日", "あさって"], ["一昨日", "おととい"], ["買い物", "かいもの"],
    ["お早う", "おはよう"], ["ありがとう御座います", "ありがとうございます"],
    ["食べました", "たべました"], ["食べます", "たべます"], ["食べて", "たべて"], ["食べる", "たべる"], ["食べ", "たべ"],
    ["飲みました", "のみました"], ["飲みます", "のみます"], ["飲んで", "のんで"], ["飲む", "のむ"], ["飲み", "のみ"],
    ["行きました", "いきました"], ["行きます", "いきます"], ["行って", "いって"], ["行く", "いく"], ["行き", "いき"],
    ["来ました", "きました"], ["来ます", "きます"], ["来て", "きて"], ["来る", "くる"],
    ["買いました", "かいました"], ["買います", "かいます"], ["買って", "かって"], ["買う", "かう"],
    ["読みました", "よみました"], ["読みます", "よみます"], ["読んで", "よんで"], ["読む", "よむ"],
    ["書きました", "かきました"], ["書きます", "かきます"], ["書いて", "かいて"], ["書く", "かく"],
    ["咲いて", "さいて"], ["咲きます", "さきます"], ["咲く", "さく"],
    ["見ました", "みました"], ["見ます", "みます"], ["見て", "みて"], ["見る", "みる"],
    ["話しました", "はなしました"], ["話します", "はなします"], ["話す", "はなす"],
    ["聞きました", "ききました"], ["聞きます", "ききます"], ["聞く", "きく"],
    ["お昼", "おひる"], ["今朝", "けさ"], ["今晩", "こんばん"], ["今日", "きょう"], ["昨日", "きのう"], ["明日", "あした"],
    ["学校", "がっこう"], ["友達", "ともだち"], ["先生", "せんせい"], ["名前", "なまえ"], ["病院", "びょういん"], ["電話", "でんわ"],
    ["新聞", "しんぶん"], ["電車", "でんしゃ"], ["時計", "とけい"], ["向こう", "むこう"], ["大人", "おとな"], ["子供", "こども"], ["子ども", "こども"],
    ["桜", "さくら"], ["薔薇", "ばら"], ["紫陽花", "あじさい"], ["菖蒲", "しょうぶ"], ["林", "はやし"],
    ["玉子", "たまご"], ["机", "つくえ"], ["椅子", "いす"], ["果物", "くだもの"], ["野菜", "やさい"],
    ["朝ご飯", "あさごはん"], ["昼ご飯", "ひるごはん"], ["晩ご飯", "ばんごはん"], ["朝食", "ちょうしょく"], ["昼食", "ちゅうしょく"], ["夕食", "ゆうしょく"],
    ["土曜日", "どようび"], ["日曜日", "にちようび"], ["月曜日", "げつようび"], ["火曜日", "かようび"], ["水曜日", "すいようび"], ["木曜日", "もくようび"], ["金曜日", "きんようび"],
    ["毎日", "まいにち"], ["週末", "しゅうまつ"], ["天気", "てんき"], ["元気", "げんき"], ["仕事", "しごと"], ["休み", "やすみ"], ["掃除", "そうじ"], ["洗濯", "せんたく"], ["料理", "りょうり"], ["旅行", "りょこう"], ["散歩", "さんぽ"],
    ["運動", "うんどう"], ["勉強", "べんきょう"], ["練習", "れんしゅう"], ["図書館", "としょかん"], ["公園", "こうえん"], ["写真", "しゃしん"], ["手紙", "てがみ"], ["薬", "くすり"], ["住所", "じゅうしょ"], ["病気", "びょうき"], ["食事", "しょくじ"], ["一緒", "いっしょ"], ["一人", "ひとり"], ["開店", "かいてん"],
    ["良い", "よい"], ["悪い", "わるい"], ["美味しい", "おいしい"], ["楽しい", "たのしい"], ["嬉しい", "うれしい"], ["難しい", "むずかしい"], ["優しい", "やさしい"],
    ["出来ました", "できました"], ["出来た", "できた"], ["出来る", "できる"], ["出来ます", "できます"],
    // 一語だけでなく、助詞と組み合わさった一般的な表記も読みへ寄せます。
    ["向日葵が", "ひまわりが"], ["向日葵は", "ひまわりは"],
    ["猫が", "ねこが"], ["猫は", "ねこは"], ["猫を", "ねこを"], ["猫と", "ねこと"],
    ["犬が", "いぬが"], ["犬は", "いぬは"], ["犬を", "いぬを"], ["犬と", "いぬと"],
    ["傘が", "かさが"], ["傘は", "かさは"], ["傘を", "かさを"], ["傘で", "かさで"],
    ["靴が", "くつが"], ["靴は", "くつは"], ["靴を", "くつを"],
    ["鞄が", "かばんが"], ["鞄は", "かばんは"], ["鞄を", "かばんを"],
    ["卵が", "たまごが"], ["卵は", "たまごは"], ["卵を", "たまごを"], ["玉子を", "たまごを"],
    ["本が", "ほんが"], ["本は", "ほんは"], ["本を", "ほんを"], ["本に", "ほんに"], ["本で", "ほんで"],
    ["花が", "はなが"], ["花は", "はなは"], ["花を", "はなを"], ["花に", "はなに"],
    ["星が", "ほしが"], ["星は", "ほしは"], ["星を", "ほしを"],
    ["海が", "うみが"], ["海は", "うみは"], ["海に", "うみに"], ["海で", "うみで"],
    ["山が", "やまが"], ["山は", "やまは"], ["山に", "やまに"], ["山へ", "やまへ"], ["山で", "やまで"],
    ["雨が", "あめが"], ["雨は", "あめは"], ["雨に", "あめに"],
    ["水が", "みずが"], ["水は", "みずは"], ["水を", "みずを"], ["水に", "みずに"],
    ["車が", "くるまが"], ["車は", "くるまは"], ["車を", "くるまを"], ["車で", "くるまで"], ["車に", "くるまに"],
    ["太陽が", "たいようが"], ["太陽は", "たいようは"], ["太陽を", "たいようを"],
    ["朝は", "あさは"], ["朝に", "あさに"], ["昼は", "ひるは"], ["昼に", "ひるに"], ["夜は", "よるは"], ["夜に", "よるに"],
    ["降っています", "ふっています"], ["降って", "ふって"], ["降る", "ふる"], ["登ります", "のぼります"], ["登る", "のぼる"],
    // 発音トレーニングで表示される文や、同音の漢字変換に対応します。
    ["今日は晴れです", "きょうははれです"], ["今日は晴れ", "きょうははれ"], ["晴れです", "はれです"], ["晴れ", "はれ"],
    ["手を洗います", "てをあらいます"], ["手を洗う", "てをあらう"], ["手を", "てを"], ["洗います", "あらいます"], ["洗う", "あらう"],
    ["お昼を食べます", "おひるをたべます"], ["りんごを食べます", "りんごをたべます"],
    ["コーヒー下さい", "こーひーください"], ["下さい", "ください"],
    ["ありがとう御座います", "ありがとうございます"], ["有難うございます", "ありがとうございます"], ["有り難うございます", "ありがとうございます"], ["有難う", "ありがとう"], ["有り難う", "ありがとう"],
    ["橋", "はし"], ["箸", "はし"], ["端", "はし"], ["耳", "みみ"], ["口", "くち"], ["目", "め"], ["足", "あし"], ["顔", "かお"], ["道", "みち"]
].sort(function (a, b) { return b[0].length - a[0].length; });
var JAPANESE_SPEECH_WHOLE_WORD_READINGS = {
    "傘":"かさ", "猫":"ねこ", "犬":"いぬ", "靴":"くつ", "鞄":"かばん", "卵":"たまご", "玉子":"たまご",
    "本":"ほん", "花":"はな", "星":"ほし", "海":"うみ", "山":"やま", "雨":"あめ", "水":"みず", "車":"くるま",
    "朝":"あさ", "昼":"ひる", "夜":"よる", "林":"はやし"
};
function normalizeSpeechText(text) {
    var normalized = String(text || "")
        .normalize("NFKC")
        .replace(/[ァ-ヶ]/g, function (ch) { return String.fromCharCode(ch.charCodeAt(0) - 0x60); });
    var compactOriginal = normalized.replace(/[\s、。,.・!?！？「」『』（）()［］\[\]【】]/g, "").toLowerCase();
    if (JAPANESE_SPEECH_WHOLE_WORD_READINGS[compactOriginal]) return JAPANESE_SPEECH_WHOLE_WORD_READINGS[compactOriginal];
    JAPANESE_SPEECH_READING_ALIASES.forEach(function (pair) {
        normalized = normalized.split(pair[0]).join(pair[1]);
    });
    var compact = normalized.replace(/[\s、。,.・!?！？「」『』（）()［］\[\]【】]/g, "").toLowerCase();
    return JAPANESE_SPEECH_WHOLE_WORD_READINGS[compact] || compact;
}
// 発音トレーニング側も同じ読み正規化を使い、漢字・ひらがな表記の違いで誤判定しないようにします。
window.normalizeSpeechTextForTraining = normalizeSpeechText;
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
    var secure = !!window.isSecureContext || !!window.AndroidSpeech;
    var mediaOk = !!(window.AndroidSpeech || (navigator.mediaDevices && navigator.mediaDevices.getUserMedia));
    var inFrame = window.top !== window.self;
    return { Recognition: Recognition, secure: secure, mediaOk: mediaOk, inFrame: inFrame };
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
            if (window.AndroidSpeech && typeof window.AndroidSpeech.start === "function") {
                try {
                    if (typeof window.AndroidSpeech.hasMicrophonePermission === "function" && window.AndroidSpeech.hasMicrophonePermission()) {
                        microphonePermissionGranted = true;
                        return [2 /*return*/, true];
                    }
                } catch (_) { }
                // Android: share one outstanding permission request. If Android
                // is backgrounded and no callback arrives, do not lock the UI forever.
                if (microphonePermissionCheckPromise)
                    return [2 /*return*/, microphonePermissionCheckPromise];
                var nativePermissionRequest = new Promise(function (resolve, reject) {
                    var settled = false;
                    var timeoutId = null;
                    var callback = function (granted) {
                        if (settled) return;
                        settled = true;
                        window.clearTimeout(timeoutId);
                        microphonePermissionGranted = !!granted;
                        if (window.__nativeMicPermissionCallback === callback) window.__nativeMicPermissionCallback = null;
                        if (granted) resolve(true);
                        else { var err = new Error("Android microphone permission denied"); err.name = "NotAllowedError"; reject(err); }
                    };
                    window.__nativeMicPermissionCallback = callback;
                    timeoutId = window.setTimeout(function () {
                        if (settled) return;
                        settled = true;
                        if (window.__nativeMicPermissionCallback === callback) window.__nativeMicPermissionCallback = null;
                        var err = new Error("Android microphone permission request timed out");
                        err.name = "TimeoutError";
                        reject(err);
                    }, 60000);
                    try { window.AndroidSpeech.requestMicrophonePermission(); }
                    catch (error) {
                        settled = true;
                        window.clearTimeout(timeoutId);
                        if (window.__nativeMicPermissionCallback === callback) window.__nativeMicPermissionCallback = null;
                        reject(error);
                    }
                });
                microphonePermissionCheckPromise = nativePermissionRequest;
                return [2 /*return*/, nativePermissionRequest.finally(function () {
                    if (microphonePermissionCheckPromise === nativePermissionRequest) microphonePermissionCheckPromise = null;
                })];
            }
            if (!d.secure)
                throw new Error("INSECURE_CONTEXT");
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
                    secure = !!window.isSecureContext || !!window.AndroidSpeech;
                    inFrame = window.top !== window.self;
                    if (detail)
                        detail.textContent = "確認しています…";
                    showVoiceTestStatus(microphonePermissionGranted ? "マイク許可は確認済みです…" : "最初の1回だけマイクを確認しています…", "listening");
                    results = [];
                    results.push("\u97F3\u58F0\u8A8D\u8B58\uFF1A".concat(Recognition ? "対応" : "未対応"));
                    results.push("\u30DE\u30A4\u30AFAPI\uFF1A".concat(window.AndroidSpeech ? "Androidネイティブ" : (((_a = navigator.mediaDevices) === null || _a === void 0 ? void 0 : _a.getUserMedia) ? "対応" : "未対応")));
                    results.push("\u5B89\u5168\u306A\u63A5\u7D9A\uFF1A".concat(secure ? "OK" : "NG"));
                    if (inFrame)
                        results.push("埋め込み表示：あり");
                    if (!secure) {
                        showVoiceTestStatus("このページは安全な接続ではないため、マイクを使えません。HTTPSまたはlocalhostで開いてください。", "error");
                        if (detail)
                            detail.textContent = results.join("／");
                        return [2 /*return*/, false];
                    }
                    if (!Recognition) {
                        showVoiceTestStatus("このブラウザは音声認識に対応していません。最新のChromeまたは対応するSafari・Edgeでお試しください。", "error");
                        if (detail)
                            detail.textContent = results.join("／");
                        return [2 /*return*/, false];
                    }
                    if (!window.AndroidSpeech && !((_f = navigator.mediaDevices) === null || _f === void 0 ? void 0 : _f.getUserMedia)) {
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
                    return [4 /*yield*/, (window.AndroidSpeech ? Promise.resolve([{ kind: "audioinput", label: "Androidマイク" }]) : navigator.mediaDevices.enumerateDevices())];
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
    if (activity === "articulationNavigator") {
        target = q.voiceText || q.answer || "";
        accept = [String(target).replace(/[、。・\s]/g, ""), String(q.answer || "")];
    }
    else if (activity === "repeat") {
        target = q.voiceText || q.prompt || q.answer || "";
        accept = [target, target.replace(/[、。]/g, ""), target.replace(/[、。]/g, " ")];
    }
    else if (activity === "mouth") {
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
// Androidの短い音（「あ」「ぱ」等）は、長音や複数の認識候補が出やすい。
// 1文字の音では部分一致を禁止し、「あ」が「ありがとう」に紛れても正解にしない。
function articulationSpeechMatch(practice, alternatives) {
    var targets = [practice.target].concat(practice.accept || []).map(normalizeSpeechText).filter(Boolean);
    var best = { matched: false, similarity: 0, transcript: (alternatives[0] || "") };
    alternatives.forEach(function(text) {
        var received = normalizeSpeechText(text).replace(/[ー〜～]+$/g, "");
        targets.forEach(function(target) {
            var sounds = received.replace(/([ぁ-ん])\1+$/g, "$1");
            var isShort = target.length <= 2;
            var matched = received === target || sounds === target ||
                (target.length === 1 && (received === target + target || received === target + target + target));
            var score = matched ? 1 : (function() {
                var max = Math.max(target.length, received.length);
                return max ? Math.max(0, 1 - levenshtein(target, received) / max) : 0;
            })();
            if (!isShort && !matched) {
                // 「あいうえお」に対して「あ」だけで正解にならないよう部分一致を使わない。
                matched = received.length >= Math.ceil(target.length * 0.75) && score >= 0.85;
            }
            if (matched || score > best.similarity) {
                best = { matched: matched, similarity: score, transcript: text };
            }
        });
    });
    return best;
}
function renderFoundationVoiceTest(q) {
    var _this = this;
    var _a, _b, _c, _d;
    // 問題切替時に、進行中のお手本再生・自動マイク開始を必ず無効化します。
    chorusFlowToken++;
    chorusListeningAfterExample = false;
    if (window.speechSynthesis) { try { window.speechSynthesis.cancel(); } catch (_) {} }
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
        articulationNavigator: q.navTitle || "構音筋ビジュアルナビゲーション",
        mouth: "口・発声ウォームアップ",
        sound: "発音の練習",
        stepup: "単語→短文",
        mora: "拍・モーラ",
        accent: "アクセント",
        sentenceRhythm: "文章リズム",
        repeat: "復唱・唱和（マイク対応）"
    };
    var guides = {
        articulationNavigator: "図のポイントを確認し、お手本のあとに同じ音を声に出してみましょう。認識結果は練習の目安です。",
        mouth: q.answer === "できた"
            ? "口の練習をしたあと、「できた」と声に出してください。"
            : "お手本を聞いて、同じように声に出してみましょう。",
        sound: "答えだと思う言葉を、声に出して言ってみましょう。",
        stepup: "単語から短い文章まで、ゆっくり声に出してみましょう。",
        mora: "答えの拍数を、声に出して答えてみましょう。",
        accent: "言葉のアクセントを意識して、声に出してみましょう。",
        sentenceRhythm: "意味のまとまりを意識して、ゆっくり読んでみましょう。",
        repeat: "「復唱」はお手本のあとに繰り返し、「唱和」はお手本が終わるとマイクが自動で始まります。声を確認しましょう。"
    };
    var wrap = document.createElement("div");
    wrap.className = "voice-read-accessible-panel foundation-voice-panel";
    wrap.innerHTML = "\n    <div class=\"voice-read-progress\" aria-label=\"\u57FA\u790E\u30C8\u30EC\u30FC\u30CB\u30F3\u30B0\u306E\u6D41\u308C\">\n      <div class=\"voice-read-step active\"><span>1</span><strong>\u898B\u308B</strong></div>\n      <div class=\"voice-read-arrow\">\u2192</div>\n      <div class=\"voice-read-step\"><span>2</span><strong>\u805E\u304F</strong></div>\n      <div class=\"voice-read-arrow\">\u2192</div>\n      <div class=\"voice-read-step\"><span>3</span><strong>\u8A71\u3059</strong></div>\n      <div class=\"voice-read-arrow\">\u2192</div>\n      <div class=\"voice-read-step\"><span>4</span><strong>\u78BA\u8A8D</strong></div>\n    </div>\n\n    <div class=\"voice-read-action-card foundation-intro-card\">\n      <div class=\"voice-read-action-head\">\n        <span class=\"voice-read-action-number\">1</span>\n        <div>\n          <strong>".concat(escapeHtml(titles[selectedActivity] || "基礎トレーニング"), "</strong>\n          <small>").concat(escapeHtml(guides[selectedActivity] || "お手本を聞いて、声に出してみましょう。"), "</small>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"voice-read-visual-card\">\n      <div class=\"voice-read-word-box foundation-word-box\">\n        <div class=\"voice-read-small-label\">\u58F0\u306B\u51FA\u3059\u7B54\u3048</div>\n        <div id=\"voiceReadTarget\" class=\"voice-read-target\">").concat(escapeHtml(target), "</div>\n        <div class=\"voice-read-easy-message\">\u3086\u3063\u304F\u308A\u3067\u5927\u4E08\u592B\u3067\u3059</div>\n      </div>\n    </div>\n\n    <div class=\"voice-read-action-card\">\n      <div class=\"voice-read-action-head\">\n        <span class=\"voice-read-action-number\">2</span>\n        <div><strong>\u304A\u624B\u672C\u3092\u805E\u304F</strong><small>\u4F55\u5EA6\u805E\u3044\u3066\u3082\u5927\u4E08\u592B\u3067\u3059</small></div>\n      </div>\n      <button type=\"button\" id=\"voiceReadExampleBtn\" class=\"voice-read-example-btn\">\uD83D\uDD0A \u304A\u624B\u672C\u3092\u805E\u304F</button>\n    </div>\n\n    <div class=\"voice-read-action-card mic-card\">\n      <div class=\"voice-read-action-head\">\n        <span class=\"voice-read-action-number\">3</span>\n        <div><strong>\u81EA\u5206\u306E\u58F0\u3067\u7B54\u3048\u308B</strong><small>\u30DE\u30A4\u30AF\u3092\u62BC\u3057\u3066\u8A71\u3057\u3066\u304F\u3060\u3055\u3044</small></div>\n      </div>\n      <div class=\"voice-read-mic-area\">\n        <button type=\"button\" id=\"voiceStartBtn\" class=\"voice-read-mic-button\">\n          <span class=\"voice-read-mic-icon\">\uD83C\uDFA4</span>\n          <span class=\"voice-read-mic-main\">\u30DE\u30A4\u30AF\u3067\u8A71\u3059</span>\n          <span class=\"voice-read-mic-sub\">\u3053\u3053\u3092\u62BC\u3057\u3066\u30B9\u30BF\u30FC\u30C8</span>\n        </button>\n        <button type=\"button\" id=\"voiceMicCheckBtn\" class=\"voice-read-check-button\">\uD83C\uDFA7 \u30DE\u30A4\u30AF\u3092\u78BA\u8A8D</button>\n      </div>\n      <div id=\"voiceTestStatus\" class=\"voice-read-status\" aria-live=\"polite\">\n        \u300C\u30DE\u30A4\u30AF\u3067\u8A71\u3059\u300D\u3092\u62BC\u3057\u3066\u3001\u7B54\u3048\u3092\u58F0\u306B\u51FA\u3057\u3066\u304F\u3060\u3055\u3044\u3002\n      </div>\n      <div id=\"voiceMicDetail\" class=\"voice-read-mic-detail\"></div>\n    </div>\n\n    <div class=\"voice-read-result-card\">\n      <div class=\"voice-read-action-head\">\n        <span class=\"voice-read-action-number\">4</span>\n        <div><strong>\u8A8D\u8B58\u3057\u305F\u8A00\u8449</strong><small>\u30DE\u30A4\u30AF\u304C\u805E\u304D\u53D6\u3063\u305F\u5185\u5BB9\u3067\u3059</small></div>\n      </div>\n      <div id=\"voiceTranscript\" class=\"voice-read-transcript\" aria-live=\"polite\">\u307E\u3060\u3042\u308A\u307E\u305B\u3093</div>\n      <div id=\"voiceReadJudgement\" class=\"voice-read-judgement\">\u3053\u3053\u306B\u5224\u5B9A\u304C\u8868\u793A\u3055\u308C\u307E\u3059</div>\n    </div>\n\n    <div class=\"voice-read-support\">\n      <span>\uD83D\uDCA1</span>\n      <div>\n        <strong>\u3046\u307E\u304F\u8A00\u3048\u306A\u304F\u3066\u3082\u5927\u4E08\u592B</strong><br>\n        \u3086\u3063\u304F\u308A\u3001\u3082\u3046\u4E00\u5EA6\u8A71\u3057\u3066\u307F\u307E\u3057\u3087\u3046\u3002\n      </div>\n    </div>\n  ");
    area.appendChild(wrap);
    if (selectedActivity === "repeat") {
        var repeatModeCard = '<div class="repeat-mode-card"><div class="repeat-mode-title">練習方法</div><div class="repeat-mode-options" role="group" aria-label="復唱・唱和の選択"><button type="button" id="repeatModeRepeatBtn" class="repeat-mode-option active" aria-pressed="true">復唱</button><button type="button" id="repeatModeChorusBtn" class="repeat-mode-option" aria-pressed="false">唱和</button></div><p id="repeatModeDescription" class="repeat-mode-description">お手本を聞いたあと、同じ言葉をくり返して話します。</p><p class="repeat-mode-tip">唱和は「お手本を再生→終了後にマイク開始」の順番です。自動音声とあなたの声が重ならないようにします。</p></div>';
        var visualCard = wrap.querySelector(".voice-read-visual-card");
        if (visualCard) visualCard.insertAdjacentHTML("beforebegin", repeatModeCard);
        var repeatBtn = $("repeatModeRepeatBtn");
        var chorusBtn = $("repeatModeChorusBtn");
        var modeDescription = $("repeatModeDescription");
        var micMain = wrap.querySelector("#voiceStartBtn .voice-read-mic-main");
        var micSub = wrap.querySelector("#voiceStartBtn .voice-read-mic-sub");
        var micHeading = wrap.querySelector(".mic-card .voice-read-action-head strong");
        var micHeadingSub = wrap.querySelector(".mic-card .voice-read-action-head small");
        var sampleButton = $("voiceReadExampleBtn");
        function setRepeatMode(mode) {
            repeatPracticeMode = mode;
            if (repeatBtn) { repeatBtn.classList.toggle("active", mode === "repeat"); repeatBtn.setAttribute("aria-pressed", mode === "repeat" ? "true" : "false"); }
            if (chorusBtn) { chorusBtn.classList.toggle("active", mode === "chorus"); chorusBtn.setAttribute("aria-pressed", mode === "chorus" ? "true" : "false"); }
            chorusFlowToken++;
            chorusListeningAfterExample = false;
            if (speechRecognition) { try { speechRecognition.abort(); } catch (_) {} speechRecognition = null; }
            voiceRecognitionBusy = false;
            if (window.speechSynthesis) { try { window.speechSynthesis.cancel(); } catch (_) {} }
            if (modeDescription) modeDescription.textContent = mode === "chorus" ? "お手本を先に再生し、終わるとマイクが自動で開始します。自動音声とあなたの声を重ねないため、判定が安定しやすくなります。" : "先にお手本を聞き、そのあとマイクを押して同じ言葉を繰り返しましょう。";
            if (micMain) micMain.textContent = mode === "chorus" ? "お手本から唱和を始める" : "マイクで復唱する";
            if (micSub) micSub.textContent = mode === "chorus" ? "音声終了後にマイクが自動開始" : "お手本のあとに繰り返します";
            if (micHeading) micHeading.textContent = mode === "chorus" ? "お手本のあとに続けて話す" : "お手本のあとに復唱する";
            if (micHeadingSub) micHeadingSub.textContent = mode === "chorus" ? "お手本とマイクは同時に動きません" : "お手本を聞いてから、同じ言葉を話します";
            if (sampleButton) sampleButton.textContent = mode === "chorus" ? "🔊 お手本を先に聞く" : "🔊 お手本を聞く";
            var repeatStartButton = $("voiceStartBtn");
            if (repeatStartButton) repeatStartButton.disabled = false;
            showVoiceTestStatus(mode === "chorus" ? "唱和モードです。「お手本から唱和を始める」を押してください。" : "復唱モードです。お手本を聞いてから声に出します。", "");
        }
        if (repeatBtn) repeatBtn.addEventListener("click", function () { setRepeatMode("repeat"); });
        if (chorusBtn) chorusBtn.addEventListener("click", function () { setRepeatMode("chorus"); });
        setRepeatMode(repeatPracticeMode);
    }
    (_b = $("voiceReadExampleBtn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
        markVoiceReadStep(2);
        speak(target);
        if (selectedActivity === "repeat") showVoiceTestStatus(repeatPracticeMode === "chorus" ? "お手本を再生しています。聞き終わったら「お手本から唱和を始める」を押してください。" : "お手本を再生しています。聞き終わったらマイクで復唱してください。", "listening");
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
        startFoundationVoiceRecognition(q, practice, selectedActivity === "repeat" ? repeatPracticeMode : "repeat");
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
function speakPracticeExampleAndWait(text) {
    return new Promise(function (resolve) {
        if (window.AndroidSpeech && typeof window.AndroidSpeech.speak === "function") {
            var nativeText = String(text || "");
            try {
                showVoiceTestStatus("お手本を再生しています。聞いてください…", "listening");
                window.AndroidSpeech.speak(nativeText);
                // Androidブリッジには読み上げ完了イベントがないため、文字数に応じて待機します。
                window.setTimeout(function () { resolve(true); }, Math.min(12000, Math.max(1800, nativeText.length * 260)));
            } catch (_) { resolve(false); }
            return;
        }
        if (!window.speechSynthesis || typeof window.SpeechSynthesisUtterance === "undefined") {
            resolve(false);
            return;
        }
        var settled = false;
        var utterance;
        var timeoutId;
        function finish(ok) {
            if (settled) return;
            settled = true;
            if (timeoutId) window.clearTimeout(timeoutId);
            if (!ok) { try { window.speechSynthesis.cancel(); } catch (_) {} }
            resolve(ok);
        }
        try {
            window.speechSynthesis.cancel();
            utterance = new SpeechSynthesisUtterance(String(text || ""));
            utterance.lang = "ja-JP";
            utterance.rate = 0.86;
            utterance.pitch = 1.0;
            utterance.onstart = function () { showVoiceTestStatus("お手本を再生しています。聞いてください…", "listening"); };
            utterance.onend = function () { finish(true); };
            utterance.onerror = function () { finish(false); };
            timeoutId = window.setTimeout(function () { finish(false); }, Math.min(30000, Math.max(8000, String(text || "").length * 650)));
            window.speechSynthesis.speak(utterance);
        } catch (_) {
            finish(false);
        }
    });
}
async function startChorusThenListen(q, practice) {
    if (voiceRecognitionBusy) return;
    var Recognition = getSpeechRecognitionClass();
    if (!Recognition) {
        showVoiceTestStatus("このブラウザでは音声認識を利用できません。最新のChromeまたは対応ブラウザでお試しください。", "error");
        return;
    }
    if (!window.isSecureContext && !window.AndroidSpeech) {
        showVoiceTestStatus("HTTPSで開いてください。安全な接続でのみマイクを利用できます。", "error");
        return;
    }
    var myToken = ++chorusFlowToken;
    var startBtn = $("voiceStartBtn");
    if (startBtn) {
        startBtn.disabled = true;
        startBtn.innerHTML = '<span class="voice-read-mic-icon">🔊</span><span class="voice-read-mic-main">お手本を再生します</span><span class="voice-read-mic-sub">終わるまでお待ちください</span>';
    }
    showVoiceTestStatus("最初にお手本を再生します。聞き終わるとマイクが自動で開始します。", "listening");
    try {
        await requestMicrophoneAccess();
    } catch (error) {
        if (myToken !== chorusFlowToken) return;
        var code = (error && error.name) || "UNKNOWN";
        var message = code === "NotAllowedError" || code === "SecurityError"
            ? "マイクが許可されていません。ブラウザのサイト設定でマイクを許可してください。"
            : code === "NotFoundError" ? "マイクが見つかりません。接続を確認してください。"
            : "マイクを開始できませんでした。ブラウザのマイク設定を確認してください。";
        showVoiceTestStatus("❌ " + message, "error");
        if (startBtn) { startBtn.disabled = false; startBtn.innerHTML = '<span class="voice-read-mic-icon">🎤</span><span class="voice-read-mic-main">もう一度試す</span><span class="voice-read-mic-sub">マイクの許可を確認</span>'; }
        return;
    }
    if (myToken !== chorusFlowToken) return;
    var played = await speakPracticeExampleAndWait(practice.target);
    if (myToken !== chorusFlowToken) return;
    if (played) {
        showVoiceTestStatus("お手本が終わりました。続けて同じ言葉を話してください。マイクを準備しています…", "listening");
    } else {
        showVoiceTestStatus("お手本の自動再生が使えませんでした。画面の言葉を見ながら話してください。マイクを準備しています…", "listening");
    }
    await new Promise(function (resolve) { window.setTimeout(resolve, 600); });
    if (myToken !== chorusFlowToken) return;
    chorusListeningAfterExample = played;
    startFoundationVoiceRecognition(q, practice, "repeat");
}
function startFoundationVoiceRecognition(q, practice, repeatMode) {
    if (repeatMode === void 0) { repeatMode = "repeat"; }
    // 唱和は同時録音せず、お手本の再生が終わってからマイクを開始します。
    // これにより、音声合成を自分の発話として判定してしまう誤作動を抑えます。
    if (selectedActivity === "repeat" && repeatMode === "chorus") {
        startChorusThenListen(q, practice);
        return;
    }
    return __awaiter(this, void 0, void 0, function () {
        var Recognition, startBtn, error_3, code, msg, recognition, transcript, judgement, handledFinal, recognitionTimeoutId;
        var navRunToken, navQuestionIndex, navGroupId, navWasNavigator, navStale;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    navRunToken = activityRunToken;
                    navQuestionIndex = current;
                    navGroupId = articulationSelectedGroup;
                    navWasNavigator = selectedActivity === "articulationNavigator";
                    navStale = function() {
                        return navWasNavigator &&
                            (selectedActivity !== "articulationNavigator" ||
                             activityRunToken !== navRunToken || current !== navQuestionIndex ||
                             articulationSelectedGroup !== navGroupId);
                    };
                    Recognition = getSpeechRecognitionClass();
                    if (!Recognition) {
                        showVoiceTestStatus("このブラウザでは音声認識を利用できません。最新のChromeまたは対応するSafari・Edgeでお試しください。", "error");
                        return [2 /*return*/];
                    }
                    if (!window.isSecureContext && !window.AndroidSpeech) {
                        showVoiceTestStatus("HTTPSまたはlocalhostで開いてください。マイクを利用できません。", "error");
                        return [2 /*return*/];
                    }
                    startBtn = $("voiceStartBtn");
                    if (voiceRecognitionBusy) {
                        // A second press in articulation mode explicitly restarts the
                        // microphone instead of silently ignoring the tap.
                        if (navWasNavigator && !answered) {
                            var previousRecognition = speechRecognition;
                            speechRecognition = null;
                            voiceRecognitionBusy = false;
                            if (previousRecognition) { try { previousRecognition.abort(); } catch (_) {} }
                            stopMicrophoneStream();
                            updateArticulationNavLive("録音をやり直します。マイクを準備しています…", false);
                            if (startBtn) {
                                startBtn.disabled = true;
                                startBtn.innerHTML = '<span class="voice-read-mic-icon">🎤</span><span class="voice-read-mic-main">再起動しています…</span>';
                            }
                            showVoiceTestStatus("前の録音を終了しています。続けて聞き取りを始めます…", "listening");
                            var restartRun = activityRunToken, restartQuestion = current;
                            window.setTimeout(function () {
                                if (selectedActivity === "articulationNavigator" && activityRunToken === restartRun && current === restartQuestion && articulationSelectedGroup === navGroupId && !answered)
                                    startFoundationVoiceRecognition(q, practice, "repeat");
                            }, 400);
                        }
                        return [2 /*return*/];
                    }
                    if (speechRecognition) {
                        try {
                            speechRecognition.abort();
                        }
                        catch (_) { }
                        speechRecognition = null;
                    }
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
                    if (navStale()) return [2 /*return*/];
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    if (navStale()) return [2 /*return*/];
                    code = (error_3 === null || error_3 === void 0 ? void 0 : error_3.name) || "UNKNOWN";
                    msg = "マイクを開始できませんでした。";
                    if (code === "NotAllowedError" || code === "SecurityError")
                        msg = "マイクが拒否されています。ブラウザのマイク設定で許可してください。";
                    else if (code === "NotFoundError")
                        msg = "マイクが見つかりません。接続を確認してください。";
                    else if (code === "NotReadableError")
                        msg = "マイクを他のアプリが使用中の可能性があります。";
                    else if (code === "TimeoutError")
                        msg = "マイクの許可確認に時間がかかりました。許可画面を閉じて、もう一度お試しください。";
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
                    if (navStale()) return [2 /*return*/];
                    recognition = new Recognition();
                    speechRecognition = recognition;
                    recognition.lang = "ja-JP";
                    if (selectedActivity === "articulationNavigator") recognition.kotobaMode = "articulationNavigator";
                    recognition.continuous = false;
                    recognition.interimResults = true;
                    recognition.maxAlternatives = selectedActivity === "articulationNavigator" ? 5 : 3;
                    voiceRecognitionBusy = true;
                    answered = false;
                    if (selectedActivity === "repeat") $("nextBtn").classList.add("hidden");
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
                    recognitionTimeoutId = null;
                    recognition.onstart = function () {
                        if (navStale() || speechRecognition !== recognition) return;
                        if (selectedActivity === "articulationNavigator") updateArticulationNavLive("🎙️ 発音を聞き取り中です。色付きの部位を意識してください。", true);
                        if (selectedActivity === "repeat" && chorusListeningAfterExample) {
                            chorusListeningAfterExample = false;
                            showVoiceTestStatus("マイクが聞き取り中です。お手本と同じ言葉を話してください…", "listening");
                        } else if (selectedActivity === "repeat") {
                            showVoiceTestStatus("お手本の言葉を繰り返して話してください…", "listening");
                        } else {
                            showVoiceTestStatus("話してください…", "listening");
                        }
                    };
                    recognition.onresult = function (event) {
                        if (navStale() || speechRecognition !== recognition) return;
                        var _a;
                        var finalText = "";
                        var interimText = "";
                        var finalAlternatives = [];
                        for (var i = event.resultIndex; i < event.results.length; i++) {
                            var txt = ((_a = event.results[i][0]) === null || _a === void 0 ? void 0 : _a.transcript) || "";
                            if (event.results[i].isFinal) {
                                finalText += txt;
                                if (selectedActivity === "articulationNavigator") {
                                    for (var a = 0; a < event.results[i].length; a++) {
                                        if (event.results[i][a] && event.results[i][a].transcript) finalAlternatives.push(event.results[i][a].transcript);
                                    }
                                }
                            } else
                                interimText += txt;
                        }
                        var currentText = (finalText || interimText).trim();
                        if (transcript && currentText)
                            transcript.textContent = currentText;
                        if (selectedActivity === "articulationNavigator" && currentText) updateArticulationNavLive("認識中の音声：" + currentText + "（部位そのものを検出した結果ではありません）", !finalText);
                        if (finalText && !handledFinal) {
                            handledFinal = true;
                            if (recognitionTimeoutId) { window.clearTimeout(recognitionTimeoutId); recognitionTimeoutId = null; }
                            var judged = selectedActivity === "articulationNavigator"
                                ? articulationSpeechMatch(practice, finalAlternatives.length ? finalAlternatives : [finalText])
                                : foundationSpeechMatch(practice.target, finalText, practice.accept);
                            if (selectedActivity === "articulationNavigator" && judged.matched && transcript)
                                transcript.textContent = judged.transcript;
                            voiceRecognitionBusy = false;
                            answered = true;
                            if (selectedActivity === "articulationNavigator") articulationAttemptedIndexes.add(current);
                            if (judged.matched) {
                                if (selectedActivity === "articulationNavigator") {
                                    if (!articulationCorrectIndexes.has(current)) {
                                        articulationCorrectIndexes.add(current);
                                        score++;
                                    }
                                } else if (selectedActivity !== "repeat" || !repeatQuestionScored) {
                                    score++;
                                    if (selectedActivity === "repeat") repeatQuestionScored = true;
                                }
                                showVoiceTestStatus("\u2B55 \u5408\u3063\u3066\u3044\u307E\u3059\uFF01\uFF08".concat(Math.round(judged.similarity * 100), "%\uFF09"), "ok");
                                if (judgement) {
                                    judgement.textContent = "⭕ 合っています！";
                                    judgement.className = "voice-read-judgement ok";
                                }
                                if (transcript)
                                    transcript.className = "voice-transcript ok";
                                $("feedback").textContent = "正解です。できました。 声をしっかり認識できました。";
                                $("feedback").className = "feedback ok";
                                playCorrectSound();
                                announceCorrect();
                            }
                            else {
                                showVoiceTestStatus(selectedActivity === "articulationNavigator"
                                    ? "△ 認識された音が異なりました。次の問題へ進みます。"
                                    : "\u274C \u3082\u3046\u4E00\u5EA6\u8A71\u3057\u3066\u307F\u307E\u3057\u3087\u3046\uFF08".concat(Math.round(judged.similarity * 100), "%\uFF09"), "ng");
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
                            if (selectedActivity === "articulationNavigator") updateArticulationProgressUI();
                            // ナビゲーションは自動進行のみ。手動の「次へ」は表示しない。
                            $("nextBtn").classList.toggle("hidden", selectedActivity === "articulationNavigator");
                            stopMicrophoneStream();
                            if (startBtn) {
                                startBtn.disabled = selectedActivity === "articulationNavigator";
                                startBtn.innerHTML = selectedActivity === "articulationNavigator"
                                    ? '<span class="voice-read-mic-icon">✓</span><span class="voice-read-mic-main">回答を確認しました</span>'
                                    : "<span class=\"voice-read-mic-icon\">\uD83C\uDFA4</span><span class=\"voice-read-mic-main\">\u3082\u3046\u4E00\u5EA6\u8A71\u3059</span><span class=\"voice-read-mic-sub\">\u518D\u6311\u6226\u3067\u304D\u307E\u3059</span>";
                            }
                            markVoiceReadStep(4);
                            if (selectedActivity === "articulationNavigator") scheduleArticulationAutoNext();
                        }
                    };
                    recognition.onerror = function (event) {
                        if (recognitionTimeoutId) { window.clearTimeout(recognitionTimeoutId); recognitionTimeoutId = null; }
                        if (navStale() || speechRecognition !== recognition) return;
                        if (handledFinal) return; // 古い認識セッションの終了エラーで正解表示を消さない
                        voiceRecognitionBusy = false;
                        var msg = "音声認識でエラーが発生しました。";
                        if (event.error === "not-allowed")
                            msg = "音声認識が許可されませんでした。マイクとサイトの権限を確認してください。";
                        else if (event.error === "service-not-allowed")
                            msg = "端末の音声認識サービスが利用できません。音声入力サービスの設定を確認してください。";
                        else if (event.error === "audio-capture")
                            msg = window.AndroidSpeech
                                ? "マイクから音声を取得できません。Androidのマイク権限や他のアプリの使用状況を確認してください。"
                                : "マイクから音声を取得できません。マイクの接続・入力設定を確認してください。";
                        else if (event.error === "aborted" || event.error === "client")
                            msg = "録音が途中で終了しました。少し待ってから、もう一度お試しください。";
                        else if (event.error === "no-speech")
                            msg = selectedActivity === "articulationNavigator"
                                ? "短い音を聞き取れませんでした。マイクに向かって、同じ音を2回ゆっくり話してみてください。"
                                : "声が認識されませんでした。もう一度ゆっくり話してください。";
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
                        if (recognitionTimeoutId) { window.clearTimeout(recognitionTimeoutId); recognitionTimeoutId = null; }
                        if (navStale() || speechRecognition !== recognition) return;
                        if (selectedActivity === "articulationNavigator") updateArticulationNavLive("録音終了：認識結果を確認し、お手本と聞き比べてください。", false);
                        voiceRecognitionBusy = false;
                        speechRecognition = null;
                        stopMicrophoneStream();
                        if (startBtn && !answered) {
                            startBtn.disabled = false;
                            startBtn.innerHTML = "<span class=\"voice-read-mic-icon\">\uD83C\uDFA4</span><span class=\"voice-read-mic-main\">\u3082\u3046\u4E00\u5EA6\u8A71\u3059</span><span class=\"voice-read-mic-sub\">\u518D\u8A66\u884C\u3067\u304D\u307E\u3059</span>";
                        }
                    };
                    try {
                        recognition.start();
                        if (navWasNavigator && startBtn) {
                            startBtn.disabled = false;
                            startBtn.innerHTML = '<span class="voice-read-mic-icon">🎤</span><span class="voice-read-mic-main">録音をやり直す</span><span class="voice-read-mic-sub">もう一度押すと録音を再開</span>';
                        }
                        recognitionTimeoutId = window.setTimeout(function () {
                            if (navStale() || speechRecognition !== recognition || handledFinal || answered) return;
                            speechRecognition = null;
                            voiceRecognitionBusy = false;
                            try { recognition.abort(); } catch (_) {}
                            showVoiceTestStatus("音声の待機時間が終了しました。マイクをもう一度押してください。", "error");
                            if (navWasNavigator) updateArticulationNavLive("聞き取りが終了しました。もう一度マイクを押してください。", false);
                            if (startBtn) {
                                startBtn.disabled = false;
                                startBtn.innerHTML = '<span class="voice-read-mic-icon">🎤</span><span class="voice-read-mic-main">もう一度話す</span>';
                            }
                        }, 15000);
                    }
                    catch (_) {
                        if (recognitionTimeoutId) { window.clearTimeout(recognitionTimeoutId); recognitionTimeoutId = null; }
                        voiceRecognitionBusy = false;
                        if (speechRecognition === recognition) speechRecognition = null;
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
                        showVoiceTestStatus("このブラウザでは音声認識を利用できません。最新のChromeまたは対応するSafari・Edgeでお試しください。", "error");
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
                                $("feedback").textContent = "正解です。できました。 認識した言葉が合っています。";
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
            feedback.innerHTML = "\u2694\uFE0F <strong>正解です。できました。</strong> ".concat(escapeHtml(q.enemyName || "敵"), "\u3092\u5012\u3057\u305F\uFF01");
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
        feedback.innerHTML = "\uD83D\uDCA5 <strong>不正解です。</strong> \u30CF\u30FC\u30C8\u304C1\u3064\u6E1B\u308A\u307E\u3057\u305F\u3002<br>\u6B63\u89E3\u306F\u300C".concat(escapeHtml(q.answer), "\u300D\u3067\u3059\u3002");
    }
    speak("\u6B8B\u308A\u306F".concat(kotobaQuestState.lives, "\u56DE\u3067\u3059\u3002"));
    $("nextBtn").classList.remove("hidden");
}
function updateMoraClapUI() {
    var countEl = $("moraClapCount");
    if (countEl) countEl.textContent = String(moraPracticeState.clapCount);
    document.querySelectorAll(".mora-beat-dot").forEach(function(dot, index) {
        dot.classList.toggle("hit", index < moraPracticeState.clapCount);
    });
}
var browserClapDetection = null;
function getMoraModeLabel(mode) {
    if (mode === "screenTap") return "画面タップ";
    return "手拍子";
}
function renderMoraQuestion(q) {
    var area = $("answerArea");
    if (!area) return;
    cleanupBrowserClapDetection(false);
    if (window.__androidMoraClapActive && window.AndroidSpeech && typeof window.AndroidSpeech.stopClapDetection === "function") {
        try { window.AndroidSpeech.stopClapDetection(); } catch (_) { }
        window.__androidMoraClapActive = false;
    }
    if (moraPracticeState.recognition) {
        try { moraPracticeState.recognition.abort(); } catch (_) { }
    }
    // スタイル未選択なら開始時の演出へ。選択済みなら同じスタイルで次の問題へ進みます。
    if (!moraSessionMode) {
        moraPracticeState = { mode: null, clapCount: 0, expected: Number(q.moraCount || 0), clapConfirmed: false, recognition: null, clapActive: false };
        renderMoraModeSelection(q);
        return;
    }
    moraPracticeState = { mode: moraSessionMode, clapCount: 0, expected: Number(q.moraCount || 0), clapConfirmed: false, recognition: null, clapActive: false };
    renderMoraModePractice(q, moraSessionMode);
}
function renderMoraModeSelection(q) {
    var area = $("answerArea");
    if (!area) return;
    var game = $("game");
    if (game) game.classList.add("mora-mode-select-active");
    if ($("trainingTitle")) $("trainingTitle").textContent = "MORA QUEST｜スタイル選択";
    if ($("progress")) $("progress").textContent = "READY";
    var wrap = document.createElement("div");
    wrap.className = "mora-mode-picker mora-arcade-picker";
    wrap.innerHTML = '<div class="mora-arcade-select">'
      + '<div class="mora-arcade-stagefx" aria-hidden="true"><span class="mora-fx-orbit mora-fx-orbit-one"></span><span class="mora-fx-orbit mora-fx-orbit-two"></span><span class="mora-fx-scan"></span><span class="mora-fx-node mora-fx-node-one"></span><span class="mora-fx-node mora-fx-node-two"></span><span class="mora-fx-node mora-fx-node-three"></span></div>'
      + '<div class="mora-arcade-topline"><span class="mora-arcade-logo">✦ MORA QUEST</span><span class="mora-arcade-availability"><i></i> MISSION GATE // ACTIVE</span></div>'
      + '<div class="mora-arcade-titleblock"><div class="mora-arcade-eyebrow">CHOOSE YOUR RHYTHM</div><h2>ミッションスタイルを選択</h2><p>2つのスタイルから1つを選ぼう。スタイルが決まると、モーラミッションがスタート！</p><div class="mora-arcade-live"><span></span> SELECT ONE STYLE / START MISSION</div></div>'
      + '<div class="mora-style-grid">'
      + '<button type="button" class="mora-style-card style-clap" data-mora-mode="clap" aria-label="手拍子スタイルを選ぶ">'
      + '<span class="mora-style-index">STYLE 01 <b>· SOUND</b></span><span class="mora-style-art"><span class="mora-style-art-ring"></span><span class="mora-style-art-ring-inner"></span><span class="mora-style-emoji">👏</span><span class="mora-style-spark">✦</span><span class="mora-style-wave"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span></span>'
      + '<span class="mora-style-type">RHYTHM TYPE</span><strong class="mora-style-name">手拍子</strong><span class="mora-style-desc">手を叩くリズムで<br>モーラをカウント！</span><span class="mora-style-select"><span>このスタイルで挑戦</span><b>▶</b></span></button>'
      + '<button type="button" class="mora-style-card style-screen" data-mora-mode="screenTap" aria-label="画面タップスタイルを選ぶ">'
      + '<span class="mora-style-index">STYLE 02 <b>· TOUCH</b></span><span class="mora-style-art"><span class="mora-style-art-ring"></span><span class="mora-style-art-ring-inner"></span><span class="mora-style-emoji">👆</span><span class="mora-style-spark">✦</span><span class="mora-style-touch-ripple"><i></i><i></i><i></i></span></span>'
      + '<span class="mora-style-type">TOUCH TYPE</span><strong class="mora-style-name">画面タップ</strong><span class="mora-style-desc">画面を押して<br>モーラをカウント！</span><span class="mora-style-select"><span>このスタイルで挑戦</span><b>▶</b></span></button>'
      + '</div>'
      + '<div class="mora-arcade-footer"><span>SELECT 1 STYLE</span><span>選んだ方法で今回のミッションを最後まで進めます</span></div>'
      + '<div class="mora-arcade-note">手拍子はマイクで音を検出します。画面タップはマイクを使わずに練習できます。次のミッションでは、もう一度スタイルを選びます。</div>'
      + '</div>';
    area.innerHTML = "";
    area.appendChild(wrap);
    wrap.querySelectorAll("[data-mora-mode]").forEach(function(button) {
        button.addEventListener("click", function() { startMoraMode(button.dataset.moraMode, button); });
    });
}
function startMoraMode(mode, selectedButton) {
    var q = questions[current];
    if (!q || ["clap", "screenTap"].indexOf(mode) < 0 || moraSessionMode) return;
    cleanupBrowserClapDetection(false);
    moraSessionMode = mode;
    moraPracticeState = { mode: mode, clapCount: 0, expected: Number(q.moraCount || 0), clapConfirmed: false, recognition: null, clapActive: false };
    var wrap = document.querySelector(".mora-arcade-picker");
    if (!wrap) { renderMoraModePractice(q, mode); return; }
    wrap.classList.add("is-launching");
    wrap.querySelectorAll("[data-mora-mode]").forEach(function(button) {
        button.disabled = true;
        if (button === selectedButton) button.classList.add("is-selected");
        else button.classList.add("is-dimmed");
    });
    var label = getMoraModeLabel(mode);
    var icon = mode === "clap" ? "👏" : "👆";
    var reveal = document.createElement("div");
    reveal.className = "mora-mode-reveal";
    reveal.innerHTML = '<div class="mora-reveal-flash"></div><div class="mora-reveal-orbit mora-reveal-orbit-one"></div><div class="mora-reveal-orbit mora-reveal-orbit-two"></div><div class="mora-reveal-content"><div class="mora-reveal-kicker"></div><div class="mora-reveal-icon">' + icon + '</div><div class="mora-reveal-name">' + label + '</div><div class="mora-reveal-line"></div><div class="mora-reveal-loading"><span></span></div><div class="mora-reveal-sub"></div></div>';
    wrap.appendChild(reveal);
    if ($("trainingTitle")) $("trainingTitle").textContent = "MORA QUEST｜" + label;
    playButtonSound();
    if (moraLaunchTimer) clearTimeout(moraLaunchTimer);
    moraLaunchTimer = setTimeout(function() {
        moraLaunchTimer = null;
        renderMoraModePractice(q, mode);
    }, 1480);
}
function renderMoraModePractice(q, mode) {
    var area = $("answerArea");
    if (!area) return;
    var units = (q.prompt || "").split("・").filter(Boolean);
    var beats = units.map(function(unit) {
        return '<span class="mora-beat-dot"><span>' + escapeHtml(unit) + '</span></span>';
    }).join('<span class="mora-beat-arrow">→</span>');
    var choices = shuffle(q.choices || ["2拍", "3拍", "4拍", "5拍"]);
    var choicesHtml = choices.map(function(choice) {
        return '<button type="button" class="choice mora-choice-button" disabled>' + escapeHtml(choice) + '</button>';
    }).join("");
    var label = getMoraModeLabel(mode);
    var instruction = mode === "clap"
        ? "言葉に合わせて、1拍ずつ手を叩いてください。マイクが手拍子の音を数えます。"
        : "言葉に合わせて、下の『1拍追加』を1回ずつ押してください。";
    var counterLabel = mode === "clap" ? "手拍子" : "画面タップ";
    var controlHtml = "";
    if (mode === "screenTap") {
        controlHtml = '<div class="mora-screen-tap-controls">'
          + '<button type="button" id="moraManualTapBtn" class="mora-mic-button">👆 1拍追加</button>'
          + '<div class="mora-button-row mora-manual-secondary"><button type="button" id="moraManualUndoBtn" class="mora-action secondary">1つ戻す</button><button type="button" id="moraManualResetBtn" class="mora-action secondary">最初から</button></div>'
          + '<button type="button" id="moraClapStopBtn" class="mora-action check">数え終わり</button>'
          + '</div>';
    } else {
        controlHtml = '<div class="mora-button-row"><button type="button" id="moraClapStartBtn" class="mora-action primary">👏 手拍子を始める</button><button type="button" id="moraClapStopBtn" class="mora-action secondary" disabled>■ 手拍子を止める</button></div>';
    }
    var note = mode === "screenTap"
        ? "画面を押すたびに1回として数えます。マイクの許可は必要ありません。"
        : "マイクが使える静かな場所で行ってください。手拍子が認識されにくい場合は、マイクに近づけて試すか、次のミッションで画面タップを選んでください。";
    var game = $("game");
    if (game) game.classList.remove("mora-mode-select-active");
    if ($("trainingTitle")) $("trainingTitle").textContent = "MORA QUEST｜" + label;
    if ($("progress")) $("progress").textContent = (current + 1) + " / " + questions.length;
    var progressPercent = Math.round(((current + 1) / Math.max(1, questions.length)) * 100);
    var wrap = document.createElement("div");
    wrap.className = "mora-practice-v2 mora-in-session";
    wrap.innerHTML = '<div class="mora-session-hud"><div class="mora-session-heading"><span class="mora-session-kicker">✦ MORA QUEST / MISSION</span><strong>' + label + '</strong></div><div class="mora-session-stage">STAGE <b>' + (current + 1) + '</b><span> / ' + questions.length + '</span></div></div>'
      + '<div class="mora-session-progress"><span style="width:' + progressPercent + '%"></span></div>'
      + '<div class="mora-word-card mora-word-card-v2"><div class="mora-small-label">1拍ずつ数える言葉</div><div class="mora-word-separated">' + beats + '</div><div class="mora-help">1つの丸＝1モーラ（1拍）です</div></div>'
      + '<div class="mora-step-card"><strong>' + label + 'で数えます</strong><span>' + instruction + '</span></div>'
      + '<div class="mora-counter"><div class="mora-counter-number" id="moraClapCount">0</div><div id="moraCounterLabel">' + counterLabel + ' 回</div></div>'
      + controlHtml
      + '<div id="moraClapStatus" class="mora-status">' + (mode === "screenTap" ? '言葉に合わせて「1拍追加」を押してください。' : '開始ボタンを押してください。') + '</div>'
      + '<button type="button" id="moraClapCheckBtn" class="mora-action check" disabled>数えた回数を確認する</button>'
      + '<div class="mora-step-card mora-step-card-second"><strong>答えを選びます</strong><span>数えた回数と同じ拍数を選んでください。</span></div>'
      + '<div id="moraChoiceArea" class="mora-choices">' + choicesHtml + '</div>'
      + '<div id="moraChoiceStatus" class="mora-status">回数が合ったら、確認ボタンを押してください。</div>'
      + '<div class="mora-tip">' + note + '</div>';
    area.innerHTML = "";
    area.appendChild(wrap);
    if (mode === "screenTap") {
        $("moraManualTapBtn").addEventListener("click", function() {
            if (moraPracticeState.clapConfirmed || moraPracticeState.clapCount >= 12) return;
            moraPracticeState.clapCount += 1;
            updateMoraClapUI();
            var status = $("moraClapStatus");
            if (status) { status.className = "mora-status listening"; status.textContent = "画面タップを「" + moraPracticeState.clapCount + "回」数えました。続けるか、数え終わりを押してください。"; }
        });
        $("moraManualUndoBtn").addEventListener("click", function() {
            moraPracticeState.clapCount = Math.max(0, moraPracticeState.clapCount - 1);
            updateMoraClapUI();
        });
        $("moraManualResetBtn").addEventListener("click", function() {
            moraPracticeState.clapCount = 0;
            moraPracticeState.clapConfirmed = false;
            updateMoraClapUI();
            var check = $("moraClapCheckBtn"); if (check) check.disabled = true;
            var status = $("moraClapStatus"); if (status) { status.className = "mora-status"; status.textContent = "0回に戻しました。もう一度数えてください。"; }
        });
        $("moraClapStopBtn").addEventListener("click", finishMoraClapRound);
    } else {
        $("moraClapStartBtn").addEventListener("click", startMoraClap);
        $("moraClapStopBtn").addEventListener("click", stopMoraClap);
    }
    $("moraClapCheckBtn").addEventListener("click", confirmMoraClapAndShowChoices);
    wrap.querySelectorAll(".mora-choice-button").forEach(function(button) {
        button.addEventListener("click", function() { answer(button, button.textContent); });
    });
    updateMoraClapUI();
    if (voiceEnabled && (q.voiceText || q.prompt)) {
        setTimeout(function() { speak(q.voiceText || q.prompt); }, 260);
    }
}
function startMoraClap() {
    var q = questions[current];
    if (!q) return;
    var mode = moraPracticeState.mode || "clap";
    if (moraPracticeState.recognition) { try { moraPracticeState.recognition.abort(); } catch (_) { } moraPracticeState.recognition = null; }
    moraPracticeState.clapCount = 0;
    moraPracticeState.expected = Number(q.moraCount || 0);
    moraPracticeState.clapConfirmed = false;
    moraPracticeState.clapActive = true;
    updateMoraClapUI();
    var startButton = $("moraClapStartBtn"), stopButton = $("moraClapStopBtn"), checkButton = $("moraClapCheckBtn"), status = $("moraClapStatus");
    if (startButton) startButton.disabled = true;
    if (stopButton) stopButton.disabled = false;
    if (checkButton) checkButton.disabled = true;
    if (status) { status.className = "mora-status listening"; status.textContent = "マイクを準備しています…"; }

    // Androidでは既存のネイティブ手拍子検出を優先し、その他のブラウザーではWeb Audioで音を検出します。
    if (mode === "clap" && window.AndroidSpeech && typeof window.AndroidSpeech.startClapDetection === "function") {
      window.__androidMoraClapActive = true;
      window.__androidClapDispatch = {
        started: function() { if (status) { status.className = "mora-status listening"; status.textContent = "手拍子を数えています。言葉に合わせて1回ずつ叩いてください。"; } },
        count: function(n) { moraPracticeState.clapCount = Number(n) || 0; updateMoraClapUI(); if (status) status.textContent = "手拍子を「" + moraPracticeState.clapCount + "回」検出しました。続けるか、停止してください。"; },
        stopped: function(n) { moraPracticeState.clapActive = false; moraPracticeState.clapCount = Number(n) || moraPracticeState.clapCount; updateMoraClapUI(); window.__androidMoraClapActive = false; finishMoraClapRound(); },
        error: function(msg) { moraPracticeState.clapActive = false; window.__androidMoraClapActive = false; if (status) { status.className = "mora-status error"; status.textContent = "❌ " + (msg || "手拍子検出に失敗しました。"); } if (startButton) startButton.disabled = false; if (stopButton) stopButton.disabled = true; }
      };
      try { window.AndroidSpeech.startClapDetection(); speak("手拍子を始めます。" + q.moraCount + "回、1拍ずつ手を叩いてください。"); return; }
      catch (nativeClapError) { window.__androidMoraClapActive = false; }
    }

    if (!window.isSecureContext && !window.AndroidSpeech) {
      if (status) { status.className = "mora-status error"; status.textContent = "HTTPSで開いてください。GitHub Pagesの公開URLではマイクを利用できます。"; }
      if (startButton) startButton.disabled = false; if (stopButton) stopButton.disabled = true; moraPracticeState.clapActive = false; return;
    }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      if (status) { status.className = "mora-status error"; status.textContent = "このブラウザーではマイクを利用できません。画面タップを選んでください。"; }
      if (startButton) startButton.disabled = false; if (stopButton) stopButton.disabled = true; moraPracticeState.clapActive = false; return;
    }
    cleanupBrowserClapDetection(false);
    navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } }).then(function(stream) {
      var AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) { stream.getTracks().forEach(function(t) { t.stop(); }); throw new Error("このブラウザーは音声解析に対応していません。"); }
      var context = new AudioContextClass();
      var source = context.createMediaStreamSource(stream);
      var analyser = context.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0;
      source.connect(analyser);
      browserClapDetection = {
        stream: stream, context: context, source: source, analyser: analyser,
        frame: 0, data: new Uint8Array(analyser.fftSize), armed: false, lastHit: 0,
        mode: mode, calibrationStarted: Date.now(), calibrationSamples: [], calibrated: false,
        hitThreshold: 0.05,
        peakThreshold: 0.18,
        rearmThreshold: 0.02
      };
      if (context.state === "suspended") context.resume().catch(function() {});
      if (status) { status.className = "mora-status listening"; status.textContent = "周囲の音を確認しています。手拍子の準備をしてください。"; }
      speak("手拍子を始めます。" + q.moraCount + "回、1拍ずつ手を叩いてください。");
      function analyse() {
        var state = browserClapDetection;
        if (!state) return;
        state.analyser.getByteTimeDomainData(state.data);
        var sum = 0, peak = 0;
        for (var i = 0; i < state.data.length; i++) {
          var delta = (state.data[i] - 128) / 128;
          sum += delta * delta;
          peak = Math.max(peak, Math.abs(delta));
        }
        var rms = Math.sqrt(sum / state.data.length), now = Date.now();
        if (!state.calibrated) {
          state.calibrationSamples.push(rms);
          if (now - state.calibrationStarted >= 450) {
            var total = state.calibrationSamples.reduce(function(a, b) { return a + b; }, 0);
            var baseline = state.calibrationSamples.length ? total / state.calibrationSamples.length : 0.008;
            state.hitThreshold = Math.max(0.045, baseline * 2.8 + 0.012);
            state.peakThreshold = 0.16;
            state.rearmThreshold = Math.max(0.006, state.hitThreshold * 0.42);
            state.calibrated = true;
            state.armed = true;
            if (status) status.textContent = "検出準備完了です。言葉に合わせて1回ずつ手を叩いてください。";
          }
        } else {
          if (rms < state.rearmThreshold) state.armed = true;
          if (state.armed && rms > state.hitThreshold && peak > state.peakThreshold && now - state.lastHit > 260) {
            state.armed = false;
            state.lastHit = now;
            moraPracticeState.clapCount += 1;
            updateMoraClapUI();
            if (status) status.textContent = getMoraModeLabel(state.mode) + "を「" + moraPracticeState.clapCount + "回」検出しました。続けるか、停止してください。";
          }
        }
        state.frame = requestAnimationFrame(analyse);
      }
      browserClapDetection.frame = requestAnimationFrame(analyse);
    }).catch(function(error) {
      cleanupBrowserClapDetection(false);
      if (status) {
        status.className = "mora-status error";
        var msg = "マイクを開始できませんでした。サイトのマイク許可を確認してください。";
        if (error && error.name === "NotAllowedError") msg = "マイクが許可されていません。ブラウザーのサイト設定でマイクを許可するか、画面タップを選んでください。";
        else if (error && error.message) msg = error.message;
        status.textContent = "❌ " + msg;
      }
      if (startButton) startButton.disabled = false;
      if (stopButton) stopButton.disabled = true;
      moraPracticeState.clapActive = false;
    });
}
function cleanupBrowserClapDetection(finish) {
    var state = browserClapDetection;
    if (!state) return;
    browserClapDetection = null;
    try { if (state.frame) cancelAnimationFrame(state.frame); } catch (_) { }
    try { state.source.disconnect(); } catch (_) { }
    try { state.stream.getTracks().forEach(function(track) { track.stop(); }); } catch (_) { }
    try { var closing = state.context.close(); if (closing && typeof closing.catch === "function") closing.catch(function() {}); } catch (_) { }
    moraPracticeState.clapActive = false;
    if (finish) finishMoraClapRound();
}
function stopMoraClap() {
    if (window.__androidMoraClapActive && window.AndroidSpeech && typeof window.AndroidSpeech.stopClapDetection === "function") {
      try { window.AndroidSpeech.stopClapDetection(); } catch (_) { }
      return;
    }
    if (browserClapDetection) { cleanupBrowserClapDetection(true); return; }
    var startButton = $("moraClapStartBtn"), stopButton = $("moraClapStopBtn");
    if (startButton) startButton.disabled = false;
    if (stopButton) stopButton.disabled = true;
}
window.addEventListener("pagehide", function() { cleanupBrowserClapDetection(false); });
function finishMoraClapRound() {
    var expected = moraPracticeState.expected, actual = moraPracticeState.clapCount;
    var status = $("moraClapStatus"), start = $("moraClapStartBtn"), stop = $("moraClapStopBtn"), check = $("moraClapCheckBtn");
    var label = getMoraModeLabel(moraPracticeState.mode);
    if (start) start.disabled = false;
    if (stop) stop.disabled = moraPracticeState.mode === "screenTap";
    if (actual === expected && expected > 0) {
        moraPracticeState.clapConfirmed = true;
        if (status) { status.className = "mora-status ok"; status.textContent = "⭕ " + label + "はぴったりです！ " + actual + "回"; }
        if (check) check.disabled = false;
        speak(label + "は正解です。次に、拍数を選んでください。");
    } else {
        moraPracticeState.clapConfirmed = false;
        if (status) { status.className = "mora-status ng"; status.textContent = "今回は" + actual + "回でした。正解は" + expected + "回です。もう一度、ゆっくり数えてみましょう。"; }
        if (check) check.disabled = true;
        if (moraPracticeState.mode === "screenTap") {
            var resetButton = $("moraManualResetBtn");
            if (resetButton) resetButton.focus();
        }
        speak("もう一度、ゆっくり数えてみましょう。");
    }
}
function confirmMoraClapAndShowChoices() {
    if (!moraPracticeState.clapConfirmed) return;
    var area = $("moraChoiceArea"), status = $("moraChoiceStatus"), check = $("moraClapCheckBtn");
    if (area) area.querySelectorAll(".mora-choice-button").forEach(function(button) { button.disabled = false; });
    if (status) { status.className = "mora-status listening"; status.textContent = getMoraModeLabel(moraPracticeState.mode) + "を確認しました。拍数を選んでください。"; }
    if (check) check.disabled = true;
}
function renderAACPractice(q) {
    var area = $("answerArea");
    if (!area) return;
    var wrap = document.createElement("div");
    wrap.className = "aac-practice";

    var note = document.createElement("p");
    note.className = "aac-training-note";
    note.textContent = "答えのお手本は出ません。場面を考え、自分で選んでから確定してください。";

    var options = document.createElement("div");
    options.className = "aac-choice-grid";
    options.setAttribute("role", "group");
    options.setAttribute("aria-label", "伝えたい言葉の選択肢");

    var selectedStatus = document.createElement("p");
    selectedStatus.className = "aac-selected-status";
    selectedStatus.setAttribute("aria-live", "polite");
    selectedStatus.textContent = "まだ言葉を選んでいません。";

    var actions = document.createElement("div");
    actions.className = "aac-actions";
    var confirm = document.createElement("button");
    confirm.type = "button";
    confirm.className = "aac-confirm-button";
    confirm.textContent = "この言葉で伝える";
    confirm.disabled = true;

    var reset = document.createElement("button");
    reset.type = "button";
    reset.className = "aac-reset-button";
    reset.textContent = "選びなおす";
    reset.disabled = true;

    var selectedChoice = null;
    var selectedButton = null;
    function clearSelection() {
        selectedChoice = null;
        selectedButton = null;
        options.querySelectorAll(".aac-choice").forEach(function (b) {
            b.classList.remove("selected");
            b.setAttribute("aria-pressed", "false");
        });
        selectedStatus.textContent = "まだ言葉を選んでいません。";
        confirm.disabled = true;
        reset.disabled = true;
    }

    shuffle(q.choices || []).forEach(function (choice) {
        var button = document.createElement("button");
        button.type = "button";
        button.className = "choice aac-choice";
        button.dataset.choice = choice;
        button.setAttribute("aria-pressed", "false");
        var icon = document.createElement("span");
        icon.className = "aac-choice-icon";
        icon.setAttribute("aria-hidden", "true");
        icon.textContent = getAACIcon(choice);
        var label = document.createElement("span");
        label.className = "aac-choice-label";
        label.textContent = choice;
        button.appendChild(icon);
        button.appendChild(label);
        button.addEventListener("click", function () {
            if (answered) return;
            options.querySelectorAll(".aac-choice").forEach(function (b) {
                b.classList.remove("selected");
                b.setAttribute("aria-pressed", "false");
            });
            selectedChoice = choice;
            selectedButton = button;
            button.classList.add("selected");
            button.setAttribute("aria-pressed", "true");
            selectedStatus.textContent = "選んだ言葉：" + choice;
            confirm.disabled = false;
            reset.disabled = false;
            playButtonSound();
        });
        options.appendChild(button);
    });

    confirm.addEventListener("click", function () {
        if (!selectedChoice || !selectedButton || answered) return;
        var committedChoice = selectedChoice;
        var committedButton = selectedButton;
        confirm.disabled = true;
        reset.disabled = true;
        answer(committedButton, committedChoice);
        // 確定した言葉そのものを音声出力します。正解例を先に流すことはしません。
        speak(committedChoice);
        if (committedChoice === q.answer) {
            selectedStatus.textContent = "選んだ言葉を音声で伝えました。場面に合う言葉を選べました。";
        } else {
            selectedStatus.textContent = "選んだ言葉を音声で伝えました。判定を確認して、次の問題でまた試してみましょう。";
        }
    });
    reset.addEventListener("click", function () {
        if (answered) return;
        clearSelection();
        playButtonSound();
    });

    actions.appendChild(confirm);
    actions.appendChild(reset);
    wrap.appendChild(note);
    wrap.appendChild(options);
    wrap.appendChild(selectedStatus);
    wrap.appendChild(actions);
    area.appendChild(wrap);
}
function getAACIcon(phrase) {
    var map = [
        ["水", "💧"], ["トイレ", "🚻"], ["痛い", "🤕"], ["手伝", "🤝"], ["休", "🪑"],
        ["もう一度", "🔁"], ["いりません", "🙅"], ["帰", "🏠"], ["音が", "🔊"], ["食べ", "🍽️"],
        ["ありが", "🙏"], ["こんにちは", "👋"], ["待って", "⏳"], ["文字", "📝"], ["自分で", "👍"],
        ["大丈夫", "👌"], ["おなか", "🍴"], ["おいしい", "😋"], ["ください", "🗣️"], ["わかり", "💭"]
    ];
    for (var i = 0; i < map.length; i++) {
        if (String(phrase).indexOf(map[i][0]) >= 0) return map[i][1];
    }
    return "💬";
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
    answered = true;
    var q = questions[current];
    document.querySelectorAll(".choice").forEach(function (b) { return b.disabled = true; });
    document.querySelectorAll(".token").forEach(function (b) { return b.disabled = true; });
    var correct = choice === q.answer;
    if (correct) {
        score++;
        button.classList.add("correct");
        $("feedback").textContent = "正解です。できました。";
        $("feedback").classList.add("ok");
        playCorrectSound();
        announceCorrect();
    }
    else {
        button.classList.add("wrong");
        document.querySelectorAll(".choice").forEach(function (b) {
            if (b.dataset.choice === q.answer || b.textContent === q.answer)
                b.classList.add("correct");
        });
        $("feedback").textContent = "不正解です。\u6B63\u89E3\u306F\u300C".concat(q.answer, "\u300D\u3067\u3059\u3002");
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
    speak(text, true);
}
function nextQuestion() {
    // 構音ナビは問題形式。未回答では次に進めず、二重タップでも飛ばさない。
    if (selectedActivity === "articulationNavigator" && !answered) return;
    cancelArticulationAutoNext();
    // Release input focus before changing questions. Otherwise the mobile
    // keyboard may auto-scroll to the old answer field after our top jump.
    if (document.activeElement && typeof document.activeElement.blur === "function") {
        try { document.activeElement.blur(); } catch (_) {}
    }
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
window.KotobaAIQuizBridge = {
    correct: function () {
        if (selectedActivity !== "localAIConversation" && selectedActivity !== "aiConversation") return false;
        if (answered) return false;
        answered = true;
        score++;
        aiConversationState.turnCount++;
        $("score").textContent = "正解 " + score;
        var token = activityRunToken;
        var questionIndex = current;
        setTimeout(function () {
            var game = $("game");
            if (token !== activityRunToken || current !== questionIndex || !game || !game.classList.contains("active")) return;
            nextQuestion();
        }, 1100);
        return true;
    },
    restart: function () {
        if (selectedActivity !== "localAIConversation" && selectedActivity !== "aiConversation") return;
        startActivity(selectedActivity);
    }
};
function finishGame(gameOver) {
    if (gameOver === void 0) { gameOver = false; }
    if (!questions.length) return;
    var isCopyPractice = selectedActivity === "copy";
    var writingStats = isCopyPractice ? (window.kotobaCopyRunStats || {attempted:0,matched:0,firstTryCorrect:0,afterRetryCorrect:0,incorrect:0,results:[]}) : null;
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
    else if (isCopyPractice) {
        $("resultIcon") && ($("resultIcon").textContent = "✍️");
        $("resultTitle").textContent = "写字・見写し｜練習結果";
        $("resultScore").textContent = "一致 " + writingStats.matched + " / " + questions.length + "問";
        $("resultRate").textContent = "初回正答率 " + rate + "%";
        $("resultMessage").textContent = "初回正解 " + writingStats.firstTryCorrect + "問 ／ 再挑戦で正解 " + writingStats.afterRetryCorrect + "問 ／ 3回不一致 " + writingStats.incorrect + "問。見本と認識文字を1文字ずつ照合しました。";
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
        kind: isCopyPractice ? "writingPractice" : (selectedActivity === "aiConversation" || selectedActivity === "localAIConversation") ? "aiConversation" : "training",
        writing: writingStats,
        turns: Number(aiConversationState.turnCount || 0),
        recall: (["naming", "cue", "gesture", "roleplay"].indexOf(selectedActivity) >= 0) ? window.kotobaRecallRunStats || null : null,
        articulation: selectedActivity === "articulationNavigator" ? {
            group: "ランダム構音・5問",
            sounds: questions.map(function(q, index) {
                return {sound:q.answer, group:getArticulationGroup(q.navGroup).name,
                    practiced:articulationAttemptedIndexes.has(index), matched:articulationCorrectIndexes.has(index), skipped:articulationSkippedIndexes.has(index)};
            })
        } : null
    });
    // Completed lessons count for the daily streak, even when some answers were wrong.
    // Classic quest game-over (incomplete lesson) does not count.
    if ((!isClassicQuest || !gameOver) && window.KotobaDailyStreak) {
        window.KotobaDailyStreak.finish("resultDailyStreak");
    } else if ($("resultDailyStreak")) {
        $("resultDailyStreak").textContent = "";
    }
    if (selectedActivity === "mora") {
        if (moraLaunchTimer) { clearTimeout(moraLaunchTimer); moraLaunchTimer = null; }
        cleanupBrowserClapDetection(false);
        moraSessionMode = null;
        moraPracticeState = { mode: null, clapCount: 0, expected: 0, clapConfirmed: false, recognition: null, clapActive: false };
    }
    if (!isCopyPractice) playCorrectSound();
    else playButtonSound();
    show("result");
    scrollPageToTop();
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
$("homeBtn").addEventListener("click", function () {
    if (moraLaunchTimer) { clearTimeout(moraLaunchTimer); moraLaunchTimer = null; }
    if (selectedActivity === "mora") {
        cleanupBrowserClapDetection(false);
        moraSessionMode = null;
        moraPracticeState = { mode: null, clapCount: 0, expected: 0, clapConfirmed: false, recognition: null, clapActive: false };
    }
    var game = $("game"); if (game) game.classList.remove("mora-mode-select-active");
    show("home");
});
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
// 7ジャンル・30課題を表示します。
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
function getActiveUserProfile() {
    try {
        if (window.KotobaQuestUserProfile && typeof window.KotobaQuestUserProfile.getCurrent === "function") {
            return window.KotobaQuestUserProfile.getCurrent();
        }
    } catch (_) { }
    return { profileId: "unconfigured", displayName: "未設定", recordCode: "", createdAt: "", updatedAt: "" };
}
function getUserProfileExportSheet() {
    var p = getActiveUserProfile();
    return {
        name: "ユーザー設定",
        rows: [
            ["ユーザー設定｜トレーニング記録との関連情報"],
            ["項目", "内容"],
            ["記録表示名", p.displayName || "未設定"],
            ["利用者ID・管理番号", p.recordCode || "未設定"],
            ["登録日", p.createdAt || "不明"],
            ["最終更新日", p.updatedAt || "不明"],
            [],
            ["保存場所", "この端末のブラウザー内"],
            ["注意", "ユーザー設定の導入前に作成された記録は、明細上でユーザー未設定と表示されます。"]
        ],
        headerRows: [2], titleStyle: true, freezeRows: 2, widths: [26, 72]
    };
}
function userNameForRecord(r) { return r && r.userName ? r.userName : "未設定（過去記録）"; }
function userCodeForRecord(r) { return r && r.userCode ? r.userCode : ""; }

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
        rate: data.rate == null ? null : Number(data.rate || 0),
        kind: data.kind || "training",
        turns: Number(data.turns || 0),
        userProfileId: getActiveUserProfile().profileId || "unconfigured",
        userName: getActiveUserProfile().displayName || "未設定",
        userCode: getActiveUserProfile().recordCode || ""
    };
    if (data.articulation) record.articulation = data.articulation;
    if (data.recall) record.recall = data.recall;
    if (data.writing) record.writing = data.writing;
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
        rate: total ? Math.round(score / total * 100) : null,
        minutes: Math.round(sec / 60 * 10) / 10,
        turns: turns
    };
}
function formatTrainingRate(value) {
    return value == null || !Number.isFinite(Number(value)) ? '採点対象なし' : String(value) + '%';
}
function openRecords() {
    selectedRecordDate = selectedRecordDate || formatDateKey(new Date());
    recordMonth = parseDateKey("".concat(selectedRecordDate.slice(0, 7), "-01"));
    show("records");
    renderRecords();
}
function renderRecords() {
    renderRecordsStreak();
    renderCalendar();
    renderMonthSummary();
    renderSelectedDay();
    try { if (window.KotobaQuestUserProfile) window.KotobaQuestUserProfile.refreshSummaries(); } catch (_) { }
}
function getStreakHistory() {
    try {
        if (window.KotobaDailyStreak) return window.KotobaDailyStreak.completedDates();
    } catch (_) { }
    return [];
}
function isStreakCompleted(key) { return getStreakHistory().indexOf(key) >= 0; }
function renderRecordsStreak() {
    if (!$('recordsDailyStreak') || !window.KotobaDailyStreak) return;
    var state = window.KotobaDailyStreak.summary();
    $('recordsStreakCurrent').textContent = state.days + '日';
    $('recordsStreakBest').textContent = state.best + '日';
    $('recordsStreakToday').textContent = state.completedToday ? '🌸 達成！' : 'これから';
    $('recordsStreakNotice').textContent = state.completedToday ?
        '今日は達成済みです。明日もレッスンを完了して連続記録を伸ばしましょう。' :
        state.days ? '今日中に1回レッスンを完了すると、連続記録を続けられます。' :
        'レッスンを最後まで完了すると、今日から1日目が始まります。';
}
function renderMonthSummary() {
    var wrap = $("monthStats");
    if (!wrap)
        return;
    var rs = getMonthRecords(recordMonth);
    var days = new Set(rs.map(function (r) { return r.date; })).size;
    var summary = calcDaySummary(rs);
    var streakDays = getStreakHistory().filter(function (key) { return key.startsWith(monthKey(recordMonth)); }).length;
    wrap.innerHTML = [
        [days, "実施日数"], [summary.sessions, "実施回数"],
        [summary.total, "問題数"], [summary.score, "正解数"],
        [formatTrainingRate(summary.rate), "月平均正答率"], [summary.turns, "AI会話ターン"],
        [streakDays, "🌸 連続記録達成日"]
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
    var streakDays = new Set(getStreakHistory());
    for (var i = 0; i < first; i++) {
        var blank = document.createElement("div");
        blank.className = "calendar-day blank";
        wrap.appendChild(blank);
    }
    var _loop_1 = function (day) {
        var key = "".concat(y, "-").concat(String(m + 1).padStart(2, "0"), "-").concat(String(day).padStart(2, "0"));
        var rs = records.filter(function (r) { return r.date === key; });
        var streakDone = streakDays.has(key);
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "calendar-day" + (key === selectedRecordDate ? " selected" : "") + (rs.length ? " has-record" : "") + (streakDone ? " has-streak" : "");
        var count = rs.length ? "<span class=\"day-count\">".concat(rs.length, "</span>") : "";
        btn.innerHTML = "<span class=\"day-number\">".concat(day, "</span>").concat(rs.length ? '<span class="day-check">✅</span>' : '').concat(count).concat(streakDone ? '<span class="day-streak-flower" aria-hidden="true">🌸</span>' : '');
        btn.setAttribute('aria-label', String(day) + '日' + (streakDone ? '、連続記録達成' : '') + (rs.length ? '、トレーニング' + rs.length + '件' : ''));
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
    var streakDone = isStreakCompleted(key);
    var streakLabel = $('selectedDateStreak');
    if (streakLabel) {
        streakLabel.hidden = !streakDone;
        streakLabel.textContent = streakDone ? '🌸 この日はレッスンを完了し、連続記録を達成しました。' : '';
    }
    $("dayStats").innerHTML = "\n    <div class=\"record-stat\"><strong>".concat(summary.sessions, "</strong><span>\u56DE</span><small>\u5B9F\u65BD\u56DE\u6570</small></div>\n    <div class=\"record-stat\"><strong>").concat(summary.total, "</strong><span>\u554F</span><small>\u554F\u984C\u6570</small></div>\n    <div class=\"record-stat\"><strong>").concat(summary.score, "</strong><span>\u554F</span><small>\u6B63\u89E3\u6570</small></div>\n    <div class=\"record-stat\"><strong>").concat(formatTrainingRate(summary.rate), "</strong><span></span><small>\u5E73\u5747\u6B63\u7B54\u7387</small></div>\n    <div class=\"record-stat\"><strong>").concat(summary.minutes, "</strong><span>\u5206</span><small>\u5B9F\u65BD\u6642\u9593</small></div>");
    var list = $("dayRecordList");
    list.innerHTML = "";
    if (!rs.length) {
        list.innerHTML = '<div class="no-record">' + (streakDone ? '🌸 レッスンの達成記録があります。3Dゲームなどの詳細はそれぞれのゲーム内に保存される場合があります。' : 'この日のトレーニング記録はありません。') + '</div>';
    }
    else {
        rs.slice().reverse().forEach(function (r, i) {
            var row = document.createElement("div");
            row.className = "day-record-item";
            var soundDetail = r.articulation && Array.isArray(r.articulation.sounds)
                ? '<div class="record-articulation-sounds" aria-label="練習した構音">' +
                  r.articulation.sounds.map(function(item) {
                      return '<span class="' + (item.matched ? 'is-correct' : (item.skipped ? 'is-skipped' : (item.practiced ? 'is-practiced' : ''))) + '">' +
                          escapeHtml(item.group ? item.group + '・' : '') + escapeHtml(item.sound) + ' ' + (item.matched ? '✓' : (item.skipped ? 'スキップ' : (item.practiced ? '△' : '－'))) + '</span>';
                  }).join("") + '</div>' : '';
            row.innerHTML = '<div class="record-item-main"><strong>' + escapeHtml(r.genre) + '</strong><span>' +
                escapeHtml(r.activity) + '</span>' + soundDetail + '</div><div class="record-item-meta"><span>' +
                escapeHtml(r.time) + '</span><span>' + (r.writing ? '手書き '+Number(r.writing.attempted||0)+'問' : r.score + ' / ' + r.total + '問') + '</span><span>' +
                (r.writing ? ('初回正解 '+Number(r.writing.firstTryCorrect||0)+'／一致 '+Number(r.writing.matched||0)+'／不一致 '+Number(r.writing.incorrect||0)) : formatTrainingRate(r.rate)) + '</span><span>' + durationText(r.durationSec) + '</span></div>';
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
    // A4横向き専用。横幅は1ページに収め、縦方向は必要なだけページを分けます。
    var out = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><worksheet xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\"><sheetPr><pageSetUpPr fitToPage=\"1\" autoPageBreaks=\"0\"/></sheetPr><dimension ref=\"".concat(dim, "\"/>");
    out += '<sheetViews><sheetView workbookViewId="0" showGridLines="0">';
    if (options.freezeRows)
        out += '<pane ySplit="' + options.freezeRows + '" topLeftCell="A' + (options.freezeRows + 1) + '" activePane="bottomLeft" state="frozen"/>';
    out += '</sheetView></sheetViews><sheetFormatPr defaultRowHeight="20"/>';
    if (options.widths && options.widths.length) {
        out += '<cols>';
        options.widths.forEach(function (w, i) { if (w)
            out += "<col min=\"".concat(i + 1, "\" max=\"").concat(i + 1, "\" width=\"").concat(Number(w).toFixed(1), "\" customWidth=\"1\"/>"); });
        out += '</cols>';
    }
    out += '<sheetData>';
    safeRows.forEach(function (r, ri) {
        var rn = ri + 1;
        var isHeader = headerRows.has(rn);
        var isTitle = rn === 1 && options.titleStyle;
        var isDetail = rn > Number((options.headerRows || [])[0] || 1);
        var isBlank = !r.length || r.every(function (v) { return v === '' || v === null || v === undefined; });
        var rowHeight = isHeader ? 29 : (isTitle ? 32 : (isBlank ? 10 : 23));
        out += '<row r="' + rn + '" ht="' + rowHeight + '" customHeight="1">';
        r.forEach(function (v, ci) {
            var style = isHeader ? 1 : (isTitle ? 2 : (isDetail && ri % 2 ? 4 : (rn < Number((options.headerRows || [])[0] || 1) && ci % 2 === 0 ? 3 : 0)));
            out += cellXml(rn, ci + 1, v, style);
        });
        out += '</row>';
    });
    out += '</sheetData>';
    if (options.autoFilter && safeRows.length > 1) {
        var filterRow = Number((options.headerRows || [])[0] || 1);
        var filterEndRow = Number(options.autoFilterEndRow || maxRow);
        filterEndRow = Math.max(filterRow, Math.min(maxRow, filterEndRow));
        out += "<autoFilter ref=\"A".concat(filterRow, ":").concat(colName(maxCols)).concat(filterEndRow, "\"/>");
    }
    // A4横向き、枠線なし、見出し行を繰り返す印刷設定。
    out += '<printOptions gridLines="0" horizontalCentered="1" verticalCentered="0"/>';
    out += '<pageMargins left="0.30" right="0.30" top="0.46" bottom="0.46" header="0.20" footer="0.20"/>';
    out += '<pageSetup paperSize="9" orientation="landscape" fitToWidth="1" fitToHeight="0"/>';
    out += '<headerFooter><oddFooter>&amp;R&amp;P / &amp;N</oddFooter></headerFooter>';
    return out + '</worksheet>';
}
function xlsxStyles() {
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
        '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
        '<fonts count="4">' +
        '<font><sz val="10"/><name val="Yu Gothic"/><color rgb="FF24352D"/></font>' +
        '<font><b/><sz val="10"/><name val="Yu Gothic"/><color rgb="FFFFFFFF"/></font>' +
        '<font><b/><sz val="14"/><name val="Yu Gothic"/><color rgb="FF236443"/></font>' +
        '<font><b/><sz val="10"/><name val="Yu Gothic"/><color rgb="FF236443"/></font></fonts>' +
        '<fills count="4"><fill><patternFill patternType="none"/></fill>' +
        '<fill><patternFill patternType="gray125"/></fill>' +
        '<fill><patternFill patternType="solid"><fgColor rgb="FF286B4B"/><bgColor indexed="64"/></patternFill></fill>' +
        '<fill><patternFill patternType="solid"><fgColor rgb="FFF1F8F3"/><bgColor indexed="64"/></patternFill></fill></fills>' +
        '<borders count="2"><border/><border><bottom style="thin"><color rgb="FFDDE7E0"/></bottom></border></borders>' +
        '<cellXfs count="5">' +
        '<xf numFmtId="0" fontId="0" fillId="0" borderId="1" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>' +
        '<xf numFmtId="0" fontId="1" fillId="2" borderId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>' +
        '<xf numFmtId="0" fontId="2" fillId="0" borderId="0" applyFont="1" applyAlignment="1"><alignment vertical="center"/></xf>' +
        '<xf numFmtId="0" fontId="3" fillId="0" borderId="0" applyFont="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>' +
        '<xf numFmtId="0" fontId="0" fillId="3" borderId="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>' +
        '</cellXfs><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>' +
        '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>';
}
function xlsxEntries(sheets) {
    var entries = [];
    entries.push(["[Content_Types].xml", "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Types xmlns=\"http://schemas.openxmlformats.org/package/2006/content-types\"><Default Extension=\"rels\" ContentType=\"application/vnd.openxmlformats-package.relationships+xml\"/><Default Extension=\"xml\" ContentType=\"application/xml\"/><Override PartName=\"/xl/workbook.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml\"/><Override PartName=\"/xl/styles.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml\"/>".concat(sheets.map(function (_, i) { return "<Override PartName=\"/xl/worksheets/sheet".concat(i + 1, ".xml\" ContentType=\"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml\"/>"); }).join(""), "</Types>")]);
    entries.push(["_rels/.rels", "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Relationships xmlns=\"http://schemas.openxmlformats.org/package/2006/relationships\"><Relationship Id=\"rId1\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument\" Target=\"xl/workbook.xml\"/></Relationships>"]);
    var printTitles = sheets.map(function (sh, i) {
        var header = Number((sh.headerRows || [])[0] || 0);
        if (!header) return '';
        var safeSheet = String(sh.name).replace(/'/g, "''");
        return '<definedName name="_xlnm.Print_Titles" localSheetId="' + i + '">\'' + xmlEscape(safeSheet) + '\'!$' + header + ':$' + header + '</definedName>';
    }).join('');
    entries.push(["xl/workbook.xml", "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><workbook xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\" xmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\"><workbookPr/><bookViews><workbookView xWindow=\"0\" yWindow=\"0\" windowWidth=\"18000\" windowHeight=\"12000\"/></bookViews><sheets>".concat(sheets.map(function (s, i) { return "<sheet name=\"".concat(xmlEscape(s.name), "\" sheetId=\"").concat(i + 1, "\" r:id=\"rId").concat(i + 1, "\"/>"); }).join(""), "</sheets>", printTitles ? '<definedNames>' + printTitles + '</definedNames>' : '', '<calcPr calcId="191029" fullCalcOnLoad="1"/></workbook>')]);
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
function downloadBlobInBrowser(blob, name) {
    var a = document.createElement("a");
    var url = URL.createObjectURL(blob);
    a.href = url;
    a.download = name;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 1500);
}
function downloadBlob(blob, name) {
    // Android WebViewではネイティブの保存先選択画面を利用します。
    if (window.AndroidFiles && typeof window.AndroidFiles.saveBase64 === "function" && blob && typeof blob.arrayBuffer === "function") {
        blob.arrayBuffer().then(function (buffer) {
            var bytes = new Uint8Array(buffer), binary = "", chunkSize = 0x8000;
            for (var i = 0; i < bytes.length; i += chunkSize) {
                binary += String.fromCharCode.apply(null, bytes.subarray(i, Math.min(i + chunkSize, bytes.length)));
            }
            window.AndroidFiles.saveBase64(name, blob.type || "application/octet-stream", btoa(binary));
        }).catch(function (error) {
            console.error("Android保存に失敗したため、ブラウザーのダウンロードを試します。", error);
            downloadBlobInBrowser(blob, name);
        });
        return;
    }
    // ブラウザ版は通常のダウンロード機能を利用します。
    downloadBlobInBrowser(blob, name);
}

function trainingPrintEsc(value) {
    return xmlEscape(value === null || value === undefined ? "" : String(value)).replace(/\r?\n/g, "<br>");
}
function createTrainingPrintHtml(fileName, sheets) {
    var printableSheets = (Array.isArray(sheets) ? sheets : []).filter(function (s) {
        return s && s.name && s.name !== "ユーザー設定" && s.name !== "プロフィール設定";
    });
    var safeTitle = String(fileName || "トレーニング記録").replace(/\.xlsx$/i, "").replace(/_/g, " ");
    var sheetHtml = printableSheets.map(function (sheet, sheetIndex) {
        var rows = Array.isArray(sheet.rows) ? sheet.rows : [];
        var headers = Array.isArray(sheet.headerRows) ? sheet.headerRows : [1];
        var headerIndex = Math.max(0, Math.min(rows.length - 1, Number(headers[0] || 1) - 1));
        var maxCols = Math.max(1, rows.reduce(function (max, row) { return Math.max(max, Array.isArray(row) ? row.length : 0); }, 0));
        var topRows = rows.slice(0, headerIndex);
        var tableRows = rows.slice(headerIndex);
        var widths = Array.isArray(sheet.widths) ? sheet.widths.slice(0, maxCols) : [];
        while (widths.length < maxCols) widths.push(1);
        var widthSum = widths.reduce(function (sum, w) { return sum + (Number(w) > 0 ? Number(w) : 1); }, 0) || maxCols;
        function cellText(v) { return trainingPrintEsc(v); }
        function renderTopRow(row, rowIndex) {
            if (!Array.isArray(row) || !row.length || row.every(function (v) { return v === "" || v === null || v === undefined; })) return "";
            if (sheet.titleStyle && rowIndex === 0) return '<h2 class="record-title">' + cellText(row.filter(function (v) { return v !== "" && v !== null && v !== undefined; }).join(" ")) + '</h2>';
            var chunks = [];
            for (var i = 0; i < row.length; i += 2) {
                var label = row[i];
                var value = row[i + 1];
                if (label === "" || label === null || label === undefined) continue;
                chunks.push('<div class="meta-pair"><span class="meta-label">' + cellText(label) + '</span><span class="meta-value">' + cellText(value) + '</span></div>');
            }
            return '<div class="meta-grid">' + chunks.join("") + '</div>';
        }
        var topHtml = topRows.map(function (row, i) { return renderTopRow(row, i); }).join("");
        var colgroup = '<colgroup>' + widths.map(function (w) { return '<col style="width:' + (Math.max(1, Number(w) || 1) / widthSum * 100).toFixed(3) + '%">'; }).join("") + '</colgroup>';
        var headerRow = tableRows.length ? tableRows[0] : [];
        var thead = '<thead><tr>' + Array.from({ length: maxCols }, function (_, i) { return '<th>' + cellText(headerRow[i]) + '</th>'; }).join("") + '</tr></thead>';
        // 横に長い表は印刷時だけカード形式にして、A4でも十分な文字サイズを確保します。
        var denseSheet = maxCols > 8;
        var cards = denseSheet ? tableRows.slice(1).filter(function (row) {
            return Array.isArray(row) && row.some(function (v) { return v !== '' && v !== null && v !== undefined; });
        }).map(function (row, index) {
            if (row.length >= 2 && (String(row[0]) === 'メモ' || String(row[0]) === '注意')) {
                return '<aside class="print-note"><strong>' + cellText(row[0]) + '：</strong>' + cellText(row.slice(1).filter(function (v) { return v !== '' && v !== null && v !== undefined; }).join(' ')) + '</aside>';
            }
            var pairs = Array.from({ length: maxCols }, function (_, i) {
                if (!headerRow[i]) return '';
                var value = row[i] === undefined || row[i] === null || row[i] === '' ? '—' : row[i];
                return '<div class="record-field"><dt>' + cellText(headerRow[i]) + '</dt><dd>' + cellText(value) + '</dd></div>';
            }).join('');
            return '<article class="print-record"><div class="record-head">記録 ' + (index + 1) + '</div><dl class="record-fields">' + pairs + '</dl></article>';
        }).join('') : '';
        var body = tableRows.slice(1).map(function (row) {
            row = Array.isArray(row) ? row : [];
            if (!row.length || row.every(function (v) { return v === "" || v === null || v === undefined; })) return '<tr class="blank-row"><td colspan="' + maxCols + '">&nbsp;</td></tr>';
            if (row.length >= 2 && (String(row[0]) === "メモ" || String(row[0]) === "注意")) {
                return '<tr class="note-row"><td colspan="' + maxCols + '"><strong>' + cellText(row[0]) + '：</strong>' + cellText(row.slice(1).filter(function (v) { return v !== "" && v !== null && v !== undefined; }).join(" ")) + '</td></tr>';
            }
            return '<tr>' + Array.from({ length: maxCols }, function (_, i) { return '<td>' + cellText(row[i]) + '</td>'; }).join("") + '</tr>';
        }).join("");
        return '<section class="print-sheet' + (sheetIndex ? ' page-next' : '') + '">' +
            '<h1 class="sheet-name">' + cellText(sheet.name) + '</h1>' + topHtml +
            (denseSheet ? (cards || '<p class="no-print-record">記録はありません。</p>') : '<table class="record-table">' + colgroup + thead + '<tbody>' + body + '</tbody></table>') +
            '</section>';
    }).join("");
    var css = '@page{size:A4 landscape;margin:8mm}*{box-sizing:border-box}html,body{margin:0;padding:0;color:#182a22;font-family:"Yu Gothic","Meiryo",sans-serif;font-size:9pt}body{padding:0}.print-sheet{width:100%;page-break-after:always;break-after:page}.print-sheet:last-child{page-break-after:auto;break-after:auto}.sheet-name{font-size:17pt;margin:0 0 4mm;border-bottom:2px solid #3c6b52;padding-bottom:2mm;color:#244d39}.record-title{font-size:13pt;margin:1mm 0 3mm}.meta-grid{display:flex;flex-wrap:wrap;gap:2mm 5mm;margin:1mm 0 2mm}.meta-pair{display:flex;gap:2mm;min-width:20%;max-width:100%;margin-bottom:1mm}.meta-label{font-weight:bold;white-space:nowrap}.meta-value{overflow-wrap:anywhere}.record-table{width:100%;table-layout:fixed;border-collapse:collapse;font-size:8pt}.record-table th,.record-table td{border:0.5pt solid #929c95;padding:1.5mm 1.3mm;vertical-align:top;overflow-wrap:anywhere;word-break:break-word;line-height:1.25}.record-table th{background:#dceeff;color:#193b2a;font-weight:bold;text-align:center}.record-table thead{display:table-header-group}.record-table tr{page-break-inside:avoid;break-inside:avoid}.blank-row td{height:2mm;border-left:0;border-right:0;border-bottom:0;border-top:0}.note-row td{background:#fafbf7;font-size:8.5pt}.print-help{font-size:8pt;color:#69766e;margin-top:3mm}@media screen{body{background:#e9eee9;padding:12mm}.print-sheet{background:white;padding:10mm;margin:0 auto 10mm;max-width:297mm;box-shadow:0 2px 14px #0002}.record-table{font-size:9pt}}@media print{.print-sheet{padding:0;margin:0;box-shadow:none}.record-table{font-size:8pt}.record-table th{background:#dceeff!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}}';
    css += [
        '@page{size:A4 portrait;margin:12mm}',
        'html,body{color:#24352d;font-size:10pt}',
        '.sheet-name{font-size:16pt;border-bottom-color:#286b4b;color:#236443}',
        '.record-title{font-size:12pt}',
        '.record-table{font-size:9pt}',
        '.record-table th,.record-table td{border:0;border-bottom:0.5pt solid #d6e4da;padding:2mm 1mm;line-height:1.35}',
        '.record-table th{background:#286b4b;color:#fff}.record-table tbody tr:nth-child(even){background:#f1f8f3}',
        '.print-record{border:0.6pt solid #d6e4da;border-radius:2mm;margin:0 0 4mm;overflow:hidden;page-break-inside:avoid;break-inside:avoid}',
        '.record-head{padding:2mm 3mm;background:#e5f2e8;color:#236443;font-weight:bold;font-size:10pt}',
        '.record-fields{display:grid;grid-template-columns:1fr 1fr;gap:2mm 4mm;margin:0;padding:3mm}',
        '.record-field{min-width:0;display:grid;grid-template-columns:33% 1fr;gap:2mm;align-items:start}',
        '.record-field dt{font-size:8.5pt;font-weight:bold;color:#476f55;overflow-wrap:anywhere}',
        '.record-field dd{margin:0;font-size:9.5pt;overflow-wrap:anywhere;white-space:pre-wrap}',
        '.print-note{background:#f1f8f3;border-left:3pt solid #286b4b;margin:3mm 0;padding:3mm;overflow-wrap:anywhere;white-space:pre-wrap;break-inside:avoid}',
        '@media screen{.print-sheet{max-width:210mm;padding:12mm}}',
        '@media print{.record-table th{background:#286b4b!important;color:#fff!important}.record-table th,.record-head{print-color-adjust:exact;-webkit-print-color-adjust:exact}}'
    ].join('');
    return '<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + trainingPrintEsc(safeTitle) + ' - 印刷</title><style>' + css + '</style></head><body>' + sheetHtml + '<script>window.addEventListener("load",function(){setTimeout(function(){try{window.focus();window.print();}catch(e){}},450);});</script></body></html>';
}
function openTrainingPrintWindow(html) {
    var printWindow = null;
    try { printWindow = window.open("", "kotobaquest-training-print"); } catch (_) { printWindow = null; }
    if (printWindow) {
        try {
            printWindow.document.open();
            printWindow.document.write(html);
            printWindow.document.close();
            return true;
        } catch (e) {
            try { printWindow.close(); } catch (_) {}
        }
    }
    // ポップアップがブロックされた場合も、同じ操作のまま印刷用iframeへフォールバック。
    try {
        var frame = document.createElement("iframe");
        frame.title = "トレーニング記録の印刷画面";
        frame.style.position = "fixed";
        frame.style.right = "0";
        frame.style.bottom = "0";
        frame.style.width = "1px";
        frame.style.height = "1px";
        frame.style.border = "0";
        frame.style.opacity = "0.01";
        frame.setAttribute("aria-hidden", "true");
        document.body.appendChild(frame);
        frame.onload = function () {
            setTimeout(function () {
                try {
                    frame.contentWindow.focus();
                    frame.contentWindow.print();
                    frame.contentWindow.onafterprint = function () { setTimeout(function () { if (frame.parentNode) frame.parentNode.removeChild(frame); }, 500); };
                } catch (e) { console.error("印刷画面を開けませんでした", e); }
            }, 500);
        };
        frame.srcdoc = html;
        setTimeout(function () { if (frame.parentNode) frame.parentNode.removeChild(frame); }, 120000);
        return true;
    } catch (e) {
        console.error("印刷画面を準備できませんでした", e);
        alert("Excelファイルは出力しましたが、印刷画面を開けませんでした。ブラウザーのポップアップ設定をご確認ください。");
        return false;
    }
}
function trainingBlobToBase64(blob) {
    return blob.arrayBuffer().then(function (buffer) {
        var bytes = new Uint8Array(buffer), binary = "", chunk = 0x8000;
        for (var i = 0; i < bytes.length; i += chunk) binary += String.fromCharCode.apply(null, bytes.subarray(i, Math.min(i + chunk, bytes.length)));
        return btoa(binary);
    });
}
function exportXlsx(name, sheets) {
    var zip = makeZip(xlsxEntries(sheets));
    var blob = new Blob([zip], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    var printHtml = createTrainingPrintHtml(name, sheets);
    // Android版は、Excel保存後にAndroidのシステム印刷画面へ移動します。
    if (window.AndroidPrint && typeof window.AndroidPrint.saveAndPrint === "function" && blob.arrayBuffer) {
        trainingBlobToBase64(blob).then(function (base64) {
            var ok = window.AndroidPrint.saveAndPrint(name, blob.type, base64, String(name || "トレーニング記録").replace(/\.xlsx$/i, ""), printHtml);
            if (!ok) { downloadBlob(blob, name); openTrainingPrintWindow(printHtml); }
        }).catch(function (error) {
            console.error("Android出力処理に失敗しました", error);
            downloadBlob(blob, name);
            openTrainingPrintWindow(printHtml);
        });
        return;
    }
    // ブラウザ版はExcelダウンロードを開始し、続けて印刷ダイアログを開きます。
    downloadBlob(blob, name);
    openTrainingPrintWindow(printHtml);
}
function exportDayXlsx() {
    var key = selectedRecordDate, rs = getDayRecords(key), sum = calcDaySummary(rs), note = getDayNote(key);
    if (!rs.length && !note.trim()) {
        if (!confirm("".concat(japaneseDate(key), "\u306B\u306F\u8A18\u9332\u304C\u3042\u308A\u307E\u305B\u3093\u3002\u7A7A\u306EExcel\u3092\u4F5C\u6210\u3057\u307E\u3059\u304B\uFF1F")))
            return;
    }
    var rows = [["失語症トレーニング｜1日の記録"], ["日付", japaneseDate(key)], [], ["実施回数", sum.sessions, "問題数", sum.total, "正解数", sum.score, "平均正答率", formatTrainingRate(sum.rate)], [], ["時刻", "記録表示名", "利用者ID・管理番号", "カテゴリ", "ジャンル", "課題", "記録種別", "初回正解", "問題数", "初回正答率", "AI会話ターン", "所要時間", "再挑戦で正解", "3回不正解", "回答回数", "ヒント使用数", "写字照合一致", "写字初回正解", "写字再挑戦正解", "写字3回不一致"]];
    rs.forEach(function (r) { return rows.push([r.time, userNameForRecord(r), userCodeForRecord(r), r.category || "", r.genre, r.activity, r.kind === "aiConversation" ? "AI会話" : r.writing ? "写字（手書き照合）" : "通常トレーニング", r.score, r.total, formatTrainingRate(r.rate), r.turns || 0, durationText(r.durationSec), r.recall?r.recall.afterRetryCorrect:"", r.recall?r.recall.incorrect:"", r.recall?r.recall.totalAttempts:"", r.recall?r.recall.questions.reduce(function(s,q){return s+q.hintsUsed;},0):"", r.writing?r.writing.matched:"",r.writing?r.writing.firstTryCorrect:"",r.writing?r.writing.afterRetryCorrect:"",r.writing?r.writing.incorrect:""]); });
    rows.push([], ["メモ", note]);
    exportXlsx("\u3053\u3068\u3070\u30AF\u30A8\u30B9\u30C8_\u30C8\u30EC\u30FC\u30CB\u30F3\u30B0\u8A18\u9332_".concat(key, ".xlsx"), [
        { name: "1日の記録", rows: rows, headerRows: [6], titleStyle: true, freezeRows: 6, widths: [9, 16, 15, 14, 14, 22, 12, 9, 7, 10, 9, 9, 13, 12, 10, 12, 13, 13, 13, 13, 13], autoFilter: true, autoFilterEndRow: Math.max(6, rows.length - 2) },
        getUserProfileExportSheet()
    ]);
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
    Object.keys(byDay).sort().forEach(function (key) { var ss = calcDaySummary(byDay[key]); summary.push([key, ss.sessions, ss.total, ss.score, formatTrainingRate(ss.rate), ss.minutes]); });
    var detail = [["日付", "時刻", "記録表示名", "利用者ID・管理番号", "カテゴリ", "ジャンル", "課題", "記録種別", "初回正解", "問題数", "初回正答率", "AI会話ターン", "所要時間", "再挑戦で正解", "3回不正解", "回答回数", "ヒント使用数", "写字照合一致", "写字初回正解", "写字再挑戦正解", "写字3回不一致"]];
    rs.slice().sort(function (a, b) { return a.finishedAt.localeCompare(b.finishedAt); }).forEach(function (r) { return detail.push([r.date, r.time, userNameForRecord(r), userCodeForRecord(r), r.category || "", r.genre, r.activity, r.kind === "aiConversation" ? "AI会話" : r.writing ? "写字（手書き照合）" : "通常トレーニング", r.score, r.total, formatTrainingRate(r.rate), r.turns || 0, durationText(r.durationSec), r.recall?r.recall.afterRetryCorrect:"", r.recall?r.recall.incorrect:"", r.recall?r.recall.totalAttempts:"", r.recall?r.recall.questions.reduce(function(s,q){return s+q.hintsUsed;},0):"", r.writing?r.writing.matched:"",r.writing?r.writing.firstTryCorrect:"",r.writing?r.writing.afterRetryCorrect:"",r.writing?r.writing.incorrect:""]); });
    var noteRows = [["日付", "メモ"]];
    Object.keys(notes).filter(function (k) { return k.startsWith(mk); }).sort().forEach(function (k) { return noteRows.push([k, notes[k]]); });
    exportXlsx("\u5931\u8A9E\u75C7\u30C8\u30EC\u30FC\u30CB\u30F3\u30B0_".concat(mk, ".xlsx"), [
        { name: "月間集計", rows: summary, headerRows: [4], titleStyle: true, freezeRows: 4, widths: [14, 12, 12, 12, 16, 16], autoFilter: true },
        { name: "実施記録", rows: detail, headerRows: [1], freezeRows: 1, widths: [12, 8, 16, 15, 14, 14, 21, 12, 9, 7, 11, 9, 9, 13, 12, 10, 12, 13, 13, 13, 13], autoFilter: true },
        { name: "日別メモ", rows: noteRows, headerRows: [1], freezeRows: 1, widths: [12, 54], autoFilter: true },
        getUserProfileExportSheet()
    ]);
}
function initRecordEvents() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    (_a = $("recordsBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", openRecords);
    (_b = $("recordsHomeBtn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () { return show("home"); });
    var previewStreakBtn = $('previewStreakBtn');
    if (previewStreakBtn) previewStreakBtn.addEventListener('click', function () {
        if (window.KotobaDailyStreak) window.KotobaDailyStreak.preview();
    });
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
        if (confirm("トレーニング記録とメモを削除しますか？ 花の連続記録は削除されず、残ります。")) {
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
