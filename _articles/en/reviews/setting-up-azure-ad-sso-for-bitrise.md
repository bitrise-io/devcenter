---
title: Setting up Azure AD SSO for Bitrise
redirect_from: []
date: 2019-04-12 09:31:39 +0000
published: false

---
This guide provides step-by-step instructions on setting up Bitrise as a SAML application on Azure Active Directory (AD).

* logged into bitrise
* have an azure admin right

Configuring SAML to the app requires that your app supports SAML 2.0.

{% include message_box.html type="note" title="Azure AD administrator account" content=" Please note that you must have an Azure AD **administrator** account to add Bitrise as a SAML app. sign in to the Azure portal using your Azure Active Directory administrator account "%}

For more details description, please visit Azure AD's official documentation on setting up [SAML SSO for a non-gallery application](https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/configure-single-sign-on-non-gallery-applications).

## Adding Bitrise to Azure AD

Bitrise is not an integrated application in the Azure portal so to set up SAML SSO with Azure, you'll have to first add Bitrise as a non-gallery app portal.

1. Log into your Azure AD account.
2. Click the `Azure Active Directory` on the left menu.
3. Click `Enterprise applications` under `Manage`.

   ![](/img/active-directory.png)
4. Click `+ New Application` to add Bitrise as a new app to your account/organization. ![](/img/azure-enterprise-application-1.jpg)
5. Click the `Non-gallery application` tile to add Bitrise manually to Azure AD.

   ![](/img/non-gallery-application.jpg)
6. Type `Bitrise` in the `Name` field under `Add your own application`.

   ![](/img/bitrise-added-as-an-app.png)
7. Click the blue `Add` button at the bottom of the page.

You have successfully added Bitrise as an app to Azure AD. Let's continue with configuring it as a the SAML app!

## Configuring Bitrise as a SAML app

A more intricate part of the procedure is to set up SAML between the Bitrise app and Azure AD. We will be jumping back and forth from the Bitrise organization account to the Azure portal so make sure both pages are available. In practice what this means is the organization owner should be logged into Bitrise and the Azure AD admin should be logged into Azure AD portal.

By now you should be on the Overview page of the added app where you can further configure your app.

* adding users/groups to the app
* setting up the SAML connection between the app and Azure AD

Let's do this!

### Adding users/groups to the app on Azure AD

Before setting up SAML to the app, you have to add all the users/groups to the app who will log into Bitrise with SSO connection.

1. Select `Users and groups` from the left menu to add at least one user to the app.
2. Select a user from the list or add an external user by typing his/her email address.
3. Click `Select` at the bottom of the page.
4. Click `Assign` at the bottom of the page.
   You can see the list of added users:

   ![](/img/added-user.png)

### Setting up SAML between the app and Azure AD

 1. Click `Single sign-on` on the left menu.
 2. Select `SAML`.
    You will land on the `Set up Single Sign-On with SAML - Preview` page where you can further configure/edit the fields by clicking on the pencil symbols. We will access three steps: `Basic SAM configuration`, `SAML Signing Certificate` and `Set up Bitrise`.

    ![/img/Single-sign-on](https://app.forestry.io/sites/yv69yaruhkt48w/body-media//img/Single-sign-on_-overview.jpg)
 3. Click the pencil symbol at `Basic SAML Configuration to edit two fields`.
 4. Add `Bitrise` as the `Identifier (Entity ID)`.

    Leave this window open! We will come back to it in a second.
 5. Head back to your organization on Bitrise.
 6. Click the `Single Sign On` tab.
 7. Click the `Copy Link` button to copy the `Single Sign-on URL` from your Bitrise.

    ![](https://devcenter.bitrise.io/img/sso-saml-page.jpg)
 8. Let's head back to the `Basic SAML Configuration` window of Azure AD.
 9. Paste the URL to the `Reply URL field`.

    ![](/img/basic-saml-config.jpg)
10. Click `Save` and close the `Basic SAML Configuration` window.
11. Scroll down to `Set up Bitrise`.
12. Copy the `Login URL.`
13. Paste it to `Identity provider sign-on URL` field on your Bitrise organization account.
14. Scroll up a bit to `SAML Signing Certificate.`
15. Click `Download` next to the `Certificate` to download the certificate to your local computer. You will only need the **full** **content** of the file, not the file itself.

    ![](/img/certificate-azure.jpg)

    It should look something like this:

        -----BEGIN CERTIFICATE-----
        code
        -----END CERTIFICATE-----
16. Open the certificate file and copy/paste its content into the `Certificate` field of your Bitrise organization.
17. Hit `Configure SSO` on Bitrise.