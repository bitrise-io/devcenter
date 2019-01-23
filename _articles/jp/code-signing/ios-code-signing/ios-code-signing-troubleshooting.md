---
# jp title missing
title: iOS code signing - troubleshooting
menu:
  ios-code-signing:
    weight: 13
---
BitriseでiOSのコード署名を行うためには、基本的に以下の３つが必要です。

* Provisioning profile
* 証明書ファイル(.p12形式)
* `Xcode Archive & Export for iOS`ステップ内の`Select method for export`を設定すること

コード証明に必要なファイルは、以下の方法で取得できます。

- [codesigndoc](https://github.com/bitrise-tools/codesigndoc)を使用する
- [Xcodeを使って書き出す](https://devcenter.bitrise.io/code-signing/ios-code-signing/exporting-code-signing-files/#exporting-certificates-using-xcode)
- [Keychain Accessから書き出す](https://devcenter.bitrise.io/code-signing/ios-code-signing/exporting-code-signing-files/#exporting-manually)

コード署名に関連するエラーが疑われる場合、大半は上記の３つのいずれかに問題があります。BitriseでiOSアプリのビルドを行う際には、まずあなたの端末のローカル環境で.ipaファイルの生成を行うことを強く推奨します。この時点でビルドに失敗する場合、Bitriseにおいてもほぼ間違いなくビルドは失敗します。

早速、コード署名を行うために必要なことを確認しましょう！

### _Xcode Archive & Export for iOS_ステップが_Code signing error_エラーになった

多くの場合、このエラーが発生するのは、適切な.p12証明書かProvisioning profileがプロジェクト内に存在しない、あるいは`Select method for export`の設定が誤っていることが原因です。 以下の方法を試してみてください。

* **Provisioning profileと.p12証明書がいずれもBitriseにアップロードされているかを確認する**。`Workflow Editor`内の`Code Signing`タブから確認できます。`iOS Auto Provision`ステップを使用している場合は、.p12証明書ファイルのみをアップロードしておく必要があります。

![](/img/archive_fail.png)

* **プロジェクト内のProvisioning profileと.p12証明書の対応を確認する**。Development用のProvisioning profileには開発用の証明書が必要です。App StoreとAd-hoc、およびEnterprise用のProvisioning profileには配布用の証明書が必要です。

* **アップロードしたコード署名用のファイルが適切なチームIDのものであるかを確認する**。あわせて、Provisioning profileが適切なApp IDのものであるかも確認してください。

* アップロードしたコード証明用のファイルが有効であるかを確認してください！また、これらのファイルは有効期限があり、無効化できることにも注意してください。

* **Workflow Editor内で`Select method for export`の設定を確認する**。例えば、 `ad-hoc`または`app-store`に設定している場合、配布用の.p12証明書ファイルとAdHoc用またはApp Store用のProvisioning profileが必要です。

![](/img/export_fail.png)

* **`iOS Auto Provision`ステップおよび`Certificate and profile installer`ステップの両方がワークフロー内に含まれていないことを確認する**。これら２つのステップを同一のワークフロー内に含めることはできません。この場合、ビルドは必ず失敗します。

### _iOS Auto Provision_ステップが失敗した

`iOS Auto Provision`ステップはあなたのProvisioning profileを管理します。このステップではApple Developerポータルからプロファイルのダウンロードとインストールを行います。このステップ内の処理に失敗した場合は、以下の内容を確認してください。

* **Xamarin用アプリで実行した場合**、このステップの代わりに`Certificate and profile installer`ステップを追加してください。Xamarin用アプリでは自動プロビジョニングはサポートされていません。

* **このステップを実行する前に、ローカルで.ipaファイルを生成する**。Bitrise上で実行したいものと同じ方法で書き出しを行い、プロファイルがApple Developerポータルにアップロードされることを確認してください。

* **BitriseアカウントがApple Developerポータルと連携されていることを確認する**。あわせて、Apple DeveloperチームのAdmin以上の権限があることを確認してください。

### 配布用証明書とApp Store用Provisioning profileをアップロードしたが、コード証明エラーでApp Storeにデプロイできない！

書き出し方法を`app-store`または`ad-hoc`に設定して.ipaファイルを書き出すには、開発用証明書と開発用Provisioning profileもアップロードする必要があります。これは、.ipaを書き出す最初の処理として、.xcodearchiveファイルを生成するために使用されます。

### _Run Cocoapods Install_ステップを追加したが、ビルドに失敗した

依存関係のインストールに失敗する理由には様々なものがあります。iOSのコード署名においては、`iOS Auto Provision`ステップを使用すると問題が発生することがあります。Bitriseのワークフローでは、`Run Cocoapods Install`や`Carthage`といった依存関係のインストールを行うステップは`iOS Auto Provision`ステップより前に行わなければなりません。
