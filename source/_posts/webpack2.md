title: Webpackを色々いじってみる2
tags:
  - Javascript
  - node.js
  - webpack
id: 149
categories:
  - Memo
date: 2016-03-24 01:09:00
---
[この前](/images/webpack.html)の続き。

<!--more-->

### CSSをロードする

style-loaderとcss-loaderを使うことでCSSをJavascript側でimportすると、requireしたCSSをhead内に挿入してくれるようになる。`npm install --save-dev style-loader css-loader`でOK。
webpack.config.jsを以下のように設定する。

```
const config = {
  // 省略
 module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  }
};
```

Javascript側ではimportもしくはrequireをする。

```
// Babel
import `../css/main.css`
// or commonjs
require('../css/main.css');
```

この場合パスはJavascriptのファイルから見た相対位置で指定している。

css-loaderを利用すると[スコープのあるCSSを出力することもできる](https://github.com/webpack/css-loader#local-scope)がここでは割愛。

### SASS(SCSS)をコンパイルする

多くの場合、SCSSを書くことが多いと思う。前述のcss-loaderに加え、`npm install --save-dev sass-loader node-sass`でscss-loaderとnode-sassをインストールしておく。

webpack.config.jsでは以下のように設定しておく。

```
const config = {
  // 省略
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }
    ]
  }
};
```

エントリポイントのJavascriptでは前述と同じようにSCSSを読み込むようにする

```
import '../scss/main.scss';
// or
require('../scss/main.scss');
```

これでSCSSはsass-loaderによって内部でSCSSはCSSに変換され、さらに変換されたCSSはstyle-loaderによってheadにstyle要素に挿入される。

### CSSをheadに挿入せず別ファイルとする

一般的にはCSSをJavascriptでロードせずlink要素でロードすることが多いかもしれない。その場合はextract-text-webpack-pluginを利用して、コンパイルされたCSSをファイルとして出力するようにする。

```
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin('css/main.css');

const config = {
  entry: ['./js/main'],
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js'
  },
  plugins: [
    extractCSS,
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: extractCSS.extract('css')
      }
    ]
  }
};
```

ExtractTextPluginのコンストラクタの引数では出力されるときのディレクトリ名を含めたファイル名を指定する。このパスはwebpack-dev-serverでも適用される。上記の場合はwebpackコマンドを実行すると、ビルドされたファイルはbuildディレクトリの中にcssディレクトリが作成され、その中にmain.cssが作成される。Javascriptの中ではCSSのロードと同様requireやimportを使ってロードする必要がある（このrequireやimportのファイルはロードを通過してtestに通った場合に指定したローダーが適用される）。

extractメソッドの引数は通常通りローダーを指定する。上記の例ではcssだけだが、SCSSをCSSにコンパイルしてそれをファイルとして出力したい場合は引数にcss!sassと指定すれば良い。

### postcssを利用する

これもよくある例だと思う。`npm install --save-dev postcss-loader`をしてpostcss-loaderモジュールのインストールを行い、webpack.config.jsを以下のように設定する。

```
const config = {
  // 省略
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css!postcss'
      }
    ]
  },
  postcss: [
    require('autoprefixer')
  ]
};
```

上記の例ではCSSをまずpostcss-loaderに通し、css-loaderに通した後style-loaderを通してheadに挿入している。postcssのプラグインはpostcssキーの値に配列で適用したいpostcssのプラグインをrequireする。当然だが上記の例ではautoprefixerが必要なのでautoprefixerモジュールをインストール必要がある。

### wepack-dev-serverを利用する

webpack-dev-serverを利用すると簡易的な開発サーバを立てることが出来る。インストールは`npm install --save-dev webpack-dev-server`。起動するには`./node_modules/.bin/webpack-dev-server`で良いが、package.jsonのscriptsにタスクを記述することで.binディレクトリには自動的にパスが通るのでそちらをおすすめする。
個人的にはinline modeが使いやすいと思うのでそれを利用する。hotオプションを有効にすることで、JSファイルやimportしているファイルを保存するたびにブラウザが勝手にリロードしてくれるlivereload的な役割を果たしてくる。

`./node_modules/.bin/webpack-dev-server --hot --inline --content-base static/`

上記のコマンドを実行するとstaticディレクトリをベースとしたサーバが立ち上げられる。デフォルトではhttp://localhost:8080 にアクセスすることで開発サーバが立ち上がってることが確認できる。ルーティングはcontent-baseオプションで指定したディレクトリ内の構造通りになる。content-baseオプションが指定されてない場合はwebpack.config.jsが置かれているほとんどの場合はプロジェクトルートディレクトリが基準になる。

### outoputのpublicPathオプション

publicPathの値はwebpack-dev-serverで利用される。仮にwebpack.config.jsを以下のような指定にしたとする。

```
const config = {
  entry: './js/main',
  output: {
    path: path.join(__dirname, '/build'),
    publicPath: '/',
    filename: 'bundle.js'
  }
};
```

この場合はbundle.jsはlocalhost:8080/bundle.jsにルーティングが自動的にされる。pathオプションはあくまでもwebpackコマンドを実行した時に吐き出されるディレクトリのパスなので、関係ない。

### 複数のエントリポイント

複数のエントリポイントがある場合はentryに連想配列ででエントリファイルにしたいJSファイルのファイルパスを渡す。キーはファイルパスと指定できる。

```
const config = {
  entry: {
    'js/main': './js/main', 
    'js/entry2': './js/entry2'
  },
  output: {
    path: path.join(__dirname, '/build'),
    publicPath: '/',
    filename: '[name].js'
  }
};
```

上記の例ではjsフォルダにあるmain.jsとentry2.jsがエントリポイントとなる。webpack-dev-serverをたてた場合はhttp://localhost:8080/js/main.js とhttp://localhost:8080/js/entry2.js がそれぞれルーティングとして設定される。webpackコマンドを実行した場合はbuild/js/main.jsとbuild/js/entry2.jsが作成される。filenameが今までの指定と違うが、[name]という名称を与えた場合は自動的にエントリポイントのファイル名に変換される。

大体やったことは書いたはず。