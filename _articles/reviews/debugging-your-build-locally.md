---
title: Debugging your build locally
date: 2018-11-15 10:51:59 +0000
redirect_from: []
published: false

---
If the build works on your local Mac/PC but not on [bitrise.io 70](https://www.bitrise.io/), that’s usually because of uncommitted / gitignored files or a tool version difference. There can be other reasons, for example in case of iOS code signing errors it’s usually because a code signing file which is available on your Mac, but you did not upload it to [bitrise.io 70](https://www.bitrise.io/) and so it’s not available there.

In any case, the first steps you should try, preferably before you’d report the issue (as this will be the first thing we’ll ask for anyway ;)) is to do a full clean clone of your project, and try to run the build there. This helps to eliminate the most common issue, that you have a file in your project’s regular working directory which is not committed into git, and so it’s not available when [bitrise.io 70](https://www.bitrise.io/) clones the repository.

## Testing with a full clean git clone

1. open your Terminal / Command Line
2. type in: `cd /tmp`
3. clone your repository with: `git clone REPOURL ./quick-repo-test --branch BRANCH-YOU-WANT-TO-TEST`
   * example: `git clone ``[https://github.com/bitrise-io/bitrise.git](https://github.com/bitrise-io/bitrise.git "https://github.com/bitrise-io/bitrise.git")`` ./quick-repo-test --branch master`
4. `cd ./quick-repo-test`

and then run the commands you want to test, to build your project, or open the project file from this directory (you can open the directory in Finder / file browser by typing in: `open .`).

## Test with the Bitrise CLI

You can also run the same build locally, using the [Bitrise CLI 213](https://www.bitrise.io/cli). For this, follow the steps in the previous section (**Testing with a full clean git clone**), and once you’re in the `/tmp/quick-repo-test` directory:

1. Do a clean git clone, as described in the previous section: **Testing with a full clean git clone**
2. Install the [Bitrise CLI 213](https://www.bitrise.io/cli) following the install instructions (it takes less than a minute to install it, the Bitrise CLI is distributed as a single binary, without any installer)
3. Download your app’s `bitrise.yml` from [bitrise.io 70](https://www.bitrise.io/):
   1. open the app on [bitrise.io 70](https://www.bitrise.io/)
   2. click the Workflow tab to open the Workflow Editor
   3. on the left side select `bitrise.yml`
   4. download the yml and save it into `/tmp/quick-repo-test` with the file name `bitrise.yml`
4. Now that you have the `bitrise.yml` in `/tmp/quick-repo-test`, run the build with: `bitrise run WORKFLOW-TO-RUN` (e.g. `bitrise run primary`)

This should help to reproduce the issue in most cases.

### Additional notes for iOS projects

* Make sure that you run the tests in the same simulator as the one [bitrise.io 20](http://bitrise.io/) runs. If you use the Bitrise CLI to run the tests locally this is not required, that uses the same configuration.
* If you’re debugging an iOS unit/UI test issue, please make sure to **reset the iOS Simulator** (in the Simulator app select the **Simulator** menu bar item -> then **Reset Content and Settings…**).

### Additional notes for Android/Gradle projects

* If you still can’t reproduce the issue locally (after following the previous steps), you might also want to delete the `$HOME/.gradle` (hidden) directory, to clear your Gradle caches. (Quick Terminal / Command Line command: `rm -rf $HOME/.gradle`)

## Download and use the Android/Linux environment

**This only works if your project uses the Android/Linux environment.** If you do, that’s awesome, as **you can download and use the exact same environment** as the one your build is running in on [bitrise.io 70](https://www.bitrise.io/)!

To do this, please follow this guide: [https://bitrise-io.github.io/devcenter/docker/run-your-build-locally-in-docker/](https://bitrise-io.github.io/devcenter/docker/run-your-build-locally-in-docker/ "https://bitrise-io.github.io/devcenter/docker/run-your-build-locally-in-docker/")[ 88](https://bitrise-io.github.io/devcenter/docker/run-your-build-locally-in-docker/)

**Note**: for best efficiency you should first do a **clean git clone** (as described above -> **Testing with a full clean git clone**) and run `docker` from there, so that files which are in your `.gitignore` won’t affect the build, and the build can run the way how it runs on [bitrise.io 70](https://www.bitrise.io/).

## Still doesn’t work

Please report the issue at [https://discuss.bitrise.io/c/issues/build-issues](https://discuss.bitrise.io/c/issues/build-issues "https://discuss.bitrise.io/c/issues/build-issues")[ 84](https://discuss.bitrise.io/c/issues/build-issues) - we’ll try to help as soon as possible!