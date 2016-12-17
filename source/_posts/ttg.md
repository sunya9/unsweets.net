---
title: TwiTokenGetterを作り直した
id: 180
categories:
  - Notice
date: 2016-07-09 22:36:44
tags:
---

任意のConsumer key, Consumer secretで、任意のアカウントのAccess tokenとAccess token secretを取得できる[TwiTokenGetter](http://ttg.unsweets.net)を作り直しました。以前はPHPで運用していたのですが、ウェブサイトの方をGithub pagesで運用するようになり、PHPが動かない環境になっていたためしばらく放置していました。

しかしちょっと前にフォロワーの方が「使えなくなってた」と言われ、需要あるのかなと思い作り直すことに。サーバはScalewayを利用しています。こんな小さなツールですが、Docker使ってたりWebpack使ってたりで明らかにやりすぎな感じもしますが…。

以前はCSSをほとんど書いてなかった気がするのですが、今回は[Milligram](https://milligram.github.io/)と呼ばれるCSSフレームワークを利用しています。名前の通りミニマリストなフレームワークで、ボタンやグリッド、後は見出しやテーブル、フォームなどの標準パーツが綺麗になった程度の非常に小さなフレームワークです。BootstrapやFoundationのようなフルスタックなフレームワークは重すぎるというウェブサイトにはおすすめです。

当たり前ですが、各種キーの保存などは行っていません。ソースコードは[Github](https://github.com/sunya9/ttg)にあります。