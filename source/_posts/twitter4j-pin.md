title: Twitter4JでPIN認証
id: 64
categories:
  - Memo
date: 2015-01-19 13:24:22
tags:
---
Twitter4Jを使ってPIN認証します。

<!--more-->

[Twitter Application Management](https://apps.twitter.com/)にアクセスし、自分のアプリケーションを予め作成しておきます。この時、コールバックURLをを空にしておくことでPIN認証をすることが出来ます。

[![Twitter Application Managementの個別URLのアプリ設定画面](/images/2015-1-19_13-52-1_511-thumb-300xauto-137.png)](/images/2015-1-19_13-52-1_511.png)

適宜インポートしておきます。

```
Twitter twitter = TwitterFactory.getSingleton();
twitter.setOAuthConsumer(API_KEY, API_SECRET);
try {
    RequestToken requestToken = twitter.getOAuthRequestToken();
    String url = requestToken.getAuthorizationURL();
} catch (TwitterException e) {
}
```

urlを読み込ませ、PINを控えさせておきます。なおString型だと都合が良いです。

```
String pin = "***";
try{
    AccessToken token = twitter.getOAuthAccessToken(requestToken, pin);
    String accessToken = token.getToken();
    String accessTokenSecret = token.getTokenSecret();
    User user = twitter.verifyCredentials(); // ユーザー情報を取得できる
} catch (TwitterException e) {
}
```

getOAuthAccessTokenはrequestToken無しでも取得出来るっぽいですが、明示的に指定したほうが心配はないのかも。エラーが投げられなければtwitterインスタンスは使えるようになるはず。

実際にAndroid上で使うには非同期処理が必要だったりしますが、そこは省略。