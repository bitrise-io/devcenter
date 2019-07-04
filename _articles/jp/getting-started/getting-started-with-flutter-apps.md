---
title: Flutterアプリの開始
date: 2019-03-08T15:17:45.000+00:00
redirect_from: []
tag: []
summary: ''
menu:
  getting-started-main:
    weight: 28
    title: Getting started with Flutter apps

---
このガイドではBitriseでのFlutterアプリのセットアップからテスト、ビルド、デプロイまでの説明します。

FlutterとはAndroidやiOs端末向けアプリケーション開発ツール、モバイルSDKです。BitriseはFlutterアプリをサポートしています:　全てのFlutter needsに応えるべくBitriseには専用のステップがあります。

## Flutterアプリを追加

{% include message_box.html type="note" title="ビットライズのアカウントはありますか？" content=" [bitrise.io](https://www.bitrise.io)でサインアップしているかを確認しBitriseアカウントにアクセスしてください。[4 ways](/jp/getting-started/index/)をクリックしBitriseアカウントとGit service providerのアカウントとコネクトする方法をチェックしてください。 "%}

 1. トップメニューにある`+`をクリックし`Add app`セレクトします。
 2. `Create New App`ページでアプリに追加したいアカウントを選びます。
 3. アプリのプライバシーをPrivateまたは[Public](/jp/getting-started/public-apps)に設定します。`Next`をクリックします。
 4. リポジトをホストするGitホスティングサービスをセレクトし、プロジェクトのリポジトをセレクトします。詳しくは[connecting your repository](/jp/getting-started/adding-a-new-app/)へ
 5. すぐリポジトリアクセスをセットアップするときは、`No, auto-add SSH key`をクリックする。詳しくは [SSH keys](/jp/getting-started/adding-a-new-app/)へ
 6. プロジェクトのコンフィグレーションが含まれているブランチの名前(master等）を入力し、`Next`をクリックします。
 7. Bitriseがプロジェクトを有効にするまで待機する。

    BitriseがConfigurationファイルを探し、それらを基にアプリをセットアップします。Flutterアプリの場合はプロジェクトの`pubspec.yaml`ファイルが必要です。
 8. アプリのリポジトリにテストがある場合は、それらを実行するかどうかを決定するように求められます。
 9. ![](/img/select_test.png)

    FlutteプロジェクトのiOSプロジェクトを使用している場合、an .ipa export methodをセレクトします。
10. ![undefined](https://cdn.buttercms.com/rOAuKJ2jToSecv2pEs7g) プロンプトが表示されたらwebhookに登録します

    コードがリポジトリにぷっしゅされた時、もしくはPull Requestが作成されBitriseがビルドを自動的に始めます。初めてのビルドも始められ、メッセージをクリックしてとビルドページへ。

## Flutterアプリのテスト

Flutterで**ユニット、ウィジェット, システムテスト**を書き、動かすことができます。詳しくは[Flutter's official documentation](https://flutter.io/docs/testing)をクリック。

Flutterアプリをテストするためにbitriseの自動的に作成される`primary`ワークフローを使うことができます。デフォルトにより静的コードテストを実行している`Flutter Analyze`を含みます。

{% include message_box.html type="info" title="Flutter テスト" content="リポジトリでテストしてprompt時にyesをセレクトした場合、アプリの作成中、テストを実行するしないにしても、プライマリーワークフローがデフォルトにより`Flutter Test`Stepを組み込みます。テストをアプリに追加した場合は、その後手動で`Flutter Test`Stepに追加されます。"%}

1. Workflow Editor アプリ、`primary`ワークフローを開きます。
2. `Flutter Install`Stepで,　`Flutter SDK Version`入力を埋めます。

   Flutter SDKのgitリポジトリのタグかブランチを指定します。デフォルト値は`stable`です。Flutterの新しいstableブランチを使用できます。
   * 利用可能なタグを見つけるには[https://github.com/flutter/flutter/releases](https://github.com/flutter/flutter/releases "https://github.com/flutter/flutter/releases")
   * 利用可能なブランチを見るには[https://github.com/flutter/flutter/branches](https://github.com/flutter/flutter/branches "https://github.com/flutter/flutter/branches")
3. `Flutter Analyze`Stepに`Additional parameters`入力に使うフラグを追加します。

Stepが指定されたフラグで`flutter analyze`コマンドを実行します。使用可能なフラグをチェックするにはコマンドラインインターフェイスをマシンで開き`flutter test --help`を実行します。 4. 3.同様`Flutter Test`Stepに`Additional parameters`入力に使うフラグを追加します。

Stepが指定されたフラグで`flutter test`コマンドを実行します。使用可能なフラグをチェックするにはコマンドラインインターフェイスをマシンで開き`flutter test --help`を実行します。

![](/img/flutter_test.png) 5. `Flutter Test`ステップの`Project Location`入力が正確であることを確認します。

デフォルト値はFlutter プロジェクトロケーションのために作成された環境変数です。

ビルドを実行しましょう！終了後、テスト結果をアプリの**ビルド**ページ`Apps and Artifacts`タブで見つけられます。

## Flutterアプリのデプロイ

Flutterアプリをビルド、デプロイするためworkflowに

* `Flutter Install`
* `Flutter Build`

のStepが含まれてなければいけません。

リポジトリで指定されたプラットフォームがあれば、アプリをBitriseに追加した際に`deploy`workflowが自動的に作成されます。workflowのコンテントはプラットフォーム次第です。例えば、アプリがiOSプロジェクトのみを含んでいる場合、workflowは`Certificate and profile installer`、`Xcode Archive & Export for iOS`Stepを含みます。

iOS、Androidプロジェクトはworkflowを使い同時、または個々の作成を`__**Flutter Build*__`**Stepの__`**Platform**`**入力でいつでも設定することが可能です**。デフォルトにより、Stepは、Bitriseにアプリを追加する際にスキャナーが検出したプラットフォーム？？？？？に従って構成されます。

ワークフローの例をこのコンフィグレーションで、必要なステップを踏まえて説明します。

![](/img/flutter-getting-started.jpg)

iOSとAndroidの特有の配置手順については、それぞれのセクションで説明します！

{% include message_box.html type="note" title="パッケージとライブラリ" content="Flutterのパッケージとライブラリをビルドするサポートもしています。アプリとは異なり、ビルドするためのアーティファクトがないのでワークフローに`Flutter Build`ステップは必要ありません。"%}

### BitriseにFlutter アプリをデプロイ

`Deploy to bitrise.io`ステップはビルドページの[ APPS & ARTIFACTS](/builds/build-artifacts-online/)タブの中にあるビルドに関係している全てのアーティファクトをアップロードします。

ビルドのURLを使用して、作成されたAPK / .ipaファイルをチームメンバーと共有できます。 APK / .ipaファイルが作成されたことをユーザーグループおよび個々のユーザに通知することもできます。

1. `Deploy to bitrise.io`ステップへ
2. `Notify: User Roles`にロールを追加するとロールを与えられたユーザーにのみ通知がいきます。または、`Notify: Emails`に通知したいユーザーのメールアドレスを[secret env vars](/builds/env-vars-secret-env-vars/)として設定し入力します。`APPS & ARTIFACTS`タブで作成されたAPK / .ipaファイルの横にあるの`eye`アイコンをクリックすると、詳細を`Notifications`で変更することもできます。

### App Store ConnectにFlutterアプリをデプロイ

iOS FlutterプロジェクトをApp Storeにデプロイするために、アプリをビルドし、an .ipaファイルをエクスポート後にApp Storeにサブミットします。

テストとは異なり、コード署名ファイルが必要です。

* iOS Distribution Certificate (a .p12 file)
* App Store Provisioning Profile

BitriseのiOSコード署名については[our detailed guides](/jp/code-signing/ios-code-signing/code-signing/)から！

 1. ワークフローに`Certificate and profile installer`ステップがあるか確認します。
 2. [必要なコード署名](/jp/code-signing/ios-code-signing/ios-manual-provisioning/)ファイルをBitriseにアップロードします
 3. `Flutter Build`ステップを開き、`iOS Platform Configs`入力グループを確認してください
 4. `Additional parameters`入力にバリュー`--release`があるかを確認してください
 5. ステップ`Platfor`入力の確認: `iOS`か`both`のどちらかに設定します
 6. " `Flutter Build`ステップ後"に、ワークフローに`Xcode Archive & Export for iOS`ステップがあることを確認します。
 7. ステップの`Select method for export`入力を`app-store`で設定します。
 8. `Deploy to iTunes Connect`ステップをワークフローの最後に追加します。
 9. 個々の入力項目にAppleのアカウント情報（クレデンシャル）が必要です。
    * Apple ID
    * パスワード、iTunes Connectの二要素認証を使っている場合は申請パスワード

      パスワードはログやエクスポーズに公開されません-なので[SENSITIVEとマークされています](/jp/builds/env-vars-secret-env-vars#about-secrets)
10. ビルド開始！

順調に進んだ場合、ステップはアプリをApp Store Connectにサブミットします。App Store Connectページから、Testflightを介してアプリを外部のテスターに​​配布するか、App Storeにリリースできます。

### Google PlayにFlutterアプリをデプロイ

Google Playにアプリをデプロイするには、APKファイルをエクスポートして署名する必要があります。

アプリの`build.gradle`ファイルで[署名を設定](https://flutter.io/docs/deployment/android#configure-signing-in-gradle)すると、ビルドフェーズの間にFlutterがアプリに署名します。

他の選択肢について: BitriseでAPKファイルに署名してからGoogle Playにアプリをデプロイできます。まず、[キーストアファイルを作成](https://flutter.io/docs/deployment/android#create-a-keystore)し、Bitriseにアップロードする必要があります。

1. アプリのWorkflow Editorを開きます
2. `Code Signing`タブへ
3. keystoreファイルを`ANDROID KEYSTORE FILE`項目にドラッグ＆ドロップします。
4. `Keystore password`, `Keystore alias`,  `Private key password`らの項目を埋め、`Save metadata`をクリックします。

完了後、アプリをデプロイするためにワークフローを構成できます。

1. Google Play Storeと同期していることを確認します。
   * [Google Play Store登録とプロジェクトセットアップ](/jp/tutorials/deploy/android-deployment/#register-to-google-play-store-and-set-up-your-first-project)
   * [Google Play API access](/jp/tutorials/deploy/android-deployment/#set-up-google-play-api-access)のセットアップ方法
2. Bitrise `Dashboard`から`Code Signing`タブに行きサービスアカウントJSONキーを`GENERIC FILE STORAGE`にアップロードします。
3. ファイルURLがあるenv keyをコピーします。

   例:`BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
4. "`Flutter Build`ステップ後"に、ワークフローに`Android Sign`ステップがあるか確認します。
5. `Flutter Build`ステップを開き`Android Platform Configs`入力グループを確認します。
6. `Additional parameters`入力にバリュー`--release`があるかを確認します。
7. ステップ`Platform`入力の確認:`android`か`both`のどちらかに設定します。
8. ワークフローへの`Android Sign`ステップ後に、`Google Play Deploy`ステップがあることを確認します
9. 以下の入力項目に記入します。
   * `Service Account JSON key file path`:この項目はリモートURLを受け入れることができるため、アップロードしたサービスアカウントのJSONキーを含む環境変数を指定する必要があります。例:`$BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
   * `Package name`:AndroidアプリのPackage name
   * `Track`:APKを展開するトラック（例: alpha / beta / rollout / productionまたは設定したカスタムトラック）

さあ、App StoreにAndroidアプリをビルド、リリースしましょう！