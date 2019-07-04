---
title: Triggering builds
tag:
- builds
- webhooks
- triggers
- git
summary: 'Trigger builds manually or by setting up automatic triggers. Learn about
  the different trigger types, as well as about manually starting a new build. '
redirect_from: "/builds/triggering-builds/triggering-builds/"
menu:
  builds-main:
    identifier: triggering-builds
    weight: 3

---
You can start builds on Bitrise either by:

* [Manually starting one](/builds/triggering-builds/starting-builds-manually/).
* [Scheduling one for a specific time](/builds/scheduling-builds/).
* Triggering them automatically by specifying a trigger event.

{% include message_box.html type="important" title="Webhooks" content="To automatically trigger builds, you need to set up an incoming webhook with your git provider. This tells Bitrise that your repository has been updated. Read more in the [Webhooks](/webhooks/index/) section."%}

You can automatically trigger builds by specifying a trigger event and a workflow. You can specify multiple triggers, and add new triggers or remove existing ones any time you wish.

By default, every new app you add will have two triggers: one that triggers a build every time code is pushed to ANY branch of your repository, and another that triggers a build every time a pull request is opened within your repository. You can change or remove these, of course.

You can manage the triggers in the `Triggers` section of the `Workflow Editor` or you can directly edit the bitrise.yml of your app to set them up. In this section of our DevCenter, we cover how to set up and manage triggers on the website UI!

* [Triggering builds with code push](/builds/triggering-builds/trigger-code-push)
* [Triggering builds with pull requests](/builds/triggering-builds/trigger-pull-request)
* [Triggering builds with Git Tags](/builds/triggering-builds/trigger-git-tags)
* [Starting parallel builds with a single trigger](/builds/triggering-builds/trigger-multiple-workflows)
* [Reporting the build status to your git hosting provider](/builds/triggering-builds/status-reporting)