---
title: 最初のビルドを実行する
menu:
  bitrise-cli:
    weight: 5
---
Bitriseビルドを実行するために必要なものは2つだけです：

1. Bitrise CLI - [インストールガイド](/bitrise-cli/installation/)
2. ビルド設定 (`bitrise.yml`)

Bitrise CLIをインストールしたら、あとはビルドの設定ファイル `bitrise.yml` を作成するだけです（インストール状況を確認するためには `bitrise setup` を実行します）。
これで準備完了です！

もしあなたが [bitrise.io](https://www.bitrise.io) を使用している場合は、そこから `bitrise.yml` をダウンロードし、ローカルで実行することができます。
`bitrise.yml` は [bitrise.io](https://www.bitrise.io) に登録したアプリケーションのワークフローエディタを開き、`bitrise.yml` セクションを開くと見つけることができます。

もし `bitrise.yml` ファイルを自分で作成したい場合は、プロジェクトのルートに `bitrise.yml` ファイルを作成してください。
これを `bitrise.yml` の基本設定として使うことができます：

```yaml
format_version: 1.3.1
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git

app:
  envs:
  - MY_NAME: My Name

workflows:
  test:
    steps:
    - script@1.1.3:
        inputs:
        - content: echo "Hello ${MY_NAME}!"
```

このビルドを実行するには、ターミナルまたはコマンドラインを開き、`bitrise.yml` を保存した場所まで `cd` で移動して `bitrise run test` を実行してください。

これで終わりです。Bitrise CLIを使った最初のビルドを実行できました！

さらに詳しくBitrise CLIと `bitrise.yml` の設定方法について知るために、このドキュメントを読み進めてください。
あなたはすぐに多機能なビルドを作成し、実行することができるでしょう！
