title: twitterポスト規制通知bot「RegNotifier」を作りました
id: 38
categories:
  - Notice
date: 2013-10-04 16:48:09
tags:
---
![rn-icon.png](/images/rn-icon.png)

node.jsを使ってTwitterのポスト規制通知botを作ってみました。

<!--more-->

さて宣伝をしようと思い記事を書こうとしたのですが具体的に記事の中身をどうするか全く考えてませんでした。

#### 使い方

1\. [RegNotifier](http://rn.unsweets.net/)にアクセスして、OAuth認証をします。

2\. OAuth認証を終えたら@RegNotifierと相互フォローになります。自動的に規制解除時間の予測をするための探索が始まります。いつまでたっても終わらなそうだったらページをリロードしてみてください。また、ProtectedUser（俗に言う鍵ユーザー）の方はRegNotifierの方からフォローリクエストが送られているはずなので承認してください。これをしないと正しく規制を検知することができません。

3\. セクションを探索し終えたら終わりです。

#### その他

今のところ規制される15ポスト前に通知をするようにしています。今後ユーザーが設定をいじられるようにする予定です。

「教えて」などのリプライで規制に関する情報を教えてくれます。ただ、一回教えてもらうと10分間は反応しません（bo自体tの規制対策です）。

bot自体の規制対策のため、上記対策の他に、[@RegNotifier](http:/twitter.com/RegNotifier)以外に[@RegNotifier2](http:/twitter.com/RegNotifier2)、[@RegNotifier3](http:/twitter.com/RegNotifier3)からリプライをする仕様にしています。フォロー関係にないユーザーにリプライを送るのは無差別にリプライを送ることと同じなのでスパムとみなされて凍結されないか心配ですが...。

その他に[@RN_Support](http:/twitter.com/RN_Support)というアカウントを用意しました。これは@RegNotifierに関するメンテナンス情報などを流す予定...なのですが、勢いで作ったためどのくらい活用するかは不明です。フォローしてもいいよという方はどうぞ。

最後になりますが、このbotはまだまだアルファバージョンです。正しく規制を検知できなかったり、バグがある可能性は十分にあるので発見した場合は[@\_X\_y\_z\_](http://twitter.com/\_X\_y\_z\_)か[@RN_Support](http://twitter.com/RN_Support)にリプライを送っていただくと助かります。