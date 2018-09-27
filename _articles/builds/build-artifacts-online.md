---
title: Build artifacts online
menu:
  builds:
    weight: 6

---
If you select a build of your app, in the `APPS & Artifacts` tab of your build's page you can check out the artifacts (for example, files & reports) which have been generated during the build. All files are destroyed at the end of the build so if you want to view or download any files, insert `Deploy to bitrise.io` step to your workflow so that it can help you access the artifacts.

## Deploy files into artifacts

Artifacts are deployed into the `APPS & Artifacts` section in your build's page with the help of the `Deploy to Bitrise.io` step. It deploys all the files which have been generated during the build and stores them in the `$BITRISE_DEPLOY_DIR` directory. You can change the target directory path in the `Deploy directory or file path` field under the `Config` section of the step.

1. Insert the `Deploy to Bitrise.io` step AFTER the step/s that generate the artifacts or even better if the `Deploy to Bitrise.io` step is **at the very end of your workflow**. For more information, check out our [Attach any file as an Artifact to the Build](https://devcenter.bitrise.io/tips-and-tricks/attach-any-file-to-build/) article.

{% include message_box.html type="important" title="Where to insert \`Deploy to Bitrise.io" content="
My message" content=" Add the `Deploy to Bitrise.io` step in the right place. If you insert the step before other steps that generate files during the build, then `Deploy to Bitrise.io` will have nothing to deploy. "%}

Note that the content of any sub-directories found in the deploy directory will not be displayed in the `APPS and Artifacts` section of your build. You can, however, **compress your artifacts** into a zip file if you modify the default `false` value to `true` in the `Compress the artifacts into one file` field in the `Deploy to Bitrise.io` step. This will compress the whole directory along with its sub-directories and deploy to `APPS & Artifacts`.

### Modify target directory path

You can **modify the target directory path** to another one but make sure you reference the same directory paths in other steps of your workflow to ensure that the generated files get collected to the same directory.

### View artifacts if your build has failed

With the `Run if previous Step failed` toggle enabled, you can access your build artifacts - only those that have been successfully generated - even if your build has failed. For example, you can detect bugs in your failed build by looking into the generated test report files.

### Who can access build artifacts?

The artifacts at `APPS & Artifacts` are accessible for everyone who are owner, admin, developer, tester/QA of the app. Besides these roles, if you keep the default config of the `Enable public page for the App` feature, then anyone who receives the URL, will be able to access your app and its artifacts. For more information, check out [Public App install page](https://devcenter.bitrise.io/tutorials/deploy/bitrise-app-deployment/#public-app-install-page).

## File types & limitations

All file types are supported and will be available in `APPS & Artifacts`.
Depending on the type of the file, you can either view your artifacts inline if you click on the `eye` icon or download them to your local computer.

There is no limitation on the NUMBER of files deployed to `APPS & Artifacts` per build. There is a limitation, however, on the file size which is **2GB per file**.