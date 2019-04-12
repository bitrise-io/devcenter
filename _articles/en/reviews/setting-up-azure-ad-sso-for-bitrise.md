---
title: Setting up Azure AD SSO for Bitrise
redirect_from: []
date: 2019-04-12 09:31:39 +0000
published: false

---
This guide provides step-by-step instructions on setting up Bitrise as a SAML application on Azure Active Directory (AD).

* loggedinto bitrise
* have an azure admin right
* 

{% include message_box.html type="note" title="Azure AD administrator account" content=" Please note that you must have an Azure AD **administrator** account to add Bitrise as a SAML app. sign in to the Azure portal using your Azure Active Directory administrator account "%}

For more details description, please visit Azure AD's official documentation on setting up [SAML SSO for a non-gallery application](https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/configure-single-sign-on-non-gallery-applications).

## Adding Bitrise to Azure AD

Bitrise is not an integrated application in the Azure portal so to set up SAML SSO with Azure, you'll have to first add Bitrise as a non-gallery app portal.

1. Log into Azure AD.
2. Click the `Azure Active Directory` on the left menu.
3. Click `Enterprise applications` under `Manage`.

   ![](/img/active-directory.png)
4. Click `+ New Application` to add a new app to your account/organization.
   ![](/img/azure-enterprise-application-1.jpg)
5. Click the `Non-gallery application` tile to add Bitrise manually

   ![](/img/non-gallery-application.jpg)
6. Type `Bitrise` in the `Name` field.

   ![](/img/bitrise-added-as-an-app.png)
7. Click the blue `Add` button at the bottom of the page.

## Configuring Bitrise as a SAML app

Configure saml between the application and Azure AD.

You'll land on the Overview page of the added app where you can further configure your app.
Configuring SAML to the app required it supports SAML 2.0.

 1. Select `Users and groups` to add at least one user to the app.
 2. Select a user from the list or add an external user by typing his/her email address.

    Note that you can always remove a selected member by clicking the ...remove users from the users tab.
 3. Click `Select` at the bottom of the page.
 4. Click `Assign` at the bottom of the page.
    You can see the list of added users:

    ![](/img/added-user.png)
 5. Click `Single sign-on` on the left menu to set up your SAML connection between Bitrise and Azure AD.
 6. Select `SAML`.
    You will land on the `Set up Single Sign-On with SAML - Preview` page where you can further configure/edit the fields by clicking on the pencil symbols.
 7. Click the pencil symbol at `Basic SAML Configuration`.

    ![](/img/Single-sign-on_-overview.jpg)
 8. Head back to your organization on Bitrise
 9. Click the `Copy Link` to copy the `Single Sign-on URL` from your Bitrise organization's Single Sign On tab.

    ![](https://devcenter.bitrise.io/img/sso-saml-page.jpg)
10. 
11. 
12. 
13. 