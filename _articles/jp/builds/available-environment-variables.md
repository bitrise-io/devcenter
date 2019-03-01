---
# jp title missing
title: Available environment variables
redirect_from:
- "/faq/available-environment-variables/"
- "/faq/available-environment-variables/#exposed-by-the-bitrise-cli"
menu:
  builds:
    weight: 11

---

{% include not_translated_yet.html %}

## Exposed by the Bitrise CLI

These Environment Variables are available everywhere, even if you run the build on your own Mac
(using the [Bitrise CLI](https://www.bitrise.io/cli)):

* `BITRISE_TRIGGERED_WORKFLOW_ID` : the Workflow's ID which was triggered, either with `bitrise run` or `bitrise trigger`
* `BITRISE_TRIGGERED_WORKFLOW_TITLE` : the Workflow's title (if you provided one) which was triggered,
  either with `bitrise run` or `bitrise trigger`
* `BITRISE_BUILD_STATUS` : current status of the build - `"0"` if there are no failed steps yet,
  `"1"` if there's at least one failed step
* `BITRISE_SOURCE_DIR` : path of source / base workdir. By default it's the directory where `bitrise` runs
  (e.g. your repository root), unless you provide a different value.
  Can be overwritten during the build, which will change the working directory for subsequent Steps in the build.
* `BITRISE_DEPLOY_DIR` : directory to store artifacts / files for deploy.
  It's a temporary directory created by `bitrise` CLI by default, and can be overwritten before starting `bitrise` CLI.
  _The content of this directory can be attached to the_ [_bitrise.io_](https://www.bitrise.io) _build page, as artifacts,_
  _with the_ _`Deploy to Bitrise.io`_ _step for example._
* `CI` : indicates whether `bitrise` CLI is running in CI (Continuous Integration) mode. Value can be `"true"` or `"false"`.
* `PR` : indicates whether `bitrise` CLI is running in PR (Pull Request) mode. Value can be `"true"` or `"false"`.

## Exposed by Bitrise.io

These environments are available for builds running on [bitrise.io](https://www.bitrise.io) Virtual Machines:

* `BITRISE_BUILD_NUMBER` : build number of the build on [bitrise.io](https://www.bitrise.io)
* `BITRISE_APP_TITLE` : app title on [bitrise.io](https://www.bitrise.io)
* `BITRISE_APP_URL` : app URL on [bitrise.io](https://www.bitrise.io)
* `BITRISE_APP_SLUG` : app slug on [bitrise.io](https://www.bitrise.io)
* `BITRISE_BUILD_URL` : build's URL on [bitrise.io](https://www.bitrise.io)
* `BITRISE_BUILD_SLUG` : build's slug on [bitrise.io](https://www.bitrise.io)
* `BITRISE_BUILD_TRIGGER_TIMESTAMP` : triggered at timestamp of the build
* `GIT_REPOSITORY_URL` : git repository URL
* `BITRISE_GIT_BRANCH` : the branch which triggered the build (if any)
* `BITRISEIO_GIT_BRANCH_DEST` : Used only with builds triggered by Pull Requests - the destination/target branch of the Pull Request that triggered the build
* `BITRISE_GIT_TAG` : tag which triggered the build (if any)
* `BITRISE_GIT_COMMIT` : commit hash which triggered the build (if any)
* `BITRISE_GIT_MESSAGE` : commit message, Pull Request title or the message you specified if you triggered the build manually. This env var is mapped to [`commit message`](https://devcenter.bitrise.io/api/build-trigger/#git-related) in the API.
* `BITRISEIO_GIT_REPOSITORY_OWNER` : the owner of the Git repository of the project (for example, `bitrise-team`)
* `BITRISEIO_GIT_REPOSITORY_SLUG` : the slug of the Git repository of the project (for example, `bitrise-blog`)
* `BITRISE_PULL_REQUEST` : Pull Request ID, which triggered the build (if any)
* `BITRISEIO_PULL_REQUEST_REPOSITORY_URL` : The repository URL from where the Pull Request is sent
* `BITRISEIO_PULL_REQUEST_MERGE_BRANCH` : The pre-merge branch - if the Git hosting provider supports and provides the pre-merged state of a Pull Request on a special "merge branch"
* `BITRISEIO_PULL_REQUEST_HEAD_BRANCH` : The Pull Request "head branch", if the Git hosting provider system supports & provides this. This special git ref should point to the source of the Pull Request
* `BITRISE_PROVISION_URL` : Provisioning Profile(s) URL - the ones uploaded to [bitrise.io](https://www.bitrise.io).
  Pipe character (`|`) separated list, in case more than one value is provided.
* `BITRISE_CERTIFICATE_URL` : Certificate / Identity URL - the one uploaded to [bitrise.io](https://www.bitrise.io).
  Pipe character (`|`) separated list, in case more than one value is provided.
* `BITRISE_CERTIFICATE_PASSPHRASE` : Certificate / Identity's password / passphrase,
  the one specified on [bitrise.io](https://www.bitrise.io).
  Pipe character (`|`) separated list, in case more than one value is provided.
* `BITRISE_IO` : indicates that the build is running in a bitrise.io environment. Value is set to `"true"` by bitrise.io when it starts a build.

For more information on env vars, check out [Secrets and Env Vars](/builds/env-vars-secret-env-vars/).
