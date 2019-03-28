---
title: Deveo webhookの追加（Adding a Deveo webhook）
redirect_from: []
date: 2019-03-28 14:52:43 +0000
published: false

---
{% include not_translated_yet.html %}

You can set up webhooks so that Bitrise automatically triggers a build of your app whenever you perform a specified action, such as a code push or a pull request. For Deveo, all you have to do is register your `bitrise-webhooks` URL for a [Deveo](https://deveo.com) repository.

コードプッシュやプルリクエストなどの指定されたアクションを実行するたびにBitriseが自動的にアプリのビルドをトリガーするようにwebhookを設定できます。 Deveoの場合は、 `bitrise-webhooks`URLを [Deveo](https://deveo.com)リポジトリに登録するだけで済みます。

## Get the webhook URL for Deveo　Deveoのwebhook URL　取得

1. Go to the `Code` tab of your app's page and in the `INCOMING WEBHOOKS` menu, click `SETUP MANUALLY`.　アプリページの`Code`タブに移動し、`INCOMING WEBHOOKS` メニューで`SETUP MANUALLY`をクリックします。
2. Select `Deveo` from the dropdown menu. ドロップダウンメニューから`Deveo`を選択します。

   ![Screenshot](/img/bitrise-deveo-webhook.png)
3. Copy the webhook URL for the selected service.  選択したサービスのWebhook URLをコピーします。

## Set up webhook on Deveo　Deveoでwebhook設定

1. Open your repository on [app.deveo.com](https://app.deveo.com).　[app.deveo.com](https://app.deveo.com)のリポジトリを開きます。
2. Go to `Hooks` of the project.  プロジェクトの`Hooks`に移動します。

   ![Screenshot](/img/webhooks/deveo-hooks.png)
3. Add a new Repository Hook by clicking the `+` button on the right.　右側の`+`をクリックして、新しいRepository Hookを追加します。
4. Select your repository and select the `Webhook` service.　リポジトリを選択して`Webhook`サービスを選択します。

   ![Screenshot](/img/webhooks/deveo-add-hooks.png)
5. Enter the `bitrise-webhooks` URL (`.../h/deveo/BITRISE-APP-SLUG/BITRISE-APP-API-TOKEN` in the `Url` field).　`bitrise-webhooks` URL（`Url`フィールドに`.../h/deveo/BITRISE-APP-SLUG/BITRISE-APP-API-TOKEN)`を入力します。
6. Type `json` in the `Content type` field. `Content type`フィールドに`json`と入力します。
7. Click `Save hook`.`Save hook`をクリックします。

   ![Screenshot](/img/webhooks/deveo-save-hook.png)

That's all! The next time you **push code** or **push a new tag** a build will be triggered (if you have Trigger mapping defined for the event(s) on Bitrise).

**コードをプッシュする**か**新しいタグをプッシュす**ると、ビルドがトリガされます（Bitriseのイベントに対してトリガマッピングが定義されている場合）。