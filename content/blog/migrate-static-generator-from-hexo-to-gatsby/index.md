---
title: 静的生成ツールをHexoからGatsbyに移行した
categories:
  - Notice
date: 2019-02-08 00:46:00
---

近頃かなりブログの更新頻度が落ちているが、それはそれとしてブログの静的生成ツールをHexoからGatsbyに移行した。これを機にちょくちょくブログを更新できるようにしたい。

お知らせ記事として書くつもりだったが、1点ハマりポイントがあったのでそれだけメモ。

<!-- more -->

## Netlifyでビルドすると2回目以降ビルドに失敗する

```text
11:49:06 PM:   Error: spawn /opt/build/repo/node_modules/pngquant-bin/vendor/pngquant ENOENT
11:49:06 PM:
11:49:06 PM:   - child_process.js:240 Process.ChildProcess._handle.onexit
11:49:06 PM:     internal/child_process.js:240:19
11:49:06 PM:
11:49:06 PM:   - child_process.js:415 onErrorNT
11:49:06 PM:     internal/child_process.js:415:16
11:49:06 PM:
11:49:06 PM:   - next_tick.js:63 process._tickCallback
11:49:06 PM:     internal/process/next_tick.js:63:19
```

`pngquant-bin` がないとか吐かれる。上記の問題以外でもnode.jsのバージョンが古いなどの理由でビルドエラーが発生することがありがちだったりする。Netlifyは標準のNode.jsのバージョンが古く、また、yarnのバージョンも古いので、これらのバージョンを引き上げる設定をしておかないとビルドエラーになる。

このブログではNetlifyのプロジェクト設定のBuild & Deployから環境変数を以下のように設定した。

```text
NODE_ENV production
NODE_VERSION 8
YARN_VERSION 1.12.3
```

[公式ドキュメントより](https://www.netlify.com/docs/build-settings/#build-environment-variables)。上記のエラーはyarnのバージョンが古いことが起因していた（それ以前はnode.jsのバージョンが古く違うビルドエラーが出ていた）。上記の設定は様子を見つつ行ったので少しバージョンが古いが、node.jsのバージョンを10系統にして、yarnも1.13.0を使っても大丈夫なはず。
