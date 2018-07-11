
## Create a signed APK with the `Sign APK` step

You can create a signed APK using the `Sign APK step` in our Bitrise workflow.

Bitrise Project Scanner provides a `deploy workflow` which contains the `Sign APK step`. With this step, you can digitally sign your APK as part of your workflow. This step is configured to run if you have already uploaded your keystore file to Bitrise. All you have to do is upload your keystore file in the `Code signing` tab of the Workflow Editor.

In this section, we walk you through the code signing steps using our `android-multiple-test-results-sample` demo app.

1. Log into [bitrise.io](https://www.bitrise.io/) and click on your app.

2. On your Bitrise `Dashboard`, click on `Workflow`.

3. Click on `Code signing`.

4. Click or drag-and-drop your keystore file on the `Upload file` field of the `ANDROID KEYSTORE FILE` section.

    ![Screenshot](/img/android-code-signing/upload-file.png)

5. Fill out the displayed three input fields: `keystore password`, `keystore alias` and `private key password`.

    ![Screenshot](/img/android-code-signing/three-fields.png)

6. Click on `Save metadata`.

    !!! success
        The `Sign APK` step will receive your uploaded files.

Bitrise uploads your keystore file and assigns an environment variable (`BITRISEIO_ANDROID_KEYSTORE_URL`) to the download URL (which is a time-limited, read-only download URL) of the file as the value. You can use this URL to download the keystore file during a build in the future. The `Sign APK` step in the workflow will track this environment variable and will run if it is set.

## Download your files

You can download your files from `GENERIC FILE STORAGE`(for example, your keystore file) using the `File-downloader` step:

!!! example
    In this example, we're downloading a keystore file.

    ``` yaml
    ... 
    - file-downloader:
       inputs:
       - source: $BITRISEIO_ANDROID_KEYSTORE_URL
       - destination: "$HOME/keystores/my_keystore.jks" #native android#               
    ...

    ```


After this step, `my_keystore.jks` will be available at `$HOME/keystores/my_keystore.jks`.

## Run your deploy workflow

You can run a workflow *manually*.

1. Open your app's `Builds` page.

2. Click on `Start/Schedule a Build`.

3. In the popup window, select `deploy` in the Workflow dropdown list.

4. Click `Start Build`.

You can also run it through a *GIT event* if you set the trigger map for the workflow.

1. Click on the `Triggers` tab.

2. Set up your event (push/tag/pull) and select `deploy` workflow.

3. Click on `Done` and then `Save`.

The next change in your repository that matches any of your trigger map event will start your `deploy` workflow.
