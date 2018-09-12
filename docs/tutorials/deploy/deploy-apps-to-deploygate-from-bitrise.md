# What is DeployGate?

**[DeployGate](https://deploygate.com?locale=en)** is a mobile app distribution platform for  iOS/Android, delivering your in-development iOS/Android apps to your dev team, members, employees, QA testing team in your organization or testers outside of your company. 

DeployGate have many features to acceralate your app development cycle including QA testing and app improvement with beta tester's feedbacks.

Features: 
- App binary version control
- Flexible user account management
- Access control and device management
- git-like multi track distribution and user/device grouping in same app

With DeployGate and Bitrise, you can easily build fully automated in-house dog fooding environment for your team. To see more details, please visit [DeployGate Features](https://deploygate.com/features?locale=en).

![Automated app distribution workflow](/img/tutorials/deploy/deploygate/flow.png)

# Upload your app to DeployGate via Bitrise

To upload your app to DeployGate, you just add `DeployGate Upload` step to your bitrise workflow.

![DeployGate Workflow Step](/img/tutorials/deploy/deploygate/step.png)

This step should be added after app build process to have builded binary app file before uploading.
You need to set several required params as below:

| Input Variables | Description |
|-|-|
|API Key| Set upload user's DeployGate API Key from [Account Settings](https://deploygate.com/settings). <br>If you want to upload apps as organization account, please use organization's API Key. Upload account will be shown on activity timeline.|
|Owner Name|App owner's account name in DeployGate. <br> You can use user name or organization name. |
|App file path| App's binary file (IPA/APK) to be uploaded.<br>For default setting, use `$BITRISE_APK_PATH` for Android or `$BITRISE_IPA_PATH` for iOS|
|App Visibility| You can list your app name and icon on your DeployGate profile page. This is just for visibility, not for allowing download or install by anonymous. |

You can also set optional variables for using advanced features as below:


| Input Variables | Description |
|-|-|
|Short Message|Summary of update shown on DeployGate.<br>You can use `$GIT_CLONE_COMMIT_MESSAGE_SUBJECT` if you want to use same massage as git commit|
|Distribution Key|You can make multiple public install links (we called it **`Distribution Page`**) for different version of app binary in same apps. <br>By specifying the distribution page's hash, that distribution page will be updated simultaneously. The "xxxx" portion of the distributed page's URL like https://deploygate.com/distributions/xxxx|
|Distribution Name|Specify the name of the updated distribution page. If nothing exists, a new distribution page will be created. Possible usage includes creating distribution pages for each Git branch name. (e.g. `$BITRISE_GIT_BRANCH`)|
|Release Note|Message for new release in distribution page. This message will be notified to your distribution page's testers|
|Disable Notify(iOS Only)|There is no DeployGate client apps in iOS platform. By default, we are using email notification for release updates. If you don't need email notification, please set this option as `true`|

!!! note
    These options are based on **[DeloyGate API](https://docs.deploygate.com/reference)**. For more details, please read references at [DeployGate.com](https://deploygate.com?locale=en)

# How `Distribution Page` works?

![Distribution Page](/img/tutorials/deploy/deploygate/distribution_page.png)

**Distribution Page** (Public install link) is feature to generate landing page for app installation of your app's specific version.  When uploading your app to DeployGate, we assign unique sequencial number (we called it **`Revision Number`**) to your app binary. By using this revision number to make distribution page, you can select and distribute specific revision of app binary to each groups of testers.
This feature is very useful to separately distribute your apps to multi tester groups for different purposes (e.g. QA, Dog Fooding, Test Merketing)

You can also generate distribution link when you upload app from bitrise with DeployGate Upload steps. Please refer to the optional valiables above.
