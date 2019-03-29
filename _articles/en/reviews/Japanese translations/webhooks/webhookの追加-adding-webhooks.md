---
title: webhookの追加(Adding webhooks)
redirect_from: []
date: 2019-03-26 15:20:41 +0000
published: false

---
{% include not_translated_yet.html %}

ほとんどのソースコードホスティングサービスはwebhookを登録する機能を提供します。webhookは基本的に特定のイベントで呼ばれるURLです。

コードをリポジトリにプッシュする度にBitriseが自動的にビルドを開始するには、コードホスティングサービスでwebhookを設定し、リポジトリにプッシュしたコードを使用して自動的にBitriseのビルドを開始します。

## incoming webhookを自動的に設定する

着信Webフックを自動的に設定する方法は2つあります:

* 新しいアプリを追加するとき
* アプリの`Code`タブ

{% include message_box.html type="note" title="自動webhook登録" content="自動webhook登録は、GitHub、GitLab、Bitbucketでホストされているアプリに対応しています。 "%}

アプリを追加するときに`GitHub`または`Bitbucket`をソースコードプロバイダーとして選択した場合、Bitriseはアプリ設定の最後にボタンをクリックするだけで自動的にwebhookを設定します。この場合、チュートリアルをスキップできます。

### アプリを追加する際にwebhookを自動的に追加

アプリを追加する際にソースコードプロバイダとしてGitHub、GitLab、またはBitbucketを選択した場合、Bitriseはアプリ設定の最後にボタンをクリックするだけで自動的にwebhookを設定します。

![Register webhook](/img/add-app-webhook.png)

### コードタブでwebhookを自動的に追加

アプリの`Code`タブで、webhookをリポジトリに自動的に登録できます。

須要：

* リポジトリに対する管理者権限があること
* リポジトリをホストするアカウントがBitriseアカウントとコネクトしていること。

bitrise.ioでアプリを開き、`Code`タブに移動します。

![Code tab](/img/code-tab.png)

`INCOMING WEBHOOKS`セクションを見つけて、 `SETUP AUTOMATICALLY`をクリックします。

![Register webhook](/img/webhook-auto.png)

## manually incoming webhooksを手動設定

アプリケーションを登録した後に、手動でwebhookを設定または変更することができます。

サポートされているプロバイダは、アプリケーションの `Code`タブにあります。サポートされているプロバイダのいずれかとwebhookを設定するには、`SELECT MANUALLY`オプションを選択します。

![Screenshot](/img/webhook-providers.png)

[webhookプロセッサーはオープンソースです](https://github.com/bitrise-io/bitrise-webhooks)。サポートされていない解決策を探しているなら、GitHubページで問題を作成するか、プルリクエストweを作成することができます。必要に応じて、自身のwebhookプロバイダを自身のファイアウォール内で実行することもできます。

コードタブでセットアップに関する詳細な説明を見つけるか、devcenterの記事をチェックするためにプロバイダを選択することができます。

* [GitHubウェブフックの追加](/webhooks/adding-a-github-webhook)
* [ Bitbucketウェブフックの追加  ](/webhooks/adding-a-bitbucket-webhook)
* [Gitlab用のWebフックの追加]()
* [ Visual Studio Online / Visual Studio Team Services用のWebフックの追加](/webhooks/adding-a-visual-studio-webhook)
* [ Slack用のWebフックの追加  ](/webhooks/adding-a-slack-webhook)
* [Gogs用のWebフックの追加](/webhooks/adding-a-gogs-webhook)
* [Deveo用のWebフックの追加](/webhooks/adding-deveo-webhook)
* [Assembla用のWebフックの追加](/webhooks/adding-assembla-webhook)

## outgoing webhooksを設定

Bitriseに[outgoing webhooks](/webhooks/adding-outgoing-webhooks/)を設定することもでき,また、ビルドイベントについて選択したサービスに通知することができます。ビルドイベントは次のとおりです：

* ビルドが開始されたとき
* ビルドが終了したとき

## トラブルシューティング

 Webhook関連のトラブルシューティング/デバッグに関する注意事項については、[Webhook Troubleshooting](/webhooks/troubleshooting)ガイドを参照してください。