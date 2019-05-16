---
title: 最重要コンセプト (Most important concepts)
redirect_from: []
published: false

---
## Every input, output and parameter is an Environment Variable

全てのインプット、アウトプット、パラメータは環境変数

Every step input, step output, secret environment variable, app environment variable and workflow environment variable (basically every input and variable in your build config) is an environment variable.

全てのステップのインプット、アウトプット、秘密環境変数、アプリ環境変数、そしてワークフロー環境変数（基本的にビルド構成内の全てのインプットと変数）は環境変数です。

There's nothing special about how Bitrise handles environment variables, **these are regular environment variable, with the same rules and restrictions as any other environment variable.**

Bitriseが環境変数を操作する方法については特別なことではありませんが、それらは他の環境変数と同じで同等のルールや制限に基づいた、規則的な環境変数です。

To highlight a couple of technical details:

技術的な詳細を複数紹介します：

### The value of an Environment Variable can only be a String

環境変数の値は文字列のみ

Environment Variables can only hold `String` values. Even if you set a number or bool, like `1` or `true` as the value of the Environment Variable, that will be a string.

環境変数は`String`値のみを保持することができます。`1`や`true`のような環境変数値といった数字やBoolを設定しても、それは文字列になります。

### Parent process can't access  Environment Variables exposed by child processes

親プロセスが子プロセスによってエクスポーズされた環境変数にアクセスができない

Parent process(es) can't access Environment Variables exposed by child processes.

親プロセスは子プロセスによってエクスポーズされた環境変数にアクセスすることはできません。

For example, if you run a `my_bash_script.sh` in your Terminal with `bash my_bash_script.sh`, and `my_bash_script.sh` sets an environment variable with `export MY_VAR=the-value`, you won't be able to access `MY_VAR` in your Terminal after the script is finished, `MY_VAR` will only be available in `my_bash_script.sh` **and** in the processes / scripts started by `my_bash_script.sh`.

例えば、`bash my_bash_script.h`を使ってご自身のターミナル内で `my_bash_script.sh` を実行し、 `export MY_VAR=the-value`を伴って `my_bash_script.sh`が環境変数を設定する場合、スクリプトが完了した後、ターミナル内の`MY_VAR` にアクセスすることはできません。`MY_VAR` は `my_bash_script.sh` と`my_bash_script.sh`によって開始されたプロセス・スクリプトでのみ利用可能です。

_I_n terms of Bitrise CLI this means that if you `export MY_VAR=...` in a Script step, `MY_VAR` won't be available in subsequent steps. This is true for the steps too, regardless of which language the step is written in.

Bitrise CLIに関して言えば、これはもしスクリプトステップ内で `export MY_VAR=...` すれば、 `MY_VAR`は連続したステップで利用不可になります。ステップが書かれた言語の種類にかかわらず、他のステップにおいてもこれは同じです。

Bitrise CLI includes a mechanism for exposing environment variables from Steps so that subsequent Steps can also access it, through the Bitrise CLI tool called [envman](https://github.com/bitrise-io/envman).

Bitrise CLIにはステップから環境変数をエクスポーズするためのメカニズムを含んでいるので、その後のステップは、Bitrise CLIツールのenvmanを通じてアクセスすることができます。

To set an environment variable in your script or in your step to make that available in other steps too, you have to do that through `envman`.

他のステップでも、ご自身のスクリプトやステップ内の環境変数を利用可能な状態に設定するには、`envman` 経由で行ってください。

A simple example:

シンプルな例：

    envman add --key MY_TEST_ENV_KEY --value 'test value for test key'

You can find more examples in [envman's README](https://github.com/bitrise-io/envman), and in the [Expose an Environment Variable and use it in another Step](/tips-and-tricks/expose-environment-variable) guide.

もっと例を見るには[envman's README](https://github.com/bitrise-io/envman)や[Expose an Environment Variable and use it in another Step](/tips-and-tricks/expose-environment-variable)ガイドを参照してください。

## Availability order of environment variables

環境変数の利用できる順番

Environment variables are available **after** the environment variable is "processed".

環境変数は、その環境変数が”処理された”後に利用可能になります。

There are a few environment variables [exposed by the Bitrise CLI itself](/faq/available-environment-variables/#exposed-by-the-bitrise-cli), those are available from the start (e.g. `BITRISE_SOURCE_DIR` and `BITRISE_TRIGGERED_WORKFLOW_ID`).

Bitrise CLI自体によってエクスポーズされた環境変数がいくつかあり、それらは開始時点から利用可能です（例：`BITRISE_SOURCE_DIR` や`BITRISE_TRIGGERED_WORKFLOW_ID`）

All other environment variables are "processed" / made available _as the build progresses._

全ての他の環境変数は、ビルド過程として”処理された”または利用可能な状態になります。

There are two types of environment variables which are processed and made available before the workflow would be executed: [Secrets](/bitrise-cli/secrets/) and `App Env Vars` (`app: envs:` in the [bitrise.yml](/bitrise-cli/basics-of-bitrise-yml/)).

ワークフローが実行されるであろう前に処理され利用可能な状態になる環境変数の種類が２つあります：Secretsと`App Env Var` （`app: envs:`はbitrise.yml内にあります）

After these, the processing of the specified Workflow starts, and the [environment variables specified for that Workflow](/bitrise-cli/workflows/#define-workflow-specific-parameters-environment-variables) are made available. If the workflow has before or after workflows, when a specific workflow is processed (right before the first step of the workflow would run) the workflow's environment variables are processed and made available.

これらの後に、指定されたワークフローの処理が開始され、ワークフローで指定された環境変数が利用可能な状態になります。そのワークフローの前や後にワークフローがある場合で、指定されたワークフローが処理される時（ワークフローの最初のステップの直前に実行する）、そのワークフローの環境変数は処理され利用可能な状態になります。

Step inputs are also environment variables; those are exposed only for the specific step, and right before the Step would start.

ステップのインプットも環境変数です；指定のステップとステップが開始されるであろう直前にのみエクスポーズされます。

Last but not least Step outputs are exposed by the specific step, so those are available for subsequent steps **after the Step finishes**.

最後になりましたが、ステップのアウトプットは指定のステップによってエクスポーズされるので、ステップが終了する後に、その後のステップが利用可能になります。

**The environment variable processing order:**

環境変数が処理される順番：

1. [Bitrise CLI exposed environment variables](/builds/available-environment-variables/#exposed-by-the-bitrise-cli)  
   環境変数がエクスポーズされたBitrise CLI
2. [Secrets](/bitrise-cli/secrets/)  
   シークレット
3. One-off environment variables specified for the build through the [Build Trigger API](/api/build-trigger)  
   Build Trigger API経由のビルドに指定された一度限りの環境変数
4. `App Env Vars` (`app: envs:` in the [bitrise.yml](/bitrise-cli/basics-of-bitrise-yml/))  
   `App Env Vars` (bitrise.yml内の`app: envs:`)
5. [Workflow environment variables](/bitrise-cli/workflows/#define-workflow-specific-parameters-environment-variables)  
   ワークフロー環境変数
6. Step inputs  
   ステップのインプット
7. Step outputs

   ステップのアウトプット

**So, why does the processing order matter?**

なぜ処理する順番は重要なのですか？

An environment variable is only available **after** it is processed and made available. **When you reference or use an environment variable, you can only reference/use those which are already processed!**

環境変数は処理された後のみにおいて利用可能になります。環境変数を引用または使用するときは、それが既に処理されている場合でのみ引用・使用することができます！

A couple of examples:  
いくつかの例：

* In the value of a `Secret` environment variable, you can use environment variables exposed by Bitrise CLI, but you can't use any other environment variable (App Env Vars, Workflow Env Vars, ...), as those are not processed when secrets are processed.
* `Secret`環境変数の値に関しては、Bitrise CLIによってエクスポーズされた環境変数を使用することができますが、その他の環境変数（App Env VarsやWorkflow Env Varsなど）は、シークレットが処理されているときに処理されていないので使うことはできません。
* In the value of an `App Env Var`, you can use environment variables from `Secrets` as well as the Bitrise CLI exposed ones, but you can't use Workflow Env Vars, nor Step inputs.
* `App Env Var`の値に関しては、Bitrise CLIにエクスポーズされた環境変数と同様に`Secrets`からの環境変数も使うことは可能ですが、ワークフロー環境変数やステップのインプットを使用することはできません。
* In a `Workflow environment variable` you can use all the above (`Secrets`, `App Env Vars`, Bitrise CLI exposed env vars).
* `Workflow environment variable`では全ての上記の環境変数を使用することができます（`Secrets`、`App Env Vars`、Bitrise CLIがエクスポーズした環境変数）。
* And finally, in step input values, you can use all other environment variables, including the workflow's environment variables, as well as the outputs of steps which run before the specific step.
* 最終的に、ステップインプット値はワークフローの環境変数を含む、全ての他の環境変数を使うことができ、それと同様に、指定のステップ以前に実行されたステップのアウトプットも使用可能です。

### Environment variables of chained workflows  
連鎖式ワークフローの環境変数

Once an environment variable of a workflow is processed and made available, it is available everywhere else during the build. This means that other workflows of the chain **can** use the environment variables of a workflow which is performed **before** the specific workflow, similar to Step outputs, which are available for every other step **after** the step (which generates the outputs) completes.

いったんワークフローの環境変数が処理され利用可能な状態になれば、その環境変数はビルド実行中どこででも利用可能になります。これは、連鎖している他のワークフローが指定されたワークフローの前に実行されたワークフローの環境変数を使用することができるという意味です。またこれはステップアウトプットに類似しており、（アウトプットを生成する）ステップが完了する後どの他のステップでも利用可能になります。

You can find more information about environment variable availability of Workflow env vars in chained workflows in the [Workflows: Note about workflow environment variables](/bitrise-cli/workflows/#note-about-workflow-environment-variables) documentation.

[Workflows: Note about workflow environment variables](/bitrise-cli/workflows/#note-about-workflow-environment-variables)のドキュメンテーションにて連鎖式ワークフロー内のワークフロー環境変数の環境変数可用性についての詳細な情報を確認できます。