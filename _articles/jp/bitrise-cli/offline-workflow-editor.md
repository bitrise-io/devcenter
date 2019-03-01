---
# jp title missing
title: Installing and upgrading the offline Workflow Editor
date: 2018-11-29 13:46:40 +0000
redirect_from: []
menu:
  bitrise-cli:
    weight: 3

---

{% include not_translated_yet.html %}

Bitrise Workflow Editor is designed in such a way that you can run it offline on your Mac/PC without having to log into [bitrise.io](https://www.bitrise.io/). The Workflow Editor is open source, you can find its repository [here](https://github.com/bitrise-io/bitrise-workflow-editor). You can also join the join the discussion around Workflow Editor [here](https://discuss.bitrise.io/t/workflow-editor-v2-open-source-offline-workflow-editor/39).

## Installing offline Workflow Editor to your Mac/PC

Before you start:

* Make sure you have [Go](https://golang.org/) installed on your local computer.

Make sure you perform the following steps to include Workflow Editor as one of the Bitrise CLI core plugins.

1. Install the latest Bitrise CLI as discussed [here](/bitrise-cli/installation/).
2. Run `bitrise setup` to install offline Workflow Editor as part of the Bitrise Plugins. Running `bitrise setup` also checks if Bitrise Core tools, OS X tools, Bitrise Plugins and Toolkits are installed on your local machine. If not, the command will automatically install them.

## Starting offline Workflow Editor

If the required tools are installed, all you have to do is start your offline Workflow Editor.

1. `cd` into a directory where you have your `bitrise.yml`.
2. Run `bitrise :workflow-editor` command to start your offline session.

Here is the overall look and feel:

![](/img/offline-workflow-editor.png)

## Upgrading Workflow Editor version

You can upgrade to the latest version of the Workflow Editor by running `bitrise plugin update workflow-editor` command.
