---
title: Managing files in Generic File Storage
redirect_from: []
date: '2019-04-09T07:32:06.000+00:00'
tag:
- files
- api
summary: You can upload, delete, update, and list any project files in the GENERIC
  FILE STORAGE section of the Code Signing tab with the relevant Bitrise API endpoint.
  Should you need more information on how to store your project files, check out Using
  the Generic File Storage.
menu:
  api-main:
    weight: 17

---
You can upload, delete, update, and list any project files in the `GENERIC FILE STORAGE` section of the `Code Signing` tab with the [relevant Bitrise API endpoint](https://api-docs.bitrise.io/). Should you need more information on how to store your project files, check out [Using the Generic File Storage](/tutorials/how-to-use-the-generic-file-storage/).

Here is a summary of all the endpoints and their functions related to generic project files:

| Endpoints | Function |
| --- | --- |
| [POST/apps/{app-slug}/generic-project-files](https://api-docs.bitrise.io/#/generic-project-file/generic-project-files-create) | Create a generic project file |
| [POST/apps/{app-slug}/generic-project-files/{generic-project-file-slug}/uploaded](https://api-docs.bitrise.io/#/generic-project-file/generic-project-file-confirm) | Confirm the upload process |
| [PATCH/apps/{app-slug}/generic-project-files/{generic-project-file-slug}](https://api-docs.bitrise.io/#/generic-project-file/generic-project-file-update) | Update an uploaded project file |
| [GET/apps/{app-slug}/generic-project-files](https://api-docs.bitrise.io/#/generic-project-file/generic-project-file-list) | Get a list of the uploaded project files |
| [GET/apps/{app-slug}/generic-project-files/{generic-project-file-slug}](https://api-docs.bitrise.io/#/generic-project-file/generic-project-file-show) | Retrieve data of a specific project file |
| [DELETE/apps/{app-slug}/generic-project-files/{generic-project-file-slug}](https://api-docs.bitrise.io/#/generic-project-file/generic-project-file-delete) | Delete an uploaded project file |

## Creating and uploading files to Generic File Storage

You can add new files to an application and store it in the `GENERIC FILE STORAGE` section of the `Code Signing` tab. When calling the relevant API endpoint, a new temporary pre-signed upload URL is created which you will use to upload the file to the `GENERIC FILE STORAGE`. (Please note that this pre-signed URL is time-limited and expires after 10 minutes.)

The required parameters are:

* app slug
* generic project file's metadata: upload file name, upload file size and the user env key (you can add any name to the user env key)

Example `curl` request:

    curl -X POST "https://api.bitrise.io/v0.1/apps/583806e34b4ff0ff/generic-project-files" -H "accept: application/json" -H "Authorization: 0FgS4dsnxG9sYWp3xh9aLkbUz7BC01ZYJRj3RuhDWssadW7NuqbMhobvIWzk76dxrj6md4AXK16pfwj-i6A-uA" -H "Content-Type: application/json" -d "{ \"upload_file_name\": \"Test-File\", \"upload_file_size\": 4865, \"user_env_key\": \"Test-File\"}"

As you can see from the example response below, the file name, file size, file slug and pre-signed upload url are retrieved (along with some attributes that you can modify later). This pre-signed upload url is a temporary link which you will use to upload the file to its destination. Please note that you will need the file slug and the upload url later on so keep these handy.

Example response is:

    {
      "data": {
        "upload_file_name": "Test-File",
        "upload_file_size": 4865,
        "slug": "01D7F228E7N8Q8WQJKJM8FV3XM",
        "processed": false,
        "is_expose": true,
        "is_protected": false,
        "upload_url": "https://concrete-userfiles-production.s3.us-west-2.amazonaws.com/project_file_storage_documents/uploads/24043/original/Test-File?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAIV2YZWMVCNWNR2HA%2F20190402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20190402T125827Z&X-Amz-Expires=600&X-Amz-SignedHeaders=content-length%3Bhost&X-Amz-Signature=e1557901d5a07b1b3578d9ffdf84a9b0188b742bfff9c8175a3e87f12c7e2c4e",
        "user_env_key": "Test-File",
        "exposed_meta_datastore": null
      }
    }

Now that you have successfully generated the `upload_url`, you can upload your file to AWS with below `curl` request.

Example `curl` request:

    curl -T Test-File.md "https://concrete-userfiles-production.s3.us-west-2.amazonaws.com/project_file_storage_documents/uploads/24043/original/Test-File?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAIV2YZWMVCNWNR2HA%2F20190402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20190402T125827Z&X-Amz-Expires=600&X-Amz-SignedHeaders=content-length%3Bhost&X-Amz-Signature=e1557901d5a07b1b3578d9ffdf84a9b0188b742bfff9c8175a3e87f12c7e2c4e"

Continue with confirming the file upload.

## Confirming the file upload

Now that you have your file uploaded to AWS, you need to confirm that your upload is indeed completed.

The required parameters are:

* app slug
* generic project file slug (generated above)

Set the value of the `processed` flag to `true` in a `curl` request to confirm the completeness of the process:

    curl -X POST -H 'Authorization: THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/generic-project-files/GENERIC-PROJECT-FILES-SLUG/uploaded'

Example response:

    {
      "data": {
        "upload_file_name": "Test-File",
        "upload_file_size": 4865,
        "slug": "01D7F228E7N8Q8WQJKJM8FV3XM",
        "processed": true,
        "is_expose": true,
        "is_protected": false,
        "user_env_key": "Test-File",
        "exposed_meta_datastore": null
      }
    }

As you can see the `processed` flag is set to `true` which means your file is now available in `GENERIC FILE STORAGE` on Bitrise.

Now that you have confirmed the upload, you can do a bunch of other cool stuff with the files. Continue reading!

## Updating an uploaded file

You can perform minor updates to an uploaded file with the [relevant Bitrise API endpoint](https://api-docs.bitrise.io/) using the `PATCH` method. If you've uploaded your file to [Bitrise](https://www.bitrise.io), you can visually check any changes to it on our `GENERIC FILE STORAGE` section of the `Code Signing` tab.

The required parameters are:

* app slug
* generic project file slug
* generic project file attributes you wish to modify

For example, to make the uploaded file protected, you can set the `is_protected` flag of your file to `true`.

    curl -X PATCH -H 'Authorization: THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/generic-project-file/GENERIC-PROJECT-FILE-SLUG -d '{"is_protected":true}'

{% include message_box.html type="important" title="Careful with those attributes!" content=" You can set the `is_protected`, `is_exposed` and `processed` attributes of the file you've uploaded:

* Once the `is_protected` flag is set to `true,` it cannot be changed anymore.
* When the value of `is_protected` is true, then the `is_expose` flag cannot be set to another value.
* Once the `processed` flag is set to true, then its value cannot be changed anymore.

  Violating these constraints the response will be Bad Request.

  Note that the previous `/apps/{APP-SLUG}/provisioning-profiles/{PROVISIONING-PROFILE-SLUG}/uploaded` endpoint will have the same effect as this one with the request body `processed:true`. "%}

## Retrieving a specific file's data

You might want to retrieve a specific project file's data to have a quick look at the details. You can easily do so with the [relevant Bitrise API](https://api-docs.bitrise.io/) using the `GET` method.

The required parameters are:

* app slug
* generic project file slug

Example curl request:

     curl -X GET -H  'Authorization: THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/generic-project-files/GENERIC-PROJECT-FILE-SLUG'

Example response:

    {
      "data": {
        "upload_file_name": "Test-File",
        "upload_file_size": 4865,
        "slug": "01D7F228E7N8Q8WQJKJM8FV3XM",
        "processed": true,
        "is_expose": true,
        "is_protected": false,
        "download_url": "https://concrete-userfiles-production.s3.us-west-2.amazonaws.com/project_file_storage_documents/uploads/24043/original/Test-File?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAIV2YZWMVCNWNR2HA%2F20190402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20190402T132712Z&X-Amz-Expires=600&X-Amz-SignedHeaders=host&X-Amz-Signature=241be52184b63867262360743931c546c166a99719787ce417e3be11bc12bbed",
        "user_env_key": "Test-File",
        "exposed_meta_datastore": null
      }
    }

{% include message_box.html type="note" title="Availability of the `download_url`" content=" Note that the `download_url` is generated only when the file's `is_protected` attribute is false. "%}

## Listing the uploaded files of an app

Wondering how many files belong to an app? Get a list of them with the [relevant Bitrise API](https://api-docs.bitrise.io/) using the `GET` method. Please note that the **maximum number of files is 50**.

The required parameter is:

* app slug

Optional parameters are:

* next: slug of the first file in the response (as a string)
* limit: max number of elements per page (as an integer)

Example `curl` request:

    curl -X GET -H 'Authorization: THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/generic-project-files'

Example response:

    {
      "data": [
        {
          "upload_file_name": "realmtasks.jks",
          "upload_file_size": 2068,
          "slug": "a37f6a0ff582f4ea",
          "processed": true,
          "is_expose": true,
          "is_protected": false,
          "user_env_key": "ANDROID_KEYSTORE",
          "exposed_meta_datastore": null
        },
        {
          "upload_file_name": "Test-File",
          "upload_file_size": 4865,
          "slug": "01D7F228E7N8Q8WQJKJM8FV3XM",
          "processed": true,
          "is_expose": true,
          "is_protected": false,
          "user_env_key": "Test-File",
          "exposed_meta_datastore": null
        }
      ],
      "paging": {
        "total_item_count": 2,
        "page_item_limit": 50
      }
    }

As you can see, the example response shows the list of files specific to an app. Files uploaded to the `ANDROID KEYSTORE SECTION` and to the `GENERIC FILE STORAGE` are both shown. This is due to that the fact that Android keystore files are specific generic project files but represented in a separate UI field from generic project files.

## Deleting a file

You can delete your uploaded file with the [relevant Bitrise API ](https://api-docs.bitrise.io/)using the `DELETE` method from `GENERIC PROJECT STORAGE`.

The required parameters are:

* app slug
* generic project file slug

Example curl request:

    curl -X DELETE 'Authorization: THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/generic-project-files'

## Downloading a file

If you’d like to download the actual file from AWS, you can do so with the following `curl` request:

    curl -X POST -H 'Authorization: THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/generic-project-files/GENERIC-PROJECT-FILE-SLUG'

The response will contain a pre-signed AWS URL for the file. Please note that this URL is time-limited and expires after 10 minutes.