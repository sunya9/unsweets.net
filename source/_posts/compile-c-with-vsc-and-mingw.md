title: Visual Studio Code上でMinGWを使ってC++をコンパイルする
id: 73
categories:
  - Memo
date: 2015-05-02 15:24:21
tags:
---
Visual Studio Codeが最近出てきたのでC++をコンパイルできるようにして見たいと思います。少しバグがある気がします。

<!--more-->

#### 前提

*   MinGWをインストール済み・パスを通している
*   Visual Studio Code(以下VSC)をインストールしてある

では初めて行きましょう。

#### tasks.jsonを設定する

1.  メニューのEdit→Command Pallette...を選択
2.  "tasks: configure"などと入力し、"Tasks: Configure Task Runner"を選択
3.  カレントディレクトリに.settingsディレクトリが生成され、その中にtasks.jsonができるので以下の設定をコピー&ペースト。


```
{
  "version": "0.1.0",
  "owner": "cpp",
  "fileLocation": ["relative", "${workspaceRoot}"],
  "args": [
    "-O2",
    "-Wall",
    "-o",
    "${fileBasename}.exe",
    "${file}",
    "-std=c++11"
  ],
  "showOutput": "always",
  "command": "g++"
}
```

基本的にこれでいいのですが、${fileBasename}の仕様なのかバグなのかは知りませんが、fileBasenameは拡張子も付随されているようで、自分で.exeをつけないとソースコード自体を上書きしてしまうことになります。何かいい方法があるといいのですが...。