---
title: GitHub webhookの追加(Adding a GitHub webhook)
redirect_from: []
date: 2019-03-26 16:34:41 +0000
published: false

---
{% include not_translated_yet.html %}

You can specify webhooks so that Bitrise automatically triggers a build of your app whenever you perform a specified action, such as a code push or a pull request. For GitHub, all you have to do is register your `bitrise-webhooks` URL as a Webhook in your [GitHub](https://www.github.com) repository.

You can register a webhook either automatically or manually. This guide walks you through the process of **manually** registering a webhook. [Read more about automatic webhook registration](/webhooks/index#setting-up-incoming-webhooks-automatically/). 

コードプッシュやプルリクエストなどのアクションを実行する度にBitriseがアプリケーションのビルドを自動的にトリガーするようにwebhookを指定できます。 GitHubの場合は、`bitrise-webhooks`のURLを[GitHub](https://www.github.com)リポジトリのWebフックとして登録するだけです。

 ウェブフックは自動または手動で登録できます。このガイドでは、Webフックを手動で登録するプロセスについて説明します。

[自動Webhook登録について](/webhooks/index#setting-up-incoming-webhooks-automatically/)

## Get the webhook URL for GitHub GitHubのwebhook URLを取得

1. Go to the `Code` tab of your app's page and in the `INCOMING WEBHOOKS` menu, click `SETUP MANUALLY`. アプリのページの`Code`タブにいき、`INCOMING WEBHOOKS`メニューの`SETUP MANUALLY`をクリックします。
2. Select `GitHub` from the dropdown menu.　ドロップダウンメニューから`GitHub`を選択します。

   ![Screenshot](/img/github-webhook-1.png)
3. Copy the webhook URL for the selected service.　選択したサービスのWebhook URLをコピーします。

## Set up webhook on GitHub　  
GitHubでwebhookを設定

1. Navigate to your GitHub repository and select `Settings`.　GitHubリポジトリに移動し`Settings`を選択します。

   ![Screenshot](/img/webhooks/github-webhook-2.png)
2. Select `Add webhook` under Webhooks.　Webhooksの下の`Add webhook`を選択します。

   ![Screenshot](/img/webhooks/github-webhook-3.png)
3. Paste the GitHub Webhook URL from Bitrise to the Payload URL. GitHub Webhook URLをBitriseからPayload URLに貼り付けます。

   ![Screenshot](/img/webhooks/github-webhook-4.png)
4. And on the same page, select `Let me select individual events`. 同じページの`Let me select individual events`を選択します。

   ![Screenshot](/img/webhooks/github-webhook-5.png)
5. Select `Pull request` and `Push`. After you are ready press the `Add webhook` button and you are ready to roll! `Pull request`と`Push`を選択します。準備ができたら、`Add webhook`を押してください。

   ![Screenshot](/img/webhooks/github-webhook-6.png)