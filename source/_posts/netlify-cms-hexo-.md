---
title: Netlify CMSを使ってHexoに記事を投稿する
date: 2017-03-18T06:21:50.300Z
categories:
  - Service
author: _X_y_z_
layout: blog
---

[Netlify CMS](https://github.com/netlify/netlify-cms)というものがあります。
これは[Netlify](https://www.netlify.com/)でホスティングされた静的サイトに大してウェブ上で管理画面を提供するというものです。
静的サイトをウェブ上で管理…？というと一瞬不思議に思いますが、ソースコード側とNetlify側をうまく連携させることによって、静的なサイトを管理することができます。

<!-- more -->

## 準備（環境)

* ブログ: HexoやHugo, Jekyll, Middlemanなどの静的サイトジェネレータで作られたサイト
* Netlify: 上記のブログをNetlifyでホスティングする必要があります
* Githubのリポジトリ: 上記のブログを管理しているGithubリポジトリ

今回はHexoの環境でセットアップします。

## Githubアプリケーションを作成する

[Developer applications](https://github.com/settings/developers)にアクセスし、アプリケーションを作成します。
作成するアプリケーション名は何でも良いですが、Authorization callback URLには
`https://api.netlify.com/auth/done`を指定します。

アプリを作成したら、Client IDとClient Secretを控えます。

## NetlifyとGithubを連携する

NetlifyでHexoを運用する方法は省略。
([A Step-by-Step Guide: Hexo on Netlify | Netlify](https://www.netlify.com/blog/2015/10/26/a-step-by-step-guide-hexo-on-netlify/)
がわかりやすい)

Netlifyにホスティングの設定をした後、[サイト一覧](https://app.netlify.com/)から自分のサイトの管理画面を選択し、Accessタブを選択します。Authentication providersからInstall providerを押し、ダイアログが出てきたらドロップダウンからGithubを選択し、先ほど控えたClient IDとClient secretを入力します。

Netlify側の設定はこれで完了。

## Hexoの設定にファイルを追加する

特にいじっていなければHexoの記事のソースコードは`source/`に格納されています。ここに`admin`ディレクトリを作成し、その中に`index.html`と`config.yml`を作成します。

### index.html

```html
layout: false
---

&lt;!doctype html&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;meta charset=&quot;utf-8&quot; /&gt;
  &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt;
  &lt;title&gt;Content Manager&lt;/title&gt;
  
  &lt;link rel=&quot;stylesheet&quot; href=&quot;https://unpkg.com/netlify-cms@^0.3/dist/cms.css&quot; /&gt;

&lt;/head&gt;
&lt;body&gt;
  &lt;script src=&quot;https://unpkg.com/netlify-cms@^0.3/dist/cms.js&quot;&gt;&lt;/script&gt;
  &lt;script&gt;
    CMS.registerPreviewStyle('/css/main.css');
  &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;

```
Hexoの場合、`source/_posts`ディレクトリはデフォルトですべてレイアウトが付加されてしまうので、Front-matterをつけることによって回避しています(HTMLでも有効なのですね…知らなかった)。

`CMS.registerPreviewStyle`はつけなくてもいいのですが、つけておくとプレビュー時にWebと同じようなデザインで表示してくれます。

### config.yml

```yaml
backend:
  name: github
  repo: sunya9/unsweets.log
  branch: master

media_folder: source/images/

collections:
- name: &quot;blog&quot; # Used in routes, e.g. /admin/collections/blog
  label: &quot;Blog&quot; # Used in the UI
  folder: &quot;source/_posts&quot; # The path to the folder where the documents are stored
  create: true # Allow users to create new documents in this collection
  slug: &quot;{{slug}}&quot; # Filename template i.e. YYYY-MM-DD-title.md
  fields: # The fields for each document, usually in front matter
    - {label: &quot;Title&quot;, name: &quot;title&quot;, widget: &quot;string&quot;}
    - {label: &quot;Publish Date&quot;, name: &quot;date&quot;, widget: &quot;datetime&quot;, default: &quot;&quot;}
    - {label: &quot;Categories&quot;, name: &quot;categories&quot;, widget: &quot;list&quot;, default: &quot;&quot;}
    - {label: &quot;Author&quot;, name: &quot;author&quot;, widget: &quot;string&quot;, default: &quot;_X_y_z_&quot;}
    - {label: &quot;Content&quot;, name: &quot;body&quot;, widget: &quot;markdown&quot;}
    - {label: &quot;Layout&quot;, name: &quot;layout&quot;, widget: &quot;hidden&quot;, default: &quot;blog&quot;}
  meta:
    - {label: &quot;Tags&quot;, name: &quot;tags&quot;, widget: &quot;list&quot;, default: &quot;&quot; }
  
```
backendのrepoには自分がGithubで管理しているリポジトリの場所を指定します。

collectionsは記事のテンプレートを定義します。Hexoで言うScaffoldsディレクトリと同じような役割をしていますが、Netlify CMSはHexoに依存しているわけでもないのでそれを使うわけではない模様。

* `name`: 固有のID
* `label`: 管理画面で表示されるテンプレート名
* `folder`: 作成した記事が保存される場所。Hexoなら通常は`source/_posts`だと思います
* `create`: ユーザーがこのコレクションを使って記事を作成することの許可。通常はtrueのはず。
* `slug`: ファイル名。日付の変数が使えますが、色々問題があるのでここではとりあえず`{{slug}}`。
* `fields`: 記事投稿のフィールド定義。ここに定義すると記事作成画面ではフィールド名に紐付いたフォームが表示されます。
* `meta`: `fields`に似ていますが、表示されないデータ。このブログでは多くの記事にtagsが空であり、それによってエラーが発生しているのでとりあえず一時的に回避。

fieldsですが、最低限、記事名と公開日、内容があれば良いように思えます。ほとんど設定を自分の設定ファイルからコピーしてきているので、使う人は適宜変更しましょう。特に`default`。

### その他
Hexoではymlファイルは自動的にjsonに変換されてしまうので、Hexoの設定ファイルである_config.ymlを以下のように編集します。

```yaml
skip_render:
  admin/config.yml
```

先ほどのadmin/index.htmlも同様に回避できるかと思いましたが、なぜかうまく行かず。

## ローカルでテストする
セットアップは完了です。
`hexo start`などでローカルで試してみましょう。[http://localhost:4000/admin](http://localhost:4000/admin)にアクセスするとGithub認証ボタンが表示されると思います。
OAuth後、一瞬Netlifyに飛び、すぐにまたadminに戻ってくると思います。

![Netlify CMSの管理画面。unsweets.logの記事一覧がカード形式で表示されている。](/images/d88e0aac-46bd-49a3-af56-2802ca148f7f.png)

Blogを選択すると`source/_posts`に入った記事一覧を取得します。どうやら内部でGithubからAPIアクセスして取得している模様（なのでローカルの一覧ではない）。

編集画面はこんな感じ。

![Netlify CMSでの記事編集画面。2ペインで表示されており、左側にエディタ、右側にプレビューが表示されている。](/images/Content Manager.png)

先ほどのconfig.ymlに沿った形式でFieldsに沿って表示されています。

### その他
もしかして: 自分で[Quick start guide](https://github.com/netlify/netlify-cms/blob/master/docs/quick-start.md)が早い。config.ymlのwidgetsに使える値もだいたい載ってます。後は公式の[Docs](https://www.netlifycms.org/docs/)を見るのも良いと思います。

### 所感とか気になるところとか

* 導入に少し手こずる
* 記事一覧がファイル名ソートで見づらい
* 編集画面で下書きがない
* config.ymlの設定が間違っていたりすると内部でJavaScriptがエラーを吐いて落ちる。しかもどこが間違っているかわかりづらい
* Hexoのymlがjsonに変換されていることに気付きにくい
* ファイル名が基本的に記事名依存なので、自由につけられない
* 画像のパス関連が怪しい

最後の2つは自分の設定がおかしいだけかもしれませんが、ちょっとうまくいっていないかん時。

まだまだAlpha感のある使い心地。しかしローカルでわざわざエディタ立ち上げて、マークダウン書いて、プレビューして見て、コミットしてプッシュして…の手順を考えると、Web上で管理画面でぽちぽちやった方が気楽なのは大変助かります。
