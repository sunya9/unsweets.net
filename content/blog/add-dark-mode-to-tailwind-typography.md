---
title: tailwind/typographyをダークモードに対応する
date: 2020-11-24T08:44:51+09:00
---

[@tailwind/typography](https://github.com/tailwindlabs/tailwindcss-typography)は現時点(v0.3.1)ではダークモードに対応してなさそうなので、対応させてみる。media queryを使った手法。

## tailwind.config.jsに設定を追加

```js
const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "media",
  theme: {
    colors: {
      gray: {
        50: "var(--colors-50)",
        100: "var(--colors-100)",
        200: "var(--colors-200)",
        300: "var(--colors-300)",
        400: "var(--colors-400)",
        500: "var(--colors-500)",
        600: "var(--colors-600)",
        700: "var(--colors-700)",
        800: "var(--colors-800)",
        900: "var(--colors-900)",
      },
      originalGray: colors.coolGray,
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
```

現時点では[`colors.gray`のパラメーターを参照しているそう](https://github.com/tailwindlabs/tailwindcss-typography/blob/bc9592ec26d2e5e42efbf7b13061716cab1f41b0/src/styles.js)なので、CSS variablesに置き換える。 メディアクエリの手法なので `darkMode: "media"`も追加しておく。

ちなみに上記では標準のgrayを上書きしているが、元のgrayのカラーパレットも参照したかったので、`originalGray`として残している([grayとしてマッピングされているのはcoolGrayのようだ](https://tailwindcss.com/docs/customizing-colors#curating-colors))。

`theme.extends.colors`での定義は後述のCSS Variablesで使用したときに循環参照してしまうので避けた。他のデフォルトカラーパレットも参照したいときは`tailwindcss/defaultTheme`をrequireして、`...defaultTheme.colors`を`theme.colors`の一番最初に書くと良い。

## CSS Variablesを定義する

```css
@tailwind base;
@tailwind components;

:root {
  --colors-50: theme("colors.originalGray.50");
  --colors-100: theme("colors.originalGray.100");
  --colors-200: theme("colors.originalGray.200");
  --colors-300: theme("colors.originalGray.300");
  --colors-400: theme("colors.originalGray.400");
  --colors-500: theme("colors.originalGray.500");
  --colors-600: theme("colors.originalGray.600");
  --colors-700: theme("colors.originalGray.700");
  --colors-800: theme("colors.originalGray.800");
  --colors-900: theme("colors.originalGray.900");
}

@media (prefers-color-scheme: dark) {
  :root {
    --colors-50: theme("colors.originalGray.900");
    --colors-100: theme("colors.originalGray.800");
    --colors-200: theme("colors.originalGray.700");
    --colors-300: theme("colors.originalGray.600");
    --colors-400: theme("colors.originalGray.500");
    --colors-500: theme("colors.originalGray.400");
    --colors-600: theme("colors.originalGray.300");
    --colors-700: theme("colors.originalGray.200");
    --colors-800: theme("colors.originalGray.100");
    --colors-900: theme("colors.originalGray.50");
  }
}

@tailwind utilities;
```

ここではプラグインのデフォルトの表示に近いよう、上記でoriginalGrayと定義したものを利用してテーマカラーを参照するようにしている。ダークモードの色は面倒なのでここでは元の逆の定義にするようにした。

以上でいい感じにダークモードが当たるようになる。

なお、bodyの背景は通常状態で`bd-gray-50`を当てたが、ダークモード時の色が気に入らなかったので、`tailwind.config.js`の`theme.colors`に`tailwindcss/colors`にある`trueGray`を差し込んで、`dark:bg-trueGray-700`を追加することでダークモード時の色を再定義するようにした。
