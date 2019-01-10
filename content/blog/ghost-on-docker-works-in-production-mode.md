---
title: Docker上でGhostをProductionモードで動かす
s: ghost-on-docker-works-in-production-mode
date: 2017-07-02 17:09:36
tags:
    - Ghost
    - Docker
categories:
  - Memo
---

ちょっと前にDocker上でGhostを動かすときに苦労したのでそのメモ。

<!-- more -->

## 想定
* Docker上でGhostを動かす
* Data Volumeを設定してホストでGhostのコンテンツファイルを管理する

## とりあえず実行する

適当に一旦実行します。マウントするディレクトリ(/path/to/ghost)は環境に合わせてください。

```bash
$ docker run --name ghost -p 2368:2368 -v /path/to/ghost:/var/lib/ghost -e NODE_ENV=production ghost
```

`EACCES: permission denied`などと言われすぐに終了してしまうと思います。
これは最初の起動チェックで書き込み権限がないと言われるからのようです。後述するpathsプロパティが、productionモードは定義されていないから発生する問題の模様。

生成された`/path/to/ghost/config.js`を編集します。

```javascript
    ...
    production: {
        url: 'http://my-ghost-blog.com',
        mail: {},
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(process.env.GHOST_CONTENT, '/data/ghost.db')
            },
            debug: false
        },

        server: {
            host: '0.0.0.0',
            port: '2368'
        },
        paths: {
            contentPath: path.join(process.env.GHOST_CONTENT, '/')
        }
    },
    ...
```

抜粋。`paths`プロパティが追加されています。ついでに`url`も自分のサイトに合わせて編集しておきましょう。ちなみにData Volumeはおそらくｒoot権限になっていると思うので管理者権限が必要になります。

もう一回実行します。

```bash
$ docker start ghost
```

`docker logs ghost`するとわかるのですが、初回起動のみMigrationが実行されるので、Webで見られるようになるには若干ラグがあります。

正しい方法かはいまいちわかりませんが、これでとりあえず動くようになりました。それにしてもなぜProductionモードにはpathsがないのでしょう…。
