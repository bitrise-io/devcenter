---
title: Managing an Android keystore file with Bitrise API - draft
redirect_from: []
date: 2019-03-26 15:32:35 +0000
published: false

---
You can easily upload your keystore file to your Android project with Bitrise API.

## Creating pre-signed URL for uploading an Android keystore file

The first step is to create a pre-assigned "upload" URL on which you will upload your keystore file.

The required parameters are:

* app slug
* Android keystore file parameters:
  * keystore password
  * keystore alias
  * private key password
  * name of your file
  * file size of your keystore

Example `curl` request > presigned url

      curl -X POST "https://api.bitrise.io/v0.1/apps/APP-SLUG/android-keystore-files" -H "accept: application/json" -H "Authorization: " -H "Content-Type: application/json" -d "{ "alias": "", "password": "", "private_key_password": "", "upload_file_name": "", "upload_file_size": }"

If you fail to provide the passwords, you will get a 500 error code.

Upload your keystore file to the pre-assigned upload URL.

    curl -T'

## Confirming the Android keystore file upload

To finish the uploading process, you have to confirm the upload with another `POST` request:

The required parameters are:

* app slug
* generic project file slug

Example `curl` request:

    curl -X POST -H 'Authorization: THE-ACCESS-TOKEN'/v0.1/apps/{app-slug}/android-keystore-files/{generic-project-file-slug}/uploaded

Now your keystore file is uploaded in the `ANDROID KEYSTORE FILE` section of the `Code Signing` tab.