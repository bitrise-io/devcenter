---
title: 外部テスト用アプリのデプロイ (Deploying an iOS app for external testing)
redirect_from: []
published: false

---
App Storeへアプリのデプロイを行う前に、開発環境外の外部テスターのデバイスへリリースを行いたいですか？Testflightを使用したくない場合、**ad-hoc**エクスポート方法を使用した.ipaファイルのエクスポートを行うことが可能です。

{% include message_box.html type="important" title="Testflightの使用" content="Testflightを使って外部テスターを招待したい場合、**ad-hoc**エクスポート方法を**使用することはできません**。この際は、**app-store**エクスポート方法を使った.ipaが必要になります。"%}

#### 始める前に

* 最低一回、ご自身のマシン上で、ローカルで.ipaファイルを生成した
* プロビジョニングプロファイルに含まれたすべてのDeveloper証明書をBitriseへアップロードした
* Bitriseで[マニュアルプロビジョニング](/code-signing/ios-code-signing/ios-manual-provisioning/)を使用したい場合、アプリのDevelopment Provisioning Profileをアップロードした（オートプロビジョニングを使用する場合は、プロファイルのアップロードは必要ありません）
* アプリのDistribution証明書をアップロードした
* （マニュアルプロビジョニングを使用したい場合）Ad-hocプロビジョニングプロファイルをアップロードした

かどうか確認してください。

#### アプリのデプロイ

1. ワークフローに`Certificate and profile installer`ステップまたは`iOS Auto Provision`ステップがあることを確認してください。両方は使わないでください！
2. ワークフローに`Xcode Archive & Export for iOS`ステップがあることを確認してください。
3. `Select method for export`ステップのインプットを`ad-hoc`に設定します。
4. ワークフローに`Deploy to Bitrise.io`ステップがあることを確認してください。
5. ビルドを開始します。
6. ビルドが終了したら、アプリの`Builds`ページへ進み直近のビルドをクリックします。
7. `APPS & ARTIFACTS`タブをクリックして配布が可能な.ipaファイルを探します。