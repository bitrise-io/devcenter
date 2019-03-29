---
title: Gogs webhookの追加(Adding a Gogs webhook)
redirect_from: []
date: 2019-03-28 11:09:04 +0000
published: false

---
{% include not_translated_yet.html %}

指定したアクションを実行するたびにBitriseが自動的にアプリのビルドを開始するように Webhookを設定できます。 Gogsの場合、`bitrise-webhooks`のURLをGogsリポジトリの Webhookとして登録するだけです。

##  Gogsのwebhook URLを取得

1. アプリページの`Code`タブに移動し、`INCOMING WEBHOOKS`メニューの`SETUP MANUALLY`をクリックします。
2. ドロップダウンメニューから`Gogs`を選択します。

   ![Screenshot](/img/bitrise-gogs-webhook.png)
3. 選択したサービスのWebhook URLをコピーしてください。

## Gogsにウェブフックを設定する

1. リポジトリのホスティングURLでプロジェクトを開きます。
2. プロジェクトの `Settings`に移動します。
3. `Webhooks`、`Add Webhook`、`Gogs`の順に選択します。

   ![Screenshot](/img/webhooks/gogs-webhook-select.png)
4. `Payload URL`フィールドに、`bitrise-webhooks`のURL(`.../h/gogs/BITRISE-APP-SLUG/BITRISE-APP-API-TOKEN`) を指定します。

   ![Screenshot](/img/webhooks/add-webhook-gogs.png)
5. `Content Type`を`application/json`に設定します
6. 現時点ではSecretは必要ありません
7. `Just the push event`でトリガーが発生するように設定します。

   ![Screenshot](/img/webhooks/gogs-webhook-triggered.png)
8. `Add Webhook`をクリックします

完了です！GogsリポジトリにコードをプッシュするたびBitrise上でビルドが開始されます。