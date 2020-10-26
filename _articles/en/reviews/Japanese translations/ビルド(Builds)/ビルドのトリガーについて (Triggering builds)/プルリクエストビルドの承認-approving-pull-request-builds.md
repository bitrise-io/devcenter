---
changelog:
last_modified_at:
tag: []
title: プルリクエストビルドの承認 (Approving Pull Request builds)
redirect_from: []
description: ''
published: false

---
全てのプルリクエストをビルドする必要はありません。これはほとんどのプロジェクトに該当しますが、どなたでもレポジトリのフォークを作成し、プルリクエストを提出することができます。例えば、もしBitrise上のアプリがSecretsとして設定されていて、PRビルド用にSecretsが公開されている場合、誰にもSecretsにアクセスできないようにしたいのではないかと思います。

それが理由で、開始前に[プルリクエストビルド](/jp/builds/triggering-builds/trigger-pull-request/)用に承認を必要とするオプションが存在します。機能はPublic Apps (パブリックアプリ) とPrivate Apps (プライベートアプリ) で多少異なります：

* **Private apps**: デフォルトでは、[SecretsがPR用に公開済みマークがついている場合](/jp/builds/env-vars-secret-env-vars/#editing-a-secret-env-var)、プルリクエストはfork require approvalから提出され、この設定はいつでも変更できます。Secretsがプルリクエストに公開**されていない**場合、ビルドは承認を求めずに実行されます。
* **Public apps**: デフォルトでは、プルリクエストはfork require approvalから提出され、これは変更することはできません。パブリックアプリは、この機能を停止することは**できません**。

### プライベートアプリ用にマニュアル承認を有効化する

マニュアル承認を有効化/無効化するには、アプリのチーム内で**admin**もしくは**owner**になる必要があります。また、そのアプリはプライベートである必要があります：パブリックアプリではこの機能は使えません。

1. Bitriseでアプリを開きます。
2. `Settings`タブに進みます。
3. `Enable manual build approval option`まで下にスクロールします。

   ![{{ page.title }}](/img/setting-enable-1.png)

   注意：この設定はプライベートアプリでのみ変更が可能です！パブリックアプリでは、**常に**有効化されています。
4. 設定のトグルを動かして有効化/無効化します。  
   デフォルトでは、有効化されています。

### PRビルドの承認

{% include message_box.html type="important" title="PRビルドの承認" content="承認 (Approval)とは、Bitrise上での承認を意味します。gitホスティングプロバイダのウェブサイト上でのプルリクエストの承認は、ビルドを開始するにはまだ不十分です：adminまたはownerがBitrise上でのビルドを承認する必要があります。"%}

フォークからプルリクエストが提出される場合、PRビルドが承認待ちであることが通知されます。

* 通知メールは、レポジトリとBitriseの`Builds`ページへアプリとリンクと共に送信されます。
* gitホスティングプロバイダでは、CI checkのステータスは`Pending - Waiting for approval`を表示します。
* アプリの`Builds`ページでは、確認ボックスが表示されます。

![{{ page.title }}](/img/waiting-for-approval-2.png)

ビルドの承認と実行を行うには、`Approve and Run Build`ボタンをクリックします。`Review`をクリックすると、gitホスティングプロバイダのウェブサイト上にプルリクエストが開かれます。