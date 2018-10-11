Bitrise is powerful and complex - but getting started is easy and intuitive! You can kick off your first build within minutes of signing up. Let's go over what you need to do make that happen!
Bitriseはパワフルかつ複雑です。ですが簡単に、そして直感的に利用することができます！数分で終わるサインアップの後、あなたのアプリのビルドを行うことができます。Let's go over what you need to do make that happen!

## Signing up to Bitrise
## Bitriseにサインアップする

First of all, you need a Bitrise account. Choose one of the following to sign up:
まずは最初に、Bitriseのアカウントが必要です。サインアップに使用するものを以下より選択してください。

* [Email](/getting-started/signing-up/signing-up-with-email)
* [GitHub](/getting-started/signing-up/signing-up-with-github)
* [GitLab](/getting-started/signing-up/signing-up-with-gitlab)
* [Bitbucket](/getting-started/signing-up/signing-up-with-bitbucket)

Signing up with either of the Git service providers means you connect your Bitrise account to your account on that service provider. With a connected account, you can easily grant Bitrise access to any of your repositories on that account.
いずれかのGitサービスプロバイダを用いてサインアップし、Bitriseアカウントと紐付けます。紐付けられたアカウントを用いることで、簡単に任意のリポジトリにBitriseがアクセスすることができます。

After signing up, you can connect your Bitrise account to all of the three supported Git service providers. For example, after you signed up with GitHub, you can connect your Bitrise account to both your GitLab and Bitbucket accounts, too, and access any repositories you have on those accounts.
サインアップ後、あなたのBitriseアカウントを3つのGitサービス・プロバイダのすべてに紐付けることができます。例えばGitHubにサインアップ後、GitLabとBitbucketアカウントにも紐づけ、さらにあなたの持つ全てのリポジトリにアクセスすることができます。


## Adding apps
## アプリを追加する

[Add a new app](/getting-started/adding-a-new-app/index) any time by clicking the `+` symbol on the top menu bar and then selecting `Add app` from the dropdown menu.
トップメニューバーの`+`をクリックし、ドロップダウンメニューから`Add app`を選択することで、いつでも[新しいアプリを追加する](/getting-started/adding-a-new-app/index)ことができます。


![新しいアプリを追加する](/img/adding-a-new-app/add_new_app.png)

### Privacy
### プライバシー

Set your app's privacy setting to either **private** or [**public**](/getting-started/adding-a-new-app/public-apps):
あなたのアプリのプライバシー設定について、**private**か[**public**](/getting-started/adding-a-new-app/public-apps)を選択してください。

* Private apps can be accessed only by you, your organization members and team members.
* Public apps expose their build logs and their `bitrise.yml` file to everyone.
* privateの場合、あなたとあなたのオーガナイゼーションのメンバー、及びチームメンバーがアクセスすることができます。
* publicの場合、ビルドログ及び`bitrise.yml`ファイルは公開されます。

![App privacy](/img/adding-a-new-app/app-privacy.png)
![アプリプライバシー](/img/adding-a-new-app/app-privacy.png)

### Connect a repository
### リポジトリに接続する

Tell Bitrise where the code of your app is stored. You can either:
Bitriseにアプリのコードがどこにストアされているか指定します。以下のいずれかを選択することができます。

* [Connect a repository from a connected GitHub/GitLab/Bitbucket account](/getting-started/adding-a-new-app/connecting-a-repository). Bitrise will then automatically display all the available repositories from the selected service, all you need to do is choose one.
* Manually add the location of the source code: choose the `Other/Manual` option then paste an **HTTPS git clone URL**.
* You can also use a repository that is on [a self-hosted GitLab instance](getting-started/signing-up/self-hosted-gitlab).
* [Connect a repository from a connected GitHub/GitLab/Bitbucket account](/getting-started/adding-a-new-app/connecting-a-repository)Bitriseは選択されたGitサービスプロバイダから自動的に利用可能なリポジトリを表示します。後はリストから選択するだけです。
* 手動でソースコードの場所を指定する: `Other/Manual`を選択し、**HTTPSのgit clone URL** を入力してください。
* また、自分がホストしているGitLabインスタンスに置いているリポジトリを使うこともできます

**Why does Bitrise need write permissions on Github/Bitbucket/GitLab?** Connecting your GitHub/GitLab/Bitbucket account gives Bitrise write permission to the repositories. There are two things that Bitrise couldn't do without it:
**なぜBitriseはGithub/Bitbucket/GitLabにおいて書き込み権限が必要なのでしょうか？**
GitHub/GitLab/Bitbucketに接続すると、リポジトリに対してBitriseに書き込み権限が付与されます。それには２つの理由があります。

* Adding an SSH key to the selected repository
* Registering a Webhook for the repository
* SSH keyを選択されたリポジトリに追加するため
* Webhookをリポジトリに登録するため

### Setup repository access
### リポジトリアクセスを設定する

[Set up an SSH key to access the selected repository](/getting-started/adding-a-new-app/setting-up-ssh-keys). This is required for private apps to ensure Bitrise can clone the repository. You can:
[選択されたリポジトリにアクセスするため、SSH keyを設定します。](/getting-started/adding-a-new-app/setting-up-ssh-keys)。これはプライベートアプリでBitriseがリポジトリからクローンする為に必要です。以下のいずれかを選択することができます。

* auto-add the SSH key Bitrise generated.
* copy the public key Bitrise generated.
* use your own SSH keypair. Make sure your private key is an RSA key without a passphrase.
* Bitriseが生成したSSH keyを自動で追加します。
* Bitriseが生成したパブリックキーをコピーします。
* ユーザ自身が生成したSSHキーペアを使います。この場合、プライベートキーがパスフレーズなしのRSAキーであることが必要です。

![Screenshot](/img/adding-a-new-app/bitrise_auto_add_ssh_key2.png)
![スクリーンショット](/img/adding-a-new-app/bitrise_auto_add_ssh_key2.png)

Public apps cannot have SSH keys.
パブリックアプリはSSHキーを持つことができません。

### Validate and configure the project
### プロジェクトの検証と設定

After setting up repository access, type the branch of the repository you wish to use and click `Next`.
リポジトリアクセスを設定した後、ユーザが使いたいリポジトリのブランチを入力し`Next`をクリックします。

![Choosing branch](/img/adding-a-new-app/choose-branch.png)
![ブランチを選択する](/img/adding-a-new-app/choose-branch.png)

[Bitrise will scan and validate your repository and set up a project configuration](/getting-started/adding-a-new-app/setting-up-configuration) based on the results. If the validation fails, you can set up the project manually.
[Bitriseはユーザのリポジトリのスキャンと検証を行い、その結果を元にプロジェクト設定を行います。](/getting-started/adding-a-new-app/setting-up-configuration)もし検証に失敗した場合、手動でプロジェクトを設定することができます。

### Webhook setup
### Webhook設定

[Register a webhook](/webhooks/index/) immediately so Bitrise can start a build every time you push code into your repository. You can skip webhook setup when creating a new app: you can always set up webhooks later.
すぐに[Webhookを登録](/webhooks/index/)するため、Bitriseはいつでもリポジトリのプッシュされたコードをビルドすることができます。新しいアプリを作った際にWebhook設定をスキップすることもできますが、あとでいつでもWebhookを設定し直すことができます。

## Builds and workflows
## ビルドとワークフロー

Once you added an app, your first build will be kicked off automatically. This means running a workflow which is a collection of Steps. Steps represent a block of script execution with predefined input and output variables and they are the heart of Bitrise. You can create new workflows, chain workflows together. You can also modify Step inputs, add and remove Steps to and from workflows.
アプリを追加すると、自動的に初回ビルドが始まります。これはいくつかのステップのまとまりであるワークフローを実行することと同じです。ステップは前もって入力変数と出力変数が定義されたスクリプトのまとまりを表し、Bitriseの心臓部です。ユーザは新しいワークフローを作成し、ワークフロー同士を繋げることができます。また、ステップ入力値の修正、ワークフローからステップの追加、削除も自由に行うことができます。

* [The build process](/getting-started/builds-and-workflows)
* [Workflows](/getting-started/getting-started-workflows)
* [Steps](/getting-started/getting-started-steps)
* [ビルドプロセス](/getting-started/builds-and-workflows)
* [ワークフロー](/getting-started/getting-started-workflows)
* [ステップ](/getting-started/getting-started-steps)

## Teams and organizations
## チームと組織

Once you set up a new app, you can [start inviting team members](/team-management/index). If you have a Developer or an Organization plan, you can have unlimited team members!
一度アプリを設定すれば、[チームメンバーを招待する](/team-management/index)ことができます。もし開発者プランか組織プランに契約している場合、無制限にチームメンバーを招待できます！

You can also [create organizations](/team-management/organizations/creating-org) if you are on one of our Organization plans. Organizations allow you to manage entire teams quickly and effectively.
また、組織プランを契約している場合、[組織を作る](/team-management/organizations/creating-org)ことができます。組織を作成することですばやく、そして効率的にチームを管理できます。
