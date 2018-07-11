Most source code hosting service provides a feature to register webhooks. A webhook is basically an URL which will be called on specified events.

To have Bitrise automatically start a build every time you push code into your repository you can set up a webhook at your code hosting service which will automatically trigger a build on Bitrise with the code you push to your repository.

## Setting up incoming webhooks automatically

If you select `GitHub` or `Bitbucket` as the source code provider when you add your app Bitrise automatically sets up a webhook for it with a click of a button at the end of your app setup journey. In this case, you can skip this tutorial.

## Setting up incoming webhooks by hand

You can manually setup or change your webhooks after you registered your application.
We support multiple webhook providers. You can find the supported providers in your application's `Code` tab.

![Screenshot](/img/webhooks/webhook-providers.png)

!!! note "Custom webhook support"
    [Our webhook processor is Open Sourced](https://github.com/bitrise-io/bitrise-webhooks). If you are looking for a not supported solution, you can create an issue on the GitHub page or create a pull request with the implementation.

    You can also run your own webhook provider behind your own firewall if required.

You can find detailed description about the setup on the Code tab or select a provider to check its devcenter article:

* [Adding a GitHub webhook](/webhooks/adding-a-github-webhook)
* [Adding a Bitbucket webhook](/webhooks/adding-a-bitbucket-webhook)
* [Adding webhooks for Gitlab](/webhooks/adding-a-gitlab-webhook)
* [Adding webhooks for Visual Studio Online / Visual Studio Team Services](/webhooks/adding-a-visual-studio-webhook)
* [Adding webhooks for Slack](/webhooks/adding-a-slack-webhook)
* [Adding webhooks for Gogs](/webhooks/adding-a-gogs-webhook)
* [Adding webhooks for Deveo](/webhooks/adding-deveo-webhook)
* [Adding webhooks for Assembla](/webhooks/adding-assembla-webhook)

## Setting up outgoing webhooks

You can also set up outgoing webhooks on Bitrise. With these, Bitrise can notify any selected service about your build events. A build event is:

- when a build is started
- when a build ends.

## Troubleshooting

See the [Webhook Troubleshooting](/webhooks/troubleshooting) guide
for webhook related troubleshooting / debugging notes.
