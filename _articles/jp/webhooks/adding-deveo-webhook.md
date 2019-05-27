---
title: Deveo webhookの追加
menu:
  webhooks-main:
    weight: 19

---
コードプッシュやプルリクエストなどの指定されたアクションを実行するたびにBitriseが自動的にアプリのビルドをトリガーするようにwebhookを設定できます。 Deveoの場合は、 `bitrise-webhooks`URLを [Deveo](https://deveo.com)リポジトリに登録するだけで済みます。

## Deveoのwebhook URL　取得

1. アプリページの`Code`タブに移動し、`INCOMING WEBHOOKS` メニューで`SETUP MANUALLY`をクリックします。
2. ドロップダウンメニューから`Deveo`を選択します。

   ![Screenshot](/img/bitrise-deveo-webhook.png)
3. 選択したサービスのWebhook URLをコピーします。

## Deveoでwebhook設定

1. [app.deveo.com](https://app.deveo.com)のリポジトリを開きます。
2. プロジェクトの`Hooks`に移動します。

   ![Screenshot](/img/webhooks/deveo-hooks.png)
3. 右側の`+`をクリックして、新しいRepository Hookを追加します。
4. リポジトリを選択して`Webhook`サービスを選択します。

   ![Screenshot](/img/webhooks/deveo-add-hooks.png)
5. `bitrise-webhooks` URL（`Url`フィールドに`.../h/deveo/BITRISE-APP-SLUG/BITRISE-APP-API-TOKEN)`を入力します。
6. `Content type`フィールドに`json`と入力します。
7. `Save hook`をクリックします。

   ![Screenshot](/img/webhooks/deveo-save-hook.png)

**コードをプッシュする**か**新しいタグをプッシュす**ると、ビルドがトリガされます（Bitriseのイベントに対してトリガマッピングが定義されている場合）。