---
title: GitLab webhookの追加
menu:
  webhooks-main:
    weight: 9

---
webhookのセットアップをすると、コードプッシュやプルリクエストなどといった特定のアクションを実行することによって、Bitriseが自動的にアプリのビルドをトリガーします。GitLabでは、`bitrise-webhooks` URLをご自身の[GitLab](https://www.gitlab.com)レポジトリ内にあるWebhookとして登録する必要があります。

オートまたはマニュアルのどちらかの方法でwebhookの登録が可能です。このガイドではwebhookを**マニュアル（手動）**で登録する方法を説明していきます。[Webhook登録を自動で行うをお読みください](/webhooks/index#setting-up-incoming-webhooks-automatically)。

## GitLab webhook URLの取得

1. アプリページの`Code`タブに進み、`INCOMING WEBHOOKS`メニューより`SETUP MANUALLY` をクリックします。
2. ドロップダウンメニューより`GitLab`を選択します。

   ![Screenshot](/img/bitrise-gitlab-webhook.png)
3. 選択したサービスのwebhook URLをコピーしてください。

## GitLab上でのwebhookのセットアップ

1. [GitLab.com](https://www.gitlab.com)よりご自身のプロジェクトを開きます。
2. プロジェクトの`Settings`へ進みます。
3. `Integrations`を選択します。

   ![Screenshot](/img/webhooks/integrations-gitlab.png)
4. URL欄にbitrise-webhooks URLを入力します。

   ![Screenshot](/img/webhooks/gitlab-webhook-url.png)
5. `Trigger`セクションの：
   * `Push events`
   * `Tag push events`
   * `Merge request events`

   を選択します。
6. `Add webhook`をクリックしてください。

これで完了です！次回以降にコードプッシュやnew tagのプッシュ、またはmerge requestの作成/ アップデートが行われた場合、ビルドがトリガーされます（Bitrise上のイベントの定義されたTrigger mappingをお持ちの方のみ）。