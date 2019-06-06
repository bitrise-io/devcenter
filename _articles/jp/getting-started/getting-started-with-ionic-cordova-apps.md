---
title: Ionic/Cordovaアプリの開始
date: 2018-11-16T14:33:48.000+00:00
redirect_from: []
menu:
  getting-started-main:
    weight: 35

---
Cordova/Ionicフレームワークを使いクロスプラットフォームアプリを開発することができます。iOSやAndroidのアプリをそれぞれの電子市場に迅速に送ることができるように、Bitriseは、テストの自動化、コード署名、デプロイ手順をサポートします。組織に複数の同時実行性がある場合は、Android/iOSビルドを同時に実行することができます。

プロセス:

* [Ionic/Cordovaプロジェクトセットアップ前]()
* [BitriseにIonic/Cordovaを追加する方法]()
* [依存関係](/getting-started/getting-started-with-ionic-cordova-apps/#dependencies)
* [Ionic/Cordovaアプリのテスト](/getting-started/getting-started-with-ionic-cordova-apps/#testing-ioniccordova-apps)
* [コード署名](/getting-started/getting-started-with-ionic-cordova-apps/#code-signing)
* [Ionic/Cordovaアプリのデプロイ](/getting-started/getting-started-with-ionic-cordova-apps/#deploying-ioniccordova-app)

## Ionic/Cordovaプロジェクトセットアップの前に

[bitrise.io](https://www.bitrise.io/)にサインアップして、Bitriseアカウントにアクセスできることを確認してください。 GitホスティングサービスのアカウントにBitriseアカウントを接続する方法は、[4通り](https://devcenter.bitrise.io/getting-started/index#signing-up-to-bitrise)あります。

## BitriseにIonic/Cordovaを追加

 1. [bitrise.io](https://www.bitrise.io/)にログインします。
 2. ダッシュボードの`+ Add new app`をクリックします。
 3. `Create new App`ページからアプリを追加したいアカウントを選びます。
 4. アプリのプライバシーをprivate、または [public](https://yv69yaruhkt48w.preview.forestry.io/getting-started/adding-a-new-app/public-apps)に設定し、`Next`をクリックします。
 5. リポジトリをホストするGit hostingサービスを選択し、プロジェクトをホストするあなたのリポジトリを選択します。詳細は[connecting your repository](https://yv69yaruhkt48w.preview.forestry.io/getting-started/adding-a-new-app/connecting-a-repository/)を参照してください。
 6. リポジトリアクセスを設定するように求められたら、`No, auto-add SSH key`をクリックします。 詳細は[SSH keys](https://yv69yaruhkt48w.preview.forestry.io/getting-started/adding-a-new-app/setting-up-ssh-keys/)を参照してください。
 7. プロジェクトの設定を含むブランチの名前（`master`など）を入力し、`Next`をクリックします
 8. Bitriseがプロジェクトを検証している間お待ちください。設定ファイルを探し、それらに基づいてアプリを設定します。
 9. `Project Build configuration`では、アプリをビルドするプラットフォームを選択できます:
    * iOS
    * Android
    * iOS と Android (Androidビルドが最初にビルドされる

       ![](https://devcenter.bitrise.io/img/project-build-cordova.png)

      ![](https://devcenter.bitrise.io/img/project-build-ionic.png)
10. コードがリポジトリにプッシュされたときにBitriseが自動的にビルドを開始できるように、Promptedが表示されたらWebフックに登録します。メインのワークフローでの最初のビルドも開始できます。 また、メッセージをクリックするとビルドページに移動します。最初のビルドではAPKと.ipaは作成されませんが、ビルドのページでプロジェクトのログを確認できます。

    例として、`Karma Jasmine Test Runner`ステップを含むCordova**主要ワークフロー**を確認してください。

        {% raw %}
        primary:
        steps:
        - activate-ssh-key@4.0.3:
        run_if: '{{getenv "SSH_RSA_PRIVATE_KEY" | ne ""}}'
        - git-clone@4.0.11: {}
        - script@1.1.5:
        title: Do anything with Script step
        - npm@0.9.1:
        inputs:
        - command: install
        - karma-jasmine-runner@0.9.1: {}
        - deploy-to-bitrise-io@1.3.15: {}
        {% endraw %}

{% include message_box.html type="info" title="他のテストフレームワークを使うのは？" content="BitriseのスキャナーがJasmin、Karma Jasmineのテスト解決法を知っていることは言及する価値があります。プロジェクトが別のテストフレームワーク/ランナーを使用している場合、スキャナーはテストワークフロー（primaryワークフロー)を作成することはできませんが、代わりにビルドワークフローを作成できます。このワークフローは作成される唯一のワークフローであるため、primaryワークフローと呼びます。" %}

## 依存関係

アプリの`package.json`ファイルに記載されているJavascript dependenciesをインストールするには、`Run npm command`または`Run yarn command`のステップを使用できます。

`Run npm command`ステップは、デフォルトパートのプライマリワークフローとデプロイワークフローによるものです。 `Run npm command`ステップで、`The nmp command with arguments to run`フィールドが`install`に設定されていることを確認します。

![](https://devcenter.bitrise.io/img/run-nmp.png)

`The 'yarn' command to run`入力フィールドを空のままにするか、または`install`に設定します -  `Run yarn command`ステップはどちらかの方法でdependencies（依存関係）をインストールします。

## Ionic/Cordovaアプリのテスト

`Karma Jasmine Test Runner`または `Jasmine Test Runner` のステップによるユニットテストを実行します。 Cordova / Ionicプロジェクトの`package.json`ファイルにKarma Jasmineの依存性がある場合は、スキャナーによってそれが検出され、それぞれのテストステップがワークフローに自動的に追加されます。依存性がプロジェクトにない場合は、 Workflow Editor を使用して手動でワークフローにステップの1つを追加できます。`Run nmp command`または`Run yarn command`パッケージマネージャーステップの直後にするようにしてください。

## コード署名

iOSまたはAndroid用のアプリを作成したい場合は、プラットフォーム-スペシフィックファイルをWorkflow Editorの`Code Signing`タブにアップロードする必要があります。**プラットフォームのすべてのコード署名ファイルをアップロード**し、両方のプラットフォーム用にビルドを作成することもできます。（すべて1ページにまとめられています。）

### iOSプロジェクトに署名

iOSプロジェクトに署名するには、`Cordova Archive`と`Ionic Archive`のステップで設定したディストリビューションとコード署名の種類に応じて、コード署名証明書とプロビジョニングプロファイルをアップロードする必要があります。早速始めよう！

1. `cordova platform add ios`または `ionic cordova platform add ios`による、IonicまたはCordovaプロジェクトからネイティブXcodeプロジェクトをローカルに作成します。
2. [コード署名ファイルを収集する](https://devcenter.bitrise.io/code-signing/ios-code-signing/collecting-files-with-codesigndoc/)には、`codesigndoc`ツールを使用します。
3. ファイルを [bitrise.io](https://www.bitrise.io/)にアップロードします。

   WebサイトのUIまたは`codesigndoc`ツールのどちらでも実行できます。

   ![Screenshot](https://yv69yaruhkt48w.preview.forestry.io/img/code-signing/ios-code-signing/provisioning-and-certificate-upload.png)
4. ステップで仮想マシンに証明書をダウンロードしてインストールできるように、ワークフローの`Certificate and profile installer`ステップを確認します。
5. ワークフローに`Generate cordova build configuration`ステップを追加します。 （このステップでは、次のステップに必要なすべての設定、`Cordova Archive`または`Ionic Archive`を実行します。）`Certificate and profile installer`ステップの後に行います。
6. ステップに必要な入力を記入してください。`Code Signing Identity`と`Provisioning Profile`はどちらも、**以下のようにマークがされていなくても、**iOSアプリの必須入力です。

* `Build configuration`：`debug`または`release`のどちらかに設定できます。
* `Code Sign Identity`：開発者またはディストリビューションIDを入力します。
* `Provisioning Profile`：適切なProvisioning Profileを入力します。
* `Packaging Type`：どのようなタイプのビルドがXcodeによって作成されるかをコントロールします。また、コード署名の種類を設定します。

  Ionic / Cordovaコード署名の詳細については [guide](/code-signing/ios-code-signing/ionic-cordova-code-signing/)を参照してください。

### Androidプロジェクトに署名

1. 署名済みのAndroidプロジェクトの場合は、Workflow Editorの`Code Signing`タブへ。
2. `ANDROID KEYSTORE FILE`セクションの`Upload file`項目でkeystoreファイルをクリックまたはドラッグ＆ドロップします。 ![](/img/keystore-file.png)
3. 3つの入力項目に記入します:
   * `keystore password`
   * `keystore alias`
   * `private key password`

   ![](/img/keystore.png)
4. `Save metadata`をクリックします。 Bitriseはkeystoreファイルをアップロードし、環境変数(`BITRISEIO_ANDROID_KEYSTORE_URL`)をバリューとしてファイルのダウンロードURL（時間制限のある、読み取り専用のダウンロードURL）に対応させます。このURLを使用して、次のビルド中にkeystoreファイルをダウンロードできます。このステップでは、後のステップで使用される以下のの環境変数が作成されます。
   * `$BITRISEIO_ANDROID_KEYSTORE_URL`
   * `BITRISEIO_ANDROID_KEYSTORE_PASSWORD`
   * `$BITRISEIO_ANDROID_KEYSTORE_ALIAS`
   * `$BITRISEIO_ANDROID_KEYSTORE_PRIVATE_KEY_PASSWORD`
5. コードがない場合は、`Generate cordova build configuration`ステップをワークフローに追加します。
6. keystoreファイルを`Code Signing`タブにアップロードし、ステップ2と3でメタデータを追加したので、Androidの必要入力項目（`Keystore`, `Keystore password`, `Alias` ,`Password`）はすでに入力されています。これらの情報に基づき`Generate cordova build configuration`で便利に使用できる環境変数が作成されます。

## Ionic/Cordovaアプリをデプロイ

アプリをデプロイする場所により構成はそれぞれ異なります。

アプリを電子市場にデプロイする前に、コード署名された.ipaやAPKを作成する必要があるので、以下のステップを行ってください。

1. `Cordova archive`または`Ionic archive`ステップをワークフローに追加します。 （iOSとAndroidの両方を1つのプロジェクトで構築している場合、どちらかのアプリが失敗すると、`Cordova Archive/Ionic Archive`ステップ全体が失敗します。）
2. 必要な情報を入力します:

* `Platform`入力は`device`に設定が必要です。
* `Build command configuration`入力は、`Generate cordova build configuration`ステップの`Build configuration`入力と一致していなければなりません。  アーカイブステップは、ワークフローの`Generate cordova build configuration`ステップの後にに行う必要があります。

![](/img/cordova-archive-1.png)

デプロイの準備が完了！ワークフローにデプロイステップを追加して、iOSおよびAndroidプロジェクトを公開する方法を見てみましょう！

### App Store Connectにデプロイ

1. `Cordova Archive` もしくは `Ionic Archive`ステップの後、できれば`Deploy to Bitrise.io - Apps, Logs, Artifacts`ステップの前に、`Deploy to iTunes Connect - Application Loader`ステップをワークフローに追加します
2. `Deploy to iTunes Connect - Application Loader`ステップでAppleのアカウント情報を入力します。

ステップに必要なもの:

* Apple ID
* パスワード、もしくは、iTunes Connectで2要素認証を使用する場合、アプリケーションパスワード

  パスワードは表示されません！

  \- [that’s why it is marked SENSITIVE](https://yv69yaruhkt48w.preview.forestry.io/builds/env-vars-secret-env-vars#about-secrets)

### Google Play Storeにデプロイ

開始する前に:

* [Google Play Storeに登録、プロジェクトをセットアップ](https://devcenter.bitrise.io/tutorials/deploy/android-deployment/#register-to-google-play-store-and-set-up-your-first-project)を確認します。
* [Google Play API access](https://devcenter.bitrise.io/tutorials/deploy/android-deployment/#set-up-google-play-api-access)にセットアップしているか確認します。

1. Bitrise `Dashboard`で、`Code Signing`タブに移動し、サービスアカウントのJSONキーを`GENERIC FILE STORAGE`にアップロードします。
2. アップロードしたファイルのURLのあるenvキーをコピーします。例えば、`BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
3. デプロイワークフローの`Cordova Archive`または`Ionic Archive`ステップの後に`Google Play Deploy`ステップを追加します。
4. 入力欄へ記入:
   * `Service Account JSON key file path`：このフィールドはリモートURLを受け入れることができるため、アップロードしたサービスアカウントのJSONキーを含む環境変数を指定すします。

     例: `$BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
   * `Package name`：Androidアプリのパッケージ名
   * `Track`：APKをデプロイするトラック(alpha/beta/rollout/production)

### Bitriseにデプロイ

ワークフローに`Deploy to Bitrise.io - Apps, Logs, Artifacts`ステップを追加します。すべてのビルドアーティファクトが、ビルドのページの`APPS & ARTIFACTS`タブにアップロードされます。

ビルドのURLを使用して、作成された.ipaまたはAPKをチームメンバーと共有できます。また、 .ipa、もしくはAPKが構築されたことをユーザーグループまたは個々のユーザーに通知することもできます。

1. `Deploy to bitrise.io - Apps, Logs, Artifacts`ステップに進みます。
2. `Notify: User Roles`でロールを追加するとロールを与えられたユーザーにのみ通知がいきます。または、`Notify: Emails`に通知したいユーザーのメールアドレスを[secret env vars](/builds/env-vars-secret-env-vars/)として設定し入力します。`APPS & ARTIFACTS`タブで作成されたAPK / .ipaファイルの横にあるの`eye`アイコンをクリックすると、詳細を`Notifications`で変更することもできます。

ビルドを始めよう！アプリが正しく設定されていれば、選択した電子市場にデプロイされていることがわかります！