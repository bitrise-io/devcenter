---
title: Why isn't a build triggered when I push code into the repository?
tag:
- triggers
- builds
- troubleshooting
- git
description: |-
  If no builds are triggered automatically when you push code into your repository,
  you should make sure your webhook is properly set on the git hosting
  service you use (GitHub, Bitbucket, GitLab, ...).
redirect_from: []
menu:
  faq:
    weight: 16

---
If no builds are triggered automatically when you push code into your repository, you should **make sure your webhook is properly set on the git hosting service you use (GitHub, Bitbucket, GitLab, ...)**.

You can find the webhook related setup and troubleshooting guides in the [Webhooks section of the DevCenter](/webhooks/).

If the webhook is present on the git hosting service, you should check the [Troubleshooting section of the Webhooks docs](/webhooks/troubleshooting).

{% include banner.html banner_text="Now you know everything " url="https://app.bitrise.io/dashboard/builds" button_text="Go to Bitrise now" %}