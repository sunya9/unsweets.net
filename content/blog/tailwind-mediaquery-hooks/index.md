---
title: Tailwind CSSのbreakpointsに基づいたMediaQueryのReact hooksを作る
date: 2024-07-12
---

## 動機

- Tailwind CSS の breakpoints の設定値に基づいて見せ方を変えたい
- Tailwindのクラスを利用するときに指定する `sm:` や `md:` といったブレイクポイントと同期してほしい

## 解法

[css - How do I get Tailwind's active breakpoint in JavaScript? - Stack Overflow](https://stackoverflow.com/questions/59982018/how-do-i-get-tailwinds-active-breakpoint-in-javascript) を参考にした。

Tailwindのconfigを解決して、[matchMedia](https://developer.mozilla.org/ja/docs/Web/API/Window/matchMedia)のパラメータとして利用する。

```ts
import { useEffect, useState } from "react";
import resolveConfig from "tailwindcss/resolveConfig";

import config from "path/to/tailwind.config";

const breakpoints = resolveConfig(config).theme.screens;

type Key = keyof typeof breakpoints;

const createMediaQueryList = <K extends Key>(key: K) =>
  window.matchMedia(`(min-width: ${breakpoints[key]})`);

const useMediaQuery = <K extends Key>(key: K) => {
  const [matches, setMatches] = useState<boolean>(
    createMediaQueryList(key).matches,
  );

  useEffect(() => {
    const mediaQueryList = createMediaQueryList(key);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQueryList.addEventListener("change", handler);
    return () => {
      mediaQueryList.removeEventListener("change", handler);
    };
  }, [key]);
  return matches;
};

// 利用するとき
const isSmall = useMediaQuery("sm");
```

RSCが有効な環境では`window`を参照できないので`useState`の引数は適宜`useEffect`の中に移動するなどする。
