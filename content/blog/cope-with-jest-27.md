---
title: Jest27対応
date: 2021-06-08T20:52:04+09:00
---

## 環境

- babel-jest `26.6.3` -> `27.0.4`
- jest `26.6.3` -> `27.0.4`
- ts-jest `26.5.6`

### TypeError: Jest: a transform must export something.

jest のバージョン揃える。renovate が ts-jest を対象としてなかったので ts-jest 27 を入れる。

### `window is undefined`

> `window is undefined, vue-test-utils needs to be run in a browser environment. You can run the tests in node using jsdom `

Jest27 からテスト実行環境が jsdom から node に変わったため`window`がなくなってしまった。少なくとも今のテストでは`window`が必要だったため`jest.config.js`に以下を追記。

```js
module.exports = {
  ...
  testEnvironment: 'jsdom',
  ...
}
```

他テストフレームワークが jasmine から jest-circus に変わった影響で test が存在しない describe 内で beforeEach を実行しても意味がないという旨のエラーが表示された。そもそもテストケースの記述として雑だったので適当に消して対応。

## 参考

- [Jest 27: New Defaults for Jest, 2021 edition ⏩ · Jest](https://jestjs.io/ja/blog/2021/05/25/jest-27)
