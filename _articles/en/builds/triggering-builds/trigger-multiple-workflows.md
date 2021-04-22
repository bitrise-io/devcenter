---
title: Starting parallel builds with a single trigger
tag:
- triggers
- builds
description: 'If you have more than one concurrency, you can run more than one build
  simultaneously. And since we want to make life as easy for you as possible, these
  builds can be started automatically, with a single trigger. '
redirect_from: []
summary: ''
menu:
  triggering-builds:
    weight: 12

---
If you have more than one concurrency, you can run more than one build simultaneously. And since we want to make life as easy for you as possible, these builds can be started automatically, with a single trigger. Let's go through how it works!

In the example, we have three Workflows of a single app set up to run at the same time. Let's call these workflows `Trigger`, `Building` and `Testing`. The workflow called `Trigger` will be triggered by a pull request, and then the workflow will trigger `Building` and `Testing` which will run simultaneously.

All workflows run on separate, clean Virtual Machines. They can also run on different types of stacks: to choose the stack for any Workflow, go to the **Workflow Editor** of the app and select the **Stack** tab.

If any of the builds fail, the build will be considered a failed build. If the build is triggered by a webhook, Bitrise will send a summarized build result to your Git provider. If any of the parallel builds fail, a failed status will be reported.

What you need:

* A Personal Access Token.
* A Secret Environment Variable storing the token.
* The **Bitrise Start Build** Step.
* The **Bitrise Wait for Build** Step.

1. Create a **Personal Access Token** for your user.

   Go to **Account settings** and select the **Security** option on the left side. Click the **Generate new** button.

   ![{{ page.title }}](/img/generate-access-tokens.png)

   IMPORTANT: Make sure to copy the code once it has generated. You will not be able to see it again!
2. Create a Secret Environment Variable on the **Secrets** tab of the app's **Workflow Editor** and add the token as its value.

   ![{{ page.title }}](/img/access-token-secrets.png)

   Feel free to use any key you wish for the secret. We recommend something simple like `$ACCESS_TOKEN`.
3. Add the **Bitrise Start Build** Step to the `Trigger` workflow.

   Note that the **Bitrise Start Build** Step will set an Environment Variable to all builds it starts: `$SOURCE_BITRISE_BUILD_NUMBER`. Each build triggered by the Step will have their own build numbers but the source build number will be the same for all of them. 
4. Add the secret env storing your personal access token to the **Bitrise Access Token** input of the Step: click the **Select secret variable** button and choose the key you created.

   ![{{ page.title }}](/img/bitrise-access-token-step.png)
5. Find the **Workflows** input of the Step, and add **Building** and **Testing** to it.

   ![{{ page.title }}](/img/bitrise-start-build.png)
6. Add the **Bitrise Wait for Build** Step as the last Step of the `Trigger` workflow.

   IMPORTANT: The Step checks statuses of the builds defined in the Step. The builds are defined in the **Build slugs** input: the slugs are the output of the **Bitrise Start Build** Step. As long as the builds defined by the slugs are running, the Step will hold the build it is running in. The build will fail if any of the builds included in the Step fail.
7. Add the secret env storing your personal access token to the **Bitrise Access Token** input of the Step: click the **Select secret variable** button and choose the key you created.

   ![{{ page.title }}](/img/access-token-select-secret-variable.png)

And you are done! Once you trigger the `Trigger` workflow, the **Bitrise Start Build** Step of the Workflow will trigger two more builds running simultaneously. If those two builds are successful, the **Bitrise Wait for Build** Step lets the first build finish. A single status report is sent to the git hosting provider, regardless whether the build is successful or not.

{% include message_box.html type="note" title="Bitrise Build Step on the CI" content="Since the **Bitrise Build Start** Step heavily relies on the parameters of the currently running build (for example, the app slug, build slug and the build number) to call the [build API](https://api-docs.bitrise.io/#/builds), you cannot use the **Bitrise Build Start** Step locally."%}

{% include banner.html banner_text="Set up trigger to start parallel builds" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}