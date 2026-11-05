ことばクエスト Ver.71 — コトバ・ダンジョン UI 強化

主な更新
- 配布ZIP名を短縮：KQ_PC_V71.zip / KQ_Android_V71.zip
- メダル5枚の進捗を5スロットのゲージで表示
- ガチャ中はカプセル召喚アニメーション → 新アバター／着せ替えの獲得演出
- 画像・絵文字アイテムの表示、獲得後の装備操作は既存のまま維持
- PCブラウザではホームを2列レイアウトに拡張し、カードのホバー演出・背景の浮遊・輝きアニメーションを追加
- アバターの浮遊・呼吸風モーションを継続、ガチャボタンとメダルゲージをゲーム風に強化
- prefers-reduced-motion 設定では動きを抑制
- Android版はWebViewに同じHTML/CSS/JavaScriptを同期し、versionCode 71 / versionName 1.3.5に更新

ブラウザ版の更新
KotobaQuestWeb フォルダー内の中身をGitHub Pagesの公開ルートへアップロードしてください。

Android版のビルド
KotobaQuestAndroid フォルダーをAndroid Studioで開き、Android SDK Platform 36 / Build Tools 36.0.0 / JDK 17以上を用意して、build-apk.bat または :app:assembleDebug を実行してください。

確認内容
- JavaScript構文チェック
- dungeon HTML内のID参照
- アバター画像参照
- Android WebView内のdungeon HTML/CSS/JSの一致
- ZIPの整合性

注意
Android SDKがこの制作環境にないためAPKの実ビルドおよび端末実機テストは未実施です。
