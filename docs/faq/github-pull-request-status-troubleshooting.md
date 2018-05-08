If you can't see the nice little green/red CI checks status (like the one you can see on our [Blog,
about the Pull Request status feature announcement](https://blog.bitrise.io/pull-request-support-for-github))
on the Pull Request's GitHub page, you should check this list for troubleshooting.

## Make sure to select a Service credential User who has a connected GitHub account

The first requirement is that the **Service credential User** of the app on [bitrise.io](https://www.bitrise.io)
have to connect his/her GitHub account, or else [bitrise.io](https://www.bitrise.io)
won't be able to send the status messages to GitHub.

!!! note "Set the Service credential User for the app"
    You can set which Team Member's service connections should be used when Bitrise tries to communicate
    with GitHub or any other connected service (like Bitbucket or Xamarin) API.
    You can set this user on the `Team` tab of the app, in the __Service credential User__ section.
    Default is to use the Owner's credentials.

If you want to manage your connected services on [bitrise.io](https://www.bitrise.io),
just open your [Account Settings](https://www.bitrise.io/me/profile) page.
On the left side you can find the __Connected Accounts__ section,
where you can connect and disconnect other services (like GitHub, Bitbucket or Xamarin)
to your [bitrise.io](https://www.bitrise.io) account.

!!! note "Make sure you connected the correct GitHub account"
    If you have more than one GitHub account you should also check whether you connected the right one,
    which can access the repository.
    You can check which GitHub user you connected by clicking the `GitHub` text
    on your [bitrise.io](https://www.bitrise.io) [Account Settings](https://www.bitrise.io/me/profile) page,
    it will open the connected GitHub user's page.


## If your builds are triggering, but you don't see the Pull Request / Build status indicator on GitHub

If you have Pull Request testing enabled you should see a green/yellow/red CI check status indicator at every Pull Request on GitHub,
[like the one you can see on our Blog about the Pull Request status feature announcement](http://blog.bitrise.io/2015/04/23/pull-request-support-for-github-repositories.html).

If your builds are running fine but you still can't see the status indicator on GitHub:

- __Make sure that you granted access to your GitHub organization for Bitrise__.
  It might be that you did not **grant access** to the GitHub organization
  (who owns the repository) for Bitrise, so even though everything else is in place,
  GitHub will still reject the status message [bitrise.io](https://www.bitrise.io) sends to it.
  See the
  [Grant access to a GitHub Organization](/faq/grant-access-to-github-organization)
  guide for more information.
- Another thing might be that the user you specified as the
  [Service credential User](#make-sure-to-select-a-service-credential-user-who-has-a-connected-github-account)
  doesn't have **administrator rights** on GitHub **for the repository**.
  _Administrator rights are required in order to send status messages to GitHub._
  Usually you face this issue (no access to the organization) when you add your app on [bitrise.io](https://www.bitrise.io).
  If you did not select the repository from the GitHub list on the [Add New App](http://www.bitrise.io/apps/add) page,
  but rather copy-pasted your repository's URL, you still need to grant access to the organization to see
  the build status indicator on GitHub.
  See the
  [Grant access to a GitHub Organization](/faq/grant-access-to-github-organization)
  guide for more information, and make sure that you selected the right
  [Service credential User](#make-sure-to-select-a-service-credential-user-who-has-a-connected-github-account)
  for the app on [bitrise.io](https://www.bitrise.io).
- __If you renamed or transferred the repository on GitHub__.
  GitHub in general is quite good with handling repository rename and transfer,
  and usually redirects to the right url automatically, but this is not the case with the Status API.
  Fortunately the fix for this is quite simple: __Go to the `Settings` tab of your app on [bitrise.io](https://www.bitrise.io)
  and make sure that the `Repository URL` is up to date__, and does not point to the previous location of the repository,
  but to the current location of the repository.
