---
changelog: 
last_modified_at: 
tag:
- caching
- carthage
- ios
- builds
title: Carthageの依存をキャッシュ
redirect_from: []
description: ''
menu:
  caching:
    weight: 11

---

Carthageは、macOSやiOSのための依存関係管理ツールです。
依存先をビルドし、アプリで利用するためのバイナリフレームワーク作成します。
Bitriseでは、Carthageを動かすための専用STEPが用意されています。もちろん、Carthageのビルド結果をキャッシュすることが可能です。

## Carthageのキャッシュ設定

Carthageの依存をキャッシュする手順：

1. アプリの **Workflow Editor** を開きます。
1. ワークフローに、**Bitrise.io Cache:Pull** ステップと **Bitrise.io Cache:Push** ステップがあることを確認してください。
1. **Carthage** ステップの中にある **Carthage command to run** 項目に `bootstrap` コマンドを入力します。
1. **Bitrise.io Cache:Push** ステップの中にある **Cache paths** 項目を開きます。
1. **Cache paths** には、改行して新しい行を記載します。あなたの `Carthage ディレクトリ` へのパスと、`Cartfile.resolved` が変更された時にキャッシュを更新するための指定を行います。：

    `./Carthage -> ./Cartfile.resolved`

{% include message_box.html type="note" title="Carthageディレクトリパス" content="もしCarthageディレクトリがrepositoryのrootに配置されていない場合は、`Carthageディレクトリ` / `Cartfile.resolved` 共に、repositoryのrootからみた相対パスを設定してください。" %}
