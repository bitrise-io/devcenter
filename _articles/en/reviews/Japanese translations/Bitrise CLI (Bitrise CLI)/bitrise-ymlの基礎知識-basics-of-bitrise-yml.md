---
tag: []
title: bitrise.ymlの基礎知識 (Basics of bitrise.yml)
redirect_from: []
summary: ''
published: false

---
## bitrise.yml configuration

bitrise.yml構成

The configuration format of the `Bitrise CLI` is referred to as `bitrise.yml`. This is the expected file name the configuration should be saved with.

`Bitrise CLI`の構成フォーマットは`bitrise.yml`と称されます。これは構成の保存に必要なファイル名となっています。

A bare minimal `bitrise.yml` is as simple as:

最小限の`bitrise.yml`はこのようになっています：

    format_version: 5

The above configuration is valid but does not include anything to execute with `run`.

A minimal configuration which you can `bitrise run`:

この構成は有効ですが`run`を使って実行するのに何も含まれていません。

`bitrise.run`ができる最小限の構成は：

    format_version: 5
    workflows:
      test:

The above configuration can be executed with `bitrise run test`. The Bitrise CLI won't give you any errors, but there's still nothing declared to do.

Let's continue with the example from our [Steps in YAML guide](/bitrise-cli/steps/#what-is-a-step), which executes a single Script Step when you run it with `bitrise run test`.

この構成は`bitrise run test`を用いて実行されます。Bitrise CLIはエラーを表示することはありませんが、まだ何も宣言されていません。

BitriseのYAMLガイド内のステップ例を見ていきましょう。これにより`bitrise run test`を使って実行する際に単一Scriptステップを実行することができます。

    format_version: 5
    default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    project_type: android
    app:
      envs:
      - MY_NAME: My Name
    workflows:
      test:
        steps:
        - script@1.1.5:
            inputs:
            - content: echo "Hello ${MY_NAME}!"

A quick walk through of this sample configuration:  
このサンプル構成を見ていきましょう：

* `format_version` : declares the minimum Bitrise CLI format version. Get your Bitrise CLI's supported highest format version with `bitrise version --full`.

  NOTE: If you set the `format_version` to `5` that means that Bitrise CLI versions which don't support the format version `5` or higher won't be able to run the configuration. This is important if you use features which are not available in older Bitrise CLI versions.
* ???: 最小限のBitrise CLIフォーマットバージョンを宣言します。`bitrise version --full`を用いてBitrise CLIがサポートする最新のバージョンを入手しましょう。

  メモ：???を`5` に設定した場合、フォーマットバージョン`5`以上をサポートするBitrise CLIのバージョンでないと、構成を実行する事ができません。以前のバージョンに対応していない機能を使いたい場合はお気をつけください。
* `default_step_lib_source` : specifies the source to use when no other source is defined for a Step. Find out more in the `- scrip``_@1.1.5: _`step description below.
* ???: ステップへのソースが定義されていないときに、使用するソースを指定します。以下の???ステップに関する説明より詳細を確認してください。
* `project_type` : defines your source project's type (for example, `android`, `ios`, `xamarin`).
* ???: ソースプロジェクトのタイプ (例：`android`, `ios`, `xamarin`) を定義します。
* `app` - `envs` : specifies the env vars which will be available for every build, workflow and step.
* `app` - `envs` : 全てのビルド、ワークフロー、ステップで利用可能な環境変数を指定します。
* `workflows` : is the collection of separate build configurations which you can run with `bitrise run WORKFLOWID`.

  In our example the only workflow is `test`, which you can perform with `bitrise run test`. If you'd have a second workflow called `main`, you could run both `bitrise run test` and `bitrise run main`.
* `workflows` : `bitrise run WORKFLOWID`を使って実行できる分散されたビルド構成の集合体です。  
  例では`test`のワークフローだけですが、`bitrise run test`を用いた実行が可能です。`main`と呼ばれる２つ目のワークフローをお持ちの場合、`bitrise run test`と`bitrise run main`の両方を回すことができます。
* `steps` : lists the [steps](/jp/bitrise-cli/steps/) which should be executed when the workflow is performed.

  In our example the `test` workflow includes only a single `script` Step. If multiple Steps are declared, they are performed one by one.
* `steps`: これはワークフローが行われている時に、実行されるべき[ステップ](/jp/bitrise-cli/steps/)をリスト化します。  
  例では単一の`script`ステップのみが`test`ワークフローに含まれています。複数のステップが宣言された場合、１つのステップごとに実行されます。
* `script@1.1.5` : a Step (reference) to perform. This reference does not have a "StepLib Source" declaration, which means that the `default_step_lib_source` will be used as the StepLib Source. For more information, check out our guide on [Step reference/ID format](/jp/bitrise-cli/steps/#step-referenceid-format).
* `script@1.1.5`: 実行するステップ (リファレンス) です。このリファレンスには"StepLib Source"の宣言がなく、???がStepLibソースとして使用されます。詳細は[Step reference/ID format](/jp/bitrise-cli/steps/#step-referenceid-format)よりご確認ください。
* `inputs` : specifies Step inputs.

  NOTE: A Step can have many input. Specify only those input in the bitrise.yml which you want to set or overwrite. Check out our [Step input guide](/jp/bitrise-cli/step-inputs/).
* `inputs`: ステップインプットを指定します。  
  メモ：一つのステップにたくさんのインプットがあります。設定・上書きしたいインプット飲みをbitrise.yml内で指定してください。詳しくは[ステップインプットガイド](/jp/bitrise-cli/step-inputs/)をご覧ください。
* `content` : the input you want to set.

  In our example, we specified the content of the Script Step.
* `content`: 設定を施したいインプットです。  
  例では、Scriptステップのコンテンツを指定しています。
* `echo "Hello ${MY_NAME}!"` : this is the **value** we specified for the `content` input.
* ???: `content`インプットで指定した**値**です。

Find out more on how you can define [multiple Steps](/jp/bitrise-cli/steps/) and use [multiple workflows](/jp/bitrise-cli/workflows/). You'll be able to define your perfect automation configuration in no time!

[複数のステップ](/jp/bitrise-cli/steps/)の指定や[複数のワークフロー](/jp/bitrise-cli/workflows/)の使用についての詳細をご覧いただけます。すぐに完璧な自動化構成を定義することができます！

## bitrise.yml size limitation

If you edit your Workflow on [bitrise.io](https://www.bitrise.io/) (either in Workflow Editor or on the **bitrise.yml** tab) and your `bitrise.yml` exceeds its size limitation, the UI will display the following warning upon trying to save your changes:

    Error saving! Error saving app config: Validation failed: App config validation 784: unexpected token at 'Argument list too long - bin/bitrise

![](/img/yml-size-limit.png)

{% include message_box.html type="warning" title=".yml size limitations" content="Please note `bitrise.yml` cannot exceed 200KB and a `bitrise.secrets.yml` cannot exceed 100KB on the UI."%}

Here are a few workarounds to reduce a long `bitrise.yml`:

* You could separate your project into two apps.
* You could keep the `bitrise.yml` file in the project repository and use it with the Bitrise CLI. This way you will not bump into any limitation as the size limitation only affects the `bitrise.yml` modified on the UI.
* We generally don't recommend using Environment Variables as configuration files. If, however, the Env Var is not a short key - value pair but a long script, we suggest you store it in a file in your project repository or upload it to the [Generic File Storage](/tutorials/how-to-use-the-generic-file-storage/#uploading-files-to-generic-file-storage-on-bitriseio).
* Move scripts (especially the long ones) into their repository, and use our Script Runner Step to execute the scripts based the defined path.