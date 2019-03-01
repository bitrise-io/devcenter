---
title: ワークフロー
redirect_from:
- "/getting-started/manage-your-workflow/"
menu:
  getting-started:
    weight: 7
---
Bitriseワークフローは複数のステップの集まりです。アプリのビルド時に、ステップがワークフローで定義されたステップが実行されます。ワークフローは次の2つの方法で、作成と変更ができます。

* [bitrise.io](https://www.bitrise.io)のグラフィカルワークフローエディタを使う
* プロジェクトの`bitrise.yml`を直接編集する

どちらの方法でも結果的に`bitrise.yml`を変更することになります - `Workflow Editor（ワークフローエディタ）`を使う方法の方がよりシンプルで易しいです！

デフォルトでは、1つのビルドに1つのワークフローが対応しています。しかし、[ワークフローの連結](/getting-started/getting-started-workflows#chain-workflows-together)を設定して、連続して実行することも可能ですし、[複数のワークフローのトリガーを設定して同時に実行する](/builds/triggering-builds/trigger-multiple-workflows)ことも出来ます。

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
* `Deploy to Bitrise.io`ステップで、ビルド成果物のデプロイを行います。

### `deploy（デプロイ）`ワークフロー

`deploy（デプロイ）`ワークフローは、新しいアプリの追加時に自動的に作成されます。いくつかの点で[primaryワークフロー](/getting-started/getting-started-workflows#the-primary-workflow)と似ています。

* '基本的な'ステップを含む
* 実際に含まれるステップはプロジェクトの種類によって異なる

`deploy（デプロイ）`ワークフローは、"build"ステップを含み、ビルドが成功した場合に、オンライン上でインストールもしくはデプロイが可能な成果物を作成します。例えば、Androidプロジェクトの`deploy`ワークフローは、Gradleでのビルドを実行する`Android Build`ステップや、Google Playへのデプロイや検証端末へのインストールが可能な署名済み.apkファイルを作成する`Sign APK`ステップを含みます。

## 独自のワークフローを作成する

ワークフローエディターを使って、とても簡単に独自のワークフローを作成できます。
既存のワークフローをベースにして新しいワークフローを作成することも、空のワークフローを作成してステップを追加することもできます。

例えば、`primary`ワークフローをベースにしてワークフローを作成した場合、`primary`ワークフローと全く同じステップになります。

1. `Workflow`タブをクリックしてください。変更の保存または破棄をすることなく、ワークフローエディタを終了できないことに注意してください。
2. `+ Workflow`をクリックしてください

   ![ワークフローの作成](/img/getting-started/create-workflow.png)
3. 新しいワークフローのベースに使用するワークフローを選択してください。

   ![新しいワークフローを追加](/img/getting-started/add-new-workflow.png)
4. ワークフローに必要なステップを追加してください。任意の位置にステップを挿入するには、導入したいステップの間の`+`マークをクリックしてください。
5. 左上隅にある`Save`をクリックしてください。

   ![ワークフローの保存](/img/getting-started/save-workflow.png)

## ワークフローの連結

複数のワークフローを連続して実行するように設定することができます。いつでも、ワークフローの順番を並び変えることや、新しいワークフローを"チェーン"に加えることや、既存のワークフローを削除することができます。

{% include message_box.html type="important" title="Bitrise Start Buildステップ" content="
このガイドの説明にしたがってワークフローの連結を行う場合、全てが同じバーチャルマシン上で実行されることに注意してください。ただし、[このガイド](/builds/triggering-builds/trigger-multiple-workflows)の説明にしたがって`Bitrise Start Build`ステップを使う場合、それぞれのワークフローは別のバーチャルマシン上で実行されます。"%}

1. `Workflow`タブをクリックしてください。変更の保存または破棄をすることなく、ワークフローエディタを終了できないことに注意してください。
2. 左の`WORKFLOW`メニューを開き、ワークフローを選んでください。デフォルトは、`primary`ワークフローです。選択中のワークフローの前または後にワークフローを連結することができます。

   ![ワークフローの選択](/img/getting-started/selecting-workflows.png)
3. 選択中のワークフローの前に追加した場合は`Add Workflow before`をクリック、後に追加した場合は`Add Workflow after`をクリックしてください。

   ![ワークフローの連結](/img/getting-started/chain-workflow.png)
4. 右上隅にある`Save`をクリックしてください。

## ワークフローの組み替え

作成した"チェーン"は、ドラッグ&ドロップで簡単に順番を変更できます。

1. `Workflow`タブをクリックしてください。変更の保存または破棄をすることなく、ワークフローエディタを終了できないことに注意してください。
2. 左の`WORKFLOW`メニューを開き、"チェーン"に含まれるワークフローを選択してください。
3. `Rearrange`をクリックすると、チェーンのワークフローの組み替えができるドラッグアンドドロップメニューが表示されます。

   ![ワークフローの組み替え](/img/getting-started/rearrange-workflows.png)
4. 右上隅にある`Save`をクリックしてください。

## ワークフローの名前の変更

ワークフローの名前は必要に応じていつでも変更できます: すぐに簡単にできます。

1. `Workflow`タブをクリックしてください。変更の保存または破棄をすることなく、ワークフローエディタを終了できないことに注意してください。
2. 左の`WORKFLOW`メニューを開き、ワークフローを選んでください。
3. ワークフロー名の隣にある`RENAME`をクリックしてください。

   ![ワークフローの選択](/img/getting-started/selecting-workflows.png)
4. 新しいワークフロー名を入力し、チェックマークをクリックして保存してください。
5. 右上隅にある`Save`をクリックしてください。
