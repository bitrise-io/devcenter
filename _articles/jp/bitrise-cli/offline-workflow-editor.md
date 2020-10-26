---
changelog: 
last_modified_at: 
title: オフラインワークフローエディターのインストールとアップグレード
date: 2018-11-29T13:46:40.000+00:00
redirect_from: []
menu:
  bitrise-cli-main:
    weight: 10

---

Bitriseワークフローエディターは、[bitrise.io](https://www.bitrise.io/)にログインしなくてもMac / PCでオフラインで実行できるように設計されています。ワークフローエディタはオープンソースです。リポジトリは[ここ](https://github.com/bitrise-io/bitrise-workflow-editor)にあります。[こちら](https://discuss.bitrise.io/t/workflow-editor-v2-open-source-offline-workflow-editor/39)からワークフローエディターに関するディスカッションに参加することもできます。

## Mac / PCへのオフラインワークフローエディタのインストール

始める前に:

* ローカルコンピュータに[Go](https://golang.org/)がインストールされていることを確認してください。

Bitrise CLIコアプラグインの1つとしてワークフローエディターを導入するには、必ず次の手順を実行してください。

1. [ここ](/bitrise-cli/installation/)で説明されているように、最新のBitriseCLIをインストールします。
2. `bitrise setup`を実行して、Bitriseプラグインの一部としてオフラインワークフローエディターをインストールします。`bitrise setup`を実行すると、Bitrise Coreツール、OS Xツール、Bitriseプラグイン、およびツールキットがローカルマシンにインストールされているかどうかも確認されます。それらがインストールされていない場合は、自動的にそれらをインストールします。

## オフラインワークフローエディターの開始

必要なツールがインストールされたら、オフラインのワークフローエディターを起動するだけです。

1. `cd`で`bitrise.yml`があるディレクトリに移動します。
2. `bitrise :workflow-editor`コマンドを実行して、オフラインセッションを開始します。

これが全体的な外観と操作感です:

![{{ page.title }}](/img/offline-workflow-editor.png)

## ワークフローエディターバージョンのアップグレード

`bitrise plugin update workflow-editor`コマンドを実行して、ワークフローエディターの最新バージョンにアップグレードできます。