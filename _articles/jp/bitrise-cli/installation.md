---
title: Bitrise CLIのインストールと更新
menu:
  bitrise-cli:
    weight: 2
---
Bitrise CLIのインストールは非常に簡単です。これは、いくつかの方法で取得できる単一のバイナリとして配布されます。必要なのはダウンロードして実行可能な状態にするだけです。手順を見ていきましょう！

### Bitrise CLIをcURLでインストールする

1. bashシェルで次のコマンドを実行します：

    ``` bash
    curl -fL https://github.com/bitrise-io/bitrise/releases/download/1.21.0/bitrise-$(uname -s)-$(uname -m) > /usr/local/bin/bitrise
    ```
    Bitrise CLIの最新リリースは、[releases](https://github.com/bitrise-io/bitrise/releases) ページで確認できます。

1. ダウンロードしたバイナリを実行可能な状態にします：

    ``` bash
    chmod +x /usr/local/bin/bitrise
    ```

1. `bitrise setup` を実行します。これにより、Bitriseの実行に必要なものがすべてインストールされているかどうかが確認されます。これをスキップすると、CLIは最初に `bitrise run` を呼び出す際にセットアップを実行します。

いずれの場合でも、 `bitrise setup` はインストールを検証するためにいつでも呼び出すことができます。

### HomebrewでBitrise CLIをインストールする

あなたのMacに `Homebrew` パッケージマネージャがインストールされていれば、それを使ってBitrise CLIをインストールすることができます！

1. あなたのMacで `Terminal` アプリを開き、次のコマンドを実行します：

    ``` bash
    brew update && brew install bitrise
    ```

1. `bitrise setup` を実行します。これにより、Bitriseの実行に必要なものがすべてインストールされているかどうかが確認されます。これをスキップすると、CLIは最初に `bitrise run` を呼び出す際にセットアップを実行します。

### Bitrise CLIのアップデート

Bitrise CLIのアップデートは非常に簡単で、HomebrewまたはGitHub releaseからインストールした場合は手間がかかりません。

シンプルに `bitrise update` を実行してください。たったこれだけです！ CLIは毎日1回更新を確認し、新しいバージョンがあるとすぐに通知します。