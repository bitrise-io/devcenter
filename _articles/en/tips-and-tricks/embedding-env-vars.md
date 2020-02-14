---
tag:
- env vars
- builds
- secrets
title: Using Env Vars as a value of an Env Var
redirect_from: []
summary: 'Environment Variables normally contain a single value. However, it is possible to set up an Env Var that includes other Env Vars as values. You can also use values that are normally treated as Env Vars: that is, values including the `$` character. '
menu:
  tips-and-tricks-main:
    weight: 24

---

[Environment Variables](/builds/env-vars-secret-env-vars/) normally contain a single value. However, it is possible to set up an Env Var that includes other Env Vars as values. You can also use values that are normally treated as Env Vars: that is, values including the `$` character.

## Using an Env Var as a value of an Env Var

You can, at any time, use another Environment Variable in the value of an Env Var. For example, the value of an Env Var called $BITRISE_IDENTITIES can be a list containing a username, a password, and an API key. The password and the API key would be set as Env Vars:

```
username: bitrise_user 
password: $BITRISE_PASSWORD 
api_key: $BITRISE_API_KEY
```


You also need to make sure that the key of the Env Var and the keys of any variables it contains are replaced with their values in the input. This whole process is quite simple:

1. Open your app on [bitrise.io](http://bitrise.io/ "http://bitrise.io").
2. Go to the **Workflows** tab.
3. In the **Workflow Editor**, go to the **Env Vars** or **Secrets** tab.
4. Click **Add new.**
5. Add a key and a value.

   The value can contain other Environment Variables.
6. Toggle the **Replace variables in inputs?** option.
7. Click **Save**.

And that’s it - you can run a build and the variables within your new Env Var will be expanded and you can use their values for whatever you need.

## Using the $ sign in an Env Var’s value

It’s very important to note that Bitrise treats everything starting with the $ sign as an Environment Variable. This means that if the value of an Environment Variable contains the $ sign, and the **Replace variables in inputs** option on the **Env Vars** or **Secrets** tab is toggled on, Bitrise will attempt to replace the part beginning with a $ with a value - and of course it will not find any value.

There are two solutions to this issue:

* Do not use $ in the value of your Environment Variables.
* If you do, do NOT replace your variables in inputs. In that case, they will simply be passed on to the Step as text.

<div class="banner">
	<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
	<div class="deploy-text">Now you know everything</div>
	<a target="_blank" href="https://app.bitrise.io/dashboard/builds"><button class="button">Go to Bitrise now</button></a>
</div>
