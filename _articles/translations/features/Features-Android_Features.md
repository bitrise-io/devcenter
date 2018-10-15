<!--
These are the copies from the Bitrise Features page: https://www.bitrise.io/features/android-features
With your help, we could build the first localized version for Japan.
-->

ANDROID FEATURES
Out of the box support for your native Android projects. Build, test and deploy with ease.

# Project scanner
Adding your Android app to Bitrise takes less than 60 seconds. Our scanner automatically detects platform, dependencies and configuration and creates a base workflow that builds, tests and deploys your app on the first build.

# Docker support
Our predefined Docker image is cached and holds all the necessary tooling to build your Android apps. Once you trigger a new build it will start immediately. In addition, you can use the same Docker image in tandem with our CLI to debug your build locally, in the same environment.

Check guide >

# Run emulators reliably
Bitrise fully integrates with Firebase Test Lab’s Virtual Device Testing solution, which you can enable with one click to run UI tests quickly and reliably. You can check the video, screenshots and logs of your tests right on your build’s page, just as you would on Firebase. We’re constantly improving support for native emulators in our virtual machines, so you can experiment with AVD manager to run x86 emulators.

# Secure file storage
## Secret environment variables
Secrets are stored encrypted and are only exposed during build or when you’d like to reveal them on the UI. Your credentials and API keys for connected services are safe with us.

## Make secrets & files protected
You can set any secret env or file, such as provisioning profile, certificate or keystore as protected. Protected secrets cannot be revealed on the UI and such files cannot be downloaded by anyone from your team.

# Effortless code signing
To sign your Android project, simply upload your release keystore file, add the Sign APK step and you’re done - you can distribute your signed .APK anywhere.

# Distribute your app automatically
## Deploy to testers
If you are looking for an easy way to send your app to testers, you can use Bitrise deploy. This will send a link to specific email addresses so that your testers can install the .APK.

## Send straight to Google Play
You can automatically send your release signed apps to Google Play.

## Deploy to third parties
If you already use another service for deployment, fear not, you can keep using that. From HockeyApp to TestFairy, we’ve got them all.

## Dozens of integrations that work with your Android project
