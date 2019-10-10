---
tag: []
title: 独自のBitriseプロジェクトスキャナを作成する (Creating your own Bitrise project scanner)
redirect_from: []
summary: ''
published: false

---
The project scanner is a tool that identifies the given project's type and generates a basic Bitrise configuration. Each supported project type has its own scanner: these scanners are stored as separate packages.

Project Scanner (プロジェクトスキャナ) は与えられたプロジェクトのタイプを鑑定し、ベーシックなBitrise configurationを生成します。サポートされているプロジェクトのタイプそれぞれにはスキャナが付随しています：個々のパッケージとして保管されています。

A project type scanner defines at least two workflows: one for testing (`primary`) and one for building (`deploy`). [It includes the minimal amount of Steps to successfully run them](/getting-started/getting-started-workflows/#default-workflows).

一つのプロジェクトタイプスキャナは最低2つのワークフローを定義します：テスト用 (`primary`)とビルド用 (`deploy`)になっています。

{% include message_box.html type="important" title="Build and test Steps ビルドとテストのStep" content="Build Steps and test Steps have specific requirements:　ビルドStepとテストStepにはそれぞれ異なったものが必要です：

* a **build** Step must build your app so that it is ready for deployment and it must output an Environment Variable that points to the output file(s). For example, a build Step to build an iOS app must output an .ipa file (not, say, .xcodearchive) and the path to this .ipa file.  
  **ビルド**Stepではアプリのビルドをする必要があるので、デプロイの準備が完了していて、アウトプットファイルへ指し示す環境変数を出力する必要があります。例えば、iOSアプリをビルドするビルドStepは、.ipaファイル (.xcodearchiveではない) とその.ipaファイルへのパスを出力する必要があります。
* a **test** Step must output the test results so that they are available for viewing on the build page on [bitrise.io](app.bitrise.io). **テスト**Stepはテスト結果を出力する必要があるので、[bitrise.io](app.bitrise.io)上のビルドページにて確認することができます。"%}

When adding a new project on the website or initializing a project on your own machine, the [bitrise-init](https://github.com/bitrise-core/bitrise-init) tool iterates through every scanner, calls the scanner interface methods on each of them and collects their outputs. Based on these outputs, a basic configuration is generated.

ウェブサイトで新プロジェクトを追加する際やご自身のマシンでプロジェクトを開始する時、[bitrise-init](https://github.com/bitrise-core/bitrise-init)ツールが全てのスキャナを通じてイテレーション作業を行います。ほかにも、scanner interface methods (スキャナインターフェース方法) をそれぞれに呼び出し、アウトプットを収集します。アウトプットに基づいてベーシックな設定が生成されます。

The possible workflows are described in a scan result model. The model consists of:  
可能性のあるワークフローがscan result model (スキャン結果モデル)で表示されます。そのモデルは以下のように構成されています。

* options (オプション)
* configs (設定)
* warnings (警告)

Here is the basic structure of the model, in YAML:  
YAML内でのモデルのベーシックな構造は以下のようになっています：

    options:
      DETECTED_PLATFORM_1: OptionModel
      DETECTED_PLATFORM_2: OptionModel
      ...
    
    configs:
      DETECTED_PLATFORM_1:
        CONFIG_NAME_1: ConfigModel
        CONFIG_NAME_2: ConfigModel
        ...
      DETECTED_PLATFORM_2:
        CONFIG_NAME_1: ConfigModel
        CONFIG_NAME_2: ConfigModel
        ...
      ...
    
    warnings:
      DETECTED_PLATFORM_1:
      - "warning message 1"
      - "warning message 2"
      ...
      DETECTED_PLATFORM_2:
      - "warning message 1"
      - "warning message 2"
      ...

* Every platform scanner writes its possible options, configurations and warnings into this model. These will be translated into step input values by choosing the desired values for the given options.
* Every option chain’s last option selects a configuration.
* Warnings display the issues with the given project setup.
* 全てのプラットフォームスキャナは可能性のあるoptions, configurationsとwarningsを書き込みます。これらは指定されたオプションに必要な値を選択することによりStepインプット値として翻訳されます。
* 全てのオプションチェーンの最後のオプションはconfigurationを選択します。
* Warningsはある特定のプロジェクトのセットアップで問題が生じたときに表示されます。

## Options

`Options` represents a question and the possible answers to the question. For example:

`Options`では質問や質問への回答を表しています。例えば：

* Question: What is the path to the iOS project files? iOSプロジェクトファイルへのパスは何ですか？
* Possible answers: List of possible paths to check 可能性のあるパスのリストをチェック

These questions and answers are translated into step inputs. The scanner should either determine the input value or let the user select or type the value.

質問と回答はStepインプットへ翻訳されます。スキャナは、インプット値を決定する、もしくは、ユーザーに選択させる、値を入力するかのいずれかになります。

For example, the `Xcode Archive & Export for iOS` Step has an input called `export-method`. This informs the Step of the type of .ipa you want to export. The value cannot be determined based on the source code so the scanner collects every possible value and presents them to the user in the form of a list to choose from.

例えば、 `Xcode Archive & Export for iOS` Stepには`export-method`と呼ばれるインプットがあります。これはエクスポートしたい.ipaファイルタイプのStepを通知します。この値はソースコードに基づいて決定はできないので、スキャナは全ての可能性のある値を収集してリスト化し、ユーザーに選択させる方法をとっています。

Selecting an option can start a chain: it can lead to different options being presented afterwards. For example, if you select an Xcode scheme that has associated test targets, it leads to different "questions". Similarly, selecting a certain option can lead to a different workflow being generated afterwards.

オプションを選択してチェーンを開始することができます：これで後からでも異なるオプションが表示されるようになります。例えば、テストターゲットに関連したXcodeスキームを選択した場合、異なる "questions" に導かれます。同様に、特定のオプションを選択することにより、後々生成される異なるワークフローへ導かれるようになっています。

### The option model　オプションモデル

The OptionModel represents an input option. It looks like this in Go:  
OptionModelはインプットオプションを表します。Goではこのように表示されます：

    // OptionModel ...
    type OptionModel struct {
        Title  string
        EnvKey string
    
        ChildOptionMap map[string]*OptionModel
        Config         string
    }

* `Title`: the human readable name of the input
* `EnvKey`: it represents the input's key in the step model
* `ChildOptionMap`: the map of the subsequent options if the user chooses a given value for the option
* `Title`：人間が読むことができるインプット名
* `EnvKey`：Stepモデルでのインプットキーを表します。
* `ChildOptionMap`：ユーザーがオプション用に指定した値を選んだ場合の次のオプションに関するマップ

For example, let's see a scenario where you choose a value for the `Scheme` input. You will have a `value_map` in the `options`. The possible values are:

例えば、`Scheme`インプット用に値を選択するというシナリオを見ていきましょう。`options`内に`value_map`があることを確認します。可能性のある値は以下の通りです：

* `SchemeWithTest`
* `SchemeWithoutTest`

By choosing `SchemeWithTest`, the next option will be related to the simulator used to perform the test.

By choosing `SchemeWithoutTest`, the next option will be about the export method for the .ipa file.

`SchemeWithTest`を選択すると、次はテスト実行に使用されたシミュレータに関連したオプションが表示されます。

`SchemeWithoutTest`を選択すると、次は.ipaファイル用のエクスポート方法についてのオプションが表示されます。

{% raw %}

    {
        "title": "Scheme",
        "env_key": "scheme",
        "value_map": {
            "SchemeWithTest": {
                "title": "Simulator name",
                "env_key": "simulator_name",
                ...
            },
            "SchemeWithoutTest": {
                "title": "Export method",
                "env_key": "export_method",
                ...
            }
        }
    }

{% endraw %}

Every option chain has a first option: this is called `head`. The possible values of the options can branch the option chain.

Every option branch's last `options` must have a `config` property set. `config` holds the id of the generated Bitrise configuration.

An options chain's last `options` cannot have a `value_map`.

全てのオプションチェーンには`head`と呼ばれる1番目のオプションがあります。可能性のあるオプションの値は、オプションチェーンをブランチすることができます。

全てのオプションブランチの最後の`options`には`config`プロパティセットがある必要があります。`config`は生成されたBitrise configurationのIDを保持しています。

オプションチェーンの最後の`options`では`value_map`を保持することはできません。

{% raw %}

    {
        "title": "Scheme",
        "env_key": "scheme",
        "value_map": {
            "SchemeWithTest": {
                "title": "Simulator name",
                "env_key": "simulator_name",
                "value_map": {
                    "-": {
                        "config": "bitrise_config_with_test",
                    }
                }
            },
            "SchemeWithoutTest": {
                "title": "Export method",
                "env_key": "export_method",
                "value_map": {
                    "development": {
                        "config": "bitrise_config_without_test",
                    },
                    "app-store": {
                        "config": "bitrise_config_without_test",
                    },
                    "ad-hoc": {
                        "config": "bitrise_config_without_test",
                    }
                }
            }
        }
    }

{% endraw %}

## Scanners スキャナー

Scanners generate the possible `options` chains and the possible workflows for the `options` per project type. The `ActiveScanner` variable holds each scanner implementation. Every specific scanner implements the `ScannerInterface`.

スキャナーはプロジェクトタイプに応じた`options`用に可能性のある`options`チェーンとワークフローを生成します。`ActiveScanner`変数がそれぞれのスキャナーの実装を保持します。すべての特定のスキャナーは`ScannerInterface`を実行します。

    // ScannerInterface ...
    type ScannerInterface interface {
        Name() string
        DetectPlatform(string) (bool, error)
    
        Options() (models.OptionModel, models.Warnings, error)
        Configs() (models.BitriseConfigMap, error)
    
        DefaultOptions() models.OptionModel
        DefaultConfigs() (models.BitriseConfigMap, error)
    
        ExcludedScannerNames() []string
    }

* `Name() string`: it is used for logging and storing the scanner output (warnings, options and configs). The scanner output is stored in `map[SCANNER_NAME]OUTPUT`. For example, the `options` for an iOS project is stored in `optionsMap[ios]options`.
* `Name() string`：warnings, options, configsといったスキャナーアウトプットのロギングと保管のために使用されます。このスキャナーアウトプットは`map[SCANNER_NAME]OUTPUT`に保管されています。例えば、iOSプロジェクト用の`options`は `optionsMap[ios]options`に保管されるようになります。
* `DetectPlatform(string) (bool, error)`: it is used to determine if the given search directory contains the project type or not.

  `DetectPlatform(string) (bool, error)`：指定されたsearch directoryにプロジェクトタイプが含まれているかどうかを測定するために使用されます。
* `Options() (models.OptionModel, models.Warnings, error)`: it is used to generate option branches for the project. Each branch should define a complete and valid option set to build the final bitrise config model. Every option branch’s last `Options` has to store a configuration id, which will be filled with the selected options.

  `Options() (models.OptionModel, models.Warnings, error)`：プロジェクト用のオプションブランチを生成するために使用されます。それぞれのブランチは最終的なBitrise configモデルをビルドするために完全かつ有効なオプションセットを定義する必要があります。全てのオプションブランチの最後の`Options`は、選択したオプションを使って埋めることができるconfig idを保管しなければなりません。
* `Configs() (models.BitriseConfigMap, error)`: it is used to generate the possible configs. BitriseConfigMap’s each element is a bitrise config template which will be fulfilled with the user selected option values.  
  `Configs() (models.BitriseConfigMap, error)`：可能性のあるconfigsを生成します。BitriseConfigMapのそれぞれの要素は、ユーザーが選択したオプション値を使って埋めることのできるBitrise configテンプレートとなっています。
* `DefaultOptions() models.OptionModel and DefaultConfigs() (models.BitriseConfigMap, error)` : they are used to generate the options and configs without scanning the given project. In this case every required step input value is provided by the user. This way even if a scanner fails, the user has an option to get started.

  `DefaultOptions() models.OptionModel and DefaultConfigs() (models.BitriseConfigMap, error)`：指定されたプロジェクトのスキャンをせずにoptionsとconfigsを生成するために使用されます。このケースでは、全ての必要なStepインプット値はユーザーによって提供する仕様となっております。またこの方法ではスキャナーが失敗してもユーザーは開始する事ができるオプションがあります。

### Testing a scanner　スキャナーのテスト

To test a scanner, we require both unit tests and integration tests.

Unit tests are written using Go’s standard testing library.

スキャナーをテストするには、ユニットテストとインテグレーションテストの両方が必要になります。

ユニットテストはGoのStandard testing libraryを使用して書かれています。

For integration tests, we are validating that the project type scanners are generating the desired Bitrise configurations for an instance of the project type. To do this, we use the new scanner to scan the given sample project and we modify the generated scan result to fit our integration tests.

インテグレーションテストを行うために、プロジェクトタイプスキャナーがプロジェクトタイプの例を基に、希望するBitriseの構成を生成しているかどうかを検証します。これを行うために、Bitriseは新しいスキャナーを使って指定されたサンプルプロジェクトをスキャンして、インテグレーションテストに合致するように生成されたスキャン結果を修正します。

The reason for the modification is that the scanners are adding steps to the generated config, but the step versions are updated from time to time. The step version definitions can be found at `steps/const.go`.

修正する理由としては、スキャナーが生成された構成にStepを追加しているためですが、Stepのバージョンは随時更新されます。Stepバージョンの定義は`steps/const.go`で確認することができます。

So we call `bitrise-init --ci config` in the sample project’s root directory, and in the generated `scan_result.yml` file we replace the step versions with `%s` and we use fmt.Sprintf to inject the latest defined step versions into the config.

まず、サンプルプロジェクトのルートディレクトリ内の`bitrise-init --ci config` を呼び出します。そして生成された `scan_result.yml` ファイル内のStepバージョンを`%s`を使って変更します。設定へ定義された最新のStepバージョンをfmt.Sprintfを使用して注入します。

In the integration tests, we are matching the `scan_result.yml` file generated by the scanner with the previously generated reference scan_result content.

インテグレーションテストでは、スキャナーによって生成された`scan_result.yml`ファイルと以前に生成されたreference scan_result contentを照合します。

### Submitting your own scanner　独自のスキャナーを提出する

You can submit your own scanner to Bitrise: we will review it and integrate it to the bitrise-init tool once it's approved!

ご自身のスキャナーをBitriseに提出することができます：まずレビューを行い、承認されるとbitrise-initツールへインテグレートされます！

The development path for a new scanner starts with your own sample project and ends with updating the existing Steps for your project type. Let's go through it!

新規のスキャナー用の開発パスはご自身のサンプルプロジェクトを使って開始され、プロジェクトタイプ用の既存のStepをアップデートして終了します。一つずつ見ていきましょう。

1. Find or create an open source sample app that demonstrates a typical instance of your project type.

   It should include:

   プロジェクトタイプを代表するインスタンスを実証するオープンソースのサンプルアプリを探すまたは作成します。

   以下のものを含める必要があります。
   * a readme file (including tool versions required for updating, building and testing this project)
   * a `bitrise.yml` file that is generated by your scanner
   * readmeファイル (プロジェクトのアップデート、ビルド、テストを行うツールのバージョンを含む)
   * ご自身のスキャナーによって生成された`bitrise.yml`ファイル
2. Build and test your sample app with existing Steps or custom scripts.

   既存するStepやカスタムスクリプトを使ってサンプルアプリのビルド、テストを行います。
3. Create the missing Steps the new project type needs.

   The PR for these Steps should link the scanner PR once you created the scanner.

   新規のプロジェクトタイプが必要とする不足しているStepを作成します。スキャナーを一度作成すると、これらのStepのプルリクエストはスキャナーのプルリクエストとリンクさせる必要があります。
4. Create a scanner for your project type.  
   プロジェクトタイプ用のスキャナーを作成します。
5. Run the required unit tests and integration tests.  
   必要なユニットテストとインテグレーションテストを行います。
6. Open a scanner pull request to the bitrise-init project.  
   bitrise-initプロジェクトへのスキャナープルリクエストを開きます。

   It should:
   * link the new project type's sample app
   * link the new project type's guides for testing and building
   * include an icon for the new project type - otherwise we will create one for you
   * recommend the default stack by listing the required tools for building and testing the new project type.
   * 新規プロジェクトタイプのサンプルアプリとリンクさせます
   * 新規プロジェクトタイプのテストとビルド用のガイドをリンクさせます
   * 新規プロジェクトタイプのアイコンを含めます (しない場合はBitriseが自動で作成します)
   * 新規プロジェクトタイプのビルドとテスト用のツールをリスト化してデフォルトスタックを推奨します
7. Update the existing Steps with the new project type if necessary.

   The PR for these Steps should link the scanner PR.

   必要であれば、新規プロジェクトタイプを使って既存のStepをアップデートすることができます。それらのStepのプルリクエストはスキャナーのプルリクエストとリンクしていなければなりません。

<div class="banner"> <img src="/assets/images/banner-bg-888x170.png" style="border: none;"> <div class="deploy-text">Now you know everything</div> <a target="_blank" href="[https://app.bitrise.io/dashboard/builds](https://app.bitrise.io/dashboard/builds "https://app.bitrise.io/dashboard/builds")"><button class="button">Go to Bitrise now</button></a> </div>