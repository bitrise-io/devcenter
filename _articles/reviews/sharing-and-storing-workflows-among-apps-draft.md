---
title: Sharing and Storing workflows among apps - draft
redirect_from: []
date: 2019-02-14 10:04:13 +0000
published: false

---

That's a great question!Our build system and CLI provides great flexibility on handling workflows/bitrise.ymls. A few options (including the solution that you also mentioned):

\- You can create a workflow and when you onboard new apps you can simply copy the yml of the app to the new one using the bitrise.yml tab of the Workflow Editor. The newly added apps would always have the latest config in this case, but the previously added apps would need to be updated manually if needed.

\- You can store the bitrise.yml in the project's repo. This would mostly be similar to the previously mentioned method, but would add the ability to track the changes using your own source control system.

\- You can store the bitrise.yml in a repository that would be used to keep every project's yml. This way you have the ability to track the changes to the ymls in a different repository and these changes wouldn't create extra noise in the project repository. You can create a common yml that can be called from within any other bitrise.yml and you can have the project specific ymls in their own folders.

Also regarding the solutions where you store the yml a repository: you don't need to worry about editing the workflows manually as you can use our workflow editor using our CLI