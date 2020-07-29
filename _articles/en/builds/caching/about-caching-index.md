---
changelog: 'New tutorial video about build caching: learn about using the dedicated
  Steps and managing your build caches on the website.'
last_modified_at: 2020-04-17
title: Caching
tag:
- 'builds '
- cache
- dependencies
description: The caching will tar all the cached directories and dependencies, and
  store them securely in Amazon S3. All you need to get started is adding two Steps
  to your Workflow.
redirect_from: "/caching/about-caching/"
menu:
  builds-main:
    identifier: caching
    weight: 1

---
{% include video.html embed_url="https://www.youtube.com/embed/o8iiHMUmAws" %}

Every single Bitrise build runs on a clean virtual machine. This means that normally, without caching, everything must be done from scratch on the virtual machine, including, for example, installing your dependencies.

With caching, you can preserve the contents of selected files and directories, including installed dependencies. And it’s very easy: you just need to use two Steps in your Workflow. The first, called **Bitrise.io Cache: Push**, stores your content in the build cache; the other, called **Bitrise.io Cache: Pull**, pulls the cache the next time you run a build.

The cache is stored as a single archive file: if the content of the cached paths changes in any way, the entire file gets updated. Every branch of your repository on which you run a build will have its own cache archive.


{% include message_box.html type="info" title="The default branch cache is used as fallback" content="If a branch does not yet have a cache saved, the default branch's cache will be used. Cache is not available for PR builds of public Bitrise apps.
"%}

{% include message_box.html type="info" title="When does the Build Cache gets auto-deleted?" content=" The Build Cache, related to a specific branch, expires after 7 days which means it is automatically deleted - but only if there's no new build on that branch in the meantime. This means that if you do builds on a specific branch more frequently than a week, the cache won't get deleted. If you don't start a build on that specific branch for more than seven days, then the related cache will be deleted, and and your next build will run like the first.
"%}

## Getting started with caching

To get started, add two Steps to your Workflow:

* **Bitrise.io Cache:Pull** Step to download the previous cache.
* **Bitrise.io Cache:Push** Step to check the state of the cache and upload it if required.

Add the **Bitrise.io Cache:Pull** Step right before you need the cache. For example, in the case of an iOS app, you can insert the **Bitrise.io Cache:Pull** Step between the **Git Clone Repository** and the dependency installer Steps (such as **Run CocoaPods install** or **Carthage** Steps). You should not put the **Bitrise.io Cache:Pull** Step BEFORE the **Git Clone Repository** Step.

The **Bitrise.io Cache:Push** Step should be the very last Step in the Workflow. In the **Cache paths** input, you can set the paths to the content you want to add to the cache archive. The default value is an Environment Variable that collects content that the different Steps cached - for example, the aforementioned **Run CocoaPods install** Step does have a caching function, too.

You can find example build cache configurations/guides at our [build-cache discuss page](https://discuss.bitrise.io/tags/build-cache).

## Ignoring files and dependencies

You can tell the **Bitrise.io Cache:Push** Step to ignore certain content: set the path or paths to the items in the  **Ignore Paths from change check** input of the Step. Change checking means that the Step checks the cache paths against the cache archive, if it exists, and if their content is changed, the cache is updated. Ignoring from change checking means that the cache archive won't be updated even if the content changes: the selected path will still be included in the cache archive but its content won't change.

If you want to completely exclude a path or several paths from the cache archive, you must prefix the paths in question with `!`. If you don't prefix the path with an `!`, the path will NOT get ignored from the cache archive.

If a path is located inside an ignored cache path item and the path is NOT prefixed with an `!`, the path will be included in the cache archive, but it will not be checked for changes.

To ignore a path element, part of a path or exclude a full directory, check out these elements:

* `*` replaces a path element, for example, `a/*/b` will match `a/x/b`.
* `**` replaces a part of the path, for example, `a/**/b` will match `a/x/y/z/b`.
* `/` excludes a full directory if `/` is placed AFTER a directory, for example, `/my/full/path` will look like this `/my/full/path/`.

{% include message_box.html type="info" title="Tips on ignoring paths" content=" You can't ignore a path which results in an invalid cache item. For example, if you specify \`a/path/to/cache\` path to be cached, you can't ignore \`a/path/to\`, as that would ignore every file and wouldn't check for changes, hence no fingerprint could be generated for \`a/path/to/cache\`.

You can**, however, ignore paths inside a cache path. For example, if your path is \`a/path/to/cache\`, you can ignore \`a/path/to/cache/.ignore-me\`, unless that's the only file inside \`a/path/to/cache\`."%}

## Downloading and deleting caches

You can download and delete caches for every branch which generated a cache.

1. Open your app on Bitrise.
1. Go to the **Settings** tab.
1. Scroll down to the **Manage Build Caches** section.
1. Click the **Manage** button.

You can see the size of the caches and the last time a given cache was used in the popup window. You can download or delete any of the cache archives, or all of them.

{% include message_box.html type="warning" title="Delete a single branch's cache" content="
If you only want to delete the cache which is related to a single branch, you should also delete the default branch's cache too! This is because if a build runs on a branch which doesn't have a cache, the **Bitrise.io Cache:Pull** Step will get the cache of the default branch. "%}

## Technical notes

The Build Cache feature is split into two parts:

- The Build Cache API.
- The Steps.

The Build Cache API is a simple API. It makes sure that you have the required access rights to the resource (the build cache archive), and provides secure - time-limited and expiring - download and upload URLs. It does not process the files.

The Steps are responsible for executing the logic of comparing caches and creating the cache archives. This means that you can write your own Steps and implement your own comparison and compression logic. The only requirement is that the Step has to use the Build Cache API to get download and upload URLs. There's no restriction on the cache file format or on its content.

Read more about developing your own Step in our dedicated guide: [Developing a new Step](/contributors/create-your-own-step/).

{% include message_box.html type="warning" title="The cache might not be available" content="It's always a good idea to write your code in a way that your builds won't fail if the cache can't be accessed.

Also, keep in mind that the cache is downloaded over the internet. Storing files that are normally downloaded from a CDN or cloud storage might not save you any time as downloading them from the Bitrise build cache storage could take as much or more time as simply downloading the files from their usual location.

Storing a resource or dependency in Bitrise Build Cache might help if you have reliability issues with the usual download location.
"%}