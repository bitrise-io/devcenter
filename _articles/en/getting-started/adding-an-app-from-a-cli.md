---
tag: []
title: Adding an app from a CLI
redirect_from: []
summary: ''

---
You can easily register a new Bitrise app from the Bitrise CLI: the process is guided and simple to follow. And it’s fast: if, for example, you have the `bitrise.yml` file you want to use for the app, you do not have to wait for the scanner to detect the app type and generate your `bitrise.yml` file. Just plug in the existing file and you are good to go!

{% include message_box.html type="note" title="Adding an app with the API" content="You can also use the Bitrise API to add a new app. To do so, check out our [Adding and managing apps](/api/adding-and-managing-apps/) guide."%}

## Before you start

Before you try adding a new app to Bitrise via our CLI, make sure a few things are in order:

* You need a Bitrise account, with a connected git provider.
* You need the Bitrise CLI: check out our [Installing and updating the Bitrise CLI](/bitrise-cli/installation/) guide.
* Your project must have a local Git repository on your machine and a remote repository at a Git provider. If you want to use an SSH key to access the repository, [the remote repository URL must be an SSH URL](https://help.github.com/en/articles/which-remote-url-should-i-use)! For example, git@github.com:example-user/example.git.

You can also create a `bitrise.yml` in advance and you will be able to add that to your app during the creation process. This is optional: you can have the scanner generate one for you during the process, just like on our website!

## Adding a new app from the CLI

This procedure guides you through adding an app which Bitrise will access with an SSH key. This requires that the app's remote repository has an SSH URL, such as git@github.com:example-user/example.git.

You can, of course, use an HTTPS URL to access your remote repository, too: in that case, you will not set an SSH key for your app. We only recommend using HTTPS URLs for public apps (open source projects).

1. Go to the [Create New App from CLI](https://app.bitrise.io/dashboard/add-app-from-cli) page.

   You can reach this page from your [Dashboard](https://app.bitrise.io/dashboard/builds): click the **Add new app** button on the right, and then select **Add New App from CLI**.

   ![](/img/Bitrise_-_Mobile_Continuous_Integration_and_Delivery.png)
2. Set the account that will own the app, and the privacy of the app.
3. Copy the curl command you find there.

   ![](/img/Bitrise_-_Mobile_Continuous_Integration_and_Delivery-2.png)
4. Open a command line interface.
5. Change the directory to your project's location.
6. Paste the curl command and hit Enter.
7. Select the repository URL: choose the SSH option.

   This prompt only comes up if your local repository's remote has an SSH URL. If the remote repository has an HTTPS URL, you won't see this prompt.
   
   ```
   Remote URL: git@github.com:example-user/example.git

	? Select repository URL::
      	https://github.com/example-user/example.git
  	  > ssh://git@github.com:example-user/example.git
   ```
9. Register an SSH key.
   
   ```
   Specify how Bitrise will be able to access the source code: 
   > Automatic
     Add own SSH
   ```
   You can select either the automatic registration or choose to add your own.

   - If you choose automatic, Bitrise will automatically generate a key pair. If you need to use additional private repositories or submodules, choose the I need to option when prompted and follow the instructions. If not, select the No, auto-add SSH key option: this automatically adds the public key to your repository.

    - If you choose to add your own, you have to provide the path to the SSH key file: either enter it manually, or drag and drop the file, as that will input the path.  

10. Decide what bitrise.yml file you want to upload.