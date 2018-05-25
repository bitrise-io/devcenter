[`GET /apps`: Retrieve the apps you have access to.](#get-apps)

[`GET /users/USER-SLUG/apps`: List the apps of a specific user.](#get-usersuser-slugapps)

[`GET /organizations/ORG-SLUG/apps`: List the apps of a specific organization.](#get-organizationsorg-slugapps)

[`GET /apps/{APP-SLUG}`: Get a specific app's data.](#get-appsapp-slug)

### GET /apps

Retrieve the apps you have access to. This includes the apps created / owned by you, as well as apps where you're a Team member (either added directly, or through an Organization's Group). All the apps you have access to (similar to the Dashboard on [bitrise.io](https://www.bitrise.io).

_Note: the `/me/apps` endpoint is also working and the same as above, but it's deprecated_

#### Example `curl` request

```
curl -H 'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps?limit=2'
```

#### Example response

```
{
  "data": [
    {
      "is_disabled": false,
      "is_public": false,
      "owner": {
        "account_type": "organization",
        "name": "APIDemoOrg",
        "slug": "e1ec3dea540bcf21"
      },
      "project_type": "ios",
      "provider": "github",
      "repo_owner": "bitrise-samples",
      "repo_slug": "sample-apps-ios-swift-xcode6",
      "repo_url": "https://github.com/bitrise-samples/sample-apps-ios-swift-xcode6.git",
      "slug": "93f256e365d929d3",
      "status": 1,
      "title": "sample-apps-ios-swift-xcode6"
    },
    {
      "is_disabled": false,
      "is_public": false,
      "owner": {
        "account_type": "user",
        "name": "api-demo",
        "slug": "8e82ac7601178f17"
      },
      "project_type": "xamarin",
      "provider": "github",
      "repo_owner": "bitrise-samples",
      "repo_slug": "sample-apps-xamarin-cross-platform",
      "repo_url": "https://github.com/bitrise-samples/sample-apps-xamarin-cross-platform.git",
      "slug": "f46e89061e967f27",
      "status": 1,
      "title": "sample-apps-xamarin-cross-platform"
    }
  ],
  "paging": {
    "next": "13533d589b89fb4b",
    "page_item_limit": 2,
    "total_item_count": 5
  }
}
```

#### Sorting parameters for app list

There are two available sorting parameter for this endpoint:

- **`created_at`:** descending order by the `created_at` attribute (default)
- **`last_build_at`:** it's ordered by `last_build_at` attribute in descending order,

##### Example `curl` request

Request:

```
curl -H 'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps?limit=2&sort_by=last_build_at'
```

Response:

```
{
  "data": [
    {
      "is_disabled": false,
      "is_public": false,
      "owner": {
        "account_type": "organization",
        "name": "APIDemoOrg",
        "slug": "e1ec3dea540bcf21"
      },
      "project_type": "ios",
      "provider": "github",
      "repo_owner": "bitrise-samples",
      "repo_slug": "sample-apps-ios-swift-xcode6",
      "repo_url": "https://github.com/bitrise-samples/sample-apps-ios-swift-xcode6.git",
      "slug": "93f256e365d929d3",
      "status": 1,
      "title": "sample-apps-ios-swift-xcode6"
    },
    {
      "is_disabled": false,
      "is_public": false,
      "owner": {
        "account_type": "user",
        "name": "api-demo",
        "slug": "8e82ac7601178f17"
      },
      "project_type": "android",
      "provider": "github",
      "repo_owner": "bitrise-samples",
      "repo_slug": "sample-apps-android-sdk22",
      "repo_url": "https://github.com/bitrise-samples/sample-apps-android-sdk22.git",
      "slug": "669403bffbe35909",
      "status": 1,
      "title": "sample-apps-android-sdk22"
    }
  ],
  "paging": {
    "next": "13533d589b89fb4b",
    "page_item_limit": 2,
    "total_item_count": 5
  }
}
```

### GET /users/USER-SLUG/apps

List apps for a specific user. Only those applications with be listed in this response for which you have the required access rights. This endpoint works the same way as the `/apps` one so you can use the same parameters too.

_Note: this endpoint doesn't work with the `/me` subroute_

#### Example `curl` request

```
curl -H 'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/users/USER-SLUG/apps?limit=2'
```

#### Example response

```
{
  "data": [
    {
      "is_disabled": false,
      "is_public": false,
      "owner": {
        "account_type": "user",
        "name": "api-demo",
        "slug": "8e82ac7601178f17"
      },
      "project_type": "xamarin",
      "provider": "github",
      "repo_owner": "bitrise-samples",
      "repo_slug": "sample-apps-xamarin-cross-platform",
      "repo_url": "https://github.com/bitrise-samples/sample-apps-xamarin-cross-platform.git",
      "slug": "f46e89061e967f27",
      "status": 1,
      "title": "sample-apps-xamarin-cross-platform"
    },
    {
      "is_disabled": false,
      "is_public": false,
      "owner": {
        "account_type": "user",
        "name": "api-demo",
        "slug": "8e82ac7601178f17"
      },
      "project_type": "macos",
      "provider": "github",
      "repo_owner": "bitrise-samples",
      "repo_slug": "sample-apps-osx-10-12",
      "repo_url": "https://github.com/bitrise-samples/sample-apps-osx-10-12.git",
      "slug": "13533d589b89fb4b",
      "status": 1,
      "title": "sample-apps-osx-10-12"
    }
  ],
  "paging": {
    "next": "669403bffbe35909",
    "page_item_limit": 2,
    "total_item_count": 4
  }
}
```

### GET /organizations/ORG-SLUG/apps

List the apps for a specific organization. It works the very same way as the `/users/USER-SLUG/apps` endpoint.

_Note: this endpoint doesn't work with the `/me` subroute_

#### Example `curl` request

```
curl -H 'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/organizations/USER-SLUG/apps?limit=2'
```

#### Example response

```
{
  "data": [
    {
      "is_disabled": false,
      "is_public": false,
      "owner": {
        "account_type": "organization",
        "name": "APIDemoOrg",
        "slug": "e1ec3dea540bcf21"
      },
      "project_type": "ios",
      "provider": "github",
      "repo_owner": "bitrise-samples",
      "repo_slug": "sample-apps-ios-swift-xcode6",
      "repo_url": "https://github.com/bitrise-samples/sample-apps-ios-swift-xcode6.git",
      "slug": "93f256e365d929d3",
      "status": 1,
      "title": "sample-apps-ios-swift-xcode6"
    }
  ],
  "paging": {
    "page_item_limit": 2,
    "total_item_count": 1
  }
}
```

### GET /apps/{APP-SLUG}

Get a specific app's data.

#### Example `curl` request

```
curl -H 'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG'
```

#### Example response

```
{
  "data": {
    "is_disabled": false,
    "is_public": false,
    "owner": {
      "account_type": "user",
      "name": "api-demo",
      "slug": "8e82ac7601178f17"
    },
    "project_type": "android",
    "provider": "github",
    "repo_owner": "bitrise-samples",
    "repo_slug": "sample-apps-android-sdk22",
    "repo_url": "https://github.com/bitrise-samples/sample-apps-android-sdk22.git",
    "slug": "669403bffbe35909",
    "status": 1,
    "title": "sample-apps-android-sdk22"
  }
}
```
