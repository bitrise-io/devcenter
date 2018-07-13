## Selective Builds

The Selective Builds setting provides change detection for your builds. Enabling it allows you to only trigger a build of an app if certain files or folders have changed.

You may want to use this setting if:

* you have multiple apps in a single repository
* multiple apps share common files in your repository

!!! note "A GitHub project is required"
    The current version of our Selective Builds feature only works with GitHub projects. If your repository is hosted by another git hosting service, the option will not be available.

!!! note "Service credential user"
    The appropriate Service credential user must be set on your app's `Team` page. This user must have an admin right for the GitHub repository of the project. [Read more about setting up the Service credential user](/faq/github-pull-request-status-troubleshooting/#make-sure-to-select-a-service-credential-user-who-has-a-connected-github-account).

1. Click on your app on your `Dashboard`.

2. Click `Settings` in the top navigation bar.

3. Find the `ENABLE SELECTIVE BUILDS` option and toggle the switch on the right.

    ![Selective Builds](/img/getting-started/selective-builds.png)

4. Add filenames and file paths in the `ADD FILENAME/PATH` window. You can add multiple files or file paths here. A build will be triggered only if these files are changed.
