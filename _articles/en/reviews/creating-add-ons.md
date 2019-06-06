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

### Authenticating the provision endpoint

All three methods of the `/provision` endpoint require authentication, exclusive to this endpoint. The authentication must happen via the shared token from the shared configuration. For example:

```  
Authentication" : "bitrise-shared-token  
```

{% include message_box.html type="warning" title="Authentication for other endpoints" content="Any other endpoints implemented for your add-on must have different authentication. They CANNOT use the shared token."%} 

## Provisioning an app

To provision a Bitrise app for your add-on, the add-on server should either create a new record, or update an existing one, to store the provision state of the app. This should contain:

* The[ app slug](https://api-docs.bitrise.io/#/application/app-list) of the Bitrise app.
* A unique API token to identify the app to the add-on.
* The subscription plan of the app. 