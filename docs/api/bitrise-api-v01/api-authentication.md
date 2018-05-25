## Authentication

The current API supports only one type of authentication, user generated __Personal Access Tokens__.

Right now __every API endpoint requires authentication__, there's no endpoint which you can call without including the authentication information, except the "root" URL ([https://api.bitrise.io](https://api.bitrise.io)).

To acquire a Personal Access Token for your user, sign in with that user on [bitrise.io](https://www.bitrise.io), go to your __Account Settings__ page, and select the [Security](https://www.bitrise.io/me/profile#/security) tab on the left side.

Here you can manage your account's Two Factor Authentication settings, as well as your Personal Access Tokens.

To get started with the API simply click the __Generate new token__ button, and save the generated Personal Access Token somewhere safe.

__Important note: the generated token is shown only once, when it's generated!__ There's no way to see the token value again! You can of course generate as many Access Tokens as you like, and delete the ones you don't need anymore.

Once you have the token you can start interacting with the API.

To provide the required access token you have to add a __HEADER__ to your requests, with the key `Authorization` and value `token THE-ACCESS-TOKEN`.

An example API call with auth, using `curl`:

```
curl -H 'Authorization: token THE-ACCESS-TOKEN' https://api.bitrise.io/v0.1/me
