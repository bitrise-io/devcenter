---
changelog: 
last_modified_at: 
title: Xcodeテストの実行
redirect_from: []
date: 2019-02-22T15:33:24.000+00:00
menu:
  testing-main:
    weight: 10

---
Bitrise上でXcodeテストを実行するには、ご自身のプロジェクト内に定義されたテストターゲットを持つ必要があります。Xcodeテストを実行し、結果を確認するには２つのステップが必要になります。

* `Xcode Test for iOS`
* `Deploy to Bitrise.io`

{% include message_box.html type="note" title="コード署名ファイル" content="Xcodeテストの実行とBitriseへの結果のデプロイについては、コード署名ファイルは必要ありません！"%}

`Xcode Test for iOS`ステップは事前に定義されたXcodeテストを実行します。そのステップにはデフォルトの構成があり、テストが正確に書かれた場合に動きます。Xcodeでも、同じ構成オプションを見つけることができます。

`Deploy to Bitrise.io`は以下のものをビルドの`Logs`と[Apps & Artifacts](/builds/build-artifacts-online/) タブへデプロイします：

* Xcodeテストの結果
* 未処理（生の）`xcodebuildoutput`ログ

また、コードカバレッジファイルの生成や圧縮されたzipファイルとしてテスト結果のエクスポートも可能です。

### Bitrise上でのXcodeテスト構成

`Xcode Test for iOS`ステップのデフォルトインプット値は、テストが正確に書かれていれば動作します。ただ、Bitriseは全てのインプットが正しい値であるか確認することをおすすめします。そうすることにより、ステップは正しく動きます。

ビルドを実行する前に、以下の`Xcode Test for iOS`に必要なインプットを確認してください。これらのインプットはステップが実行するテストの種類を決定します。

![{{ page.title }}](/img/xcode-test-input.png)

* **Scheme name**: お使いのスキームは必ずShared in Xcodeとマークされている必要があります。
* **Device**: Xcodeのデバイス選択のドロップダウンメニューで表示されている値をセットします。
* **OS version**: Xcodeのデバイス選択のドロップダウンメニューで表示されている値をセットします。
* **Platform**: Xcodeのデバイス選択のドロップダウンメニューで表示されている値をセットします。

{% include message_box.html type="info" title="Headless mode" content="Xcode 9以上のバージョンでは、テストはデフォルトによりヘッドレスモードで実行されるようになっています：これはシミュレータがバックグラウンドでのみ実行される仕組みです。変更するには、ステップのDebugインプットグループに進んで`Run the test in headless mode?`インプット値を`no`にセットしてください。けれどもこのオプションを使うとテストに時間がかかってしまいます。"%}

{% include message_box.html type="warning" title="`xcpretty`アウトプットツールでは並列テストのサポートを行っておりません。プロジェクト内に並列テストが有効化されている場合、ステップのDebugインプットグループに進み、`Output tool`のインプット値を`xcodebuild`にセットしてください。"%}

## Rerunning failed tests (Not available in Xcode 13+)

The **Should retry test on failure? (Not available in Xcode 13+)** input in the **Debug** section of the **Xcode Test for iOS** Step allows you to automatically rerun ALL your tests, not just the failed ones. If you set this input to `yes`, the Step will run `xcodebuild` one more time in the case of test failure.

From Xcode 13 and above the **Should retry test on failure? (Not available in Xcode 13+)** feature is not available anymore. We recommend you use **Test Repetitions Mode (Available in Xcode 13+)** input with the `retry_on_failure` option selected. This allows you to rerun only the failed test/s instead of running all your tests. You can find this test repetition feature with our **Xcode Test for iOS** Step from version 3.0.0 and above.

## Test Repetitions

[Xcode’s test repetition modes](https://developer.apple.com/videos/play/wwdc2021/10296/) are available with the [Xcode Test for iOS Step](https://www.bitrise.io/integrations/steps/xcode-test) on stacks running Xcode 13 and above on Bitrise. With test repetitions, you can run any type of tests multiple times in various ways such as retry on failure, until failure and until max repetitions.

The **Xcode Test for iOS** Step’s **Test Repetitions Mode (Available in Xcode 13+)** input offers the following options:

* `none`: The tests won’t repeat.
* `until_failure`: Repeats a test until the test fails or until the maximum repetition. The default number of test runs is three.
* `retry_on_failure`: Failed tests run until they succeed or until the repetition number you specify. The default number of test repetitions is three.
* `up_until_maximum_repetitions`: Reruns all tests until maximum test repetition is reached regardless of the test outcomes.

Please note that these options are only available from **Xcode Test for iOS** version 3.0.0 and above.

With the **Maximum Test Repetitions (Available in Xcode 13+)** input you can specify the maximum number of test repetitions. Please note that you have to add a greater number than one if the **Test Repetition Mode (Available in Xcode 13+)** input is set to other than `none`.

Enable the **Relaunch Tests for Each Repetition (Available in Xcode 13+)** input to launch tests in a completely new process for each repetition.