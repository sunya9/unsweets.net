---
title: regex generatorとrollup
date: 2016-12-30 19:54:59
categories:
  - Notice
tags:
  - javascript
  - Rollup
  - Babel
---

[![regex generator](/images/regex-generator.png "Regex generator")](http://regex-generator.unsweets.net/)

Regex generatorというツールを作成しました。入力された文字列に応じて正規表現が自動生成されます。生成する部分の頭は無いので[regexgen](https://github.com/devongovett/regexgen)というライブラリに滅茶苦茶依存しています。

## 使い方

上の枠に改行区切りでも字を入力するとそれに応じた正規表現が吐き出されるので煮るなり焼くなり自由に使ってください。

## Rollupを使った

ところで、このツールを作るにあたってRollupと呼ばれるモジュールバンドラーを使いました。モジュールバンドラーと言えば今はWebpackが主流ですが、少し話題になってた（気がする）ので利用してみました。

### 所感

* 軽い。色々入ってるWebpackと比べたら軽量に動作する
* 設定ファイルがWebpackと比べてシンプル
* 最近のpluggable精神に則っているのか最初のプラグインインストールが少し面倒臭い

Webpackの重すぎる感じが嫌だったので、基本的に動作が軽いのは良いのですが、プラグインで機能を増やす仕組みである以上、何をするにあたっても最初はプラグインインストール地獄になるのは少し面倒に感じました。文句を言いつつプラグインの仕組みは好きなのですが、やはり多少手間に感じますね。このあたりはExpressの後継であるKoaでも同じようなことを感じました。

標準ではnpm経由でインストールしたモジュールすら読み込めないので[rollup-plugin-node-resolve](https://github.com/rollup/rollup-plugin-node-resolve)を利用します。更にRollupはES6ベースのものであるため、ES6モジュールではない、所謂CommonJS形式のモジュールを読み込むためには[rollup-plugin-commonjs](https://github.com/rollup/rollup-plugin-commonjs)を利用します。大抵はこれくらいで事足りるはずですが、今回はregexgenがBufferを利用しているので、[rollup-plugin-node-globals](https://github.com/calvinmetcalf/rollup-plugin-node-globals)を利用することによって、Bufferオブジェクトなどを解決できるようにしました。

これでJS部分は大丈夫、と思いきや、モジュールをやっとimportできたユーザーはおそらくES6で書いていくので今度はBabelが必要になります([rollup-plugin-babel](https://github.com/rollup/rollup-plugin-babel))。今回は大したコードを書くつもりではなかったので、[Buble](https://gitlab.com/Rich-Harris/buble)の利用も多少してみたのですが、わちゃわちゃして結局うまく行かなかったので断念してしまいました。普段Babelを利用しているからというのもあるのですが…。

RollupにはWebpack同様、プラグインでCSSを読み込んだり、読み込んだCSSをPostCSSで処理したりすることが出来ます。ここら辺はWebpackのLoadersに似てますね。プラグインという枠組みで記述できるのは結構気に入ってます。今回は[rollup-plugin-postcss](https://github.com/egoist/rollup-plugin-postcss)と[postcss-cssnext](https://github.com/MoOx/postcss-cssnext), [postcss-import](https://github.com/postcss/postcss-import)を利用していますが、多少の変数の上書きとCSSの記述程度だったので、postcssは無駄だったかな、という感じもしましたがご愛嬌。

出来上がった`rollup.config.js`(Rollupの設定ファイル)はこちら。

```javascript
import postcss from 'rollup-plugin-postcss'
import cssnext from 'postcss-cssnext'
import cssImport from 'postcss-import'
import serve from 'rollup-plugin-serve'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import nodeGlobals from 'rollup-plugin-node-globals'
import babel from 'rollup-plugin-babel'

const config = {
  entry: 'src/js/main.js',
  dest: 'build/js/main.js',
  plugins: [
    nodeResolve({
      browser: true,
      main: true,
      jsnext: true
    }),
    commonjs(),
    nodeGlobals(),
    postcss({
      plugins: [
        cssImport(),
        cssnext()
      ]
    }),
    babel()
  ]
}

if(process.env.NODE_ENV !== 'production') {
  config.plugins.push(serve({
    contentBase: 'public',
    historyApiFallback: false
  }))
}

export default config
```
正直言うとRollup初めて使ったのでnodeResolveあたりの理解が足りていないというか、ドキュメントを斜め読みしたのでオプションの設定は怪しいです…（動くからいいや精神）。開発時に便利な[rollup-plugin-serve](https://github.com/thgh/rollup-plugin-serve)を利用することで、webpack-dev-serverのような開発サーバーを立てることが出来ます。

ちなみにフロントエンド部分のライブラリでは安定のVueとMilligramを採用しています。軽量最高ですね。また、Babelを通していますが、あえてジェネレータ構文をそのままにしたり、Class構文をそのまま利用したりしています。そのためIEとEdgeの対応をしていません。そもそもBabelを通す必要ないんじゃないかと書いてて思い始めましたが…。

ソースコードを入力するとそのソースコードが動くブラウザのバージョン一覧みたいなサービスがほしいです。それっぽいツールはありましたが、動作は怪しかったのでスルー。

## まとめ

* regexgenすごい
* 小さいプロジェクトならRollupで十分
