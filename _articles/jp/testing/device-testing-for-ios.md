---
title: iOSデバイステスト
menu:
  testing:
    weight: 4
---
BitriseのiOSデバイステストソリューションを用いることで、デバイスのセットアップや登録を行うことなく、iOSのテストを実機上で行うことができます。専用のステップを使用し、使用したいデバイスの種類を設定するだけテストが実行できます。ステップの使用にあたっては、ビルド全体での実行時間以外には制限がありません。

デバイステストソリューションは[Firebase Test Lab](https://firebase.google.com/docs/test-lab/)をベースとしています。あなたのアプリのテストはGoogleのデータセンター内にある本物のデバイス上で実行されます。デバイスには最新のAPIがフラッシュされ、ロケール設定をカスタマイズできます。また、実行時のログおよびビデオ、スクリーンショットはBitrise上で参照可能です。

iOSアプリの場合、Firebase Test Labは[XCTest](https://developer.apple.com/documentation/xctest)を実行します。利用可能なデバイスの一覧は[こちら](https://firebase.google.com/docs/test-lab/ios/available-testing-devices)をご覧ください。

## デバイスでのテストを許可する

仮想デバイステスト用のステップを使用する前に、あらかじめ機能を有効にしておく必要があります。

1. [Bitrise](https://app.bitrise.io/)にログインする。

2. ダッシュボードからアプリを選択する。

3. `Settings`タブに移動する。

4. `Device Testing`の項目までスクロールし、 `ENABLE UI TESTS ON VIRTUAL DEVICES`を有効にする。

![](/img/settings-device-testing.png)

これで完了です！デバイステストソリューションを使うための準備が整いました。

## iOSアプリのデバイステストを実行する

Firebase Test Labでのデバイステストを実行するために、以下の２つのステップをワークフローに追加してください。

* `Xcode Build for testing for iOS`
* `iOS Device Testing`

{% include message_box.html type="note" title="ベータ版の機能です" content="現時点では、いずれのステップもベータ版であることに注意してください。動作は安定していますが、改善に取り組んでいる最中です！"%}

`Xcode Build for testing for iOS` は、_xcodebuild_の`build-for-testing`を実行します。これにより、iOSプロジェクト内の[Xcode scheme](https://developer.apple.com/library/archive/featuredarticles/XcodeConcepts/Concept-Schemes.html)で定義されたテストがビルドされます。このステップはテストディレクトリ(デフォルトでは_Debug-iphoneos_)と`xctestrun`ファイルを含んだ.zip形式のファイルを出力します。

`iOS Device Testing`ステップでテストを実行し、Bitriseに結果を出力するためには、この.zipファイル(環境変数として出力されます)のパスを入力する必要があります。

1. アプリの[デバイステストが許可されているか](/testing/virtual-device-testing-for-ios/#enabling-device-testing)を確認する。

2. ワークフローに`Xcode Build for testing for iOS`ステップを追加する。

   `Certificate and profile installer`ステップ以降に追加する必要があることに注意してください。

   ![](/img/xcode-build-for-test.png)

3. `Scheme name`には、使用したいスキーマ名を入力してください。デフォルトでは、[環境変数](https://devcenter.bitrise.io/builds/env-vars-secret-env-vars/)の`$BITRISE_SCHEME`に設定されています。 この値は、アプリを作成した際に設定されています。

   デフォルトでは、スキーマには使用するコンフィグレーション(DebugやReleaseなど)が指定さています。`Configuration name`に値を入力することで、手動でコンフィグレーションの種類を指定できます。

4. ステップ内の`Device destination`に値を入力し、_xcodebuild_のdestinationオプションを設定する。

   初期値は`generic/platform=ios`です。設定可能な値は、ローカルの端末上で`man xcodebuild`を実行し、`Destinations`セクションから参照できます。

5. ワークフローに`iOS Device Testing`ステップを追加する。

   このステップは、`Xcode Build for testing for iOS`ステップ以降に追加してください。

   ![](/img/ios-device-testing.png)

6. `Test devices`の入力フィールド内に、アプリをテストしたいデバイスを指定する。

   利用可能なデバイスの一覧は[こちら](https://firebase.google.com/docs/test-lab/ios/available-testing-devices)をご覧ください。

7. オプションとして、テスト実行時に生成されたすべてのファイルをダウンロードすることができます。この機能を利用するには、`Debug`グループ内にある`Download files`を`true`にしてください。

8. ビルドを開始しましょう！

すべてが順調に行けば、ビルドページ内から結果を参照できます。

## デバイステストの結果を確認する

アプリのビルドページから、デバイステストの結果を確認してください。各デバイスでのテスト結果と各テストケースの詳細を確認できます。参照できるのは以下の項目です。

* テストケース
* ビデオ
* スクリーンショット
* ログ
* テスト中に生成されたファイル

![](/img/test-results.png)

1. アプリの`Build`タブを表示する。

2. `DEVICE TESTS`タブを表示する。

3. デバイスごとのテスト結果を確認する。
