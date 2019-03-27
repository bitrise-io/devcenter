---
title: Setting up Bitrise as a SAML app on Google G Suite - draft
redirect_from: []
date: 2019-03-27 11:32:33 +0000
published: false

---
This guide provides step-by-step instructions on setting up Bitrise as a SAML application on the SAML 2.0 compatible Google G Suite.

{% include message_box.html type="note" title="Google administrator account" content=" Please note that you must have a Google administrator account to add Bitrise as a SAML app. "%}

 1. Sign into your Google Admin Console.
 2. Select `Apps`.
 3. In the `APPS SETTINGS` page, click `SAML apps` tile.

    You will see a list of the apps with their statuses (either turned on or off). On this page you can add or remove a service and enable/disable it.
 4. Click the `+` mark in the yellow circle on the bottom right corner of the screen to add Bitrise as a SAML application to the list.
 5. At the `Enable SSO for SAML Application` Step, click `SETUP MY OWN CUSTOM APP`.
 6. At the `Google IdP Information` Step, copy the `SSO URL` and click `DOWNLOAD`. ![](/img/Google-idp-information.jpg)

    You will need the SSO URL and the downloaded certificate key on the `Single Sign On` tab of your Bitrise organization. Then click `Next` on the bottom right corner.

    We will leave Google Admin Console for a minute and fill out the required SAML SSO fields on Bitrise.
 7. Go back to Bitrise.
 8. Click `Account Settings`.
 9. Click the organization you want to add SAML SSO.
10. Click the organization's `Single Sign On` button on the left.
11. Paste the `SSO URL` to the `Identity provider sing-on URL` field. Paste the content of the downloaded certificate to the `Certificate` field.

    ![](/img/sso-saml-page.jpg)
12. Copy the `Single Sign-On URL`.

    You will need this in a minute in your Google Admin Console.
13. Click `Configure SSO`.
14. Go back to the Google Admin Console. You should be at the `Basic information for your Customer App` Step.
15. Add a name to the `Application Name` field. (It can be any name.) Click `Next`.

    ![](/img/basic-info.png)
16. At the Paste `Service Provider Details` Step do the following:
    * Paste the copied `Single Sign-On` URL from Bitrise's `Single Sign On` (Step 12 above) tab to the `ASC URL` field.
    * Type `Bitrise` to the `Entity ID` field. This time it must be Bitrise!
    * Tick the `Signed Response` box.

    ![](/img/service-provider-detail.jpg)
17. Click `Next` to proceed to `Attribute Mapping` Step.
18. Click `FINISH`.

    If all went well, this is what you should see:

    ![](/img/setup-complete.png)
19. Click `EDIT SERVICE` to turn on Bitrise SAML app for everyone _who will access the organization on Bitrise (Peti)._

    ![](/img/turn-on-bitrise-in-console.png)
20. On the `Service Status` page, select `ON for everyone` to enable Bitrise 's service status. _(What will I select on the left? only Bitrise?)_

    ![](/img/service-status.png)
21. Check your emails. You should receive a confirmation email from us (letsconnect@bitrise.io) containing a `Sign In via SSO` button. For a smoother sign-in flow, make sure you're logged into Bitrise in another tab before you'd hit the `Sign In via SSO` button.
22. Click `Sign In via SSO` to proceed to our Authorization page.

    NOTE! Below error message only appears if you've been trying to access the Authorization page in a Safari browser.

        Error: The CORS policy for this site does not allow access from the specified Origin....

    We suggest you to copy the URL and paste it in a new tab. It will work! For all other browser types, you should be safely landing to the Authorization page.
23. Click `Authorize`.

You should be landing on your Bitrise Dashboard. If you click `Account settings` and select the `Single Sign-On` tab from the left menu, you should see SAML SSO is enabled for your organization. Once all organization members have enabled their SAML SSO connection, you can enforce SAML SSO on the whole organization with a simple toggle.