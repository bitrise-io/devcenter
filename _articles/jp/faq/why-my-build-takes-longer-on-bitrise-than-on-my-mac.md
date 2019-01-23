---
# jp title missing
title: Why does my build take longer on Bitrise than on my machine?
menu:
  faq:
    weight: 9

---

{% include not_translated_yet.html %}

If your build takes a lot of time on Bitrise, time for investigating! First, find out which step(s) take a significant time in your build.

* If your dependency steps (for example, CocoaPods Install) take a long time, try using [build caching](/caching/about-caching/) to speed it up. This is also true for any step which might include network communication, addressing 3rd party web services. which might be temporarily unavailable or might be slow due to high demand.
* If the long build time is related to an Archive or Test step, which only performs calculations on the Virtual Machine and does not access an outside service then read on - we'll explore the possible reasons. 

## Local build caches

Most of the tools you use (for example, Xcode) do a lot of local build caching to speed up subsequent builds. These caches help a lot to decrease the build time on your Mac/PC, but these are not available on [bitrise.io](https://www.bitrise.io).

{% include message_box.html type="note" title="Testing local caching on Bitrise" content="You can test how much these caches improve the build time by running the same step (for example, \`Xcode Archive & Export for iOS\`) two times during your build. The second one will be significantly faster than the first one, because of the available local build caches Xcode generates."%} 

On [bitrise.io](https://www.bitrise.io) every build runs in a clean Virtual Machine. No file is stored after your build finishes, the whole Virtual Machine is destroyed, and the next build will start in a clean Virtual Machine again.

**The lack of local build caches is important to improve the reliability of your project**, but it slows down the build process. Why it's important? In your local build caches there might be files which are not under version control. This means that if you do a git clone of your project, your build will fail as these files will not be present.  

This issue is eliminated by using clean virtual machines on [bitrise.io](https://www.bitrise.io), where only the code and dependencies you specify (which are under version control, and are reproducible) are available. If it works there then it'll work on a brand new Mac/PC too - for example, when a new colleague joins your team and starts to work on the project.

## Network Resources

If your project requires dependencies which have to be retrieved from the Internet it'll add time to the build process.

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

Cloud environments are fantastic to provide reproducible build environments,
but virtualization requires additional resources on top of the resources exposed to the virtual machine / build environment.

You can try this on your own Mac/PC: running the same compilation directly on your Mac/PC will be faster than doing it in a Virtual Machine.

_We do our best to improve the performance whenever we can, and feel free to reach out to us if you have any suggestion!_

## Tips & Tricks to optimize build times

You can also find a guide [here](/tips-and-tricks/optimize-your-build-times) about how you can optimize your build times.
