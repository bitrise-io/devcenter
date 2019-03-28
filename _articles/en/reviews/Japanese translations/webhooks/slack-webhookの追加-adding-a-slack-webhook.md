---
title: Slack webhookの追加（Adding a Slack webhook）
redirect_from: []
date: 2019-03-28 13:25:57 +0000
published: false

---
{% include not_translated_yet.html %}

You can register the `bitrise-webhooks` URL (`.../h/slack/BITRISE-APP-SLUG/BITRISE-APP-API-TOKEN`) as either an [Outgoing Webhook](https://my.slack.com/services/new/outgoing-webhook) or as a [slash command](https://my.slack.com/services/new/slash-commands) for your Slack team.

Once the URL is registered check the _usage_ section below for all the accepted and required parameters you can define in the message, and for a couple of examples.

`bitrise-webhooks` URL(`.../h/slack/BITRISE-APP-SLUG/BITRISE-APP-API-TOKEN`) は、[Outgoing Webhook](https://my.slack.com/services/new/outgoing-webhook) またはSlackチームの[slash command](https://my.slack.com/services/new/slash-commands)として登録できます。 

 URLが登録されたら、メッセージで定義できるすべての承認済みパラメータと必須パラメータについて、およびいくつかの例について、以下の使用方法のセクションを確認してください。

### Usage - the message format  使用法 - メッセージフォーマット

Your message have to be in the format: `key:value|key:value|...`, where the supported `keys` are:

At least one of these two parameters are required: 

メッセージのフォーマットは`key:value|key:value|...`でなければなりません。

以下の2つのパラメータのうち少なくとも1つは必要です：

* `b` or `branch` - example: `branch: master`
* `w` or `workflow` - example: `workflow: primary`
* `b`または`branch`  - 例： `branch: master`
* `w`または`workflow` - 例： `workflow: primary`

Other, optional parameters:

オプションのパラメータ

* `t` or `tag` - example: `branch: master|tag: v1.0`
* `c` or `commit` - example: `workflow: primary|commit: eee55509f16e7715bdb43308bb55e8736da4e21e`
* `m` or `message` - example: `branch: master|message: ship it!!`
* `t`または`tag` - 例：`branch: master|tag: v1.0`
* `c`または`commit`  - 例：`workflow: primary|commit: eee55509f16e7715bdb43308bb55e8736da4e21e`
* `m`または`message`- 例：`branch: master|message: ship it!!`

**NOTE**: at least either `branch` or `workflow` have to be specified, and of course you can specify both if you want to. You're free to specify any number of optional parameters.

You can also send environment variables that will be available in your workflow with the format: `env[KEY1]:value1|ENV[KEY2]:value2`

An example with all parameters included: `workflow: primary|b: master|tag: v1.0|commit:eee55509f16e7715bdb43308bb55e8736da4e21e|m: start my build!|ENV[DEVICE_NAME]:iPhone 6S|ENV[DEVICE_UDID]:82667b4079914d4aabed9c216620da5dedab630a`

注意：少なくとも`branch`または`workflow`のいずれかを指定する必要があります。もちろん、必要に応じて両方を指定することもできます。オプションのパラメータはいくつでも自由に指定でき、  ワークフローで使用可能になる環境変数を次の形式で送信することもできます：`env[KEY1]:value1|ENV[KEY2]:value2`

すべてのパラメータの例：`workflow: primary|b: master|tag:　v1.0|commit:eee55509f16e7715bdb43308bb55e8736da4e21e|m: start my build!|ENV[DEVICE_NAME]:iPhone 6S|ENV[DEVICE_UDID]:82667b4079914d4aabed9c216620da5dedab630a`