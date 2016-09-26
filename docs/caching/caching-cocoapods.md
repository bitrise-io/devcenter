1. Put the `Cache:Pull` step after the `Git Clone`, and before the `CocoaPods Install` step
2. Put the `Cache:Push` step to the very end of the Workflow
3. Select the `Cache:Push` step and specify the following paths for caching (Cache Paths inputs):
   <pre><code>./Pods -> ./Podfile.lock</code></pre>


!!! note
    If your Podfile and Pods directory is not in the root of your repository then you should specify the
    path relative to the repository root, e.g. `./subdir/Pods -> ./subdir/Podfile.lock`

That's all. This specification (using the `->` separator) means that the `./Pods` directory
should be cached, and that the cache should be updated/uploaded only if the `./Podfile.lock` file changes.

## Example workflow

```yml
example:
  steps:
  - git-clone: {}
  - cache-pull: {}
  - cocoapods-install:
  - certificate-and-profile-installer: {}
  - xcode-archive:
  - cache-push:
      inputs:
      - cache_paths: "./Pods -> ./Podfile.lock"
```
