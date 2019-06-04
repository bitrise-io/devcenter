---
title: GitHub webhookの追加(Adding a GitHub webhook)
redirect_from: []
date: 2019-03-26 16:34:41 +0000
published: false

---
{% include not_translated_yet.html %}

コードプッシュやプルリクエストなどのアクションを実行する度にBitriseがアプリケーションのビルドを自動的にトリガーするようにwebhookを指定できます。 GitHubの場合は、`bitrise-webhooks`のURLを[GitHub](https://www.github.com)リポジトリのWebフックとして登録するだけです。

ウェブフックは自動または手動で登録できます。このガイドでは、Webフックを手動で登録するプロセスについて説明します。

[自動Webhook登録について](/webhooks/index#setting-up-incoming-webhooks-automatically/)

## GitHubのwebhook URLを取得

1. アプリのページの`Code`タブにいき、`INCOMING WEBHOOKS`メニューの`SETUP MANUALLY`をクリックします。
2. ドロップダウンメニューから`GitHub`を選択します。

   ![Screenshot](/img/github-webhook-1.png)
3. 選択したサービスのWebhook URLをコピーします。

## GitHubでwebhookを設定

1. GitHubリポジトリに移動し`Settings`を選択します。

   ![Screenshot](/img/webhooks/github-webhook-2.png)
2. Webhooksの下の`Add webhook`を選択します。

   ![Screenshot](/img/webhooks/github-webhook-3.png)
3. GitHub Webhook URLをBitriseからPayload URLに貼り付けます。

   ![Screenshot](/img/webhooks/github-webhook-4.png)
4.  同じページの`Let me select individual events`を選択します。

   ![Screenshot](/img/webhooks/github-webhook-5.png)
5. `Pull request`と`Push`を選択します。準備ができたら、`Add webhook`を押してください。

   ![Screenshot](/img/webhooks/github-webhook-6.png)