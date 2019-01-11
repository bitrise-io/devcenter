---
title: Connecting a repository
redirect_from:
- https:/getting-started/adding-a-new-app/connecting-your-repository
menu:
  adding-a-new-app:
    weight: 2

---
After you've selected adding a new app, you will find yourself on the `Create app` page.

Select your app's privacy setting: it can be either public or private.

* Private apps are only accessible to you, your organization members and those who are invited to work on an app. They require authentication to access the repository of the app.
* [Public apps](/adding-a-new-app/public-apps) expose their `bitrise.yml` and their build logs to everyone. If you have the build URL of a public app, you can view its build log, to help with troubleshooting, for example. Public apps do not require authentication and they cannot have SSH keys.

Bitrise will give you options to connect any kind of git repository to it. `GitHub`, `GitLab` and `Bitbucket` are supported out of the box.

If you've already authorized Bitrise, for example, with your GitHub,
you will see Bitrise automatically listing all your repositories, so you can just click on the one you'd like to connect.

{% include message_box.html type="note" title="Connect any git repository to Bitrise" content="
You can connect any private or public git repository to Bitrise. We will automatically create an SSH key that you can use to setup the connection with your provider.
"%}

![](/img/connect-repo.jpg)

If you haven't [authorized Bitrise](/getting-started/adding-a-new-app/connecting-account-bitrise) against the provider hosting your repository, it will ask for permission.

![](/img/bitbucket-created.jpg)

It will then list your repositories as above. If you'd like to connect git repository hosted by other than GitHub or Bitbucket,
select the `Other / Manual` tab.

![](/img/other.jpg)

You will have to add the git url of the repository you would like to connect.

{% include message_box.html type="warning" title="Use SSH URLs for private repositories" content=" Please note, that if you are connecting a private repository, Bitrise will try to clone it through SSH, so it's necessary to provide an SSH URL to your repository here. "%}

Bitrise will add an SSH key to your repository at a later step.
Read more about how to add SSH keys automatically, or manually at [SSH keys](/adding-a-new-app/setting-up-ssh-keys/).