If you need something you can't find a Step for, you can always install & use tools with scripts or Script steps.

Just add a `Script` step to your Workflow, and either write your script there, or run a script from your repository.

_Passwordless `sudo` is enabled on all of our build virtual machines, so you can freely use `sudo` if you need it._

Once you have a working script, **you can also transform it into a Step** and optionally share it with others (through our StepLib).
You can find a template and more information about how you can create your own Step at: [https://github.com/bitrise-steplib/step-template](https://github.com/bitrise-steplib/step-template)

## Step by step setup

1. Open your app on Bitrise.io
2. Open the app's Workflow Editor (on the `Workflow` tab -> click `Manage Workflows`)
3. Select a Workflow
4. Click on the `+` sign (you can see this between every step), where you want to insert your Script step
5. In the step list search for "script", and click the `Add to Workflow` button on the "Script" step item.
6. Now that you have the Script step in your workflow, you just have to select it and write your script into the `Script content` input (on the right side of the Workflow Editor).

*Note: you can drag-and-drop reorder the steps in the Workflow, so you don't have to delete and re-add a step if you'd want to change the order.*

If you want to run a script from your repository you can run it from this Script step. Paths are relative to your repository's root. So, for example, if you have a Bash script at `path/to/script.sh` you can run it with this `Script content`:

```
bash ./path/to/script.sh
```

Or, in a more robust form (which is better if you want to extend the content in the future):

```
#!/bin/bash
set -ex
bash ./path/to/script.sh
```

*The `set -ex` line is recommended for every multi-line Bash script, to make your scripts easier to debug.*

You can of course run non Bash scripts too, e.g. a Ruby script:

```
#!/bin/bash
set -ex
ruby ./path/to/script.rb
```


### Examples

At this point you already have the Script step in your Workflow, and you just have to write the
script to install the dependency. How do you do that? Exactly the same way you would on
your own Mac / Linux, in your Terminal / Command Line!

#### `brew` on macOS

E.g. to install `cmake` with a script step, on macOS, using `brew`:

```
#!/bin/bash
set -ex
brew install cmake
```

Actually, the whole Script content could be as short as:

```
brew install cmake
```

Which is exactly how you would use `brew` on your Mac, but you'll most likely
add more content to the Script step sooner or later; the first
example is a more future proof Bash script template.


#### `apt-get` on Linux

E.g. to install `cmake` with a script step, on Linux, using `apt-get`:

```
#!/bin/bash
set -ex
sudo apt-get install -y cmake
```

!!! note "Don't forget the `-y` flag for `apt-get`!"
    If you don't add the `-y` ("yes") flag to the `apt-get` command, `apt-get` will
    present a prompt which you have to accept or deny __manually__.
    This is not a problem on your own Linux machine, but in a CI environment
    you can't provide manual input for `apt-get`. To prevent this issue,
    and to auto accept the prompt, just use the `-y` flag, as shown in the example.


## Advanced option: use `deps` in `bitrise.yml`

Instead of installing your tool inside the Script step, you can use the `deps` option
of the `bitrise.yml`. If you declare `deps` _for a given Step_,
the [Bitrise CLI](https://github.com/bitrise-io/bitrise)
will check if that tool is installed, and will install it for you if required.

!!! note "Available dependency managers"
    This method is the preferred way of handling (step) dependencies, as the Bitrise CLI
    will not (re)install the specified tool(s) if it's already available.
    That said, there are tools which are not available in the supported dependency managers,
    or you need a version of the tool which is not available in the dependency manager.
    In those cases you should simply install the tool inside the Script, as described above.

An example, installing `cmake` with either `apt-get` (where `apt-get` is available),
or with `brew` (on macOS):

```
deps:
  brew:
  - name: cmake
  apt_get:
  - name: cmake
```

A minimal `bitrise.yml` for demonstration:

```
format_version: 1.2.0
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git

workflows:
  test:
    steps:
    - script:
        deps:
          brew:
          - name: cmake
          apt_get:
          - name: cmake
        inputs:
          - content: |-
              #!/bin/bash
              set -ex
              which cmake
```

An advanced tip: if you want to declare a dependency which might be available from
another source (not through the package manager), then you might also want to declare the
related `binary name`. If that matches the package name (like in case of `cmake`) this is
completely optional, but in case the package does not match the binary name you can
declare it with `bin_name`. An example is AWS CLI, where the package name in both
package managers is `awscli`, but the binary itself is `aws`.

A minimal `bitrise.yml` for demonstration:

```
format_version: 1.3.0
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git

workflows:
  test:
    steps:
    - script:
        deps:
          brew:
          - name: awscli
            bin_name: aws
          apt_get:
          - name: awscli
            bin_name: aws
        inputs:
          - content: |-
              #!/bin/bash
              set -ex
              which aws
```


## Conditional execution

Additionally, you can use Environment Variables in your scripts too.
As an example, using the `PR` environment variable
(but you can use any [Available Environment Variable](/faq/available-environment-variables/),
like the ones exposed by previous steps in the Workflow),
to run different scripts in case of a Pull Request and a non Pull Request build:

```
#!/bin/bash
set -ex

if [[ "$PR" == "true" ]] ; then
  echo "=> Pull Request mode/build!"
  bash ./path/to/in-case-of-pull-request.sh
else
  echo "=> Not Pull Request mode/build!"
  bash ./path/to/not-pull-request.sh
fi
```

_Note: if you __don't__ want to run any part of the Step/script based on a variable (like `$PR`),
you don't have to implement the check in the script. You can use the `run_if` expression in
the `bitrise.yml` directly to declare in which case(s) the Step should run. Additionally,
`run_if` can be added to any step, not just to Script steps.
You can find more information about `run_if` expressions
in [this guide](/tips-and-tricks/disable-a-step-by-condition/#run-a-step-only-if-the-build-failed)._
