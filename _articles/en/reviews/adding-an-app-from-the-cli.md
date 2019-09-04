---
tag: []
title: Adding an app from the CLI
redirect_from: []
summary: ''
published: false

---
You can easily register a new Bitrise app from the Bitrise CLI: the process is guided and simple to follow.

You have all the options that are available on the Bitrise website:

* You can choose the account that will own the app.
* You can add private and public apps.
* The scanner can automatically detect the type of your app, or you can configure it manually. 
* You can register an SSH key automatically or manually. 

{% include message_box.html type="note" title="Adding an app with the API" content="You can also use the Bitrise API to add a new app. To do so, check out our [Adding and managing apps](/api/adding-and-managing-apps/) guide."%}

## Before you start

Before you try adding a new app to Bitrise via our CLI, make sure a few things are in order:

* You need a Bitrise account, with a connected git provider.
* You need the Bitrise CLI: check out our [Installing and updating the Bitrise CLI](/bitrise-cli/installation/) guide.
* Your project must have a local Git repository on your machine and a remote repository at a Git provider.
* You need a personal access token: check out our [Generating personal access tokens manually](https://devcenter.bitrise.io/getting-started/account-security/#generating-personal-access-tokens-manually) guide.

You can also create a bitrise.yml in advance and add it to the repository. The scanner will automatically detect it and you can use it for your app. 

## Adding a new app from the CLI

1. Open a command line interface.
2. Go to the location of your project. 
3. Run the below command, with your personal access token replacing the placeholder:
   ```
   bitrise-add-new-project --api-token <YOUR PERSONAL ACCESS TOKEN>
   ```
4. Use the arrow keys to the account that will be the owner of the app and press Enter. 
5. Select the privacy of the app and press Enter. 
   You can add either a private or a public app. 
6. 