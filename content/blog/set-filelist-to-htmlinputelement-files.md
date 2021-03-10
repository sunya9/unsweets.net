---
title: HTMLInputElement.filesにFileListをセットする
date: 2021-03-11T02:40:38+09:00
---

## 状況
`input[type="file"]`上でファイルが選択されたとき`change`イベントが発生するので、そのときの挙動をテストしたい。
jsdom環境においてファイルダイアログを出したり`files`に対して直接代入することは不可能なので、どうにか`files`を設定した上で、`change`イベントを発生させ、挙動を確認したい。

## 環境

- @vue/test-utils: 1.1.3
- vue: 2.6.12
- vue-jest: 3.0.7
- vue-template-compiler: 2.6.12


## 解決例

```js
import { shallowMount } from "@vue/test-utils";
import Vue from "vue";

const App = Vue.extend({
  template: `
<div>
  <p>filename: {{ filename }}</p>
  <input @change="change" type="file" />
</div>`,
  data() {
    return {
      filename: ""
    };
  },
  methods: {
    change(e) {
      if (!e.target.files.length) return;
      this.filename = e.target.files[0].name;
    }
  }
});

test("files property test", async () => {
  const wrapper = shallowMount(App);
  const input = wrapper.find("input");
  expect(wrapper.text()).not.toContain("test.png");
  const file = new File([""], "test.png");
  const files = [file];
  const fileList = {
    item: (index) => files[index],
    length: files.length,
    ...files
  };
  Object.defineProperty(input.element, "files", {
    value: fileList
  });
  await input.trigger("change");
  expect(wrapper.text()).toContain("test.png");
});
```

[Object.defineProperty](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)で第一要素に設定したいinputのDOM,第二引数に設定したいフィールドである`"files"`を指定し、第三引数に実際に設定したい値であるFileListっぽいものを設定することで実現できた。

例はVueだけれども、DOMにアクセスできるものであれば任意の環境で再現可能なはず。filesフィールドに入る[FileList](https://developer.mozilla.org/ja/docs/Web/API/FileList)は直接インスタンス化できないので[File](https://developer.mozilla.org/ja/docs/Web/API/File)インターフェースを持ったデータの配列をオブジェクト内で展開しつつ、適当にitemとlengthを実装しておくとうまくいくはず(勿論実装上使ってなければ実装をサボってもいい)。TypeScript環境ならFileListを型アノテーションとして付与しておくとよりわかりやすい。その場合はitemとlengthの実装が必要になるが、手間としては誤差。

ちなみに`input.files = files`のようにFileListを直接代入すると `  TypeError: Failed to set the 'files' property on 'HTMLInputElement': The provided value is not of type 'FileList'.`と怒られる。じゃあ`new FileList()`すればいいでしょと思ったがそうは問屋が卸さなかった。南無。

---

動くやつを[CodeSandboxを使って書いてみた](https://codesandbox.io/s/files-property-test-jest-h7sj0?file=/App.test.js)。 初めてなのでeslintのエラーがうまく消せなかったり、devDependenciesにテスト関連のファイルを移動させると怒られたりでうまく使いこなせない。
