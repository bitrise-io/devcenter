---
title: Android code signing in Gradle
menu:
  android-code-signing:
    weight: 4

---
## Configuring manually in Gradle

You can manually specify the code signing configuration in your Gradle configuration so that your app gets signed during the build process.

1. Open your module-level `build.gradle` file.
2. Add the `signingConfigs` codeblock to your code and define the following entries specific to your project:
   `storeFile`, `storePassword`, `keyAlias`, and `keyPassword`.

**Example signing configuration**:

    android { 
       signingConfigs { 
       	   release { 
           	 keyAlias 'MyAndroidKey' 
             keyPassword '***' 
             storeFile file("/path/to/my/keystore.jks") 
             storePassword '***' 
           } 
       } ...

For more information, check out how to [Configure Gradle to sign your app](https://developer.android.com/studio/publish/app-signing).

## About environment variables

You can avoid having the same keystore path locally and on [bitrise.io](https://www.bitrise.io) by using configuration values and environment variables in the keystore path (`storeFile`) and in the keystore password.

If your keystore path is `$HOME/keystores/my_keystore.jks`, then your `build.gradle` file looks like this:

    android { 
       signingConfigs { 
       	   release { 
           	 keyAlias 'MyAndroidKey' 
             keyPassword '***' 
             storeFile file(System.getenv("HOME") + "/keystores/my_keystore.jks")
             storePassword '***' 
           } 
       } ...

You can use the `System.getenv("ENV_KEY")` file to access environment variables in the Gradle config file.

If you use env vars as `keyPassword` and `storePassword` in the `Code signing` tab, your `build.gradle` will look like this:

    android {
       signingConfigs {
           release {
             keyAlias System.getenv("BITRISEIO_ANDROID_KEYSTORE_ALIAS")
             keyPassword System.getenv("BITRISEIO_ANDROID_KEYSTORE_PRIVATE_KEY_PASSWORD")
             storeFile file(System.getenv("HOME") + "/keystores/my_keystore.jks")
             storePassword System.getenv("BITRISEIO_ANDROID_KEYSTORE_PASSWORD")
           }
       }
        ...

You get these environment variables when you upload your keystore to the `GENERIC FILE STORAGE` field of the `Code Signing` tab in your Workflow Editor.

{% include message_box.html type="important" title="Define the used env vars" content=" Do not forget to define the used environment variables on [bitrise.io](https://www.bitrise.io) as well.

When you upload a keystore file in the `Android keystore file` section and you have all the fields filled out, Bitrise will export these environment variables automatically.

* `BITRISEIO_ANDROID_KEYSTORE_ALIAS`
* `BITRISEIO_ANDROID_KEYSTORE_PASSWORD`
* `BITRISEIO_ANDROID_KEYSTORE_PRIVATE_KEY_PASSWORD`
* `BITRISEIO_ANDROID_KEYSTORE_URL`

"%}