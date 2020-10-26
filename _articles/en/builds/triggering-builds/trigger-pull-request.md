---
last_modified_at: '2020-03-12'
title: Triggering builds with Pull Requests
tag:
- triggers
- git
- builds
description: You can set up a trigger so that every time a pull request is opened
  from a specified source branch to a specified target branch of your repository,
  a build is automatically triggered on Bitrise.
redirect_from: []
summary: ''
menu:
  triggering-builds:
    weight: 3

---
{% include video.html embed_url="https://www.youtube.com/embed/MRQRcoI6uBI" %}

You can set up a trigger so that every time a pull request is opened from a specified source branch to a specified target branch of your repository, a build is automatically triggered on Bitrise.

{% include message_box.html type="important" title="Webhooks for triggering builds" content="Triggering builds automatically requires an incoming webhook set up with the hosting service of your repository. Read more in the [Webhooks](/webhooks) section."%}

By default, every new app you add will have a trigger that triggers a build every time any pull request is opened in your repository.

1. Open your app on [bitrise.io](https://www.bitrise.io).
2. Open the `Workflow Editor`.
3. Select the `Triggers` tab.
4. Select the `PULL REQUEST` option.

   ![{{ page.title }}](/img/trigger-pull-request.png)
5. In the existing trigger, click the `SOURCE BRANCH` and `TARGET BRANCH` options.

   If you have your own trigger set up already, click the `+ ADD TRIGGER` option to set up a new one.
6. Type the names of the source branch and the target branch. Make sure there are no spelling errors, otherwise the trigger won't work.

   You can leave either the source or target branch fields, or both, empty: the trigger will work accordingly. For example, if you leave both empty, as is the default with new apps, every pull request will trigger a build.
7. Select the workflow you wish to trigger (for example, `primary`).
8. Click `Save` in the top right corner.

And you're done! From now on, if a pull request is opened in your repository, Bitrise will trigger a build with the selected workflow!

{% include banner.html banner_text="Let's set up a trigger" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}