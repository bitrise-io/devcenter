---
title: Why isn't a build triggered when I push code into the repository?
menu:
  faq:
    weight: 8

---
If no builds are triggered automatically when you push code into your repository,
you should __make sure your webhook is properly set on the git hosting
service you use (GitHub, Bitbucket, GitLab, ...)__.

You can find the webhook related setup and troubleshooting guides
in the [Webhooks section of the DevCenter](/webhooks/).

If the webhook is present on the git hosting service, you should
check the [Troubleshooting section of the Webhooks docs](/webhooks/troubleshooting).