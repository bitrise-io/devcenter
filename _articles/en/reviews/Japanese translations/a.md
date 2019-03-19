---
date: 2019-03-12 10:04:50 +0000
title: Flutterアプリの開始(Getting started with Flutter applications)
redirect_from: []
published: false

---
{% include not_translated_yet.html %}

Flutter is a mobile app SDK that allows developers to create native apps for both iOS and Android. Bitrise supports Flutter apps: we have dedicated Steps to help you with all your Flutter needs. This guide walks you through setting up, testing, building and deploying a simple Flutter app on Bitrise.

このガイドではBitriseでのFlutterアプリのセットアップからテスト、ビルド、デプロイまでの説明します。

FlutterとはAndroidやiOs端末向けアプリケーション開発ツール、モバイルSDKです。BitriseはFlutterアプリをサポートしています:　全てのFlutter needsに応えるべくBitriseには専用のステップがあります。

## Adding a Flutter app

### Flutterアプリを追加

{% include message_box.html type="note" title="Do you have a Bitrise account?" content=" Make sure you have signed up to [bitrise.io](https://www.bitrise.io) and can access your Bitrise account. Here are [4 ways](https://devcenter.bitrise.io/getting-started/index#signing-up-to-bitrise) on how to connect your Bitrise account to your account found on a Git service provider. "%}

{% include message_box.html type="note" title="ビットライズのアカウントはありますか？" content=" [bitrise.io](https://www.bitrise.io)でサインアップしているかを確認しBitriseアカウントにアクセスしてください。[4 ways](https://devcenter.bitrise.io/getting-started/index#signing-up-to-bitrise)をクリックしBitriseアカウントとGit service providerのアカウントとコネクトする方法をチェックしてください。 "%}

 1. Click the `+` sign on the top menu bar and select `Add app`.
 2. On the `Create New App` page, choose the account you wish to add the app to.
 3. Set the privacy of the app to either Private or [Public](/getting-started/adding-a-new-app/public-apps) and click `Next`.
 4. Select the Git hosting service that hosts your repository, then find and select your repository that hosts the project. Read more about [connecting your repository](/getting-started/adding-a-new-app/connecting-your-repository).
 5. When prompted to set up repository access, click `No, auto-add SSH key`. Read more about [SSH keys](/getting-started/adding-a-new-app/setting-up-ssh-keys/).
 6. Type the name of the branch that includes your project's configuration - master, for example - then click `Next`.
 7. Wait while Bitrise is validating your project.

    We look for your configuration files and set up your app based on them. In the case of Flutter apps, you definitely need a `pubspec.yaml` file in your project.
 8. If your app has tests in the repository, you will be prompted to decide if you want to run them.
    1. トップメニューにある`+`をクリックし`Add app`セレクトします。
    2. `Create New App`ページでアプリに追加したいアカウントを選びます。
    3. アプリのプライバシーをPrivateまたは[Public](/getting-started/adding-a-new-app/public-apps)に設定します。`Next`をクリックします。
    4. リポジトをホストするGitホスティングサービスをセレクトし、プロジェクトのリポジトをセレクトします。詳しくは[connecting your repository](/getting-started/adding-a-new-app/connecting-your-repository)へ
    5. すぐリポジトリアクセスをセットアップするときは、`No, auto-add SSH key`をクリックする。詳しくは [SSH keys](/getting-started/adding-a-new-app/setting-up-ssh-keys/)へ
    6. プロジェクトのコンフィグレーションが含まれているブランチの名前(master等）を入力し、`Next`をクリックします。
    7. Bitriseがプロジェクトを有効にするまで待機する。

       BitriseがConfigurationファイルを探し、それらを基にアプリをセットアップします。Flutterアプリの場合はプロジェクトの`pubspec.yaml`ファイルが必要です。
       1. アプリがリポジトリ内にテストがある場合、？テスト？を行うか決め。

    ![](/img/select_test.png)
 9. If you have an iOS project in your Flutter project, you will have to select an .ipa export method. 9. FlutteプロジェクトのiOSプロジェクトを使用している場合、an .ipa export methodをセレクトします。

    ![undefined](https://cdn.buttercms.com/rOAuKJ2jToSecv2pEs7g)
10. Register a webhook when prompted.

    With a webhook, Bitrise can start a build automatically when code is pushed to your repository, or a pull request is created. This also kicks off your first build - click the message and it will take you to the build page. 10. webhookに登録する？？？

    コードがリポジトリに押された時、もしくはPull Requestが作成されBitriseがビルドを自動的に始める。初めてのビルドも始められ、メッセージをクリックしてとビルドページへ。

## Testing a Flutter app

## Flutterアプリのテスト

You can write and run unit-, widget-, and integration tests with Flutter. For more information, check out [Flutter's official documentation](https://flutter.io/docs/testing).

Flutterで**ユニット、ウィジェット, システムテスト**を書き、動かすことができます。詳しくは[Flutter's official documentation](https://flutter.io/docs/testing)をクリック。

You can use our automatically generated `primary` workflow to test your Flutter app. By default, it will include the `Flutter Analyze` Step which runs static code tests.

Flutterアプリをテストするためにbitriseの自動的に作成される`primary`ワークフローを使うことができます。デフォルトにより静的コードテストを実行している`Flutter Analyze`を含みます。

{% include message_box.html type="info" title="Flutter tests" content="If you have tests in your repository, and selected **yes** when prompted, during app creation, whether you want to run these tests, the primary workflow will include the `Flutter Test` Step by default. If you add tests to your app later, add the `Flutter Test` Step to your workflow manually."%}

{% include message_box.html type="info" title="Flutter テスト" content="リポジトリでテストしてprompt時にyesをセレクトした場合、アプリの作成中、テストを実行するしないにしても、プライマリーワークフローがデフォルトにより`Flutter Test`Stepを組み込みます。テストをアプリに追加した場合は、その後手動で`Flutter Test`Stepに追加されます。"%}

1. Open your app's Workflow Editor and open the `primary` workflow.
2. In the `Flutter Install` Step, fill in the `Flutter SDK Version` input.

   You can specify either tags or branches of the Flutter SDK's git repository. The default value is `stable`. This will use the latest stable branch of Flutter.
   * To find the available version tags, check: [https://github.com/flutter/flutter/releases](https://github.com/flutter/flutter/releases "https://github.com/flutter/flutter/releases")
   * To see the the available branches, check: [https://github.com/flutter/flutter/branches](https://github.com/flutter/flutter/branches "https://github.com/flutter/flutter/branches")
   1. Workflow Editor アプリ、`primary`ワークフローを開きます。
   2. `Flutter Install`Stepで,　`Flutter SDK Version`入力を埋めます。

   Flutter SDKのgitリポジトリのタグかブランチを指定します。デフォルト値は`stable`です。Flutterの新しいstableブランチを使用できます。
   * 利用可能なタグを見つけるには[https://github.com/flutter/flutter/releases](https://github.com/flutter/flutter/releases "https://github.com/flutter/flutter/releases")
   * 利用可能なブランチを見るには[https://github.com/flutter/flutter/branches](https://github.com/flutter/flutter/branches "https://github.com/flutter/flutter/branches")
3. To the `Flutter Analyze` Step, add any flags you wish to use to the `Additional parameters` input.

   The Step runs the `flutter analyze` command with the specified flags. To check the available flags, open a command line interface on your own machine and run `flutter analyze --help`.
4. To the `Flutter Test` Step - if you have it -, add any flags you wish to use to the `Additional parameters` input.

   The Step runs the `flutter test` command with the specified flags. To check the available flags, open a command line interface on your own machine and run `flutter test --help`.

   3\. `Flutter Analyze`Stepに`Additional parameters`入力に使うフラグを追加します。

   Stepが指定されたフラグで`flutter analyze`コマンドを実行します。使用可能なフラグをチェックするにはコマンドラインインターフェイスをマシンで開き`flutter test --help`を実行します。
   4\. 3.同様`Flutter Test`Stepに`Additional parameters`入力に使うフラグを追加します。

   Stepが指定されたフラグで`flutter test`コマンドを実行します。使用可能なフラグをチェックするにはコマンドラインインターフェイスをマシンで開き`flutter test --help`を実行します。

   ![](/img/flutter_test.png)
5. Make sure the `Project Location` input of the `Flutter Test` Step is correct.

   The default value is the the environment variable created for your Flutter project's location.
   5\. `Flutter Test`ステップの`Project Location`入力が正確であることを確認します。

   デフォルト値はFlutter プロジェクトロケーションのために作成された環境変数です。

Run a build! Once it's done, you can find your test results on the `Apps and Artifacts` tab of the **Build** page of the app.

ビルドを実行しましょう！終了後、テスト結果をアプリの**ビルド**ページ`Apps and Artifacts`タブで見つけられます。

## Deploying a Flutter app

## Flutter

## アプリのデプロイ

To build and deploy a Flutter app, a workflow must contain these Flutter Steps:

* `Flutter Install`
* `Flutter Build`

Flutterアプリをビルド、デプロイするためworkflowに

* `Flutter Install`
* `Flutter Build`

のStepが含まれてなければいけません。

If you have platforms specified in your repository, a `deploy` workflow will be automatically generated when adding the app on Bitrise. The content of this workflow depends on the platforms: for example, if your app contains only an iOS project, the workflow will contain the `Certificate and profile installer` and the `Xcode Archive & Export for iOS` Steps.

リポジトリで指定されたプラットフォームがあれば、アプリをBitriseに追加した際に`deploy`workflowが自動的に作成されます。workflowのコンテントはプラットフォーム次第です。例えば、アプリがiOSプロジェクトのみを含んでいる場合、workflowは`Certificate and profile installer`、`Xcode Archive & Export for iOS`Stepを含みます。

You can build both iOS and Android projects at the same time or you can build them separately, each using their own workflow. **You can set this in the** `Platform` **input of the** `**Flutter Build**` **Step any time**. By default, the Step is configured according to the platform or platforms that the scanner detected when adding the app on Bitrise.

iOS、Androidプロジェクトはworkflowを使い同時、または個々の作成を`__**Flutter Build*__`**Stepの__`**Platform**`**入力でいつでも設定することが可能です**。デフォルトにより、Stepは、Bitriseにアプリを追加する際にスキャナーが検出したプラットフォーム？？？？？に従って構成されます。

Here's an example workflow we'll use in this configuration, with all the necessary Steps:

ワークフローの例をこのコンフィグレーションで、必要なステップを踏まえて説明します。

![](/img/flutter-workflow.png)We'll discuss the Steps specific to iOS and Android deployment in their respective sections!

{% include message_box.html type="note" title="Packages and libraries" content="We also support building Flutter packages and libraries. Unlike in the case of apps, there is no artifact to build so there is no need for a `Flutter Build` Step in your workflow."%}

iOSとAndroidの特有の配置手順については、それぞれのセクションで説明します！

{% include message_box.html type="note" title="パッケージとライブラリ" content="Flutterのパッケージとライブラリをビルドするサポートもしています。アプリとは異なり、ビルドするためのアーティファクトがないのでワークフローに`Flutter Build`ステップは必要ありません。"%}

### Deploying a Flutter app to Bitrise

### BitriseにFlutter アプリをデプロイ

The `Deploy to bitrise.io` step uploads all the artifacts related to your build into the[ APPS & ARTIFACTS ](/builds/build-artifacts-online/)tab on your Build’s page.

You can share the generated APK/.ipa file with your team members using the build’s URL. You can also notify user groups or individual users that your APK/.ipa file has been built.

`Deploy to bitrise.io`ステップはビルドページの[ APPS & ARTIFACTS](/builds/build-artifacts-online/)タブの中にあるビルドに関係している全てのアーティファクトをアップロードします。

ビルドのURLを使用して、作成されたAPK / .ipaファイルをチームメンバーと共有できます。 APK / .ipaファイルが作成されたことをユーザーグループおよび個々のユーザに通知することもできます。

1. Go to the `Deploy to bitrise.io` step.
2. In the `Notify: User Roles`, add the role so that only those get notified who have been granted with this role. Or fill out the `Notify: Emails` field with email addresses of the users you want to notify. Make sure you set those email addresses as [secret env vars](/builds/env-vars-secret-env-vars/)! These details can be also modified under `Notifications` if you click the `eye` icon next to your generated APK/.ipa file in the `APPS & ARTIFACTS` tab.
3. `Deploy to bitrise.io`ステップへ
4. `Notify: User Roles`にロールを追加するとロールを与えられたユーザーにのみ通知がいきます。または、`Notify: Emails`に通知したいユーザーのメールアドレスを[secret env vars](/builds/env-vars-secret-env-vars/)として設定し入力します。`APPS & ARTIFACTS`タブで作成されたAPK / .ipaファイルの横にあるの`eye`アイコンをクリックすると、詳細を`Notifications`で変更することもできます。

### Deploying a Flutter app to App Store Connect

### App Store ConnectにFlutterアプリをデプロイ

To deploy your iOS Flutter project to the App Store, you'll need to build the app, export an .ipa file and submit it to the App Store.

Unlike testing, this requires code signing files:

* an iOS Distribution Certificate (a .p12 file)
* an App Store Provisioning Profile

Read more about iOS code signing on Bitrise in [our detailed guides](https://devcenter.bitrise.io/code-signing/ios-code-signing/code-signing/)!

iOS FlutterプロジェクトをApp Storeにデプロイするために、アプリをビルドし、an .ipaファイルをエクスポート後にApp Storeにサブミットします。

テストとは異なり、コード署名ファイルが必要です。

* iOS Distribution Certificate (a .p12 file)
* App Store Provisioning Profile

BitriseのiOSコード署名については[our detailed guides](https://devcenter.bitrise.io/code-signing/ios-code-signing/code-signing/)から！

 1. Make sure you have the `Certificate and profile installer` Step in your workflow.
    1. ワークフローに`Certificate and profile installer`ステップがあるか確認します。
 2. [Upload the required code signing files](/code-signing/ios-code-signing/ios-manual-provisioning/) to Bitrise.
    2\. [必要なコード署名](/code-signing/ios-code-signing/ios-manual-provisioning/)ファイルをBitriseにアップロードします
 3. Open the `Flutter Build` Step and find the `iOS Platform Configs` input group.
    3\. `Flutter Build`ステップを開き、`iOS Platform Configs`入力グループを確認してください
 4. Make sure the `Additional parameters` input has the value `--release`.
    4\. `Additional parameters`入力にバリュー`--release`があるかを確認してください
 5. Check the `Platform` input of the Step: make sure it's set to either `iOS` or `both`.

    5\. ステップ`Platfor`入力の確認: `iOS`か`both`のどちらかに設定します
 6. Make sure you have the `Xcode Archive & Export for iOS` Step in your workflow.

    It should be after the `Flutter Build` Step.
    6\." `Flutter Build`ステップ後"に、ワークフローに`Xcode Archive & Export for iOS`ステップがあることを確認します。
 7. Set the `Select method for export` input of the Step to `app-store`.
    7\. ステップの`Select method for export`入力を`app-store`で設定します。
 8. Add the `Deploy to iTunes Connect` Step to the end of the workflow.
    8\. `Deploy to iTunes Connect`ステップをワークフローの最後に追加します。
 9. Provide your Apple credentials in the respective input fields.
    * Apple ID
    * password or, if you use two-factor authentication on iTunes Connect, your application password.

    Don’t worry, the password will not be visible in the logs or exposed - [that’s why it is marked SENSITIVE](/builds/env-vars-secret-env-vars#about-secrets).
    9\. 個々の入力項目にAppleのアカウント情報（クレデンシャル）が必要です。
    * Apple ID
    * パスワード、iTunes Connectの二要素認証を使っている場合は申請パスワード
10. [Start a build]()!
    10\. ビルド開始！

If all goes well, the Step will submit the app to App Store Connect. You can, from the App Store Connect page, distribute the app to external testers via Testflight, or release it to the App Store itself.

順調に進んだ場合、ステップはアプリをApp Store Connectにサブミットします。App Store Connectページから、Testflightを介してアプリを外部のテスターに​​配布するか、App Storeにリリースできます。

### Deploying a Flutter app to Google Play

### Google PlayにFlutterアプリをデプロイ

To deploy your app to Google Play, you need to export an APK file and sign it.

Google Playにアプリをデプロイするには、APKファイルをエクスポートして署名する必要があります。

You can [configure the signing](https://flutter.io/docs/deployment/android#configure-signing-in-gradle) in the app's `build.gradle` file and then Flutter will sign your app during the build phase.

In this guide, we'll walk you through the other option: how to sign your APK file on Bitrise and then deploy the app to Google Play. First, you will need to [create a keystore file](https://flutter.io/docs/deployment/android#create-a-keystore) and then upload it to Bitrise.

アプリの`build.gradle`ファイルで[署名を設定](https://flutter.io/docs/deployment/android#configure-signing-in-gradle)すると、ビルドフェーズの間にFlutterがアプリに署名します。

他の選択肢について: BitriseでAPKファイルに署名してからGoogle Playにアプリをデプロイできます。まず、[キーストアファイルを作成](https://flutter.io/docs/deployment/android#create-a-keystore)し、Bitriseにアップロードする必要があります。

1. Open your app's Workflow Editor.
2. Go to the `Code Signing` tab.
3. Drag-and-drop your keystore file to the `ANDROID KEYSTORE FILE` field.
4. Fill out the `Keystore password`, `Keystore alias`, and `Private key password` fields and click `Save metadata`.

Once that is done, you are ready to configure a workflow to deploy the app.

1. アプリのWorkflow Editorを開きます
2. `Code Signing`タブへ
3. keystoreファイルを`ANDROID KEYSTORE FILE`項目にドラッグ＆ドロップします。
4. `Keystore password`, `Keystore alias`,  `Private key password`らの項目を埋め、`Save metadata`をクリックします。

完了後、アプリをデプロイするためにワークフローを構成できます。

1. Make sure you are in sync with Google Play Store!

   Learn how to:
   * [register to Google Play Store and set up your project](https://devcenter.bitrise.io/tutorials/deploy/android-deployment/#register-to-google-play-store-and-set-up-your-first-project)
   * set up [Google Play API access](https://devcenter.bitrise.io/tutorials/deploy/android-deployment/#set-up-google-play-api-access)
     1. Google Play Storeと同期していることを確認します。
        * [Google Play Store登録とプロジェクトセットアップ](https://devcenter.bitrise.io/tutorials/deploy/android-deployment/#register-to-google-play-store-and-set-up-your-first-project)
        * [Google Play API access](https://devcenter.bitrise.io/tutorials/deploy/android-deployment/#set-up-google-play-api-access)のセットアップ方法
2. In your Bitrise `Dashboard`, go to `Code Signing` tab and upload the service account JSON key into the `GENERIC FILE STORAGE.`
   2\. Bitrise `Dashboard`から`Code Signing`タブに行きサービスアカウントJSONキーを`GENERIC FILE STORAGE`にアップロードします。
3. Copy the env key which stores your uploaded file’s url.

   For example: `BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
   3\. ファイルURLがあるenv keyをコピーします。

   例:`BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
4. Make sure you have the `Sign APK` Step in your workflow.

   It should be after the `Flutter Build` Step.
   4\. "`Flutter Build`ステップ後"に、ワークフローに`Sign APK`ステップがあるか確認します。
5. Open the `Flutter Build` Step and find the `Android Platform Configs` input group.
   5\. `Flutter Build`ステップを開き`Android Platform Configs`入力グループを確認します。
6. Make sure the `Additional parameters` input has the value `--release`.
   6\.  `Additional parameters`入力にバリュー`--release`があるかを確認します。
7. Check the `Platform` input of the Step: make sure it's set to either `android` or `both`.
   7\. ステップ`Platform`入力の確認:`android`か`both`のどちらかに設定します。
8. Make sure you have the `Google Play Deploy` Step after the `Sign APK` Step to your workflow.
   8\. ワークフローへの`Sign APK`ステップ後に、`Google Play Deploy`ステップがあることを確認します
9. Fill out the required input fields as follows:
   * `Service Account JSON key file path`: This field can accept a remote URL so you have to provide the environment variable which contains your uploaded service account JSON key. For example: `$BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
   * `Package name`: the package name of your Android app
   * `Track`: the track where you want to deploy your APK (for example, alpha/beta/rollout/production or any custom track you set)
     9\. 以下の入力項目に記入します。
     * `Service Account JSON key file path`:この項目はリモートURLを受け入れることができるため、アップロードしたサービスアカウントのJSONキーを含む環境変数を指定する必要があります。例:`$BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
     * `Package name`:AndroidアプリのPackage name
     * `Track`:APKを展開するトラック（例: alpha / beta / rollout / productionまたは設定したカスタムトラック）

And that’s it! Start a build and release your Android app to the app store of your choice.

さあ、App StoreにAndroidアプリをビルド、リリースしましょう！