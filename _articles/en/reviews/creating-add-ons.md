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

## Provisioning an app

To provision a Bitrise app for your add-on, the add-on server should either create a new record, or update an existing one, to store the provision state of the app. This should contain:

* The[ app slug](https://api-docs.bitrise.io/#/application/app-list) of the Bitrise app.
* A unique API token to identify the app to the add-on. It will be used for the requests from Bitrise builds to the add-on server.
* The add-on subscription plan of the app.

**Method**: `POST`

**URL**: `/provision`

    {
        "plan": "free"
        "app_slug": "abcd1234efgh5678"
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

## Deleting an app's provision

Deleting an app's provisioned state means that calls from Bitrise builds to the add-on server will be rejected.

**Method**: `DELETE`

**URL**: `/provision/{app_slug}`

## Testing an add-on

We provide a full testing kit for third party add-ons. It emulates the calls bitrise.io makes and checks if the responses conform to the requirements. For example, if the same provisioning call is posted for the same app multiple times, the response should be the same every time.

The testing kit is a CLI tool. You can test all the expected functions of the add-on with a single command - or you can test each of them separately.

To run a comprehensive test, run the following root command in a CLI:

    bitrise-addon-test

This command runs the following tests:

* Provisioning request (with 2 retries).
* Request to change an add-on plan.
* Login request.
* Deprovisioning request (with 2 retries).

You can test each of these functions separately by adding the applicable command to the `bitrise-addon-test` root command.

For detailed information on all the available commands and flags for `bitrise-addon-test`, run `bitrise-addon-test --help`.

## Publishing an add-on

There are three stages to getting a new add-on published:

1. Alpha: the add-on is only available to developers and to those explicitly granted access. Its Step does not appear in the Step library.
2. Beta: the add-on is listed in the Bitrise Marketplace with a BETA label, and all Bitrise customers can provision it, on a free plan. Support must be provided. 
3. General availability (GA): the BETA tag is removed, and you can offer multiple free and paid plans to customers. The plan available in previous stages is disabled. 

### Alpha stage

All add-ons start their lives in alpha. At this stage, they do not appear in the marketplace or in search results, and have no support requirements or feature requirements. Only developers and explicitly invited users have access to the add-on, using the free Test plan. No other subscription plan is allowed in Alpha stage. 

All add-ons must have a Step that defines the integration point with the third party: this Step does not show up in the Step library. If it is a modified version of an existing Step, only the previous, unmodified version will be available in the Step library during the Alpha stage. 

To proceed to the beta stage, the add-on developer has to:

* Test the add-on with a minimum of 10 alpha users.
* Provide their company’s details, including business, engineering, and contact information.
* Provide a name and product icons for the add-on.
* Prepare screenshots for the add-on’s marketplace listing.
* Describe the add-on’s benefits and features.
* Submit a state progression form. 

### Beta stage

Beta add-ons are visible in the marketplace but still only have a single, free plan called Test. Being publicly available means developers can gather larger amounts of data and feedback from users. 

In the beta stage, timely support must be provided for add-ons. Partners are expected to acknowledge and respond to all Bitrise customer tickets related to their add-on within 48 hours. Parters are responsible to handle customer tickets via their own services. 

To proceed from the beta stage to GA, the developers has to:

* Test the add-on with a minimum of 100 active beta users
* Ensure that your add-on is backed by production-ready infrastructure that can support thousands of paid customers
* Specify the details of free and paid plans for your add-on by submitting the details via our form

### General availability

When the add-on reaches GA, the BETA tag is removed and partners can offer multiple free and paid plans to Bitrise customers. The old Test plan is disabled and no new instances of it can be provisioned. 

## Documenting add-ons 

Add-ons must be properly documented before proceeding to the beta stage. This means two main pieces of content:

* A description of the add-on's benefits.
* A description of the add-on's features. 

### Benefits description

The benefits appear on the add-on's marketplace page. It should describe, in moderate details, what your add-on provides to Bitrise customers, and why it is beneficial for them to use it. 

### Features description

The features description should list every single feature of the add-on that might differ across different subscription plans. The list will be shown next to each plan defined for the add-on. 