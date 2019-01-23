---
title: Adding a new app
redirect_from:
- "/tutorials/deploy/android-deployment/getting-started/adding-a-new-app"
- "/adding-a-new-app/"
menu:
  adding-a-new-app:
    weight: 1

---
When adding your app to **Bitrise**, we will clone your repository to make sure we can access it. Besides cloning your repository we will run our [project scanner](https://github.com/bitrise-steplib/steps-project-scanner) that detects all the supported apps and instantly configure your workflow with all the necessary steps to build and deploy your app.

{% include message_box.html type="note" title="Currently we are supporting the following projects out of the box" content="  

* iOS  
* Android 
* Xamarin 
* Fastlane 
* macOS 
* Cordova  
* Ionic 
* React Native "%} 

To add a new app to Bitrise go to your [dashboard](https://bitrise.io/dashboard) and press the `Add new app` button.

![Screenshot](/img/adding-a-new-app/add_new_app.png)

In case this is the first application the dashboard will show you the quickstart guide instead of a list of you apps. There you can choose to add your first app right away.

Let's check out how you can [connect a repository](/getting-started/adding-a-new-app/connecting-a-repository)!