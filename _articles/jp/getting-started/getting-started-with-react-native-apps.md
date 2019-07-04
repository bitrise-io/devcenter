---
title: React Nativeアプリの開始
menu:
  getting-started-main:
    weight: 26

---
BitriseではReact Nativeプロジェクトを簡単にセットアップ・構成が行なえます。あなたのReact Nativeレポ内にAndroidとiOSプロジェクトの両方を保存できますので、設定はAndroid、iOSアプリそれぞれの手順で行うことができます。React Nativeプロジェクトでは、初めにAndroid、その次にiOSのビルドが実行されます。組織が２つ以上のコンカレンシーをお持ちの場合は、並行して両方のビルドを走らせることができます。

## React Nativeプロジェクトのセットアップ前に

まず[bitrise.io](https://www.bitrise.io)にサインアップしていることを確認し、Bitriseアカウントにアクセスできることを確認してください。もしまだであれば、それを完了するための[４つの方法](/jp/getting-started/index#signing-up-to-bitrise)がございます。

## bitrise.ioにReact Nativeプロジェクトを追加する

このチュートリアルでは、サンプルアプリを使用します。では始めましょう！

1. bitrise.io にログインする
2. `Add a new app` をクリックします。
3. アプリのプライバシー設定を行う：**private** もしくは [**public**](/jp/getting-started/public-apps/)
4. あなたのレポジトリをホストするGitホスティングサービスを選びます。その後、プロジェクトをホストするご自身のレポジトリを選択してください。詳しくは[レポジトリを接続する](/getting-started/adding-a-new-app/connecting-a-repository/)をお読みください。
5. レポジトリのアクセス設定が完了したら、`No, auto-add SSH key`をクリックします。詳しくは[SSH keys](https://devcenter.bitrise.io/getting-started/adding-a-new-app/setting-up-ssh-keys/)をお読みください。
6. プロジェクトのコンフィギュレーションに含まれるブランチの名前を入力します（例：master）。選んだら`Next` をクリックします。
7. `Validating repository` では、自動的にレポスキャナーが発動しプロジェクトの最適なコンフィグをセットアップします。
8. `Project build configuration` では、お好きなビルド設定を選択してください。
   * React Native プロジェクトでは、選択した**project type**として`React Native` を確認することができます。スキャンが失敗しproject typeが自動的に選択されていない場合、手動によるプロジェクト設定を行えます。Androidが自動的に`The root directory of an Android app` 上で選択されていることが確認できます。
   * プロジェクトに１つのモジュールだけが含まれている場合、そのモジュールは自動的に`Module`として選択されます。２つ以上のモジュールが含まれるプロジェクトでは、その中から１つモジュールを選択することができます。（一つのメインモジュールをおすすめします）
   * `Select variant for building` のフィールドでは、プロジェクトに合ったバリアントを選択してください。`Select All Variants`は全てのバリアントのビルドを行います。APKや.ipaファイルを生成する場合は、`debug` か `release` を選んでください。
   * `Project (or Workspace) path field` では、あなたのXcode project もしくは Xcode Workspace path を選択してください。
   * `Select Scheme name`  
     スキャン検証はあなたのプロジェクト内にシェアされたスキームがないと失敗します。手動でXcode scheme をBitriseに追加することもできますが、仮にシェアされている状態であれば、自動的に探知します。詳しくは、[スキームに関する問題](/jp/troubleshooting/frequent-ios-issues/#xcode-scheme-not-found)をお読みください。
   * `Select ipa export method` では、.ipaファイルのエクスポートする方法を選択します：`ad-hoc`、`app-store`、`development` か`enterprise` のいずれかを選ぶことができます。
9. `Webhook setup`では、Webhookに登録済であれば、レポジトリにコードがプッシュされると毎回自動的にビルドが開始されます。

{% include message_box.html type="note" title="Settings tab" content=" これらの設定はいつでも`Settings` ページから修正することができます。Stackについては、Workflow Editorの`Stack` タブより変更ができます。" %}

これで[bitrise.io](https://www.bitrise.io)上でのReact Nativeプロジェクトのセットアップが完了です！最初のビルドはprimary workflowを使用すると自動的に開始されます。ビルドページ内の`APPS & ARTIFACTS` タブより最初のビルドの生成されたレポートを確認することができます。

## 依存関係 (dependencies) のインストール

### Javascript dependencies

Bitriseスキャナーがプロジェクトのスキャンに成功すると、`Run npm command` もしくは `Run yarn command` ステップがワークフローに含まれるようになります。

`Run npm command`では、インプットフィールドの`npm command with arguments to run` に`install` と入力してください。そうすれば、あなたのプロジェクトにJavascript依存関係が追加されます。

![](/img/run-nmp.png)

`Run yarn command` があなたのプロジェクトに自動でJavascript dependenciesをインストールします。ステップを手動で設定する必要はありません。

### Native dependencies

`Install missing Android tools`ステップは、あなたのAndroidプロジェクトに不足しているNative dependenciesをインストールします。このステップは、あなたのデプロイワークフローにデフォルトで入っています。

iOSのdependenciesは `Run CocoaPods install` ステップをワークフローに追加することで入手することができます。これはデフォルトのワークフローではありません。

## Code signing　コード署名

React Native アプリは２つのプロジェクト（Android と iOS）で構成されており、両方とも適切にコード署名されている必要があります。プロジェクトのWorkflow Editor内の`Code Signing`をクリックすると、全てのiOSとAndroidコード署名欄が表示されます。

では、手順を見ていきましょう！

### Androidプロジェクトの署名

1. アプリのWorkflow Editorの上段左側にある`WORKFLOW`ドロップダウンメニューより`deploy`ワークフローを選択します。
2. `Code Signing` タブをクリックします。
3. あなたのKeystoreファイルを`ANDROID KEYSTORE FILE`へドラッグアンドドロップします。
4. `Keystore password`、`Keystore alias`と`Private key password`を入力し、`Save metadata`をクリックします。

   これらの情報は前もって準備しておく必要があります。Bitriseにアプリをアップロードする前に、Android Studioで生成されたKeystoreファイルにそれらの情報が含まれていなければなりません。Keystoreファイルについては、[こちら](https://developer.android.com/studio/publish/app-signing)を参照してください。

   `Code Signing`タブにこれらの情報が追加されてると、Bitriseの`Android Sign Step` （Androidデプロイワークフローにデフォルトで含まれています）がAPK署名の処理をするので、これで配布への準備は完了です！

{% include message_box.html type="info" title="Androidコード署名についての詳しい情報" content=" コード署名のオプションについての詳しい情報は[Androidコード署名ガイド](/jp/code-signing/android-code-signing/android-code-signing-procedures/)を参照してください。"%}

![](/img/android-code-signing-react.png)

これでAndroidのコード署名は完了です！

### テストにおけるiOSプロジェクトの署名とエクスポート

iOSプロジェクトのコード署名はエクスポートされた.ipaファイルの用途により異なります。ここのセクションでは、**内部のテスターによって登録されたデバイスでインストール・テスト**を行う際のコード署名を紹介します。テスター同士でプロジェクトの共有をするには、`development`のエクスポート手段を使用した.ipaファイルが必要です。

.ipaファイルをapp storeへアップロードするには、ここを確認してください。

{% include message_box.html type="note" title="自動プロビジョニング" content=" `Certificate and profile installe` ステップより手動によるプロビジョニング法についての手順を載せております。Bitriseは[自動プロビジョニング](/jp/code-signing/ios-code-signing/ios-auto-provisioning/)のサポートもしております。 "%}

必要な情報：

* 自動的に作成された`deploy`ワークフロー
* iOS **Development** 証明書 (a .p12 certificate file)
* **Development**タイプのプロビジョニング・プロファイル

1. あなたのプロジェクト上での、手動もしくは自動（Xcode）のいずれかのコード署名方法を設定します。ローカルで.ipaファイルの生成を行ってください。
2. [the codesigndoc tool](/jp/code-signing/ios-code-signing/collecting-files-with-codesigndoc/)を使ってコード署名ファイルの収集とアップロードを行ってください。このツールはBitriseへコード署名ファイルをアップロードすることも可能なので、この機能を使うことをおすすめします！

   手動でアップロードすることもできます：Workflow Editorを開いて、`Code signing` タブを選択してください。その後、各自のフィールドにファイルのアップロードを行ってください。
3. アプリのWorkflow Editorに進み上部左端にあるドロップダウンメニューの`WORKFLOW`内の`deploy`ワークフローを選択してください。
4. `Certificate and profile installer`ステップがあなたのワークフロー内にあることを確認してください。このステップは、`Xcode Archive & Export for iOS`ステップの前にある必要があります（これらの２つのステップの間に、 `Xcode Test for iOS`のような他のステップを含めることができます。）
5. `Xcode Archive & Export for iOS` ステップ内にある `Select method for export` インプットを確認してください。デフォルトの環境変数は  `$BITRISE_EXPORT_METHOD`

   となっています。この変数はアプリの作成中に選択したエキスポート手段を保存します。もし以前に`development`を選択していたら、ここではインプットを変更する必要はありません。そうでなければ、`development`にマニュアルでセットしてください。

   _![Export method env var](/jp/img/export-method-envvar.png)_
6. [ビルドを開始します](/jp/builds/starting-builds-manually/)。

正確なコード署名ファイルがアップロードされていると、`Certificate and profile installer` ステップがあなたのコード署名ファイルをインストールし、`Xcode Archive & Export for iOS` ステップが**development export method** を用いて.ipa ファイルのエクスポートを行います。ワークフローに`Deploy to Bitrise.io` ステップがあれば、ビルドページ上の `APPS & ARTIFACTS` タブより.ipaファイルを見つけることができます。

{% include message_box.html type="info" title="iOSコード署名について" content=" iOSコード署名は普通こんなに簡単ではありません。詳しくは[BitriseでiOSコード署名をする方法](/jp/code-signing/ios-code-signing/code-signing)をご確認ください。"%}

### iOSプロジェクトのデプロイ作業のための署名・エクスポート

内部のテスターのためのコード署名ファイルのセットアップ、.ipaファイルの作成をした場合、次の手順は**外部のテスターを伴ってApp StoreへあなたのiOSアプリを公開してください**。

TestflightとApp Storeへデプロイするためには、他のコード署名ファイルが必要になります：

* iOS配布証明書
* Provisioning Profile（プロビジョニングプロファイル）（App Store）

1. ローカルマシンで、Xcode上でのプロジェクトのApp Storeコード署名をセットアップし、App Storeの.ipaファイルをエクスポートしてください。ローカルマシンで失敗すれば、Bitrise上でも間違いなく失敗しますのでお気をつけください！
2. [the codesigndoc tool](/jp/code-signing/ios-code-signing/collecting-files-with-codesigndoc/)を使ってコード署名ファイルの収集とアップロードを行ってください。
3. アプリのWorkflow Editorより[新しいワークフロー](/jp/getting-started/getting-started-workflows/)を作成してください：`+ Worlflow` ボタンをクリック、新規のワークフロー名を入力し `deploy` を**BASED ON** ドロップダウンメニューより選択してください。この方法により、新規のワークフローがベーシックの`deploy`ワークフローのコピーになります。
4. `Xcode Archive & Export for iOS` ステップより `Select method for export`のインプットを`app-store`にセットしてください。

   ![App store export](/img/app-store-export.png)

   Testflightへアプリのアップロードを行わずに外部のテスターにアプリを配布する場合、`ad-hoc`を選択しあなたのワークフロー上に`Deploy to Bitrise.io`ステップがあることを確認してください。

## Test your project　プロジェクトのテスト

`jest`と呼ばれる、React Nativeのビルドにおけるテスト方法があります。ワークフローに`Run nmp command` ステップを追加し、 `npm command with arguments to run` のフィールドに`test`と入力してください。

![](/img/run-nmp-test.png)

## Bitriseにデプロイする

`Deploy to bitrise.io` ステップでは、あなたのビルド関連の全てのアーチファクトがBuildページの[APPS&ARTIFACTS](https://devcenter.bitrise.io/builds/build-artifacts-online/)タブへアップロードされます。

ビルドのURLを使用しているチームメンバーと生成されたAPKまたは.ipaファイルを共有することができます。あなたのAPKまたは.ipaファイルがビルドされた場合も、ユーザーグループや個人ユーザーへの通知を行います。

1. `Deploy to bitrise.io` ステップに進みます。
2. `Notify: User Roles` では、role（役割）を追加すると、ある一定の役割が与えられたユーザーのみに通知されます。あるいは、`Notify: Emails` の欄に通知したいユーザーのメールアドレスを入力すると、そのメールアドレスへ通知が行われます。この場合、入力するメールアドレスに[シークレット環境変数](https://devcenter.bitrise.io/builds/env-vars-secret-env-vars/)が設定されていることを確認してください。こういった詳細については、`Notifications`で修正することができます。　`APPS & ARTIFACTS`タブ上の、生成されたAPKまたは.ipaファイルの隣りにある`eye` アイコンをクリックしてください。

## App Storeへのデプロイ

iOSアプリのデプロイ作業を行う方は、Code sign your iOS project for deploymentにあるステップに従ってください。

### iOSアプリをTestflightあるいはiTunes Connect にデプロイする

{% include message_box.html type="重要" title="すでに`app-store`の.ipaファイルのエクスポートが完了していますか？" content=" マーケットプレイスへのデプロイ作業を進める前に、`app-store`へ.ipaファイルのエクスポートが完了しているか確認してください。"%}

1. `Xcode Archive & Export for iOS` ステップを追加した後、ワークフローに `Deploy to iTunes Connect - Application Loader` ステップを追加します（`Deploy to Bitrise.io` ステップの前が好ましい）。

   `Deploy to iTunes Connect - Application Loader` ステップにAppleアカウント情報を入力します。

   このステップで必要な情報；
   * Apple ID
   * パスワード、もしくはiTunes Connectの二要素認証を使用している場合はアプリのパスワード

   パスワードがログ上で見えたりすることはありませんのでご安心ください。（[それ故SENSITIVEがマークされております](https://devcenter.bitrise.io/builds/env-vars-secret-env-vars#about-secrets)）
2. [ビルドを開始します](/jp/builds/Starting-builds-manually/)。

   全てが成功すれば、アプリをTestflightで確認することができます。そこから、外部テスターへ配布したり、App Storeに出品することも可能です。

### AndroidアプリをGoogle Play ストアにデプロイ

{% include message_box.html type="重要" title="Androidコード署名" content=" `ANDROID KEYSTORE FILE` の欄にkeystoreファイルがアップロードされているか確認してください。"%}

1. Google Play ストアに同期されていることを確認してください。

   ・[Google Play ストアへの登録・プロジェクトのセットアップ](/jp/tutorials/deploy/android-deployment/#register-to-google-play-store-and-set-up-your-first-project)

   ・[Google Play APIアクセス](/jp/tutorials/deploy/android-deployment/#set-up-google-play-api-access)のセットアップ
2. Bitriseの`Dashboard`で、`Code Signing` タブに進み`GENERIC FILE STORAGE` にサービスアカウントのJSONキーをアップロードします。
3. アップロードしたファイルのURLを保存しているenvキーをコピーします。例：`BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
4. `Android Sign` ステップがデプロイワークフローにあることを確認したら、`Google Play Deploy` ステップを追加します。
5. 以下に従って必要事項の記入を行ってください：
   * `Service Account JSON key file path`：このフィールドはリモートURLを受け付けるので、アップロードしたサービスアカウントのJSONキーが含まれた環境変数を入力してください。（例） `$BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
   * `Package name` ：あなたのAndroidアプリのパッケージネーム
   * `Track` ：あなたのAPKをどこにデプロイするのかを入力するtrack (alpha/beta/rollout/production)

これで完了です！ビルドを開始してAndroidアプリの出品ができます。