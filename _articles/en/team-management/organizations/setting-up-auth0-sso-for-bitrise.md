---
tag:
- teams
- org
- security
- sso
title: Setting up Auth0 SSO for Bitrise
redirect_from: []
summary: With SAML SSO, Orgs can apply the security guidelines of Auth0 when accessing
  their Bitrise Workspace.
menu:
  organizations:
    weight: 23

---
This guide provides instructions on setting up SAML SSO using [Auth0](https://auth0.com).

{% include message_box.html type="important" title="SAML SSO is only available on the Velocity plan" content="Please note that SAML SSO is only available for a Workspace on the [Velocity plan](https://www.bitrise.io/pricing).

Since the SAML SSO feature is tied to the Velocity plan, if you decide to switch to a different subscription plan, you will lose this feature. All Workspace members will receive an email about the downgrade and you’ll have two weeks to switch back to Velocity if you wish to use SAML SSO in your Workspace again."%}

## Before you start

Before connecting SAML SSO to your Workspace, make sure:

* An Auth0 administrator who is logged into Auth0 is at hand.
* Your account on Bitrise has a Workspace with the [Velocity plan] (https://www.bitrise.io/pricing). If it doesn’t have an Org, go ahead and [create one](/team-management/organizations/creating-org/). Setting up SAML SSO is the same for existing and brand new Orgs on Bitrise.
* As with other [Workspace management actions](/team-management/organizations/members-organizations/), only the Workspace owner can set up SAML SSO to a Bitrise Org.

## Navigating to the Single Sign-On page of Bitrise

If you are a Workspace owner on Bitrise, you will have to use the **Single Sign-On** tab to set up a SAML SSO connection between your SAML SSO provider and your Bitrise Org.

1. On your Bitrise [Dashboard](https://app.bitrise.io/dashboard/builds) click your avatar, then click [**Profile settings**](https://app.bitrise.io/me/profile#/overview) in the dropdown. ![Account selector dropdown](/img/account-settings-dropdown.png)
2. The **Overview** page displays all the Orgs you’re a member of. Select the Workspace where you wish to set up the SAML SSO connection.![](/img/overview-tab.jpg)
3. On the left menu bar, click the **Single Sign-On** which will take you to the **Enable Single Sign-On** page.![](/img/enablesinglesignon.jpg)
4. Continue with [Setting up SAML SSO connection between Auth0 and Bitrise](/team-management/organizations/setting-up-auth0-sso-for-bitrise/#setting-up-saml-sso-connection-between-auth0-and-bitrise).

## Setting up SAML SSO connection between Auth0 and Bitrise

You first create a regular web application for Bitrise on Auth0, enable it, then you have to retrieve app specific SAML SSO connection data from Auth0.

### Creating Bitrise as a web application on Auth0

1. Log into [Auth0](https://auth0.com) as an admin.
2. Click **Applications** on the left menu bar then click the **+ Create Application** button on the right hand side of the **Applications** page.![](/img/authzero_createapp1.png)
3. On the **Create application** window, type Bitrise in the **Name** field. In the **Choose application type** select **Regular Web Applications**, and click the **Create** button.![](/img/authzero_addappname2.png)
4. You are landing on your newly created Bitrise app’s **Quick Start** page. Click the **Addons** tab. Toggle the **SAML2 WEB APP**’s switch to the right. This will take to to the **Addon: SAML2 WEB APP** page automatically.![](/img/authzero_addon4.png)
5. Copy the **Assertion Consumer Service URL (ACS URL)** from Bitrise and paste it into the **Application Callback URL** field on the **Settings** tab of the **Addon: SAML2 WEB APP** page. Scroll down to the bottom of the **Addon: SAML2 WEB APP** page and hit **SAVE**.![](/img/authzero_settingsapplicationurl6.png)
6. Go back to the **Addons** page where you can see the switch turned on.![](/img/authzero_samlappenabled8.png)
7. 
8. Continue with [retrieving SAML SSO information from Auth0](/team-management/organizations/setting-up-auth0-sso-for-bitrise/#retrieving-saml-sso-information-from-auth0) to populate the required fields on the **Single Sign On** page of Bitrise.

### Retrieving SAML SSO information from Auth0

Once you have enabled Bitrise as a web application on Auth0, it’s time to grab the certificate and the Identity provider’s unique login URL to finish up the SAML configuration on Bitrise.

1. Go to **Application**, then select the **Addons** tab to find your enabled Bitrise app.
2. Click the **SAML2 WEB APP** web app and select the **Usage** tab. Click on the **Download Auth0 certificate** link next to the **Identity Provider Certificate** label. Open the downloaded certificate file and copy its content into the **SAML SSO provider certificate** field of Bitrise or upload the file itself from your local computer. Go back to Auth0 and copy paste the **Identity Provider Login URL** into Bitrise’s **SAML SSO provider Single Sign-On URL (SSO URL)**.

   ![](/img/enablesinglesignon.jpg)![](/img/authzero_downloadcertificateusage9.png)
3. Click **Configure SSO** button on Bitrise.
4. Now you can close the dialog on Auth0.

### Setting up a mapping rule for your Bitrise app’s Client ID

Bitrise authenticates SAML SSO users via email address so before you’d test SAML SSO, make sure you create a new mapping rule on Auth0. This way you map Auth0 Client ID to email for successful SAML authentication on Bitrise.

1. Click the **Auth Pipeline** on the left menu bar. Click **Rules**.
2. Click **+ Create** to set up a new mapping rule.
3. On the **Pick a rules template** page, click **<> Empty rule**.
4. Add the following codeblock to the **Script** box: You will need your new Bitrise app’s Client ID which you can get on the **Applications**' page.

       function mapSamlAttributes(user, context, callback) {
        if (context.clientID === '{your app's clientID'}')
          context.samlConfiguration.mappings = {
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": "email"
          }; 
        }
        callback(null, user, context);
       }
5. Click **Save changes**.

SAML SSO is now set up on your Bitrise Workspace.

## What’s next?

Learn how you can [log into your Workspacenow that SAML SSO is set up](/team-management/organizations/saml-sso-in-organizations/#logging-in-via-saml-sso-with-a-bitrise-account).

You might wan to [check out Workspace member’s SAML SSO statuses](/team-management/organizations/saml-sso-in-organizations/#checking-saml-sso-statuses-on-bitrise) once the connection is up.

You might want to [enforce SAML SSO login to the Org](/team-management/organizations/saml-sso-in-organizations/#enforcing-saml-sso-on-a-workspace) once all Workspace members have authorized their SAML SSO connection to the Org.

Disabling SAML SSO is very simple - [learn how.](/team-management/organizations/saml-sso-in-organizations/#disabling-a-workspaces-saml-sso)

{% include message_box.html type="note" title="SAML SSO on Bitrise" content=" If you'd like to learn more about SAML SSO on Bitrise, check out our [SAML SSO in Workspaces](/team-management/organizations/saml-sso-in-organizations/) guide."%}