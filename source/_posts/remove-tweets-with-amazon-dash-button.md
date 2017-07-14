---
title: Amazon Dash Buttonでツイートを削除する
s: remove-tweets-with-amazon-dash-button
date: 2017-07-15 02:16:34
tags:
categories:
  - misc
---

先日、Amazon primedayの数日前にもAmazon Dash Buttonが投げ売りされていたので、とりあえず3つほど購入しました。

とりあえずツイート削除ボタンを作りました。

[sunya9/tweets-remove-button: Remove tweets from Amazon dash button.](https://github.com/sunya9/tweets-remove-button)

ガバガバ英語READMEについてはご容赦…。

技術的には難しいことはしておらず、npmにある、[dash-button](https://www.npmjs.com/package/dash-button)モジュールを利用して、Dash buttonのMACアドレスの取得と、押された時の検出をしています。
セットアップが微妙に面倒くさかったのでDockerfileも作ってみました。[イメージもDocker hubにあげてあります。](https://hub.docker.com/r/sunya/tweets-remove-button/)

実際に使用するとなるとTwitterのAPI Keyが必要だったり常駐させる必要があるので、半分ネタ目的ですが、こういうものが手軽に作れるのは面白いですね。期間指定までは出来ませんが、リプライやリツイート、ふぁぼられの保護なども実装してみました。

こういうものを作るときはとりあえずNode.jsで作ってしまうのですが、手軽さの反面、Docker imageにしようとするとNode.jsのコアが必要な以上、サイズが膨れ上がってしまうのが難点ですね。
