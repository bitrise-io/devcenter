---
title: React Nativeアプリの開始（Getting started with React Native apps）
date: 2019-03-11 14:54:35 +0000
redirect_from: []
published: false

---
{% include not_translated_yet.html %}

You can easily set up and configure your React Native project on Bitrise - the power is in your hands if you want to deploy both native versions or just one to distribution platforms! Your React Native repo can consists of an Android and an iOS project so configurations should be done as you would normally do with Android and iOS apps. When running a React Native project, you will see that first an Android, then an iOS build gets built. If your organization has more than one concurrency, you can have Android and iOS builds run simultaneously.

BitriseではReact Nativeプロジェクトを簡単にセットアップ・構成が行なえます。あなたのReact Nativeレポ内にはAndroidとiOSプロジェクトを保存できますので、設定はAndroid、iOSアプリの手順で行うことができます。React Nativeプロジェクトでは、初めにAndroid、その次にiOSのビルドが実行されます。あなたの組織が２つ以上のコンカレンシーをお持ちの場合は、並行して両方のビルドを走らせることができます。

## Before setting up a React Native project

## React Nativeプロジェクトのセットアップ前に

Make sure you have signed up to [bitrise.io](https://www.bitrise.io) and can access your Bitrise account. If you haven't signed up yet, here are [4 ways](https://devcenter.bitrise.io/getting-started/index#signing-up-to-bitrise) to do that.

まずbitrise.ioにサインアップしていることを確認し、Bitriseアカウントにアクセスできることを確認してください。もしまだであれば、４つの方法があります。

## Add a React Native project to bitrise.io

## bitrise.ioにReact Nativeプロジェクトを追加する

In this tutorial, we're using this [sample app](https://github.com/bitrise-samples/sample-apps-react-native-ios-and-android). Let's start!

このチュートリアルでは、サンプルアプリを使用します。では始めましょう！

1. Log into [bitrise.io](https://www.bitrise.io).　bitrise.io にログインする
2. Click `Add a new app`.　`Add a new app` をクリックします。
3. Select the privacy setting of your app: **private** and [**public**](/getting-started/adding-a-new-app/public-apps/).　アプリのプライバシー設定を行う：private か public
4. Select the Git hosting service that hosts your repository, then find and select your own repository that hosts the project. Read more about [connecting your repository](/getting-started/adding-a-new-app/connecting-a-repository/).　あなたのレポジトリをホストしているGitホスティングサービスを選択する。詳しくはレポジトリを接続するをお読みください。
5. When prompted to set up repository access, click `No, auto-add SSH key`. Read more about [SSH keys](https://devcenter.bitrise.io/getting-started/adding-a-new-app/setting-up-ssh-keys/).
6. Type the name of the branch that includes your project’s configuration - master, for example, - then click `Next`.　プロジェクトのコンフィギュレーションに含まれるブランチの名前を入力する（例：master）。選んだら`Next` をクリック
7. At `Validating repository`, Bitrise runs an automatic repository scanner to set up the best configuration for your project.　`Validating repository` では、自動的にレポスキャナーが発動しプロジェクトの最適なコンフィグをセットアップします。
8. At `Project build configuration`, select your preferred build configuration.　`Project build configuration` では、お好きなビルド設定を選択してください。
   * For React Native projects, you should see `React Native` as the selected **project type**. If the scanner fails and the project type is not selected automatically, you can [configure your project manually](https://devcenter.bitrise.io/getting-started/adding-a-new-app/setting-up-configuration#manual-project-configuration). You can see that Android is automatically selected in `The root directory of an Android app`.
   * React Native プロジェクトでは、選択したproject typeとして`React Native` を確認することができます。スキャンが失敗しproject typeが自動的に選択されていない場合、手動によるプロジェクト設定を行えます。Androidが自動的に`The root directory of an Android app` 上で選択されていることが確認できます。
   * If your project consist of only one module, that module will be automatically selected for `Module`. If your project contains more than one module, you can pick a module, but we recommend the main one!
   * プロジェクトが１つのモジュールだけが含まれている場合、そのモジュールは自動的に`Module`として選択されます。２つ以上のモジュールが含まれるプロジェクトでは、その中から１つモジュールを選択することができます。
   * In `Select variant for building` field, select a variant that suits your project. Pick `Select All Variants` to build all variants. Pick `debug` or `release` if you wish to generate an APK or an .ipa file.
   * `Select variant for building` のフィールドでは、プロジェクトに合ったバリアントを選択してください。`Select All Variants`は全てのバリアントのビルドを行います。APKや.ipaファイルを生成する場合は、`debug` か `release` を選んでください。
   * Select your Xcode project or Xcode Workspace path in the `Project (or Workspace) path field`.
   * `Project (or Workspace) path field` では、あなたのXcode project もしくは Xcode Workspace path を選択してください。
   * `Select Scheme name`. The scanner validation will fail if you do not have a SHARED scheme in your  project. You can still point Bitrise manually to your Xcode scheme but  if it’s shared, we automatically detect it for you. [Read more about schemes and the possible issues with them!](https://devcenter.bitrise.io/troubleshooting/frequent-ios-issues/#xcode-scheme-not-found).
   * `Select Scheme name`  
     スキャン検証はあなたのプロジェクト内にシェアされたスキームがないと失敗します。手動でXcode scheme をBitriseに追加することもできますが、仮にシェアされている状態であれば、自動的に探知します。
   * In `Select ipa export method`, select the export method of your .ipa file: `ad-hoc`, `app-store`, `development` or `enterprise` method.
   * `Select ipa export method` では、.ipaファイルのエクスポートする方法を選択します：`ad-hoc`、`app-store`、`development` か`enterprise` のいずれかを選ぶことができます。
9. At `Webhook setup`, register a Webhook so that Bitrise can automatically start a build every time you push code into your repository.　`Webhook setup`では、Webhookに登録済であれば、レポジトリにコードがプッシュされると毎回自動的にビルドが開始されます。

{% include message_box.html type="note" title="Settings tab" content=" These settings can be later modified at the `Settings` page of your app, except for the stack, which you can modify at the `Stack` tab of your Workflow Editor." %}

You have successfully set up your React Native project on [bitrise.io](https://www.bitrise.io)! Your first build gets kicked off automatically using the primary workflow. You can check the generated reports of the first build on the `APPS & ARTIFACTS` tab of your Build's page.

これでbitrise.io上でのReact Nativeプロジェクトのセットアップが完了です！最初のビルドはprimary workflowを使用すると自動的に開始されます。ビルドページ内の`APPS & ARTIFACTS` タブより最初のビルドの生成されたレポートを確認することができます。

## Install dependencies　依存関係のインストール

### Javascript dependencies Javascriptの依存関係

If Bitrise scanner has successfully scanned your project, `Run npm command` or `Run yarn command` steps will be included in your workflow.

Bitriseスキャナーがプロジェクトのスキャンに成功すると、`Run npm command` もしくは `Run yarn command` ステップがワークフローに含まれるようになります。

In `Run npm command`, type `install` in the `npm command with arguments to run` input field so that it can add javascript dependencies to your project.

`Run npm command`では、インプットフィールドの`npm command with arguments to run` に`install` と入力してください。そうすれば、あなたのプロジェクトにJavascript dependenciesが追加されます。

![](/img/run-nmp.png)

`Run yarn command` can install javascript dependencies automatically to your project without having to configure the step manually.

`Run yarn command` はあなたのプロジェクトに自動的にJavascript dependencies をインストールします。ステップを手動で設定する必要はありません。

### Native dependencies

`Install missing Android tools` step installs the missing native dependencies  for your Android project - luckily this steps is by default included in your deploy workflow.

`Install missing Android tools`ステップは、あなたのAndroidプロジェクトに不足しているNative dependenciesをインストールします。このステップは、あなたのデプロイワークフローにデフォルトで入っています。

For iOS dependencies, you can add the `Run CocoaPods install` step to your workflow as it is not part of the workflow by default.

iOSのdependenciesは `Run CocoaPods install` ステップをワークフローに追加することで入手することができます。これはデフォルトのワークフローではありません。

## Code signing　コード署名

A React Native app can consists of two projects, an Android and an iOS - both must be properly code signed. If you click on the `Code Signing` tab of your project's Workflow Editor, all iOS and Android code signing fields are displayed in one page for you.

Let's see the process step by step!

React Native アプリは２つのプロジェクト（Android と iOS）で構成されており、両方とも適切にコード署名されている必要があります。プロジェクトのWorkflow Editor内の`Code Signing`をクリックすると、全てのiOSとAndroidコード署名欄が表示されます。

では、手順を見ていきましょう！

### Sign your Android project　Androidプロジェクトの署名

1. Select the `deploy` workflow at the `WORKFLOW` dropdown menu in the top left corner of your apps' Workflow Editor.　アプリのWorkflow Editorの上段左側にある`WORKFLOW`ドロップダウンメニューより`deploy`ワークフローを選択します。
2. Go to the `Code Signing` tab.　`Code Signing` タブをクリックします。
3. Drag-and-drop your keystore file to the `ANDROID KEYSTORE FILE` field.あなたのKeystoreファイルを`ANDROID KEYSTORE FILE`へドラッグアンドドロップします。
4. Fill out the `Keystore password`, `Keystore alias`, and `Private key password` fields and click `Save metadata`.

   You should have these already at hand as these are included in your keystore file which is generated in Android Studio prior to uploading your app to Bitrise. For more information on keystore file, click [here](https://developer.android.com/studio/publish/app-signing). With this information added to your `Code Signing` tab, our `Sign APK step` (by default included in your Android deploy workflow) will take care of signing your APK so that it’s ready for distribution!　`Keystore password`、`Keystore alias`と`Private key password`を入力し、`Save metadata`をクリックします。

   これらの情報は前もって準備しておく必要があります。Bitriseへあなたのアプリをアップロードする前にAndroid Studioで生成されたKeystoreファイルにそれらが含まれていなければなりません。Keystoreファイルについては、こちらを参照してください。

   `Code Signing`タブにこれらの情報が追加されていると、Bitriseの`Sign APK step` （Androidデプロイワークフローにデフォルトで含まれています）がAPK署名の処理をするので、これで配布への準備は完了です！

{% include message_box.html type="info" title="More information on Android code signing" content=" Head over to our [Android code signing guide](https://devcenter.bitrise.io/code-signing/android-code-signing/android-code-signing-procedures/) to learn more about your code signing options!"%}

![](/img/android-code-signing-react.png)

The Android chunk of code signing is done!

これでAndroidのコード署名は完了です！

### Sign and export your iOS project for testing　テストにおけるiOSプロジェクトの署名とエクスポート

Code signing your iOS project depends on what you wish to do with the exported .ipa file. In this section, we describe how to code sign your project if you wish to **install and test it on internal testers' registered devices**. You will need an .ipa file exported with the `development` export method to share your project with testers.

If you wish to upload your .ipa file to an app store, check out [this](/getting-started-with-reactnative-apps/#sign-and-export-your-ios-project-for-deployment) section!

iOSプロジェクトのコード署名はエクスポートされた.ipaファイルの用途により異なります。ここのセクションでは、内部のテスターによって登録されたデバイスでインストール・テストを行う際のコード署名を紹介します。テスター同士でのプロジェクトの共有をするための　`development`のエクスポート手段を用いた、エクスポートされた.ipaファイルが必要です。

{% include message_box.html type="note" title="Automatic provisioning" content=" The example procedure described here uses manual provisioning, with the `Certificate and profile installe` Step. However, Bitrise also supports [automatic provisioning](https://devcenter.bitrise.io/code-signing/ios-code-signing/ios-auto-provisioning/) but it is not in the scope of this guide. "%}

You will need:

* the automatically created `deploy` workflow
* an iOS **Development** certificate (a .p12 certificate file)
* a **Development** type Provisioning Profile
* 自動的に作成された`deploy`ワークフロー
* iOS Development 証明書
* Developmentタイプのプロビジョニング・プロファイル

1. Set the code signing type of your project in Xcode to either manual or automatic (Xcode managed), and generate an .ipa file locally.　あなたのプロジェクトでの自動か手動のいずれかのコード署名方法を設定します。ローカルで.ipaファイルの生成を行ってください。
2. Collect and upload the code signing files with [the codesigndoc tool](https://devcenter.bitrise.io/code-signing/ios-code-signing/collecting-files-with-codesigndoc/).

   The tool can also upload your code signing files to Bitrise - we recommend doing so! Otherwise, upload them manually: enter the Workflow Editor and select the `Code signing` tab, then upload the files in their respective fields.　[the codesigndoc tool](https://devcenter.bitrise.io/code-signing/ios-code-signing/collecting-files-with-codesigndoc/)を使ってコード署名ファイルの収集とアップロードを行ってください。このツールはBitriseへコード署名ファイルをアップロードすることも可能なので、この機能を使うことをおすすめします！

   手動でアップロードすることもできます：Workflow Editorを開いて、`Code signing` タブを選択してください。その後、各自のフィールドにファイルのアップロードを行ってください。
3. Go to your app’s Workflow Editor, and select the `deploy` workflow in the `WORKFLOW` dropdown menu in the top left corner.　アプリのWorkflow Editorに進み上部左端にあるドロップダウンメニューの`WORKFLOW`内の`deploy`ワークフローを選択してください。
4. Check that you have the `Certificate and profile installer` Step in your workflow. It must be before the `Xcode Archive & Export for iOS` Step (you can have other Steps between the two, like `Xcode Test for iOS`).

   `Certificate and profile installer`ステップがあなたのワークフロー内にあることを確認してください。このステップは、`Xcode Archive & Export for iOS`ステップの前にある必要があります（これらの２つのステップの間に、 `Xcode Test for iOS`のような他のステップを含めることができます。）
5. Check the `Select method for export` input of the `Xcode Archive & Export for iOS` Step. By default, it should be the `$BITRISE_EXPORT_METHOD` environment variable. This variable stores the export method you selected when creating the app. If you selected `development` back then, you don’t need to change the input. Otherwise, manually set it to `development`.

   `Xcode Archive & Export for iOS` ステップ内にある `Select method for export` インプットを確認してください。デフォルトの環境変数は  `$BITRISE_EXPORT_METHOD`

   となっています。この変数はアプリの作成中に選択したエキスポート手段を保存します。もし以前に`development`を選択していたら、ここではインプットを変更する必要はありません。そうでなければ、`development`にマニュアルでセットしてください。

   _![Export method env var](https://devcenter.bitrise.io/img/export-method-envvar.png)_
6. [Start a build](https://devcenter.bitrise.io/builds/starting-builds-manually/).

   ビルドを開始します。

If you uploaded the correct code signing files, the `Certificate and profile installer` Step should install your code signing files and the `Xcode Archive & Export for iOS` Step should export an .ipa file with the **development export method**. If you have the `Deploy to Bitrise.io`Step in your workflow, you can find the .ipa file on the `APPS & ARTIFACTS` tab of the Build's page.

正確なコード署名ファイルをアップロードしていると、`Certificate and profile installer` ステップがあなたのコード署名ファイルをインストールし、`Xcode Archive & Export for iOS` ステップがdevelopment export method を用いて.ipa ファイルのエクスポートを行います。ワークフローに`Deploy to Bitrise.io` ステップがあれば、ビルドページ上の `APPS & ARTIFACTS` タブより.ipaファイルを見つけることができます。

{% include message_box.html type="info" title="About iOS code signing" content=" iOS code signing is often not this simple - read more about how [iOS code signing works on Bitrise](https://devcenter.bitrise.io/code-signing/ios-code-signing/code-signing)!"%}

### Sign and export your iOS project for deployment　  
iOSプロジェクトのデプロイ作業のための署名・エクスポート

If you set up your code signing files and created an .ipa file for your internal testers, it is time to **involve external testers and then to publish your iOS app to the App Store**.

内部のテスターのためのコード署名ファイルのセットアップ、.ipaファイルの作成をした場合、次は外部のテスターを伴ってApp StoreへあなたのiOSアプリを公開してください。

To deploy to Testflight and to the App Store, you will need more code signing files:

TestflightとApp Storeへデプロイするためには、他のコード署名ファイルが必要になります：

* an iOS **Distribution** Certificate
* an **App Store** type Provisioning Profile
* iOS配布証明書
* Provisioning Profile（App Store）

1. On your local machine, set up App Store code signing for your project in Xcode, and export an App Store .ipa file. If this fails locally, it will definitely fail on Bitrise, too!　

   ローカルマシンで、Xcode上でのプロジェクトのApp Storeコード署名をセットアップし、App Storeの.ipaファイルをエクスポートしてください。ローカルマシンで失敗すれば、Bitrise上でも間違いなく失敗しますので気をつけてください！
2. Collect and upload the code signing files with [the codesigndoc tool](https://devcenter.bitrise.io/code-signing/ios-code-signing/collecting-files-with-codesigndoc/).

   [the codesigndoc tool](https://devcenter.bitrise.io/code-signing/ios-code-signing/collecting-files-with-codesigndoc/)を使ってコード署名ファイルの収集とアップロードを行ってください。
3. Go to the app’s Workflow Editor and create a [new workflow](https://devcenter.bitrise.io/getting-started/getting-started-workflows/): click the `+ Workflow` button, enter the name of your new workflow and in the **BASED ON** dropdown menu, select `deploy`. This way the new workflow will be a copy of the basic `deploy` workflow.

   アプリのWorkflow Editorより[新しいワークフロー](https://devcenter.bitrise.io/getting-started/getting-started-workflows/)を作成してください：`+ Worlflow` ボタンをクリック、新規のワークフロー名を入力し `deploy` を**BASED ON** ドロップダウンメニューより選択してください。
4. Set the `Select method for export` input of the `Xcode Archive & Export for iOS` Step to `app-store`.

   `Xcode Archive & Export for iOS` ステップより `Select method for export`のインプットを`app-store`にセットしてください。

   ![App store export](https://devcenter.bitrise.io/img/app-store-export.png)

   If you wish to distribute your app to external testers without uploading the app to Testflight, select `ad-hoc` method and make sure you have the `Deploy to Bitrise.io` step in your workflow.

   Testflightへアプリのアップロードを行わずに外部のテスターにアプリを配布する場合、`ad-hoc`を選択しあなたのワークフロー上に`Deploy to Bitrise.io`ステップがあることを確認してください。

## Test your project　プロジェクトのテスト

You can use React Native's built in testing method, called `jest`. Add another `Run nmp command` step to your workflow, and type `test` in the `npm command with arguments to run` input field.

ワークフローに`Run nmp command` ステップを追加し、 `npm command with arguments to run` のフィールドに`test`と入力してください。

![](/img/run-nmp-test.png)

## Deploy to Bitrise　Bitriseにデプロイする

The `Deploy to bitrise.io` step uploads all the artifacts related to your build into the[ APPS & ARTIFACTS ](https://devcenter.bitrise.io/builds/build-artifacts-online/)tab on your Build’s page.

You can share the generated APK/.ipa file with your team members using the build’s URL. You can also notify user groups or individual users that your APK/.ipa file has been built.

1. Go to the `Deploy to bitrise.io` step.
2. In the `Notify: User Roles`, add the role so that only those get notified who have been granted with this role. Or fill out the `Notify: Emails` field with email addresses of the users you want to notify. Make sure you set those email addresses as [secret env vars](https://devcenter.bitrise.io/builds/env-vars-secret-env-vars/)! These details can be also modified under `Notifications` if you click the `eye` icon next to your generated APK/.ipa file in the `APPS & ARTIFACTS` tab.

## Deploy to an app store

If you wish to deploy your iOS app, follow the steps in [Code sign your iOS project for deployment](/getting-started/getting-started-with-react-native-apps/#sign-and-export-your-ios-project-for-deployment).

### Deploy your iOS app to Testflight and iTunes Connect

{% include message_box.html type="important" title="Have you exported an `app-store` .ipa file yet" content=" Make sure that you have exported an `app-store` .ipa file before starting the deployment procedure to a native marketplace!"%}

1. Add the `Deploy to iTunes Connect - Application Loader` Step to your workflow, after the `Xcode Archive & Export for iOS` Step but preferably before the `Deploy to Bitrise.io` Step.
2. Provide your Apple credentials in the `Deploy to iTunes Connect - Application Loader` Step.

   The Step will need your:
   * Apple ID
   * password or, if you use two-factor authentication on iTunes Connect, your application password.

   Don’t worry, the password will not be visible in the logs or exposed - [that’s why it is marked SENSITIVE](https://devcenter.bitrise.io/builds/env-vars-secret-env-vars#about-secrets).
3. [Start a build](/builds/Starting-builds-manually/).

   If everything went well, you should see your app on Testflight. From there, you can distribute it to external testers or release it to the App Store.

### Deploy your Android app to Google Play Store

{% include message_box.html type="important" title="Android code signing" content=" Make sure that you have uploaded the keystore file to the `ANDROID KEYSTORE FILE` field!"%}

1. Make sure you are in sync with Google Play Store! Learn how to
   * [register to Google Play Store and set up your project](https://devcenter.bitrise.io/tutorials/deploy/android-deployment/#register-to-google-play-store-and-set-up-your-first-project)
   * set up [Google Play API access](https://devcenter.bitrise.io/tutorials/deploy/android-deployment/#set-up-google-play-api-access)
2. In your Bitrise `Dashboard`, go to `Code Signing` tab and upload the service account JSON key into the `GENERIC FILE STORAGE.`
3. Copy the env key which stores your uploaded file’s url.

   For example: `BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
4. Add the `Google Play Deploy` step after the `Sign APK` step in your deploy workflow.
5. Fill out the required input fields as follows:
   * `Service Account JSON key file path`: This field can accept a remote URL so you have to provide the environment variable which contains your uploaded service account JSON key. For example: `$BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
   * `Package name`: the package name of your Android app
   * `Track`: the track where you want to deploy your APK (alpha/beta/rollout/production)

And that’s it! Start a build and release your Android app to the app store of your choice.