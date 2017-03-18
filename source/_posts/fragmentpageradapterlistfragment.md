---
title: FragmentPagerAdapterとListFragmentを使ったらはまった
id: 32
categories:
  - Memo
date: 2013-03-17 15:31:16
tags:
---
FragmentPagerAdapterはFragmentを利用したViewPagerです。

<!--more-->

FragmentPagerAdapterは通常継承して内部で処理すると思います。

入れるFragmentがListFragmentで、なおかつリストのヘッダーを利用していたらはまりました。

詳しくは調べてないので確定とは言えませんが（仕様とか余り読んでいない）、ViewPagerは通常3ページ保持して、今見てるページ、左のページ、右のページを保持しています。
それで、今見てるページから右のページに写ったとすると、前のページの左のページは破棄され、新しく右のFragmentが生成されます。

その時FragmentPagerAdapterの場合はFragmentが破棄されます。

そしてまた左に戻ろうとしてFragmentを生成するとなんと落ちてしまいます。
なぜかと思ってLogCatをみてみると...。

**Cannot add header view to list -- setAdapter has already been called.**

の文字が。どうやらsetAdapterを呼んだ後にヘッダービューを追加するなと言ってるようです。いいえそんなことは知っていました。しかしFragmentが破棄されたのになぜAdapterがセットされたまま...？なのかを疑問に思って適当に検索してみるとこんな記事を見つけました。

[AndCreate: [Android]OutOfMemoryError(メモリリーク)対策](http://htomiyama.blogspot.jp/2012/08/androidoutofmemoryerror.html)

直接的には関係ないのですが、読んでみると、ListViewのAdapterはちゃんとnullを代入しないと破棄されないという文字が...。

つまり、最終的にコード例はこうなるわけです。

```
//ListFragment
public class ConversationList extends ListFragment {
  private ListAdapter adapter;
  @Override
  public void onActivityCreated(Bundle savedInstanceState) {
    super.onActivityCreated(savedInstanceState);
    LayoutInflater mInflater = (LayoutInflater) getActivity().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
    View header = mInflater.inflate(R.layout.tweet_detail, null);
    getListView().addHeaderView(header, null, true);
    adapter = new ListAdapter(act, R.layout.tweet, data);//ArrayAdapterなどを継承した任意のアダプター
    setListAdapter(adapter);
  }
  @Override
  public void onDestroyView() {
    setListAdapter(null);//←ここ重要
    super.onDestroyView();
  }
}
```

端折ってます。ListFragmentが破棄されるとき、onDestroyViewまでは呼ばれるので、この時にアダプターにnullを代入しとけば大丈夫だと思います。

これでようやくFragmentPagerAdapterを自由に動かしてもエラーをはくことなく、動くようになりました。