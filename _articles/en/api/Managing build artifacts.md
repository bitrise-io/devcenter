---
title: Managing build artifacts
redirect_from: []
tag:
- files
- builds
- api
- artifacts
summary: 'If you add the Deploy to bitrise.io step to your workflow, once the build
  has run, you can access the build’s artifacts in the APPS & ARTIFACTS tab. You can
  manage the generated artifacts with our API. '
menu:
  api-main:
    weight: 21

---
If you add the `Deploy to bitrise.io` step to your workflow, once the build has run, you can access the [build’s artifacts](/builds/build-artifacts-online/) in the `APPS & ARTIFACTS` tab. You can manage the generated artifacts with our API. The following endpoints can list a build’s artifacts, output a specific artifact, update or even delete an artifact.

Let’s see how!

Endpoint

|Endpoint   |Function |
|---|---|
|[GET/apps/{app-slug}/builds/{build-slug}/artifacts](https://api-docs.bitrise.io/#/build-artifact/artifact-list)   |Listing build artifacts  |
|[GET/apps/{app-slug}/builds/{build-slug}/artifacts/{artifact-slug}](https://api-docs.bitrise.io/#/build-artifact/artifact-show)   |Retrieving data of a specific build artifact  |
|[PATCH/apps/{app-slug}/builds/{build-slug}/artifacts/{artifact-slug}](https://api-docs.bitrise.io/#/build-artifact/artifact-update)  |Updating a build artifact |
|[DELETE/apps/{app-slug}/builds/{build-slug}/artifacts/{artifact-slug}](https://api-docs.bitrise.io/#/build-artifact/artifact-delete)   |Deleting a build artifact|

## Listing build artifacts

To be able to use build artifact endpoints, you have to first [list all artifacts](https://api-docs.bitrise.io/#/build-artifact/artifact-list) that belong to an app’s build. The response will list all artifacts along with their slug which you will need later.

The required parameters are:

* app slug
* build slug

Example `curl` request:

    curl -X GET "https://api.bitrise.io/v0.1/apps/87a5991e180d91a9/builds/b234f959745082e0/artifacts" -H "accept: application/json" -H "Authorization: THE-ACCESS-TOKEN"

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

You can use the generated build artifact slug/s from the response output with other build artifact endpoints where the build artifact slug is a required parameter.

## Retrieving a specific build artifact’s data

Now that the build artifact slugs are at hand, you can pick one and [get more details](https://api-docs.bitrise.io/#/build-artifact/artifact-show) on the artifact.

The required parameters are:

* app slug
* build slug
* artifact slug

Example `curl` request:

    curl -X GET "https://api.bitrise.io/v0.1/apps/87a5991e180d91a9/builds/b234f959745082e0/artifacts/92e0b6ecae87b832" -H "accept: application/json" -H "Authorization: THE-ACCESS-TOKEN"

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

By default, the value of the `is_public_page_enabled` input is set to `true`. This way the `public_install_page_url` becomes available and you can view some basic information about the artifact [via this URL](/tutorials/deploy/bitrise-app-deployment/). You can also download the artifact using the download URL from the response output.

## Updating a build artifact

You can [update](https://api-docs.bitrise.io/#/build-artifact/artifact-update) the `is_public_page_enabled` parameter of your APK and IPA files. Please note this parameter’s value is set to `true` by default so you can only disable it with this endpoint.

The required parameters are:

* app slug
* build slug
* artifact slug

Example curl request:

    curl -X PATCH "https://api.bitrise.io/v0.1/apps/87a5991e180d91a9/builds/b234f959745082e0/artifacts/54ae701761c4f956" -H "accept: application/json" -H "Authorization: THE-ACCESS-TOKEN" -H "Content-Type: application/json" -d "{ \"is_public_page_enabled\": false}"

Example response:

    {
      "data": {
        "title": "app-debug.apk",
        "artifact_type": "android-apk",
        "expiring_download_url": "https://bitrise-prod-build-storage.s3.amazonaws.com/builds/b234f959745082e0/artifacts/7626904/app-debug.apk?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAIV2YZWMVCNWNR2HA%2F20190503%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20190503T082800Z&X-Amz-Expires=600&X-Amz-SignedHeaders=host&X-Amz-Signature=7251fcbc0574ffac60b3f1d4a8c398658e49f0b86fb3cfec1500bde125738abc",
        "is_public_page_enabled": false,
        "slug": "54ae701761c4f956",
        "public_install_page_url": "",
        "file_size_bytes": 1574793
      }
    }

If you check the build’s `APPS & ARTIFACTS` tab, you will see that the `Public install page` toggle is disabled.

## Deleting a build artifact

You can [delete](https://api-docs.bitrise.io/#/build-artifact/artifact-delete) an app’s specific build artifact.

The required parameters are:

* app slug
* build slug
* artifact slug

Example `curl` request:

    curl -X DELETE "https://api.bitrise.io/v0.1/apps/87a5991e180d91a9/builds/b234f959745082e0/artifacts/54ae701761c4f956" -H "accept: application/json" -H "Authorization: THE-ACCESS-TOKEN"

Example response:

    {
      "data": {
        "title": "app-debug.apk",
        "artifact_type": "android-apk",
        "expiring_download_url": null,
        "is_public_page_enabled": true,
        "slug": "54ae701761c4f956",
        "public_install_page_url": "",
        "file_size_bytes": 1574793
      }
    }