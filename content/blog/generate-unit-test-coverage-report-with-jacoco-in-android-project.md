---
title: Androidプロジェクトでjacocoを利用してユニットテストのカバレッジレポートを作成する
categories:
  - Android
date: 2020-02-20 05:28:00
---

前回の更新が1年以上前😭 今回はAndroidプロジェクトにおいてjacocoを使ったユニットテストのカバレッジレポートの作成についてやや苦戦したのでメモ。

<!-- more -->

## 環境
- gradle 6.2
- kts(Gradle Kotlin DSL)
- kotlinベースのプロジェクト

`.kts` についてはまだまだドキュメントが少なくてサジェストが聞くとはいえ書くのに苦労します。私があまり理解してないだけだと思いますが、公式ドキュメントのコードをコピペしても上手く行かなかったりして茨の道です。

## やろうとしたこと
jacocoを使ってkotlinで書かれたコードのユニットテストのカバレッジを取りたかった。

## ハマったところ
kotlinファイルがコンパイルされたclassファイルは通常のjavaがコンパイルされたコードとは違うため、正しいファイルの位置を教えてあげないとテスト結果を上手く生成してくれない。

## 解決例
android用に調整されたjacocoプラグインを利用する方法もありますが、今回は素のjacocoの設定を調整する方向にしました。

### build.gradle.kts(app/内)

```kts
plugins {
    id("jacoco") // 直接jacocoと記述しても大丈夫なはず
}

jacoco {
    toolVersion = "0.8.5"
}

android {
    buildTypes {
        getByName("debug") {
            isTestCoverageEnabled = true
        }
    }
}

task("jacocoTestReport", JacocoReport::class) {
    dependsOn("testDebugUnitTest")
    reports {
        xml.isEnabled = true
        csv.isEnabled = false
        html.isEnabled = false
    }
    sourceDirectories.setFrom("${projectDir}/src/main/java")
    classDirectories.setFrom("${buildDir}/tmp/kotlin-classes/debug")
    executionData.setFrom(files("${buildDir}/jacoco/testDebugUnitTest.exec"))
}
```

`classDirectories.setFrom`の行がミソで、ここでkotlinファイルからコンパイルされたclassファイルのディレクトリを教えてあげています。

ビルドフレーバーを考慮したコードではないので対応する場合はよしなに調整が必要です。

## その他参考になる・なりそうなドキュメント
- [Gradle6系 + Jacoco + マルチモジュール + フルKotlin + Android + Robolectric環境でユニットテストのカバレッジを出す - Qiita](https://qiita.com/ryo_mm2d/items/e431326f701e74ec49fa)
- [Androidでコードカバレッジを計測する - Yenom開発者ブログ](https://developers.yenom.tech/entry/2018/04/15/152110)
