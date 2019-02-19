---
title: Bitrise上でのiOSコード署名
redirect_from:
- "/ios/code-signing/"
menu:
  ios-code-signing:
    weight: 1
---
Bitrise上でビルドを実行するには、code signingを行うためのファイルを用意する必要があります。iOSのプロジェクトで必要なファイルは以下の通りです:

* .p12 フォーマットの **署名用証明書 (Signing certificates)**
* プロジェクト用に team ID や bundle ID などが設定された **プロビジョニングプロファイル (Provisioning Profile)**
* Bitrise上の環境にこれらのファイルをインストールするためのスクリプトやツール、もしくはBitriseのWorkflow上のStepの設定

これらのcode signing用のファイルは[bitrise.io](https://www.bitrise.io)上に保存しておくことが可能で、iOSのプロジェクト(XcodeもしくはXamarin)では署名された .ipaファイルの作成が、Macのプロジェクトでは署名された .appファイルもしくは .pkgファイルの作成ができます。
手動でこれら全ての必要なファイル (プロビジョニングプロファイル と .p12証明書ファイル) をアップロードすることも可能ですし、接続されたApple Developerのアカウントからプロビジョニングプロファイルの自動生成と管理を行える自動プロビジョニング設定を利用することもできます。
また、 手動プロビジョニング設定と自動プロビジョニング設定の両方において **Automatically manage signing** 機能に対応しています。

以下のセクションでこれら2つの方法を利用する手順をご紹介します。

## iOSプロジェクトでのcode signing

基本的なcode signingのフローは非常にシンプルです:

1. [Bitriseが提供している codesigndoc を利用して必要なファイルを取得します](/code-signing/ios-code-signing/collecting-files-with-codesigndoc)
2. [bitrise.io](https://www.bitrise.io)にcode signing用のファイルをアップロードします。`codesigndoc` を利用してアップロードするかもしくは、website上から手動でアップロードすることもできます。
プロビジョニングプロファイルの設定では、以下のオプションが利用できます:
   * [手動プロビジョニング設定](/code-signing/ios-code-signing/ios-manual-provisioning)
   * [自動プロビジョニング設定](/code-signing/ios-code-signing/ios-auto-provisioning)
3. 署名された `.ipa` ファイルを作成するために `Xcode Archive & Export for iOS` もしくは `Xamarin Archive` のStepを設定します:
   * Xcodeプロジェクト: [Create a signed .ipa for Xcode projects](/code-signing/ios-code-signing/create-signed-ipa-for-xcode)
   * Xamarinプロジェクト: [Create a signed .ipa for Xamarin projects](/code-signing/ios-code-signing/create-signed-ipa-for-xamarin)


## サードパーティツールを用いたcode signing

[fastlane match](https://github.com/fastlane/fastlane/tree/master/match)や[fastlane sigh](https://github.com/fastlane/fastlane/tree/master/sigh)などのサードパーティのツールを用いてcode signingを管理することも可能ですが、Bitriseが用意したStepとツールを利用することをお勧めします。

{% include message_box.html type="important" title="サードパーティツールの利用について" content=" サードパーティツールをcode signingの管理に利用する場合、そのツールのドキュメントやissueトラッカーを利用してください。Bitriseでは、こちらで用意したStep(`Certificate and profile installer`)やtools (`codesigndoc`)についてのカスタマーサポートは可能ですが、サードパーティツールについてのカスタマーサポートは行なっておりません。"%}

もしあなたがサードパーティツールを利用し、code signingに必要なファイルをbitrise.ioにアップロードしない場合でも、Workflow上には `Certificate and profile installer` のStepを残しておくことをお勧めします。これはいくつかのツールにおいて、ビルドごとに新規作成される仮想環境上での動作を想定していない場合があるためで、 `Certificate and profile installer` にはこれらの状況に対応するための一般的なワークアラウンドが含まれています。このStepが、あなたの利用しているサードパーティツールでの問題を解決できる保証はありませんが、入れておいて問題になることもありません。
