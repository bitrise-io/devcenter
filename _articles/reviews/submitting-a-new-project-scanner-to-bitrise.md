---
title: Initializing a Bitrise project - draft
date: 2018-11-26 10:55:21 +0000
redirect_from: []
published: false

---
When you add a new app to Bitrise, our we detect the type of your project and generate a basic `bitrise.yml` file for you, with workflows that are appropriate for your project type.

With the Bitrise CLI, you can make this work on your own computer. You will need:

* [golang](https://github.com/golang/go)
* the **bitrise-init** plugin
* [Ruby](https://www.ruby-lang.org/en/) version 2.2.2 or higher

Before you start, make sure that `$GOPATH/bin` is added to `$PATH` on your computer! By default, your Go workspace is at `$HOME/go/bin`.

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

You can create and submit your own scanner to detect other project types, too. 