---
title: test
redirect_from: []
published: false

---
1. Fill out the required input fields as follows:
   * `Service Account JSON key file path`: This field can accept a remote URL so you have to provide the environment variable which contains your uploaded service account JSON key. For example: `$BITRISEIO_SERVICE_ACCOUNT_JSON_KEY_URL`
   * `Package name`: the package name of your Android app
   * `Track`: the track where you want to deploy your APK (for example, alpha/beta/rollout/production or any custom track you set)

And that’s it! Start a build.

{% include message_box.html type="done" title="My message" content=" If your build has run successfully, you should see your app on Testflight. From there, you can distribute it to external testers or release it to the App Store. "%} 