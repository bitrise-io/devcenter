---
title: Incoming and outgoing webhooks
redirect_from: []
date: '2019-04-09T15:10:42.000+00:00'
menu:
  api-main:
    weight: 14

---
{% include not_translated_yet.html %}

Both incoming and outgoing webhooks can be set up with the Bitrise API. They are important for automatic build triggering and the reporting of build events to other services.

## Incoming webhooks

| Endpoints | Function |
| --- | --- |
| [POST /apps/{app-slug}/register-webhook](https://api-docs.bitrise.io/#/app-setup/app-webhook-create) | Register an incoming webhook for a specific application. |

Incoming webhooks enable users to set up automatic triggers for their apps on Bitrise: for example, a Bitrise webhook registered on GitHub can automatically trigger a build when code is pushed to the GitHub repository.

To set up a webhook, you must have connected your Bitrise account to your Git provider account: this allows Bitrise to register the webhook automatically.

Register a webhook with the API by calling the `register-webhook` endpoint with an existing app slug:

    curl -X POST -H 'Authorization: ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/register-webhook'

This will register a webhook to the Git provider of the application. Afterwards, you can set up automatic triggers either on the website or via the Trigger Map in the application's `bitrise.yml` file.

## Outgoing webhooks

| Endpoints | Function |
| --- | --- |
| [GET /apps/{app-slug}/outgoing-webhooks](https://api-docs.bitrise.io/#/outgoing-webhook/outgoing-webhook-list) | List the outgoing webhooks of an app. |
| [POST /apps/{app-slug}/outgoing-webhooks](https://api-docs.bitrise.io/#/outgoing-webhook/outgoing-webhook-create) | Create an outgoing webhook for an app. |
| [PUT /apps/{app-slug}/outgoing-webhooks/{app-webhook-slug}](https://api-docs.bitrise.io/#/outgoing-webhook/outgoing-webhook-update) | Update an outgoing webhook of an app. |
| [DELETE /apps/{app-slug}/outgoing-webhooks/{app-webhook-slug}](https://api-docs.bitrise.io/#/outgoing-webhook/outgoing-webhook-delete) | Delete an outgoing webhook of an app. |

Outgoing webhooks enable integration with other services: specifically, they are used to notify other services. Currently, only build event notifications are supported. There are two supported build events: triggering a build and finishing a build.

{% include message_box.html type="info" title="Build status reports" content="Notifying your Git provider about the build status does not require outgoing webhooks."%}

### Creating outgoing webhooks

To set up an outgoing webhook for an application, you need to specify the app itself and at least two of the creation parameters:

* The webhook URL: you can get this from the service you want to integrate with Bitrise.
* The events that trigger the webhook. Currently, this takes two possible values: "all" and "build".

You can also set up custom headers by specifying a key/value pair in the request.

Example request:

    curl -X POST "https://api.bitrise.io/v0.1/apps/APP-SLUG/outgoing-webhooks" -H "accept: application/json" -H "Authorization: ACCESS-TOKEN" -H "Content-Type: application/json" -d "{ \"events\": [ \"build\" ], \"url\": \"example.webhook.com\", \"headers\": { \"KEY\": \"value\" }}"

Example response:

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

### Modifying and deleting outgoing webhooks

To modify an existing webhook, you need to specify all the mandatory parameters in your request. In other words, even if you only want to change the URL, the request still has to contain a valid value for the `events` parameter.

Example request:

    curl -X PUT "https://api.bitrise.io/v0.1/apps/APP-SLUG/outgoing-webhooks/WEBHOOK-SLUG" -H "accept: application/json" -H "Authorization: ACCESS-TOKEN" -H "Content-Type: application/json" -d "{ \"events\": [ \"all\" ], \"url\": \"example2.webhook.com\"}"

Example response:

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

To delete an outgoing webhook, all you need to do is provide the app slug and the webhook slug in your request:

    curl -X DELETE "https://api.bitrise.io/v0.1/apps/APP-SLUG/outgoing-webhooks/WEBHOOK-SLUG" -H "accept: application/json" -H "Authorization: ACCESS-TOKEN"