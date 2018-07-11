You can set up triggers so that every time code is pushed to the specified branch of your repository, a build is automatically triggered on Bitrise.

Note that this requires an incoming webhook set up with the hosting service of your repository. Read more in the [Webhooks](/webhooks) section.

By default, every new app you add will have a trigger that triggers a build every time code is pushed to any branch of your repository.

1. Open your app on [bitrise.io](hhtps://www.bitrise.io).

1. Open the `Workflow Editor`.

1. Select the `Triggers` tab.

1. Select the `PUSH` option.

    ![Push trigger](/img/getting-started/triggering-builds/push-trigger.png)

1. In the existing trigger, click the `Push branch` option.

    !!! note "`+ ADD TRIGGER` option"
        If you have an existing trigger set up already, click the `+ ADD TRIGGER` option to set up a new one.

1. Type in the name of the branch (for example, `master`). Make sure there are no spelling errors, otherwise the trigger won't work.

1. Select the workflow you wish to trigger (for example, `primary`).

1. Click `Save` in the top right corner.

And you're done! From now on, if code gets pushed to the selected branch of your app's repository, Bitrise will trigger a build with the selected workflow!
