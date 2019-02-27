---
title: Continuous Integration for iOS apps
redirect_from: []
date: 2019-02-27 16:47:56 +0000
published: false

---
## Continuous Integration for iOS with Bitrise

![](https://savvyapps.com/uploads/blog/_960xAUTO_crop_center-center_82_none/2019-2-bitrise.jpg)

We've used continuous integration for a long time. Back in 2017, Savvy published the [Jenkins piece to end all Jenkins pieces](https://savvyapps.com/blog/continuous-integration-ios-jenkins). And while we're still fans of Jenkins (and Travis CI), last year we decided to try something new. Enter Bitrise.

[Bitrise](https://bitrise.io/) is a continuous integration platform for apps that is equal parts powerful and easy to use. It's great for handling certificates and profiles, offers a nice range of workflow options, and is pretty simple to set up. Kinda.

Even though it's easier to get started with Bitrise compared to other CI platforms, we found parsing through the documentation to get up and running time-consuming and frustrating, especially when we had to do some troubleshooting. To make life easier for fellow developers, we compiled everything you need to know to set up and configure an iOS app in Bitrise.

This guide will walk you through the benefits of using Bitrise, adding and editing apps to the platform, configuring workflows and triggers, setting up code signing, and a few fun extras that the Savvy team enjoys. Hopefully, with this resource you'll spend less time getting Bitrise working for your team and more time building great app experiences. With that, let's dig in...

![](https://savvyapps.com/imager/blog/4638/bitrise-logo-1_a3849e0cbbd1e16dcd914c83ccc6e82a.png =825x290)

### Why Bitrise Over Jenkins, Travis, and Other CI Alternatives?

Bitrise is a magician ✨ when it comes to dealing with certificates and profiles, which is often a source of major frustration with other CI platforms. We love it because unlike other CIs, Bitrise is built specifically for apps. There are a number of app platforms that Bitrise automatically supports and identifies, making the setup process even easier for iOS developers. What's more, Bitrise's setup doesn't require you to edit as many code files, making it much less fussy and error-prone than Travis CI and Jenkins.

Another notable benefit to using Bitrise is that it offers an easy-to-use web UI and a large range of workflow steps — simple scripts, really — that allow for easy customization and configuration of your build workflow. If you really want to, you can modify the .yml config file to achieve this, but the Web UI makes it so simple.

Finally, we appreciate the simple way Bitrise deploys TestFlight and App Store builds. All you have to do in Bitrise is add and configure those “steps” to your workflow. The same is possible with Jenkins or Travis, but requires a lot more setup and manual configuration.

Ready to get started?

### Joining Bitrise

The first task in this tutorial is the easiest. Follow these two steps to get officially acquainted with Bitrise.

* [Create an account](https://app.bitrise.io/users/sign_up) at Bitrise.
* If you're a part of an organization, request to be added to that organization.

With that done, let's add your first iOS app.

### Adding an iOS App

The selected steps below are what you'll need to get up and running – then customize the integration to meet your needs

* Click the `+` sign on the top menu bar and select `Add app`.
* On the Create New App page, choose the account under which you'd like to create the app project. Depending on your use, this may need to be your organization's account.
* Set the privacy of the app to `Private` and click `Next`.
* Select Github and select `Organizations' Repos`, then select the repository for the app you're trying to add.
* When prompted to set up repository access, click `No, auto-add SSH key`. If that doesn't work, copy the provided SSH key and visit [SSH and GPG keys](https://github.com/settings/keys) page on Github. Click `New SSH key` and add the provided key. [More info on SSH keys](https://devcenter.bitrise.io/getting-started/adding-a-new-app/setting-up-ssh-keys/).
* Type the name of the branch that includes your project’s configuration — `debug`, for example — then click Next.
* Wait while Bitrise validates your project. Bitrise looks for your configuration files and sets up your app based on them. In the case of an iOS app, it's looking for your Xcode project (`.xcodeproj`) or Xcode workspace (`.xcworkspace`) path.

IMPORTANT! The validation will fail if you do not have a SHARED scheme in your project. You can still point Bitrise manually to your Xcode scheme, but if it’s shared, Bitrise will automatically detect it for you. Read more about [schemes and the possible issues with them](https://devcenter.bitrise.io/troubleshooting/frequent-ios-issues/#xcode-scheme-not-found).

* Select the .ipa export method. You can modify this later - for now, select `development`.
* Once you've clicked it, you should see your project or workspace path, scheme name, .ipa export method, and iOS stack.
* [Register a webhook](https://devcenter.bitrise.io/webhooks/index/) when prompted so that Bitrise can start a build automatically when code is pushed to your repository, or a pull request is created. This also kicks off your first build. Click the message and it will take you to the build page.

NOTE: Depending on your access level, you may need the owner of the Github project to manually add the webhook to the Github page. [More on that here](https://devcenter.bitrise.io/webhooks/adding-a-github-webhook/#get-the-webhook-url-for-github). Once added, ensure that you register the webhook in Bitrise as well. To do that, go to Dashboard > `your-organization-name` > `name-of-your-app` and click the `{} Code` tab, then click the purple `Register Webhook` button.

### Editing Apps on Bitrise

To edit the configuration of an app on Bitrise, click the `Dashboard` button at the top of the page and click the app you want to modify on the right-hand side.

![](https://savvyapps.com/imager/blog/4645/showing2apps_bitrise_a3849e0cbbd1e16dcd914c83ccc6e82a.png =825x562)

You'll then arrive on the app's configuration page. You can see and modify information regarding the app's builds, workflow, team, code, and settings.

##### BUILDS

The Builds tab shows a list of all builds that have been successful, failed, or aborted. Clicking on any build will open up more specific information about that build, including a full log and any apps and artifacts created during the build process. You can manually start or schedule a build from this tab as well.

##### WORKFLOW

The Workflow tab allows you to modify the steps, tools, and apps you'd like to use for each build process.

When creating an app, Bitrise generates `primary` and `deploy` workflows. To start, I deleted the `deploy` workflow and renamed `primary` to `debug`. You will need one workflow per scheme. Our project uses the following schemes: `debug`, `adhoc`, `beta`, and `app-store`.

You'll see more specifics about this in the Configuring Workflows section below. The steps we provide to set up the debug workflow will allow you to set up adhoc, beta, and app-store schemes.

##### TEAM

The Team tab shows the organization/team members involved with the project. You can add users to two user groups. We created Alphas (admins) and Tango (testers). Our admins group is made up of developers who need super-user permissions. The testers group contains our testers who only need to view builds and not make any changes or view the magic behind the scenes.

**IMPORTANT!** You will want to ensure for the `Service credential User`, that you've selected the GitHub/BitBucket account that owns the project and clicked `Test the git connection of {account-name}`.

##### CODE

The Code tab shows the App Slug (unique ID), Build Trigger Token, and Incoming/Outgoing Webhooks.

Incoming/Outgoing Webhooks are important as they're how Bitrise and Github communicate about which build to start based on which branch was committed to. You should be able to click `Setup Automatically`, but in case that doesn't work, follow this [short guide to set up a Github webhook manually](https://devcenter.bitrise.io/webhooks/adding-a-github-webhook/). Depending on your permission level, you may need the organization owner to configure this on the project Github page.

Also, note that you can use the App Slug and Build Trigger Token to trigger builds with a specific API call, should you so desire.

##### SETTINGS

The Settings tab shows the app icon, title, repository URL, default branch, and what your next build number will be. It also allows you to enable [Rolling Builds](https://devcenter.bitrise.io/builds/rolling-builds/), [Selective Builds](https://devcenter.bitrise.io/builds/selective_builds/), and [Device Testing](https://devcenter.bitrise.io/testing/device-testing-for-ios/) – all of which you can disable for now.

At the bottom are options to change your SSH key pair and configure email notifications for successful/failed builds. Keep those on default settings unless you want something different.

### Configuring Bitrise Workflows

This is the 🥩 and 🥔🥔 of Bitrise. You can create a workflow for each scheme that will automatically build your project once it registers that new commits have been pushed to a particular branch.

We love Bitrise in part because there are a lot of custom “steps” we can add to a workflow to customize what it does. Bitrise also allows you to integrate a number of popular tools with a couple of clicks. As you use the platform, you'll notice how simple it is to type configuration details into Bitrise's easy-to-use GUI.

As you make changes, be sure to press `⌘+S` to save or click the purple `Save` button at the top of the Workflow editor. If you renamed the `primary` workflow to `debug`, you should see a window similar to the one below:

![](https://savvyapps.com/imager/blog/4662/workflows_bitrise_a3849e0cbbd1e16dcd914c83ccc6e82a.png =825x624)

You shouldn't need to modify `Activate SSH Key`, `Git Clone Repository`, or `Bitrise.io Cache:Pull`, or `Certificate and profile installer`. However, `Xcode Test for iOS`, `Xcode Archive & Export for iOS`, and `Deploy to Bitrise.io` will need to be configured.

##### XCODE TEST FOR IOS

Follow these steps to configure the 'Xcode Test for iOS' step in your Bitrise workflow.

* Set the `Scheme name` field to whatever scheme the workflow is for.
* Create workflow specific environment variables. To do so, click the `Env Vars` tab. Then, for the `debug` workflow, click `Add new` and set the key to `BITRISE_SCHEME` and the value to `Debug`. The scheme should match your project's schemes.
* Do the same thing for the key `BITRISE_EXPORT_METHOD` and value `development` — we will use this in a moment.
* Delete the `BITRISE_SCHEME` and `BITRISE_EXPORT_METHOD` key/value pairs from `App Environment Variables` section at the top.

![](https://savvyapps.com/imager/blog/4669/workflow_env_bitrise_a3849e0cbbd1e16dcd914c83ccc6e82a.png =825x389)

##### XCODE ARCHIVE AND EXPORT FOR IOS

* In the Select method for export, click `CHANGE`, then click `Insert variable`.
* Search for `BITRISE_EXPORT_METHOD`.

This will allow the debug workflow specifically to access the environment variables and use the export method chosen there.

![](https://savvyapps.com/imager/blog/4670/debug_workflow_bitrise_a3849e0cbbd1e16dcd914c83ccc6e82a.png =825x523)

##### DEPLOY TO BITRISE.IO

Now, you need to configure `Notify: Emails`.

* Click `Enter` value and click `Select secret variable`. You will be creating a new, secret environment variable.
* For the key, enter your app name followed by `“_EMAILS”` (i.e. `JELLIES_EMAILS`).
* For the value, enter a comma-separated list of relevant emails for receiving build notifications (yourself, project manager, etc.).
* For `Enable public page for the App?`, set it to true if it isn't already.

### Configuring Workflow Triggers

You need to configure some triggers in order for Bitrise to trigger a certain build when code is pushed to Github. In the Workflow settings, click the `Triggers` tab and you should be able to add a trigger for each branch name that triggers its matching workflow.

Once you've finished the workflows for each branch, you should see the following:

![](https://savvyapps.com/imager/blog/4677/trigger_bitrise_a3849e0cbbd1e16dcd914c83ccc6e82a.png =825x576)

NOTE: You can also set up triggers for pull requests or tags on Github.

### Configuring Code Signing

To install and test the app on other physical devices, you need to create and export an .ipa file. This requires setting up code signing. In this example, we export an .ipa with the `development`export method. You can't upload such an app to TestFlight, but you can test it, for example, on your internal testers' devices.

Thankfully, code signing with Bitrise is easy and fairly straight-forward. You will (1) collect the required files using a command line tool called `codesigndoc`, (2) upload those files to your Bitrise project, and (3) select manual or automatic provisioning.

NOTE: If you run into any issues, be sure to check out the [codesigndoc Github page](https://github.com/bitrise-tools/codesigndoc) for the most up-to-date information on using `codesigndoc`.

##### YOU WILL NEED:

* The debug workflow
* An iOS development certificate (a .p12 certificate file)
* A development-type provisioning profile

##### STEPS

* To begin, open your terminal application of choice. Type `cd {name of Xcode directory}` into the terminal, then press `Enter`.
* Next, type the following and press `Enter`:

    bash -l -c "$(curl -sfL https://raw.githubusercontent.com/bitrise-tools/codesigndoc/master/_scripts/install_wrap-xcode.sh)"

* The first prompt asks you to choose which scheme you usually use in Xcode. Choose the scheme you're trying to generate files for. If you're trying to export files for the `debug`scheme, choose `Debug`. Type the number beside the scheme you chose and press `Enter`. An Xcode archive of your app will be exported following the chosen scheme.
* Next, select an ipa export method from the list (`development`, `ad-hoc`, `app-store`, `enterprise`) that goes with the scheme you exported for earlier. Type the number beside the IPA Export Method and press `Enter`.
* You will then be prompted to select the Codesign Identity. Choose the one you use in Xcode for the scheme you chose earlier. Type the number beside the Codesign Identity and press `Enter`.
* A question will appear asking if you wish to collect another group of ipa export code sign files. If you want to gather files for another scheme, type `yes` -- otherwise type `no` and press `Enter`.
* Keychain Access may prompt you to enter your keychain password. Enter it, then head back to the terminal.
* The terminal will now inform you that you can upload the files directly to Bitrise. Type `yes`and press `Enter`.
* You now need to copy your personal access token from Bitrise. You can generate this token by going to [Bitrise.io](http://bitrise.io/), signing in, going to Account Settings, and selecting the [Security](https://app.bitrise.io/me/profile#/security) tab. Once you've created your token, copy and paste it into the terminal window and press `Enter`.
* The next thing you will see is a list of all app projects you have access to on Bitrise. Type the number next to the proper project and press Enter.
* At this point, any certificates and profiles that are not on Bitrise will be uploaded to their proper place and a Finder window will open containing copies of all the files you exported. To confirm that the profiles were uploaded properly go to the specific app project's dashboard and click `Workflow`, then `Code Signing`. You should see all the files you exported in their proper places on this page. If not, upload them manually from the Finder window.
* Check that you have the `Certificate and profile installer` step in your workflow. It must be before the `Xcode Archive & Export for iOS` step (you can have other steps between the two, like Xcode Test for iOS).
* Check the `Select method for export` input of the `Xcode Archive & Export for iOS` step. By default, it should be the `$BITRISE_EXPORT_METHOD` environment variable. This variable stores the export method you selected when creating the app. If you selected `development`, you don’t need to change the input. Otherwise, manually set it to `development`.

![](https://savvyapps.com/imager/blog/4690/archivexport_bitrise_a3849e0cbbd1e16dcd914c83ccc6e82a.png =825x243)

* [Start a build](https://devcenter.bitrise.io/builds/starting-builds-manually/).

If you uploaded the correct code signing files, the `Certificate and profile installer`step should install your code signing files and the `Xcode Archive & Export for iOS` step should export an .ipa with the development export method. If you have the `Deploy to Bitrise.io` step in your workflow, you can find the .ipa on the `Apps & Artifacts` tab of the build page.

##### AUTOMATIC PROVISIONING

In order to set up Automatic Provisioning, you need to go through the `codesigndoc` steps and upload the .p12 certificate files exported and displayed in the Finder window to the code signing tab of the Workflow Editor. Then, add the iOS Auto Provision step to your workflow above the `Xcode Archive & Export for iOS` step and configure the following properties:

* `The Developer Portal team id`: Find this on the Membership Details page of your [Apple Developer Portal account](https://developer.apple.com/account/#/membership)
* `Distribution type`: Make sure its value matches the value of the Select method for export input in the Xcode Archive & Export for iOS step.
* `Scheme`: Allows you to restrict which targets to process.

![](https://savvyapps.com/imager/blog/4691/provision_bitrise_a3849e0cbbd1e16dcd914c83ccc6e82a.png =825x345)

### Pinging Slack with Build Success/Failure

We integrated a neat QR code plugin to further customize Savvy's continuous integration setup. The plugin shares a QR code in Slack whenever a build is successfully created. It saves time and energy by allowing our product managers to go directly into the build install page just by scanning the code with their phones. The QR code plugin is just one of many built-in tools that allow you to hyper-configure app builds in Bitrise.

To replicate this, you'll need to enable Slack messages for build success or failure and create a QR code that testers can scan to bring them directly to the app install page.

* Go into the `Workflow Editor` for your app.
* At the bottom of the line of workflow steps, click the `+` button.
* In the panel that pops up, search for `QR Code` and click `Create install page QR code`.

![](https://savvyapps.com/imager/blog/4692/bitrise_a3849e0cbbd1e16dcd914c83ccc6e82a.png =825x620)

* You don't need to change anything, but in the in the output variables, copy the variable `$BITRISE_PUBLIC_INSTALL_PAGE_QR_CODE_IMAGE_URL` as we will be using it in our Slack message.

![](https://savvyapps.com/imager/blog/4693/qr_install_bitrise_a3849e0cbbd1e16dcd914c83ccc6e82a.png =825x566)

* Click the `+` button beneath `Create install page QR code` and search for Slack.
* Click `Send a Slack message` to add it to your workflow.

To configure Slack messages properly, you _need_ to modify the following fields (other fields can be customized as you like):

**Slack Webhook URL**

* Get the webhook URL from your iOS project's Travis CI `build.yml` file from Github if it exists, otherwise ask the owner of the Github project for the Slack webhook URL created for your specific channel.
* Click `Enter value` and then click `Select secret variable`.
* For the key, enter `APPNAME_SLACK_WEBHOOK` and for the value, paste the webhook URL.
* Click `Add new` and it should save into the field.

**Target Slack channel, group, or username**

* Click on the Env Vars tab at the top and click `Add new` to create a new App Environment Variable.
* For the key, enter `APPNAME_SLACK_CHANNEL`. For the value, enter `#channel_name`.
* Navigate back to the Slack message step in the workflow and under `Target Slack channel, group, or username`, click `Enter value`, then click `Insert variable`and select `$APPNAME_SLACK_CHANNEL`.

**A URL to an image file that will be displayed inside the attachment**

* Earlier, you added a step that created a QR code from the App Install page URL and it was saved in an output variable. Click `Enter value` then select `$BITRISE_PUBLIC_INSTALL_PAGE_QR_CODE_IMAGE_URL`.
* Scroll down to the bottom of the Slack message integration step and click `If Build Failed`.
* Configure the following fields:
  * `Target Slack channel, group or username if the build failed`
  * Click `Enter value`, then click `Insert variable` and select `$APPNAME_SLACK_CHANNEL` from the list.

Once that is set up, Slack messages should be sent upon successful or failed builds! 🙌 They look like this:

![](https://savvyapps.com/imager/blog/4706/succss_bitrise_a3849e0cbbd1e16dcd914c83ccc6e82a.png =825x798)

### Testing Your Bitrise Integration

To test out the build process for Bitrise, start a build in the app's dashboard by clicking the `Start/Schedule a Build` button. All builds (including running ones) can be found in the Dashboard:

![](https://savvyapps.com/imager/blog/4707/latestbuilds_bitrise_a3849e0cbbd1e16dcd914c83ccc6e82a.png =825x665)

To verify that Git integration is working, make an insignificant change (adding a comment) to your project on the branch you want to test and push it up.

### Concluding Note

Congratulations on setting up and configuring your first iOS app on the Bitrise CI platform! We hope this tutorial helped you avoid some of the troubleshooting issues we encountered when we were first getting started with Bitrise last year.

For more information on continuous integration and CI tools, check out the [Savvy Apps blog](https://savvyapps.com/blog). Connect with us on [Twitter](http://twitter.com/savvyapps) and [Facebook](https://www.facebook.com/savvyapps/) for updates, including announcements when we release additional educational resources and open source projects.