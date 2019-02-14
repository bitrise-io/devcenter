---
title: Sharing and Storing workflows among multiple apps - draft
redirect_from: []
date: 2019-02-14 10:04:13 +0000
published: false

---
Here are a couple of tricks to share and store a specific workflow among multiple apps.

## Using bitrise.yml tab

You can create a workflow and "reuse" any time when you onboard new apps. You can simply copy the yml of the app to the new one using the `bitrise.yml` tab of the `Workflow Editor`.

![](/img/bitrise-yml.png)

The newly added apps would always have the latest config in this case, but the previously added apps would need to be updated manually if needed.

## Storing yml in the project's repo

You can store the `bitrise.yml` in the project's repo. This would mostly be similar to the previously mentioned method with ability to track the changes using your own source control system as an added bonus.

## Storing yml in a repository along with other project's yml

You can store the `bitrise.yml` in a repository that can keep every project's yml. **This way you have the ability to track the changes to the ymls in a different repository and these changes wouldn't create extra noise in the project repository.** You can create a common yml that can be called from within any other `bitrise.yml` and you can keep the project specific ymls in their own folders.

Also regarding the solutions where you store the yml a repository: you don't need to worry about editing the workflows manually as you can use our workflow editor using our CLI.