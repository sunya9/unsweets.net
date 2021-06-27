---
title: zoomingがいい感じ
author: _X_y_z_
tags:
  - zooming
categories:
  - JavaScript
date: 2016-12-23 18:59:00
---

![キャベツ](/assets/images/cabbage.jpg "画像拡大テスト用のキャベツ")

ブログのテーマの調整も一段落といった感じで落ち着きました。

unsweets.logの画像拡大には[zooming](https://github.com/kingdido999/zooming)というライブラリを使って画像クリック時の拡大表示の処理をしています。一言で言えば[Medium](https://medium.com)のような表示を行ってくれます。同じようなライブラリに[zoom.js](https://github.com/fat/zoom.js/)がありますが、こちらはjQueryに依存しているので利用は避けました。forkでvanillaのものを作成されている方もいるようですが…。

モバイルデバイスのようなタッチデバイスの操作にも対応しています。その他細かいオプションも指定できるようですが、ブログではほとんど設定を変えていません。

```javascript
const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

Zooming.config({
  bgOpacity: 0.8,
  bgColor: "#000",
  preloadImage: !isMobile,
});
```

プリロードの設定も行えるので適当なモバイル判定で設定するようにしてみましたが、自分自身もテザリングでラップトップを使うことがあるのであんまり信頼できない設定だったり…。
[Network Information API](https://developer.mozilla.org/ja/docs/WebAPI/Network_Information)というものもあるそうですが、まだ草案状態でどのブラウザでも実装してないようですね。

普通は画像にリンクしているサムネイル画像をクリックすることで拡大が見れるということを考えたら`<a href="foo.jpg"><img src="foo.jpg"></a>`というマークアップが普通だと思うのですが、これだとZoomingの処理が入らないので、このブログではJavaScriptで適当に属性設定をしています。

```javascript
const $ = document.querySelectorAll.bind(document);

Array.prototype.slice.call($(".article-body a > img")).forEach((img) => {
  const a = img.parentNode;
  a.addEventListener("click", (e) => e.preventDefault());
  img.setAttribute("data-action", "zoom");
  img.setAttribute("data-original", a.href);
});
```

これで自然なマークアップになりました。
