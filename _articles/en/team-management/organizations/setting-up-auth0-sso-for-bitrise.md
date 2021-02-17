---
tag: []
title: Setting up Auth0 SSO for Bitrise
redirect_from: []
summary: ''
published: false

---
{% include message_box.html type="important" title="SAML SSO with Org Elite and Velocity plans" content="Please note that SAML SSO is only available for an Org with the [Org Elite and Velocity plans](https://www.bitrise.io/pricing). If you try to set up SAML SSO to an Org that has an [Org Standard subscription](https://www.bitrise.io/pricing/teams), the **Single Sign-On** tab will appear on the left menu bar in your **Account Settings** but you won’t be able to use it. Click **Upgrade to Org Elite** in the pop-up window to use SAML SSO in your Org.

Since the SAML SSO feature is tied to the Org Elite and Velocity plans, if you decide to downgrade, you will lose this feature. All Org members will receive an email about the downgrade and you’ll have two weeks to re-upgrade to the Org Elite plan if you wish to use SAML SSO in your Org again.

"%}

## Before you start

Before connecting SAML SSO to your Organization, make sure:

* An Auth0 administrator who is logged into Auth0 is at hand.
* Your account on Bitrise has an Org with [Org Elite or Velocity plan](https://www.bitrise.io/pricing). If it doesn’t have an Org, go ahead and [create one](https://bitrise.atlassian.net/team-management/organizations/creating-org/). Setting up SAML SSO is the same for existing and brand new Orgs on Bitrise.
* As with other [Org management actions](https://bitrise.atlassian.net/team-management/organizations/members-organizations/), only the Org owner can set up SAML SSO to a Bitrise Org.

## Navigating to the Single Sign-On page of Bitrise

If you are an Org owner on Bitrise, you will have to use the **Single Sign-On** tab to set up a SAML SSO connection between Azure AD provider and your Bitrise Org.

1. On your Bitrise [Dashboard](https://app.bitrise.io/dashboard/builds) click your avatar, then click [**Account settings**](https://app.bitrise.io/me/profile#/overview) in the dropdown.![](/img/ssopage1.png)
2. The **Overview** page displays all the Orgs you’re a member of. Select the Org where you wish to set up the SAML SSO connection.![](/img/overview.png)
3. On the left menu bar, click the **Single Sign-On** tab which will take you to the **Enable Single Sign-On** page.![](/img/sso3.png)

## Setting up SAML SSO connection between Auth0 and Bitrise

You first create a regular web application for Bitrise on Auth0, enable it and then there are two ways to retrieve app specific SAML SSO connection data from Auth0. We will show you both ways!

### Creating Bitrise as a web application on Auth0

1. Log into [Auth0](https://auth0.com/ "https://auth0.com/") as an admin.
2. Click **Applications** on the left menu bar and then the **+ Create Application**s button on the right hand side of the **Applications** page.
3. On the **Create application** window, type Bitrise in the **Name** field. In the **Choose application type** select **Regular Web Applications**, and click the **Create** button.
4. You are landing on your newly created Bitrise app’s **Quick Start** page. Click the **Addons** tab. Toggle the **SAML2 WEB APP**’s switch to the right. This will take to to the **Addon: SAML2 WEB APP** page automatically.
5. Copy the **Single Sign-On URL** from Bitrise and paste it into the **Application Callback URL** field on the **Settings** tab of the **Addon: SAML2 WEB APP** page. Scroll down to the bottom of the **Addon: SAML2 WEB APP** page and hit **ENABLE**.
6. Once your changes are saved, close the page to get back to the **Addons** page where you can see the switch turned on.
7. Continue with retrieving SAML SSO information from Auth0 to populate the required fields on the **Single Sign On** page of Bitrise.

### Retrieving SAML SSO information from Auth0’s

There are two pages to visit to retrieve SAML SSO information from Auth0: the **Usage** and the **Settings** page.

#### Usage page

Once you have enabled Bitrise as a web application on Auth0, it’s time to grab the certificate and the Identity provider’s unique login URL to finish up the SAML configuration on Bitrise.

1. Go to **Application**, then select the **Addons** tab to find your enabled Bitrise app.
2. Click the **SAML2 WEB APP** web app and select the **Usage** tab. Click on the **Download Auth0 certificate** link next to the **Identity Provider Certificate** label. Open the downloaded certificate file and copy its content into the **Certificate** field of Bitrise. Go back to Auth0 and copy paste the **Identity Provider Login URL** into Bitrise’s **Identity provider sign-on URL**.
3. Click **Configure SSO** button on Bitrise.
4. Now you can close the dialog on Auth0.

#### Settings page

Once you have enabled Bitrise as a web application on Auth0, it’s time to grab the certificate and the Identity provider’s unique login URL to finish up the SAML configuration on Bitrise.

1. Click **Bitrise** as web application on the **Applications** page. You’re automatically taken to the **Settings** page.
2. Scroll down to the bottom of the page to **Show Advanced Settings** and click it.
3. Click the **Certificate** tab. You can get the Certificate content in three ways: Copy it from the **Signing Certificate** field, click the **Copy to clipboard** icon in the upper right corner of the field or click the **DOWNLOAD CERTIFICATE** button.
4. Paste the Certificate content into Bitrise’s **Certificate** field.
5. Click on the **Endpoints** tab of Auth0 and copy or click the **Copy to clipboard** icon and paste the URL in the **Identity provider sing-on URL** field of Bitrise.
6. Hit **Configure SSO** on Bitrise.

## What’s next?

Learn how you can [log into your Org now that SAML SSO is set up](https://bitrise.atlassian.net/team-management/organizations/saml-sso-in-organizations/#logging-in-via-saml-sso-with-a-bitrise-account).

You might wan to [check out Org member’s SAML SSO statuses](https://bitrise.atlassian.net/team-management/organizations/saml-sso-in-organizations/#checking-saml-sso-statuses-on-bitrise) once the connection is up.

You might want to [enforce SAML SSO login to the Org](https://bitrise.atlassian.net/team-management/organizations/saml-sso-in-organizations/#enforcing-saml-sso-on-an-organization) once all Org members have authorized their SAML SSO connection to the Org.

Disabling SAML SSO is very simple - [learn how.](https://bitrise.atlassian.net/team-management/organizations/saml-sso-in-organizations/#disabling-an-organizations-saml-sso)

{% include message_box.html type="note" title="SAML SSO on Bitrise" content=" If you'd like to learn more about SAML SSO on Bitrise, check out our [SAML SSO in organizations](/team-management/organizations/saml-sso-in-organizations/) guide."%}