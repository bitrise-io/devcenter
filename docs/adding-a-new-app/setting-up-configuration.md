After [Setting up the SSH key](/adding-a-new-app/setting-up-ssh-keys) for
your project, Bitrise will download your code to make sure it can access the repository
and will run an automatic repository scanner script to find the best initial configuration for your project.
Currently Bitrise will detect `iOS`, `Android`, `Xamarin` and `fastlane` projects out of the box.

You can configure other types of projects too, but that will require manual
configuration.


## Project configuration with automatic repository scanner

To validate and automatically scan your project you only need to tell Bitrise
the default branch of your repository.
During validation Bitrise will make sure it has access to the given branch,
using the [SSH key](/adding-a-new-app/setting-up-ssh-keys) you set up.

After successful validation Bitrise will scan your repository and give you a default workflow


## Skipping the scanner - full manual configuration

If for some reason you want to skip the scanner, you can choose
the **Configure manually without project scanning** option,
in the **Validation setup** section.

![Configure manually without project scanning](/img/adding-a-new-app/validation_configure_manually.png)

By choosing this option [bitrise.io](https://www.bitrise.io/) will only
validate the access to the repository, but it won't run the scanner.
Instead, it'll present you the manual configuration options
in the *Project build configuration* section.
