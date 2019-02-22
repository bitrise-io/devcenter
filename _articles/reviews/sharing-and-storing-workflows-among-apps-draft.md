---
title: Sharing and Storing workflows among multiple apps - draft
redirect_from: []
date: 2019-02-14 10:04:13 +0000
published: false

---
Here are a couple of tricks to share and store a specific workflow among multiple apps instead of building your workflow from scratch every time.

## Using bitrise.yml tab

Do you have a workflow that you want to "reuse" multiple times when you onboard new apps? An easy way to do so is through the `bitrise.yml` mode/tab in your Workflow Editor. Then copy the yml of reusable app from the `bitrise.yml` tab of the `Workflow Editor` to the new app's `bitrise.yml` tab.

Please note that the newly added apps would always have the latest config in this case, but the previously added apps would need to be updated manually if needed.

## Storing yml in the project's repo

You can store the `bitrise.yml` in your project's repo. This would mostly be similar to the previously mentioned method with the ability to track changes using your own source control system **but how does this work**? **This basically means that you can reference  steps or a whole workflow (depending on what you want to reuse) globally across apps.**

**Storing it in a separate repository and using that as a submodule, for example, in your main repo. Here is a** [**guide**](http://devcenter.bitrise.io/tips-and-tricks/use-bitrise-yml-from-repository/) **on how to store** `**bitrise.yml**` **in your repo. If you download our open source Workflow Editor, you can manually edit the yml file on your local PC.**

## Storing yml in a repository along with other project's yml

You can store the `bitrise.yml` in a repository that stores every project's yml. **This way you can track the changes to the ymls in a different repository and these changes wouldn't create extra noise in the project repository.** **You can create a common yml that can be called from within any other** `**bitrise.yml**` and you can keep the project specific ymls in their own folders.

Also regarding the solutions where you store the yml a repository: you don't need to worry about editing the workflows manually as you can use our workflow editor using our CLI.

* sharing steps/workflows on the roadmap?