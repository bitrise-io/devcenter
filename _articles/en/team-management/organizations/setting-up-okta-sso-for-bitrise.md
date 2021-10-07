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
  and enforce it on your Bitrise Workspace.
changelog: ''
summary: ''
menu:
  organizations:
    weight: 26

---
This guide provides step-by-step instructions on setting up Bitrise as a SAML application on [Okta](https://www.okta.com/).

{% include message_box.html type="important" title="SAML SSO is only available on the Velocity and Build Enterprise plans" content="Please note that SAML SSO is only available for a Workspace on the [Velocity and Enterprise Build Platform plans](https://www.bitrise.io/pricing).

Since the SAML SSO feature is tied to the Velocity and Enterprise Build Platform plans, if you decide to switch to a different subscription plan, you will lose this feature. All Workspace members will receive an email about the downgrade and you’ll have two weeks to switch back to Velocity/Enterprise Build Platform if you wish to use SAML SSO in your Workspace again.

"%}

## Before you start

Before connecting SAML SSO to your Workspace, make sure:

* An Okta administrator who is logged into Okta.
* Your account on Bitrise has a Workspace with the [Velocity/Enterprise Build Platform plans](https://www.bitrise.io/pricing). If it doesn’t have a Workspace, go ahead and [create one](/team-management/organizations/creating-org/). Setting up SAML SSO is the same for existing and brand new Workspaces on Bitrise.
* As with other [Workspace management actions](/team-management/organizations/members-organizations/), only the Workspace owner can set up SAML SSO to a Bitrise Workspace.

## Navigating to the Single Sign-On page of Bitrise

If you are a Workspace owner on Bitrise, you will have to use the **Single Sign-On** tab to set up a SAML SSO connection between your SAML SSO provider and your Bitrise Workspace.

1. On your Bitrise [Dashboard](https://app.bitrise.io/dashboard/builds) click your avatar, then click [**Profile settings**](https://app.bitrise.io/me/profile#/overview) in the dropdown. ![Account selector dropdown](/img/account-settings-dropdown.png)
2. The **Overview** page displays all the Workspaces you’re a member of. Select the Workspace where you wish to set up the SAML SSO connection.
3. On the left menu bar, click the **Single Sign-On** which will take you to the **Enable Single Sign-On** page.![](/img/enablesinglesignonpage.png)
4. Continue with [adding Bitrise to Okta](/team-management/organizations/setting-up-okta-sso-for-bitrise/#adding-bitrise-to-okta).

## Adding Bitrise to Okta

Bitrise is not an integrated app in Okta. You have to add Bitrise manually to Okta first, then you can configure SAML SSO on it.

We will be jumping back and forth from the Bitrise Workspace account to Okta so make sure both pages are available. In practice this means the Workspace owner should be logged into Bitrise and the Okta admin should be logged into Okta.

 1. Log into Okta and click **Admin**.![](/img/add-apps-okta.jpg)
 2. On your Dashboard click **Add Applications** under **Shortcuts**.![](/img/okta-shortcuts.jpg)
 3. Click the green **Create New App** button.
    ![](/img/okta-create-new-app.jpg)
    The **Create a New Application Integration** screen is displayed.
 4. Select **SAML 2.0** option at **Sing on method** and click **Create**.![](/img/okta-create-new-app-pop-up.jpg)
 5. At **General Settings** step, type Bitrise into the **App name** field. (Optionally, you can add an app logo if you wish.) Click **Next**.![](/img/okta-general-settings.jpg)
 6. Head over to your Bitrise Workspace and click the **Single Sign On** tab on the left menu.
 7. Click the **Copy Link** button to copy the **Assertion Consumer Service URL (ACS URL)**.
 8. Head back to Okta's **SAML Settings** and paste the copied URL from Step 7. to the **Single sign on URL** input field.
 9. Type Bitrise at the **Audience URI (SP Entity ID)**.

    You can download the Okta certificate file now, and paste its content or upload the file itself in the **SAML SSO provider certificate** field on your Bitrise Workspace's **Single Sign-On** page. Even easier if you leave it for later as you will need to fill out the **Assertion Consumer Service URL (ACS URL)** on Bitrise anyway. You will fetch this while configuring Bitrise as a SAML app on Okta. Do not hit **Configure SSO** on the **Single Sing-On** page of Bitrise just yet.![](/img/saml-settings-okta-2.jpg)
10. Click **Next**.
11. Fill out the **Feedback** section. Hit **Finish**.

Congrats! Bitrise has been successfully added to Okta as an app.

## Configuring Bitrise as a SAML app

1. Click the **Assignments** tab of your Bitrise app.

   Here you can assign Bitrise to individuals/groups. Make sure you assign Bitrise to all Workspace members who will access the Bitrise Workspace through SAML.![](/img/okta-assign-user.jpg)
2. Click the **Sign-On** tab of your Bitrise app. You will see that SAML setup is not completed yet. Click **View Setup Instructions**.![](/img/view-setup-instructions.jpg)
   The **How to Configure SAML 2.0 for Bitrise application** page is displayed. It summarizes all the information you need to set up the SAML connection between Bitrise and Okta.![](/img/configure-bitrise-okta-1.jpg)
3. Copy the **Identity Provider Single Sign-On URL** and paste it in your Bitrise Workspace's **SAML SSO provider Single Sign-On URL (SSO URL)**.

   If you haven't pasted the Certificate's content or uploaded the file itself into the **SAML SSO provider certificate** field of your Bitrise Workspace yet, you can do so now as it is displayed on this page.
4. Click **Configure SSO** on your Bitrise Workspace.
5. Continue with [Authorizing SAML SSO](/team-management/organizations/setting-up-okta-sso-for-bitrise/#authorizing-saml-sso).

## Authorizing SAML SSO

Now that the Workspace owner has set up SAML SSO, everyone in the Workspace has to authorize SAML SSO before logging in to their Workspace via SAML SSO.

1. Make sure you’re logged into Bitrise in the usual way. Use the same browser window to continue.
2. Bitrise sends a verification e-mail to all Workspace members. By clicking the **Log In via SAML SSO** button or using the provided URL, Workspace members can authorize themselves for SAML SSO login. The email also shows the Workspace owner’s email address (in case you would need to contact them.) Click the **Log In via SAML SSO** button or copy-paste the URL to a NEW TAB of the same browser.
3. You’re directed to Bitrise to **Allow “Workspace name” to sign you in** page.
   * Click **Authorize** if you trust the Workspace to control your Bitrise account sign-in process.  
     If you’re already logged in to your SAML SSO provider, you’ll be automatically taken to your Bitrise Dashboard.  
     If you’re not, you’ll be prompted to log in on your SAML SSO provider’s site, and then taken to your Bitrise Dashboard.
   * Click **Don’t Allow** if the invitation email is from an untrusted source.

     ![SAML SSO in Workspaces](https://devcenter.bitrise.io/img/enable-saml.jpg)

     Note that if you are using a different non-matching email address, you will get the below error message. Make sure you log in with the right email address both on Bitrise, as well as on your SSO provider site.![](/img/noconnectedsamlsso.png)

If all went well, you should be landing on our Bitrise Dashboard. As a Workspace owner, you might want to check how Workspace members are progressing with their SAML SSO connection check Workspace member’s SAML SSO statuses or invite new members to the Workspace.

## What's next?

Learn how you can:

* [Check out Workspace member’s SAML SSO statuses](/team-management/organizations/saml-sso-in-organizations/#checking-saml-sso-statuses-on-bitrise) once the connection is up.
* [Invite new members with SAML SSO.](/team-management/organizations/saml-sso-in-organizations/#inviting-new-workspace-members-with-saml-sso)
* [Enforce SAML SSO login](/team-management/organizations/saml-sso-in-organizations/#enforcing-saml-sso-on-a-workspace) to the Workspace once all Workspace members have authorized their SAML SSO connection to the Workspace.
* [Log into your Workspace](/team-management/organizations/saml-sso-in-organizations/#logging-in-via-saml-sso-with-a-bitrise-account) now that SAML SSO is set up.
* [Disable SAML SSO](/team-management/organizations/saml-sso-in-organizations/#disabling-a-workspaces-saml-sso) on an Workspace.