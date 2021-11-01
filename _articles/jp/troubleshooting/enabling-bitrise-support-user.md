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

1. サポートユーザーを有効にしたいプロジェクトの **Settings** タブに推移します。
2. 下の画像と同じ、 **Enable Bitrise Support for this app** と書かれている部分までスクロールダウンして頂き右側にあるトグルを有効にします。
   実際に有効化されるまで数秒かかることがあります。場合によっては有効化されているという表示するために **ページの更新** が必要になることがあります。

   ![{{ page.title }}](/img/bitrise-support-user.png)

### Bitrise Support user のできること

Bitrise Support Userが有効化されると該当のアプリに対する管理者権限が付与されます。これは、管理者権限を持つ一般ユーザーと同じ操作が可能となることを意味し、具体的には、ビルドへのアクセス、ワークフローの編集、 **Team**, **Code** および **Settings** タブの設定の変更の操作などが可能となります。

下のリストは、 Support User のできる操作の例を列挙したものですが、全てを網羅したものではなく、Bitrise Support Userによって行える操作の特に重要と考えられるものを列挙したものです。

Bitrise Support User のできる操作:

* webhook の追加およびアップデート
* SSH keys の追加およびアップデート
* 通知の設定変更
* マニュアルでのビルド承認の有効化
* ビルドキャッシュの管理
* Enable rolling and selective builds
* GitHub チェックの有効化
* Update all app data, including title and repository URL.
* Manage team member roles
* Select the service credential user and the connected Apple Developer account
* Enable or disable the app

**Builds** ページでできる操作:

* ビルドの閲覧
* ビルドログの閲覧
* ビルドの開始

**Workflow Editor** ページでできる操作:

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
