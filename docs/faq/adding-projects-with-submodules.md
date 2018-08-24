## The Problem

A common issue is that you have a project, that has one or more submodules
or other private repository dependencies.

This means that you have to grant access to all repositories in order to make
the build successful.

If your git hosting service supports it, the best, most secure way is to
register __the same SSH key__ for every repository you have to access during the build,
as "Deployment keys". Due to technical reasons (true for most git hosting services),
you should not use multiple SSH keys, instead use the same SSH key for every repository!

__If your git hosting service does not support the use of a single SSH key
for multiple repositories__ (for example GitHub does not support this!),
you'll have to register the SSH key for a user account.

In this case (e.g. GitHub), there is an easy workaround for the issue.
Simply by adding a "bot" / "machine" user with the SSH key to the repositories
you can solve the problem. **Add the SSH key you would like to use to the user and add the user to the projects**.
You don't have to add the "bot" user with read and write permission,
it is enough to assign read permissions.
After that you can use the SSH key to clone to the repository or any submodule.
It's that simple.

*On GitHub this is the recommended way to solve this problem,
they refer to these kind of users as "machine"
users - reference:
[https://developer.github.com/guides/managing-deploy-keys/#machine-users](https://developer.github.com/guides/managing-deploy-keys/#machine-users).*

Of course it's not required to use a special "bot" / "machine" user, you can add the
SSH key to your own account on the git hosting service, but the best practice is
to use a machine user for this use case, and grant read only access for this
machine user, for those repositories you want to access during the build.

*On GitLab and Bitbucket it's possible to register a single SSH key
as Deploy key to multiple repositories, without the need to create a "bot" / "machine" user.*


!!! note "Use SSH URLs everywhere"
    Most services support SSH key based authentication **only** for SSH URLs
    (ex: `git@github.com:bitrise-io/bitrise.git`), and **not** for HTTPS URLs
    (ex: `https://github.com/bitrise-io/bitrise.git`)!
    This means, that **every private repository you want to use have to be addressed with the SSH url**.
    If you have direct private git repo references in your `Podfile` you'll have to
    use the SSH url there as well! Same applies for submodules and every other private
    git repository url you want to use with the SSH key you register on [Bitrise.io](https://www.bitrise.io/)!


## How to do this when you add a new app

There are three options to grant [Bitrise](https://www.bitrise.io) access to your repository:

* _Auto-add SSH keypair_: __Don't use this option if you use submodules.__
  This option will add the SSH key only to the main repository, the one you selected
  in the first section of the Add New App page.
* _Generate SSH keypair_: will generate a key for you on the [Bitrise](https://www.bitrise.io) website
  and you will have to copy it manually to the given user.
  __This is the recommended option if you want to use submodules / have to access multiple repositories during your build.__
* _Use your own SSH keypair_: can be used if you also have the private key of the given user.
  You just have to paste the private key and [Bitrise](https://www.bitrise.io) will be able to access the repositories.
  If you'd want to go with this option, it's important that __the SSH key have to be an RSA key, without a passphrase!__
  You can find an example of how you can generate a key like that [here](/faq/how-to-generate-ssh-keypair/).

## When you already registered your App on Bitrise.io

When you've already registered an App, the steps to handle the SSH keys are the same
as when adding a new app, the only difference is
that you'll have to do it on the app's `Settings` tab.

You can find the public SSH key of the app in the `Settings` of the given
app on [Bitrise](https://www.bitrise.io). Simply scroll down to the "SSH settings" section
and click "Show SSH Public Key".

Copy the key to the given user and you are ready to build!
Or you can also update the given app's SSH key by clicking the "Change SSH Keypair" button
and choosing one of the three options, just like on the "Add new App" page.

## Service specific notes / guides

### Github

*Don't add the key to the repository as a Deploy Key!*
Add it to a GiHub User's account instead, who has access to the repositories.
The recommended way is to use a ["machine" user](https://developer.github.com/guides/managing-deploy-keys/#machine-users),
but of course you're free to add it to any user account which has
at least read only access to all of the repositories used during the build.
