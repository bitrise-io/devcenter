---
title: 利用可能な環境変数
redirect_from:
- "/faq/available-environment-variables/"
- "/faq/available-environment-variables/#exposed-by-the-bitrise-cli"
menu:
  builds-main:
    weight: 25

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
* `BITRISE_GIT_TAG` : ビルドをトリガーしたタグ（あれば）
* `BITRISE_GIT_COMMIT` : ビルドを引き起こしたコミットハッシュ（あれば）
* `BITRISE_GIT_MESSAGE` : コミットメッセージ、プルリクエストタイトル、または手動でビルドを起動した場合は指定したメッセージ。この環境変数は、APIの`[commit message](``[https://devcenter.bitrise.io/api/build-trigger/#git-related](https://devcenter.bitrise.io/api/build-trigger/#git-related "https://devcenter.bitrise.io/api/build-trigger/#git-related")``)`にマッピングされています。
* `BITRISEIO_GIT_REPOSITORY_OWNER` : プロジェクトのGitリポジトリのオーナー（例、`bitrise-team`）
* `BITRISEIO_GIT_REPOSITORY_SLUG` : プロジェクトのGitリポジトリのスラッグ（例、`bitrise-blog`）
* `BITRISE_PULL_REQUEST` :ビルドをトリガーしたプルリクエストID（あれば）
* `BITRISEIO_PULL_REQUEST_REPOSITORY_URL` : プルリクエストの送信元のリポジトリURL
* `BITRISEIO_PULL_REQUEST_MERGE_BRANCH` : マージ前のブランチ -  Gitホスティングプロバイダが特別な”マージブランチ”のプルリクエストのマージ前の状態をサポートおよび提供している場合
* `BITRISEIO_PULL_REQUEST_HEAD_BRANCH` : Gitホスティングプロバイダーシステムがサポートして提供している場合は、プルリクエスト「ヘッドブランチ」。特別なgit参照はプルリクエストのソースを指すはずです
* `BITRISE_PROVISION_URL` :プロビジョニングプロファイルのURL  -  [bitrise.io](https://www.bitrise.io)にアップロードされたもの。複数の値がある場合に、パイプ文字（`|`）リストを分けます。
* `BITRISE_CERTIFICATE_URL` : 証明書/識別URL  -  [bitrise.io](https://www.bitrise.io)にアップロードされたもの。複数の値がある場合に、パイプ文字（`|`）リストを分けます。
* `BITRISE_CERTIFICATE_PASSPHRASE` : 証明書/ IDのパスワード/パスフレーズ。 [bitrise.io](https://www.bitrise.io)で指定されているもの。複数の値がある場合に、パイプ文字（`|`）リストを分けます。
* `BITRISE_IO` : ビルドがbitrise.io環境で実行されていることを示します。ビルドを開始すると、bitrise.ioによって値が `"true"`に設定されます。

環境変数の詳細については、[秘密と環境変数](/builds/env-vars-secret-env-vars/)を参照してください。