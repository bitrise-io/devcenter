---
title: Webhook トラブルシューティング（Webhook Troubleshooting）
redirect_from: []
date: 2019-03-28 15:45:18 +0000
published: false

---
{% include not_translated_yet.html %}

First of all, if you registered your app on [bitrise.io](https://www.bitrise.io) a while ago (especially if before 2016 Sept.) you should check the webhook URL registered on the git hosting service you use (GitHub, Bitbucket, ...).

**New trigger feature** (like [skip ci](https://bitrise-io.github.io/devcenter/tips-and-tricks/skip-a-build/) or tag based triggering) **are only available if you use the new** `**hooks.bitrise.io**` **webhook URL!**

_Initially we had a non open source_ `_bitrise.io/hooks_` _endpoint for webhooks, but every new project registered should now get the new_ `_hooks.bitrise.io_` _webhook URL automatically._

**If your webhook would still be a** `**bitrise.io/hooks**` **URL, please replace it with the new** `**hooks.bitrise.io/**` **URL - you can find this on the** `**Code**` **tab of your app!**

**Debugging - what happens with webhooks related to un-mapped branches**

少し前（2016年9月以前に） [bitrise.io](https://www.bitrise.io) にアプリを登録した場合は、使用するgitホスティングサービス（GitHub、Bitbucket、...）に登録されているWebhook URLを確認してください。  

**新しい**  `**hooks.bitrise.io**`　**webhook URLを使う場合、新しいトリガ機能（** [**skip ci**](https://bitrise-io.github.io/devcenter/tips-and-tricks/skip-a-build/) **またはタグベーストリガなど）だけが利用可能です！** 

 最初はwebhooks用の非オープンソースの`_bitrise.io/hooks_`エンドポイントがありましたが、登録された新しいプロジェクトはすべて新しい`_hooks.bitrise.io_` webhook URLを自動的に取得するはずです。

 **それでもウェブフックが** `**bitrise.io/hooks**` **URLになる場合は、新しい** `**hooks.bitrise.io/**`**URLに置き換えてください - アプリの**`**Code**`**タブにあります。**  

**デバッグ - マッピングされていないブランチに関連するウェブフックで何が起こるか**

You can't limit Webhooks by branch in most of the source code hosting services, so [bitrise.io](https://www.bitrise.io) will still receive a webhook call for every code push of other branches, but it won't start a build unless it finds a matching filter in the `trigger_map`, which specifies a `workflow` to be selected for the build. _This is also true if you use the **Build Trigger API** directly._

You can see all the ignored calls on your [Activity page on bitrise.io](http://www.bitrise.io/activity). This means that if you think a given event should have started a build but it did not, you should check your `Activity` page (or your source code hosting service's Webhook history - more info a bit below) to find out why it did not trigger a build.

An ignored build call entry in the Activity list looks like: 

ほとんどのソースコードホスティングサービスでWebhookをブランチごとに制限することはできないので、[bitrise.io](https://www.bitrise.io)は他のブランチのコードプッシュごとにwebhookコールを受け取りますが、ビルドに選択される`workflow`を指定する`trigger_map`で一致するフィルタが見つからない限りビルドを開始できません。 **Build Trigger API**を直接使用する場合も同様です。  

[bitrise.io活動ページ](http://www.bitrise.io/activity)ですべての無視されたcallを見ることができます。つまり、特定のイベントがビルドを開始したにもかかわらず開始しなかった場合は、`Activity`ページ（またはソースコードホスティングサービスのWebhook履歴 - 詳細は後述）を確認して、ビルドがトリガーされなかったか理由を調べてください。  

アクティビティリストの無視されたビルドcallエントリー：

    Build trigger failed: trigger-pattern (push_branch:) (pr_source_branch:prtest/t1) (pr_target_branch:develop) did not match any defined workflow in trigger_map
    PROJECT-NAME - Run triggered with params: push-branch: , pr-source-branch: prtest/t1, pr-target-branch: develop, but no matching workflow found

**Bitrise also returns the reason to the source code hosting service** (the service which sent the webhook, e.g. GitHub) too, so if your service has a webhook history (e.g. GitHub, Bitbucket, ...) you can see the reason why a given webhook did not trigger a build there too!

Simply open the webhook history on your source code hosting service, and check the response Bitrise returned. It will be something like:

Bitriseはその理由をソースコードホスティングサービス（GitHubなどのWebhookを送信したサービス）にも返すので、サービスにWebHookの履歴がある場合（GitHub、Bitbucket、...） webhookはそこでもビルドを引き起こしませんでした！

 単にソースコードホスティングサービスでウェブフックの履歴を開き,Bitriseが返したレスポンスをチェックしてください。以下参照：

    {"success_responses":[],"failed_responses":[{"status":"error","message":"trigger pattern did not match any defined mapping: Run triggered with params: push-branch: , pr-source-branch: prtest/t1, pr-target-branch: develop, but no matching workflow found","service":"bitrise","slug":"...","build_slug":"","build_number":0,"build_url":"","triggered_workflow":""}]}

**_These detailed responses are only generated if you use the new_** [**_hooks.bitrise.io_**](https://hooks.bitrise.io) **_webhook URL!_** _Initially we had a non open source_ `_bitrise.io/hooks_` _endpoint for webhooks, but every new project registered should now get the new_ `_hooks.bitrise.io_` _webhook URL automatically. If your webhook would still be a_ `_bitrise.io/hook_` _URL, please replace it with the new_ `_hooks.bitrise.io/_` _URL - you can find this on the_ `_Code_` _tab of your app!_

詳細な応答は、新しい[**_hooks.bitrise.io_**](https://hooks.bitrise.io)Webhook URLを使用した場合にのみ作成されます。最初はwebhooks用の非オープンソースの`_bitrise.io/hooks_`エンドポイントがありましたが、登録された新しいプロジェクトはすべて新しい`_hooks.bitrise.io_`　webhook URLを自動的に取得するはずです。それでも_webhook_ が`_bitrise.io/hook_`URLの場合は、新しい `_hooks.bitrise.io/_`URLに置き換えてください。アプリの`_Code_`タブにあります。

## Local debugging　ローカルデバッグ

You can also test which workflow will be selected for a trigger using our [open source, Bitrise CLI](https://www.bitrise.io/cli).

どのワークフローがトリガーとして選択されるかを[open source, Bitrise CLI](https://www.bitrise.io/cli)でテストすることもできます

To simulate a code push, you can run:

コードプッシュをシミュレートするには、以下を実行します：

    bitrise trigger-check --push-branch master

To simulate a Pull Request, you can run:　プルリクエストをシミュレートするには、以下を実行します：

    bitrise trigger-check --pr-source-branch=feature/a --pr-target-branch=master

To simulate a tag push, you can run:　タグプッシュをシミュレートするには、以下を実行します：

    bitrise trigger-check --tag 1.0.0

For more information and options run: 詳細情報とオプションについては、以下を実行します：

    bitrise trigger-check --help