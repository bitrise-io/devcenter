To have Bitrise automatically start a build every time you push code into your repository you can set up a webhook at your code hosting service which will automatically trigger a build on Bitrise with the code you push to your repository.

## Get the webhook URL for GitHub

Navigate to the `Code` tab of your app's page and select `GitHub` from the dropdown at the webhooks section.

![Screenshot](/img/webhooks/github-webhook-1.png)

Copy the webhook URL for the selected service.

## Setup webhook on GitHub

Navigate to your GitHub repository and select `Settings`.

![Screenshot](/img/webhooks/github-webhook-2.png)

Select `Add webhook` under Webhooks.

![Screenshot](/img/webhooks/github-webhook-3.png)

Paste the GitHub Webhook URL from Bitrise to the Payload URL...

![Screenshot](/img/webhooks/github-webhook-4.png)

And on the same page, select `Let me select individual events`.

![Screenshot](/img/webhooks/github-webhook-5.png)

Select `Pull request` and `Push`. After you are ready press the `Add webhook` button and you are ready to roll!

![Screenshot](/img/webhooks/github-webhook-6.png)
