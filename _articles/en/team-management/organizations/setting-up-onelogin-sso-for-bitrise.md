---
tag: []
title: Setting up OneLogin SSO for Bitrise
redirect_from: []
summary: ''
published: false

---
This guide provides step-by-step instructions on setting up Bitrise as a SAML application on [OneLogin](https://www.onelogin.com/ "https://www.onelogin.com").

This requires:

* A OneLogin Administrator.
* A Bitrise Organization owner who is logged into the Organization (with [Org Elite subscription](https://www.bitrise.io/pricing/teams "https://www.bitrise.io/pricing/teams")) on Bitrise.

## Configuring Bitrise on OneLogin

1. Log into [OneLogin](https://www.onelogin.com/ "https://www.onelogin.com/") as an Administrator.
2. Click **Administration** on the top bar.

   ![](/img/OneLogin-administration.png)
3. Select **Applications** and click **Add App**. This will take you to the **Find Applications** page.

   ![](/img/onelogin-addapp.png)
4. Type `Bitrise` in the search bar and select the **SAML2.0** type from the search results.

   ![](/img/OneLogin-findapp.jpg)
5. Click the **Configuration** tab on the left sidebar. You can change the icon and add descriptions if you wish. Make sure Organization (Bitrise) is ticked. Hit **Save**.

