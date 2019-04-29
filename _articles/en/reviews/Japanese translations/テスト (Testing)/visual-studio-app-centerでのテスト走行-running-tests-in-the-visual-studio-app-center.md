---
title: Visual Studio App Centerでのテストの実行 (Running tests in the Visual Studio App Center)
redirect_from: []
date: 2019-04-29 13:25:23 +0000
published: false

---
プロジェクト用にテストのアップロードやスケジューリングをVisual Studio App Centerで行うことができます。以下のテストフレームワークが利用可能です：

* Appium
* Espresso
* Calabash
* Xamarin.UITest
* XCUITest

1. Workflow Editorにて、ご自身のワークフローに`App Center upload and schedule tests`ステップを[追加します](/getting-started/getting-started-workflows/)。  
   このステップには複数の必要なインプットが存在します。そのインプットの値はVisual Studio App Center上のテストをセットアップすることにより確認する事ができます。
2. App Centerにログインします。
3. [アップロード用のテストを準備します](https://docs.microsoft.com/en-us/appcenter/test-cloud/preparing-for-upload/)。
4. [App Center](https://appcenter.ms/apps)プロジェクトを作成します。
5. `Test runs`タブへ進み`New test run`を開始します：
   * アプリのテストを行うデバイスを選択します。
   * テスト走行の設定：テストシリーズ、システム言語、テストフレームワークを選択します。
   * `Upload and schedule test`**セクションの**`Submit`**タブにて、ステップに必要な全てのインプットが確認できます。**
   * `Done`をクリックします。
6. On Bitrise, open the Workflow Editor and fill in the required inputs of the Step. You will need to:  
   Bitrise上では、Workflow Editorを開いてステップに必要なインプットを入力します。以下の項目を行ってください：
   * APIトークンの入手
   * ターゲットアプリの設定
   * テストフレームワークの設定（利用可能なオプションが確認できます）
   * device selection slugの追加
   * テストシリーズ名の追加
   * テスト走行用のシステムLocale (例：_en_US_) の設定
   * アプリケーションファイルへのパスの設定（.ipaもしくは.apk）
   * テストディレクトリへのパスの設定（選択したテストフレームワーク用の適切なディレクトリを使用してください）