---
title: Xcodeテストの実行
redirect_from: []
date: 2019-02-22T15:33:24.000+00:00
menu:
  testing-main:
    weight: 8

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

![](/img/xcode-test-input.png)

* **Scheme name**: お使いのスキームは必ずShared in Xcodeとマークされている必要があります。
* **Device**: Xcodeのデバイス選択のドロップダウンメニューで表示されている値をセットします。
* **OS version**: Xcodeのデバイス選択のドロップダウンメニューで表示されている値をセットします。
* **Platform**: Xcodeのデバイス選択のドロップダウンメニューで表示されている値をセットします。

{% include message_box.html type="info" title="Headless mode" content="Xcode 9以上のバージョンでは、テストはデフォルトによりヘッドレスモードで実行されるようになっています：これはシミュレータがバックグラウンドでのみ実行される仕組みです。変更するには、ステップのDebugインプットグループに進んで`Run the test in headless mode?`インプット値を`no`にセットしてください。けれどもこのオプションを使うとテストに時間がかかってしまいます。"%}

{% include message_box.html type="warning" title="`xcpretty`アウトプットツールでは並列テストのサポートを行っておりません。プロジェクト内に並列テストが有効化されている場合、ステップのDebugインプットグループに進み、`Output tool`のインプット値を`xcodebuild`にセットしてください。"%}

### コードカバレッジファイルの生成

デフォルトでは、`Xcode Test for iOS`ステップはコードカバレッジファイルの生成を行いません。もしそれが必要な場合、簡単に変更ができます：`Generate code coverage files?`を`yes`とセットするだけです。

これは２つの追加のフラッグを`xcodebuild`コマンドにセットします：

    xcodebuild GCC_INSTRUMENT_PROGRAM_FLOW_ARCS=YES GCC_GENERATE_TEST_COVERAGE_FILES=YES

ビルドがうまく実行されたら、コードカバレッジファイルは結果の中に含まれるようになります。

### UIテストアーティファクトのエクスポート

You can export the attachments of your UITest into the `BITRISE_DEPLOY_DIR` directory. These attachments include screenshots taken during the UI test, as well as any other artifacts that might have been generated. They are exported as a compressed zip file.

By default, the `Xcode Test for iOS` Step does not export artifacts of the UITest. If you want to export them, set the `Export UITest Artifacts` input of the `Xcode Test for iOS` Step to `true`.

UIテストの添付物を`BITRISE_DEPLOY_DIR` ディレクトリにエクスポートすることができます。その添付物はUIテスト中に撮影されたスクリーンショットや、生成されたかもしれない他のアーティファクトも含みます。それらは圧縮されたzipファイルとしてエクスポートされます。

デフォルトでは、`Xcode Test for iOS`ステップはUIテストのアーティファクトはエクスポートしません。エクスポートしたいのであれば、`Xcode Test for iOS`ステップの`Export UITest Artifacts`インプットを`True`にセットしてください。