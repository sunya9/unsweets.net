---
title: AndroidStudioでjavadocを生成するときの注意点
id: 53
categories:
  - Memo
date: 2014-11-23 19:54:48
tags:
---

AndroidStudioのGenerate JavaDoc機能を使うとJavaDocを生成することが出来ますが、日本語環境の場合以下の様なエラー文我表示される可能性があります。

エラー: この文字は、エンコーディングMS932にマップできません

このエラーが発生するのはファイルがUTF8なのにAndroidStudio側がOSの文字コードを使うことで発生します。
このエラーを治すにはOther command line arguments:の値に -encoding "utf-8" を設定することで治ります。
[![2014-11-23_20-6-11_377.png](/assets/images/2014-11-23_20-6-11_377.png)](/assets/images/2014-11-23_20-6-11_377.png)

ちなみに、Generate JavaDocはAndroidStudioではメニューのTools→Generate JavaDoc...で上記のダイアログを出すことが出来ます。
