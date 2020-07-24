---
last_modified_at: 
tag: []
title: Webhooks
redirect_from: []
description: ''
menu:
  main:
    identifier: webhooks-main
    weight: 9

---
A webhook is a user-defined callback that is triggered by some event, such as pushing code to a repository. Bitrise makes extensive use of webhooks:

* Incoming webhooks, registered with your Git service provider, are used to automatically trigger builds on Bitrise.
* Outgoing webhooks are used to send reports of build events to other services, such as Slack.

You can add an incoming webhook automatically either when creating an app or later; it's also possible to manually add a webhook to any supported service.

{% include message_box.html type="important" title="Triggers and webhooks" content="If you want to be able to automatically trigger builds on Bitrise, you need to register a webhook with your git service provider! For example, if you want a pull request made in your GitHub repository to trigger a build, you must register a Bitrise webhook on GitHub."%}

Outgoing webhooks can be added either on the website or [via the Bitrise API](/api/incoming-and-outgoing-webhooks/#outgoing-webhooks/).

**Details:**

* [Adding incoming webhooks](https://devcenter.bitrise.io/webhooks/adding-webhooks/)
* [Adding outgoing webhooks](/webhooks/adding-outgoing-webhooks/)
* [Webhook troubleshooting](/webhooks/troubleshooting/)