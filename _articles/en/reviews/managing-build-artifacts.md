---
title: Managing build artifacts
redirect_from: []
date: '2019-04-26T12:38:56+00:00'
published: false

---
You can list all

You can generate build artifacts and deploy them if you add the `Deploy to bitrise.io` Step to [your workflow](/builds/build-artifacts-online/). You can view, share or download them in the `APPS & ARTIFACTS` tab of your Build's page.

You can list, update, view and delete build artifacts with the Bitrise API.

Let's see how!

To be able to use build artifact endpoints, you have to first [list them](/api-docs.bitrise.io/#/build-artifact/artifact-list). The response will list all artifacts along with their slug which you will need later.

Table

## Listing build artifacts

You can list all build artifacts that have been generated and exported during the build.  The provided download URL is a presigned Amazon S3 URL which is valid for 10 minutes and then it expires.

The required parameters are:

* app slug
* build slug

Example `curl` request:

    curl -X GET "https://api.bitrise.io/v0.1/apps/87a5991e180d91a9/builds/b234f959745082e0/artifacts" -H "accept: application/json" -H "Authorization: "

Example response:

    {
      "data": [
        {
          "title": "another_app-debug.apk",
          "artifact_type": "android-apk",
          "is_public_page_enabled": true,
          "slug": "92e0b6ecae87b832",
          "file_size_bytes": 1574799
        },
        {
          "title": "app-debug.apk",
          "artifact_type": "android-apk",
          "is_public_page_enabled": true,
          "slug": "54ae701761c4f956",
          "file_size_bytes": 1574793
        }
      ],
      "paging": {
        "total_item_count": 2,
        "page_item_limit": 50
      }
    }

As you can see from the above response, when calling this endpoint, build artifact slugs get generated which you can use for updating, deleting or viewing a specific build artifact of an app's build.

Let's have a look at a specific build artifact!

## Retrieving a specific build artifact's data

Now that all the build artifact slugs are at hand, you can pick one and get more details on the artifact.

Example `curl` request:

    curl -X GET "https://api.bitrise.io/v0.1/apps/87a5991e180d91a9/builds/b234f959745082e0/artifacts/92e0b6ecae87b832" -H "accept: application/json" -H "Authorization: awBg1s2u2LU7RM8-lth1ihu839rDcYCODi3F3kwLybzIp8nTTKhNZYCD-UGpIVmP_FOhnLwRhoCvl_Y-7712qQ"

Example response:

    {
      "data": {
        "title": "another_app-debug.apk",
        "artifact_type": "android-apk",
        "expiring_download_url": "https://bitrise-prod-build-storage.s3.amazonaws.com/builds/b234f959745082e0/artifacts/7626902/another_app-debug.apk?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAIV2YZWMVCNWNR2HA%2F20190426%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20190426T131627Z&X-Amz-Expires=600&X-Amz-SignedHeaders=host&X-Amz-Signature=9f1af26787f34b5cf0cbc18b2372313607b1e3c0203a9ce7e42da884a6ddf70f",
        "is_public_page_enabled": true,
        "slug": "92e0b6ecae87b832",
        "public_install_page_url": "https://www.bitrise.io/artifact/7626902/p/8e5b2c62abe28fecef09b271de767920",
        "file_size_bytes": 1574799
      }
    }

what to do with the download url

Would you like to update this build artifact?

### GET /apps/{APP-SLUG}/builds/{BUILD-SLUG}/artifacts

You can get the artifacts for a specific build.

#### Example `curl` request

``` bash
curl -H 'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/builds/BUILD-SLUG/artifacts'
```

#### Example response

``` json
{
  "data": [
    {
      "artifact_type": "file",
      "file_size_bytes": 10,
      "is_public_page_enabled": true,
      "slug": "0d2277e50b8d32ce",
      "title": "artifact-1.txt"
    },
    {
      "artifact_type": "file",
      "file_size_bytes": 11,
      "is_public_page_enabled": false,
      "slug": "b69c23de1f13b998",
      "title": "artifact-2.txt"
    }
  ],
  "paging": {
    "page_item_limit": 50,
    "total_item_count": 2
  }
}
```

### GET /apps/{APP-SLUG}/builds/{BUILD-SLUG}/artifacts/{ARTIFACT-SLUG}

Get a certain build artifact's data. The provided download URL is a presigned Amazon S3 URL which is valid for 10 minutes and then it expires.

#### Example `curl` request

``` bash
curl -H 'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/builds/BUILD-SLUG/artifacts/ARTIFACT-SLUG'
```

#### Example response

``` json
{
  "data": {
    "artifact_type": "file",
    "expiring_download_url": "https://bitrise-prod-build-storage.s3.amazonaws.com/builds/9fb8eaaa4bdd3763/artifacts/2138393/artifact-1.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Content-Sha256=UNSIGNED-PAYLOAD\u0026X-Amz-Credential=AKIAIOC7N256G7J2W2TQ%2F20180718%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20180718T145942Z\u0026X-Amz-Expires=600\u0026X-Amz-SignedHeaders=host\u0026X-Amz-Signature=8b6b3c01265e78c43ded2069cc926f9832adcc115d3afd63050847bf97f5d6d3",
    "file_size_bytes": 10,
    "is_public_page_enabled": true,
    "public_install_page_url": "https://www.bitrise.io/artifact/2138393/p/6e7dc9c2b99492e6aa997a2e5d3f7413",
    "slug": "0d2277e50b8d32ce",
    "title": "artifact-1.txt"
  }
}
```

### PATCH /apps/{APP-SLUG}/builds/{BUILD-SLUG}/artifacts/{ARTIFACT-SLUG}

Set the attributes of a build artifact. In the request body have to be sent a JSON with the specified new attribute values.

_Note: at this time only the_ `_is_public_page_enabled_` _attribute can be set through this endpoint call. This attribute can only set for the artifacts with type_ `_android-apk_` _or_ `_ios-ipa_`_._

#### Example `curl` request

``` bash
curl -X PATCH -H 'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/builds/BUILD-SLUG/artifacts/ARTIFACT-SLUG' -d '{"is_public_page_enabled":true}'
```

#### Example response

``` json
{
  "data": {
    "artifact_type": "android-apk",
    "expiring_download_url": "https://bitrise-prod-build-storage.s3.amazonaws.com/builds/ddf4134555e833d8/artifacts/3205846/app-debug.apk?X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Content-Sha256=UNSIGNED-PAYLOAD\u0026X-Amz-Credential=AKIAIOC7N256G7J2W2TQ%2F20180718%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20180718T145943Z\u0026X-Amz-Expires=600\u0026X-Amz-SignedHeaders=host\u0026X-Amz-Signature=3a9bef9f09fdc082d2669deb7e2c760c141c5e8424df21cd96551ec79ca99330",
    "file_size_bytes": 607185,
    "is_public_page_enabled": true,
    "public_install_page_url": "https://www.bitrise.io/artifact/3205846/p/300e0121b50985fd631fe304d549006f",
    "slug": "5a9f5da8d5f1057c",
    "title": "app-debug.apk"
  }
}
```

### DELETE /apps/{APP-SLUG}/builds/{BUILD-SLUG}/artifacts/{ARTIFACT-SLUG}

Delete a specific artifact.

#### Example `curl` request

``` bash
curl -X DELETE -H 'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/builds/BUILD-SLUG/artifacts/ARTIFACT-SLUG'
```

#### Example response

``` json
{
  "data": {
      "artifact_type": "android-apk",
      "file_size_bytes": 607185,
      "is_public_page_enabled": true,
      "slug": "5a9f5da8d5f1057c",
      "title": "app-debug.apk"
    }
}
```