---
title: Bitbucket webhookの追加
menu:
  webhooks:
    weight: 3
---
コードをプッシュするたびにBitriseで自動的にビルドを開始するために、ご利用のコードホスティングサービスにコードをリポジトリにプッシュした際に自動的に実行するwebhookを設定することができます。

webhookは自動でも手動でも登録することが可能です。このガイドでは __手動__ でwebhookを設定する手順をご紹介します。 [webhookの自動登録についてはこちらをご覧ください](/webhooks/#setting-up-incoming-webhooks-automatically)

## Bitbucket用webhook URLの取得

1. appページの `Code` タブへ移動し、`INCOMING WEBHOOKS` セクションの `SETUP MANUALLY` を選択します。

1. ドロップダウンメニューから `Bitbucket` を選択してください。

    ![Screenshot](/img/webhooks_bitbucket.png)

1. 選択したサービスのwebhook URLをコピーしてください。


## Bitbucketでのwebhookの設定

1. Bitbucketのリポジトリの `Settings` を選択してください。

    ![Screenshot](/img/webhooks/bitbucket_settings.png)

1. 左のメニューから `Webhooks` を選択してください。

    ![Screenshot](/img/webhooks/bitbucket_settings_webhooks.png)

1. `Add Webhook` を選択してください。

    ![Screenshot](/img/webhooks/bitbucket_add_webhooks.png)

1. `URL` にBitriseの設定画面からコピーしたBitbucketのWebhook URLをペーストし、 `Title` を入力してください。

    ![Screenshot](/img/webhooks/bitbucket_webhook_info.png)

1. `Choose from a full list of triggers` を選択してください。

    ![Screenshot](/img/webhooks/bitbucket_webhook_trigger.png)

1. リポジトリ `Push` 、プルリクエスト `Created` 、 `Updated` トリガを選択してください。 `Save` ボタンをを押せば準備完了です。

    ![Screenshot](/img/webhooks/bitbucket_webhook_push_and_pr.png)
