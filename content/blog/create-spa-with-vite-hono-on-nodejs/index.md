---
title: Hono を使ってAPIサーバー付きの Vite SPA を Node.js 上で動かす
date: 2025-11-07
---

基本は [yusukebeさんのこちらの記事](https://zenn.dev/yusukebe/articles/06d9cc1714bfb7) に従えばいいのだけれど、Node.js上で動かすに当たっていくつか躓いた点があったり、改善したい点があったりしたのでメモ。

フロントエンドはReact + TypeScript。

## create vite app から作る

create hono からやってもいいのだけれど、viteメインのSPAの場合、create vite から作る方が個人的にはいつものViteアプリと同じ雰囲気で作りやすい。

`pnpm create vite` したら 適当にTypeScript、Reactを選択していく。

## 必要なモジュールのインストール

```bash
pnpm add hono vite-ssr-components @hono/node-server
pnpm add -D @hono/vite-dev-server @hono/vite-build
```

- [hono](https://github.com/honojs/hono): メインディッシュ。
- [`vite-ssr-components`](https://github.com/yusukebe/vite-ssr-components): Vite上でSSRするためのコンポーネント。SPAなのにSSR？と思うかもしれないが、これがあるとindex.html（実際にはtsx）でやっているscriptの読み込みやcssの読み込みについて、開発時とビルド時の分岐が必要無くなって普段のviteと同じような書き方ができるようになる。deps。
- [`@hono/node-server`](https://github.com/honojs/node-server): Node.js上でHonoを動かすためのサーバ。直接記述する場面はないが、`@hono/vite-build` の裏側で使われるため必要。deps。
- [`@hono/vite-dev-server`](https://github.com/honojs/vite-plugins/tree/main/packages/dev-server): 開発環境のvite上でHonoと統合するためのdev-server。devDeps。
- [`@hono/vite-build`](https://github.com/honojs/vite-plugins/tree/main/packages/build): Vite上のHonoをビルドするためのプラグイン。devDeps。

## エントリポイントの作成

素のViteだとindex.htmlがエントリポイント相当だが、Honoと統合する場合はTypeScriptでのエントリポイントファイルが必要。index.htmlは必要無くなるのでtsのエントリポイントファイルに適宜書き写しつつ、終わったら削除して良い。
`src/index.tsx` を作成し、以下のような内容を記述する。

```tsx
import { Hono } from "hono";
import { renderToString } from "react-dom/server";
import { Link, ReactRefresh, Script } from "vite-ssr-components/react";
import { api } from "./api";

const app = new Hono();

app.route("/api", api); // お好きに、 src/api/index.tsあたりに別途API用のルートを作成すると見通しが良いかも

app.get("*", async (c) => {
  return c.html(
    renderToString(
      <html lang="en">
        <head>
          <ReactRefresh />
          <link rel="icon" type="image/svg+xml" href="/vite.svg" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <Script src="/src/main.tsx" />
          <title>Hono + Vite SPA</title>
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>,
    ),
  );
});

export default app;
```

以下`vite-ssr-components/react`のポイント。

- viteのビルドに乗せるものは `Script` や `Link` コンポーネントを利用すること。逆にfaviconなどのpublicにおいてある静的アセットは通常のlinkタグなどを使わないとうまく動かなくなる。devでもprodでもファイル名をよしなにやってくれる。
- `ReactRefresh` は開発時にReactのFast Refreshを有効にするためのコンポーネント。Reactならとりあえず書いておけばOK。
- その他 `ViteClient` もexportされてるけども、こちらはvite-dev-serverと役割が被るので必要ない（vite-dev-server側で`injectClientScript: false` しているなら必要だがどちらかにする）。

## vite.config.tsの修正

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import devServer, { defaultOptions } from "@hono/vite-dev-server";
import ssrPlugin from "vite-ssr-components/plugin";
import build from "@hono/vite-build/node";

export default defineConfig(({ mode }) => {
  if (mode === "server") {
    return {
      plugins: [
        build({
          entry: "./src/index.tsx",
          staticRoot: "./dist",
        }),
      ],
    };
  } else {
    return {
      build: {
        emptyOutDir: true,
      },
      plugins: [
        devServer({
          entry: "./src/index.tsx",
          exclude: [/.*\.svg/, ...defaultOptions.exclude],
        }),
        ssrPlugin({
          hotReload: {
            ignore: ["./src/**/*.tsx"],
          },
        }),
        react(),
      ],
    };
  }
});
```

server用ビルドとclient用ビルドが分かれているので少しわかりにくい。元の記事だと `mode === "client"` で分岐しているけども、実際にはサーバービルドのほうが特殊なケースに思えたので、 `mode === "server"` で分岐するようにした。

tailwindcssなど普段のviteのプラグインを導入する場合は基本的にはelse以降の設定に追記する形で良い。

ポイントは以下。

- devServerを入れると開発サーバーがHono寄りになる関係か通常のviteのURL importがうまく動かなくなる。明示的にexcludeを指定する必要があると[ドキュメントにも書かれている](https://github.com/honojs/vite-plugins/tree/5f37a9829f168ffccbc85714066e3db5283b0da2/packages/dev-server#importing-asset-as-url-is-not-working)。ここではcreate viteした後デフォルトで含まれているreact.svgやvite.svgといったアセットを対象外とするためsvgを除外したが、他にも対象外にしたいものがあれば適宜追加する。
- ssrPluginはhotReloadのオプションで明示的にクライアントコンポーネントをignoreするようにしておく。こうしておかないとReactのFast Refreshがうまく動かず、ページ自体がリロードされてしまう（よくよく考えるとこの指定だとエントリポイントである`index.tsx`も対象外になってしまうが、APIルートは分けるだろうしそんなに問題にならないはず）。
- buildプラグインはstaticRootオプションでビルド後のアセットが出力されているディレクトリを指定する。buildで生成されたサーバー用ビルドはデフォルトだと`dist/index.js`になるが、このファイル内で指定される静的アセットのパスをstaticRootで調整している。これを指定しないとnodeコマンドで実行する際、distディレクトリに移動してから`node index`を実行しないといけなくなる（これが特に気にならないのであれば指定しなくても良い）。

## package.jsonの修正

ビルドコマンドをちょっと修正。

```json
{
  ...,
  "scripts": {
    "build": "vite build && vite build --mode server",
    "start": "node dist/index.js",
  }
  ...,
}
```

普段のクライアントビルド + サーバー用ビルドを実行という形に修正。
startコマンドはdistディレクトリに生成されたサーバー用のファイルを実行するように追記。先程述べたようにstaticRootの指定をしない場合は cd dist の必要あり。

## 完成

`pnpm build` したら `pnpm start` し、動けばOK。

## 終わり

完成形を見るとそこまで難しい箇所はないように見えるけども、一つ一つの設定についてハマりポイントが多いので苦労した。

今どきはCloudflareなどの実行環境が優秀なのであえてNode.jsで実行する機会は減りつつあるけども、ローカル環境でアプリを構築して手軽に実行したい場合などの需要はあるはず。
