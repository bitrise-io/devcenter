---
title: SAML SSO in organizations
date: '2019-03-08T09:49:06.000+00:00'
redirect_from: []
tag:
- teams
- orgs
- security
- SSO
summary: Organization members can log into or sign up to Bitrise using their own SAML
  SSO provider's system. With SAML SSO, organizations will be able to apply the security
  guidelines of their SAML SSO provider when accessing their Bitrise organization.
menu:
  organizations:
    weight: 16

---
Organization members can log into or sign up to Bitrise using their own SAML SSO provider's system. With SAML SSO, organizations will be able to apply the security guidelines of their SAML SSO provider when accessing their Bitrise organization.

{% include message_box.html type="important" title="SAML SSO with Org Elite subscription" content="

Please note that SAML SSO is only available for organizations with [Org Elite subscription](https://www.bitrise.io/pricing/teams). If you try to set up SAML SSO to an organization that has an [Org Standard subscription](https://www.bitrise.io/pricing/teams), `Single Sign On` will appear on the left menu bar in your Account Settings but you won't be able to use it. Click `Upgrade to Org Elite` in the pop-up window to use SAML SSO in your organization.

Since the SAML SSO feature is tied to the Org Elite plan, if you decide to downgrade from it, you will lose this feature. All Org members will receive an email about the downgrade and you'll have two weeks to re-upgrade to the Org Elite plan if you wish to use SAML SSO in your Org.

"%}

Before connecting SAML SSO to your organization, make sure:

* you have a SAML SSO provider (Identity Provider) that you can connect Bitrise to.
* your account on Bitrise has an organization. If it doesn't have an organization, go ahead and [create one](/team-management/organizations/creating-org/). Setting up SAML SSO is the same for **existing and brand new organizations** on Bitrise.
* as with other [organization management actions](/team-management/organizations/members-organizations/), only the organization owner can set up SAML SSO to a Bitrise organization.

{% include message_box.html type="info" title="Guides on SAML SSO providers" content=" Check out our guides on how to set up SAML SSO with the following SAML SSO providers:

* [Setting up Google SSO for Bitrise](/team-management/organizations/setting-up-google-sso-for-bitrise/)
* [Setting up Azure AD SSO for Bitrise](/team-management/organizations/setting-up-azure-ad-sso-for-bitrise/)
* [Setting up Okta SSO for Bitrise](/team-management/organizations/setting-up-okta-sso-for-bitrise/)

  "%}

## Setting up SAML SSO for a Bitrise organization

In this tutorial, we describe how organization owners can set up their SAML SSO and invite organization members to set up their own connections.

1. Go to your organization's `Single Sign On` tab on [bitrise.io](https://www.bitrise.io).
2. Copy the `Single Sign-On URL`. You will need this URL to add Bitrise on your SAML SSO provider's site.
3. Log into your own SAML SSO provider.
4. Add Bitrise using the copied Single Sign-On URL. You're generating your Single Sign-On (SSO) credentials here which you will need in a minute on Bitrise.
5. Add the generated SSO credentials to the `Identity provider sign-on URL` and `Certificate` fields on the `Single Sign On` tab.
6. Click the `Configure SSO` button. ![](/img/SSO-page.jpg)

If you've completed the steps, you and org members should get a verification email about SAML SSO connected to the respective organization.

## Enabling SAML SSO

Now that the org owner has set up SAML SSO, everyone in the organization has to enable SAML SSO before logging into their org via SAML SSO.

1. Bitrise sends a **verification e-mail** to all organization members. This email contains a `Sign In via SSO` button and a URL. Org members are prompted to sign in to Bitrise by clicking the `Sign In via SSO` button or using the provided URL.

   ![](/img/saml-step-up-enabling-missing.jpg)

   The email also shows the org owner's email address (should you need to contact him/her.)
2. Now you are redirected to your SAML SSO provider's site where you have to provide your email address associated with your Bitrise organization.

   If you provide a **different Bitrise email address on your SAML SSO provider's site which is not related to that particular organization**, you will get the below error message. Log in with the **right email address of the organization**.

   ![](/img/no-connected-sso-for-this-email-address.jpg)
3. You're directed to the `Allow "organization name" to sign you in` page.

* Click `Authorize` if you trust the organization to control your Bitrise account-sign in process. Note that once you click `Authorize`, you'll **only be able authenticate this account via SAML SSO**.
* Click `Don't allow` if the invitation email is from an untrusted source.![](/img/enable-saml.jpg)

If all went well, you should be landing on our Bitrise Dashboard.

## Checking SAML SSO statuses on Bitrise

Now that the org owner has set up SAML SSO for the organization and all org members (including the owner) have enabled their SAML SSO, everyone in the org can check their SAML SSO statuses.

The `Single Sign-On` tab is only available for the **org owner**. Let's see what else an org owner can see on the tab!

1. Go to your organization's profile page.
2. Click `Single Sign On` on the left menu.

   You will see the `Review Users` and the `Disable SSO` buttons:

   ![](/img/single-sing-on-url.jpg)

   `Disable SSO` disables SAML SSO for all org members. Once disabled, org members will be able to sign in with the regular sign-in procedure. Please note that an individual org member can only be disabled at your own SAML SSO provider's site!

   `Review Users` takes you from the `Single Sign On` tab to the `People` tab where you can check the org member's SAML SSO status.

   ![](/img/saml-sso-people-tab.png)

* `SAML SSO IS ENABLED`: Login via SAML SSO is enabled.
* `SAML SSO IS DISABLED`: The org member has not enabled SSO connection through the `Sign in via SSO` button. To enable it, the org member has to follow the instructions in the verification email from Bitrise.

**Organization members** cannot access the `Single Sign-On` tab, but they can check their and other org members' SAML SSO status under `Members` on the `People` tab.

## About SAML SSO enforcement

Enforcing SAML SSO on your organization provides an extra layer of security: you can enforce your own security guidelines to your Bitrise organization (for example, password format requirements, two-factor authentication). This will make SAML SSO the only way for logging in/singing up to the organization. If you invite more org members to a SAML-enforced organization, they'll have to enable their SAML SSO connection first to join the organization.

### Enforcing SAML SSO on an organization

Once all org members have enabled their SAML SSO related to the organization, the owner can enforce SAML SSO on the organization with a simple toggle.

1. Go to your organization's `Single Sign On` tab.
2. Toggle the switch to the right to enforce SAML SSO.
3. Click `Save Changes`.

Now org members can only log in via SAML SSO.

![](/img/enforced-saml-sso.jpg)

### Can't enforce SAML SSO on your organization?

In some cases the org owner cannot enforce SAML SSO on the organization because org members have not enabled their SAML SSO connection yet.

* An org member fails to enable SAML SSO on his part:

  The owner can remove the org member from the organization and complete the enforcement process for the rest of the organization.
* An org member tried to enable SAML SSO with another organization:

  The owner can send the login URL to the org member who can follow the instructions to enable SAML SSO to the right organization.

![](/img/cant-enforce-saml-sso.png)

## Logging in via SSO with a Bitrise account

If SAML SSO connection has been already added to your organization and you are currently logged out of Bitrise, you can easily log into your organization.

1. Click `Login via SSO` on our [login page](https://app.bitrise.io/users/sign_in). ![](/img/login-via-sso.jpg)
2. You will be redirected to the `Initiate Single Sign-on page`.
3. Provide your organization name.
4. Click `Continue to log in`. You will be redirected to your own SSO provider's page.
5. Provide your email address associated with the organization in Bitrise and follow your SAML SSO provider's instructions.

{% include message_box.html type="info" title="Expired SAML SSO certificate" content=" If your SAML SSO certificate has expired and you cannot log into Bitrise through SAML SSO, we advise you to contact our Support team, who will be happy to assist you "%}

## Logging in via SSO without a Bitrise account

If you do not have a Bitrise account yet and an org owner invites you to his/her organization via email, you can easily sign up to Bitrise and connect to the respective organization! Our `Sign In via SSO` email is organization-specific so you're just a couple of clicks away from accessing the right Bitrise organization!

1. Find the invitation email you got from Bitrise (letsconnect@bitrise.io) in your mailbox.

   (If you received an URL instead of an email from the org owner, have no fear! Opening the link in a new tab will take you to the `Almost there...` page. Follow the instructions there. You will receive a confirmation email from Bitrise which will include a link to complete the sign-up procedure.)
2. Click `Sign In via SSO` or copy the provided URL in a new tab to acknowledge the connection. You will be redirected to your own SAML SSO provider's site.
3. Provide your email address. (It should be the same email address where you received the invitation.)
4. Follow your SAML SSO provider's instructions.
5. You will be redirected to our `Almost there...` page.
6. Provide a username you wish to use in Bitrise.
7. Click `Finish Signing Up` to complete your sign up.

If all goes well, you land on our Bitrise Dashboard.

## Disabling SAML SSO

Org owners can disable an established SAML SSO for the organization with a click of a button on the `Single Sign On` tab. Please note that if you delete someone from your IdP, you have to delete that org member from Bitrise as well.

### Disabling an organization's SAML SSO

1. Go to the `Single Sign On` tab of your organization.
2. Click `Disable SSO`.

   A confirmation pop-up appears where you can confirm/cancel your action. Please note that by clicking the `Disable SSO` button, you will **disable SAML SSO for all organization members**. Once it's done, org members will be able to log in through their normal Bitrise credentials.

![](/img/disable-sso.png)

You will receive an `SSO has been disabled` email from Bitrise (letsconnect@bitrise.io) which confirms the disabled SAML SSO for the organization.

![](/img/disabled-sso-email.png)

### Disabling one org member's SAML SSO

Please note if you click the `x` next to an org member's name, you remove that person from the organization but his/her SAML SSO is yet to be disabled!

1. Go to your SAML SSO provider's site.
2. Disable the org member there. Please note that if you fail to do this, the org member will able to re-authenticate again to Bitrise using the IDP connection.

![](/img/disbale-sso-enabled-status.png)