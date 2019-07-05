---
title: Setting up Azure AD SSO for Bitrise
redirect_from: []
date: '2019-04-17T11:13:00.000+00:00'
tag: []
summary: ''
menu:
  organizations:
    weight: 19

---
This guide provides step-by-step instructions on setting up Bitrise as a SAML application on [Azure Active Directory (AD)](https://azure.microsoft.com/en-us/).

This requires:

* an Azure AD administrator who is logged into Azure AD
* a Bitrise organization owner who is logged into his or her Bitrise organization (with [Org Elite subscription](https://www.bitrise.io/pricing/teams))

## Adding Bitrise to Azure AD

Bitrise is not an integrated application in the Microsoft Azure portal so to set up SAML SSO with Azure, you'll have to first add Bitrise as a non-gallery app to the portal.

1. Log into your Azure AD account as an admin.
2. Click the **Azure Active Directory** on the left menu.
3. Click **Enterprise applications** under **Manage**.

   ![](/img/active-directory.png)
4. Click **+ New Application** to add Bitrise as a new app to your account.

   ![](/img/azure-enterprise-application-1.jpg)
5. Click the **Non-gallery application** tile to add Bitrise manually to Azure AD.

   ![](/img/non-gallery-application.jpg)
6. Type **Bitrise** in the **Name** field under **Add your own application**.

   ![](/img/bitrise-added-as-an-app.png)
7. Click the blue **Add** button at the bottom of the page.

You have successfully added Bitrise as an app to Azure AD. Let's continue with configuring it as a the SAML app!

## Configuring Bitrise as a SAML app

A more intricate part of the procedure is to set up SAML between the Bitrise app and Azure AD. We will be jumping back and forth from the Bitrise organization account to the Azure portal so make sure both pages are available. In practice what this means is the organization owner should be logged into Bitrise and the Azure AD admin should be logged into Azure AD portal.

If you have followed the steps above, by now you should be on the Overview page of the added app where you can further configure your app.

Let's do this!

### Adding users/groups to the app on Azure AD

Before setting up SAML to the app, you have to add all the users/groups to the app in Azure AD who will use SAML SSO to log into the Bitrise organization. In other words, every Bitrise org member must be added as user in Azure AD.

1. Select **Users and groups** from the left menu.
2. Select all the users from the list so that Bitrise org members will be able to sign into Bitrise with SAML SSO.
3. Click **Select** at the bottom of the page.
4. Click **Assign** at the bottom of the page.

   You can see the list of added users:

   ![](/img/added-user.png)

### Setting up SAML between the app and Azure AD

 1. Click **Single sign-on** on the left menu.
 2. Select **SAML**.

    You will land on the **Set up Single Sign-On with SAML - Preview** page where you can further configure the fields by clicking on the pencil symbols.

    ![](/img/provide-details_back_to_bitrise-2.jpg)
 3. Click the pencil symbol at **Basic SAML Configuration to edit two fields**.
 4. Add **Bitrise** as the **Identifier (Entity ID)**.

    Leave this window open! We will come back to it in a second.
 5. Head back to your organization on Bitrise.
 6. Click the **Single Sign On** tab.
 7. Click the **Copy Link** button to copy the **Single Sign-on URL** from your Bitrise.

    ![](https://devcenter.bitrise.io/img/sso-saml-page.jpg)
 8. Let's head back to the **Basic SAML Configuration** window of Azure AD.
 9. Paste the URL to the **Reply URL field**.

    ![](/img/basic-saml-config.jpg)
10. Click **Save** and close the **Basic SAML Configuration** window.
11. Scroll down to **Set up Bitrise**.
12. Copy the **Login URL**.
13. Paste it to **Identity provider sign-on URL** field on your Bitrise organization account.
14. Scroll up a bit to **SAML Signing Certificate**.
15. Click **Download** next to the **Certificate** to download the certificate to your local computer.

    ![](/img/certificate-azure.jpg)
16. Open the certificate file and copy/paste its content into the **Certificate** field of your Bitrise organization.

    You will need the full content of the file (starting from   `----BEGIN CERTIFICATE-----` all the way to `-----END CERTIFICATE-----`).
17. Hit **Configure SSO** on Bitrise.

## Enabling SAML SSO on Bitrise

Now that you have established the connection between Bitrise and Azure AD, all there is left to do is [enable SAML SSO on Bitrise](/team-management/organizations/saml-sso-in-organizations/#enabling-saml-sso). If you check the **People** tab of your Bitrise organization, you will see that your SAML status is disabled.

1. Check your emails associated with the email address you provided to your Bitrise organization.

	You should have received an email from us: ![](/img/enable-bitrisse-saml-org.jpg)

2. Click **Sign In via SSO**.

   NOTE: Below error message only appears if you’ve been trying to access the Authorization page in a Safari browser.

       Error: The CORS policy for this site does not allow access from the specified Origin....
       

   As a workaround, we suggest you to copy the URL and paste it in a new tab. It will work! For all other browser types, you should be safely landing to the `Authorization` page.
3. On the `Allow "organization name" to sign you in` window, click `Authorize` if you trust the organization.

   You should be landing on your organization's Bitrise Dashboard. You can check on the `Groups` tab who has been added to the org as a SAML user.

   ![](/img/gorups-saml.jpg)

Congrats! You have successfully enabled the SAML connection! Since SAML SSO has not been enforced on your org yet, you can log in via SAML SSO or with your Bitrise credentials.

## Enforcing SAML SSO on the organization

To be able to sign into Bitrise exclusively via SAML SSO, you have to [enforce SAML on the organization](/team-management/organizations/saml-sso-in-organizations/#about-saml-sso-enforcement). Mind you! You can only enforce SAML SSO on the org, if **all org** members have enabled their SAML SSO connection.

1. Toggle the **Enforce SAML SSO** switch to the right on the **Single Sign On** tab of the org.
2. Click **Save Changes**.

From now on, org members will be able to log in exclusively via SAML SSO.

![](/img/enforced-saml-sso.jpg)

{% include message_box.html type="note" title="SAML SSO on Bitrise" content=" If you'd like to learn more about SAML SSO on Bitrise, check out our [SAML SSO in organizations](/team-management/organizations/saml-sso-in-organizations/) guide."%}

<div class="banner">
	<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
	<div class="deploy-text">Set up Azure AD SSO for your Bitrise organization!</div>
	<a target="_blank" href="https://app.bitrise.io/me/profile#/overview"><button class="button">Go to your organization</button></a>
</div>