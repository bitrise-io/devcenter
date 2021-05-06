---
changelog:
last_modified_at:
tag: []
title: 最重要コンセプト (Most important concepts)
redirect_from: []
description: ''
published: false

---
## 全てのインプット、アウトプット、パラメータは環境変数です

全てのステップインプット (step input)、ステップアウトプット (step output)、シークレット環境変数 (secret environment variable)、アプリ環境変数 (app environment variable) とワークフロー環境変数 (workflow environment variable) は環境変数です。基本的に全てのインプットと変数はビルド構成内にあります。

Bitriseにおける環境変数は、**他の環境変数と同様で、同じルールや制限を持った正規の環境変数となっています。**

いくつか技術的な詳細について紹介いたします：

### 環境変数の値は文字列のみの使用が可能

環境変数は`String`(文字列)値のみを保持することができます。環境変数の値として`1`,`true`のような数字やboolをセットしても、全て文字列になります。

### 親プロセスは子プロセスによってエクスポーズされた環境変数にアクセスできません

親プロセスは子プロセスによってエクスポーズされた環境変数にアクセスを行うことはできません。

例えば、`bash my_bash_script.sh`を持ったご自身のターミナル内で`my_bash_script.sh`を実行する、または`my_bash_script.sh`が`export MY_VAR=the-value`を持った環境変数をセットする場合、スクリプトが終わった後ターミナル内で`MY_VAR`にアクセスすることができなくなります。`MY_VAR`は`my_bash_script.sh`内**と**`my_bash_script.sh`によって開始されたプロセス/スクリプト内でのみ利用可能です。

Bitrise CLIに関しては、もしScriptステップ内で `export MY_VAR=...` をする際、 `MY_VAR` はその後のステップ以降、利用不可になります。ステップが書かれた言語の形式に関わらず、ステップでもこれは同じです。

Bitrise CLIはステップから環境変数をエクスポーズするメカニズムを含んでいるので、その後のステップでもBitrise CLIツールの[envman](https://github.com/bitrise-io/envman)を経由するとアクセスすることができます。

他のステップでも環境変数を利用可能にしてスクリプト内またはステップ内で環境変数をセットするには、`envman`を経由して行う必要があります。

シンプルな例はこちらです：

    envman add --key MY_TEST_ENV_KEY --value 'test value for test key'

他の例は[envman's README](https://github.com/bitrise-io/envman)や[環境変数をエクスポーズして他のステップで使用する](/jp/tips-and-tricks/expose-environment-variable)のガイドで確認できます。

## 環境変数の可用性の順番

環境変数は、その環境変数の"処理"が完了した**後**、利用可能になります。

[Bitrise CLIによってエクスポーズされる](/jp/builds/available-environment-variables/#bitrise-cliによる提示)環境変数がいくつかあり、それらは開始時点から利用可能な環境変数となっています (例: `BITRISE_SOURCE_DIR` と `BITRISE_TRIGGERED_WORKFLOW_ID`)。

全ての他の環境変数は_build progresses (ビルド経過) として_"processed" (処理済み) / 利用可能な状態になります。

ワークフローが実行される前に処理され利用可能になる環境変数の種類が2つあります：[Secrets](/bitrise-cli/secrets/)と`App Env Vars` ([bitrise.yml](/jp/bitrise-cli/basics-of-bitrise-yml/)にある`app: envs:`)です。

この後、指定のワークフローの処理が開始され、[そのワークフロー用に指定された環境変数](/jp/bitrise-cli/workflows/#defining-workflow-specific-parameters-and-environment-variables)の利用が可能になります。指定のワークフローが処理される時 (ワークフローが実行されるであろう最初のステップの直前) に、その指定したワークフローの前または後ろにワークフローを持つ場合、環境変数は処理され利用が可能な状態になります。

ステップインプットも環境変数です；指定のステップ用にのみエクスポーズされ、そのステップが開始される直前にもエクスポーズされます。

最後に、ステップアウトプットは指定のステップによりエクスポーズされるので、**ステップの終了後**、その次のステップで利用可能になります。

**環境変数が処理される順番：**

1. [環境変数をエクスポーズしたBitrise CLI](/jp/builds/available-environment-variables/#exposed-by-the-bitrise-cli)
2. [Secrets](/jp/bitrise-cli/secrets/)
3. [Build Trigger API](/jp/api/build-trigger/)経由でビルド用に指定された一回限りの環境変数
4. `App Env Vars` ([bitrise.yml](/jp/bitrise-cli/basics-of-bitrise-yml/)内の`app: envs:`)
5. [ワークフロー環境変数](/jp/bitrise-cli/workflows/#defining-workflow-specific-parameters-and-environment-variables)
6. ステップインプット
7. ステップアウトプット

**では、なぜ処理順番が重要なのでしょうか?**

環境変数は、処理後ならびに利用可能な状態になった後、使うことができます。**環境変数を参照または使用する際は、すでに処理されているものだけを利用することができます！**

例：

* `Secret`環境変数の値には、Bitrise CLIによってエクスポーズされた環境変数を使用できますが、Secretsの処理中にその他の環境変数 (アプリ環境変数, ワークフロー環境変数など) は処理されないので、使うことはできません。
* `App Env Var`の値には、Bitrise CLIがエクスポーズした環境変数ならびに`Secrets`からの環境変数を使用できますが、ワークフロー環境変数やステップインプットは使えません。
* `Workflow environment variable`には、以上のもの全て (`Secrets`, `App Env Vars`, Bitrise CLIがエクスポーズした環境変数) を使用できます。
* ステップインプット値には、全ての他の環境変数を使用することができ、ワークフロー環境変数、指定のステップの前に実行されるステップのアウトプットも含まれています。

### チェーンワークフローの環境変数

いったんワークフローの環境変数が処理され利用可能な状態にされると、環境変数はビルド実行中どこででも使用することが可能です。これは、チェーンの他ワークフローが指定のステップの**前**に実行されるワークフローの環境変数の使用が**可能である**ということです。ステップアウトプットのように、 (アウトプットを生成する) ステップが完了した**後**、全ての他のステップで利用可能です。

[ワークフロー：ワークフロー環境変数についてのメモ](/bitrise-cli/workflows/#about-workflow-environment-variables)にて、チェーンワークフローにあるワークフロー環境変数の可用性についての情報をご覧ください。