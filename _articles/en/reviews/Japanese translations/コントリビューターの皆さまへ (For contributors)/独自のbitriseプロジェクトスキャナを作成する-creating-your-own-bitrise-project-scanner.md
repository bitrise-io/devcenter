---
changelog:
last_modified_at:
tag: []
title: 独自のBitriseプロジェクトスキャナを作成する (Creating your own Bitrise project scanner)
redirect_from: []
description: ''
published: false

---
Project Scanner (プロジェクトスキャナ) は与えられたプロジェクトのタイプを検知し、ベーシックなBitrise configurationを生成します。サポートされているプロジェクトのタイプそれぞれにはスキャナが付随しています：それらは個々のパッケージとして保管されています。

一つのプロジェクトタイプスキャナは最低2つのワークフローを定義します：テスト用 (`primary`)とビルド用 (`deploy`)になっています。[実行を成功させるために、最低限の数のStepがすでに含まれております。](/steps-and-workflows/default-workflows/)

{% include message_box.html type="important" title="Build and test Steps ビルドとテストのStep" content="ビルドStepとテストStepにはそれぞれ異なったものが必要です：

* **ビルド**Stepはアプリのビルドをする必要があります。デプロイの準備が完了している状態で、アウトプットファイルへ環境変数を出力しなければなりません。例えば、iOSアプリをビルドするビルドStepは、.ipaファイル (.xcodearchiveではない) とその.ipaファイルへのパスを出力する必要があります。
* **テスト**Stepはテスト結果を出力する必要があるので、[bitrise.io](https://app.bitrise.io)上のビルドページにて確認することができます。"%}

ウェブサイト上で新プロジェクトを追加する際やご自身のマシンでプロジェクトを開始する時、[bitrise-init](https://github.com/bitrise-core/bitrise-init)ツールが全てのスキャナを通じてイテレーション作業を行います。ほかにも、scanner interface methods (スキャナインターフェース方法) をそれぞれに呼び出し、アウトプットを収集します。アウトプットに基づいてベーシックな設定が生成されます。

可能性のあるワークフローがscan result model (スキャン結果モデル)で表示されます。そのモデルは以下のように構成されています。

* options (オプション)
* configs (設定)
* warnings (警告)

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

* 全てのプラットフォームスキャナは可能性のあるoptions, configurationsとwarningsを書き込みます。これらは指定されたオプションに必要な値を選択することによりStepインプット値として翻訳されます。
* 全てのオプションチェーンの最後のオプションではconfigurationを選択します。
* Warningsは指定されたプロジェクトのセットアップで問題が生じたときに表示されます。

## Options (オプション)

`Options`は質問や質問への可能性のある回答を表示します。  
例えば：

* Question: What is the path to the iOS project files?   
  (質問: iOSプロジェクトファイルへのパスは何ですか？)
* Possible answers: List of possible paths to check   
  (回答: 可能性のあるパスのリストをチェック)

質問と回答はStepインプットへ翻訳されます。スキャナは、インプット値を決定する、もしくはユーザーに選択させる/値を入力させるのどちらかになります。

例えば、 `Xcode Archive & Export for iOS` Stepには`export-method`と呼ばれるインプットがあります。これはエクスポートしたい.ipaファイルタイプのStepを通知します。この値はソースコードに基づいた決定はできないので、スキャナは全ての可能性のある値を収集してリスト化し、ユーザーに選択させる方法をとっています。

オプションを選択してチェーンを開始することができます：これで後からでも異なるオプションが表示されるようになります。例えば、テストターゲットに関連したXcodeスキームを選択した場合、また違った"questions" に導かれます。同様に、特定のオプションを選択することにより、後々生成される異なるワークフローへ導かれるようになっています。

### オプションモデル

OptionModel (オプションモデル) はインプットオプションを表します。Goではこのように表示されます：

    // OptionModel ...
    type OptionModel struct {
        Title  string
        EnvKey string
    
        ChildOptionMap map[string]*OptionModel
        Config         string
    }

* `Title`：人間が読むことができるインプット名
* `EnvKey`：Stepモデルでのインプットキーを表示
* `ChildOptionMap`：ユーザーがオプション用に指定した値を選んだ場合の、次のオプションに関するマップ

`Scheme`インプット用に値を選択するというシナリオがあるとします。`options`内に`value_map`があることを確認します。可能性のある値は以下の通りです：

* `SchemeWithTest`
* `SchemeWithoutTest`

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

全てのオプションチェーンには`head`と呼ばれる、最初のオプションがあります。可能性のあるオプションの値は、オプションチェーンをブランチすることができます。

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

## スキャナ

スキャナはプロジェクトタイプに応じた`options`用に可能性のある`options`チェーンとワークフローを生成します。`ActiveScanner`変数がそれぞれのスキャナの実装を保持します。すべての特定のスキャナは`ScannerInterface`を実行します。

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

* `Name() string`：warnings, options, configsといったスキャナーアウトプットのロギングと保管のために使用されます。このスキャナーアウトプットは`map[SCANNER_NAME]OUTPUT`に保管されています。例えば、iOSプロジェクト用の`options`は `optionsMap[ios]options`に保管されるようになります。
* `DetectPlatform(string) (bool, error)`：指定されたsearch directoryにプロジェクトタイプが含まれているかどうかを測定するために使用されます。
* `Options() (models.OptionModel, models.Warnings, error)`：プロジェクト用のオプションブランチを生成するために使用されます。それぞれのブランチは、最終的なBitrise構成モデルをビルドするために、完全かつ有効なオプションセットを定義する必要があります。全てのオプションブランチの最後の`Options`には、選択したオプションを使って埋めることができるconfig IDを保管しなければなりません。
* `Configs() (models.BitriseConfigMap, error)`：可能性のある構成を生成します。BitriseConfigMapのそれぞれの要素は、ユーザーが選択したオプション値を使って埋めることのできるBitrise configテンプレートとなっています。
* `DefaultOptions() models.OptionModel and DefaultConfigs() (models.BitriseConfigMap, error)`：指定されたプロジェクトのスキャンをせずにoptionsとconfigsを生成するために使用されます。このケースでは、全ての必要なStepインプット値はユーザーによって提供する仕様となっております。またこの方法ではスキャナーが失敗してもユーザーは開始する事ができるオプションがあります。

### スキャナのテスト

スキャナをテストするには、ユニットテストとインテグレーションテストの両方が必要になります。

ユニットテストはGoのStandard testing libraryを使用して書かれています。

インテグレーションテストを行うために、Bitriseはプロジェクトタイプスキャナがプロジェクトタイプの例を基に、希望するBitriseの構成を生成しているかどうかを検証します。これを行うために、Bitriseは新しいスキャナを使って指定されたサンプルプロジェクトをスキャンして、インテグレーションテストに合致するように、生成されたスキャン結果を修正します。

修正する理由としては、スキャナが生成された構成にStepを追加しているからですが、Stepのバージョンは随時更新されます。Stepバージョンの定義は`steps/const.go`で確認することができます。

まず、サンプルプロジェクトのルートディレクトリ内の`bitrise-init --ci config` を呼び出します。そして生成された `scan_result.yml` ファイル内のStepバージョンを`%s`を使って変更します。定義された最新のStepバージョンを構成内へfmt.Sprintfを使用し注入します。

インテグレーションテストでは、スキャナによって生成された`scan_result.yml`ファイルと以前に生成されたreference scan_result contentを照合します。

### 独自のスキャナを提出する

ご自身のスキャナをBitriseに提出することができます：まずBitriseがレビューを行い、承認されるとbitrise-initツールへインテグレートされます！

新規のスキャナー用の開発パスはご自身のサンプルプロジェクトを使って開始され、プロジェクトタイプ用の既存のStepをアップデートして終了します。一つずつ見ていきましょう。

1. プロジェクトタイプを代表するインスタンスを実証するオープンソースのサンプルアプリを探すまたは作成します。

   以下のものを含める必要があります。
   * readmeファイル (プロジェクトのアップデート、ビルド、テストを行うツールのバージョンを含む)
   * ご自身のスキャナーによって生成された`bitrise.yml`ファイル
2. 既存するStepやカスタムスクリプトを使ってサンプルアプリのビルド、テストを行います。
3. 新規のプロジェクトタイプが必要とする、不足しているStepを作成します。スキャナーを一度作成すると、これらのStepのプルリクエストはスキャナーのプルリクエストとリンクさせる必要があります。
4. プロジェクトタイプ用のスキャナーを作成します。
5. 必要なユニットテストとインテグレーションテストを行います。
6. bitrise-initプロジェクトへのスキャナープルリクエストを開きます。

   It should:
   * 新規プロジェクトタイプのサンプルアプリをリンクさせます。
   * 新規プロジェクトタイプのテストとビルド用のガイドをリンクさせます。
   * 新規プロジェクトタイプのアイコンを含めます (しない場合はBitriseが自動で作成します)。
   * 新規プロジェクトタイプのビルドとテスト用のツールをリスト化したデフォルトスタックを推奨します。
7. 必要であれば、新規プロジェクトタイプを使って既存のStepをアップデートすることができます。それらのStepのプルリクエストはスキャナーのプルリクエストとリンクしている必要があります。

{% include banner.html banner_text="Now you know everything" url="https://app.bitrise.io/dashboard/builds" button_text="Go to Bitrise now" %}