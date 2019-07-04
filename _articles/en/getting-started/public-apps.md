---
title: Public apps
redirect_from:
- "/adding-a-new-app/public-apps/"
- "/getting-started/adding-a-new-app/public-apps/"
tag:
- getting-started
- public
- builds
summary: If your Bitrise app is public, anyone who has the build URL can see the build
  logs. For example, if the CI status check on GitHub fails on a pull request, anyone
  can click on the build URL and view the build logs.
menu:
  getting-started-main:
    weight: 16

---
Open source projects are great - we all love them! They can be a pain to maintain, however, especially with CI/CD in the picture. That's why we have introduced the Public Apps feature for Bitrise: to make everyone's life a lot easier!

If your Bitrise app is public, anyone who has the build URL can see the build logs. For example, if the CI status check on GitHub fails on a pull request, anyone can click on the build URL and view the build logs.

As such, outside contributors can troubleshoot issues easier, find out why, for example, a pull request of theirs resulted in a failed build. They do not have to be invited to a Bitrise team to be able to view Bitrise logs and they do not need the help of a Bitrise team member, either.

Of course, this does not mean anyone can do anything with your public app on Bitrise. If the user viewing the logs is not invited to work on the app in some role, they will only be able to:

* View the build logs.
* Download the build logs.
* View the build's `bitrise.yml` file.

{% include message_box.html type="warning" title="Setting an app to public" content=" You can only set an app to public when adding the app to Bitrise! Once an app has been added, its privacy settings **CANNOT** be changed again. "%}

### Public app resources

Public apps have their own build time and concurrency, regardless of the limits of the accounts of their owners.

Every single public app gets 45 minutes build time and one concurrency. That means that regardless of the concurrency limits of your account, you can always run a build of a public app.

If you need more than 45 minutes build time or more than one concurrency for a public app, contact our support!

### Adding a new app as public

Adding a new app as a public app is incredibly simple: at the start of the process of [adding a new app](/getting-started/adding-a-new-app/), you will be asked to choose between a private and a public option for the app. Choosing the public option does not change anything about the process itself, it only determines the accessibility of the app.

1. Click the **+** symbol on the top menu bar.
2. Click **Add app**.
3. Choose the account you wish to use for the app.
4. Set the privacy of the app to **Public**.

![](/img/publicapp.png)

After this, proceed as usual to set up the app.

{% include message_box.html type="warning" title="Public app's build logs are available for anyone" content=" Remember: a public app's build logs and `bitrise.yml` file can be seen by anyone - make sure these files do not expose anything you do not want to be seen!"%}

<div class="banner">
<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
<div class="deploy-text">Let's add a public app to Bitrise!</div>
<a target="_blank" href="https://app.bitrise.io/apps/add"><button class="button">Add app</button></a>
</div>