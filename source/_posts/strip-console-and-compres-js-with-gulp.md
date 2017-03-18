---
title: gulpでjsのconsoleを消したり圧縮したりする
id: 56
categories:
  - Tutorial
date: 2015-01-11 14:11:43
tags:
---
引き続きgulpです。プラグインを使ってデバッグに使うconsoleを消したり圧縮したりします。

<!--more-->

#### インストール

consoleを消すプラグインは[gulp-strip-debug](https://www.npmjs.com/package/gulp-strip-debug)です。

`$ npm install --save-dev gulp-strip-debug`

圧縮はお馴染みのuglify。いくつか同じようなプラグインがあるのですが今回は[gulp-uglify](https://www.npmjs.com/package/gulp-uglify)を使用しました。

`$ npm install --save-dev gulp-uglify`

2つインストールしたら準備は完了です。

#### タスクを記述する

gulpfile.jsに以下を記述。

```
gulp.task('compress', function() {
  return gulp.src('./js/*.js')
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'));
});
```

jsフォルダのjsファイルを読み込み、build/jsフォルダに出力するようにしています。

stripDebugを実行するとconsole.logなどの文字列を消すことが可能です。オプションは特にない模様。

uglifyはjsファイルを圧縮することが可能です。今回はオプションを渡しませんでしたが、渡すことも可能です。先ほどのページにもある程度載っていますがuglify自体のオプションも渡すことが可能のようです(gulp-uglifyはuglifyをラップしただけなので）。

#### 実行

compressタスクを実行するだけです。

`$ gulp compress`