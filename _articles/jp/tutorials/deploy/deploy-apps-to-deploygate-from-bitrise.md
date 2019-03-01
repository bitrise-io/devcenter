---
# jp title missing
title: Deploy apps to DeployGate from Bitrise
menu:
  deployment-tutorials:
    weight: 4

---

{% include not_translated_yet.html %}

# What is DeployGate?

[**DeployGate**](https://deploygate.com?locale=en) is a mobile app distribution platform for iOS and Android, delivering your in-development iOS/Android apps to your dev team, members, employees, QA testing team in your organization or testers outside of your company. 


DeployGate has many features to accelerate your app development cycle including QA testing and app improvement with beta tester's feedbacks.

Features: 
* Real-time App distribution with automatic version control, even without requiring accounts for testers
* Flexible user account management with granular access control
* Git-like multi-track distribution allows individual version/user/device management for the same app


With DeployGate and Bitrise, you can quickly build a fully automated in-house dogfooding environment for your team. To see more details, please visit [DeployGate Features](https://deploygate.com/features?locale=en).

![Automated app distribution workflow](/img/tutorials/deploy/deploygate/flow.png)

# Upload your app to DeployGate via Bitrise

To upload your app to DeployGate, add `DeployGate Upload` step to your bitrise workflow.

![DeployGate Workflow Step](/img/tutorials/deploy/deploygate/step.png)

This step should be added after the app build process to have built binary app file before uploading.
You need to set several required params as below:

| Input Variables | Description |
|-|-|
|API Key| Set upload user's DeployGate API Key from [Account Settings](https://deploygate.com/settings). <br>If you want to upload apps as organization account, please use organization's API Key. Upload account will be shown on the activity timeline.|
|Owner Name|App owner's account name in DeployGate. <br> You can use username or organization name. |
|App file path| App's binary file (IPA/APK) to be uploaded.<br>For default setting, use `$BITRISE_APK_PATH` for Android or `$BITRISE_IPA_PATH` for iOS|
|App Visibility| You can list your app name and icon on your DeployGate profile page. This variable effects in just for visibility, not for allowing download or install by anonymous. |

You can also set optional variables for using advanced features as below:

| Input Variables | Description |
|-|-|
|Short Message|Summary of update shown on DeployGate.<br>You can use `$GIT_CLONE_COMMIT_MESSAGE_SUBJECT` if you want to use the same message as git commit|
|Distribution Key|You can make multiple public install links (we called it **`Distribution Page`**) for a different version of app binary in the same app. <br>By specifying the distribution page's hash, that distribution page will be updated simultaneously. The "xxxx" portion of the distributed page's URL like https://deploygate.com/distributions/xxxx|
|Distribution Name|Specify the name of the updated distribution page. If nothing exists, a new distribution page will be created. Possible usage includes creating distribution pages for each Git branch name. (for example `$BITRISE_GIT_BRANCH`)|
|Release Note|Message for the new release in distribution page. This message will be notified to your distribution page's testers|
|Disable Notify(iOS Only)|There is no DeployGate client app in iOS platform. By default, we use email notifications for release updates. If you don't need email notification, please set this option as `true`|


{% include message_box.html type="info" title="More info on DeployGate " content=" These options are based on [**DeloyGate API**](https://docs.deploygate.com/reference). For more details, please read the references at [DeployGate.com](https://deploygate.com?locale=en).
"%}

# How `Distribution Page` works?

![Distribution Page](/img/tutorials/deploy/deploygate/distribution_page.png)

**Distribution Page** (Shareable link) is a feature to generate a landing page for the app installation of your app's specific version. When you upload an app to DeployGate, the system automatically assigns a sequential number (we are calling it **`Revision Number`**) for each uploaded build. On Distribution Page, you can choose specific revision of app to distribute for each group of testers.
This feature is handy for distributing your app to multiple tester groups for different purposes such as QAs, Dog Fooding, or Test Marketing.

You can also generate a distribution page when you upload an app from Bitrise with DeployGate Upload step. Please refer to the optional variables above.
