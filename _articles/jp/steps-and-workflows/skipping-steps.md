---
title: Stepをスキップする
menu:
  steps-workflows-main:
    weight: 8

---
例えば、ビルドが失敗した後にユニットテストのStepを実行するのは意味がありません。そのため、Bitriseでは「もしその前のStepが失敗したら、そのStepは実行すらさせない」と簡単に指示することができます。

もちろん、前のStepが失敗しても実行した方がいいStepの例もあります。例えば `Bitrise.io Cache:Pull` Stepが失敗した場合、次のStepを実行しない理由はないからです - 例えば次のStepが依存関係をインストールするStepの場合、キャッシュの取得が成功しないのが理由でスキップするのはとても悪いアイディアだからです。

下記が、前のStepが失敗した際に特定のStepをスキップする手順です。

1. [ダッシュボード](https://app.bitrise.io/dashboard) からアプリの名前をクリックして、アプリを開く。
2. `Workflow` タブをクリックする。ワークフローの変更を保存・破棄しないでワークフローエディタを離れることはできないことを留意してください。
3. 左上にある `WORKFLOW` ドロップダウンメニューから必要なワークフローを選択する。
4. スキップしたいStepをクリック
5. 右にある `Run if previous Step failed` オプションを無効

![Run if previous failed](/img/getting-started/run-if-failed.png)