---
changelog:
last_modified_at:
tag: []
title: Bitriseへのサインアップ (Signing up to Bitrise)
redirect_from:
- ''
description: ''
published: false

---
Bitriseでは、ご自身でGitHub、Bitbucket、もしくはGitLabユーザーの認証を行うことができます。ワンクリックでのログインなどの実践的な恩恵を受けることができるほか、上記のプロバイダにホストされているレポジトリを追加する際に、Gitアカウントを再度許可する必要もありません。メールアドレスを使用したサインアップももちろん可能ですので、ユーザークレデンシャル経由でログインしてください。

{% include message_box.html type="info" title="サインアップ後のトライアル" content="フリーアカウントへのサインアップが完了すると、自動的にBitrise Developerプランの2週間無料トライアル権が付与されます。プラン内容は以下のとおりです：

* ビルド時間45分
* 1000ビルド/月
* 最大100名までチームメンバーの追加が可能

[料金](https://www.bitrise.io/pricing/teams)のページより他のプランも確認することができます。"%}

## Gitプロバイダを使用したサインアップ

1. [**Sign up**](https://app.bitrise.io/users/sign_up) ページに進みます。
2. 認証を行うGitプロバイダを選択します。

   ![{{ page.title }}](/img/sign-up-git-email.jpg)

### Gitプロバイダを使ってBitriseを許可する

Gitプロバイダとの接続を確立する前に、Bitriseを許可する必要があります。これはBitriseがレポジトリへのアクセスまたは読み取りを行うのを許可するためです。

#### GitHub

![{{ page.title }}](/img/signing-up/github_authorization.png)

GitHub上の**Authorize application** (アプリの認証) をクリックすると、Bitriseへリダイレクトされます。

#### Bitbucket

![{{ page.title }}](/img/signing-up/bitrise_authorization.png)

Bitbucket上の**Grant access** (アクセスを許可する) をクリックすると、Bitriseへリダイレクトされます。

#### GitLab

![{{ page.title }}](https://yv69yaruhkt48w.preview.forestry.io/img/signing-up/gitlab_authorization.png)

GitLab上の**Authorize** (認証する) をクリックすると、Bitriseへリダイレクトされます。

### サインアップを完了する

Bitriseアカウントを作成するには、ユーザーネームとパスワードを用意する必要があります。この方法により一定のサービスのアベイラビリティへの依存から脱却できるだけでなく、より多くのアカウントに接続することができます。接続済みアカウントのユーザーネームと同じにする必要はありません。

1. **You are almost there**のページにてBitriseアカウント用のユーザーネームとパスワードを設定します。

   ![{{ page.title }}](/img/you-re-almost-there.jpg)

   以下の要求を満たす**強いパスワード**を設定する必要があります。
   * 12字以上であること
   * 最低1字以上の大文字が含まれること
   * 最低1字以上の小文字が含まれること
   * 最低1字以上の数字が含まれること
   * 3回連続で同じ文字・数字の使用不可 (aaa)
   * アルファベット順（反対も含む）は使用不可 (abcd, dcba)
   * 番号順（反対も含む）は使用不可 (1234, 4321)
2. **Help us help you** ページにて、ご自身の名前（名・姓）、会社名、そして任意で詳細情報を入力します。後ほど追加することも可能です。

これで完了です。ダッシュボードにアプリを追加してみましょう！

完了後は、一回のクリックだけでログインすることが可能になります。お好きな方法をお選びください。

## メールによるサインアップ

メールアドレスを使って簡単にBitriseへサインアップすることが可能です。

1. [Sign Up](https://app.bitrise.io/users/sign_up)ページ上でご自身のメールアドレス、ユーザーネーム、パスワードを入力します。
2. **Sign up with Email** (メールを使ったサインアップ) ボタンをクリックします。
3. Eメールの受信ボックスに**Confirmation Instructions** (確認メール) が届いているかを確認します。万が一届いていない場合は、**Resend confirmation email** (確認メールの再送) ボタンをクリックします。
4. 届いたメールから、**Confirm My Account** (アカウント承認) ボタンをクリック、もしくはURLをコピーします。**Help us help you** ページへ遷移されます。

   ![{{ page.title }}](/img/confirmation-instructions.jpg)
5. **Help us help you**ページにて、名前（名・姓）、会社名、ご希望に応じて他の詳細情報を入力します。後で入力することも可能です。
6. **Done** (終了) をクリックします。Bitrise Dashboardに遷移されます。

これで、アプリをダッシュボードに追加することができます！

## SSOを使ったサインアップ

Bitriseにサインアップして、Workspaceの[SAML SSO](/team-management/organizations/saml-sso-in-organizations/)を使ってBitrise Workspace に加入することができます。

{% include message_box.html type="important" title="サインアップする前に" content="IdP側では、Administrator (管理者)がBitrise SAML SSO アプリのWorkspaceへユーザーを追加する必要があります。**Sign up with SSO**経由でどのBitrise Workspaceに加入すればいいのかわからない場合、Bitrise Workspace内の[Group menu](/team-management/organizations/members-organizations/#adding-members-to-organizations)からBitrise Workspaceのオーナーによって招待してもらうことができます。"%}

Bitriseへのサインアップ方法を確認していきます。

1. [Sign up](https://app.bitrise.io/users/sign_up)ページに進みます。
2. **Sign up with SSO**ボタンをクリックします。  
   **Initiative Single Sign-On**ページに遷移されます。

   ![{{ page.title }}](/img/saml-sso-sign-up.jpg)
3. Bitrise Workspaceのオーナーから受け取った**Bitrise Workspace's Name** (Bitrise Workspace名) を入力します。**Continue with SSO** (SSOを使って続ける) をクリックすることで、Workspaceの接続されたSAML SSOプロバイダに遷移します。
4. SAML SSOアカウントと紐付いているクレデンシャルを入力します。
5. **Almost there**ページでは、SAML SSOアカウントにある登録済みのメールアドレスが自動的に**Email**欄に入力されています。自動生成された**Username** (ユーザーネーム) は変更することも可能です。

   ![{{ page.title }}](/img/signup-saml-almost-there-1.jpg)
6. **Finish Sign Up** (サインアップを終える) をクリックします。
7. letsconnect@bitrise.ioから送られたEメールを受信ボックスより確認して、指示に従ってください。
8. **Help us help you**ページに遷移されるので、そこで更に詳細情報を入力することができます（あとからの入力でもOK）。

ここまで順調に行けば、ダッシュボードから組織のアプリを確認することができます。**Account Settings** (アカウント設定) に進むと、加入したWorkspaceについて見ることが可能です。