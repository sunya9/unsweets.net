---
title: SlidingMenuを使おう！（導入編）
id: 31
categories:
  - Memo
date: 2013-03-15 23:06:22
tags:
---

[![device-2013-02-25-234331.png](/images/device-2013-02-25-234331-thumb-400x666-67.png)](/images/device-2013-02-25-234331.png)Androidで最近流行りの（？）UIです。画面を左から右にスワイプするとメニューが出てくるものです。

<!--more-->

#### 1\. SlidingMenuのライブラリをダウンロードしよう！

jfeinstein10氏のライブラリを使わせてもらいます。
[jfeinstein10/SlidingMenu](https://github.com/jfeinstein10/SlidingMenu)

上のZIPボタンを押せば大丈夫だと思います。

#### 2\. ライブラリをインポートする

ダウンロードしたzipファイルを解凍します。解凍したらおそらくSlidingMenu-masterというフォルダができると思います。eclipseにライブラリをインポートするためにはその中にあるlibraryというフォルダをインポートするのですが、<span style="text-decoration: line-through;">私の環境では上手くインポートすることができませんでした。</span>できました。

##### 既存のプロジェクトインポート機能を使う

[![screenshot006.png](/images/screenshot006-thumb-200x321-69.png)](/images/screenshot006.png)
普通の方法です。<span style="text-decoration: line-through;">ですが私の方法ではできませんでした...。</span>
[![2013-3-15_23-31-57_144.png](/images/2013-3-15_23-31-57_144-thumb-200x209-71.png)](/images/2013-3-15_23-31-57_144.png)
Nextをクリック。

[![2013-3-15_23-33-13_146.png](/images/2013-3-15_23-33-13_146-thumb-200x207-73.png)](/images/2013-3-15_23-33-13_146.png)
Browseボタンを押し、ダウンロードしたLibraryフォルダを選択します。チェックが入ったら、Finishボタンを押します。

![eclipse-library-project.png](/images/eclipse-library-project.png)
すると、このようにlibraryプロジェクトができます。フォルダ名がそのままプロジェクト名になるようなので、嫌な人はフォルダ名をわかりやすい名前に変えたほうがいいかもしれません。

次に、このライブラリプロジェクトをインポートしたいプロジェクトのプロパティを開きます。
![screenshot007.png](/images/screenshot007.png)![2013-3-15_23-42-4_148.png](/images/2013-3-15_23-42-4_148-thumb-200x189-77.png)
Androidを選択して、下の方のLibraryまでスクロールをもっていき、Addをクリック。
そして先ほどのlibraryを選択。

[![2013-3-15_23-43-48_149.png](/images/2013-3-15_23-43-48_149-thumb-200x219-79.png)](/images/2013-3-15_23-43-48_149.png)
OKを押し、更にダイアログを閉じます。

これで無事ライブラリを追加できたのかと思いますが...。

...できました。

なんかすっきりしないまま導入編が終わってしまいました。次はSlidingMenuの具体的な使い方を書きたいと思います。