---
title: 今見ているページをTwitterでURL検索するブックマークレット
id: 167
categories:
  - Memo
  - ''
tags: []
date: 2016-05-11 14:21:00
---
多くのウェブページの場合記事を共有するボタンはありますが、Twitterでどのくらいの人が共有したのかを示すcount.jsonの提供終了に伴い、吹き出しを表示しなくなったサイトを多くなったので。

<!--more-->

* [Search URL on Twitter][1]
* [Search URL on Twitter(New Tab)][2]

このリンクをブックマークバーにドラッグすると登録できます。利用するのは検索したいページで登録したお気に入りを開くだけ。

count.jsonの代替を探しているのなら、[count.jsoon](https://jsoon.digitiminimi.com/)などと言ったWebサービスも有ります。

[1]: javascript:(function(){var%20url;var%20canonical%20=%20document.querySelector('link[rel=\'canonical\']');if(canonical)%20url%20=%20canonical.href;if(!url)%20url%20=%20location.href;location.href%20=%20'https://twitter.com/search?q='%20+%20url;})();
[2]: javascript:(function(){var%20url;var%20canonical%20=%20document.querySelector('link[rel=\'canonical\']');if(canonical)%20url%20=%20canonical.href;if(!url)%20url%20=%20location.href;url%20=%20'https://twitter.com/search?q='%20+%20url;window.open(url);})();