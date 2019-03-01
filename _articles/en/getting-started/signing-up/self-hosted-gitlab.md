---
title: Connecting self-hosted GitLab instances
redirect_from:
- "/getting-started/adding-a-new-app/self-hosted-gitlab/#connect-a-self-hosted-gitlab-instance-with-bitrise/"
- "/getting-started/index/getting-started/signing-up/self-hosted-gitlab/"
menu:
  signing-up:
    weight: 7

---
For organizations, Bitrise supports connecting to self-hosted GitLab instances. Connecting is simple, and once it's done, you can add apps to Bitrise from privately hosted repositories [in the usual way](/getting-started/adding-a-new-app). All functions that you got used to with publicly hosted repositories will be available!

Setting up an app that is in a self-hosted GitLab repository is very simple: Bitrise needs to be authorized as an application for the entire GitLab instance and then the **Application Id** and the **Secret** value belonging to the Bitrise OAuth application must be added to the organization on [bitrise.io](https://www.bitrise.io).

## Connect a self-hosted GitLab instance with Bitrise

**Only Organizations can use privately hosted GitLab instances on Bitrise**. If you are not on an Organization plan, you should not follow this guide.

 1. Log in to your GitLab instance with **root** privileges.
    If you connect to Bitrise **without root privileges**, your Organization's other team members will **not have access to the repository on the GitLab instance**.
 2. Go to the admin area by clicking the little wrench icon on the top menu bar.
 3. On the left menu bar, select `Applications`, then click `New Application`.

    ![New Application](/img/adding-a-new-app/gitlab-newapp.png)
 4. In the `Name` field, enter a name that clearly identifies the application. For the sake of simplicity, we recommend **Bitrise**.
 5. In the `Redirect URI` field, enter https://app.bitrise.io/users/auth/gitlab/callback.
 6. In the `Scopes` menu, check `api`.

    ![New Application settings](/img/adding-a-new-app/gitlab-newapp-settings.png)
 7. Click `Submit`. On the next page, you should see an `Application Id` and a `Secret`. You'll need both to connect to your GitLab instance on [bitrise.io](https://www.bitrise.io).

    ![](/img/gitlab_app_settings.png)
 8. Go to your organization's profile page on [bitrise.io](https://www.bitrise.io).
 9. Select the `Connected Accounts` option on the left menu bar.
10. Add your self-hosted GitLab credentials:
    * App ID
    * Secret
    * Self-hosted URL

You are done! Now you are able to access your privately hosted repositories with Bitrise.

## Add a new app from a self-hosted GitLab repository

Before you start, make sure you [created an OAuth application](/getting-started/signing-up/self-hosted-gitlab#connect-a-self-hosted-gitlab-instance-with-bitrise) in your self-hosted GitLab instance.

1. Log in to [bitrise.io](https://www.bitrise.io) and click the `+` symbol on the top menu bar and select `Add app` from the options.
2. Choose an Organization account.
3. When prompted to select your Git provider, select GitLab. Select the `Self-hosted` option.
4. If you haven't provided your self-hosted GitLab credentials to the organization before, you can do it at this stage.
5. Click `Connect`.

Once connected, proceed as usual to [setting up your project configuration](/adding-a-new-app/setting-up-configuration).