---
# jp title missing
title: About caching
menu:
  caching:
    weight: 1

---

{% include not_translated_yet.html %}

The caching will tar all the cached directories and dependencies, and store them securely in Amazon S3.

{% include message_box.html type="info" title="When does the Build Cache gets auto-deleted?" content=" The Build Cache, related to a **specific branch**, expires/is auto-deleted after 7 days, **if there's no new build on that branch in the meantime**. This means that **if you do builds on a specific branch every day** (more frequently than a week), **it'll never expire/won't get deleted automatically**. If you don't start a build on that specific branch for more than 7 days, then the related cache will be removed, and your next build will run like the first time, when there was no cache for that branch yet.
"%}

## Setup

### Bitrise steps for caching

All you need to get started is adding two steps to your Workflow:

* `Bitrise.io Cache:Pull` step to download the previous cache (if any)
* `Bitrise.io Cache:Push` step to check the state of the cache and upload it if required

You should add the `Bitrise.io Cache:Pull` (download) step right before you'd use the cache.
For example, in the case of an iOS app, you can insert the `Bitrise.io Cache:Pull` step between the `Git Clone Repository` and the dependency installer steps (for example, the `Run CocoaPods install` or `Carthage` steps). You should not put the `Bitrise.io Cache:Push` step BEFORE the `Git Clone Repository` step.

The `Bitrise.io Cache:Push` step should be the very last step in the workflow.

You can find example build cache configurations/guides at our [build-cache discuss page](https://discuss.bitrise.io/tags/build-cache).

### Ignore files/dependencies

You can set the path to the items you want the cache to **ignore** in the `Ignore Paths from change check` field.

* Paths must be prefixed with `!` to get ignored from the cache archive. If you don't prefix the path with an `!`, the path will NOT get ignored from the cache archive.
  If a path is located inside a specified cache path item and the path is NOT prefixed with an `!`, the path will be included in the cache archive, but it will not be checked for changes.

To ignore a path element, part of a path or exclude a full directory, check out these elements:

* `*` replaces a path element, for example, `a/*/b` will match `a/x/b`.
* `**` replaces a part of the path, for example, `a/**/b` will match `a/x/y/z/b`.
* `/` excludes a full directory if `/` is placed AFTER a directory, for example, `/my/full/path` will look like this `/my/full/path/`.

{% include message_box.html type="info" title="Tips on ignoring paths" content=" You **can't ignore** a path which results in an invalid cache item. For example, if you specify \`a/path/to/cache\` path to be cached, you can't ignore \`a/path/to\`, as that would ignore every file and wouldn't check for changes, hence no fingerprint could be generated for \`a/path/to/cache\`.

You **can**, however, **ignore paths INSIDE a cache path**. For example, if your path is \`a/path/to/cache\`, you can ignore \`a/path/to/cache/.ignore-me\`, unless that's the only file inside \`a/path/to/cache\`."%}

## Download and delete caches

You can download and delete caches for every branch which generated a cache in the `Manage Build Caches` section of your app's `Settings` tab.

{% include message_box.html type="warning" title="Delete a single branch's cache" content="
If you only want to delete the cache which is related to a single branch, you should also delete the default branch's cache too! For more details, see the [If a build runs on a branch which doesn't have a cache yet, it'll get the main/default Branch's cache](#if-a-build-runs-on-a-branch-which-doesnt-have-a-cache-yet-itll-get-the-maindefault-branchs-cache) section. "%}

You can see the size of the caches and the last time a given cache was used in the popup window.

## Technical notes

### Build Cache feature

The Build Cache feature is split into two parts, the `Build Cache API` and the `Steps`.

The `Build Cache API` is a simple API, with only one responsibility: you can request a download or an upload URL from the API.
It also makes sure that you have the required access rights to the resource (Build Cache Archive), but other than that its only responsibility is providing the secure - time-limited and expiring - download and upload URLs.
It does not process the files.

The Steps are the place where the "magic" happens.
The whole logic of comparing caches (to see if there was any relevant change) and creating the cache archives is done by the Steps.
This also means that you can write your own Steps and implement your own comparison and compression logic.
The Step just has to use the Build Cache API to get download and upload URLs, there's no restriction on the cache file format or on its content.

A couple more handy tips:

* You can create your own Cache steps
* You can create and use your own Build Cache server and API

### The cache might or might not be available

You should write your code in a way that it won't fail if the cache can't be accessed.

### The cache is downloaded over the internet

This means that if you store files which are downloaded from a CDN/cloud storage, you might not see
any speed improvement, as downloading it from the Bitrise Build Cache storage will probably take about the same time as downloading it from its canonical CDN/cloud storage location.

{% include message_box.html type="important" title="When to store a dependency in Bitrise Build Cache?" content=" Storing a dependency in Bitrise Build Cache might help if you have **reliability** issues with the resource's/dependency's canonical download location. Popular tools/dependencies might get rate limited (for example, [PhantomJS](https://github.com/Medium/phantomjs/issues/501)). CDN servers might have availability issues, like jCenter/Bintray. Here are a few examples: [#1](http://status.bitrise.io/incidents/gcx1qn5lj7yt), [#2](http://status.bitrise.io/incidents/3ztgwxvwq7rm), and [#3](http://status.bitrise.io/incidents/dqpby9m1n274). If that's the case, storing the dependency in Bitrise Build Cache might help you. It might not improve the build time but **it definitely can improve the reliability**. "%}

### The cache is stored as one archive file

So if you have multiple paths you want to cache and any of the paths gets updated, **it'll update the whole cache archive**, including all the paths you cache.

### If a build runs on a branch which doesn't have a cache yet, it'll get the cache of the main/default branch

The build on a non-default branch, to speed things up, can access (read-only) the cache of the `primary` branch, until a successful build is found on the new branch. Once a build on the new branch pushes a cache, new builds on that branch will get the cache of the branch. _Caches are stored and available for every branch separately._

You can see which is your **default branch** if you click the `Settings` tab of your app.

If a build was started with a code push, the cache will be available on the push branch and will be pulled from the same push branch. If you start a Pull Request (PR), the cache of the PR source branch will be pulled and pushed to the same source branch. In the case of a tag event, there is no code change so there is nothing to cache.
