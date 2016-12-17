title: Windows上でnode-gyp関連のビルドがうまくいかない
tags:
  - node-gyp
  - node.js
  - npm
id: 116
categories:
  - Memo
date: 2015-09-15 07:26:23
---
いろいろ試行錯誤したのですが、うまくいかなくて最終的に行なった手順が以下。
<!--more-->

## 環境

*   Windows 8.1 64bit
*   node 4.0.0
*   npm 2.14.2

## 手順

1.  素直に[Visual Studio](https://www.visualstudio.com/downloads/download-visual-studio-vs)を入れましょう。SDKだとかServerのを入れる方法もありますが、私の環境ではうまく行きませんでした。今なら2015を入れるともれなく7GB消費されます(Communityバージョンで大丈夫です）。
2.  依存関係をインストールするときは`npm install --msvs_version=2012`。バージョンが2015であっても2012で平気なようです。どうやら2012指定だとVCBuildを探さずにMSBuildを探しているようです（挙動を見ていないのでわからないのですが、未指定だとVCBuild.exeが見つかりませんという旨の記述が出力され、実際にPC内には存在せず、代わりにMSBuildが存在したから）。
3.  毎回msvs\_versionなんて指定していられないので`npm config set msvs_version 2012 --global`と打ちましょう。msvs\_versionのグローバル設定が有効になります。設定値は`%AppData%\npm\etc\npmrc` という名前で保存されていました。