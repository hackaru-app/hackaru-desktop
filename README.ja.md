[English](./README.md) | [日本語](./README.ja.md)

---

# Hackaru Desktop

[![Build Status](https://travis-ci.org/ktmouk/hackaru-desktop.svg?branch=master)](https://travis-ci.org/ktmouk/hackaru-desktop)

[Hackaru](https://github.com/ktmouk/hackaru) のデスクトップ版アプリ。

## 特徴

- このアプリは [Electron](https://github.com/electron/electron) で作成されています。 Windows、macOS、Linuxをサポートしています。
- 自動トラッキングをサポートしています。
- PCの状態からタイマーを停止/開始。 (例:ノートPCを閉じたとき、タイマーを停止など)
- オープンソースで提供しています。

## 自動トラッキング
普段使っているアプリの使用時間を自動で計測。計測開始ボタンを押す手間が省けます。(Atom Editor、Illustrator など)

<img src="./docs/images/auto-tracking.gif" width="730">

## インストール方法

1. アプリをインストール
  - **On Mac**
    1. Hackaru-x.y.z.dmg を [Release](https://github.com/ktmouk/hackaru-desktop/releases) からダウンロード。
    2. Hackaru-x.y.z.dmg を実行。
    3. Hackaru のアイコンをApplicationフォルダに移動。

  - **On Windows**
    1. Hackaru-x.y.z.exe を [Release](https://github.com/ktmouk/hackaru-desktop/releases) からダウンロード。
    2. Hackaru-x.y.z.exe を実行。

  - **On Linux**
     1. Hackaru-x.y.z.AppImage を [Release](https://github.com/ktmouk/hackaru-desktop/releases) からダウンロード。
     2. Hackaru-x.y.z.AppImage を実行。

2. インストールしたアプリを起動します。

3. アプリを起動したら、 [APIサーバ](https://github.com/ktmouk/hackaru-api) のURLを入力して認証ボタンを押します。
   [hackaru.app](https://hackaru.app) を利用する場合は、URLは https://api.hackaru.app です。 （変更不要です）。   
   もし、自身で立てたサーバを利用するなら、あなたのAPIサーバのURLを入力してください。 (例: http://localhost:3000)


  <img src="./docs/images/login_screen.png" width="300">

## Contributors

1. [フォークします](https://github.com/ktmouk/hackaru-desktop/fork)。

2. フォークしたリポジトリをクローンして、新しいブランチを切ります。
```
$ git checkout -b new-feature
```

3. アプリをDevモードで起動します。
```
$ npm install
$ npm run dev
```
> このアプリではOAuthトークンの保管に [atom/node-keytar](https://github.com/atom/node-keytar) を使用しています。Linuxでビルドする場合は、 libsecret のインストールが必要になるかもしれません。 詳しくは [node-keytar](https://github.com/atom/node-keytar) を参照ください。

4. コードを変更します。

5. ESLintを実行します。
```
$ npm run lint:fix
```

6. 問題がなければ、ぜひPullRequestをお送りください！

## ライセンス

- [MIT](./LICENSE)

## Buy Me A Coffee

<a href="https://www.buymeacoffee.com/T4KDHBPV6"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>   

もし気に入ってくれたら、寄付していただけると嬉しいです。 :relaxed:


---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli).
