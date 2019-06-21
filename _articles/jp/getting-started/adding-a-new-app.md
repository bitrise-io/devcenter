---
title: 新しいアプリの追加
redirect_from:
- "/jp/getting-started/adding-a-new-app/connecting-a-repository/"
- "/jp/getting-started/adding-a-new-app/setting-up-configuration/"
- "/jp/getting-started/adding-a-new-app/setting-up-ssh-keys/"
- "/jp/adding-a-new-app/"
- "/jp/getting-started/adding-a-new-app/index/"
menu:
  getting-started-main:
    weight: 5

---
Bitriseにあなたのアプリを追加すると、リポジトリをクローンしてアクセス出来ることを確認します。リポジトリのクローンのほかに、サポートされているすべてのアプリケーションを検出しアプリをビルドして配布するのに必要なワークフローを設定するため\[プロジェクトスキャナ\]（https://github.com/bitrise-steplib/steps-project-scanner）を実行します。

{% include message_box.html type="note" title="現在以下のプロジェクトをサポートしています" content="

* iOS
* Android
* Xamarin
* Fastlane
* macOS
* Cordova
* Ionic
* React Native "%}

Bitriseに新しいアプリを追加するには、\[ダッシュボード\]（https://bitrise.io/dashboard）に移動し、`Add new app`ボタンを押します。

![スクリーンショット](/img/adding-a-new-app/add_new_app.png)

これが最初のアプリケーションの場合、ダッシュボードにはあなたのアプリ一覧の代わりにクイックスタートガイドが表示されます。そこにすぐ最初のアプリを追加することができます。

## レポジトリへのアクセス

新しいアプリの追加を選択すると、`Create app`ページが表示されます。

まずアプリのプライバシー設定を、パブリックまたはプライベートから選択してください。

* プライベート設定のアプリは、あなたとあなたの組織に所属するメンバー、およびこのアプリに招待された人のみがアクセスできます。このアプリのリポジトリにアクセスするためには、認証が必要です。
* [パブリック設定のアプリ](/adding-a-new-app/public-apps)は、その`bitrise.yml`とビルドのログが公開されます。パブリック設定のアプリのビルドURLがある場合、トラブルシューティングを支援するためにビルドログも閲覧できます。パブリック設定のアプリは認証が必要ないため、SSHキーはありません。

Bitriseには、あらゆるGitリポジトリに接続するためのオプションがあります。`GitHub`と`GitLab`、`Bitbucket`に接続する場合は、特別な追加設定は不要です。

例えば、すでにGitHubでBitriseを認証している場合、Bitriseは自動であなたのすべてのリポジトリを一覧表示します。あとはその中から接続したいもの選択するだけです。

{% include message_box.html type="note" title="任意のGitリポジトリとの接続" content=" 公開・または非公開を問わず、任意のGitリポジトリとBitriseとを接続させることが可能です。Bitriseは自動でSSHキーを生成するため、それを使ってプロバイダとの接続を設定できます。 "%}

![Screenshot](/img/adding-a-new-app/connect-repo.png)

あなたのリポジトリをホストしているプロバイダで[Bitriseを認証](/getting-started/adding-a-new-app/connecting-account-bitrise) していない場合、リポジトリは許可を要求します。

![Screenshot](/img/adding-a-new-app/authorize-at-provider.png)

上の図のようにリポジトリは一覧で表示されます。もしGitHubやBitbucket以外でホストされているリポジトリに接続したい場合は、`Other / Manual`を選択してください。

![Screenshot](/img/adding-a-new-app/add-other-repo.png)

接続したいリポジトリのGit URLを入力してください。

{% include message_box.html type="warning" title="プライベートリポジトリとの接続にはSSH URLを使用してください" content="プライベートリポジトリに接続する場合、BitriseはSSH経由でクローンを行います。そのため、リポジトリのSSH URLを入力する必要があります。"%}

この後のステップで、BitriseはあなたのリポジトリにSSHキーを追加します。 SSHキーを自動または手動で追加する方法について詳しくは[SSH keys](/adding-a-new-app/setting-up-ssh-keys/)をご覧ください。

## SSHキーの設定

SSHキーはサービス間でのセキュアな情報転送を担います。Bitriseにおいては、GitHubなどのプロバイダでの認証のためにあなたの許可を求めます。Bitriseを認証する方法について詳しくはこちらをご覧ください。

認証が必要となる理由は、Bitriseがあなたのリポジトリからクローンする際にSSH通信を行うためです。セットアップはいくつかの方法で行うことができます。自動または手動セットアップ、あるいは自分で生成したSSHキーを使用する方法があります。

{% include message_box.html type="warning" title="プライベートアプリには必ずSSH URLを使用する" content=" SSHキーによる認証を行うサービスの多くはSSH URL(`git@github.com:bitrise-io/bitrise.git`など) **のみ対応**しており、HTTPS URL(`https://github.com/bitrise-io/bitrise.git`など)は**非対応**です！このため、**使用されるすべてのプライベートリポジトリはSSH URLで指定される必要があります**。CocoaPodsの`Podfile`内でプライベートのGitリポジトリを直接参照している場合は、その参照にもSSH URLを使用する必要があります！[Bitrise.io](https://www.bitrise.io/)に登録されたSSHキーを使用する`サブモジュール`やその他のプライベートリポジトリについても、同様に設定を行ってください。 "%}

{% include message_box.html type="note" title="パブリックアプリにはHTTPS URLを使用する" content=" パブリックアプリはSSHキーを持つことはできません。アプリのプライバシー設定をパブリックにした場合、認証は不要になるため、HTTPS URLを使用してください。 "%}

## 自動セットアップ

GitHub、GitLabおよびBitbucketのリポジトリをセットアップする場合、BitriseはSSHキーペアを生成します。リポジトリへのSSHキーの登録は、デプロイキーとして自動で行うか、または手動で行うことができます。

![Screenshot](/img/adding-a-new-app/bitrise_auto_add_ssh_key2.png)

キーを自動で登録するためには、リポジトリの管理者権限が必要です。権限がない場合は、公開鍵をコピーしてリポジトリに登録してください。

自動登録の場合、読み取り専用の[デプロイキー](https://developer.github.com/guides/managing-deploy-keys/#deploy-keys)としてリポジトリに登録されます。これは最も安全な方法です。

## 手動セットアップ

非公開の依存関係やサブモジュールがある場合、生成されたSSHキーを手動でプロバイダに設定する必要があります。これは、デプロイキーはそれぞれ１つのリポジトリにのみ有効であるからです。

追加のプライベートリポジトリを使用する必要があるかを確認されたら、`I need to`をクリックし、SSHキーをコピーしてください。

![Add own SSH key](/img/adding-a-new-app/own-ssh.png)

{% include message_box.html type="note" title="Botユーザの利用" content="シンプルな解決策は、リポジトリにアクセスできるSSHキーを持ったBotユーザを追加することです。**利用したいユーザにSSHキーを追加し、ユーザをプロジェクトに追加してください。**。Botユーザの権限は読み取りのみで充分です。これらの設定を行うことで、SSHキーを使ってリポジトリやサブモジュールをクローンできるようになります。 "%}

{% include message_box.html type="warning" title=" SSHキーをリポジトリのデプロイキーには**追加しないでください**" content="SSHキーはリポジトリにアクセスできるユーザアカウントに対して追加してください。"%}

### GitHub

![Screenshot](/img/adding-a-new-app/ssh-github.png)

### Bitbucket

![Screenshot](/img/adding-a-new-app/ssh-bitbucket.png)

### GitLab

![Screenshot](/img/adding-a-new-app/ssh-gitlab.png)

### 自分で生成したキーを使用する

このオプションは、特定のユーザの秘密鍵を持っている場合に利用できます。秘密鍵をペーストするだけで、[Bitrise](https://www.bitrise.io)はリポジトリにアクセスできるようになります。

プロジェクトに [SSHキーの設定](/adding-a-new-app/setting-up-ssh-keys) がなされれば、 Bitriseはコードをダウンロードし、レポジトリにアクセスできることを確認します。そして、自動的にコードをスキャンし、もっとも最適なプロジェクトの初期設定を検知しようとします。 現時点でBitriseは、`iOS`, `Android`, `Xamarin` および `fastlane` のプロジェクトに対応しています。

他のプロジェクトの設定も可能ですが、手動での設定が必要になります。

## プロジェクトの自動設定

デフォルトのブランチとして、プロジェクトが含まれるレポジトリのブランチ名を入力してください。このブランチには、プロジェクトの設定が含まれている必要があります。一度、`Next（次へ）`を押すと、Bitriseは自動でレポジトリの検証を始めます。

![ブランチの選択](/img/adding-a-new-app/choose-branch.png)

検証中に、Bitriseは設定した[SSHキー](/adding-a-new-app/setting-up-ssh-keys)を使って、指定されたブランチへアクセスできることを確認します。

検証が成功すると、Bitriseはレポジトリをスキャンし、プロジェクトの設定に基づいたデフォルトワークフローを提示します。

## プロジェクトの手動設定

検証が失敗した場合、`Restart scanning without validation（検証せずに再スキャン）`を選んでください。

![検証が失敗した場合](/img/adding-a-new-app/validation-failed.png)

この場合は、手動で設定を行う必要があります。`Next（次へ）`をクリックしてください。再び`Validating Repository（レポジトリの検証）`という文言が表示されますが、この回ではBitriseは、指定されたレポジトリにアクセスができることのみの検証を行います。

プロジェクトの種別（例えばXamarin）を選んで、必要な情報（例えばXamarinソリューションファイルのパス）を入力してください。ビルドを行いたいスタックを選択することもできます。

![プロジェクト種別の選択](/img/adding-a-new-app/select-project-type.png)

{% include message_box.html type="note" title="検証の再試行" content=" もしプロジェクトの自動設定をやり直したい場合は、検証の再試行ができます。検証に失敗した原因を修正した後に、`Project build configuration（プロジェクトのビルド設定）`のウィンドウから、`Detected（検出済み）`タブに移動し、`Restart current validation（検証の再試行）`を選んでください。"%}

## Webhook の設定

プロジェクトの設定が完了すれば、すぐにwebhookの登録が可能になります。webhookが設定されていれば、レポジトリ内のコードの変更があれば、自動的に作成された`primary（プライマリ）`ワークフローがデフォルトで起動されます。

webhooksについて詳しくは、[Webhooks](/webhooks)の章をお読みください。