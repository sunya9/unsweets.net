---
title: ADBの基本的な操作
id: 63
categories:
  - Memo
date: 2015-01-18 23:34:34
tags:
---

よく使うコマンドメモ。

<!--more-->

#### 端末に接続

*   adb connect 192.168.x.xxx
*   <span style="line-height: 1.62;">adb connect 端末名</span>

端末名を入力。ネットワークADBの場合はローカルIPアドレスを入力。Android 4.0.4からrootなしでネットワークADBが利用可能。

#### 切断

*   adb disconnect 192.168.x.xxx
*   <span style="line-height: 1.62;">adb <span>disconnect </span>端末名</span>

接続の逆。切断することが可能。

#### 接続している端末の確認

*   adb devices

現在接続されている端末の確認を行うことが可能です。

#### ADBを停止させる

*   adb kill-server

adbを停止させることが可能です。

#### ADBを起動する

*   adb start-server

adbを起動させることが可能です。

#### shellに接続

*   adb shell

<span style="line-height: 1.62;">シェルを扱うことが出来ます。</span>

#### 端末からファイルを受信する

*   adb pull /sdcard/foo.txt ./

pullコマンドでファイルの習得が可能。第一引数は取得したい端末にあるファイルのパス、第二引数は取得したファイルの保存場所です。

#### 端末にファイルを送信する

*   adb push ./foo.txt /sdcard/

pullコマンドの逆。第一引数に送信するPC側のファイル名、第二引数が保存するディレクトリパスです。

#### インストールされているアプリのパッケージ一覧を取得する

*   adb shell pm list package

<span>端末にインストールされているアプリのパッケージ一覧を取得することが可能です。</span>

#### <span>複数接続している時</span>

*   <span>adb -s 端末名やIPアドレス コマンド</span>

<span><span>-sオプションで操作対象の端末を選択することが出来ます。</span></span>