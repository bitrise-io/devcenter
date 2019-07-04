---
tag: []
title: Bitrise Tools - draft
redirect_from: []
summary: ''
published: false

---
List of Open Source tools maintained by the Bitrise team.

{% include message_box.html type="note" title="Where can I find the repositories?" content=" For historical reasons the core Bitrise CLI tools live in [github.com/bitrise-io](https://github.com/bitrise-io), but most of our tools, and every new tool we create lives in the [github.com/bitrise-tools](https://github.com/bitrise-tools), and the CLI core components (plugins, etc.) in the [github.com/bitrise-core](https://github.com/bitrise-core) GitHub organization. "%}

## Core, Bitrise CLI tools

### bitrise

The [Bitrise CLI]((https://github.com/bitrise-io/bitrise)), which is used on [bitrise.io](https://www.bitrise.io) to run the builds, as well as you can install it on your own Mac/Linux and run your the build locally!
Find out more about the Bitrise CLI in our [detailed guide](/bitrise-cli/index/).

### stepman

The [Step Collection Manager]((https://github.com/bitrise-io/stepman)) used for managing the Step Library, including downloading and sharing [Steps](/steps-and-workflows/getting-started-steps/).

### envman

The [Environment Variable Manager]((https://github.com/bitrise-io/envman)) used by the Bitrise CLI to isolate and manage [Environment Variables](/builds/available-environment-variables/) during the build. envman can be used independently of the Bitrise CLI if you want to connect tools, where one tool saves the Environment Variable and the other uses it.

## Bitrise CLI plugins

The following plugins can be directly run with the Bitrise CLI

### init

[This plugin](https://github.com/bitrise-io/bitrise-plugins-init.git) runs the scanner to detect the type of your project and generates a Bitrise configuration with a `bitrise.yml`.

### step

[https://github.com/bitrise-io/bitrise-plugins-step.git](https://github.com/bitrise-io/bitrise-plugins-step.git "https://github.com/bitrise-io/bitrise-plugins-step.git")

### workflow-editor

[https://github.com/bitrise-io/bitrise-workflow-editor.git](https://github.com/bitrise-io/bitrise-workflow-editor.git "https://github.com/bitrise-io/bitrise-workflow-editor.git")

## iOS code signing

### codesigndoc

Your friendly iOS Code Signing Doctor.

## Server / service

### bitrise webhooks

Bitrise Webhooks processor. Transforms various incoming webhooks (GitHub, Bitbucket, Slack, ...) to [bitrise.io](https://www.bitrise.io)'s Build Trigger API format, and calls it to start a build.