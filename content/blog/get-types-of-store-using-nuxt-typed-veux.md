---
title: nuxt-typed-vuexを使ってNuxtのStoreに型をもたらす
categories:
  - Memo
date: 2020-03-19 05:46:06
---

NuxtのVuexに型を提供する方法です。いくつか方法は有り、クラスベースであるvuex-module-decoratorsやvuex-class-componentも良いのですが、デコレータやクラスの使用など、素のVuexとは一部かけ離れた記述方法でやや難易度が高く感じたため、今回は[nuxt-typed-vuex](https://nuxt-typed-vuex.danielcroe.com/)を使ってみます。

[Nuxtを謳っていますが通常のVueにも導入は可能のようです。](https://nuxt-typed-vuex.danielcroe.com/using-without-nuxt.html#setup)

検証も兼ねて[サンプルリポジトリ作ってみました](https://github.com/sunya9/nuxt-typed-vuex-example)。

<!-- more -->

## 導入方法

[公式ガイドが丁寧](https://nuxt-typed-vuex.danielcroe.com/setup.html)なのでその通りにやっていきます。

1. `yarn add nuxt-typed-vuex`
2. nuxt.configの`buildModules`フィールドに`'nuxt-typed-vuex'`を追加
3. nuxt.configの`build.transpile`フィールドに`/typed-vuex/`を追加

これで準備は完了です。

## 書き方

通常のstoreと記述方法はあまり変わりませんが、stateやmutationsだけをexportするのではなく、getAccessorType関数でラップしたものもexportします。

```ts
import {
  getAccessorType,
  getterTree,
  mutationTree,
  actionTree,
} from "typed-vuex";

export const state = () => ({
  message: "hello",
});

export const getters = getterTree(state, {
  reversedMessage(state) {
    return state.message.split("").reverse().join("");
  },
});

export const mutations = mutationTree(state, {
  updateMessage(state, newMessage: string) {
    state.message = newMessage;
  },
});

export const actions = actionTree(
  { state, getters, mutations },
  {
    // 戻り値の型を明示的にしないとthis.app.$accessor経由でmutationsやactionsを
    // 呼び出そうとしたときに型推論が効かなくなってしまう
    updateMessageAction(context, newMessage: string): void {
      this.app.$accessor.anotherUpdateMessageAction(newMessage);
    },

    anotherUpdateMessageAction(context, newMessage: string): void {
      context.commit("updateMessage", newMessage);
      // または this.app.$accessor.updateMessage(newMessage)
    },
  }
);

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
});
```

例として意味のあるように意味のないことをしていますが…。

`index.d.ts`で適当にaccessorの型を定義しておきます。

```ts
import { accessorType } from "~/store";

declare module "vue/types/vue" {
  interface Vue {
    $accessor: typeof accessorType;
  }
}

declare module "@nuxt/types" {
  interface NuxtAppOptions {
    $accessor: typeof accessorType;
  }
}
```

これでasyncData上では `context.app.$accessor.message`, storeやvueインスタンス上では `this.$accessor.message` のように呼び出すことが出来ます。サブモジュールを使うと `this.$accessor.submodule....`のようにサブモジュール名が名前空間となります。

**actionsの戻り値の型は必ず定義するようにしましょう。** さもないと`$accessor`の型推論がすぐに壊れてしまいます。これはaccssorが循環的な性質を持っていること、conditional typesによる型推論の限界によるものだと思いますが([Vueのcomputedと同じなはず](https://jp.vuejs.org/v2/guide/typescript.html#戻り値の型にアノテーションをつける))、少なくとも現時点ではどうしようもないのでつける必要があります。明示的な`return`を付加にすることで同様の効果が得られるようですが、何も返さないのにただreturnを記述するのはただ冗長なだけなので素直にアノテーションつけるようにします。

記事ではactions内であえてstore contextを経由してcommitしてたりもしてますが、`this.$accessor`を経由した方法に統一したほうが型推論が常に効いていることがわかるので良いです。特にactions内では他actions呼び出し時に`context.dispatch`を呼び出す方法では型推論が効かないので常に`this.$accessor`経由で呼び出す必要があります。
