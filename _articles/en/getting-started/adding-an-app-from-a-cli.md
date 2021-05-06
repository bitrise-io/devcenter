---
last_modified_at: 
tag:
- cli
- getting-started
title: Adding a new app from a CLI
redirect_from: []
description: 'You can easily register a new Bitrise app from any command line interface:
  the process is guided and simple to follow. And it’s fast!'
menu:
  getting-started-main:
    weight: 8

---
You can easily register a new Bitrise app from any command line interface: the process is guided and simple to follow. And it’s fast: if, for example, you have the `bitrise.yml` file you want to use for the app, you do not have to wait for the scanner to detect the app type and generate your `bitrise.yml` file. Just plug in the existing file and you are good to go!

{% include message_box.html type="note" title="Adding an app with the API" content="You can also use the Bitrise API to add a new app. To do so, check out our [Adding and managing apps](/api/adding-and-managing-apps/) guide."%}

## Before you start

Before you try adding a new app to Bitrise via our CLI, make sure a few things are in order:

* You need a Bitrise account, with a connected Git provider.
* Your project must have a local Git repository on your machine and a remote repository at a Git provider. If you want to use an SSH key to access the repository, [the remote repository URL must be an SSH URL](https://help.github.com/en/articles/which-remote-url-should-i-use)! For example, `git@github.com:example-user/example.git`.

You can also create a `bitrise.yml` in advance and you will be able to add that to your app during the creation process. This is optional: you can have the scanner generate one for you during the process, just like on our website!

## Adding a new app from a CLI

This procedure guides you through adding an app which Bitrise will access with an SSH key. This requires that the app's remote repository has an SSH URL, such as `git@github.com:example-user/example.git`.

You can, of course, use an HTTPS URL to access your remote repository, too: in that case, you will not set an SSH key for your app. We only recommend using HTTPS URLs for public apps (open source projects).

 1. Go to the [Create New App from CLI](https://app.bitrise.io/dashboard/add-app-from-cli) page.

    You can reach this page from your [Dashboard](https://app.bitrise.io/dashboard/builds): click the **Add new app** button on the right, and then select **Add New App from CLI**.

    ![{{ page.title }}](/img/Bitrise_-_Mobile_Continuous_Integration_and_Delivery.png)
 2. Set the account that will own the app, and the privacy of the app.
 3. Copy the curl command you find there.

    ![{{ page.title }}](/img/Bitrise_-_Mobile_Continuous_Integration_and_Delivery-2.png)
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
 8. Register an SSH key.

     ```
     Specify how Bitrise will be able to access the source code: 
     > Automatic
       Add own SSH
     ```

    You can select either the automatic registration or choose to add your own.
    * If you choose automatic, Bitrise will automatically generate a key pair. If you need to use additional private repositories or submodules, choose the I need to option when prompted and follow the instructions. If not, select the No, auto-add SSH key option: this automatically adds the public key to your repository.
    * If you choose to add your own, you have to provide the path to the SSH key file: either enter it manually, or drag and drop the file, as that will input the path.
 9. Decide what `bitrise.yml` file you want to upload.

        ? What bitrise.yml do you want to upload? 
          > Run the scanner to generate a new bitrise.yml
            Use the bitrise.yml found in the current directory or specify manually

    You can either have the scanner generate one based on your project files or you can provide a file. If your repository already contains a `bitrise.yml` file, the path to it will be automatically filled in.
10. Select the branch you want to use.

    The default option is the current active branch.

        The current branch is: master (tracking: origin master),
        
        ? Do you want to run the scanner for this branch?
          > Yes
            No

    If you select `No`, you will be prompted to check out the branch you wish to use, and then hit Enter again so the scanner can start.

    Once the scanner is done, it will either detect your app's type or it will switch to manual configuration. Manual configuration means you have to select the type of your app (iOS, Android, React Native, Flutter, and so on) and you have to provide the path to the relevant configuration file. For example, a `config.xml` in the case of an Ionic app. In this guide, we'll proceed with automatic detection.
11. Select the stack you want to use.

    If the scanner detects your project type, a stack will be automatically recommended but you can change it in the CLI if you want to. If you performed manual configuration as described above, you will have to choose the stack, too.
12. Finish the process with setting up webhooks and code signing files.
    * You can decide to skip webhook registration but it's required to automatically trigger builds on Bitrise. Read more about Webhooks in the [Webhooks](/webhooks/index/) section.
    * You can upload code signing files: depending on your app's type, you will be asked if you want to upload iOS code signing files - the tool will run codesigndoc for you - and/or an Android keystore file. You can upload these files any time on the website. Read more about code signing in our [Code signing](/code-signing/code-signing-index/) section.

And that's it! You are done: the URL to your new app will be printed out, and you can also view the app on your [Dashboard](https://app.bitrise.io/dashboard/).