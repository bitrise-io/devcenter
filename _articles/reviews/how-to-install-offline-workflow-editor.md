---
title: Offline Workflow Editor - draft
date: 2018-11-27 12:37:24 +0000
redirect_from: []
published: false

---
Bitrise Workflow Editor is designed in such a way that you can run it offline on your Mac/PC without having to sign into [https://www.bitrise.io/](). The Workflow Editor is open source, you can find its repository [here](https://github.com/bitrise-io/bitrise-workflow-editor). You can also join the join the discussion around Workflow Editor [here](https://discuss.bitrise.io/t/workflow-editor-v2-open-source-offline-workflow-editor/39).

## Installing offline Workflow Editor to your Mac/PC

Make sure you perform the following steps to include Workflow Editor as one of the Bitrise CLI core plugins.

1. In your Terminal/Command Line, install [Go](https://golang.org/) by typing `brew install go` command (on macOS). If it's already installed, you can update it to the most recent version by running `brew reinstall go`.
2. Install the latest [Bitrise CLI](/bitrise-cli/installation/). If it's already installed, you can upgrade to the most up-to-date version by running `brew reinstall bitrise`.
3. Run `bitrise setup` just to be sure everything's prepared. This will take care of
4. `cd` into a directory where you have your `bitrise.yml`, and run: `bitrise :workflow-editor`

## Upgrading Workflow Editor version

You can upgrade to the latest version of the Workflow Editor by running `bitrise plugin update workflow-editor`.