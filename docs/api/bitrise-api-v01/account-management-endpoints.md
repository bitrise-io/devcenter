[`GET /me`: Get information about your account.](#get-me)

[`GET /users/USER-SLUG`: Get information about a specific user account.](#get-usersuser-slug)

[`GET /organizations/ORG-SLUG`: Get information about a specific organization account.](#get-organizationsorg-slug)

### GET /me

You can use this endpoint to get information about your account (identified by the Access Token).

#### Example `curl` request

```
curl -H 'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/me'
```

#### Example response

```
{
  "data": {
    "avatar_url": "https://secure.gravatar.com/avatar/f50ae2f0652b92e9dbdcc7b8d9d348a0",
    "slug": "8e82ac7601178f17",
    "username": "api-demo"
  }
}
```

### GET /users/USER-SLUG

Get information about a specific user account.

#### Example `curl` request

```
curl -H 'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/users/USER-SLUG'
```

#### Example response

```
{
  "data": {
    "avatar_url": "https://secure.gravatar.com/avatar/f50ae2f0652b92e9dbdcc7b8d9d348a0",
    "slug": "8e82ac7601178f17",
    "username": "api-demo"
  }
}
```

### GET /organizations/ORG-SLUG

Get information about a specific organization account.

#### Example `curl` request

```
curl -H 'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/organizations/USER-SLUG'
```

#### Example response

```
{
  "data": {
    "avatar_icon_url": "https://bitrise-public-content-production.s3.amazonaws.com/org-icons/default_avatar-01.png",
    "name": "APIDemoOrg",
    "slug": "e1ec3dea540bcf21"
  }
}
```
