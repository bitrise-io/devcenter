---
title: オンラインでのビルドアーティファクト (Build artifacts online)
redirect_from: []
date: 2019-04-05 11:31:23 +0000
published: false

---
アプリのビルドを選択する場合、ビルドページの`APPS & Artifacts`タブにてビルド中に生成されたアーティファクト（例えば、ファイルやレポート）の確認が行なえます。すべてのファイルはビルド終了時点で破壊されるので、もしファイルを見たりダウンロードする場合、ワークフローへ`Deploy to bitrise.io`ステップを挿入すればアーティファクトへのアクセスが可能になります。

## アーティファクトへのファイルのデプロイ

`Deploy to Bitrise.io`ステップを使うことによりビルドページ内の`APPS & Artifacts`セクションへアーティファクトがデプロイされます。ビルド中に生成されたすべてのファイルをデプロイし、`$BITRISE_DEPLOY_DIR` ディレクトリへ保存されます。ステップの`Config`セクションの下にある`Deploy directory or file path` 欄内にあるターゲットディレクトリパスの変更が可能です。

1. アーティファクトを生成するステップの後に`Deploy to Bitrise.io`を挿入するか、**ワークフローの一番最後**（推奨）に`Deploy to Bitrise.io`を挿入してください。詳しい情報は、[Attach any file as an Artifact to the Build](https://devcenter.bitrise.io/tips-and-tricks/attach-any-file-to-build/)を参照してください。

{% include message_box.html type="important" title=" `Deploy to Bitrise.io`の挿入場所" content=" My message" content=" 正しい場所に`Deploy to Bitrise.io`を追加してください。ビルド中にファイルを生成する他のステップの前に挿入してしまうと`Deploy to Bitrise.io`は何もデプロイしないのでご注意ください。 "%}

デプロイディレクトリ内にあるどのサブディレクトリの内容も、ビルドの`APPS and Artifacts`セクションには表示されないのでご注意ください。しかし、`Deploy to Bitrise.io`ステップにある`Compress the artifacts into one file`欄のデフォルト`false`値を`true`に修正すると、zipファイルに**アーティファクトを圧縮する**ことができます。これはサブディレクトリを含む全てのディレクトリを圧縮し、`APPS & Artifacts`にデプロイします。

### ターゲットディレクトリパスの修正

他のパスに**ターゲットディレクトリパスを修正する**ことができますが、ワークフローの他のステップ内の同じディレクトリパスを参照して、そのディレクトリに生成されたファイルが収集されていることを確認してください。

### ビルドが失敗したらアーティファクトを調べてください

`Run if previous Step failed`トグルが有効であると、ビルドが失敗しても、ビルドの（生成に成功した）アーティファクトへアクセスができます。例えば、生成されたテストレポートファイルをチェックして失敗したビルドのバグを検知することができます。

### ビルドのアーティファクトへは誰がアクセスできますか？

`APPS & Artifacts`のアーティファクトはアプリのオーナー、管理人、開発者、テスター・QAであれば誰でもアクセスできます。`Enable public page fot the App`のデフォルト構成を保つ場合、URLを持つ人なら誰でもアプリとアーティファクトにアクセスすることができます。詳しい情報は [Public App install page](https://devcenter.bitrise.io/tutorials/deploy/bitrise-app-deployment/#public-app-install-page)をご覧ください。

## ファイルの種類と制限

すべてのファイルの種類は`APPS & Artifacts`でサポートされており利用可能です。ファイルの種類にもよりますが、`eye`アイコンをクリックするかファイルをローカルコンピュータにダウンロードするとアーティファクトをオンラインで確認することもできます。

ビルド毎に`APPS & Artifacts`にデプロイされるファイルの数についての制限はありません。ただし、ファイルのサイズの制限については**ファイルごとに2GBまで**となっています。