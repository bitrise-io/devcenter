1. Put the `Cache:Pull` step after the Git Clone
2. Put the `Cache:Push` step to the very end of the Workflow
3. Select the `Cache:Push` step and specify the following paths for caching (Cache Paths input):
   <pre><code>$HOME/.gradle
./.gradle</code></pre>
4. Select the `Cache:Push` step and specify the following paths for update-check ignore (Ignore Paths from change check input):
   <pre><code>$HOME/.gradle/caches/*.lock
./.gradle/*.lock
./.gradle/*.bin</code></pre>

## Example workflow

```yml
example:
  steps:
  - git-clone: {}
  - cache-pull: {}
  - gradle-runner:
      inputs:
      - gradle_file: "$BITRISE_PROJECT_PATH"
      - gradle_task: "$GRADLE_TASK"
  - cache-push:
      inputs:
      - cache_paths: |-
          $HOME/.gradle
          ./.gradle
      - ignore_check_on_paths: |-
          $HOME/.gradle/caches/*.lock
          ./.gradle/*.lock
          ./.gradle/*.bin
```
