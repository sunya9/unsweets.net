---
title: Webでのダークモード対応とその時の課題
categories:
  - Memo
date: 2020-04-16 03:30:20
---

引き続き[小並感](https://private.unsweets.net/)リニューアルネタです。ダークモードの対応方法と、そのときに出くわした問題とその対処のメモ。

昨今の OS はネイティブレベルで対応するようにもなり、Web もじわじわと対応を求められることが増えてくるのではないでしょうか。

<!-- more -->

## ゴール

- 複雑なことをせずに Web 上でダークモードに対応する
- 重複したプロパティ宣言を削除する poctcss プラグインを公開した

ここで言うダークモードですが、恐らく一般的な認識と同じく「白っぽく明るい UI とは対象的な黒っぽく暗い UI」を指します。

## 方法

色々な手法はあるかもしれませんがここでは CSS の media query を使い、特に `prefers-color-scheme` と呼ばれるメディア特性を利用して実装していきます。このメディア特性はシステムのカラーテーマを検出し、一致したときに宣言したセレクタなどを評価するようになります。

```css
body {
  /* 基本は白背景黒文字 */
  background-color: white;
  color: black;
}
@media (prefers-color-scheme: dark) {
  body {
    /* システムの設定がdarkならば黒背景が適用される */
    background-color: black;
    color: white;
  }
}
```

簡単です。自前で CSS を全部自分で管理しているような小さいサイトならばメンテナンスも難しくはないでしょう。

少しサイトが大きくなってきたら色が多くなって管理しきれなくなったり、セレクタが 2 倍になってしまうかもしれません。その時は CSS Variables を組み合わせて書くと綺麗に書くことができます。

```css
:root {
  --background-color: white;
  --text-color: black;
}
@media (prefers-color-scheme: dark) {
  :root {
    --background-color: white;
    --text-color: black;
  }
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
}
```

もちろんこれには CSS Variables に対応している必要が有ります。

## 既存の CSS フレームワークと組み合わせる

実際のところ、ある程度の規模を持った Web アプリケーションは CSS を 1 から書いてあることは恐らく稀で Bootstrap や Bulma などと言ったフレームワークを組み合わせて使うことが多いかと思います。またそれらも素の CSS ではなく Sass や Less と言った言語で書かれたコードであることが多く、色をカスタマイズするために規定の変数を上書きした上で import をして CSS として取り込む、といった方法を取ることが主流だと思います。こういったシチュエーションの場合、上記の手法だと問題が多いです。

### 上書きする対象が多すぎる

ダークモード対応すべきクラスが CSS フレームワークレベルになると非常に多く、愚直にやるのは現実的ではない

### 多くの CSS FW は CSS Variables が考慮されていない

Sass や Less で書かれた CSS FW の変数を上書きして import しているシチュエーションではそれらを CSS Variables に置き換えても上手く行かないことが多いです。

#### ダークモード対応前のコード例

```scss
$bg: white; // CSS FWで使用されているprimary変数の上書き
@import '~css-framework';
// body { background-color: white } のようなコードが生成されるとする
```

#### Sass 変数の値を CSS Variables に置き換えようとする

```scss
$bg: var(--bg);
@import '~css-framework';
:root {
  $bg
}

// body { background-color: var(--bg) } と出力されるかもしれないが…？
```

上記は一見上手く行くように見える…というか上記コード例だけならうまくいったはずですが（うろ覚え）、実際の多くの CSS FW は内部で関連する色を生成していることが多く、うまくいかないことがほとんどです。

#### 多くの CSS FW の Sass コードの実情

```scss
// 開発者が $bg: var(--bg)のように書いてもCSS FWの中身では…
$bg: gray !default; // CSS FWはあくまでも色の入力を想定している
$bg-darken: darken($bg, 10%); //カラーコードを元にbgより暗めの色を算出
body {
  background-color: $bg;
}
header {
  background-color: $bg-darken;
}
```

このように Sass 変数と Sass の組み込み関数などを使って変数の中にあるカラーコードを元に別の色を算出していることが多く、Sass の時点で`var(--bg)`などといった置き換えをすると Sass のコンパイルが上手く行かなくなってしまいます。

## ではどうやって既存の CSS FW をダークモードとして確立させるのか

小並感では今回は CSS Variables を使わず大胆に CSS FW を 2 回 import する手法を取りました。

```scss
// 通常のテーマ
$bg: white;
@import '~css-framework';

// ダークモード
@media (prefers-color-scheme: dark) {
  $bg: black;
  @import '~css-framework';
}
```

Sass の変数はあくまでも色を投げるようにし、コンパイルが通るようにします。この雑に media query で囲った書式は「できるのかな」くらいの気持ちで書いて出来ることを知ったのですが、意外にもうまく処理してくれたりします。というのも当然で、プロパティに記述された上書きした色の値は違えどセレクタ自体は同一であり、システムがダークモードあればすべてこちらのルールを優先・適応するからです。

しかし、このコードには見て想像がつきますが重大な欠点があります。

### 吐き出す CSS が 2 倍になる

当然 of 当然ですが 2 倍になります。CSS FW のプロパティは色に関する記述だけであるわけはなく、カラムやカードと言ったクラスに関する宣言もあるので、色の上書き箇所以外の部分は二重の宣言となりかなり無駄です。

## [extract-color-properties](https://www.npmjs.com/package/extract-color-properties)というツールを作った

この記事で書きたかったことです。上記のようなアプローチを取った場合色関連の宣言が無駄になるので削除するツールを作りました。postcss との併用が基本的な使い方ですが、モジュール単体で読み込んで処理させることも可能です（内部では結局 postcss を使っているのですが）。

やっていることは簡単で、色関連のプロパティが設定されうるものはすべて残すようにしています。

処理前:

```css
.foo {
  width: 100px;
  color: white;
  background-color: black;
}

@media (prefers-color-scheme: dark) {
  .foo {
    width: 100px;
    color: black;
    background-color: white;
  }
}
```

処理後:

```css
.foo {
  width: 100px;
  color: white;
  background-color: black;
}

@media (prefers-color-scheme: dark) {
  .foo {
    color: black;
    background-color: white;
  }
}
```

プロパティが残らなくなった場合はセレクタの削除もするようにしています。

postcss としての使用方法はほかプラグイン同様、require して配列に突っ込みます。

```postcss.config.js
module.exports = {
  plugins: {
    require('extract-color-properties')({ excludeProperties: [''] })
  }
}
```

一応削除対象から除外するオプションも作ってみました。

まだまだ keyframe 周りの動作は甘いのでそのへんの改善や、カラーコードを CSS 変数に置き換えてしまうなどのアイディアもあるので（名前に反して処理してることがかなり変わりそうですが）、継続して取り組めたらなと。
