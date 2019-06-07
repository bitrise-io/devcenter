---
title: Bitrise.ioへiOSアプリのデプロイ
date: 2018-10-26T12:37:47.000+00:00
redirect_from: []
menu:
  ios-deploy:
    weight: 3

---
アプリをBitriseへデプロイすることは、.ipaファイルをダウンロードしたり、そのアプリのDevelopment Provisioning Profileに指定されたデバイスでインストールすることができます。この方法により、内部テスターが簡単にアプリのテストを行えます。

#### 始める前に

* 最低一回、ご自身のマシン上で、ローカルで.ipaファイルを生成した
* プロビジョニングプロファイルに含まれた全てのDeveloper証明書をBitriseへアップロードした
* Bitriseで[マニュアルプロビジョニング](/jp/code-signing/ios-code-signing/ios-manual-provisioning/)を使用したい場合、アプリのDevelopment Provisioning Profileをアップロードした
* Bitriseから、もしくはBitriseから送られる通知メールからアプリのインストールを行いたい場合、Bitrise上で[テスターのデバイスを登録した](/jp/testing/registering-a-test-device/)

かどうか確認してください。

{% include message_box.html type="important" title="My message" content="iOSアプリをデプロイするには、**常に**Developerタイプの証明書とDevelopmentタイプのプロビジョニングプロファイルが必要になります。App Storeへデプロイするしないにかかわらず、それらは必要になります：.ipaファイルのエクスポートの過程において、与えられたコードから.xcodearchiveファイルを作成するのに使用されます。"%}

#### アプリのデプロイ

1. ワークフローに`Certificate and profile installer`ステップまたは`iOS Auto Provision`ステップがあることを確認してください。両方は使わないでください！
2. ワークフローに`Xcode Archive & Export for iOS`ステップがあることを確認してください。
3. `Select method for export`ステップのインプットを`development`に設定します。

   他のエクスポート方法も使うことができますが、Bitriseへのみデプロイを実行し、アプリを内部テスターの指定されたデバイスへインストールを行いたいのであれば、`development`が効率的です。

   ![](/img/code-signing/ios-code-signing/xcode-archive-export-method.png)
4. ワークフローに`Deploy to Bitrise.io`ステップがあることを確認してください。デフォルトでは、`Enable public page for the App?`インプットの値が`true`に設定されています。この方法では、一旦ビルドが実行されると、公開インストールページが利用可能になります。長くてランダムなURLなので、Bitriseに登録していない人との共有を行えます。このURLはメールでユーザーに送られます。`Notify: User Roles`と`Notify: Emails` インプットで誰がそのメールを受け取るのか確認できます。
5. ビルドを開始します。
6. ビルドが終了したら、アプリの`Builds`ページへ進み直近のビルドをクリックします。
7. `APPS & ARTIFACTS`タブをクリックして.ipaファイルを探します。  
   ここで公開インストールURLも見つけることができます。

   ![](/img/public-install-page.png)

完了です！これでファイルがアプリのプロビジョニングプロファイルに含まれるすべてのデバイスにおいてインストールされます。