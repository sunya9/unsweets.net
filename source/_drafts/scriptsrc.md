title: script要素の中でその要素にsrcの属性をつける
id: 19
categories:
  - Memo
date: 2011-09-13 21:26:16
tags:
---

結果から言うとOperaしか動きませんでした。動的な場合って動くのと動かないのってどっちが正しいんですかね。そもそもタイトルだけ見ると多分意味不明ですね。 

<!--more-->

    <script type="text/javascript">
    var scripts = document.getElementsByTagName("script");
    var script = scripts[scripts.length - 1];
    script.src = "script.js";
    </script>
    `</pre>

    例えばhtml上にこんなコードがあったとします。jsは読み込んだ時そこでロードが止まるのでscript要素の最後のものを選択すればそのDOMが選択できる云々...っていうのがあります。

    この時動的に読み込んだscript.jsはこのscript要素に属性として記述されるのですが...

    <pre class="prettyprint">`
    <script type="text/javascript" src="script.js">
    ～
    </script>

となります。

この時動くのは**Opera11.51**だけで**Chrome13.0.782.220 m**, **Firefox6.0**, **IE9**では動きませんでした。動かないのが普通なんですかね。

そもそも誰得なんでしょうかねこのコード。