title: node.jsで日付フォーマット
id: 43
categories:
  - Memo
date: 2013-11-17 14:17:01
tags:
---

node.jsで日付をフォーマットしたい時、dateformatという便利なモジュールがある。

<!--more-->

インストールはいつも通りnpmから。

    npm install dateformat
    `</pre>

    使用するにはいつも通りrequireから。

    <pre class="prettyprint num">`
    var dateformat = require("dateformat");
    `</pre>

    これで使えるようになる。

    #### example

    <pre class="prettyprint num">`
    dateformat(new Date(), "yyyy/mm/dd HH:MM:ss");
    // 2013/11/17 14:30:35

第一引数に日付オブジェクト、第二引数にフォーマットを指定。文字列が返ってくる。

よく使いそうなフラグをまとめてみた。

<dl>
<dt>d</dt>
<dd>短い日にち。</dd>
<dt>dd</dt>
<dd>ゼロパディングされる日にち。</dd>
<dt>ddd</dt>
<dd>短い曜日(Sunなど)。ソースコードを見る限り英語？</dd>
<dt>dddd</dt>
<dd>フルの曜日(Sundayなど)。</dd>
<dt>yy</dt>
<dd>二桁の西暦。</dd>
<dt>yyyy</dt>
<dd>四桁の西暦。</dd>
<dt>h</dt>
<dd>0～12時。</dd>
<dt>hh</dt>
<dd>ゼロパディングされる時間0～12時(09時のような)。</dd>
<dt>H</dt>
<dd>0～24時。</dd>
<dt>HH</dt>
<dd>ゼロパディングされる0～24時。</dd>
<dt>M</dt>
<dd>月。</dd>
<dt>MM</dt>
<dd>ゼロパディングされる月。</dd>
<dt>s</dt>
<dd>秒。</dd>
<dt>ss</dt>
<dd>ゼロパディングされる秒。</dd>
<dt>t</dt>
<dd>amかpmのaかpが返される。</dd>
<dt>tt</dt>
<dd>"am"か"pm"が返される。</dd>
<dt>T</dt>
<dd>tの大文字版。</dd>
<dt>TT</dt>
<dd>同じくttの大文字版。</dd>
</dl>

この他にももうちょっとフォーマットの仕方があったりするので詳しくはソースコードを見てみるといいかも。

[felixge/node-dateformat ・ GitHub](https://github.com/felixge/node-dateformat)