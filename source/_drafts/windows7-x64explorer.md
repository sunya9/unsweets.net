title: Windows7 x64のexplorerのフォルダ操作時の警告
id: 39
categories:
  - Memo
date: 2013-10-06 18:11:20
tags:
---

「この項目は見つかりませんでした。」

<span style="font-size: 1.5625em;">あるよ！</span>

そんな時の対処法。

<!--more-->

対処法は桜花ちゃんこと@rofi氏のブログ記事にあります。
[Windows 7 x64でフォルダ操作時の警告 - 桜花な日々](http://d.hatena.ne.jp/rofi/20110802/1312234201)

これで対策できた！はずなのですが...

証拠はないのですがこのバグ、WindowsUpdateをするとまた発生する気がします。
気がついたら再発し、再発するたびに記事を見てレジストリ探してエントリを探すのも面倒なのでregファイル作成しました。

この作業は自己責任でお願いします。

[fix_explorer.zip](http://download.unsweets.net/fix_explorer.zip)

ダウンロードしたらzipを解凍してfix_explorer.regを実行してください。UACダイアログやらレジストリエディタの警告が出ますが、はいを押して、正常に値が追加されたことを確認し（正確には削除なのですが）、再起動をすれば完了です。