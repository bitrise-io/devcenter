---
tag: []
title: Bitriseへのサインアップ (Signing up to Bitrise)
redirect_from:
- ''
summary: ''
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

   ![](/img/sign-up-git-email.jpg)

### Gitプロバイダを使ってBitriseを許可する

Gitプロバイダとの接続を確立する前に、Bitriseを許可する必要があります。これはBitriseがレポジトリへのアクセスまたは読み取りを行うのを許可するためです。

#### GitHub

![Screenshot](/img/signing-up/github_authorization.png)

GitHub上の**Authorize application** (アプリの認証) をクリックすると、Bitriseへリダイレクトされます。

#### Bitbucket

![Screenshot](/img/signing-up/bitrise_authorization.png)

Bitbucket上の**Grant access** (アクセスを許可する) をクリックすると、Bitriseへリダイレクトされます。

#### GitLab

![Screenshot](https://yv69yaruhkt48w.preview.forestry.io/img/signing-up/gitlab_authorization.png)

If you press the **Authorize** button on Gitlab, you will be redirected to Bitrise.  
GitLab上の**Authorize**をクリックすると、Bitriseへリダイレクトされます。

### Finishing signup

サインアップを完了する

You will have to pick a username and a password for your Bitrise account. This way you are free from relying on the given service’s availability, and you are also able to connect more accounts. Last, but not least, you don’t have to stick to your connected account’s username.  
Bitriseアカウントを作成するにはユーザーネームとパスワードの両方が必要です。この方法により一定のサービスのアベイラビリティへの依存から脱却できるだけでなく、より多くのアカウントに接続することができます。接続済みアカウントのユーザーネームと同じにする必要もありません。

1. Pick a username and a password for your Bitrise account on the **You are almost there** page.  
   **You are almost there**のページにてBitriseアカウント用のユーザーネームとパスワードを設定します。

   ![](/img/you-re-almost-there.jpg)

   Please note that you must provide a **strong password** which fulfills these requirements:  
   以下の要求を満たす強いパスワードを設定する必要があります。
   * It should have at least 12 characters.
   * At least one upper case character.
   * At least one lower case character.
   * At least one number.
   * Can not contain the same character more than 3 times in a row (aaa).
   * Cannot be alphabetical order or reverse order (abcd, dcba).
   * Cannot be numerical order or reverse order (1234, 4321).
   * 12字以上であること
   * 最低1文字以上の大文字が含まれること
   * 最低1文字以上の小文字が含まれること
   * 最低1文字以上の数字が含まれること
   * 3度連続で同じ文字が含まれていないこと (aaa)
   * アルファベット順（反対も含む）は使えません (abcd, dcba)
   * 番号順（反対も含む）は使えません (1234, 4321)
2. On the **Help us help you page** add your first name, last name, your company name and a few more details if you wish. You can also add those later.  
   Help us help you pageにて、ご自身の名、姓、会社名、そして任意で詳細情報を追加します。後ほど追加することも可能です。

After that, you are ready to roll. Add your first app on your Dashboard!

From now on, you are able to log in with a click of a button. Choose your favorite!

これで完了です。ダッシュボードにアプリを追加してみましょう！

この時点から、一回のクリックだけでログインすることが可能になります。お好きな方法をお選びください。

## Signing up with email

## メールによるサインアップ

You can easily sign up to Bitrise in one step with your email address.  
メールアドレスを使って簡単にBitriseへサインアップすることが可能です。

1. Add your email address, username, password and on our [Sign Up](https://app.bitrise.io/users/sign_up) page.  
   Sign Upページ上でご自身のメールアドレス、ユーザーネーム、パスワードを入力します。
2. Click the **Sign up with Email** button.  
   Sign up with Emailボタンをクリックします。
3. Check your inbox for our **Confirmation Instructions**.

   If you haven't received a confirmation email from us, click the **Resend confirmation email** button.  
   EメールのインボックスよりConfirmation Instructions (を確認します。
4. Click the **Confirm My Account** button or copy the URL provided in the email. It will take you to **Help us help you** page.  
   届いたメールから、Confirm My Accountボタンをクリック、もしくはURLをコピーします。

   ![](/img/confirmation-instructions.jpg)
5. On the **Help us help you**, page add your first name, last name, your company name and a few more details if you wish. You can also add those later.  
   Help us help youページにて、名前（名・姓）、会社名、ご希望に応じて他の詳細情報を入力します。後で入力することも可能です。
6. Click **Done**. You will be directed to your Bitrise Dashboard.  
   Doneをクリックします。Bitrise Dashboardへ遷移されます。

Now you can go ahead and add your first app to your Dashboard.  
これで、アプリをDashboardに追加することができます！

## Signing up with SSO

## SSOを使ったサインアップ

You can sign up to Bitrise and join a Bitrise Organization using the Organization's [SAML SSO](/team-management/organizations/saml-sso-in-organizations/).  
Bitriseにサインアップして、OrganizationのSAML SSOを使ってBitrise Organization (Bitrise に加わることができます。

{% include message_box.html type="important" title="Before signing up サインアップする前に" content="On the IdP side, the Administrator has to add you as a user to the Bitrise SAML SSO app's organization. To learn which Bitrise Organization you should join through **Sign up with SSO**, the Bitrise Organization owner can send you an invitation through the [Group menu](/team-management/organizations/members-organizations/#adding-members-to-organizations) of the respective Bitrise Organization.  
IdP側では、Administrator (管理者)がBitrise SAML SSO アプリのOrganizationへユーザーを追加する必要があります。**Sign up with SSO**経由でどのBitrise Organizationに加わるべきなのかを知るには、Bitrise OrganizationのオーナーがBitrise Organization内の[Group menu](/team-management/organizations/members-organizations/#adding-members-to-organizations)から招待することができます。"%}

Now let's see how to sign up to Bitrise.  
Bitriseへのサインアップ方法を確認していきます。

1. Go to our [Sign up](https://app.bitrise.io/users/sign_up) page.  
   [Sign up](https://app.bitrise.io/users/sign_up)ページに進みます。
2. Click the **Sign up with SSO** button.

   You are directed to the **Initiate** **Single Sign-On** page.  
   Sign up with SSOボタンをクリックします。  
   Initiative Single Sign-Onページに遷移されます。

   ![](/img/saml-sso-sign-up.jpg)
3. Provide the **Bitrise Organization's Name** that you got from the Bitrise Organization owner and click **Continue with SSO** so that Bitrise can direct you to Organization's connected SAML SSO provider.  
   Bitrise Organizationのオーナーから受け取ったBitrise Organization's Name (Bitrise Organization名) を入力します。Continue with SSO (SSOを使って続ける) をクリックすることにより、BitriseがOrganizationの接続されたSAML SSOプロバイダに遷移されます。
4. Provide your credentials associated with your SAML SSO account.  
   SAML SSOアカウントと紐付いているクレデンシャルを入力します。
5. On the **Almost there** page the **Email** field is automatically populated based on your registered email address at your SAML SSO account. You can alter the provided **Username** as you wish.  
   **Almost there**ページでは、SAML SSOアカウントにある登録済みのメールアドレスが自動的に入力されています。自動生成された**Username** (ユーザーネーム) は変更することも可能です。

   ![](/img/signup-saml-almost-there-1.jpg)
6. Click **Finish Sign Up**.  
   Finish Sign Up (サインアップを終える) をクリックします。
7. Check your mailbox and follow the instructions sent by letsconnect@bitrise.io.  
   letsconnect@bitrise.ioから送られたEメールを確認して、指示に従ってください。
8. You're directed to the **Help us help you** page where you can share some more details with us or add those later.  
   Help us help youページに遷移されるので、そこで更に詳細情報を入力することができます（あとからの入力でもOK）。

If all went well, you're landed on your Bitrise Dashboard where you can view the Organization's apps! If you go to your **Account Settings**, you will see the [Organization]() you've just joined.  
ここまで順調に行けば、Bitrise Dashboardから組織のアプリを確認することができます。Account Settings (アカウント設定) に進むと、加わったOrganizationについて見ることが可能です。