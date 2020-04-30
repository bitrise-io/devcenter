---
changelog:
last_modified_at:
tag: []
title: ローカルでのBitriseプロジェクトの初期設定 (Initializing a Bitrise project locally)
redirect_from: []
description: ''
published: false

---
新規にBitriseへアプリを追加する時、Bitriseはプロジェクトのタイプを検知し、適切なワークフローが含まれた基本的な`bitrise.yml`ファイルをご自身のプロジェクトタイプ用に生成します。

Bitrise CLIがあれば、ご自身のコンピュータでプロジェクトを動かすことができます。必要なものは以下のとおりです：

* [GO言語](https://github.com/golang/go)
* [bitrise-init プラグイン](https://github.com/bitrise-core/bitrise-init)
* [Ruby](https://www.ruby-lang.org/ja/) バージョン2.2.2もしくはそれ以上

{% include message_box.html type="important" title="Go workspace" content="始める前に、`$GOPATH/bin`がコンピュータ上の`$PATH`に追加されていることを確認してください！デフォルトでは、Go workspaceは`$HOME/go/bin`にあります。"%}

準備が整えば、Terminal / Command Line Interfaceを開きプロジェクトのあるフォルダへ進みます。プラグインを開始してください：

    $ bitrise init

bitrise-initプラグインは、プロジェクトのタイプを判別するため全ての利用可能なスキャナを実行します。スキャナの一覧：

* React Native
* React Native Expo
* Ionic
* Cordova
* iOS
* MacOS
* Android
* Xamarin
* fastlane

プロジェクトのタイプによりますが、ツールがユーザーインプットを要求する場合があります：例えば、iOSプロジェクトでは、ユーザーにエクスポート方法を指定するように要求されます。

    Select: ipa export method
    Please select from the list:
    [1] : app-store
    [2] : ad-hoc
    [3] : enterprise
    [4] : development
    (type in the option's number, then hit Enter) :

スキャナのアウトプットに基づき、プラグインは`bitrise.yml`ファイルを用いてBitrise構成を生成します。自動的に生成されたワークフロー内では、全ての必要なインプットは有効な値を持ちます。

プラグインは`bitrise.secrets.yml`ファイルの生成も行います。当ファイルに[Secret環境変数](/jp/bitrise-cli/secrets/)を保管することが可能です。

[独自のプロジェクトタイプスキャナを作成・提出](/jp/contributors/creating-your-own-bitrise-project-scanner/)してbitrise-initプロジェクトの向上に貢献しましょう！