---
tag: []
title: 独自のStepを作成・シェアする (Creating and sharing your own Step)
redirect_from: []
summary: ''
published: false

---
Creating your own Step is as simple as running a `bitrise` CLI (v1.6.1+) command and following the guide it prints. You can generate Steps using either the Bash or Go toolkits.

独自のStepを作成するには、`bitrise` CLI (v1.6.1以上) を用意する必要があります。BashまたはGoツールキットを使用してStepを生成することができます。

If you don't have the Bitrise CLI installed, check the installation guide [here](/bitrise-cli/installation/).

Bitrise CLIが未インストールの場合、[ここ](/bitrise-cli/installation/)でインストールガイドを確認してください。

{% include message_box.html type="important" title="Use the latest Bitrise CLI!最新のBitrise CLIを使用してください" content=" Make sure you have the latest version of the Bitrise CLI, or at the very least, you have version 1.6.1 or higher. Call `bitrise --version` to check your Bitrise CLI version. This is important because the CLI uses the `:step` plugin to create Steps and this plugin was introduced as a core plugin in v1.6.1.

最新のBitrise CLI、もしくは最低でもバージョン1.6.1以上のCLIであることに注意してください。`bitrise --version`を呼び出してBitrise CLIバージョン情報を確認することができます。これはCLIがStepを作成するのに`:step`プラグインを使用するのが理由で、このプラグインはコアプラグインとしてバージョン1.6.1から導入されています。"%}

## Creating the Step　Stepの作成

Once the Bitrise CLI is installed, create your own Step with three simple commands.

Bitrise CLIのインストールが完了すれば、3つの簡単なコマンドを使って自己流のStepを作成することができます。

    # If this is the very first time you use the CLI / if you just installed the CLI run this:
    bitrise setup
    
    # If you want to update the Step plugin to the latest version:
    bitrise plugin update step
    
    # And to generate a new Step, simply run this command and follow the guide it prints:
    bitrise :step create

Running `bitrise :step` without any commands will print the plugin's help.

コマンド無しで`bitrise :step`を動作させると、プラグインのヘルプをプリントします。

Once you are done, you should have a `step.yml` and, depending on whether you chose Go or Bash, a `main.go` or a `step.sh` file in your new Step's repository.

完了すれば、`step.yml`と`main.go` (Goの場合) か`step.sh` (Bashの場合) ファイルを新規のStepレポジトリに入れます。

* The `step.yml` file is the Step interface definition, containing dependencies, Step inputs and Step outputs as well as other step properties.
* `main.go` or `step.sh` contains the actual functionality of the Step. **DO NOT CHANGE the working directory!**
* `step.yml`ファイルはStepインターフェースの定義であり、依存・Stepインプット・Stepアウトプットや他のStepのプロパティを含んでいます。
* `main.go`または`step.sh`にはStepの機能性が含まれています。ですので、**ワーキングディレクトリを変更しないでください！**

The generated Step's README describes:  
生成されたStepのREADMEは以下の説明が含まれています：

* how you can run your Step locally, before you even commit the code,
* how you can test and use your Step in any build by using [the ](/bitrise-cli/steps/#special-Step-sources)`[git::](/bitrise-cli/steps/#special-Step-sources)`[ Step reference](/bitrise-cli/steps/#special-Step-sources),
* how you can share your Step with others through the Bitrise StepLib if you wish to do so.
* ローカルでStepを動作させる方法（コードをコミットする前も含む）
* [The ](/bitrise-cli/steps/#special-Step-sources)`[git::](/bitrise-cli/steps/#special-Step-sources)`[ Step reference](/bitrise-cli/steps/#special-Step-sources) を使ってビルドを行う際にStepをテスト・使用する方法
* Bitrise StepLib (Bitrise ステップライブラリ) 経由で他者にStepをシェアする方法

{% include message_box.html type="important" title="Before proceeding with step configuration Step設定に進む前に" content=" Check out [some important concepts you must be aware of](/bitrise-cli/most-important-concepts/)! 

[知っておくべき重要ポイント](/bitrise-cli/most-important-concepts/)を確認してください！"%}

## Step development guidelines  
Step開発ガイドライン

A newly created Step is a 'skeleton': in the `step.yml` file, certain properties are assigned default values and example inputs and outputs are created to show the structure of these.

新しく作成されたStepは'Skelton'と呼ばれます：`step.yml`ファイルでは、特定のプロパティがデフォルト値で割り当てられており、インプットとアウトプットがデフォルト値の構造を示すために作成されます。

Many step properties are automatically generated - for example, when sharing the Step - while other properties should be set manually if they are required. When creating a new Step with the plugin, only the `project_type_tags` property does not get filled with some value by default but of course you can manually modify all properties in the `step.yml` file.

例えばStepをシェアする場合、多くのStepプロパティが自動的に生成されますが、必要に応じて他のプロパティを手動で設定する必要があります。プラグインを使って新規のStepを作成する時、???プロパティのみ、デフォルトではいくつかの値が不足しています。こういった場合、`step.yml`ファイル内で全てのプロパティを手動で修正することができます。

Step inputs and outputs are also Step properties. For more information, see [Step properties](/bitrise-cli/step-properties), [Step inputs](/bitrise-cli/step-inputs), [Step outputs](/bitrise-cli/step-outputs).

StepのインプットならびにアウトプットはStepプロパティでもあります。詳細については、[Step properties](/bitrise-cli/step-properties), [Step inputs](/bitrise-cli/step-inputs), [Step outputs](/bitrise-cli/step-outputs)をご覧ください。

### Naming conventions: versioning, Step ID, step inputs and outputs

* You should use [semantic versioning](https://semver.org/) (MAJOR.MINOR.PATCH) for your Step. For example, `1.2.3`.  
  Stepには[セマンティック バージョニング](https://semver.org/lang/ja/) (MAJOR.MINOR.PATCH) を使用する必要があります。例：`1.2.3`
* For Step IDs, use hyphens as separator if the ID contains multiple words. For example, `set-ios-bundle-identifier`.  
  Step IDについては、単語2つ以上を使用する場合、ハイフンを使って区切る必要があります。例：`set-ios-bundle-identifier`
* For inputs, use **lower** case [snake case](https://en.wikipedia.org/wiki/Snake_case) style input IDs. For example, `input_path`.  
  インプットについては、**小文字**で[スネークケース](https://en.wikipedia.org/wiki/Snake_case)スタイルを用いたインプットIDを使用します。例：`input_path`
* If your step input should accept a list of values, postfix the input ID with `_list` (for example, `input_path_list`). We strongly recommend using the pipe character as a separator (for example, `first value|second value`).

  Stepが値のリストを受け入れる場合、IDの最後に???を
* For outputs, use **upper** case [snake case](https://en.wikipedia.org/wiki/Snake_case) style output IDs. For example, `OUTPUT_PATH`.
* If an output should be able to provide a list of values, postfix the input ID with `_LIST` (for example, `OUTPUT_PATH_LIST`). We strongly recommend using the pipe character as a separator (for example, `first value|second value`).
* Filter out empty items! For example, `first value| |second value` should be treated exactly the same way as `first value|second value`.

### Environment variables in Steps

**Do not use Environment Variables directly in your Step's code**. Instead, expose every outside variable as an input of your Step and set the default value of that input to the Environment Variable you want to use. You can do this in the `step.yml` file. This way it's easier to test the Step and the user of the Step can easily declare these inputs, without having to scour through code for the required variable.

**Example**:

The `xcode-archive` Step generates an output Environment Variable `$BITRISE_IPA_PATH`. Create an input for this in your Step:

    inputs:
      - ipa-path: $BITRISE_IPA_PATH
        opts:
          title: "IPA path"

### Secret environment variables in Steps

You can mark Step inputs as **Sensitive** to make sure their values do not get exposed. Sensitive inputs only accept [Secrets](/bitrise-cli/secrets/) - secret environment variables - as values. This ensures they are not visible in build logs.

To mark a Step input as sensitive, use the `is_sensitive` property. It has two values: `true` and `false`.

{% include message_box.html type="important" title="The `is_expand` property" content="If you mark an input as sensitive, the `is_expand` property of the input also must be `true` (which is the default setting)!"%}

    inputs:
      - certificate_urls: $BITRISE_CERTIFICATE_URL
        opts:
          title: "Certificate URL"
          is_sensitive: true

### Submodules and dependencies

**Do not use submodules, or require any other resource downloaded on-demand in your Step**. Try to include everything required for your Step in the Step's repository. Otherwise you can run into problems if, say, the Step fails to download a resource because of a network error or some authorization problem.

In the case of submodules, you should include the content of the other repository instead of using it as a submodule of your Step's repository.

You can, however, declare dependencies that you can fetch from an OS dependency manager, such as `apt-get` or `brew`. For more information on declaring dependencies, see [Step properties](/bitrise-cli/step-properties).

If you have any questions visit our [community discussion site](https://discuss.bitrise.io/) or [contact us](https://www.bitrise.io/contact)!

**Need some inspiration for a new Step idea?** Look no further, we have a list! [This way please](https://discuss.bitrise.io/search?q=tags%3Acontrib-this-feature%20tag%3AStep) :)

## Sharing a new Step

If you wish to share your newly created Step with the wider world, that's great - and simple!

We recommend you start with the command `bitrise share`. This will print you a guide on sharing steps - all you need to do is follow! But we'll summarize the most important things here as well, if you wish to look at the process before even firing up a command line interface.

1. Make sure your Step is stored in a public git repository.
2. Fork the StepLib repository you want to have your step in. We recommend using the [The official Bitrise StepLib](https://github.com/bitrise-io/bitrise-steplib)!
3. Prepare your forked StepLib locally for sharing:

       $ bitrise share start -c https://github.com/[your-username]/bitrise-steplib.git
4. Add the step version tag to your Step's repository.
5. Add the Step to your forked StepLib repository:

       $ bitrise share create --tag [step-version-tag] --git [step-git-uri].git --stepid [step-id]
6. Optionally, perform a complete health check on your forked StepLib:

       $ bitrise audit -c https://github.com/[your-username]/bitrise-steplib.git
7. Create a Pull Request in the original StepLib repository.

And that's it, you are done! Once your PR is merged, your step will be available to everyone who uses the StepLib repository you chose.

<div class="banner"> <img src="/assets/images/banner-bg-888x170.png" style="border: none;"> <div class="deploy-text">Explore Bitrise from your Terminal</div> <a target="_blank" href="[https://app.bitrise.io/cli](https://app.bitrise.io/cli "https://app.bitrise.io/cli")"><button class="button">Go to Bitrise CLI</button></a> </div>