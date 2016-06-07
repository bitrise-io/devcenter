After [Setting up the SSH key](/adding-a-new-app/setting-up-ssh-keys) to your project Bitrise will download your code to make sure it can access the repository and run an automatic repository scanner script to find the best initial configuration for your project.
Currently Bitrise will detect `iOS`, `Android`, `Xamarin` and `fastlane` projects out of the box.

## Project configuration with automatic repository scanner

To validate and automatically scan your project you only need to tell Bitrise the default branch of your repository. During validation Bitrise will make sure it has access to the given branch, using the [SSH key](/adding-a-new-app/setting-up-ssh-keys) you set up.

After successful validation Bitrise will scan your repository and give you a default workflow
