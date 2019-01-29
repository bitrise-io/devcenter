---
title: Accessing the bitrise.yml file online
redirect_from:
- "/bitrise-cli/bitrise-yml-online/"
- "/bitrise-cli/bitrise-yml-online"
menu:
  builds:
    weight: 7

---
Every bitrise.yml file is stored for your builds on [bitrise.io](https://www.bitrise.io). They come in handy when you'd like to check the configuration with which a specific build has run. To do that, you can either use the online `Workflow Editor` or your build's online bitrise.yml file. If you choose the latter, you can compare changes, restore the current build to the original version, edit the config, and download the file to your Mac/PC.

{% include message_box.html type="note" title="Using filters on your Builds Board" content="
If an app has multiple builds on [bitrise.io](https://www.bitrise.io) and you want to pick a specific build out of those, then these filters will help you a lot. Click on your app in your `Dashboard` and use the following fields:

* You can search for a build number or commit message in the`Try build number or commit message` grey field.
* You can pick which of these triggers was used for your build: `Pushes`, `Pull Requests`, `Tags` or all of these.
* You can pick which `branch` the build was started on.
* You can select either the `primary` or the `deploy workflow` of the build."%}

![Screenshot](/img/bitrise-cli-bitrise-yml/build-filters.png)

## Accessing a build's bitrise.yml

1. Select an application on your `Dashboard` and select one of its builds.

2. Click the `Show bitrise.yml` button at the top OR at the bottom of your inline log.

   You should see your build's bitrise.yml content displayed in ace editor but it's not editable here. See where you can [edit the bitrise.yml online](#editing-and-downloading-bitriseyml-online).

## Checking changes in bitrise.yml online

Once you've clicked `Show bitrise.yml`, you will see the `BUILD'S BITRISE YML` pop-up window displaying your builds' configuration details. If the `build's bitrise.yml` content differs from the `current build's bitrise.yml`, you will see two editors displayed side-by-side in the `BITRISE.YML CHANGES` pop-up window. The differences between the builds are highlighted in the following colors:

* green means added content
* blue means modified content
* orange means deleted content

![Screenshot](/img/bitrise-cli-bitrise-yml/bitrise-yml-changes.png)

## Restoring and undoing changes in bitrise.yml online

If you don't like the changes made to your _current_ bitrise.yml, you can easily restore it to the build's original bitrise.yml.

1. Click the `Show bitrise.yml` button at the top OR at the bottom of your inline log on [bitrise.io](https://www.bitrise.io/).
2. In the `BITRISE.YML CHANGES` pop-up window, click the orange `Restore` button.
3. Hit `OK` in the `Are you sure?` pop-up window to confirm and override the current bitrise.yml.

![Screenshot](/img/bitrise-cli-bitrise-yml/confirm-bitrise-yml-changes.png)

## Editing and downloading bitrise.yml online

You can **edit** your build config in yml format in the `bitrise.yml editor` if you go to your app's `Workflow Editor` and click the `bitrise.yml` tab.

* press `F1` for the full command list
* fold and unfold with the `-` and `+` signs
* press `Ctrl`/`Cmd` + `F` for search and replace where you can search with `RegExp`, `Match Whole Word`, case-sensitive, case-insensitive, or to search only in the selected section
* use the `preview sidebar` on the right for easier navigation

You can **save** or **discard** any changes you have made with the config. If you click `Download currently saved config`, you can **download** this YML version to your own computer and run it with bitrise CLI on your Mac/PC.

You might want to **clone** this whole YML configuration or just part of it to another app, so that you can use the copied version as a base and extend it with a few extra steps. All you have to do is copy this bitrise.yml content and paste it into the new app's bitrise.yml editor and develop it further.

## Deleting a build's bitrise.yml

 If you wish, you can simply delete a build's `bitrise.yml` file. But please note that this action cannot be undone: nobody will be able to view that particular build's `bitrise.yml` file once you delete it.
 
 1. Select an application on your `Dashboard` and select one of its builds.
 
 1. Click the `Delete bitrise.yml` button.
 
 1. In the confirmation window, click `Yes`.