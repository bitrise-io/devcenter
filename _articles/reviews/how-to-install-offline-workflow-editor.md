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

Here is the overall look and feel:

![](/img/offline-workflow-editor.png)

## Upgrading Workflow Editor version

You can upgrade to the latest version of the Workflow Editor by running `bitrise plugin update workflow-editor`.

## Developing Workflow Editor

You can build a stand-alone binary with embedded resources.

1. Run `bitrise run go-install`

### Running Workflow Editor in development mode

1. In your Workflow Editor's directory, run `docker-compose up` command.
2. In your browser, you can reach the Workflow Editor on `localhost:1234`. Be aware that you usually have to wait a while.
3. By default, the Workflow Editor will open the `bitrise.yml` and `.bitrise.secrets.yml` found in this folder. For testing purposes, you might want to edit custom files. To do so, set the `TEST_BITRISE_CONFIG_PATH` and `TEST_BITRISE_SECRETS_PATH` environment variables with the path pointing to the custom files' paths.

### Running tests

1. In the Workflow Editor's directory, run `up-middleman-jasmine`.
2. In your browser, you can view the tests on `localhost:4567/jasmine`.

Note that every time you make a change to the code, you have to exit the running workflow and start it up again. You can make changes to the specs without having to do this.