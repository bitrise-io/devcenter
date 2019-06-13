---
title: Androidのデバイステスト
menu:
  testing-main:
    weight: 14

---
BitriseのAndroidデバイステストソリューションを用いることで、デバイスのセットアップや登録を行うことなく、エミュレータ上でUIテストを実行できます。

{% include message_box.html type="note" title="制限について" content="ビルド時間によって制限される場合があります。また、1つのビルドには1種類のテスト(`instrumentation`、`robo`または`gameloop`）を実行する`[BETA] Virtual Device Testing`ステップを1つだけ含めることができます。  "%}

デバイステストソリューションは[Firebase Test Lab](https://firebase.google.com/docs/test-lab/)をベースとしています。 実行結果のログ、ビデオ、スクリーンショットはBitriseで閲覧することができます。

## デバイステストを有効化

1. はじめにアプリの`Settings`タブ上で`Device Testing`をONにします。`Device Testing`の右上隅にあるスイッチを右に切り替えます。

   ![](/img/enable-ui-test-on-virtual-devices.png)
2. `Settings` ページからアプリの `Build` ページに移動します。
3. テストを行うビルドをクリックします。
4. もし`Step 1`でデバイステストを有効にしていれば、`APPS & ARTIFACTS`の次に3番目のタブ`DEVICE TESTS BETA` が出現するのでこれをクリックします。

   ![](/img/builds-device tests.png)
5. `add step to primary workflow`をクリックして、デバイステストに必要な2つのステップを`primary workflow`に追加します。
   * `Android Build` - テストのためにapkを生成するステップ
   * `[BETA] Virtual Device Testing for Android` - テストを実行しテストレポートを生成するステップ

   ![](/img/add-step-to-primary-workflow.png)

## テストの実行

Bitriseでは3つのテストタイプから選択可能です。

* robo (default test type in Bitrise)
* instrumentation
* gameloop

もしテストタイプの違いを知りたい場合は[Firebase's documentation](https://firebase.google.com/docs/test-lab/android/overview)をご覧ください。
RoboテストとInstrumentationテストでは設定方法に少し違いがありますので、別々に見てみましょう！

### Roboテストの実行

1. `Workflow Editor`でビルドの`primary workflow`を開きます。
2. APKをエクスポートするため、`Android Unit Test`ステップの後に`Android Build`ステップを追加します。
3. `Variant`の入力欄に`Debug`を追加してください。これにより、ビルドのAPKパスを含む環境変数が準備されます。この環境変数は次のステップで必要になります。

   ![](/img/robo-test.png)
4. `Android Build`ステップの後に`[BETA] Virtual Device Testing for Android`を追加します。
5. `APK path`の入力欄を設定します。
6. `Test type`に`robo`が選択されていることを確認してください。
7. `Test devices`入力欄にテストデバイスのタイプを追加します。デフォルト以外のデバイスを選択する場合、`,`で区切った `deviceID,version,language,orientation`のフォーマットで入力する必要があります。

   ![](/img/robo-test-1.png)
   
   利用可能なデバイスの一覧は[こちら](https://firebase.google.com/docs/test-lab/android/available-testing-devices)で確認してください。
8. ビルドを開始し、[テスト結果を確認](/jp/testing/device-testing-for-android/#テスト結果の確認)します。

#### Roboテストを成功させるためのRobo Directivesを使ったユーザー入力の設定

Roboテストを成功させるために、アプリが特定のユーザー操作を必要とする場合、`Robo Directives`入力フィールドを使ってそれらの必要な入力を設定することができます。たとえば、アプリの特定のUI要素は必要なユーザー入力(ユーザー名とメールアドレス)がログイン用に入力されている場合にのみ、Roboテストにアクセスできます。

1. ワークフローの`[BETA] Virtual Device Testing for Android`ステップをクリックします。
2. `Robo Test`セクションをクリックします。
3. `Robo directives`入力フィールドに、必要なユーザー入力ディレクティブを設定します。
   * カンマ区切りのkey-valueリストを提供してください。**key**はターゲットUI要素のAndroidリソース名、**value**はテキスト文字列です。EditTextフィールドはサポートされていますが、WebView UI要素のテキストフィールドはサポートされていません。たとえば、カスタムログインに次のパラメータを使用できます。

         username_resource,username,ENTER_TEXT
         password_resource,password,ENTER_TEXT
         loginbtn_resource,,SINGLE_CLICK
   * 行ごとに1つのディレクティブを定義し、パラメータは`,`で区切ります。例: `ResourceName,InputText,ActionType`

![](/img/robo-directives.png)

指定した入力に基づき、(特定のユーザー入力でしかアクセスできないページであっても)正常にRoboテストを実行できます。また、ビルドページの`DEVICE TESTS`タブ内でテスト結果を確認できます。 テスト結果は次のようになります。

* エミュレータ画面の最終状態のスクリーンショット
* 録画ビデオ
* ログ
* ファイル

以下は成功したRoboテストのスクリーンショットです。Roboテストは`Robo directives`によって事前に定義された`email`と`password`のフィールドを注入することで`My application`のテストは通りました。

![](/img/successful-robo-test.jpg)

### Instrumentationテストの実行

1. `Workflow Editor`でビルドの`primary workflow`を開きます。
2. `Android Build for UI testing`をワークフローに追加します。
3. APKとテストAPKを出力するには、`Android Build for UI testing`ステップで以下の入力フィールドを設定する必要があります。
   * `Project Location`: Androidプロジェクトのルートディレクトリ
   * `Module`: ビルドしたいモジュール
   * `Variant`：ビルドしたいバリアント (通常は`debug`)

   ![](/img/android-build-ui-testing.png)

   このステップの出力は `BITRISE_APK_PATH`(フィルタリング後に生成されたAPKのパス)と`BITRISE_TEST_APK_PATH`（フィルタリング後に生成されたテストAPKのパス）になります。
4. `Android Build for UI testing`ステップ直後に`[BETA] Virtual Device Testing`ステップを追加します。
5. `Test type`を`instrumentation`に設定します。

   `Android Build for UI Testing`ステップはAPKとテストAPKを出力し、それらのパスは自動的に`[BETA] Virtual Device Testing`ステップの`APK path`と`Test APK path`入力フィールドに設定されます。
6. `Test devices`入力欄にテストデバイスのタイプを追加します。デフォルト以外のデバイスを選択する場合、`,`で区切った `deviceID,version,language,orientation`のフォーマットで入力する必要があります。

   ![](/img/instrumentation-test-2.png)
7. ビルドを開始し、[テスト結果を確認](/jp/testing/device-testing-for-android/#テスト結果の確認)します。

## テスト結果の確認

UIテストの結果は、ビルドページの`DEVICE TESTS`タブで確認できます。

1. `Builds`ページに戻りビルドを選択し、`DEVICE TESTS`タブをクリックしてテスト結果を確認します。
2. プロジェクトのテストを行ったデバイスをクリックします。

Instrumentationテストを選択した場合はテストケースとダウンロード可能なログを、Roboテストを選択した場合はビデオとスクリーンショットを見ることができます。または下にスクロールして、すべてのレポートを`FILES GENERATED`でダウンロードできます。