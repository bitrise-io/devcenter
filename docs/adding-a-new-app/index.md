When adding your app to __Bitrise__, we will clone your repository to make sure we can access it. Besides cloning your repository we will run our [project scanner](https://github.com/bitrise-steplib/steps-project-scanner) that detects all the supported apps and instantly configure your workflow with all the necessary steps to build and deploy your app.

!!! note "Currently we are supporting the following projects out of the box"
    * iOS
    * Android
    * Xamarin
    * Fastlane

To add a new app to Bitrise go to your [dashboard](https://bitrise.io/dashboard) and press the `Add new app` button.

![Screenshot](/img/adding-a-new-app/add_new_app.png)

In case this is the first application the dashboard will show you the quickstart guide instead of a list of you apps. There you can choose to add your first app right away.

Let's check out how you can [connect a repository](/adding-a-new-app/connecting-a-repository)!

![Screenshot](/img/adding-a-new-app/quickstart_guide.png)
