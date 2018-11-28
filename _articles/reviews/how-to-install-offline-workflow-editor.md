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
4. `cd` into a directory where you have your bitrise.yml, and run: `bitrise :workflow-editor`

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

### Releasing a new version

1. Generate a GitHub personal access token for your user (one who has rights to create releases on the repository) - you can generate one [here](https://github.com/settings/tokens).
2. Generate a Discuss API key:
   * you need to be a Discourse admin for this, then you can generate an API key for yourself [here](https://discuss.bitrise.io/admin/api/keys).
3. Ensure clean git.
4. If new release requires Bitrise CLI to be updated, change `min_version` requirement of the `bitrise` tool to the required CLI version in `bitrise-plugin.yml`.
5. _Optional step_: set the following secret environment variables:
   * `$GITHUB_RELEA_E_API_TOKEN`
   * `$GITHUB_USERNAME`
   * `$DISCUSS_API_KEY`
   * `$DISCUSS_USERNAME`
6. Call `bitrise run create-release`.
7. During the build you will need to specify a new version number. If you did not specify any of the secrets above, you will need to specify those as well.
8. After the build has finished, close the related GitHub issues and milestones if the issues were assigned to any.

### Testing the version release BEFORE releasing it

1. In `bitrise.yml`, create a workflow, for example, `test-release`.
2. From the `create-release` workflow, copy-paste the _GitHub release_ and _Create Discuss topic_ steps.
3. In the GitHub release step, remove the `files_to_upload` input, set the `$NEW_RELEASE_VERSION` everywhere to something arbitrary, same for the `body`, and **most importantly set** `**draft: 'yes'**`
4. In the Create Discuss topic step, change the `**DISCUSS_CHANGELOG_CATEGORY_ID**` to the ID of one our [discuss.bitrise.io](https://discuss.bitrise.io)'s internal channels' ID (you can find an ID using the Discourse API with a cURL request) so that it is only visible to us; also change the `title` and the `raw` parameter to something arbitrary.
5. After the test release process, don't forget to delete the draft release and the internal changelog topic.