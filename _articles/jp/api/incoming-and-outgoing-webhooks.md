---
changelog:
last_modified_at:
title: Incoming webhooksとOutgoing webhooks
redirect_from: []
date: '2019-04-09T15:10:42.000+00:00'
menu:
  api-main:
    weight: 12

---
Incoming webhooksとOutgoing webhooksの両方とも、Bitrise APIで設定できます。これらは、自動ビルドトリガーとビルドイベントを他のサービスにレポートするために重要です。

## Incoming webhooks

| エンドポイント | 機能 |
| --- | --- |
| [POST /apps/{app-slug}/register-webhook](https://api-docs.bitrise.io/#/app-setup/app-webhook-create) | 特定のアプリにIncoming webhookを登録 |

Incoming webhooksは、Bitrise上のユーザが登録したアプリに対し、自動トリガーを設定することを可能にします。例えば、GitHubに登録されたBitrise webhookは、コードがGitHubにpushされた時に自動的にトリガー(開始)されます。

webhookを設定するために、あなたのBitriseアカウントをGitプロバイダアカウントに紐付ける必要があります。そうすることで、Bitriseはwebhookを自動で登録することができるようになります。

 `register-webhook` エンドポイントを存在するアプリスラッグとともにコールすることで、webhookを登録する方法はこちらです。

    curl -X POST -H 'Authorization: ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/register-webhook'

このAPIコールは、アプリがあるGitプロバイダにwebhookを登録します。その後、ウェブサイトまたはアプリが持つ `bitrise.yml` ファイル内のTrigger Map経由で自動トリガーを設定することができるようになります。

## Outgoing webhooks

| エンドポイント | 機能 |
| --- | --- |
| [GET /apps/{app-slug}/outgoing-webhooks](https://api-docs.bitrise.io/#/outgoing-webhook/outgoing-webhook-list) | アプリのoutgoing webhookリスト取得 |
| [POST /apps/{app-slug}/outgoing-webhooks](https://api-docs.bitrise.io/#/outgoing-webhook/outgoing-webhook-create) | アプリのoutgoing webhook作成 |
| [PUT /apps/{app-slug}/outgoing-webhooks/{app-webhook-slug}](https://api-docs.bitrise.io/#/outgoing-webhook/outgoing-webhook-update) | アプリのoutgoing webhook更新 |
| [DELETE /apps/{app-slug}/outgoing-webhooks/{app-webhook-slug}](https://api-docs.bitrise.io/#/outgoing-webhook/outgoing-webhook-delete) | アプリのoutgoing webhook削除 |

Outgoing webhookは他のサービスとの統合を可能にします。特に他のサービスに通知する場合に利用してください。現在は、ビルドイベント通知のみサポートしています。「ビルドのトリガー(開始)」と「ビルドの終了」の2つのビルドイベントがサポートされています。

{% include message_box.html type="info" title="ビルドステータスレポート" content="あなたのGitプロバイダーにビルドステータスを通知する場合、Outgoing webhookは必要ありません。"%}

### Outgoing webhooksの作成

アプリのためのOutgoing webhookを設定するために、そのアプリ自体と、それ以外に少なくとも2つの作成パラメータを指定する必要があります。

* webhookのURL。Bitriseと統合したいサービス側からこのURLを取得することができます。
* このwebhookをトリガーするイベント。現在は "all" または "build" の2つの値のみ利用可能です。

キー/値のペアをリクエストに指定することで、カスタムヘッダーを設定することもできます。

リクエストの例:

    curl -X POST "https://api.bitrise.io/v0.1/apps/APP-SLUG/outgoing-webhooks" -H "accept: application/json" -H "Authorization: ACCESS-TOKEN" -H "Content-Type: application/json" -d "{ \"events\": [ \"build\" ], \"url\": \"example.webhook.com\", \"headers\": { \"KEY\": \"value\" }}"

レスポンスの例:

    {
      "slug": "01D72ARNH4KR7KMW3DG3NBKXRK",
      "url": "example.webhook.com",
      "events": [
        "build"
      ],
      "headers": {
        "KEY": "value"
      },
      "created_at": "2019-03-28T14:20:22.436825Z",
      "updated_at": "2019-03-28T14:20:22.436825Z"
    }

### Outgoing webhooksの変更と削除

すでに設定済みのwebhookを変更するため、あなたのリクエストに必要な全ての必須パラメータを指定する必要があります。言い換えるなら、もしURLだけを変更したい場合でも、そのリクエストは `events` パラメータに有効な値を保持している必要があります。

リクエストの例:

    curl -X PUT "https://api.bitrise.io/v0.1/apps/APP-SLUG/outgoing-webhooks/WEBHOOK-SLUG" -H "accept: application/json" -H "Authorization: ACCESS-TOKEN" -H "Content-Type: application/json" -d "{ \"events\": [ \"all\" ], \"url\": \"example2.webhook.com\"}"

レスポンスの例:

    {
      "data": {
        "slug": "01D72ARNH4KR7KMW3DG3NBKXRK",
        "url": "example2.webhook.com",
        "events": [
          "all"
        ],
        "headers": null,
        "created_at": "2019-03-28T14:20:22.436825Z",
        "updated_at": "2019-03-28T14:20:22.436825Z"
      }
    }

Outgoing webhookを削除するには、アプリスラッグとwebhookスラッグをリクエストに含むだけで行えます。

    curl -X DELETE "https://api.bitrise.io/v0.1/apps/APP-SLUG/outgoing-webhooks/WEBHOOK-SLUG" -H "accept: application/json" -H "Authorization: ACCESS-TOKEN"
