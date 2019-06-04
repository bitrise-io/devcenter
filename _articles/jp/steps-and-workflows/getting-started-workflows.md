---
title: ワークフロー
redirect_from:
- "/getting-started/builds-and-workflows/getting-started/getting-started-workflows"
- "/getting-started/manage-your-workflow/"
menu:
  steps-workflows-main:
    weight: 10

---
Bitriseワークフローは複数のステップの集まりです。アプリのビルド時に、ステップがワークフローで定義されたステップが実行されます。ワークフローは次の2つの方法で、作成と変更ができます。

* [bitrise.io](https://www.bitrise.io)のグラフィカルワークフローエディタを使う
* プロジェクトの`bitrise.yml`を直接編集する

どちらの方法でも結果的に`bitrise.yml`を変更することになります - `Workflow Editor（ワークフローエディタ）`を使う方法の方がよりシンプルで易しいです！

デフォルトでは、1つのビルドに1つのワークフローが対応しています。しかし、[ワークフローの連結](/getting-started/getting-started-workflows#chain-workflows-together)を設定して、連続して実行することも可能ですし、[複数のワークフローのトリガーを設定して同時に実行する](/builds/triggering-builds/trigger-multiple-workflows)ことも出来ます。