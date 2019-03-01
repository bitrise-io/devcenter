---
# jp title missing
title: Rolling builds機能
menu:
  builds:
    weight: 4
---
手動でキャンセルする必要はなく実行中のビルドや保留中のビルドをキャンセルすることができます。もし**Rolling Builds**という機能をオンにすると新しいビルドが始まれば自動的にアプリの以前のビルドを中断することができます。

手動と予定するビルドも`Rolling builds` をオンにし新しいビルドを開始する場合、キャンセルされることに注意してください。

また同じブランチ上で実行しているビルドは、たとえ異なるワークフローで実行中であろうとキャンセルされます。

{% include message_box.html type="important" title="Bitrise Start Build step" content=" このステップによりユーザーは、定められたワークフローのステップの一つとして違うワークフローを動作させることができます。残念なことにRolling Builds機能をオンにしている場合、その引き起こされたワークフローは以前のワークフローを中断することになります。 "%}

加えて中断したい稼働中のビルドの種類を選ぶことができます。こちらが手順です。

1. [bitrise.io](https://www.bitrise.io) 上の `Dashboard` を開きアプリを選択します。
2. メニューバーから `Settings` タブを選択します。
3. 下へスクロールし`ENABLE ROLLING BUILDS` を切り替えます。

   ![Rolling Builds](/img/getting-started/rolling-builds.png)
4. 新しいビルドが開始したとき中断したいビルドの種類を選択する。
   * `Pull Requests`: プルリクエスト中の全ての以前のビルドを全てキャンセルし、関連する全てのプッシュもキャンセルする。
   * `Pushes`: 同じブランチ上のプッシュしている以前の全てのビルドをキャンセルする。
   * `Running builds`: 保留中のものに加え実行中のビルドを自動でキャンセルする。

これで必要のない場合でも稼働中のビルドが終わるのを待たなくて大丈夫です。
