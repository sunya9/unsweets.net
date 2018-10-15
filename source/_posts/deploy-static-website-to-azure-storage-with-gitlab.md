---
title: GitLabからAzure Storageに静的サイトをデプロイする
date: 2018-10-15 14:42:44
Categories:
  - Memo
---

## やりたいこと/やること
- GitLabのCI/CD機能を使ってAzure Storageにデプロイする
- サービスプリンシパルを使って自動でデプロイする
- $webというストレージ名で静的サイトとして表示する
- Dockerのazure-cliイメージでazコマンドを使いデプロイ

## Azure上の設定
1. ストレージアカウントサービスを作っておく
2. サービスプリンシパルを作る
3. アクセスキーをメモっておく

ストレージアカウントを作ったら「静的な Web サイト (プレビュー)」から静的なウェブサイトの機能を有効にしておく。インデックスドキュメント名はプロジェクトによるが大抵`index.html`になるはず（この設定は明示的な指定が必要）。有効にする$webという名前のついたStorageコンテナが作成される。

サービスプリンシパルはコマンドで作るのが楽（参考: [Azureのサービスプリンシパルがあまりにわかりにくいのでまとめておく | OpenGroove](https://open-groove.net/azure/azure-service-principal/)。
azコマンドのインストール方法は省略（参考: [Azure CLI のインストール | Microsoft Docs](https://docs.microsoft.com/ja-jp/cli/azure/install-azure-cli?view=azure-cli-latest)）

- `az login`で自分のAzureアカウントでログイン
- `az ad sp create-for-rbac -n app_name --role contributor` でapp_nameという名称のサービスプリンシパルが作成される。このときパスワード情報などがJSONとして出力されるのでどこかにメモしておく。role属性も用途に合わせる。

最後に「アクセスキー」からストレージアカウント名とキーをどこかにメモっておく（キーは2つあるうちのどちらかで良い）。GitLabの設定で使う。

## GitLab上の設定
1. パスワード情報などを環境変数として設定する

リポジトリのSettings→CI/CDのVariablesに以下のように設定。

- `AZURE_PASSWORD`: JSONの`password`の値
- `AZURE_TENANT`: JSONの`tenant`の値
- `AZURE_STORAGE_ACCOUNT`: アクセスキーのストレージアカウント名
- `AZURE_STORAGE_KEY`: アクセスキーのキー

これらの値は`.gitlab-ci.yml`に設定するときや`az`コマンドの実行時に使用される。

## .gitlab-ci.ymlの設定
ビルドコマンドやデプロイコマンドを並べていくだけ。必要に応じてテストとかも。

```
stages:
  - build
  - deploy

build:
  stage: build
  image: node:10.12.0-slim
  cache:
    paths:
      - node_modules/
  artifacts:
    paths:
      - dist/*
  script:
    - yarn
    - yarn run build
  only:
    - master

upload to azure blob:
  stage: deploy
  image: microsoft/azure-cli:latest
  cache:
    paths:
      - node_modules/
  only:
    - master
  script:
    - az login --service-principal -u http://app_name --password $AZURE_PASSWORD --tenant $AZURE_TENANT
    - az storage blob upload-batch -d '$web' -s ./dist
```

GitLabの`artifacts`を使って成果物をストレージの方に`az`コマンドでアップロードする。サービスプリンシパルの指定は`http://` つきでアプリ名を指定する。

GitLabのVariablesでProtectedに設定するとProtected Branchでしか参照できなくなるので注意。

URLはAzure上の「静的な Web サイト (プレビュー)」のプライマリエンドポイント。

---

もう少し楽な方法はないものか。
