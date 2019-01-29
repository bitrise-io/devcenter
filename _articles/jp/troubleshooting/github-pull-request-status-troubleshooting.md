---
# jp title missing
title: Build status indicator on GitHub/GitLab/Bitbucket does not work
redirect_from:
- "/faq/github-pull-request-status-troubleshooting"
- "/faq/github-pull-request-status-troubleshooting/"
- "/faq/github-pull-request-status-troubleshooting/#make-sure-to-select-a-service-credential-user-who-has-a-connected-github-account"
menu:
  troubleshooting:
    weight: 8

---

{% include not_translated_yet.html %}

If your builds do not send status reports to your git hosting provider - GitHub, GitLab or Bitbucket -, you will need to do a little investigating to find out what causes the problem. Let's take a look at the potential issues!

## Checking the Service credential User

The **Service credential User** of the app on [bitrise.io](https://www.bitrise.io)
must have a connected account to the git hosting provider.

1. Go to your app's page on [bitrise.io](https://www.bitrise.io).
2. Click the `Team` tab.
3. Find the `Service credential User` menu. By default, the app owner is the Service credential User.
4. Check the `Account Settings page` of the account of the Service credential User.

On the left side you can find the **Connected Accounts** section,
where you can connect and disconnect other services (like GitHub, Bitbucket or GitLab)
to your [bitrise.io](https://www.bitrise.io) account.

{% include message_box.html type="important" title="Make sure you connected the correct account" content=" If you have more than one account with the given service, you should also check whether you connected one that can access the repository. You can check which user you connected by clicking the name of the service provider on your [bitrise.io](https://www.bitrise.io) [Account Settings](https://www.bitrise.io/me/profile) page. It will open the connected user's page on the website of your git hosting provider. "%}

{% include message_box.html type="important" title="Admin rights" content=" Make sure that the Service credential User has administrative rights to the repository. Check this on the repository settings on the website of your git hosting provider. "%}

## Checking repository permissions and repository URL

* **Make sure that you granted Bitrise access to your organization or team**.
  It might be that you did not **grant Bitrise access** or denied access to the GitHub organization or Bitbucket team
  that owns the repository.
  See the
  [Grant access to a GitHub Organization](/faq/grant-access-to-github-organization) and the
  [Grant access to a Bitbucket team](/faq/grant-access-to-bitbucket-team) guides for more information.
* **Make sure the repository URL is up to date**.
  Go to the `Settings` tab of your app on [bitrise.io](https://www.bitrise.io)
  and make sure that the `Repository URL` points to the current location of the repository. If, for example, you renamed or transferred your repository elsewhere, the status report can fail.
