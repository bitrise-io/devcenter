---
title: Xamarinアプリの開始
date: 2018-10-19T11:49:28.000+00:00
menu:
  getting-started-main:
    weight: 33

---
[Xamarin](/tutorials/xamarin/index/)はモバイルアプリにおけるクロスプラットフォームのビルド作業のツールを提供しています。もちろんBitriseはXamarinにも対応しています：ここのガイドは以下の手順を説明します：

* BitriseへXamarinアプリの追加
* アプリのテスト
* アプリのデプロイ

全ての手順は一つのワークフローで完了できますが、２つ以上のワークフローを使用することをおすすめします：１つ目をアプリのテスト用、２つ目をアプリのデプロイ用としてワークフローを使用してください。異なるプロジェクトであっても、別々のワークフローを用意する必要はありません。iOSとAndroidアプリの両方とも、一つのワークフローでビルドができます。

* 始める前に
* Xamarinアプリの追加
* Dependenciesのインストール
* Xamarinアプリのテスト
* Xamarinアプリのデプロイ

## 始める前に

BitriseへXamarinアプリを追加する前に、Xamarin solution fileを用意する必要があります。Bitriseがそのsolution fileを検知し、全ての利用可能な [solution configurations](https://docs.microsoft.com/en-us/visualstudio/ide/understanding-build-configurations?view=vs-2017)が表示されます。

Xamarin solution fileは複数のプロジェクトを含めることができます。あなたのsolution configurationがどのプロジェクト（solution items）がビルドされるのか測定し、ビルドする際に使用するproject configuration type（例：_debug_ または _release_）も測定します。

[Visual Studioにてsolution configurationsのセットアップを行ってください](https://docs.microsoft.com/en-us/appcenter/build/xamarin/ios/solution-configuration-mappings)。Solution file上にはBitriseでビルドを行う全てのsolution configurationsが含まれていなければなりません。また、一定のsolution platformでビルドを行う場合、そのプラットフォームに互換性があることを確認してください。

{% include message_box.html type="example" title="Solution configuration" content="例：ソリューションファイルの中にAndroidとiOSのプロジェクトが含まれていて、AndroidプロジェクトのみをBitriseでビルドを行いたい場合、AndroidプロジェクトのみをビルドするVisual Studio上でsolution configurationをセットアップしてからBitriseでそのコンフィギュレーションを使用してください。適切なソリューションプラットフォームを使用することが重要です。（Androidプロジェクトのみのビルドを行う場合、iPhoneをソリューションプラットフォームとして設定しないでください。）"%}

## Xamarinアプリの追加

{% include message_box.html type="note" title="Bitriseアカウントをお持ちですか？" content=" [bitrise.io](https://www.bitrise.io)にサインアップ済みでBitriseアカウントにアクセスできるか確認してください。お持ちのGitサービスプロバイダをBitriseアカウントに接続する方法はこちらの[４通りの方法](/getting-started/index#signing-up-to-bitrise)があります。 "%}

 1. 上段にあるメニューバーより`+`をクリックして`Add app`を選択します。
 2. Create new Appのページにて、アプリを追加したいアカウントを選んでください。
 3. アプリのプライバシー設定を行ってください；Private または Publicを選んで`Next`をクリックします。
 4. あなたのレポジトリをホストするGit hosting serviceを選択してください。その後、プロジェクトをホストするレポジトリを見つけて選択します。詳しい内容は、[レポジトリに接続する](/getting-started/adding-a-new-app/connecting-your-repository)をお読みください。
 5. レポジトリのアクセスのセットアップが完了したら、`No, auto-add SSH key` をクリックします。SSHキーについては[こちら](/getting-started/adding-a-new-app/setting-up-ssh-keys/)を確認してください。
 6. あなたのプロジェクトのconfigurationが含まれたBranchの名前を入力します。そして`Next` をクリックします。
 7. Bitriseがプロジェクトを確認を行うのでしばらくお待ち下さい。ここではBitriseがconfiguration fileを探して、それに基づいてアプリのセットアップを行います。Xamarinアプリの場合は、Xamarin Solution Fileを探します。
 8. Xamarin solution configuration を選択します。利用可能なオプションはsolution fileに基づいています。これは[環境変数](https://devcenter.bitrise.io/builds/env-vars-secret-env-vars/)として保存され、あとで変更も可能です。

    ![](/img/xamarin-project-build.png)
 9. Xamarin solution platformを選択します。これも[環境変数](https://devcenter.bitrise.io/builds/env-vars-secret-env-vars/)として保存され、あとで変更も可能です。
10. ビルド設定の最終確認を行ってください。
11. webhookの登録をしてください。登録後、コードがプッシュされたりプルリクエストが作成されるとBitriseが自動的にビルドを開始します。これで最初のビルドが開始されます。messageをクリックすると、自動的にbuildページに遷移されます。

## 依存関係のインストール

Xamarinアプリの依存関係のインストールは特定のステップ`NuGet restore`により処理されます。このステップは自動で作成されたXamarinアプリの[ワークフロー](/getting-started/getting-started-workflows/)の一部を担っており、一つ必要なインプットがあります：アプリを追加する際の環境変数として保存されるXamarin solution fileへの進路となります。

1. アプリのWorkflow Editorへ入り、`Workflows`タブをクリックします。
2. あなたのワークフロー内に`NuGet restore`があることを確認してください。ここのステップで必要なインプットはXamarin solution fileへの進路となります。デフォルトでは、そのインプットは[環境変数](/getting-started/getting-started-steps/#environment-variables-as-step-inputs)となっており、Bitriseにアプリを追加するときに保存されます。異なるsolution fileを使う際は、Workflow Editor内にあるタブ`Env Vars`をクリックして環境変数の値を変更してください。

## Xamarinアプリのテスト

BitriseではiOS・Androidプロジェクトの両方でユニットテストとUIテストが行えます。簡単に設定できるので、Microsoft App Centerにて入手可能なTesting Frameworkの全てを利用することができます。

### Unit testing　ユニットテスト

Xamarinアプリのユニットテストは、`NUnit Runner` ステップにて走らせることができます。そのステップはNUnit Console Runnerを使用したNUnit 2.x もしくはNUnit 3.0 またはそれより高いテストで走ります（_nunit3-console.exe_）。

1. アプリのWorkflow Editorに入り、`Workflows`タブをクリックします。
2. ワークフローに`NUnit runner` ステップを追加します。このステップは`NuGet restore` ステップ後に追加してください：アプリのテストを走らせる前に全ての依存関係をインストールしてください。
3. 必要なinput variablesを入力します。デフォルトでは、全てのinputは[Environment Variables](/jp/getting-started/getting-started-steps/#environment-variables-as-step-inputs)になっています。異なるsolution fileまたはsolution configuration を使用する場合は、Workflow Editor内のタブ`Env Vars` をクリックし、環境変数の値を変更してください。
   * **Path to Xamarin Solution**: あなたのXamarin solution fileの場所を示します。
   * **Xamarin project configuration**: Bitriseであなたが走らせたい、Visual Studioでセットアップされたsolution configurationが表示されます。異なる設定で走らせたい場合は、適切な環境変数に変更してください。
   * **Xamarin platform**: あなたのsolution configurationのターゲットプラットフォームを示します。

{% include message_box.html type="note" title="Debugインプット" content="Debugインプットグループ内では、Stepを以下の方法で設定できます：ビルドツールをセットし、NUnitコンソールランナーの追加のフラッグをセット、そしてテスト走行の前にテストプロジェクトをビルドするかどうか設定してください。"%}

### UI testing　UIテスト

UIテストでは、Bitrise製の`App Center upload and schedule tests` ステップを使用することを強くお勧めします。Visual Studio App Centerにてテストのセットアップが必要です。詳しくは[ガイド](/testing/run-your-tests-in-the-app-center/)を参照してください。手順を手短に説明します。

1. あなたのワークフローに`App Center upload and schedule tests` ステップを追加します。

   テストを走らせる前に全ての依存関係をインストールしてアプリをビルドするため、このステップは、`NuGet restore` 、`Xamarin Archive` ステップの後に追加してください。

   ![](/img/ui-testing-xamarin.png)
2. Stepの必要事項の入力を行います。テスト走行をセットした後App Centerにて全て確認することができます：**Submit**タブを確認してください。

BitriseのCalabash UIテストに興味がありましたら、[discuss guide](https://discuss.bitrise.io/t/how-to-do-calabash-uitesting-on-bitrise/361)をチェックしてください。

## Xamarinアプリのデプロイ

Bitriseがあれば、Xamarinアプリを以下の場所へとデプロイが可能です：

* Bitrise.io
* the App Store
* Google Play

アプリをデプロイするには、application fileのビルド、署名、エクスポートが必要です。

### Xamarinアプリのコード署名

iOSとAndroidによってコード署名の方法は異なります。双方のプラットフォームでのコード署名方法を説明します。

アプリのデプロイが目的であれば、自動で作成されたデプロイワークフローに基づいた、[新しいワークフローの作成]()をおすすめします。

#### **Android**

Android では、APKが必要になり、そのAPKへ署名が必要になります。Bitriseでは`Android Sign` ステップで署名が行なえます。このステップではkeystore ファイル、keystore パスワード、keystore エイリアスが必要です。

1. [Visual Studioにてコード署名のアイデンティティを作成](https://docs.microsoft.com/en-us/xamarin/android/deploy-test/signing/?tabs=vswin)します。
2. Bitriseへkeystoreファイルのアップロードを行います：アプリのWorkflow Editorを開いて`Code Signing` タブに進み、`ANDROID KEYSTORE FILE` セクションにファイルのアップロードを行います。
3. Keystoreパスワード・keystore エイリアス・private key パスワードをそれぞれ入力します。
4. `Workflows` タブ上にて、`Xamarin Archive` ステップの**後**に`Android Sign` ステップをワークフローに追加してください。

`Android Sign` ステップ使用についての詳細は[ガイド](/code-signing/android-code-signing/android-code-signing-using-bitrise-sign-apk-step/)にてご確認ください。

#### **iOS**

1. [Visual Studio](https://docs.microsoft.com/en-us/xamarin/ios/deploy-test/provisioning/)にて、コード署名アイデンティティとプロビジョニングプロファイルをセットします。
2. ソリューションファイルでは、ビルドをしたいiOSプロジェクトを探し、そのプロジェクトのオプションを設定します。
   * 使用したい署名アイデンティティ（例：Developer）
   * プロビジョニングプロファイル

   .plist ファイルにてカスタムでエンタイトルメントを設定できます。
3. ご自身のマシン上では、Bitriseの[codesigndoc](https://github.com/bitrise-tools/codesigndoc)ツールを使ってプロジェクトのコード署名ファイルを収集してください。
4. .p12 証明書とプロビジョニングプロファイルをBitriseへアップロードをします。アプリのWorkflow Editorを開き、`Code Signing` タブへファイルのアップロードを行ってください。
5. `Certificate and profile installer` ステップをワークフローに追加してください。

iOSコード署名についての詳細は[ガイド](/code-signing/ios-code-signing/create-signed-ipa-for-xamarin/)にてご確認ください。

### アプリパッケージファイルのエクスポート

Bitriseでは、.ipaファイル・.apkファイルや.appファイルなど様々なエクスポートの手段に対応しています。Xamarinアプリであれば、手順は全て同じです。正確なプロジェクトをビルドするために、Visual Studioのソリューションコンフィグをセットアップしてください。

例えば、Google Playにアップロードするための.apkファイルを入手したい場合、ソリューションコンフィグ内にあるAndroidプロジェクトのための**Release**プロジェクト設定を使用します。

iOSプロジェクトの場合、Visual Studioにて正確なコード署名アイデンティティをセットアップしてください。例えば、App Storeへアプリをアップロードしたいときは、App Store type プロビジョニングプロファイルを伴ってDistributionアイデンティティを使用します。

1. アプリのWorkflow Editorに入り、`Workflows` タブをクリックします。
2. `Xamarin Archive` ステップがワークフローに含まれていることを確認してください。

   ![](/img/xamarin-archive.jpg)
3. ステップに必要なインプットには適切な値が入っています。デフォルトでは全てのインプットは[環境変数](/getting-started/getting-started-steps/#environment-variables-as-step-inputs)になっています。Workflow Editorにある`Env Vars` タブをクリックし、環境変数の値を変更してください。
   * **Path to the Xamarin Solution file**: あなたのXamarin ソリューションファイルの場所を示します。
   * **Xamarin project configuration**: Bitriseであなたが走らせたい、Visual Studioでセットアップされたソリューションコンフィグが表示されます。異なる設定で走らせたい場合は、適切な環境変数に変更してください。

     例：iOSとAndroidの両方のプロジェクトではなく、iOSプロジェクトのみのビルドを行う場合
   * **Xamarin solution platform**: あなたのソリューションコンフィグのターゲットプラットフォームを示します。

### Deploying to the App Store　App Storeへのデプロイ

{% include message_box.html type="note" title="始める前に" content="Visual Studio内に正確なsolution configurationがあるかどうか確認してください。App Storeプロビジョニングプロファイルと一緒にDistributionタイプコード署名アイデンティティが必要になります。また、Distribution証明書とプロビジョニングプロファイルがBitriseにアップロードされているか確認してください。"%}

1. Workflow Editor の`Workflows`タブに進みます。
2. アプリのデプロイを行うために作成したワークフローを選択します。
3. コード署名ステップと`Xamarin Archive` ステップがワークフローに含まれていることを確認してください。
4. 異なるソリューションコンフィグを使用する場合は、`Env Var` タブ上の関連した環境変数の値を変更してください。どの環境変数を変更するかは、`Xamarin Archive` ステップのインプットを確認してください。
5. `Deploy to iTunes Connect - Application Loader` ステップをワークフローに追加してください。

   ![](/img/deploy-itunes-connect.jpg)
6. `Deploy to iTunes Connect - Application Loader`  ステップをクリックし、Apple IDとパスワードを関連したインプットフィールドに入力します。
7. ビルド開始です！

### Google Play へのデプロイ

{% include message_box.html type="note" title="始める前に" content="Visual Studio内に正確なsolution configurationがあるかどうか確認してください。**Release** configurationが必要になります。"%}

1. Workflow Editor の`Workflows`タブに進みます。
2. アプリのデプロイを行うために作成したワークフローを選択します。
3. コード署名ステップと`Xamarin Archive` ステップがワークフローに含まれていることを確認してください。
4. 異なるソリューションコンフィグを使用する場合は、`Env Var` タブ上の関連した環境変数の値を変更してください。どの環境変数を変更するかは、`Xamarin Archive` ステップのインプットを確認してください。
5. ワークフローに`Google Play Deploy` ステップを追加してください。このステップは`Xamarin Archive` ステップの後にきます。
6. Workflow Editor の`Code Signing` タブ上にある**Generic File Storage**へサービスアカウントJSONキーファイルをアップロードしてください。詳しくは[JSONキーファイルのアクセス方法](/tutorials/deploy/android-deployment/#set-up-google-play-api-access)をご確認ください。
7. サービスアカウントのJSONキーファイルを参照するためのシークレット環境変数を作成してください。
8. `Google Play Deploy`ステップをクリックし、サービスアカウントのJSON key file pathとパッケージ名を関連したインプットフィールドに追加してください。
9. ビルド開始です！

成功したあなた！おめでとうございます。Xamarinアプリのデプロイが完了しました！