---
changelog: 'The guide has been updated with an example setup to explain the methods
  of accessing multiple repositories in a single build in more detail. '
last_modified_at: '2020-05-21T13:00:00.000+00:00'
title: Can I add projects with submodules or with private repo dependencies?
tag:
- git
- faq
- ssh
description: If you have a project with one or more submodules or other private repository
  dependencies (for example, CocoaPods repositories), you have to grant access to
  all repositories for a successful build.
redirect_from: []
summary: ''
menu:
  faq:
    weight: 3
    title: Can I add projects with submodules or private repository dependencies?

---
{% include message_box.html type="info" title="" content="The scope of this guide mainly covers private Bitrise apps. The Git cloning submodules and repository dependencies section briefly covers how to access multiple repositories with a public app: the process is much simpler and all you need is to make sure that all repositories have an HTTPS git clone URL. You don’t need to worry about SSH keys with public apps, as they cannot have them."%}

If you have a project with one or more submodules or other private repository dependencies (for example, CocoaPods repositories), Bitrise needs access to all repositories or submodules for a successful build. Bitrise uses SSH to access Git repositories of private apps: to grant access, you need to make sure all the repositories can be accessed with the public SSH key generated for your Bitrise app. 

There are two ways to achieve this:

* Register the same SSH key for every repository you have to access during the build. 
* Register the SSH key with a bot user and add that user to all repositories. 

Registering the same SSH key for every repository is the best, most secure way - but not all services support it. GitLab and Bitbucket does support it, GitHub, however, doesn’t. If your code is stored on GitHub, read on!  

We’ll go through the other option, using a bot user or machine user - GitHub calls them machine users - in detail. In brief, the concept is simple: you register the Bitrise public SSH key to a user and add that user to all repositories that have to be accessed for your Bitrise build. 

{% include message_box.html type="note" title="Use a machine user with read only access" content=" It is not required to use a special bot/machine user: you can add the SSH key to your own account on the git hosting service. The best practice, however, is to use a machine user, with read only access, for those repositories you want to access during the build. "%}

[GitHub itself recommends this method](https://developer.github.com/v3/guides/managing-deploy-keys/#machine-users) for accessing multiple repositories. Let’s quickly go through an example. If you already understand the concept and just need the step-by-step guide to get it done, go to the [Using a machine user to access private repositories](/#using-a-machine-user-to-access-private-repositories) section. 

{% include message_box.html type="example" title="Example multi-repository setup" content="We have a Bitrise app we’ll call MultiBit. It has a main repository and it needs to pull additional data from two other, private repositories during a Bitrise build. Our main user is called BitMan and his GitHub account is linked to his Bitrise account. To access the private repositories during the build, BitMan creates another user on GitHub, called BitBot. BitBot will be the machine user. 

Now, BitMan goes to the **Settings** tab of his Bitrise app, and copies the public SSH key. BitMan then adds the SSH key to the BitBot user on GitHub and adds BitBot to the two private repositories as a collaborator. Now BitBot has the Bitrise public key and has access to the private repositories as necessary. It’s time to test if BitMan’s setup works.

BitMan goes to Bitrise and opens the Workflow Editor. He has the **Activate SSH Key** Step in his repository so the SSH key will work. BitMan adds a **Script** Step to clone the private repositories - as the **Git Clone** Step only works with the main repository! Once all that is done, the build should work as expected. "%}

## Using a machine user to access private repositories

[A machine or bot user](https://developer.github.com/v3/guides/managing-deploy-keys/#machine-users) is a GitHub user that is not used by humans, instead it is exclusively used for automation. This is the best way to access a private repository: you create a machine user, add a public SSH key to the user, and then provide the user read access to the repository.

### Adding the machine user to your repository

1. Create a new GitHub user account, one that will serve as the machine user.
2. Go to your repository on GitHub and select the **Settings** tab.
3. On the left side menu, select **Collaborators & teams**.

   ![](/img/Collaborators.png)
4. Scroll down to the **Collaborators** window.
5. In the search input field, search for the username of your newly created account.
6. Click **Add Collaborator**.
7. Change the user permission to **Read**.

   By default, the invited collaborator's permission is **Write**. You can keep it that way, of course, but a Read permission is enough for Bitrise.

### Adding the SSH key to the machine user

In order for Bitrise to be able to use the machine user to access your repository, you must add the same SSH key to the machine user and the app on Bitrise.

When adding a new app:

1. Start the process of [adding your app on Bitrise](/getting-started/adding-a-new-app/).
2. When prompted to setup repository access, you can choose either **Automatic** or **Add own SSH**:

   ![](/img/repo-access.png)
   * If you choose **Add own SSH**, you can [generate your own SSH keypair](https://devcenter.bitrise.io/faq/how-to-generate-ssh-keypair/). Provide the generated SSH key for the app and [add the public key to your GitHub machine user](https://help.github.com/en/articles/adding-a-new-ssh-key-to-your-github-account).
   * If you choose **Automatic**, click **I need to** when asked if you need to use an additional private repository. Copy the SSH [public key to your GitHub machine user](https://help.github.com/en/articles/adding-a-new-ssh-key-to-your-github-account).
3. Finish the process.

If your app already exists:

1. Open your app on Bitrise.
2. Go to the **Settings** tab.
3. Scroll down to **SSH settings**.
4. Click the **Click to show SSH public key** button.
5. Copy the SSH public key and [add it to your GitHub machine user](https://help.github.com/en/articles/adding-a-new-ssh-key-to-your-github-account).

## Git cloning submodules and repository dependencies

You have two options when it comes to accessing multiple repositories during a Bitrise build: you either clone all the repositories on the virtual machine, and access them as needed, or you add the additional repositories as submodules to your main repo. In the latter case, you do not need to worry about cloning them: if you set up SSH access correctly, the **Git Clone** Step will take care of everything. 

If you don’t want to or can’t add your repository dependencies as submodules, read on: we’ll talk about how to clone them. 

{% include message_box.html type="important" title="Public and private apps: the differences" content="There is one important detail to keep in mind when you want to give access to all submodules or private repository dependencies for an app: the app's privacy settings determine what git URL should you use. 

* If you have a private app: use SSH URLs everywhere! Most services support SSH key based authentication only for SSH URLs (for example, git@github.com:bitrise-io/bitrise.git). Therefore every private repository you want to use have to be addressed with the SSH URL. If you have direct private git repo references in your CocoaPods Podfile, you'll have to use the SSH URL there as well. The same applies for submodules and every other private git repository URL you want to use with the SSH key you register on [Bitrise.io](https://www.bitrise.io/).
* If you have a public app: use HTTPS URLs everywhere! SSH URLs require SSH keys even if the repository is public. For security reasons, public apps CANNOT have SSH keys. As HTTPS git clone URLs do not require any authentication in the case of public repositories, they should be used for public Bitrise apps.

To change the git clone URL of a Bitrise app, go to the **Settings** tab of your app’s page, and find the **Repository URL** option. Add the appropriate URL. "%}

Note that the **Git Clone** Step only works with the main repository. If you need to access multiple private repositories, do not add multiple **Git Clone** Steps. Use **Script** Steps to clone those repositories on the Bitrise virtual machine.

To clone additional private repositories during the build: 

1. Make sure you added a user with the Bitrise public SSH key to all the repositories. 
2. Make sure you have the **Activate SSH Key** Step and the **Git Clone** Step at the start of your Workflow.
3. Add one or more **Script** Steps to clone the additional private repositories to the build. 
4. Run a build. 

And that’s it! 

{% include message_box.html type="info" title="Cloning issues" content="If you encounter issues with git cloning - for example, not all submodules are cloned - try the following command after cloning:

git submodule update --recursive --remote --merge --force"%}

## Creating SSH keys for a new private app

There are three options to grant [Bitrise](https://www.bitrise.io) access to your repository:

* Auto-add SSH keypair: Don't use this option if you use submodules.
  This option adds the SSH key to the main repository only.
* Generate SSH keypair: this generates a key for you on the [Bitrise](https://www.bitrise.io) website and you will have to copy it manually to the given user.
  This is the recommended option if you want to use submodules or have to access multiple repositories during your build.
* Use your own SSH keypair: can be used if you also have the private key of the given user.
  You just have to paste the private key and [Bitrise](https://www.bitrise.io) will be able to access the repositories.
  Keep in mind that the SSH key has to be an RSA key, without a passphrase!
  You can find an example of how you can generate a key like that [here](/faq/how-to-generate-ssh-keypair/).

## Managing SSH keys of an existing private app

You can find the public SSH key of the app in the `Settings` of the given
app on [Bitrise](https://www.bitrise.io). Scroll down to the `SSH settings` section
and click `Show SSH Public Key`.

Copy the key to the given user and you are ready to build!

If necessary, update the given app's SSH key by clicking the `Change SSH Keypair` button and choosing one of the three options.