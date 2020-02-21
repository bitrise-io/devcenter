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
  faq-main:
    weight: 15

---
If no builds are triggered automatically when you push code into your repository, you should **make sure your webhook is properly set on the git hosting service you use (GitHub, Bitbucket, GitLab, ...)**.

You can find the webhook related setup and troubleshooting guides in the [Webhooks section of the DevCenter](/webhooks/).

If the webhook is present on the git hosting service, you should check the [Troubleshooting section of the Webhooks docs](/webhooks/troubleshooting).

<div class="banner">
	<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
	<div class="deploy-text">Now you know everything </div>
	<a target="_blank" href="https://app.bitrise.io/dashboard/builds"><button class="button">Go to Bitrise now</button></a>
</div>