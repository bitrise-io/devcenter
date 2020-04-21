---
published_at:
last_modified_at:
tag: []
title: YAML内のワークフロー (Workflows in YAML)
redirect_from: []
description: ''
published: false

---
ワークフローは単一`bitrise run`用のステップ、環境変数やその他の構成の集合体です。

## ワークフローの定義

ワークフローに唯一必要なものはIDです。例えば、この構成ではID `test`を使って一つのワークフローを宣言しています。

    format_version: 1.3.1
    workflows:
      test:

複数のワークフローを定義したり、特定のワークフローを実行するには`bitrise run WORKFLOWID`を使用します。以下の構成では２つのワークフロー`first`と`second`が含まれているので、`bitrise run first`と`bitrise run second`の両方を実行することが可能です。

    format_version: 1.3.1
    workflows:
      first:
      second:

{% include message_box.html type="note" title="利用可能なワークフローのリスト" content="`bitrise.yml`に全ての利用可能なワークフローをリスト化することができます。`bitrise.yml`のディレクトリ内にある`bitrise run`または`bitrise workflows`を実行してください。 "%}

## ワークフローへステップを追加する

ワークフローにステップを追加するには`steps:`を含ませてからステップを追加します。

ここでは一例として、２つのScriptステップの実行方法について紹介します：

    format_version: 1.3.1
    default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    
    workflows:
      test:
        steps:
        - script:
            title: First step
        - script:
            title: Second step

`bitrise run test`を行う際、Bitrise CLIは一つずつステップを実行します。`First step`ではじまり、`Second step`が続きます。

{% include message_box.html type="info" title="Buildステップ" content=" Buildステップについては、[YAML内のステップ](/jp/bitrise-cli/steps/)を参照してください。" %}

## ワークフローの指定パラメータ/ 環境変数の定義

ステップのほか、全てのワークフローに環境変数を指定することができます。

ワークフローの環境変数はワークフローが実行される時に使用され、ワークフロー内の全てのステップで利用可能です。

ここの一例では、`test`ワークフローにおける２つの環境変数(`ENV_VAR_ONE` と `ENV_VAR_TWO`) の定義について紹介します：

    format_version: 1.3.1
    default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    
    workflows:
      test:
        envs:
        - ENV_VAR_ONE: first value
        - ENV_VAR_TWO: second value

## ワークフローのチェーニングと再利用

一つまたは複数のワークフローを特定のワークフローの前か後ろで実行するには、チェーニングが便利です。

５つのワークフローをチェーニングする例を見てみましょう：

    format_version: 1.3.1
    default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    
    workflows:
    
      send-notifications:
        steps:
        # send notifications
    
      setup:
        steps:
        # setup steps to run
    
      test:
        before_run:
        - setup
        envs:
        - IS_TEST: "true"
        steps:
        # test steps to run
    
      ci:
        before_run:
        - test
        after_run:
        - send-notifications
    
      deploy:
        before_run:
        - test
        steps:
        # steps to deploy
        after_run:
        - send-notifications

Based on the above example, if you run:

以上の例に基づいて：

* `bitrise run send-notifications`: `send-notifications`ワークフローのステップのみが実行されます
* `bitrise run setup` : `setup`ワークフローのステップのみが実行されます
* `bitrise run test` : まず`setup`ワークフローのステップが開始され、その後`test`ワークフローでステップが宣言されます
* `bitrise run ci`: 以下の順序でワークフローのステップが開始されます：
  1. `setup`
  2. `test`
  3. `ci` (`ci`ワークフローはステップを保持していませんが、それは問題ではありません。ただここではステップが実行されずに、チェーン内の次のワークフローに続いていきます。）
  4. `send-notifications`
* `bitrise run deploy`: 以下の順序でワークフローのステップが開始されます：
  1. `setup`
  2. `test`
  3. `deploy`
  4. `send-notifications`

これは`setup`と`test`のワークフローがプロジェクト内で何をすべきかを自分で定義することができ、他のワークフローでも再利用することができます。ワークフロー間でステップを複製する必要はありません。

総括すると、ワークフローをチェーニングする作業と一つのワークフローを作成する作業は同じ仕組みになっています。チェーン化済みの全てのワークフローから全てのステップを含めることができます。例えば、(その他のステップが同一または異なるワークフローにあっても) 一つのステップのアウトプットが (ビルド中にそのステップの後に他のステップが開始される) 他のステップにおいても利用可能になります。ビルド中他のステップの後に、あるステップが開始される場合、それ以前のステップのアウトプットにアクセスが可能です。

{% include message_box.html type="info" title="UI上でのワークフローのチェーニング" content=" UI上で[ワークフローをチェーン化する](/jp/getting-started/getting-started-workflows/#chaining-workflows-together)方法はこちらをご覧ください。"%}

### ワークフロー環境変数について

ワークフローの特定の環境変数は、**そのワークフローが開始された時に**アクセス可能になります。環境変数はそのワークフローの**後に**開始されたワークフロー用に利用可能になっており、そのワークフローの**前に開始されたワークフローではありません**。

例えば、`bitrise run ci`を行う際、 `IS_TEST`環境変数が`setup`ワークフローで使用**できない**のは、`test`ワークフローの_前に_その環境変数が実行されるからです。 `IS_TEST`は`test`, `ci`と`send-notifications`ワークフロー内のステップで使用ができます。

ステップを持たないワークフローでもそれは同じです。環境変数に応じた異なる事柄を行うジェネリックなワークフローを作成して活用することもできます。または、"wrapper"ワークフローを経由してその環境変数を指定することもできます。

例えば：

    format_version: 1.3.1
    default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    
    workflows:
    
      generic-build:
        steps:
        # steps which depend on `BUILD_TYPE` environment variable
    
      build-alpha:
        envs:
        - BUILD_TYPE: alpha
        after_run:
        - generic-build
    
      build-beta:
        envs:
        - BUILD_TYPE: beta
        after_run:
        - generic-build

上記の例からわかるように、`build-alpha`も`build-beta`の両方ともステップを保持していません。ステップが`generic-build`で定義される代わりに、`bitrise run build-alpha`を行うと`BUILD_TYPE`環境変数は`alpha`にセットされ、`bitrise run build-beta`を実行すると`BUILD_TYPE`環境変数は`beta`にセットされます。

前述したとおり、定義済みワークフローの環境変数は、定義しているワークフロー (そのワークフロー**後に実行されたもの**) でのみの利用が可能です。一例では、`generic-build`が`after_run`ワークフローとして含まれているので、`BUILD_TYPE`環境変数は`generic-build`のステップにて利用できるようになります。`after_run`の代わりに `before_run` を使用される場合、技術的に`generic-build`のステップは`build-alpha`または`build-beta`ワークフローが処理される前に処理・実行されます。ですので、`BUILD_TYPE`環境変数は`generic-build`のステップ内では利用することはできません。

## ユーティリティワークフロー

ユーティリティワークフロー (Utility Workflow) はより効率的なワークフローの整理をお手伝いします。

チェーンワークフローをまとめると、すぐに小さくて再利用のできるワークフローを数多く手にすることができます。けれども適切なワークフローを探すのは簡単ではありません。ここでユーティリティワークフローの出番です！Bitrise CLIはユーティリティワークフローと呼ばれる小さな表記をサポートします (例：`_setup`のような**IDがアンダースコア表記で始まるワークフロー**) 。

`bitrise run`または`bitrise workflows`を実行するとワークフローの最後にユーティリティワークフローを見つけることができます。ここで注意していただきたいのは、**ユーティリティワークフローは**`bitrise run`**コマンドによって直接実行されることはありません**。これらのワークフローは`before_run`と`after_run`にて参照されます。

上記の一例の５つのワークフロー (`ci`, `deploy`, `send-notifications`, `setup`と`test`) を用いると、もしワークフローを指定せずに`bitrise.yml`のディレクトリ内で`bitrise run`を実行すると５つ全てのワークフローのリストを入手することができます。

    The following workflows are available:
     * ci
     * deploy
     * send-notifications
     * setup
     * test
    
    You can run a selected workflow with:
    $ bitrise run WORKFLOW-ID

`setup`, `test`と`send-notifications`を単体で実行させたくない (`ci`や`deploy`経由でのみ行いたい) ユーザーがほとんどです。アンダースコアをワークフローの前につけると、ユーティリティワークフローになります。これにより`bitrise run`アウトプットが、どのワークフローが直接実行されるかを意図しているのかを強調します。

    The following workflows are available:
     * ci
     * deploy
    
    You can run a selected workflow with:
    $ bitrise run WORKFLOW-ID
    
    
    The following utility workflows are defined:
     * _send-notifications
     * _setup
     * _test
    
    Note about utility workflows:
     Utility workflow names start with '_' (example: _my_utility_workflow).
     These workflows can't be triggered directly, but can be used by other workflows
     in the before_run and after_run lists.

{% include message_box.html type="info" title="利用可能なプロパティ" content=" 利用可能なプロパティについての完全なリストはCLIの[bitrise.yml format specification / reference](https://github.com/bitrise-io/bitrise/blob/master/_docs/bitrise-yml-format-spec.md)ドキュメントをご覧ください。"%}