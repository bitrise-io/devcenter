---
title: Optimize your build times
menu:
  tips-and-tricks:
    weight: 9

---
You can improve your build times with the following tips.

__Feel free to suggest other ways of optimization!__

## Include your dependencies in your repository

Including your dependencies (like CocoaPods) in your repository can speed up your builds.
Once the `git clone` of your repository is done, everything will be in place to do your build.

For example, in case of CocoaPods, you can delete the CocoaPods Install step from your workflow
if you include your `Pods` directory **and** the CocoaPods generated `.xcworkspace` file in your repository.

You can read more about the pros & cons of including your dependencies in your repository at:
[Should I commit my dependencies into my repository?](/faq/should-i-commit-my-dependencies-into-my-repository/)


## Use the Build Cache

In some cases using the [Build Cache](/caching/about-caching/) feature can also help to speed up your builds.
Note: the efficiency of the Build Cache depends on the size of the files you want to cache,
as well as on the number of files you want to cache.
For more information see the [Build Cache documentation](/caching/about-caching/).


## Turn off the "Clean build" option of Xcode steps

All of our Xcode steps (Xcode Test, Xcode Archive and Xcode Analyze) have a "Do a clean Xcode build ...?" option.
You can usually turn off this option without causing any issues.

By turning off "clean build" you can speed up subsequent Xcode steps.
The first one will still have to do a full, clean build, because there's no build cache at the time it runs
(as every build runs in a brand new, clean Virtual Machine, as descibed in [Code Security](/getting-started/code-security/)),
but subsequent Xcode steps can use the build cache of the previous Xcode step(s), reducing the compilation time of the step.

## Other

__Feel free to suggest other ways of optimization!__

- [Guarding Against Long Compiles](http://khanlou.com/2016/12/guarding-against-long-compiles/)
- [Stay updated with Swift compiling tips](https://github.com/fastred/Optimizing-Swift-Build-Times)