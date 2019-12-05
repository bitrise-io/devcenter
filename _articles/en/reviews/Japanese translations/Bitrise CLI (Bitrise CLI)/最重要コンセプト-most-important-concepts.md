---
tag: []
title: 最重要コンセプト (Most important concepts)
redirect_from: []
summary: ''
published: false

---
## Every input, output and parameter is an Environment Variable  
全てのインプット、アウトプット、パラメータは環境変数です

Every step input, step output, secret environment variable, app environment variable and workflow environment variable (basically every input and variable in your build config) is an environment variable.

全てのステップインプット、ステップアウトプット、シークレット環境変数、アプリ環境変数とワークフロー環境変数 (基本的に全てのインプットと変数がビルド構成にあります) は環境変数です。

There's nothing special about how Bitrise handles environment variables, **these are regular environment variable, with the same rules and restrictions as any other environment variable.**

他の環境変数のような同じルールや制限を持った正規の環境変数となっています。

To highlight a couple of technical details:

いくつか技術的な詳細について：

### The value of an Environment Variable can only be a String  
環境変数の値はString(文字列)のみの使用が可能

Environment Variables can only hold `String` values. Even if you set a number or bool, like `1` or `true` as the value of the Environment Variable, that will be a string.

環境変数は`String`値のみを保持することができます。環境変数の値として`1`,`true`のような数字やboolをセットしても、全てStringになります。

### Parent process can't access  Environment Variables exposed by child processes  
親プロセスは子プロセスによってエクスポーズされた環境変数にアクセスできません

Parent process(es) can't access Environment Variables exposed by child processes.

親プロセスは子プロセスによってエクスポーズされた環境変数にアクセスできません。

For example, if you run a `my_bash_script.sh` in your Terminal with `bash my_bash_script.sh`, and `my_bash_script.sh` sets an environment variable with `export MY_VAR=the-value`, you won't be able to access `MY_VAR` in your Terminal after the script is finished, `MY_VAR` will only be available in `my_bash_script.sh` **and** in the processes / scripts started by `my_bash_script.sh`.

例えば、`bash my_bash_script.sh`を持ったご自身のターミナル内で`my_bash_script.sh`を実行する、または`my_bash_script.sh`が`export MY_VAR=the-value`を持った環境変数をセットする場合、スクリプトが終わった後ターミナル内で`MY_VAR`にアクセスすることができなくなります。`MY_VAR`は`my_bash_script.sh`内**と**`my_bash_script.sh`によって開始されたプロセス/スクリプト内でのみ利用可能です。

In terms of Bitrise CLI this means that if you `export MY_VAR=...` in a Script step, `MY_VAR` won't be available in subsequent steps. This is true for the steps too, regardless of which language the step is written in.

Bitrise CLIに関しては、これはもしScriptステップ内で???をする際、???はその次のステップ以降、利用不可になります。ステップが書かれた言語に関わらず、その以降のステップでもこれは同じです。

Bitrise CLI includes a mechanism for exposing environment variables from Steps so that subsequent Steps can also access it, through the Bitrise CLI tool called [envman](https://github.com/bitrise-io/envman).

Bitrise CLIはステップから環境変数をエクスポーズするメカニズムを含んでいるので、その後のステップでもBitrise CLIツールの[envman](https://github.com/bitrise-io/envman)を経由してアクセスすることができます。

To set an environment variable in your script or in your step to make that available in other steps too, you have to do that through `envman`.

他のステップでも環境変数を利用可能にしてスクリプト内またはステップ内で環境変数をセットするには、`envman`を経由して行う必要があります。

A simple example:

シンプルな例はこちらです：

    envman add --key MY_TEST_ENV_KEY --value 'test value for test key'

You can find more examples in [envman's README](https://github.com/bitrise-io/envman), and in the [Expose an Environment Variable and use it in another Step](/tips-and-tricks/expose-environment-variable) guide.

他の例は[envman's README](https://github.com/bitrise-io/envman)や[環境変数をエクスポーズして他のステップで使用する](/jp/tips-and-tricks/expose-environment-variable)のガイドで確認できます。

## Availability order of environment variables  
環境変数の

Environment variables are available **after** the environment variable is "processed".

環境変数は、その環境変数が"processed"した後、利用可能になります。

There are a few environment variables [exposed by the Bitrise CLI itself](/faq/available-environment-variables/#exposed-by-the-bitrise-cli), those are available from the start (e.g. `BITRISE_SOURCE_DIR` and `BITRISE_TRIGGERED_WORKFLOW_ID`).

Bitrise CLI本体によってエクスポーズされる環境変数がいくつかあり、それらは開始時点から利用可能な環境変数となっています (例: `BITRISE_SOURCE_DIR` と `BITRISE_TRIGGERED_WORKFLOW_ID`)。

All other environment variables are "processed" / made available _as the build progresses._

There are two types of environment variables which are processed and made available before the workflow would be executed: [Secrets](/bitrise-cli/secrets/) and `App Env Vars` (`app: envs:` in the [bitrise.yml](/bitrise-cli/basics-of-bitrise-yml/)).

全ての他の環境変数は"processed"になっており、build progressesとして利用可能になります。

ワークフローが実行される前に処理され利用可能になる環境変数には2つ種類があります：[Secrets](/bitrise-cli/secrets/)と`App Env Vars` ([bitrise.yml](/jp/bitrise-cli/basics-of-bitrise-yml/)にある`app: envs:`)

After these, the processing of the specified Workflow starts, and the [environment variables specified for that Workflow](/jp/bitrise-cli/workflows/#define-workflow-specific-parameters-environment-variables) are made available. If the workflow has before or after workflows, when a specific workflow is processed (right before the first step of the workflow would run) the workflow's environment variables are processed and made available.

この後、指定のワークフローの処理が開始され、[そのワークフロー用に指定された環境変数](/jp/bitrise-cli/workflows/#define-workflow-specific-parameters-environment-variables)の利用が可能になります。指定のワークフローが処理される時 (ワークフローが実行されるであろう最初のステップの直前) に、ワークフローの前または後ろにワークフローを持つ場合、ワークフローの環境変数は処理され利用が可能な状態になります。

Step inputs are also environment variables; those are exposed only for the specific step, and right before the Step would start.

Last but not least Step outputs are exposed by the specific step, so those are available for subsequent steps **after the Step finishes**.

ステップインプットも環境変数です；指定のステップにのみエクスポーズされ、そのステップの直前に開始されます。

もう一つ、ステップアウトプットは指定のステップによりエクスポーズされるので、**ステップの終了後**、その次のステップで利用可能になります。

**The environment variable processing order:**

環境変数の処理される順番：

1. [Bitrise CLI exposed environment variables](/builds/available-environment-variables/#exposed-by-the-bitrise-cli)  
   [環境変数をエクスポーズしたBitrise CLI](/jp/builds/available-environment-variables/#exposed-by-the-bitrise-cli)
2. [Secrets](/jp/bitrise-cli/secrets/)
3. One-off environment variables specified for the build through the [Build Trigger API](/api/build-trigger)  
   Build Trigger API経由でビルド用に指定された一回限りの環境変数
4. `App Env Vars` (`app: envs:` in the [bitrise.yml](/bitrise-cli/basics-of-bitrise-yml/))
5. [Workflow environment variables](/bitrise-cli/workflows/#define-workflow-specific-parameters-environment-variables)
6. Step inputs
7. Step outputs

**So, why does the processing order matter?**

An environment variable is only available **after** it is processed and made available. **When you reference or use an environment variable, you can only reference/use those which are already processed!**

A couple of examples:

* In the value of a `Secret` environment variable, you can use environment variables exposed by Bitrise CLI, but you can't use any other environment variable (App Env Vars, Workflow Env Vars, ...), as those are not processed when secrets are processed.
* In the value of an `App Env Var`, you can use environment variables from `Secrets` as well as the Bitrise CLI exposed ones, but you can't use Workflow Env Vars, nor Step inputs.
* In a `Workflow environment variable` you can use all the above (`Secrets`, `App Env Vars`, Bitrise CLI exposed env vars).
* And finally, in step input values, you can use all other environment variables, including the workflow's environment variables, as well as the outputs of steps which run before the specific step.

### Environment variables of chained workflows

Once an environment variable of a workflow is processed and made available, it is available everywhere else during the build. This means that other workflows of the chain **can** use the environment variables of a workflow which is performed **before** the specific workflow, similar to Step outputs, which are available for every other step **after** the step (which generates the outputs) completes.

You can find more information about environment variable availability of Workflow env vars in chained workflows in the [Workflows: Note about workflow environment variables](/bitrise-cli/workflows/#note-about-workflow-environment-variables) documentation.