---
changelog:
last_modified_at:
tag: []
title: オフラインWorkflow Editorのインストールとアップグレード (Installing and upgrading the offline Workflow
  Editor)
redirect_from: []
description: ''
published: false

---
BitriseのWorkflow Editorは、bitrise.ioにログインする必要がなくご自身のMac/PCでオフラインでの実行を可能にします。Workflow Editorはオープンソースで、レポジトリを[ここ](https://github.com/bitrise-io/bitrise-workflow-editor)から確認することができます。Workflow Editor周りのディスカッションには[ここ](https://discuss.bitrise.io/t/workflow-editor-v2-open-source-offline-workflow-editor/39)から参加することができます。

## 自分のMac/PCへオフラインWorkflow Editorのインストール

始める前に：

* ローカルのコンピュータに[GO言語](https://golang.org/)がインストールされていることを確認してください。

Bitrise CLIのコアプラグインの一つとしてWorkflow Editorを含ませるには、以下の手順に従ってください。

1. [ここ](/jp/bitrise-cli/installation/)で説明されているように、最新のBitrise CLIをインストールします。
2. Bitrise Pluginsの一部分としてオフラインWorkflow Editorをインストールし、`bitrise setup`を実行します。`bitrise setup`を実行することにより、Bitrise Coreツール、OS X ツール、Bitrise PluginsやToolkitsがローカルマシンにインストールされているかどうかがチェックされます。されていなければ、コマンドが自動的にインストールを行います。

## オフラインWorkflow Editorの開始

全ての必要なツールのインストールが完了すれば、オフラインWorkflow Editorを開始することができます。

1. `cd` into a directory where you have your `bitrise.yml`.  
   `bitrise.yml`を持つディレクトリ内へ`cd`します
2. `bitrise :workflow-editor`コマンドを実行して、オフラインセッションを開始します。

全体的にこのように表示されます：

![{{ page.title }}](/img/offline-workflow-editor.png)

## Workflow Editorバージョンのアップグレード

`bitrise plugin update workflow-editor`コマンドを実行すれば、最新版のWorkflow Editorへアップロードすることができます。