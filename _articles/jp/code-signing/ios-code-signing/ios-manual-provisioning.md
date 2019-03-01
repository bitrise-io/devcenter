---
title: iOSコード署名ファイルの管理 - 手動プロビジョニング
menu:
  ios-code-signing:
    weight: 4
---
[Bitrise](https://www.bitrise.io)上であなたのコード署名に必要なファイルを管理しましょう。手動でプロビジョニングを行う場合、Provisioning profileと.p12証明書ファイルを[codesigndoc](https://github.com/bitrise-tools/codesigndoc)ツールで収集できます。またこれらのファイルを手動またはツール経由でアップロードしてください。

BitriseはXcode 8で導入された_Automatically manage signing_オプションをサポートしています。この場合は、Xcodeが必要なプロファイルを生成できるように、あなたのローカル環境で所望する形式の.ipaファイルをビルドしてください。プロファイルが生成されるとcodesigndocはこれらを収集できるようになります。プロジェクトの変更によりXcodeがプロファイルを再生成した場合、新しいプロファイルをBitriseに再度アップロードする必要があります。

codesigndocを使用して必要なファイルを収集した場合、これらをアップロードするとともにワークフローの設定を行ってください。以下の例ではコード署名用のファイルを手動でアップロードしていますが、codesigndocを使ってアップロードすることもできます！

1. `Dashboard`からアプリを開く
2. `Workflow Editor`タブを選択する
3. `Code Signing`タブを選択する
4. Provisioning profileと.p12証明書ファイルがアップロードされていることを確認する。アップロードされていなかった場合は、`Add Provisioning Profile(s)`フィールドと`Add the private key (.p12) for signing`フィールドからそれぞれ追加する。

   ![Uploading certificates and Provisioning Profiles](/img/code-signing/ios-code-signing/provisioning-and-certificate-upload.png)

   Provisioning profileの拡張子は、macOS用プロジェクトの場合は`.provisionprofile`、iOS用プロジェクトの場合は`.mobileprovision`です。
5. ワークフロー内に`Certificate and profile installer`ステップがあることを確認する(設定は`Workflow Editor`内の`Workflow`タブで確認できます)

   これらのステップはアーカイブや書き出しを行うステップ(`Xcode Archive & Export for iOS`ステップなど)**よりも前**に行う必要があることに注意してください。

   ![Certificate and profile installer step in your workflow](/img/code-signing/ios-code-signing/workflow-with-cert-prof-inst.png)

`codesigndoc`が配布用.p12証明書ファイルとProvisioning profileを取得できなかった場合は、Mac間でファイルをやり取りするのと同様に、これらのファイルを手動で書き出すことができます。(.p12証明書は`Keychain Access`から、 Provisioning profileは[Apple Developerポータル](https://developer.apple.com/)から書き出すことができます)

ただし、__`codesigndoc`がファイルをすべて取得できなかった場合でも、`codesigndoc`が収集したファイルはすべてアップロードしてください！__`codesigndoc`が収集したファイルは、コード署名を行うのに必要不可欠なものです。これらがない場合、署名済みの.ipaファイルの生成は不可能です！
