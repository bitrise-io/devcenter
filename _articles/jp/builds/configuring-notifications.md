---
title: 通知設定
redirect_from: []
date: '2019-03-22T11:09:35.000+00:00'
menu:
  builds-main:
    weight: 2
    title: Configuring notifications

---
通知は、Bitriseでのあなたの活動に関する最新情報です。通常はビルドの状態に関係しますが、異なることについての通知も受け取ることができます。

## Email通知

Bitriseのビルドイン電子メール通知システムはビルドについてのメールをアプリケーションで作業を与えられたすべてのユーザーに送られます。ビルドが終了したときに送信されます。

{% include message_box.html type="info" title="アプリを監視" content="自動電子メールメッセージを受信するには[アプリを監視する必要があります](/builds/configuring-notifications/#watching-an-app)。監視をオフにすると、自動メールは届きません。"%}

電子メール通知は、最初に作成したときにすべてのアプリケーションに対して自動的に設定されます。デフォルトでは、成功したビルドと失敗したビルドには異なる設定があります。

可能な３つの設定：

* **常にメールを送る**：失敗したビルドのデフォルト設定です。
* **電子メールを送信しない**：
* **同じブランチでビルドステータスが変わったときにメールを送信する**：ビルドが成功した場合のデフォルト設定です。ビルド＃1とビルド＃2の両方が成功した場合、ビルド＃2についての通知は表示されません。ただし、ビルド＃3が失敗してからビルド＃4が再び成功した場合は、通知されます。

![](/img/email-from-bitrise.png)

別の解決策は、専用のステップを介してEメールを送信することです。通知に関するカスタマイズが可能になります。

このガイドでは両方のオプションについて説明します。

### アプリを監視

アプリ監視とはアプリの電子メール通知が届くということです。作成した、または招待されたすべてのアプリのデフォルト設定であり、**アプリ監視をオフにすると、自動通知は表示されなくなります。**

機能を切り替えるには、ダッシュボードに移動して監視または監視解除にします。右上に、現在アプリを監視している場合は、`Watching`というラベルの付いたボタンが表示されます。そうでない場合は、`Watch`と表示されます。

![](/img/watching.png)

### Eメール通知設定

いつでもEメール通知設定を変更することができます - また、完全に無効にすることも可能です。

1. ダッシュボードを開きます。
2. 設定したいアプリを選択します。
3. `Settings`タブに行きます。
4. メール通知までスクロールします。

   ![](/img/email-notifications.png)
5. 適切なドロップダウンメニューから、成功したビルドと失敗したビルドの両方に必要な設定を選択します。  たとえば、通知の受信を無効にしたい場合は、両方のオプションを**電子メールを送信しない(Never send email)**に設定します。

### Stepでメール送信

`Send Email with Mailgun`ステップでは、HTMLまたはプレーンテキスト形式のいずれかで、カスタマイズされた情報とともにどのEメールアドレスにも送信できます。環境変数を使用して情報を送信したり、ファイルをEメールに添付したりできます。

ステップを使用するには、以下が必要:

* Mailgunアカウント
* [Mailgun APIキー ](https://help.mailgun.com/hc/en-us/articles/203380100-Where-can-I-find-my-API-key-and-SMTP-credentials-)
* [Mailgunドメイン名](https://help.mailgun.com/hc/en-us/articles/203637190-How-do-I-add-a-domain-)

{% include message_box.html type="important" title="Make sure that the Step runs in every build!" content="If you use the `Send Email with Mailgun` Step in your workflow, make sure that [it is always set to run even if the previous Step failed](/getting-started/getting-started-steps/#skipping-steps)! This is the default setting of the Step. If you change it, you will not receive emails if your builds fail."%}

{% include message_box.html type="important" title="ステップがすべてのビルドで実行されていることを確認してください！" content="ワークフローで`Send Email with Mailgun`ステップを使用する場合は、[前のステップが失敗した場合でも常に\[実行\]に設定されている](/getting-started/getting-started-steps/#skipping-steps)ことを確認してください。これはステップのデフォルト設定であり、変更しても、ビルドに失敗してもEメールは送られません。"%}

1. Mailgun APIキーを保存するシークレット環境変数を作成します。  キーに`$MAILGUN_API_KEY`という名前を付けることをお勧めします。（ステップの関連入力のデフォルト値です）。
2. Mailgunドメインを保存するシークレット環境変数を作成します。  キーに`$MAILGUN_DOMAIN`という名前を付けることをお勧めします。（ステップの関連入力のデフォルト値です）。
3. ワークフローの最後に`Send Email with Mailgun`ステップを追加します。
4. ステップの`Send To emails`入力をクリックしてから、`Select secret variable`をクリックします。
5. Eメールアドレスのリストを含む新しいシークレット環境変数を作成します。  好きなキーを選ぶことができますが、アドレスはコンマで区切る必要があります。

   ![](/img/email-list-secret.png)
6. Eメールの件名、および2つのEメールメッセージを設定します：1つは成功したビルド用、もう1つは失敗したビルド用です。
   * 環境変数はどの入力（件名とメッセージ）にも挿入できます。Eメールでは、変数の値が表示されます。
   * デフォルトのメッセージでは、アプリの名前、ビルド番号、およびビルドが成功したか失敗したかが送信されます。
7. 必要に応じたファイルを添付:　`File attachments`入力は、ファイルパスまたは環境変数を入力として受け入れます。

   複数のファイルを添付することが可能：パスをコンマで区切ります。

ビルド実行し - Eメールをチェックしよう！

## Slackとの統合

BitriseはSlack統合をサポートしており、簡単にセットアップできます。 Slackメッセージを個々のユーザー、グループ、またはチャンネルに送信でき、メッセージカスタマイズ、ファイル送付、ユーザーをビルドページに移動させるリンクボタンを追加しています。

**当社の専用ステップを使用するには、Slackボットユーザー用の**[Slack webhook URL](https://api.slack.com/incoming-webhooks)または[Slack APIトークン](https://api.slack.com/bot-users)が必要です。

{% include message_box.html type="important" title="ステップがすべてのビルドで実行されていることを確認してください！" content="ワークフローで`Send a Slack message`ステップを使用する場合は、[前の]()[ステップが失敗した場合でも常に実行するように設定されていること](/getting-started/getting-started-steps/#skipping-steps)を確認してください。これはステップのデフォルト設定であり、変更した場合、ビルドが失敗してもメッセージは送信されません。"%}

1. `Send a Slack message`ステップをワークフローに追加します。
2. `Slack Webhook URL`または`Slack API token`入力をクリックしてから、`Select secret variable`をクリックします。

   ![](/img/slack-step.png)
3. WebhookURLまたはSlack APIトークンを保存する新しいシークレット環境変数を作成します。

   好きなキーを選ぶことができます。
4. ステップの関連入力のSlackメッセージをカスタマイズできます。

   オプション：
   * ターゲットチャンネル、グループ、またはユーザー名を設定します：名前またはエンコードされたIDです。
   * 送信するメッセージのテキスト。
   * メッセージボットのユーザー名
   * メッセージの色
   * 添付ファイル
   * メッセージに添付されているリンクボタン

   Slackメッセージをカスタマイズする方法を確認するには、ワークフローエディターの入力を確認してください。

完了したら、ビルドを開始しよう！