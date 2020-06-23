---
last_modified_at: 2020-04-23
title: Adding a new app
redirect_from:
- "/getting-started/adding-a-new-app/connecting-a-repository/"
- "/getting-started/adding-a-new-app/setting-up-configuration/"
- "/getting-started/adding-a-new-app/setting-up-ssh-keys/"
- "/adding-a-new-app/"
- "/getting-started/adding-a-new-app/index/"
tag:
- ssh
- " public"
- builds
- getting-started
description: 'Add a new app to Bitrise: connect your repository, set up SSH keys,
  scan and configure your app, and register a webhook. '
menu:
  getting-started-main:
    weight: 4
    title: Adding a new app on the website

---
Adding an app to Bitrise means setting up access to your repository so that you can run builds. During the process, we also run our [project scanner](https://github.com/bitrise-steplib/steps-project-scanner) that detects the platform type of your app - for example, iOS - and generate default Workflows with all the necessary Steps to build and deploy your app.

Currently we are supporting the following platforms out of the box:

* [iOS](/getting-started/getting-started-with-ios-apps/)
* [Android](/getting-started/getting-started-with-android-apps/)
* [Xamarin](/getting-started/getting-started-with-react-native-apps/)
* [Fastlane](/tutorials/fastlane/fastlane-tools-integration/)
* [Flutter](/getting-started/getting-started-with-flutter-apps/)
* [macOS](/getting-started/getting-started-with-macos-apps/)
* [Ionic/Cordova](/getting-started/getting-started-with-ionic-cordova-apps/)
* [React Native](/getting-started/getting-started-with-react-native-apps/)

In this guide we describe how you can add a new app to Bitrise, connect your repository to Bitrise, set up SSH keys and initial configuration, and register a webhook.

## Adding a new app to Bitrise

To add a new app to Bitrise go to your [Dashboard](https://bitrise.io/dashboard) and press the **Add new App** button.

![](/img/add-a-new-app-button.jpg)

In case this is the first application in Bitrise, the Dashboard shows you the quickstart guide instead of a list of your uploaded apps. There you can choose to add your first app right away.

## Connecting a repository

After you've selected adding a new app, you find yourself on the [**Create New App**](https://app.bitrise.io/apps/add) page.

Select your app's privacy setting: it can be either [public](/getting-started/adding-a-new-app/public-apps/) or private.

* Private apps are only accessible to you, your organization members and those who are invited to work on an app. They require authentication to access the repository of the app.
* [Public apps](/adding-a-new-app/public-apps) expose their `bitrise.yml` and their build logs to everyone. If you have a public app's build URL, you can view its build log, to help with troubleshooting, for example. Public apps do not require authentication and they cannot have SSH keys.

Bitrise gives you options to connect any kind of Git repository to it. [GitHub, GitLab and Bitbucket](/getting-started/connecting-account-bitrise/) are supported out of the box. If you've already authorized Bitrise, for example, with your GitHub, you will see Bitrise automatically list all your repositories, so you can just click on the one you'd like to connect.

{% include message_box.html type="note" title="Connect any Git repository to Bitrise" content=" You can connect any private or public Git repository to Bitrise. We automatically create an SSH key that you can use to setup the connection with your provider. "%}

![](/img/connect-repo.jpg)

If you haven't [authorized Bitrise](/getting-started/adding-a-new-app/connecting-account-bitrise) against the provider hosting your repository, it will ask for permission.

![](/img/bitbucket-created.jpg)

It then lists your repositories as above. If you'd like to connect git repository hosted by other than GitHub or Bitbucket, select the **Other / Manual** tab.

![](/img/other.jpg)

You have to add the Git URL of the repository you would like to connect.

{% include message_box.html type="warning" title="Use SSH URLs for private repositories" content=" Please note, that if you are connecting a private repository, Bitrise  tries to clone it through SSH, so it's necessary to provide an SSH URL to your repository here. "%}

## Setting up SSH keys

SSH keys serve the role of secure transfer between services. In the case of Bitrise, it asks for your permission to be authorized at your Git provider, for example, GitHub.

Being authorized is important as Bitrise has to have a working SSH connection to your repository to be able to clone it. There are several ways to make it work. Automatically, by adding it manually, or by using your own key.

{% include message_box.html type="warning" title="Use SSH URLs everywhere for private apps" content=" Most services support SSH key based authentication ONLY for SSH URLs (for example, `git@github.com:bitrise-io/bitrise.git`), and NOT for HTTPS URLs (for example, `(https://github.com/bitrise-io/bitrise.git)`)! This means that every private repository you want to use has to be addressed with the SSH URL. If you have direct private Git repository references in your CocoaPods `Podfile`, you'll have to use the SSH URL there as well! Same applies for `submodules` and every other private Git repository URL you want to use with the SSH key you register on [bitrise.io](https://www.bitrise.io/)!
"%}

{% include message_box.html type="note" title="Use HTTPS URLs for public apps" content="
Public apps cannot have SSH keys. If you set your app's privacy settings to Public, no authentication is required. For public apps, use HTTPS URLs.
"%}

### Automatic setup

In the case of GitHub, GitLab and Bitbucket repository setups, Bitrise generates a public and private SSH key pair and ask whether you like the idea of adding that into your repository automatically as deploy key, or you'd like to add it by hand.

![](/img/repo-access.png)

You need admin rights to the repository to be able to auto-add the key to it. In any other case, copy the public key from here and add it to your repository at your Git provider.

The auto-add option adds the generated key as a read-only [deploy key](https://developer.github.com/guides/managing-deploy-keys/#deploy-keys) to your repository, it's the best for your security.

### Manual setup

If you have private dependencies or submodules, you have to add the generated SSH key manually to your profile at your Git provider instead. That's because deploy keys are only valid for one repository.

When the system asks if you need to use an additional private repository, click **I need** to and copy the key.

![](/img/manual-steup.png)

{% include message_box.html type="note" title="A bot user" content=" A simple workaround is adding a bot user with the SSH key to the repositories. Add the SSH key you would like to use to the user and add the user to the projects. It is enough to assign read permissions to the bot user. After that you can use the SSH key to clone to the repository or any submodule.
"%}

{% include message_box.html type="warning" title=" DO NOT add the key to the repository deploy keys!" content=" Add it to the user's account who has access to the repositories. "%}

#### GitHub

![Screenshot](/img/adding-a-new-app/ssh-github.png)

#### Bitbucket

![](/img/ssh-bitbucket-cropped.jpg)

#### GitLab

![Screenshot](/img/adding-a-new-app/ssh-gitlab.png)

#### Using your own key

This option can be used if you also have the private key of the given user. You just have to paste the private key and [Bitrise](https://www.bitrise.io) will be able to access the repositories.

## Setting up configuration

After [Setting up the SSH key](/getting-started/adding-a-new-app/#setting-up-ssh-keys) for your project, Bitrise downloads your code to make sure it can access the repository. It also runs an automatic repository scanner script to find the best initial configuration for your project. Currently Bitrise detect [iOS](/getting-started/getting-started-with-ios-apps/), [Android](/getting-started/getting-started-with-android-apps/), [Xamarin](/getting-started/getting-started-with-xamarin-apps/), [Ionic / Cordova](/getting-started/getting-started-with-ionic-cordova-apps/), [Flutter](/getting-started/getting-started-with-flutter-apps/), [React Native](/getting-started/getting-started-with-react-native-apps/) and [fastlane](/tutorials/fastlane/fastlane-index/) projects out of the box.

You can configure other types of projects too, but that requires a manual configuration.

### Automatic project configuration

Enter the name of the default branch of your repository where your project is located. This branch should include the configuration of your project. Once you hit **Next**, Bitrise automatically starts the validation of the repository.

![](/img/choose-branch.png)

During validation Bitrise makes sure it has access to the given branch, using the [SSH key](/adding-a-new-app/setting-up-ssh-keys) you set up.

If the validation is successful, Bitrise scans your repository and give you a default [Workflow](/steps-and-workflows/getting-started-workflows/) based on the configuration of the project.

### Manual project configuration

If the validation fails, choose the **Restart scanning without validation** option.

![](/img/restart-scanning-without-validation-1.jpg)

In this case, you have to configure the project manually. Click **Next**. You will see the **Validating Repository** message again but this time Bitrise only checks if it has access to the specified repository.

Choose the project type and specify the necessary inputs. You can also select the stack on which you wish to run your builds.

![](/img/manual-project-build-config.jpg)

{% include message_box.html type="note" title="Restarting validation" content="
You can restart validation if you want Bitrise to automatically detect your project type. Once you fixed the issue that caused validation to fail for the first time, go to the **Project build configuration** window and select the **Detected** tab. Choose the **Restart current validation** option. "%}

### Adding an app icon with the project scanner

You can select an image that your iOS/Android project already contains, and use it as an app icon on Bitrise. If your project doesn't contain any images, you can add a custom image from your local computer too. This way you can personalize your apps and build types. Let's see how it works!

{% include message_box.html type="important" title="Image limitations" content="Please note that the image file size cannot exceed 2 MB and the supported image file extensions are `png`, `bmp`, `tiff`, `jpeg`, `jpg`, `webp`."%}

When adding your app to Bitrise, our project scanner automatically detects app images and also offers a custom image upload option.

1. Click the **+** sign on your Dashboard to [add an app](https://app.bitrise.io/apps/add) to Bitrise.

   Once the project scanner has validated your project, you can set up your build configuration from the available options.
2. At **App icon**, either **Choose an Icon from your App** or **Upload a Custom Image** by clicking the **+** button.
   ![](/img/app-icon-choice.jpg)
3. Click **Choose Image and Proceed**.
4. Continue with setting up a [webhook](/webhooks/index/).

You can always change an app icon if you go to the Settings tab of your app and click the **+** on the **APP ICON**.

### Webhook setup

Once project configuration is finished, Bitrise offers you the chance to immediately register a webhook in your repository. After the webhook is set up, any code change in your repository will trigger the automatically created primary Workflow by default.

Read about webhooks in detail in our [Webhooks](/webhooks/index/) section.

{% include banner.html banner_text="Let's add a new app to Bitrise" url="https://app.bitrise.io/apps/add?utm_source=devcenter&utm_medium=bottom_cta" button_text="Add app!" %}
