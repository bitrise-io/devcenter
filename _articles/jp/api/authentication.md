---
title: Authentication
redirect_from: []
date: '2019-03-29T16:55:28.000+00:00'
menu:
  api-main:
    weight: 2

---
{% include not_translated_yet.html %}

## Authentication

The current API supports only one type of authentication: user generated **Personal Access Tokens**. Organizations do not have their own access tokens.

**Every API endpoint requires authentication**, except the "root" URL ([https://api.bitrise.io](https://api.bitrise.io "https://api.bitrise.io")).

### Acquiring a Personal Access Token

1. Sign in on [bitrise.io](https://www.bitrise.io).
2. Go to your **Account Settings** page.
3. Select the [Security](https://www.bitrise.io/me/profile#/security) tab on the left side.
4. Click the `Generate new token` button to create a new Personal Access Token.
5. Save the generated token.

{% include message_box.html type="important" title="Availability of the generated token" content=" The generated token is shown only once: when it's generated. There's no way to see the token value again! You can of course generate as many Access Tokens as you like, and delete the ones you don't need anymore. "%}

### Authenticating with the API

To provide the required access token, you have to add a **HEADER** to your requests, with the key `Authorization` and the value of your token.

An example API call with auth, using `curl`:

    curl -H 'Authorization: THE-ACCESS-TOKEN' https://api.bitrise.io/v0.1/me