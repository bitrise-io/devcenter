---
tag:
- teams
- org
- security
- sso
title: Setting up Auth0 SAML SSO for Bitrise
redirect_from: []
summary: ''
menu:
  organizations:
    weight: 31

---
{% include not_translated_yet.html %}

{% include message_box.html type="important" title="SAML SSO is only available on the Velocity plan" content="Please note that SAML SSO is only available for a Workspace on the [Velocity plan](https://www.bitrise.io/pricing).

Since the SAML SSO feature is tied to the Velocity plan, if you decide to switch to a different subscription plan, you will lose this feature. All Workspace members will receive an email about the downgrade and you’ll have two weeks to switch back to Velocity if you wish to use SAML SSO in your Workspace again.

"%}

## Before you start

Before connecting SAML SSO to your Workspace, make sure:

* An Auth0 administrator who is logged into Auth0 is at hand.
* Your account on Bitrise has a Workspace with [the Velocity plan](https://www.bitrise.io/pricing). If it doesn’t have an Org, go ahead and [create one](/team-management/organizations/creating-org/). Setting up SAML SSO is the same for existing and brand new Orgs on Bitrise.
* As with other [Workspace management actions](/team-management/organizations/members-organizations/), only the Workspace owner can set up SAML SSO to a Bitrise Org.

## Navigating to the Single Sign-On page of Bitrise

If you are a Workspace owner on Bitrise, you will have to use the **Single Sign-On** tab to set up a SAML SSO connection between Auth0 and your Bitrise Org.

1. On your Bitrise [Dashboard](https://app.bitrise.io/dashboard/builds) click your avatar, then click [**Profile settings**](https://app.bitrise.io/me/profile#/overview) in the dropdown.![](/img/ssopage1.png)
2. The **Overview** page displays all the Orgs you’re a member of. Select the Workspace where you wish to set up the SAML SSO connection.![](/img/overview.png)
3. On the left menu bar, click the **Single Sign-On** tab which will take you to the **Enable Single Sign-On** page.![](/img/sso3.png)

## Setting up SAML SSO connection between Auth0 and Bitrise

You first create a regular web application for Bitrise on Auth0, enable it and then there are two ways to retrieve app specific SAML SSO connection data from Auth0. We will show you both ways!

### Creating Bitrise as a web application on Auth0

1. Log into [Auth0](https://auth0.com) as an admin.
2. Click **Applications** on the left menu bar and then the **+ Create Application**s button on the right hand side of the **Applications** page.![](/img/applications.jpg)
3. On the **Create application** window, type Bitrise in the **Name** field. In the **Choose application type** select **Regular Web Applications**, and click the **Create** button.![](/img/choose-app-type.jpg)
4. You are landing on your newly created Bitrise app’s **Quick Start** page. Click the **Addons** tab. Toggle the **SAML2 WEB APP**’s switch to the right. This will take to to the **Addon: SAML2 WEB APP** page automatically.![](/img/addonstab.jpg)
5. Copy the **Single Sign-On URL** from Bitrise and paste it into the **Application Callback URL** field on the **Settings** tab of the **Addon: SAML2 WEB APP** page. Scroll down to the bottom of the **Addon: SAML2 WEB APP** page and hit **ENABLE**.![](/img/singlesignonurl.jpg)![](/img/addonsurl.jpg)![](/img/clickenable.jpg)
6. Go back to the **Addons** page where you can see the switch turned on.![](/img/switchturnedon.jpg)
7. Continue with retrieving SAML SSO information from Auth0 to populate the required fields on the **Single Sign On** page of Bitrise.

### Retrieving SAML SSO information from Auth0

Once you have enabled Bitrise as a web application on Auth0, it’s time to grab the certificate and the Identity provider’s unique login URL to finish up the SAML configuration on Bitrise.

1. Go to **Application**, then select the **Addons** tab to find your enabled Bitrise app.
2. Click the **SAML2 WEB APP** web app and select the **Usage** tab. Click on the **Download Auth0 certificate** link next to the **Identity Provider Certificate** label. Open the downloaded certificate file and copy its content into the **Certificate** field of Bitrise. Go back to Auth0 and copy paste the **Identity Provider Login URL** into Bitrise’s **Identity provider sign-on URL**.![](/img/usage.jpg)![](/img/auth0configuresso.jpg)
3. Click **Configure SSO** button on Bitrise.
4. Now you can close the dialog on Auth0.

## What’s next?

Learn how you can [log into your Workspacenow that SAML SSO is set up](/team-management/organizations/saml-sso-in-organizations/#logging-in-via-saml-sso-with-a-bitrise-account).

You might wan to [check out Workspace member’s SAML SSO statuses](/team-management/organizations/saml-sso-in-organizations/#checking-saml-sso-statuses-on-bitrise) once the connection is up.

You might want to [enforce SAML SSO login to the Org](/team-management/organizations/saml-sso-in-organizations/#enforcing-saml-sso-on-an-organization) once all Workspace members have authorized their SAML SSO connection to the Org.

Disabling SAML SSO is very simple - [learn how.](/team-management/organizations/saml-sso-in-organizations/#disabling-an-organizations-saml-sso)

{% include message_box.html type="note" title="SAML SSO on Bitrise" content=" If you'd like to learn more about SAML SSO on Bitrise, check out our [SAML SSO in Workspaces](/team-management/organizations/saml-sso-in-organizations/) guide."%}