---
title: Visual Studio webhookの追加 (Adding a Visual Studio webhook)
redirect_from: []
date: 2019-03-28 13:58:24 +0000
published: false

---
webhookのセットアップをすると、コードプッシュやプルリクエストなどといった特定のアクションを実行することによって、Bitriseが自動的にアプリのビルドをトリガーします。Visual Studioでは、[visualstudio.com](https://visualstudio.com)プロジェクトを`Service Hooks` インテグレーションとして`bitrise-webhooks` URLの登録が必要になります。

[visualstudio.comのドキュメンテーションサイト](https://www.visualstudio.com/en-us/get-started/integrate/service-hooks/webhooks-and-vso-vs)より公式ガイドを確認する事ができます。

## Visual Studio webhook URLの取得

1. アプリページの`Code`タブに進み、`INCOMING WEBHOOKS`メニューより`SETUP MANUALLY` をクリックします。
2. ドロップダウンメニューより `Visual Studio Online / Visual Studio Team Services` を選択します。

   ![Screenshot](/img/bitrise-visual-webhook.png)
3. 選択したサービスのwebhook URLをコピーしてください。

## Visual Studio上でのwebhookのセットアップ

1. visualstudio.comにてご自身のプロジェクトを開きます。
2. _project_の_Admin/Control panel_ へ進みます。
3. `Service Hooks` を選択します。

   ![Screenshot](/img/webhooks/visual-studio-service-hooks.png)
4. `Create subscription`をクリックします。
5. Service Integrationを作成します：
   * Serviceリスト上の`Web Hooks`オプションを選択します。

     ![Screenshot](/img/webhooks/visual-studio-new-service.png)
   * _Trigger on this type of event_は`Code pushed`を選択します。

     ![Screenshot](/img/webhooks/visual-studio-code-pushed.png)
   * `Filters`セクションでは、インテグレートしたい`Repository` を選択します。
   * 他のフィルターはデフォルトのままでも大丈夫です。
   * `Next`をクリックします。
   * `Action`の設定画面では、 `bitrise-webhooks` URL (`.../h/visualstudio/BITRISE-APP-SLUG/BITRISE-APP-API-TOKEN`) をURL欄に入力します。他のオプションはデフォルトのままでも大丈夫です。

     ![Screenshot](/img/webhooks/visual-studio-webhook-url.png)
6. `Finish`をクリックしてください。

これで完了です！次回以降に**コードプッシュ**や**new tagのプッシュ**が行われた場合、ビルドがトリガーされます（Bitrise上のイベントの定義されたTrigger mappingをお持ちの方のみ）。