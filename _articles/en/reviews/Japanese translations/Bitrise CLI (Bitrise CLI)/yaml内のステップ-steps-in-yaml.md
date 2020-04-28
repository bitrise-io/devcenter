---
changelog:
published_at:
last_modified_at:
tag: []
title: YAML内のステップ (Steps in YAML)
redirect_from: []
description: ''
published: false

---
## ステップとは何ですか？

ステップ (Step) とは"ビルドタスク"をカプセル化します: タスクを実行するコードやタスク用に定義が可能なインプット/パラメータ、タスクが生成するアウトプットなどがあります。

例えば、`Git Clone` (id: `git-clone`) ステップは指定したレポジトリの"git clone"を行います。(branch, tag, cloneへのコミット、cloneが発生すべきローカルパスなど) ご自身 (またはシステム)が指定したインプットを使って行われます。

技術的な側面からのステップとは、ステップのコードならびにステップのinterface定義を含む、semver**バージョン化された**レポジトリになります。

Step interface definition (`step.yml`) にはステップの依存性やインプット・アウトプット、ステップのタイトルや説明文のような情報が詰め込まれています。また、issue trackerやsupport URLといった他プロパティや、ステップの実行やスキップを行う際に定義をしたり、ビルド失敗時に失敗ステップにマークをするようなフィルタープロパティも含まれています。

構成の側面から、Bitrise Stepについて知っておく必要があるのは、ご自身のビルド構成 (`bitrise.yml`)にBitriseステップを含める方法とそれを構成する方法の2つになります。

ステップを含めるには、`steps:`ワークフローのリスト内にある[Step reference ID](#step-referenceid-format)を使って参照する必要があります。

一例として、単一の`script`ステップを使うと、`bitrise run test`を実行する時にそのステップが開始されます：

    format_version: 1.3.1
    default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    
    workflows:
      test:
        steps:
        - script:

{% include message_box.html type="note" title="利用可能なステップの一覧 (Step IDs)" content="

利用可能なステップの一覧は`bitrise step-list`を実行させるとメインのBitrise StepLib (ステップライブラリ)内で表示されるほか、[メインのBitrise StepLibレポジトリ](https://github.com/bitrise-io/bitrise-steplib/tree/master/steps)からでも確認できます。"%}

ビルド構成 (`bitrise.yml`) でステップを含めることができたら、そのステップ用に構成を指定することができます。一般的には、ここでステップのインプットへ値の指定を行います。ステップの`inputs:`list propertyを使用したり、インプットのkeyとvalueを定義することにより実行できます。

例えば、`script`ステップ用に簡単なスクリプトの実行を指定するには、`script`ステップの`content`インプット用に値を指定します。 _(メモ：_`bitrise step-info STEP-ID`_を使って全てのステップインプットをリスト化することができます)_

`script`ステップを使って簡単な"Hello World"スクリプトを試してみましょう：

    format_version: 1.3.1
    default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    
    workflows:
      test:
        steps:
        - script@1.1.3:
            inputs:
            - content: "echo 'Hello World!'"

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

ステップに必要なインプットがない場合は、インプットを指定する必要はありません。でももちろん、必要な分だけインプット用に値を指定することが可能です。

例えば、`script`ステップはBashだけでなくRubyスクリプトも実行することができます。これを行うには、`content`インプット内のスクリプトを指定することに加えて、"runner"インプットの指定も必要です：

    format_version: 1.3.1
    default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
    
    workflows:
      test:
        steps:
        - script@1.1.3:
            inputs:
            - content: "puts 'Hello Ruby!'"
            - runner_bin: ruby

ステップのインプット値は常に**文字列 (string)** / テキスト (text) 値で、インプットのID/keyと値は環境変数 ([詳しい情報はこちらから](/bitrise-cli/most-important-concepts/#全てのインプット、アウトプット、パラメータは環境変数です)) としてステップに渡されます。また、標準的なYAML multi line フォーマットを使うと、値は複数行にも対応します。複数行のBashスクリプトの例:

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

{% include message_box.html type="important" title="YAMLのインデント" content="YAMLでのインデント (字下げ) はとても重要です！2スペースのインデントを使用する必要があり、タブを使ってのインデントはできません！

上記の例のように、複数行の値を使用する場合、キーと比較して、2スペースを用いた値のインデントを行ってください。"%}

インプットのみならず、ステップの他プロパティを変更することもできます。例えば、前回のステップが失敗したにも関わらずそのステップを”強制的”に実行したい場合、`is_always_run`プロパティを`true`にセットすることで可能になります：

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

ステップ用に、より記述的なタイトルを指定したい場合、`title`プロパティを使用します：

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

### bitrise.ymlで定義するステップデータはdiffです！

上記の例から気づかれた方もいるかもしれませんが、`bitrise.yml`で指定するステップデータや情報は、**ご自身が変更** / 上書き**を行いたい**ステップのパラメータになります。

インプットや他のステッププロパティを指定せず、ステップ (reference/iD) のみを指定する場合、 (そのステップの開発者により設定された)デフォルト値を使用して実行されるようになっています。

You could also think about this as a `diff`. The step defines values for the step interface properties, and in the `bitrise.yml` you define a `diff`, the things you want to change and the values to change to.

これを`diff`として考えることもできます。ステップが step interface properties用に値を定義して、ご自身で`diff`、変更を行いたいもの、そして変更する値を`bitrise.yml`内で定義します。

では例を見ていきましょう：

        - script@1.1.3:
            title: Print Hello Ruby
            is_always_run: true
            inputs:
            - content: "puts 'Hello Ruby!'"
            - runner_bin: ruby

The `- script@1.1.3:` line selects the step, and the properties you define after this (with an indentation!) are the things you want to overwrite.

`- script@1.1.3:`行はステップを選択します。(インデントを使用して)この行の後に定義したプロパティは、ご自身が上書きを行いたいものとなっています。

To see the step's raw interface definition you can check it in the step library. In these examples we always use the [main Bitrise StepLib](https://github.com/bitrise-io/bitrise-steplib). The step interface definitions can be found in the StepLib's [steps directory](https://github.com/bitrise-io/bitrise-steplib/tree/master/steps).

ステップのRaw Interface定義を見るには、ステップライブラリを確認します。このような例では、常に[main Bitrise StepLib](https://github.com/bitrise-io/bitrise-steplib)を使用します。Step interface定義はStepLibの[steps directory](https://github.com/bitrise-io/bitrise-steplib/tree/master/steps)で見つけることができます。

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