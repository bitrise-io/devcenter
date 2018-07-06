
## Configure manually in Gradle

You can manually specify the code signing configuration in your Gradle configuration so that your app gets signed during the build process.

1. Open your module-level `build.gradle` file.

2. Add the `signingConfigs` codeblock to your code and define the following entries specific to your project:
`storeFile`, `storePassword`, `keyAlias`, and `keyPassword`


    An example of the signing configuration in `build.gradle`:

     ``` Groovy
     android {
         signingConfigs {
             release {
                 keyAlias 'MyAndroidKey'
                 keyPassword '***'
                 storeFile file("/path/to/my/keystore.jks")
                 storePassword '***'
             }
         }
     ...
     ```

## About environment variables

You can avoid having the same keystore path locally and on [bitrise.io](https://www.bitrise.io) by using configuration values and environment variables in the keystore path (`storeFile`) and in the keystore password.

As an example, if your keystore path is `$HOME/keystores/my_keystore.jks`, then your `build.gradle` file looks like this:

```
android {
   signingConfigs {
       release {
           keyAlias 'MyAndroidKey'
           keyPassword '***'
           storeFile file(System.getenv("HOME") + "/keystores/my_keystore.jks")
           storePassword '***'
       }
   }
...
```

!!! tip

     You can use the `System.getenv("ENV_KEY")` file to access environment variables in the Gradle config file.

An example of your `build.gradle` when using environment variables as `keyPassword` and `storePassword` in the `Code signing` of the Workflow Editor. (You get these environment variables when you upload your keystore to the `GENERIC FILE STORAGE` field of the `Code Signing` tab in your Workflow Editor.):

```
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
```
**Do not forget to define the used environment variables on [bitrise.io](https://www.bitrise.io) as well.**

When you upload a keystore file in the `Android keystore file` section and you have all the fields filled out, Bitrise will export these environment variables automatically:

  - `BITRISEIO_ANDROID_KEYSTORE_ALIAS`
  - `BITRISEIO_ANDROID_KEYSTORE_PASSWORD`
  - `BITRISEIO_ANDROID_KEYSTORE_PRIVATE_KEY_PASSWORD`
  - `BITRISEIO_ANDROID_KEYSTORE_URL`
