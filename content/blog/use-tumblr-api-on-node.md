---
title: node.jsでtumblrAPIを叩く
id: 60
categories:
  - Memo
date: 2015-01-15 23:11:38
tags:
---
Node.jsでTumblrで扱ってみようと思います。

<!--more-->

#### モジュールのインストール

Tumblrを叩くためのモジュール、[node-tumblr](https://github.com/meritt/node-tumblr)をインストールします。

`$ npm install tumblr`

#### Consumer keyの取得

TumblrのAPIを叩くためにはConsumer keyが必要です。Consumer keyと聞くと色々認証しないといけないように感じますが、取得だけならConsumer keyだけで十分なようです。

1.  [TumblrのApps](https://www.tumblr.com/oauth/apps)にアクセス。
2.  アプリを登録ボタンをクリック。
3.  必要事項を記入します。Application nameとDefault callback URLがあれば十分な模様。入力したらRegisterをクリック。
4.  OAuth Consumer Keyの文字列を控えておきます。

これでひとまずAPIを叩く準備は完了です。

#### APIを叩いてみる

```js
var tumblr = require('tumblr');
var oauth = {
  consumer_key : '先ほど控えたOAuth Consumer keyをここに記述'
};
var blog = new tumblr.Blog('lovelivegif.tumblr.com', oauth);
blog.photo({limit:20}, function(err, res) {
  if (err) return console.error(err);
  res.forEach(function(post){
    console.log(post.post_url);
  }
});
```

上記コードはとあるブログから画像ポスト20件を取得し、postURLを表示してる例です。

画像ポストのphotoだけでなく、textやquotesなど色々なものを習得が可能な模様。TumblrのAPI的に取得件数は20件までですが、offsetを指定すれば全て取得することも可能です。
