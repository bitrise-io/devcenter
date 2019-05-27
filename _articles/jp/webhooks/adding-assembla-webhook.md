---
title: Assembla webhookの追加
menu:
  webhooks-main:
    weight: 17

---
コードプッシュやプルリクエストなどの指定されたアクションを実行するたびにBitriseが自動的にアプリのビルドをトリガーするようにwebhookを設定できます。 Assemblaの場合は、`bitrise-webhooks`URLをスペース [Assembla](https://assembla.com) に追加するだけです。

## Assemblaのwebhook URLを取得

1. アプリのページの`Code`タブに移動し、`INCOMING WEBHOOKS`メニューの`SETUP MANUALLY`をクリックします。
2. ドロップダウンメニューから`Assembla`を選択します。

   ![Screenshot](/img/bitrise-assembla-webhook.png)
3. 選択したサービスのWebhook URLをコピーしてください。

## Assemblaでwebhook設定

1. または組織のassemblelaドメインで自分のスペースを開きます。
2. スペースの`Webhooks`セクションに行きます。
3. `Create New Webhook`を選択します。
4. `Title`を`BitRise Webhook`に設定します。
5. `bitrise-webhooks`URLを指定してください。`External url`フィールドの (`.../h/assembla/BITRISE-APP-SLUG/BITRISE-APP-API-TOKEN`)
6. `Content type`フィールドで`application/json`を選択します。
7. 次のコードを`Content`に貼り付けます：

       {"assembla": {"space": "%{space}", "action": "%{action}", "object": "%{object}"}, "message": {"title": "%{title}", "body": "%{body}", "author": "%{author}"}, "git": {"repository_suffix": "%{repository_suffix}", "repository_url": "%{repository_url}", "branch": "%{branch}", "commit_id": "%{commit_id}"}}
8. セクションで`Code commits`または`Git Push`を選択します。
9. `Add`をクリックします。

次回コードをプッシュしたときにビルドがトリガーされます（Bitriseのイベントに対してトリガーマッピングが定義されている場合）。