---
tag: []
title: iOSコード署名トラブルシューティング（改）
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

## The Xcode Archive & Export for iOS Step fails [⚓](https://devcenter.bitrise.io/code-signing/ios-code-signing/ios-code-signing-troubleshooting/#the-xcode-archive--export-for-ios-step-fails)

If the Step fails, check the logs. If you see the message: `Code signing error` then this guide can hopefully help you find the solution!

![](https://devcenter.bitrise.io/img/archive_fail.png)

Most of the time, this error means your project is missing either the correct .p12 certificate file or the correct provisioning profile - or the **Select method for export** input of the Step is set incorrectly.

### Manual provisioning [⚓](https://devcenter.bitrise.io/code-signing/ios-code-signing/ios-code-signing-troubleshooting/#manual-provisioning)

If you manually upload your provisioning profiles and use the **Certificate and profile installer** Step to install your code signing files, read on.

If you use the **iOS Auto Provision with App Store Connect API** Step, skip to [Automatic provisioning](https://devcenter.bitrise.io/code-signing/ios-code-signing/ios-code-signing-troubleshooting/#automatic-provisioning).

1. Check that you have both a .p12 certificate and a provisioning profile uploaded to Bitrise.

   To do so, go to your app’s Workflow Editor and check the **Code Signing** tab.
2. Check that the provisioning profile and the .p12 certificate of your project match.

   A Development type provisioning profile requires a Development certificate. An App Store, Ad-hoc or Enterprise type provisioning profile requires a Distribution certificate. You can check the compatibility on the **Code Signing** tab: click **Show matching Certificates, Devices & Capabilities** under any provisioning profile.
3. Check that the uploaded code signing files belong to the correct team IDs.

   Also, make sure the provisioning profile is for the correct Bundle ID.
4. Check that your uploaded code signing files are valid!

   Remember that these files can and do expire or get revoked.
5. Check the **Select method for export** input of the Step in the Workflow Editor.

   If, for example, it is set to `ad-hoc` or `app-store`, you need a Distribution type .p12 certificate file and either an Ad-hoc or an App Store type provisioning profile.

   ![](https://devcenter.bitrise.io/img/export_fail.png)
6. Check if the capability lists in the **iOS app** and in the **provisioning profile uploaded to the Developer Portal** match.

   ![](https://devcenter.bitrise.io/img/capapbilities_xcode.png)

Xcode managed signing

If you use Xcode managed signing, the Step only accepts an Xcode managed provisioning profile.

Read more about it in [Apple’s Technical Q&A](https://developer.apple.com/library/archive/qa/qa1814/_index.html).

### Automatic provisioning [⚓](https://devcenter.bitrise.io/code-signing/ios-code-signing/ios-code-signing-troubleshooting/#automatic-provisioning)

With the **iOS Auto Provision with App Store Connect API** Step, you do not need to manually upload a provisioning profile to Bitrise. You only need a certificate.

1. Check that you have a .p12 certificate uploaded to Bitrise.

   To do so, go to your app’s Workflow Editor and check the **Code Signing** tab.

   Check that the uploaded code signing files belong to the correct team IDs.

   Also, make sure the provisioning profile is for the correct Bundle ID.
2. Check that your uploaded certificate is valid!

   Remember that these files can and do expire or get revoked.
3. Check the **Select method for export** input of the Step in the Workflow Editor.

   If, for example, it is set to `ad-hoc` or `app-store`, you need a Distribution type .p12 certificate file.
4. Check if the certificate is locked. If it is, check if the password is correct!

When you use the **iOS Auto Provision with App Store Connect API** Step, using Xcode managed signing is an important factor. Let’s go through what can happen depending on whether you use the option.

#### If Xcode managed signing is enabled in the iOS app [⚓](https://devcenter.bitrise.io/code-signing/ios-code-signing/ios-code-signing-troubleshooting/#if-xcode-managed-signing-is-enabled-in-the-ios-app)

1. Check the value of the **Should the step try to generate Provisioning Profiles even if Xcode managed signing is enabled in the Xcode project?** input in the **iOS Auto Provision with App Store Connect API** Step.
   * If it’s set to `no`, the Step will look for an Xcode Managed Provisioning Profile on the Apple Developer Portal.
   * If it’s set to `yes`, the Step will generate a new manual provisioning profile on the Apple Developer portal for the project.
2. Check if the capability lists in the iOS app and in the provisioning profile on the Developer Portal match.

   This is only relevant if the **iOS Auto Provision with App Store Connect API** Step is set to NOT generate a profile.

#### If Xcode managed signing is disabled in the iOS app [⚓](https://devcenter.bitrise.io/code-signing/ios-code-signing/ios-code-signing-troubleshooting/#if-xcode-managed-signing-is-disabled-in-the-ios-app)

If you uncheck Xcode managed signing, the **iOS Auto Provision with App Store Connect API** Step generates a new provisioning profile on the Apple Developer portal for the project when running a build. This profile will be up to date with all of the capabilities and developer devices.

## Have you exceeded the file count limit of the provisioning profiles?   
Provisioning Profileのファイル制限を超過していますか？

The maximum number of provisioning profiles you can upload to the Code Signing tab is 50. If you’ve already reached this limit and wish to use even more, then here are a few tips on how to use even more provisioning profiles:

Code SigningタブにアップロードできるProvisioning Profileの数は最大50となっています。この制限を超えている、またはより多く使用されたい方のために、数点のTipsを紹介します：

* Use the **iOS Auto Provision with App Store Connect API** Step. This only requires the code signing identities (certificates with .p12 extension) to be uploaded to Bitrise. You can download the provisioning profiles from the Apple Developer portal on-the-fly during the build if you have [connected your Apple Developer account to Bitrise](https://bitrise.atlassian.net/connecting-apple-dev-account/#enabling-apple-developer-portal-integration "/connecting-apple-dev-account/#enabling-apple-developer-portal-integration").
* **iOS Auto Provision with App Store Connect API** ステップの使用を推奨しています。このステップにより、コード署名IDをBitriseにアップロードするだけなのでシンプルです。[BitriseへApple Developerアカウントを接続済み](https://bitrise.atlassian.net/connecting-apple-dev-account/#enabling-apple-developer-portal-integration)であれば、ビルド中にApple DeveloperポータルよりProvisioning Profileをダウンロードできます。
* You can create a .zip file containing the required certificates/profiles. In this case, you don’t need to upload any certificates/profiles on Bitrise. During the build you can download the .zip file and update the certificate/profile related inputs of the **Certificate and Profile Installer** Step to match the path to the certificate/profile on the build machine. Note that the **Certificate and Profile Installer** Step supports local paths and URLs for certificates and profiles.
* 必要な証明書やプロファイルを含む.zipファイルを作成することができます。この場合、Bitriseへ証明書やプロファイルのアップロードは不要です。ビルド中に.zipファイルをダウンロードして、ビルドマシン上の証明書やプロファイルのパスをマッチするために
* You can host the profiles and certificates yourself, and only add an URL that is pointing to a given certificate/profile to the workflow.

Also note that multiple URLs can be specified for both the certificate and profile inputs. Make sure you separate them with a pipe (`|`) character.

## The **iOS Auto Provision with App Store Connect API** Step fails [⚓](https://devcenter.bitrise.io/code-signing/ios-code-signing/ios-code-signing-troubleshooting/#the-ios-auto-provision-with-app-store-connect-api-step-fails)

The **iOS Auto Provision with App Store Connect API** Step manages your provisioning profiles for you: it downloads the profiles from the Apple Developer portal and installs them for you. Here’s what you can do if this Step fails:

* If you are trying to use it with a Xamarin app, you will have to swap it for the **Certificate and profile installer** Step. Automatic provisioning is not supported for Xamarin apps.
* Before trying to use this Step, generate an .ipa file locally - with the same export method you want to use on Bitrise - to ensure that the profiles are uploaded to the Apple Developer portal.
* Make sure that your Bitrise account is connected to the Apple Developer portal and that you have at least an Admin role in your Apple Developer team.

### Test device already registered [⚓](https://devcenter.bitrise.io/code-signing/ios-code-signing/ios-code-signing-troubleshooting/#test-device-already-registered)

If the **iOS Auto Provision with App Store Connect API** Step fails with this error message, it is likely that you registered a specific test device on Bitrise twice.

![](https://devcenter.bitrise.io/img/device-2.png)

Check out if the same UDID has been registered twice:

1. Open the app on Bitrise.
2. Go to the **Team** tab.
3. Scroll down and click the **Download list of test devices** button.

The result will be in json format: check if the same UDID appears twice. If so, it has to be removed from the account to which it was registered.

1. Open the top-right menu and click **Account settings**.
2. On the left, click **Test devices**.
3. Remove one of the duplicated devices.

## Could not install the app on a device [⚓](https://devcenter.bitrise.io/code-signing/ios-code-signing/ios-code-signing-troubleshooting/#could-not-install-the-app-on-a-device)

To install iOS apps on a given device, you have to either:

* Export an .ipa file with the `development` export method, with the device’s UDID registered in the provisioning profile used for the export.
* Export an .ipa file with the `ad-hoc` export method and install the app via the public install page generated by the **Deploy to Bitrise.io** Step.

1. Check that the device UDID is included in the app’s provisioning profile.
   * If you use manual provisioning, check the provisioning profile you uploaded to Bitrise.
   * If you use automatic provisioning, **Should the step try to generate Provisioning Profiles even if Xcode managed signing is enabled in the Xcode project?** input is set to `no` in the **iOS Auto Provision with App Store Connect API** step: check the provisioning profile on the Apple Developer Portal.
   * If you use automatic provisioning, and the **Should the step try to generate Provisioning Profiles even if Xcode managed signing is enabled in the Xcode project?** input is set to `yes` in the **iOS Auto Provision with App Store Connect API** Step: check that the device is registered to the developer team on the Apple Developer portal.
2. Check the logs to see if the **Xcode Archive & Export for iOS** Step used the provisioning profile with the device’s UDID in it.