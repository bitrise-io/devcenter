---
tag: []
title: Ship機能を使ったデプロイ (Deploying with Ship)
redirect_from: []
summary: ''
published: false

---
## Ship overview　Shipの概要

{% include message_box.html type="important" title="Shipはベータ版です" content="Please note that this feature is still in BETA version. この機能はまだベータ版であるということに注意してください。"%}

Ship is a deployment solution that aims to save users a lot of headache. With Ship, you have complete control over your app's distribution, its version history, and all the important metadata - and you can manage all that in one place.

Shipはユーザーの悩みを解決することを目指したデプロイソリューションです。Shipがあると、アプリの配布 (バージョン履歴や全ての重要なメタデータ) を一括管理できます。

Deployment with Ship includes automatic re-sign and artifact generation and we store all the previous versions too. The app’s metadata, all the marketing copy, and screenshots can also be edited on the spot and non-developer people can manage it.

Shipを使ったデプロイはオートの再署名やアーティファクトの生成を含んでおり、全ての過去のバージョンも保管いたします。全てのマーケティングコピーであるメタデータやスクリーンショットもBitrise内で編集することができるので、開発者でない方でも管理が可能です。

{% include message_box.html type="info" title="Ship language Ship言語" content="As of right now, Ship only supports English locale. No other language submissions are supported. 今現在、英語によるロケールのみサポートしております。その他の言語による提出はサポート外です。"%}

You can do a whole lot of things with Ship:  
Shipを使うとたくさんのことができるようになります：

* View all the build versions of your app.
* View and edit all the details of a given build version, including a description, screenshots, and the most important parameters, such as the app size or the supported device types.
* Send your app directly to testers with a link to the public install page.
* Deploy a given build version to App Store Connect and/or the Google Play Console, once you set up publishing.
* Switch between platforms on the **Version History** page in the case of cross-platform projects.
* 全てのアプリのビルドバージョンを確認
* 特定のビルドバージョンの詳細を確認・編集 (解説・スクリーンショットや、アプリのサイズやサポートしているデバイスの種類などの重要なパラメータを含む)
* 公開インストールページへのリンクを使ってテスターへアプリを直接送信
* 公開する準備が整えば、App Store Connect / Google Play Consoleへ特定のビルドバージョンをデプロイ
* クロスプラットフォームプロジェクトの場合、**Version History** ページを確認してプラットフォームを変更

  ![](/img/ship_benefits.jpg)

## Getting started with Ship　Shipの開始方法

You have two options to open Ship:  
Shipを開くには２つの方法があります。

* On the **Add-ons** tab of the app: this option takes you to Ship’s home page.
* From the **Builds** page: this option takes you to the build’s Ship page.
* アプリの**Add-ons**タブ：クリックすればShipのホームページに遷移されます。
* **Builds**ページから：ビルドのShipページに遷移されます。

When first logging in, you might not have a single build version available to publish. But don't worry, that can be fixed quickly.  
最初のログインの際は、公開するのに利用可能なビルドバージョンがない可能性があります。心配ありません、簡単に修正ができます。

* In one of your Workflows, you need a Step that builds your app, such as **Xcode Archive & Export for iOS** or **Android Build**.
* The same Workflow must have the correct version of the **Deploy to Bitrise.io** Step after the Step that builds your app.
* ワークフロー内に、アプリをビルドする**Xcode Archive & Export for iOS**や**Android Build**といったステップを追加します。
* そのワークフロー内に、適切なバージョンの**Deploy to Bitrise.io**ステップをアプリのビルドを実行するステップの後に追加します。

{% include message_box.html type="warning" title="Step versions compatible with Ship Shipと互換性のあるバージョン" content="Please note that the **Deploy to Bitrise.io** Step must be of version 1.9.0 and the **Xcode Archive & Export for iOS** Step for iOS apps must be of version 2.6.0 - older versions of the Steps do not support Ship.  
**Deploy to Bitrise.io**ステップは1.9.0バージョン以上、**Xcode Archive & Export for iOS**ステップは2.6.0バージョン以上であるかどうか確認してください。これらより古いバージョンはShipをサポートしていません。"%}

Once you built your app - that is to say, produced an APK or an IPA file -, you will be able to start using Ship.

アプリのビルドが終了し、APKやIPAファイルを作成していれば、Shipを使い始めることができます。

## Configuring and publishing an app with Ship　Shipを使ったアプリの構成と公開

To publish an app on Ship, you need to:  
Ship上でアプリを公開するには：

* Build an app that has at least one [exposed Workflow](https://mpxzvqn7ysfysw.preview.forestry.io/reviews/ship-add-on-beta-version/#exposing-a-workflows-artifacts-to-ship).
* Configure publishing on the **Settings** page.
* Push the **Publish** button.
* エクスポーズ (公開) 済みのワークフローを最低1つ含むアプリをビルドする
* Settings ページにて公開に関する設定を行う
* Publishボタンをクリック

iOS and Android apps have their own set of settings on the **Settings** page; for cross-platform app, both iOS and Android settings must be configured.

iOSとAndroidアプリのそれぞれの**Settings**ページには、固有の設定方法があります。これはクロスプラットフォームのアプリ用でありiOSとAndroidの両方の設定を施す必要があります。

### Exposing a Workflow's artifacts to Ship  
Shipへワークフローのアーティファクトを公開する

Exposing a Workflow's artifacts means that the products of the Workflow will be available in Ship: for example, if your Workflow produces an APK, you can publish that using Ship. By default, all Workflows are exposed if they contain the correct version of the **Deploy to Bitrise.io** Step. If you are happy with that, just leave the field as is.

ワークフローのアーティファクトをエクスポーズすれば、そのワークフローのプロダクトはShip内で使用ができます：例えば、ご自身のワークフローがAPKを生成するのであれば、Shipを使って公開することが可能です。デフォルトでは、Deploy to Bitrise.ioステップの適切なバージョンがワークフローに含まれていれば全てのワークフローがエクスポーズされるようになっています。デフォルトの設定で大丈夫であれば、そのままにしておきましょう。

If, however, you add a Workflow here, only that Workflow will be exposed.

To expose a Workflow's artifacts to Ship:

けれども、Shipにワークフローを追加すれば、そのワークフローのみがエクスポーズされます。

Shipにワークフローのアーティファクトをエクスポーズするには：

1. Go to your app's Ship page.  
   アプリのShipページに進みます。
2. Click **Settings** in the top right corner.

   右上隅にあるSettingsをクリックします。
3. Go to the **General** tab.

   Generalタブに進みます。
4. In the **Expose Artifacts From the Selected Workflow to Ship** text box, add all the Workflows you need.  
   **Expose Artifacts From the Selected Workflow to Ship**のテキストボックスに、必要なワークフロー全てを追加します。

   ![](/img/Settings___android-test-test.png)

   Be aware that if your app is cross-platform, there are TWO such text boxes: one for iOS and one for Android. Separate the different Workflow names with a comma (for example, `build, deploy, release_build_android`) .
5. もしご自身のアプリがクロスプラットフォームであれば、以下のような2つのテキストボックスが表示されます：一方はiOS用、もう一方はAndroid用です。コンマを使ってワークフロー名を別々に分けてください (例： `build, deploy, release_build_android`) 。
6. Scroll down to the bottom of the page and click **Save**.  
   ページの一番下までスクロールして**Save**をクリックします。

### Code signing files　コード署名ファイル

On the **Settings** page, you can choose between different code signing files. You can upload these files - iOS provisioning profiles and certificates, Android keystore files and Service Account JSON files - in the usual way:  
Settingsページでは、異なるコード署名ファイルの中から選択することができます。通常の方法でiOSプロビジョニングプロファイルや証明書、Android keystoreファイルやService Account JSON ファイルといったものをアップロードすることができます。

* [iOS code signing files](/jp/code-signing/ios-code-signing/code-signing-index/).
* [Android code signing files](/code-signing/android-code-signing/android-code-signing-index/).
* [iOSコード署名ファイル](/jp/code-signing/ios-code-signing/code-signing-index/)
* [Androidコード署名ファイル](/jp/code-signing/android-code-signing/android-code-signing-index/)

Code signing files are required to publish an app to any online store, or to install them to test devices.

コード署名ファイルは、全てのオンラインストアでの公開やテストデバイスへインストールするのに必要になります。

### Installing an app on a test device　テストデバイスでアプリをインストールする

To install an app on a device, there are three options:  
アプリをデバイスでインストールするには、3つの方法があります：

* Send the public install page link to all the testers and other stakeholders.
* Send the QR code: scanning it takes you to the public install page of the app.
* Log in to Ship from the device and install it directly from there.
* 公開済みのインストールページへのリンクをテスター全員と他の関係者へ送信する
* QRコードを送信する：読み取ることにより公開済みのインストールページに遷移されます。
* デバイスからShipにログインし、そこから直接インストールする

{% include message_box.html type="important" title="Enabling the public install page 公開済みインストールページを有効化する" content="Be aware that to have a public install page, you must configure your [exposed](https://mpxzvqn7ysfysw.preview.forestry.io/reviews/ship-add-on-beta-version/#exposing-a-workflows-artifacts-to-ship) Workflow's **Deploy to Bitrise.io** Step correctly: the **Enable public page for the App?** input of the Step must be set to `true`.  
公開済みインストールページでは、エクスポーズされたワークフローの**Deploy to Bitrise.io**ステップを正確に構成する必要があります：ステップの **Enable public page for the App?**のインプットを`true`に設定してください。"%}

{% include message_box.html type="important" title="Artifact typesアーティファクトの種類" content="The public install page is not available for all type of artifacts. 公開済みインストールページでは全アーティファクトは利用不可です。

* For iOS, it's only available if your Workflow builds an .ipa file that is signed with a Debug, Development or Ad-hoc type provisioning profile.
* For Android, it's only available if your Workflow builds an APK which is NOT split or if it builds a universal APK which is split. For AABs, there will be no public install page link.
* iOSでは、ワークフローがDebug, DevelopmentもしくはAd-hocタイプのプロビジョニングプロファイルで署名された.ipaファイルをビルドする場合にのみ利用できます。
* Androidでは、ワークフローがスプリットされていないAPKをビルドする、もしくは、スプリットされたユニバーサルAPKをビルドする場合にのみ利用できます。"%}

To send the public install page link or the QR code:  
公開済みインストールページまたはQRコードを送信するには：

1. [Expose](https://mpxzvqn7ysfysw.preview.forestry.io/reviews/ship-add-on-beta-version/#exposing-a-workflows-artifacts-to-ship) the Workflow that creates the installable file, and run the Workflow on Bitrise.  
   インストールが可能なファイルを作成するワークフローをエクスポーズして、Bitriseでワークフローを実行します。
2. Open the **Details** page of your app's chosen build version.  
   アプリの選択されたビルドバージョンにある**Details**ページを開きます。
3. On the right, find the Public Install Page link or the QR code.  
   右側に公開済みインストールページのリンクまたはQRコードがあることを確認します。
4. Copy the one you need and send it to the stakeholders (by email, for example).  
   いずれかをコピーして、(メールなどを使って)関係者に送信します 。

To install it directly from Ship:  
Shipから直接インストールするには：

1. Log in to Ship from a supported device.

   Click on the **Devices** tab to find out if a given device is registered. Read [our guide on how to register your devices](/testing/registering-a-test-device/) on Bitrise.  
   サポート済みのデバイスからShipにログインします。  
   Devicesタブを開いて特定のデバイスが登録されているかどうか確認します。詳しくは[テストデバイスの登録](/jp/testing/registering-a-test-device/)を参照してください。
2. Under the name of the app, find and click the **Install** button.  
   アプリ名の下にある**Install**ボタンをクリックします。

### Publishing an app online  
アプリをオンラインで公開する

<div><button type="button" class="collapsible"><p>Publishing an app for iOS iOSアプリを公開する</p></button> <div class="collapsible-content" markdown="1"> {% include message_box.html type="important" title="アプリのビルド" content="You can only publish an app in Ship if it's built in a Workflow that is [exposed](https://mpxzvqn7ysfysw.preview.forestry.io/reviews/ship-add-on-beta-version/#exposing-a-workflows-artifacts-to-ship) to Ship. For an iOS app, the Workflow should contain the **Xcode Archive & Export for iOS** Step and the **Deploy to Bitrise.io** Step. Make sure the **Xcode Archive & Export for iOS** Step archives and exports the project with `Release` configuration.  
Shipでアプリを公開するには、ワークフローがShipにエクスポーズされている必要があります。iOSアプリでは、ワークフローに**Xcode Archive & Export for iOS**ステップと**Deploy to Bitrise.io**ステップが含まれていなければなりません。**Xcode Archive & Export for iOS**ステップは`Release`構成を使ってプロジェクトのアーカイブとエクスポートを行うことに注意してください。"%}

{% include message_box.html type="note" title="The `.xcarchive.zip` file with a custom Step　カスタムステップを使った`.xarchive.zip`ファイル" content="The **Deploy to Bitrise.io** Step looks for an `.xcarchive.zip` file to export to Ship in the case of an iOS app. If you do not want to use the **Xcode Archive & Export for iOS** Step, you just need to make sure that:  
iOSアプリの場合、**Deploy to Bitrise.io**ステップはShipにエクスポートするために、`.xarchive.zip`ファイルを探します。**Xcode Archive & Export for iOS**ステップを万が一使いたくない場合、以下のことに注意する必要があります。

* There is a Step in your exposed Workflow that exports an `.xcarchive.zip` file of your app. That is, the Step you use needs to create an Xcode Archive and needs to package it in a zip file.
* This Step exports the `.xcarchive.zip` file into the `BITRISE_DEPLOY_DIR` directory.
* アプリの`.xarchive.zip`ファイルをエクスポートするエクスポーズ済みのワークフロー内にステップが存在します。
* このステップは`.xarchive.zip`ファイルを`BITRISE_DEPLOY_DIR`ディレクトリにエクスポートします。"%}

To configure publishing an iOS app to App Store Connect (formerly known as iTunes Connect), you have to:  
App Store Connect (元iTunes Connect) へiOSアプリの公開についての構成を行うには：

* Choose the provisioning profiles and code signing identities to be used.
* Set the app specific password.
* Set the Apple Developer Account email.
* Set the [App SKU](https://help.apple.com/app-store-connect/#/dev219b53a88): this is a unique ID you give to your app for internal tracking. It's not visible to customers.
* 使用するプロビジョニングプロファイルとコード署名IDを選択します。
* アプリのパスワードを設定します。
* Apple Developer Accountのメールを設定します。
* [App SKU](https://help.apple.com/app-store-connect/#/dev219b53a88)を設定します：これはユニークIDであり、内部トラッキング用にアプリに与えられます。顧客には表示されません。

Once you configured publishing for the app, you do not have to set these options every time, only if you want to change some of them.  
アプリの公開についての設定が一回でも完了すれば、毎回オプションを設定する必要はありません。変更したい場合は、いつでも可能です。

To configure publishing an app for iOS:  
iOS用アプリの公開を設定するには：

1. Open your app's Ship page and click **Settings** in the top right corner.  
   アプリのShipページを開き、右上端のSettingsをクリックします。
2. Go to the **General** tab.  
   Generalタブに進みます。
3. Go to the **iOS Settings** section.  
   iOS Settingsセクションに進みます。
4. [Expose](https://mpxzvqn7ysfysw.preview.forestry.io/reviews/ship-add-on-beta-version/#exposing-a-workflows-artifacts-to-ship) a Workflow that creates the .ipa you want to publish, and run the Workflow on Bitrise.  
   公開したい.ipaを作成するワークフローをエクスポーズして、そのワークフローをBitriseで実行します。
5. Select the code signing files you want to use.

   Make sure you choose the files appropriate for the export method you used to create the .ipa file. For example, if your .ipa was exported using the `app-store` method, choose an App Store provisioning profile and a Distribution certificate (code signing identity).  
   使用になりたいコード署名ファイルを選択します。  
   エクスポート方法に関して、.ipaファイル作成に使用した適切なファイルを選ぶように心がけてください。例えば、`app-store`方法を使って.ipaがエクスポートされた場合、App Storeプロビジョニングプロファイルと配布証明書 (コード署名ID) を選んでください。
6. Enter the **Apple Developer Account Email** and the **App Specific Password** to be able to publish to the App Store.  
   Apple Developer AccountのメールアドレスとApp Specific Password (アプリ専用パスワード) を入力してApp Storeで公開できるようにします。
7. Enter the **App SKU**.  
   App SKUを入力します。
8. Go back to the **Details** page and click **Publish**.  
   **Details**ページに戻り、**Publish**をクリックします。 </div> </div>

<div><button type="button" class="collapsible"><p>Publishing an app for Android Androidアプリを公開する</p></button> <div class="collapsible-content" markdown="1"> {% include message_box.html type="important" title="Building the app アプリのビルド" content="Before you'd publish an Android app in Ship, make sure that:　ShipでAndroidアプリを公開する前に：

* Your app is built in a Workflow that is exposed to Ship. The Workflow must contain a build Step that builds an APK(s) or an Android App Bundle (such as **Android Build** or **Gradle Runner** Step) and the **Deploy to Bitrise.io** Step.  
  アプリはShipにエクスポーズされるワークフローでビルドされます。ワークフローには、APKをビルドするステップ、または**Android Build** / **Gradle Runner** ステップといったAndroid App BundleとDeploy to Bitrise.ioステップが必要です。
* You have built a release version of your app before publishing it in Ship. Please note that without a release version, the **Publish** button on the **Details** page of Ship will be disabled. In this case, check if the following is set in your build Steps: the **Android Build** Step's **Variant** input field must contain `release` (for example `release` or `demoRelease`) and the **Gradle Runner** Step's **Gradle task to run** input field must contain `Release` (for example, `assembleRelease` or `assembleDemoRelease`).  
  Shipで公開する前に、アプリのリリースバージョンをビルドしておかなければなりません。リリースバージョンがないと、**Details**ページの**Publish**ボタンが動作しなくなります。このケースでは、ステップに以下の項目が設定されているか確認してください：**Android Build**ステップの**Variant**インプット欄に`release` (例: `release`, `demoRelease`) と **Gradle Runner**ステップの**Gradle task to run**インプット欄に `Release` (例: `assembleRelease`, `assembleDemoRelease`)が含まれている必要があります。
* If using a custom **Script** Step or other custom Step to build your APK, you must make sure that the Step exports the APK to the `BITRISE_DEPLOY_DIR` directory and that the **Deploy to Bitrise.io** Step is included in your exposed Workflow.
* APKをビルドするのにカスタムの**Script**ステップまたは他のカスタムステップを使用している場合、ステップが`BITRISE_DEPLOY_DIR`ディレクトリにAPKをエクスポートしている必要があります。また、Deploy to Bitrise.ioステップをエクスポーズされたワークフローに含ませてください。"%}

To configure publishing an Android app to Google Play Console, you can:  
Google Play ConsoleへAndroidアプリの公開を設定するには：

* Choose the Android keystore files and the Service Account JSON file.
* Set the track you want to use to release your app.
* Android keystoreファイルとService Account JSONファイルを選択します。
* アプリのリリースに使用するtrackを設定します。

Once you configured publishing for the app, you do not have to set these options every time, only if you want to change some of them.

アプリの公開設定を一回終えると、毎回オプションを設定する必要はありません。手直しが必要な場合はいつでも可能です。

To configure publishing an app for Android:

Andoroidアプリの公開を設定するには：

1. Open your app's Ship page and click **Settings** in the top right corner.  
   Shipのページを開いて右上端のSettingsをクリックします。
2. Go to the **Android Settings** section.  
   Android Settingsセクションへ進みます。
3. [Expose](https://mpxzvqn7ysfysw.preview.forestry.io/reviews/ship-add-on-beta-version/#exposing-a-workflows-artifacts-to-ship) a Workflow that creates the APK you want to publish.  
   公開したいAPKを作成するワークフローをエクスポーズします。
4. Enter the [track](https://developers.google.com/android-publisher/tracks) you want to use to publish to the Google Play Console.  
   Google Play Consoleでの公開に使用するtrackを入力します。
5. If your Android app contains multiple modules, enter the exact module under **Module**. 

   複数のモジュールがAndroidアプリに含んでいる際は、**Module**の空欄に正確なモジュールを入力します。  
   ![](/img/module-android-settings.png)
6. Choose the appropriate keystore file and the Service Account JSON file.  
   適切なkeystoreファイルとService Account JSONファイルを選択します。
7. Head back to the **Version History** page and select the version you wish to publish. If your app has multiple flavors, you can filter for the right flavor and select it for publishing.   
   Version Historyページに戻り、公開したいバージョンを選択します。アプリに複数のフレーバーがある場合、正しいフレーバーをフィルターにかけることができるので、それを選択します。  
   ![](/img/flavorandroid.jpg)
8. Fill out the **Details** page and click **Publish.  
   Details**ページの空欄を埋めて、**Publish**をクリックします。 </div> </div>

## Publishing status and logs  
ステータスとログの公開

Once you clicked **Publish** in Ship, the process starts according to the configured settings. You can view the status of the active publishing process on top of the **Details** page of the app.

To view the logs of any publishing process, go to the **Activity** tab. From there, you can download the logs by clicking **Download Build Log** to troubleshoot any errors after a failed publish.

Shipで**Publish**ボタンをクリックすると、構成済みの設定に基づいてプロセスが開始されます。アプリの**Details**ページ上部でアクティブな公開プロセスのステータスを確認できます。

公開プロセスでのログを表示させるには、**Activity**タブに進みます。そこから、**Download Build Log**をクリックしてログのダウンロードを行い、失敗後にエラーをチェックすることが可能です。

![](/img/downloadbuildlog.jpg)

## App details　アプリの詳細

The purpose of the app **Details** page is to update the most important information about your app, as you want that information to appear in your online store of choice, for example.

アプリの**Details**ページは、アプリの重要な情報についてアップデートを行いのが目的です。その情報をオンラインストアで表示させたい場合などがその例です。

The details include:  
Detailsに含まれる項目は以下のとおりです：

* A description of the app.
* Screenshots and feature graphics of the app, arranged by the different supported devices.
* Metadata such as version number, size, version code, SDK version, and so on. The exact parameters depend on the type of the app. This is automatically exported to Ship by the **Deploy to Bitrise.io** Step.
* アプリの説明
* 異なるサポート済みのデバイスによって配置されたアプリのスクリーンショットならびにフィーチャーグラフィック
* バージョン番号、サイズ、バージョンコード、SDKバージョンなどのメタデータ  
  アプリの種類によって正確なパラメータは異なります。これはDeploy to Bitrise.ioステップにより自動でShipにエクスポートされます。

### Adding screenshots or feature graphics  
スクリーンショットやフィーチャーグラフィックを追加する

You can add screenshots for an app to be published. Once you added screenshots or graphics to one build version of the app, they are automatically added to all subsequent versions. If you want to display different screenshots, you can modify it, otherwise you can leave it alone.

公開用にアプリのスクリーンショットを追加することができます。アプリの1つのバージョンにスクリーンショットやフィーチャーグラフィックを一回追加すると、その後のバージョン全てに追加されます。異なるスクリーンショットを表示させたいのであれば、修正することも可能です。

To add screenshots or feature graphics to your app details page:  
アプリのDetailsページへスクリーンショットとフィーチャーグラフィックを追加するには：

1. Open the **Details** page in Ship of your app's chosen build version.  
   ShipのDetailsページを開きます。
2. Go to **Screenshots** or **Feature Graphic**, depending on what you want to upload.  
   アップロードを行うスクリーンショットまたはフィーチャーグラフィックへ進みます。

   ![](/img/ship-screenshots-1.jpg)
3. Drag and drop a file OR click **Browse files** and select the ones you wish to upload.  
   ファイルのドラッグ&ドロップまたは**Browse files**をクリックしてアップロードを行うファイルを選択します。
4. Once done, click **Save** in the top right corner.  
   完了したら、右上端の**Save**をクリックします。

### Updating the app's descriptions  
アプリの説明を更新する

You can update the app's description, or all its other textual details in the same way. The types of text fields that you have available depend on the type of the app.  
アプリの説明の更新や、同様に全てのテキスト編集を行う事ができます。使用可能なテキスト欄の種類は、アプリの種類によって異なります。

1. Open the **Details** page in Ship of your app's chosen build version.  
   ShipのDetailsページを開きます。
2. Go to the field you want to edit and click in the content field.  
   編集したい欄へ進み、コンテンツ欄をクリックします。
3. Edit the content.  
   コンテンツを編集します。
4. Click **Save** in the top right of the Details tab.  
   Detailsタブの右上にあるSaveをクリックします。

## Notifications　通知

Ship can send emails about three different events:  
Shipは次の３つの異なるイベントについてメールを送信します：

* A new build version of an app is available in Ship.
* Ship successfully published the app.
* Ship failed to publish the app.
* Shipで利用可能な新しいビルドバージョン
* Shipでアプリの公開が成功したとき
* Shipでアプリの公開が失敗したとき

These notifications can be sent to any number of different email addresses. When a new email address is added to the notifications list, Ship sends a confirmation email to the address: after confirmation, notifications should work.

これらの通知は登録されたメールアドレス全てに送信されます。新しいメールアドレスが通知リストに追加されたとき、Shipはそのアドレスに確認メールを送信します：確認後、通知が機能するようになります。

### Adding a new email address　新規のメールアドレスを追加する

To add a new email address to the notification list for an app:  
アプリの通知を受け取るのに、新規のメールアドレスを追加するには：

1. Open your app's Ship page.  
   アプリのShipページを開きます。
2. Click **Settings.  
   Settings**をクリックします。
3. Go to the **Notifications** tab.  
   **Notifications**タブへ進みます。
4. In the input field under **Email notifications**, type the email address.

   **Email notifications**の下にあるAdd Newのインプット欄にメールアドレスを入力します。

   ![](/img/ship-notifications.jpg)
5. Click **Add**.  
   **Add**をクリックします。

The address should appear in the list below, with **Pending** as its status. An email is sent to the address: the recipient must click **Confirm Notifications** in the email to start receiving notifications.  
これで、リストの最後尾にメールアドレスが表示 (ステータス：Pending (保留)) されます。メールが追加されたアドレスに届きます：受取人はConfirm Notificationsをクリックすれば、通知を受け取ることができるようになります。

### Configuring notifications　通知を設定する

You can pick and choose the Ship events about which you want to notify different people. For example, it's possible to only send notifications about a failed publishing event if you do not want to be bothered when things go well! And of course you can send different notifications to different email addresses.

通知を送る

To configure notifications:

1. Open your app's Ship page.
2. Click **Settings.**
3. Go to the **Notifications** tab.
4. Use the toggles under the different event types.
5. Hit **Save** once all notifications are set.