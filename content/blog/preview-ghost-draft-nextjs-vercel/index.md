---
title: Ghostの下書きをNext.js+Vercel環境でプレビューする
date: 2022-03-08
---

基本的には [Advanced Features: Preview Mode | Next.js](https://nextjs.org/docs/advanced-features/preview-mode) を見ながら実装すれば良い。

GhostのプレビューはプレビューURLが固定だったり、APIがUUIDからコンテンツを探せなかったりと、かなり使いづらい。

GhostがプレビューURLがいじれないので、一旦別のパスでプレビューの実装に必要なAPIエンドポイントを作成し、`next.config.js` でGhostのプレビューURLとなるパスを設定する、という方針。

## API Handlerを実装

`src/pages/api/preview/[uuid].ts` あたりに以下を作成。

```ts
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const uuid = req.query.uuid;
  if (typeof uuid !== "string") return void res.status(400).end();
  res.setPreviewData({ uuid }).redirect(`/preview`).end();
};

export default handler;
```

GhostはプレビューURLとして `/p/<uuid>/` を開こうとするので、それに見合うようなAPIを作成した。

`setPreviewData` を呼び出すとクッキーにプレビュー情報が書き込まれる。クッキーに書き込まれたプレビュー情報を消すには [`clearPreviewData`](https://nextjs.org/docs/advanced-features/preview-mode#clear-the-preview-mode-cookies)を呼び出すようなAPIを作成して実行すれば良い（割愛）。

## プレビューページを実装

`src/pages/preview.tsx` に以下を実装。

```tsx
import { PostOrPage } from "@tryghost/content-api";
import { GetServerSideProps } from "next";

interface Props {
  draft: PostOrPage;
}

const Preview = ({ draft }: Props) => {
  return (
    <>{draft.title}</>
  );
};

export default Preview;

interface PreviewData {
  uuid: string;
}

export const getServerSideProps: GetServerSideProps<
  Props,
  {},
  PreviewData
> = async (context) => {
  const uuid = context.previewData?.uuid;
  if (!uuid || !context.preview) return { notFound: true };
  const draft = await fetchDraft(uuid)
  if (!draft) return { notFound: true };
  return {
    props: {
      draft,
    },
  };
```

`previewData` 周りの扱いはよしなにやってくれるので型さえ合わせておけばOK。適当に `preview` フィールドを見て駄目そうなパターンは404にでもしておく。

今回は最初から`getServerSideProps`を使う方式にした。ウェブサイト上のパスの関係やGhostのプレビューURLがPageかPostか分からない関係でこのようにしたが、その辺の区別をつける必要がなければISRでの実装でも特に問題なくできそう。

`fetchDraft` は後述。AdminAPIを使う場合はContentAPIを使った場合よりも情報が多く取れるので実際には`PostOrPage`は嘘だけれど、問題がないためここでは適当にごまかす。

### fetchDraftの実装

UUIDから下書きデータを引っ張ってくる実装は、思ったより面倒臭い。

- 現時点では `@tryghost/admin-api` の型宣言が無い
- UUIDからpostsやpagesを探すことが出来ない
  - そもそもUUIDだけじゃpostsかpagesの区別かすらつけられない

なので、pagesとpostsを全ページ引っ張ってきて、findするというかなり無理矢理な実装になっている。

更に、ややトラップだが標準だとhtmlフィールドがついてこないので明示的に指定する必要がある（[ドキュメントにはちゃんと書かれている](https://ghost.org/docs/admin-api/#the-post-object)）

```ts
import GhostAdminAPI from "@tryghost/admin-api";

const fetchDraft = async (uuid: string) => {
  new GhostAdminAPI({
    url: "<ghostのURL>",
    key: "<ADMIN_KEY>",
    version: "v3",
  });
  const postsPromise = adminApi.posts.browse({
    limit: "all",
    filter: ["status:draft"],
    formats: ["html"],
  });
  const pagesPromise = adminApi.pages.browse({
    limit: "all",
    filter: ["status:draft"],
    formats: ["html"],
  });
  const [posts, pages] = await Promise.all([postsPromise, pagesPromise]);
  return [...posts, ...pages].find((postOrPage) => postOrPage.uuid === uuid);
};
```

下書きデータが多いとallリクエストはサーバーに負荷がかかりそうだが仕方がない。

#### おまけ: Ghost Admin APIの d.ts

```ts
declare module "@tryghost/admin-api" {
  import { GhostAPI, PostOrPage } from "@tryghost/content-api";
  class GhostAdminAPI {
    constructor(options: { url: string; key: string; version: "v3" }) {}

    readonly posts: GhostAPI["posts"];
    readonly pages: GhostAPI["pages"];
  }

  export default GhostAdminAPI;
}
```

Admin APIにはPostの作成や削除と言った機能があるので上記の宣言はかなり嘘だけれど、データを引っ張ってくる分には内容はほぼ同じなのでサボった。用意してほしい…。

## リライトの定義

最後にGhostがアクセスしてくる `/p/:uuid` に対して `/api/preview/:uuid` に飛ぶように `next.config.js` に `rewrites` を定義しておく。

```js
/** @type {import('next').NextConfig} */
module.exports = {
  rewrites: [{ source: "/p/:uuid/", destination: "/api/preview/:uuid" }],
};
```

こうすることで、

1. Ghostが `/p/:uuid` にアクセス
1. 実質 `/api/preview/:uuid` にアクセスしたことになり、 `setPreviewData`でUUIDデータのセットがされ、 `/preview` にリダイレクト
1. `preview.tsx` がpreviewDataにセットされたUUIDを元にposts or pagesの下書きデータを検索して見つけたら表示

という流れになる。

---

Admin APIが使いづらすぎるのでもうちょっと親切になってくれると嬉しい。
