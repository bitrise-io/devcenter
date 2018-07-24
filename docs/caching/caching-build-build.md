
You can pass artifacts from one build to another with the [`Bitrise.io Cache:Pull`](https://www.bitrise.io/integrations/steps/cache-pull) and [`Bitrise.io Cache:Push`](https://www.bitrise.io/integrations/steps/cache-push) steps in your workflow. Insert the `Bitrise.io Cache:Pull` step right after the `Git Clone Repository` step and the `Bitrise.io Cache:Push` step at the end of your workflow. Note, that in the first build there is no cache archive yet that can be downloaded with the `Bitrise.io Cache:Pull` step. Once the first build has successfully run on Bitrise, the cache archive files will be uploaded to the cloud storage with the `Bitrise.io Cache:Push` step. The next build will be able to access the files stored on the cloud with the `Bitrise.io Cache:Pull` step.

!!! important
    You can create a cache archive of the files that were created during the building of your master branch or of the a new build that was NOT started by a pull request.

!!! warning "Pull requests and caching"
    If there is a build, which has been triggered by a pull request, the build will only perform a **cache pull** but NOT **cache push**!

## Configure caching in the `Bitrise.io Cache:Push` step

1. Open the `Bitrise.io Cache:Push` step in your `Workflow Editor`.

2. Set the path of your files OR the directory you want to be cached in the `Cache paths` field.

    * Here you can set as many paths for your files as you wish.

        !!! warning "Invalid path"
            If you have set an invalid path, it will not hinder the step from running and collecting all the files it possibly can. A warning message will be displayed about the invalid path though.

    * You can specify an update indicator file with this syntax: `update/this -> if/this/file/is/changed`. Note that the indicator can only be a file!

 3.  Set the path to the items you want the cache to **ignore** in the `Ignore Paths from change check` field.

     *  Paths must be prefixed with `!` to get ignored from the cache archive. If you don't prefix the path with an `!`, the path will NOT get ignored from the cache archive.
     If a path is located inside a specified cache path item and the path is NOT prefixed with an `!`, the path will be included in the cache archive, but it will not be checked for changes.

     To ignore a path element, part of a path or exclude a full directory, check out these elements:

     * `*` replaces a path element, for example, `a/*/b` will match `a/x/b`.

     * `**` replaces a part of the path, for example, `a/**/b` will match `a/x/y/z/b`.

     * `/` excludes a full directory if `/` is placed AFTER a directory, for example, `/my/full/path` will look like this `/my/full/path/`.

        !!! warning "Invalid cache item"
            You can't ignore a path which results in an invalid cache item.

            For example, if you specify `a/path/to/cache` path to be cached, you can't ignore `a/path/to`, as that would ignore every file and wouldn't check for changes, hence no fingerprint could be generated for `a/path/to/cache`.

            You can, however, ignore paths INSIDE a cache path. For example, if your path is `a/path/to/cache`, you can ignore `a/path/to/cache/.ignore-me`, unless that's the only file inside `a/path/to/cache`.

From now on, the cache archive will be available in the next builds with the `Bitrise.io Cache:Pull` step.

!!! note
    Our `Gradle Runner` step, all our Android steps, and some dependency steps have cache input fields so you can configure caching there as well. This way you can cache all files (or only dependencies, or nothing). The files will get cached for the cache archive, once the `Bitrise.io Cache:Push` step runs.
