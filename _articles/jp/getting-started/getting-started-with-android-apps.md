---
# jp title missing
title: Getting started with Android apps
redirect_from:
- "/getting-started/Getting-started-with-Android-apps/"
- "/getting-started/Getting-started-with-android-apps/"
- "/getting-started/getting-started-with-Android-apps/"
menu:
  getting-started:
    weight: 11
---
このガイドでは、以下について説明します。

- Bitrise に Android アプリを追加する方法
- `primary`ワークフローと`deploy`ワークフローでできること
- アプリのテスト方法
- [bitrise.io](https://www.bitrise.io/)もしくはマーケットプレイスにデプロイする方法

## bitrise.io に Android アプリを追加する

{% include message_box.html type="note" title="既にBitriseアカウントをお持ちですか?" content="[bitrise.io](https://www.bitrise.io)にサインアップして、Bitriseアカウントにアクセスできることを確認してください。 GitホスティングサービスのアカウントにBitriseアカウントを接続する方法は、[4通り](https://devcenter.bitrise.io/getting-started/index#signing-up-to-bitrise)あります。"%}

1. [bitrise.io](https://www.bitrise.io/)にログインします。
2. ダッシュボードで`+ Add new app`をクリックします。
3. `Create new App`ページの`Choose Account`で、アプリを追加するアカウントを選択します。
4. アプリの公開設定を Private または[Public](/getting-started/adding-a-new-app/public-apps)に設定し、`Next`をクリックします。
5. リポジトリを持つ Git ホスティングサービスを選択し、リポジトリを選択します。詳細は[connecting your repository](/getting-started/adding-a-new-app/connecting-a-repository/)を参照してください。
6. リポジトリのアクセスを求めるプロンプトが表示されたら、`No, auto-add SSH key`を選択します。詳細は[SSH keys](/getting-started/adding-a-new-app/setting-up-ssh-keys/)を参照してください。
7. プロジェクトで設定したブランチ名(例えば master など)を入力し、`Next`をクリックします。
8. Bitrise がプロジェクトを検証するのでしばらくお待ちください。設定ファイルに基づいてアプリのセットアップを行います。
   - Bitrise Scanner はデフォルトでプロジェクトのモジュールを選択します。 `Module`リストで選択できるモジュールがさらにある場合は、プロジェクトに最適なモジュールを選択してください。
   - **ビルド**のバリアントを選択します(`APPS & ARTIFACTS`にて生成されるすべてのバリアントを選択可能)。**テスト**のバリアントも同様に選択します。
9. プロンプトが表示されたら Webhook を登録して、コードがリポジトリにプッシュされたときに Bitrise が自動的にビルドを開始できるようにします。 これにより、`primary`ワークフローでの最初のビルドが開始されます。メッセージをクリックするとビルドページに移動します。 最初のビルドではまだ apk は作成されませんが、ビルドページでプロジェクトのログを確認することができます。

以下は Android `primary`ワークフローの一例です。

    {% raw %}
    primary:
        steps:
        - activate-ssh-key@4.0.3:
            run_if: '{{getenv "SSH_RSA_PRIVATE_KEY" | ne ""}}'
        - git-clone@4.0.11: {}
        - cache-pull@2.0.1: {}
        - script@1.1.5:
            title: Do anything with Script step
        - install-missing-android-tools@2.2.0:
            inputs:
            - gradlew_path: "$PROJECT_LOCATION/gradlew"
        - android-lint@0.9.4:
            inputs:
            - project_location: "$PROJECT_LOCATION"
            - module: "$MODULE"
            - variant: "$TEST_VARIANT"
        - android-unit-test@0.9.3:
            inputs:
            - project_location: "$PROJECT_LOCATION"
            - module: "$MODULE"
            - variant: "$TEST_VARIANT"
        - deploy-to-bitrise-io@1.3.15: {}
        - cache-push@2.0.5: {}
    {% endraw %}

このワークフローは、あなたのプロジェクトをビルドする `Android Build`ステップも`Sign APK`ステップもありません。
したがって、このワークフローはコードレベルでプロジェクトをテストするための出発点に過ぎません。

では、どのように**Android deploy ワークフロー**を行うか見てましょう！

1. ワークフローエディタで`deploy`ワークフローを選択します。
2. `Code Signing`タブに移動します。
3. キーストアファイルを `ANDROID KEYSTORE FILE`フィールドにドラッグ＆ドロップします。
4. `Keystore password`、`Keystore alias`、`Private key password`フィールドに情報を入力し`Save metadata`をクリックします。Bitrise にアプリをアップロードする前に Android Studio で生成されたキーストアファイルに含まれているので、これらはすでに手元にあるはずです。キーストアファイルの詳細については、[こちら](https://developer.android.com/studio/publish/app-signing)を参照してください。この情報を`Sign APK step` (Android deploy ワークフローのデフォルトに含まれます)タブに追加すると、デフォルトで Android 配布ワークフローに含まれている「署名 APK ステップ」が apk に署名して配布準備が整います。コード署名オプションの詳細については、[Android code signing guide](/code-signing/android-code-signing/android-code-signing-procedures/)を参照してください。
5. ビルドページに戻り、`Start/Schedule a build`をクリックします。
6. ポップアップウィンドウの`Build configuration`タブで `deploy`を選択します。

以下は Android `deploy`ワークフローの一例です。

    {% raw %}
    deploy:
        - activate-ssh-key@4.0.3:
            run_if: '{{getenv "SSH_RSA_PRIVATE_KEY" | ne ""}}'
        - git-clone@4.0.11: {}
        - cache-pull@2.0.1: {}
        - script@1.1.5:
            title: Do anything with Script step
        - install-missing-android-tools@2.2.0:
            inputs:
            - gradlew_path: "$PROJECT_LOCATION/gradlew"
        - change-android-versioncode-and-versionname@1.1.1:
            inputs:
            - build_gradle_path: "$PROJECT_LOCATION/$MODULE/build.gradle"
        - android-lint@0.9.4:
            inputs:
            - project_location: "$PROJECT_LOCATION"
            - module: "$MODULE"
            - variant: "$TEST_VARIANT"
        - android-unit-test@0.9.3:
            inputs:
            - project_location: "$PROJECT_LOCATION"
            - module: "$MODULE"
            - variant: "$TEST_VARIANT"
        - android-build@0.9.5:
            inputs:
            - project_location: "$PROJECT_LOCATION"
            - module: "$MODULE"
            - variant: "$BUILD_VARIANT"
        - sign-apk@1.2.3:
            run_if: '{{getenv "BITRISEIO_ANDROID_KEYSTORE_URL" | ne ""}}'
        - deploy-to-bitrise-io@1.3.15:
            inputs:
            - notify_user_groups: testers
        - cache-push@2.0.5: {}
    {% endraw %}

{% include message_box.html type="重要" title="ステップの順序！" content="

- Gradle の依存関係をキャッシュするためには、ワークフローの最初のステップを`Bitrise.io Cache:Pull`に、最後のステップを`Bitrise.io Cache:Push`としてください！
- `Do anything with Script`ステップの直後の、`Install missing Android SDK components`はプロジェクトに不足している可能性がある Android SDK コンポーネントをインストールします。
- `Change Android versionCode and versionName`ステップは、`Android Build`ステップの**前に**挿入する必要があります。これは正しいバージョンコードとバージョン名のビルドをアップロードするためです。
- ビルド処理を行う前にコードとデバッグをテストするため、 `Android Lint`と`Android Unit Test`ステップは `Android Build`ステップの**前に**挿入する必要があります。
- `Sign APK`ステップは`Android Build`ステップの**後で**なければなりません。後者はあなたのプロジェクトをビルドします。 承認されたプロジェクトをアップロードできるように、このステップはすべての展開ステップの**前に**あることを確認してください。"%}

## 依存関係

幸運にも、`deploy`ワークフローのデフォルトである `Android Build`ステップは、`build.gradle`ファイルにリストアップしたすべての依存関係を処理し、あなたのプロジェクトにインストールします。

## アプリのテスト

前述の Android ワークフローの通り、`Android Lint`と`Android Unit Test`のステップがデフォルトでワークフローに含まれています。

UI テストを行う場合、**仮想デバイスで Android UI テストを実行するために**、`beta Virtual Device Testing for Android`ステップを追加してください。
利用可能なテストタイプの中から 1 つを選択してください！

- instrumentation
- robo
- gameloop

instrumentation を選択した場合は、**Instrumentation Test**グループ下で**Test APK path**を設定することを忘れないでください。

{% include message_box.html type="情報" title="より多くのテストステップの選択" content="ワークフローの左側にある`+`記号をクリックし、私たちのコレクションから別の `TEST`ステップを選択してください。"%}

## プロジェクトのデプロイ

### bitrise.io へのデプロイ

このステップでは、ビルドページにある[APPS & ARTIFACTS](/builds/build-artifacts-online/)タブに、ビルドに関連するすべての成果物をアップロードします。

ビルドの URL を使用して、生成された apk をチームメンバーと共有できます。 apk がビルドされたことをユーザーグループまたは個人に通知することもできます。

1. `Deploy to bitrise.io`ステップに進みます。
2. `Notify: User Roles`で、受け取るロールを付与します。 または通知するユーザの電子メールアドレスを`Notify: Emails`フィールドに入力します。 これらの電子メールアドレスを[secret env vars](/builds/env-vars-secret-env-vars/)に設定してください！これらの詳細は `APPS＆ARTIFACTS`タブで生成された apk の隣にある`eye`アイコンをクリックすると`Notifications`の下で変更することもできます。

### マーケットプレイスへのデプロイ

ワークフロー(`Sign APK`ステップの後)に `Google Play Deploy`ステップを追加すると、署名済み apk があなたの選択したマーケットプレイスにアップロードされます。

1. Google Play ストアと同期していることを確認してください。以下を参考にしてください。
   - [register to Google Play Store and set up your project](/tutorials/deploy/android-deployment/#register-to-google-play-store-and-set-up-your-first-project)
   - set up [Google Play API access](/tutorials/deploy/android-deployment/#set-up-google-play-api-access)
2. Bitrise のダッシュボードで、`Code Signing`に移動し、サービスアカウントの JSON キーを`GENERIC FILE STORAGE`にアップロードします。
3. アップロードしたファイルの URL を格納する env キーをコピーします。
   - 例: `BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
4. ワークフローエディタにて `Google Play Deploy`ステップに戻ります。
5. 次のように必要な入力フィールドを入力します。
   - `Service Account JSON key file path`: このフィールドはアップロードされたサービスアカウントの JSON キーを含む環境変数を指定する必要があります。リモート URL を受け付けます。 例：`$BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
   - `Package name`: あなたの Android アプリのパッケージ名
   - `Track`: APK を展開するトラック(alpha/beta/rollout/production)

{% include message_box.html type="情報" title="ワークフローに追加できる他のdeployステップ" content="ワークフローの左側にある`+`記号をクリックし、コレクションから別の`DEPLOY`ステップを選択します。例えば`Appetize.io deploy`や`Amazon Device Farm File Directory`です。"%}

これで全部です！ ビルドを開始またはスケジュールし、外部のテスターと URL を共有するか、あなたが選んだアプリストアにアプリを配布してください！
