---
title: nuxt-payload-extractorでクライアントナビゲーション時の無駄なfetchを避ける
categories:
  - Memo
date: 2020-04-06 23:14:55
---

[小並感](https://private.unsweets.net/)こと私生活を書いてるブログをGhostで運用していましたが、運用していたサーバーがあまり性能がいいものではないのでフロント部分をNetlifyに移し、Headless CMSとして運用するようにしました。

<!-- more -->

## 構成
- Netlify（フロント）
- Ghost（バック）
- GitHub(リポジトリ)

リポジトリにフロント部分のコードの更新かGhostからのブログ再構築WebhookをNetlifyが検知することでビルド・デプロイを行っています。

フロント側はNuxtの`nuxt generate`コマンドを利用してHTMLコンテンツを吐き出すようにしました。

## コンテンツを完全に静的生成にする
記事ページ中などでghostAPIにアクセスしてコンテンツを取得するとき当初このようにしました。
```ts
{
  asyncData(app: { $axios }) {
    return $axios.$get('/article')
  }
}
```
上記は実際のところクライアントナビゲーション時に再度fetchしに行っています。node.jsでのコンテンツ生成時(`nuxt generate`)はSSR同様axiosでコンテンツを取得しているので問題ないのですが、クライアントサイドナビゲーションでは静的生成されたHTMLを見てくれません。このままですとせっかく静的生成したにも関わらずAPIを叩いていてあまり意味がありません。また、静的生成されたHTMLの下部には同様のコンテンツを`window.__NUXT__`で持っていたりと、重複箇所が見受けられます。

これは[nuxt-payload-extractor](https://github.com/DreaMinder/nuxt-payload-extractor)を使用することで解決します。`window.__NUXT__`部分をjsonとして切り出した上、`$payloadURL`関数を提供し、routeを与えることで切り出したjsonのURLを教えてくれます。
```ts
{
  async asyncData({ app: { $axios }, $payloadURL, route }) {
    if (process.static && process.client && $payloadURL) {
      return await $axios.$get($payloadURL(route))
    } else {
      const article = await $axios.$get('/article')
      return {
        article
      }
    }
  }
}
```
ページ数が少ない場合はこれで良いのですが、`process.static && process.client && $payloadURL`部分が冗長なのでpluginを作って共通化するとコードを短く出来ます。

```ts
import { Plugin } from '@nuxt/types'
import { Route } from 'vue-router'

const plugin: Plugin = (context) => {
  const cache: {
    [key: string]: object
  } = {}
  const getPayload = async (callback: () => Promise<object> | object) => {
    if (!process.static || !process.client || !context.$payloadURL)
      return callback()
    const url = context.$payloadURL(context.route)
    if (cache[url]) return cache[url]
    const res: object = await fetch(url).then((res) => res.json())
    cache[url] = res
    return res
  }
  context.getPayload = getPayload
}

declare module '@nuxt/types' {
  interface Context {
    $payloadURL(route: Route): string
    getPayload(callback: () => Promise<object> | object): Promise<object>
  }
}

export default plugin
```
ついでにメモリキャッシュを実装してみました。2回目以降は通信することなくページコンテンツの取得が可能です（axiosがやってくれていそうですが）。

利用時はgetPayloadでラップし、通常通りコンテンツに流し込むデータをreturnするようにします。
```ts
{
  asyncData({ getPayload, app: { $axios } }) {
    return getPayload(async () => {
      return {
        article: await $axios.get('/article')
      }
    })
  }
}
```
こうすることで普段とあまり変わりなくasyncDataでのfetchに勤しむことができますね！
