### Step properties

Step properties provide important data of a step, such as its project type, its source code or the dependencies it requires. A step's inputs and outputs are also defined as step properties. Let's take a look at the properties!

- `title`, `summary` and `description` : metadata, for comments, tools and GUI.
  _Note: these meta properties can be used for permanent comments. Standard YML comments
  are not preserved when the YML is normalized, converted to JSON or otherwise
  generated or transformed. These meta properties are._
- `website` : official website of the step / service.
- `source_code_url` : the url where the step's source code can be viewed.
- `support_url` : url to the step's support / issue tracker.
- `published_at` : _auto-generated at share_ - step version's StepLib publish date
- `source` : _auto-generated at share_ git clone information.
- `asset_urls` : _auto-generated at share_ step assets (StepLib specific), like icon image.
- `host_os_tags` : supported operating systems. _Currently unused, reserved for future use._
- `project_type_tags` : project type tags if the step is project type specific.
  Example: `ios` or `android`. Completely optional, and only used for search
  and filtering in step lists.
- `type_tags` : generic type tags related to the step.
  Example: `utility`, `test` or `notification`.
  Similar to `project_type_tags`, this property is completely optional, and only used for search
  and filtering in step lists.
- `deps` : specifies the required dependencies of the step. To declare a dependency, specify a package manager and then the dependency you wish to install.

!!! example
    ```yaml
    deps:
      brew:
        - name: curl
        - name: git
    ```

- `inputs` : inputs (Environments) of the step. For more info, see [Step inputs](/bitrise-cli/step-inputs).
- `outputs` : outputs (Environments) of the step. For more info, see [Step outputs](/bitrise-cli/step-outputs).
