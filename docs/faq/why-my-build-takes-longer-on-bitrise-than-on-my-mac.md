First of all you have to determine which step(s) consume significant time,
to identify what can possibly be improved.

If your dependency step (e.g. CocoaPods) is the one which takes a long time then you might be able to speed it up
by using the Bitrise Build Cache feature.
You can find more information at [Using the Build Cache](/caching/about-caching).
This is also true for any step which might include network communication, addressing 3rd party web services,
which might temporarily not be available or might be slow due to high demand.

If the long build time is not related to a dependency step or to a step which accesses a 3rd party service,
and it's related to an Archive or Test step, which only performs calculations on the Virtual Machine
and does not access an outside service then you should check this list which explains
why it might take more time on Bitrise.io than on your Mac/PC:


## Local build caches

Local build caches on your Mac/PC: most of the tools you use (e.g. Xcode) does generate a lot of local build cache,
to speed up subsequent builds.
These caches help a lot to decrease the build time on your Mac/PC, but these are not available on [bitrise.io](https://www.bitrise.io).

*Note: You can test how much these caches improve the build time by running the same step (e.g. Xcode Archive) two times during your build.
The second one will be significantly faster than the first one,
because of the available local build caches Xcode generates.*

On [bitrise.io](https://www.bitrise.io) every build runs in a clean Virtual Machine.
No file is stored after your build finishes, the whole Virtual Machine is destroyed,
and the next build will start in a clean Virtual Machine again.

**The lack of local build caches is important to improve the reliability of your project**,
but it slows down the build process. Why it's important?
In your local build caches there might be files which are not under version control.
This can result in a situation where although you can build your project on your Mac/PC someone
who just git clones it and builds it the first time will have an error.
You can find more information about this issue at:
[Works in local but not on Bitrise.io](/ios/frequent-ios-issues/#works-in-local-but-not-on-bitriseio).

This issue is eliminated by using clean virtual machines on [bitrise.io](https://www.bitrise.io),
where only the code and dependencies you specify (which are under version control, and are reproducible) are available.
If it works there then it'll work on a brand new Mac/PC too,
when a new colleague joins your team and starts to work on the project.


## Network Resources

Additionally to Local build caches, if your project requires dependencies
which have to be retrieved from the Internet it'll add time to the build process.

For example, when you build your iOS project on your Mac and you use CocoaPods,
you usually don't have to run `pod install`, only when your CocoaPods dependency list changes.
If you don't commit your Pods into your repository then this process (to download the required dependencies)
have to be performed for every build in a clean environment.

Possible solutions:

* Commit your dependencies into your repository -
  read more: [Should I commit my dependencies into my repository?](/faq/should-i-commit-my-dependencies-into-my-repository)
* Cache your dependencies in Bitrise Build Cache -
  read more: [Using the Build Cache](/caching/about-caching)


## Raw performance

We always try to improve the overall performance of the build infrastructure,
but you'll most likely have more powerful hardware.

Right now we use a private vSphere network for hosting the OS X virtual machines,
and Google Compute Engine for hosting the Linux (Android) virtual machines.

Cloud environments are fantastic to provide reproducible build environments,
but virtualization requires additional resources on top of the resources exposed to the virtual machine / build environment.
You can try this on your own Mac/PC: running the same compilation directly on your Mac/PC
will be faster than doing it in a Virtual Machine.

*We do our best to improve the performance whenever we can, and feel free to reach out to us if you have any suggestion!*

## Tips & Tricks to optimize build times

You can also find a guide [here](/tips-and-tricks/optimize-your-build-times)
about how you can optimize your build times.
