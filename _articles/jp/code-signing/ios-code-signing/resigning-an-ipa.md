---
# jp title missing
title: Re-signing an .ipa
menu:
  ios-code-signing:
    weight: 7
---
iOSアプリケーションの開発中に、内部テストやApp Storeへのデプロイなど、さまざまな目的で複数の種類のディストリビューションが必要になります。[bitrise.io](https://www.bitrise.io)では2つの別々のワークフローを設定する必要はありません。

開始する前に、次の操作を行う必要があります。

* 異なる種類の.p12証明書をアップロードする（developmentやdistributionの証明書など）
* 関連するプロビジョニングプロファイルをアップロードする（または`iOS Auto Provisioning`ステップで自動的に管理する）

すべてのコード署名ファイルがある場合は、ワークフローの設定に進みます。この例では、2つの署名付き.ipaファイルを作成するためのワークフローを設定します.１つは `development`、もう１つは`app-store`です。

1.ワークフローに `Xcode Archive＆Export for iOS`があることを確認し、選択します。

  この手順はあなたのワークフローの `Certificates and Profile Installer`または`iOS Auto Provisioning`ステップの **後に** 必要です。
2.入力変数のリストで、`Select method for export`に移動し、ドロップダウンメニューから`development`を選択します。

   ![iOS向けXcodeアーカイブのエクスポート方法の選択](/img/code-signing/ios-code-signing/xcode-archive-export-method.png)
3.ワークフローに`Export iOS and tvOS Xcode archive`ステップを追加します。
4.入力変数のリストで、`Export method for Select`に移動し、ドロップダウンメニューから`app-store`を選択します。

   ![エクスポートメソッドの入力変数](/img/code-signing/ios-code-signing/export-ios-step-for-resigning.png)

これでおしまいです！必要に応じて、複数の異なる署名付き.ipaファイルを作成するために、複数の`Export iOS and tvOS Xcode archive`ステップをワークフローに自由に追加できます。
