---
last_modified_at: '2020-03-12'
title: Triggering builds with Git Tags
tag:
- git
- builds
- triggers
redirect_from: []
description: ''
summary: ''
menu:
  triggering-builds:
    weight: 8

---
{% include video.html embed_url="https://www.youtube.com/embed/MRQRcoI6uBI" %}

You can specify a pattern for your Git Tags to trigger a specific workflow. This is a good way to build and deploy your app in a specific state. And it's very easy to set up!

{% include message_box.html type="important" title="Webhooks for triggering builds" content="Triggering builds automatically requires an incoming webhook set up with the hosting service of your repository. Read more in the [Webhooks](/webhooks/webhooks-index/) section."%}

Note that certain providers, such as GitLab, require Tag Push events to be specifically enabled in the webhook setup.

1. Open your app on [bitrise.io](https://www.bitrise.io).
2. Open the `Workflow Editor`.
3. Select the `Triggers` tab.
4. Select the `TAG` option.

   ![{{ page.title }}](/img/tag-trigger.png)
5. Click `+ ADD TRIGGER`.
6. In the `TAG` window, add the tag that you wish to trigger a build.
7. Select the workflow you wish to trigger (for example, `primary`).
8. Click `Save` in the top right corner.

And you're done!

{% include banner.html banner_text="Trigger builds with Git tags" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}