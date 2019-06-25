---
title: Setting up configuration-draft
redirect_from: []
date: '2019-03-19T10:46:51.000+00:00'
tag: []
summary: ''
published: false

---
After [Setting up the SSH key](/adding-a-new-app/setting-up-ssh-keys) for your project, Bitrise will download your code to make sure it can access the repository and will run an automatic repository scanner script to find the best initial configuration for your project. Currently Bitrise will detect `iOS`, `Android`, `Xamarin`, `Ionic`, `Cordova`, `Flutter`, `React Native` and `fastlane` projects out of the box.

You can configure other types of projects too, but that will require manual configuration.

## Automatic project configuration

Enter the name of the default branch of your repository where your project is located. This branch should include the configuration of your project. Once you hit `Next`, Bitrise will automatically start the validation of the repository.

![](/img/choose-branch.png)

During validation Bitrise will make sure it has access to the given branch, using the [SSH key](/adding-a-new-app/setting-up-ssh-keys) you set up. hehehehehe

If the validation is successful, Bitrise will scan your repository and give you a default workflow based on the configuration of the project.

## Manual project configuration

If the validation fails, choose the `Restart scanning without validation` option.

![](/img/validation-failed.png)

In this case, you have to configure the project manually. Click `Next`. You will see the `Validating Repository` message again but this time Bitrise only checks that we have access to the specified repository.

Choose the project type (for example, Xamarin) and specify the necessary inputs (for example, the path to the Xamarin Solution file). You can also select the stack on which you wish to run your builds.

{% include message_box.html type="note" title="Fastlane projects" content=" Please note that if you choose `fastlane` at `Project build configuration`, then you can further configure your project by selecting either `iOS`, `Android` or `other` as the `Project type` in `Selected project build configuration`.
"%}

![](/img/project-build-config.png)

{% include message_box.html type="note" title="Restarting validation" content=" You can restart validation if you want Bitrise to automatically detect your project type. Once you fixed the issue that caused validation to fail for the first time, go to the `Project build configuration` window and select the `Detected` tab. Choose the `Restart current validation` option. "%}

## Webhook setup

Once project configuration is finished, Bitrise offers you the chance to immediately register a webhook in your repository. After the webhook is set up, any code change in your repository will trigger the automatically created `primary` workflow by default.

Read about webhooks in detail in our [Webhooks](/webhooks) section.