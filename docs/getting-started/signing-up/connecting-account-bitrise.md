To take full advantage of all the features Bitrise offers, including automatic webhook registration, you need to connect your GitHub/GitLab/Bitbucket account to your Bitrise account. This gives Bitrise __write permissions__ to the repositories on those accounts. You can connect all three Git provider accounts to your Bitrise account, by one of two methods:

- Connecting the account when adding a new app
- Connecting the account from your `Account settings` page

!!! note
    You cannot connect two accounts from the same Git provider (for example, two GitHub accounts) to Bitrise.

Connecting one Git provider account is not final: you can disconnect an account and connect a different one at any time.

### Connect your GitHub/GitLab/BitBucket account when adding a new app

1. Log in to your [bitrise.io](https://www.bitrise.io) account.

1. Click the `+` symbol on the top menu bar and select `Add app`.

1. On the `Create New App` page, select the account and set the app's privacy setting.

1. Choose the git service provider of the app's repository. If no account with that provider has been connected to your Bitrise account, the UI will display the option to connect.

    ![Connect account when adding new app](/img/signing-up/add-app-connect-account.png)

1. Click `Connect GitHub/GitLab/Bitbucket`. This will take you to the login page of the Git provider. 

1. Log in to the Git provider account. 

1. You should be prompted to authorize Bitrise.io - do it! If successful, you should be redirected to Bitrise, and a pop-up message should inform you that you successfully linked the account. Click `Okay`.

And you are done! If everything goes well, you are redirected to the `Create New App` page and you can add your new app.

### Connect your GitHub/GitLab/BitBucket account from the Account settings page

1. Log in to your [bitrise.io](https://www.bitrise.io) account.

1. Click your avatar on the top right corner and select `Account settings`.

1. On the left menu bar, click the toggle next to the name of the Git provider you wish to connect.

    ![Connect account to Bitrise](/img/signing-up/connect-account.png)

1. Log in to the Git provider account.

1. You should be prompted to authorize Bitrise.io - do it! If successful, you should be redirected to Bitrise, and a pop-up message should inform you that you successfully linked the account. Click `Okay`.

And you are done!

### Disconnect your GitHub/GitLab/BitBucket account

1. Log in to your [bitrise.io](https://www.bitrise.io) account.

1. Click your avatar on the top right corner and select `Account settings`.

1. On the left menu bar, click the toggle next to the name of the Git provider you wish to disconnect.
