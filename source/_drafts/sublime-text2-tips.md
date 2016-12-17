title: Sublime Text2の個人的Tips
id: 41
categories:
  - Memo
date: 2013-10-25 21:34:27
tags:
---

Sublime Text2はカスタマイズ性も高く、自分好みの設定にできるのがとても気に入ってます。

その中の個人的に便利だと思ってるキーバインドとか。

#### Ctrl+Alt+Shift+Sで全て保存

以下のようにキーバインドを設定。

    { "keys": ["ctrl+alt+shift+s"], "command": "save_all" }`</pre>

    #### Ctrl+Alt+Shift+Wで全て閉じる

    <pre class="prettyprint">`{ "keys": ["ctrl+alt+shift+w"], "command": "close_all" }

#### Ctrl+マウスホイールで高速スクロール

こちらはキーバインドではなくプラグインですが。SublimeText2では標準ではフォントのサイズ変更になりますが、Eclipseに慣れてしまった身としては高速スクロールの方が使いやすい。

Install Packageで"ControlScroll"と検索し、インストールすれば完了。