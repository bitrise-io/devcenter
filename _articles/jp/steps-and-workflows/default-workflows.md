---
title: デフォルトワークフロー
menu:
  steps-workflows-main:
    weight: 12

---
[bitrise.io](https://www.bitrise.io)にアプリを追加すると、2つのワークフローが作成されます。`primary（プライマリ）`ワークフローと`deploy（デプロイ）`ワークフローです。webhookが設定されている場合、デフォルトでは、プロジェクトのコードの変更があるたびに`primary（プライマリ）`ワークフローのトリガーが実行されます。

特定のイベントが発生するたびに、他の任意のワークフロー（`deploy（デプロイ）`ワークフローを含む）が実行されるように、トリガーを設定することができます。詳しくは、[ビルドトリガーについてより詳しく知る](/builds/triggering-builds/triggering-builds)をお読みください。

## primary（プライマリー）ワークフロー

`primary（プライマリー）`ワークフローは、新しいアプリの追加時に自動的に作成されます。アプリを追加する処理が完了すると、Bitriseは自動的に初回のビルドを実行します: このビルドは、`primary`ワークフローによって実行されます。

![primaryワークフロー](/img/getting-started/primary-workflow.png)

`primary`ワークフローは、作成したアプリごとに同じではありません: プロジェクトの種類によって、含まれるステップが異なります。例えば、Androidプロジェクトの`primary`ワークフローは、`Install missing Android SDK components（不足しているAndroid SDKのインストール）`、`Android Lint`、`Android Unit Test`のステップを含むでしょう。ただし、`primary`は"基本の"ワークフローであり、共通して以下のアクションを行います:

* `ssh-add`コマンドで、SSHキーがアプリに追加されている場合にアクティベートを行います。このステップでは、SSHキーの保存、ユーザーのssh-agentへのロードを実行します。
* `Git Clone Repository`ステップで、プロジェクトのGitレポジトリをクローンを実行します。
* `Bitrise.io Cache:Pull` and `Bitrise.io Cache:Push`ステップについては、[Btriseでのキャッシュ](/caching/about-caching) を参照してください。
* `Deploy to Bitrise.io`ステップで、ビルド成果物のデプロイを行います。

## deploy（デプロイ）ワークフロー

`deploy（デプロイ）`ワークフローは、新しいアプリの追加時に自動的に作成されます。いくつかの点で[primaryワークフロー](/getting-started/getting-started-workflows#the-primary-workflow)と似ています。

* '基本的な'ステップを含む
* 実際に含まれるステップはプロジェクトの種類によって異なる

`deploy（デプロイ）`ワークフローは、"build"ステップを含み、ビルドが成功した場合に、オンライン上でインストールもしくはデプロイが可能な成果物を作成します。例えば、Androidプロジェクトの`deploy`ワークフローは、Gradleでのビルドを実行する`Android Build`ステップや、Google Playへのデプロイや検証端末へのインストールが可能な署名済み.apkファイルを作成する`Android Sign`ステップを含みます。