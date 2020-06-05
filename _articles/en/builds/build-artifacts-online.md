---
title: Build artifacts online
tag:
- builds
- deploy
- files
- artifacts
description: If you select a build of your app, on the APPS & Artifacts tab you can
  check out the artifacts (for example, files and reports) which have been generated
  during the build.
redirect_from: []
menu:
  builds-main:
    weight: 21

---
If you select a build of your app, on the **APPS & Artifacts** tab, you can check out the artifacts (for example, files & reports) which have been generated during the build.

All files are destroyed at the end of the build so if you want to view or download any files, insert **Deploy to bitrise.io** Step to your Workflow so that it can help you access the artifacts.

## Deploying files into artifacts

Artifacts are deployed into the **APPS & ARTIFACTS** section in your build's page with the help of the **Deploy to Bitrise.io** Step. It deploys all the files which have been generated during the build and stores them in the `$BITRISE_DEPLOY_DIR` directory. You can change the target directory path in the **Deploy directory or file path** field under the **Config** section of the step.

1. Insert the **Deploy to Bitrise.io** Step AFTER the Step(s) that generate the artifacts or even better if the **Deploy to Bitrise.io** Step is at the very end of your Workflow. For more information, check out our [Attach any file as an Artifact to the Build](https://devcenter.bitrise.io/tips-and-tricks/attach-any-file-to-build/) article.

{% include message_box.html type="important" title="Where to insert the **Deploy to Bitrise.io** Step" content="My message" content=" Add the **Deploy to Bitrise.io** Step in the right place. If you insert the Step before other Steps that generate files during the build, then **Deploy to Bitrise.io** will have nothing to deploy. "%}

Note that the content of any sub-directories found in the deploy directory will not be displayed in the **APPS & ARTIFACTS** section of your build. You can, however, compress your artifacts into a zip file if you modify the default `false` value to `true` in the **Compress the artifacts into one file** field in the **Deploy to Bitrise.io** Step. This will compress the whole directory along with its sub-directories and deploy to **APPS & ARTIFACTS**.

### Modifying target directory path

You can modify the target directory path to another one but make sure you reference the same directory paths in other Steps of your Workflow to ensure that the generated files get collected to the same directory.

### Viewing artifacts if your build has failed

With the **Run if previous Step failed** toggle enabled, you can access your build artifacts - only those that have been successfully generated - even if your build has failed. For example, you can detect bugs in your failed build by looking into the generated test report files.

### Who can access build artifacts?

The artifacts at **APPS & ARTIFACTS** are accessible for everyone who is the owner, admin, developer, tester/QA of the app. Besides these roles, if you keep the default config of the **Enable public page for the App** feature, then anyone who receives the URL, will be able to access your app and its artifacts. For more information, check out [Public App install page](https://devcenter.bitrise.io/tutorials/deploy/bitrise-app-deployment/#public-app-install-page).

## File types & limitations

All file types are supported and will be available in **APPS & ARTIFACTS**.
Depending on the type of the file, you can either view your artifacts inline if you click on the **eye** icon or download them to your local computer.

There is no limitation on the NUMBER of files deployed to **APPS & ARTIFACTS** per build. There is a limitation, however, on the file size which is 2GB per file.

{% include banner.html banner_text="Let's see those artifacts!" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your  builds" %}