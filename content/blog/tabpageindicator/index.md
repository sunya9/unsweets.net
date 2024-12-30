---
title: TabPageIndicatorのフォントを変更したり長押しを実装したり
id: 34
categories:
  - Memo
date: 2013-03-28 21:08:16
tags:
---

![device-2013-03-28-211522.png](./device-2013-03-28-211522.png)

TabPageIndicatorです。ViewPagerのタイトル部分のものです。TitlePageIndicatorとは少し違います。ActionbarTabに近い感じ。そこのフォントを変更します。

TabPageIndicator、TitlePageIndicatorを知らない方は[ViewPagerIndicator](http://viewpagerindicator.com/)を見て導入しましょう。

<!--more-->

xmlのレイアウトには少なくともTabPageIndicatorを載せてる前提でメインのコードのみかきます。また、フォントファイルはassets/fonts内にroboto_light.ttfが入ってる前提ですか、適宜書き換えれば大丈夫かと。

```java
TabPageIndicator indicator = (TabPageIndicator) getView().findViewById(R.id.indicator);
LinearLayout child = (LinearLayout) indicator.getChildAt(0);
Typeface robotoTypeFace = Typeface.createFromAsset(getAssets(), "fonts/roboto_light.ttf");
for (int j = 0; j < child.getChildCount(); j++) {
  TextView c = (TextView) child.getChildAt(j);
  c.setTypeface(robotoTypeFace);
  c.setOnLongClickListener(new OnLongClickListener() {
    @Override
    public boolean onLongClick(View v) {
      Toast.makeText(getApplicationContext(), "Long press.", Toast.LENGTH_SHORT).show();
      return false;
    }
  });
}
```

#### 解説のようなもの

TabPageIndicatorはソースをみてみるとHorizontalScrollViewを継承しているのがわかります。ScrollViewは中に一つしかViewGroupを入れることしか出来ないので、TabPageIndicatorの小ビューはLinearLayoutになります（厳密にはLinearLayoutを継承したIcsLinearLayoutクラスらしい）。
その中にTextViewを継承したTabViewというビューがたくさん入っています。つまり、そのTabViewのsetTypefaceやsetOnLongClickListenerメソッドを使えば解決というわけ...だと思います。

```
TabPageIndicator
┗IcsLinearLayout
　┗TabView
　┗TabView
　┗TabView
　┗TabView
　┗...
```

当然ですが、TabPageIndicatorにタブが増えるなどの変更があった場合、このコードを実行しないと増えたタブはフォントが適用されなかったり長押しはできないままです。クラスを継承して独自のTabPageIndicatorを作ればできるかもしれませんがさすがにそこまでやる気は起きませんでした...。
