---
last_modified_at: 
title: Adding outgoing webhooks
tag:
- webhooks
- " triggers"
description: You can configure Bitrise to send build event notifications to any service
  you would like. A build event is when a build is starts and when a build ends.
redirect_from: []
menu:
  webhooks-main:
    weight: 18

---
You can configure Bitrise to send build event notifications to any service you would like. A build event is:

* When a build is started.
* When a build ends.

You can use this notification to share build statuses with your git provider if we don’t support it yet, notify only the right team about build success or failure, or use it to automate your in-house release pipeline.

You can add, remove and edit your webhooks easily on the website interface.

## Adding an outgoing webhook

You can set up and configure the webhooks sent by Bitrise on the web UI. Let's see how!

1. Go to your app's page on [bitrise.io](https://www.bitrise.io) and open the **Code** tab.
2. Click **+ Add webhook**.

   ![](/img/outgoing-webhook.png)
3. Enter the URL of the service where you wish to send the notification in the **URL** field.
4. Select either the **Send me everything** or the **Select individual events** option.
   * **Send me everything**: every supported event type will trigger the webhook. Currently, only build events are supported but there will be other options in the future!
   * **Select individual events**: you can specify the individual events that should trigger the webhook.
5. Click **Create Webhook**.

And you're done! You can modify your webhook at any time by clicking **Edit** next to the webhook URL displayed.

### Adding custom headers to outgoing webhooks

You can add extra headers to your outgoing webhooks via the **Code** tab of the web interface. For example, if you have an API listening to the webhook, you can track the requests with API keys set as a custom header.

You can add custom headers either when:

* [Creating a new outgoing webhook](/webhooks/adding-outgoing-webhooks#adding-an-outgoing-webhook).
* Modifying an existing outgoing webhook by clicking the **Edit** button next to the URL.

Add the header:

1. Find the **WEBHOOK HEADERS** section.

   ![](/img/webhook-headers.png)
2. Add a key and a value to the header. You need both to be able to save the header.
3. Click **Add header**.
4. Click **Create webhook**/**Update webhook**.

## Checking and resending webhook deliveries

You can check if the notifications were successfully sent or not, and you can check both the payload and the response. The deliveries are marked with appropriate status code, depending on whether the delivery was successful. If it was, you will see a green check mark; if it failed, you will see an orange triangle.

1. Go to the **Recent deliveries** section of the **Outgoing Webhooks** menu.
2. Click an outgoing webhook.

   ![](/img/response-webhook.png)
3. Select the **REQUEST** tab to see and, if you wish, modify the payload that was sent to the specified URL.

   An example payload:

       {
         "build_slug": "58f4da148d884d68",
         "build_number": 3,
         "app_slug": "de7829a7317d976e",
         "build_status": 0,
         "build_triggered_workflow": "primary",
         "git": {
           "provider": "github",
           "src_branch": "master",
           "dst_branch": "master",
           "pull_request_id": 0,
           "tag": null
         }
       }
4. Select the **RESPONSE** tab to see the response from the service you sent the notification to.
5. You can redeliver any delivery. Open the delivery you need and click **Redeliver**.

   ![](/img/payload-redelivery.png)

{% include banner.html banner_text="Let's add an outgoing webhook!" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your Dashboard" %}