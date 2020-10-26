---
last_modified_at: '2020-04-25'
title: Reporting the build status to your Git hosting provider
tag:
- triggers
- git
- builds
description: 'Bitrise can push back build status reports to your Git hosting provider
  (GitHub/GitLab/Bitbucket). You only need to authenticate Bitrise to communicate
  towards the Git hosting service. '
redirect_from: []
menu:
  triggering-builds:
    weight: 15

---
Bitrise can push back build status reports to your Git provider (GitHub/GitLab/Bitbucket). You only need to authenticate Bitrise to communicate towards the Git hosting service. Apart from build status reports, this enables other operations, such as auto-registering SSH keys or Webhooks.

To do this, you need to specify a Service Credential User on the **Team** tab of your app on [bitrise.io](https://www.bitrise.io). You also need to make sure that this user has a connected account with the git hosting service of your choice on [bitrise.io](https://www.bitrise.io). This account will be used by Bitrise to communicate with the API of the git hosting provider.

{% include message_box.html type="note" title="Status reports are for automatically triggered builds only" content="Status reports are sent only for automatically triggered builds, such as builds triggered by a code push or a pull request."%}

1. Make sure the account you wish to use is connected to the relevant hosting provider: go to the **Account settings** page of the account and check the **CONNECTED ACCOUNTS** menu on the left side.

   ![{{ page.title }}](/img/connected-accounts.png)
2. Go to the **Team** tab of your app on [bitrise.io](https://www.bitrise.io).
3. Find the **Service credential User** menu and select the user with the connected account.

   ![{{ page.title }}](/img/service-credential-user.png)
4. Click the **Test the Git connection** button to make sure the selected user's connection can be used for sending back the build status to the hosting provider.

{% include banner.html banner_text="Set up build status reporting on your app" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}