title: sassのパスが通らなくなった
id: 28
categories:
  - Memo
date: 2012-03-11 21:34:38
tags:
---

いつからかgemでsassのアップデートをしたらパスが通らなくなったお話。メモです。 

<!--more-->

メモと言いつつちょっと詳しく書く...。

#### 環境

*   Windows7 64bit
*   notepad++ v5.8.6-6(unicode)
*   ruby 1.9.2p136
*   Sass 3.1.15 (Brainy Betty)

sassの正しい運用方法だとか環境がよくわからないですがこんな感じ。

#### 実行方法

sassを開きつつnotepad++の「実行」に登録したbatでsassを起動(ショートカットキーはAlt+F7)。

以下batファイル。

    path "C:\Ruby192\bin"
    sass --watch %1:%2
    `</pre>

    やっぱり正しいのかどうかわからないけどこんな感じ。自前、だったと思う。

    notepad++の実行するときの文は以下

    `"Z:\sys\sass.bat" "$(FULL_CURRENT_PATH)" "$(CURRENT_DIRECTORY)\$(NAME_PART).css"`

    $()はnotepad++で使える関数（？）。FULL_CURRENT_PATHは今開いてるファイルのフルパス(sass)で%1に入るもの。CURRENT_DIRECTORYは今開いてるファイルのディレクトリ、NAME_PARTは今開いてるファイルの名前部分。演算してsassのファイルパスを組み立てています。%2に当たる部分。

    #### 問題

    いつからかsassのファイルに記述した@import構文がうまくインポートできなかった。

    #### 原因

    いつのまにかsassを実行するとnotepad++のあるディレクトリを基点にして@importするファイルを探すようになっていたため。

    #### 対処

    batファイルを以下のように変更。

    <pre class="prettyprint linenums">`
    path "C:\Ruby192\bin"
    cd /d %~dp1
    sass --watch %1:%2

%~dp1でsassファイルのディレクトリを取得して移動するようにした。

#### 結果

うまくいきました。あれ、これ全然メモじゃない...。まあいいや。