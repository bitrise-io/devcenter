---
tag: []
title: Dangerを使ったテストのactivity summaryが見つからない (No activity summaries found for test
  with Danger)
redirect_from: []
summary: ''
published: false

---
## 問題

Xcovプラグインを使ってDangerを実行している際、以下のような形のエラーメッセージを受け取る場合があります。

    2019/01/01 00:00:00 no activity summaries found for test:

## 解決策

これは、**Xcode Test for iOS**ステップが機能している結果です: このステップは、.xcresultバンドルを生成し、それを`$BITRISE_XCRESULT_PATH`へエクスポートします。

デフォルトでは、Xcovは`$BITRISE_XCRESULT_PATH`ではなく、デフォルトのロケーションにあるバンドルの結果になっています。これにより、ビルドはこれらのツールの使用すると失敗します。環境変数で設定されたロケーション内でバンドルを検索するため、これらを構成する必要があります。xcovのセットアップの例は以下のとおりです：

{% include message_box.html type="important" title="プラグインのバージョン" content="xcovプラグインのバージョンは1.6またはそれ以上である必要があります：それより古いバージョンは正確なパスの指定を許可しません。"%}

    xcov.report(
      scheme: 'ExampleScheme',
      workspace: 'example.xcworkspace',
      xccov_file_direct_path: ENV['BITRISE_XCRESULT_PATH'],
      include_targets: 'Example.app,ExampleShared.framework,ExampleWidget.appex'
    )