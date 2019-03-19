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

```  
ssh-keygen -t rsa -b 4096 -P '' -f ./bitrise-ssh -m PEM  
```

Register the app by calling the `register` endpoint and setting all required parameters. You need to set your git provider, the repository URL, the slug of the repository as it appears at the provider, and the slug of the owner of the repository. 

```bash
curl -X POST -H 'Authorization: ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/register' -d '{"provider":"github","is_public":false,"repo_url":"git@github.com:api_demo/example-repository.git","type":"git","git_repo_slug":"example-repository","git_owner":"api_demo"}'
```

Once done, set up the SSH keys you created so that Bitrise can clone your repository when running a build. This requires setting three parameters:

- `auth_ssh_private_key`: Your private key. 
- `auth_ssh_public_key`: Your public key.
- `is_register_key_into_provider_service`:  A boolean that specifies if you want to register the public SSH key at your git provider automatically. If it's set to `false`, do not forget to register the public key manually at your git provider!

``` bash
curl -X POST -H 'Authorization: ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/register-ssh-key' -d '{"auth_ssh_private_key":"your-private-ssh-key","auth_ssh_public_key":"your-public-ssh-key","is_register_key_into_provider_service":false}'
```

Finish the app registration process by calling the `finish` endpoint. This endpoint allows you to configure your applications: 

- project type (for example, Android, iOS, or cordova)
- the stack that will be used to run the builds
- initial configuration settings

You can also set environment variables, as well as immediately specify an organization that will be the owner of the application.

``` bash
curl -X POST -H 'Authorization: ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/finish' -d '{"project_type":"ios","stack_id":"osx-vs4mac-stable","config":"default-ios-config","mode":"manual","envs":{"env1":"val1","env2":"val2"},"organization_slug":"e1ec3dea540bcf21"}'
```

You're done! Your new app is ready: you can launch your first build!

## Managing an existing app 

With the API, you can:

- List all the apps that belong to the current authorized user.
- Listing all the information about a specific app.
- List apps belonging to a specified user account. 
- List all apps belonging to an organization account. 

You can also manage the app's `bitrise.yml` file: you can either download the application's current file or upload a new `bitrise.yml` file that will overwrite the old one. 