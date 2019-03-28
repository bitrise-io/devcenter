---
title: Webhooks API
redirect_from: []
date: 2019-03-27 15:58:09 +0000
published: false

---
Both incoming and outgoing webhooks can be set up with the Bitrise API.

### Incoming webhooks

Incoming webhooks enable users to set up automatic triggers for their apps on Bitrise: a Bitrise webhook registered on GitHub can automatically trigger a build when code is pushed to the GitHub repository.

To set up a webhook, you must have connected your Bitrise account to your Git provider account: this allows Bitrise to register the webhook automatically.

Register a webhook with the API by calling the `register-webhook` endpoint with an existing app slug:

```bash
curl -X POST -H 'Authorization: ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/register-webhook'
```

This will register a webhook to the Git provider of the application. Afterwards, you can set up automatic triggers either on the website or via the Trigger Map in the application's `bitrise.yml` file.

### Outgoing webhooks

Outgoing webhooks enable integration with other services: specifically, they are used to notify other services about Bitrise build events.

{% include message_box.html type="info" title="Build status reports" content="Notifying your Git provider about the build status does not require outgoing webhooks."%} 

To set up an outgoing webhook for an application, you need to specify the app itself and at least two of the creation parameters:

* The webhook URL: you can get this from the service you want to integrate with Bitrise.
* The events that trigger the webhook. Currently, this takes two possible values: "all" and "build". 