---
title: File downloader for code signing - draft
date: 2018-12-03 15:12:09 +0000
redirect_from: []
published: false

---
If the file path of your keystore file is defined in your `build.gradle` file but the keystore file itself is missing from the location where the path points to, you can use one of our file downloading steps to download the keystore file from Bitrise and place it in the defined location.

Bitrise has two Steps which download files from the `Code Signing` tab:

* `File Downloader` Step: If you have uploaded your keystore file to the `ANDROID KEYSTORE FILE` section of the `Code Signing` tab, this is the step you have to use. Once the file is uploaded, an env var gets automatically generated with a URL.

  ![](/img/android-keystore.png)
* `Generic File Downloader` Step: The step will download all the files you uploaded to the  `GENERIC FILE STORAGE` under this `$GENERIC_FILE_STORAGE` env var in the Workflow Editor. For example, if you upload `myconfig.ini` file to the `GENERIC FILE STORAGE`, then the step will download the file and it will be available as `$GENERIC_FILE_STORAGE/myconfig.ini`.

![](/img/keystore-generic.png)

1. Add either the `File Downloader` or the `Generic File Downloader` step to your workflow. The step should be added before the `Gradle Runner` Step.
2. If you use the `File Downloader` Step, fill out the following 2 input fields:
   * `Download source url`: set the generated keystore URL you get when you upload your file to the `ANDROID KEYSTORE FILE` section of the `Code Signing` tab)
   * `Download destination path`: set the location where the keystore file should be placed within your `build.gradle` file. (for example,`file://$HOME/keystores/project_release.keystore`) The path has to be the same as the path defined in your `build.gradle` file.
3. Add the `Gradle Runner` Step right after your file downloading step.

Our `File Downloader` Step will download the keystore file from the `ANDROID KEYSTORE FILE` section `Generic File Storage`.