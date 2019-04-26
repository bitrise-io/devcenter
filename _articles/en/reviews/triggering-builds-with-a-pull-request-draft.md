---
title: Triggering builds with a Pull Request - draft
redirect_from: []
date: 2019-04-16 13:51:35 +0000
published: false

---
You can set up a trigger so that every time a pull request is opened from a specified source branch to a specified target branch of your repository, a build is automatically triggered on Bitrise.

Note that this requires an incoming webhook set up with the hosting service of your repository. Read more in the [Webhooks](/webhooks) section.

By default, every new app you add will have a trigger that triggers a build every time any pull request is opened in your repository.

1. Open your app on [bitrise.io](https://www.bitrise.io).
2. Open the `Workflow Editor`.
3. Select the `Triggers` tab.
4. Select the `PULL REQUEST` option.

   ![](/img/trigger-pull-request.png)
5. In the existing trigger, click the `SOURCE BRANCH` and `TARGET BRANCH` options.

   If you have your own trigger set up already, click the `+ ADD TRIGGER` option to set up a new one.
6. Type the names of the source branch and the target branch. Make sure there are no spelling errors, otherwise the trigger won't work.

   You can leave either the source or target branch fields, or both, empty: the trigger will work accordingly. For example, if you leave both empty, as is the default with new apps, every pull request will trigger a build.
7. Select the workflow you wish to trigger (for example, `primary`).
8. Click `Save` in the top right corner.

And you're done! From now on, if a pull request is opened in your repository, Bitrise will trigger a build with the selected workflow!

### Manual approval for PR builds

Not all Pull Requests need to be built. After all, for most projects, anyone can create a fork of the repository and submit a Pull Request. However, if an app on Bitrise is set up with Secrets that are exposed for Pull Request builds, for example, then you probably don't want just anyone to be able to access those secrets.

That is why you have the option to require approval for a Pull Request before it can trigger a build on Bitrise. This feature works somewhat differently for public and private apps:

* **Private apps**: Pull Requests submitted from fork require approval by default if any Secrets are marked to be exposed for Pull Requests.
* **Public apps**: Pull Requests submitted from fork require approval by default and it cannot be changed. Public apps cannot opt out of this feature.

To set up manual approval, you need to be an **admin** or an **owner** on the application's team.

1. Open the app on Bitrise.
2. Go to the `Settings` tab.
3. Scroll down to `Enable manual approval for builds triggered by pull requests`.

   ![](/img/manual-approval.png)

   Please note that you can only change this setting for private apps! For public apps, this is ALWAYS enabled. 