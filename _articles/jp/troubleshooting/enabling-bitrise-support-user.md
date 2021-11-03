---
changelog:
last_modified_at:
title: Enabling Bitrise Support user for your app
menu:
  troubleshooting-main:
    weight: 8

---
{% include not_translated_yet.html %}

Bitriseで問題が発生した場合、 [サポートセンター](https://bitrise.zendesk.com/hc/en-us) から解決に必要なリソースを見つける事ができます。: サポートセンターのページから [ドキュメンテーション](https://devcenter.bitrise.io/)、 [ナレッジベース](https://bitrise.zendesk.com/hc/en-us/categories/360000108597-Knowledge-Data-Base-) 、 [コミュニティページ](https://discuss.bitrise.io/) など様々なリソースから発生している問題の解決策を見つけることができます。サポートチームへのお問い合わせをご希望の場合は **Submit a Request** ボタンから承っております。

この記事ではどのように **Bitrise Support User** を有効にするか説明します。Bitrise Support User を有効にすることで弊社サポートチームがお客様のプロジェクト、ワークフロー、ビルドログ、設定(YAMLファイル)にアクセスすることができるようになり、より効率的に問題の把握および解決が可能になります。

 **Bitrise Support user** は設定ページのトグルから簡単に有効、無効化することができます。もうユーザー管理画面からサポートユーザーの追加や削除を行う必要はありません。

それでは下に具体的な手順をご紹介します。

1. サポートユーザーを有効にしたいプロジェクトの **Settings** タブに推移します。
2. 下の画像と同じ、 **Enable Bitrise Support for this app** と書かれている部分までスクロールダウンして右側にあるトグルを有効にします。
   実際に有効化されるまで数秒かかることがあります。場合によって、有効化ステータスをページに反映させるには **ページの更新** が必要になることがあります。

   ![{{ page.title }}](/img/bitrise-support-user.png)

### Bitrise Support user のできること

Bitrise Support Userが有効化されると該当のアプリに対する管理者権限が付与されます。これは、管理者権限を持つ一般ユーザーと同じ操作が可能となることを意味し、具体的には、ビルドへのアクセス、ワークフローの編集、 **Team**, **Code** および **Settings** タブの設定の変更などが可能となります。

下のリストは、 Support User のできる操作の例ですが、全てを網羅したものではなく、Bitrise Support User によって行える操作の特に重要と考えられるものを列挙したものです。

Bitrise Support User のできる操作:

* webhook の追加およびアップデート
* SSH keys の追加およびアップデート
* 通知の設定変更
* マニュアルでのビルド承認の有効化
* ビルドキャッシュの管理
* rolling および selective ビルドの有効化
* GitHub チェックの有効化
* タイトルやリポジトリURL など全てのアプリデータのアップデート
* ユーザーおよびロールの管理
* Service credential user および 接続された Apple 開発者アカウントの選択
* アプリの有効、無効化

**Builds** ページからできる操作:

* ビルドの閲覧
* ビルドログの閲覧
* ビルドの開始

**Workflow Editor** ページからできる操作:

* ワークフローの追加、アップデート、削除
* ステップ入力値の変更
* bitrise.yml ファイルのアップデート
* コードサイニングファイルの追加、アップデート、削除
* 環境変数(Env Vars)およびSecretsの追加、アップデート、削除
* ビルドトリガーの追加、アップデート、削除
* 使用されるスタックの設定

ワークフローが正常に動作しない場合、ベストプラクティスとして `support-testing` という名前の問題を解決した正常に動くワークフローをサポートチームが作成します。作成した `support-testing` を参考に元のワークフローを修正いただくか、`support-testing` ワークフロー名を任意のものに変更しそのままご利用いただけます。

## Bitrise Support user のできないこと

Bitrise Support user はお客様の **Account information** や **Billing** の情報にアクセスできません。これらの情報へのアクセスおよび変更をできる権限を持つユーザーはアカウントオーナーのみとなります。

また、Support userが有効化されていない同じアカウントに登録されている他のアプリの情報も閲覧することはできません。
