
このガイドでは、BitriseにAndroidアプリを追加する方法、プライマリー(primary)とデプロイ(deploy)の2つのワークフロー(workflow)で何ができるのか、そしてテストを実行し、アプリを[bitrise.io](https://www.bitrise.io/)およびストアにデプロイする方法を順を追って説明していきます。


## bitrise.ioにAndroidアプリを追加する


{% include message_box.html type="note" title="Bitriseアカウントを持っていますか?" content=" [bitrise.io](https://www.bitrise.io)にサインアップし、bitriseアカウントにアクセス出来ることを確認してください。BitriseアカウントをGitホスティングサービスのアカウントと紐付けるには[4通りの方法](https://devcenter.bitrise.io/getting-started/index#signing-up-to-bitrise)があります。 "%}

1. [bitrise.io](https://www.bitrise.io/)にログインします。
2. ダッシュボードで、 `+ Add new app` をクリックします。
3. `Create new App` ページで, アプリを追加するアカウントを選択します。
4. アプリのプライバシーを Private か [Public](/getting-started/adding-a-new-app/public-apps) から選んで `Next` をクリックします。
5. 対象とするレポジトリのあるGitホスティングサービスを選択し、追加するリポジトリを選択します。詳しくはこちらのページを御覧ください[connecting your repository](/getting-started/adding-a-new-app/connecting-a-repository/)。
6. "set up repository access"が表示された場合、 `No, auto-add SSH key` をクリックします。詳しくはこちらのページを御覧ください [SSH keys](/getting-started/adding-a-new-app/setting-up-ssh-keys/)。
7. プロジェクトのコンフィギュレーションが含まれるブランチ名（例：master）を入力し、 `Next` をクリックします.
8. Bitriseがプロジェクトのバリデーションを行う間、しばらくお待ち下さい。Bitriseはコンフィギュレーションファイルをもとにアプリをセットアップします。
   * Bitrise Scanner はデフォルトでプロジェクトのモジュールを選択します。 複数のモジュールがある場合は、 `Module` リストから, 該当するモジュールを選択してください。
   * **ビルド** 対象のバリアント(variant)を選択(`All Variants`を選択し、すべてのvariantを `APPS & ARTIFACTS` に生成することもできます)します。また、 **テスト** のバリアントも選択します。
9. コードがリポジトリにpushされたとき自動でビルドをスタートするために、webhookを登録します。同時に、プライマリーワークフローの最初のビルドを開始します。表示されたメッセージをクリックすると、ビルドページに遷移します。最初のビルドはまだapkを生成しませんが、ビルドページでプロジェクトのログを確認出来ます。

An example of an **Android プライマリーワークフロー** の例:

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

このワークフローでは、プロジェクトをビルドする `Android Build` ステップがありませんし、 `Sign APK` ステップもなく、コードレベルでプロジェクトをテストする出発点でしかありません。

次に、 **Android デプロイワークフロー** がどの様になるのか見て行きましょう。

1. ワークフローエディターで `deploy` ワークフローを選択します。
2.  `Code Signing` タブを開きます。
3.  `ANDROID KEYSTORE FILE` フィールドに、keystoreファイルをドラッグ＆ドロップします。
4.  `Keystore password`、 `Keystore alias`、 `Private key password` フィールドを入力し、 `Save metadata` をクリックします。これらはAndroid Studioで生成するkeystoreファイルに含まれているので、アプリをBitriseにアップロードする前に、用意しておいてください。
keystore ファイルに関するより詳しい情報は [こちら](https://developer.android.com/studio/publish/app-signing) のページを参照してください。Code Signingタブに追加した情報で、 `Sign APK step` （Android デプロイワークフローにデフォルトで含まれています）は apkの署名をするので、配布の準備は完了です。署名のオプションについてより詳しく知りたい場合は [Android code signing guide](/code-signing/android-code-signing/android-code-signing-procedures/) にお進みください。
5. ビルドページに戻り、 `Start/Schedule a build` をクリックします。
6. `Build configuration` ポップアップウィンドウが表示されるので、 `deploy` を選択します。

デプロイワークフローの例:

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

{% include message_box.html type="important" title="ステップの順番は重要です！" content="

* Gradleの依存をキャッシュするには、 `Bitrise.io Cache:Pull` ステップを最初に、 `Bitrise.io Cache:Push` ステップをワークフローの一番最後に残しておいてください。
* `Do anything with Script` ステップの直後の,  `Install missing Android SDK components` ステップで、プロジェクトで不足しているAndroid SDKコンポーネントをインストールします。
* `Change Android versionCode and versionName` ステップはversionCodeやversionNameが正しいことを確認するので、 `Android Build` ステップの前にある必要があります。
* `Android Lint` および `Android Unit Test` ステップはビルドの前にコードをテストし、デバッグするために `Android Build` ステップの前に必要です。
* `Sign APK` は、署名するapkが必要なので `Android Build` でステップより後になります。また、正規のプロジェクトをアップロードするため、あらゆるデプロイステップの前に必要です。 "%}

## 依存関係

`Android Build` ステップは幸運なことに、 デプロイワークフローにデフォルトで含まれており、 `build.gradle` に記載されているすべての依存関係を考慮し、インストールします。

## プロジェクトのテスト

前述したAndroidワークフローにある通り、 `Android Lint` および `Android Unit Test` ステップはデフォルトでワークフローに含まれています。

UIテスティングをするには、**Android UIテストをバーチャルデバイス上で実行する** ために、 `[BETA]Virtual Device Testing for Android` ステップを追加します。テストタイプを以下から選択してください。

* instrumentation
* robo
* gameloop

instrumentationを選択した場合、 **Instrumentation Test** グループの中の　**Test APK path** の設定を忘れないようにしてください。

{% include message_box.html type="info" title="更にテストステップを追加するには" content=" ワークフローの左ペインの `+` 記号をクリックし、コレクションからその他の `TEST` ステップを追加してください。"%}

## プロジェクトのデプロイ


### bitrise.ioへのデプロイ

このステップでは、プロジェクトのビルドに関連するすべてのアーティファクト(artifacts)を [ APPS & ARTIFACTS ](/builds/build-artifacts-online/) タブに保存します。

生成されたapkはビルドURLで、チームメンバーにシェア出来ます。apkのビルドが成功したことをグループや個々のユーザーに通知も出来ます。

1. `Deploy to bitrise.io` ステップを開きます。
2. `Notify: User Roles`　で、ロール(role)を設定し、このロールが割り当てられたユーザーにのみ通知が行くようにします。もしくは、 `Notify: Emails` フィールドに通知したいユーザーのemailアドレスを追加してください。これらのemailアドレスは [secret env vars](/builds/env-vars-secret-env-vars/) で設定してください。 設定の詳細は、ビルド結果画面の `APPS & ARTIFACTS` タブで表示されるapkの横にある `目` のアイコンをクリックして開いた画面の `Notifications` の下でも編集できます。

### マーケットプレイスにデプロイする

ワークフローに `Google Play Deploy` ステップを（ `Sign APK` ステップのあとに）追加すると、 署名済みapkがマーケットプレイスにアップロードされます。

1. Google Play Storeが設定済みであることを確認してください。詳しくはこちらを参照してください。
   * [register to Google Play Store and set up your project](/tutorials/deploy/android-deployment/#register-to-google-play-store-and-set-up-your-first-project)
   * [Google Play API access](/tutorials/deploy/android-deployment/#set-up-google-play-api-access) のセットアップ
2. Bitriseの `Workflow` で、 `Code Signing` を開き、サービスアカウントのJSONキーを `GENERIC FILE STORAGE.` にアップロードします。
3. アップロードしたファイルのURLを保持した環境変数のキーをコピーします。
   例: `BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
4. ワークフローエディターの `Google Play Deploy` ステップに戻ります。
5. 以下の情報を入力してください:
   * `Service Account JSON key file path`: このフィールドはリモートURLを受け付けるので、アップロードしたサービスアカウントのJSONキーをもつ環境変数を設定します。例: `$BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
   * `Package name`: アプリのパッケージ名
   * `Track`: APKをデプロイするトラック (alpha/beta/rollout/production)

{% include message_box.html type="info" title="ワークフローに追加できる、その他のデプロイステップ" content="ワークフローの左側にある `+` 記号をクリックして、コレクションの中から別の `DEPLOY` ステップを選択します。例えば、 `Appetize.io deploy` や `Amazon Device Farm File Directory`があります。 "%}

以上です！ビルドを開始もしくはスケジュールし、外部テスターにURLをシェアしたり、利用しているストアにアプリを配布しましょう。
