---
title: Setting up Okta SSO for Bitrise
redirect_from: []
date: '2019-04-24T07:13:35+00:00'
tag:
- teams
- " org"
- security
- sso
description: Learn how to set up Bitrise as a SAML SSO app on Okta, enable SAML SSO
  and enforce it on your Bitrise Organization.
changelog: ''
summary: ''
menu:
  organizations:
    weight: 23

---
This guide provides step-by-step instructions on setting up Bitrise as a SAML application on [Okta](https://www.okta.com/).

{% include message_box.html type="important" title="SAML SSO with Org Elite and Velocity plans" content="Please note that SAML SSO is only available for an Org with the [Org Elite and Velocity plans](https://www.bitrise.io/pricing). If you try to set up SAML SSO to an Org that has an [Org Standard subscription](https://www.bitrise.io/pricing/teams), the **Single Sign-On** tab will appear on the left menu bar in your **Account Settings** but you won’t be able to use it. Click **Upgrade to Org Elite** in the pop-up window to use SAML SSO in your Org.

Since the SAML SSO feature is tied to the Org Elite and Velocity plans, if you decide to downgrade, you will lose this feature. All Org members will receive an email about the downgrade and you’ll have two weeks to re-upgrade to the Org Elite plan if you wish to use SAML SSO in your Org again.

"%}

## Before you start

Before connecting SAML SSO to your Organization, make sure:

* An Okta administrator who is logged into Okta.
* Your account on Bitrise has an Org with [Org Elite or Velocity plan](https://www.bitrise.io/pricing). If it doesn’t have an Org, go ahead and [create one](/team-management/organizations/creating-org/). Setting up SAML SSO is the same for existing and brand new Orgs on Bitrise.
* As with other [Org management actions](/team-management/organizations/members-organizations/), only the Org owner can set up SAML SSO to a Bitrise Org.

## Navigating to the Single Sign-On page of Bitrise

If you are an Org owner on Bitrise, you will have to use the **Single Sign-On** tab to set up a SAML SSO connection between Okta and your Bitrise Org.

1. On your Bitrise [Dashboard](https://app.bitrise.io/dashboard/builds) click your avatar, then click [**Account settings**](https://app.bitrise.io/me/profile#/overview) in the dropdown. ![](/img/account-settings-dropdown.jpg)
2. The **Overview** page displays all the Org you’re a member of. Select the Org where you wish to set up the SAML SSO connection.![](/img/overview-tab.jpg)
3. On the left menu bar, click the **Single Sign-On** which will take you to the **Enable Single Sign-On** page.
4. Continue with[ Adding Bitrise to Okta](/team-management/organizations/setting-up-okta-sso-for-bitrise/#adding-bitrise-to-okta).

## Adding Bitrise to Okta

Bitrise is not an integrated app in Okta. You have to add Bitrise manually to Okta first, then you can configure SAML SSO on it.

We will be jumping back and forth from the Bitrise Organization account to Okta so make sure both pages are available. In practice this means the Organization owner should be logged into Bitrise and the Okta admin should be logged into Okta.

 1. Log into Okta and click **Admin**.![](/img/add-apps-okta.jpg)
 2. On your Dashboard click **Add Applications** under **Shortcuts**.![](/img/okta-shortcuts.jpg)
 3. Click the green **Create New App** button.
    ![](/img/okta-create-new-app.jpg)
    The **Create a New Application Integration** screen is displayed.
 4. Select **SAML 2.0** option at **Sing on method** and click **Create**.![](/img/okta-create-new-app-pop-up.jpg)
 5. At **General Settings** step, type Bitrise into the **App name** field. (Optionally, you can add an app logo if you wish.) Click **Next**.![](/img/okta-general-settings.jpg)
 6. Head over to your Bitrise Organization and click the **Single Sign On** tab on the left menu.
 7. Click the **Copy Link** button to copy the Single Sign-On URL.
 8. Head back to Okta's **SAML Settings** and paste the copied URL to the **Single sign on URL** input field.
 9. Type Bitrise at the **Audience URI (SP Entity ID)**.

    You can download the Okta certificate file now and paste its content in the **Certificate** field on your Bitrise Organization's **Single Sign On** page. Even easier if you leave it for later as you will need the **Identity provider sign-on URL** from Okta anyway. You will fetch this while configuring Bitrise as a SAML app.![](/img/saml-settings-okta-2.jpg)
10. Click **Next**.
11. Fill out the **Feedback** section. Hit **Finish**.

Congrats! Bitrise has been successfully added to Okta as an app.

## Configuring Bitrise as a SAML app

1. Click the **Assignments** tab of your Bitrise app.

   Here you can assign Bitrise to individuals/groups. Make sure you assign Bitrise to all org members who will access the Bitrise Organization through SAML.![](/img/okta-assign-user.jpg)
2. Click the **Sign-On** tab of your Bitrise app. You will see that SAML setup is not completed yet. Click **View Setup Instructions**.![](/img/view-setup-instructions.jpg)
   The **How to Configure SAML 2.0 for Bitrise application** page is displayed. It summarizes all the information you need to set up the SAML connection between Bitrise and Okta.![](/img/configure-bitrise-okta-1.jpg)
3. Copy the **Identity Provider Single Sign-On URL** and paste it in your Bitrise Organization's **Identity provider sign-on URL**.

   If you haven't pasted the Certificate into the respective field of your Bitrise Organization yet, you can do so now as it is displayed on this page.
4. Click **Configure SSO** on your Bitrise Organization.
5. Continue with [Authorizing SAML SSO](/team-management/organizations/setting-up-okta-sso-for-bitrise/#authorizing-saml-sso).

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

If all went well, you should be landing on our Bitrise Dashboard. As an Org owner, you might want to check how Org members are progressing with their SAML SSO connection check Org member’s SAML SSO statuses or invite new members to the Org.

## What's next?

Learn how you can:

* [Check out Org member’s SAML SSO statuses](/team-management/organizations/saml-sso-in-organizations/#checking-saml-sso-statuses-on-bitrise) once the connection is up.
* [Invite new members with SAML SSO.](/team-management/organizations/saml-sso-in-organizations/#inviting-new-org-members-with-saml-sso)
* [Enforce SAML SSO login](/team-management/organizations/saml-sso-in-organizations/#enforcing-saml-sso-on-an-organization) to the Org once all Org members have authorized their SAML SSO connection to the Org.
* [Log into your Org](/team-management/organizations/saml-sso-in-organizations/#logging-in-via-saml-sso-with-a-bitrise-account) now that SAML SSO is set up.
* [Disable SAML SSO](/team-management/organizations/saml-sso-in-organizations/#disabling-an-organizations-saml-sso) on an Org.