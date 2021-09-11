---
changelog: 
last_modified_at: 
tag:
- getting-started
- testing
- deploy
- code-signing
title: Expoアプリの開始
redirect_from: []
description: In this guide we discuss how to set up, test, code sign and deploy your
  React Native project built with the Expo CLI.
summary: ''
menu:
  getting-started-main:
    weight: 34

---
{% include not_translated_yet.html %}

[React Native CLI又はExpo CLI](https://facebook.github.io/react-native/docs/getting-started.html)でReactNativeプロジェクトを生成することができます。[Expo](https://docs.expo.io/versions/latest/)はXcodeやAndroid Studioでネイティブコードを使わなくてもReact Nativeアプリを素早く起動、実行を行うことができるツールチェーンです。

このガイドでは[Expo CLI](https://docs.expo.io/get-started/installation/)でビルドされたReact Nativeプロジェクトをセットアップ、テスト、コード署名、デプロイする方法について説明します。

Bitriseスキャナーは必要な構成を見つけ出し、自動的にデプロイワークフローに[**Expo Eject** ステップ](https://www.bitrise.io/integrations/steps/expo-detach)を追加します。

## bitrise.ioにExpoアプリを追加

最初に[bitrise.io](https://www.bitrise.io/)にExpo appを追加する方法について見ていきます。

{% include message_box.html type="info" title="Bitriseアカウントを持ってますか？" content=" まず[bitrise.io](https://www.bitrise.io/)にサインアップしていることを確認し、Bitriseアカウントにアクセスできることを確認してください。
もしまだであれば、それを完了するための４つの方法[４つの方法](https://devcenter.bitrise.io/getting-started/index#signing-up-to-bitrise)がございます。"%}

 1. [bitrise.io](https://www.bitrise.io/)にログインします。
 2. 上部のトップメニューバーにある **+** ボタンをクリックし、 **Add app** を選択してください。 [**Create New App**](https://app.bitrise.io/apps/add)ページに移動します。
 3. プライバシー設定の**private**と[**public**](/getting-started/adding-a-new-app/public-apps/)を選択します。
 4. リポジトリがあるgitホスティングサービスを選択し、ホストしたいリポジトリを見つけて選択してください。 詳しくは[リポジトリを接続する](/getting-started/adding-a-new-app/connecting-a-repository/)をお読みください
 5.  レポジトリのアクセス設定が完了したら、**No, auto-add SSH key**をクリックします。詳しくは[SSH keys](/getting-started/adding-a-new-app/setting-up-ssh-keys/)をお読みください。
 6.  プロジェクトのコンフィギュレーションに含まれるブランチの名前を入力します（例：master）。選んだら**Next**をクリックします。
 7.  **Validating repository**では、自動的にレポスキャナーが発動しプロジェクトの最適な設定をセットアップします。
 8. **Project build configuration**では、React Nativeプロジェクトタイプが自動的に選択されます。 もし、スキャナーが失敗しプロジェクトタイプが自動的に選択されない時は[手動でプロジェクトを設定](https://devcenter.bitrise.io/getting-started/adding-a-new-app/setting-up-configuration#manual-project-configuration)できます。 Bitriseはプロジェクトに基づく**Module**と**変数**の両方見つけ出します。

    次に、手動で入力するべきフィールドを見ていきます。
    * React NativeプロジェクトからiOSアプリを生成するために**Specify iOS Development team**フィールドにiOS Development team IDを入力します。
    * **Select ipa export method**では、ipaファイルのエクスポートメソッドをad-hoc、app-store、development又はenterpriseメソッドの内の中からどれかを選んでください。
    * **Select ipa export method**では、ユーザー名を入力し**Next**を押してください。
    * **Specify Expo password**では、パスワードを入力し**次へ**を押してください。
    * プロジェクトの設定を確認してください。
 9. [appアイコンをアップロードしてください。](/getting-started/adding-a-new-app/#adding-an-app-icon-with-the-project-scanner)
10. **Webhook setup**では[webhookを登録](/webhooks/index/)してBitriseが自動的にリポジトリのコードをプッシュするたびにビルドを開始できるようにしてください。

これで[bitrise.io](https://www.bitrise.io/)上でのReact Nativeプロジェクトのセットアップが完了です！ 最初のビルドはprimary workflowを使用すると自動的に開始されます。 ビルドページ内の**APPS & ARTIFACTS**タブより最初のビルドの生成されたレポートを確認することができます。

## 依存関係 (dependencies) のインストール

### JavaScriptの依存関係 (dependencies)

もし、Bitriseスキャナーがアプリのスキャンに成功すれば、プロジェクトの構成に応じて、**Run npm command**もしくは**Run yarn command**ステップがワークフローに追加されます。

**Run npm command**では、インプットフィールドの**npm command with arguments to run**に`install`と入力してください。そうすれば、あなたのプロジェクトにJavascript依存関係が追加されます。

### アプリをEjectする

ExpoでビルドされたReact Nativeアプリにはネイティブモジュールが付属されていません。
ビルドステップはプラットフォーム特有なので、BitriseではアプリをEjectし必要なネイティブテンプレートを追加して構成する必要があります。
bitriseのネイティブ依存関係インストーラーステップが不足しているネイティブ依存関係のインストールを行い、プロジェクトのビルドとデプロイの準備が完了します。

Bitriseスキャナーはデプロイワークフローの中の**Run npm command**もしくは**Run yarn command**ステップのすぐ後にExpo Ejectのステップを自動的に挿入します。

もし、**Expo Eject**のステップを実行することを望まないのなら、ワークフローの中で**Expo Eject**ステップを実行しない代わりにローカルでプロジェクトをejectしてネイティブのiOS/Androidプロジェクトをコミットすることができます。

![{{ page.title }}](/img/eject-expo-input-fields.png)

もし**Expo Eject**ステップを実行するのなら、満たさなければならないフィールドについてみましょう。

* **Working directory input field:** プロジェクトディレクトリのパスを入力してください。
* **Expo CLI version:**　プロジェクトで使っているExpo CLIのバージョンを入力してください。
* **Username for Expo** and **Password for your Expo account** inputs**:** もしExpoアカウントのパスワードとユーザー名を加えるなら、`expo eject`を実行する前に`expo login`コマンドを実行します。ejectする前にexpoアカウントにログインすることで問題を防ぐことができます。
* **Run expo publish after eject?** input: `expo publish` を実行したいなら、この入力を`yes`にする必要があります。`expo publish`を実行するには、expoアカウントにログインする必要があります。 **Expoのユーザー名**と**Expoアカウントのパスワード**も入力した場合にログインできます。

**Expo Eject**ステップを実行すればビルド、サイン、テストなどのプラットフォーム固有のステップを実行することができるようになります。
例えば、iOSのための**Xcode Archive & Export for iOS**ステップを実行することができます。

{% include message_box.html type="info" title="expoメッセージの公開" content="**Deploy to Bitrise.io**ステップはExpoコマンドを使用しません。 **Deploy to Bitrise.io**ステップはアーティファクトをBitriseに公開するもので、特定のプラットフォーム固有のステップではありません。 デプロイされたアーティファクトはアプリの**Build**ページの**APPS & ARTIFACTS**タブの中で利用でき、さらにAPIとしても利用できます。 アーティファクトは.ipa、.apk、.aab file、a log、test results、もしくは何かしらのビルドになります。

**Deploy to Bitrise.io**ステップは[expo.io](https://docs.expo.io/workflow/publishing/)には公開されません。
もし[expo.io](http://expo.io/)に公開する必要があるのなら、**Eject Expo**ステップの**Run expo publish after eject?**で`yes`を入力してください。
この場合はexpo.ioに公開するためのexpoアカウントのユーザー名とパスワードを入力する必要があります。"%}

### ネイティブの依存関係(dependencies)

**Install missing Android SDK components**ステップではandroidプロジェクトに足りないネイティブの依存関係をインストールします。 このステップはデプロイワークフローにデフォルトで含まれています。

## アプリのテスト

React Nativeに組み込まれているjestと呼ばれるテスト方法を使用してアプリの単体テストを実行できます。

1. **Run npm command**ステップのすぐ後にワークフローに別のRun npm commandステップを追加できます。
2. **npm command with arguments to run**フィールドに`test`を入力してください。

   ![{{ page.title }}](/img/jest-test-react-expo.jpg)
3. [ビルドをスタートします](/builds/Starting-builds-manually/)。

ビルドページの**APPS & ARTIFACTS**タブでテストアーティファクトを確認することができます。

## コード署名

react nativeアプリはAndroidとiOSの二つのプロジェクトがあり、どちらもコード署名が必要になります。 ワークフローエディタのCode Signingをクリックすると一ページで全てのiOSとAndroidのコード署名が表示されます。
これらを入力する方法についてみていきます!

### アンドロイドアプリにサインする

1. ワークフローエディタの左上にある**WORKFLOW**ドロップダウンメニューデdeployワークフローを選択してください。
2. **Code Signing**タブへ移動してください。
3. **ANDROID KEYSTORE FILE**フィールドにkeystoreファイルをドラッグアンドドロップします。
4. **Keystore password**、**Keystore alias**、**Private key password**フィールドを入力し、Save metadataをクリックしてください。

   アプリをBitriseにアップロードする前にAndroid Studioで生成されたkeystoreファイルに含まれているため、既に持っているはずです。
   keystoreファイルに関しての詳細は[こちら](https://developer.android.com/studio/publish/app-signing)をクリックしてください。
   この情報が**Code Signing**タブに追加されると**Sign APK**ステップ（Android **deploy**ワークフローにデフォルトで含まれています。）はAABやAPKの署名を行い配布の準備をします。

{% include message_box.html type="info" title="Andoroidコード署名に関しての詳細" content=" コード署名のオプションの詳細については [Android code signing guide](https://devcenter.bitrise.io/code-signing/android-code-signing/android-code-signing-procedures/)をご覧ください。"%}

![{{ page.title }}](/img/keystore.png)

アンドロイドのコード署名が完了しました。 続けてiOSを行いましょう！

### デプロイのためにiOSアプリの署名とエクスポートを行う

テストフライトとアップストアにデプロイするために以下のコード署名のためのファイルが必要です。:

* **iOS Distribution**証明書
* **App Store**タイプのプロビジョニングファイル

1. [bitrise.io](https://www.bitrise.io)のプロジェクトの**Workflow**タブを開いてください。
2. **Code Signing**タブをクリックしてください。
3. **PROVISIONING PROFILE**フィールドにApp Storeタイプのプロビジョニングファイルを**CODE SIGNING IDENTITY**フィールドに iOS Distribution証明署をクリックまたはドラッグアンドドロップしてください。
4. **Workflows**タブをクリックしてdeployワークフローを選択してください。
5. **Xcode Archive & Export for iOS**ステップの**Select method for export**フィールドを**app-store**にセットしてください。
6. **Xcode Archive & Export for iOS**を選択し、**Force Build Settings**入力グループまでスクロールしてください。
7.  アップロードしたコード署名ファイルを元に以下を入力してください。:

   **Force code signing with Development Team**: チームIDを追加してください。

   ![{{ page.title }}](/img/force-code-signing-development.jpg) **Force code signing with Code Signing Identity**: コード署名IDを完全なIDまたはコード署名グループとして追加してください。

   ![{{ page.title }}](/img/force-code-signing-code-signing.jpg) **Force code signing with Provisioning Profile**: プロビジョニングプロファイルのUUIDを追加してください。(ファイル名ではありません)

   ![{{ page.title }}](/img/force-code-signing-provisioning-profile.jpg)
8. もし、コード署名ファイルがApple Developer Portalで手動で生成されている場合は、ejectされたReact NativeプロジェクトではXcode管理のコード署名がオンになっているため、手動のコード署名設定を使用する必要があります。 **Debug**入力グループをクリックし**Additional options for xcodebuild call input**フィールドに`CODE_SIGN_STYLE="Manual"`を追加してください。

## Bitriseにデプロイ

**Deploy to bitrise.io**ステップはビルドページの[**APPS & ARTIFACTS**](/builds/build-artifacts-online/)タブの中にビルドに関連するすべてのアーティファクトをアップロードします。

ビルドURLを使ってチームメンバーと生成されたAPK/.ipaファイルを共有することができます。
APK/.ipaファイルがビルドされたことをグループまたは特定のユーザーに通知することもできます。

1. **Deploy to bitrise.io**ステップに移動してください。
2. **Notify:User Roles**フィールドにロールを追加して、ロールが付与されている人のみ通知を受け取るようにできます。 もしくは、**Nitify:Emails**フィールドに通知したいユーザーのメールアドレスを入力してください。
それらのメールアドレスを[secret env vars](/builds/env-vars-secret-env-vars/)として設定していることを確認してください。
これらの詳細は**APPS & ARTIFACTS**タブの生成されたAPK/.ipaファイルの横にある目のアイコンをクリックし、**Notifications**で修正することもできます。

## app storeにデプロイする

もしiOSアプリをデプロイしたいなら、 [Signing and exporting your iOS app for deployment](/getting-started/getting-started-with-react-native-apps/#signing-and-exporting-your-ios-project-for-deployment)にあるステップに従ってください。


### TestflightとiTunes ConnectにiOSアプリをデプロイする

{% include message_box.html type="important" title="app-store .ipaファイルをエクスポートしましたか？" content="ネイティブのマーケットプレイスへデプロイする手順を始める前に、app-store .ipaファイルをエクスポートしたことを確認してください。"%}

1. **Xcode Archive & Export for iOS**ステップのフィールドをforceオプションに変更し、app store profileとdistribution credentialsを**手動**でアップロードしてください。。
2. **Deploy to iTunes Connect - Application Loader**ステップをワークフローに追加してください。

   このステップを**Xcode Archive & Export for iOS**ステップの後に、できれば**Deploy to Bitrise.io**の前に置いてください。
3. **Deploy to iTunes Connect - Application Loader**ステップでApple credentialsを入力してください。

   このステップでは以下が必要です:
   * Apple ID.
   * パスワードもしくは、もしiTunes Connectで２要素認証を使用していればapp-specificパスワード

   このパスワードはログに表示されたり公開されることはありません。[that’s why it is marked SENSITIVE](/builds/env-vars-secret-env-vars#about-secrets).
4. [ビルドを開始します。](/builds/Starting-builds-manually/).

   もし全てがうまくいけば、Testflightでアプリを確認することができます。そこから、外部テスターに公開したりApp Storeに公開したりできます。

### AndroidアプリをGoogle Play Storeにデプロイする
{% include message_box.html type="important" title="keystoreファイルをアップロードしていますか？" content="マーケットプレイスにデプロイを始める前に**ANDROID KEYSTORE FILE**フィールドにkeystoreファイルがアップロードされていることを確認してください。"%}

**Deploy to Google Play**ステップを使用する前に、次のタスクを実行したことを確認してください。

1. [Google Play Consoleを使って](https://support.google.com/googleplay/android-developer/answer/113469?hl=en)Google Playに手動で最初のAPKファイルをアップロードする。
2. [Link](https://developers.google.com/android-publisher/getting_started) your Google Play Developer Console to an API project.
Google Play Developer ConsoleをAPIプロジェクトをリンクします。
3. [サービスアカウントを使ってAPIアクセスクライアントを設定する](https://developers.google.com/android-publisher/getting_started): Google Developer Consoleのサービスアカウントを作るときに、**Key Type**で`json`を選ぶことを確認してください。
4. [Google Play Console](https://play.google.com/apps/publish)でサービスアカウントに必要な権限を与えます。**Settings**、**Users & permissions**、**Invite new user**と移動します。Google Play Publisher APIの動作方法により、サービスアカウントに少なくとも次の権限を付与する必要があります。:
   * Access level: アプリ情報を見ます。 
   * Release management: 本番リリースの管理、テストトラックリリースの管理
   * Store presence: ストアリスティング、料金、配布を修正します。
5. オプションのステップとして、ストアリストに翻訳を追加できます。**Deploy to Google Play**ステップで`whatsnew`ファイルをアップロードされたAPKバージョンに反映するには、[Translate & localize your app](https://support.google.com/googleplay/android-developer/answer/3125566?hl=en)で記載されているようにストアリスティングセクションに翻訳を追加してください。

今から、Bitriseに戻ってデプロイ構成を完了させましょう！

1. Bitriseのダッシュボードで**Code Signing**タブに移動し**GENERIC FILE STORAGE**にサービスアカウントのJSONキーをアップロードします。
2. ファイルをアップロードしたurlの環境変数をコピーします。

   例: `BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
3. デプロイワークフローの**Sign APK**ステップの後に**Deploy to Google Play**を追加します。
4. **Service Account JSON key file path**フィールドに**GENERIC FILE STORAGE**にサービスアカウントJSONキーをアップロードしたときに生成された環境変数をペーストします。このフィールドはステップの中にsensitiveマークがあります。これはここに入力した環境変数がシークレットでビルドログには表示されないことを意味します。生成された環境変数に加え、ファイルパスをローカルにもリモートにもできるステップのフィールドにファイルパスを追加することもできます。
   * リモートJSONキーファイルの場合、ダウンロードURLを指定することができます。例えば、`https://URL/TO/key.json`
   * ローカルJSONキーファイルの場合、ファイルパスURLを指定することができます。例えば、`file://PATH/TO/key.json`
5. **Package name**: androidアプリのパッケージ名
6. **Track**: APKをデプロイしたいトラック(例:alpha/beta/rollout/productionもしくはセットされたカスタムトラック)

以上です！アプリをビルドし、Google Play Storeにリリースしましょう。