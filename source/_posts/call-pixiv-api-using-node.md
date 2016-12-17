title: Node.jsでpixivAPI的な物を叩いたりするサンプル
id: 65
categories:
  - Memo
date: 2015-01-20 13:22:22
tags:
---
pixivにはAPIというものが存在はしているようで、扱えるようです。

<!--more-->

#### 下準備

request、csv、async、underscoreのモジュールをインストールしておくと便利です。

`$ npm install request csv async underscore`

#### ログイン

pixivのAPIを叩くにはクッキーを利用しているらしく、ログインが必要になります（一部のAPIはログインしなくても見れるらしいです）。

```
var id = 'ユーザーID';
var password = 'パスワード';
var options = {
  url : 'https://touch.secure.pixiv.net/login.php',
  form: {
    mode: 'login',
    query: 'guid=on',
    pixiv_id: id,
    pass: password,
    referer_uri: ''
  }
};
request.post(options, function(err, res, body) {
  if (err) return console.error(err);
  var session = '&' + res.headers['set-cookie'][0].match(/PHPSESSID=\w+/)[0];
});
```

ログインに成功するとset-cookieにセッションIDが入ってるので正規表現で取り出し、sessionにセッションIDが入ります。

#### 検索とかしてみる

##### 検索結果数

検索結果数を返すAPIです。

```
var options = {
  url: 'http://spapi.pixiv.net/iphone/search.php?s_mode=s_tag&word=' + encodeURIComponent(word) + session+ '&c_mode=count',
  headers: {
    referer: 'http://www.pixiv.net/'
  }
};
request.get(options, function(err, res, body) {
  if (err) return callback(err);
  var count = body;
});
```

wordには検索したい単語、sessionは先程のセッションIDが入ってる想定です。ログインをしてないと検索結果数はどんなに多くても200件に制限されるようです。

##### 検索結果の表示

```
var ILLUST_HEADER = ['illustId', 'userId', 'type', 'title', 'value1', 'author',var ILLUST_HEADER = ['illustId', 'userId', 'type', 'title', 'value1', 'author', 'smallThumbUrl', 'value2', 'value3',
  'largeThumburl', 'value4', 'value5', 'postDate', 'tags', 'software', 'evalCount', 'score', 'viewCount', 'description',
  'pageCount', 'value7', 'value8', 'bookmarkCount', 'value10', 'screenName', 'value11', 'value12', 'value13', 'value14', 'profileIconUrl', 'value15'
];
var loopCount = Math.floor(count / 20) + 1;
async.timesSeries(loopCount , function(page, next) {
    var options = {
      url: 'http://spapi.pixiv.net/iphone/search.php?s_mode=s_tag&word=' + encodeURIComponent(word) + session + '&p=' + (page + 1),
      headers: {
        referer: 'http://www.pixiv.net/'
      }
    };
    request.get(options, function(err, res, body) {
      if (err) return next(err);
      if (!body) next(null, null);
      csv().from.string(body).to.array(function(data) {
        var illusts= _.map(data, function(row) {
          if (!row[0]) return null;
          return _.object(ILLUST_HEADER, row);
        });
        next(null, illusts);
      });
    });
  }, function(err, illusts) {
    if (err) return console.error(err);
    illusts = _.chain(illusts).flatten().compact().value();
  }
);
```

ここでasyncモジュールを使用しています。全てのイラストを取得しようとする時にループを回すわけですが、非同期処理だと全てのデータをまとめて返すときに不便なのでasync.timesSeriesを利用しています。

まとまったデータは配列が入れ子になっているのでunderscoreを使用してまとめています。

なお、データ一つ一つはILLUST_HEADERがキーとそれに対応する値からなるオブジェクトです。

基本的にはセッションIDを付加してAPIを叩けば結果が返される模様。ただ、セッションIDは保存しても2日ほどしかもたないっぽいのでログインは毎回したほうが無難なようです。

#### 参考URL

*   [我破締切 - 鍵屋的日記（鍵屋のブログ）](http://d.hatena.ne.jp/kagiya/20110621)
*   [Pixivイラスト検索APIの取得結果のデータ構造を調べる - Qiita](http://qiita.com/nezuq/items/e4c55bb9c68bf5785e73)