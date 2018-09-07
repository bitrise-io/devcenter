For organizations, Bitrise supports connecting to self-hosted GitLab instances. Connecting is simple, and once it's done, you can add apps to Bitrise from privately hosted repositories [in the usual way](/adding-a-new-app). All functions that you got used to with publicly hosted repositories will be available!

Setting up an app that is in a self-hosted GitLab repository is very simple: Bitrise needs to be authorized as an application for the entire GitLab instance and then the __Application Id__ and the __Secret__ value belonging to the Bitrise OAuth application must be added to the organization on [bitrise.io](https://www.bitrise.io).

## Connect a self-hosted GitLab instance with Bitrise

!!! warning
    Only Organizations can use privately hosted GitLab instances on Bitrise. If you are not on an Organization plan, you should not follow this guide.

1. Log in to your GitLab instance with __root__ privileges.

    !!! warning
        If you connect to Bitrise without root privileges, your Organization's other team members will not have access to the repository on the GitLab instance.

1. Go to the admin area by clicking the little wrench icon on the top menu bar.

1. On the left menu bar, select `Applications`, then click `New Application`.

    ![New Application](/img/adding-a-new-app/gitlab-newapp.png)

1. In the `Name` field, enter a name that clearly identifies the application. For the sake of simplicity, we recommend __Bitrise__.

1. In the `Redirect URI` field, enter https://app.bitrise.io/users/auth/gitlab/callback.

1. In the `Scopes` menu, check __`api`__.

    ![New Application settings](/img/adding-a-new-app/gitlab-newapp-settings.png)

1. Click `Submit`. On the next page, you should see an `Application Id` and a `Secret`. You'll need both to connect to your GitLab instance on [bitrise.io](https://www.bitrise.io).

    ![App id and secret](/img/adding-a-new-app/appid-secret.png)

1. Go to your organization's profile page on [bitrise.io](https://www.bitrise.io).

1. Select the `Connected Accounts` option on the left menu bar.

1. Add your self-hosted GitLab credentials:

    - App ID
    - Secret
    - Self-hosted URL

You are done! Now you are able to access your privately hosted repositories with Bitrise.

## Add a new app from a self-hosted GitLab repository

Before you start, make sure you [created an OAuth application](/adding-a-new-app/self-hosted-gitlab#connect-a-self-hosted-gitlab-instance-with-bitrise) in your self-hosted GitLab instance.

1. Log in to [bitrise.io](https://www.bitrise.io) and click the `+` symbol on the top menu bar and select `Add app` from the options.

1. Choose an Organization account.

1. When prompted to select your Git provider, select GitLab. Select the `Self-hosted` option.

1. If you haven't provided your self-hosted GitLab credentials to the organization before, you can do it at this stage.

1. Click `Connect`.

Once connected, proceed as usual to [setting up your project configuration](/adding-a-new-app/setting-up-configuration).
