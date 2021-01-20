---
title: Setting up Azure AD SSO for Bitrise
redirect_from: []
date: '2019-04-17T11:13:00.000+00:00'
tag:
- teams
- org
- security
- sso
description: Learn how to set up Bitrise as a SAML SSO app on Azure AD, enable SAML
  SSO and enforce it on your Bitrise Organization.
changelog: ''
summary: ''
menu:
  organizations:
    weight: 19
published: false

---
This guide provides step-by-step instructions on setting up Bitrise as a SAML application on [Azure Active Directory (AD)](https://azure.microsoft.com/en-us/).

This requires:

* An Azure AD administrator who is logged into Azure AD.
* A Bitrise Organization owner who is logged into their Bitrise Organization (with [Org Elite subscription](https://www.bitrise.io/pricing/teams)).

## Adding Bitrise to Azure AD

Bitrise is not an integrated application in the Microsoft Azure portal so to set up SAML SSO with Azure, you'll have to first add Bitrise as a non-gallery app to the portal.

1. Log into [Microsoft Azure](https://azure.microsoft.com/en-us/) as an admin.
2. Click the **Azure Active Directory** icon on the **Azure services** page.![](/img/azureactivedirstep2.jpg)
3. Click **Enterprise applications** under **Manage**.![](/img/enterpriseapps.jpg)
4. Click **New Application** to add Bitrise as a new app to your account.![](/img/newapplication-jpg.jpg)
5. Type **Bitrise** in the **What's the name of your app** field and hit **Create**.![](/img/createyourownapp.jpg)

   You will find your newly created app listed on the **All Applications** page.
6. Click the **Bitrise** app to go to its **Overview** page.
7. Continue with Configuring Bitrise as a SAML SSO app.

## Configuring Bitrise as a SAML app

A more intricate part of the procedure is to set up SAML between the Bitrise app and Azure AD. We will be jumping back and forth from the Bitrise Organization account to the Azure portal so make sure both pages are available. In practice what this means is the Organization owner should be logged into Bitrise and the Azure AD admin should be logged into Azure AD portal.

If you have followed the steps above, by now you should be on the Overview page of the added app where you can further configure your app.

Let's do this!

### Adding users/groups to the app on Azure AD

Before setting up SAML to the app, you have to add all the users/groups to the app in Azure AD who will use SAML SSO to log into the Bitrise Organization. In other words, every Bitrise org member must be added as user in Azure AD.

1. Select **Users and groups** from the left menu.
2. Click **+ Add user/group**. ![](/img/azureuser1.jpg)
3. On the **Users** page of **Add Assignment**, select all the users from the list and click **Select**. Once it's done, you can select a role for users under the **Select a role** dropdown.![](/img/azureuser2.jpg)
4. On the **Add Assignment** page, click **Assign** to finish adding users.![](/img/azureuser3b.jpg)
5. Click **Assign** at the bottom of the page.

   You can see the list of added users:

   ![{{ page.title }}](/img/added-user.png)

### Setting up SAML between the app and Azure AD

 1. Click **Single sign-on** on the left menu.
 2. Select **SAML**.

    You will land on the **Set up Single Sign-On with SAML - Preview** page where you can further configure the fields by clicking on the pencil symbols.

    ![{{ page.title }}](/img/provide-details_back_to_bitrise-2.jpg)
 3. Click the pencil symbol at **Basic SAML Configuration to edit two fields**.
 4. Add **Bitrise** as the **Identifier (Entity ID)**.

    Leave this window open! We will come back to it in a second.
 5. Head back to your Organization on Bitrise.
 6. Click the **Single Sign On** tab.
 7. Click the **Copy Link** button to copy the **Single Sign-on URL** from your Bitrise.

    ![{{ page.title }}](https://devcenter.bitrise.io/img/sso-saml-page.jpg)
 8. Let's head back to the **Basic SAML Configuration** window of Azure AD.
 9. Paste the URL to the **Reply URL field**.

    ![{{ page.title }}](/img/basic-saml-config.jpg)
10. Click **Save** and close the **Basic SAML Configuration** window.
11. Scroll down to **Set up Bitrise**.
12. Copy the **Login URL**.
13. Paste it to **Identity provider sign-on URL** field on your Bitrise Organization account.
14. Scroll up a bit to **SAML Signing Certificate**.
15. Click **Download** next to the **Certificate** to download the certificate to your local computer.

    ![{{ page.title }}](/img/certificate-azure.jpg)
16. Open the certificate file and copy/paste its content into the **Certificate** field of your Bitrise Organization.

    You will need the full content of the file (starting from   `----BEGIN CERTIFICATE-----` all the way to `-----END CERTIFICATE-----`).
17. Hit **Configure SSO** on Bitrise.

## Enabling SAML SSO on Bitrise

Now that you have established the connection between Bitrise and Azure AD, all there is left to do is [enable SAML SSO on Bitrise](/team-management/organizations/saml-sso-in-organizations/#enabling-saml-sso). If you check the **People** tab of your Bitrise Organization, you will see that your SAML status is disabled.

1. Make sure you’re logged into Bitrise in the usual way. Use the same browser window to continue.
2. Bitrise sends a verification e-mail to all Organization members. This email contains a **Sign In via SSO** button and a URL. Organization members are prompted to sign in to Bitrise by clicking the **Sign In via SSO** button or using the provided URL.

   The email also shows the Organization owner's email address (should you need to contact them.) Click the **Sign In via SSO** button or copy-paste the URL to a NEW TAB of the same browser.

   ![{{ page.title }}](/img/saml-invitation-authentication.jpg)

   NOTE: Below error message only appears if you’ve been trying to access the Authorization page in a Safari browser.

       Error: The CORS policy for this site does not allow access from the specified Origin....

   As a workaround, we suggest you to copy the URL and paste it in a new tab. It will work! For all other browser types, you should be safely landing to the **Authorization** page.
3. On the **Allow "Organization name" to sign you in** window, click **Authorize** if you trust the Organization.

   You should be landing on your Organization's Bitrise Dashboard. You can check on the **Groups** tab who has been added to the org as a SAML user.

   ![{{ page.title }}](/img/gorups-saml.jpg)

Congrats! You have successfully enabled the SAML connection! Since SAML SSO has not been enforced on your org yet, you can log in via SAML SSO or with your Bitrise credentials.

## Enforcing SAML SSO on the Organization

To be able to sign into Bitrise exclusively via SAML SSO, you have to enforce SAML on the Organization. Mind you! You can only enforce SAML SSO on the org, if all Organization members have enabled their SAML SSO connection.

1. Toggle the **Enforce SAML SSO** switch to the right on the **Single Sign On** tab of the org.
2. Click **Save Changes**.

From now on, Organization members will be able to log in exclusively via SAML SSO.

![{{ page.title }}](/img/enforced-saml-sso.jpg)

{% include message_box.html type="note" title="Signing up to Bitrise with SAML SSO" content=" If you’d like to learn more about SAML SSO on Bitrise, in particular, how to sign up to Bitrise with an Organization's SAML SSO, check out our [SAML SSO in organizations guide](/team-management/organizations/saml-sso-in-organizations/#signing-up-to-bitrise-with-saml-sso). "%}

{% include banner.html banner_text="Set up Azure AD SSO!" url="https://app.bitrise.io/me/profile#/overview" button_text="Go to your organization" %}