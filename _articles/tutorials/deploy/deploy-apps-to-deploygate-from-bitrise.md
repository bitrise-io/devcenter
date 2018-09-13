---
title: Deploy apps to DeployGate from Bitrise
menu:
  deployment-tutorials:
    weight: 4
    title: Deploy apps to Deploygate from Bitrise

---
## What is DeployGate?

**[DeployGate](https://deploygate.com?locale=en)** is a mobile app distribution platform for iOS/Android. DeployGate delivers your in-development iOS/Android apps to your development team, members, employees, and QA testing team in your organization or to testers outside of your company.

DeployGate have many features to acceralate your app development cycle including QA testing and app improvement with beta tester's feedbacks.

Features:
- App binary version control
- Flexible user account management
- Access control and device management
- git-like multi track distribution and user/device grouping in the same app

With DeployGate and Bitrise, you can easily build fully automated in-house dog fooding environment for your team. To see more details, please visit [DeployGate Features](https://deploygate.com/features?locale=en).

![Automated app distribution workflow](/img/tutorials/deploy/deploygate/flow.png)

## Upload your app to DeployGate via Bitrise

To upload your app to DeployGate, you just add `DeployGate Upload` step to your bitrise workflow.

![DeployGate Workflow Step](/img/tutorials/deploy/deploygate/step.png)

This step should be added after the app building process to have a fully built binary app file before uploading.

You need to set several required params as below:

| Input Variables | Description |
|-|-|
|API Key| Set upload user's DeployGate API Key from [Account Settings](https://deploygate.com/settings). <br>If you want to upload apps as organization account, please use the organization's API Key. The upload account will be shown on the activity timeline.|
|Owner Name|App owner's account name in DeployGate. <br> You can use user name or organization name. |
|App file path| App's binary file (.ipa/apk) to be uploaded.<br>For default setting, use `$BITRISE_APK_PATH` for Android or `$BITRISE_IPA_PATH` for iOS.|
|App Visibility| You can list your app name and icon on your DeployGate profile page. This is just for visibility, not for allowing download or install by anonymous. |

You can also set optional variables to use advanced features as follows:


| Input Variables | Description |
|-|-|
|Short Message|Summary of update shown on DeployGate.<br>You can use `$GIT_CLONE_COMMIT_MESSAGE_SUBJECT` if you want to use the same message as git commit.|
|Distribution Key|You can make multiple public install links (called distribution page) for different versions of the app binary in the same apps. <br>By specifying the distribution page's hash, that distribution page will be updated simultaneously. The "xxxx" portion of the distributed page's URL reads as follows: https://deploygate.com/distributions/xxxx|
|Distribution Name|Specify the name of the updated distribution page. If nothing exists, a new distribution page will be created. Possible usage includes creating distribution pages for each Git branch name (for example, `$BITRISE_GIT_BRANCH`).|
|Release Note|Message for new release in distribution page. This message will be notified to your distribution page's testers.|
|Disable Notify(iOS Only)|There is no DeployGate client apps in iOS platform. By default, email notifications are used for release updates. If you don't need email notification, please set this option as `true`.|

!!! note
    These options are based on **[DeloyGate API](https://docs.deploygate.com/reference)**. For more details, please read the references at [DeployGate.com](https://deploygate.com?locale=en).

## How `Distribution Page` works?

![Distribution Page](/img/tutorials/deploy/deploygate/distribution_page.png)

Distribution Page (Public install link) generates a landing page for app installation of your app's specific version. When uploading your app to DeployGate, a unique sequencial number is assigned (`Revision Number`) to your app binary. By using this revision number to make a distribution page, you can select and distribute specific revisions of the app binary to each tester groups.
This feature is very useful to separately distribute your apps to multi-tester groups for different purposes (for example, for QA, Dog Fooding, or Test Merketing).

You can also generate the distribution link when you upload an app from [bitrise.io](https://www.bitrise.io) with the DeployGate Upload step. Please refer to the optional variables above.