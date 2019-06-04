---
title: Approving Pull Request builds
redirect_from: []
date: '2019-04-29T12:48:56.000+00:00'
tag:
- git
- builds
- triggers
- pull request
- public
summary: 'You have the option to require approval for a Pull Request build before
  it can start. For public apps, this is mandatory; for private apps, it is turned
  on by default. '
menu:
  triggering-builds:
    weight: 8

---
Not all Pull Requests need to be built. After all, for most projects, anyone can create a fork of the repository and submit a Pull Request. However, if an app on Bitrise is set up with Secrets that are exposed for Pull Request builds, for example, then you probably don't want just anyone to be able to access those secrets.

That is why you have the option to require approval for [a Pull Request build](/builds/triggering-builds/trigger-pull-request/) before it can start. This feature works somewhat differently for public and private apps:

* **Private apps**: By default, Pull Requests submitted from a fork require approval [_if any Secrets are marked to be exposed for Pull Requests_](/builds/env-vars-secret-env-vars/#editing-a-secret-env-var)_._ The setting can be changed. If your secrets are NOT exposed to PRs, the build will run without asking for approval.
* **Public apps**: Pull Requests submitted from a fork require approval by default and it cannot be changed. Public apps CANNOT opt out of this feature.

### Enabling manual approval for private apps

To enable or disable manual approval, you need to be an **admin** or an **owner** on the application's team. The application MUST be private: public apps cannot opt out of this feature!

1. Open the app on Bitrise.
2. Go to the `Settings` tab.
3. Scroll down to `Enable manual build approval option`.

   ![](/img/setting-enable-1.png)

   Please note that you can only change this setting for private apps! For public apps, this is ALWAYS enabled.
4. Toggle the setting to enable or disable it.

   By default, it is set to enabled.

### Approving the PR build

{% include message_box.html type="important" title="Approving the PR build" content="Please note that approval means approval on Bitrise. Approving the Pull Request on your git hosting provider's website is not sufficient to start a build: an admin or an owner has to approve the build on Bitrise."%}

If a Pull Request is submitted from a fork, you will be notified that a PR build is waiting for approval:

* A notification email will be sent with the name of the app, as well as links to the repository itself and to the app's `Builds` page on Bitrise.
* On the git hosting provider, the status of the CI check will show `Pending - Waiting for approval`.
* On the `Builds` page of the app, a confirmation box will be displayed.

![](/img/waiting-for-approval-2.png)

To approve and run the build, click the `Approve and Run Build` button. Clicking `Review` opens the Pull Request on the website of your git hosting provider.