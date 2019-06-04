---
title: Managing an Android keystore file with Bitrise API - draft
redirect_from: []
date: 2019-03-26 15:32:35 +0000
published: false

---
You can easily upload your keystore file to your Android project with Bitrise API.

{% include message_box.html type="note" title="Interactive cURL call configurator" content="
You can find an interactive cURL call configurator by clicking on the `Start/Schedule a build` button on your app’s [bitrise.io](https://www.bitrise.io/) page and switching to `Advanced` mode in the popup. At the bottom of the popup you can find a `curl` call, based on the parameters you specify in the popup.

**Note that this call uses the deprecated** `app.bitrise.io` **URL and the app’s build trigger token, as opposed to the personal access token shown in the examples in this guide. All other parameters, however, work the same way.**
"%}

## Creating and uploading a keystore file 

The first step is to create a pre-signed "upload" URL. This URL is a temporary link which you will use to upload the keystore file to its destination.The required parameters are:

* app slug
* Android keystore file parameters:
  * keystore password
  * keystore alias
  * private key password
  * name of your file
  * file size of your keystore

Example `curl` request

      curl -X POST "https://api.bitrise.io/v0.1/apps/APP-SLUG/android-keystore-files" -H "accept: application/json" -H "Authorization: " -H "Content-Type: application/json" -d "{ "alias": "", "password": "", "private_key_password": "", "upload_file_name": "", "upload_file_size": }"

If you fail to provide the correct passwords, you will get a 500 error code.

Example response

    {
      "data": {
        "download_url": "string",
        "exposed_meta_datastore": "string",
        "is_expose": true,
        "is_protected": true,
        "processed": true,
        "slug": "string",
        "upload_file_name": "string",
        "upload_file_size": 0,
        "upload_url": "string",
        "user_env_key": "string"
      }
    }

As you can see from the example response above, the file name, its size, slug and pre-signed upload url are retrieved (along with some attributes that you can modify). **_download url?_**

Using the generated pre-signed upload URL and the keystore file name, upload your file to AWS with a simple `curl` request.

    curl -T' keystore.file 'upload url'

## Confirming the keystore file upload

To complete the uploading process, you have to confirm the upload with another `POST` request:

The required parameters are:

* app slug
* **_generic project file slug_**

Example `curl` request:

    curl -X POST -H 'Authorization: THE-ACCESS-TOKEN'/v0.1/apps/{app-slug}/android-keystore-files/{generic-project-file-slug}/uploaded

Now your keystore file is uploaded in the `ANDROID KEYSTORE FILE` section of the `Code Signing` tab.

## Updating an uploaded keystore file

You can perform minor updates to an uploaded keystore file with the [relevant Bitrise API](https://api-docs.bitrise.io/) using the `PATCH` method. If you've uploaded your file to [Bitrise](https://www.bitrise.io), you can visually check any changes to it on our `Code Signing` tab.

The required parameters are:

* app slug
* keystore file slug

For example, to make a keystore file protected, you can set the `is_protected` flag of your keystore file to `true`.

    curl -X PATCH -H 'Authorization: THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/keystore-file/KEYSTORE-FILE-SLUG -d '{"is_protected":true}'

* **_replacing with another one?_**
* **_changing attributes? expose for pull requests, make it protected, delete, download_**

{% include message_box.html type="warning" title="Careful with those attributes!" content="

In the case of iOS code signing files, you can set the `is_protected`, `is_exposed` and `processed` attributes of the document:

* Once the `is_protected` flag is set to `true,` it cannot be changed anymore.
* When the value of `is_protected` is true, then the `is_expose` flag cannot be set to another value.
* Once the `processed` flag is set to true, then its value cannot be changed anymore.

  Violating these constraints the response will be Bad Request.

  Note that the previous `/apps/{APP-SLUG}/provisioning-profiles/{PROVISIONING-PROFILE-SLUG}/uploaded` endpoint will have the same effect as this one with the request body `processed:true`. "%}

## Deleting a keystore file 

You can delete your uploaded keystore file with using the `DELETE` method.

The required parameters are:

* app slug
* keystore file slug

Example curl request:

    curl -X DELETE 'Authorization: THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/keystore-file'

## Downloading an keystore file

If you’d like to download the actual file from AWS, you can do so with the following `curl` requests:

    curl -X POST -H 'Authorization: THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/keystore-file/KEYSTORE-FILE-SLUG'

The response will contain a pre-signed, expiring AWS URL for the file.