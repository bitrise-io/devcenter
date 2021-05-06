---
title: fastlane tools integration
menu:
  fastlane:
    weight: 1

---
Bitrise is a hosted CI/CD solution where you can run your [fastlane](https://docs.fastlane.tools/) lane with the same commands you would use locally. Bitrise’s automated Steps provide extra functionality to your lane and speed up your builds.

Here is how you can benefit from integrating fastlane into Bitrise.

* Our **Fastlane Match** Step takes care of code signing your project by cloning your private certificate/profile repository and registering the certificates and profiles in the keychain.
* On Bitrise you can run separate lanes for separate branches automatically. For example, you can run a lane for every code push onto the master branch to update screenshots and metadata on the App Store and to release the distribution version. You can run a separate lane for the develop branch to run your automated tests and deploy your test releases for your QA team. You can simply clone the Workflow multiple times, specify the lane to run for the given Workflow in a Workflow Specific Environment Variable, and use the [Triggers](/builds/triggering-builds/triggering-builds-index/) feature to define which Workflow should be selected for this branch / tag / pull request.

{% include message_box.html type="info" title="Before you start:" content="Note that two-factor authentication is mandatory for all Apple Developer Portal accounts. If, during your build, Bitrise needs to access your Apple Developer Portal account, it will have to go through 2FA. This applies even if you use _fastlane_. To make this work, [connect your Apple Developer Account to Bitrise](/getting-started/connecting-to-services/configuring-bitrise-steps-that-require-apple-developer-account-data/). This allows Bitrise to reuse your authentication sessions for 30 days, so you do not have to manually go through 2FA on every single occasion.

If a `Gemfile` exists in your `work_dir` directory, _fastlane_ will be used by calling `bundle install` then `bundle exec`.

`Fastfile` is your configuration file that can be run with _fastlane_. Make sure you have it inside your `./fastlane` directory."%}

## Setting up fastlane on Bitrise

Running _fastlane_ on Bitrise is as simple as adding one Step to your Workflow and setting some options. Let’s see how!

{% include message_box.html type="important" title="Connect to Apple services" content="Do not forget to connect to Apple services if you use this Step in your Workflow. You can do so using [API key or Apple ID or right through the Fastlane Step's input fields](/getting-started/connecting-to-services/bitrise-steps-and-their-authentication-methods/#fastlane-step)."%}

1. Add the **Fastlane** Step to your Workflow by clicking the **+** sign. Make sure it is inserted right after the **Git Clone** Step. Since _fastlane_ is pre-installed on all Bitrise’s virtual machines, the **Fastlane** Step ensures that you can always use the required _fastlane_ version.
2. To code sign your project, you have a couple of options to choose from. Add one of Bitrise’s code signing Steps to your Workflow such as: **Certificate and profile installer**, **iOS Auto Provision**, and **Fastlane Match**. Alternatively, use fastlane match inside your fastlane lane instead of a code signing Step. Make sure you either use the **Fastlane Match** Step or set up fastlane match in your lane but don’t try to do both.
3. Click the **Fastlane Step** to fill out the required fields.
4. Add your lane in the **fastlane lane** input.
5. Use **Working directory** field if the _fastlane_ directory is not in your repository's root. The working directory should be the parent directory of your `Fastfile`'s directory. For example, if the Fastfile path is `./here/is/my/fastlane/Fastfile`, then the `Fastfile`'s directory is `./here/is/my/fastlane`, so the **Working Directory** should be `./here/is/my`.
6. The **Should update fastlane gem before run?** option will be skipped if you have a `Gemfile` in the `work_dir` directory. If you don't have a `Gemfile` and this option is enabled, then the Step tries to use and run the latest _fastlane_ version.
7. Set the **Enable verbose logging?** to yes if you wish to get more detailed logs on your failed builds.
8. If the **Enable collecting files to be included in build cache** is set to yes, the Step adds the following cache items (if they exist):
   * Pods - `Podfile.lock`
   * Carthage - `Cartfile.resolved`
   * Android dependencies

That’s it! [Start running your build](/builds/Starting-builds-manually/) so that Bitrise can run your lane.