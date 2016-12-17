---
title: OperaでTwitterIRCGatewayを使う
id: 29
categories:
  - Tutorial
date: 2012-04-03 03:28:25
tags:
---

OperaについてるIRCチャットでTwitterIRCGateway(以下<abbr title="TwitterIRCGateway">TIG</abbr>)を使う試み。

<!--more-->

#### とにかく

まずは<abbr>TIG</abbr>を[ダウンロード](http://www.misuzilla.org/dist/net/twitterircgateway/)しましょう。

当たり前だけど記載されてる条件を満たしてないと駄目。

#### TIGの起動

ポート番号は初期設定であれば16668のはず。

#### Operaの設定

Operaのバージョンは11.62と仮定。

1.  左上のメニュー
2.  メールとチャットアカウントの編集
3.  アカウント作成 OR 追加
 [![add-irc-account.png](/images/add-irc-account-thumb-200x144-44.png)](/images/add-irc-account.png)
4.  作成するアカウントの種類で「チャット(IRC)」を選択。
5.  名前とメールアドレスにTwitterのIDを入力。
 [![add-irc-account-input-name-and-address.png](/images/add-irc-account-input-name-and-address-thumb-200x169-46.png)](/images/add-irc-account-input-name-and-address.png)
6.  ニックネームの欄にもTwitterのIDを入力。
 [![add-irc-account-input-screen-name.png](/images/add-irc-account-input-screen-name-thumb-200x169-48.png)](/images/add-irc-account-input-screen-name.png)
7.  サーバーの欄に"localhost"と入力。
 [![add-irc-account-input-server.png](/images/add-irc-account-input-server-thumb-200x169-50.png)](/images/add-irc-account-input-server.png)
8.  まもなくチャットルームダイアログが出てくるので作ったサーバー（ここではlocalhostと表示されたものが出ると思います）を右クリック→プロパティで編集
 [![chat-room.png](/images/chat-room-thumb-200x116-56.png)](/images/chat-room.png)
9.  「アカウント名」を任意のものに（わかりやすいものに）、サーバータブでポート番号に"16668"と入力（変更していなければ）。パスワードは空欄でOK。
 [![account-property.png](/images/account-property-thumb-200x174-52.png)](/images/account-property.png)[![account-property-server-tab.png](/images/account-property-server-tab-thumb-200x174-54.png)](/images/account-property-server-tab.png)
10.  まもなく、$OAuthとの会話タブが出てきます。URLが出てくるのでOAuth認証を通してPIN番号をもらい、PINを入力。
11.  認証すると今度はパスワードが求められるのでTwitterのパスワードを入力。
12.  再び作ったーサーバーのプロパティを開き、サーバータブのパスワードに先ほどのパスワードを入力。
 [![account-property-server-tab.png](/images/account-property-server-tab-thumb-200x174-54.png)](/images/account-property-server-tab.png)(使い回し)
13.  OKを押したらサイドバーなどで一度オフラインにした後、オンラインにして再接続すると"Twitter"というチャットルームが開始されます。

#### 完了！

よいtwitterライフを。