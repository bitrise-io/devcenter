---
title: MacOSのアプリ開始 (Getting started with MacOS apps)
redirect_from: []
date: 2019-03-21 09:26:34 +0000
published: false

---
{% include not_translated_yet.html %}

In this guide, we'll walk you through how to add a MacOS app to Bitrise, how to run Xcode tests, manage your code signing files and deploy the app to bitrise.io and to the App Store.

このガイドでは、BitriseにMacOSアプリを追加、Xcodeテストの実行、コード署名ファイルの管理、アプリを bitrise.ioとApp Storeにデプロイする方法を説明します。

## Adding a MacOS app

## MacOSアプリを追加

{% include message_box.html type="note" title="Do you have a Bitrise account?" content=" Make sure you have signed up to [bitrise.io](https://www.bitrise.io/) and can access your Bitrise account. Here are [4 ways](https://devcenter.bitrise.io/getting-started/index#signing-up-to-bitrise) on how to connect your Bitrise account to your account found on a Git service provider. "%}

{% include message_box.html type="note" title="Bitriseアカウントはありますか？" content=" [bitrise.io](https://www.bitrise.io/)にサインアップし、アクセスできるか確認してください。GitホスティングサービスのアカウントにBitriseアカウントを接続する方法は、[4通り](https://devcenter.bitrise.io/getting-started/index#signing-up-to-bitrise)あります。"%}

1. Click the `+` sign on the top menu bar and select `Add app`.
2. On the Create new App page, choose the account you wish to add the app to.
3. Set the privacy of the app to either Private or [Public](https://app.forestry.io/getting-started/adding-a-new-app/public-apps) and click `Next`.
4. Select the Git hosting service that hosts your repository, then find and select your repository that hosts the project. Read more about [connecting your repository](https://app.forestry.io/getting-started/adding-a-new-app/connecting-your-repository).
   1. 上部のメニューバーの`+`をクリックして`Add app`を選択します。
   2. 新しいアプリの作成ページで、アプリを追加するアカウントを選択します。
   3. アプリのプライバシーをPrivateまたは[Public](https://app.forestry.io/getting-started/adding-a-new-app/public-apps)に設定して`Next`をクリックします。
   4. リポジトリをホストするGitホスティングサービスを選択してから、プロジェクトをホストするリポジトリを見つけて選択します。

      詳しくは[connecting your repository](https://app.forestry.io/getting-started/adding-a-new-app/connecting-your-repository)参照ください。
5. When prompted to set up repository access, click `No, auto-add SSH key`. Read more about [SSH keys](https://app.forestry.io/getting-started/adding-a-new-app/setting-up-ssh-keys/).
6. Type the name of the branch that includes your project's configuration - master, for example - then click `Next`.
7. Wait while Bitrise is validating your project. We look for your configuration files and set up your app based on them.

   **IMPORTANT**: the validation will fail if you do not have a SHARED scheme in your project. You can still point Bitrise manually to your Xcode scheme but if it's shared, we automatically detect it for you. [Read more about schemes and the possible issues with them!](https://app.forestry.io/troubleshooting/frequent-ios-issues/#xcode-scheme-not-found)
8. Select the export method. You can modify this later - for now, select `development`.
   5\. リポジトリアクセスを設定するように求められたら、`No, auto-add SSH key`をクリックします。詳しくは [SSH keys](https://app.forestry.io/getting-started/adding-a-new-app/setting-up-ssh-keys/)を参照ください。
   6\.   プロジェクトの設定を含むブランチの名前（masterなど）を入力し、`Next`をクリックします。
   7\.   Bitriseがプロジェクトを検証している間お待ちください。設定ファイルを探し、それらに基づいてアプリを設定します。

    **重要**：プロジェクトにSHAREDスキームがない場合、検証は失敗します。Bitriseが自動的に検出するには、共有し、Xcodeスキームに手動でBitriseをポイントする必要があります。

   詳しくは[Schemes and the possible issue with them](https://app.forestry.io/troubleshooting/frequent-ios-issues/#xcode-scheme-not-found)を参照してください。
   8\. エクスポート方法を選択します。後で変更可能なので - `development`を選択します。

   ![](/img/project-build-config-macos.png)

   Once you clicked it, you should see your:
   * Project or Workspace path
   * Scheme name
   * export method
   * MacOS stack

     クリック後に、以下のものをチェックします
   * プロジェクトまたはワークスペース　パス
   * スキーム名
   * エクスポート方法
   * MacOSスタック
9. Register a webhook when prompted so that Bitrise can start a build automatically when code is pushed to your repository, or a pull request is created. This also kicks off your first build - click the message and it will take you to the build page.
   9. コードがリポジトリにプッシュされた場合、またはpull要求が作成された場合にBitriseが自動的にビルドを開始できるように、プロンプトが表示されたらwebhookに登録します。また、最初のビルドを開始でき - メッセージをクリックするとビルドページに移動します。

## Running Xcode tests

## Xcodeテストの実行

Once you created your app, the first build will run based on the automatically created **primary** workflow. You can check it out in the app's [Workflow Editor](https://app.forestry.io/getting-started/getting-started-workflows): click the app's name on your Dashboard then click the `Workflow` tab.

アプリを作成すると、最初のビルドは自動的に作成された**プライマリ**ワークフローに基づいて実行されます。ダッシュボードでをアプリの[Workflow Editor](https://app.forestry.io/getting-started/getting-started-workflows)をクリックしてから、`Workflow`タブをクリックします。

{% include message_box.html type="important" title="Test targets" content="If your app does not have test targets defined, the primary workflow will be the only automatically created workflow and it will NOT include the `Xcode Test for Mac` Step. "%}

{% include message_box.html type="important" title="テストターゲット" content="アプリにテストターゲットが定義されていない場合は、プライマリワークフローが自動的に作成される唯一のワークフローになり、`Xcode Test for Mac`ステップは含まれません。"%}

If you have test targets defined, the `primary` workflow of a MacOS app includes the two [Steps](https://app.forestry.io/getting-started/getting-started-steps) you need to run your Xcode tests, and view their results on [bitrise.io](https://bitrise.io/):

* `Xcode Test for Mac`
* `Deploy to Bitrise.io`

テストターゲットが定義されている場合、MacOSアプリの`primary`ワークフローには、Xcodeテストを実行し、それらの結果を[bitrise.io](https://bitrise.io/)で表示するために必要な2つの[Steps](https://app.forestry.io/getting-started/getting-started-steps)が含まれています。

* `Xcode Test for Mac`
* `Deploy to Bitrise.io`

{% include message_box.html type="note" title="Code signing files" content="Running Xcode tests and deploying their results to Bitrise do not require any code signing files. So don't worry about them just yet!"%}

{% include message_box.html type="note" title="コード署名ファイル" content="Xcodeテストを実行してその結果をBitriseにデプロイするのにコード署名ファイルは必要ありません。"%}

The `Xcode Test for Mac` step runs the pre-defined Xcode tests. It has a default configuration that does not need to be modified: if the tests are written correctly, they will work. You can find the same configuration options in Xcode, too.

`Xcode Test for Mac`ステップは、事前定義されたXcodeテストを実行します。変更する必要のないデフォルト設定：テストが正しく書かれていれば動作します。 Xcodeにも同じ設定オプションがあり。

The `Deploy to Bitrise.io` will deploy the following to the `Logs` and [Apps & Artifacts](https://app.forestry.io/builds/build-artifacts-online/) tab of the build:

* your Xcode test results
* your raw `xcodebuildoutput` log.

  
`Deploy to Bitrise.io`はビルドの`Logs` と [Apps & Artifacts](https://app.forestry.io/builds/build-artifacts-online/)タブに以下の二つをデプロイします。

*  Xcodeテスト結果 
* Raw`xcodebuildoutput`ログ。

## Code signing and exporting a MacOS app

## コード署名とMacOSアプリのエクスポート

To install and test the app on other physical devices, you will need to create and export an .app or .pkg file. This requires setting up code signing. In the example, we'll be exporting an app with the `development` export method: you cannot upload such an app to Testflight but you can test it, for example, on the devices of your internal testers.

  
他のデバイスにアプリをインストールしてテストするには、.appファイルまたは.pkgファイルを作成してエクスポートする必要があります。これにはコード署名の設定が必要です。この例では、`development`エクスポート方法でアプリをエクスポートします。アプリをTestflightなどににアップロードすることはできませんが、内部テスターのデバイスでテストすることはできます。

{% include message_box.html type="note" title="Automatic provisioning" content=" The example procedure described here uses manual provisioning, with the `Certificate and profile installer` Step. However, Bitrise also supports [automatic provisioning](https://app.forestry.io/code-signing/ios-code-signing/ios-auto-provisioning/) but it is not in the scope of this guide. "%}

{% include message_box.html type="note" title="自動プロビジョニング" content="ここで説明する手順例では、`Certificate and profile installer`ステップを使用して手動プロビジョニングを使用しています。また、Bitriseは自動プロビジョニングもサポートしていますが、このガイドにはありません。"%}

You will need:

* the automatically created `deploy` workflow
* a **Development** certificate (a .p12 certificate file)
* a **Development** type Provisioning Profile. For a MacOS project, the file extension of the provisioning profile is _.provisionprofile_.

必要になるのは:

* 自動的に作成された`deploy`ワークフロー
*  **開発**用証明書（a.p12証明書ファイル） 
*  **開発**型プロビジョニングプロファイルMacOSプロジェクトの場合、プロビジョニングプロファイルのファイル拡張子は.provisionprofileです。

1. Set the code signing type of your project in Xcode to either manual or automatic (Xcode managed), and generate the package file locally.
2. Collect and upload the code signing files with [the codesigndoc tool](https://app.forestry.io/code-signing/ios-code-signing/collecting-files-with-codesigndoc/).

   The tool can also upload your code signing files to Bitrise - we recommend doing so! Otherwise, upload them manually: enter the Workflow Editor and select the `Code signing` tab, then upload the files in their respective fields.
3. Go to your app's Workflow Editor, and select the `deploy` workflow in the `WORKFLOW` dropdown menu in the top left corner.


1. Xcodeでプロジェクトのコード署名タイプを手動または自動（Xcode管理）に設定し、パッケージファイルをローカルに作成します。
2. [the codesigndoc tool](https://app.forestry.io/code-signing/ios-code-signing/collecting-files-with-codesigndoc/)を使用してコード署名ファイルを収集してアップロードします。このツールは、コード署名ファイルをBitriseにアップロードすることをおすすめします。それ以外の場合は、手動でアップロード:ワークフローエディタを開き、`Code signing`タブを選択してから、それぞれのフィールドにファイルをアップロードします。
3. アプリのWorkflow Editorに移動し、左上隅の`WORKFLOW`ドロップダウンメニューで`deploy`ワークフローを選択します。
4. Check that you have the `Certificate and profile installer` Step in your workflow. It must be before the `Xcode Archive for Mac` Step (you can have other Steps between the two, like `Xcode Test for Mac`).
5. Check the `Export method` input under the `app/pkg export configs` input group of the `Xcode Archive for Mac` Step.

   If you selected `development` when you added the app to Bitrise, you don't need to change the input. Otherwise, manually set it to `development`.


4. `Xcode Archive for Mac` **ステップの前に**`Certificate and profile installer`ステップがワークフローに含まれていることを確認します。（2つのステップ間に、`Xcode Test for Mac`のような他のステップを含むことができます）。
5.  `Xcode Archive for Mac`の`app/pkg export configs`入力の下にある`Export method`入力を確認します。 アプリをBitriseに追加したときに`development`を選択した場合は、入力を変更する必要はありません。それ以外の場合は、手動で`development`に設定してください。


1. ![/img/macos-archive.png](https://app.forestry.io/sites/yv69yaruhkt48w/body-media//img/macos-archive.png)6. 6. [Start a build](https://app.forestry.io/builds/starting-builds-manually/).

If you uploaded the correct code signing files, the `Certificate and profile installer` Step should install your code signing files and the `Xcode Archive for Mac` Step should export an .app or .pkg file with the development export method. If you have the `Deploy to Bitrise.io` Step in your workflow, you can find the binary package file on the `Apps & Artifacts` tab of the build page.

6.  [ビルドを開始](https://app.forestry.io/builds/starting-builds-manually/)

     
   正しいコード署名ファイルをアップロードした場合は、`Certificate and profile installer`ステップでコード署名ファイルをインストールし、`Certificate and profile installer`ステップで開発用のエクスポート方法を使い.appまたは.pkgファイルをエクスポートする必要があります。ワークフローに`Deploy to Bitrise.io`ステップがある場合、ビルドページの`Apps & Artifacts`タブにバイナリパッケージファイルを確認します。

## Deploying to the App Store

## App Storeにデプロイ

If you set up your code signing files and created an .app or .pkg file for your internal testers, it is time to involve external testers and then to publish your MacOS app to the App Store. Let's see how!

コード署名ファイルを設定し、内部テスター用に.appまたは.pkgファイルを作成した場合は、外部テスターを巻き込んでから、MacOSアプリをApp Storeに公開します。方法は以下に！

{% include message_box.html type="note" title="Developer ID" content="If you want to distribute your app outside the App Store, you can sign it with [a Developer ID](https://developer.apple.com/support/developer-id/). This method is not in the scope of this guide but on Bitrise, it works the same way: you just need to upload the appropriate code signing files."%}

{% include message_box.html type="note" title="開発者ID" content="App Store以外でアプリを分散する場合は、[開発者ID](https://developer.apple.com/support/developer-id/)で署名することができます。この方法はこのガイドのにはありませんが、Bitriseでも同じように機能します。適切なコード署名ファイルをアップロードするだけです。"%}

To deploy to the App Store, you will need more code signing files:

* a **Mac App** **Distribution** Certificate
* a **Mac** **Installer Distribution** certificate

App Storeにデプロイするには、さらに多くのコード署名ファイルが必要になります:

*  **Macアプリ配布**証明書 
*  **Macインストーラ配布**証明書

1. On your local machine, set up App Store code signing for your project in Xcode, and export an .app or .pkg file. If this fails locally, it will definitely fail on Bitrise, too!
2. Collect and upload the code signing files with [the codesigndoc tool](https://app.forestry.io/code-signing/ios-code-signing/collecting-files-with-codesigndoc/).
3. Go to the app's Workflow Editor and create a [new workflow](https://app.forestry.io/getting-started/getting-started-workflows/): click the `+ Workflow` button, enter the name of your new workflow and in the **BASED ON** dropdown menu, select `deploy`. This way the new workflow will be a copy of the basic `deploy` workflow.


1. ローカルマシンで、XcodeでプロジェクトのApp Storeコード署名を設定し、.appまたは.pkgファイルをエクスポートします。ローカルで失敗した場合、Bitriseでも間違いなく失敗します。
2. [the codesigndoc tool](https://app.forestry.io/code-signing/ios-code-signing/collecting-files-with-codesigndoc/)を使用してコード署名ファイルを収集してアップロードします。 
3. アプリのWorkflow Editorに移動して[新しいワークフロ](https://app.forestry.io/getting-started/getting-started-workflows/)ーを作成します。`Workflow`ボタンをクリックし、新しいワークフローの名前を入力して、**BASED ON**ドロップダウンメニューで`deploy`を選択します。こre新しいワークフローは基本的な`deploy`ワークフローのコピーになります。
4. Set the `Export Method` input of the `Xcode Archive for Mac` Step to `app-store`.

   You can export multiple binaries with different export methods: use the `Export macOS Xcode archive` Step in your workflow.
5. Add the `Deploy to iTunes Connect - Application Loader` Step to your workflow, after the `Xcode Archive for Mac` Step but preferably before the `Deploy to Bitrise.io` Step.
6. Provide your Apple credentials in the `Deploy to iTunes Connect - Application Loader` Step.

   The Step will need your:
   * Apple ID
   * password or, if you use two-factor authentication on iTunes Connect, your application password.

   Don't worry, the password will not be visible in the logs or exposed - [that's why it is marked SENSITIVE](https://app.forestry.io/builds/env-vars-secret-env-vars#about-secrets).


4. `Xcode Archive for Mac`ステップの`Export Method`入力を`app-store`に設定します。

    異なるエクスポート方法で複数のバイナリをエクスポートすることができます:ワークフローで`Export macOS Xcode archive`Stepを使用します。
5. `Xcode Archive for Mac` ステップの後、できれば、`Deploy to Bitrise.io`ステップの前に、`Deploy to iTunes Connect - Application Loader`ステップをワークフローに追加します。 
6. `Deploy to iTunes Connect - Application Loader`ステップでAppleの資格情報を入力します。

    ステップが必要とするのは： 
   *  Apple ID  
   * パスワード、またはiTunes Connectで2要素認証を使用する場合はアプリケーションパスワード

      パスワードがログに表示されたり公開されたりすることはありません。なので[SENSITIVEとマークされています](https://app.forestry.io/builds/env-vars-secret-env-vars#about-secrets)

And that's it! Start a build - if everything went well, you should see your app on Testflight. From there, you can distribute it to external testers or release it to the App Store.

  
以上です！ビルドを開始しましょう！ - 適当であればTestflightでアプリが見つかるはずです。そこから、外部のテスターに​​配布したり、App Storeに公開したりできます！