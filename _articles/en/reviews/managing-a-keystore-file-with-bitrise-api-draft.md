---
title: Managing a keystore file with Bitrise API - draft
redirect_from: []
date: 2019-03-26 15:32:35 +0000
published: false

---
You can easily upload your keystore file to your Android project with Bitrise API.

The required parameters are:

* app slug
* Android keystore file parameters: keystore password, keystore alias, private key password and the name of your file and its file size.

Example `curl` request

      curl -X POST "https://api.bitrise.io/v0.1/apps/APP-SLUG/android-keystore-files" -H "accept: application/json" -H "Authorization: " -H "Content-Type: application/json" -d "{ "alias": "", "password": "", "private_key_password": "", "upload_file_name": "", "upload_file_size": }"

If you fail to provide the passwords, you will get a 500 error code.