---
title: 利用可能な環境変数 (Available environment variables)
redirect_from: []
date: 2019-04-09 08:52:56 +0000
published: false

---
## Bitrise CLIによる提示

自分自身のMac上でビルドを実行したとしても（[Bitrise CLI](https://www.bitrise.io/cli)を使って）、以下の環境変数はどこでも利用可能です：

* `BITRISE_TRIGGERED_WORKFLOW_ID` : `bitrise run`または`_bitrise trigger_`でトリガーされたワークフローID
* `BITRISE_TRIGGERED_WORKFLOW_TITLE` : `bitrise run`または`bitrise trigger`のでトリガーされたワークフローのタイトル（指定した場合）
* `BITRISE_BUILD_STATUS` : ビルドの現在のステータス - 失敗したステップがない場合は`"0"`、失敗したステップが少なくとも1つある場合は`"1"`
* `BITRISE_SOURCE_DIR` :ソース/ベースワークディレクトリのパス。デフォルトでは、別の値を提供しない限り、`bitrise`が実行するディレクトリ（例、リポジトリルート）です。ビルド中に上書きされる可能性があり、そのためビルドの次のステップで作業ディレクトリが変更されます。
* `BITRISE_DEPLOY_DIR` : デプロイ用の成果物/ファイルを保管するディレクトリー。デフォルトで`bitrise`CLIによって作成された臨時ディレクトリであり、`bitrise` CLIを起動する前に上書きすることができます。このディレクトリは、例、`_Deploy to Bitrise.io_`ステップを使用して、成果物として[_bitrise.io_](https://www.bitrise.io)oビルドページに添付できます。
* `CI` : `bitrise` CLIがCI（Continuous Integration）モードで実行されているかどうかを示します。値は`"true"`または`"false"`です。
* `PR` : `bitrise`CLIがPR（プル要求）モードで実行されているかどうかを示します。値は`"true"`または`"false"`です。

  ## Bitrise.ioによる提示

以下の環境は、[bitrise.io](https://www.bitrise.io)バーチャルマシン上で実行されているビルドで利用可能です：

* `BITRISE_BUILD_NUMBER` :[bitrise.io](https://www.bitrise.io)のビルドのビルド番号
* `BITRISE_APP_TITLE` : [bitrise.io](https://www.bitrise.io)のアプリタイトル
* `BITRISE_APP_URL` :  [bitrise.io](https://www.bitrise.io)のアプリURL
* `BITRISE_APP_SLUG` :  [bitrise.io](https://www.bitrise.io)のアプリスラッグ
* `BITRISE_BUILD_URL` :[bitrise.io](https://www.bitrise.io)のビルドURL
* `BITRISE_BUILD_SLUG` : [bitrise.io](https://www.bitrise.io)のビルドスラッグ
* `BITRISE_BUILD_TRIGGER_TIMESTAMP` : ビルドのタイムスタンプ時に発生します
* `GIT_REPOSITORY_URL` : gitリポジトリURL
* `BITRISE_GIT_BRANCH` : ビルドを引き起こしたブランチ（あれば）
* `BITRISEIO_GIT_BRANCH_DEST` : プルリクエストによってトリガーされたビルド - ビルドをトリガーしたプルリクエストの宛先/ターゲットブランチでのみ使用
* `BITRISE_GIT_TAG` : tag which triggered the build (if any)
* `BITRISE_GIT_COMMIT` : commit hash which triggered the build (if any)
* `BITRISE_GIT_MESSAGE` : commit message, Pull Request title or the message you specified if you triggered the build manually. This env var is mapped to `[commit message](https://devcenter.bitrise.io/api/build-trigger/#git-related)` in the API.
* `BITRISEIO_GIT_REPOSITORY_OWNER` : the owner of the Git repository of the project (for example, `bitrise-team`)
* `BITRISEIO_GIT_REPOSITORY_SLUG` : the slug of the Git repository of the project (for example, `bitrise-blog`)
* `BITRISE_PULL_REQUEST` : Pull Request ID, which triggered the build (if any)
* `BITRISEIO_PULL_REQUEST_REPOSITORY_URL` : The repository URL from where the Pull Request is sent
* `BITRISEIO_PULL_REQUEST_MERGE_BRANCH` : The pre-merge branch - if the Git hosting provider supports and provides the pre-merged state of a Pull Request on a special "merge branch"
* `BITRISEIO_PULL_REQUEST_HEAD_BRANCH` : The Pull Request "head branch", if the Git hosting provider system supports & provides this. This special git ref should point to the source of the Pull Request
* `BITRISE_PROVISION_URL` : Provisioning Profile(s) URL - the ones uploaded to [bitrise.io](https://www.bitrise.io). Pipe character (`|`) separated list, in case more than one value is provided.
* `BITRISE_CERTIFICATE_URL` : Certificate / Identity URL - the one uploaded to [bitrise.io](https://www.bitrise.io). Pipe character (`|`) separated list, in case more than one value is provided.
* `BITRISE_CERTIFICATE_PASSPHRASE` : Certificate / Identity's password / passphrase, the one specified on [bitrise.io](https://www.bitrise.io). Pipe character (`|`) separated list, in case more than one value is provided.
* `BITRISE_IO` : indicates that the build is running in a bitrise.io environment. Value is set to `"true"` by bitrise.io when it starts a build.

For more information on env vars, check out [Secrets and Env Vars](/builds/env-vars-secret-env-vars/).