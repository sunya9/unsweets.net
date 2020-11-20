---
title: Toolbar事始め
id: 66
categories:
  - Tutorial
date: 2015-01-21 19:07:54
tags:
---
![ツールバー事始め](/assets/images/toolbar_eyecatch.png)

適当に色設定したらださくなってしまった...

Android 5.0 Lolipopでは、ActionBarに変わりToolbarというものに置き換わりました。

<!--more-->

#### Toolbarとは

API21レベルから導入されたクラス。既にSupportPackageで互換性が保たれており、android.support.v7.widget.Toolbarクラスをimportすることにより使用できるようになります。

ToolBarはアプリケーション内で使用するための標準的なツールバーであり、レイアウトとして扱うことが出来ます。従来のActionBarでは、動作が不透明でありカスタマイズしづらく、開発者にとって不便なものでした。

5.0から追加されたこのToolbarは1つのViewとして扱うことが出来、xmlの任意の箇所に直接記述することが可能です。レイアウトに記述されたToolbarは通常のView通り、findViewByIdメソッドでビューを探し、setSupportActionBarメソッドの引数にToolbarを指定することにより、今までのActionBarと同じように扱うことが可能です。

Toolbarはナビゲーションボタンやロゴ、タイトル、カスタムビューやアクションメニューなどの要素を組合せて使用することになります。

*   ナビゲーションボタンはその名の通り、アプリケーションの1つ上の階層へ遷移したり、Navigation Drawerの表示・非表示などに使用します。ナビゲーションボタンは他のコンテンツのアクセスや、その他の方法を表示するために使用されるボタンです。
*   ロゴはアプリケーションのロゴを表示するものですが、ロゴのサイズは自由になり、横長でも縦長でも表示することが可能となりました。
*   タイトルはタイトルとサブタイトルがあります。現在の階層のコンテンツ内容のタイトルや位置を表示するために使用します。特にサブタイトルを表示する場合では、現在の内容についてより詳細の情報を表示するようにします。しかし、ロゴを表示している場合は、タイトルとサブタイトルを省略するべきです。
*   カスタムビューはToolbarに任意の小ビューを追加、表示することが可能です。小ビューのgravityの値がCENTER_HORIZONTALである場合は他の全てのビューが計測された後、余っているスペースの中心に配置されます。
*   アクションメニューは使用頻度が高いであろうメニューをToolbarの最後に追加されます。

#### ActionBarの何がいけないのか

*   拡張性が低い
*   操作しづらい
*   無理にカスタマイズしようとすると黒魔術的な方法になってしまう
*   表示箇所が基本的に上部限定

ActionBarは上にも書いたとおり、拡張性に乏しいです。表示位置ですらろくに変更できません。近年では端末サイズが5インチを超えるものや6インチが多く、右上に表示されたメニューなど、非常に押しづらいメニューとなってしまっていました。SplitActionBarという、画面下部に溢れでたボタンを表示するというものも存在しましたが、所詮ActionBarなので拡張性は乏しく、表示される条件も開発者からはわかりにくいため、扱いにくいものでした。SplitActionBarは有効にしても画面端末が広いタブレットなどでは通常のActionBar通り表示されたりします。

#### Toolbarのいいところ

*   拡張性が高い
*   普通のビューとして自由に操作できる
*   それでいてActionBarと同等の機能を併せ持つ
*   xmlの自由なところに記述できる

同じことを言っているような気がしますがToolbarは通常のビューと何ら変わりないため、操作を柔軟に行うことが出来ます。setSupportActionBarを呼び出せばActionBarとして扱うことが出来、getSupportActionBarを呼び出すことで今までどおりActionBarとして扱うことが可能です。

##### activity_main.xml

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:orientation="vertical">
  <android.support.v7.widget.Toolbar
  android:layout_height="wrap_content"
  android:layout_width="match_parent"
  android:id="@+id/tool_bar"
  android:minHeight="?attr/actionBarSize"
  android:background="?attr/colorPrimary"
  />
</LinearLayout>
```

colorPrimaryはテーマのcolorPrimaryを参照しています。

##### styles.xml

```xml
<resources>
  <style name="BaseTheme" parent="Theme.AppCompat.NoActionBar">
  <item name="colorPrimary">@color/color_primary</item>
  <item name="colorAccent">@color/color_accent</item>
  <item name="colorPrimaryDark">@color/color_primary_dark</item>
</style>
</resources>
```

注意点はNoActionBarから継承することです。Lightなどを指定すると通常のActionBarとToolbarが二重に表示されてしまいます。

colorPrimaryDarkはタスクバーに使用される模様。

##### Main.java

```java
import android.os.Bundle;
import android.support.v7.app.ActionBar;
import android.support.v7.app.ActionBarActivity;
import android.support.v7.widget.Toolbar;

public class Main extends ActionBarActivity {
    private static final String TAG = Main.class.getSimpleName();
    protected Toolbar mToolbar;
    protected ActionBar mActionBar;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);
      mToolbar = (Toolbar) findViewById(R.id.tool_bar);
      setSupportActionBar(mToolbar);
      mActionBar = getSupportActionBar();
    }
}
```

findViewByIdでToolbarを探し、setSupportActionBarでToolbarをActionBarにセットしています。セットしたらgetSupportActionBarでActionBarとして操作することが可能になります。

#### 参考URL

*   [Toolbar | Android Developers](http://developer.android.com/reference/android/support/v7/widget/Toolbar.html)
