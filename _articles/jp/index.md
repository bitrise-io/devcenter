---
title: Bitriseとは何ですか？
permalink: "/"
menu:
  main:
    weight: 2

---
**Bitrise**はモバイルアプリ開発（`iOS`, `Android`, `Xamarin`, ...）における[継続的インテグレーション](https://en.wikipedia.org/wiki/Continuous_integration)・[デリバリー](https://en.wikipedia.org/wiki/Continuous_delivery)（CI/CD） プラットフォームをサービス（PaaS）として提供しています。ソフトウェアプロジェクトの開発・自動化を手助けするためのツール・サービスの集合体です。

\**  
数回のクリックであなたのアプリのテストやデプロイ作業を自動化しましょう！**

## bitrise.io**でビルドを走らせましょう。**

* `Workflow` を定義することによってBitrise上のアプリを走らせます。`Workflow`には1つ以上の`Step`が含まれています（[open source Bitrise CLI](https://www.bitrise.io/cli)を実行してソースGitレポジトリを開いてください）。
* [あなた自身のビルドステップを作成してシェアしてください。](https://github.com/bitrise-steplib/step-template)
* 同一アプリにより多くのワークフローがあること、ワークフローがどのトリガーによって実行されるのかを確認してください。

command line scripts/programs によって実行されていれば、以下のStepが可能です；

* Eメールの送信
* [テキストメッセージの送信](https://github.com/bitrise-io/steps-sms-text-message)
* 相互的な情報・値の共有
* [Xcodeアーカイブの作成](https://github.com/bitrise-io/steps-xcode-archive)
* Virtual Machineのビルド走行についてのシステム情報の収集
* 他のユーザーへの通知（例：Slack）
* [iTunes Connectへの登録・申請](https://github.com/bitrise-io/steps-deploy-to-itunesconnect-deliver)などたくさんあります！

### インフラ

ビルドをトリガーする際（Virtual Machineがホストとして登録されている場合）、あなたのビルドと定義済みのワークフロー（一連のビルドStep) は段階的に実行されます。

ビルドが終了すると、Virtual Machineはなくなります。その後ワークフローで走った全てのStepのログ記録の参照ができます。詳しくは[Code Security](/jp/getting-started/code-security)をご覧ください。

Virtual Machinesはアプリのビルドに必要なツールが全て備わっています。Bitriseは自動的にどのStack（バーチャルマシンの種類）があなたのアプリに適しているかを検知します。もちろんいつでも手動で変えることも可能です。

### Bitrise CLI - オープンソース・オフライン・オートメーションランナー

`bitrise`ビルドをあなたのマシンで走らせる場合、[open source runner](https://www.bitrise.io/cli)をインストールしてください。その上で、`bitrise`コマンドを使いワークフローを実行してください。_bitrise.ioアカウントはBitrise CLIを使用する場合必要ありません。_

新しいStepの開発、ビルドのデバギング（誤作動・不具合の修正）を皆様にお手伝いいただけると非常に助かります。

オフラインでビルドを走らせる方法についてはDev Centerの[Bitrise CLI and bitrise.yml](/bitrise-cli/index/)を参照してください。

## Bitrise API

Go言語でのビルドは、BitriseのAPIで簡単にアクセスができ、使うことができます。ユーザー認証のためのPersonal Access Tokenを取得していれば問題なく使うことができます。

{% include message_box.html type="info" title="API documentation" content="

* [Bitrise API overview](https://devcenter.bitrise.io/api/v0.1/)
* [Bitrise API endpoint documentation](https://api-docs.bitrise.io)"%}