---
title: Efficient CI/CD Workflow for iOS development
menu:
  tips-and-tricks:
    weight: 2
    title: Efficient CI/CD workflow for iOS development

---
To achieve an efficient workflow for rapid iOS app development you have to specify the
automation scenarios and the triggers to start specific scenarios.

Additionally you most likely want to minimize the number of tools, configurations and
manual steps required to achieve your automated development workflow.

To make the whole process as easy as possible (and still flexible enough to support a
broad range of tasks you might want to perform as part of your automation) was one of
the fundamental principles when we started [Bitrise.io](https://www.bitrise.io/).

## Requirements

[Git](http://git-scm.com/) is the most popular modern
[Distributed Version Control System (DVCS)](http://en.wikipedia.org/wiki/Distributed_revision_control) at the moment,
its branching system provides the flexibility to efficiently organize your app's code repository.

Through **hooks** _git_ is ideal to be the trigger of your automation scenarios, **no other tools required**.

Well, actually there's one more thing: you have to organize your git repository
branches in a way which is easy to manage and also which can be used to identify
what automation scenario should be performed when a change happens on a specific branch.

## Let's do it!

The most popular git branching model which fulfills these requirements is
[Gitflow](http://nvie.com/posts/a-successful-git-branching-model/).
You can use other branching models but we'll use Gitflow jargon to describe the concepts.

A very minimalistic summary of how Gitflow works:

* You have two fixed, main branches:
  * **master** : it should only contain the code of release versions
  * **develop** : it's the root branch for development, the integration or synchronization branch for developers
* You work on **feature** branches:
  * Always start the feature branch from the _develop_ branch.
  * Once a feature (issue / task) is finished you close the related feature branch, merging
    the feature's code back to the integration _develop_ branch.
* Once you're ready for a release, you merge from _develop_ to _master_ (through a Gitflow _release_)

With this model you can always see the active tasks (_feature_ branches), the latest "staging" or "beta" code (_develop_ branch) and the released versions (_master_ branch).

Your branches have separate meanings / purposes, which make this branching model a naturally good fit for automation.

So with a branching model like Gitflow and through [webhooks](/webhooks/),
you can define and automate three main scenarios:

1. Change on a _feature_ branch: while a feature is under active development you mostly
   want to continuously **test the code**, checking whether it still fulfills
   the defined tests, so when it's finished and you merge it back to the _develop_ branch,
   it won't break anything.
2. Change on _develop_ branch: this is the main integration point of finished features / tasks.
   If you or your team works on multiple features simultaneously, those independent features might introduce
   conflicting changes, so you want to always **test** the code changes on _develop_ to detect these breaking changes.
   If the tests do pass, you or your testers might want to give a manual spin for that particular version
   of the app, so you configure an **automatic deployment** which should make the version accessible
   for those use are in charge of testing the new versions.
   It's also a good idea to **notify the testers** when a new test version is available.
3. Everything worked, your app is rock solid, was tested both automatically with unit and other tests
   and manually by your internal testers, and now it's ready for prime time.
   Fantastic! Now you can create a _release_, which in Gitflow will merge the code from _develop_ into
   the _master_ branch. As always, just to be absolutely sure, you want to run
   your **automatic tests** one last time.
   If it passes you want to **build the release version of the App**,
   **deploy it** for your external beta testers / your project manager / anyone who agreed
   to test your precious app before the App Store submission.
   And of course you don't want to forget to **invite your testers**, do you?

The beauty of Gitflow (or a similar branching model) is that if you use an automation service
like [Bitrise](https://www.bitrise.io/) you can define these scenarios,
connect to the related branches and you'll never have to do these tasks manually.

**You can just work on your code**, organized into branches and that's all.
**Everything else will happen automatically**, based on which branch changed.

## Git + Bitrise

Bitrise is built specifically to help you with this kind of automation.
To achieve an automated workflow like the one described in the previous section this is all what you have to do:

1. **Register your App's repository** on [Bitrise](https://www.bitrise.io/)
   (_Don't forget to setup a_ [_webhook_](/webhooks/)_!_ If you connect your repository through
   our GitHub or Bitbucket integration options, Bitrise will do this automatically for you).
2. Prepare your App's **Primary Workflow** to include the _tests_ you would like to run on every code change.
3. Create a **new Workflow for your develop branch** and add the _deployment_
   and _notification_ steps you would like to use.
   For example, you can use Bitrise's built in App Deployment system
   and send email and Slack notifications when a test build is available -
   you can find dozens of Steps in our library or you can just add _script_ steps
   and do anything you want to.
4. Create another **Workflow for your master branch** and configure it for
   the _deployment_ of release versions, _notifying_ your beta testers or project manager,
   maybe even [Send a Text message](https://github.com/bitrise-io/steps-sms-text-message).

_That's all, no other setup is required_.
You can customize your Workflows the way you want and you can
**control everything with nothing but your code repository!**

{% include message_box.html type="note" title="Unlimited number of workflows" content=" You can create unlimited number of Workflows so if you have a more complex branching model you can configure your automations to support the way you work.
"%}

We have a great amount of Steps you can choose from
and **all of these Steps are open source**,
so if you want to modify one or create a brand new Step you can do that too!