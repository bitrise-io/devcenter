It's a highly debated topic, there are obvious pros and cons
for both keeping your dependencies in or outside of your code repository.

You're of course free to do it the way you want to,
__our recommendation is that you should include your dependencies inside your repository,
whenever you can__. 

Let's see why.

* Once `git clone` is finished you'll have everything, ready for work.
  In a __CI / distributed environment__ this also means __less chance for network issues__,
  your build won't fail just because a dependency manager's server is down.
  Your builds will be __more reliable__, less error prone.
* You see every dependency update in your repository, __you can review the changes__ in `git`
  and decide whether you actually want to upgrade to a newer version or not.
  You can create a Pull Request for just the dependency updates and have it reviewed by your team.
* __It protects against disappearing packages / dependencies__.
  Yes, it can happen that packages / dependencies
  [disappear overnight from the package manager you use](http://www.theregister.co.uk/2016/03/23/npm_left_pad_chaos/),
  and you're no longer able to retrieve them.
  Keeping your dependencies in your repository makes sure that this won't break your project at the worst time.
* __Makes the build process faster__ as well, as everything is prepared for the build and
  there's no need to call dependency manager tools, nor to download the dependencies separately.
    * For example, if you use `CocoaPods` and you commit your `Pods` directory
      and your CocoaPods generated `.xcworkspace` directory (`.xcworkspace` is actually a directory, which is presented as a file in Finder)
      to your repository then you can remove the CocoaPods Install Step from your [bitrise.io](https://www.bitrise.io) workflow completely.
* No more issues with using __different versions of the dependency manager tool__.
  The most popular iOS dependency tools change quite frequently and sometimes introduce breaking changes.
  By including your dependencies inside your repository you won't have to
  rely on using the exact same version of the tool everywhere (across your team and on your CI service as well).
* No more issues with private submodules / private pods.
  As described here [Adding projects with submodules](/faq/adding-projects-with-submodules/) granting permission
  to a project which depends on private Pods, submodules or other git related dependencies can be quite hard.
  Most will simply not go through with activating and de-activating separate Deployment SSH keys
  for every dependency and will eventually just add the SSH key to their account or to a "bot" account as a personal SSH key.
  Using a bot user as described in the linked guide can be sufficient from a security perspective,
  but it's still way easier (and more secure) to just use Read Only Deployment keys.
  A given SSH key is allowed to be registered only once on GitHub, which means that you can't register
  the same SSH key for multiple repositories as Deployment Key.
  If you have every dependency in your repository you don't have to use any workaround,
  a single read only Deployment Key will be enough.
  In fact [bitrise.io](https://www.bitrise.io) registers Deployment Keys
  by default during the automatic repository setup,
  which grants access only to the specified repository.

Of course you're free to go with either solution and we'll keep working on supporting the way you work,
but we think that having full control over dependency changes
and having a more reliable setup (which is easier to work with in a remote, automation environment)
provides enough advantage in most cases.
