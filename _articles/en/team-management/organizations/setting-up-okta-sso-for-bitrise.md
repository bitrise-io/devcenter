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

This requires:

* An Okta administrator who is logged into Okta
* A Bitrise Organization owner who is logged into their Bitrise Organization (with [Org Elite subscription](https://www.bitrise.io/pricing/teams))

## Adding Bitrise to Okta

Bitrise is not an integrated app in Okta. You have to add Bitrise manually to Okta first, then you can configure SAML SSO on it.

We will be jumping back and forth from the Bitrise Organization account to Okta so make sure both pages are available. In practice this means the Organization owner should be logged into Bitrise and the Okta admin should be logged into Okta.

 1. Log into Okta and click **Admin**.

    ![{{ page.title }}](/img/add-apps-okta.png)
 2. On your Dashboard click **Add Applications** under **Shortcuts**.

    ![{{ page.title }}](/img/okta-shortcuts.png)
 3. Click the green **Create New App** button.

    ![{{ page.title }}](/img/okta-create-new-app.png)

    The **Create a New Application Integration** screen is displayed.
 4. Select **SAML 2.0** option at **Sing on method** and click **Create**.

    ![{{ page.title }}](/img/okta-create-new-app-pop-up.png)
 5. At **General Settings** step, type Bitrise into the **App name** field. (Optionally, you can add an app logo if you wish.) Click **Next**.

    ![{{ page.title }}](/img/okta-general-settings.png)
 6. Head over to your Bitrise Organization and click the **Single Sign On** tab on the left menu.
 7. Click the **Copy Link** button to copy the Single Sign-On URL.

    ![{{ page.title }}](/img/okta-bitrise-config.png)
 8. Head back to Okta's **SAML Settings** and paste the copied URL to the **Single sign on URL** input field.
 9. Type Bitrise at the **Audience URI (SP Entity ID)**.

    You can download the Okta certificate file now and paste its content in the **Certificate** field on your Bitrise Organization's **Single Sign On** page. Even easier if you leave it for later as you will need the **Identity provider sign-on URL** from Okta anyway. You will fetch this while configuring Bitrise as a SAML app.

    ![{{ page.title }}](/img/saml-settings-okta.jpg)
10. Click **Next**.
11. Fill out the **Feedback** section. Hit **Finish**.

Congrats! Bitrise has been successfully added to Okta as an app.

## Configuring Bitrise as a SAML app

1. Click the **Assignments** tab of your Bitrise app.

   Here you can assign Bitrise to individuals/groups. Make sure you assign Bitrise to all org members who will access the Bitrise Organization through SAML.

   ![{{ page.title }}](/img/okta-assign-user.png)
2. Click the **Sign-On** tab of your Bitrise app. You will see that SAML setup is not completed yet. Click **View Setup Instructions**.

   ![{{ page.title }}](/img/view-setup-instructions.png) The **How to Configure SAML 2.0 for Bitrise application** page is displayed. It summarizes all the information you need to set up the SAML connection between Bitrise and Okta.

   ![{{ page.title }}](/img/configure-bitrise-okta.jpg)
3. Copy the **Identity Provider Single Sign-On URL** and paste it in your Bitrise Organization's **Identity provider sign-on URL**.

   If you haven't pasted the Certificate into the respective field of your Bitrise Organization yet, you can do so now as it is displayed on this page.
4. Click **Configure SSO** on your Bitrise Organization.

## Enabling SAML SSO on Bitrise

Once SAML SSO has been set up, all Organization members (including the org owner) must enable their SAML SSO connection to the respective org to use SAML SSO as a login method.

1. Make sure you’re logged into Bitrise in the usual way. Use the same browser window to continue.
2. Bitrise sends a verification e-mail to all Organization members. This email contains a **Sign In via SSO** button and a URL. Organization members are prompted to sign in to Bitrise by clicking the **Sign In via SSO** button or using the provided URL.

   The email also shows the Organization owner's email address (should you need to contact them.) Click the **Sign In via SSO** button or copy-paste the URL to a NEW TAB of the same browser.

   ![{{ page.title }}](/img/saml-invitation-authentication.jpg)

   Below error message only appears if you’ve been trying to access the Authorization page in a Safari browser.

       Error: The CORS policy for this site does not allow access from the specified Origin....

   As a workaround, we suggest you to copy the URL and paste it in a new tab. It will work! For all other browser types, you should be safely landing to the **Authorization** page.
3. On the **Allow “Organization name” to sign you in** window, click **Authorize** if you trust the Organization.

If all went well, you should be on your Bitrise Dashboard. If you go to the **Groups** tab the Organization, you can see that you are automatically added as a SAML user. All Organization members, who enable SAML SSO, appear here automatically.

![{{ page.title }}](/img/groups-saml-enabled.png)

Please note that at this stage, SAML SSO has not been enforced as the only gateway to the Bitrise Organization. You can only enforce it if all org members have completed the above steps. You can check each org [member's status](/team-management/organizations/saml-sso-in-organizations/#checking-saml-sso-statuses-on-bitrise) (enabled or disabled) if you click the **Review Users** button on the org's **Single Sign-On** tab.

## Enforcing SAML SSO on the Organization

To be able to sign into Bitrise exclusively via SAML SSO, you have to [enforce SAML on the Organization](https://devcenter.bitrise.io/team-management/organizations/saml-sso-in-organizations/#about-saml-sso-enforcement). Mind you! You can only enforce SAML SSO on the org, if all Organization members have enabled their SAML SSO connection.

1. Toggle the **Enforce SAML SSO** switch to the right on the **Single Sign On** tab of the Organization.
2. Click **Save Changes**.

From now on, Organization members will be able to log in exclusively via SAML SSO.

![{{ page.title }}](/img/enforced-saml-sso.jpg)

{% include message_box.html type="note" title="Signing up to Bitrise with SAML SSO" content=" If you’d like to learn more about SAML SSO on Bitrise, in particular, how to sign up to Bitrise with an Organization's SAML SSO, check out our [SAML SSO in organizations guide](/team-management/organizations/saml-sso-in-organizations/#signing-up-to-bitrise-with-saml-sso). "%}

{% include banner.html banner_text="Set up Okta SSO!" url="https://app.bitrise.io/me/profile#/overview" button_text="Go to your Organization" %}