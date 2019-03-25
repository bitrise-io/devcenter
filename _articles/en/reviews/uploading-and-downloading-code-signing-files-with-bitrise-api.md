---
title: Uploading and downloading code signing files with Bitrise API - draft
redirect_from: []
date: 2019-02-25 14:22:28 +0000
published: false

---
## Before you start

All examples in this guide use the `[https://api.bitrise.io/v0.1/apps/APP-SLUG/builds](https://api.bitrise.io/v0.1/apps/APP-SLUG/builds "https://api.bitrise.io/v0.1/apps/APP-SLUG/builds")` endpoint. This endpoint can only be authorized with a Personal Access Token!

Before you'd start creating and uploading code signing files, you have to generate a new token and grab the slug of the app you want to add the code signing files to. To be able to access and use our API, you have to first generate a Personal Access Token to authorize yourself in the curl command.

1. Go to your `Account Settings`.
2. Click the `Security` tab on the left.
3. Click `Generate new` at `Personal access token (BETA)`.
4. Add a `Token description` and an `Expiration`.
5. Hit `Save & Continue`.

   ![](/img/new-token-generation.png)

        storing the new tokens
6. Copy the slug of your app from its app URL. For example, [https://www.bitrise.io/app/](https://www.bitrise.io/app/ "https://www.bitrise.io/app/")[{APP-SLUG}#/builds](https://www.bitrise.io/app/%7BAPP-SLUG%7D#/builds.) where the `APP-SLUG` is what you need.

Now that all is at hands, let's see what you can do with our API.

## Creating a provisioning profile

**Request a pre-signed AWS URL** from Bitrise.

{% include message_box.html type="note" title="Interactive cURL call configurator" content="
You can find an interactive cURL call configurator by clicking on the `Start/Schedule a build` button on your app’s [bitrise.io](https://www.bitrise.io/) page and switching to `Advanced` mode in the popup. At the bottom of the popup you can find a `curl` call, based on the parameters you specify in the popup.

**Note that this call uses the deprecated** `app.bitrise.io` **URL and the app’s build trigger token, as opposed to the personal access token shown in the examples in this guide. All other parameters, however, work the same way.**"%}

You can create a new provisioning profile object with a simple `curl` request. This is the first phase of the provisioning profile upload process: by calling this endpoint a new provisioning profile object is created and its slug and a presigned upload URL will be retrieved. Required parameters are the app slug and provisioning profile name.

Example `curl` request:

    curl -X POST -H 'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/provisioning-profiles' -d '{"upload_file_name":"sample.provisionprofile","upload_file_size":2047}'

Where the example response is:

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

Use the generated URL to upload the provisioning profile to the storage place of your choice (in our example it is AWS).

Example `curl` request

    curl -T sample.provisionprofile 'https://concrete-userfiles-production.s3-us-west-2.amazonaws.com/build_certificates/uploads/30067/original/certs.p12?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAIOC7N256G7J2W2TQ%2F20180216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20180216T124240Z&X-Amz-Expires=600&X-Amz-SignedHeaders=content-length%3Bhost&X-Amz-Signature=2bf42176650f00405abfd7b7757635c9be16b43e98013abb7f750d3c658be28e'

## Confirming the file upload

Now you have your file uploaded to a storage place of your choice/Bitrise, you need to confirm that your upload is indeed finished.

The two required parameters you'll need are the provisioning profile slug and the app slug. You can confirm that the uploading process is complete if you set the value of the `processed` flag to `true` in a `curl` request:

    curl -X POST -H 'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/provisioning-profiles/PROVISIONING-PROFILE-SLUG/uploaded'

For **build certificates**, the process is exactly the same.

### Setting attributes

After you have uploaded your files to the desired destination/platform, you might want to set some attributes again with the help of our API.

{% include message_box.html type="warning" title="Careful with those attributes!" content="

In the case of provisioning profiles you can set the `is_protected`, `is_exposed` and `processed` attributes of the document, however, there are some constraints (which also concern the build certificate):

* Once the `is_protected` flag is set to `true,` it cannot be changed anymore.
* When the value of `is_protected` is true, then the `is_expose` flag cannot be set to another value.
* Once the `processed` flag is set to true, then its value cannot be changed anymore.
  "%}

## Getting specific provisioning profile information

You might want to make a specific provisioning profile's data available to have a quick look at it. You can easily do so with the `GET` method and app slug and provisioning profile's slug parameters.

Example curl request:

     curl -X GET -H  'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/provisioning-profiles/PROVISIONING-PROFILE-SLUG'

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

{% include message_box.html type="note" title="My message" content=" Note that the `download_url` is generated only when the provisioning profile's `is_protected` attribute is false.
"%}

## Updating an uploaded provisioning profile/build certificate

You can perform minor updates to an already uploaded provisioning profile or build certificate with the `PATCH` method.

To make a provisioning profile protected, you can set the `is_protected` flag of your provisioning profiles to `true`. The  required parameters are the app slug and the provisioning profile slug.

    curl -X PATCH -H 'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/provisioning-profiles/PROVISIONING-PROFILE-SLUG -d '{"is_protected":true}'

For a build certificate you can set the same attributes as for a provisioning profile (see above), but you can modify the password too:

    curl -X PATCH -H 'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/build-certificates/BUILD-CERTIFICATE-SLUG -d '{"certificate_password":"s0m3-v3ry-s3cr3t-str1ng"}'

{% include message_box.html type="warning" title="Careful with those attributes!" content="

In the case of provisioning profiles you can set the `is_protected`, `is_exposed` and `processed` attributes of the document, however, there are some constraints (which also concern the build certificate):

* Once the `is_protected` flag is set to `true,` it cannot be changed anymore.
* When the value of `is_protected` is true, then the `is_expose` flag cannot be set to another value.
* Once the `processed` flag is set to true, then its value cannot be changed anymore. "%}

Violating these constraints the response will be Bad Request. Note that the previous /apps/{APP-SLUG}/provisioning-profiles/{PROVISIONING-PROFILE-SLUG}/uploaded endpoint will have the same effect as this one with the request body '{"processed":true}'.

## Listing provisioning profiles /build certificates

Wondering how many provisioning profiles/build certificates belong to an app?  Get a list of them for a specific app with the `GET` method.

For provisioning profiles

    curl -X GET -H 'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/provisioning-profiles'

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

As you can see the example response shows the list of provisioning profiles of a specific app along with their set attributes. You can also check that the max number of file limit is 50.

For build certificates

     curl -X POST -H 'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/build-certificates'

## Downloading provisioning profiles/build certificates

If you’d like to download the actual file from AWS, you can also do that with the following `curl` requests:

* provisioning profile

  curl -X POST -H 'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/provisioning-profiles/PROVISIONING-PROFILE-SLUG'
* build certificate

  curl -X POST -H 'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/build-certificates/BUILD-CERTIFICATE-SLUG'

These responses will contain a pre-signed, expiring AWS URL for the actual file.