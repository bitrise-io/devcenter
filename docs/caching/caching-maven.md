Your build process may use [Apache Maven](https://maven.apache.org/) repositories to fetch dependencies at runtume.
For example [Roboelectric](http://robolectric.org) testing framework uses [Sonatype](https://oss.sonatype.org/content/groups/public/) to fetch target platforms and shadow-classes during a test run (unless explicitly [configured](http://robolectric.org/configuring/)).
Resolved dependencies are cached in a local Maven repository at `$HOME/.m2`
To cache it follow these steps:   
1. Put the `Cache:Pull` step after the Git Clone
2. Put the `Cache:Push` step to the very end of the Workflow
3. Select the `Cache:Push` step and add the following paths for caching (Cache Paths input):
   ```
   $HOME/.m2
   ```

## Example workflow (gradle and maven caches)
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
          $HOME/.m2
      - ignore_check_on_paths: |-
          $HOME/.gradle/caches/*.lock
          ./.gradle/*.lock
          ./.gradle/*.bin
```
