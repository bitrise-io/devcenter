---
changelog: 
last_modified_at: 
tag: []
title: Webhooks
redirect_from: []
description: ''
menu:
  main:
    identifier: webhooks-main
    weight: 10

---
Webhook はリポジトリへのコードプッシュのようなイベントにトリガーされるユーザー定義のコールバックです。Bitrise は Webhook を広く利用しています。

* Git サービスプロバイダに登録された Incoming webhooks は Bitrise でビルドを自動的にトリガーするために使われます。
* Outgoing webhooks はビルドイベントを Slack のようなほかのサービスに通知するために使われます。

アプリを追加したときかそれ以降に Incoming webhook を自動的に追加できます。またサポートされたサービスに Webhook を手動で追加することもできます。

{% include message_box.html type="important" title="トリガーと Webhook" content="Bitrise でビルドを自動的にトリガーできるようにするには、Git サービスプロバイダに Webhook を登録する必要があります！たとえば、GitHub リポジトリのプルリクエストでビルドをトリガーするには、GitHub で Bitrise の webhook を登録する必要があります。"%}

Outgoing Webhooks はウェブサイトか [Bitrise API](/api/incoming-and-outgoing-webhooks/#outgoing-webhooks/) で追加できます。

**詳細:**

* [webhookの追加](/jp/webhooks/adding-webhooks/)
* [Outgoing webhookの追加](/jp/webhooks/adding-outgoing-webhooks/)
* [Webhook トラブルシューティング](/jp/webhooks/troubleshooting/)