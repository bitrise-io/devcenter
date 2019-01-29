---
# jp title missing
title: Steps
redirect_from:
- "/getting-started/builds-and-workflows/getting-started/getting-started-steps"
- "/getting-started/manage-your-bitrise-workflow/"
menu:
  getting-started:
    weight: 8
---
Stepは事前に定義された入力・出力変数があるスクリプト実行のブロックをあらわします。 [Stepをより知りたい場合は、Bitrise CLIのセクションを読んでください](/bitrise-cli/steps)。

Stepは、[ワークフローエディタ](/getting-started/getting-started-workflows)から直接管理することができます。ワークフローエディタでは下記のことが可能です。

* ワークフロー内でStepを追加・外す
* ワークフロー内でStepの順序を変更する
* ワークフロー内で任意のStepのバージョンを指定する
* Stepで必要な入力を指定する
* 前のStepが成功した場合のみ実行するStepを設定する

### 新しいStepを追加する

どのStepもワークフローに追加することができます、これには何も制約がありません。
これは例えば、AndroidアプリのワークフローにiOSアプリ専用のStepも追加できてしまうことに気をつけてください。
妥当なStepのみをワークフローに加えることいつも心に留めて置いてください！

1. [ダッシュボード](https://app.bitrise.io/dashboard) からアプリの名前をクリックして、アプリを開く
2. `Workflow` タブをクリック. 変更を保存あるいは破棄しない限りワークフローエディタから離れられないことに気をつけてください。
3. 左上にある `WORKFLOW` ドロップダウンメニューから必要なワークフローを選択する。
4. 2 Stepの間にStepを挿入するため、その間にある `+` シンボルをクリックする

![ワークフローエディタ内にあるStep追加ボタン](/img/getting-started/add-your-first-step.png)

**Stepライブラリ** において、利用可能なStepの一覧が表示されます。
これらのStepを検索・絞り込みができます: enter a search expression in the `Search steps` のフィールドで検索条件を入力し、フィールドの右でプラットフォームを選択します。デフォルトでは、あなたのプロジェクトのプラットフォームに関連するStepのみが表示されます: `ALL` をクリックすることで、全てのStepから検索できます。

Stepをクリックすることで、選択したワークフローに追加されます。完了したら、ワークフローを保存しておくことを忘れないでください。

右側にある **Clone アイコン** をクリックすることでStepを複製することもでき、**ドラッグ & ドロップ** することができます。

### Stepを外す

1. [ダッシュボード](https://app.bitrise.io/dashboard) からアプリの名前をクリックして、アプリを開く。
2. `Workflow` タブをクリックする。ワークフローの変更を保存・破棄しないでワークフローエディタを離れることはできないことを留意してください。
3. 左上にある `WORKFLOW` ドロップダウンメニューから必要なワークフローを選択する。
4. 外したいStepをクリックする。
5. 右側のゴミ箱アイコンをクリックする。
6. Saveをクリックする。

### Stepのバージョンを管理する

Stepにオレンジの点が表示されている場合、あなたのワークフロー内で利用しているStepのバージョンが最新でないことを指しています。このバージョンを変更するには2つのオプションがあります:

* オレンジの点をクリックすることで、そのStepの最新バージョンに自動的にアップデートされます。
* Stepをクリックし、右側にある `Version` と書かれているメニューを開き、任意のバージョンをしています。`always latest` を選択すると、Stepライブラリで利用可能な最新のバージョンを常に利用することになります。

![Update steps in Workflow Editor](/img/getting-started/update-steps.png)

### Stepの入力項目

選択したワークフローの右側にあるStepをクリックして、入力項目を表示させます。Stepの入力には必須のものと任意のものがあります: 必須の入力にはワークフローエディタ内に下記のようなマークがあります。**必須の入力に適切な値がない場合、そのStepは失敗します**.

![Required input](/img/getting-started/step-inputs.png)

いずれかの方法でStepの入力項目を変更できます:

* 入力項目をクリック
* 入力項目の隣にある `CHANGE` オプションをクリック

どのStepにおいても、環境変数をStepの入力項目として使うことができます。しかし、その環境変数が入力項目に対して適切な値を持っていることを確認してください.

### Stepの入力項目として環境変数を使う

Stepの入力フィールドをクリックすると、グリーン色の `Insert Variable` ボタンが現れます。

![Insert variable](/img/getting-started/insert-variable.png)

このボタンをクリックすると[利用可能な環境変数](/builds/available-environment-variables)の全てのリストが取得できます。 このリストを検索することができ、もしもお目当てのものがあれば、クリックすると入力フィールドに挿入されます。

それぞれのStepの入力項目に置いて、2つの指標のうちどちらかがあります。

* `Environment Variables will be replaced in input`
* または `Environment Variables won't be replaced in input`

これは `is_expand` オプションの状態です。
_これはYAMLモードでしか変更できません (エディタにある_`_bitrise.yml_` _タブ)._

このオプションがすること

* **有効** の場合、入力環境変数に置き換えます(例： `$HOME` または `${HOME}`)。
  inside the input text with the Environment Variable's value **before** it would be passed to the Step.
* **無効** の場合、入力文字は何も置き換えられず、文字がStepに"そのまま"渡されます。

**何を意味するのか** たとえば、入力文字に `$HOME` がある場合にオプションを有効にすると、その入力にあるすべての `$HOME` を環境変数 `HOME`の値で置き換えます。
（例えば `/Users/[user]`や `/home/[user]` などのホームフォルダのパス）
無効になっている場合は置き換えられず、入力した値はテキスト（`$HOME`）として渡され、_Step自体が値を拡張するかもしれないししないかもしれません_。

**通常このオプションはデフォルトにしておくべきです**.

通常、このオプションは変更すべきでは_ありません_。ただもし変更しなければ鳴らない場合、YMLモードにて入力の `opts` リストに `is_expand: true` もしくは `is_expand: false` を加えることで可能です。

これを変更する唯一の理由は、入力値に `$` の記号が含まれる場合(例えばパスワードなど)、かつ環境変数で置き換える代わりに `$` の記号を入力値で保ちたい場合のみです。

**重要:** $の記号を含んでいる環境変数を参照にしたい場合、このオプションを **有効** にする必要があり、これをしないと参照がうまくされません。そのような場合、**入力値に $ が入っているものはこのオプションを無効にし、** 、その環境変数を参照する他のところではこのオプションを有効にします。

### Stepをスキップする

例えば、ビルドが失敗した後にユニットテストのStepを実行するのは意味がありません。そのため、Bitriseでは「もしその前のStepが失敗したら、そのStepは実行すらさせない」と簡単に指示することができます。

もちろん、前のStepが失敗しても実行した方がいいStepの例もあります。例えば `Bitrise.io Cache:Pull` Stepが失敗した場合、次のStepを実行しない理由はないからです - 例えば次のStepが依存関係をインストールするStepの場合、キャッシュの取得が成功しないのが理由でスキップするのはとても悪いアイディアだからです。

下記が、前のStepが失敗した際に特定のStepをスキップする手順です。

1. [ダッシュボード](https://app.bitrise.io/dashboard) からアプリの名前をクリックして、アプリを開く。
2. `Workflow` タブをクリックする。ワークフローの変更を保存・破棄しないでワークフローエディタを離れることはできないことを留意してください。
3. 左上にある `WORKFLOW` ドロップダウンメニューから必要なワークフローを選択する。
4. スキップしたいStepをクリック
5. 右にある `Run if previous Step failed` オプションを無効

![Run if previous failed](/img/getting-started/run-if-failed.png)