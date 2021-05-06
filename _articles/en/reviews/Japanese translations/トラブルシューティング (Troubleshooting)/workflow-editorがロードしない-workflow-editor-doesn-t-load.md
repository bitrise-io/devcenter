---
changelog:
last_modified_at:
tag: []
title: Workflow Editorがロードしない (Workflow Editor doesn't load)
redirect_from: []
description: ''
published: false

---
Workflow Editorがロードしない場合、ご自身の`bitrise.yml`または構成済みのワークフローがWorkflow EditorのUIをクラッシュする可能性があります。

この問題に直面した際は、まず：

1. [弊社へお問い合わせ](https://www.bitrise.io/contact)ください。BitriseチームによりUIコード内の問題を修正します。
2. その後、API経由で`bitrise.yml`の修正が可能です。

## APIを使ったbitrise.ymlの管理

シンプルな`curl`コールを使用して、[bitrise.io](https://www.bitrise.io)へアプリの構成または`bitrise.yml`の**ダウンロード**と**アップロード**を行います。[GitHub](https://github.com/bitrise-io/bitrise/blob/master/_examples/experimentals/upload_download_bitrise_io/bitrise.yml)では、APIがどのように動作するのか、一例を確認することができます。

始める前に：

* ご自身の[アカウント上のSecurityタブ](https://www.bitrise.io/me/profile#/security)で生成ができるPersonal Access Tokenをお持ちであるか確認してください。

1. [API call](/api/adding-and-managing-apps/#managing-an-existing-app)を使ってbitrise.ymlをダウンロードします。YMLフォーマットによるレスポンスを取得します。
2. ファイルに`bitrise.yml`を保存して、ローカルで修正します。
3. [ほかのAPI call](https://devcenter.bitrise.io/api/adding-and-managing-apps/#adding-a-new-app)を使って`bitrise.yml`を[bitrise.io](https://www.bitrise.io)へアップロードします。修正した`bitrise.yml`へのパスが正確にセットされているか確認してください。JSONフォーマットによるレスポンスを取得します。