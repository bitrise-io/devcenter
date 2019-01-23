---
# jp title missing
title: Creating a signed .ipa for Xcode projects
menu:
  ios-code-signing:
    weight: 5
---
Bitriseでは、Xcodeプロジェクトでの署名つきIPAの作成を手軽に行えます。`Xcode Archive & Export for iOS` で入力の設定を行うだけです。

IPAをエクスポートする設定を行う前に、次の項目を確認してください。

* Code Signingファイルがあること。[codesigndoc](https://github.com/bitrise-tools/codesigndoc)の利用を推奨します。
* 次のSigningファイルを管理するワークフローが設定されていること。
* `Certificate and profile installer` Provisioning Profileを手動でアップロードする場合。
* `iOS Auto Provisioning` Automatic Provisioningを行うために、BitriseのアカウントをApple Developerのアカウントに接続した場合。

準備ができたら、ワークフローでIPAのエクスポートの設定を進めましょう。

1. `Xcode Archive & Export for iOS` がワークフローエディタにあることを確認し、ステップを選択します。

1. `Select method for export`をセットし、使いたいCode Signingの種類を選びます。

    ![Select export method for Xcode Archive for iOS](/img/code-signing/ios-code-signing/xcode-archive-export-method.png)

    Automatic Provisioningを使う場合は、`iOS Auto Provisioning`の`Distribution type`の値が一致していることを確認してください。オプションには次のものがあります。

    * `auto-detect` - このオプションは非推奨で、削除予定です。

    * `app-store`

    * `ad-hoc`

    * `enterprise`

    * `development`.

1. ワークフローを保存し、新しいビルドを開始します。

以上です。Xcodeは、プロジェクトのBundle IDやTeam ID、設定したエクスポート方法をもとに、正しいSigningファイルを自動で選択します。

違うチームの署名ファイルを用いる場合（例えば、会社のCode Signingを社内用ビルドに用いており、App storeでの配布はクライアントのCode Signingを利用する）、`Select method for export`にある`The Developer Portal team to use for this export`のオプションを設定します。
