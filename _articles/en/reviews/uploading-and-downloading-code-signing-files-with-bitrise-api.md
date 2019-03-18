---
title: Uploading and downloading code signing files with Bitrise API - draft
redirect_from: []
date: 2019-02-25 14:22:28 +0000
published: false

---
The first thing that you have to do is **get a Personal Access Token** from the [Security page of your account](https://www.bitrise.io/me/profile#/security) (if you haven’t already). Then **get the slug of the app** which can be derived from the URL of your application: `[https://www.bitrise.io/app/](https://www.bitrise.io/app/ "https://www.bitrise.io/app/")[{APP-SLUG}#/builds](https://www.bitrise.io/app/%7BAPP-SLUG%7D#/builds.)`

Steps of uploading

The uploading process consists of three steps:

1. **Request a pre-signed AWS URL** from Bitrise with the `/apps/APP-SLUG/provisioning-profiles` endpoint.

       curl -X POST -H 'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/provisioning-profiles' -d '{"upload_file_name":"sample.provisionprofile","upload_file_size":2047}'

In this example, we’d like to upload a provisioning profile file named `sample.provisionprofile`, the size of which is 2047 bytes.

The response should look like this:

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

The two important things are the **slug** and the **upload_url**, these will be required for the rest of the steps.

1. **Upload your file to AWS** 

       curl -T sample.provisionprofile 'https://concrete-userfiles-production.s3-us-west-2.amazonaws.com/build_certificates/uploads/30067/original/certs.p12?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAIOC7N256G7J2W2TQ%2F20180216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20180216T124240Z&X-Amz-Expires=600&X-Amz-SignedHeaders=content-length%3Bhost&X-Amz-Signature=2bf42176650f00405abfd7b7757635c9be16b43e98013abb7f750d3c658be28e'

So now you have your file on AWS, the last step is to confirm that your upload is indeed finished.

**3. Confirm that your file upload is finished**

This is where the slug of the provisioning profile object is needed, this request will set the value of the `processed` flag to `true`:

    curl -X POST -H 'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/provisioning-profiles/PROVISIONING-PROFILE-SLUG/uploaded'

And that’s it, the file is uploaded.

For **build certificates**, the process is exactly the same.

### Setting attributes

After you have uploaded your files, it’s possible to **set some of their attributes** through the API.

#### Provisioning profiles

In case of provisioning profiles you can set the `is_protected`,`is_expose` and `processed` attributes of the document, however, there are some constraints (which also concern the build certificate):

1. once the `is_protected` flag is set to `true` it cannot be changed anymore
2. when the value of `is_protected` is true, then the `is_expose`flag cannot be set to another value
3. once `processed` flag is set to true, then its value cannot be changed anymore

For setting the `is_protected` flag of one of your provisioning profiles, here's an example `curl` request:

    curl -X PATCH -H 'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/provisioning-profiles/PROVISIONING-PROFILE-SLUG -d '{"is_protected":true}'

Build certificate
For a build certificate you can set the same attributes as for a provisioning profile (see above), but in addition, you can modify the password too, e.g. like this:

    curl -X PATCH -H 'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/build-certificates/BUILD-CERTIFICATE-SLUG -d '{"certificate_password":"s0m3-v3ry-s3cr3t-str1ng"}'

Listing prov. profiles and build certs
You can list the provisioning profiles and build certificates for a specific app with the following requests:

provisioning profile

    curl -X POST -H 'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/provisioning-profiles'

 build certificate

     curl -X POST -H 'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/build-certificates'

Downloading prov. profiles and build certs

If you’d like to download the actual file from AWS, you can also do that with the requests below:

* provisioning profile ([Devcenter](https://devcenter.bitrise.io/api/v0.1/#get-appsapp-slugprovisioning-profilesprovisioning-profile-slug))

    curl -X POST -H 'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/provisioning-profiles/PROVISIONING-PROFILE-SLUG'

* build certificate ([Devcenter](https://devcenter.bitrise.io/api/v0.1/#get-appsapp-slugbuild-certificatesbuild-certificate-slug))

    curl -X POST -H 'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/build-certificates/BUILD-CERTIFICATE-SLUG'

These responses will contain a pre-signed, expiring AWS URL for the actual file.