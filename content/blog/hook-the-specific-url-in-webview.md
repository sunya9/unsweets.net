---
title: Webviewで特定のURLで処理を行う
id: 57
categories:
  - Memo
date: 2015-01-12 22:22:50
tags:
---
webviewを使ったフックのやり方のメモ。

<!--more-->

#### レイアウト

適当に定義。

```
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
android:layout_width="match_parent"
android:layout_height="match_parent">
  <WebView
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:id="@+id/webview"/>
</RelativeLayout>
```

#### java

```
public class WebViewActivity extends ActionBarActivity{
  private WebView mWebView;
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_webview);
    mWebView = (WebView) findViewById(R.id.webview);
    mWebView.setWebViewClient(new WebViewClient() {
      @Override
      public boolean shouldOverrideUrlLoading(WebView view, String url) {
      if (url.equals("http://example.com/")){
        /// 特定の処理
      }
      return false;
    }
  }
}
```

shouldOverrideUrlLoadingの戻り値についてですが、trueを返すと外部のアプリケーションで処理する前提の処理になってしまうようなので、webviewを使って自分のアプリケーション内で処理をしたいという場合は常にfalseを返しておくのが賢明なようです。