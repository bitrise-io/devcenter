---
last_modified_at: '2020-03-25'
title: SAML SSO in Organizations
date: '2019-03-08T09:49:06.000+00:00'
redirect_from: []
tag:
- teams
- orgs
- security
- SSO
description: Organization members can log into or sign up to Bitrise using their own
  SAML SSO provider's system. With SAML SSO, Organizations will be able to apply the
  security guidelines of their SAML SSO provider when accessing their Bitrise Organization.
summary: ''
changelog: ''
menu:
  organizations:
    weight: 16

---
{% include video.html embed_url="https://www.youtube.com/embed/0LvV5E14Z4c" %}

Organization members can log into or sign up to Bitrise using their own SAML SSO provider's system. With SAML SSO, Organizations will be able to apply the security guidelines of their SAML SSO provider when accessing their Bitrise Organization.

{% include message_box.html type="important" title="SAML SSO with Org Elite subscription" content="

Please note that SAML SSO is only available for Organizations with [Org Elite subscription](https://www.bitrise.io/pricing/teams). If you try to set up SAML SSO to an Organization that has an [Org Standard subscription](https://www.bitrise.io/pricing/teams), **Single Sign On** will appear on the left menu bar in your **Account Settings** but you won't be able to use it. Click **Upgrade to Org Elite** in the pop-up window to use SAML SSO in your Organization.

Since the SAML SSO feature is tied to the Org Elite plan, if you decide to downgrade from it, you will lose this feature. All Organization members will receive an email about the downgrade and you'll have two weeks to re-upgrade to the Org Elite plan if you wish to use SAML SSO in your Org.

"%}

Before connecting SAML SSO to your Organization, make sure:

* You have a SAML SSO provider (Identity Provider) that you can connect Bitrise to.
* Your account on Bitrise has an Organization. If it doesn't have an Organization, go ahead and [create one](/team-management/organizations/creating-org/). Setting up SAML SSO is the same for existing and brand new Organizations on Bitrise.
* As with other [Organization management actions](/team-management/organizations/members-organizations/), only the Organization owner can set up SAML SSO to a Bitrise Organization.

{% include message_box.html type="info" title="Guides on SAML SSO providers" content=" Check out our guides on how to set up SAML SSO with the following SAML SSO providers:

* [Setting up Google SSO for Bitrise](/team-management/organizations/setting-up-google-sso-for-bitrise/)
* [Setting up Azure AD SSO for Bitrise](/team-management/organizations/setting-up-azure-ad-sso-for-bitrise/)
* [Setting up Okta SSO for Bitrise](/team-management/organizations/setting-up-okta-sso-for-bitrise/)

  "%}

## Setting up SAML SSO for a Bitrise Organization

In this tutorial, we describe how Organization owners can set up their SAML SSO and invite Organization members to set up their own connections.

1. Go to your Organization's **Single Sign On** tab on [bitrise.io](https://www.bitrise.io).
2. Copy the **Single Sign-On URL**. You will need this URL to add Bitrise on your SAML SSO provider's site.
3. Log into your own SAML SSO provider.
4. Add Bitrise using the copied Single Sign-On URL. You're generating your Single Sign-On (SSO) credentials here which you will need in a minute on Bitrise.
5. Add the generated SSO credentials to the **Identity provider sign-on URL** and **Certificate** fields on the **Single Sign On** tab.
6. Click the **Configure SSO** button.

![](/img/enable-single-sign-on.jpg)

If you've completed the steps, you and Org members should get a verification email about SAML SSO connected to the respective Organization.

## Enabling SAML SSO

Now that the Organization owner has set up SAML SSO, everyone in the Organization has to enable SAML SSO before logging into their Org via SAML SSO.

1. Make sure you’re logged into Bitrise in the usual way. Use the same browser window to continue.
2. Bitrise sends a verification e-mail to all Organization members. This email contains a **Sign In via SSO** button and a URL. Organization members are prompted to sign in to Bitrise by clicking the **Sign In via SSO** button or using the provided URL.

   The email also shows the Organization owner's email address (should you need to contact them.)

   Click the **Sign In via SSO** button or copy-paste the URL to a NEW TAB of the same browser.

   ![](/img/saml-invitation-authentication.jpg)
3. Now you are redirected to your SAML SSO provider's site where you have to provide your email address associated with your Bitrise Organization.

   If you provide a different Bitrise email address on your SAML SSO provider's site which is not related to that particular Organization, you will get the below error message. Log in with the right email address of the Organization.

   ![](/img/no-connected-sso-for-this-email-address.jpg)
4. You're directed to the **Allow "Organization name" to sign you in** page.

* Click **Authorize** if you trust the Organization to control your Bitrise account-sign in process. Note that once you click **Authorize**, you'll only be able authenticate this account via SAML SSO.
* Click **Don't allow** if the invitation email is from an untrusted source.![](/img/enable-saml.jpg)

If all went well, you should be landing on our Bitrise Dashboard.

## Checking SAML SSO statuses on Bitrise

Now that the Organization owner has set up SAML SSO for the Organization and all Org members (including the owner) have enabled their SAML SSO, everyone in the Org can check their SAML SSO statuses.

The **Single Sign-On** tab is only available for the Organization owner. Let's see what else an Organization owner can see on the tab!

1. Go to your Organization's profile page.
2. Click **Single Sign On** on the left menu.

   You will see the **Review Users** and the **Disable SSO** buttons:

   ![](/img/single-sing-on-url.jpg)

   **Disable SSO** disables SAML SSO for all Organization members. Once disabled, Org members will be able to sign in with the regular sign-in procedure. Please note that an individual Org member can only be disabled at your own SAML SSO provider's site!

   **Review Users** takes you from the **Single Sign On** tab to the **People** tab where you can check the Organization member's SAML SSO status.

   ![](/img/saml-sso-people-tab.png)

* **SAML SSO IS ENABLED**: Login via SAML SSO is enabled.
* **SAML SSO IS DISABLED**: The Organization member has not enabled SSO connection through the **Sign in via SSO** button. To enable it, the Organization member has to follow the instructions in the verification email from Bitrise.

Organization members cannot access the **Single Sign-On** tab, but they can check their and other Organization members' SAML SSO status under **Members** on the **People** tab.

## About SAML SSO enforcement

Enforcing SAML SSO on your Organization provides an extra layer of security: you can enforce your own security guidelines to your Bitrise Organization (for example, password format requirements, two-factor authentication). This will make SAML SSO the only way for logging in/singing up to the Organization. If you invite more Org members to a SAML-enforced Organization, they'll have to enable their SAML SSO connection first to join the Organization.

### Enforcing SAML SSO on an Organization

Once all Organization members have enabled their SAML SSO related to the Organization, the owner can enforce SAML SSO on the Organization with a simple toggle.

1. Go to your Organization's **Single Sign On** tab.
2. Toggle the switch to the right to enforce SAML SSO.
3. Click **Save Changes**.

Now Organization members can only log in via SAML SSO.

![](/img/enforced-saml-sso.jpg)

### Can't enforce SAML SSO on your Organization?

In some cases the Organization owner cannot enforce SAML SSO on the Organization because Organization members have not enabled their SAML SSO connection yet.

* An Organization member fails to enable SAML SSO on their part:

  The owner can remove the Organization member from the Organization and complete the enforcement process for the rest of the Organization.
* An Organization member tried to enable SAML SSO with another Organization:

  The owner can send the login URL to the Organization member who can follow the instructions to enable SAML SSO to the right Organization.

![](/img/cant-enforce-saml-sso.png)

## Logging in via SSO with a Bitrise account

If SAML SSO connection has been already added to your Organization and you are currently logged out of Bitrise, you can easily log into your Organization.

1. Click **Login via SSO** on our [login page](https://app.bitrise.io/users/sign_in). ![](/img/login-via-sso.jpg)
2. You will be redirected to the **Initiate Single Sign-on page**.
3. Provide your Organization name.
4. Click **Continue to log in**. You will be redirected to your own SSO provider's page.
5. Provide your email address associated with the Organization in Bitrise and follow your SAML SSO provider's instructions.

{% include message_box.html type="info" title="Expired SAML SSO certificate" content=" If your SAML SSO certificate has expired and you cannot log into Bitrise through SAML SSO, we advise you to contact our Support team, who will be happy to assist you "%}

## Signing up to Bitrise with SAML SSO

If you do not have a Bitrise account yet and an Organization owner invites you to their Organization via email, you can easily sign up to Bitrise and connect to the respective Organization. Our **Sign In via SSO** email is Organization-specific so you're just a couple of clicks away from accessing the right Bitrise Organization!

1. Find the invitation email you got from Bitrise (letsconnect@bitrise.io) in your mailbox.

   (If you received an URL instead of an email from the Organization owner, have no fear! Opening the link in a new tab will take you to the **Almost there...** page. Follow the instructions there. You will receive a confirmation email from Bitrise which will include a link to complete the sign-up procedure.)
2. Click **Sign In via SSO** or copy the provided URL in a new tab to acknowledge the connection. You will be redirected to your own SAML SSO provider's site.
3. Provide your email address. (It should be the same email address where you received the invitation.)
4. Follow your SAML SSO provider's instructions.
5. You will be redirected to our **Almost there...** page.
6. Provide a username you wish to use in Bitrise.
7. Click **Finish Signing Up** to complete your sign up.

If all goes well, you land on our Bitrise Dashboard.

## Disabling SAML SSO

Organization owners can disable an established SAML SSO for the Organization with a click of a button on the **Single Sign On** tab. Please note that if you delete someone from your IDP, you have to delete that Organization member from Bitrise as well.

### Disabling an Organization's SAML SSO

1. Go to the **Single Sign On** tab of your Organization.
2. Click **Disable SSO**.

   A confirmation pop-up appears where you can confirm/cancel your action. Please note that by clicking the **Disable SSO** button, you will disable SAML SSO for all Organization members. Once it's done, Org members will be able to log in through their normal Bitrise credentials.

![](/img/disable-sso.png)

You will receive an **SSO has been disabled** email from Bitrise (letsconnect@bitrise.io) which confirms the disabled SAML SSO for the Organization.

![](/img/disabled-sso-email.png)

### Disabling one Organization member's SAML SSO

Please note if you click the **x** next to an Organization member's name, you remove that person from the Organization but their SAML SSO is yet to be disabled!

1. Go to your SAML SSO provider's site.
2. Disable the Organization member there. Please note that if you fail to do this, the Org member will able to re-authenticate again to Bitrise using the IDP connection.

![](/img/disbale-sso-enabled-status.png)

{% include banner.html banner_text="Let's configure SAML SSO to your Organization!" url="https://app.bitrise.io/users/sign_up?utm_source=devcenter&utm_medium=bottom_cta" button_text="Go to your Organization" %}