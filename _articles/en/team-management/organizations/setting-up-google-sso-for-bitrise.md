---
title: Setting up Google SSO for Bitrise
redirect_from: []
date: '2019-03-28T11:18:49.000+00:00'
tag: []
summary: ''
menu:
  organizations:
    weight: 17

---
This guide provides step-by-step instructions on setting up Bitrise as a SAML application on Google G Suite.

{% include message_box.html type="note" title="Google administrator account" content=" Please note that you must have a Google administrator account to add Bitrise as a SAML app. "%}

## Getting configuration information from Google

1. Sign into your Google Admin Console.
2. Select **Apps**.
3. In the **APPS SETTINGS** page, click **SAML apps**.

   You will see a list of the apps with their statuses (either turned on or off). On this page you can add or remove a service and enable/disable it.
4. Click the **+** mark in the yellow circle on the bottom right corner of the screen to add Bitrise as a SAML application to the list.
5. In the **Enable SSO for SAML Application** window, click **SETUP MY OWN CUSTOM APP**.
6. In the **Google IdP Information** window, copy the **SSO URL** and click **DOWNLOAD**. ![](/img/Google-idp-information.jpg)

   You will need the SSO URL and the content of the downloaded certificate on the **Single Sign On** tab of your Bitrise organization. Then click **Next** on the bottom right corner.

Now that we have the config information, we will leave Google Admin Console for a minute and fill out the required SAML SSO fields on Bitrise.

## Configuring SAML SSO on Bitrise

1. Go back to Bitrise.
2. Click **Account Settings**.
3. Click the organization you want to add SAML SSO.
4. Click the organization's **Single Sign On** button on the left.
5. Paste the SSO URL to the **Identity provider sign-on URL** field. (Remember, you've copied this URL from the **Google IdP Information** window in your Google Admin Console).

   Paste the content of the downloaded certificate to the **Certificate** field.

   ![](/img/sso-saml-page.jpg)
6. Click the **Copy Link** button under **Single Sign-On URL** or copy the URL manually.

   You will need this in a minute in your Google Admin Console.
7. Click **Configure SSO**. Now let's head back to your Goodgle Admin Console.

## Finishing setting up Bitrise as a SAML app on Google

1. In your Google Admin Console you should see the **Basic information for your Custom App** window.
2. Add a name to the **Application Name** field. (It can be any name.)

   ![](/img/basic-info.png)
3. Click **Next**.
4. In the **Service Provider Details** window, do the following:
   * Paste the copied **Single Sign-On** URL from Bitrise's **Single Sign On** (Step 6 [above](/team-management/organizations/setting-up-google-sso-for-bitrise/#configuring-saml-sso-on-bitrise)) tab to the **ASC URL** field.
   * Type **Bitrise** to the **Entity ID** field. This time it must be Bitrise!
   * Tick the **Signed Response** box.

   ![](/img/service-provider-detail.jpg)
5. Click **Next** to proceed to the **Attribute Mapping** window.
6. Click **FINISH**.

   If all went well, this is what you should see:

   ![](/img/setup-complete.png)

## Enabling Bitrise as a SAML app on Google

1. Click **EDIT SERVICE**.

   ![](/img/turn-on-bitrise-in-console.png)
2. On the **Service Status** page, select your organization unit on the left.
3. Click **ON** to enable Bitrise 's service status.

   ![](/img/service-status.png)
4. Check your emails. You should receive a confirmation email from us (letsconnect@bitrise.io) containing a **Sign In via SSO** button. For a smoother sign-in flow, make sure you're already logged into Bitrise in another tab before you hit the **Sign In via SSO** button.
5. Click **Sign In via SSO** to proceed to our Authorization page.

   NOTE: Below error message only appears if you’ve been trying to access the Authorization page in a Safari browser.

       Error: The CORS policy for this site does not allow access from the specified Origin....

   As a workaround, we suggest you to copy the URL and paste it in a new tab. It will work! For all other browser types, you should be safely landing to the `Authorization` page.
6. Click **Authorize**.

You should be landing on your Bitrise Dashboard now. If you click **Account settings** and select the **Single Sign-On** tab from the left menu, you should see SAML SSO is enabled for your organization. Once all organization members have enabled their SAML SSO connection, you can [enforce SAML SSO on the whole organization with a simple toggle](/team-management/organizations/saml-sso-in-organizations/#enforcing-saml-sso-on-an-organization).

<div class="banner">
	<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
	<div class="deploy-text">Set up Google SSO for your Bitrise organization!</div>
	<a target="_blank" href="https://app.bitrise.io/me/profile#/overview"><button class="button">Go to your organization</button></a>
</div>