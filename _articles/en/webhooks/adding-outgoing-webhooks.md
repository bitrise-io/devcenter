---
title: Adding outgoing webhooks
menu:
  webhooks:
    weight: 10

---
You can configure Bitrise to send build event notifications to any service you would like. A build event is:

- when a build is started
- when a build ends.

You can use this notification to share build statuses with your git provider if we don’t support it yet, notify only the right team about build success or failure, or use it to automate your in-house release pipeline.

You can add, remove and edit your webhooks easily on the website interface.

## Adding an outgoing webhook

You can set up and configure the webhooks sent by Bitrise on the web UI. Let's see how!

1. Go to your app's page on [bitrise.io](https://www.bitrise.io) and open the `Code` tab.

1. Click `+ Add webhook`.

    ![Adding outgoing webhook](/img/webhooks/adding-outgoing.png)

1. Enter the URL of the service where you wish to send the notification in the `URL` field.

1. Select either the `Send me everything` or the `Select individual events` option.

    - `Send me everything`: every supported event type will trigger the webhook. Currently, only build events are supported but there will be other options in the future!
    - `Select individual events`: you can specify the individual events that should trigger the webhook.

1. Click `Create Webhook`.

And you're done! You can modify your webhook at any time by clicking `Edit` next to the webhook URL displayed.

### Adding custom headers to outgoing webhooks

You can add extra headers to your outgoing webhooks via the `Code` tab of the web interface. For example, if you have an API listening to the webhook, you can track the requests with API keys set as a custom header.

You can add custom headers either when:

- [creating a new outgoing webhook](/webhooks/adding-outgoing-webhooks#adding-an-outgoing-webhook).
- modifying an existing outgoing webhook by clicking the `Edit` button next to the URL.

Add the header:

1. Find the `WEBHOOK HEADERS` section.

    ![Webhook headers](/img/webhooks/webhook-headers.png)

1. Add a key and a value to the header. You need both to be able to save the header.

1. Click `Add header`.

1. Click `Create webhook`/`Update webhook`.

## Checking and resending webhook deliveries

You can check if the notifications were successfully sent or not, and you can check both the payload and the response. The deliveries are marked with appropriate status code, depending on whether the delivery was successful. If it was, you will see a green check mark; if it failed, you will see an orange triangle.

1. Go to the `Recent deliveries` section of the `Outgoing Webhooks` menu.

1. Click an outgoing webhook.

    ![Outgoing webhook](/img/webhooks/outgoing-webhook.jpeg)

1. Select the `REQUEST` tab to see and, if you wish, modify the payload that was sent to the specified URL.

    An example payload:

        {
          "build_slug":"1234abcd",
          "build_number":3,
          "app_slug":"abcd1234",
          "git": {
            "provider":"github",
            "src_branch":"feature/branch",
            "dst_branch":master, # If the build was triggered by a pull request
            "pull_request_id":32 # If the build was triggered by a pull request
          }
        }

1. Select the `RESPONSE` tab to see the response from the service you sent the notification to.

1. You can redeliver any delivery. Open the delivery you need and click `Redeliver`.

    ![Redeliver](/img/webhooks/redeliver-payload.jpeg)