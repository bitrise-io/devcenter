---
changelog:
last_modified_at:
title: アプリの追加と管理
redirect_from: []
date: 2019-04-05T13:32:19.000+00:00
menu:
  api-main:
    weight: 8

---

新しいアプリを、API経由でBitriseに登録する: アプリを追加するために使用するSSHキーを生成し、そのアプリの初期設定を行います。

加えて、ユーザが所有、または特定のオーガナイゼーションに所属する全てのアプリをリストアップできます。

## 新しいアプリの追加

| エンドポイント | 機能 |
| --- | --- |
| POST /apps/register | 新しいアプリの追加。 |
| POST /apps/{app-slug}/register-ssh-key | 特定のアプリにSSHキーを追加する。 |
| POST /apps/{app-slug}/finish | アプリの登録処理を完了する。そのアプリはリストの最後に追加されます。 |
| POST /apps/{app-slug}/bitrise.yml | 特定のアプリに新しい bitrise.yml をアップロードする。 |

Bitrise APIを使ってアプリを追加するには、3つのステップがあります。

1. アプリを登録する。
2. SSHキーを設定する。
3. アプリの登録を完了する。

アプリの登録を始める前に、[SSHキーペア](/faq/how-to-generate-ssh-keypair/)を生成します:

    ssh-keygen -t rsa -b 4096 -P '' -f ./bitrise-ssh -m PEM  

必要な全ての必須パラメータとともに`register` エンドポイントをコールしてアプリを登録します。gitプロバイダ、リポジトリのURL、そのgitプロバイダで表示されているリポジトリのスラッグとそのリポジトリの所有者のスラッグを設定する必要があります。

    curl -X POST -H 'Authorization: ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/register' -d '{"provider":"github","is_public":false,"repo_url":"git@github.com:api_demo/example-repository.git","type":"git","git_repo_slug":"example-repository","git_owner":"api_demo"}'

アプリをオーガナイゼーションに追加したい場合、curlリクエストの最後にそのオーガナイゼーションを含む必要があります:

       curl -X POST -H 'Authorization: ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/register' -d '{"provider":"github","is_public":false,"repo_url":"git@github.com:api_demo/example-repository.git","type":"git","git_repo_slug":"example-repository","git_owner":"api_demo","organization_slug":""}'

一度アプリの追加ができたら、事前に生成していたSSHキーを設定するために `register-ssh-key` エンドポイントをコールします。それにより、Bitriseはアプリのビルド実行時にあなたのリポジトリをクローンすることが可能になります。公開鍵をあなたのgitプロバイダに自動で登録したいかどうかも設定できます。

    curl -X POST -H 'Authorization: ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/register-ssh-key' -d '{"auth_ssh_private_key":"your-private-ssh-key","auth_ssh_public_key":"your-public-ssh-key","is_register_key_into_provider_service":false}'

Finish the app registration process by calling the `finish` endpoint. This endpoint allows you to configure your applications: set the project type, the stack on which the build will run, and the initial configuration settings.
`finish` エンドポイントをコールすることで、アプリ登録プロセスを完了させます。このエンドポイントを使用して、次のあなたのアプリの設定をすることができます: プロジェクトのタイプ、どのビルドが将来的に実行されるのかのスタック、初期設定。

環境変数も設定することができます。それと同様に、そのアプリのオーナーとなるオーガナイゼーションも設定できます。

    curl -X POST -H 'Authorization: ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/finish' -d '{"project_type":"ios","stack_id":"osx-vs4mac-stable","config":"default-ios-config","mode":"manual","envs":{"env1":"val1","env2":"val2"},"organization_slug":"e1ec3dea540bcf21"}'

全て完了です！新しいアプリの準備ができました。

### 新しいbitrise.ymlのアップロード

The `bitrise.yml` file contains the configuration of your builds. You can modify the current one via the API by posting a full YAML configuration. The below example shows a basic `.yml` configuration.
`bitrise.yml` ファイルはあなたのビルドの設定を含んでいます。API経由でYAML形式の設定をポストすることで、現在の設定を変更することができます。以下の例は基本的な `.yml` 設定です。

    curl -X POST -H 'Authorization: ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/bitrise.yml' -d '{"app_config_datastore_yaml":"app:\n  envs:\n  - BITRISE_PROJECT_PATH: build.gradle\n    opts:\n      is_expand: false\ndefault_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git\nformat_version: 1.1.9"}'

By calling this endpoint, you replace the app's current `bitrise.yml` file. You can, of course, modify this uploaded `bitrise.yml` either via the API or on the website itself.
このエンドポイントをコールすることで、そのアプリの現在の `bitrise.yml` ファイルを上書きすることができます。もちろんAPI経由またはウェブサイト上のどちらでも `bitrise.yml` を編集することができます。

## 既存アプリの管理

| エンドポイント | 機能 |
| --- | --- |
| GET /apps | アプリのリストを取得します。 |
| GET /apps/{app-slug} | 特定のアプリを取得します。 |
| GET /apps/{app-slug}/bitrise.yml | 特定のアプリのbitrise.ymlを取得します。 |
| GET /apps/{app-slug}/branches | アプリのリポジトリにあるブランチをリストアップします。 |
| GET /organizations/{org-slug}/apps | オーガナイゼーションに所属するアプリのリストを取得します。 |
| GET /users/{user-slug}/apps | ユーザが所有するアプリのリストを取得します。 |

1つもしくは複数のアプリに関連するどのGETリクエストのレスポンスでも、そのアプリのスラッグ、プロジェクトタイプ、gitプロバイダ、そのリポジトリのオーナーとURLを含んでいます:

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

どのアプリのbitrise.ymlでもダウンロードすることができます: そのレスポンスは、全てのYAML設定を含みます。
