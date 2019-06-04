---
title: Outgoing webhookの追加 (Adding outgoing webhooks)
redirect_from: []
date: 2019-03-28 15:38:41 +0000
published: false

---
Bitriseを構成してビルドのイベント通知を様々なサービスへ送信することができます。ビルドイベントは以下を表します：

* ビルドが開始したとき
* ビルドが終了したとき

この通知を使ってご自身のgitプロバイダにビルドステータスを共有することができます。もしそのプロバイダをBitriseがサポートしていない場合、ビルド成功・失敗について適切なチームにのみ通知する、もしくは、ご自身のin-house release pipelineを自動化して使用してください。

ウェブ上のインターフェースから簡単にwebhook の追加・消去・編集が可能です。

## Outgoing webhookの追加

ウェブUI上のBitriseが送信するwebhookのセットアップや構成が可能になります。方法は以下のとおりです！

1. [bitrise.io](https://www.bitrise.io)上のアプリページに進み、`Code`タブを開きます。
2. `+ Add webhook`をクリックします。

   ![Adding outgoing webhook](/img/webhooks/adding-outgoing.png)
3. `URL`欄に通知を受け取るサービスのURLを入力します。
4. `Send me everything` もしくは`Select individual events` のどちらかを選択します。
   * `Send me everything`: 全てのサポートされたイベントタイプがwebhookのトリガーを行います。今現在、ビルドイベントのみがサポートされておりますが、随時他のオプションもサポートしていく予定です！
   * `Select individual events`: webhookをトリガーする個々のイベントを明示することができます。
5. `Create Webhook` をクリックしてください。

これで完了です！webhookのURLの隣にある`Edit`をクリックすればいつでもwebhookの修正が行なえます。

### Outgoing webhookへカスタムヘッダの追加

追加のヘッダをウェブインタフェースの`Code`タブよりご自身のoutgoing webhookへ追加することができます。例えば、webhookにAPI listeningがある場合、カスタムヘッダとしてセットしたAPIキーを使ってリクエストの追跡が行なえます。

カスタムヘッダを追加できるのは（いずれか一方）：

* [新しいoutgoing webhookを作成する](/webhooks/adding-outgoing-webhooks#adding-an-outgoing-webhook)とき

  もしくは
* URLの隣りにある`Edit`ボタンをクリックして既存のoutgoing webhookの修正を行うとき

ヘッダを追加する：

1. Find the `WEBHOOK HEADERS` section.　`WEBHOOK HEADERS`セクションを探します。

   ![Webhook headers](/img/webhooks/webhook-headers.png)
2. ヘッダにKeyとValueを追加します。ヘッダをセーブするには両方必要になります。
3. `Add header`をクリックします。
4. `Create webhook`/`Update webhook`をクリックします。

## webhookデリバリのチェックと再送

通知がうまく送信されたかどうかや、ペイロードやレスポンスの両方を確認することができます。デリバリは適切なステータスコードでマークされており、デリバリが成功したかどうかはそれによります。成功していれば緑色のチェックマーク、失敗していればオレンジ色の三角形が確認できます。

1. `Outgoing Webhooks`のメニューより`Recent deliveries`のセクションへ進みます。
2. outgoing webhookをクリックします。

   ![Outgoing webhook](/img/webhooks/outgoing-webhook.jpeg)確認のため`REQUEST`タブを選択し、任意で特定のURLに送られたpayloadを修正することができます。

   payloadの例：

        {
          "build_slug":"1234abcd",
          "build_number":3,
          "app_slug":"abcd1234",
          "git": {
            "provider":"github",
            "src_branch":"feature/branch",
            "dst_branch":master, # If the build was triggered by a pull request
            "pull_request_id":32 # If the build was triggered by a pull request
          }
        }
3. レスポンスの確認のため、`RESPONSE`タブを通知を送信したサービスから選択します。
4. すべてのデリバリから再デリバリできるようになります。必要なデリバリを開いて`Redeliver`をクリックしてください。

   ![Redeliver](/img/webhooks/redeliver-payload.jpeg)