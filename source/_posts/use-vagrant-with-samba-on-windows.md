---
title: Windows上のVagrantでSambaを利用する
id: 71
categories:
  - Memo
date: 2015-04-10 13:04:52
tags:
---
Windows上でVagrantを利用し、Rails開発を行うと死ぬほど遅かったのでSambaに切り替えようとしたら<span style="line-height: 1.62;">色々引っかかったのでメモ。</span>

<!--more-->

#### 前提

*   Windowsのユーザーにパスワードを設定している

これをしないとSambaを正常起動でできない。

#### 手順

Vagrantfileに以下の記述を追加。

```
config.vm.synced_folder ., "/shared", type: "smb"
```

ピリオドはカレントフォルダのピリオド。/sharedはゲストOSでマウントされるパス。

次にPowerShellのバージョンが古い可能性があるので更新しておく。PowerShellのバージョンが古い場合には[Windows Management Framework 3.0](http://www.microsoft.com/en-us/download/details.aspx?id=34595)で更新する。自分の環境にあった適切なものをダウンロード、インストール。

最後に管理者権限でcmdを起動。vagrant upするとSambaのユーザー名とパスワードが求められるので、Windowsのユーザー名とパスワードを入力。無事起動できたらOK。