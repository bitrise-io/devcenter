Bitriseの提供する機能（自動Webhook登録を含む）をすべて活用するには、GitHub/GitLab/BitbucketアカウントをBitriseアカウントと連携する必要があります。連携することで、そのアカウントのリポジトリにBitriseへの **書き込み権限** が付与されます。3つすべてのGitプロバイダのアカウントをBitriseアカウントと次の2つの方法で連携することができます。

* 新しいアプリを追加したときにアカウントを連携します
* `Account settings`ページからアカウントを連携します
 
 Bitriseに同じGitプロバイダ（例．2つのGitHubアカウント）から2つのアカウントを連携することはできないことにご注意ください。

1つのGitプロバイダアカウントを連携しても終わりではありません。アカウントを連携を解除して、いつでも異なるアカウントを接続することができます。

### 新しいアプリを追加したときにGitHub/GitLab/BitBucketアカウントを連携する

1. [bitrise.io](https://www.bitrise.io)アカウントでログインします。
2. 上部のメニューバーの`+`ボタンをクリックして、`Add app`を選択します。
3. `Create New App`ページ上で、アカウントを選択してアプリのプライバシー設定を設定します。
4. アプリのリポジトリのGitサービスプロバイダを選びます。Bitriseアカウントにプロバイダのアカウントが連携されていない場合はUIに連携オプションが表示されます。

   ![Connect account when adding new app](/img/signing-up/add-app-account-connect.png)
5. `Connect GitHub/GitLab/Bitbucket`をクリックします。Gitプロバイダのログインページが表示されます。
6. Gitプロバイダのアカウントでログインします。
7. Bitrise.ioを承認するように促されますので、承認してください！成功すれば、Bitriseへリダイレクトされます。ポップアップメッセージでアカウントの接続に成功したことが表示されるので、`Okay`をクリックします。

これで完了です！すべてうまくいっていれば、`Create New App`ページにリダイレクトされ、新しいアプリを追加できます。

### アカウント設定ページからGitHub/GitLab/BitBucketアカウントを連携する

1. [bitrise.io](https://www.bitrise.io)アカウントでログインします。
2. 右上にあるアバターをクリックし、`Account settings`を選択します。
3. 左メニューから、連携したいアカウントのGitプロバイダ名のトグルスイッチをクリックします。

   ![Connect account to Bitrise](/img/signing-up/connect-account.png)
4. Gitプロバイダアカウントでログインします。
7. Bitrise.ioを承認するように促されますので、承認してください！成功すれば、Bitriseへリダイレクトされます。ポップアップメッセージでアカウントの接続に成功したことが表示されるので、`Okay`をクリックします。

これで完了です！

### GitHub/GitLab/BitBucketアカウント連携の解除

1. [bitrise.io](https://www.bitrise.io)アカウントでログインします。
2. 右上にあるアバターをクリックし、`Account settings`を選択します。
3. 左メニューから、連携を解除したいGitプロバイダ名のトグルスイッチをクリックします。