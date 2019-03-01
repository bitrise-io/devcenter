---
# jp title missing
title: How to configure fastlane match for Bitrise
menu:
  fastlane:
    weight: 2

---

{% include not_translated_yet.html %}

If you want to use [fastlane match](https://github.com/fastlane/fastlane/tree/master/match)
in your [bitrise.io](https://www.bitrise.io/) build you only have to do three things:

1. Make sure that a single SSH key can be used to `git clone` both your main repository (the one
   you register on [bitrise.io](https://www.bitrise.io/)) and the `match` repository.
   You can find more info [in this guide](/faq/adding-projects-with-submodules/).
2. Add an environment variable `MATCH_PASSWORD`, as
   [described in ](https://github.com/fastlane/fastlane/tree/master/match#encryption-password)`[match](https://github.com/fastlane/fastlane/tree/master/match#encryption-password)`['s docs](https://github.com/fastlane/fastlane/tree/master/match#encryption-password),
   to specify the `Encryption password` you used for `match`.
   On [bitrise.io](https://www.bitrise.io/) you should add this as a `Secret Environment Variable`,
   in the [Workflow Editor](http://devcenter.bitrise.io/docs/add-your-first-step-to-your-apps-workflow).
   _Make sure to disable_ the `Replace variables in input?` option of the environment
   variable, to not to cause issues when the value includes the `$` (dollar) sign, which is used
   for environment variable expansion.

   ![](/img/matchpassword.png)
3. Make sure to use `match`'s `readonly` mode, or else `match` will try to connect
   to the Apple Developer Portal, which requires further authorization (providing additional
   username and password for Apple Dev Portal login)!
   * If you use `match` in your `Fastfile` or `fastlane` config: `match(app_identifier: "my.domain", type: "appstore", readonly: true)`
   * If you use it as a command line tool: `match development --readonly`
   * More info in `match`'s [official readme / docs](https://docs.fastlane.tools/actions/match/)

That's all, you can now enjoy the utility of `match`, automated with [bitrise.io](https://www.bitrise.io/) 🚀
