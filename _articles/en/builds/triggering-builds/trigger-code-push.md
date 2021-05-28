---
last_modified_at: '2020-03-12'
title: Triggering builds with code push
tag:
- builds
- triggers
- git
description: You can set up triggers so that every time code is pushed to the specified
  branch of your repository, a build is automatically triggered on Bitrise.
redirect_from: []
summary: ''
menu:
  triggering-builds:
    weight: 2

---
{% include video.html embed_url="https://www.youtube.com/embed/MRQRcoI6uBI" %}

You can set up triggers so that every time code is pushed to the specified branch of your repository, a build is automatically triggered on Bitrise.

{% include message_box.html type="important" title="Webhooks for triggering builds" content="Triggering builds automatically requires an incoming webhook set up with the hosting service of your repository. Read more in the [Webhooks](/webhooks/webhooks-index/) section."%}

By default, every new app you add will have a trigger that triggers a build every time code is pushed to any branch of your repository.

1. Open your app on [bitrise.io](https://www.bitrise.io).
2. Open the `Workflow Editor`.
3. Select the `Triggers` tab.
4. Select the `PUSH` option.

   ![{{ page.title }}](/img/trigger.png)
5. In the existing trigger, click the `Push branch` option.
   If you have an existing trigger set up already, click the `+ ADD TRIGGER` option to set up a new one.
6. Type in the name of the branch (for example, `master`). Make sure there are no spelling errors, otherwise the trigger won't work.
7. Select the workflow you wish to trigger (for example, `primary`).
8. Click `Save` in the top right corner.

{% include message_box.html type="important" title="Using patterns when specifying a branch or tag" content="The `*` symbol can be used in your configured triggers as a wildcard in branch or tag names. It can also be used in patterns. For example, the pattern `*-dev` can be used for any branches or tags with the suffix `-dev`. Please note that when there are multiple triggers, only the first matching trigger will start a workflow."%}

You're done! From now on, if code gets pushed to the selected branch of your app's repository, Bitrise will trigger a build with the selected workflow!

{% include banner.html banner_text="Let's set up a trigger!" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}