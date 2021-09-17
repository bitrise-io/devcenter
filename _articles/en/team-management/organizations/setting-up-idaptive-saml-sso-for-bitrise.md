---
tag:
- teams
- org
- security
- sso
title: Setting up Idaptive SAML SSO for Bitrise
redirect_from: []
summary: ''
menu:
  organizations:
    weight: 25

---
This guide provides step-by-step instructions on setting up Bitrise as a SAML application on [Idaptive](https://www.idaptive.com/ "https://www.idaptive.com/").

{% include message_box.html type="important" title="SAML SSO is only available on the Velocity plan" content="Please note that SAML SSO is only available for a Workspace on the [Velocity plan](https://www.bitrise.io/pricing).

Since the SAML SSO feature is tied to the Velocity plan, if you decide to switch to a different subscription plan, you will lose this feature. All Workspace members will receive an email about the downgrade and you’ll have two weeks to switch back to Velocity if you wish to use SAML SSO in your Workspace again.

"%}

## Before you start

* As with other [Workspace management actions](/team-management/organizations/members-organizations/), only the Workspace owner can set up SAML SSO to a Bitrise Org.
* You must be logged into your Admin Portal on [Idaptive](https://www.idaptive.com/) to set up Bitrise as a SAML SSO app and establish the connection between Bitrise and Idaptive. If you are using the **User Portal**, **Switch to** **Admin Portal** by clicking your avatar on Idaptive.

![{{ page.title }}](/img/step1.jpg)

* Your account on Bitrise has a Workspace with the [Velocity plan] (https://www.bitrise.io/pricing). If it doesn’t have an Org, go ahead and [create one](/team-management/organizations/creating-org/). Setting up SAML SSO is the same for existing and brand new Orgs on Bitrise.

## Navigating to the Single Sign-On page of Bitrise

If you are a Workspace owner on Bitrise, you will have to use the **Single Sign-On** tab to set up a SAML SSO connection between your SAML SSO provider and your Bitrise Org.

1. On your Bitrise [Dashboard](https://app.bitrise.io/dashboard/builds) click your avatar, then click [**Profile settings**](https://app.bitrise.io/me/profile#/overview) in the dropdown. ![Account selector dropdown](/img/account-settings-dropdown.png)
2. The **Overview** page displays all the Orgs you’re a member of. Select the Workspace where you wish to set up the SAML SSO connection.![](/img/overview-tab.jpg)
3. On the left menu bar, click the **Single Sign-On** which will take you to the **Enable Single Sign-On** page.![](/img/enablesinglesignon.jpg)
4. Continue with [Getting configuration information from Idaptive](/team-management/organizations/setting-up-idaptive-saml-sso-for-bitrise/#getting-configuration-information-from-idaptive).

## Getting configuration information from Idaptive

 1. Log into Idaptive as an Admin.
 2. Go to **Apps,** then to **Web Apps**. Click the **Add Web Apps** button on the right.![{{ page.title }}](/img/step2.png)
 3. On the **Custom** tab and select **SAML**, and click **Add**. On the **Add Web App** popup hit **Yes**. **Close** the window. You will be automatically directed to the **Settings** page.

    ![{{ page.title }}](/img/step3.png)
 4. Add Bitrise to the **Name** and **Application ID** fields on the **Settings** page and click **Save**.

    ![{{ page.title }}](/img/step-name.jpg)

    ![{{ page.title }}](/img/step4b.jpg)
 5. Click **Trust** on the left menu bar and select the **Manual configuration** under **Identity Provider Configuration**.
 6. Click the **Signing Certificate** dropdown and download the certificate. Open it with a text editor so that you can copy the full content of the certificate. You can also upload the file.

    ![{{ page.title }}](/img/download.jpg)
 7. Insert the content or upload the file itself in the **SAML SSO provider certificate** text box on the **Enable Single Sign-On** page of Bitrise.
 8. Copy the **Single Sign On URL** from the **Trust** page of Idaptive. Insert it on the **SAML SSO provider Single Sing-On URL (SSO URL)** field on the **Enable Single Sign-On** page of Bitrise.
 9. While on the **Single Sign-On page** of Bitrise, copy the **Assertion Consumer Service URL (ACS URL)** URL and click **Configure SSO**.
10. Now let’s head back to Idaptive! Under **Service Provider Configuration** click **Manual Configuration**. Type **Bitrise** in the **SP Entity ID / Issuer / Audience** and paste the **Assertion Consumer Service URL (ACS URL)** from Bitrise to the **Assertion Consumer Service (ACS) URL** on Idaptive.

    ![{{ page.title }}](/img/manual-config.jpg)
11. Scroll down to **NameID Format** and select **emailAddress**. Click **Save**.

    ![{{ page.title }}](/img/name-id.jpg)
12. Go to **Permissions** and click the **Add** button. In the **Select User, Group, or Role** popup, type the user name you want to add to the SAML app. Select it and hit **Add**. Save your changes. This will change the status of your Bitrise SAML app to **Deployed**.

    ![{{ page.title }}](/img/step10.png)
13. Continue with [Authorizing SAML SSO](/team-management/organizations/setting-up-idaptive-saml-sso-for-bitrise/#authorizing-saml-sso).

## Authorizing SAML SSO

Now that the Workspace owner has set up SAML SSO, everyone in the Workspacehas to authorize SAML SSO before logging in to their Workspace via SAML SSO.

1. Make sure you’re logged into Bitrise in the usual way. Use the same browser window to continue.
2. Bitrise sends a verification e-mail to all Workspace members. By clicking the **Log In via SAML SSO** button or using the provided URL, Workspace members can authorize themselves for SAML SSO login. The email also shows the Workspace owner’s email address (in case you would need to contact them.) Click the **Log In via SAML SSO** button or copy-paste the URL to a NEW TAB of the same browser.![](/img/email-samlssso.jpg)
3. You’re directed to Bitrise to **Allow “Workspace name” to sign you in** page.
   * Click **Authorize** if you trust the Workspace to control your Bitrise account sign-in process.  
     If you’re already logged in Idaptive, you’ll be automatically taken to your Bitrise Dashboard.  
     If you’re not, you’ll be prompted to log into Idaptive, and then taken to your Bitrise Dashboard.
   * Click **Don’t Allow** if the invitation email is from an untrusted source.

     ![SAML SSO in Workspaces](https://devcenter.bitrise.io/img/enable-saml.jpg)

     Note that if you are using a different non-matching email address, you will get the below error message. Make sure you log in with the right email address both on Bitrise, as well as on your SSO provider site.![](/img/noconnectedsamlsso.png)

If all went well, you should be landing on our Bitrise Dashboard.

## What's next?

Learn how you can:

* [Check out Workspace member’s SAML SSO statuses](/team-management/organizations/saml-sso-in-organizations/#checking-saml-sso-statuses-on-bitrise) once the connection is up.
* [Invite new members with SAML SSO.](/team-management/organizations/saml-sso-in-organizations/#inviting-new-workspace-members-with-saml-sso)
* [Enforce SAML SSO login](/team-management/organizations/saml-sso-in-organizations/#enforcing-saml-sso-on-a-workspace) to the Workspace once all Workspace members have authorized their SAML SSO connection to the Org.
* [Log into your Org](/team-management/organizations/saml-sso-in-organizations/#logging-in-via-saml-sso-with-a-bitrise-account) now that SAML SSO is set up.
* [Disable SAML SSO on an Org](/team-management/organizations/saml-sso-in-organizations/#disabling-a-workspaces-saml-sso).