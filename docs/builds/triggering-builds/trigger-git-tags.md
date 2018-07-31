You can specify a pattern for your Git Tags to trigger a specific workflow. This is a good way to build and deploy your app in a specific state. And it's very easy to set up!

Note that this requires an incoming webhook set up with the hosting service of your repository. Read more in the [Webhooks](/webhooks) section.

!!! note "Enabling Tag Push"
    Certain providers, such as GitLab, require Tag Push events to be specifically enabled in the webhook setup.

1. Open your app on [bitrise.io](hhtps://www.bitrise.io).

1. Open the `Workflow Editor`.

1. Select the `Triggers` tab.

1. Select the `TAG` option.

    ![Tag trigger](/img/getting-started/triggering-builds/tag-trigger.png)

1. Click `+ ADD TRIGGER`.

1. In the `TAG` window, add the tag that you wish to trigger a build.

1. Select the workflow you wish to trigger (for example, `primary`).

1. Click `Save` in the top right corner.

And you're done!
