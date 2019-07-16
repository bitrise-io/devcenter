---
title: Adding a Slack webhook
menu:
  webhooks-main:
    weight: 10

---
## Getting the webhook URL

You can register the `bitrise-webhooks` URL as either an [Outgoing Webhook](https://my.slack.com/services/new/outgoing-webhook) or as a [slash command](https://my.slack.com/services/new/slash-commands) for your Slack team.

1. Go to your app's page on Bitrise.
2. Go to the **Code** tab.
3. Scroll down to the **INCOMING WEBHOOKS** section.
4. Click **SETUP MANUALLY.**

   ![](/img/slack-webhook.png)
5. Choose **Slack** from the dropdown menu.
6. Copy and paste the URL from the **Webhook URL for the selected service** field.

Once the URL is registered, check the usage section for all the accepted and required parameters you can define in the message, and for a couple of examples.

## Usage - the message format

Your message has to be in the format: `key:value|key:value|...`,
where the supported `keys` are:

At least one of these two parameters are required:

* `b` or `branch` - example: `branch: master`
* `w` or `workflow` - example: `workflow: primary`

Other, optional parameters:

* `t` or `tag` - example: `branch: master|tag: v1.0`
* `c` or `commit` - example: `workflow: primary|commit: eee55509f16e7715bdb43308bb55e8736da4e21e`
* `m` or `message` - example: `branch: master|message: ship it!!`

{% include message_box.html type="note" title="Parameter requirements" content="at least either `branch` or `workflow` has to be specified, and you can specify both if you want to. You're free to specify any number of optional parameters."%}

You can also send environment variables that will be available in your workflow with the format: `env[KEY1]:value1|ENV[KEY2]:value2`

An example with all parameters included: `workflow: primary|b: master|tag: v1.0|commit:eee55509f16e7715bdb43308bb55e8736da4e21e|m: start my build!|ENV[DEVICE_NAME]:iPhone 6S|ENV[DEVICE_UDID]:82667b4079914d4aabed9c216620da5dedab630a`

<div class="banner">
<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
<div class="deploy-text">Let's add a Slack webhook!</div>
<a target="_blank" href="https://app.bitrise.io/dashboard/builds"><button class="button">Go to your Dashboard</button></a>
</div>