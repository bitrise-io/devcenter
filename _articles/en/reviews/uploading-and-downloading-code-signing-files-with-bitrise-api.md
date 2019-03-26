---
title: Managing code signing files with Bitrise API - draft
redirect_from: []
date: 2019-02-25 14:22:28 +0000
published: false

---
You can upload, update, list, and delete code signing files with the [relevant Bitrise API](https://api-docs.bitrise.io/). In this guide we show you how and in what order to use those code signing endpoints.

ios

## Before you start _(Can be deleted if included in planned API intro)_

All examples in this guide use the `api.bitrise.io` URL. This can only be authorized with a Personal Access Token. Let's see how to generate a new Personal Access Token!

1. Go to your `Account Settings`.
2. Click the `Security` tab on the left.
3. Click `Generate new` at `Personal access token (BETA)`.
4. Add a `Token description` and an `Expiration`.
5. Hit `Save & Continue`.

   ![](/img/new-token-generation.png)

        storing the new tokens
6. Copy the slug of your app from its app URL. For example, [https://www.bitrise.io/app/](https://www.bitrise.io/app/ "https://www.bitrise.io/app/")[{APP-SLUG}#/builds](https://www.bitrise.io/app/%7BAPP-SLUG%7D#/builds.) where the `APP-SLUG` is what you need.

Now that all is at hands, let's see what you can do with our API.

## Creating & uploading a code signing file

You can add a new code signing file to an application of your choice. This is the first step of uploading any code signing files to a storage place.

The required parameters are:

* app slug
* file name

If you call the relevant [Bitrise API endpoint](https://api-docs.bitrise.io/) with the specified parameters, a new code signing file object gets created.

Example `curl` request:

    curl -X POST -H 'Authorization: THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/provisioning-profiles' -d '{"upload_file_name":"sample.provisionprofile","upload_file_size":2047}'

As you can see from the example response below, the file name, its size, slug and pre-signed upload url are retrieved (along with some attributes that you can modify). This pre-signed upload url is a temporary link which you will use to upload the code signing file to its destination.

Example response is:

    {
      "data":{
        "upload_file_name":"sample.provisionprofile",
        "upload_file_size":2047,
        "slug":"01C6FA6P6HRQT5PQ8RMMVVXE6W",
        "processed":false,
        "is_expose":true,
        "is_protected":false,
        "upload_url":"https://concrete-userfiles-production.s3-us-west-2.amazonaws.com/build_certificates/uploads/30067/original/certs.p12?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAIOC7N256G7J2W2TQ%2F20180216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20180216T124240Z&X-Amz-Expires=600&X-Amz-SignedHeaders=content-length%3Bhost&X-Amz-Signature=2bf42176650f00405abfd7b7757635c9be16b43e98013abb7f750d3c658be28e"
      }
    }

Now that you have this temporary pre-signed `upload_url` at hand, you can upload the code signing file to AWS.

Example `curl` request:

    curl -T sample.provisionprofile 'https://concrete-userfiles-production.s3-us-west-2.amazonaws.com/build_certificates/uploads/30067/original/certs.p12?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAIOC7N256G7J2W2TQ%2F20180216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20180216T124240Z&X-Amz-Expires=600&X-Amz-SignedHeaders=content-length%3Bhost&X-Amz-Signature=2bf42176650f00405abfd7b7757635c9be16b43e98013abb7f750d3c658be28e'

{% include message_box.html type="note" title="Interactive cURL call configurator" content=" You can find an interactive cURL call configurator by clicking on the `Start/Schedule a build` button on your app’s [bitrise.io](https://www.bitrise.io/) page and switching to `Advanced` mode in the popup. At the bottom of the popup you can find a `curl` call, based on the parameters you specify in the popup.

**Note that this call uses the deprecated** `app.bitrise.io` **URL and the app’s build trigger token, as opposed to the personal access token shown in the examples in this guide. All other parameters, however, work the same way.**"%}

Continue with confirming the file upload.

## Confirming the file upload

Now that you have your file uploaded, you need to confirm that your upload is indeed completed.

The required parameters are:

* app slug
* file slug (generated above)

Set the value of the `processed` flag to `true` in a `curl` request to confirm the completeness of the process:

    curl -X POST -H 'Authorization: THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/provisioning-profiles/PROVISIONING-PROFILE-SLUG/uploaded'

Now that you have confirmed the upload, you can do a bunch of other cool stuff with the files. Continue reading!

## Updating an uploaded code signing file

You can perform minor updates to an uploaded code signing file with the [relevant Bitrise API](https://api-docs.bitrise.io/) using the `PATCH` method. If you've uploaded your file to [Bitrise](https://www.bitrise.io), you can visually check any changes to it on our `Code Signing` tab.

The required parameters are:

* app slug
* file slug

For example, to make a **provisioning profile** protected, you can set the `is_protected` flag of your provisioning profiles to `true`.

    curl -X PATCH -H 'Authorization: THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/provisioning-profiles/PROVISIONING-PROFILE-SLUG -d '{"is_protected":true}'

For a **build certificate** you can set the same attributes as above but you can modify the password too:

    curl -X PATCH -H 'Authorization: THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/build-certificates/BUILD-CERTIFICATE-SLUG -d '{"certificate_password":"s0m3-v3ry-s3cr3t-str1ng"}'

{% include message_box.html type="warning" title="Careful with those attributes!" content="

In the case of code signing files you can set the `is_protected`, `is_exposed` and `processed` attributes of the document:

* Once the `is_protected` flag is set to `true,` it cannot be changed anymore.
* When the value of `is_protected` is true, then the `is_expose` flag cannot be set to another value.
* Once the `processed` flag is set to true, then its value cannot be changed anymore.

  Violating these constraints the response will be Bad Request.

  Note that the previous `/apps/{APP-SLUG}/provisioning-profiles/{PROVISIONING-PROFILE-SLUG}/uploaded` endpoint will have the same effect as this one with the request body `processed:true`. "%}

## Getting a specific code signing file's data

You might want to retrieve a specific code signing file's data to have a quick look at it. You can easily do so with the [relevant Bitrise API](https://api-docs.bitrise.io/) using the `GET` method.

The required parameters are:

* app slug
* file slug

Example curl request:

     curl -X GET -H  'Authorization: THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/provisioning-profiles/PROVISIONING-PROFILE-SLUG'

Example response

    {
    "data": {
    "upload_file_name":"sample.provisionprofile",
    "upload_file_size":2047,
    "slug":"01C6FA6P6HRQT5PQ8RMMVVXE6W",
    "processed":false,
    "is_expose":true,
    "is_protected":false,
    "download_url":"https://concrete-userfiles-production.s3-us-west-2.amazonaws.com/prov_profile_documents/uploads/80144/original/sample.provisionprofile?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAIOC7N256G7J2W2TQ%2F20180322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20180322T091652Z&X-Amz-Expires=600&X-Amz-SignedHeaders=host&X-Amz-Signature=6dd7bb3db72aafb2d434da7b1a8f80a82a3a7a0276e84620137ed64de5025ab2"
    }
    }

{% include message_box.html type="note" title="Availability of the `download_url`" content=" Note that the `download_url` is generated only when the provisioning profile's `is_protected` attribute is false.
"%}

## Listing the uploaded files of an app

Wondering how many code signing files belong to an app? Get a list of them with the [relevant Bitrise API](https://api-docs.bitrise.io/) using the `GET` method.

The required parameter is:

* app slug

Optional parameters are:

* next: slug of the first file in the response (as a string)
* limit: max number of elements per page (as an integer) where the default is 50.

Example curl request for provisioning profiles:

    curl -X GET -H 'Authorization: THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/provisioning-profiles'

Example response:

    {
      "data": [
        {
          "upload_file_name":"sample.provisionprofile",
          "upload_file_size":2047,
          "slug":"01C6FA6P6HRQT5PQ8RMMVVXE6W",
          "processed":false,
          "is_expose":true,
          "is_protected":false
        },
        {
          "upload_file_name":"sample2.provisionprofile",
          "upload_file_size":2047,
          "slug":"01C6FA6P6HRQT5PQ8RMMVVXE5T",
          "processed":true,
          "is_expose":true,
          "is_protected":true
        }
      ],
      "paging": {
        "page_item_limit": 50,
        "total_item_count": 2
      }
    }

As you can see the example response shows the list of provisioning profiles of a specific app along with their defined attributes. You can also see that the max number of file limit is 50.

## Deleting provisioning profiles/build certificates

You can delete your uploaded code signing file with the [relevant Bitrise API ](https://api-docs.bitrise.io/)using the `DELETE` method.

The required parameters are:

* app slug
* file slug

Example curl request:

    curl -X DELETE 'Authorization: THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/provisioning-profiles'

## Downloading provisioning profiles/build certificates

If you’d like to download the actual file from a storage place (in our example it is AWS), you can do so with the following `curl` requests:

    curl -X POST -H 'Authorization: THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/provisioning-profiles/PROVISIONING-PROFILE-SLUG'

The response will contain a pre-signed, expiring AWS URL for the file.