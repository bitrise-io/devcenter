---
last_modified_at: 
title: Deploy your Xamarin app
redirect_from:
- "/xamarin/deploy-your-xamarin-app/"
- "/xamarin/deploy-your-xamarin-app"
menu:
  xamarin:
    weight: 6

---
After successfully adding your Xamarin application to Bitrise, we will create a default workflow (build configuration) for you. This workflow includes a **Deploy to bitrise.io** Step by default.

Building the default workflow will checkout your git repository, archive your application and move all the generated applications ( `ipa` / `apk` ) to the deployment folder. After the archive, the **Deploy to bitrise.io** Step will upload these files to Bitrise.

We will not just upload your application, but send out an email to your team as well. They can simply open the email from their mobile device and install the application from there. Also you can send out the build to any tester by providing their email address.

## What if you are already using or want to use another deployment service?

Besides the default Bitrise deployment we have [dozens of other services integrated](http://www.bitrise.io/integrations#?filter=deploy) to Bitrise. You can simply modify your workflow and add the ones you would like to, such as [HockeyApp](http://hockeyapp.net/), [Appaloosa](/tutorials/deploy/publish-your-app-to-appaloosa/), [TestFairy](/tutorials/deploy/deploy-to-testfairy-with-bitrise/) or [DeployGate](/tutorials/deploy/deploy-apps-to-deploygate-from-bitrise/) - just filter by the `deploy` tag in the list to see all the available deployment steps.

Simply add the integration Step you want to use instead of the **Deploy to bitrise.io** Step or after that (but in any case after the **Xamarin Archive** Step, as that's the Step which generates the deployable artifact - `.ipa`, `.apk`, ...), and fill out the parameters of the step.

For more information on code signing for Xamarin projects, see [Xamarin Android code signing](/code-signing/xamarin-android-code-signing/xamarin-android-code-signing) and [Creating a signed .ipa for Xamarin projects](/code-signing/ios-code-signing/create-signed-ipa-for-xamarin).

The next time you start a build, your app will be deployed to the service of your choice!

{% include banner.html banner_text="Deploy your Xamarin app" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}