---
changelog:
last_modified_at:
title: Connecting your GitHub/GitLab/Bitbucket account to Bitrise
redirect_from:
- "/getting-started/adding-a-new-app/connecting-account-bitrise/"
- "/getting-started/signing-up/connecting-account-bitrise/"
tag:
- git
- getting-started
- triggers
description: To take full advantage of all the features Bitrise offers, including
  automatic webhook registration, you need to connect your GitHub/GitLab/Bitbucket
  account to your Bitrise account.
menu:
  getting-started-main:
    weight: 7
    title: Connecting your GitHub/GitLab/Bitbucket account

---
To take full advantage of all the features Bitrise offers, including automatic webhook registration, you need to connect your GitHub/GitLab/Bitbucket account to your Bitrise account. This gives Bitrise **write permissions** to the repositories on those accounts. You can connect all three Git provider accounts to your Bitrise account, by one of two methods:

* Connecting the account when adding a new app.
* Connecting the account from your [**Account settings**](https://app.bitrise.io/me/profile#/overview) page.

Please note that you cannot connect two accounts from the same Git provider (for example, two GitHub accounts) to Bitrise.

Connecting one Git provider account is not final: you can disconnect an account and connect a different one at any time.

### Connect your GitHub/GitLab/BitBucket account when adding a new app

1. Log in to your [bitrise.io](https://www.bitrise.io) account.
2. Click the **+** symbol on the top menu bar and select **Add app**.
3. On the [Create New App](https://app.bitrise.io/apps/add) page, select the account and set the app's privacy setting.
4. Choose the Git service provider of the app's repository. If no account with that provider has been connected to your Bitrise account, the UI will display the option to connect.

   ![](/img/bitbucket-created.jpg)
5. Click **Connect GitHub/GitLab/Bitbucket**. This will take you to the login page of the Git provider.
6. Log in to the Git provider account.
7. You should be prompted to authorize bitrise.io - do it! If successful, you should be redirected to Bitrise, and a pop-up message should inform you that you successfully linked the account. Click **Okay**.

And you are done! If everything goes well, you are redirected to the [**Create New App** ](https://app.bitrise.io/apps/add)page and you can add your new app.

### Connect your GitHub/GitLab/BitBucket account from the Account settings page

1. Log in to your [bitrise.io](https://www.bitrise.io) account.
2. Click your avatar on the top right corner and select **Account settings**.
3. On the left menu bar, click the toggle next to the name of the Git provider you wish to connect.

   ![Connect account to Bitrise](/img/signing-up/connect-account.png)
4. Log in to the Git provider account.
5. You should be prompted to authorize bitrise.io - do it! If successful, you should be redirected to Bitrise, and a pop-up message should inform you that you successfully linked the account. Click **Okay**.

And you are done!

### Disconnect your GitHub/GitLab/BitBucket account

1. Log in to your [bitrise.io](https://www.bitrise.io) account.
2. Click your avatar on the top right corner and select **Account settings**.
3. On the left menu bar, click the toggle next to the name of the Git provider you wish to disconnect.

<div class="banner"> <img src="/assets/images/banner-bg-888x170.png" style="border: none;"> <div class="deploy-text">Let's connect my Git account to Bitrise!</div> <a target="_blank" href="https://app.bitrise.io/me/profile#"><button class="button">Go to your Account settings</button></a> </div>