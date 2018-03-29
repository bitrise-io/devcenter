SSH keys serve the role of secure transfer between services. In the case of Bitrise, it will ask for your permission to be authorized at your git source provider, e.g. GitHub. Read more about how to [authorize Bitrise](/adding-a-new-app/connecting-a-repository).

The reason behind the need for being authorized, is that Bitrise has to have a working SSH connection to your repository to be able to clone it. There are several ways to make it work. Automatically, by adding it manually, or by using your own key.

!!! warning "Use SSH URLs everywhere"
    Most services support SSH key based authentication **only** for SSH URLs (ex: `git@github.com:bitrise-io/bitrise.git`), and **not** for HTTPS URLs (ex: `https://github.com/bitrise-io/bitrise.git`)! This means, that **every private repository you want to use have to be addressed with the SSH URL**. If you have direct private git repo references in your `Podfile` you'll have to use the SSH URL there as well! Same applies for `submodules` and every other private git repository URL you want to use with the SSH key you register on [Bitrise.io](https://www.bitrise.io/)!

## Automatic setup

In case of `GitHub` and `Bitbucket` repository setups, Bitrise will generate a public and private SSH key pair and ask whether you like the idea of adding that into your repository automatically as deploy key, or you'd like to add it by hand.

![Screenshot](/img/adding-a-new-app/bitrise_auto_add_ssh_key.png)

As the description tells, you are able to auto-add the key to the repository if you have admin rights for it. In any other case, you are able to copy the public key from here and add it to your repository at your provider.

The auto-add option will add the generated key as a read-only [deploy key](https://developer.github.com/guides/managing-deploy-keys/#deploy-keys) to your repository, it's the best for your security.

## Manual setup

If you have private dependencies, you have to add the generated SSH key manually to your profile at your provider instead. That's because deploy keys are only valid for only one repository.

!!! note "A bot user"
    There's an easy way to work around modifying your own profile by adding a \"bot\" user with the SSH key to the repositories. **Add the SSH key you would like to use to the user and add the user to the projects**. You don't have to add the \"bot\" user with read and write permission, it is enough to assign read permissions. After that you can use the SSH key to clone to the repository or any submodule. It’s that simple.

!!! warning
    **Do not** add the key to the repository Deploy Keys. Add it to the user's account who has access to the repositories.

### GitHub

![Screenshot](/img/adding-a-new-app/ssh-github.png)

### Bitbucket

![Screenshot](/img/adding-a-new-app/ssh-bitbucket.png)

### GitLab

![Screenshot](/img/adding-a-new-app/ssh-gitlab.png)

### Use your own key

This option can be used if you also have the private key of the given user. You just have to paste the private key and [Bitrise](https://www.bitrise.io) will be able to access the repositories.
