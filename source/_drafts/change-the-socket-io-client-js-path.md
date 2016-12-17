title: Expressとsocket.ioを併用する時にsocket.io-client.jsのルーティングを変更する
id: 52
categories:
  - 未分類
date: 2016-12-06 08:55:52
tags:
---

Expressとsocket.ioを併用するとき、socket.ioのlistenに対してExpressのインスタンスを渡すことで自動的にsocket.io-client.jsのルーティングをしてくるのですが、初期のままだと/socket.io/socket.io.jsに配置されてしまうのですが他のjsファイルから独立してしまうので変更する方法のメモ。

socketIO.listen(server, );