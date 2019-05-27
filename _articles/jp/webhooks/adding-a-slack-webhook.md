---
title: Slack webhookの追加
menu:
  webhooks-main:
    weight: 13

---
`bitrise-webhooks` URL(`.../h/slack/BITRISE-APP-SLUG/BITRISE-APP-API-TOKEN`) は、[Outgoing Webhook](https://my.slack.com/services/new/outgoing-webhook) またはSlackチームの[slash command](https://my.slack.com/services/new/slash-commands)として登録できます。

URLが登録されたら、メッセージで定義できるすべての承認済みパラメータと必須パラメータについて、およびいくつかの例について、以下の使用方法のセクションを確認してください。

### 使用法 - メッセージフォーマット

メッセージのフォーマットは`key:value|key:value|...`でなければなりません。

以下の2つのパラメータのうち少なくとも1つは必要です：

* `b`または`branch`  - 例： `branch: master`
* `w`または`workflow` - 例： `workflow: primary`

オプションのパラメータ

* `t`または`tag` - 例：`branch: master|tag: v1.0`
* `c`または`commit`  - 例：`workflow: primary|commit: eee55509f16e7715bdb43308bb55e8736da4e21e`
* `m`または`message`- 例：`branch: master|message: ship it!!`

注意：少なくとも`branch`または`workflow`のいずれかを指定する必要があります。もちろん、必要に応じて両方を指定することもできます。オプションのパラメータはいくつでも自由に指定でき、  ワークフローで使用可能になる環境変数を次の形式で送信することもできます：`env[KEY1]:value1|ENV[KEY2]:value2`

すべてのパラメータの例：`workflow: primary|b: master|tag:　v1.0|commit:eee55509f16e7715bdb43308bb55e8736da4e21e|m: start my build!|ENV[DEVICE_NAME]:iPhone 6S|ENV[DEVICE_UDID]:82667b4079914d4aabed9c216620da5dedab630a`