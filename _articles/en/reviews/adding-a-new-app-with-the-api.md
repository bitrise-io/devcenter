---
title: Managing apps
redirect_from: []
date: 2019-03-14 15:45:40 +0000
published: false

---
## Adding a new app

There are three distinct steps to adding an app with the Bitrise API.

1. Registering the app.
2. Setting up an SSH key.
3. Finishing the app registration.

Before you start, generate [an SSH keypair](/faq/how-to-generate-ssh-keypair/):

    ssh-keygen -t rsa -b 4096 -P '' -f ./bitrise-ssh -m PEM  

Register the app by calling the `register` endpoint and setting all required parameters. You need to set your git provider, the repository URL, the slug of the repository as it appears at the provider, and the slug of the owner of the repository.

    curl -X POST -H 'Authorization: ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/register' -d '{"provider":"github","is_public":false,"repo_url":"git@github.com:api_demo/example-repository.git","type":"git","git_repo_slug":"example-repository","git_owner":"api_demo"}'

Once done, set up the SSH keys you created so that Bitrise can clone your repository when running a build. You can also set whether you want to automatically register the public key at your git provider.

```bash
curl -X POST -H 'Authorization: ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/register-ssh-key' -d '{"auth_ssh_private_key":"your-private-ssh-key","auth_ssh_public_key":"your-public-ssh-key","is_register_key_into_provider_service":false}'
```

Finish the app registration process by calling the `finish` endpoint. This endpoint allows you to configure your applications:

* project type (for example, Android, iOS, or cordova)
* the stack that will be used to run the builds
* initial configuration settings

You can also set environment variables, as well as immediately specify an organization that will be the owner of the application.

    curl -X POST -H 'Authorization: ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/finish' -d '{"project_type":"ios","stack_id":"osx-vs4mac-stable","config":"default-ios-config","mode":"manual","envs":{"env1":"val1","env2":"val2"},"organization_slug":"e1ec3dea540bcf21"}'

You're done! Your new app is ready: you can launch your first build!

## Managing an existing app

With the API, you can:

* List all the apps that belong to the current authorized user.
* Listing all the information about a specific app.
* List apps belonging to a specified user account.
* List all apps belonging to an organization account.

The response to any GET request regarding one or more applications will contain the app slug, its project type, the git provider, the repository's owner and URL

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

You can also manage the app's `bitrise.yml` file: you can either download the application's current file or upload a new `bitrise.yml` file that will overwrite the old one.

### Uploading a new bitrise.yml file

The `bitrise.yml` file contains the configuration of your builds. You can modify the current one via the API by posting a full yaml configuration:

    curl -X POST -H 'Authorization: ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/bitrise.yml' -d '{"app_config_datastore_yaml":"app:\n  envs:\n  - BITRISE_PROJECT_PATH: sample-apps-osx-10-12.xcodeproj\n    opts:\n      is_expand: false\n  - BITRISE_SCHEME: sample-apps-osx-10-12\n    opts:\n      is_expand: false\ndefault_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git\nformat_version: 1.3.1\ntrigger_map:\n- push_branch: '*'\n  workflow: primary\n- pull_request_source_branch: '*'\n  workflow: primary\nworkflows:\n  deploy:\n    steps:\n    - activate-ssh-key@3.1.1:\n        run_if: '{{getenv \"SSH_RSA_PRIVATE_KEY\" | ne \"\"}}'\n    - git-clone@3.4.2: {}\n    - script@1.1.5:\n        title: Do anything with Script step\n    - certificate-and-profile-installer@1.8.4: {}\n    - xcode-test-mac:\n        inputs:\n        - project_path: $BITRISE_PROJECT_PATH\n        - scheme: $BITRISE_SCHEME\n    - xcode-archive-mac@1.4.0:\n        inputs:\n        - project_path: $BITRISE_PROJECT_PATH\n        - scheme: $BITRISE_SCHEME\n    - deploy-to-bitrise-io@1.2.9: {}\n  primary:\n    steps:\n    - activate-ssh-key@3.1.1:\n        run_if: '{{getenv \"SSH_RSA_PRIVATE_KEY\" | ne \"\"}}'\n    - git-clone@3.4.2: {}\n    - script@1.1.5:\n        title: Do anything with Script step\n    - certificate-and-profile-installer@1.8.4: {}\n    - xcode-test-mac@1.1.0:\n        inputs:\n        - project_path: $BITRISE_PROJECT_PATH\n        - scheme: $BITRISE_SCHEME\n    - deploy-to-bitrise-io@1.2.9: {}\n"}'

By calling this endpoint, you replace the app's current `bitrise.yml` file. You can, of course, modify this uploaded `bitrise.yml` either via the API or on the website itself.