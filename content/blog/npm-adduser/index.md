---
title: npm adduserでエラーを吐く
id: 47
categories:
  - Memo
date: 2014-05-11 12:57:45
tags:
---

npm publishで作ったモジュールを公開するときにadduserを使おうとしたらエラーが発生しました。

<!--more-->

解決方法はこちらにありました。
[npm adduser error: default value must be string or number · Issue #4363 · npm/npm](https://github.com/npm/npm/issues/4363)

どうやら通常の方法だと.npmrcがうまく生成出来てないっぽいので先に

`npm config set email npmで登録したメールアドレス`

を実行します。この時登録したメールアドレスは大文字小文字正確に合ってないと後で面倒臭いので正確にすることが無難。

後はもう一度npm adduserするとUsernameとPasswordが聞かれるのでnpmで登録したものを入力します。メールアドレスも聞かれますが書き込まなければ先程のものが使われると思います。
