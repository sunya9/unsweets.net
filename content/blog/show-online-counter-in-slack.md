---
title: Slackinを使ってSlackのオンライン人数をウェブページ上に表示する
id: 72
categories:
  - Tutorial
date: 2015-04-21 11:47:56
tags:
---

Slackinというアプリケーションを使用すると、Slackの任意のチームのオンライン人数の表示や招待ページへの誘導をすることが可能になります。
今回はHerokuを併用してSlackinを利用してみます。

<!--more-->

#### 前提

- Slackに登録している（当たり前ですね）
- Herokuに登録している

#### 1. Slackinのページにアクセス

[SlackinのGithub上のページ](https://github.com/rauchg/slackin)にDeploy to herokuのボタンがあるのでそれをクリック。Herokuに移動し、アプリケーションをデプロイする画面に移動します。

#### 2. Heroku上でSlackinの設定をする

App Nameはアプリケーション名です。特に設定しなくても問題はありません。
Regionは好みの方を。私はUnited Statesにしました。
Config VariablesのSLACK_SUBDOMAINはチーム名を入力します。
SLACK_API_TOKENは[Slack Web API | Slack](https://api.slack.com/web)のAuthenticationセクションあたりにTokenが記述されていますので、これをコピー&ペースト。
SLACK_CHANNELについては、招待ページを表示した時に、どのチャンネルに招待するかを設定できます。空白にすると全てのチャンネルに招待することが可能です。
設定後, Deploy for Freeボタンを押すとDeployが始まります。デプロイし終わったらViewボタンを押してみましょう。App Nameを割り当てていなかった場合URLは自動で割り振られます。

#### 3. ウェブページに表示してみる

URLは先程の通り http://アプリケーション名.herokuapp.com/ になります。
トップページは招待ページになります。ここからメールアドレスを入力して招待リクエストを送ることが可能なようです。/slackin.js にはバッジを表示するためのコードがあります。これをscript要素で以下のように読み込むと、バッジを表示することが可能です。

```html
<script
  src="http://アプリケーション名.herokuapp.com/slackin.js"
  async
  defer
></script>
```

![Slackのボタンとともに3/31と書かれた吹き出しが表示されている](/assets/images/2015-4-21_12-28-49_634.png)

こちらのバッジはリアルタイムにオンライン人数を表示してくれます。
/badge.svg はリアルタイム表示してくれませんが、svgボタンなので拡大縮小が可能です。

```html
<a href="http://アプリケーション名.herokuapp.com/"
  ><img
    src="http://アプリケーション名.herokuapp.com/badge.svg"
    alt=""
    width="87"
    height="20"
/></a>
```

![Slackという文字の隣に3/31とオンライン人数が表示されている](/assets/images/2015-4-21_12-38-19_635.png)

これを使えばよりSlackへの招待を円滑に行うことができるかもしれませんね。
