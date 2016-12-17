title: node.js用のtwitterライブラリを書いた
id: 49
categories:
  - Notice
date: 2014-05-11 13:45:21
tags:
---

書いたと言ってもforkしたのを追加修正しただけですが。

<!--more-->

[sunya9/otwitter](https://github.com/sunya9/otwitter)

ntwitterの不足しているAPIを追加したり、すでに存在しないリソースを削除&修正をしたものになります。個人的には内部でcursor関係の処理が最後まで勝手に取得しようとする挙動が気に入らなかったためそこを書き換えたりしました。

現時点ではREADME.mdを完全に書いてなかったりとドキュメント不足なのでまったり書いていこうと思います。npmに公開してあるので

<pre class="prettyprint">npm install otwitter</pre>

で使うことができると思います。

何分githubもnpmで公開するのもほぼ初めてなので間違いなどがあればお手柔らかにお願いします...。