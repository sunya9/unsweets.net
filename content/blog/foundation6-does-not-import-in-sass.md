---
layout: blog
title: SASS版Foundation6ではデフォルトで全てのモジュールをインクルードしない
s: foundation6-does-not-import-in-sass
date: 2017-08-04 21:52:29
tags:
    - Foundation
categories:
    - Memo
---

タイトルの通りです。Foundation5は（確か）全てインクルードしていたので、そのノリで利用していたら引っかかりました。

<!-- more -->

## 引っかかった環境
* webpacker
* Foundation6

詳細はこちら。

* [Sass | Foundation for Sites 6 Docs](http://foundation.zurb.com/sites/docs/sass.html)

読んでそのままの如くですが、`@import 'foundation';`とするだけではスタイルがインポートされず、スタイルが出力されません。これをやろうと思った時はRails5.1環境下でWebpackerを利用していたので、原因にたどり着くまでに時間がかかりました。ドキュメントを読めばすぐ解決するようなことですが、慣れたつもりでやっていてもいざ問題が発生すると、どこに原因があるかわからなくなって解決するのに時間がかかったりしますね。

この問題は`@import 'foundation';`後に`@include foundation-everything;`をすることで全てのコンポーネント類をインクルードすることができます。ただ、それでは不必要なコンポーネントもインクルードしてしまう可能性があるので、個別に読ませる方法も示されています。

---

Bootstrapの4がリリースされると期待しながらもうすぐ2年が経ちます。未だにAlpha版なわけですが、正式版はいつリリースされるのでしょうか…。
