---
title: Uploading an Android keystore file - draft
redirect_from: []
date: '2019-04-24T06:44:20.000+00:00'
tag: []
summary: ''
published: false

---
You can easily upload your Android keystore file to an app using the Bitrise API. All you need is the relevant endpoint, the keystore credentials, and the app slug.

## Creating and uploading a keystore file

The first step is to create a pre-signed upload URL. This URL is a temporary link which you will use to upload the keystore file to its destination. The required parameters are:

* App slug
* Android keystore file parameters: keystore password, keystore alias, private key password, name of your keystore file, keystore file size

Example `curl` request:

      curl -X POST "https://api.bitrise.io/v0.1/apps/APP-SLUG/android-keystore-files" -H "accept: application/json" -H "Authorization: " -H "Content-Type: application/json" -d "{ "alias": "", "password": "", "private_key_password": "", "upload_file_name": "", "upload_file_size": }"

Example response

    {
      "data": {
        "upload_file_name": "my-release-key.keystore",
        "upload_file_size": 2218,
        "slug": "01D97K0KHPEVW12392BAWV146Z",
        "processed": false,
        "is_expose": true,
        "is_protected": false,
        "upload_url": "https://concrete-userfiles-production.s3.us-west-2.amazonaws.com/project_file_storage_documents/uploads/25091/original/my-release-key.keystore?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAIV2YZWMVCNWNR2HA%2F20190424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20190424T115207Z&X-Amz-Expires=600&X-Amz-SignedHeaders=content-length%3Bhost&X-Amz-Signature=3265f62cf37f9315a7b35ea8a63580e3b11bbc276a8c26f326c6b7426b0f7511",
        "user_env_key": "ANDROID_KEYSTORE",
        "exposed_meta_datastore": {
          "password": "Mypassword1",
          "alias": "key1",
          "private_key_password": "Mypassword1"
        }
      }
    }

As you can see from the example response above, the pre-signed upload is displayed. Using the generated pre-signed upload URL and the keystore file name, upload your file to AWS with a simple `curl` request.

    curl -T' keystore.file 'upload url'

To complete the upload process and display your keystore file on the Code Signing tab, you have to confirm the file upload with the `/apps/{app-slug}/android-keystore-files/{android-keystore-file-slug}/uploaded` endpoint.