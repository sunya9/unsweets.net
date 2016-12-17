---
title: Sublime text 2でcl.exeを使ってCをコンパイルできるようにする
id: 46
categories:
  - Customize
date: 2014-05-01 12:06:46
tags:
---

最近Visual studio 2013をインストールしたのはいいのですが、シンプルな単一コードだとわざわざVisual Studioを起動するには面倒臭くSublime text 2だけでどうにかならないかなということで。

<!--more-->

#### 当方環境

*   Windows 7 64bit
*   Visual studio 2013
*   .NET Framework 4.5
*   Sublime Text 2 2.0.2

Sublime text 2は日本語化してしまってるのでメニュー文字列は適宜読み替えてください。

#### パスを通す

以下のパスを通す必要があります。変数はPATH。 Rapid Environment Editor とか使うとやりやすいかも。

*   C:\Program Files (x86)\Microsoft Visual Studio 12.0\VC\bin
*   C:\Program Files (x86)\Microsoft Visual Studio 12.0\Common7\IDE
*   C:\Program Files (x86)\Microsoft Visual Studio 12.0\Common7\Tools
*   C:\Windows\Microsoft.NET\Framework\v4.0.30319
*   C:\Program Files (x86)\Microsoft Visual Studio 12.0\VC\vcpackages
*   C:\Program Files (x86)\Microsoft SDKs\Windows\v7.1A\Bin

以下は変数をINCLUDEに。

*   C:\Program Files (x86)\Microsoft Visual Studio 12.0\VC\include
*   C:\Program Files (x86)\Microsoft SDKs\Windows\v7.1A\Include

以下を変数LIBに。

*   C:\Program Files (x86)\Microsoft Visual Studio 12.0\VC\lib
*   C:\Program Files (x86)\Microsoft SDKs\Windows\v7.1A\Lib

以下を変数LIBPATHに。

*   C:\Program Files (x86)\Microsoft Visual Studio 12.0\VC\lib
*   C:\Windows\Microsoft.NET\Framework\v4.0.30319

Visual Studioや.NET Frameworkのバージョンは各自調整してください。

#### Sublime text 2でsublime-buildを書く

以下のように記述。

    {
    "cmd": ["cl", "/EHsc", "${file}"],
    "file_regex": "^(...*?):([0-9]*):?([0-9]*)",
    "working_dir": "${file_path}",
    "selector": "source.c",
    "encoding": "utf-8",
    "shell": false,
    "variants": [{
    "name": "Run",
    "encoding": "utf-8",
    "cmd": ["${file_base_name}.exe"]
    }]
    }

これを記述したファイルをC.sublime-buildなどと名前をつけて C:\Users_X_y_z_\AppData\Roaming\Sublime Text 2\Packages\User あたりに保存します。 後は適当にCを記述してツール→ビルド(Ctrl + B)でビルドができ、Ctrl + Shift + Bで実行することが出来ます。ビルドして実行を一度にできればいいのですがイマイチSublime text 2の設定の仕方がわからず...。

後、ビルドするとobjファイルとexeファイルが同じディレクトリに出力されるのでそこら辺はclコマンドのオプションで出力先を設定すれば変えられると思います。