---
title: ubuntuに最新のnode.jsを導入する
id: 37
categories:
  - Memo
date: 2013-09-30 14:10:11
tags:
---
![nodejs-light.png](/assets/images/nodejs-light.png)

最近node.jsを使い始めました。いざ本番で使うとなるとnodeを動かせるサーバーがないといけないので専用サーバーなど必要になりますが、Windowsでも手軽に実行でき、言語自体もJavaScriptなので動かすこと自体は手軽で結構楽しいです。

<!--more-->

さて、早速なのですが最近とあるサーバー(ubuntu)にnode.jsを導入を導入しようとlinuxもろくにわからないまま apt-get node をしたところインストールされたように見えたのですが...

[apt-get install node - hokaccha.hamalog v2](http://d.hatena.ne.jp/hokaccha/20130607/1370576087)

このブログによるとどうやらnodeではなくapt-get nodejsのようです。
んでapt-get nodejsをやってみたところうまくいきました！めでたしめでたし。

(終)

と、そうは問屋がおろしません。バージョン確認してみたらバージョン0.6くらいじゃないですか。現時点でのバージョンは0.10.18です。
 相変わらずコマンドをよく理解しないままapt-get updateとか打っても変わらず...。
 そして一つのエントリを発見。

[How to install the latest node.js on Ubuntu? | Slopjong](http://slopjong.de/2012/10/31/how-to-install-the-latest-nodejs-in-ubuntu/)

まさにやりたいことでした。余計な部分（≒よくわかっていないところ）をすっ飛ばすと...。

```
sudo apt-get install python-software-properties
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
```

と打って`node -v`を打ったところv0.10.18の表示が。

後はnpmをインストールして完了です。

`sudo apt-get install npm`
