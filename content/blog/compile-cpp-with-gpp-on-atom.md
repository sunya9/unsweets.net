---
title: AtomでC++をMinGWでコンパイルする
tags:
  - atom
  - C++
id: 159
categories:
  - Memo
date: 2016-04-05 18:59:00
---

単純に一つのファイルをコンパイルするときのメモ。MinGW付属のg++コマンドを使用します。MinGWを予めインストールしておきます。

<!--more-->

1.  [buildパッケージ](https://atom.io/packages/build)を導入。
2.  ホームディレクトリに`.atom-build.json`を作成します。プロジェクトのルートディレクトリなどでも良いのですが、グローバルに適用したかったのでホームディレクトリに作成しました。WindowsであればC:\Users\<ユーザ名>&#92;.atom-build.jsonにファイルを置きます。
3.  .atom-build.jsonに以下の内容を書き込みます。

```
{
  "cmd": "g++ -o {FILE_ACTIVE_NAME_BASE}  {FILE_ACTIVE}"
}
```

4. F9を押すとおそらくコンパイルが出来ます。生成された実行ファイルはソースコードがあるディレクトリと同じ場所に生成されます。
