---
title: Triggering builds
menu:
  triggering-builds:
    weight: 1

---
You can trigger builds on Bitrise either by:

- [manually starting one](/builds/triggering-builds/starting-builds-manually/)
- [scheduling one for a specific time](/builds/scheduling-builds/)
- triggering them automatically by specifying a trigger event.

If you set up incoming webhooks to Bitrise, you can automatically trigger builds by specifying a trigger event and a workflow. You can specify multiple triggers, and add new triggers or remove existing ones any time you wish.

By default, every new app you add will have two triggers: one that triggers a build every time code is pushed to ANY branch of your repository, and another that triggers a build every time a pull request is opened within your repository. You can change or remove these, of course.

You can manage the triggers in the `Triggers` section of the `Workflow Editor` or you can directly edit the bitrise.yml of your app to set them up. In this section of our DevCenter, we cover how to set up and manage triggers on the website UI!

- [Triggering builds with code push](/builds/triggering-builds/trigger-code-push)
- [Triggering builds with pull requests](/builds/triggering-builds/trigger-pull-request)
- [Triggering builds with Git Tags](/builds/triggering-builds/trigger-git-tags)
- [Starting parallel builds with a single trigger](/builds/triggering-builds/trigger-multiple-workflows)
- [Reporting the build status to your git hosting provider](/builds/triggering-builds/status-reporting)