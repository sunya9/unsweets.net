---
title: Gitgraph.jsをwebpackで読み込む
date: 2017-03-29T22:08:54.061Z
categories:
  - Memo
author: _X_y_z_
layout: blog
---

[Gitgraph.js](https://www.npmjs.com/package/gitgraph.js)をwebpackを介して使おうとするにもうまく行かなかったのでメモ。なおこれはGitgraphに限る問題ではなく、[UMD](https://github.com/umdjs/umd)と言った手法を実装していないモジュール全般に起こりえる問題です。

<!-- more -->

## 雑な環境

- webpack 2.3.0
- Node.js 7.7.0
- Gitgrpah.js 1.9.0

## 対処

- [imports-loader](https://www.npmjs.com/package/imports-loader)を利用して、[Gitgraph.jsがwindowにしかexport](https://github.com/nicoespeon/gitgraph.js/blob/develop/src/gitgraph.js#L1783)していない部分を書き換える。

```js
import { GitGraph } from "imports-loader?window=>exports!gitgraph.js";
```

`window`が`exports`に書き換わり、`exports.GitGraph = GitGraph`をしたことになるので、`{ GitGraph }`で取り出すことができます。

npmにあるのにexportsがされていないのが謎ですが、あれこれ言う前にIssueたてたりPull request送ったほうが良さそう。
