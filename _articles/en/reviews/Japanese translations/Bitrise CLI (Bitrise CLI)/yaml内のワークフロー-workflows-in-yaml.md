---
tag: []
title: YAML内のワークフロー (Workflows in YAML)
redirect_from: []
summary: ''
published: false

---
A workflow is a collection of steps, environment variables, and other configurations for a single `bitrise run`.

ワークフローは単一`bitrise run`用のステップ、環境変数やその他の構成の集合体です。

## Defining a workflow　ワークフローの定義

The only requirement for a workflow is an ID. As an example, in this configuration we declared one workflow with the ID `test`.

ワークフローに唯一必要なものはIDです。例えば、この構成ではID`test`を使って一つのワークフローを宣言しています。

    format_version: 1.3.1
    workflows:
      test:

You can define multiple workflows and run a specific workflow with `bitrise run WORKFLOWID`. Below configuration contains two workflows, `first` and `second`, so you can execute both `bitrise run first` and `bitrise run second`.

複数のワークフローを定義したり、特定のワークフローを実行するには`bitrise run WORKFLOWID`を使用します。以下の構成では２つのワークフロー`first`と`second`が含まれているので、`bitrise run first`と`bitrise run second`の両方を実行することが可能です。

    format_version: 1.3.1
    workflows:
      first:
      second:

{% include message_box.html type="note" title="Available workflow list 利用可能なワークフローのリスト" content=" You can list all the available workflows in a `bitrise.yml` by running `bitrise run` or `bitrise workflows` in the directory of the `bitrise.yml`.

`bitrise.yml`に全ての利用可能なワークフローをリスト化することができます。`bitrise.yml`のディレクトリ内にある`bitrise run`または`bitrise workflows`を実行してください。 "%}

## Adding Steps to a workflow　ワークフローへステップを追加する

To add Steps to a workflow simply include `steps:` and then add the Step(s).

For example, here is how to run two script Steps after each other:

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

When you run `bitrise run test`, the Bitrise CLI will run the two script Steps one by one, starting with the `First step` and then continuing with the `Second step`.

`bitrise run test`を行う際、Bitrise CLIは一つずつステップをを実行します。`First step`ではじまり、`Second step`が続きます。

{% include message_box.html type="info" title="Build Steps　Buildステップ" content=" To learn more about Build Steps, check out the [Steps in YAML](/jp/bitrise-cli/steps/) guide.

Buildステップについては、[YAML内のステップ](/jp/bitrise-cli/steps/)を参照してください。" %}

## Defining workflow specific parameters / environment variables　ワークフローの指定パラメータ/ 指定環境変数の定義

Besides Steps you can also specify environment variables for every workflow.

A workflow's environment variables are used when the workflow is executed, and are available for every step in the workflow.

Here is an example for defining two environment variables (`ENV_VAR_ONE` and `ENV_VAR_TWO`) in the `test` workflow:

ステップのほか、全てのワークフローに環境変数を指定することができます。

ワークフローの環境変数はワークフローが実行された時に使用され、ワークフロー内の全てのステップで利用可能です。

ここの一例では、`test`ワークフローにおける２つの環境変数の定義について紹介します：

    format_version: 1.3.1
    default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    
    workflows:
      test:
        envs:
        - ENV_VAR_ONE: first value
        - ENV_VAR_TWO: second value

## Chaining workflows and reusing workflows　ワークフローのチェーニングと再使用

You can chain workflows to run one/multiple workflows(s) before and/or after a specific workflow.

Example workflow for chaining five workflows:

一つまたは複数のワークフローを特定のワークフローの前/後ろで実行するには、チェーニングが便利です。

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

以上の例に基づいて、：

* `bitrise run send-notifications`: only the Steps of the `send-notifications` workflow will be executed
* `bitrise run send-notifications`: `send-notifications`ワークフローのステップのみが実行されます
* `bitrise run setup` : only the Steps of the `setup` workflow will be executed
* `setup`ワークフローのステップのみが実行されます
* `bitrise run test` : first the Steps of the `setup` workflow will be executed, then the Steps declared in `test` workflow
* まず`setup`ワークフローのステップが開始され、その後`test`ワークフローでステップが宣言されます
* `bitrise run ci`: will execute the Steps of the workflows in the following order:
* 以下の順序でワークフローのステップが開始されます：
  1. `setup`
  2. `test`
  3. `ci` (the `ci` workflow doesn't have any Steps, but that's not an issue. It just means that no step will be executed here and the build will continue with the next workflow in the chain.)  
     `ci`ワークフローはステップを保持していませんが、それは問題ではありません。ただここではステップが実行されずに、チェーン内の次のワークフローに続いていきます。）
  4. `send-notifications`
* `bitrise run deploy`: will execute the Steps of the workflows in the following order:
* 以下の順序でワークフローのステップが開始されます：
  1. `setup`
  2. `test`
  3. `deploy`
  4. `send-notifications`

This means that you can define what a `setup` and `test` should do in your project in the `setup` and `test` workflows only once, and then you can reuse those in other workflows. There's no need to duplicate Steps between workflows.

これは`setup`と`test`のワークフローがそれぞれのワークフローが実行する事を一回自分で定義することで、他のワークフローでも再使用することができます。ワークフロー間でステップを複製する必要はありません。

To sum it up, when you chain workflows, it's the same as if you'd create one workflow which would include all Steps from all the workflows chained after each other. So, for example, one Step's outputs will be available for every other Step which is executed after that Step during the build, (regardless of whether the other Step is in the same or in another workflow). If a Step is executed after another Step during the build, it can access the outputs of the previous Steps.

総括すると、ワークフローをチェーニングするときは一つのワークフローを作成するのと作業は同じです。チェーン化済みのワークフローから全てのステップが含まれるようになります。例えば、(その他のステップが同一または異なるワークフローにあっても) 一つのステップのアウトプットが (ビルド中にそのステップの後に他のステップが開始される) 他のステップにおいても利用可能になります。ビルド中、他のステップの後にあるステップが開始される場合、それ以前のステップのアウトプットにアクセスが可能です。

{% include message_box.html type="info" title="Chaining workflows on the UI　UI上でのワークフローのチェーニング" content=" Learn more about how to[ chain workflows together](/getting-started/getting-started-workflows/#chaining-workflows-together) on the UI. 

UI上で[ワークフローをチェーン化する](/jp/getting-started/getting-started-workflows/#chaining-workflows-together)方法はこちらをご覧ください。"%}

### About workflow environment variables  
ワークフロー環境変数について

Workflow specific environment variables are made accessible **when the workflow is executed**. These environment variables are available for workflows executed **after** that workflow, but **not in the ones executed before** that workflow.

ワークフローの特定の環境変数は、**そのワークフローが開始された時に**アクセス可能になります。環境変数はそのワークフローの**後に**開始されたワークフロー用に利用可能になっており、そのワークフローの**前に開始されたワークフローではありません**。

For example, if you `bitrise run ci`, the `IS_TEST` environment variable **won't** be available in the `setup` workflow, as that runs _before_ the `test` workflow. `IS_TEST` will be available for the steps in `test`, `ci` and `send-notifications` workflows.

例えば、`bitrise run ci`を行う際、 `IS_TEST`環境変数が`setup`ワークフローで使用できないのは、`test`ワークフローの前にその環境変数が実行されるからです。 `IS_TEST`は`test`, `ci`と`send-notifications`ワークフロー内のステップで使用ができます。

This is true even if the workflow doesn't have any Steps. This can be utilized if you want to create generic workflows, which can do different things based on environment variables, and you specify those environment variables through a "wrapper" workflow.

ステップを持たないワークフローでもそれは同じです。環境変数に応じた異なる事柄を行うジェネリックなワークフローを作成して活用することもできます。または、"wrapper"ワークフローを経由してその環境変数を指定することもできます。

For example:

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

As you can see in the above example, neither `build-alpha` nor `build-beta` workflows have any steps. Instead the Steps are defined in `generic-build`, but when you `bitrise run build-alpha` the `BUILD_TYPE` environment variable will be set to `alpha`, while if you `bitrise run build-beta`, the `BUILD_TYPE` environment variable will be set to `beta`.

上記の例からわかるように、`build-alpha`も`build-beta`の両方ともステップを保持していません。ステップが`generic-build`で定義される代わりに、???環境変数は`beta`にセットされます。

As discussed above, workflow defined environment variables are only available in the workflow it defines, and in the ones **executed after** that workflow. So in our example, `generic-build` is included as `after_run` workflow, therefore, the `BUILD_TYPE` environment variable will be available in the steps of `generic-build`. But if you'd use `before_run` instead of `after_run`, that would mean that technically the steps of `generic-build` are processed and executed before processing the `build-alpha` or `build-beta` workflows, so the `BUILD_TYPE` environment variable would not be available in the step of `generic-build`.

## Utility workflows

Utility workflows help you organize your workflows more efficiently.

If you chain workflows together, you might quickly end up with tons of small, reusable workflows. Finding the right workflow might get a bit tricky. Utility workflows to the rescue! The Bitrise CLI supports a small notation, called utility workflow: a workflow **whose ID starts with an underscore character**, for example, `_setup`.

You can find utility workflows at the end of the workflow list if you run `bitrise run` or `bitrise workflows`. Mind you, **utility workflows can't be executed directly with a** `bitrise run` **command**. These workflows can be referenced in `before_run` and `after_run`.

Using the above example with five workflows (`ci`, `deploy`, `send-notifications`, `setup` and `test`), if you run `bitrise run`  in the directory of the `bitrise.yml` without specifying a workflow, you'll get list of all five workflows:

    The following workflows are available:
     * ci
     * deploy
     * send-notifications
     * setup
     * test
    
    You can run a selected workflow with:
    $ bitrise run WORKFLOW-ID

You most likely don't want to run `setup`, `test` nor `send-notifications` by itself, only through `ci` or `deploy`. If you prefix those with an underscore character to make them utility workflows, the `bitrise run` output will better highlight which workflows are meant to be executed directly:

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

{% include message_box.html type="info" title="Available properties" content=" You can find the complete list of available properties in the [bitrise.yml format specification / reference](https://github.com/bitrise-io/bitrise/blob/master/_docs/bitrise-yml-format-spec.md) docs of the CLI. "%}