---
changelog: 
last_modified_at: 
tag: []
title: Setting up OneLogin SAML SSO for Bitrise
redirect_from: []
description: ''
menu:
  organizations:
    weight: 30
    title: Setting up OneLogin SSO for Bitrise

---
{% include not_translated_yet.html %}

This guide provides step-by-step instructions on setting up Bitrise as a SAML application on [OneLogin](https://www.onelogin.com/ "https://www.onelogin.com").

This requires:

* A OneLogin Administrator.
* A Bitrise Organization owner who is logged into the Organization (with [Org Elite subscription](https://www.bitrise.io/pricing/teams "https://www.bitrise.io/pricing/teams")) on [Bitrise](https://www.bitrise.io).

## Configuring Bitrise on OneLogin

 1. Log into [OneLogin](https://www.onelogin.com/ "https://www.onelogin.com/") as an Administrator.
 2. Click **Administration** on the top bar.

    ![{{ page.title }}](/img/OneLogin-administration.png)
 3. Select **Applications** and click **Add App**. This will take you to the **Find Applications** page.

    ![{{ page.title }}](/img/onelogin-addapp.png)
 4. Type `Bitrise` in the search bar and select the **SAML2.0** type from the search results.

    ![{{ page.title }}](/img/OneLogin-findapp.jpg)
 5. Click the **Configuration** tab on the left sidebar. You can change the icon and add descriptions if you wish. Make sure **Organization (Bitrise)** is ticked. Hit **Save**.

    ![{{ page.title }}](/img/add-bitrise-onelogin.jpg)
 6. Click the **Configuration** tab again and paste the **Single Sign-On URL** from your Bitrise Organization’s **Single Sign On** tab to the **Single Sign-On URL** field on OneLogin. Hit **Save**.

    ![{{ page.title }}](/img/application-details.jpg)
 7. Select **SSO** on the left sidebar.
 8. Click the **View details** for the X.509 Certificate. Copy the content of the **X.509 Certificate** and paste it to the **Certificate** field on the **Enable Single Sign-On** page of Bitrise.
 9. Go back to the **SSO** page on OneLogin and copy the **SAML 2.0 Endpoint (HTTP)** link. Paste it in the **Identity provider sign-on URL** field on Bitrise.
10. Go back to Bitrise and click **Configure SSO**.

{% include message_box.html type="note" title="Users on OneLogin and Bitrise" content="Make sure the users in your Bitrise Organization are all added to the **Users** page on OneLogin. If not, go to **Users**, then **New User** and add the new user. Don’t forget to send out an invite (**More actions** drop-down menu, **Send Invitation**) to a new user so that the user can activate their account on OneLogin. Users must be added to the newly created Bitrise app by clicking **Applications** under **User Info** and clicking the **+** sign. Make sure the added users are all Organization members on Bitrise.

![](/img/application-onelogin.jpg)"%}

If you’ve completed setting up Bitrise on OneLogin and connected it with your Bitrise Organization, then all Organization members will get an email from Bitrise which contains a link to activate their SSO connection to the Organization.

## Enabling SAML SSO on Bitrise

All Organization members (including the Organization owner) must enable their SAML SSO connection to their Bitrise Organization to use SAML SSO as a secure login method. Only once that’s done, can the Organization owner enforce SAML SSO as the single gateway to the Organization.

1. Find the email from [letsconnect@bitrise.io](mailto:letsconnect@bitrise.io "mailto:letsconnect@bitrise.io") in your inbox.
2. Make sure you are already logged into Bitrise in the usual way (using your credentials).
3. Click **Sign in via SSO** or open the URL in a new tab of the same browser where you are logged in.

   ![{{ page.title }}](/img/email-onelogin.jpg)
4. On the **Allow “Organization name”** **to sign you in** window, click **Authorize** if you trust the Organization.

You should be landing on your Bitrise Dashboard. If you go to your Organization's **Groups** tab, you can see that you are automatically added as a SAML user. All Organization members, who enable SAML SSO, appear here automatically. From now on you can log into your Bitrise Organization with SAML SSO.

{% include message_box.html type="note" title="What’s next?" content="You can [track](/team-management/organizations/saml-sso-in-organizations/#checking-saml-sso-statuses-on-bitrise) how other Organization members are getting on with enabling their SAML SSO to Bitrise. This is important since the Organization owner can only [enforce](/team-management/organizations/saml-sso-in-organizations/#enforcing-saml-sso-on-an-organization) SAML SSO on the Organization if all Organization members have enabled SAML."%}