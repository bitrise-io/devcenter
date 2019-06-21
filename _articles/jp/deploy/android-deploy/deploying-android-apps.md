---
title: Androidアプリのデプロイ
date: 2018-10-26T13:00:41.000+00:00
redirect_from:
- "/jp/tutorials/deploy/android-deployment/"
menu:
  android-deploy:
    weight: 2

---
このガイドでは、[bitrise.io](https://www.bitrise.io)にAndroidプロジェクトを追加する方法とプロジェクトから[Google Play Store](https://play.google.com/store)へビルドしたAPKをデプロイする方法を説明します。そしてこのチュートリアルでは一例として[sample-apps-android-googleplay](https://github.com/bitrise-samples/sample-apps-android-googleplay)アプリを使って紹介します。

このガイドでは、以下の方法を学ぶことができます：

* [bitrise.io](https://www.bitrise.io)でAndroidプロジェクトの作成
* [Google Play Store](https://play.google.com/store)プロジェクトのセットアップ
* [Google Play API](https://developers.google.com/android-publisher/getting_started)アクセスのセットアップ
* Bitriseの`Google Play deploy`ステップを使用する[Google Play Storeへのデプロイ](#deploy-to-google-play-store-using-bitrise-google-play-deploy-step)

## [bitrise.io](https://www.bitrise.io)でAndroidプロジェクトの作成

* Log into [bitrise.io](htts://www.bitrise.io).
* Create a [new Bitrise project](/jp/getting-started/adding-a-new-app/). Bitrise scans your Android project and creates the initial configuration for it.
* Sign your `APK` file [digitally](/jp/code-signing/android-code-signing/android-code-signing-using-bitrise-sign-APK-step/).

  Do not forget to **upload your keystore file** to [bitrise.io](https://www.bitrise.io).

  Once your code signing is completed, your config will look like this:
* [bitrise.io](htts://www.bitrise.io)にログインします
* [新しいBitriseプロジェクト](getting-started/adding-a-new-app)を作成します。BitriseはあなたのAndroidプロジェクトをスキャンし、初期構成を作成します。
* [デジタル](/code-signing/android-code-signing/android-code-signing-using-bitrise-sign-APK-step/)で`APK`ファイルに署名をします。  
  [bitrise.io](https://www.bitrise.io)に**keystoreファイルをアップロード**するのをお忘れなく。  
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

## 最初のプロジェクトのセットアップ

1. [Google Play Developer Account](https://developer.android.com/distribute/console/)を登録します。既にアカウントをお持ちであれば、アプリのGoogle Play Storeへのデプロイは完了しているので[Google Play APIアクセスのセットアップ](#set-up-google-play-api-access)に移ってください。
2. [準備と公開のステップ](https://support.google.com/googleplay/android-developer/answer/7159011?hl=ja)に進みます。

### Google Play APIアクセスのセットアップ

1. `Creating a new API project`もしくは`Using an existing API project`のいずれかを使ってAPIプロジェクトをリンクします。
2. サービスアカウントを使って`API Access Clients`をセットアップし、そのサービスアカウントに`Release manager`ロールを付与します。
3. 後ほど必要になるので、この時点で**サービスアカウントのダウンロード済みJSONキーを保存**します。

さらなる情報が必要な場合、[Google Play Developer API](https://developers.google.com/android-publisher/getting_started)ガイドを参照してください。

これでGoogle Play Consoleプロジェクトの準備が整いました。リリースを行うのが認可されたservices credential accountが作成が完了しています。

## Deploying to bitrise.io

bitrise.ioへデプロイ

`Deploy to bitrise.io - Apps, Logs, Artifacts`ステップは全ての生成されたアーティファクトをビルドに添付し、ビルドページの[APPS & ARTIFACTS](https://devcenter.bitrise.io/builds/build-artifacts-online/)タブへアップロードします。デフォルトでは`Enable public page for the App?`インプット欄の値が`true`になっています。この方法により、一旦ビルドが走ると、公開インストールページの長くてランダムなURLが利用可能になるので、Bitriseに登録していない人とでも共有することができます。

ロールやメールアドレスを明記することでAPKファイルがビルドされたことをユーザーグループや個人ユーザーに通知することができます。インプット欄に以下の項目をセットすればアプリの公開インストールページを共有することができます：

1. `Deploy to bitrise.io`ステップに進みます。
2. `Notify: User Roles`インプット欄にロールを追加（例：`testers`、`developers`、`admins`）することで特定のロールで認可された人のみが通知を受け取る事ができます。
3. もしくは`Notify: Emails`インプット欄にURLを送付したいユーザーのメールアドレスを入力します。secret env varsとしてメールアドレスをセットしてあるか確認してください。`APPS & ARTIFACTS`タブ内の生成されたAPKファイルの隣りにある`eye`アイコンをクリックすれば、これらの詳細を`Notifications`で修正することができます。`Open Public install page`をクリックしてURLを確認できます。

![](/img/public-install-page.png)

## Google Play Storeへのデプロイ

1. Log in to [bitrise.io](https://www.bitrise.io).  
   [bitrise.io](https://www.bitrise.io)にログインします。
2. プロジェクトを選択して`Workflow Editor`に進みます。
3. `Workflow Editor`の`Code Signing`タブを開きます。
4. `GENERIC FILE STORAGE`へサービスアカウントJSONキーをアップロードします。
5. アップロード済みファイルのURLを保存しているenvキーをコピーします。例：`BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
6. `Workflow Editor`に戻りワークフローの最後に`Google Play Deploy`ステップを追加します。
7. Fill out the required input fields which are:  
   インプット欄に以下の項目を記入します：
   * `Service Account JSON key file path`：この欄ではリモートURLを受理するのでアップロード済みのサービスアカウントJSONキーが含まれる環境を入力します。例えば：`$BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
   * `Package name`：Androidアプリのパッケージ名
   * `Track`：APKをデプロイしたいトラックの場所(alpha/beta/rollout/production)

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

これでワークフローがアプリを自動的に[Google Play Store](https://play.google.com/store)へデプロイができる準備が整いました。一旦アプリがテストされ生成されると、Google Play Storeにアップロードすることができます。