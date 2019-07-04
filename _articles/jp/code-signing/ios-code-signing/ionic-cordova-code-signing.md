---
title: IonicとCordovaプロジェクトのコード署名
menu:
  ios-code-signing:
    weight: 13

---
Bitriseは**Ionic**や**Cordova**でビルドしたiOSアプリのサポートも行っております。しかし、コード署名プロセスは”ネイティブ”Xcodeプロジェクトと比べて、少し違いがあります。

Bitriseは同様にIonicとCordovaアプリのマニュアルとオートプロビジョニングの両方においてサポートを行っております。ここでも、少しだけプロセスは異なります。

### マニュアルプロビジョニングによるIonic/Cordovaコード署名

1. `cordova platform add ios`もしくは`ionic cordova platform add ios`を呼び出して、Ionic/CordovaプロジェクトからローカルでネイティブXcodeプロジェクトを生成します。
2. Bitriseの`codesigndoc`ツールを使って[コード署名ファイルの収集](https://devcenter.bitrise.io/code-signing/ios-code-signing/collecting-files-with-codesigndoc/)を行います。
3. ファイルを[bitrise.io](https://www.bitrise.io)へアップロードします。

   ウェブUI上で行うか、`codesigndoc`ツールを使って行うことができます。

   ![Screenshot](/img/code-signing/ios-code-signing/provisioning-and-certificate-upload.png)
4. ワークフロー内に`Certificate and profile installer`ステップがあることを確認します。
5. ワークフローへ`Generate cordova build configuration`ステップを追加します。このステップは、`Certificate and profile installer`ステップの後に来る必要があります。
6. そのステップの必要事項を記入します。`Code Signing Identity`と`Provisioning Profile`の両方がiOSアプリの必要なインプットになるのでご注意ください。

   ![Screenshot](/img/code-signing/ios-code-signing/cordova-config-inputs.png)
   * `Build configuration`: `debug`もしくは`release`のどちらかをセットすることができます。
   * `Code Sign Identity`: Developer IdentityもしくはDistribution Identityを入力します。
   * `Provisioning Profile`: 適切なプロビジョニングプロファイルを入力します。
   * `Packaging Type`: これはビルドタイプをコントロールし、Xcodeより生成されます。必要なコード署名タイプをセットしてください。
7. ワークフローへ`Cordova archive`もしくは`Ionic archive`ステップを追加します。
8. 必要な情報を入力します。
   * `Platform`インプットへ`device`とセットします。
   * `Build command configuration`インプットは`Generate cordova build configuration`ステップの`Build configuration`にマッチしなければなりません。

   このステップはワークフローの`Generate cordova build configuration`ステップの後に来る必要があります。
9. ビルドを開始してください！

### Ionic/Cordova code signing with auto provisioning

オートプロビジョニングによるIonic/Cordovaコード署名

1. ご自身の.p12署名証明書が[bitrise.io](https://www.bitrise.io)にアップロードが完了していることを確認してください。ファイルの収集を行うのに`codesigndoc`を使う場合、証明書のみのエクスポートをするツールを以下のように呼び出すことができます：

       codesigndoc scan --certs-only xcode

   `codesigndoc`はウェブサイトへファイルのアップロードも行いますが、マニュアルで行うこともできます。
2. ワークフローへ`Cordova prepare`もしくは`Ionic prepare`ステップを追加します。これらのステップは`platform rm`と`Ionic prepare`コマンドの呼び出しを行います。
3. ワークフローへ`iOS Auto Provision`ステップを追加します。最新のバージョンであることをお確かめください！

   このステップは：
   * プロジェクトの開発チーム
   * インストールされたcodesign identity名
   * インストールされたプロビジョニングプロファイル

   のエクスポートを行います。
4. ワークフローへ`Generate cordova build configuration`ステップを追加します。`iOS Auto Provision`ステップによってエクスポートされたコード署名設定を使用してステップの構成を行ってください：

   **Development distributionの例**:

       - generate-cordova-build-configuration:
       	inputs:
           - development_team: $BITRISE_DEVELOPER_TEAM 
           - package_type: development 
           - code_sign_identity: $BITRISE_DEVELOPMENT_CODESIGN_IDENTITY 
           - provisioning_profile: $BITRISE_DEVELOPMENT_PROFILE 
           - configuration: debug

   **Production distributionの例**:

       - generate-cordova-build-configuration:
           inputs:
           - development_team: $BITRISE_DEVELOPER_TEAM 
           - package_type: app-store 
           - code_sign_identity: $BITRISE_PRODUCTION_CODESIGN_IDENTITY 
           - provisioning_profile: $BITRISE_PRODUCTION_PROFILE 
           - configuration: release
5. ワークフローへ`Cordova Archive`もしくは`Ionic Archive`ステップを追加します。
6. 必要な情報を入力します。
   * `Platform`インプットへ`device`とセットします。
   * `Build command configuration`インプットは`Generate cordova build configuration`ステップの`Build configuration`にマッチしなければなりません。

   ![Screenshot](/img/code-signing/ios-code-signing/cordova-archive-step.png)
7. `Should remove platforms as prepare step?`を`false`にセットします。

   ※このステップは、`Cordova prepare`もしくは`Ionic prepare`ステップ内で生成されたネイティブプロジェクトのプラットフォームを消去したり再追加したりするのを防ぎます。
8. ビルドを開始してください！