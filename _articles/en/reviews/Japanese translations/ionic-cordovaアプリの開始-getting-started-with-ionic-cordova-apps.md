---
title: Ionic/ Cordovaアプリの開始(Getting started with Ionic/Cordova apps)
redirect_from: []
date: 2019-03-19 12:28:13 +0000
published: false

---
{% include not_translated_yet.html %}

You can use Cordova and Ionic frameworks to develop cross-platform apps. Bitrise can help you with its automated testing, code signing and deploying procedures so that you can ship your iOS and/or Android app/s to the respective marketplace in no time! If your organization has more than one concurrency, you can have Android and iOS builds run simultaneously. Now let us guide you through the process!

* [Before setting up an Ionic/Cordova project](/getting-started/getting-started-with-ionic-cordova-apps/#before-setting-up-an-ioniccordova-project)
* [Adding an Ionic/Cordova project to Bitrise](/getting-started/getting-started-with-ionic-cordova-apps/#adding-an-ioniccordova-app-to-bitrise)
* [Dependencies](/getting-started/getting-started-with-ionic-cordova-apps/#dependencies)
* [Testing Ionic/Cordova apps](/getting-started/getting-started-with-ionic-cordova-apps/#testing-ioniccordova-apps)
* [Code signing](/getting-started/getting-started-with-ionic-cordova-apps/#code-signing)
* [Deploying Ionic/Cordova apps](/getting-started/getting-started-with-ionic-cordova-apps/#deploying-ioniccordova-app)

{% include not_translated_yet.html %}

Cordova/Ionicフレームワークを使いクロスプラットフォームアプリを開発することができます。iOSやAndroidのアプリをそれぞれの市場に迅速に送ることができるように、Bitriseは、テストの自動化、コード署名、デプロイ手順をサポートします。組織に複数の同時実行性がある場合は、Android/iOSビルドを同時に実行することができます。

プロセス:

* [Ionic/Cordovaプロジェクトセットアップ前]()
* [BitriseにIonic/Cordovaを追加する方法]()
* [依存性](/getting-started/getting-started-with-ionic-cordova-apps/#dependencies)
* [Ionic/Cordovaアプリのテスト](/getting-started/getting-started-with-ionic-cordova-apps/#testing-ioniccordova-apps)
* [コード署名](/getting-started/getting-started-with-ionic-cordova-apps/#code-signing)
* [Ionic/Cordovaアプリのデプロイ](/getting-started/getting-started-with-ionic-cordova-apps/#deploying-ioniccordova-app)

## Before setting up an Ionic/Cordova project

## Ionic/Cordovaプロジェクトセットアップの前に

Make sure you have signed up to [bitrise.io](https://www.bitrise.io/) and can access your Bitrise account. Here are [4 ways](https://devcenter.bitrise.io/getting-started/index#signing-up-to-bitrise) on how to connect your Bitrise account to your account found on a Git service provider.

[bitrise.io](https://www.bitrise.io/) にサインアップし、アカウントにアクセスしてください。BitriseアカウントをGit service providerアカウントにコネクトする方法は[４つ](https://devcenter.bitrise.io/getting-started/index#signing-up-to-bitrise)あります。

## Adding an Ionic/Cordova app to Bitrise

## BitriseにIonic/Cordovaを追加

 1. Log into [bitrise.io](https://www.bitrise.io/).
    1. [bitrise.io](https://www.bitrise.io/)にログインします。
 2. On your Dashboard, click `+ Add new app`.
    2\. ダッシュボードの`+ Add new app`をクリックします。
 3. On `Create new App` page, choose the account you wish to add the app to.
    3\. `Create new App`ページからアプリを追加したいアカウントを選びます。
 4. Set the privacy of the app to either private or [public](https://yv69yaruhkt48w.preview.forestry.io/getting-started/adding-a-new-app/public-apps) and click `Next`.
    4\. アプリのプライバシーをprivate、または [public](https://yv69yaruhkt48w.preview.forestry.io/getting-started/adding-a-new-app/public-apps)に設定し、`Next`をクリックします。
 5. Select the Git hosting service that hosts your repository, then find and select your own repository that hosts the project. Read more about [connecting your repository](https://yv69yaruhkt48w.preview.forestry.io/getting-started/adding-a-new-app/connecting-a-repository/).
    5\. リポジトリをホストするGit hostingサービスを選択し、プロジェクトをホストするあなたのリポジトリを選択します。詳細は[connecting your repository](https://yv69yaruhkt48w.preview.forestry.io/getting-started/adding-a-new-app/connecting-a-repository/)にて参照してください。
 6. When prompted to set up repository access, click `No, auto-add SSH key`. Read more about [SSH keys](https://yv69yaruhkt48w.preview.forestry.io/getting-started/adding-a-new-app/setting-up-ssh-keys/).
    6\. リポジトリアクセスを設定するように求められたら、`No, auto-add SSH key`をクリックします。 詳細は[SSH keys](https://yv69yaruhkt48w.preview.forestry.io/getting-started/adding-a-new-app/setting-up-ssh-keys/)を参照してください。
 7. Type the name of the branch that includes your project’s configuration - `master`, for example, - then click `Next`.
    7\. プロジェクトの設定を含むブランチの名前（`master`など）を入力し、`Next`をクリックします
 8. Wait while Bitrise is validating your project. We look for your configuration files and set up your app based on them.
    8\. Bitriseがプロジェクトを検証している間お待ちください。設定ファイルを探し、それらに基づいてアプリを設定します。
 9. At `Project Build configuration`, you can select which platform to build your app for. You can select:
    * iOS
    * Android
    * iOS and Android (where the Android build gets built first)
      9\. `Project Build configuration`では、アプリをビルドするプラットフォームを選択できます:
      * iOS
      * Android
      * iOS と Android (Androidビルドが最初にビルドされる)

    ![](/img/project-build-cordova.png)

    ![](/img/project-build-ionic.png)
10. Register a webhook when prompted so that Bitrise can start a build automatically when code is pushed to your repository. This also kicks off your first build on the primary workflow - click the message and it will take you to the build page. The first build does not generate an APK and an .ipa yet, however, you can already check out the project’s logs on the Build’s page.

As an example, have a look at a Cordova **primary workflow** containing `Karma Jasmine Test Runner` step.

1. コードがリポジトリにプッシュされたときにBitriseが自動的にビルドを開始できるように、Promptedが表示されたらWebフックに登録します。メインのワークフローでの最初のビルドも開始します。 メッセージをクリックするとビルドページに移動します。最初のビルドではAPKと.ipaが作成されませんが、ビルドのページでプロジェクトのログを確認できます。

   例として、`Karma Jasmine Test Runner`ステップを含むCordova**主要ワークフロー**を見てください。

   {% raw %}
   primary:
   steps:
   \- activate-ssh-key@4.0.3:
   run_if: '{{getenv "SSH_RSA_PRIVATE_KEY" | ne ""}}'
   \- git-clone@4.0.11: {}
   \- script@1.1.5:
   title: Do anything with Script step
   \- npm@0.9.1:
   inputs:
   \- command: install
   \- karma-jasmine-runner@0.9.1: {}
   \- deploy-to-bitrise-io@1.3.15: {}
   {% endraw %}

{% include message_box.html type="info" title="How about using other testing frameworks?" content=" It's worth mentioning that our scanner knows about Jasmin and Karma Jasmine testing solutions. If your project uses another test framework/runner, our  scanner will not be able to generate a test workflow (which would be the `primary` workflow), but it will generate a build workflow instead. Since this workflow is the only one generated, it will be called `primary` workflow." %}

{% include message_box.html type="info" title="他のテストフレームワークを使うのは？" content="BitriseのスキャナーがJasmin、Karma Jasmineのテスト解決法を知っていることは言及する価値があります。プロジェクトが別のテストフレームワーク/ランナーを使用している場合、スキャナーはテストワークフロー（`primary`ワークフロー)を作成することはできませんが、代わりにビルドワークフローを作成できます。このワークフローは作成される唯一のワークフローであるため、`primary`ワークフローと呼びます。" %}

## Dependencies

## 依存性

To install Javascript dependencies listed in your app's `package.json` file, you can use either `Run npm command` or `Run yarn command` Steps.

`Run npm command` Step is by default part of your primary and deploy workflows. Make sure you have `The nmp command with arguments to run` field set to `install` in `Run npm command` Step.

アプリの`package.json`ファイルに記載されているJavascript depenciesをインストールするには、`Run npm command`または`Run yarn command`のステップを使用できます。

`Run npm command`ステップは、デフォルトパートのプライマリワークフローとデプロイワークフローによるものです。 `Run npm command`ステップで、`The nmp command with arguments to run`フィールドが`install`に設定されていることを確認します。

![](https://devcenter.bitrise.io/img/run-nmp.png)

Leave the input field of `The 'yarn' command to run` empty or set it to `install` - `Run yarn command` Step will install those dependencies either way.

`The 'yarn' command to run`入力フィールドを空のままにするか、または`install`に設定します -  `Run yarn command`ステップはどちらかの方法でdependencies（依存性）をインストールします。

## Testing Ionic/Cordova apps

## Ionic/Cordovaアプリのテスト

Perform unit testing by our `Karma Jasmine Test Runner` or `Jasmine Test Runner` Steps. If your Cordova/Ionic project has Karma Jasmine dependency in its `package.json` file, our Scanner will detect it and automatically insert the respective testing step into your workflow. If this dependency is missing from your project, you can manually insert one of steps to your workflow using our Workflow Editor - just make sure you place it right after `Run nmp command` or `Run yarn command` package manager Step.

`Karma Jasmine Test Runner`または `Jasmine Test Runner` のステップによるユニットテストを実行します。 Cordova / Ionicプロジェクトの`package.json`ファイルにKarma Jasmineの依存性がある場合は、スキャナーによってそれが検出され、それぞれのテストステップがワークフローに自動的に追加されます。依存性がプロジェクトにない場合は、 Workflow Editor を使用して手動でワークフローにステップの1つを追加できます。`Run nmp command`または`Run yarn command`パッケージマネージャーステップの直後にするようにしてください。

## Code signing

## コード署名

If you want to build an app for iOS or Android you need to upload the platform-specific files into the `Code Signing` tab of the Workflow Editor. You can also generate builds for both platforms which requires uploading all code signing files of the platforms, luckily it's all in one page.

iOSまたはAndroid用のアプリを作成したい場合は、プラットフォーム-スペシフィックファイルをWorkflow Editorの`Code Signing`タブにアップロードする必要があります。**プラットフォームのすべてのコード署名ファイルをアップロード**し、両方のプラットフォーム用にビルドを作成することもできます。（すべて1ページにまとめられています。）

### Signing your iOS project

### iOSプロジェクトに署名

To sign your iOS project, you have to upload code signing certificates and provisioning profiles depending on the distribution and the code signing type you have set in the `Cordova Archive` and `Ionic Archive` Steps. Let's dive right in!

iOSプロジェクトに署名するには、`Cordova Archive`と`Ionic Archive`のステップで設定したディストリビューションとコード署名の種類に応じて、コード署名証明書とプロビジョニングプロファイルをアップロードする必要があります。早速始めよう！

1. Generate the native Xcode project locally from your Ionic or Cordova project by calling `cordova platform add ios` or `ionic cordova platform add ios`.
2. Use our `codesigndoc` tool to [collect the code signing files](https://devcenter.bitrise.io/code-signing/ios-code-signing/collecting-files-with-codesigndoc/).
3. Upload the files to [bitrise.io](https://www.bitrise.io/).

   You can do this either on the website UI or with the `codesigndoc` tool itself.
   1. `cordova platform add ios`または `ionic cordova platform add ios`による、IonicまたはCordovaプロジェクトからネイティブXcodeプロジェクトをローカルに作成します。
   2. [コード署名ファイルを収集する](https://devcenter.bitrise.io/code-signing/ios-code-signing/collecting-files-with-codesigndoc/)には、`codesigndoc`ツールを使用します。
   3. ファイルを [bitrise.io](https://www.bitrise.io/)にアップロードします。

      WebサイトのUIまたは`codesigndoc`ツールのどちらでも実行できます。

   ![Screenshot](https://yv69yaruhkt48w.preview.forestry.io/img/code-signing/ios-code-signing/provisioning-and-certificate-upload.png)
4. Make sure you have the `Certificate and profile installer` step in your workflow as this Step can download and install the certificates on the virtual machine.
5. Add the `Generate cordova build configuration` step to your Workflow. (This step does all the configuration needed for the next step, which is `Cordova Archive` or `Ionic Archive`.) It **must come after** the `Certificate and profile installer` step.
6. Fill in the required input for the step. Please note that both the `Code Signing Identity` and the `Provisioning Profile` are required inputs for iOS apps even though they are not marked as such.
   * `Build configuration`: you can set it to either `debug` or `release`.
   * `Code Sign Identity`: enter a Developer or a Distribution identity.
   * `Provisioning Profile`: enter the appropriate Provisioning Profile.
   * `Packaging Type`: this controls what type of build is generated by Xcode. Set the type of code signing you need.

   For more information on Ionic/Cordova code signing with Bitrise, check out our [guide](/code-signing/ios-code-signing/ionic-cordova-code-signing/)!
   4\. ステップで仮想マシンに証明書をダウンロードしてインストールできるように、ワークフローの`Certificate and profile installer`ステップを確認します。  
   5\. ワークフローに`Generate cordova build configuration`ステップを追加します。 （このステップでは、次のステップに必要なすべての設定、`Cordova Archive`または`Ionic Archive`を実行します。）`Certificate and profile installer`ステップの後に行います。
   6\.  ステップに必要な入力を記入してください。`Code Signing Identity`と`Provisioning Profile`はどちらも、**以下のようにマークがされていなくても、**iOSアプリの必須入力です。
   * `Build configuration`：`debug`または`release`のどちらかに設定できます。
   * `Code Sign Identity`：開発者またはディストリビューションIDを入力します。
   * `Provisioning Profile`：適切なProvisioning Profileを入力します。
   * `Packaging Type`：どのようなタイプのビルドがXcodeによって作成されるかをコントロールします。また、コード署名の種類を設定します。

     Ionic / Cordovaコード署名の詳細については [guide](/code-signing/ios-code-signing/ionic-cordova-code-signing/)を参照してください。

### Signing your Android project

### Androidプロジェクトに署名

 1. For a signed Android project, go to the `Code Signing` tab of your Workflow Editor.
 2. Click or drag-and-drop your keystore file on the `Upload file` field of the `ANDROID KEYSTORE FILE` section.
 3. 署名済みのAndroidプロジェクトの場合は、Workflow Editorの`Code Signing`タブへ。
 4. `ANDROID KEYSTORE FILE`セクションの`Upload file`項目でkeystoreファイルをクリックまたはドラッグ＆ドロップします。
 5. ![](/img/keystore-file.png)
 6. Fill out the displayed three input fields:
    * `keystore password`
    * `keystore alias`
    * `private key password`
      3\. 3つの入力項目に記入します:
      * `keystore password`
      * `keystore alias`
      * `private key password`

      ![](/img/keystore.png)
 7. Click `Save metadata`. Bitrise uploads your keystore file and assigns an environment variable (`BITRISEIO_ANDROID_KEYSTORE_URL`) to the download URL (which is a time-limited, read-only download URL) of the file as the value. You can use this URL to download the keystore file during a build in the future. The step will generate the following env vars which will be used at a later step:
    * `$BITRISEIO_ANDROID_KEYSTORE_URL`
    * `BITRISEIO_ANDROID_KEYSTORE_PASSWORD`
    * `$BITRISEIO_ANDROID_KEYSTORE_ALIAS`
    * `$BITRISEIO_ANDROID_KEYSTORE_PRIVATE_KEY_PASSWORD`
 8. Add the `Generate cordova build configuration` Step to your workflow if it's not already in it.
 9. The required inputs fields for Android (`Keystore`, `Keystore password`, `Alias` and `Password`) are already filled out for you since you have uploaded your keystore file to the `Code Signing` tab and added the metadata at Step 2 and 3. Based on this information, env vars have been generated which are now conveniently used in `Generate cordova build configuration` Step.
10. `Save metadata`をクリックします。 Bitriseはkeystoreファイルをアップロードし、環境変数(`BITRISEIO_ANDROID_KEYSTORE_URL`)をバリューとしてファイルのダウンロードURL（時間制限のある、読み取り専用のダウンロードURL）に対応させます。このURLを使用して、次のビルド中にkeystoreファイルをダウンロードできます。このステップでは、後のステップで使用される以下のの環境変数が作成されます。
    * `$BITRISEIO_ANDROID_KEYSTORE_URL`
    * `BITRISEIO_ANDROID_KEYSTORE_PASSWORD`
    * `$BITRISEIO_ANDROID_KEYSTORE_ALIAS`
    * `$BITRISEIO_ANDROID_KEYSTORE_PRIVATE_KEY_PASSWORD`
      5\. コードがない場合は、`Generate cordova build configuration`ステップをワークフローに追加します。
      6\. ？ keystoreファイルを`Code Signing`タブにアップロードし、ステップ2と3でメタデータを追加したので、Androidの必須入力項目（`Keystore`, `Keystore password`, `Alias` ,`Password`）はすでに入力されています。`Generate cordova build configuration`で便利に使用できる環境変数が作成されます。？

## Deploying Ionic/Cordova app

## Ionic/Cordovaアプリをデプロイ

There are a few places to deploy your app but the configuration is slightly different for each of them.

アプリをデプロイする場所により構成はそれぞれ異なります。

Before deploying your app to any marketplace you need to generate a codesigned .ipa and/or APK so make sure you perform these steps:

アプリを電子市場にデプロイする前に、コード署名された.ipaやAPKを作成する必要があるので、以下のステップを行ってください。

1. Add the `Cordova archive` or the `Ionic archive` step to your workflow. (Note that  if you're building for both iOS and Android in one project, and either of your apps fails, the whole `Cordova Archive/Ionic Archive` Step will fail.)
   1. `Cordova archive`または`Ionic archive`ステップをワークフローに追加します。 （iOSとAndroidの両方を1つのプロジェクトで構築している場合、どちらかのアプリが失敗すると、`Cordova Archive/Ionic Archive`ステップ全体が失敗します。）
2. Fill in the required inputs.
   * The `Platform` input needs to be set to `device`.
   * The `Build command configuration` input must match the `Build configuration` input of the `Generate cordova build configuration` Step.

   The archive step must come after the `Generate cordova build configuration` step in the workflow.
   2\. 必要な情報を入力します:
   * `Platform`入力は`device`に設定が必要です。
   * `Build command configuration`入力は、`Generate cordova build configuration`ステップの`Build configuration`入力と一致していなければなりません。  アーカイブステップは、ワークフローの`Generate cordova build configuration`ステップの後にに行う必要があります。

![](/img/cordova-archive-1.png)

Now that we're ready for deployment, let's see how to publish your iOS and Android projects by adding deployment steps to your workflow!

デプロイの準備が完了！ワークフローにデプロイステップを追加して、iOSおよびAndroidプロジェクトを公開する方法を見てみましょう！

### Deploying to App Store Connect

### App Store Connectにデプロイ

1. Add the `Deploy to iTunes Connect - Application Loader` Step to your workflow, after the `Cordova Archive` or `Ionic Archive` Steps but preferably before the `Deploy to Bitrise.io - Apps, Logs, Artifacts` Step.
   1. `Cordova Archive` もしくは `Ionic Archive`ステップの後、できれば`Deploy to Bitrise.io - Apps, Logs, Artifacts`ステップの前に、`Deploy to iTunes Connect - Application Loader`ステップをワークフローに追加します
2. Provide your Apple credentials in the `Deploy to iTunes Connect - Application Loader` Step.

   The Step will need your:
   * Apple ID
   * password or, if you use two-factor authentication on iTunes Connect, your application password.

   Don’t worry, the password will not be visible in the logs or exposed - [that’s why it is marked SENSITIVE](https://yv69yaruhkt48w.preview.forestry.io/builds/env-vars-secret-env-vars#about-secrets).
   2\.  `Deploy to iTunes Connect - Application Loader`ステップでAppleのアカウント情報を入力します。

   ステップに必要なもの:
   * Apple ID
   * パスワード、もしくは、iTunes Connectで2要素認証を使用する場合、アプリケーションパスワード

     パスワードは表示されません！

     \- [that’s why it is marked SENSITIVE](https://yv69yaruhkt48w.preview.forestry.io/builds/env-vars-secret-env-vars#about-secrets)

### Deploying to Google Play Store

### Google Play Storeにデプロイ

Before you start:

開始する前に:

* make sure you have [registered to Google Play Store and set up your project](https://devcenter.bitrise.io/tutorials/deploy/android-deployment/#register-to-google-play-store-and-set-up-your-first-project)
* make sure you have set up [Google Play API access](https://devcenter.bitrise.io/tutorials/deploy/android-deployment/#set-up-google-play-api-access)
* [Google Play Storeに登録、プロジェクトをセットアップ](https://devcenter.bitrise.io/tutorials/deploy/android-deployment/#register-to-google-play-store-and-set-up-your-first-project)を確認します。
* [Google Play API access](https://devcenter.bitrise.io/tutorials/deploy/android-deployment/#set-up-google-play-api-access)にセットアップしているか確認します。

1. In your Bitrise `Dashboard`, go to `Code Signing` tab and upload the service account JSON key into the `GENERIC FILE STORAGE.`
2. Copy the env key which stores your uploaded file’s url. For example: `BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
3. Add the `Google Play Deploy` step after `Cordova Archive` or `Ionic Archive` Step in your deploy workflow.
   1. Bitrise `Dashboard`で、`Code Signing`タブに移動し、サービスアカウントのJSONキーを`GENERIC FILE STORAGE`にアップロードします。
   2. アップロードしたファイルのURLのあるenvキーをコピーします。例えば、`BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
   3. デプロイワークフローの`Cordova Archive`または`Ionic Archive`ステップの後に`Google Play Deploy`ステップを追加します。
4. Fill out the required input fields:

* `Service Account JSON key file path`: This field can accept a remote URL so you have to provide the environment variable which contains your uploaded service account JSON key. For example: `$BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
* `Package name`: the package name of your Android app
* `Track`: the track where you want to deploy your APK (alpha/beta/rollout/production)
  1. 入力欄へ記入:
* `Service Account JSON key file path`：このフィールドはリモートURLを受け入れることができるため、アップロードしたサービスアカウントのJSONキーを含む環境変数を指定すします。

例: `$BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`

* `Package name`：Androidアプリのパッケージ名
* `Track`：APKをデプロイするトラック(alpha/beta/rollout/production)

### Deploying to Bitrise

### Bitriseにデプロイ

Add the `Deploy to Bitrise.io - Apps, Logs, Artifacts` Step to your workflow. This will upload all your build artifacts into the `APPS & ARTIFACTS` tab of your Build's page.

You can share the generated .ipa or APK with your team members using the build’s URL. You can also notify user groups or individual users that your .ipa or APK has been built.

ワークフローに`Deploy to Bitrise.io - Apps, Logs, Artifacts`ステップを追加します。すべてのビルドアーティファクトが、ビルドのページの`APPS & ARTIFACTS`タブにアップロードされます。

ビルドのURLを使用して、作成された.ipaまたはAPKをチームメンバーと共有できます。また、 .ipa、もしくはAPKが構築されたことをユーザーグループまたは個々のユーザーに通知することもできます。

1. Go to the `Deploy to bitrise.io - Apps, Logs, Artifacts` Step.
2. In the `Notify: User Roles`, add the role so that only those get notified who have been granted with this role. Or fill out the `Notify: Emails` field with email addresses of the users you want to notify. Make sure you set those email addresses as [secret env vars](https://yv69yaruhkt48w.preview.forestry.io/builds/env-vars-secret-env-vars/)! These details can be also modified under `Notifications` if you click the `eye` icon next to your generated .ipa or APK in the `APPS & ARTIFACTS` tab.
   1. `Deploy to bitrise.io - Apps, Logs, Artifacts`ステップに進みます。
   2. `Notify: User Roles`でロールを追加するとロールを与えられたユーザーにのみ通知がいきます。または、`Notify: Emails`に通知したいユーザーのメールアドレスを[secret env vars](/builds/env-vars-secret-env-vars/)として設定し入力します。`APPS & ARTIFACTS`タブで作成されたAPK / .ipaファイルの横にあるの`eye`アイコンをクリックすると、詳細を`Notifications`で変更することもできます。

Start a build! If your app is properly configured, you can find it deployed to the marketplace of your choice!

  
ビルドを始めましょう！アプリが正しく設定されていれば、選択した電子市場にデプロイされていることがわかります！