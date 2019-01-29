---
# jp title missing
title: Step properties
menu:
  bitrise-cli:
    weight: 9

---

{% include not_translated_yet.html %}

### Step properties

Step properties provide important data of a Step, such as its project type, its source code or the dependencies it requires. A Step's inputs and outputs are also defined as step properties. Let's take a look at the properties!

* `title`, `summary` and `description` : metadata, for comments, tools and GUI.
  _Note: these meta properties can be used for permanent comments. Standard YML comments
  are not preserved when the YML is normalized, converted to JSON or otherwise
  generated or transformed. These meta properties are._
* `website` : official website of the Step / service.
* `source_code_url` : the url where the Step's source code can be viewed.
* `support_url` : url to the Step's support / issue tracker.
* `published_at` : _auto-generated at share_ - the StepLib publish date of the Step's version
* `source` : _auto-generated at share_ git clone information.
* `asset_urls` : _auto-generated at share_ Step assets (StepLib specific), like icon image.
* `host_os_tags` : supported operating systems. _Currently unused, reserved for future use._
* `project_type_tags` : project type tags if the Step is project type specific.
  Example: `ios` or `android`. Completely optional, and only used for search
  and filtering in Step lists.
* `type_tags` : generic type tags related to the Step.
  Example: `utility`, `test` or `notification`.
  Similar to `project_type_tags`, this property is completely optional, and only used for search
  and filtering in Step lists.
* `deps` : specifies the required dependencies of the Step. To declare a dependency, specify a package manager and then the dependency you wish to install.

An example: 
`yaml deps: brew: - name: curl - name: git`

* `inputs` : inputs (Environments) of the Step. For more info, see [Step inputs](/bitrise-cli/step-inputs).
* `outputs` : outputs (Environments) of the Step. For more info, see [Step outputs](/bitrise-cli/step-outputs).
