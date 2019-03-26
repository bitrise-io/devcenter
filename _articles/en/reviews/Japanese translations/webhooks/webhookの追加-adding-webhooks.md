---
title: webhookの追加(Adding webhooks)
redirect_from: []
date: 2019-03-26 15:20:41 +0000
published: false

---
{% include not_translated_yet.html %}

Most source code hosting service provides a feature to register webhooks. A webhook is basically an URL which will be called on specified events.

To have Bitrise automatically start a build every time you push code into your repository you can set up a webhook at your code hosting service which will automatically trigger a build on Bitrise with the code you push to your repository.　ほとんどのソースコードホスティングサービスはwebhookを登録する機能を提供します。webhookは基本的に特定のイベントで呼ばれるURLです。

コードをリポジトリにプッシュする度にBitriseが自動的にビルドを開始するには、コードホスティングサービスでwebhookを設定し、リポジトリにプッシュしたコードを使用して自動的にBitriseのビルドを開始します。

## Setting up incoming webhooks automatically

## incoming webhookを自動的に設定する

There are two ways to automatically set up an incoming webhook:

* when adding a new app
* on the `Code` tab of the app

着信Webフックを自動的に設定する方法は2つあります:

* 新しいアプリを追加するとき
* アプリの`Code`タブ

{% include message_box.html type="note" title="Automatic webhook registration" content=" Automatic webhook registration is supported for apps hosted on GitHub, GitLab and Bitbucket. "%}

{% include message_box.html type="note" title="自動webhook登録" content="自動webhook登録は、GitHub、GitLab、Bitbucketでホストされているアプリに対応しています。 "%}

If you select `GitHub` or `Bitbucket` as the source code provider when you add your app Bitrise automatically sets up a webhook for it with a click of a button at the end of your app setup journey. In this case, you can skip this tutorial.

アプリを追加するときに`GitHub`または`Bitbucket`をソースコードプロバイダーとして選択した場合、Bitriseはアプリ設定の最後にボタンをクリックするだけで自動的にwebhookを設定します。この場合、チュートリアルをスキップできます。

### Adding a webhook automatically when adding an app　アプリを追加する際にwebhookを自動的に追加

If you select `GitHub`, `GitLab` or `Bitbucket` as the source code provider when you add your app Bitrise automatically sets up a webhook for it with a click of a button at the end of your app setup journey.　アプリを追加する際にソースコードプロバイダとしてGitHub、GitLab、またはBitbucketを選択した場合、Bitriseはアプリ設定の最後にボタンをクリックするだけで自動的にwebhookを設定します。

![Register webhook](/img/add-app-webhook.png)

### Adding a webhook automatically on the Code tab　コードタブでwebhookを自動的に追加

You can automatically register a webhook to the repository on the `Code` tab of the app. This requires:　アプリの`Code`タブで、webhookをリポジトリに自動的に登録できます。須要：

* that you have admin rights to the repository　リポジトリに対する管理者権限があること
* that the account that hosts the repository is connected to your Bitrise account.　リポジトリをホストするアカウントがBitriseアカウントとコネクトしていること。

Open your app on bitrise.io and go to the `Code` tab.　bitrise.ioでアプリを開き、`Code`タブに移動します。

![Code tab](/img/code-tab.png)

Find the `INCOMING WEBHOOKS` section and click `SETUP AUTOMATICALLY`. `INCOMING WEBHOOKS`セクションを見つけて、 `SETUP AUTOMATICALLY`をクリックします。

![Register webhook](/img/webhook-auto.png)

## Setting up incoming webhooks manually incoming webhooksを手動設定

You can manually setup or change your webhooks after you registered your application.

You can find the supported providers in your application's Code tab. Choose the SELECT MANUALLY option to set up a webhook with any of the supported providers.

アプリケーションを登録した後に、手動でwebhookを設定または変更することができます。

サポートされているプロバイダは、アプリケーションの `Code`タブにあります。サポートされているプロバイダのいずれかとwebhookを設定するには、`SELECT MANUALLY`オプションを選択します。

![Screenshot](/img/webhook-providers.png)

[Our webhook processor is Open Sourced](https://github.com/bitrise-io/bitrise-webhooks). If you are looking for a not supported solution, you can create an issue on the GitHub page or create a pull request with the implementation. You can also run your own webhook provider behind your own firewall if required.

You can find detailed description about the setup on the Code tab or select a provider to check its devcenter article:

[webhookプロセッサーはオープンソースです](https://github.com/bitrise-io/bitrise-webhooks)。サポートされていない解決策を探しているなら、GitHubページで問題を作成するか、プルリクエストweを作成することができます。必要に応じて、自身のwebhookプロバイダを自身のファイアウォール内で実行することもできます。

コードタブでセットアップに関する詳細な説明を見つけるか、devcenterの記事をチェックするためにプロバイダを選択することができます。

* [Adding a GitHub webhook](/webhooks/adding-a-github-webhook)
* [Adding a Bitbucket webhook](/webhooks/adding-a-bitbucket-webhook)
* [Adding webhooks for Gitlab](/webhooks/adding-a-gitlab-webhook)
* [Adding webhooks for Visual Studio Online / Visual Studio Team Services](/webhooks/adding-a-visual-studio-webhook)
* [Adding webhooks for Slack](/webhooks/adding-a-slack-webhook)
* [Adding webhooks for Gogs](/webhooks/adding-a-gogs-webhook)
* [Adding webhooks for Deveo](/webhooks/adding-deveo-webhook)
* [Adding webhooks for Assembla](/webhooks/adding-assembla-webhook)
* [GitHubウェブフックの追加](/webhooks/adding-a-github-webhook)
* [ Bitbucketウェブフックの追加  ](/webhooks/adding-a-bitbucket-webhook)
* [Gitlab用のWebフックの追加]()
* [ Visual Studio Online / Visual Studio Team Services用のWebフックの追加](/webhooks/adding-a-visual-studio-webhook)
* [ Slack用のWebフックの追加  ](/webhooks/adding-a-slack-webhook)
* [Gogs用のWebフックの追加](/webhooks/adding-a-gogs-webhook)
* [Deveo用のWebフックの追加](/webhooks/adding-deveo-webhook)
* [Assembla用のWebフックの追加](/webhooks/adding-assembla-webhook)

## Setting up outgoing webhooksを設定

You can also set up [outgoing webhooks](/webhooks/adding-outgoing-webhooks/) on Bitrise. With these, Bitrise can notify any selected service about your build events. A build event is: 

Bitriseに[outgoing webhooks](/webhooks/adding-outgoing-webhooks/)を設定することもでき,また、ビルドイベントについて選択したサービスに通知することができます。ビルドイベントは次のとおりです：

* when a build is started
* when a build ends.
* ビルドが開始されたとき 
* ビルドが終了したとき

## Troubleshooting トラブルシューティング

See the [Webhook Troubleshooting](/webhooks/troubleshooting) guide for webhook related troubleshooting / debugging notes. Webhook関連のトラブルシューティング/デバッグに関する注意事項については、[Webhook Troubleshooting](/webhooks/troubleshooting)ガイドを参照してください。