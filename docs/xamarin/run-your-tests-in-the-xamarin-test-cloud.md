To add [Xamarin Test Cloud](https://xamarin.com/test-cloud) to your Xamarin application,
go to your app's `Workflow` tab on [bitrise.io](https://www.bitrise.io) to open the Workflow Editor.

## Xamarin Test Cloud for iOS apps

In the Workflow Editor [add](/getting-started/manage-your-bitrise-workflow/#add-a-new-step)
the `Xamarin Test Cloud for iOS` step to the workflow.
After adding the step you should set the following parameters:

* **Path to Xamarin UITest Project**: The relative path to your test project _(relative to the repository's root directory)_
* **User email**: Your Xamarin user's email address
* **Api key**: Your Xamarin Test Cloud API key
* **Device selection id**: The device id that you would like to use

## Xamarin Test Cloud for Android apps

In the Workflow Editor [add](/getting-started/manage-your-bitrise-workflow/#add-a-new-step)
add the `Xamarin Test Cloud for Android` step to the workflow.
After adding the step you should set the following parameters:

* **Path to Xamarin UITest Project**: The relative path to your test project _(relative to the repository's root directory)_
* **User email**: Your Xamarin user's email address
* **Api key**: Your Xamarin Test Cloud API key
* **Device selection id**: The device id that you would like to use
