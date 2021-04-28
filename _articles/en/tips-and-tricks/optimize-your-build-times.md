---
title: Optimizing your build times
menu:
  tips-and-tricks:
    weight: 21

---
You can improve your build times with the following tips.

**Feel free to suggest other ways of optimization!**

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

## Turn off the "Clean build" option of Xcode Steps

All Xcode Steps at Bitrise have an option called **Do a clean Xcode build...?**. With this option, you can tell the Step whether to perform a full, completely clean build of your Xcode project when it runs, or alternatively, to access the cache of previous Xcode Steps in the same Workflow. 

Setting this option to `no` can speed up your build by reducing the compilation time of the Step. However, if you have only one Xcode Step - for example, **Xcode Archive & Export for iOS** - in your Workflow, that one Step will always have to do a clean Xcode build. 

Please note that this option does NOT mean that the Step can access the build cache of different builds. This option is only relevant if you have several Xcode Steps in the same Workflow. 

## Other

**Feel free to suggest other ways of optimization!**

* [Guarding Against Long Compiles](http://khanlou.com/2016/12/guarding-against-long-compiles/)
* [Stay updated with Swift compiling tips](https://github.com/fastred/Optimizing-Swift-Build-Times)

{% include banner.html banner_text="Let's optimize build times" url="https://app.bitrise.io/dashboard/builds" button_text="Go to your app" %}