Bitrise has an integrated App Deployment system you can use for App and other build artifact file distribution.

With this you can distribute your iOS and Android app, over the air, for your testers (__even for those who don't have a Bitrise account__)
or you can just use it for archiving your App and other build artifact files (these files will
be available on the related Build's details page).

## How does it work?

If you want to distribute your iOS App through Bitrise all you need in your App's Workflow,
is an `Xcode Archive` step to generate the iOS app IPA,
and a `Deploy to Bitrise.io` step to distribute it.

For Android apps, use the `Gradle Runner` step to generate the APK, and use the
`Deploy to Bitrise.io` step to deploy it.

For Xamarin apps use the `Xamarin Archive step` to create the iOS/Android app,
and use the `Deploy to Bitrise.io` step to deploy it. 

For any other project type, just use the step(s) or script(s) which
can generate the app, and use the `Deploy to Bitrise.io` step to deploy it.

___One important thing if you use custom steps/scripts__: the `Deploy to Bitrise.io`
step by default deploys apps from the `$BITRISE_DEPLOY_DIR` directory, so make sure that you
move the generated app there, or set the `Deploy directory or file path` input
of the `Deploy to Bitrise.io step` to point to the location of the app file._

If the app file (`.ipa` / `.apk`) is available, the `Deploy to Bitrise.io` step will
upload it for the Build and __it will be listed on the Build's details page__.
Depending on the __notification settings__ you set for the `Deploy to Bitrise.io` step,
Bitrise.io will also send emails for the Team of the app.

For each deployed app you'll see an information and notifications card on the Build's page,
where you can check the details of the App (title, bundle id, version number, size, etc.)
and you can download or install the App right from the Build's page.

__If you built your iOS App__ with a Development or Ad-Hock Provisioning Profile,
an additional section will be presented with a list of allowed device identifiers (UDID).

If you or a team member of your App's team register a device for
his/her Bitrise account (you can do this on your [Account Settings page](https://www.bitrise.io/me/profile) in the *Test Devices* section)
and the device's identifier can be found in the Provisioning Profile,
then instead of just presenting the identifier in the list you'll see the user who registered the device and the device's name.

Visiting the Build page from an iOS device (which you registered for your account)
and you'll see an `Install` button instead of the `Download` button.
With this **you can install the App on your device directly from Bitrise**.

__For Android apps you don't have to register your test devices__,
as Android apps don't have per-device install restrictions. You'll, however,
have to enable the __"Unknown Sources"__ option in Android to be able to
install the app/apk from outside of the Google Play Store.


## Public App install page

If you enable the __Public install page__ option (of the `Deploy to Bitrise.io` step)
for the App, then a __long, random URL__ will be available for you,
which you __can be sent even to people who are not registered on Bitrise.io__.

Opening this link you'll see a base description of the
App (title, version, size, supported devices) and an `Install`
button if you visit the page from an iOS or Android device (depending on the app's
platform of course).

You can share this page with anyone, even if they don't have a Bitrise account,
but __you have to make it sure that they'll actually be able to install it__ -
if you don't use an Enterprise Provisioning Profile to build your App,
you have to add every device identifier (UDID) to the Provisioning Profile (just like you do on your Mac),
the iOS App can't be installed on any other device, only on the ones which were
included in the Provisioning Profile the build was signed with.

__You can enable or disable the App's public install page any time from the related Build page__
and **you can also set the default state** (enabled or disabled) **in your App's Workflow**
(select the `Deploy to Bitrise.io` step and set the `Enable public page for the App?` to `false`
if you don't want to automatically enable this feature).

***If you disable the Public install page for the App, then only your App's team members will be able to install the App from Bitrise,
from the Build's detail page!***

## Notifications and install invites

On the Build's page you can send install invites for your testers.
You can either send invites for a group of your team (testers, developers, admins or owner) or
(if the `Public install page` option is enabled) you can send install invites to any email address.

__Keep in mind that the install invite email contains the URL of the Public install page.__
If you invite someone who's not in your App's team and then disable the Public install page,
they won't be able to access the install page!
Those who are in your App's team will be redirected to the Build's page if the Public install page is disabled.

**You can specify the list of groups and emails for automatic install invite notification** in the App's Workflow.
Similarly to the Public page option just select the `Deploy to Bitrise.io` step in your Workflow
and specify the list of groups and emails to automatically notify in the `Notify: User Groups` and `Notify: Emails` options.

Keep in mind that if you disable the *Public install page* option,
Bitrise won't send install invite emails for the emails you specify,
only to those who are in the App's Team,
because in this case only your team members can access the App (on the Build's page).
