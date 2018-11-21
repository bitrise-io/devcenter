---
title: Managing files on Bitrise - draft
date: 2018-11-20 12:55:47 +0000
redirect_from: []
published: false

---
Managing files on Bitrise Bitrise allows you to upload files to use in your builds. You are required to upload files for the purposes of code signing. Builds also produce files as outputs. The good news is that this is all very simple!

### Uploading files to use in your build

If your build requires any files to make it work, upload them to the Generic File Storage. The Generic File Storage accepts any file type, all you need to do is provide a unique ID and upload the file. The only restriction is that the file cannot be bigger than 5 MB.

1. Go to the Dashboard.
2. Open the app you want to add files to.
3. Open the Workflow Editor.
4. Click the `Code Signing` tab. 
5. Scroll down to the Generic File Storage and provide a unique ID to your file.

   The unique ID will be part of the generated download URL that Bitrise stores as an Environment Variable. 
6. Upload the file by clicking **Upload file**. 

   Remember that the file size cannot exceed 5 MB.

Now you can use this file in a variety of ways in your build - read more in [the detailed guide about the Generic File Storage](/tutorials/how-to-use-the-generic-file-storage/).

### Code signing files

Bitrise can do your code signing for you but we need some files to make it happen. You can upload Android code signing files to the Generic File Storage but for iOS files, you need to use the dedicated menu options for provisioning profiles and code signing identities. 

### Output files and build artifacts