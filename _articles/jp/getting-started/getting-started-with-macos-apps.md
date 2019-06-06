---
title: MacOSのアプリ開始
date: 2018-11-16T11:51:09.000+00:00
menu:
  getting-started-main:
    weight: 37

---
このガイドでは、BitriseにMacOSアプリを追加、Xcodeテストの実行、コード署名ファイルの管理、アプリを bitrise.ioとApp Storeにデプロイする方法を説明します。

## MacOSアプリを追加

{% include message_box.html type="note" title="Bitriseアカウントはありますか？" content=" [bitrise.io](https://www.bitrise.io/)にサインアップし、アクセスできるか確認してください。GitホスティングサービスのアカウントにBitriseアカウントを接続する方法は、[4通り](https://devcenter.bitrise.io/getting-started/index#signing-up-to-bitrise)あります。"%}

1. 上部のメニューバーの`+`をクリックして`Add app`を選択します。
2. 新しいアプリの作成ページで、アプリを追加するアカウントを選択します。
3. アプリのプライバシーをPrivateまたは[Public](https://app.forestry.io/getting-started/adding-a-new-app/public-apps)に設定して`Next`をクリックします。
4. リポジトリをホストするGitホスティングサービスを選択してから、プロジェクトをホストするリポジトリを見つけて選択します。

   詳しくは[connecting your repository](https://app.forestry.io/getting-started/adding-a-new-app/connecting-your-repository)参照ください。
5. リポジトリアクセスを設定するように求められたら、`No, auto-add SSH key`をクリックします。詳しくは [SSH keys](https://app.forestry.io/getting-started/adding-a-new-app/setting-up-ssh-keys/)を参照ください。
6. プロジェクトの設定を含むブランチの名前（masterなど）を入力し、`Next`をクリックします。
7. Bitriseがプロジェクトを検証している間お待ちください。設定ファイルを探し、それらに基づいてアプリを設定します。

**重要**：プロジェクトにSHAREDスキームがない場合、検証は失敗します。Bitriseが自動的に検出するには、共有し、Xcodeスキームに手動でBitriseをポイントする必要があります。

詳しくは[Schemes and the possible issue with them](https://app.forestry.io/troubleshooting/frequent-ios-issues/#xcode-scheme-not-found)を参照してください。

  8. エクスポート方法を選択します。後で変更可能なので - `development`を選択します。

![](/img/project-build-config-macos.png)

* クリック後に、以下のものをチェックします
* プロジェクトまたはワークスペース　パス
* スキーム名
* エクスポート方法
* MacOSスタック

  9\. コードがリポジトリにプッシュされた場合、またはpull要求が作成された場合にBitriseが自動的にビルドを開始できるように、プロンプトが表示されたらwebhookに登録します。また、最初のビルドを開始でき - メッセージをクリックするとビルドページに移動します。

## Xcodeテストの実行

アプリを作成すると、最初のビルドは自動的に作成された**プライマリ**ワークフローに基づいて実行されます。ダッシュボードでをアプリの[Workflow Editor](https://app.forestry.io/getting-started/getting-started-workflows)をクリックしてから、`Workflow`タブをクリックします。

{% include message_box.html type="important" title="テストターゲット" content="アプリにテストターゲットが定義されていない場合は、プライマリワークフローが自動的に作成される唯一のワークフローになり、`Xcode Test for Mac`ステップは含まれません。"%}

テストターゲットが定義されている場合、MacOSアプリの`primary`ワークフローには、Xcodeテストを実行し、それらの結果を[bitrise.io](https://bitrise.io/)で表示するために必要な2つの[Steps](https://app.forestry.io/getting-started/getting-started-steps)が含まれています。

* `Xcode Test for Mac`
* `Deploy to Bitrise.io`

{% include message_box.html type="note" title="コード署名ファイル" content="Xcodeテストを実行してその結果をBitriseにデプロイするのにコード署名ファイルは必要ありません。"%}

The `Xcode Test for Mac` step runs the pre-defined Xcode tests. It has a default configuration that does not need to be modified: if the tests are written correctly, they will work. You can find the same configuration options in Xcode, too.

`Xcode Test for Mac`ステップは、事前定義されたXcodeテストを実行します。変更する必要のないデフォルト設定：テストが正しく書かれていれば動作します。 Xcodeにも同じ設定オプションがあります。

`Deploy to Bitrise.io`はビルドの`Logs` と [Apps & Artifacts](https://app.forestry.io/builds/build-artifacts-online/)タブに以下の二つをデプロイします。

* Xcodeテスト結果
* Raw`xcodebuildoutput`ログ。

## コード署名とMacOSアプリのエクスポート

他のデバイスにアプリをインストールしてテストするには、.appファイルまたは.pkgファイルを作成してエクスポートする必要があります。これにはコード署名の設定が必要です。この例では、`development`エクスポート方法でアプリをエクスポートします。アプリをTestflightなどににアップロードすることはできませんが、内部テスターのデバイスでテストすることはできます。

{% include message_box.html type="note" title="自動プロビジョニング" content="ここで説明する手順例では、`Certificate and profile installer`ステップを使用して手動プロビジョニングを使用しています。また、Bitriseは[自動プロビジョニング](https://app.forestry.io/code-signing/ios-code-signing/ios-auto-provisioning/)もサポートしていますが、このガイドにはありません。"%}

必要になるのは:

* 自動的に作成された`deploy`ワークフロー
* **開発**用証明書（a.p12証明書ファイル）
* **開発**型プロビジョニングプロファイルMacOSプロジェクトの場合、プロビジョニングプロファイルのファイル拡張子は.provisionprofileです。

1. Xcodeでプロジェクトのコード署名タイプを手動または自動（Xcode管理）に設定し、パッケージファイルをローカルに作成します。
2. [the codesigndoc tool](https://app.forestry.io/code-signing/ios-code-signing/collecting-files-with-codesigndoc/)を使用してコード署名ファイルを収集してアップロードします。このツールは、コード署名ファイルをBitriseにアップロードすることをおすすめします。それ以外の場合は、手動でアップロード:ワークフローエディタを開き、`Code signing`タブを選択してから、それぞれのフィールドにファイルをアップロードします。
3. アプリのWorkflow Editorに移動し、左上隅の`WORKFLOW`ドロップダウンメニューで`deploy`ワークフローを選択します。
4. `Xcode Archive for Mac` **ステップの前に**`Certificate and profile installer`ステップがワークフローに含まれていることを確認します。（2つのステップ間に、`Xcode Test for Mac`のような他のステップを含むことができます）。
5. `Xcode Archive for Mac`の`app/pkg export configs`入力の下にある`Export method`入力を確認します。 アプリをBitriseに追加したときに`development`を選択した場合は、入力を変更する必要はありません。それ以外の場合は、手動で`development`に設定してください。
6. [ビルドを開始](https://app.forestry.io/builds/starting-builds-manually/)

正しいコード署名ファイルをアップロードした場合は、`Certificate and profile installer`ステップでコード署名ファイルをインストールし、`Certificate and profile installer`ステップで開発用のエクスポート方法を使い.appまたは.pkgファイルをエクスポートする必要があります。ワークフローに`Deploy to Bitrise.io`ステップがある場合、ビルドページの`Apps & Artifacts`タブにバイナリパッケージファイルを確認します。

## App Storeにデプロイ

コード署名ファイルを設定し、内部テスター用に.appまたは.pkgファイルを作成した場合は、外部テスターを巻き込んでから、MacOSアプリをApp Storeに公開します。方法は以下に！

{% include message_box.html type="note" title="開発者ID" content="App Store以外でアプリを分散する場合は、[開発者ID](https://developer.apple.com/support/developer-id/)で署名することができます。この方法はこのガイドのにはありませんが、Bitriseでも同じように機能します。適切なコード署名ファイルをアップロードするだけです。"%}

App Storeにデプロイするには、さらに多くのコード署名ファイルが必要になります:

* **Macアプリ配布**証明書
* **Macインストーラ配布**証明書

1. ローカルマシンで、XcodeでプロジェクトのApp Storeコード署名を設定し、.appまたは.pkgファイルをエクスポートします。ローカルで失敗した場合、Bitriseでも間違いなく失敗します。
2. [the codesigndoc tool](https://app.forestry.io/code-signing/ios-code-signing/collecting-files-with-codesigndoc/)を使用してコード署名ファイルを収集してアップロードします。
3. アプリのWorkflow Editorに移動して[新しいワークフロ](https://app.forestry.io/getting-started/getting-started-workflows/)ーを作成します。`Workflow`ボタンをクリックし、新しいワークフローの名前を入力して、**BASED ON**ドロップダウンメニューで`deploy`を選択します。これが新しいワークフローは基本的な`deploy`ワークフローのコピーになります。
4. `Xcode Archive for Mac`ステップの`Export Method`入力を`app-store`に設定します。

   異なるエクスポート方法で複数のバイナリをエクスポートすることができます:ワークフローで`Export macOS Xcode archive`Stepを使用します。
5. `Xcode Archive for Mac` ステップの後、できれば、`Deploy to Bitrise.io`ステップの前に、`Deploy to iTunes Connect - Application Loader`ステップをワークフローに追加します。
6. `Deploy to iTunes Connect - Application Loader`ステップでAppleの資格情報を入力します。

   ステップが必要とするのは：
   * Apple ID
   * パスワード、またはiTunes Connectで2要素認証を使用する場合はアプリケーションパスワード

     パスワードがログに表示されたり公開されたりすることはありません。なので[SENSITIVEとマークされています](https://app.forestry.io/builds/env-vars-secret-env-vars#about-secrets)

以上です！ビルドを開始しましょう！ - 適当であればTestflightでアプリが見つかるはずです。そこから、外部のテスターに​​配布したり、App Storeに公開したりできます！