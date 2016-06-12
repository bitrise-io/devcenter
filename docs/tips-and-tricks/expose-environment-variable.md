You can expose Environment Variables from one Step,
to make it available for every other Step performed after the Step during the build.
An example might be that you want to generate a
release note which you want to use in a message or deploy step.
Exposing environment variables is really easy,
you just have to use [envman](https://github.com/bitrise-io/envman/) if you want to make it available for every other Step.

A very simple example might be:

```
envman --add MY_RELEASE_NOTE --value "This is the release note"
```

You can call `envman` in any Step, including a script step,
or even in your own script (stored in your repository) if you call it from a `bitrise` build.

Envman can be used in a couple of ways.
You can specify the value as the `--value` parameter (you can see this in the previous example),
pipe the value:

```
echo 'hi' | envman add --key MY_RELEASE_NOTE
```

or read the value from a file:

```
envman add --key MY_RELEASE_NOTE --valuefile ./some/file/path
```

You can read more about how `envman` can be used on it's [GitHub page](https://github.com/bitrise-io/envman/).