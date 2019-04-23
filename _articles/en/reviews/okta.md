---
title: Okta
redirect_from: []
date: 2019-04-23 08:56:13 +0000
published: false

---
This guide provides step-by-step instructions on setting up Bitrise as a SAML application on [Azure Active Directory (AD)](https://azure.microsoft.com/en-us/).

This requires:

* an okta administrator who is logged into okta
* a Bitrise organization owner who is logged into the his/her Bitrise organization (with [Org Elite subscription](https://www.bitrise.io/pricing/teams))

## Adding Bitrise to okta

Bitrise is not integrated to okta as an application so first you have to add it to okta, then you can set up SAML SSO on the newly added app.

 1. On your okta Dashboard, click `Add Applications` under `Shortcuts`.
 2. Click the green `Create New App` button.

    The `Create a New Application Integration` screen is displayed.
 3. Select `SAML 2.0` option at `Sing on method` and click `Create`.
 4. At `General Settings` type Bitrise into the `App name` field. (Optionally, you can add an app logo if you wish.) Click `Next`.
 5. Head over to your Bitrise organization and click `Single Sign On`.
 6. Click the `Copy Link` button to copy the Single Sign-On URL.
 7. Head back to okta's `SAML Settings` and paste the copied URL to the `Single sign on URL` input field.
 8. Type Bitrise at the `Audience URI (SP Entity ID)`.

    You can download the Okta certificate file now and paste its content in the `Certificate` field on your Bitrise org's `Single Sign On` page. Even easier if you leave it for a later step as you will need the `Identity provider sign-on URL` from okta which you can only fetch at a later step.
 9. Click `Next`.
10. Select the answer at Feedback as best it suits your organization. Hit `Finish`. 

Bitrise has been successfully added to okta as an app. 

## Configuring Bitrise as a SAML app