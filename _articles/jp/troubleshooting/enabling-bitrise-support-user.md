---
changelog:
last_modified_at:
title: Enabling Bitrise Support user for your app
menu:
  troubleshooting-main:
    weight: 8

---
{% include not_translated_yet.html %}

Bitriseで問題が発生した場合、 [サポートセンター](https://bitrise.zendesk.com/hc/en-us) から解決に必要なリソースを見つける事ができます。: サポートセンターのページから [ドキュメンテーション](https://devcenter.bitrise.io/)、 [ナレッジベース](https://bitrise.zendesk.com/hc/en-us/categories/360000108597-Knowledge-Data-Base-) 、 [コミュニティページ](https://discuss.bitrise.io/) など様々なリソースから発生している問題の解決策を見つけることができます。もしご希望の場合は **Submit a Request** ボタンをクリックすることでサポートチームにお問い合わせいただくこともできます。

この記事ではどのように **Bitrise Support User** を有効にするか説明します。Bitrise Support Userを有効にすることでサポートチームがお客様のプロジェクト、ワークフロー、ビルドログ、設定(YAMLファイル)にアクセスすることができるようになり、より効率的に問題の把握および解決が可能になります。

 **Bitrise Support** ユーザーは設定ページのトグルから簡単に有効、無効化することができます。もうユーザー管理画面からサポートユーザーの追加や削除を行って頂く必要はありません。

それでは下に具体的な手順をご紹介します。

1. サポートユーザーを有効にしたいプロジェクトの **Settings** タブに推移します.
2. 下の画像と同じ、 **Enable Bitrise Support for this app** と書かれている部分までスクロールダウンして頂き右側にあるトグルを有効にします。
   実際に有効化されるまで数秒かかることがあります。場合によっては有効化されているという表示するために **ページの更新** が必要になることがあります.

   ![{{ page.title }}](/img/bitrise-support-user.png)

### Bitrise Support user のできること

The Bitrise Support User, when enabled, has Admin access to your app. That means it can do anything that a regular user with Admin access rights on an app can do: it has access to your builds and can edit your Workflows, modify the inputs of the **Team**, **Code** and the **Settings** tab.

Let's see in detail what the Support User can do! The list is not exhaustive: these are the most important capabilities of the Bitrise Support User.

It can:

* Add and update webhooks.
* Add and update SSH keys.
* Change notification settings.
* Enable manual build approval.
* Manage build cache.
* Enable rolling and selective builds.
* Enable GitHub Checks.
* Update all app data, including title and repository URL.
* Manage team member roles.
* Select the service credential user and the connected Apple Developer account.
* Enable or disable the app.

On the **Builds** page, it can:

* View builds.
* View build logs.
* Start builds.

In the **Workflow Editor**, it can:

* Add, update, and delete Workflows.
* Modify Step inputs.
* Update the bitrise.yml file.
* Add, update, and remove code signing files.
* Add, update, and remove Env Vars and Secrets.
* Add, update, and remove build triggers.
* Configure the stack used.

In the case of a failing workflow, our best practice is to create a new and correct version of the failing workflow called `support-testing`. You can compare our `support-testing` with your own and update yours or keep the `support-testing` workflow, rename it as you wish, and develop it further.

## What the Bitrise Support user can't do

The Bitrise Support user can't see your **Account information** or any **Billing** information. Only the owner of the account has access to this information and has the right to modify any account-related records.

The Support user can't see your other apps where the Support user is not enabled.
