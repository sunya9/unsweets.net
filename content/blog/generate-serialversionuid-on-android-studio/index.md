---
title: Android StudioでserialVersionUIDを生成する
id: 58
categories:
  - Memo
date: 2015-01-13 17:41:51
tags:
---

Android StudioでSerializable実装クラスを実装した時にserialVersionUIDの警告がでなかったのでそのメモ。

<!--more-->

メニューのFile->Settingsを開きます。

![2015-1-13_17-44-12_486.png](./2015-1-13_17-44-12_486.png)

左のメニューからInspectionsを選択し、Serializable class without 'serialVersionUID'の項目にチェックをし、OKを押します。

![2015-1-13_17-45-17_487.png](./2015-1-13_17-45-17_487.png)

エディタのSerializableを実装したクラス名の上にカーソルを合わせてAlt+Enterを押すと"Add 'serialVersionUID' field"という項目があるのでEnterを押すと自動的にクラスに追加されます。

![2015-1-13_17-50-34_488.png](./2015-1-13_17-50-34_488.png)
