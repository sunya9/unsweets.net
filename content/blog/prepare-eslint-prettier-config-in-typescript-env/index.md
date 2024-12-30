---
title: TypeScript環境でESLintとPrettierの最小限の設定を用意する
date: 2021-06-27T04:33:47+09:00
---

## 方針

- できるだけ公式のガイダンスや方針に従って用意する。
- ESLintは公式推奨のルールを使用する
- Prettierも同じく公式推奨のルールを利用する

## 手順

### 1. TypeScriptとESLintとPrettierのインストール

ついでにESLintとPrettierの競合ルールをオフにするプリセットもインストール。ESLintとPrettierの競合を解消する方法はいくつかあるが、[公式ではルールをオフにするプリセットの導入を推奨している（というより他の方法を推奨していない）](https://prettier.io/docs/en/integrating-with-linters.html)。

`yarn add -D typescript eslint prettier eslint-config-prettier`

### 2. ESLintの設定ファイルを作る

どこかにある設定ファイルをコピペするようなことはしたくないので、`--init`オプションを使って生成する。 `yarn eslint --init`を実行するといくつか設問があるので応えていく。

```text
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · Yes
✔ Where does your code run? · browser, node
✔ What format do you want your config file to be in? · JSON
The config that you've selected requires the following dependencies:
@typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
✔ Would you like to install them now with npm? · No / Yes
Successfully created .eslintrc.js file in <your_path>
```

- `How would you like to use ESLint?`はsyntaxだけでなくproblemsも検出してほしいので`To check syntax and find problems`を選択
- TypeScriptを利用するので`Does your project use TypeScript?`はYesを答える
- `Would you like to install them now with npm?`はどちらでも良いがyarnメインの場合はYesを選択すると`package-lock.json`が生成されてしまうのでyarnの人はNoを選択して別途`yarn add -D @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest`を実行するのが良い。
- その他はプロジェクトに合わせて。

実行し終わると`.eslintrc.json`が作られるはず。

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "rules": {}
}
```

### 3. eslint-config-prettierの設定を追加する

生成された.eslintrc.jsonのextendsにPrettierとの競合ルールをオフにする設定を書き足す。[配列の最後に書き足さなければならない](https://github.com/prettier/eslint-config-prettier/tree/aeb4d52de54960ff48a8c627e6c25db9873d7719#installation)。

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ]
}
```

以上でいい感じの設定ファイルが生成される。Prettierに至っては設定ファイルがなければ全てデフォルトルールでよしなに動いてくれるので設定ファイルすら作る必要はない。
全てデフォルトを利用しているという明示をするために空のPrettierを用意した方がいいとかはあるかもしれないが。
Prettier側の挙動としても現時点で設定ファイルがなくて警告が出るとかはないのでなくて良いと思う。出たら作る方向で。
