---
title: File downloader for code signing - draft
date: 2018-12-03 15:12:09 +0000
redirect_from: []
published: false

---

If your keystore path is defined in your `build.gradle` file but keystore file is missing from from the location where the path points to, you can use one of our file downloader steps to download the keystore file and place it in the right location.

There are two Steps which download files from the `Code Signing` tab.

* File Downloader: If you have uploaded your keystore file to the `ANDROID KEYSTORE FILE` section of the `Code Signing` tab, this is the step you have to use. An env var gets automatically generated with a URL to the file and the file will be available by this URL.
* Generic File Downloader: The step will download all the files you uploaded to the  `GENERIC FILE STORAGE` section of the Workflow Editor (under `$GENERIC_FILE_STORAGE`). For example, if you upload `myconfig.ini` file to the `GENERIC FILE STORAGE`, then the step will download the file and it will be available as `$GENERIC_FILE_STORAGE/myconfig.ini`.

1. Add either the `File Downloader` or the `Generic File Downloader` step to your workflow. The step should be added before the `Gradle Runner` Step.

2. If you use the `File Downloader` Step, fill out the following 2 input fields:

	* `Download source url`: set the generated keystore URL you get when you upload your file to the `ANDROID KEYSTORE FILE` section of the `Code Signing` tab)
	* `Download destination path`: set the location where the keystore file should be placed within your `build.gradle` file. (for example,`file://$HOME/keystores/project_release.keystore`) The path has to be the same as the path defined in your `build.gradle` file.

3. Add the `Gradle Runner` Step right after your file downloading step.

Our `File Downloader` Step will download the keystore file from the `ANDROID KEYSTORE FILE` section `Generic File Storage`.