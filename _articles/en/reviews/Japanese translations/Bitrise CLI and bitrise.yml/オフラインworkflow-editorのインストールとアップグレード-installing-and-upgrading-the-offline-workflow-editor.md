---
tag: []
title: オフラインWorkflow Editorのインストールとアップグレード (Installing and upgrading the offline Workflow
  Editor)
redirect_from: []
summary: ''
published: false

---
Bitrise Workflow Editor is designed in such a way that you can run it offline on your Mac/PC without having to log into [bitrise.io](https://www.bitrise.io/). The Workflow Editor is open source, you can find its repository [here](https://github.com/bitrise-io/bitrise-workflow-editor). You can also join the join the discussion around Workflow Editor [here](https://discuss.bitrise.io/t/workflow-editor-v2-open-source-offline-workflow-editor/39).

BitriseのWorkflow Editorは、[**bitrise.io**](http://bitrise.io)**にログインする必要はなく、**MacやPCでオフラインで実行できるように設計されています。このWorkflow Editorはオープンソースで、レポジトリは[ここ]()から確認することができます。Workflow Editor周りの[ディスカッションに参加](https://discuss.bitrise.io/t/workflow-editor-v2-open-source-offline-workflow-editor/39)することもできます。

## **MacまたはPCにオフラインWorkflow Editorのインストールを行う**

始める前に：

* ご自身のローカルコンピュータに[Go](https://golang.org/) がインストールされていることを確認してください。

Make sure you perform the following steps to include Workflow Editor as one of the Bitrise CLI core plugins.

1. Install the latest Bitrise CLI as discussed [here](/bitrise-cli/installation/).
2. Run `bitrise setup` to install offline Workflow Editor as part of the Bitrise Plugins. Running `bitrise setup` also checks if Bitrise Core tools, OS X tools, Bitrise Plugins and Toolkits are installed on your local machine. If not, the command will automatically install them.

Bitrise CLI core pluginsの中の一つとして、Workflow Editorを含む以下のステップを実行してください。

* [ここ](/bitrise-cli/installation/)で明記した最新のBitrise CLIをインストールします。
* Bitrise Pluginsの一部としてオフラインWorkflow Editorをインストールし、`bitrise setup`を実行します。`bitrise setup` を実行することでBitrise Core ツール・OS Xツール・Bitrise PluginsやToolkitsがローカルマシンにインストールされているかどうかのチェックも行います。インストールされていない場合は、commandが自動的にインストールを行います。

## Starting offline Workflow Editor　**オフラインWorkflow Editorの開始**

If the required tools are installed, all you have to do is start your offline Workflow Editor.

1. `cd` into a directory where you have your `bitrise.yml`.
2. Run `bitrise :workflow-editor` command to start your offline session.

Here is the overall look and feel:

必要なツールがインストールされていれば、次はオフラインWorkflow Editorを開始しましょう。

* ご自身の `bitrise.yml` があるディレクトリの中へ`cd`します。
* `bitrise :workflow-editor`コマンドを実行してオフラインセッションを開始します。

このような感じになります：

![](/img/offline-workflow-editor.png)

## Upgrading Workflow Editor version **Workflow Editorのバージョンの更新**

You can upgrade to the latest version of the Workflow Editor by running `bitrise plugin update workflow-editor` command.

`bitrise plugin update workflow-editor`コマンドを実行してWorkflow Editorを最新のバージョンにアップグレードする事ができます。