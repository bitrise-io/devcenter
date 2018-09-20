---
title: fastlane tools integration
menu:
  fastlane:
    weight: 1
    title: Fastlane tools integration

---
Having more time to be creative is the key to great inventions.
We believe that giving developers the chance to work without distractions is the most important thing that can lead to extraordinary creations.
Our mission is to provide a platform that lets you concentrate on the process of creation,
instead of the administrative tasks that get in the way of it.

That's why we created Bitrise. But we're not alone in this!
We love how [Felix Krause](https://krausefx.com) sought to solve this problem by
creating [fastlane](https://fastlane.tools). So by the combined force of earth, water, fire and wind…
we integrated the whole [fastlane toolkit](https://fastlane.tools) - booyah! How cool is that!

{% include message_box.html type="note" title="Bitrise offline CLI" content=" We have an open source, offline CLI, which can be used in a similar way as _fastlane_. If you're interested, you can find the CLI's website [here](https://www.bitrise.io/cli), and its GitHub repository [here](https://github.com/bitrise-io/bitrise). You can use this CLI to run your bitrise configurations locally, which can include runing _fastlane_ too as part of the build, as described below. ;) "%} 

## What is fastlane?

_fastlane_ lets you define and run your deployment pipelines for different environments.
It helps you unify and automate your app's release process.
_fastlane_ connects all `fastlane tools` and third party tools, like CocoaPods and xctool.

_fastlane_ is a collection of ruby gems that cover the most usual tasks required during iOS app development
and upload or update to the App Store.

## How to get started?

Using _fastlane_ for your workflow is easy as pie. Just [add the ](/getting-started/manage-your-bitrise-workflow)`[Fastlane](/getting-started/manage-your-bitrise-workflow)`[ step to your
workflow](/getting-started/manage-your-bitrise-workflow),
after the `Git Clone` step (and any other dependency step).

{% include message_box.html type="warning" title="Have our Certificate and profile installer step in your workflow!" content=" You should also add/keep the `Certificate and profile installer` step in the workflow, to download your _.p12 Certificates_ and _Provisioning Profiles_ uploaded to [bitrise.io](https://www.bitrise.io) and to install them. **Even if you don't upload your files to** [**bitrise.io**](https://www.bitrise.io) **and instead you use a fastlane tool to manage your code signing files you should still keep this step in the workflow**. Read more about [iOS Code Signing using third party tools](/ios/code-signing/#use-a-third-party-tool-to-manage-your-code-signing-files).
"%}

With adding the _fastlane_ step we ensure that you are running on the latest _fastlane_ version, as it is pre-installed on all our VMs. Inside the step you can set the _fastlane_ action and we will run it automatically every time you push a new code change.

For more configuration options see the `Fastlane` step's description in the Workflow Editor!

{% include message_box.html type="info" title="iOS code signing guide" content=" If you want to use [bitrise.io](https://www.bitrise.io) to store your code signing files, you should just follow the [iOS Code Signing guide here](/ios/code-signing/). "%}

## What's next?

_fastlane_'s greatness comes from its ability to define different lanes for your different deployment needs - hence the name.
You can combine this with Bitrise and run separate lanes for separate branches, automatically.
For example you can run a lane for every code push onto the `master` branch to update your
screenshots and metadata on the App Store and to release the distribution version,
and a separate lane for the `develop` branch to deploy your test releases
and all the others to ensure that nobody has broken anything.
You can simply clone the workflow as many times as you want to,
and use the `Trigger` feature of [bitrise.io](https://www.bitrise.io) to define
which Workflow to be selected for this branch / tag / pull request.
You can find more information about the Triggers feature in the
[Control what to build when, with the Trigger Map](/webhooks/trigger-map/) guide.

We hope that you are as happy as we are to have this amazing tool inside Bitrise. Go ahead and try it out!

And as always, happy building!