---
title: Setting up SSH keys
redirect_from:
- "/adding-a-new-app/setting-up-ssh-keys/"
menu:
  adding-a-new-app:
    weight: 3

---
SSH keys serve the role of secure transfer between services. In the case of Bitrise, it will ask for your permission to be authorized at your git source provider, for example, GitHub. Read more about how to [authorize Bitrise](/getting-started/adding-a-new-app/connecting-a-repository).

The reason behind the need for being authorized, is that Bitrise has to have a working SSH connection to your repository to be able to clone it. There are several ways to make it work. Automatically, by adding it manually, or by using your own key.

{% include message_box.html type="warning" title="Use SSH URLs everywhere for private apps" content="
Most services support SSH key based authentication **only** for SSH URLs (for example, `git@github.com:bitrise-io/bitrise.git`), and **not** for HTTPS URLs (for example, `(https://github.com/bitrise-io/bitrise.git)`)! This means that **every private repository you want to use has to be addressed with the SSH URL**. If you have direct private git repository references in your CocoaPods `Podfile`, you'll have to use the SSH URL there as well! Same applies for `submodules` and every other private git repository URL you want to use with the SSH key you register on [Bitrise.io](https://www.bitrise.io/)!
"%}

{% include message_box.html type="note" title="Use HTTPS URLs for public apps" content="
Public apps cannot have SSH keys. If you set your app's privacy settings to Public, no authentication is required. For public apps, use HTTPS URLs.
"%}

## Automatic setup

In the case of GitHub, GitLab and Bitbucket repository setups, Bitrise will generate a public and private SSH key pair and ask whether you like the idea of adding that into your repository automatically as deploy key, or you'd like to add it by hand.

![](/img/repo-access.png)

You need admin rights to the repository to be able to auto-add the key to it. In any other case, copy the public key from here and add it to your repository at your provider.

The auto-add option will add the generated key as a read-only [deploy key](https://developer.github.com/guides/managing-deploy-keys/#deploy-keys) to your repository, it's the best for your security.

## Manual setup

If you have private dependencies or submodules, you have to add the generated SSH key manually to your profile at your provider instead. That's because deploy keys are only valid for one repository.

When the system asks if you need to use an additional private repository, click `I need to` and copy the key.

![](/img/manual-steup.png)

{% include message_box.html type="note" title="A bot user" content=" A simple workaround is adding a \"bot\" user with the SSH key to the repositories. **Add the SSH key you would like to use to the user and add the user to the projects**. It is enough to assign read permissions to the bot user. After that you can use the SSH key to clone to the repository or any submodule.
"%}

{% include message_box.html type="warning" title=" **Do not** add the key to the repository Deploy Keys!" content=" Add it to the user's account who has access to the repositories. "%}

### GitHub

![Screenshot](/img/adding-a-new-app/ssh-github.png)

### Bitbucket

![Screenshot](/img/adding-a-new-app/ssh-bitbucket.png)

### GitLab

![Screenshot](/img/adding-a-new-app/ssh-gitlab.png)

### Use your own key

This option can be used if you also have the private key of the given user. You just have to paste the private key and [Bitrise](https://www.bitrise.io) will be able to access the repositories.