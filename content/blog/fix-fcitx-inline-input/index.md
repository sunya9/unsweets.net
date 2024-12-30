---
title: fcitxでインライン入力が出来ないのを治す
categories:
  - ubuntu
date: 2020-11-22 06:28:12
---

不意に壊れたりするのでメモ。

- Fcitx XIM Frontend の設定を確認 ![fcitx XIM Frontend設定画面](./fix-fcitx-inline-input-1.png)
- `$HOME/.config/fcitx/profile`の中身を確認。`PreeditStringInClientWindow=True`にする。勝手にコメントアウトされることが多い（なぜ？）。
