---
tag: []
title: オフラインWorkflow Editorのインストールとアップグレード (Installing and upgrading the offline Workflow
  Editor)
redirect_from: []
summary: ''
published: false

---
BitriseのWorkflow Editorは、[**bitrise.io**](http://bitrise.io)にログインする必要はなく、MacやPCでオフラインで実行できるように設計されています。このWorkflow Editorはオープンソースで、レポジトリは[ここ]()から確認することができます。Workflow Editor周りの[ディスカッションに参加](https://discuss.bitrise.io/t/workflow-editor-v2-open-source-offline-workflow-editor/39)することもできます。

## **MacまたはPCにオフラインWorkflow Editorのインストールを行う**

始める前に：

* ご自身のローカルコンピュータに[Go](https://golang.org/) がインストールされていることを確認してください。

Bitrise CLI core pluginsの一つとしてWorkflow Editorを含む以下のステップを実行してください。

* [ここ](/bitrise-cli/installation/)で明記された最新のBitrise CLIをインストールします。
* Bitrise Pluginsの一部としてオフラインWorkflow Editorをインストールし、`bitrise setup`を実行します。`bitrise setup` を実行することでBitrise Core ツール・OS Xツール・Bitrise PluginsやToolkitsがローカルマシンにインストールされているかどうかのチェックも行います。インストールされていない場合は、commandが自動的にインストールを行います。

## **オフラインWorkflow Editorの開始**

必要なツールがインストールされていれば、次はオフラインWorkflow Editorを開始します。

* ご自身の `bitrise.yml` があるディレクトリの中へ`cd`します。
* `bitrise :workflow-editor`コマンドを実行してオフラインセッションを開始します。

このような感じになります：

![](/img/offline-workflow-editor.png)

## **Workflow Editorのバージョンの更新**

`bitrise plugin update workflow-editor`コマンドを実行してWorkflow Editorを最新のバージョンにアップグレードする事ができます。