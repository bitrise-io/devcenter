---
changelog:
last_modified_at:
tag: []
title: テストレポート (Test Reports)
redirect_from: []
description: ''
published: false

---
Test Reportsは全てのテスト結果をわかりやすく表示します。

テストのステップを使うと、同一のディレクトリへ全てのテスト結果がデプロイされます。そこからTest Reportsが処理を行うので、結果がわかりやすく画面に表示されます。

## Test Reportsの概要

Test Reportsを使ったUIテストとユニットテストの両方をBitrise上で実行できます。また、同一ページ上で異なるテストタイプの結果の確認も行えます。

Test Reportsは以下の２つのいずれかのフォーマットでテスト結果を読み込み表示します。

* plist
* JUnit XML

以下の４つのテストステップでTest Reportsを使用できます。

* **Xcode Test for iOS**
* **Android Unit Test**
* **iOS Device Testing**
* **Virtual Device Testing for Android**

これらのステップはレポジトリで定義されたテストを実行し、アウトプットを環境変数に保管します。**Deploy to Bitrise.io**ステップは、全てを自動で行います：結果を読み取り、Test Reportsへ送信します。

{% include message_box.html type="info" title="テストガイド" content="テストガイドを参照して、各ステップの使い方についての詳細をご覧ください：

* [Android unit testing](https://devcenter.bitrise.io/testing/android-run-a-unit-test/)
* [Device testing for Android](/testing/device-testing-for-android/)
* [Device testing for iOS](/testing/device-testing-for-ios/)
* [Running Xcode Tests](/testing/running-xcode-tests/) "%}

{% include message_box.html type="important" title="カスタムのScriptステップの使用" content="カスタムのScriptステップを使ってTest Reportsへテスト結果をエクスポートすることができます。詳しくは[カスタムのScriptステップからテストレポートへのエクスポート](/testing/exporting-to-test-reports-from-custom-script-steps/)のガイドを参照してください。"%}

## Test Reportsの構成

Test Reportsへは複雑な構成等は必要ありません。使用するには、レポジトリ内にテストがあり、ワークフローに２つのステップがあることを確認してください。

{% include message_box.html type="warning" title="Deploy to Bitrise.ioのバージョン" content="**Deploy to Bitrise.io**ステップはバージョン1.4.1かそれ以上である必要があります。それより古いバージョンはTest Reportsに対応しておりません。"%}

1. アプリのレポジトリへテストを追加します。
2. ワークフローに適切なテストステップを追加します。例えば、iOSのプロジェクトであれば、Xcodeテストを回す**Xcode Test for iOS**ステップを使用します。
3. ワークフローに**Deploy to Bitrise.io**ステップがあることを確認します。
4. ビルド開始！

これで完了です！ビルドがいったん終了するとテスト結果を確認することが可能になります。

## テスト結果の確認

Test Reportsは**Test Summary**タブにて、実行した全てのテストに関する情報を表示します。実行した全てのテストの所要時間や結果を確認できます。各々のテストのタブをクリックしてそれぞれの詳細を見ることもできます。

特定のテスト結果にアクセスするには：

1. Bitrise上でアプリのページを開きます。
2. **Builds**タブをクリックし、テストを実行したビルドを選択します。
3. ビルドステータスの下にあり**Test reports**のラベル横にある**See more**をクリックします。

   ![{{ page.title }}](/img/android-test-test_-_build__20__ce39bf96fc9f7668__-_Bitrise.png)
4. **Test Summary**タブでテスト結果を見ることができます。

   あるいは、それぞれのTest setタブをクリックしてそれぞれのテスト結果を確認することもできます。

   結果に基づいてテストをフィルターにかける場合、右上端にあるメニューを開きます。デフォルトでは、フィルターは**All**にセットされています。

   ![{{ page.title }}](/img/Test_add-on-3.png)
5. 詳細を見るには**Test cases**をクリックします。  
   UIテストはデバイス別にグループ分けされている一方で、ユニットテストはテストケースに基づいたグループ分けが施されています。

Test Reportsでは：

* 実行したテストの合計回数や成功・失敗ビルドの割合
* (ユニット・UI両方の)テストそれぞれの所要時間
* UIテストの場合、デバイスの方位とロケール

を確認することが可能です。

![{{ page.title }}](/img/Test_add-on-4.png)

テストタイプに応じて：

* 各々のテストケース
* パフォーマンスデータ
* ビデオ
* スクリーンショット
* テストアーティファクト
* ログ

が確認できます。

前述したとおり、これはテストタイプに応じて行われるので、ユニットテストではスクリーンショットやビデオを見ることはもちろんできません。

### ファイルのダウンロード

全てのファイルはTest Reportsからダウンロードすることができます：スクリーンショット、動画、APKやIPAファイルが含まれています。

1. Test setを開きます。
2. 左側のメニューより、ファイルが含まれたタブをクリックします (例：**Test Artifacts**) 。

   ![{{ page.title }}](/img/Test_add-on-5.png)
3. ファイル名の隣りにある**Download**をクリックします。

   タブにある全て有効なファイルをダウンロードする場合、**Download All Files**をクリックしてください。

{% include banner.html banner_text="Let's view your build's Test Reports" url="https://app.bitrise.io/dashboard/builds?utm_source=bottom_cta&utm_medium=banner&utm_campaign=devcenter" button_text="Go to your app" %}