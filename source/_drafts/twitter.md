title: twitterで排除したらすっきりするかも知れない排除設定
id: 26
categories:
  - Customize
date: 2012-01-10 23:47:50
tags:
---

メモレベルで。あんまりやりすぎるとtwitterの意味としてなくなってしまいますからほどほどにしましょう。

正規表現も混ざってるのでそこら辺は了承してください。Tween前提ですが正規表現のあるクライアントであれば使えます。

<!--more-->
<dl class="inline">
<dt>診断メーカー</dt>
<dd>shindanmaker.com</dd>
<dt>アニメ</dt>
<dd>#(ikamusume|C3_anime|haganai|Fate(_)*Zero|imas_anime|animas|mashiro_|mashiro|bakemono|horizon|majikoi|makenki|amagamiSS) （古いですがまあ随時追加ということで...）</dd>
<dt>フォローミー(今時はないかな？）</dt>
<dd>#followme</dd>
<dt>NowPlaying（今聞いてる曲)</dt>
<dd>#now(Play|listen)ing</dd>
<dt>拡散やら自動ポスト</dt>
<dd>(拡散|無言RT|自動ポスト)</dd>
<dt>空リプ</dt>
<dd>^(@[A-Za-z0-9_]*\s*)*$</dd>
<dt>特定クライアント（自動ポスト系）</dt>
<dd>twittbot.net|TWTunes|Gnoov.com|gohantabeyo.com|TwitRock|Intel Tweet City|installNow|Paper.li</dd>
<dt>ツイートバッテリー</dt>
<dd>#tweetbatt</dd>
<dt>日本語ハッシュタグ</dt>
<dd>(?:#|\uFF03).*([\u3041-\u3094\u3099-\u309C\u30A1-\u30FA\u3400-\uD7FF\uFF10-\uFF19\uFF20-\uFF3A\uFF41-\uFF5A\uFF66-\uFF9E]+)</dd>
</dl>

これくらいでしょうか。自分を排除してたりすると「あれっ？」って鳴らなくなると思います。

当たり前ですがこれによる責任みたいななのはとりません...。

後twitterならスルースキル身につけたほうが...！