1. Put the `Cache:Pull` step after the Git Clone
2. Put the `Cache:Push` step to the very end of the Workflow
3. Select the `Cache:Push` step and specify the following paths for caching (Cache Paths input):

   ```
   $HOME/.gradle
   ./.gradle
   ```
4. Select the `Cache:Push` step and specify the following paths for update-check ignore (Ignore Paths from change check input):
   
   ```
   $HOME/.gradle/caches/*.lock
   ./.gradle/*.lock
   ./.gradle/*.bin
   ```

## Example workflow
```yml
example:
  steps:
  - git-clone@3.2.0: {}
  - cache-pull: {}
  - gradle-runner@1.3.1:
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
