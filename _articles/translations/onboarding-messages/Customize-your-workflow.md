<!--
This is the second onboarding email we send out for new developers.
With your help, we could send Japanese messages to our new Japanese users. :)
-->

Now that you know how to add an app, let's see how you can modify your Bitrise workflow to your own needs.

In this example we will use the the git-flow model.
In your newly added app's workflow editor you can start customising your workflow.
Let's setup 3 workflows for 3 different use-cases.

​

​
1. The first one should be triggered on feature/* and test your feature branch with unit, UI and device tests.
2. Once your feature is merged to develop branch we'd recommend to send it to your testing team. You can use our internal deploy system, or any other service, like HockeyApp. To trigger this workflow, set up a trigger for the Pull Request that goes to the develop branch.
3. And finally once you merge it to master, it will kick off a build that can be deployed to iTunes Connect or Google Play. 🚀

To add a new integration to your workflow simply click on the + button inside the workflow editor. You can choose from more than 180 integrations, like Slack, HockeyApp, CodeCov, or iTunesConnect. 😱

If you have any question, reach out to me here or on Intercom (bottom right corner on Bitrise.io).

Happy building!
