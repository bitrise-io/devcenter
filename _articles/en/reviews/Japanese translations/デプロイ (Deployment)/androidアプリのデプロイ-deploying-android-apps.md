---
title: Androidアプリのデプロイ (Deploying Android apps)
redirect_from: []
published: false

---
This guide describes how you can add your Android project to [bitrise.io](https://www.bitrise.io) and deploy the APK built from your project to [Google Play Store](https://play.google.com/store). We're using the [sample-apps-android-googleplay](https://github.com/bitrise-samples/sample-apps-android-googleplay) app as an example for this tutorial.

このガイドでは、[bitrise.io](https://www.bitrise.io)にAndroidプロジェクトを追加する方法とプロジェクトから[Google Play Store](https://play.google.com/store)へビルドしたAPKをデプロイする方法を説明します。そしてこのチュートリアルでは一例として[sample-apps-android-googleplay](https://github.com/bitrise-samples/sample-apps-android-googleplay)アプリを使って紹介します。

In this guide, you will learn how to:

このガイドでは、以下の方法を学ぶことができます：

* create an Android project on [bitrise.io](https://www.bitrise.io)
* set up a [Google Play Store](https://play.google.com/store) project
* set up [Google Play API](https://developers.google.com/android-publisher/getting_started) access
* [deploy to Google Play Store](#deploy-to-google-play-store-using-bitrise-google-play-deploy-step) using Bitrise's `Google Play Deploy` step
* [bitrise.io](https://www.bitrise.io)でAndroidプロジェクトの作成
* [Google Play Store](https://play.google.com/store)プロジェクトのセットアップ
* [Google Play API](https://developers.google.com/android-publisher/getting_started)アクセスのセットアップ
* Bitriseの`Google Play deploy`ステップを使用して[Google Play Storeへのデプロイ](#deploy-to-google-play-store-using-bitrise-google-play-deploy-step)

## Creating your Android project on [bitrise.io](https://www.bitrise.io)  
[bitrise.io](https://www.bitrise.io)でAndroidプロジェクトの作成

* Log into [bitrise.io](htts://www.bitrise.io).
* Create a [new Bitrise project](getting-started/adding-a-new-app). Bitrise scans your Android project and creates the initial configuration for it.
* Sign your `APK` file [digitally](/code-signing/android-code-signing/android-code-signing-using-bitrise-sign-APK-step/).

  Do not forget to **upload your keystore file** to [bitrise.io](https://www.bitrise.io).

  Once your code signing is completed, your config will look like this:
* bitrise.ioにログインします
* 新しいBitriseプロジェクトを作成します。BitriseはあなたのAndroidプロジェクトをスキャンし、最初の構成を作成します。
* デジタルで`APK`ファイルに署名します。  
  bitrise.ioに**keystoreファイルをアップロード**するのをお忘れなく。  
  コード署名が完了すると、構成はこのように見えます：

      {% raw %}
      workflows:
      deploy:
        steps:
        - activate-ssh-key@3.1.1:
            run_if: '{{getenv "SSH_RSA_PRIVATE_KEY" | ne ""}}'
        - git-clone@4.0.11: {}
        - cache-pull@2.0.1: {}
        - script@1.1.5:
            title: Do anything with Script step
        - install-missing-android-tools@2.1.1: {}
        - android-build@0.9.4:
            inputs:
            - project_location: $BITRISE_SOURCE_DIR
            - module: "app"
        - sign-APK@1.2.0: {}
        - deploy-to-bitrise-io@1.3.12: {}
        - cache-push@2.0.5: {}
      {% endraw %}

## Setting up your first project  
最初のプロジェクトのセットアップ

1. Register a [Google Play Developer Account](https://developer.android.com/distribute/console/). If you already have a Google Play Developer account, and you have already deployed your app to Google Play Store, skip to [Set up Google Play API access](#set-up-google-play-api-access).  
   Google Play Developer Accountを登録します。既にアカウントをお持ちであれば、Google Play Storeにアプリをデプロイ済なので[Google Play APIアクセスのセットアップ](#set-up-google-play-api-access)に進んでください。
2. Go through the [Prepare & roll out steps](https://support.google.com/googleplay/android-developer/answer/7159011?hl=en).

   [準備と公開のステップ](https://support.google.com/googleplay/android-developer/answer/7159011?hl=ja)に進みます。

### Setting up Google Play API access  
Google Play APIアクセスのセットアップ

1. Link your API project by `Creating a new API project` or `Using an existing API project`.  
   `Creating a new API project`もしくは`Using an existing API project`のいずれかを使ってAPIプロジェクトをリンクします。
2. Set up `API Access Clients` using a service account and grant `Release manager` role to the service account.  
   サービスアカウントを使って`API Access Clients`をセットアップし、そのサービスアカウントへ`Release manager`ロールを許可します。
3. **Save the downloaded JSON key of your service account** now because you will need it later.  
   後ほど必要になるので、この時点で**サービスアカウントのダウンロード済みJSONキーを保存**します。

Check out the [Google Play Developer API](https://developers.google.com/android-publisher/getting_started) guide if you need more information on the process.

You have successfully prepared your Google Play Console project. A services credential account has been created which is authorized to manage your releases.

過程における情報が必要な場合、[Google Play Developer API](https://developers.google.com/android-publisher/getting_started)ガイドを参照してください。

これでGoogle Play Consoleプロジェクトの準備が整いました。リリースを行うのが認可されたservices credential accountが作成されています。

## Deploying to bitrise.io  
bitrise.ioへデプロイ

The `Deploy to bitrise.io - Apps, Logs, Artifacts` Step attaches all the generated artifacts to your build and uploads them into the [ APPS & ARTIFACTS](https://devcenter.bitrise.io/builds/build-artifacts-online/) tab on your Build’s page. By default, the value of the `Enable public page for the App?` input field is set to `true`. This way, once the build runs, a public install page will be available with a long and random URL which can be shared with others who are not registered on Bitrise.

`Deploy to bitrise.io - Apps, Logs, Artifacts`ステップは全ての生成されたアーティファクトをビルドに添付し、ビルドページのAPPS & ARTIFACTSタブへアップロードします。デフォルトでは`Enable public page for the App?`インプット欄の値が`true`になっています。この方法により、一旦ビルドが走ると、公開インストールページが長くてランダムなURLが利用可能になるので、Bitriseに登録していない人とでも共有することができます。

You can notify user groups or individual users that your APK file has been built by specifying roles and/or email addresses. You can share the app's public install page with anyone if you set the following input fields:

ロールやメールアドレスを明記することでAPKファイルがビルドされたことをユーザーグループや個人ユーザーに通知することができます。インプット欄に以下の項目をセットすればアプリの公開インストールページを共有することができます：

1. Go to the `Deploy to bitrise.io` step.  
   `Deploy to bitrise.io`ステップに進みます。
2. In the `Notify: User Roles` input field, add the role (for example, `testers`, `developers`, `admins`) so that only those get notified who have been granted with this particular role.  
   `Notify: User Roles`インプット欄にロールを追加（例：`testers`、`developers`、`admins`）することで特定のロールで認可された人のみが通知を受け取る事ができます。
3. Or fill out the `Notify: Emails` input field with email addresses of the users you want to send the URL to. Make sure you set those email addresses as [secret env vars](https://devcenter.bitrise.io/builds/env-vars-secret-env-vars/)! These details can be also modified under `Notifications` if you click the `eye` icon next to your generated APK file in the `APPS & ARTIFACTS` tab. Here you can check the URL by clicking `Open Public install page`.

   もしくは`Notify: Emails`インプット欄にURLを送付したいユーザーのメールアドレスを入力します。secret env varsとしてメールアドレスをセットしてあるか確認してください。`APPS & ARTIFACTS`タブ内の生成されたAPKファイルの隣りにある`eye`アイコンをクリックすれば、これらの詳細を`Notifications`で修正することができます。`Open Public install page`をクリックしてURLを確認できます。

![](/img/public-install-page.png)

## Deploying to the Google Play Store  
Google Play Storeへのデプロイ

1. Log in to [bitrise.io](https://www.bitrise.io).  
   bitrise.ioにログインします。
2. Select your project and go to your `Workflow Editor`.  
   プロジェクトを選択して`Workflow Editor`に進みます。
3. Open the `Code Signing` tab of your `Workflow Editor`.  
   `Workflow Editor`の`Code Signing`タブを開きます。
4. Upload the service account JSON key into the `GENERIC FILE STORAGE`.  
   `GENERIC FILE STORAGE`へサービスアカウントJSONキーをアップロードします。
5. Copy the env key which stores your uploaded file's url.

   For example:  
   アップロード済みファイルのURLを保存しているenvキーをコピーします。例：

   `BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
6. Go back to your `Workflow Editor` and add the `Google Play Deploy` step to the end of your Workflow.  
   `Workflow Editor`に戻りワークフローの最後に`Google Play Deploy`ステップを追加します。
7. Fill out the required input fields which are:  
   インプット欄に記入します：
   * `Service Account JSON key file path`: This field can accept a remote url so you have to provide the environment which contains your uploaded service account JSON key. For example: `$BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
   * `Package name`: the package name of your Android app
   * `Track`: the track where you want to deploy your APK (alpha/beta/rollout/production)
   * `Service Account JSON key file path`：この欄ではリモートURLを受理するのでアップロード済みのサービスアカウントJSONキーが含まれる環境を入力します。例えば：
   * `Package name`：Androidアプリのパッケージ名
   * `Track`：APKをデプロイしたいトラックの場所(alpha/beta/rollout/production)

The final configuration looks like this:

最終的な構成はこのように見えます：

    {% raw %}
    workflows:
    deploy:
      steps:
      - activate-ssh-key@3.1.1:
          run_if: '{{getenv "SSH_RSA_PRIVATE_KEY" | ne ""}}'
      - git-clone@4.0.11: {}
      - cache-pull@2.0.1: {}
      - script@1.1.5:
          title: Do anything with Script step
      - install-missing-android-tools@2.1.1: {}
      - android-build@0.9.4:
          inputs:
          - project_location: $BITRISE_SOURCE_DIR
          - module: "app"
      - sign-APK@1.2.0: {}
      - google-play-deploy@1.5.0:
          inputs:
          - package_name: io.bitrise.googleplay
          - service_account_json_key_path: "$BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL"
          - track: alpha
      - deploy-to-bitrise-io@1.3.12: {}
      - cache-push@2.0.5: {}
    {% endraw %}

Your workflow is ready for deploying your app automatically to [Google Play Store](https://play.google.com/store). Once the app is tested and generated, you can upload it to Google Play Store.

これでワークフローがアプリを自動的にGoogle Play Storeへデプロイができる準備が整いました。一旦アプリがテストされ生成されると、Google Play Storeにアップロードすることができます。