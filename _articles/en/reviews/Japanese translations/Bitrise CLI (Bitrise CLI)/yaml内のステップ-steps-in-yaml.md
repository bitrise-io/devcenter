---
tag: []
title: YAML内のステップ (Steps in YAML)
redirect_from: []
summary: ''
published: false

---
## What is a Step ステップとは何ですか？

A Step encapsulates a "build task": the code to perform that task, the inputs/parameters you can define for the task, and the outputs the task generates.

ステップ (Step) は"ビルドタスク"をカプセル化します: タスクを実行するコードやタスク用に定義が可能なインプット/パラメータ、タスクが生成するアウトプットなどがあります。

For example the `Git Clone` (id: `git-clone`) step performs a "git clone" of the specified repository, with the inputs you (or the system) specify (e.g. the branch, tag or commit to clone, the local path where the clone should happen, etc.).

例えば、`Git Clone` (id: `git-clone`) ステップは指定のレポジトリの"git clone"を行います。これはブランチやタグ、cloneへのコミット、cloneが発生すべきローカルパスなど、ご自身またはシステムが指定したインプットを使って行われます。

From a technical perspective a Step is a semver **versioned** repository which includes the _code_ of the Step and the _interface_ definition of the Step.

技術的な側面から申し上げると、ステップとはステップのコードならびにステップのインターフェース定義を含むsemverバージョンレポジトリになります。

The _step interface definition_ (`step.yml`) includes information like the dependencies of the step, the inputs and outputs of the step, the title and description of the step; and other properties like the issue tracker / support URL, or the filter properties which define when the step should be performed or skipped and whether a failed step should mark the build as failed.

ステップインターフェース定義 (`step.yml`)にはステップの依存性やインプット・アウトプット、ステップのタイトルと説明のような情報が詰め込まれています。また、issue trackerやsupport URLといった他プロパティ、ステップの実行やスキップする際に定義をしたりビルド失敗時に失敗ステップにマークをするフィルタープロパティも含まれています。

From a configuration perspective all you have to know about Bitrise Steps is how you can include and configure them in your build configuration (`bitrise.yml`).

構成の側面から申し上げると、ご自身のビルド構成 (`bitrise.yml`)にBitriseステップを含める方法や構成する方法を知っておく必要があります。

To include a Step you have to reference it by a [Step reference ID](#step-referenceid-format) in the `steps:` list of a Workflow.

ステップを含めるには`steps:`のワークフローのリスト内の[Step reference ID](#step-referenceid-format)を使って照会する必要があります。

An example, with a single `script` step, which will be executed when you run `bitrise run test`:

例えば、単一の`script`ステップを使うと、`bitrise run test`を実行する時にそのステップが開始されます：

    format_version: 1.3.1
    default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    
    workflows:
      test:
        steps:
        - script:

{% include message_box.html type="note" title="List of available steps (step IDs)　利用可能なステップの一覧" content="

You can list all the available steps in the main Bitrise StepLib by running `bitrise step-list`, or by checking [the main Bitrise Steplib repository](https://github.com/bitrise-io/bitrise-steplib/tree/master/steps).

全ての利用可能なステップの一覧は`bitrise step-list`を実行させるとメインのBitrise StepLib (ステップライブラリ)内で表示されるほか、[メインのBitrise StepLibレポジトリ](https://github.com/bitrise-io/bitrise-steplib/tree/master/steps)からも確認できます。"%}

Once you include a step in your build configuration (`bitrise.yml`), you can specify configurations for the step. The most common thing you'll do is to specify values for the step's inputs. You can do this with the `inputs:` list property of the step, defining the _key_ of the input and the _value_ you want to set.

ビルド構成 (`bitrise.yml`) でステップを含めることができたら、ステップ用の構成を指定することができます。ここで一般的には、ステップのインプットへ値の指定を行います。ステップの`inputs:`リストプロパティ、インプットのキー、設定を施したい値を定義することにより実行できます。

For example, to specify a simple script to perform for the `script` step, you can specify a value for the `script` step's `content` input. (_Note: you can list all the inputs of a step with_ `bitrise step-info STEP-ID`)

例えば、`script`ステップ用に簡単なスクリプトの実行を指定するには、`script`ステップの`content`インプット用に値を指定します。 (メモ：`bitrise step-info STEP-ID`を使って全てのステップインプットをリスト化することができます)

Let's do a simple "Hello World" script, using the `script` step:

`script`ステップを使って簡単な"Hello World"スクリプトを試してみましょう：

    format_version: 1.3.1
    default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    
    workflows:
      test:
        steps:
        - script@1.1.3:
            inputs:
            - content: "echo 'Hello World!'"

When you run the `test` workflow of this configuration with `bitrise run test` you'll now see that the `script` step prints the text `Hello World` in its log:

`bitrise run test`を用いてこの構成の`test`ワークフローを実行する際、ログ内の`Hello World`のテキストが`script`に印字されていることが確認できます。

    +------------------------------------------------------------------------------+
    | (0) script@1.1.3                                                             |
    +------------------------------------------------------------------------------+
    | id: script                                                                   |
    | version: 1.1.3                                                               |
    | collection: https://github.com/bitrise-io/bitrise-steplib.git                |
    | toolkit: bash                                                                |
    | time: 2016-12-07T17:05:17+01:00                                              |
    +------------------------------------------------------------------------------+
    |                                                                              |
    Hello World!
    |                                                                              |
    +---+---------------------------------------------------------------+----------+
    | ✓ | script@1.1.3                                                  | 0.30 sec |
    +---+---------------------------------------------------------------+----------+

If the step doesn't have any required inputs you don't have to specify an input, and of course you can specify values for as many inputs as you want to.

インプットを指定する必要がないステップの場合、必要なだけのインプット用に値を指定することが可能です。

For example the `script` step can run Ruby scripts too, not just Bash scripts. To do this, in addition to specifying the script in the `content` input you also have to specify the "runner" input:

例えば、`script`ステップはBashだけでなくRubyスクリプトも実行することができます。これを行うには、`content`インプット内のスクリプトを指定することに加えて"runner"インプットの指定もする必要があります：

    format_version: 1.3.1
    default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    
    workflows:
      test:
        steps:
        - script@1.1.3:
            inputs:
            - content: "puts 'Hello Ruby!'"
            - runner_bin: ruby

Step input values are always **string** / text values, as the input id/key and the value are passed to the step as environment variables ([more information](/bitrise-cli/most-important-concepts/#全てのインプット、アウトプット、パラメータは環境変数です)), and the value can be multi line too, using the standard YAML multi line format. An example multi line Bash script:

ステップのインプット地は常に文字列 (string) / テキストであり、インプットのID/キーと値は環境変数 ([詳しい情報](/jp/bitrise-cli/most-important-concepts/#全てのインプット、アウトプット、パラメータは環境変数です)) としてステップに渡されます。また、標準的なYAML multi line フォーマットを使うと、値は複数行でも対応します。複数行のBashスクリプトの例:

    format_version: 1.3.1
    default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    
    workflows:
      test:
        steps:
        - script@1.1.3:
            inputs:
            - content: |
                #!/bin/bash
                set -ex
                var_to_print='Hello World!'
                echo "${var_to_print}"

{% include message_box.html type="important" title="Indentation in YAML YAMLのインデント" content="Indentation in the YAML format is very important! You should use two-spaces indentation, and you can't use tabs to indent!

If you use a multi line value, like the one above, it's important that you have to _indent the value with two spaces_, compared to the key!

YAMLでのインデント (字下げ) はとても重要です！2スペースのインデントを使用する必要があり、タブを使ってのインデントはできません！

上記の例のように、複数のライン値を使用する場合、キーと比較して2つのスペースを用いた値のインデントを行ってください。"%}

You can change other properties of the step too, not just the inputs. For example, if you want to "force" run the step even if a previous step fails, you can set the `is_always_run` property to `true`:

インプットのみならず、ステップの他プロパティを変更することもできます。例えば、前回のステップが失敗したにも関わらずそのステップを”強制的”に実行したい場合、`is_always_run`プロパティを`true`にセットすることで可能になります。

    format_version: 1.3.1
    default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    
    workflows:
      test:
        steps:
        - script@1.1.3:
            is_always_run: true
            inputs:
            - content: "puts 'Hello Ruby!'"
            - runner_bin: ruby

or if you want to specify a better, more descriptive title for the step, you can use the `title` property:

ステップ用にベターでより叙述的なタイトルを指定したい場合、`title`プロパティを使用します：

    format_version: 1.3.1
    default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    
    workflows:
      test:
        steps:
        - script@1.1.3:
            title: Print Hello Ruby
            is_always_run: true
            inputs:
            - content: "puts 'Hello Ruby!'"
            - runner_bin: ruby

### The Step data you define in bitrise.yml - your diff!　bitrise.ymlで定義するステップデータはdiffです！

You might already suspect it after the examples above: the step data / infos you specify in the `bitrise.yml` are the parameters of the step **you want to change** / overwrite.

上記の例から気づかれた方もいるかもしれませんが、`bitrise.yml`で指定するステップデータ / 情報は、ご自身が変更 / 上書きを行いたいステップのパラメータになります。

If you don't specify any input or other step property, only the step (reference/iD), that means that the step should run with the default values (defined by the step's developer).

インプットや他のステッププロパティを指定しない場合、ステップ (reference/iD) のみが (そのステップの開発者により設定された) デフォルト値を使用して実行されるようになっています。

You could also think about this as a `diff`. The step defines values for the step interface properties, and in the `bitrise.yml` you define a `diff`, the things you want to change and the values to change to.

これを`diff`として考えることも可能です。ステップは、step interface properties用に値を定義し、`bitrise.yml`内では`diff`を定義します。`diff`とはご自身による変更、または値が

Let's go through the example above:

では例を見ていきましょう：

        - script@1.1.3:
            title: Print Hello Ruby
            is_always_run: true
            inputs:
            - content: "puts 'Hello Ruby!'"
            - runner_bin: ruby

The `- script@1.1.3:` line selects the step, and the properties you define after this (with an indentation!) are the things you want to overwrite.

`- script@1.1.3:`の行はステップを選択し、この後に (インデントを使用して) 定義するプロパティは、上書きの必要があれば行ってください。

To see the step's raw interface definition you can check it in the step library. In these examples we always use the [main Bitrise StepLib](https://github.com/bitrise-io/bitrise-steplib). The step interface definitions can be found in the StepLib's [steps directory](https://github.com/bitrise-io/bitrise-steplib/tree/master/steps).

ステップのRaw Interface定義を見るには、ステップライブラリを確認します。このような例は、常に[main Bitrise StepLib](https://github.com/bitrise-io/bitrise-steplib)を参照してください。

The [step.yml file in this directory is the step's interface definition](https://github.com/bitrise-io/bitrise-steplib/blob/master/steps/script/1.1.3/step.yml).

[このディレクトリ内のstep.ymlはステップのインターフェース定義となります。]()

You can see all the properties defined for this version of the step. Now, if you check our example above, all we did is to change the `title` property (from `Script` to `Print Hello Ruby`), the `is_always_run` property (from `false` to `true`) and two inputs of the step, `content` (from a default, example script content) and `runner_bin` (from `/bin/bash` to `ruby`).

ステップのバージョン用に定義された全てのプロパティを見ることができます。今までの例ではこのような変更が施されました：`title`プロパティ (`Script`から`Print Hello Ruby`) 、`is_always_run`プロパティ (`false`から`true`) 、２つのステップインプットである`content` (デフォルトからscript contentの例) と `runner_bin` (`/bin/bash`から`ruby`)

All other properties you can see in the step version's `step.yml` will be read from the `step.yml`, you don't have to define those. You only have to define **the things you want to change**, compared to the values specified for the step in the step's interface definition (`step.yml`).

ステップバージョンの`step.yml`で確認ができる全ての他のプロパティは`step.yml`から読み取られるので定義する必要はありません。ステップのインターフェース定義 (`step.yml`)内のステップ用に値を指定するのと比較して、**変更したい場合のみそれらを**定義する必要があります。

## Step reference/ID format

A step reference from the example `bitrise.yml` above:

上記の`bitrise.yml`の例よりStep reference (ステップリファレンス)は：

    - script@1.1.3:

1. the StepLib source
2. the Step ID
3. the Step Version

Step reference format: `- StepLibSource::StepID@StepVersion:`

Step referenceフォーマット: `- StepLibSource::StepID@StepVersion:`

**From the three components only Step ID is required (for example,**`script`**).** This example item could alternatively be written as `-`[`https://github.com/bitrise-io/bitrise-steplib.git::script@1.1.3:`](https://github.com/bitrise-io/bitrise-steplib.git::script@1.1.3: "https://github.com/bitrise-io/bitrise-steplib.git::script@1.1.3:"), to include all three components of the step reference.

上記の３つの要素のうちStep IDのみが必要になります (例: `script`) 。step referenceの３つの要素全てを含ませるために`-`[`https://github.com/bitrise-io/bitrise-steplib.git::script@1.1.3:`](https://github.com/bitrise-io/bitrise-steplib.git::script@1.1.3: "https://github.com/bitrise-io/bitrise-steplib.git::script@1.1.3:")のように、この例で書かれることができます。

If the Version is not defined, the latest version of the step will be used.

If the StepLib Source is not defined, the `default_step_lib_source` will be used.

Versionが定義されていない場合、ステップの最新のバージョンが使用されます。

StepLibが定義されていない場合、`default_step_lib_source`が使用されます。

So, if `default_step_lib_source` is set to [`https://github.com/bitrise-io/bitrise-steplib.git`](https://github.com/bitrise-io/bitrise-steplib.git "https://github.com/bitrise-io/bitrise-steplib.git"), and the latest version of the Script step is `1.1.3`, all the following references will mean the exact same thing:

以上より、???が[`https://github.com/bitrise-io/bitrise-steplib.git`](https://github.com/bitrise-io/bitrise-steplib.git "https://github.com/bitrise-io/bitrise-steplib.git"),にセットされScriptステップの最新バージョンが`1.1.3`である場合、以下のリファレンスの意味は全て同じになります：

* `-`[`https://github.com/bitrise-io/bitrise-steplib.git::script@1.1.3:`](https://github.com/bitrise-io/bitrise-steplib.git::script@1.1.3: "https://github.com/bitrise-io/bitrise-steplib.git::script@1.1.3:")
* `- script@1.1.3:`
* `-`[`https://github.com/bitrise-io/bitrise-steplib.git::script:`](https://github.com/bitrise-io/bitrise-steplib.git::script: "https://github.com/bitrise-io/bitrise-steplib.git::script:")
* `- script:`

But, if a new version of the `script` step is released (e.g. `2.0.0`) and you don't include the `@1.1.3` version reference component, new builds will use the "latest version at the time". For this reason, it's usually a good idea to specify the version of the step, so that your build does not break accidentally when a breaking change is introduced in a new version of the step.

ただ、`script`ステップの最新バージョンがリリースされ (例 `2.0.0`)、`@1.1.3`バージョンリファレンス要素を含めていない場合、新しく実行されるビルドでは、その時点での最新バージョンが使用されます。この理由としては、ステップのバージョンを指定するのはたいてい重要なので、ステップの新バージョンに重大な変化が導入された時に誤ってビルドが壊れることはありません。

### Special step sources　特別なステップソース

There are two special step sources:

2つの特別なステップソースが存在します：

* `git::`
* `path::`

When you use one of these sources, the step won't be identified through a Step Library, but through the ID data you specify.

これらのソースの一つを使用する際、ステップはStep Library経由ではなく、ご自身で指定したIDデータ経由で認証されます。

For example, the `script` step's github is at: [`https://github.com/bitrise-io/steps-script`](https://github.com/bitrise-io/steps-script "https://github.com/bitrise-io/steps-script"). To reference the `script` step directly through a git reference, you can use the `git::` source, the step's git clone URL, and the branch or tag in the repository.

例えば、`script`ステップのGitHubは[`https://github.com/bitrise-io/steps-script`](https://github.com/bitrise-io/steps-script "https://github.com/bitrise-io/steps-script")にあります。git reference経由で`script`ステップを直接参照するには、ステップのsit clone URLである`git::`ソース、そしてレポジトリ内のbranchまたはtagを使用することが可能です。

Example, to reference the `1.1.3` version tag of the script step's repository:

scriptステップのレポジトリの`1.1.3` version tagを参照するには：

    - git::https://github.com/bitrise-io/steps-script.git@1.1.3:

In general, **whenever you can use a step version through a Step Library, you should do that**, instead of using the `git::` source type, because features like _local step caching_ or _network caching_ / alternative download URLs are only supported for steps shared in a StepLib.

一般的に、Step Library経由でステップバージョンを使用できる際は、`git::`ソースタイプを使用する代わりに、これを行うことを推奨します。理由としてはlocal step cachingやnetwork caching / alternative download URLsはStepLib内で共有されているステップのみにサポートされているからです。

But this type of referencing allows certain things you can't get through a StepLib. For example the `git::` source type can be used for not-yet-published or work-in-progress states of a step. If you [develop your own Step](/bitrise-cli/create-your-own-step/) you can use this `git::` source type to test your step _before you would publish it_ in a StepLib.

このタイプの参照方法はStepLib経由で入手することができない特定のものを許可します。例えば、`git::`ソースタイプは未公開または作業中状態のステップに使うことができます。独自のステップを開発している場合、StepLibで公開する前にこの`git::`ソースタイプを使ってステップのテストを行うことができます。

Example:

例：

    - git::https://github.com/bitrise-io/steps-script.git@BRANCH-OR-TAG:

`BRANCH-OR-TAG` of course have to be a branch or tag which does exist in the step's repository. For example, if you develop your own Step and you work on a `soon-to-be-released` branch, you can use that state of the step with:

`BRANCH-OR-TAG`はステップのレポジトリ内で存在するbranchまたはtagになる必要があります。例えば、独自のステップを開発していて`soon-to-be-released`のbranchで作業をしている場合、ステップの状態を以下のコードを使って使用する事ができます：

    - git::https://github.com/bitrise-io/steps-script.git@soon-to-be-released:

The second special source is `path::`, which works in a similar way, except for **local paths**, and it requires no version information.

A good example for this is, again, when you create and work on your own Step, you can run the state of the Step (step's code) directly on your Mac/PC, without even pushing it to the step's repository.

2つ目の特別なソースは`path::`であり、これまでと同じように機能します (local pathsを除く)。そしてこれはバージョン情報を必要としません。

いい例としては、独自のステップを作成している時、ステップのレポジトリにプッシュする必要がなく、直接ご自身のMac/PCでステップ状態 (ステップコード) を実行することができます。

Both absolute and relative (relative to the `bitrise.yml`!) local paths are supported, so you can:

absoluteとrelative (`bitrise.yml`に関連しています) のlocal pathsの両方がサポートされているので、

    - path::/path/to/my/step:

as well as:

ができるだけでなく：

    - path::./relative/path:

During step development it's a best practice to have a `bitrise.yml` directly in the step's repository, for unit and ad hoc testing. In this case _the current directory is the step directory_, and the step can be referenced with:

ステップの開発中、unitテストとad hocテスト用にステップのレポジトリに直接`bitrise.yml`を保持するのはベストプラクティスです。このケースではcurrent directoryはstep directoryで、そのステップは：

    - path::./:

を使って参照されます。

_This can also be used if you want to include your build steps in your app's source code._ For example if you store the `script` step's code in your source code repository, under the `steps/script` directory, you can run the version included in your source code repository with:

アプリのソースコードにビルドステップを含ませたい場合も使用する事ができます。例えば、`steps/script`ディレクトリ下にある、ご自身のソースコードレポジトリに`script`ステップコードを保管する場合：

    - path::./steps/script:

を使ってソースコードレポジトリ内に含まれているバージョンを実行する事ができます。