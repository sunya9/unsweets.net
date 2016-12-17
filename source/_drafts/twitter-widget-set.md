title: Twitterウィジェットを設置しました
id: 17
categories:
  - Memo
date: 2011-08-27 05:00:04
tags:
---

更新という名のメモ替わり。

jqueryでajax通信を行うのは不慣れだったもので少し苦労しました。

<!--more-->

    var twitterScreenName = "_X_y_z_";
    var tweeturl = "http://twitter.com/status/user_timeline/" + twitterScreenName + ".json?count=5&callback=?";
    $.getJSON(tweeturl, function(data){
    $.each(data, function(i, item){
    $("<li/>")
    .addClass(i%2 ? "even" : "odd")
    .html("<a href='http://twitter.com/" + twitterScreenName + "/status/" + item.id_str + "' class='new'>" + item.text + "</a>")
    .appendTo("aside.widget-twitter>div.widget-content>ul");
    });
    $("<li class='follow-me'><a href='http://twitter.com/" + twitterScreenName+ "' class='new'>Follow me on Twitter</a></li>").appendTo("aside.widget-twitter>div.widget-content>ul");
    });
    `</pre>

    twitterScreenNameに自分のスクリーンネームを入れておく。tweeturlのURLの?count=5の5の値は取得数なので自由に変更する。最後のcallback=?はないと駄目らしいです。これがないと外部ドメインのデータを取得できないらしい。よくわからない。

    後は取得したデータを処理していくだけ。itemオブジェクトの内容が知りたい方は[GET statuses/user_timeline | Twitter Developers](https://dev.twitter.com/docs/api/1/get/statuses/user_timeline)を見るとわかると思います。

    最後に自分のアカウントのリンクを飛ばして終了。

    #### メモ2

    動的に追加した要素の属性マッチでイベントが取得できない...。という時はliveメソッドを使えばいいらしい。

    <pre class="prettyprint code">`$("a.new").live("click", function(){
    window.open(this.href, null);
    return false;
    });

先ほどのコードとつながってますが。a.newのコードは動的に追加されたものでclickしてもうまく動きませんでした。こうすれば新規ウィンドウが開ける。<span class="del">html5なんだからtarget属性使えばいいじゃんというツッコミはナシ。</span>