---
title: phpからプロセスを起動して標準入出力をする
id: 50
categories:
  - Memo
date: 2014-07-22 01:10:51
tags:
---
タイトルそのまま。ここではphpからスクリプトファイルを指定してnode.jsを起動します。

<!--more-->

```php
$options = array(
  0 => array("pipe", "r"),
  1 => array("pipe", "w")
);
$process = proc_open("node ./js/receive_csv.js", $options, $pipe);
if(!is_resource($process)) return;
fwrite($pipe[0], $utf8_csv);
fclose($pipe[0]);
$utf8_lectures_json = stream_get_contents($pipe[1]);
fclose($pipe[1]);
proc_close($process);
```

proc_open関数で子プロセスの制御を細かく指定して起動することができます。ここでは$options配列でそれぞれパイプを指定して書き込み用のパイプと読み込み用のパイプを設定しています。これは子プロセスが読み書きするパイプとなります。

fwrite関数ではパイプの0番目に指定すると標準入力に書き込まれることになります。第二引数に書き込む内容が入ったstringやらを指定。

stream_get_contents関数でパイプを指定すると標準出力を読み取ることができます。引数にパイプの1番目を指定します。

ここで重要なのがそれぞれのパイプを閉じないとproc_close関数を実行しようとしたときにデッドロックが発生する可能性があるという点です。後始末はしっかりと行いましょう。

php、久々に書いたもので突然現れる変数が宣言されてなくても使えてたりでかなりビビリます。
