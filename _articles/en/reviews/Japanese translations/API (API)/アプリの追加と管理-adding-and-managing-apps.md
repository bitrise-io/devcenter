---
tag: []
title: アプリの追加と管理 (Adding and managing apps)
redirect_from: []
summary: ''
published: false

---
Set up new apps on Bitrise with the API: add the app, generate SSH keys, and set up the app's initial configuration.

In addition, you can list all apps belonging, for example, to a single user or to a specific organization.

APIを使ったBitrise上での新規アプリのセットアップ：アプリの追加、SSHキーの生成とアプリの初期設定のセットアップがあります。

他にも、ユーザーや指定のOrganizationへアプリの所有物のリスト化が可能です。

## Adding a new app　新アプリの追加

| エンドポイント | 機能 |
| --- | --- |
| POST /apps/register | 新しいアプリを追加します。 |
| POST /apps/{app-slug}/register-ssh-key | 特定のアプリへSSHキーを追加します。 |
| POST /apps/{app-slug}/finish | アプリの追加プロセスの終了時にアプリをセーブします。 |
| POST /apps/{app-slug}/bitrise.yml | アプリ用に新しいbitrise.ymlをアップロードします。 |

There are three distinct steps to adding an app with the Bitrise API.

Bitrise APIを使ったアプリの追加には3つのステップがあります。

1. Registering the app.  
   アプリの登録
2. Setting up an SSH key.  
   SSHキーの設定
3. Finishing the app registration.  
   アプリ登録の完了

Before you start, generate [an SSH keypair](/faq/how-to-generate-ssh-keypair/):  
始める前に、[SSH keypair](/faq/how-to-generate-ssh-keypair/)を生成します：

    ssh-keygen -t rsa -b 4096 -P '' -f ./bitrise-ssh -m PEM  

Register the app by calling the `register` endpoint and setting all required parameters. You need to set your git provider, the repository URL, the slug of the repository as it appears at the provider, and the slug of the owner of the repository.

`register`エンドポイントの呼び出しによるアプリの登録を行い、全ての必要なパラメータを設定します。ここでgitプロバイダ、レポジトリURL、プロバイダで表示されるレポジトリのスラグ、そしてレポジトリのオーナーのスラグの設定が必要になります。

    curl -X POST -H 'Authorization: ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/register' -d '{"provider":"github","is_public":false,"repo_url":"git@github.com:api_demo/example-repository.git","type":"git","git_repo_slug":"example-repository","git_owner":"api_demo"}'

If you want to add an app to an organization, you'll have to include the organization at the end of the curl request:

Organizationにアプリを追加したい場合、curlリクエストの最後にOrganizationを含ませてください。

       curl -X POST -H 'Authorization: ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/register' -d '{"provider":"github","is_public":false,"repo_url":"git@github.com:api_demo/example-repository.git","type":"git","git_repo_slug":"example-repository","git_owner":"api_demo","organization_slug":""}'

Once done, call the `register-ssh-key` endpoint to set up the SSH keys you created so that Bitrise can clone your repository when running a build. You can also set whether you want to automatically register the public key at your git provider.

完了すれば、???エンドポイントを呼び出して、作成済みのSSHキーを設定すると、Bitriseはビルド中にレポジトリのcloneができるようになります。

    curl -X POST -H 'Authorization: ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/register-ssh-key' -d '{"auth_ssh_private_key":"your-private-ssh-key","auth_ssh_public_key":"your-public-ssh-key","is_register_key_into_provider_service":false}'

Finish the app registration process by calling the `finish` endpoint. This endpoint allows you to configure your applications: set the project type, the stack on which the build will run, and the initial configuration settings.

You can also set environment variables, as well as immediately specify an organization that will be the owner of the application.

`finish`エンドポイントを呼び出してアプリ登録処理を完了しましょう。このエンドポイントはアプリの構成を許可します：プロジェクトタイプの設定、ビルドを実行するスタックや初期設定を行うことができます。

環境変数を設定したり、Organizationの指定をすぐに行うことでアプリのオーナーになることができます。

    curl -X POST -H 'Authorization: ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/finish' -d '{"project_type":"ios","stack_id":"osx-vs4mac-stable","config":"default-ios-config","mode":"manual","envs":{"env1":"val1","env2":"val2"},"organization_slug":"e1ec3dea540bcf21"}'

You're done! Your new app is ready.

完了です！これでアプリの準備は整いました。

### Uploading a new bitrise.yml file　新しいbitrise.ymlファイルのアップロード

The `bitrise.yml` file contains the configuration of your builds. You can modify the current one via the API by posting a full YAML configuration. The below example shows a basic `.yml` configuration.

`bitrise.yml`ファイルはビルドの構成を含んでいます。完全なYAML構成を投稿を行えば、API経由で現在のファイルを修正することができます。下の例では、基本的な`.yml`構成を表示しています。

    curl -X POST -H 'Authorization: ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/bitrise.yml' -d '{"app_config_datastore_yaml":"app:\n  envs:\n  - BITRISE_PROJECT_PATH: build.gradle\n    opts:\n      is_expand: false\ndefault_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git\nformat_version: 1.1.9"}'

By calling this endpoint, you replace the app's current `bitrise.yml` file. You can, of course, modify this uploaded `bitrise.yml` either via the API or on the website itself.

このエンドポイントを呼び出すことにより、現在のアプリ`bitrise.yml`ファイルが変更されます。アップロードされた`bitrise.yml`は、API経由もしくはウェブサイト上で修正を行えます。

## Managing an existing app　既存アプリの管理

| エンドポイント | 機能 |
| --- | --- |
| GET /apps | アプリのリストを入手します。 |
| GET /apps/{app-slug} | 指定のアプリを入手します。 |
| GET /apps/{app-slug}/bitrise.yml | 指定のアプリのbitrise.ymlを入手します。 |
| GET /apps/{app-slug}/branches | アプリのレポジトリのブランチをリストアップします。 |
| GET /organizations/{org-slug}/apps | Organization用のアプリのリストを入手します。 |
| GET /users/{user-slug}/apps | ユーザー用のアプリのリストを入手します。 |

The response to any GET request regarding one or more applications will contain the app slug, its project type, the git provider, the repository's owner and URL:

1つ以上のアプリのGETリクエストへのレスポンスはアプリスラグ、プロジェクトタイプ、gitプロバイダ、レポジトリのオーナーとURLを含みます：

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

アプリの既存するbitrise.ymlのダウンロードも行うことができます：レスポンスには完全なYAML構成が含まれています。