---
title: Adding a new app
redirect_from:
- "/tutorials/deploy/android-deployment/getting-started/adding-a-new-app"
- "/adding-a-new-app/"
tag:
- ssh
- " public"
- builds
- getting-started
summary: 'Add a new app to Bitrise: connect your repository, set up SSH keys, scan
  and configure your app, and register a webhook. '
menu:
  adding-a-new-app:
    weight: 2

---
## Adding an app to Bitrise

When adding your app to **Bitrise**, we will clone your repository to make sure we can access it. Besides cloning your repository we will run our [project scanner](https://github.com/bitrise-steplib/steps-project-scanner) that detects all the supported apps and instantly configure your workflow with all the necessary steps to build and deploy your app.

{% include message_box.html type="note" title="Currently we are supporting the following projects out of the box" content="

* iOS
* Android
* Xamarin
* Fastlane
* Flutter
* macOS
* Cordova
* Ionic
* React Native "%}

To add a new app to Bitrise go to your [dashboard](https://bitrise.io/dashboard) and press the `Add new app` button.

![Screenshot](/img/adding-a-new-app/add_new_app.png)

In case this is the first application the dashboard will show you the quickstart guide instead of a list of you apps. There you can choose to add your first app right away.

Let's check out how you can [connect a repository](/getting-started/adding-a-new-app/connecting-a-repository)!

## Connecting a repository

After you've selected adding a new app, you will find yourself on the `Create app` page.

Select your app's privacy setting: it can be either public or private.

* Private apps are only accessible to you, your organization members and those who are invited to work on an app. They require authentication to access the repository of the app.
* [Public apps](/adding-a-new-app/public-apps) expose their `bitrise.yml` and their build logs to everyone. If you have the build URL of a public app, you can view its build log, to help with troubleshooting, for example. Public apps do not require authentication and they cannot have SSH keys.

Bitrise will give you options to connect any kind of git repository to it. `GitHub`, `GitLab` and `Bitbucket` are supported out of the box.

If you've already authorized Bitrise, for example, with your GitHub,
you will see Bitrise automatically listing all your repositories, so you can just click on the one you'd like to connect.

{% include message_box.html type="note" title="Connect any git repository to Bitrise" content="
You can connect any private or public git repository to Bitrise. We will automatically create an SSH key that you can use to setup the connection with your provider.
"%}

![](/img/connect-repo.jpg)

If you haven't [authorized Bitrise](/getting-started/adding-a-new-app/connecting-account-bitrise) against the provider hosting your repository, it will ask for permission.

![](/img/bitbucket-created.jpg)

It will then list your repositories as above. If you'd like to connect git repository hosted by other than GitHub or Bitbucket,
select the `Other / Manual` tab.

![](/img/other.jpg)

You will have to add the git url of the repository you would like to connect.

{% include message_box.html type="warning" title="Use SSH URLs for private repositories" content=" Please note, that if you are connecting a private repository, Bitrise will try to clone it through SSH, so it's necessary to provide an SSH URL to your repository here. "%}

Bitrise will add an SSH key to your repository at a later step.
Read more about how to add SSH keys automatically, or manually at [SSH keys](/adding-a-new-app/setting-up-ssh-keys/).

## SSH keys serve the role of secure transfer between services. In the case of Bitrise, it will ask for your permission to be authorized at your git source provider, for example, GitHub. Read more about how to [authorize Bitrise](/getting-started/adding-a-new-app/connecting-a-repository).

The reason behind the need for being authorized, is that Bitrise has to have a working SSH connection to your repository to be able to clone it. There are several ways to make it work. Automatically, by adding it manually, or by using your own key.

{% include message_box.html type="warning" title="Use SSH URLs everywhere for private apps" content="
Most services support SSH key based authentication **only** for SSH URLs (for example, `git@github.com:bitrise-io/bitrise.git`), and **not** for HTTPS URLs (for example, `(https://github.com/bitrise-io/bitrise.git)`)! This means that **every private repository you want to use has to be addressed with the SSH URL**. If you have direct private git repository references in your CocoaPods `Podfile`, you'll have to use the SSH URL there as well! Same applies for `submodules` and every other private git repository URL you want to use with the SSH key you register on [Bitrise.io](https://www.bitrise.io/)!
"%}

{% include message_box.html type="note" title="Use HTTPS URLs for public apps" content="
Public apps cannot have SSH keys. If you set your app's privacy settings to Public, no authentication is required. For public apps, use HTTPS URLs.
"%}

## Automatic setup

In the case of GitHub, GitLab and Bitbucket repository setups, Bitrise will generate a public and private SSH key pair and ask whether you like the idea of adding that into your repository automatically as deploy key, or you'd like to add it by hand.

![](/img/repo-access.png)

You need admin rights to the repository to be able to auto-add the key to it. In any other case, copy the public key from here and add it to your repository at your provider.

The auto-add option will add the generated key as a read-only [deploy key](https://developer.github.com/guides/managing-deploy-keys/#deploy-keys) to your repository, it's the best for your security.

## Manual setup

If you have private dependencies or submodules, you have to add the generated SSH key manually to your profile at your provider instead. That's because deploy keys are only valid for one repository.

When the system asks if you need to use an additional private repository, click `I need to` and copy the key.

![](/img/manual-steup.png)

{% include message_box.html type="note" title="A bot user" content=" A simple workaround is adding a \"bot\" user with the SSH key to the repositories. **Add the SSH key you would like to use to the user and add the user to the projects**. It is enough to assign read permissions to the bot user. After that you can use the SSH key to clone to the repository or any submodule.
"%}

{% include message_box.html type="warning" title=" **Do not** add the key to the repository Deploy Keys!" content=" Add it to the user's account who has access to the repositories. "%}

### GitHub

![Screenshot](/img/adding-a-new-app/ssh-github.png)

### Bitbucket

![Screenshot](/img/adding-a-new-app/ssh-bitbucket.png)

### GitLab

![Screenshot](/img/adding-a-new-app/ssh-gitlab.png)

### Use your own key

This option can be used if you also have the private key of the given user. You just have to paste the private key and [Bitrise](https://www.bitrise.io) will be able to access the repositories.

After [Setting up the SSH key](/adding-a-new-app/setting-up-ssh-keys) for
your project, Bitrise will download your code to make sure it can access the repository
and will run an automatic repository scanner script to find the best initial configuration for your project.
Currently Bitrise will detect `iOS`, `Android`, `Xamarin`, `Ionic`, `Cordova`, `Flutter`, `React Native` and `fastlane` projects out of the box.

You can configure other types of projects too, but that will require manual
configuration.

## Automatic project configuration

Enter the name of the default branch of your repository where your project is located. This branch should include the configuration of your project. Once you hit `Next`, Bitrise will automatically start the validation of the repository.

![](/img/choose-branch.png)

During validation Bitrise will make sure it has access to the given branch,
using the [SSH key](/adding-a-new-app/setting-up-ssh-keys) you set up.

If the validation is successful, Bitrise will scan your repository and give you a default workflow based on the configuration of the project.

## Manual project configuration

If the validation fails, choose the `Restart scanning without validation` option.

![](/img/validation-failed.png)

In this case, you have to configure the project manually. Click `Next`. You will see the `Validating Repository` message again but this time Bitrise only checks that we have access to the specified repository.

Choose the project type (for example, Xamarin) and specify the necessary inputs (for example, the path to the Xamarin Solution file). You can also select the stack on which you wish to run your builds.

![](/img/project-build-config.png)

{% include message_box.html type="note" title="Restarting validation" content="
You can restart validation if you want Bitrise to automatically detect your project type. Once you fixed the issue that caused validation to fail for the first time, go to the `Project build configuration` window and select the `Detected` tab. Choose the `Restart current validation` option. "%}

## Adding an app icon with the project scanner

You can select an image that your iOS/Android project already contains, and use it as an app icon on Bitrise. If your project doesn't contain any images, you can add a custom image from your local computer too. This way you can personalize your apps and build types.  Let's see how it works!

Please note that the image file size cannot exceed 2 MB and the supported image file extensions are `png`, `bmp`, `tiff`, `jpeg`, `jpg`, `webp`.

 When adding your app to Bitrise, our project scanner automatically detects app images and also offers a custom image upload option.

1. Click the **+** sign on your Dashboard to  [Add an app](https:///getting-started/adding-a-new-app/index/) to Bitrise.

   Once the project scanner has validated your project, you can set up your build configuration from the available options.
2. At **App icon**, either **Choose an Icon from your App** or **Upload a Custom Image** by clicking the **+** button.

   ![](https://files.nuclino.com/files/e7f54815-218d-4496-822a-fad40dd27caa/icon.jpg)
3. Click **Choose Image and Proceed**.
4. Continue with setting up a [webhook](https:///webhooks/index/).

Your first personalized build has been kicked off. Check it out on your build's page.

You can always change an app icon if you go to the Settings tab of your app and click the **+** on the **APP ICON**.

## Webhook setup

Once project configuration is finished, Bitrise offers you the chance to immediately register a webhook in your repository. After the webhook is set up, any code change in your repository will trigger the automatically created `primary` workflow by default.

Read about webhooks in detail in our [Webhooks](/webhooks) section.