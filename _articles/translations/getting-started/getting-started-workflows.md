Bitriseワークフローは複数のステップの集まりです。アプリのビルド時に、ステップがワークフローで定義されたステップが実行されます。ワークフローは次の2つの方法で、作成と変更ができます。

* [bitrise.io](https://www.bitrise.io)のグラフィカルワークフローエディタを使う
* プロジェクトの`bitrise.yml`を直接編集する

どちらの方法でも結果的に`bitrise.yml`を変更することになります - `Workflow Editor（ワークフローエディタ）`を使う方法の方がよりシンプルで易しいです！

デフォルトでは、1つのビルドに1つのワークフローが対応しています。しかし、[ワークフロー同士の連結](/getting-started/getting-started-workflows#chain-workflows-together)を設定して、連続して実行することも可能ですし、[複数のワークフローのトリガーを設定して同時に実行する](/builds/triggering-builds/trigger-multiple-workflows)ことも出来ます。

## デフォルトワークフロー

[bitrise.io](https://www.bitrise.io)にアプリを追加すると、2つのワークフローが作成されます。`primary（プライマリ）`ワークフローと`deploy（デプロイ）`ワークフローです。webhookが設定されている場合、デフォルトでは、プロジェクトのコードの変更があるたびに`primary（プライマリ）`ワークフローのトリガーが実行されます。

特定のイベントが発生するたびに、他の任意のワークフロー（`deploy（デプロイ）`ワークフローを含む）が実行されるように、トリガーを設定することができます。詳しくは、[ビルドトリガーについてより詳しく知る](/builds/triggering-builds/triggering-builds)をお読みください。

### `primary（プライマリー）`ワークフロー

`primary（プライマリー）`ワークフローは、新しいアプリの追加時に自動的に作成されます。アプリを追加する処理が完了すると、Bitriseは自動的に初回のビルドを実行します: このビルドは、`primary`ワークフローによって実行されます。

![primaryワークフロー](/img/getting-started/primary-workflow.png)

`primary`ワークフローは、作成したアプリごとに同じではありません: プロジェクトの種類によって、含まれるステップが異なります。例えば、Androidプロジェクトの`primary`ワークフローは、`Install missing Android SDK components（不足しているAndroid SDKのインストール）`、`Android Lint`、`Android Unit Test`のステップを含むでしょう。ただし、`primary`は"基本の"ワークフローであり、共通して以下のアクションを行います:

* `ssh-add`コマンドで、SSHキーがアプリに追加されている場合にアクティベートを行います。このステップでは、SSHキーの保存、ユーザーのssh-agentへのロードを実行します。
* `Git Clone Repository`ステップで、プロジェクトのGitレポジトリをクローンを実行します。
* `Bitrise.io Cache:Pull` and `Bitrise.io Cache:Push`ステップについては、[Btriseでのキャッシュ](/caching/about-caching) を参照してください。
* Deploys build artifacts with the `Deploy to Bitrise.io` Step.
* `Deploy to Bitrise.io`ステップで、ビルド成果物のデプロイを行います。

### `deploy（デプロイ）`ワークフロー

`deploy（デプロイ）`ワークフローは、新しいアプリの追加時に自動的に作成されます。いくつかの点で[primaryワークフロー](/getting-started/getting-started-workflows#the-primary-workflow)と似ています。

* '基本的な'ステップを含む
* 実際に含まれるステップはプロジェクトの種類によって異なる

`deploy（デプロイ）`ワークフローは、"build"ステップを含み、ビルドが成功した場合に、オンライン上でインストールもしくはデプロイが可能な成果物を作成します。例えば、Androidプロジェクトの`deploy`ワークフローは、Gradleでのビルドを実行する`Android Build`ステップや、Google Playへのデプロイや検証端末へのインストールが可能な署名済み.apkファイルを作成する`Sign APK`ステップを含みます。

## Creating your own workflow

It's very simple to create your own workflow with the Workflow Editor. You can create new workflows based on any of the existing ones, or you can simply create an empty workflow and add the steps yourself.

If, for example, you create a workflow based on your `primary` one, it means that it will be created with the exact same Steps as the `primary` workflow.

1. Click the app's `Workflow` tab. Note that you cannot leave the Workflow editor without either saving or discarding any changes you made.
2. Click `+ Workflow`

   ![Create workflow](/img/getting-started/create-workflow.png)
3. Select the workflow you want to use as the basis for the new one. Alternatively, choose the `Empty workflow` option to create an empty workflow

   ![Add new workflow](/img/getting-started/add-new-workflow.png)
4. Add the Steps you need to your workflow. Click the `+` symbol between two Steps to insert a Step at that position. Remove Steps you do not need by clicking on the Step and clicking the little trash bin symbol.
5. Click `Save` in the top right corner.

   ![Save workflow](/img/getting-started/save-workflow.png)

## Chaining workflows together

You can set up multiple workflows to run in succession. The order of these workflows can be rearranged, new workflows can be added to the "chain" and existing workflows can be removed from it at any time.

{% include message_box.html type="important" title="Bitrise Start Build step" content="
Be aware that if you chain workflows together as described in this guide, all the workflows will still run on the same Virtual Machine. However, if you use the `Bitrise Start Build` step as described in [this guide](/builds/triggering-builds/trigger-multiple-workflows), each of the triggered workflows will run on a separate Virtual Machine. "%} 

1. Click the app's `Workflow` tab. Note that you cannot leave the Workflow editor without either saving or discarding any changes you made.
2. Open the `WORKFLOW` menu on the left and select a workflow. The default is the `primary` workflow. You can chain workflows before and after the selected workflow.

   ![Selecting workflows](/img/getting-started/selecting-workflows.png)
3. Click `Add Workflow before` to chain a workflow before the currently selected one or click `Add Workflow after` to chain a workflow after the currently selected one.

   ![Chaining workflows](/img/getting-started/chain-workflow.png)
4. Click `Save` in the top right corner.

## Rearranging workflows

Once you have a "chain", you can easily rearrange the order of workflows in a drag-and-drop menu.

1. Click the app's `Workflow` tab. Note that you cannot leave the Workflow editor without either saving or discarding any changes you made.
2. Open the `WORKFLOW` menu on the left and select a workflow that is part of a "chain".
3. Click `Rearrange` to bring up a drag-and-drop menu where you can rearrange the workflows of the chain.

   ![Rearranging workflows](/img/getting-started/rearrange-workflows.png)
4. Click `Save` in the top right corner.

## Renaming workflows

Rename your workflows at any time you feel necessary: it's quick and simple.

1. Click the app's `Workflow` tab. Note that you cannot leave the Workflow editor without either saving or discarding any changes you made.
2. Open the `WORKFLOW` menu on the left and select a workflow.
3. Click `RENAME` next to the name of the workflow.

   ![Selecting workflows](/img/getting-started/selecting-workflows.png)
4. Type the new name then click the check mark to save the new name.
5. Click `Save` in the top right corner.
