---
title: 'Managing files on Bitrise '
date: 2018-12-03 10:05:49 +0000
redirect_from: []
menu:
  getting-started:
    weight: 9
    title: Managing files on Bitrise

---
Managing files on Bitrise allows you to upload files to use in your builds. You are required to upload files for the purposes of code signing. Builds also produce files as outputs. The good news is that this is all very simple!

### Uploading files to use in your build

If your build requires any files to make it work, upload them to the Generic File Storage. The Generic File Storage accepts any file type, all you need to do is provide a unique ID and upload the file. There are two restrictions:

* the file cannot be bigger than 5 MB
* you can only store a total of 5 different files at the same time. If you want to upload more, you need to delete one of the files in the storage.

1. Go to the Dashboard.
2. Open the app you want to add files to.
3. Open the Workflow Editor.
4. Click the `Code Signing` tab.

   ![](/img/code-signing-tab.png)
5. Scroll down to the Generic File Storage and provide a unique ID to your file.

   The unique ID will be part of the generated download URL that Bitrise stores as an Environment Variable.
6. Upload the file by clicking **Upload file**.

   Remember that the file size cannot exceed 5 MB.

Now you can use this file in a variety of ways in your build - read more in [the detailed guide about the Generic File Storage](/tutorials/how-to-use-the-generic-file-storage/).

Once a file is uploaded, it can also be:

* downloaded by anyone who has Admin or Owner role on the app's team on Bitrise, unless [it is protected](/protecting-your-code-signing-files/)
* exposed to Pull Request builds

### Code signing files

Bitrise can do your code signing for you but we need some files to make it happen.

For Android apps, upload code signing files to the [Generic File Storage]().

For iOS files, you need to use the dedicated menu options for provisioning profiles and code signing identities.

* [Android code signing](/code-signing/android-code-signing/android-code-signing-procedures/)
* [iOS code signing](/code-signing/ios-code-signing/code-signing/)

{% include message_box.html type="info" title="Password protection for iOS code signing files" content="You can set a password in Xcode to store your code signing certificates securely. This password can be viewed on Bitrise: click on the eye icon next to the certificate file, in the **Password** field."%}

### Output files

Builds can generate and export files: for example, you can export a binary package file of your app with a Bitrise build. You can easily find these files:

1. Open the build that you ran.
2. Go to the Apps & Artifacts tab.
3. View and download the generated files.

You can read more about [build artifacts](/builds/build-artifacts-online/) in our detailed guide!