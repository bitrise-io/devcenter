---
title: Androidのデプロイ
menu:
  deployment-tutorials:
    weight: 1
---
ここでは、Androidプロジェクトを[bitrise.io](https://www.bitrise.io) に追加し、ビルドしたAPKを[Google Play Store](https://play.google.com/store)にデプロイする方法を説明します。
このチュートリアルでは[sample-apps-android-googleplay](https://github.com/bitrise-samples/sample-apps-android-googleplay)を例として使用します。

このチュートリアルでは以下の内容を説明します。

* [bitrise.io](https://www.bitrise.io)にAndroidのプロジェクトを作成する
* [Google Play Store](https://play.google.com/store) のプロジェクトをセットアップする
* [Google Play API](https://developers.google.com/android-publisher/getting_started) のアクセス設定を行う
* Bitriseの `Google Play Deploy`ステップを使用して、[Google Play Storeにデプロイする](#deploy-to-google-play-store-using-bitrise-google-play-deploy-step)

## [bitrise.io](https://www.bitrise.io)にAndroidプロジェクトを作成する

* [bitrise.io](https://www.bitrise.io)にログインしてください。
* [新規Bitriseプロジェクト](getting-started/adding-a-new-app)を作成してください。 BitriseはAndroidプロジェクトをスキャンし、初期設定を行います。
* `APK` ファイルへの [署名](/code-signing/android-code-signing/android-code-signing-using-bitrise-sign-APK-step/)を行ってください。

  忘れずに[bitrise.io](https://www.bitrise.io)に**keystoreファイルをアップロード**してください。

  署名が完了した時点でのコンフィグファイルは以下のようになっています。
  
  {% raw %}
  ```yaml
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
  ```
  {% endraw %}

## Google Play Storeの登録を行い、プロジェクトの初期セットアップをする

1. [Google Play Developer Account](https://developer.android.com/distribute/console/)に登録してください。
   すでにGoogle Play Developer Accountに登録済みで、かつ、Google Play Storeにアプリをデプロイをしたことがある場合、[Google Play APIのアクセス設定を行う](#google-play-apiのアクセス設定を行う)まで飛ばしてください。
2. [リリースの準備と公開](https://support.google.com/googleplay/android-developer/answer/7159011?hl=ja)に従ってセットアップを行ってください。

## Google Play APIのアクセス設定を行う

1. `新しい API プロジェクトを作成`、または、`既存の API プロジェクトを使用`し、API プロジェクトをリンクしてください。
2. サービスアカウントを使用して`API アクセス クライアントを設定`し、サービスアカウントに`Release manager`権限を付与してください。
3. あとで必要になるので、**ダウンロードしたJSON keyをサービスアカウントに保存**してください。

詳細な手順は[Google Play Developer API](https://developers.google.com/android-publisher/getting_started)を確認してください。

これでGoogle Play Consoleのプロジェクトの準備が完了しました。
リリース管理の権限を持ったサービスアカウントが作成されています。

## Bitriseの`Google Play Deploy`ステップを使ってGoogle Play Storeにデプロイする

1. [bitrise.io](https://www.bitrise.io)にログインしてください。
2. プロジェクトを選択し、`Workflow Editor`を開いてください。
3. `Workflow Editor`の`Code Signing`タブを開いてください。
4. `GENERIC FILE STORAGE`にサービスアカウントのJSON keyをアップロードしてください。
5. アップロードしたファイルのURLの環境変数をコピーしてください。

   例:

   `BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
6. `Workflow Editor`に戻り、`Google Play Deploy`ステップをWorkflowに追加してください。
7. 以下に従って、必須の入力項目を埋めてくだい。
   * `Service Account JSON key file path`: この入力値はリモートURLを設定できます。アップロードしたサービスアカウントのJSON keyのURLを環境変数で指定してください。
     例: `$BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
   * `Package name`: Androidアプリのパッケージ名
   * `Track`: APKのトラック (alpha/beta/rollout/production)

最終的なコンフィグファイルは以下のようになっています。

{% raw %}
```yaml
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
```
{% endraw %}

これで自動で[Google Play Store](https://play.google.com/store)にアプリをデプロイするWorkflowの準備ができました。
アプリがテストされた後にビルドされ、Google Play Storeにアップロードされます。