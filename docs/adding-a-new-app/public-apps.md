Open source projects are great - we all love them! They can be a pain to maintain, however, especially with CI/CD in the picture. That's why we have introduced the Public Apps feature for Bitrise: to make everyone's life a lot easier!

If your Bitrise app is public, anyone who has the build URL can see the build logs. For example, if the CI status check on GitHub fails on a pull request, anyone can click on the build URL and view the build logs. As such, outside contributors can troubleshoot issues easier, find out why, for example, a pull request of theirs resulted in a failed build. They do not have to be invited to a Bitrise team to be able to view Bitrise logs and they do not need the help of a Bitrise team member, either.

Of course, this does not mean anyone can do anything with your public app on Bitrise. If the user viewing the logs is not invited to work on the app in some role, they will only be able to:

- view the build logs
- download the build logs
- view the build's `bitrise.yml` file.

!!! warning
    __You can only set an app to public when adding the app to Bitrise!__ Once an app has been added, its privacy settings __CANNOT__ be changed again.

### Add a new app as public

Adding a new app as a public app is incredibly simple: at the start of the process of adding a new app, you will be asked to choose between a private and a public option for the app. Choosing the public option does not change anything about the process itself, it only determines the accessibility of the app.

1. Click the `+` symbol on the top menu bar.

1. Click `Add app`.

1. Choose the account you wish to use for the app.

1. Set the privacy of the app to `Public`.

![Set the app to Public](/img/adding-a-new-app/public-app.png)

After this, proceed as usual to set up the app.

!!! warning
    Remember: a public app's build logs and `bitrise.yml` file can be seen by anyone - make sure these files do not expose anything you do not want to be seen! Check out our [Sensitive input in public apps](/builds/sensitive-input-field) section to learn how to protect sensitive input in your public apps.
