We are always refining our UI and UX, to achieve the best and smoothest experience possible,
but at the same time give you enough room for experimentation and customization.

Because of the very reason of us believing that you should be able to do everything you want with Bitrise,
it can seem a bit complex in a few parts.

This guide will help you get your first app up and running on Bitrise. Let's dive in!

First of all you have to open the [Add New App page](https://www.bitrise.io/apps/add),
either by clicking the `Add` button on the [Dashboard](https://www.bitrise.io/dashboard),
or selecting the `Add new App` option in the Account drop down menu (top right corner).

## 1. Code repository setup

The first step of adding an app is to specify where its code is stored.

You have two main options here:

1. You store your code on [GitHub.com](https://github.com/), [Bitbucket.org](https://bitbucket.org/) or [GitLab.com](https://gitlab.com/)
1. You store your code somewhere else

### GitHub / Bitbucket / GitLab

This is fairly easy. Just click on the tab where you have the repo you want to add to Bitrise.
If you haven't connected your GitHub, Bitbucket or GitLab account, click on the green button to do so.
After that you'll see all your repos listed with an option to filter them.
Your personal repos are separated from the ones that belong to an organization or other user.
If you hover on the repository names, you can get a glimpse of its description, too.
Select the repository from the list to proceed to the next step.

!!! note "Why does Bitrise need write permissions on Github/Bitbucket/GitLab?"
    There are two things that Bitrise couldn't do without write permissions:

    - Adding an SSH key to the selected repository
    - Registering a Webhook for the repository

    Please note, that __if you want to avoid giving Bitrise write permissions,
    you can select the `Other / Manual` option__, and do the setup yourself.

### Other / Manual setup option

On this tab, you just have to paste your HTTPS git clone URL where Bitrise can access your code.
Paste the URL and click on `Next` to proceed.


## 2. Setup repository access

### Auto-add the SSH key Bitrise generated for you

_This option is available for GitHub, Bitbucket and GitLab.com repositories,
if you have your account connected to your Bitrise account._

This is the easieast, fastest way. You can just click on `Auto add`
__if you have admin rights to the repo__ you selected.

### Copy the public key Bitrise generated

Copy the __public key__ to your provider's account (*not* as a deployment key).
You can use this option if you don't have admin rights to the repo,
or if the repository is not hosted on GitHub, Bitbucket or GitLab.com.

Choose this option also if you use submodules and want to use the same SSH key for multiple repositories.
If you use submodules or private Cocoapods,
use this guide: [Adding projects with submodules](/faq/adding-projects-with-submodules/)

### Use your own keypair

You can paste your existing SSH __private key__ to the text area on the bottom of this section.
__Make sure it is an RSA private key without a passphrase,__
otherwise you won't be able to use it on Bitrise.

You can find a guide [here](/faq/how-to-generate-ssh-keypair/) about
how you can generate an SSH key like this.

If you use submodules, private Cocoapods,
or have to access more than one private repository
during the build, you should check this guide: [Adding projects with submodules](/faq/adding-projects-with-submodules/)


## 3. Validation setup

In this section you have to specify a branch, which will be used in the next step:
your repository will be cloned, the specified branch will be checked out,
and our [open source project scanner](https://github.com/bitrise-core/bitrise-init)
will scan through the repository, and will construct base configuration(s)
appropriate for your project.

*You can choose to configure your project manually.
This is only recommended if you can't use the automatic
project scanner to generate a good base configuration for you.
Choose this option only if you really know what you're doing,
or if you can't use the automatic scanner!*


## 4. Validating repository

You don't have to do anything in this section. A validation
is started automatically after you finished in the previous section.
You can check the progress and the logs of the validation while it runs,
and the errors and warnings in case the scanner would generate any.


## 5. Project build configuration

Platform selection: We try to detect on validation whether you added an Android, iOS, or Xamarin project,
or any other project type the [scanner](https://github.com/bitrise-core/bitrise-init) supports.
If we succeed, only the one, corresponding tab will be active.
If we fail to detect it, you have to select one and configure it manually.

We will also try to detect your build configuration automatically, based on your project settings / project
files in the repository.


## 6. Webhook setup

If we have support for adding webhooks automatically to the source code hosting
service you use, you can add the webhook in this section with a single click.

!!! warning "Error: Webhook registration failed"
    If you see a message like this, that means that you don't have admin rights to the repo,
    so no webhook could be created. Contact the administrator, register the webhook manually as described below
    or skip this step if you're OK with starting builds manually (not advised).

Otherwise you'll see information about how you can do this manually in this section.

You can find the webhook setup guide [here](/webhooks/),
if you'd have to do this manually.


## 7. Finishing

After you finish in the "webhook" section, a build is triggered automatically
for your app, with the base configuration detected and generated by
the "Repository validator / scanner". At this point you should have
a base working configuration, which you'll be able to improve and change
to fit your project's development process.
