---
tag: []
title: bitrise.ymlの基礎知識 (Basics of bitrise.yml)
redirect_from: []
summary: ''
published: false

---
## bitrise.yml構成

`Bitrise CLI`の構成フォーマットは`bitrise.yml`と称されます。これは構成の保存に必要なファイル名となっています。

最小限の`bitrise.yml`はこのようになっています：

    format_version: 5

この構成は有効ですが、`run`を使って実行するのに何も含まれていません。

`bitrise.run`ができる最小限の構成は：

    format_version: 5
    workflows:
      test:

この構成は`bitrise run test`を用いて実行されます。Bitrise CLIはエラーを表示することはありませんが、まだ何も宣言されていません。

[BitriseのYAMLガイド内のステップ](/jp/bitrise-cli/steps/#what-is-a-step)を例に見ていきましょう。これにより`bitrise run test`を使って回す際に単一Scriptステップを実行することができます。

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

このサンプル構成を見ていきましょう：

* `format_version`: 最小限のBitrise CLIフォーマットバージョンを宣言します。`bitrise version --full`を用いてBitrise CLIがサポートする最新のバージョンを入手しましょう。

  メモ：`format_version`を`5` に設定した場合、フォーマットバージョン`5`以上をサポートするBitrise CLIのバージョンでないと、構成を実行する事ができません。以前のバージョンに対応していない機能を使いたい場合はお気をつけください。
* `default_step_lib_source`: ステップへのソースが他に定義されていないときに、使用するソースを指定します。以下の`- scrip``_@1.1.5: _`ステップに関する説明より詳細を確認してください。
* `project_type`: ソースプロジェクトのタイプ (例：`android`, `ios`, `xamarin`) を定義します。
* `app` - `envs` : 全てのビルド、ワークフロー、ステップで利用可能な環境変数を指定します。
* `workflows` : `bitrise run WORKFLOWID`を使った実行が可能な分散されたビルド構成の集合体です。  
  例では`test`のワークフローだけがあり、`bitrise run test`を用いた実行が可能です。`main`と呼ばれる２つ目のワークフローをお持ちの場合、`bitrise run test`と`bitrise run main`の両方を回すことができます。
* `steps`: これはワークフローが行われている時に、実行されるべき[ステップ](/jp/bitrise-cli/steps/)をリスト化します。  
  例では単一の`script`ステップのみが`test`ワークフローに含まれています。複数のステップが宣言された場合、ステップごとに実行されます。
* `script@1.1.5`: 実行するステップ (リファレンス) です。このリファレンスには"StepLib Source"の宣言がなく、`default_step_lib_source`がStepLibソースとして使用されます。詳細は[ステップの参照/IDフォーマット]()よりご確認ください。
* `inputs`: ステップインプットを指定します。  
  メモ：一つのステップには多くのインプットが存在します。設定・上書きしたいインプットのみをbitrise.yml内で指定してください。詳しくは[ステップインプットガイド](/jp/bitrise-cli/step-inputs/)をご覧ください。
* `content`: 設定を施したいインプットです。  
  例では、Scriptステップのコンテンツを指定しています。
* `echo "Hello ${MY_NAME}!"`: `content`インプット用に指定した**値**です。

[複数のステップ](/jp/bitrise-cli/steps/)の指定や[複数のワークフロー](/jp/bitrise-cli/workflows/)の使用についての詳細をご覧いただけます。すぐに完璧な自動化構成を定義することができます！

## bitrise.ymlのサイズ制限

[bitrise.io](https://www.bitrise.io/)上 (Workflow Editorまたは**bitrise.yml**タブのどちらか) でワークフローを編集していて、`bitrise.yml`のサイズ制限を超えてしまった場合、UI上にこのような警告文が変更の保存を試みている時に表示されます：

    Error saving! Error saving app config: Validation failed: App config validation 784: unexpected token at 'Argument list too long - bin/bitrise

![](/img/yml-size-limit.png)

{% include message_box.html type="warning" title=".ymlサイズ制限" content="`bitrise.yml`では200KBを超過することはできません。また、`bitrise.secrets.yml`は100KBを超過することはできません。"%}

長い`bitrise.yml`を減らすには：

* You could separate your project into two apps.
* You could keep the `bitrise.yml` file in the project repository and use it with the Bitrise CLI. This way you will not bump into any limitation as the size limitation only affects the `bitrise.yml` modified on the UI.
* プロジェクトを２つのアプリに分割します。
* プロジェクトのレポジトリに`bitrise.yml`ファイルを保管し、それをBitrise CLIで使用することができます。この方法でサイズ制限の影響は受けませんが、UI上で修正された`bitrise.yml`にのみ影響を及ぼします。
* We generally don't recommend using Environment Variables as configuration files. If, however, the Env Var is not a short key - value pair but a long script, we suggest you store it in a file in your project repository or upload it to the [Generic File Storage](/tutorials/how-to-use-the-generic-file-storage/#uploading-files-to-generic-file-storage-on-bitriseio).
* Move scripts (especially the long ones) into their repository, and use our Script Runner Step to execute the scripts based the defined path.
* 構成ファイルとして環境変数を使用するのは、一般的に推奨しておりません。仮に環境変数がショートキーではなくロングスクリプトである値のペアである場合、プロジェクトのレポジトリのファイルに保存するか[Generic File Storage](/tutorials/how-to-use-the-generic-file-storage/#uploading-files-to-generic-file-storage-on-bitriseio)へアップロードします。
* レポジトリへ (特に長い) スクリプトを移して、定義済みパスに基づいたスクリプトを実行するScript Runnerステップを使用します。