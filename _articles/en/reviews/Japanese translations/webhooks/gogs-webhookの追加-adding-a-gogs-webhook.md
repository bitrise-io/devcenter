---
title: Gogs webhookの追加(Adding a Gogs webhook)
redirect_from: []
date: 2019-03-28 11:09:04 +0000
published: false

---
{% include not_translated_yet.html %}

You can set up webhooks so that Bitrise automatically triggers a build of your app whenever you perform a specified action. For Gogs, all you have to do is register your `bitrise-webhooks` URL as a Webhook in your [Gogs](https://gogs.io) repository.

指定したアクションを実行するたびにBitriseが自動的にアプリのビルドを開始するように Webhookを設定できます。 Gogsの場合、`bitrise-webhooks`のURLをGogsリポジトリの Webhookとして登録するだけです。

## Get the webhook URL for Gogs Gogsのwebhook URLを取得

1. Go to the `Code` tab of your app's page and in the `INCOMING WEBHOOKS` menu, click `SETUP MANUALLY`. アプリページの`Code`タブに移動し、`INCOMING WEBHOOKS`メニューの`SETUP MANUALLY`をクリックします。
2. Select `Gogs` from the dropdown menu.　ドロップダウンメニューから`Gogs`を選択します。

   ![Screenshot](/img/bitrise-gogs-webhook.png)
3. Copy the webhook URL for the selected service.　選択したサービスのWebhook URLをコピーしてください。

## Set up webhook on Gogs　Gogsにウェブフックを設定する

1. Open your project on your repository's hosting URL.　リポジトリのホスティングURLでプロジェクトを開きます。
2. Go to `Settings` of the project.　プロジェクトの `Settings`に移動します。
3. Select `Webhooks`, `Add Webhook`, then `Gogs`.　`Webhooks`、`Add Webhook`、`Gogs`の順に選択します。

   ![Screenshot](/img/webhooks/gogs-webhook-select.png)
4. Specify the `bitrise-webhooks` URL (`.../h/gogs/BITRISE-APP-SLUG/BITRISE-APP-API-TOKEN`) in the `Payload URL` field.　`Payload URL`フィールドに、`bitrise-webhooks`のURL(`.../h/gogs/BITRISE-APP-SLUG/BITRISE-APP-API-TOKEN`) を指定します。

   ![Screenshot](/img/webhooks/add-webhook-gogs.png)
5. Set the `Content Type` to `application/json`.　`Content Type`を`application/json`に設定します
6. A Secret is not required at this time. 現時点ではSecretは必要ありません
7. Set the trigger to be fired on `Just the push event`. `Just the push event`でトリガーが発生するように設定します。

   ![Screenshot](/img/webhooks/gogs-webhook-triggered.png)
8. Click `Add Webhook`. `Add Webhook`をクリックします

And you're done! From now on, every code push to your Gogs repository will trigger a build on Bitrise.

これで完了です！GogsリポジトリにコードをプッシュするたびにBitrise上でビルドが開始されます。