---
changelog:
last_modified_at:
tag: []
title: アプリの追加と管理 (Adding and managing apps)
redirect_from: []
description: ''
published: false

---
APIを使ってBitrise上で新規アプリをセットアップしましょう：アプリを追加して、SSHキーの生成とアプリの初期設定のセットアップを行います。

他にも、ユーザーや指定のWorkspaceへアプリの所有物のリスト化が可能です。

## 新アプリの追加

| エンドポイント | 機能 |
| --- | --- |
| POST /apps/register | 新しいアプリを追加します。 |
| POST /apps/{app-slug}/register-ssh-key | 特定のアプリへSSHキーを追加します。 |
| POST /apps/{app-slug}/finish | アプリの追加プロセスの終了時にアプリをセーブします。 |
| POST /apps/{app-slug}/bitrise.yml | アプリ用に新しいbitrise.ymlをアップロードします。 |

Bitrise APIを使ったアプリの追加には3つのステップがあります。

1. アプリの登録
2. SSHキーの設定
3. アプリ登録の完了

始める前に、[SSH keypair](/faq/how-to-generate-ssh-keypair/)を生成します：

    ssh-keygen -t rsa -b 4096 -P '' -f ./bitrise-ssh -m PEM  

`register`エンドポイントの呼び出しによるアプリの登録を行い、全ての必要なパラメータを設定します。ここでgitプロバイダ、レポジトリURL、プロバイダで表示されるレポジトリのスラグ、そしてレポジトリのオーナーのスラグの設定が必要になります。

    curl -X POST -H 'Authorization: ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/register' -d '{"provider":"github","is_public":false,"repo_url":"git@github.com:api_demo/example-repository.git","type":"git","git_repo_slug":"example-repository","git_owner":"api_demo"}'

Workspaceにアプリを追加したい場合、curlリクエストの最後にWorkspaceを含ませてください。

       curl -X POST -H 'Authorization: ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/register' -d '{"provider":"github","is_public":false,"repo_url":"git@github.com:api_demo/example-repository.git","type":"git","git_repo_slug":"example-repository","git_owner":"api_demo","organization_slug":""}'

完了すれば、`register-ssh-key`エンドポイントを呼び出して、作成済みのSSHキーを設定すると、Bitriseはビルド中にレポジトリのcloneができるようになります。

    curl -X POST -H 'Authorization: ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/register-ssh-key' -d '{"auth_ssh_private_key":"your-private-ssh-key","auth_ssh_public_key":"your-public-ssh-key","is_register_key_into_provider_service":false}'

`finish`エンドポイントを呼び出してアプリ登録処理を完了しましょう。このエンドポイントはアプリの構成を許可します：プロジェクトタイプの設定、ビルドを実行するスタックや初期構成の設定を行うことができます。

環境変数を設定したり、Workspaceの指定をすぐに行うことでアプリのオーナーになることができます。

    curl -X POST -H 'Authorization: ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/finish' -d '{"project_type":"ios","stack_id":"osx-vs4mac-stable","config":"default-ios-config","mode":"manual","envs":{"env1":"val1","env2":"val2"},"organization_slug":"e1ec3dea540bcf21"}'

完了です！これでアプリの準備は整いました。

### 新しいbitrise.ymlファイルのアップロード

`bitrise.yml`ファイルはビルドの構成を含んでいます。完全なYAML構成を配置すれば、API経由で現在のファイルを修正することができます。下の例では、基本的な`.yml`構成を表示しています。

    curl -X POST -H 'Authorization: ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/bitrise.yml' -d '{"app_config_datastore_yaml":"app:\n  envs:\n  - BITRISE_PROJECT_PATH: build.gradle\n    opts:\n      is_expand: false\ndefault_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git\nformat_version: 1.1.9"}'

このエンドポイントを呼び出すことにより、現在のアプリ`bitrise.yml`ファイルが置き換えられます。アップロードされた`bitrise.yml`は、API経由もしくはウェブサイト上で修正を行えます。

## 既存アプリの管理

| エンドポイント | 機能 |
| --- | --- |
| GET /apps | アプリのリストを入手します。 |
| GET /apps/{app-slug} | 指定のアプリを入手します。 |
| GET /apps/{app-slug}/bitrise.yml | 指定のアプリのbitrise.ymlを入手します。 |
| GET /apps/{app-slug}/branches | アプリのレポジトリのブランチをリストアップします。 |
| GET /organizations/{org-slug}/apps | Workspace用のアプリのリストを入手します。 |
| GET /users/{user-slug}/apps | ユーザー用のアプリのリストを入手します。 |

1つ以上のアプリに関するGETリクエストへのレスポンスは、アプリスラグ、プロジェクトタイプ、gitプロバイダ、レポジトリのオーナーとURLを含みます：

    {
      "data": [
        {
          "slug": "eeeeefffff00000",
          "title": "sample-app",
          "project_type": "android",
          "provider": "github",
          "repo_owner": "example-user",
          "repo_url": "git@github.com:example-user/sample-app.git",
          "repo_slug": "android-gradle-kotlin-dsl",
          "is_disabled": false,
          "status": -1,
          "is_public": false,
          "owner": {
            "account_type": "organization",
            "name": "Test Org",
            "slug": "fffffeeeee00000"
          },
          "avatar_url": null
        },
        {

You can also download the existing bitrise.yml file of any app: the response will contain the full YAML configuration.

アプリの既存するbitrise.ymlファイルのダウンロードも行うことができます：レスポンスには完全なYAML構成が含まれています。