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

### Setting up SAML between the app and Azure AD

 1. Click **Single sign-on** on the left menu.![](/img/sso1.jpg)
 2. Select **SAML**.

    You will land on the **Set up Single Sign-On with SAML - Preview** page.![](/img/sso2.jpg)
 3. Click the pencil symbol at **Basic SAML Configuration** to edit two fields.![](/img/sso2a.jpg)
 4. Add **Bitrise** as the **Identifier (Entity ID)**.

    Leave this window open! We will come back to it with some information from Bitrise in a second.
    ![](/img/sso3-1.jpg)
 5. Head back to your Organization on Bitrise.
 6. Click the **Single Sign On** tab and click the **Copy Link** button to copy the **Single Sign-on URL** from your Bitrise.
 7. Let's head back to the **Basic SAML Configuration** window of Azure AD.
 8. Paste the **Assertion Consumer Service URL** from Bitrise to the **Reply URL field on the Basic SAML Configuration** page of Azure AD.
 9. Click **Save** and close the **Basic SAML Configuration** window.![](/img/sso3.jpg)
10. On the **Single sign-on** page of Azure AD, scroll down to the **Set up Bitrise** section.
11. Copy the **Login URL** and paste it to the **SAML SSO provider Single Sign-On URL** **(SSO URL)** field on Bitrise.
12. On the **Single sign-on** page of Azure AD, scroll up a bit to the **SAML Signing Certificate** section**.**
13. Click **Download** next to **Certificate (Base64)** to download the certificate to your local computer.
14. Open the certificate file and copy/paste its content into the **SAML SSO provider certificate** field of Bitrise.

    You will need the full content of the file (starting from   `----BEGIN CERTIFICATE-----` all the way to `-----END CERTIFICATE-----`).
15. Hit **Configure SSO** on Bitrise.![](/img/sso4.jpg)

You have successfully set up Bitrise as a SAML SSO app on Azure AD. Continue with Enabling SAML SSO on Bitrise.

## Authorizing SAML SSO

Now that the Org owner has set up SAML SSO, everyone in the Org has to authorize SAML SSO before logging in to their Org via SAML SSO.

1. Make sure you’re logged into Bitrise in the usual way. Use the same browser window to continue.
2. Bitrise sends a verification e-mail to all Org members. By clicking the **Log In via SAML SSO** button or using the provided URL, organization members can authorize themselves for SAML SSO login. The email also shows the Org owner’s email address (in case you would need to contact them.) Click the **Log In via SAML SSO** button or copy-paste the URL to a NEW TAB of the same browser.![](/img/email-samlssso.jpg)
3. You’re directed to Bitrise to **Allow “Organization name” to sign you in** page.
   * Click **Authorize** if you trust the Organization to control your Bitrise account sign-in process.  
     If you’re already logged in to your SAML SSO provider, you’ll be automatically taken to your Bitrise Dashboard.  
     If you’re not, you’ll be prompted to log in on your SAML SSO provider’s site, and then taken to your Bitrise Dashboard.
   * Click **Don’t Allow** if the invitation email is from an untrusted source.

     ![SAML SSO in Organizations](https://devcenter.bitrise.io/img/enable-saml.jpg)

     Note that if you are using a different non-matching email address, you will get the below error message. Make sure you log in with the right email address both on Bitrise, as well as on your SSO provider site.![](/img/noconnectedsamlsso.png)

If all went well, you should be landing on our Bitrise Dashboard. As an Org owner, you might want to check how Org members are progressing with their SAML SSO connection: [check Org member’s SAML SSO statuses ](/team-management/organizations/saml-sso-in-organizations/#checking-saml-sso-statuses-on-bitrise)or [invite new members to the Org](/team-management/organizations/saml-sso-in-organizations/#inviting-new-org-members-with-saml-sso).

## What’s next?

Learn how you can [log into your Org now that SAML SSO is set up](/team-management/organizations/saml-sso-in-organizations/#logging-in-via-saml-sso-with-a-bitrise-account).

You might wan to [check out Org member’s SAML SSO statuses](/team-management/organizations/saml-sso-in-organizations/#checking-saml-sso-statuses-on-bitrise) once the connection is up.

You might want to [enforce SAML SSO login to the Org](/team-management/organizations/saml-sso-in-organizations/#enforcing-saml-sso-on-an-organization) once all Org members have authorized their SAML SSO connection to the Org.

Disabling SAML SSO is very simple - [learn how.](/team-management/organizations/saml-sso-in-organizations/#disabling-an-organizations-saml-sso)