---
# jp title missing
title: Step inputs
menu:
  bitrise-cli:
    weight: 10

---

{% include not_translated_yet.html %}

Step inputs are environment items that tell the Bitrise CLI how to run a given step. As discussed in the [Steps](/bitrise-cli/steps) section, the default inputs can be found in the `step.yml` file of every step and the user only needs to manually set the inputs they wish to change.

Step inputs can be defined in the `step.yml` file of the project by setting the `inputs` property. They have the same syntax as every environment property. It consists of two main parts: a `KEY: value` pair and an `opts` field. The key and the value are required, the `opts` field is optional.

{% include message_box.html type="example" title="Step input example" content=" 
```yaml 
- my_key_for_the_env: my value for the env 
  opts: 
    title: An example env var item 
    is_dont_change_value: false 
    category: example
```
"%}

* `my_key_for_the_env`: the key of the environment item (required)
* `my value for the env`: the value of the item (required)
* `opts`: optional properties.

Of course, a step input can have many more properties - let's take a look at them!

* `title`, `summary` and `description` : metadata, for comments, tools and GUI.
  _Note: these meta properties can be used for permanent comments. Standard YML comments
  are not preserved when the YML is normalized, converted to JSON or otherwise
  generated or transformed. These meta properties are._
* `is_expand` : can be set to `true` or `false`. If set to `true`, the shell environment variables are expanded/resolved.
* `skip_if_empty` : can be set to `true` or `false`. If set to `true`, the input will not be used if its value is empty.
* `category` : used to categorize the input. Inputs with the same `category` will appear grouped under one menu on the website UI, for the sake of convenience.
* `value_options` : list of the available values.
* `is_required` : can be set to `true` or `false`. If set to `true`, the step requires a non-empty value to be set for the input.
* `is_dont_change_value` : can be set to `true` or `false`. If set to `true`, the value of the input should not be changed and/or should be hidden on UIs. Mainly used for debug inputs and for "**connection**" inputs (set to outputs of other steps, to connect this step with another one).
* `is_template` : can be set to `true` or `false`. If set to `true` ~~,~~ the input's value will be evaulated as a Go template.

### Using template expressions for step inputs

If you need a step to use a certain value only in certain circumstances, use template expressions as step inputs. Template expressions are evaluated before the step uses the input. They are written in Go's template language - you can read more about that [here](https://golang.org/pkg/text/template/).

Set the `is_template` property in the `step.yml` file of your project to use template expressions.

1. Open the `step.yml` file of your project.
2. Find the step in which you wish to use a template expression.
3. Add an `opts` field to the `content` of the step.
4. Add the `is_template` property to `opts` and set its value to `true`.
5. Add the template expression to the step's `content`.

**Example:**

``` Go
- script:
  title: Template example
  inputs:
  - content: |-
      {{if .IsCI}}
      echo "CI mode"
      {{else}}
      echo "not CI mode"
      {{end}}
    opts:
      is_template: true
```

Check out the template utility [on GitHub](https://github.com/bitrise-io/bitrise/blob/master/bitrise/template_util.go#L17)!
