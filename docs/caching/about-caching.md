The caching will tar all the cached directories and dependencies and store them securely in Amazon S3.
Note that if you store files which are downloaded from a CDN / cloud storage you might not see any improvement,
as downloading it from the Bitrise Build Cache storage will probably take about the same time as downloading
it from its canonical CDN / cloud storage location.
However Bitrise Caching still might help if you have reliability issues with the resource's, or dependency's canonical download location.

!!! note "Cache Expiring"
    The Build Cache related to a ___specific branch___ expires / is auto-deleted after 7 days,
    __if there's no new build on that branch in the meantime__.

    This means that __if you do builds on a specific branch every day__ (more frequently than a week),
    __it'll never expire / will never be deleted automatically__,
    but if you don't start a build on that specific branch for more than 7 days then the related cache
    will be removed, and your next build will run like the first time, when there was no cache for that branch yet.

## Setup

All you need to get started is adding two Steps to your Workflow:

* One for downloading the previous cache (if any): `Cache:Pull`
* One for checking the state of the cache and uploading it if required: `Cache:Push`

You should add the `Cache:Pull` (download) step right before you'd use the cache.
For example, in case of an iOS app, this can be between the `Git Clone` and the `CocoaPods` install steps.
If you intend to cache your `./Pods` directory you should not pull the cache before the `Git Clone`,
because `Git Clone` will create the base directory for `./Pods`.
Before the `Git Clone` step your code (and the directories your code creates when git cloned) is not available on the Virtual Machine.

The `Cache:Push` step can be the very last step in the Workflow.
The only thing you have to care about is that it should be after the step(s) which update the cached paths.
For example in case of `CocoaPods` you should put the `Cache:Push` step anywhere after the `CocoaPods` install,
because that's the step which generates, or updates the directory (`./Pods`) which is cached.

## Technical notes

The Build Cache feature is split into two parts, the `Build Cache API` and the `Steps`.

The `Build Cache API` is actually a really simple API, with only one responsibility:
you can request a download or an upload URL from the API.
Of course it also makes sure that you have the required access rights to the resource (Build Cache Archive),
but other than that its only responsibility is providing the secure - time limited and expiring - download and upload URLs.
It does not process the files.

The `Steps` are the place where the "magic" happens.
The whole logic of comparing caches to see if there was any relevant change and creating the cache archives is done by the Steps.
This also means that you can write your own Steps and implement your own comparison and compression logic.
The step just has to use the Build Cache API to get download and upload URLs, there's no restriction on the cache file format or on its content.

!!! idea "Advanced notes"
    * You can create your own Cache steps
    * You can create and use your own Build Cache server and API

## Downloading and deleting caches

You can download and delete caches, for every branch which generated a cache,
on the `Settings` tab of the app, under the `Manage Build Caches` section.

!!! note
    You can see the size of the caches and the last time a given cache was used in the popup.
