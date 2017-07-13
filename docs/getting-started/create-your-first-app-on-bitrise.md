We are always refining our UI and UX, to achieve the best and smoothest experience possible,
but at the same time give you enough room for experimentation and customization.

Because of the very reason of us believing that you should be able to do everything you want with Bitrise,
some parts may seem a bit complex at first glance.

This guide will help you get your first app up and running on Bitrise. Let's dive in!

First of all you have to open the [Add New App page](https://www.bitrise.io/apps/add),
either by clicking `Add` on the [Dashboard](https://www.bitrise.io/dashboard),
or selecting `Add new App` in the Account drop down menu (top right corner).

## 1. Code repository setup

The first step of adding an app is to specify where its code is stored.

You can either choose any one of [GitHub.com](https://github.com/), [Bitbucket.org](https://bitbucket.org/) or [GitLab.com](https://gitlab.com/) or add an other location manually.

### GitHub / Bitbucket / GitLab

Under Connect your repository just choose the git hosting service for the repo you want to add to Bitrise.
(If you haven't connected your GitHub, Bitbucket or GitLab account yet on your profile, click on the green button to do so here.) Now you can see all your repos listed and a Search field in case you have many of them. If you hover on the repository names, you can get a glimpse of their descriptions, too.
Your personal repos are separated from the ones that belong to an organization or other user.

Select the repository from the list to proceed to the next step.

!!! note "Why does Bitrise need write permissions on Github/Bitbucket/GitLab?"
    There are two things that Bitrise couldn't do without write permissions:

    - Adding an SSH key to the selected repository
    - Registering a Webhook for the repository

    Please note, that __if you want to avoid giving Bitrise write permissions,
    you can select `Other / Manual`__ instead, and do the setup yourself.

### Other / Manual setup option

Paste your HTTPS git clone URL where Bitrise can access your code and click on `Next` to proceed.


## 2. Setup repository access

You need to specify how Bitrise will be able to access the source code. Depending on whether or not you have admin rights to the repo

### Auto-add the SSH key Bitrise generated for you

_This option is available for GitHub, Bitbucket and GitLab.com repositories,
if you have your account connected to your Bitrise account._

This is the easieast, fastest way. You can just click on `Auto add`
__if you have admin rights to the repo__ you selected.

### Copy the public key Bitrise generated

If you use other repos for your build, you have to copy the __public key__ and __register it as an account SSH key__ on your git hosting service (*not* as a deployment key).
You can also use this option if you don't have admin rights to the repo, or if the repository is not hosted on GitHub, Bitbucket or GitLab.com or if you use submodules and want to use the same SSH key for multiple repositories.
If you use submodules or private Cocoapods,
use this guide: [Adding projects with submodules](/faq/adding-projects-with-submodules/)

### Use your own keypair

You can paste your existing SSH __private key__ on Add own SSH tab.
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

You don't have to do anything in this section: a validation
is started automatically based on the setup you have just finished. 
You can check the progress and the logs of the validation while it runs,
and the errors and warnings in case the scanner would generate any.


## 5. Project build configuration

Platform selection: We try to detect on validation whether you added an Android, iOS, or Xamarin project,
or any other project type the [scanner](https://github.com/bitrise-core/bitrise-init) supports.
If we succeed, you can either Confirm the settings or Edit them.
If we fail to detect it, you have to select one and configure it manually.

We will also try to detect your build configuration automatically, based on your project settings / project
files in the repository.


## 6. Webhook setup

To have Bitrise __automatically start a build every time you push code into your repository__ you can set up a webhook at your code hosting service which will automatically trigger a build on Bitrise with the code you push to your repository.

If we have permission for adding webhooks automatically to the source code hosting service you use, you can add the webhook in this section with a single click or you can skip this step (unrecommended).

!!! warning "Error: Webhook registration failed"
    If you see a message like this, that means that you don't have admin rights to the repo,
    so no webhook could be created. Contact the administrator, register the webhook manually (see link to the guide below)
    or skip this step if you're OK with starting builds manually (not advised).

You can find the webhook setup guide [here](/webhooks/),
if you'd have to do this manually.


## 7. Congratulations, you have set up your first app on Bitrise.io!

After you are done in the "webhook" section, a build is triggered automatically
for your app, with the base configuration detected and generated by
the "Repository validator / scanner". At this point you should have
a base working configuration, which you'll be able to improve and change
to fit your project's development process.
