---
title: mongoDB(mongod)のウェブインターフェースを無効にして起動する
id: 40
categories:
  - Memo
date: 2013-10-25 18:09:47
tags:
---
mongodでは起動するとport 28017をListenするがいらないので無効化。`$ mongod --nohttpinterface`でOK.

ちなみにデーモン化する場合は`$ mongod --fork --logpath /var/log/mongodb.log`と--forkオプションを指定する。