title: DesireHDをSSHサーバーにしてWinSCPでつなぐ
id: 22
categories:
  - Memo
date: 2011-11-05 19:02:03
tags:
---

そんなわけでroot化しました！（ぉ

<!--more-->

特にroot化の手順を書くわけじゃありません。事実を報告するだけです。後root化してなくてもファイル転送には使えます。

root化の手順はここを参考にしました。 [001HT/DesireHDをroot化する (2.2でS-OFFしていなかった場合) | arkdroid](http://arkdroid.info/001/)

そんでSSHでつなごうかと。ファイル転送には便利。ftpはちょっと...。
root化前にもsshdroid使ってたのでroot後にもsshdroid使ってwinSCPからつなごうと思ったらつなげませんでした。ユーザー名が**root**になってたことにしばし気付かず...。root化前はadminです。

![screenshot-1320488314337.pngのサムネール画像](/images/screenshot-1320488314337-thumb-200x333-20.png)
設定画面はメニュー→Optionsから。最初はEnable Passwordにチェックをして（入ってるかな？）、その下のPasswordでパスワードをセットできます。ダイアログのテキストボックスが平文なのが気になりますが...。設定したらStartさせましょう。

さて、今度はWindowsからつなげるようにしましょう。つなぐにはWinSCPが便利です。
ここらへんからWinSCPをダウンロードしましょう！ [WinSCPとは :: WinSCP](http://winscp.net/eng/docs/lang:jp)
日本語？頑張ってください！

ログイン画面。
 ![winscp1.png](/images/winscp1-thumb-200x142-23.png)
これはもう設定画面ですが、初めての場合はリストに何もありません。新規を押してプロファイルを作りましょう。
 ![winscp2.png](/images/winscp2-thumb-200x142-25.png)
こんな感じに入力しましょう。ホスト名はSSHDroidに載ってるAddressの@から:までの部分の数字。ポート名は:の後の数字、ユーザー名はrootユーザーならroot、普通のユーザーならばadminと入力すればいいでしょう。いいはず...。
書いたら保存しときましょう。パスワードの保存は推奨されないと書いてますが保存したほうが次から早くログインできます。

ログインしたら後は自由にファイル転送したりコマンドを打ったりしてドヤ顔しましょう！！！！

日本語が文字化けする件に関しては[WinSCPの日本語名ファイルの文字化け回避 - ushidayの日記](http://d.hatena.ne.jp/ushiday/20091002/1254460360)を見ると解決します。

<div></div>