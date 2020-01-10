---
tag: []
title: プルリクエストビルドの承認 (Approving Pull Request builds)
redirect_from: []
summary: ''
published: false

---
Not all Pull Requests need to be built. After all, for most projects, anyone can create a fork of the repository and submit a Pull Request. However, if an app on Bitrise is set up with Secrets that are exposed for Pull Request builds, for example, then you probably don't want just anyone to be able to access those secrets.

全てのプルリクエストをビルドする必要はありません。これはほとんどのプロジェクトに該当しますが、どなたでもレポジトリのフォークを作成し、プルリクエストを提出することができます。例えば、もしBitrise上のアプリがSecretsとして設定されていて、PRビルド用にSecretsが公開されている場合、誰でもSecretsにアクセスできないようにしたいのではないでしょうか。

That is why you have the option to require approval for [a Pull Request build](/builds/triggering-builds/trigger-pull-request/) before it can start. This feature works somewhat differently for public and private apps:

これが理由で、開始前に[プルリクエストビルド](/jp/builds/triggering-builds/trigger-pull-request/)用に承認を必要とするオプションが存在します。機能はPublic Apps (パブリックアプリ) とPrivate Apps (プライベートアプリ) で多少異なります：

* **Private apps**: By default, Pull Requests submitted from a fork require approval [_if any Secrets are marked to be exposed for Pull Requests_](/builds/env-vars-secret-env-vars/#editing-a-secret-env-var)_._ The setting can be changed. If your secrets are NOT exposed to PRs, the build will run without asking for approval.  
  **Private apps**: デフォルトでは、[Secretsがプルリクエスト用にエクスポーズ済みであるマークされている場合](/jp/builds/env-vars-secret-env-vars/#editing-a-secret-env-var)、プルリクエストはfork require approvalから提出されます。この設定は変更できます。Secretsがプルリクエストに公開**されていない**場合、ビルドは承認を求めずに実行されます。
* **Public apps**: Pull Requests submitted from a fork require approval by default and it cannot be changed. Public apps CANNOT opt out of this feature.  
  **Public apps**: デフォルトでは、fork require approvalからプルリクエストは提出され、これは変更することはできません。パブリックアプリは、この機能を停止することはできません。

### Enabling manual approval for private apps　プライベートアプリ用にマニュアル承認を有効化する

To enable or disable manual approval, you need to be an **admin** or an **owner** on the application's team. The application MUST be private: public apps cannot opt out of this feature!

マニュアル承認を有効化・無効化するには、アプリのチーム内でadminもしくはownerになる必要があります。このアプリはプライベートである必要があります：パブリックアプリではこの機能は使えません。

1. Open the app on Bitrise.  
   Bitriseでアプリを開きます。
2. Go to the `Settings` tab.  
   `Settings`タブに進みます。
3. Scroll down to `Enable manual build approval option`.  
   `Enable manual build approval option`まで下にスクロールします。

   ![](/img/setting-enable-1.png)

   Please note that you can only change this setting for private apps! For public apps, this is ALWAYS enabled.  
   注意：この設定はプライベートアプリでのみ変更が可能です！パブリックアプリでは、**常に**有効化されています。
4. Toggle the setting to enable or disable it.

   By default, it is set to enabled.  
   設定のトグルを動かして有効化/無効化します。  
   デフォルトでは、有効化されています。

### Approving the PR build　PRビルドの承認

{% include message_box.html type="important" title="Approving the PR build　PRビルドの承認" content="Please note that approval means approval on Bitrise. Approving the Pull Request on your git hosting provider's website is not sufficient to start a build: an admin or an owner has to approve the build on Bitrise.

承認 (Approval)とは、Bitrise上での承認を意味します。gitホスティングプロバイダのウェブサイト上でのプルリクエストの承認は、ビルドを開始するのにはまだ不十分です：adminまたはownerがBitrise上でのビルドを承認する必要があります。"%}

If a Pull Request is submitted from a fork, you will be notified that a PR build is waiting for approval:

フォークからプルリクエストが提出される場合、PRビルドの承認待ちであることが通知されます。

* A notification email will be sent with the app and links to the repository itself and to the app's `Builds` page on Bitrise.
* On the git hosting provider, the status of the CI check will show `Pending - Waiting for approval`.
* On the `Builds` page of the app, a confirmation box will be displayed.
* 通知メールはアプリとリンクと共に、レポジトリとBitriseの`Builds`ページへ送信されます。
* gitホスティングプロバイダでは、CI checkのステータスは`Pending - Waiting for approval`を表示します。
* アプリの`Builds`ページでは、確認ボックスが表示されます。

![](/img/waiting-for-approval-2.png)

To approve and run the build, click the `Approve and Run Build` button. Clicking `Review` opens the Pull Request on the website of your git hosting provider.

ビルドの承認と実行を行うには、`Approve and Run Build`ボタンをクリックします。`Review`をクリックすると、gitホスティングプロバイダのウェブサイト上にプルリクエストが開かれます。