---
title: SAML enforcement -draft
date: 2019-03-08 08:02:43 +0000
redirect_from: []
published: false

---
With SAML SSO organizations will be able to apply the security guidelines of their SAML SSO provider when accessing their own Bitrise organization.

In this guide we cover the following topics:

* [Setting up SAML SSO for a Bitrise organization]()
* [Enabling SAML SSO](/organizations/#enabling-saml-sso/)
* [Checking SAML SSO statuses on Bitrise ](/organizations/#checking-saml-sso-statuses-on-bitrise/)
* [About SAML SSO enforcement](/organizations/#about-saml-sso-enforcement/)
* [Logging in via SSO with a Bitrise account](/organizations/#logging-in-via-sso-with-a-bitrise-account/)
* [Logging in via SSO without a Bitrise account](/organizations/#logging-in-via-sso-without-a-bitrise-account/)
* [Disabling SAML SSO](/organizations/#disabling-saml-sso-in-an-organization/)
* Click `Authorize` if you trust the organization to control your Bitrise account-sign in process. Note that once you click `Authorize`, SAML SSO gets enforced on the organization and you'll **only be able access this account via SAML SSO authentication**.
* Click `Don't allow` if the invitation email is from an untrusted source.

## About SAML SSO enforcement

Enforcing SAML SSO on your organization provides an extra layer of security: you can enforce your own security guidelines to your Bitrise organization (for example, password format requirements, two-factor authentication). This will make SAML SSO the only way to log in/sing up to the organization. If you invite more org members to a SAML-enforced organization, they'll have to enable their SAML SSO connection first to join the organization.

### Enforcing SAML SSO on an organization

Once all org members have enabled their SAML SSO related to the organization, the owner can enforce SAML SSO on the organization.

1. Go to your organization's `Security` tab.
2. Toggle the switch to the right to enforce SAML SSO.

![](/img/enforce-saml-sso.png)

### Can't enforce SAML SSO on your organization?

In some cases the org owner cannot enforce SAML SSO on the organization because org members have not enabled their SAML SSO connection yet.

* An org member fails to enable SAML SSO on his part:

  The owner can remove the org member from the organization and complete the enforcement process for the rest of the organization.
* An org member tried to enable SAML SSO with another organization:

  The owner can send the login URL to the org member who can follow the instructions to enable SAML SSO to the right organization.

![](/img/cant-enforce-saml-sso.png)