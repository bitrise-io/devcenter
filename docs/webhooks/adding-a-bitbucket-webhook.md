To have Bitrise automatically start a build every time you push code into your repository you can set up a webhook at your code hosting service which will automatically trigger a build on Bitrise with the code you push to your repository.

## Get the webhook URL for Bitbucket

Navigate to the `Code` tab of your app's page and select `Bitbucket` from the dropdown at the webhooks section.

![Screenshot](/img/webhooks/webhooks_bitbucket.png)

Copy the webhook URL for the selected service.

## Setup webhook on Bitbucket

Navigate to your Bitbucket repository and select `Settings`.

![Screenshot](/img/webhooks/bitbucket_settings.png)

Select `Webhooks` from the left.

![Screenshot](/img/webhooks/bitbucket_settings_webhooks.png)

Select `Add Webhook`

![Screenshot](/img/webhooks/bitbucket_add_webhooks.png)

Paste the Bitbucket Webhook URL from Bitrise to the `URL` and add a `Title`.

![Screenshot](/img/webhooks/bitbucket_webhook_info.png)

Select `Choose from a full list of triggers`.

![Screenshot](/img/webhooks/bitbucket_webhook_trigger.png)

Select Repository `Push` and Pull Request `Created` and `Updated` triggers. After you are ready press the `Save` button and you are ready to roll!

![Screenshot](/img/webhooks/bitbucket_webhook_push_and_pr.png)
