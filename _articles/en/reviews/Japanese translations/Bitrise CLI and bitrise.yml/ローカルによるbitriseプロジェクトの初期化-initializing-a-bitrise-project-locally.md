---
tag: []
title: ローカルによるBitriseプロジェクトの初期化 (Initializing a Bitrise project locally)
redirect_from: []
summary: ''
published: false

---
Bitriseに新たなアプリを追加する場合、Bitriseはプロジェクトの種類を探知しベーシックな`bitrise.yml`ファイルの生成を行うので、その伴ったワークフローは、あなたのプロジェクトの種類に適しています。

Bitrise CLIを使えば、ご自身のコンピュータ上で行なうことが可能です。必要になるものは以下のとおりです：

* [golang](https://github.com/golang/go)
* the [**bitrise-init** plugin](https://github.com/bitrise-core/bitrise-init)
* [Ruby](https://www.ruby-lang.org/en/) version 2.2.2 or higher

{% include message_box.html type="important" title="Go workspace" content="始める前に、コンピュータ上の`$PATH`に`$GOPATH/bin`が追加されていることを確認してください！デフォルトでは、Go workspaceは`$HOME/go/bin`にあります。"%}

準備が整ったら、Terminal/Command Line Interfaceを開いてプロジェクトのフォルダへ進みます。pluginを開始します：

    $ bitrise init

bitrise-init pluginはプロジェクトの種類を判別するために全ての利用可能なスキャナを実行します。スキャナの一覧は以下のとおりです：

* React Native
* React Native Expo
* Ionic
* Cordova
* iOS
* MacOS
* Android
* Xamarin
* fastlane

プロジェクトの種類により、そのツールがユーザー入力を要求する場合があります：例えば、iOSプロジェクトを伴う場合、export methodの指定が要求されます。

    Select: ipa export method
    Please select from the list:
    [1] : app-store
    [2] : ad-hoc
    [3] : enterprise
    [4] : development
    (type in the option's number, then hit Enter) :

スキャナ出力に基づき、pluginは`bitrise.yml`ファイルと共にBitriseの構成を生成します。自動的に生成されたワークフローでは、全ての必要なインプットは有効な値を持っています。

pluginは`bitrise.secrets.yml`ファイルの生成も行います。[secret環境変数](/bitrise-cli/secrets/)をこの中に保存することが可能です。

[ご自身のproject type scannerを作成・提出](/bitrise-cli/creating-your-own-bitrise-project-scanner/)してbitrise-initプロジェクトに貢献しましょう！