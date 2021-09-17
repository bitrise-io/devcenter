---
tag: []
title: Setting up Idaptive SAML SSO for Bitrise
redirect_from: []
summary: ''
menu:
  organizations:
    weight: 24

---
This guide provides step-by-step instructions on setting up Bitrise as a SAML application on [Idaptive](https://www.idaptive.com/ "https://www.idaptive.com/").

Before you start:

* You must be one of the owners of the Bitrise Workspace to configure SAML SSO on Bitrise.
* You must be logged into your Admin Portal on [Idaptive](https://www.idaptive.com/) to set up Bitrise as a SAML SSO app and establish the connection between Bitrise and Idaptive. If you are using the **User Portal**, **Switch to** **Admin Portal** by clicking your avatar on Idaptive.

![{{ page.title }}](/img/step1.jpg)

## Getting configuration information from Idaptive

 1. Log into Idaptive as an Admin.
 2. Go to **Apps,** then to **Web Apps**. Click the **Add Web Apps** button on the right.![{{ page.title }}](/img/step2.png)
 3. On the **Custom** tab and select **SAML**, and click **Add**. On the **Add Web App** popup hit **Yes**. **Close** the window. You will be automatically directed to the **Settings** page.

    ![{{ page.title }}](/img/step3.png)
 4. Add Bitrise to the **Name** and **Application ID** fields on the **Settings** page and click **Save**.

    ![{{ page.title }}](/img/step-name.jpg)

    ![{{ page.title }}](/img/step4b.jpg)
 5. Click **Trust** on the left menu bar and select the **Manual configuration** under **Identity Provider Configuration**.
 6. Click the **Signing Certificate** dropdown and download the certificate. Open it with a text editor so that you can copy the full content of the certificate.

    ![{{ page.title }}](/img/download.jpg)
 7. Insert it in the **Certificate** text box on the **Single Sign On page** of Bitrise.
 8. Copy the **Single Sign On URL** from **Trust** page of Idaptive. Insert it on the **Identity provider sign-on URL** field on the **Single Sign On page** of Bitrise.
 9. While on the **Single Sign On page** of Bitrise, copy the Single Sign-On URL and click **Configure**.

    ![{{ page.title }}](/img/configure-sso.jpg)
10. Now let’s head back to Idaptive! Under **Service Provider Configuration** click **Manual Configuration**. Type **Bitrise** in the **SP Entity ID / Issuer / Audience** and paste the **Single Sing-On URL** from Bitrise to the **Assertion Consumer Service (ACS) URL** on Idaptive.

    ![{{ page.title }}](/img/manual-config.jpg)
11. Scroll down to **NameID Format** and select **emailAddress**. Click **Save**.

    ![{{ page.title }}](/img/name-id.jpg)
12. Go to **Permissions** and click the **Add** button. In the **Select User, Group, or Role** popup, type the user name you want to add to the SAML app. Select it and hit **Add**. Save your changes. This will change the status of your Bitrise SAML app to **Deployed**.

    ![{{ page.title }}](/img/step10.png)
13. Check your inbox for an email from [letsconnect@bitrise.io](mailto:letsconnect@bitrise.io "mailto:letsconnect@bitrise.io") which describes how to access the Workspace via SAML. This email contains a **Sign In via SSO** button and a URL. Click the link or paste the URL to a new window.

    ![{{ page.title }}](/img/saml-invitation-authentication-1.jpg)
14. You’re directed to the **Allow “Workspace name” to sign you in** page. Click **Authorize** if you trust the Workspace to control your Bitrise account-sign in process. Note that once you click **Authorize**, you’ll only be able authenticate this account via SAML SSO. Click **Don’t allow** if the invitation email is from an untrusted source.

    ![{{ page.title }}](/img/enable-saml-1.jpg)
15. If all went well, you should be landing on our Bitrise Dashboard.

If you click **Profile settings** and select the **Single Sign-On** tab from the left menu, you should see SAML SSO is enabled for your Workspace. Once all Workspace members have authorized their SAML SSO connection, you can [enforce SAML SSO on the whole Workspace with a simple toggle](https://devcenter.bitrise.io/team-management/organizations/saml-sso-in-organizations/#enforcing-saml-sso-on-a-workspace "https://devcenter.bitrise.io/team-management/organizations/saml-sso-in-organizations/#enforcing-saml-sso-on-a-workspace").