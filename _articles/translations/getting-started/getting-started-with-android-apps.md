このガイドでは、以下について説明します。

- BitriseにAndroidアプリを追加する方法
- `primary`ワークフローと`deploy`ワークフローでできること
- アプリのテスト方法
- [bitrise.io](https://www.bitrise.io/)もしくはマーケットプレイスにデプロイする方法

## bitrise.ioにAndroidアプリを追加する

{% include message_box.html type="note" title="既にBitriseアカウントをお持ちですか?" content="[bitrise.io](https://www.bitrise.io)にサインアップして、Bitriseアカウントにアクセスできることを確認してください。 GitホスティングサービスのアカウントにBitriseアカウントを接続する方法は、[4通り](https://devcenter.bitrise.io/getting-started/index#signing-up-to-bitrise)あります。"%}

1. [bitrise.io](https://www.bitrise.io/)にログインします。
2. ダッシュボードで`+ Add new app`をクリックします。
3. `Create new App`ページで、アプリを追加するアカウントを選択します。
4. アプリの公開設定をPrivateまたは[Public](/getting-started/adding-a-new-app/public-apps)に設定し、`Next`をクリックします。
5. リポジトリを持つGitホスティングサービスを選択し、リポジトリを選択します。詳細は[connecting your repository](/getting-started/adding-a-new-app/connecting-a-repository/)を参照してください。
6. リポジトリのアクセスを求めるプロンプトが表示されたら、`No, auto-add SSH key`を選択します。詳細は[SSH keys](/getting-started/adding-a-new-app/setting-up-ssh-keys/)を参照してください。
7. プロジェクトで設定したブランチ名(例えばmasterなど)を入力し、`Next`をクリックします。
8. Bitriseがプロジェクトを検証するのでしばらくお待ちください。設定ファイルに基づいてアプリのセットアップを行います。
   * Bitrise Scannerはデフォルトでプロジェクトのモジュールを選択します。 `Module`リストで選択できるモジュールがさらにある場合は、プロジェクトに最適なモジュールを選択してください。
   * **ビルド**のバリアントを選択します(`APPS & ARTIFACTS`にて生成されるすべてのバリアントを選択可能)。**テスト**のバリアントも同様に選択します。
9. プロンプトが表示されたらWebhookを登録して、コードがリポジトリにプッシュされたときにBitriseが自動的にビルドを開始できるようにします。 これにより、`primary`ワークフローでの最初のビルドが開始されます。メッセージをクリックするとビルドページに移動します。 最初のビルドではまだapkは作成されませんが、ビルドページでプロジェクトのログを確認することができます。

以下はAndroid `primary`ワークフローの一例です。

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

このワークフローは、あなたのプロジェクトをビルドする `Android Build`ステップも` Sign APK`ステップもありません。
したがって、このワークフローはコードレベルでプロジェクトをテストするための出発点に過ぎません。

では、どのように**Android deployワークフロー**を行うか見てましょう！


1. ワークフローエディタで`deploy`ワークフローを選択します。
2. `Code Signing`タブに移動します。
3. キーストアファイルを `ANDROID KEYSTORE FILE`フィールドにドラッグ＆ドロップします。
4. `Keystore password`、`Keystore alias`、`Private key password`フィールドに情報を入力し`Save metadata`をクリックします。Bitriseにアプリをアップロードする前にAndroid Studioで生成されたキーストアファイルに含まれているので、これらはすでに手元にあるはずです。キーストアファイルの詳細については、[こちら](https://developer.android.com/studio/publish/app-signing)を参照してください。この情報を`Sign APK step` (Android deployワークフローのデフォルトに含まれます)タブに追加すると、デフォルトでAndroid配布ワークフローに含まれている「署名APKステップ」がapkに署名して配布準備が整います。コード署名オプションの詳細については、[Android code signing guide](/code-signing/android-code-signing/android-code-signing-procedures/)を参照してください。
5. ビルドページに戻り、`Start/Schedule a build`をクリックします。
6. ポップアップウィンドウの`Build configuration`タブで `deploy`を選択します。

以下はAndroid `deploy`ワークフローの一例です。

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

{% include message_box.html type="重要" title="ステップの順序！" content="

* Gradleの依存関係をキャッシュするためには、ワークフローの最初のステップを`Bitrise.io Cache:Pull`に、最後のステップを`Bitrise.io Cache:Push`としてください！
* `Do anything with Script`ステップの直後の、`Install missing Android SDK components`はプロジェクトに不足している可能性があるAndroid SDKコンポーネントをインストールします。
* `Change Android versionCode and versionName`ステップは、`Android Build`ステップの**前に**挿入する必要があります。これは正しいバージョンコードとバージョン名のビルドをアップロードするためです。
* ビルド処理を行う前にコードとデバッグをテストするため、 `Android Lint`と` Android Unit Test`ステップは `Android Build`ステップの**前に**挿入する必要があります。
* `Sign APK`ステップは` Android Build`ステップの**後で**なければなりません。後者はあなたのプロジェクトをビルドします。 承認されたプロジェクトをアップロードできるように、このステップはすべての展開ステップの**前に**あることを確認してください。"%}

## 依存関係

幸運にも、`deploy`ワークフローのデフォルトである `Android Build`ステップは、` build.gradle`ファイルにリストアップしたすべての依存関係を処理し、あなたのプロジェクトにインストールします。

## アプリのテスト

前述のAndroidワークフローの通り、`Android Lint`と`Android Unit Test`のステップがデフォルトでワークフローに含まれています。

UIテストを行う場合、**仮想デバイスでAndroid UIテストを実行するために**、`beta Virtual Device Testing for Android`ステップを追加してください。
利用可能なテストタイプの中から1つを選択してください！

* instrumentation
* robo
* gameloop

instrumentationを選択した場合は、**Instrumentation Test**グループ下で**Test APK path**を設定することを忘れないでください。

{% include message_box.html type="情報" title="より多くのテストステップの選択" content="ワークフローの左側にある`+`記号をクリックし、私たちのコレクションから別の `TEST`ステップを選択してください。"%}

## プロジェクトのデプロイ

### bitrise.ioへのデプロイ

このステップでは、ビルドページにある[APPS & ARTIFACTS](/builds/build-artifacts-online/)タブに、ビルドに関連するすべての成果物をアップロードします。

ビルドのURLを使用して、生成されたapkをチームメンバーと共有できます。 apkがビルドされたことをユーザーグループまたは個人に通知することもできます。

1. `Deploy to bitrise.io`ステップに進みます。
2. `Notify: User Roles`で、受け取るロールを付与します。 または通知するユーザの電子メールアドレスを`Notify: Emails`フィールドに入力します。 これらの電子メールアドレスを[secret env vars](/builds/env-vars-secret-env-vars/)に設定してください！これらの詳細は `APPS＆ARTIFACTS`タブで生成されたapkの隣にある`eye`アイコンをクリックすると`Notifications`の下で変更することもできます。

### マーケットプレイスへのデプロイ

ワークフロー(`Sign APK`ステップの後)に `Google Play Deploy`ステップを追加すると、署名済みapkがあなたの選択したマーケットプレイスにアップロードされます。

1. Google Playストアと同期していることを確認してください。以下を参考にしてください。
   * [register to Google Play Store and set up your project](/tutorials/deploy/android-deployment/#register-to-google-play-store-and-set-up-your-first-project)
   * set up [Google Play API access](/tutorials/deploy/android-deployment/#set-up-google-play-api-access)
2. Bitriseのダッシュボードで、`Code Signing`に移動し、サービスアカウントのJSONキーを`GENERIC FILE STORAGE`にアップロードします。
3. アップロードしたファイルのURLを格納するenvキーをコピーします。
   * 例: `BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
4. ワークフローエディタにて `Google Play Deploy`ステップに戻ります。
5. 次のように必要な入力フィールドを入力します。
   * `Service Account JSON key file path`: このフィールドはアップロードされたサービスアカウントのJSONキーを含む環境変数を指定する必要があります。リモートURLを受け付けます。 例：`$BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
   * `Package name`: あなたのAndroidアプリのパッケージ名
   * `Track`: APKを展開するトラック(alpha/beta/rollout/production)

{% include message_box.html type="情報" title="ワークフローに追加できる他のdeployステップ "content ="ワークフローの左側にある`+`記号をクリックし、コレクションから別の`DEPLOY`ステップを選択します。例えば`Appetize.io deploy`や`Amazon Device Farm File Directory`です。"%}

これで全部です！ ビルドを開始またはスケジュールし、外部のテスターとURLを共有するか、あなたが選んだアプリストアにアプリを配布してください！