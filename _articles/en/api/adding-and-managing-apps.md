---
title: Adding and managing apps
redirect_from: []
date: '2019-04-05T13:31:28.000+00:00'
tag:
- apps
- api
- ssh
summary: 'Set up new apps on Bitrise with the API: add the app, generate SSH keys,
  and set up the app''s initial configuration.'
menu:
  api-main:
    weight: 9

---
Set up new apps on Bitrise with the API: add the app, generate SSH keys, and set up the app's initial configuration.

In addition, you can list all apps belonging, for example, to a single user or to a specific organization.

## Adding a new app

| Endpoints | Function |
| --- | --- |
| [POST /apps/register](https://api-docs.bitrise.io/#/app-setup/app-create) | Add a new app. |
| [POST /apps/{app-slug}/register-ssh-key](https://api-docs.bitrise.io/#/app-setup/ssh-key-create) | Add an SSH-key to a specific app. |
| [POST /apps/{app-slug}/finish](https://api-docs.bitrise.io/#/app-setup/app-finish) | Save the application at the end of the application add process. |
| [POST /apps/{app-slug}/bitrise.yml](https://api-docs.bitrise.io/#/app-setup/app-config-create) | Upload a new bitrise.yml for your application. |

There are three distinct steps to adding an app with the Bitrise API.

1. Registering the app.
2. Setting up an SSH key.
3. Finishing the app registration.

Before you start, generate [an SSH keypair](/faq/how-to-generate-ssh-keypair/):

    ssh-keygen -t rsa -b 4096 -P '' -f ./bitrise-ssh -m PEM  

Register the app by calling the `register` endpoint and setting all required parameters. You need to set your git provider, the repository URL, the slug of the repository as it appears at the provider, and the slug of the owner of the repository.

    curl -X POST -H 'Authorization: ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/register' -d '{"provider":"github","is_public":false,"repo_url":"git@github.com:api_demo/example-repository.git","type":"git","git_repo_slug":"example-repository","git_owner":"api_demo"}'

Once done, call the `register-ssh-key` endpoint to set up the SSH keys you created so that Bitrise can clone your repository when running a build. You can also set whether you want to automatically register the public key at your git provider.

    curl -X POST -H 'Authorization: ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/register-ssh-key' -d '{"auth_ssh_private_key":"your-private-ssh-key","auth_ssh_public_key":"your-public-ssh-key","is_register_key_into_provider_service":false}'

Finish the app registration process by calling the `finish` endpoint. This endpoint allows you to configure your applications: set the project type, the stack on which the build will run, and the initial configuration settings.

You can also set environment variables, as well as immediately specify an organization that will be the owner of the application.

    curl -X POST -H 'Authorization: ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/finish' -d '{"project_type":"ios","stack_id":"osx-vs4mac-stable","config":"default-ios-config","mode":"manual","envs":{"env1":"val1","env2":"val2"},"organization_slug":"e1ec3dea540bcf21"}'

You're done! Your new app is ready.

### Uploading a new bitrise.yml file

The `bitrise.yml` file contains the configuration of your builds. You can modify the current one via the API by posting a full YAML configuration. The below example shows a basic `.yml` configuration.

    curl -X POST -H 'Authorization: ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/bitrise.yml' -d '{"app_config_datastore_yaml":"app:\n  envs:\n  - BITRISE_PROJECT_PATH: build.gradle\n    opts:\n      is_expand: false\ndefault_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git\nformat_version: 1.1.9"}'

By calling this endpoint, you replace the app's current `bitrise.yml` file. You can, of course, modify this uploaded `bitrise.yml` either via the API or on the website itself.

## Managing an existing app

| Endpoints | Function |
| --- | --- |
| [GET /apps](https://api-docs.bitrise.io/#/application/app-list) | Get list of the apps. |
| [GET /apps/{app-slug}](https://api-docs.bitrise.io/#/application/app-show) | Get a specific app. |
| [GET /apps/{app-slug}/bitrise.yml](https://api-docs.bitrise.io/#/application/app-config-datastore-show) | Get the `bitrise.yml` of a specific app. |
| [GET /apps/{app-slug}/branches](https://api-docs.bitrise.io/#/application/branch-list) | List the branches of an app's repository. |
| [GET /organizations/{org-slug}/apps](https://api-docs.bitrise.io/#/application/app-list-by-organization) | Get list of the apps for an organization. |
| [GET /users/{user-slug}/apps](https://api-docs.bitrise.io/#/application/app-list-by-user) | Get list of the apps for a user. |

The response to any GET request regarding one or more applications will contain the app slug, its project type, the git provider, the repository's owner and URL:

    {
      "data": [
        {
          "slug": "eeeeefffff00000",
          "title": "sample-app",
          "project_type": "android",
          "provider": "github",
          "repo_owner": "example-user",
          "repo_url": "git@github.com:example-user/sample-app.git",
          "repo_slug": "android-gradle-kotlin-dsl",
          "is_disabled": false,
          "status": -1,
          "is_public": false,
          "owner": {
            "account_type": "organization",
            "name": "Test Org",
            "slug": "fffffeeeee00000"
          },
          "avatar_url": null
        },
        {

You can also download the existing bitrise.yml file of any app: the response will contain the full YAML configuration.