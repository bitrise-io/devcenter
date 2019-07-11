---
tag: []
title: Bitrise Checks on GitHub Checks
redirect_from: []
summary: Bitrise Checks is a Github app which provides an extended version of the
  classic status checks Bitrise sends back to GitHub pull requests. Bitrise Checks
  include a Bitrise build summary and a check status.
published: false

---
Bitrise Checks is a Github app which provides an extended version of the classic status checks Bitrise sends back to GitHub. Bitrise Checks include a Bitrise build summary and a check status. You can view Bitrise Checks if you click the **Details** link of a pull request on GitHub. It unfolds the detailed build summary and build status Bitrise Checks attaches to your pull request on the **Checks** tab of GitHub.

![](/img/all-checks-have-passed.png)

![](/img/bitrise-summary-gh-checks.jpg)

There can be three different check statuses:

* Successful check.
* Failed check.
* Action needed check (in the case of manual pull request approval).

## Installing Bitrise Checks

Using Bitrise Checks is just a few clicks away. Let's do this!

1. Select your organization's app on your [Dashboard](https://app.bitrise.io/dashboard/builds).
2. Select the **Settings** tab of your app.
3. Click the **install our app to your GitHub repository** LINK in the **ENABLE GITHUB CHECKS** toggle's description. Don't toggle the switch just yet, since you first need to install Bitrise Checks. We will get to enabling it [later](/github-checks/#enabling-github-checks).

   ![](/img/disabled-toggle-githubchekcs.jpg)

   This link will take you to GitHub's **Bitrise Checks** installation page.
4. On the **Install Bitrise Checks** page, select the user or organization you want to add Bitrise Checks to.

   ![](/img/install-bitrise-checks.jpg)
5. Decide if you wish to install Bitrise Checks to all your repositories or just to a selected few. With this you grant rights to Bitrise Checks to integrate with your repository and use GitHub Checks to display check results.

   ![](/img/install-bitrise-checks.jpg.png)
6. In the GitHub prompt, provide your GitHub password.

If all goes well, you land on the **Bitrise Checks** page of GitHub. You should see a blue note at the top-left corner of the page that Bitrise Checks has been successfully installed on your GitHub account.

![](/img/installed-bitrise-checks.jpg)

## Enabling GitHub Checks

All there's left to do is enabling GitHub Checks on your app's page on [Bitrise](https://app.bitrise.io/dashboard/builds).

{% include message_box.html type="important" title="Enabling GitHub Checks is limited" content="Please note that only Organization owners and app admins can enable this toggle on the **Settings** page of the app."%}

1. Go to your organization's [Dashboard](https://app.bitrise.io/dashboard/builds).
2. Click the app whose GitHub repository you've installed the Bitrise Checks to.
3. Go to the **Settings** tab of the app.
4. Toggle the **ENABLE GITHUB CHECKS** switch to the right.

![](/img/enabled-toggle-githubchecks.jpg)

And you're done! Now any pull request you open to your app on GitHub will be validated with Bitrise Checks and a build will get automatically started on Bitrise (if the [pull request trigger](/builds/triggering-builds/trigger-pull-request/) is properly set on Bitrise).

{% include message_box.html type="info" title="Get to your app's page with a single click" content="If you click on the build summary or on **View more details on Bitrise Checks** link on the **Checks** tab, you'll quickly get to your app's Build page on Bitrise. "%}

## Disabling Github Checks

You can easily disable GitHub Checks on Bitrise if you toggle the **ENABLE GITHUB CHECKS** switch to the left on the **Settings** page of the app.

If you decide to uninstall Bitrise Checks from your GitHub account, you can click the **Uninstall** button on the [Install GitHub Apps](https://github.com/settings/installations/) page.

![](/img/disable-ghckecks.jpg)