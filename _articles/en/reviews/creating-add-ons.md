---
tag: []
title: Creating add-ons
redirect_from: []
summary: ''
published: false

---
{% include message_box.html type="warning" title="Before submitting an add-on" content="

1. All partners must sign the Add-on Partnership Agremeent.
2. All partners must fill out our security questionnaire, and get it accepted.

   Alternatively, an applicable certificate ([SOC 2](https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/aicpasoc2report.html) and/or [ISO](https://www.iso.org/home.html)) is sufficient.
3. Each add-on developer must create a Step that defines the integration point with the third party and determines how the services would use Bitrise and the build's data."%}

## Getting started

All custom add-ons must be able to handle a `/provision` API endpoint, with three methods:

* `POST`
* `PUT`
* `DELETE`

This is required to be able to authenticate a Bitrise app to the add-on, as well as to export Environment Variables (Env Vars) into the build. For example, an add-on can export the URL of the add-on server and an access token for the app using the add-on.

{% include message_box.html type="important" title="Provisioning calls" content="Add-ons have 10 seconds to respond to any calls of the `/provision` endpoint. After 10 seconds, the Bitrise system terminates the provisioning, in the same way as if the add-on service returned a non-success HTTP code.

Therefore, delay any potentially time-consuming operations to be done after the service returned a response to the provisioning API call. This includes using the Bitrise API and registering outgoing webhooks: delay using these until after a successful response to the provisioning call."%}

### Authenticating the provision endpoint

All three methods of the `/provision` endpoint require authentication, exclusive to this endpoint. The authentication must happen via the shared token from the shared configuration. For example:

```  
"Authentication" : "bitrise-shared-token"  
```

{% include message_box.html type="warning" title="Authentication for other endpoints" content="Any other endpoints implemented for your add-on must have different authentication. They CANNOT use the shared token."%}

### Beam - SSO navigation header

Every add-on has to include Bitrise's navigation header on their site when logging into the service via Bitrise. This navbar enables users to quickly navigate back to Bitrise and to important add-on related pages.

## Implementing SSO login 

The addon service will generate credentials with the below method:

```Golang
timestamp := time.Now().Unix()
s := sha1.New()
s.Write([]byte(fmt.Sprintf("%s:%s:%d", appSlug, addonConfig.SSOSecret, timestamp)))
token := s.Sum(nil)

c.Response().Header().Add("bitrise-sso-timestamp", fmt.Sprintf("%d", timestamp))
c.Response().Header().Add("bitrise-sso-token", fmt.Sprintf("%x", token))
c.Response().Header().Add("bitrise-sso-x-action", fmt.Sprintf("%s", fmt.Sprintf("%s/login", addonConfig.Host)))
```

The service then responds with header fields that include the required data:

* `bitrise-sso-timestamp`
* `bitrise-sso-token`
* `bitrise-sso-x-action`

This response is sent to the Bitrise core service. The core will then send a POST form to the add-on itself:

```
method: post
action: bitrise-sso-x-action?build_slug=build_slug

fields
timestamp: bitrise-sso-timestamp
token: bitrise-sso-token
app_slug: example-appslug
```

## Provisioning an app

To provision a Bitrise app for your add-on, the add-on server should either create a new record, or update an existing one, to store the provision state of the app. This should contain:

* The[ app slug](https://api-docs.bitrise.io/#/application/app-list) of the Bitrise app.
* A unique API token to identify the app to the add-on. It will be used for the requests from Bitrise builds to the add-on server.
* The add-on subscription plan of the app.

**Method**: `POST`

**URL**: `/provision`

    {
        "plan": "free"
        "app_slug": "example-appslug"
        "api_token": "public-API-token"
    }

In response, the add-on server sends back the list of Env Vars that will be exported in all builds of the app on Bitrise. In our example, the two Env Vars are `$MYADDON_HOST_URL` and `$MYADDON_AUTH_SECRET`.

    {
        "envs": [
            {
                "key": "MYADDON_HOST_URL",
                "value": "https://my-addon.url"
            },
            {
                "key": "MYADDON_AUTH_SECRET",
                "value": "verysecret"
            }
        ]
    }

## Updating an app's add-on plan

If an app's subscription plan is changed, use the PUT method with the app-slug to overwrite the stored plan.

**Method**: `PUT`

**URL**: `/provision/{app_slug}`

    {
        "plan": "developer"
    }

## Deprovisioning an app 

Deprovisioning - deleting an app's provisioned state - means that calls from Bitrise builds to the add-on server will be rejected.

**Method**: `DELETE`

**URL**: `/provision/{app_slug}`

## Testing an add-on

We provide a full testing kit for third party add-ons. It emulates the calls bitrise.io makes and checks if the responses conform to the requirements. For example, if the same provisioning call is posted for the same app multiple times, the response should be the same every time.

The testing kit is a CLI tool. You can test all the expected functions of the add-on with a single command - or you can test each of them separately.

### Installing the testing kit

Install the testing kit by downloading the binary and then make it executable.

1. Download the latest version of the binary.

       curl -fL https://github.com/bitrise-io/bitrise-addon-test/releases/download/1.0.1/bitrise-addon-test-$(uname -s)-$(uname -m) > /usr/local/bin/bitrise-addon-test

   This example command downloads version 1.0.1. Make sure to check the latest version on the [release page](https://github.com/bitrise-io/bitrise-addon-test/releases) of the add-on test kit.
2. Make the binary executable.

       chmod +x /usr/local/bin/bitrise-addon-test

### Using the testing kit

To run a comprehensive test, run the following root command in a CLI:

    bitrise-addon-test

This command runs the following tests:

* Provisioning request (with 2 retries).
* Request to change an add-on plan.
* Login request.
* Deprovisioning request (with 2 retries).

You can test each of these functions separately by adding the applicable command to the `bitrise-addon-test` root command.

For detailed information on all the available commands and flags for `bitrise-addon-test`, run `bitrise-addon-test --help`.