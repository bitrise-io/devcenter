---
title: How to configure fastlane match for Bitrise
menu:
  fastlane:
    weight: 2

---
If you want to use [fastlane match](https://github.com/fastlane/fastlane/tree/master/match) in your [bitrise.io](https://www.bitrise.io/) build, you only have to do three things:

1. Make sure that a single SSH key can be used to `git clone` both your main repository (the one you register on [bitrise.io](https://www.bitrise.io/)) and the `match` repository.
   You can find more info [in this guide](/faq/adding-projects-with-submodules/).
2. Add an environment variable `MATCH_PASSWORD`, as described in [match's docs](https://docs.fastlane.tools/actions/match/#passphrase) to specify the `passphrase` you used for `match`. On [bitrise.io](https://www.bitrise.io/) you should add this as a Secret Environment Variable in the [Workflow Editor](/steps-and-workflows/getting-started-workflows/). Make sure to disable the **Replace variables in input?** option of the environment variable to avoid causing issues when the value includes the `$` (dollar) sign, which is used for environment variable expansion.

   ![{{ page.title }}](/img/matchpassword.png)
3. Make sure to use `match`'s `readonly` mode, or else `match` will try to connect to the Apple Developer Portal, which requires further authorization (providing additional username and password for Apple Dev Portal login)!
   * If you use `match` in your `Fastfile` or `fastlane` config: `match(app_identifier: "my.domain", type: "appstore", readonly: true)`.
   * If you use it as a command line tool: `match development --readonly`.

That's all, you can now enjoy the utility of `match`, automated with [bitrise.io](https://www.bitrise.io/) 🚀.

{% include banner.html banner_text="Use fastlane match in your build" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}