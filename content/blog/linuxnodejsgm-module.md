---
title: linux環境下のnode.jsでgm moduleを使った時、書き込みでエラーが発生する
id: 42
categories:
  - Memo
date: 2013-11-09 21:34:53
tags:
---
gm moduleとはGraphicsMagickやImageMagickをnode.jsで扱うためのmoduleなのですが、windowsではエラーが発生しないのに、linuxだとなぜか発生する謎の現象に悩まされました。(ubuntu 13.04)。

<!--more-->

[node.js - Error: spawn ENOENT while using GM in node - Stack Overflow](http://stackoverflow.com/questions/16222116/error-spawn-enoent-while-using-gm-in-node)

Stack Overflowより。

gm moduleのインポートをする時、

```js
var gm = require("gm");
```

のようにしてgm関数にファイルパスを渡して操作をすると思いますが、どうやらこれだと駄目なようで、インポートする時に

```js
var gm = require("gm");
var imageMagick = gm.subClass({ imageMagick: true });
```

のようにしてgm関数と同じようにimageMagick関数にファイルパスを渡して通常通り操作すれば動作しました。
