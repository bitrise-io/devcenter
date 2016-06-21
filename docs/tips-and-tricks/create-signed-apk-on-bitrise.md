# Create signed apk on bitrise.io

__In general there is two options to create a signed apk with bitrise:__

1. The first option is __specify code sign configuration in your project__
2. The other one is: let [sign-apk step](https://github.com/bitrise-steplib/steps-sign-apk) to sign/resign your unsigned/debug signed apk

## 1. Specify code sign configuration in your project

__In case of android project you can specify signing configs with Android Studio__:

---

- in project navigator select your project and __Open Module Settings__
- from __Modules__ select your module to sign  
- on __Signing__ tab fill the signing informations

Signing config presents in you app's *build.gradle* file and looks something like this:

```
android {
    signingConfigs {
        config {
            keyAlias 'MyAndroidKey'
            keyPassword '***'
            storeFile file("/path/to/my/keystore.jks")
            storePassword '***'
        }
    }
...
```

__In case of xamarin android project with Xamarin Studio__:

---

- double click on your android project to open the __Project Options__
- select __Android Package Signing__ in __Build__ group
- select the __Configuration - Platform__ you want to use to creating signed apk and check the __Sign the .APK file using the following keystore details.__
- fill signing information

### How to use the same keystore path locally and on bitrise?

__In case of android project :__ 

---

You can elliminate this problem by using __environment variable__ in keystore path (`storeFile`). Let say your keystore path is: `$HOME/keystores/my_keystore.jks`, then your build.gradle file looks like:

```
android {
    signingConfigs {
        config {
            keyAlias 'MyAndroidKey'
            keyPassword '***'
            storeFile file(System.getenv("HOME") + "/keystores/my_keystore.jks")
            storePassword '***'
        }
    }
...
```

> You can use System.getenv("ENV_KEY") to access environment variables from a gradle file.

__Working with Xamarin Studio :__ 

---

You __can NOT use environment variable__ in keystore path, the path has to be relative to the android project's folder or absolute path. To use the same path on your local machine and bitrise, you should put the keystore in the root directory, something like: `/keystores/my_keystore.jks`

### Upload your keytsore to bitrise:

- Go to __Workflow__ tab
- Click the __MANAGE WORKFLOWS__ button
- On the left side of Workflow editor, select __Code signing & Files__
- Scroll down to __Generic File Storage__ section and click on __+ Add another File__
- __Select file type__: Android Keystore
- Upload your file and fill the required datas

Bitrise will upload your file and assign an environment variable (`BITRISEIO_ANDROID_KEYSTORE_URL`) to the file's download url. A time limited, read only download URL will be set as the value of this Environment Variable for every build. You can use this URL to download the file during a build.

### Download your keystore from Generic File Storage:

The easiest way to download your keystore (*or any file you uploaded to generic file storage*) is to use a [script-step](https://github.com/bitrise-io/steps-script):

```
...
- script:
    inputs:
    - content: |
        #!/bin/bash
        set -ex

        # specify local download path (pure android)
        file_local_path=$HOME/keystores/my_keystore.jks
        # xamarin android:
        #file_local_path=/keystores/my_keystore.jks

        # download the file
        wget -O "$file_local_path" "$BITRISEIO_ANDROID_KEYSTORE_URL"
        echo "file downloaded to: $file_local_path"

        # OPTIONALLY: export the file's local path, to be able to use it in subsequent steps as an input value
        envman add --key BITRISEIO_ANDROID_KEYSTORE_PTH --value "$file_local_path"
...
```

After this step `my_keystore.jks` is available in `$HOME/keystores/` or in `/keystores` directory.


## 2. Let sign-apk step to sign/resign your unsigned/debug signed apk

In this version you __do not have to set code sign in your project__.  

During the archive no sign/only debug sign will be done.  
After archive step you can use __sign-android step__ to resign your apk.  

To use this step, you have to upload your keystore to bitrise (see: *Upload your keytsore to bitrise*), but you do not have to download it (__sign-apk step works with remote file path too__)

When you upload your keystore to bitrise's Generic File Storage, it will export:

- the Download URL in `BITRISEIO_ANDROID_KEYSTORE_URL`
- the Keystore password in `BITRISEIO_ANDROID_KEYSTORE_PASSWORD`
- the Keystore alias in `BITRISEIO_ANDROID_KEYSTORE_ALIAS`
- the Private key password in `BITRISEIO_ANDROID_KEYSTORE_PRIVATE_KEY_PASSWORD`

Fortunately these environment variables are the default input values to __sign-apk step__, so you just have to add the step and no configuration required (*in most common cases*).  
If you wan to configure the sign command, take a look on `jarsigner_options` input.
