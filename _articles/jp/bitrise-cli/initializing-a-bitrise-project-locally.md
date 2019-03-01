---
# jp title missing
title: Initializing a Bitrise project locally
date: 2018-12-13 11:37:13 +0000
redirect_from: []
menu:
  bitrise-cli:
    weight: 4

---

{% include not_translated_yet.html %}

When you add a new app to Bitrise, we detect the type of your project and generate a basic `bitrise.yml` file for you, with workflows that are appropriate for your project type.

With the Bitrise CLI, you can make this work on your own computer. You will need:

* [golang](https://github.com/golang/go)
* the [**bitrise-init** plugin](https://github.com/bitrise-core/bitrise-init)
* [Ruby](https://www.ruby-lang.org/en/) version 2.2.2 or higher

{% include message_box.html type="important" title="Go workspace" content="Before you start, make sure that `$GOPATH/bin` is added to `$PATH` on your computer! By default, your Go workspace is at `$HOME/go/bin`."%}

Once you are ready, open your Terminal/Command Line Interface and go to the folder of your project. Start the plugin:

    $ bitrise init

The bitrise-init plugin will run all the available scanners to determine the type of the project. These scanners are:

* React Native
* React Native Expo
* Ionic
* Cordova
* iOS
* MacOS
* Android
* Xamarin
* fastlane

Depending on the project type, the tool asks for user input: for example, with an iOS project, it asks the user to specify an export method.

    Select: ipa export method
    Please select from the list:
    [1] : app-store
    [2] : ad-hoc
    [3] : enterprise
    [4] : development
    (type in the option's number, then hit Enter) :

Based on the scanner outputs, the plugin generates a Bitrise configuration, with a `bitrise.yml` file. In the automatically generated workflows, every required input will have a valid value.

The plugin also generates a `bitrise.secrets.yml` file. You can store [secret Environment Variables](/bitrise-cli/secrets/) in this.

Contribute to the bitrise-init project by [creating and submitting your own project type scanner](/bitrise-cli/creating-your-own-bitrise-project-scanner/)!
