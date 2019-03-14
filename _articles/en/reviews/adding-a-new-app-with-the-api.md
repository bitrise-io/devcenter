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

1. Register the app by setting all required parameters. 

   You need to set your git provider, the repository URL, the slug of the repository as it appears at the provider, and the slug of the owner of the repository. 

   ```bash
   curl -X POST -H 'Authorization: ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG' -d '{"provider":"github","is_public":false,"repo_url":"git@github.com:api_demo/example-repository.git","type":"git","git_repo_slug":"example-repository","git_owner":"api_demo"}'
   ```

1. Once done, set up the SSH keys you created so that Bitrise can clone your repository when running a build. This requires setting three parameters:

   - `auth_ssh_private_key`: Your private key. 
   - `auth_ssh_public_key`: Your public key.
   - `is_register_key_into_provider_service`:  A boolean that specifies if you want to register the public SSH key at your git provider automatically. If it's set to `false`, do not forget to register the public key manually at your git provider!

   ``` bash
   curl -X POST -H 'Authorization: ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/register-ssh-key' -d '{"auth_ssh_private_key":"your-private-ssh-key","auth_ssh_public_key":"your-public-ssh-key","is_register_key_into_provider_service":false}'
   ```


