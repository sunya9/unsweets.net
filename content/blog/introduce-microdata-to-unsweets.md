---
title: unsweetsにMicrodataを導入しました
id: 68
categories:
  - Notice
date: 2015-01-22 20:58:30
tags:
---
少し前からunsweetsの方でMicrodataというものを導入していました。

<!--more-->

#### Microdataとは

Microdataとはある情報に対してラベル付けを行うものです。Microdataには情報の種類によってアイテムが存在し、そのアイテムにはプロパティと呼ばれるものが存在します。定義すると機械が読み取ることが可能になります。

例えばunsweetsでは以下の様なコーディングをしています。

```html
<section id="xstus" itemscope itemtype="http://schema.org/MobileApplication">
  <h4 itemprop="name">xsTus</h4>
  <div class="body clearfix">
    <p>
      <img src="images/xstus-icon.png" width="256" height="256" alt="xsTus アイコン" itemprop="image">
    </p>
    <p itemprop="description">
      xsTus（えくすたす）はTwitterのUserstreamに対応する超絶αバージョンのAndroidのtwitterクライアントです。
    </p>
    <div class="button">
      <a href="http://xstus.unsweets.net/" itemprop="url">Detail</a>
    </div>
  </div>
</section>
```


このようにitemscope属性でその要素内がアイテムであることを示しています。そのアイテムがどのようなものであるかをitemtypeで示しています。itemtypeにはかなり種類があるので見てみるといいかも。 [Full Hierarchy - schema.org](http://schema.org/docs/full.html)

itemprop属性は値にその要素の内容に対するプロパティを定義します。上記の例だとnameとかdescriptionとかimageとかのですね。itempropはitemtypeによって利用できるものが違います。大元はThingというitemtypeがあって、そこから継承されているような形となっています。そのためnameやdescriptionなどは共通プロパティです。

このように定義されたMicrodata は[Google Structured Data Testing Tool](https://www.google.com/webmasters/tools/richsnippets)にアクセスして、確認したいURLを入力することでどのように構造化されたデータがちゃんと定義されているか確認することが出来ます。

Microdataを定義することによりGoogleなどの検索結果をよりリッチにすることが可能になります。検索結果にパンくずリストが表示されたり、著作者情報について表示されてりするアレです。

少し時間がないので導入したという記事だけ書きました。まとまった時間があればMicrodataについてより詳しく書きたいと思います。

#### 参考URL

*   [構造化データ テストツール - ウェブマスター ツール ヘルプ](https://support.google.com/webmasters/answer/173839?hl=ja)
*   [HTML Microdata](http://www.w3.org/TR/microdata/)
*   [Home - schema.org](http://schema.org/)
