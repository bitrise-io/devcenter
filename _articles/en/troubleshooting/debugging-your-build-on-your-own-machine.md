---
title: Debugging your build on your own machine
date: 2018-11-19 15:33:56 +0000
menu:
  troubleshooting:
    weight: 1

---
If your build fails on Bitrise, we often recommend to try and run it locally, on your machine. To do this, do the following:

* do a full clean git clone of your project's online repository
* run the build on your machine with the Bitrise CLI

This helps to eliminate, among other things, a very common issue: that uncommitted or "gitignored" files are in your working directory but they haven't been committed into your git repository online and therefore they are not available when Bitrise clones the repository for running the build. Other possible issues include:

* code signing files are present on your local machine but not uploaded to Bitrise
* a difference in the version of the tool(s) used for the build

## Testing with a full clean git clone

1. Open your Terminal / Command Line interface on your machine.
2. Type in: `cd /tmp`
3. Clone your repository with: `git clone REPOURL ./quick-repo-test --branch BRANCH-YOU-WANT-TO-TEST`
   * example: `git clone https://github.com/bitrise-io/bitrise.git ./quick-repo-test --branch master`
4. Type `cd ./quick-repo-test.`

Run the commands you want to test, to build your project, or to open the project file from this directory.

## Testing with the Bitrise CLI

After doing a full clean git clone, run a build locally, using the [Bitrise CLI](https://www.bitrise.io/cli).

1. [Install the Bitrise CLI](/bitrise-cli/installation/).
2. [Download](/builds/bitrise-yml-online/) your app’s `bitrise.yml` file from [bitrise.io](https://www.bitrise.io/).
3. Run the build with: `bitrise run <workflow-name>` (for example, `bitrise run primary`).

This should help reproducing the issues in most cases, and allows you to attempt to debug them on your own machine.

If the build succeeds under these conditions but still fails on Bitrise, contact our support!

{% include message_box.html type="important" title="Running iOS tests" content="

* Make sure that you run the tests in the same simulator as the one [bitrise.io](http://bitrise.io/) runs. If you use the Bitrise CLI to run the tests locally this is not required, that uses the same configuration.
* If you’re debugging an iOS unit/UI test issue, please make sure to **reset the iOS Simulator** (in the Simulator app, select the **Simulator** menu bar item -> then **Reset Content and Setting**)."%}

{% include message_box.html type="important" title="Android projects" content="If you still can’t reproduce the issue locally, you might also want to delete the `$HOME/.gradle` (hidden) directory, to clear your Gradle caches. (Quick Terminal / Command Line command: `rm -rf $HOME/.gradle`)"%}

## Using the Android/Linux environment locally

If your project uses the Android/Linux environment, you can download and use the exact same environment as the one your build is running in on [bitrise.io](https://www.bitrise.io/).

[Follow our guide](/docker/run-your-build-locally-in-docker/) to make it work!

{% include message_box.html type="info" title="Run docker from a clean git clone" content="Ideally, you should first do a **clean git clone** and run `docker` from there, so that files which are in your `.gitignore` won’t affect the build, and the build can run the the same way as on [bitrise.io](https://www.bitrise.io/)."%}