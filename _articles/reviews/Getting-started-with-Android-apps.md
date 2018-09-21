---
title: Getting started with Android apps
date: 2018-09-21 08:47:45 +0000
redirect_from: []
published: false

---
## Adding an Android app to [bitrise.io](https://www.bitrise.io/)

{% include message_box.html type="note" title="Do you have a Bitrise account?" content=" Make sure you have signed up to [bitrise.io]([https://www.bitrise.io](https://www.bitrise.io) and can access your Bitrise account. If you haven't signed up yet, here are [4 ways]([https://devcenter.bitrise.io/getting-started/index#signing-up-to-bitrise]) to connect your Bitrise account to your account on a Git service provider. "%}

1. Log into bitrise.io.
2. On your Dashboard, click `+ Add new app`.
3. On the `Create new App` page, choose the account your wish to add the app to.
4. Set the privacy of the app to either Private or [Public](/getting-started/adding-a-new-app/public-apps) and click `Next`.
5. Select the Git hosting service that hosts your repository, then find and select your repository that hosts the project. Read more about [connecting your repository](/getting-started/adding-a-new-app/index/).
6. When prompted to set up repository access, click `No, auto-add SSH key`. Read more about [SSH keys](/getting-started/adding-a-new-app/setting-up-ssh-keys/).
7. Type the name of the branch that includes your project's configuration - master, for example, - then click `Next`.
8. Wait while Bitrise is validating your project. We look for your configuration files and set up your app based on them.
   * Bitrise Scanner selects the module of your project by default.  If there are more modules to choose from in the `Module` list, select a module that works best for your project.
   * Select a variant for **building** (you can `Select All Variants` which will generate all variants in APPS & ARTIFACTS) and for **testing**.
9. Register a webhook when prompted so that Bitrise can start a build automatically when code is pushed to your repository. This also kicks off your first build on the primary workflow - click the message and it will take you to the build page. The first build does not generate an apk yet, however, you can already check out the project's logs on the Build's page.

An example of an Android primary workflow:

    primary:
    
        steps:
    
        - activate-ssh-key@4.0.3:
    
            run_if: '{{getenv "SSH_RSA_PRIVATE_KEY" | ne ""}}'
    
        - git-clone@4.0.11: {}
    
        - cache-pull@2.0.1: {}
    
        - script@1.1.5:
    
            title: Do anything with Script step
    
        - install-missing-android-tools@2.2.0:
    
            inputs:
    
            - gradlew_path: "$PROJECT_LOCATION/gradlew"
    
        - android-lint@0.9.4:
    
            inputs:
    
            - project_location: "$PROJECT_LOCATION"
    
            - module: "$MODULE"
    
            - variant: "$TEST_VARIANT"
    
        - android-unit-test@0.9.3:
    
            inputs:
    
            - project_location: "$PROJECT_LOCATION"
    
            - module: "$MODULE"
    
            - variant: "$TEST_VARIANT"
    
        - deploy-to-bitrise-io@1.3.15: {}
    
        - cache-push@2.0.5: {}