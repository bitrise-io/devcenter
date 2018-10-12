新しいアプリの追加を選択すると、`Create app`ページが表示されます。

まずアプリのプライバシー設定を、パブリックまたはプライベートから選択してください。

* プライベート設定のアプリは、あなたとあなたの組織に所属するメンバー、およびこのアプリに招待された人のみがアクセスできます。このアプリのリポジトリにアクセスするためには、認証が必要です。
* [パブリック設定のアプリ](/adding-a-new-app/public-apps)は、その`bitrise.yml`とビルドのログが公開されます。パブリック設定のアプリのビルドURLがある場合、トラブルシューティングを支援するためにビルドログも閲覧できます。パブリック設定のアプリは認証が必要ないため、SSHキーはありません。

Bitriseには、あらゆるGitリポジトリに接続するためのオプションがあります。`GitHub`と`GitLab`、`Bitbucket`に接続する場合は、特別な追加設定は不要です。

例えば、すでにGitHubでBitriseを認証している場合、Bitriseは自動であなたのすべてのリポジトリを一覧表示します。あとはその中から接続したいもの選択するだけです。

{% include message_box.html type="note" title="任意のGitリポジトリとの接続" content="
公開・または非公開を問わず、任意のGitリポジトリとBitriseとを接続させることが可能です。Bitriseは自動でSSHキーを生成するため、それを使ってプロバイダとの接続を設定できます。
"%}

![Screenshot](/img/adding-a-new-app/connect-repo.png)

あなたのリポジトリをホストしているプロバイダで[Bitriseを認証](/getting-started/adding-a-new-app/connecting-account-bitrise) していない場合、リポジトリは許可を要求します。

![Screenshot](/img/adding-a-new-app/authorize-at-provider.png)

上の図のようにリポジトリは一覧で表示されます。もしGitHubやBitbucket以外でホストされているリポジトリに接続したい場合は、`Other / Manual`を選択してください。

![Screenshot](/img/adding-a-new-app/add-other-repo.png)

接続したいリポジトリのGit URLを入力してください。

{% include message_box.html type="warning" title="プライベートリポジトリとの接続にはSSH URLを使用してください" content="プライベートリポジトリに接続する場合、BitriseはSSH経由でクローンを行います。そのため、リポジトリのSSH URLを入力する必要があります。"%}

この後のステップで、BitriseはあなたのリポジトリにSSHキーを追加します。
SSHキーを自動または手動で追加する方法について詳しくは[SSH keys](/adding-a-new-app/setting-up-ssh-keys/)をご覧ください。
