title: androidのsqliteでdeleteを直接実行しても削除してくれない
id: 35
categories:
  - Memo
date: 2013-04-21 03:29:25
tags:
---

直接、というのはrawQueryメソッドを使っても削除してくれないという。レコード単一だと削除できるのか、全削除の場合は削除してくれないのかはよくわかりませんが、削除してくれませんでした。

<!--more-->

#### というわけで

以下のようにやってもなぜか削除してくれず。

    String sql = String.format("DELETE FROM %s", TABLE);
    db.rawQuery(sql, null);
    `</pre>

    以下のようにdeleteメソッドを使ったら削除してくれました。

    <pre class="prettyprint linenums">`
    db.delete(TABLE, null, null);

なぜrawQueryだと削除してくれないんでしょう、仕様を読めばわかるかもしれませんが解決しちゃったので気が向いたら検索しようと思います...。