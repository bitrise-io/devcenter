---
title: Managing files on Bitrise - draft
date: 2018-11-20 12:55:47 +0000
redirect_from: []
published: false

---
Files are everywhere. Bitrise allows you to upload files to use in your builds. You are required to upload files for the purposes of code signing. Builds also produce files as outputs. The good news is that this is all very simple!

### Uploading files to use in your build

If your build requires any files to make it work, upload them to the Generic File Storage. The Generic File Storage accepts any file type, all you need to do is provide a unique ID and upload the file. 

1. Go to the Dashboard.
2. Open the app you want to add files to.
3. Open the Workflow Editor.
4. Click the `Code Signing` tab. 
5. Scroll down to the Generic File Storage and provide a unique ID to your file.
6. Upload the file.

Now you can use this file in a variety of ways in your build - read more in [the detailed guide about the Generic File Storage](/tutorials/how-to-use-the-generic-file-storage/).

### Code signing files

### Output files and build artifacts