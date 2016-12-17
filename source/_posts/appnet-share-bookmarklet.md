title: App.netの共有ブックマークレット
id: 36
categories:
  - Memo
date: 2013-09-17 17:48:01
tags:
---
![alpha-logo@2x.png](/images/alpha-logo%402x.png)

皆さんお久しぶりです。えくすです。

さて、いきなりですが、[app.net](https://alpha.app.net/)(以下ADN)というSNSをご存知でしょうか。
ADNはTwitterクローンのサービスであり、TwitterよりもAPIの制限が緩いことが特徴です。
一部では「裏ツイッター」とも呼ばれています（主に私周辺の内輪ネタ）。
一時期は某流れ星クライアント作者がADNのクライアントを公開したことによりADNの知名度は瞬く間に...上がった気はしますが未だ過疎の状態です。

<!--more-->

さて、そんなことはさておき、ADNには公式にTwitterのような共有ブックマークレットが存在しません。intentページや、そのドキュメントはあるのですが...。ブックマークレットは探せばあるのですが、Twitterのようにポップアップで投稿画面を表示するタイプのものが存在しなかったので自分で作ってみました。
下のリンクを右クリックしてお気に入りに登録するか、ブックマークバーにドラッグすれば登録は完了です。

<a href="javascript:(function(){var D=550,A=450,C=screen.height,B=screen.width,H=Math.round((B/2)-(D/2)),G=0,W=window;if(C>A){G=Math.round((C/2)-(A/2))}W.open('https://alpha.app.net/intent/post?text='+encodeURIComponent(document.title)+'&url='+encodeURIComponent(W.location),'','left='+H+',top='+G+',width='+D+',height='+A+',personalbar=0,toolbar=0,scrollbars=1,resizable=1');}()));">Share on App.net</a>


だいぶTwitter公式の[Share Bookmarklet | Twitter Developers](https://dev.twitter.com/docs/share-bookmarklet)をパクっています。
ウィンドウの位置の計算やウィンドウのサイズはそのままですね。無駄な部分を削っただけです。

余談ですが、ADNの[Web Intents - App.net API Documentation](http://developers.app.net/docs/other/web-intents/)によると、textパラメーターの他にurlパラメーターというのがあるようで、こちらにURLを投げた場合、長いポストだと表示が40文字にまとめられるようです。またポストするときもURLは40文字にまとめられるようなので（インテント画面だと文字数カウントが出ませんが、215文字入力することができました後1文字はURLとテキストを区切るスペースだと思います）、インテントを使ってURLを投げるときはこっちのパラメーターに投げたほうが良さそうですね。
