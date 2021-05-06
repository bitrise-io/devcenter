---
tag: []
title: iOSコード署名 -トラブルシューティング　(iOS code signing - troubleshooting -) modified ver.
redirect_from: []
summary: ''
published: false

---
BitriseでiOSのコード署名を行うためには、基本的に以下の３つが必要です。

* Provisioning profile
* 証明書ファイル(.p12形式)
* `Xcode Archive & Export for iOS`ステップ内の`Select method for export`を設定すること

コード証明に必要なファイルは、以下の方法で取得できます。

* [codesigndoc](https://github.com/bitrise-tools/codesigndoc)を使用する
* [Xcodeを使って書き出す](https://devcenter.bitrise.io/code-signing/ios-code-signing/exporting-code-signing-files/#exporting-certificates-using-xcode)
* [Keychain Accessから書き出す](https://devcenter.bitrise.io/code-signing/ios-code-signing/exporting-code-signing-files/#exporting-manually)

コード署名に関連するエラーが疑われる場合、大半は上記の３つのいずれかに問題があります。BitriseでiOSアプリのビルドを行う際には、まずあなたの端末のローカル環境で.ipaファイルの生成を行うことを強く推奨します。この時点でビルドに失敗する場合、Bitriseにおいてもほぼ間違いなくビルドは失敗します。

早速、コード署名を行うために必要なことを確認しましょう！

## Xcode Archive & Export for iOSステップがエラー (Code signing error) になった場合の対処法

多くの場合、このエラーが発生するのは、適切な.p12証明書かProvisioning profileがプロジェクト内に存在しない、あるいは`Select method for export`の設定が誤っていることが原因です。 以下の方法を試してみてください。

* **Provisioning profileと.p12証明書がいずれもBitriseにアップロードされているかを確認する**。`Workflow Editor`内の`Code Signing`タブから確認できます。`iOS Auto Provision`ステップを使用している場合は、.p12証明書ファイルのみをアップロードしておく必要があります。

![{{ page.title }}](/img/archive_fail.png)

* **プロジェクト内のProvisioning profileと.p12証明書の対応を確認する**。Development用のProvisioning profileには開発用の証明書が必要です。App StoreとAd-hoc、およびEnterprise用のProvisioning profileには配布用の証明書が必要です。
* **アップロードしたコード署名用のファイルが適切なチームIDのものであるかを確認する**。あわせて、Provisioning profileが適切なApp IDのものであるかも確認してください。
* アップロードしたコード証明用のファイルが有効であるかを確認してください！また、これらのファイルは有効期限があり、無効化できることにも注意してください。
* **`iOS Auto Provision`ステップおよび`Certificate and profile installer`ステップの両方がワークフロー内に含まれていないことを確認する**。これら２つのステップを同一のワークフロー内に含めることはできません。この場合、ビルドは必ず失敗します。

### マニュアルによるプロビジョニング

マニュアルでprovisioning profileをアップロードして、コード署名ファイルをインストールするのに**Certificate and Profile Installer**ステップを利用される場合、以下をお読みください。

**iOS Auto Provision with App Store Connect API** ステップを使用する場合、[オートによるプロビジョニング](https://devcenter.bitrise.io/jp/code-signing/ios-code-signing/ios-code-signing-troubleshooting/#オートによるプロビジョニング)は読み飛ばして頂いて結構です。

1. **Provisioning profileと.p12証明書がいずれもBitriseにアップロードされているかを確認する**。`Workflow Editor`内の`Code Signing`タブから確認できます。
2. **プロジェクト内のProvisioning profileと.p12証明書の対応を確認する**。Development用のProvisioning profileには開発用の証明書が必要です。App StoreとAd-hoc、およびEnterprise用のProvisioning profileには配布用の証明書が必要です。**Code Signing**タブを確認して互換性を見ることができます：provisioning profileの下にある**Show matching Certificates, Devices & Capabilities**をクリックします。
3. **アップロードしたコード署名用のファイルが適切なチームIDのものであるかを確認する**。あわせて、Provisioning profileが適切なBundle IDであるかも確認してください。
4. アップロードしたコード証明用のファイルが有効であるかを確認してください！また、これらのファイルは有効期限があり、無効化できることにも注意してください。
5. **Workflow Editor内で`Select method for export`の設定を確認する**。例えば、 `ad-hoc`または`app-store`に設定している場合、配布用の.p12証明書ファイルとAdHoc用またはApp Store用のProvisioning profileが必要です。

   ![{{ page.title }}](https://devcenter.bitrise.io/img/export_fail.png)
6. **iOS app**と**provisioning profile uploaded to the Developer Portal**内のcapabilitiesリストが対応しているか確認します。

   ![{{ page.title }}](https://devcenter.bitrise.io/img/capapbilities_xcode.png)

{% include message_box.html type="important" title="Xcodeによって管理された署名" content="Xcodeによって管理されている署名 (Xcode managed signing) を使用する場合、ステップはXcodeによって管理されているprovisioning profileのみを認識します。

詳しくは [Apple’s Technical Q&A](https://developer.apple.com/library/archive/qa/qa1814/_index.html)を参照してください。"%}

### オートによるプロビジョニング

**iOS Auto Provision with App Store Connect API**ステップを使うことにより、マニュアルによるBitriseへのprovisioning profileのアップロードを行う必要がなくなります。ここでは証明書のみが必要になります。

1. Provisioning profileと.p12証明書がいずれもBitriseにアップロードされているかを確認します。`Workflow Editor`内の`Code Signing`タブから確認できます。

   また、アップロードしたコード署名用のファイルが適切なチームIDのものであるかを確認します。あわせて、Provisioning profileが適切なBundle IDであるかも確認してください。
2. アップロードしたコード証明用のファイルが有効であるかを確認してください！また、これらのファイルは有効期限があり、無効化できることにも注意してください。
3. Workflow Editor内で`Select method for export`の設定を確認します。例えば、 `ad-hoc`または`app-store`に設定している場合、配布用の.p12証明書ファイルが必要です。
4. 証明書がロックされていることを確認します。確認後、パスワードが正確であるかの確認も行ってください。

 **iOS Auto Provision with App Store Connect API**ステップを使用する際、Xcodeによって管理されている署名は大事な要素となります。

#### Xcodeによって管理されている署名がiOSアプリ内で有効化されている場合 [⚓](https://devcenter.bitrise.io/code-signing/ios-code-signing/ios-code-signing-troubleshooting/#if-xcode-managed-signing-is-enabled-in-the-ios-app)

1. **iOS Auto Provision with App Store Connect API**ステップにある、**"Should the step try to generate Provisioning Profiles even if Xcode managed signing is enabled in the Xcode project?"**のインプット値を確認します。
   * `no`と設定されている場合、そのステップはApple Developer Portal内のXcode Managed Provisioning Profileを検索します。
   * `yes`と設定されている場合、そのステップはApple Developer Portalで新規のマニュアルprovisioning profileを生成します。
2. **iOS app**と**provisioning profile uploaded to the Developer Portal**内のcapabilitiesリストが対応しているか確認します。

   これは、**iOS Auto Provision with App Store Connect API**ステップがプロファイルの生成を_行わないように_設定されている場合のみ注意してください。

#### Xcodeによって管理されている署名がiOSアプリ内で無効化されている場合

Xcode managed signingのチェックを外している場合、**iOS Auto Provision with App Store Connect API**ステップはビルド実行中にApple Developer Portal上で新しくprovisioning profileを生成します。このプロファイルはすべての互換性と開発者のデバイスに合った最新の状態になります。

## Provisioning Profileのファイル制限を超過している場合の対処法

Code SigningタブにアップロードできるProvisioning Profileの数は最大50となっています。この制限を超えている、またはより多く使用されたい方のために、いくつかTipsを紹介します：

* **iOS Auto Provision with App Store Connect API** ステップの使用を推奨しています。このステップにより、コード署名IDをBitriseにアップロードするだけなのでシンプルです。[BitriseへApple Developerアカウントを接続済み]/getting-started/connecting-to-services/configuring-bitrise-steps-that-require-apple-developer-account-data/)であれば、ビルド中にApple DeveloperポータルよりProvisioning Profileをダウンロードできます。
* 必要な証明書やプロファイルを含む.zipファイルを作成することができます。この場合、Bitriseへ証明書やプロファイルのアップロードは不要です。ビルドマシン上の証明書やプロファイルのパスをマッチさせるため、ビルド中に.zipファイルをダウンロードして、**Certificate and Profile Installer**ステップの証明書やプロファイルのインプットをアップデートすることができます。**Certificate and Profile Installer**ステップはローカルパスと証明書・プロファイルのURLをサポートしています。
* プロファイルと証明書をご自身でホストすることが可能です。ワークフローへの与えられた証明書・プロファイルへ指し示しているURLを追加するだけです。

証明書とプロファイルのインプットの両方に複数のURLが指定されている場合があります。その場合、パイプキャラクター (`|`)を使用して区別してください。

## iOS Auto Provisionステップが失敗した場合の対処法

`iOS Auto Provision`ステップはあなたのProvisioning profileを管理します。このステップではApple Developerポータルからプロファイルのダウンロードとインストールを行います。このステップ内の処理に失敗した場合は、以下の内容を確認してください。

* **Xamarin用アプリで実行した場合**、このステップの代わりに`Certificate and profile installer`ステップを追加してください。Xamarin用アプリでは自動プロビジョニングはサポートされていません。
* **このステップを実行する前に、ローカルで.ipaファイルを生成する**。Bitrise上で実行したいものと同じ方法で書き出しを行い、プロファイルがApple Developerポータルにアップロードされることを確認してください。
* **BitriseアカウントがApple Developerポータルと連携されていることを確認する**。あわせて、Apple DeveloperチームのAdmin以上の権限があることを確認してください。

### テストデバイスがすでに登録されている場合

**iOS Auto Provision with App Store Connect API**ステップが以下のようなエラーメッセージが表示されて失敗する場合、特定のテストデバイスをBitriseへ二度登録している可能性があります。

![{{ page.title }}](https://devcenter.bitrise.io/img/device-2.png)

同じUDIDを２回登録した場合：

1. Bitrise上でアプリを開きます。
2. **Team**タブへ進みます。
3. 下にスクロールして、**Download list of test devices** ボタンをクリックします。

結果がjsonフォーマットで表示されます：同じUDIDが２回表示されていないかどうか確認してください。２回表示されている場合、アカウントから１つ消去する必要があります。

1. 右上隅のメニューより、**Account settings**をクリックします。
2. 左側にある**Test devices**をクリックします。
3. 重複しているデバイスを消去します。

## デバイスでアプリのインストールができない場合の対処法

特定のデバイスへiOSアプリをインストールする際、以下のいずれかを行う必要があります：

* `development` export methodを使用した.ipaファイルをエクスポートします。export用に使用されるprovisioning profile内で登録されているデバイスのUDIDを使います。
* `ad-hoc` export methodを使用した.ipaファイルをエクスポートして、**Deploy to Bitrise.io**ステップによって生成されたPublic Install page経由でアプリをインストールします。
* デバイスのUDIDがアプリのprovisioning profile内に含まれていることを確認してください。
  * マニュアルによるプロビジョニングを使用する場合、Bitriseへアップロードしたprovisioning profileを確認します。
  * オートによるプロビジョニングを使用していて、**iOS Auto Provision with App Store Connect API** ステップの '**Should the step try to generate Provisioning Profiles even if Xcode managed signing is enabled in the Xcode project?** 'のインプットを`no`に設定している場合：Apple Developer Portalにてprovisioning profileを確認してください。
  * オートによるプロビジョニングを使用していて、**iOS Auto Provision with App Store Connect API** ステップでの **'Should the step try to generate Provisioning Profiles even if Xcode managed signing is enabled in the Xcode project?'** のインプットを`yes`に設定している場合：Apple Developer Portalにてdeveloper teamへ登録されているデバイスを確認してください。
* **Xcode Archive & Export for iOS** ステップがデバイスのUDIDと共にprovisioning profileが使用されている場合、ログを確認してください。

## その他のトラブルシューティング

### 配布用証明書とApp Store用Provisioning profileをアップロードしたが、コード証明エラーでApp Storeにデプロイできない！

書き出し方法を`app-store`または`ad-hoc`に設定して.ipaファイルを書き出すには、開発用証明書と開発用Provisioning profileもアップロードする必要があります。これは、.ipaを書き出す最初の処理として、.xcodearchiveファイルを生成するために使用されます。

### Run Cocoapods Install ステップを追加したが、ビルドに失敗した

依存関係のインストールに失敗する理由には様々なものがあります。iOSのコード署名においては、`iOS Auto Provision`ステップを使用すると問題が発生することがあります。Bitriseのワークフローでは、`Run Cocoapods Install`や`Carthage`といった依存関係のインストールを行うステップは`iOS Auto Provision`ステップより前に行わなければなりません。