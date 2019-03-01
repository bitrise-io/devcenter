---
title: Adding a Slack webhook
menu:
  webhooks:
    weight: 6

---
You can register the `bitrise-webhooks` URL (`.../h/slack/BITRISE-APP-SLUG/BITRISE-APP-API-TOKEN`) as either
an [Outgoing Webhook](https://my.slack.com/services/new/outgoing-webhook) or
as a [slash command](https://my.slack.com/services/new/slash-commands) for your Slack team.

Once the URL is registered check the *usage* section below for all the
accepted and required parameters you can define in the message, and
for a couple of examples.

### Usage - the message format

Your message have to be in the format: `key:value|key:value|...`,
where the supported `keys` are:

At least one of these two parameters are required:

* `b` or `branch` - example: `branch: master`
* `w` or `workflow` - example: `workflow: primary`

Other, optional parameters:

* `t` or `tag` - example: `branch: master|tag: v1.0`
* `c` or `commit` - example: `workflow: primary|commit: eee55509f16e7715bdb43308bb55e8736da4e21e`
* `m` or `message` - example: `branch: master|message: ship it!!`

**NOTE**: at least either `branch` or `workflow` have to be specified, and of course
you can specify both if you want to. You're free to specify any number of optional parameters.

You can also send environment variables that will be available in your workflow with the format: `env[KEY1]:value1|ENV[KEY2]:value2`

An example with all parameters included: `workflow: primary|b: master|tag: v1.0|commit:eee55509f16e7715bdb43308bb55e8736da4e21e|m: start my build!|ENV[DEVICE_NAME]:iPhone 6S|ENV[DEVICE_UDID]:82667b4079914d4aabed9c216620da5dedab630a`