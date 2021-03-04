---
changelog: 
last_modified_at: 
title: Bitrise tools
redirect_from: "/jp/tools/bitrise-tools/"
menu:
  getting-started-main:
    weight: 37

---
## Bitrise CLI tools

### [bitrise](https://github.com/bitrise-io/bitrise)
the Bitrise CLIは、 [bitrise.io](https://www.bitrise.io) でビルドを実行するために使用され、独自のMac / Linuxにインストールしてローカルでビルドを実行できます！

{% include message_box.html type="info" title="Bitrise CLI についてもっと詳しく" content=" [GitHub](https://github.com/bitrise-io/bitrise) または dig deeper ないの [Bitrise CLI docs](/bitrise-cli/index/) を確認してください。"%}

### [stepman](https://github.com/bitrise-io/stepman)
  ステップのダウンロードや共有など、ステップライブラリの管理に使用します。

### [envman](https://github.com/bitrise-io/envman)
  環境変数マネージャーは独立して使用でき、Bitrise CLIはそれを使用してビルド中に環境変数を分離および管理します。

## Bitrise CLI プラグイン

### [Analytics plugin](https://github.com/bitrise-core/bitrise-plugins-analytics)

## Infrastructure

### [bitrise-machine](https://github.com/bitrise-tools/bitrise-machine)
Bitrise CLIランナーのホスト（仮想マシン）を管理します。構成ファイルに基づいて作成、破棄、クリーンアップします。

### [bitrise-bridge](https://github.com/bitrise-tools/bitrise-bridge)
リモートホストからローカルのBitrise CLIへのBitrise CLIコマンドの「ブリッジ」を担います。直接、またはDockerコンテナを作成して、その中でBitrise CLIコマンドを実行します。

### [cmd-bridge](https://github.com/bitrise-io/cmd-bridge)
外部（汎用）コマンド（たとえば、SSHを介した任意のコマンド）をホストにブリッジするのに役立ちます。
コマンドを特定の環境で実行する必要がある場合に役立ちます。 iOSシミュレータはSSHセッションから起動できません。ログインした「GUI」ユーザーから起動する必要があります。
この場合、ホスト環境で`cmd-bridge` のサーバーを起動し、SSHまたは別の方法で`cmd-bridge` を使用して、実行中の`cmd-bridge` のサーバーにコマンドを送信し、実行しています。

### [garden](https://github.com/bitrise-tools/garden)
  A tool to manage your template (plan) based directories.
  You can perform a setup (plant) by running garden grow,
  which'll create your garden (directories) based on your plans (temlates).

テンプレート（plan）ベースのディレクトリを管理するツール。
garden growを実行することでセットアップ（plant）を実行できます。これにより、計画（テンプレート）に基づいてガーデン（directories）が作成されます。

## iOS code signing tool

### codesigndoc
使い易いiOSコード署名ツール

{% include message_box.html type="info" title="codesigndoc についてもっと詳しく" content=" [GitHub page](https://github.com/bitrise-io/codesigndoc) をご確認ください。iOSアプリでの署名は以下が参考になります。

* [Collecting and exporting code signing files with codesigndoc](/code-signing/ios-code-signing/collecting-files-with-codesigndoc/)
* [Device testing for iOS](/testing/device-testing-for-ios/)"%}


## Generic

### [depman](https://github.com/bitrise-tools/depman)
超シンプルな依存関係管理ツール。

### [releaseman](https://github.com/bitrise-tools/releaseman)
親切なリリース管理ツール。

## Go

### [gows](https://github.com/bitrise-tools/gows)
開発中に 環境毎の切り替えを含んだ Go Workspace を簡単に管理できます。

### [goinst](https://github.com/bitrise-tools/goinst)
独立した環境に Go 製のコマンドラインツールをインストールします。

## Server/service

### [bitrise webhooks](https://github.com/bitrise-io/bitrise-webhooks)
さまざまな Webhook（GitHub、Bitbucket、Slackなど）に対応し、[bitrise.io](https://www.bitrise.io)のBuild Trigger API形式に変換し、bitrise.io を呼び出してビルドを開始します。

### [DATapi](https://github.com/bitrise-tools/datapi)
非常にシンプルなデータシリーズストレージサービス。データのタイムスタンプとカテゴリに基づいて、データシリーズをすばやく簡単に保存および取得します。
-  [DATapi Ruby Client](https://github.com/bitrise-tools/datapi-client)

{% include banner.html banner_text="Now you know everything" url="https://app.bitrise.io/users/sign_up?utm_source=devcenter&utm_medium=bottom_cta" button_text="Go to Bitrise now" %}