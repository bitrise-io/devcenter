---
title: Bitrise tools
redirect_from: "/tools/bitrise-tools/"
menu:
  getting-started-main:
    weight: 37

---
Here is a list of our open source tools maintained by the Bitrise team.

## Bitrise CLI tools

### bitrise

The Bitrise CLI which is used on [bitrise.io](https://www.bitrise.io) to run builds. Install it on your own Mac/Linux and run your builds locally!

{% include message_box.html type="info" title="Find out more on Bitrise CLI" content=" Check out its [GitHub](https://github.com/bitrise-io/bitrise) page or dig deeper in our [Bitrise CLI docs](/bitrise-cli/index/)."%}

### stepman

Our [Step Collection Manager](https://github.com/bitrise-io/stepman) used for managing the Step Library, including downloading and sharing [Steps](/steps-and-workflows/getting-started-steps/).

### envman

The [Environment Variable Manager](https://github.com/bitrise-io/envman) used by the Bitrise CLI to isolate and manage [Environment Variables (Env Vars)](/builds/available-environment-variables/) during the build. Our envman tool can be used independently of the Bitrise CLI if you want to connect tools, where one tool saves the Env Var and the other one uses it.

## Bitrise CLI core plugins

The following plugins can be directly run with the [Bitrise CLI](https://github.com/bitrise-io/bitrise) on your computer:

### init

With this [init plugin](https://github.com/bitrise-io/bitrise-plugins-init.git), the scanner can detect the type of your project locally and generate a Bitrise configuration with a [bitrise.yml](/bitrise-cli/index/#bitriseyml---the-configuration-format) file.

{% include message_box.html type="info" title="bitrise init" content="Learn more about how to [initialize a Bitrise project locally](/bitrise-cli/initializing-a-bitrise-project-locally/)."%}

### step

You can list, retrieve Step information or create Steps with this [plugin](https://github.com/bitrise-io/bitrise-plugins-step), - follow our [Steps](/bitrise-cli/create-your-own-step/) guide.

### workflow-editor

With this [plugin](https://github.com/bitrise-io/bitrise-workflow-editor.git) you can configure your builds' `bitrise.yml` config locally.

{% include message_box.html type="info" title="offline Workflow Editor" content="Learn how to [install and start the offline Workflow Editor](/bitrise-cli/offline-workflow-editor/) and [how to download your build's bitrise.yml file to your computer](/builds/bitrise-yml-online/#editing-and-downloading-bitriseyml-online)."%}

## iOS code signing tool

### codesigndoc

Your friendly iOS Code Signing Doctor.

{% include message_box.html type="info" title="Find out more on codesigndoc" content="Check out its [GitHub page](https://github.com/bitrise-io/codesigndoc) and see how it helps sign your iOS project.

* [Collecting and exporting code signing files with codesigndoc](/code-signing/ios-code-signing/collecting-files-with-codesigndoc/)
* [Device testing for iOS](/testing/device-testing-for-ios/)"%}

## Server/service

### bitrise webhooks

This [Bitrise Webhooks processor](https://github.com/bitrise-io/bitrise-webhooks) transforms various incoming webhooks (for example, from GitHub, Bitbucket, or Slack) to [bitrise.io](https://www.bitrise.io)'s Build Trigger API format, and calls it to start a build.