---
tag: []
title: ビルドトリガーが動かない (Build trigger does not work)
redirect_from: []
summary: ''
published: false

---
Unfortunately, it can happen that your build triggers do not trigger a build automatically on Bitrise. There are many potential issues that can stop your builds - let's take a look!

Bitrise上でご自身のビルドトリガーが自動的にビルドのトリガーを行わない現象が発生しまう場合も残念ながらございます。ビルドがストップしてしまう潜在的な理由が多数発見されているので、見ていきましょう！

1. Check your webhooks.

   Check that you have the webhook set up correctly. You can find out the webhook URL for your repository's hosting provider on the `Code` tab of your app and you can check in your repository's settings if they match.

   Also, you have to enable the specific event that you would like to trigger a build. For example, if your repository is hosted at GitLab and you wish to trigger builds with Git Tags, you must enable Tag Push events in your GitLab webhook.

   Check in your repository's settings if there are any error messages regarding the delivery attempts related to your webhook.

   For more information about potential issues with webhooks, check out [Webhook troubleshooting](/jp/webhooks/troubleshooting)

   Webhookをチェックします。

   Webhookを正確に設定しているか確認してください。アプリの`Code`タブよりレポジトリのホスティングプロバイダ用のWebhook URLを見つけることができます。レポジトリのSettingsを確認して、合致しているかどうかをチェックしてください。

   また、ビルドをトリガーしたい特定のイベントを有効化する必要があります。例えば、GitLabでレポジトリがホストされていて、Git Tagsを使ってビルドをトリガーするには、GitLab webhook内のTag Pushイベントを有効化してください。

   Webhookに関連するデリバリの試みに関したエラーメッセージがあるかどうかレポジトリのSettingsを確認してください。Webhookに関する問題については[Webhookトラブルシューティング](/jp/webhooks/troubleshooting)を参照してください。
2. Check the branch names and tags you set up with the trigger on bitrise.io.

   For example, if you accidentally typed `msater` instead of `master`, no build will be triggered.  
   bitrise.io上のトリガーを使用してセットアップしたブランチ名とTagsを確認します。  
   例えば、もし`master`のところを`msater`とタイプミスしてしまうと、ビルドはトリガーされません。
3. Check if you previously enabled Selective Builds for the app. You can find the option on your app's `Settings` page. With this feature, you can set that a build should be triggered only if certain files or folders have been changed.  
   過去にアプリのSelective Buildsを有効化したことがあるかチェックします。アプリの`Settings`ページでオプションを確認できます。この機能により、特定のファイルまたはフォルダが変更されたことがある場合にのみ、ビルドがトリガーされるように設定することができます。
4. Check the status page of your repository's hosting provider to see if there are any known issues.

   レポジトリのホスティングプロバイダのステータスページを確認して、既知の問題があるかチェックします。