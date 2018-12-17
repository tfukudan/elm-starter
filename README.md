# こんにちは Elm

[https://elm-lang.org/](https://elm-lang.org/)

## なぜElmか

- IBMがElmを[採用した](https://discourse.elm-lang.org/t/ibm-releases-elm-powered-app/2364)から
- Elm のいいところは型によってコンパイルが通ればElm内の世界では安全に動くから
- エラーがわかり易すぎるから

## やること

簡単に手元でElmを動かしてみる練習です。Elmのコードの解説は行いません。

Elmのオンラインエディター [ellie](https://ellie-app.com/) もありますが、今回は自分の手元で動かして実際にデプロイするまでをチョッパヤでやってみます。

## 利用したもの

- [Elm](https://elm-lang.org/) アプリケーション開発言語
- [parcel](https://parceljs.org/) バンドラー
- [glitch](https://glitch.com/) nodeのサーバー

## 写経(コピペ)

[evancz/elm-todomvc](https://github.com/evancz/elm-todomvc) から [`index.html`](./src/index.html), [`style.css`](./src/style.css), [`Main.elm`](./src/Main.elm) へ3ファイルをコピペします。

コピペ元は `index.html` 上にJavascriptを書いているのでアプリケーションのエントリーポイント用に新規に [`main.js`](./src/main.js) を作成します。Elmのportと呼ばれる仕組みでlocalStorageを利用するJavascript側のコードを定義します。

Parcelがimportなどを解決してES5に変換してバンドルしてくれるので必要なcssも `import 'style.css'`とすれば `index.html`にstyleタグで展開されます。

[`package.json`](./package.json) や [`elm.json`](./elm.json) の依存関係のファイルはビルド時に追加されるのであまり気にする必要はありません。

## 開発

実際に開発をするためのツールをインストールします。npmやyarnはお好きな方をご利用ください。

- [parcel Getting Started](https://parceljs.org/getting_started.html)
  - `npm install -g parcel-bundler`
- [Elm Install](https://guide.elm-lang.org/install.html) からインストール
  - `npm install -g elm`

`parcel`にHTMLを渡すとビルドしてローカルサーバーが立ち上がります。

```sh
$parcel ./src/index.html
-- UNKNOWN IMPORT -------- C:\Users\t.fukuda\playground\elm-starter\src\Main.elm

The Main module has a bad import:

    import Json.Decode

Do you want the one from the elm/json package? If so, run this command to add
that dependency to your elm.json file:

    elm install elm/json

If you want a local file, make sure the `Json.Decode` module is in one of the
"source-directories" listed in your elm.json file.
```

おそらくコピペしただけだと依存が足りないと言われるので言われるがまま `elm install elm/json` します。

```sh
$elm install elm/json
I found it in your elm.json file, but in the "indirect" dependencies.
Should I move it into "direct" dependencies for more general use? [Y/n]: Y
Dependencies loaded from local cache.
Dependencies ready!
```

で追加し、再度 parcel します。

```sh
$parcel ./src/index.html
Server running at http://localhost:1234
√  Built in 977ms.
```

以上でlocalhostにアクセスすると見事TodoMVCが見えるようになりました。

最後に開発用のスクリプトやglitch用に [`package.json`](./package.json) を調整します。

## デプロイ

### Githubにpush

今までのコードをGithubに新規レポジトリを作成してpushします。
[https://help.github.com/articles/creating-a-new-repository/](https://help.github.com/articles/creating-a-new-repository/)

### glitchでimport

[https://medium.com/glitch/import-code-from-anywhere-83fb60ea4875](https://medium.com/glitch/import-code-from-anywhere-83fb60ea4875)

以上でnodeのサーバーが立ち上がってアクセスができます。
今回は `https://candle-heart.glitch.me/` になりました。

## 補足・その後

### Elm

Haskellに非常によく似た文法のAltJS言語です。Haskellと比べると型クラスなどモナド臭ゼロで入門しやすいです。

[The Elm Architecture](https://guide.elm-lang.org/architecture/)(TEA)と呼ばれ[redux](https://redux.js.org/introduction/prior-art#elm)や[vuex](https://vuex.vuejs.org/#what-is-a-state-management-pattern)が参考にしたアーキテクチャです。

TEAは実行時エラーとはほぼ無縁の安全なアーキテクチャで、Javascriptとの連携も容易です。

翻訳された [日本語ガイド](https://guide.elm-lang.jp/architecture/) も https://github.com/elm-jp/guide で管理されています。

vscode で開発する場合は[公式の拡張](https://marketplace.visualstudio.com/items?itemName=sbrink.elm) を入れると便利でした。

### parcel

> 📦🚀 Blazing fast, zero configuration web application bundler

の通り、簡単に速くアプリケーションをバンドルできるので書き捨てる系のアプリと相性がすごくいいです。

いろいろやりすぎな感じもしますがElm以外にも対応しています。

中でも面白いのはRustを `import { hello } from './hello.rs'` でwasmに変換されてかなりシームレスにインポートできました。

対応しているAssetは [v1.10.3/src/assets](https://github.com/parcel-bundler/parcel/tree/v1.10.3/src/assets) です。

### glitchについて

Stackoverflow, Trello などを作っている Fog Creek Software が運営しているサービスです。

ゆるふわな見た目をしていますがSQLite3やWebsocketも利用できたりとリソースも結構使えるみたいです(未確認)。

[github.com/glitch-tools](https://github.com/glitch-tools) などを使うとより快適に開発できるみたいです。
