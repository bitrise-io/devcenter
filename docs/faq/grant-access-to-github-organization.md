This guide explains how to grant access for [bitrise.io](https://www.bitrise.io/) to your GitHub Organization.

!!! note
    This guide presumes you have already [authorized](https://help.github.com/articles/authorizing-oauth-apps/) Bitrise on GitHub.

1. Open [https://github.com](https://github.com).
2. In the top right corner, click your avatar and select `Settings`.
4. On the left side, select `Applications`.
5. Click `Authorized OAuth Apps`. You will see the list of apps which can access your account.
6. Click on `Bitrise`.
6. Scroll down to `Organization access` and click `Grant` so that Bitrise can access your Organization's repository.

  ![Screenshot](/img/faq/grant-org-access.jpg)

!!! note "Troubleshooting: Can't see `Grant` button next to app under `Organization access`"
    If there's no `Grant` button but only a __red cross__ icon next to the Organization in the `Organization access` that means that __the access was previously granted but then it was revoked__. You can fix this by first selecting the Organization under `Organization settings` on the left side, then clicking `Third-party access`. You can see `Bitrise` with `Denied` access. Click the pencil icon and `Grant access` to Bitrise. Now you can go back to your `Authorized OAuth Apps` and click on Bitrise. You should see a green tick instead of the red cross icon next to your Organization.

  ![Screenshot](/img/faq/third-party-access.jpg)

You can see the Organization and its repository if you go back to [bitrise.io](https://www.bitrise.io), click on your avatar, select `Add new App` and hit `Next`.

!!! note "Repository is a fork of another private repository"
    If the repository is a fork of another private repository which belongs to **(another) organization**, you have to repeat these steps and grant access for Bitrise for the organization __which owns the original repository__.

    This is a GitHub limitation: to be able to access a private repository fork
    __you have to grant access for the service (Bitrise) in both repositories__;
    in the fork and in the original repository/Organization too.
