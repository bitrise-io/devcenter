[bitrise.io](https://www.bitrise.io)でコード署名ファイルを管理します。 iOS自動プロビジョニングを使用して、プロジェクトに必要なプロビジョニングプロファイルを自動でダウンロードまたは生成できます。

自動プロビジョニングでは、`iOS Auto Provision`ステップがプロビジョニングプロファイルを管理します。 .p12証明書ファイルを[bitrise.io](https://www.bitrise.io)に手動でアップロードするだけです。

{% include message_box.html type="important" title="配布と開発署名証明書をアップロードする" content=" あなたのプロジェクトのdevelopmentとdistributionの署名証明書を **両方とも** アップロードすることを強く推奨します。異なるタイプの署名済みIPAを生成することはできません。 "%}

ワークフローで自動プロビジョニングを設定する前に、次の点を確認してください。

* [codesigndoc](https://github.com/bitrise-tools/codesigndoc)で必要なファイルを収集していること。ツールを使用してdevelopmentおよびdistributionの証明書をアップロードすることもできます。
* Developer Potal Teamで **Admin** 以上のロールを持っていること。
* [Apple Developer Accountがbitrise.ioに接続されていること](/getting-started/signing-up/connecting-apple-dev-account/)
* BitriseプロジェクトへのApple Developer Portalの統合が有効になっていること。

{% include message_box.html type="important" title="iOS自動プロビジョニング" content="`iOS Auto Provision`ステップを使用した自動プロビジョニングはXamarinアプリではサポートされていません！"%}

準備が整ったら、ファイルのアップロードとワークフローの設定に進みます。

1. アプリを `Dashboard`で開きます。
2. `Workflow Editor`タブを選択します。
3. `Code Signing`タブを選択します。
4. .p12証明書ファイルがアップロードされていることを確認します。そうでなければ、.p12ファイルを`Add the private key (.p12) for signing`から追加します。

   ![証明書とプロビジョニングプロファイルのアップロード](/img/code-signing/ios-code-signing/provisioning-and-certificate-upload.png)
   MacOSプロジェクトの場合、プロビジョニングプロファイルのファイル拡張子は `.provisionprofile` です。 iOSプロジェクトの場合、ファイル拡張子は`.mobileprovision`です。
5. ワークフローに`Certificate and profile installer`ステップが **ない** ことを確認します。ワークフローに `iOS Auto Provision`と` Certificate and profile installer`の両方のステップがある場合、ビルドは失敗します。
6. アプリケーションのワークフローに `iOS Auto Provision`ステップを追加します。 `Workflow Editor`の` Workflow`タブで確認できます。

   このステップは、`Run CocoaPods install`や`Carthage`のような、ワークフローに依存するインストーラのステップの **後** になっている必要があります。`iOS Auto Provision`と`Xcode Archive & Export for iOS`の手順の間でXcodeプロジェクトを変更しないでください。例として、`iOS Auto Provision`ステップの後でバンドルIDを変更しないでください。

   ![iOS Auto Provisioning in your workflow](/img/code-signing/ios-code-signing/workflow-with-auto-prov.png)
7.ステップに必要なInputを入力します。
   * `Developer Portal team id` - Apple Developer Portalアカウントの[your Apple Developer Portal accountのメンバーシップ詳細ページ](https://developer.apple.com/account/#/membership)で確認できます。
   * `Distribution type` - その値が`Xcode Archive & Export for iOS step`ステップで入力した`Export for Select`メソッドの値と一致していることを確認してください。
   * `Scheme` - どのターゲットを処理するかを制限することができます。

Xcodeで _Automatically manage signing option_ を使用すると、もう1つInputを設定できます。Inputの`Should the step try to generate Provisioning Profiles even if Xcode managed signing is enabled in the Xcode project?`が`true`ならプロファイルを生成しようとします。 Xcodeで手動コード署名を使用する場合、この入力は効果がありません。

`codesigndoc`が1つ以上の配布用.p12ファイルを取得しない場合、Mac間で転送するときと同じように、`Keychain Access`アプリケーションから手動でエクスポートすることができます。
