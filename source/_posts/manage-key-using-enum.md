title: Enumを使ってBundleやIntentのキーを管理する
id: 69
categories:
  - Memo
date: 2015-01-23 17:00:49
tags:
---
AndroidではIntentを発行するときやFragmentを生成するときに、引数として値を渡す時があります。

<!--more-->

#### 定数は値が一意ではなくなる

キーはよくprivate final static～などと定数として定義することが多いですが、これは値が同一になるのでもしかしたら衝突してしまうかもしれません。

```
public final static String ARG_PARAM1 = "foo";
public final static String ARG_PARAM2 = "foo";
```

上記の例だと変数名こそは別ですが、値は別なので一意性がありません。これでは以下の様にIntentを発行した時値が上書きされてしまいます。

```
Intent intent = new Intent(getApplicationContext(), Foo.class);
intent.putExtra(ARG_PARAM1, 10);
intent.putExtra(ARG_PARAM2, 20);
startActivity(intent);
```

これでは引数のfooが上書きされてしまいます。

#### Enumを使って定義する

```
enum IntentKey {
	ARG_PARAM1, ARG_PARAM2
};
```

このように定義して以下のように使用します。

```
Intent intent = new Intent(getApplicationContext(), Foo.class);
intent.putExtra(IntentKey.ARG_PARAM1.name(), 10);
intent.putExtra(IntentKey.ARG_PARAM2.name(), 20);
startActivity(intent);
```

こうすることで一意性が保たれ、キー名が衝突することがなくなります。

Intentのキー名、Bundleのキー名だけでなく、DialogFragmentのタグ名にも使うことが可能だと思います。