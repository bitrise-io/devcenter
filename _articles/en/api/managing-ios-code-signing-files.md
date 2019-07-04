---
title: Managing iOS code signing files
redirect_from: []
date: '2019-04-08T14:11:49.000+00:00'
tag:
- code-signing
- ios
- api
- files
summary: 'You can upload, update, list, and delete iOS code signing files with the
  relevant Bitrise API. In this guide we show you how and in what order to use those
  code signing endpoints. '
menu:
  api-main:
    weight: 13

---
{% include message_box.html type="note" title="iOS code signing with the Bitrise API" content=" This guide describes how to manage your iOS code signing files with the Bitrise API. If you'd like to learn more about how to do the same on the UI, please check out [iOS code signing on Bitrise](/code-signing/ios-code-signing/code-signing/). "%} 

You can upload, update, list, and delete iOS code signing files with the [relevant Bitrise API](https://api-docs.bitrise.io/). In this guide we show you how and in what order to use those code signing endpoints. First, here is a summary of all our iOS code signing endpoints and their functions.

Provisioning profiles

| Endpoints | Function |
| --- | --- |
| [POST/apps/{app-slug}/provisioning-profiles](https://api-docs.bitrise.io/#/provisioning-profile/provisioning-profile-create) | Create a provisioning file |
| [POST/apps/{app-slug}/provisioning-profiles/{provisioning-profile-slug}/uploaded](https://api-docs.bitrise.io/#/provisioning-profile/provisioning-profile-confirm) | Confirm the upload process |
| [PATCH/apps/{app-slug}/provisioning-profiles/{provisioning-profile-slug}](https://api-docs.bitrise.io/#/provisioning-profile/provisioning-profile-update) | Update an uploaded provisioning file |
| [GET/apps/{app-slug}/provisioning-profiles](https://api-docs.bitrise.io/#/provisioning-profile/provisioning-profile-list) | Get a list of the uploaded provisioning files |
| [GET/apps/{app-slug}/provisioning-profiles/{provisioning-profile-slug}](https://api-docs.bitrise.io/#/provisioning-profile/provisioning-profile-show) | Retrieve data of a specific provisioning file |
| [DELETE/apps/{app-slug}/provisioning-profiles/{provisioning-profile-slug}](https://api-docs.bitrise.io/#/provisioning-profile/provisioning-profile-delete) | Delete an uploaded provisioning file |

Build certificates

| Endpoints | Function |
| --- | --- |
| [POST/apps/{app-slug}/build-certificates](https://api-docs.bitrise.io/#/build-certificate/build-certificate-create) | Create a build certificate |
| [POST/apps/{app-slug}/build-certificates/{build-certificate-slug}/uploaded](https://api-docs.bitrise.io/#/build-certificate/build-certificate-confirm) | Confirm the upload process |
| [PATCH/apps/{app-slug}/build-certificates/{build-certificate-slug}](https://api-docs.bitrise.io/#/build-certificate/build-certificate-update) | Update an uploaded build certificate |
| [GET/apps/{app-slug}/build-certificates](https://api-docs.bitrise.io/#/build-certificate/build-certificate-list) | Get a list of the uploaded build certificate |
| [GET/apps/{app-slug}/build-certificates/{build-certificate-slug}](https://api-docs.bitrise.io/#/build-certificate/build-certificate-show) | Retrieve data of a specific build certificate |
| [DELETE/apps/{app-slug}/build-certificates/{build-certificate-slug}](https://api-docs.bitrise.io/#/build-certificate/build-certificate-delete) | Delete an uploaded build certificate |

## Creating & uploading an iOS code signing file

You can add a new iOS code signing file to an application of your choice.

The required parameters are:

* app slug
* file name

If you call the relevant [Bitrise API endpoint](https://api-docs.bitrise.io/) with the specified parameters, a new iOS code signing file object gets created.

Example `curl` request:

    curl -X POST -H 'Authorization: THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/provisioning-profiles' -d '{"upload_file_name":"sample.provisionprofile","upload_file_size":2047}'

As you can see from the example response below, the file name, its size, slug and pre-signed upload url are retrieved (along with some attributes that you can modify). This pre-signed upload url is a temporary link which you will use to upload the iOS code signing file to its destination.

Example response:

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

Now that you have this temporary pre-signed `upload_url` at hand, you can upload the iOS code signing file to AWS.

Example `curl` request:

    curl -T sample.provisionprofile 'https://concrete-userfiles-production.s3-us-west-2.amazonaws.com/build_certificates/uploads/30067/original/certs.p12?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAIOC7N256G7J2W2TQ%2F20180216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20180216T124240Z&X-Amz-Expires=600&X-Amz-SignedHeaders=content-length%3Bhost&X-Amz-Signature=2bf42176650f00405abfd7b7757635c9be16b43e98013abb7f750d3c658be28e'

Continue with confirming the file upload.

## Confirming the iOS code signing file upload

Now that you have your file uploaded, you need to confirm that your upload is indeed completed.

The required parameters are:

* app slug
* file slug (generated above)

Set the value of the `processed` flag to `true` in a `curl` request to confirm the completeness of the process:

    curl -X POST -H 'Authorization: THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/provisioning-profiles/PROVISIONING-PROFILE-SLUG/uploaded'

Now that you have confirmed the upload, you can do a bunch of other cool stuff with the files. Continue reading!

## Updating an uploaded iOS code signing file

You can perform minor updates to an uploaded iOS code signing file with the [relevant Bitrise API](https://api-docs.bitrise.io/) using the `PATCH` method. If you've uploaded your file to [Bitrise](https://www.bitrise.io), you can visually check any changes to it on our `Code Signing` tab.

The required parameters are:

* app slug
* file slug

For example, to make a **provisioning profile** protected, you can set the `is_protected` flag of your provisioning profiles to `true`.

    curl -X PATCH -H 'Authorization: THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/provisioning-profiles/PROVISIONING-PROFILE-SLUG -d '{"is_protected":true}'

For a **build certificate** you can set the same attributes as above but you can modify the password too:

    curl -X PATCH -H 'Authorization: THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/build-certificates/BUILD-CERTIFICATE-SLUG -d '{"certificate_password":"s0m3-v3ry-s3cr3t-str1ng"}'

{% include message_box.html type="warning" title="Careful with those attributes!" content="

In the case of iOS code signing files, you can set the `is_protected`, `is_exposed` and `processed` attributes of the document:

* Once the `is_protected` flag is set to `true,` it cannot be changed anymore.
* When the value of `is_protected` is true, then the `is_expose` flag cannot be set to another value.
* Once the `processed` flag is set to true, then its value cannot be changed anymore.

  Violating these constraints the response will be Bad Request.

  Note that the previous `/apps/{APP-SLUG}/provisioning-profiles/{PROVISIONING-PROFILE-SLUG}/uploaded` endpoint will have the same effect as this one with the request body `processed:true`. "%}

## Getting a specific iOS code signing file's data

You might want to retrieve a specific iOS code signing file's data to have a quick look at it. You can easily do so with the [relevant Bitrise API](https://api-docs.bitrise.io/) using the `GET` method.

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

{% include message_box.html type="note" title="Availability of the `download_url`" content=" Note that the `download_url` is generated only when the provisioning profile's `is_protected` attribute is false. "%}

## Listing the uploaded iOS code signing files of an app

Wondering how many iOS code signing files belong to an app? Get a list of them with the [relevant Bitrise API](https://api-docs.bitrise.io/) using the `GET` method.

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

## Deleting an iOS code signing file

You can delete your uploaded iOS code signing file with the [relevant Bitrise API ](https://api-docs.bitrise.io/)using the `DELETE` method.

The required parameters are:

* app slug
* file slug

Example curl request:

    curl -X DELETE 'Authorization: THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/provisioning-profiles'

## Downloading an iOS code signing file

If you’d like to download the actual file from AWS, you can easily do so with the following `curl` requests:

    curl -X POST -H 'Authorization: THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/provisioning-profiles/PROVISIONING-PROFILE-SLUG'

The response will contain a pre-signed, expiring AWS URL for the file.

<div class="banner">
<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
<div class="deploy-text">Try out our API</div>
<a target="_blank" href="https://api-docs.bitrise.io/#/"><button class="button">Go to Bitrise API</button></a>
</div>