---
title: Androidのデバイステスト
menu:
  testing:
    weight: 5
---
BitriseのAndroidデバイステストソリューションを用いることで、デバイスのセットアップや登録を行うことなく、エミュレータ上でUIテストを実行できます。 専用のステップを使用し、テストするデバイスタイプを設定するだけで済みます。

{% include message_box.html type="note" title="制限" content="ビルド時間によって制限される場合があります。また、1つのビルドには1種類のテスト(`instrumentation`、`robo`または`gameloop`）を実行する`[BETA] Virtual Device Testing`ステップを1つだけ含めることができます。  "%}

デバイステストソリューションは[Firebase Test Lab](https://firebase.google.com/docs/test-lab/)をベースとしています。 実行結果のログ、ビデオ、スクリーンショットはBitriseで閲覧することができます。

## デバイステストを有効化

まず、アプリのデバイステストを有効にし、`Gradle Runner`と`[BETA] Virtual Device Testing for Android`ステップを拡張したビルドを選択する必要があります。

1. はじめにアプリの`Settings`タブ上で`Device Testing`をONにします。`Device Testing`の右上隅にあるスイッチを右に切り替えます。

   ![](/img/settings-device-testing.png)
2. `Settings` ページからアプリの `Build` ページに移動します。
3. テストを行うビルドをクリックします。
4. もし`Step 1`でデバイステストを有効にしていれば、`APPS & ARTIFACTS`の次に3番目のタブ`DEVICE TESTS BETA` が出現するのでこれをクリックします。

   ![](/img/build-device-test.jpg)
5. `add step to primary workflow`をクリックして、デバイステストに必要な2つのステップを`primary workflow`に追加します。
   * `Android Build` - テストのためにapkを生成するステップ
   * `[BETA] Virtual Device Testing for Android` - テストを実行しテストレポートを生成するステップ![](/img/primary-virtual-device.png)

## テストの実行

Bitriseでは3つのテストタイプから選択可能です。

* robo (default test type in Bitrise)
* instrumentation
* gameloop

もしテストタイプの違いを知りたい場合は[Firebase's documentation](https://firebase.google.com/docs/test-lab/android/overview)をご覧ください。
`robo`テストと`instrumentation`テストでは設定方法に少し違いがありますので、別々に見てみましょう！

### `robo`テストの実行

1. `Workflow Editor`でビルドの`primary workflow`を開きます。
2. APKをエクスポートするため、`Android Unit Test`ステップの後に`Android Build`ステップを追加します。
3. `Variant`の入力欄に`Debug`を追加してください。これにより、ビルドのAPKパスを含む環境変数が準備されます。この環境変数は次のステップで必要になります。

   ![](/img/robo-test.png)
4. `Android Build`ステップの後に`[BETA] Virtual Device Testing for Android`を追加します。
5. `APK path`の入力欄を設定します。
6. `Test type`に`robo`が選択されていることを確認してください。これはデフォルトのテストタイプです。
7. `Test devices`入力欄にテストデバイスのタイプを追加します。デフォルト以外のデバイスを選択する場合、`,`で区切った `deviceID,version,language,orientation`のフォーマットで入力する必要があります。

   ![](/img/test-devices-android.png)

   利用可能なデバイスの一覧は[こちら](https://firebase.google.com/docs/test-lab/android/available-testing-devices)で確認してください。
8. ビルドを開始します。

### `instrumentation`テストの実行

1. `Workflow Editor`でビルドの`primary workflow`を開きます。
2. `Android Unit Test`ステップの後に2つの`Android Build`ステップを追加してください。1番目のビルドステップでAPKをエクスポートし、2番目のビルドステップでテストAPKをエクスポートします。
3. 1番目の`Android Build`ステップで、`Variant`の入力欄に`Debug`を追加します。
4. 2番目の`Android Build`ステップで、`Variant`の入力欄に`DebugAndroidTest`を追加します。

   ![](/img/instrumentation-test-1.png)
5. `bitrise.yml`タブをクリックして、`primary workflow`を編集します。2番目の`Android Build`ステップに`instrumentation`テストのための[output alias](https://devcenter.bitrise.io/bitrise-cli/step-outputs/#exporting-step-outputs-in-output-aliases/)を追加します。 これは、`[BETA] Virtual Device Testing`ステップ内`Instrumentation Test`セクションの`Test APK path`にコピーします。この変更によって、テストAPKを出力することができます。

        - android-build@0.9.5:
               inputs:
               - variant: Debug
               - module: app
           - android-build@0.9.5:
               inputs:
               - variant: DebugAndroidTest
               - module: app
               outputs:
               - BITRISE_APK_PATH: BITRISE_TEST_APK_PATH

   ![](/img/virtual-device.png)
6. `[BETA] Virtual Device Testing`ステップ内の`Test type`で`instrumentation`を選択します。
7. `Test devices`入力欄にテストデバイスのタイプを追加します。デフォルト以外のデバイスを選択する場合、`,`で区切った `deviceID,version,language,orientation`のフォーマットで入力する必要があります。

   ![](/img/instrumentation-test.png)
8. Start a build.

## テスト結果の確認

UIテストの結果は、ビルドページの `DEVICE TESTS`タブで確認できます。

1. `Builds`ページに戻りビルドを選択し、`DEVICE TESTS`タブをクリックしてテスト結果を確認します。
2. プロジェクトをテストしたデバイスをクリックします。

   ![](/img/device-test-page.jpg)

`instrumentation`テストを選択した場合はテストケースとダウンロード可能なログを、`robo`テストを選択した場合はビデオとスクリーンショットを見ることができます。または下にスクロールして、すべてのレポートを`FILES GENERATED`でダウンロードできます。