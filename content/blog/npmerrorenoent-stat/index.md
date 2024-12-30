---
title: "npmでError:ENOENT, stat...と言うエラーが出た時"
id: 51
categories:
  - Memo
date: 2014-11-09 13:05:55
tags:
---

npmを実行してnpmでError:ENOENT, stat '(パス)'のようなエラーが帰って来るときは.npmrcが間違えてる可能性があります。

WindowsではC:\Users\%USERNAME%&#46;npmrc にnpmに関する設定があるのでprefixをnpmのある場所に設定すると動くようになります。なお、npmの標準のインストール場所は恐らくC:\Users\ユーザー名\AppData\Roaming\npmにあるので

`prefix = C:\Users\ユーザー名\AppData\Roaming\npm`

という設定にすれば動くになると思います。
