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