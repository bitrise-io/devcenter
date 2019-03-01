---
title: Uploading and downloading code signing files with Bitrise API
redirect_from: []
date: 2019-02-25 14:22:28 +0000
published: false

---
With the provisioning profiles API you can manage provisioning profiles. 

### GET /apps/{APP-SLUG}/provisioning-profiles

List provisioning profiles for a specific application.

#### Example `curl` request

    curl -X POST -H  'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/provisioning-profiles'

#### Example response

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

### POST /apps/{APP-SLUG}/provisioning-profiles

Add provisioning profile for a specific application. This is the first phase of the provisioning profile upload process, calling this endpoint a new provisioning profile object is created and its slug and a presigned upload URL will be retrieved.

#### Example `curl` request

    curl -X POST -H 'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/provisioning-profiles' -d '{"upload_file_name":"sample.provisionprofile","upload_file_size":2047}'

#### Example response

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

After this call you have to upload to AWS your provisioning profile file with the presigned URL.

#### Example `curl` request

    curl -T sample.provisionprofile 'https://concrete-userfiles-production.s3-us-west-2.amazonaws.com/build_certificates/uploads/30067/original/certs.p12?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAIOC7N256G7J2W2TQ%2F20180216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20180216T124240Z&X-Amz-Expires=600&X-Amz-SignedHeaders=content-length%3Bhost&X-Amz-Signature=2bf42176650f00405abfd7b7757635c9be16b43e98013abb7f750d3c658be28e'

### POST /apps/{APP-SLUG}/provisioning-profiles/{PROVISIONING-PROFILE-SLUG}/uploaded

After the provisioning profile is uploaded to AWS, you have to confirm the upload with this endpoint.

#### Example `curl` request

    curl -X POST -H  'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/provisioning-profiles/PROVISIONING-PROFILE-SLUG/uploaded'

#### Example response

    {
      "data":{
        "upload_file_name":"sample.provisionprofile",
        "upload_file_size":2047,
        "slug":"01C6FA6P6HRQT5PQ8RMMVVXE6W",
        "processed":false,
        "is_expose":true,
        "is_protected":false
      }
    }

### GET /apps/{APP-SLUG}/provisioning-profiles/{PROVISIONING-PROFILE-SLUG}

Get a specific provisioning profile's data.

#### Example `curl` request

    curl -X POST -H  'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/provisioning-profiles/PROVISIONING-PROFILE-SLUG'

#### Example response

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

Note: `download_url` is generated only when the provisioning profile's `is_protected` attribute is `false`

### POST /apps/{APP-SLUG}/build-certificates

Add certificate file for a specific application. This is the first phase of the certificate file upload process, calling this endpoint a new certificate object is created and its slug and a presigned upload URL will be retrieved.

#### Example `curl` request

    curl -X POST -H 'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/build-certificates' -d '{"upload_file_name":"sample_cert.p12","upload_file_size":1023}'

#### Example response

    {
      "data":{
        "upload_file_name":"sample_cert.p12",
        "upload_file_size":1023,
        "slug":"01C6FA2R4CB772QTDETBE0MENP",
        "processed":false,
        "certificate_password":"",
        "is_expose":true,
        "is_protected":false,
        "upload_url":"https://concrete-userfiles-production.s3-us-west-2.amazonaws.com/build_certificates/uploads/30067/original/certs.p12?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAIOC7N256G7J2W2TQ%2F20180216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20180216T124240Z&X-Amz-Expires=600&X-Amz-SignedHeaders=content-length%3Bhost&X-Amz-Signature=2bf42176650f00405abfd7b7757635c9be16b43e98013abb7f750d3c658be28e"
      }
    }

After this call you have to upload to AWS your certificate file with the presigned URL.

#### Example `curl` request

    curl -T sample_cert.p12 'https://concrete-userfiles-production.s3-us-west-2.amazonaws.com/build_certificates/uploads/30067/original/certs.p12?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAIOC7N256G7J2W2TQ%2F20180216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20180216T124240Z&X-Amz-Expires=600&X-Amz-SignedHeaders=content-length%3Bhost&X-Amz-Signature=2bf42176650f00405abfd7b7757635c9be16b43e98013abb7f750d3c658be28e

### POST /apps/{APP-SLUG}/build-certificates/{BUILD-CERTIFICATE-SLUG}/uploaded

After the certificate file is uploaded to AWS, you have to confirm the upload with this endpoint.

#### Example `curl` request

    curl -X POST -H 'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/build-certificates/BUILD-CERTIFICATE-SLUG/uploaded'

#### Example response

    {
      "data":{
        "upload_file_name":"sample_cert.p12",
        "upload_file_size":1023,
        "slug":"01C6FA2R4CB772QTDETBE0MENP",
        "processed":true,
        "certificate_password":"",
        "is_expose":true,
        "is_protected":false
      }
    }

### GET /apps/{APP-SLUG}/build-certificates

List build certificates for a specific application.

#### Example `curl` request

    curl -X POST -H  'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/build-certificates'

#### Example response

    {
      "data": [
        {
          "upload_file_name":"sample_cert.p12",
          "upload_file_size":1023,
          "slug":"01C6FA2R4CB772QTDETBE0MENP",
          "processed":true,
          "certificate_password":"",
          "is_expose":true,
          "is_protected":false
        },
        {
          "upload_file_name":"sample_cert_2.p12",
          "upload_file_size":1023,
          "slug":"01C6FA2R4CB772QTDETBE0MEMO",
          "processed":true,
          "certificate_password":"s0m3-s3cr3t-ch4r4ct3r5",
          "is_expose":true,
          "is_protected":true
        }
      ],
      "paging": {
        "page_item_limit": 50,
        "total_item_count": 2
      }
    }

### GET /apps/{APP-SLUG}/build-certificates/{BUILD-CERTIFICATE-SLUG}

Get a specific build certificate's data.

#### Example `curl` request

    curl -X POST -H  'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/build-certificates/BUILD-CERTIFICATE-SLUG'

#### Example response

    {
      "data": {
        "upload_file_name":"sample_cert.p12",
        "upload_file_size":1023,
        "slug":"01C6FA2R4CB772QTDETBE0MENP",
        "processed":true,
        "certificate_password":"",
        "is_expose":true,
        "is_protected":false,
        "download_url":"https://concrete-userfiles-production.s3-us-west-2.amazonaws.com/prov_profile_documents/uploads/80144/original/sample.provisionprofile?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAIOC7N256G7J2W2TQ%2F20180322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20180322T091652Z&X-Amz-Expires=600&X-Amz-SignedHeaders=host&X-Amz-Signature=6dd7bb3db72aafb2d434da7b1a8f80a82a3a7a0276e84620137ed64de5025ab2"
      }
    }

_Note:_ `_download_url_` _is generated only when the build certificate's_ `_is_protected_` _attribute is_ `_false_`

### PATCH /apps/{APP-SLUG}/build-certificates/{BUILD-CERTIFICATE-SLUG}

Set a specific subset of build certificate attributes. You can update the `is_protected`, `is_expose`, `certificate_password` and `processed` attributes of a build certificate object. There are some constraints:

1. once the `is_protected` flag is set with value `true` it cannot be changed anymore
2. when the value of `is_protected` is `true`, then the `is_expose` flag cannot be set to other value
3. once `processed` flag set to true, then its value cannot be changed anymore

Violating these constraints the response will be `Bad Request`.
_Note: the previous_ `_/apps/{APP-SLUG}/build-certificates/{BUILD-CERTIFICATE-SLUG}/uploaded_` _endpoint will have the same effect as this one with the request body '{"processed":true}'_

#### Example `curl` request

    curl -X PATCH -H  'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/build-certificates/BUILD-CERTIFICATE-SLUG -d '{"is_protected":true}'

#### Example response

    {
      "data":{
        "upload_file_name":"sample_cert.p12",
        "upload_file_size":1023,
        "slug":"01C6FA2R4CB772QTDETBE0MENP",
        "processed":true,
        "certificate_password":"",
        "is_expose":true,
        "is_protected":true
      }
    }