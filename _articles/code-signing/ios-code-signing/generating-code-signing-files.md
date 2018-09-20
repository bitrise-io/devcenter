---
title: Generating code signing files
menu:
  ios-code-signing:
    weight: 10

---
You'll need two kinds of files to sign your app: Certificates and Provisioning Profiles.

## Generate a Code Signing Certificate

The certificates - development or distribution - are the guarantee that you, the named developer, built this code, that you are a member of the developer program, and that Apple have issued you with a certificate to do so.

To get a certificate, you need to generate a Certificate Signing Request with Keychain Access and send it to Apple. This will create a public/private key for you if you don't have one already. Apple will then verify the information, and create a certificate for you.

### Generate a Code Signing Certificate using Xcode

First you have to add your Apple ID to Accounts preferences in Xcode. If you are already done with this, you can skip to step 6.

1. Start Xcode
2. Select Xcode > Preferences from the navigation bar.
3. At the top of the window select `Accounts`.
4. Click on the `+` on the lower left corner and select `Add Apple ID...`
   ![Adding Apple ID](/img/code-signing/ios-code-signing/xcode_adding_account.png)
5. A dialog will appear. Add your Apple ID and your password, then select `Sign in`. If you don't have an account you can create your Apple ID by selecting `Create Apple ID`.
   ![Sign in to Xcode](/img/code-signing/ios-code-signing/xcode_sign_in.png)
6. Select your Apple ID and your team from the right side bar, then click on `View Details...`.
7. A dialog will appear where you will see your code signing identities and the provisioning profiles.
   ![Xcode team details](/img/code-signing/ios-code-signing/xcode_signing_files.png)
8. Under the signing identities locate the `iOS Development` and `iOS Distribution` profiles. If you have not created them you will see a `Create` button next to them. Simply select it and Xcode will issue and download your code signing identities for you.

{% include message_box.html type="warning" title="When to click `Reset` next to Code Signing Identities" content=" If you already have Code Signing Identities issued, you will see a `Reset` button next to them. You can issue new certificates with it, that Xcode will generate and download, however note that this will invalidate your previous certificate, so only do this if you've lost those files or if you know what you are doing!
"%}

### Generate a Code Signing Certificate manually

 1. Open your `Keychain Access` app on macOS.
 2. Select `Keychain Access` > `Certificate Assistant` > `Request a Certificate From a Certificate Authority...`
 3. Fill in the `User's Email Address` and the `Common Name` and select `Saved to Disk`. Click on `Continue` and save the generated `certSigningRequest` file locally.
    ![Certificate Assistant](/img/code-signing/ios-code-signing/certificate_assistant.png)
 4. Go to [https://developer.apple.com](https://developer.apple.com) and log in to your account.
 5. Select `Certificates, IDs & Profiles` from the left sidebar.
 6. Go to `Certificates` and click on the `+` button on the top right corner.
 7. Select `iOS App Development` and click Continue.
 8. On the next page you see the instructions for creating the `certSigningRequest` file. Click continue.
 9. Upload the created `certSigningRequest` to the form and click continue. It will generate your code signing certificate for you.
10. Download the certificate and double click to install it. Once installed it will be added to your `Keychain Access` app.

## Generate a Provisioning Profile

Provisioning is the process of preparing and configuring an app to launch on devices and to use app services. Development Provisioning Profiles holds the device identifiers ( UUID ) that is eligible to run your app. Distribution Provisioning Profiles can include App Store profiles, that lets you distribute your app to the App Store and Ad-hoc profiles are good for distributing to your testers.

### Generate a Provisioning Profile with Xcode

Xcode will automatically generate an App ID for your project, that matches your unique bundle ID for your project. An App ID is used to identify one or more of your apps. It can be an _explicit App ID_ that only matches one unique bundle identifier or a _wildcard App ID_ that can match multiple ones.

Xcode will also create a _Team Provisioning Profile_ for your project automatically, so you can start deploying to your device automatically.

If you hit any issues you should make sure that the device is eligible, for example if the device doesn't match the deployment target you will get an error.

Also make sure that your app is connected to the correct Team.

1. Select your project file from Xcode's project navigator
2. Go to the `Signing` section and under the `Team` select your correct team.
   ![Team selector](/img/code-signing/ios-code-signing/xcode_team_selector.png)

{% include message_box.html type="note" title="Manual Provisioning Profiles setup" content=" If you hit any issues and can't resolve it, move to the manual step and set up Provisioning Profiles following the documentation. "%}

{% include message_box.html type="note" title="Distribution Provisioning Profile" content=" To setup a distribution Provisioning Profile, go ahead with the manual setup. "%}

### Download a Provisioning Profile with Xcode

If you have already created the Provisioning Profile, you can do the following.

1. Start Xcode
2. Select Xcode > Preferences from the navigation bar.
3. At the top of the window select `Accounts`.
4. Select your Apple ID and your team, then select `Download Manual Profiles`.
5. Go to `~/Library/MobileDevice/Provisioning Profiles/` and your profiles should be there.

### Generate a Provisioning Profile manually

#### Setup an App ID

1. If you haven't already created an App ID for your project, go to [https://developer.apple.com](https://developer.apple.com) and log in.
2. Select Certificates, Identifiers & Profiles from the left sidebar
3. Navigate to Identifiers > App IDs
4. In the `App ID Description` add a recognizable name for your App ID
5. Select `Explicit App ID` and add your bundle identifier to the field.
6. Select any additional `App Services` that you need.
7. Click continue.

#### Generate a Provisioning Profile

 1. Go to [https://developer.apple.com](https://developer.apple.com) and log in.
 2. Select Certificates, Identifiers & Profiles from the left sidebar
 3. Navigate to Provisioning Profiles > All
 4. Select the `+` from the top right corner.
 5. For development select the correct project type under `Development`, or for distribution select the correct one under `Distribution` and click continue.
 6. Select the App ID you would like to use.
 7. Select the certificates you wish to include in the Provisioning Profile. These certificates will be able to build with this profile; click continue.
 8. Select all the devices you would like to use with this profile and click continue.
 9. Name your Provisioning Profile and click continue.
10. Your profile is generated. You can download it to your device and double click to install it on your Mac.

#### Download a Provisioning Profile

1. Go to [https://developer.apple.com](https://developer.apple.com) and log in.
2. Select Certificates, Identifiers & Profiles from the left sidebar
3. Navigate to Provisioning Profiles > All
4. Find the Provisioning Profile you are looking for from the list or use the search to filter.
5. Click on the selected Provisioning Profile, this will expand the details.
6. If its status is invalid, you can click on the `Edit` button and save again.
7. Click on the `Download` button to download it and double click to install it on your Mac.

\[^1\]: Screenshots from https://developer.apple.com/support