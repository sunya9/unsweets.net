---
title: 'gulpを使ってsass,scssをコンパイルする'
id: 55
categories:
  - Tutorial
date: 2015-01-09 10:14:41
tags:
---
新年あけましておめでとうございます。今年はブログの投稿数を増やしたいところです。

新年初めの記事はgulpを使ってsass, scssをコンパイルするタスクを作成します。

<!--more-->

#### プラグインのインストール

元々rubyのsassコンパイラを導入していたので[gulp-ruby-sass](https://www.npmjs.com/package/gulp-ruby-sass)を使用。

`$ npm install --save-dev gulp-ruby-sass`

ついでに[plumber](https://www.npmjs.com/package/gulp-plumber)というプラグインも導入します。

`$ npm install --save-dev gulp-plumber`

#### gulpに記述

requireしてタスクを記述します。

```js
var sass = require('gulp-ruby-sass');
gulp.task('sass', function() {
  return gulp.src('./*.scss')
    .pipe(plumber())
    .pipe(sass({
      style: 'compact',
      compass: true
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./css/'));
});
```

上記のコードは以下のように実行することでscssフォルダのscssファイルをコンパイルして、cssフォルダに出力することが出来ます。

`$ gulp sass`

sassのオプションにはstyleやcompassを使う設定ができます。私の環境の場合はcompassを使っていたのでtrueにしました。styleでは出力するsassのフォーマットを指定することが出来ます。sassのオプション同様、nested, compact, compressed, expandedの4つを指定することが可能です。ここではcompactを指定しました。

plumberはpipe処理に問題があったときに自動的に止めてくれるプラグインです。このプラグインを使用することによって、sassのコンパイルに構文エラーなどで失敗した時に、pipe処理がうまく続かない場合を解消してくれます。このsassタスク単体ではあまり役に立ちませんが、watchを使った時に効果を発揮します。

#### watchを使ってscssの動きを監視する

watchメソッドを使うことで、ファイルを保存した時に、タスクを走らせるといったことが可能です。

```js
gulp.task('watch', function() {
  gulp.watch('./sass/*.scss', ['sass']);
});
```

上記のコードをgulpfile.jsに記述し、`$ gulp watch`を実行。



こうすることでsassフォルダにあるscssを監視し、保存などによる変更があった場合にsassタスクを自動で実行することが可能です。

ここで先ほどのplumberプラグインが活躍します。plumberがあることによってsassのコンパイルエラーが発生した場合でも、watchタスクは停止することがありません。plumberがないとタスク自体がエラーとなり、watchタスクも停止してしまいます。

#### まとめ

gulpと同じようなビルドツールにGruntというものがありまして、最初はそちらを利用しようと思ったのですが、どうも定義的なタスクの記述方法になれることが出来ませんでした。しかしgulpは手続き型な記述なので処理が見やすく、記述しやすいなどの利点があると思います。

gulpのプラグインは日に日に増えていくので今後も期待できますね。
