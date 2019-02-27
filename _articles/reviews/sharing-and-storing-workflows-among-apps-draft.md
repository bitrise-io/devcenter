---
title: Sharing and Storing workflows among multiple apps - draft
redirect_from: []
date: 2019-02-14 10:04:13 +0000
published: false

---
Here are a couple of tricks to share and store a specific workflow among multiple apps instead of building your workflow from scratch every time you add an app to Bitrise.

## Using bitrise.yml tab

Do you have a workflow that you want to "reuse" multiple times when you onboard new apps? An easy way to do so is using the `bitrise.yml` mode/tab in your Workflow Editor.

1. Click the Workflow Editor of the app you want to reuse.
2. Copy the YML of the reusable app from the `bitrise.yml editor`.
3. Paste the YML into the new app's bitrise.yml tab.

![](/img/bitrise-yml-tab-2.png)

Please note that the newly added apps would always have the latest config in this case, but the previously added apps would need to be updated manually if needed.

## Storing bitrise.yml in the project's repo

You can store the `bitrise.yml` in your project's Github repo as well. This is similar to the previously mentioned method but with the bonus: you can track changes using your own source control system.

## Storing bitrise.yml in a repository with other project's bitrise.yml

You can store the `bitrise.yml` _in a repository_ that stores every project's yml. This way you can track the changes to the ymls in a _different repository_ and any changes made to these wouldn't create extra noise in the project repository. **You can create a common yml that can be called from within any other** `bitrise.yml` and you can keep the project specific ymls in their own folders.

Also regarding the solutions where you store the yml in a repository: you don't need to worry about editing the workflows manually as you can use our workflow editor using our CLI.