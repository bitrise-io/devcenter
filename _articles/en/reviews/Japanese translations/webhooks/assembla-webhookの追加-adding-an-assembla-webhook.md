---
title: Assembla webhookの追加（Adding an Assembla webhook）
redirect_from: []
date: 2019-03-28 14:05:45 +0000
published: false

---
{% include not_translated_yet.html %}

You can set up webhooks so that Bitrise automatically triggers a build of your app whenever you perform a specified action, such as a code push or a pull request. For Assembla, you only need to add your `bitrise-webhooks` URL to your [Assembla](https://assembla.com) space.

コードプッシュやプルリクエストなどの指定されたアクションを実行するたびにBitriseが自動的にアプリのビルドをトリガーするようにwebhookを設定できます。 Assemblaの場合は、`bitrise-webhooks `URLをスペース [Assembla](https://assembla.com) に追加するだけです。

## Get the webhook URL for Assembla Assemblaのwebhook URLを取得

1. Go to the `Code` tab of your app's page and in the `INCOMING WEBHOOKS` menu, click `SETUP MANUALLY`.　アプリのページの`Code`タブに移動し、`INCOMING WEBHOOKS`メニューの`SETUP MANUALLY`をクリックします。
2. Select `Assembla` from the dropdown menu. ドロップダウンメニューから`Assembla`を選択します。

   ![Screenshot](/img/bitrise-assembla-webhook.png)
3. Copy the webhook URL for the selected service.　選択したサービスのWebhook URLをコピーしてください。

## Set up webhook on Assembla　Assemblaでwebhook設定

1. Open your space on [assembla.com](https://assembla.com) or your organisation's assembla domain. [assembla.com](https://assembla.com) または組織のassemblelaドメインで自分のスペースを開きます。
2. Go to the `Webhooks` section of the space. スペースの`Webhooks`セクションに行きます。
3. Select `Create New Webhook`. `Create New Webhook`を選択します。
4. Set `Title` to `BitRise Webhook`.　`Title`を`BitRise Webhook`に設定します。
5. Specify the `bitrise-webhooks` URL. (`.../h/assembla/BITRISE-APP-SLUG/BITRISE-APP-API-TOKEN`) in the `External url` field　`bitrise-webhooks　`URLを指定してください。`External url`フィールドの (`.../h/assembla/BITRISE-APP-SLUG/BITRISE-APP-API-TOKEN`) 
6. Select `application/json` in the `Content type` field.　`Content type`フィールドで`application/json`を選択します。
7. Paste the following code to `Content`:　次のコードを`Content`に貼り付けます：

       {"assembla": {"space": "%{space}", "action": "%{action}", "object": "%{object}"}, "message": {"title": "%{title}", "body": "%{body}", "author": "%{author}"}, "git": {"repository_suffix": "%{repository_suffix}", "repository_url": "%{repository_url}", "branch": "%{branch}", "commit_id": "%{commit_id}"}}
8. Select `Code commits` and/or `Git Push` in the `Post updates about:` section.　`Post updates about:` セクションで`Code commits`または`Git Push`を選択します。
9. Click `Add`. `Add`をクリックします。

That's all! The next time you **push code** a build will be triggered (if you have Trigger mapping defined for the event(s) on Bitrise).　

次回コードをプッシュしたときにビルドがトリガーされます（Bitriseのイベントに対してトリガーマッピングが定義されている場合）。