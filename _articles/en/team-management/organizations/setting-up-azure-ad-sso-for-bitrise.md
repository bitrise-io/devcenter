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

---
{% include message_box.html type="important" title="SAML SSO with Org Elite and Velocity plans" content="Please note that SAML SSO is only available for an Org with the [Org Elite and Velocity plans](https://www.bitrise.io/pricing). If you try to set up SAML SSO to an Org that has an [Org Standard subscription](https://www.bitrise.io/pricing/teams), the **Single Sign-On** tab will appear on the left menu bar in your **Account Settings** but you won’t be able to use it. Click **Upgrade to Org Elite** in the pop-up window to use SAML SSO in your Org.

Since the SAML SSO feature is tied to the Org Elite and Velocity plans, if you decide to downgrade, you will lose this feature. All Org members will receive an email about the downgrade and you’ll have two weeks to re-upgrade to the Org Elite plan if you wish to use SAML SSO in your Org again.

"%}

## Before you start

Before connecting SAML SSO to your Organization, make sure:

* An Azure AD administrator who is logged into Azure AD is at hand.
* Your account on Bitrise has an Org with [Org Elite or Velocity plan](https://www.bitrise.io/pricing). If it doesn’t have an Org, go ahead and [create one](https://bitrise.atlassian.net/team-management/organizations/creating-org/). Setting up SAML SSO is the same for existing and brand new Orgs on Bitrise.
* As with other [Org management actions](https://bitrise.atlassian.net/team-management/organizations/members-organizations/), only the Org owner can set up SAML SSO to a Bitrise Org.

## Navigating to the Single Sign-On page of Bitrise

If you are an Org owner on Bitrise, you will have to use the **Single Sign-On** tab to set up a SAML SSO connection between Azure AD provider and your Bitrise Org.

1. On your Bitrise [Dashboard](https://app.bitrise.io/dashboard/builds) click your avatar, then click [**Account settings**](https://app.bitrise.io/me/profile#/overview) in the dropdown.![](/img/ssopage1.png)
2. The **Overview** page displays all the Orgs you’re a member of. Select the Org where you wish to set up the SAML SSO connection.![](/img/overview.png)
3. On the left menu bar, click the **Single Sign-On** tab which will take you to the **Enable Single Sign-On** page.![](/img/sso3.png)
4. Continue with [Adding Bitrise to Azure AD](/team-management/organizations/setting-up-azure-ad-sso-for-bitrise/#adding-bitrise-to-azure-ad).

## Adding Bitrise to Azure AD

1. Log into [Microsoft Azure](https://azure.microsoft.com/en-us/) as an admin.
2. Click the **Azure Active Directory** icon on the **Azure services** page.![](/img/azureactivedirstep2-1.jpg)
3. Click **Enterprise applications** under **Manage**.![](/img/enterpriseapps-1.jpg)
4. Click **New Application** to add Bitrise as a new app to your account.![](/img/newapplication-jpg.jpg)
5. Type `Bitrise` in the **What's the name of your app?** field. The **Integrate any other application you don’t find in the gallery** button should be automatically selected. Hit **Create**.![](/img/createyourownapp-1.jpg)You will find your newly created app listed on the **All Applications** page.
6. Click the **Bitrise** app to go to its **Overview** page.
7. Continue with [Configuring Bitrise as a SAML SSO app](/team-management/organizations/setting-up-azure-ad-sso-for-bitrise/#configuring-bitrise-as-a-saml-app).

## Configuring Bitrise as a SAML app

A more intricate part of the procedure is to set up SAML between the Bitrise app and Azure AD. We will be jumping back and forth from the Bitrise Organization account to the Azure portal so make sure both pages are available. In practice what this means is the Organization owner should be logged into Bitrise and the Azure AD admin should be logged into Azure AD portal.

If you have followed the steps above, by now you should be on the Overview page of the added app where you can further configure your app.

Let's do this!

### Adding users/groups to the app on Azure AD

Before setting up SAML to the app, you have to add all the users/groups to the app in Azure AD who will use SAML SSO to log into the Bitrise Organization. In other words, every Bitrise org member must be added as user in Azure AD.

1. Select **Users and groups** from the left menu.
2. Click **+ Add user/group**.![](/img/azureuser1-1.jpg)
3. On the Users page of **Add Assignment**, select users from the list and click **Select**. Once it's done, you can select a role for users under the **Select a role** dropdown.![](/img/azureuser2-1.jpg)
4. On the **Add Assignment** page, click **Assign** to finish adding users.![](/img/azureuser3b-1.jpg)

### Setting up SAML SSO between Bitrise and Azure AD

 1. Click **Single sign-on** on the left menu. Select **SAML**. ![](/img/singlesignonazuread.png)
 2. You will land on the **Set up Single Sign-On with SAML** page.![](/img/sso2-1.jpg)
 3. Click the pencil symbol at **Basic SAML Configuration** to edit two fields.![](/img/sso2a-1.jpg)
 4. Add `Bitrise` as the **Identifier (Entity ID)**. Leave this window open! We will come back to it with some information from Bitrise in a second.![](/img/sso3-2.jpg)
 5. Head back to your Organization on Bitrise.
 6. Click the **Single Sign On** tab and click the **Copy Link** button to copy the **Single Sign-on URL** from your Bitrise.
 7. Let's head back to the **Basic SAML Configuration** window of Azure AD.
 8. Paste the **Assertion Consumer Service URL** from Bitrise to the **Reply URL field on the Basic SAML Configuration** page of Azure AD.
 9. Click **Save** and close the **Basic SAML Configuration** window.![/img/sso3-2.jpg](https://app.forestry.io/sites/mpxzvqn7ysfysw/body-media//img/sso3-2.jpg)
10. On the **Single sign-on** page of Azure AD, scroll down to the **Set up Bitrise** section.
11. Copy the **Login URL** and paste it to the **SAML SSO provider Single Sign-On URL** **(SSO URL)** field on Bitrise.
12. On the **Single sign-on** page of Azure AD, scroll up a bit to the **SAML Signing Certificate** section.
13. Click **Download** next to **Certificate (Base64)** to download the certificate to your local computer.![](/img/singlesignonsummary.jpg)
14. Open the certificate file and copy/paste its content into the **SAML SSO provider certificate** field of Bitrise.

    You will need the full content of the file (including `----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----` as well).
15. Hit **Configure SSO** on Bitrise.![](/img/sso3bitrise.jpg)

You have successfully set up Bitrise as a SAML SSO app on Azure AD. Continue with Authorizing SAML SSO.

## Authorizing SAML SSO

Now that the Org owner has set up SAML SSO, everyone in the Org has to authorize SAML SSO before logging in to their Org via SAML SSO.

1. Make sure you’re logged into Bitrise in the usual way. Use the same browser window to continue.
2. Bitrise sends a verification e-mail to all Org members. By clicking the **Log In via SAML SSO** button or using the provided URL, organization members can authorize themselves for SAML SSO login. The email also shows the Org owner’s email address (in case you would need to contact them.) Click the **Log In via SAML SSO** button or copy-paste the URL to a NEW TAB of the same browser.[![](https://devcenter.bitrise.io/img/email-samlssso.jpg)](https://devcenter.bitrise.io/img/email-samlssso.jpg)
3. You’re directed to Bitrise to **Allow “Organization name” to sign you in** page.
   * Click **Authorize** if you trust the Organization to control your Bitrise account sign-in process.  
     If you’re already logged in to your SAML SSO provider, you’ll be automatically taken to your Bitrise Dashboard.  
     If you’re not, you’ll be prompted to log in on your SAML SSO provider’s site, and then taken to your Bitrise Dashboard.
   * Click **Don’t Allow** if the invitation email is from an untrusted source.

     [![SAML SSO in Organizations](https://devcenter.bitrise.io/img/enable-saml.jpg)](https://devcenter.bitrise.io/img/enable-saml.jpg)

     Note that if you are using a different non-matching email address, you will get the below error message. Make sure you log in with the right email address both on Bitrise, as well as on your SSO provider site.[![](https://devcenter.bitrise.io/img/noconnectedsamlsso.png)](https://devcenter.bitrise.io/img/noconnectedsamlsso.png)

If all went well, you should be landing on our Bitrise Dashboard. As an Org owner, you might want to check how Org members are progressing with their SAML SSO connection: [check Org member’s SAML SSO statuses ](https://devcenter.bitrise.io/team-management/organizations/saml-sso-in-organizations/#checking-saml-sso-statuses-on-bitrise)or [invite new members to the Org](https://devcenter.bitrise.io/team-management/organizations/saml-sso-in-organizations/#inviting-new-org-members-with-saml-sso).

## What’s next?

Learn how you can [log into your Org now that SAML SSO is set up](https://bitrise.atlassian.net/team-management/organizations/saml-sso-in-organizations/#logging-in-via-saml-sso-with-a-bitrise-account).

You might wan to [check out Org member’s SAML SSO statuses](https://bitrise.atlassian.net/team-management/organizations/saml-sso-in-organizations/#checking-saml-sso-statuses-on-bitrise) once the connection is up.

You might want to [enforce SAML SSO login to the Org](https://bitrise.atlassian.net/team-management/organizations/saml-sso-in-organizations/#enforcing-saml-sso-on-an-organization) once all Org members have authorized their SAML SSO connection to the Org.

Disabling SAML SSO is very simple - [learn how.](https://bitrise.atlassian.net/team-management/organizations/saml-sso-in-organizations/#disabling-an-organizations-saml-sso)

{% include message_box.html type="note" title="SAML SSO on Bitrise" content=" If you'd like to learn more about SAML SSO on Bitrise, check out our [SAML SSO in organizations](/team-management/organizations/saml-sso-in-organizations/) guide."%}