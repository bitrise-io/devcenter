---
title: Webhook トラブルシューティング
menu:
  webhooks-main:
    weight: 22

---
先日（2016年9月以前に） [bitrise.io](https://www.bitrise.io) にアプリを登録した場合は、使用するgitホスティングサービス（GitHub、Bitbucket、...）に登録されているWebhook URLを確認してください。

**新しい**  `**hooks.bitrise.io**`　**webhook URLを使う場合、新しいトリガ機能（** [**skip ci**](https://bitrise-io.github.io/devcenter/tips-and-tricks/skip-a-build/) **またはタグベーストリガなど）だけが利用可能です！**

最初はwebhooks用の非オープンソースの`_bitrise.io/hooks_`エンドポイントがありましたが、登録された新しいプロジェクトはすべて新しい`_hooks.bitrise.io_` webhook URLを自動的に取得するはずです。

**それでもウェブフックが** `**bitrise.io/hooks**` **URLになる場合は、新しい** `**hooks.bitrise.io/**`**URLに置き換えてください - アプリの__`**Code**`**タブにあります。**

**デバッグ - マッピングされていなaいブランチに関連するウェブフックで何が起こるか**

ほとんどのソースコードホスティングサービスでWebhookをブランチごとに制限することはできないので、[bitrise.io](https://www.bitrise.io)は他のブランチのコードプッシュごとにwebhookコールを受け取りますが、ビルドに選択される`workflow`を指定する`trigger_map`で一致するフィルタが見つからない限りビルドを開始できません。 **Build Trigger API**を直接使用する場合も同様です。

[bitrise.io活動ページ](http://www.bitrise.io/activity)で無視されたコールを見ることができます。つまり、特定のイベントがビルドを開始したにもかかわらず開始しなかった場合は、`Activity`ページ（またはソースコードホスティングサービスのWebhook履歴 - 詳細は後述）を確認して、ビルドがトリガーされなかったか理由を調べてください。

アクティビティリストの無視されたビルドコールエントリー：

    Build trigger failed: trigger-pattern (push_branch:) (pr_source_branch:prtest/t1) (pr_target_branch:develop) did not match any defined workflow in trigger_map
    PROJECT-NAME - Run triggered with params: push-branch: , pr-source-branch: prtest/t1, pr-target-branch: develop, but no matching workflow found

Bitriseはその理由をソースコードホスティングサービス（GitHubなどのWebhookを送信したサービス）にも返すので、サービスにWebHookの履歴がある場合（GitHub、Bitbucket、...）与えられたウェブフックがそこでもビルドを引き起こさなかった理由を見ることができます！

ソースコードホスティングサービスでウェブフックの履歴を開き,　Bitriseが返したレスポンスをチェックしてください。以下参照：

    {"success_responses":[],"failed_responses":[{"status":"error","message":"trigger pattern did not match any defined mapping: Run triggered with params: push-branch: , pr-source-branch: prtest/t1, pr-target-branch: develop, but no matching workflow found","service":"bitrise","slug":"...","build_slug":"","build_number":0,"build_url":"","triggered_workflow":""}]}

詳細な応答は、新しい[**_hooks.bitrise.io_**](https://hooks.bitrise.io)Webhook URLを使用した場合にのみ作成されます。最初はwebhooks用の非オープンソースの`_bitrise.io/hooks_`エンドポイントがありましたが、登録された新しいプロジェクトはすべて新しい`_hooks.bitrise.io_`　webhook URLを自動的に取得するはずです。それでもwebhook が`_bitrise.io/hook_`URLの場合は、アプリの`_Code_`タブに、ある新しい `_hooks.bitrise.io/_`URLに置き換えてください。

## ローカルデバッグ

どのワークフローがトリガーとして選択されるかを[open source, Bitrise CLI](https://www.bitrise.io/cli)でテストすることもできます。

コードプッシュをシミュレートするには、以下を実行します：

    bitrise trigger-check --push-branch master

プルリクエストをシミュレートするには、以下を実行します：

    bitrise trigger-check --pr-source-branch=feature/a --pr-target-branch=master

タグプッシュをシミュレートするには、以下を実行します：

    bitrise trigger-check --tag 1.0.0

詳細情報とオプションについては、以下を実行します：

    bitrise trigger-check --help