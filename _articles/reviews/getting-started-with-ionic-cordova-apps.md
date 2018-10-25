---
title: Getting started with Ionic/Cordova apps
date: 2018-10-25 07:01:54 +0000
redirect_from: []
published: false

---
## Add a Ionic/Cordova app to Bitrise

{% include message_box.html type="note" title="Do you have a Bitrise account?" content=" Make sure you have signed up to [bitrise.io](https://www.bitrise.io/) and can access your Bitrise account. Here are [4 ways](https://devcenter.bitrise.io/getting-started/index#signing-up-to-bitrise) on how to connect your Bitrise account to your account found on a Git service provider."%}

 1. Log into [bitrise.io](https://www.bitrise.io/).
 2. On your Dashboard, click `+ Add new app`.
 3. On `Create new App` page, choose the account your wish to add the app to.
 4. Set the privacy of the app to either private or [public](https://yv69yaruhkt48w.preview.forestry.io/getting-started/adding-a-new-app/public-apps) and click `Next`.
 5. Select the Git hosting service that hosts your repository, then find and select your own repository that hosts the project. Read more about [connecting your repository](https://yv69yaruhkt48w.preview.forestry.io/getting-started/adding-a-new-app/connecting-a-repository/).
 6. When prompted to set up repository access, click `No, auto-add SSH key`. Read more about [SSH keys](https://yv69yaruhkt48w.preview.forestry.io/getting-started/adding-a-new-app/setting-up-ssh-keys/).
 7. Type the name of the branch that includes your project’s configuration - `master`, for example, - then click `Next`.
 8. Wait while Bitrise is validating your project. We look for your configuration files and set up your app based on them.
 9. At `Project Build configuration`, you can select which platform to build your app for. You can select:
    * iOS
    * Android
    * iOS and Android (where the Android build gets built first)

    ![](/img/select-platform-cordova.jpg)![](/img/select-platform-ionic.jpg)
10. **Select scheme name? Select export method? \[ad-hoc, dev...\]**
11. Register a webhook when prompted so that Bitrise can start a build automatically when code is pushed to your repository. This also kicks off your first build on the primary workflow - click the message and it will take you to the build page. The first build does not generate an APK and an .ipa yet, however, you can already check out the project’s logs on the Build’s page.

An example of primary workflow:

    primary:
        steps:
        - activate-ssh-key@4.0.3:
            run_if: '{{getenv "SSH_RSA_PRIVATE_KEY" | ne ""}}'
        - git-clone@4.0.11: {}
        - script@1.1.5:
            title: Do anything with Script step
        - npm@0.9.1:
            inputs:
            - command: install
        - karma-jasmine-runner@0.9.1: {}
        - deploy-to-bitrise-io@1.3.15: {}

## Dependencies

`Run npm command` Step is by default part of your primary and deploy workflows. This step takes care of installing all Javascript dependencies listed in your app's `package.json` file. Make sure you have `the nmp command with arguments to run` field should be set to `install`.

Any other? Platform specific?

## Code signing

For Ionic:

    deploy:
        steps:
        - activate-ssh-key:
            run_if: '{{getenv "SSH_RSA_PRIVATE_KEY" | ne ""}}'
        - git-clone: {}
        - script:
            title: Do anything with Script step
        - npm:
            inputs:
            - command: install
        - karma-jasmine-runner: {}
        - generate-cordova-build-configuration: {}
        - ionic-archive:
            inputs:
            - platform: "$IONIC_PLATFORM"
            - target: emulator
        - deploy-to-bitrise-io: {}

For Cordova:

      deploy:
        steps:
        - activate-ssh-key@4.0.3:
            run_if: '{{getenv "SSH_RSA_PRIVATE_KEY" | ne ""}}'
        - git-clone@4.0.11: {}
        - script@1.1.5:
            title: Do anything with Script step
        - certificate-and-profile-installer@1.10.1: {}
        - npm@0.9.1:
            inputs:
            - command: install
        - karma-jasmine-runner@0.9.1: {}
        - generate-cordova-build-configuration@0.9.6: {}
        - cordova-archive@1.1.1:
            inputs:
            - platform: "$CORDOVA_PLATFORM"
            - target: emulator
        - deploy-to-bitrise-io@1.3.15: {}

{% include message_box.html type="note" title="Automatic provisioning" content=" The example procedure described here uses manual provisioning, with the `Certificate and profile installer`Step. However, Bitrise also supports [automatic provisioning](https://yv69yaruhkt48w.preview.forestry.io/code-signing/ios-code-signing/ios-auto-provisioning/) but it is not in the scope of this guide." %}

## Deploy