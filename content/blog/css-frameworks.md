---
title: CSS Frameworksというサイトを作った
date: 2017-08-11 16:21:36
tags:
  - Notice
Categories:
  - CSS
---

![CSS Frameworks](/assets/images/css-frameworks.png)

[CSS Frameworks](https://css-frameworks.unsweets.net)
という、CSSのフレームワークを比較するサイトを作りました。オマージュ元は[StaticGen](https://www.staticgen.com)。

<!-- more -->

StaticGenに比べると前週との比較な個別ページがないなど貧弱ですが、そこら辺はこれから頑張りたいところです。

かなり適当な英語で書いてたり、そもそもRulesがWIPだったり、このフレームワーク載ってないよ！というのがあると思いますが、Forkしてプルリクを送ってくださるととても喜びます。そこら辺のガイドラインもこれから書きます。多分。

このランキングを見ると4がでると噂されてもう2年ほど経ちそうなBootstrapが未だにトップだったりとか、結構見てみると面白いと思います。

ちなみにCSS Frameworks自体は静的サイトジェネレータにNuxtを使い、CSSフレームワークにはBulmaを採用しています。サーバーはNetlifyにビルドを任せ、TravisのCronでデータの取得とNetlifyへのビルドリクエストを1日1回行うようにしています。これまた設定が適当なのでmasterにpushするとNetlifyのトリガーとTravisのTriggerで2回ビルドされたりなど、細かな問題があったりしますが…。

何はともあれ、CSSフレームワーク選びの参考になれば幸いです。
