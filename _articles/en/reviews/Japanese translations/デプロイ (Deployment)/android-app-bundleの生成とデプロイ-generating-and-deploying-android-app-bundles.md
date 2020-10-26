---
changelog:
last_modified_at:
tag: []
title: Android App Bundleの生成とデプロイ (Generating and deploying Android app bundles)
redirect_from: []
description: ''
published: false

---
Bitriseを使ってAndroid App Bundleを作成するのは、APKを生成するのとほぼ同じ要領でできます。ステップのインプットを微調整して自分のコードからAndroid App Bundle (.aab) ファイルをコンパイルすると、Bundleに署名させてGoogle Play Storeへデプロイさせます。

{% include message_box.html type="warning" title="バンドルの作成でサポートしているステップバージョン" content=" 以下の各ステップでは、表示されているバージョンもしくはそれより新しいバージョンにしておく必要があります。古いバージョンはバンドルの作成をサポートしていません。

* Android Build 0.10.0 以上
* Gradle Runner 1.9.0 以上
* Android Sign 1.3.0 以上
* Deploy to Google Play 1.6.0 以上"%}

## Android App Bundleの生成

**Gradle Runner**ステップまたは**Android Build**ステップのいずれかを使用してAndroid App Bundleを作成することができます。

### Gradle Runnerステップ

BitriseのプロジェクトスキャナがコードをAndroidアプリであると検知すると、すぐに最初のビルドが開始されます！Workflow Editorよりデプロイに使用するワークフローを選択します。

1. (ビルドのステップがまだない場合) ワークフローの**Android Unit Test**と**Android Lint**ステップの後ろに**Gradle Runner**ステップを追加します。
2. **Gradle Runner**の**Config**セクションをクリックします。
3. **Gradle task to run**のインプット欄に、例えば`bundleRelease`または`bundleDebug`をセットしてプロジェクト用のバンドルを作成します。

   ![{{ page.title }}](/img/bundlerelease.jpg)

この方法により、ステップはAPKの代わりにAndroid App Bundleを生成するようになります。

Android App BundleとAPKを一つのワークフローで生成したい場合、**Gradle task to run**インプット欄に追加のタスクを指定することができます：

![{{ page.title }}](/img/assemble-bundle-gradle-runner.jpg)

### Android Build ステップ

**Android Build**ステップを使用してAndroidアプリ用のAndroid App Bundleを生成することもできます：

1. (ビルドステップがまだ無い場合)ワークフローの**Android Unit Test**ステップと**Android Lint**ステップの後ろに**Android Build**ステップを追加します。
2. **Project Location**インプット欄では、Androidプロジェクトのルートディレクトリを指定します。
3. **Build type**へ進み、ビルド種類として`aab`を選択します。

   ![{{ page.title }}](/img/android-build-aab-config.jpg)

APKとAndroid App Bundleを一つのワークフローで生成したい場合、それぞれ後ろに**Android Build**ステップを追加して (合計2つ)、その追加した2つのステップを構成してください。

## Android App Bundleの署名

Android App Bundleファイルの署名は、APKの署名と方法は同様です。

{% include message_box.html type="important" title="始める前に気をつけておくべきポイント" content="

* Workflow Editorの**Code Signing**タブへkeystoreファイルのアップロードは済みましたか？
* **Keystore password**, **Keystore alias**ならびに**Private key password**のインプット欄は埋まっていますか？ "%}

1. ワークフローのビルドステップの後ろに**Android Sign**ステップを追加します。
2. 使用中であるビルドステップのアウトプットとして表示されているアウトプット環境変数と同じ値が、**APK file path**のインプット欄にも表示されているか確認します。

   ![{{ page.title }}](/img/android-sign-aab-apk.jpg)

keystoreファイルのアップロードや必要なクレデンシャル情報の入力が済むと、**Android Sign**ステップの**Keystore url**, **Keystore password**, **Keystore alias**, そして**Private key password**が自動的に入力されるようになります！

## Google Play StoreへAndroid App Bundleのデプロイ

アプリストアでの配布の前にバンドルを確認したい場合、**Gradle Runner /** **Andriod Build**ステップの後に**Deploy to Bitrise.io**ステップを追加します。このステップは、ビルドページの[APPS & ARTIFACTS](https://devcenter.bitrise.io/builds/build-artifacts-online/)タブへバンドルのアップロードを行います。

始める前に、Google Play Storeと同期済みかどうかを確認してください：

* [Google Play Storeに登録し、プロジェクトのセットアップを行ってください](https://devcenter.bitrise.io/jp/deploy/android-deploy/deploying-android-apps/)。
* [Google Play API access](https://devcenter.bitrise.io/jp/deploy/android-deploy/deploying-android-apps/#google-play-api%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E3%81%AE%E3%82%BB%E3%83%83%E3%83%88%E3%82%A2%E3%83%83%E3%83%97)を設定します。

1. Bitrise Dashboardにある**Code Signing**タブに進み、**GENERIC FILE STORAGE**へサービスアカウントJSONキーをアップロードします。
2. アップロード済みファイルのURLを保管しているENVキーをコピーします。  
   例：`BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
3. ワークフローの**Android Sign**ステップの**後ろ**に**Google Play Deploy**ステップを追加します。
4. 以下の説明に従って、項目を埋めます：
   * **Service Account JSON key file path**：この欄はリモートURLを受け付けるので、アップロード済みのサービスアカウントJSONキーが含まれた環境変数を入力してください。例：`$BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
   * **Package name**：ご自身のAndroid App Bundleのパッケージ名です。
   * **App file path**：自動的に入力されます。
   * **Track**：ご自身のAndroid App Bundle (alpha/beta/rollout/production) をデプロイすることができるtrackです。
5. ビルドを開始します。

これで、Google Play Storeでご自身のAndroid App Bundleを配布・カスタマイズすることができるようになります。