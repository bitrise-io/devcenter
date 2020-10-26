---
title: Selective builds
redirect_from:
- "/builds/selective-builds/"
tag:
- builds
- triggers
description: The Selective Builds setting provides change detection for your builds.
  Enabling it allows you to only trigger a build of an app if certain files or folders
  have been modified.
menu:
  builds-main:
    weight: 11

---
The **Selective Builds** setting provides change detection for your builds. Enabling it allows you to only trigger a build of an app if certain files or folders have been modified.

You may want to use this setting if:

* You have multiple apps in a single repository.
* Multiple apps share common files in your repository.

{% include message_box.html type="important" title="Selective Builds with non-Github projects" content=" The current version of our Selective Builds feature only works with GitHub projects. If your repository is hosted by another Git hosting service, the option will not be available."%}

The appropriate Service credential user must be set on your app's **Team** page. This user must have an admin right for the GitHub repository of the project. [Read more about setting up the Service credential user](/troubleshooting/github-pull-request-status-troubleshooting/#make-sure-to-select-a-service-credential-user-who-has-a-connected-github-account).

## Setting up Selective builds

1. Click on your app on your **Dashboard**.
2. Click **Settings** in the top navigation bar.
3. Find the **ENABLE SELECTIVE BUILDS** option and toggle the switch on the right.

   ![{{ page.title }}](/img/enable-selective-builds.png)
4. Add filenames and file paths in the **ADD FILENAME/PATH** window. You can add multiple files or file paths here. A build will be triggered only if these files are changed.

### Patterns in the file name or file path

You do not need to set an exact file name or file path for the Selective builds feature: you can set patterns. Using regular expressions is not supported but the pattern may contain certain metacharacters:

* `*`: Matches all files.
* `*a`: Matches all files beginning with a.
* `a*`: Matches all files containing an a.
* `**`: Matches directories recursively.
* `?`: Matches any one character.
* `\`: Escapes the next metacharacter.
* `[set]`: Matches any one character in set.

{% include banner.html banner_text="Enable Selective Builds" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}