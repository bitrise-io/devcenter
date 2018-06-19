You can set up a trigger so that every time a pull request is opened from a specified source branch to a specified target branch of your repository, a build is automatically triggered on Bitrise.

Note that this requires an incoming webhook set up with the hosting service of your repository. Read more in the [Webhooks](/webhooks) section.

By default, every new app you add will have a trigger that triggers a build every time any pull request is opened within your repository.

1. Open your app on [bitrise.io](hhtps://www.bitrise.io).

1. Open the `Workflow Editor`.

1. Select the `Triggers` tab.

1. Select the `PULL REQUEST` option.

    ![PR trigger](/img/getting-started/triggering-builds/pull-request-trigger.png)

1. In the existing trigger, click the `SOURCE BRANCH` and `TARGET BRANCH` options.

    !!! note "`+ ADD TRIGGER` option"
        If you have your own trigger set up already, click the `+ ADD TRIGGER` option to set up a new one.

1. Type the names of the source branch and the target branch. Make sure there are no spelling errors, otherwise the trigger won't work.

    You can leave either the source or target branch fields, or both, empty: the trigger will work accordingly. For example, if you leave both empty, as is the default with new apps, every pull request will trigger a build.

1. Select the workflow you wish to trigger (for example, `primary`).

1. Click `Save` in the top right corner.

And you're done! From now on, if a pull request is opened in your repository, Bitrise will trigger a build with the selected workflow!
