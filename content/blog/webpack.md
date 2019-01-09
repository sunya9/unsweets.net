---
title: Webpackを色々いじってみる
tags:
  - Javascript
  - node.js
  - webpack
id: 136
categories:
  - Memo
date: 2016-03-22 00:53:55
---
### 環境

*   Windows 10 64bit
*   Node.js 5.7.1
*   npm 3.6.0
*   webpack 1.12.14
<!--more-->

### webpackとは

JavascriptやCSS、画像などの依存関係のあるファイルをひとまとめにするツール。ひとまとめとは言ってもエントリポイントは複数作れる。

### webpackのインストール

`npm install -g webpack`で準備完了。プロジェクトフォルダにインストールする場合はgオプションは要らないが、コマンドを実行するときは`./node_modules/.bin/webpack`のように指定する必要がある。npm runコマンドを通して実行する場合は自動的にパスが通る。

### 基本的な設定

以下の様なjsをwebpack.config.jsとして保存する。

```
const path = require('path');
const config = {
  entry: './js/main',
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js'
  }
};

module.exports = config;
```

また、webpack.config.jsがあるディレクトリにjsディレクトリを作っておき、その中にmain.jsを作成しておく。中身はなんでも良い。

次にターミナル上でwebpack.config.jsがあるディレクトリで`webpack`と叩いて実行するとターミナル上にはWebpackのバージョンやらHashが表示され、bundle.jsが生成される。entryの項目は.jsの場合は省略できる。パスに./がないとうまく探せないようなので注意する。

outputの項目は出力されるファイルパスとファイル名を指定する。ここではbuildというディレクトリにbundle.jsというファイルを生成する。ディレクトリがない場合は自動的に作成してくれる。ブラウザで読み込む場合はscript要素で通常通り読み込む。

### Babelを適用させる

よくあるやつ。Babelを適用させるとES2015などの未だにブラウザで実装されていない先進的な機能をうまいこと変換してくれるようになる。細かいとこは省略。`npm install --save-dev babel-loader`でOK.

Loaderを使うことによって様々なファイルをロードすることが出来るようになる。

```
const config = {
  // 省略
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
};
```

拡張子がjsで終わるファイルにloaderが適用されるようにする。この時node_modulesディレクトリを除外しておかないと遅くなってしまうようなので指定する。

これだけでは設定が足りないのでプロジェクトフォルダのルートディレクトリに.babelrcを作成しておく。とりあえずはES2015の機能を使いたいので`npm install --save-dev babel-preset-es2015`を実行してES2015のものを変換できるようにする準備をしておく。.babelrcファイルでは以下の様な記述をした。

```
{
  "presets": ["es2015"]
}
```

コマンドを実行するとES2015的な構文はうまいこと変換されていることが確認できる。

ちなみに.babelrcを設定しなくてもquery stringと呼ばれるものを使って設定することができるのだが、個人的にはあまり分かりやすいものとは思えないので.babelrcの作成をすることをおすすめする。

### jQueryプラグインを読み込む

jQueryプラグインは$やjQueryと言ったオブジェクトが宣言されていることが前提なのでそこをどうにかするにはpluginsのオプションを使用する。

```
const webpack = require('webpack');
const config = {
  // 省略
  plugins: [
    webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
};
```

webpackのProvidePluginを利用する。ここに宣言されたものはjQueryのようにライブラリありきで書かれたライブラリに対して変数を認識できるようになる。上記の例では$とjQueryという宣言がjqueryモジュールであることを示している。require時に指定するようなモジュール名を示しているのでjQueryのような文字列を与えると怒られる。当たり前だがjQueryをインストールしておく必要がある(`npm install --save jquery`)。

ライブラリを使うときはエントリファイルから読み込まれるjsファイルで以下のように指定する。例として[slick](http://kenwheeler.github.io/slick/)と呼ばれるカルーセルライブラリをインストールした想定で進めていく。

```
// Babelなしで書く場合
var $ = require('jquery');
require('slick-carousel');

// Babelを使用し、import構文で書く場合
import $ from 'jquery';
import 'slick-carousel';

$('#slider').slick(); // slickメソッドが取り込まれている
```

requireの左辺は必要ない。また、import構文の場合はfromを省略して直接モジュールを指定することができる。

疲れたのでここまで。なるべく早く次を書きたい。