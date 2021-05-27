---
last_modified_at: 
tag:
- teams
- org
- security
- sso
title: Setting up OneLogin SSO for Bitrise
redirect_from: []
description: Learn how to set up Bitrise as a SAML SSO app on OneLogin, enable SAML
  SSO and enforce it on your Bitrise Organization.
changelog: ''
summary: ''
menu:
  organizations:
    weight: 29

---
This guide provides step-by-step instructions on setting up Bitrise as a SAML application on [OneLogin](https://www.onelogin.com/ "https://www.onelogin.com").

This requires:

* A OneLogin Administrator.
* A Bitrise Organization owner who is logged into the Organization (with [Org Elite subscription](https://www.bitrise.io/pricing/teams "https://www.bitrise.io/pricing/teams")) on [Bitrise](https://www.bitrise.io).

{% include message_box.html type="note" title="Before you start" content="Before connecting SAML SSO to your Organization, make sure:

* The administrator to OneLogin is at hand while setting up SAML SSO connection on Bitrise.
* As with other [Org management actions](https://devcenter.bitrise.io/team-management/organizations/members-organizations/), only the Org owner can set up SAML SSO to a Bitrise Org.
* Your account on Bitrise has an Org with [Org Elite or Velocity plan](https://www.bitrise.io/pricing). If it doesn’t have an Org, go ahead and [create one](https://devcenter.bitrise.io/team-management/organizations/creating-org/). Setting up SAML SSO is the same for existing and brand new Orgs on Bitrise.

  "%}

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
 6. Click the **Configuration** tab again and paste the **Assertion Consumer Service URL (ACS URL)** from your Bitrise Organization’s **Single Sign-On** tab to the **Single Sign-On URL** field on OneLogin. Hit **Save** in **OneLogin**.

    ![{{ page.title }}](/img/application-details.jpg)
 7. Select **SSO** on the left sidebar.
 8. Click the **View details** for the X.509 Certificate. Copy the content of the **X.509 Certificate** and paste it to the **SAML SSO provider certificate** field on the **Enable Single Sign-On** page of Bitrise.
 9. Go back to the **SSO** page on OneLogin and copy the **SAML 2.0 Endpoint (HTTP)** link. Paste it in the **SAML SSO provider Single Sign-On URL (SSO URL)** field on Bitrise.
10. Go back to Bitrise and click **Configure SSO**.![](/img/enablesinglesignon.jpg)

{% include message_box.html type="note" title="Users on OneLogin and Bitrise" content="Make sure the users in your Bitrise Organization are all added to the **Users** page on OneLogin. If not, go to **Users**, then **New User** and add the new user. Don’t forget to send out an invite (**More actions** drop-down menu, **Send Invitation**) to a new user so that the user can activate their account on OneLogin. Users must be added to the newly created Bitrise app by clicking **Applications** under **User Info** and clicking the **+** sign. Make sure the added users are all Organization members on Bitrise.

![](/img/application-onelogin.jpg)"%}

If you’ve completed setting up Bitrise on OneLogin and connected it with your Bitrise Organization, then all Organization members will get an email from Bitrise which contains a link to activate their SSO connection to the Organization.

## Enabling SAML SSO on Bitrise

All Organization members (including the Organization owner) must enable their SAML SSO connection to their Bitrise Organization to use SAML SSO as a secure login method. Only once that’s done, can the Organization owner enforce SAML SSO as the single gateway to the Organization.

1. Find the email from [letsconnect@bitrise.io](mailto:letsconnect@bitrise.io "mailto:letsconnect@bitrise.io") in your inbox.![](/img/samlinviteemail.png)
2. Click **Sign in via SSO** or open the URL in a new tab of the same browser where you are logged in.
3. On the **Almost there** page you can edit your username. Click **Finish Sign Up**.![](/img/almostherepage.png)

You should be landing on the **Welcome** page of Bitrise. Click **Dashboard** to land on your Organization's dashboard. If you go to your Organization's **Groups** tab, you can see that you are automatically added as a SAML user. All Organization members, who enable SAML SSO, appear here automatically. From now on you can log into your Bitrise Organization with SAML SSO.

{% include message_box.html type="note" title="Signing up to Bitrise with SAML SSO" content=" If you’d like to learn more about SAML SSO on Bitrise, in particular, how to sign up to Bitrise with an Organization's SAML SSO, check out our [SAML SSO in organizations guide](/team-management/organizations/saml-sso-in-organizations/). "%}

What's next? You can [track](/team-management/organizations/saml-sso-in-organizations/#checking-saml-sso-statuses-on-bitrise) how other Organization members are getting on with enabling their SAML SSO to Bitrise. This is important since the Organization owner can only [enforce](/team-management/organizations/saml-sso-in-organizations/#enforcing-saml-sso-on-an-organization) SAML SSO on the Organization if all Organization members have enabled SAML.