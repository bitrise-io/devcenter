企業や組織向けに、Bitriseは自前でホストしたGitLabインスタンスへのアクセスをサポートしています。接続はカンタンです、いったんできれば内部的にホストされたリポジトリからBitriseにアプリを追加することができます[普段の使い方](/getting-started/adding-a-new-app)。 いままで使っていたようなすべての機能が内部的にホストされたリポジトリのアプリに対して可能になります！！

自身でホストしたGitLab上にアプリを用意するのは非常にカンタンです: BitriseはすべてのGitLabインスタンスに対して認証がされている必要があります、さらに**Application Id**は**Secret**は[bitrise.io](https://www.bitrise.io)においてBitrise OAuth アプリケーションに追加されている必要があります。

## 自身でホストしたGitLabインスタンスにBitriseから接続する

**自身でホストしたGitLabインスタンスへのアクセスはOrganizationsのみでご利用いただけます**。もしOrganizationプランをご利用でない場合、以下のガイドはご利用いただけません。

 1. **ルート** 権限でGitLabインスタンスへログインする
    もし **ルート権限無しで** Bitriseに接続する場合、あなたの組織の他のチームメンバーは **GitLabインスタンス上のリポジトリにはアクセスできません**。
 2. 上部のメニューバーの小さいレンチアイコンをクリックして管理画面へ移動してください。
 3. 左側のメニューバーから, `Applications`を選択して, `New Application`をクリックしてください。
    ![New Application](/img/adding-a-new-app/gitlab-newapp.png)
 4. `Name`の箇所に明確に識別できるアプリ名を入力してください。カンタンにするために私達は**Bitrise**を推奨しています。
 5. `Redirect URI`の箇所に、https://app.bitrise.io/users/auth/gitlab/callback を入力してください。
 6. `Scopes`メニューで`**api**`をチェックしてください。

    ![New Application settings](/img/adding-a-new-app/gitlab-newapp-settings.png)
 7. `Submit`をクリックしてください。次のページにおいて、`Application Id`と`Secret`を確認できます。[bitrise.io](https://www.bitrise.io)においてGitLabインスタンスへの接続はこの2つが必要になります。

    ![App id and secret](/img/adding-a-new-app/appid-secret.png)
 8. [bitrise.io](https://www.bitrise.io)でorganization'sのプロフィールの画面へ移動してください。
 9. 左のメニューバーから`Connected Accounts`オプションを選択してください.
10. GitLabのcredentialsを入力してください。:
    * App ID
    * Secret
    * 自身でホストしているURL

これで完了です！ これで内部でホストされたリポジトリにBitriseがアクセスできるようになりました。

## 自身でホストしたGitLabリポジトリから新しいアプリを追加する

始める前に、自身でホストしたGitLabインスタンスの [created an OAuth application](/getting-started/signing-up/self-hosted-gitlab#connect-a-self-hosted-gitlab-instance-with-bitrise) を確認してください。

1. [bitrise.io](https://www.bitrise.io)にログインして、上部のメニューバーの`+`をクリックし、オプションから`Add app`を選択してください。
2. Organizationアカウントを選択してください。
3. Gitのプロバイダを選択するように言われたら、GitLabを選択してください。その時`Self-hosted`オプションも選択してください。
4. もし自身でホストしたGitLabのcredentialsを設定する前なら、このタイミングで入力することもできます。
5. `Connect`をクリックしてください。

接続が完了したら、いつものように[setting up your project configuration](/adding-a-new-app/setting-up-configuration)からご利用ください。
