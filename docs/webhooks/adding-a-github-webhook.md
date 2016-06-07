To have Bitrise automatically start a build every time you push code into your repository you can set up a webhook at your code hosting service which will automatically trigger a build on Bitrise with the code you push to your repository.

## Get the webhook URL for GitHub

Navigate to the `Code` tab of your app's page and select `GitHub` from the dropdown at the webhooks section.

![Screenshot](https://www.filepicker.io/api/file/PsJWPs8yR5iL3yPC9hQP)

Copy the webhook URL for the selected service.

## Setup webhook on GitHub

Navigate to your GitHub repository and select `Settings`.

![Screenshot](https://www.filepicker.io/api/file/azZor2oLQ3uRM7cE5xkQ)

Select `Add webhook` under Webhooks & Services.

![Screenshot](https://www.filepicker.io/api/file/NNCEwWaQ0iRJsrmN8Pi7)

Paste the GitHub Webhook URL from Bitrise to the Payload URL.

![Screenshot](https://www.filepicker.io/api/file/ZGqRm2GmRJOxOtKZqYs5)

Select `Let me select individual events`.

![Screenshot](https://www.filepicker.io/api/file/gnMC4mNvSUS8TuwiG2gA)

Select `Pull request` and `Push`. After you are ready press the `Add webhook` button and you are ready to roll!

![Screenshot](https://www.filepicker.io/api/file/hN8fF6ivRaKnaHBVojRb)
