---
title: 組織内のSAML SSO（SAML SSO in organizations）
redirect_from: []
date: 2019-03-26 15:06:45 +0000
published: false

---
Organization members can log into or sign up to Bitrise using their own SAML SSO provider's system. With SAML SSO, organizations will be able to apply the security guidelines of their SAML SSO provider when accessing their own Bitrise organization.

組織のメンバーであれば、ご自身のSAML SSOプロバイダシステムを使ってBitriseへログイン・サインアップすることができます。SAML SSOがあれば、Bitrise組織へアクセスする際にSAML SSOプロバイダのセキュリティガイドラインを適用することが可能です。

In this guide we cover the following topics:

ここでは以下のトピックについて説明いたします：

* [Setting up SAML SSO for a Bitrise organization]()
* [Enabling SAML SSO](/organizations/#enabling-saml-sso/)
* [Checking SAML SSO statuses on Bitrise ](/organizations/#checking-saml-sso-statuses-on-bitrise/)
* [About SAML SSO enforcement](/organizations/#about-saml-sso-enforcement)
* [Logging in via SSO with a Bitrise account](/organizations/#logging-in-via-sso-with-a-bitrise-account/)
* [Logging in via SSO without a Bitrise account](/organizations/#logging-in-via-sso-without-a-bitrise-account/)
* [Disabling SAML SSO](/organizations/#disabling-saml-sso-in-an-organization/)
* Bitrise組織のSAML SSOのセットアップ
* SAML SSOの有効化
* Bitrise上でSAML SSOステータスの確認
* SAML SSOの施行について
* Bitriseアカウントを使ったSSO経由でのログイン
* Bitriseアカウントを使わないSSO経由でのログイン
* SAML SSOの無効化

{% include message_box.html type="important" title="組織にSAML SSOを接続する前に" content=" 以下の点についてご留意ください：

* you have a SAML SSO provider (Identity Provider) that you can connect Bitrise to.
* Bitriseへ接続が可能なSAML SSOプロバイダ（アイデンティティ・プロバイダ）を持っていること
* your account on Bitrise has an organization. If it doesn't have an organization, go ahead and [create one](/team-management/organizations/creating-org/). Setting up SAML SSO is the same for **existing and brand new organizations** on Bitrise.
* Bitriseのご自身のアカウントに組織があること。組織がない場合、[作成]()してください。SAML SSOのセットアップはBitrise上のすでに存在する組織や新しい組織と同じです。
* as with other [organization management actions](ht/team-management/organizations/members-organizations/), only the organization owner can set up SAML SSO to a Bitrise organization.
* 他の[組織マネジメントアクション](ht/team-management/organizations/members-organizations/)と同じで、組織のオーナーだけがBitrise組織へSAML SSOのセットアップが行えます。"%}

## Setting up SAML SSO for a Bitrise organization　Bitrise組織のSAML SSOのセットアップ

In this tutorial, we describe how organization owners can set up their SAML SSO and invite organization members to set up their own connections.

このチュートリアルでは、組織のオーナーによるSAML SSOのセットアップ方法と組織内のコネクションをセットアップするための組織メンバーの招待の方法を説明します。

1. Go to your organization's `Single Sign On` tab on [bitrise.io](https://www.bitrise.io).　bitrise.io上にある組織の`Single Sign On` タブに進んでください。
2. Copy the `Single Sign-On URL`. You will need this URL to add Bitrise on your SAML SSO provider's site.　`Single Sign-On URL`をコピーしてください。SAML SSOプロバイダサイトにBitriseを追加するのにこのURLが必要になります。
3. Log into your own SAML SSO provider.　ご自身のSAML SSOプロバイダにログインします。
4. Add Bitrise using the copied Single Sign-On URL. You're generating your Single Sign-On (SSO) credentials here which you will need in a minute on Bitrise.　コピーしたSingle Sign-On URLを使ってBitriseを追加します。
5. Add the generated SSO credentials to the `Identity provider sign-on URL` and `Certificate` fields on the `Single Sign On` tab.　`Identity provider sign-on URL` と`Certificate`の欄に生成されたSSO証明書を追加します。
6. Click the `Configure SSO` button. 　`Configure SSO` のボタンをクリックします。![](/img/SSO-page.jpg)

If you've completed the steps, you and org members should get a verification email about SAML SSO connected to the respective organization.

以上のステップをクリアすれば、あなたと組織のメンバーへSAML SSOがそれぞれの組織に接続が完了したことをお知らせする確認メールが送信されます。

## Enabling SAML SSO　SAML SSO の有効化

Now that the org owner has set up SAML SSO, everyone in the organization has to enable SAML SSO before logging into their org via SAML SSO.

この時点で、組織のオーナーがSAML SSOのセットアップが完了できたら、組織のメンバー全員はSAML SSO経由で組織にログインする前に、SAML SSOを有効化しなければなりません。

1. Bitrise sends a **verification e-mail** to all organization members. This email contains a `Sign In via SSO` button and a URL. Org members are prompted to sign in to Bitrise by clicking the `Sign In via SSO` button or using the provided URL.　全ての組織のメンバーへBitriseが確認メールを送ります。このEメールには`Sign In via SSO` ボタンとURLが含まれています。組織のメンバーは`Sign In via SSO`ボタンをクリックするか、URLを使ってBitriseへのサインインを行ってください。

   ![](/img/saml-step-up-enabling-missing.jpg)

   The email also shows the org owner's email address (should you need to contact him/her.)　このEメールでは組織のオーナーのEメールアドレスも表示されます（オーナーに連絡を取る場合使用してください）。
2. Now you are redirected to your SAML SSO provider's site where you have to provide your email address associated with your Bitrise organization.　SAML SSOプロバイダサイトへリダイレクトされるので、そこでBitrise組織と連携しているあなたのメールアドレスを入力します。

   If you provide a **different Bitrise email address on your SAML SSO provider's site which is not related to that particular organization**, you will get the below error message. Log in with the **right email address of the organization**.　**SAML SSOプロバイダサイトにおいて、Bitriseで使用していない異なる（特定の組織と関係のない）メールアドレス**を入力された場合、以下のようにエラーメッセージが表示されます。**組織の正確なメールアドレス**を使ってログインしてください。

   ![](/img/no-connected-sso-for-this-email-address.jpg)
3. You're directed to the `Allow "organization name" to sign you in` page.　`Allow "organization name" to sign you in` ページへ遷移されます。

* Click `Authorize` if you trust the organization to control your Bitrise account-sign in process. Note that once you click `Authorize`, you'll **only be able authenticate this account via SAML SSO**.　Bitriseアカウント・サインインプロセスをコントロールするのに組織を信用していれば、`Authorize` をクリックします。いったん`Authorize`をクリックすると、このアカウントのみ認証
* Click `Don't allow` if the invitation email is from an untrusted source.招待メールが信頼していないソースから届いた場合は、`Don't allow` をクリックしてください。

If all went well, you should be landing on our Bitrise Dashboard.

以上のステップが完了すると、Bitrise Dashboardへ進むことができます。

## Checking SAML SSO statuses on Bitrise Bitrise上でSAML SSOステータスの確認

Now that the org owner has set up SAML SSO for the organization and all org members (including the owner) have enabled their SAML SSO, everyone in the org can check their SAML SSO statuses. There are some extra features that only the org owner can access so we will show what org members and the org owner can see separately.

この時点で組織のオーナーは組織のSAML SSOのセットアップ、全ての組織のメンバー（オーナーを含む）がSAML SSOの有効化が完了すると、メンバー全員がSAML SSOステータスの確認ができるようになります。組織のオーナーのみがアクセスできる他の特徴もあり、ここでは組織メンバーと組織オーナーそれぞれが何を閲覧できるのか説明していきます。

### Organization owner　組織オーナー

1. Go to your organization's profile page.　組織のプロフィールページへ進みます。
2. Click `Single Sign On` on the left menu. This `Single Sign On` tab is **only available for the org owner**!　左側のメニューより`Single Sign On` をクリックします。この`Single Sign On` タブは**組織オーナーのみが利用可能**です。

   You will see the `Review Users` and the `Disable SSO` buttons:　`Review Users` と `Disable SSO` ボタンを確認することができます。

   ![/img/disable-saml.jpg](https://app.forestry.io/sites/yv69yaruhkt48w/body-media//img/disable-saml.jpg)

   `Disable SSO` disables SAML SSO for all org members. Once disabled, org members will be able to sign in with the regular sign-in procedure. Please note that an individual org member can only be disabled at your own SAML SSO provider's site!

   `Review Users` takes you from the `Single Sign On` tab to the `People` tab where you can check the org member's SAML SSO status.　`Disable SSO` は全ての組織メンバーのSAML SSOを無効化します。いったん無効化されると、組織メンバーはいつもの方法でサインインができるようになります。組織メンバー個人はご自身のSAML SSOプロバイダサイトでのみ無効化されます。  
   `Single Sign On` タブから`People` タブへと進むと`Review Users`へ進むことができ、そこでは組織メンバーのSAML SSOステータスを確認することができます。

   ![](/img/peopletab-org-owner.png)

* `SAML SSO IS ENABLED`: Login via SAML SSO is enabled.　`SAML SSO IS ENABLED`：SAML SSO経由のログインが可能です。
* `SAML SSO IS DISABLED`: The org member has not enabled SSO connection through the `Sign in via SSO` button. To enable it, the org member has to follow the instructions in the verification email from Bitrise.　`SAML SSO IS DISABLED`：`Sign in via SSO` ボタン経由のSSOコネクションが可能な状態ではありません。可能にする場合、組織メンバーはBitriseから送られてくる確認メールの指示に従ってください。

### Organization members　組織メンバー

1. Go to your organization's profile page.　組織のプロフィールページへ進みます。
2. Click `People` on the left menu.　左側のメニューより`People`をクリックします。
3. Check your (or other organization members') SAML SSO status under `Members`.　`Members`の下にあるご自身の（もしくは他の組織メンバーの）SAML SSOステータスを確認してください。

   ![](/img/people-org-members.jpg)

* `SAML SSO IS ENABLED`: Login via SAML SSO is enabled　　`SAML SSO IS ENABLED`：SAML SSO経由のログインが可能です。
* `SAML SSO IS DISABLED`: The org member has not enabled SSO connection through the `Sign in via SSO` button. To enable it, the org member has to follow the instructions in the verification email from Bitrise.　`SAML SSO IS DISABLED`：`Sign in via SSO` ボタン経由のSSOコネクションが可能な状態ではありません。可能にする場合、組織メンバーはBitriseから送られてくる確認メールの指示に従ってください。

## About SAML SSO enforcement　SAML SSOの施行について

Enforcing SAML SSO on your organization provides an extra layer of security: you can enforce your own security guidelines to your Bitrise organization (for example, password format requirements, two-factor authentication). This will make SAML SSO the only way for logging in/singing up to the organization. If you invite more org members to a SAML-enforced organization, they'll have to enable their SAML SSO connection first to join the organization.

組織でSAML SSOを施行することによって、セキュリティレベルを上げることができます：Bitrise組織にご自身のセキュリティガイドラインを施行する事が可能です（例：パスワードフォーマットの要件、二要素認証など）。これはSAML SSOを組織へログイン・サインアップができる唯一の方法にすることができます。SAMLが施行された組織へ新たな組織メンバーを招待する際、新メンバーはその組織に加わるためにまずSAML SSOコネクションを有効にしなければなりません。

### Enforcing SAML SSO on an organization　組織上でのSAML SSOの施行

Once all org members have enabled their SAML SSO related to the organization, the owner can enforce SAML SSO on the organization with a simple toggle.　一旦組織メンバー全員が組織に関連するSAML SSOを有効にすると、オーナーはシンプルなトグル操作だけで組織のSAML SSOを施行することができます。

1. Go to your organization's `Single Sign On` tab.　組織の`Single Sign On` タブへ進みます。
2. Toggle the switch to the right to enforce SAML SSO.　右側へトグルを動かしSAML SSOを施行します。
3. Click `Save Changes`.　`Save Changes`をクリックします。

   ![](/img/enforce-saml-sso-toggle.png)

### Can't enforce SAML SSO on your organization?　組織のSAML SSOの施行ができない場合

In some cases the org owner cannot enforce SAML SSO on the organization because org members have not enabled their SAML SSO connection yet.　オーナーが組織のSAML SSOを施行できない場合があります。それは、組織メンバーがまだメンバー自身のSAML SSOを有効化していないと発生します。

* An org member fails to enable SAML SSO on his part:

  The owner can remove the org member from the organization and complete the enforcement process for the rest of the organization.　メンバー個人のパートにおいてSAML SSO有効化ができない場合：オーナーは組織からそのメンバーを外すことができるので、残りの組織の施行プロセスを完了してください。
* An org member tried to enable SAML SSO with another organization:

  The owner can send the login URL to the org member who can follow the instructions to enable SAML SSO to the right organization.　メンバーが他の組織においてSAML SSOを有効化しようとした場合：オーナーはそのメンバーにログインURLを送ることができるので、正しい組織にSAML SSOを有効化するよう指示に従ってください。

![](/img/cant-enforce-saml-sso.png)

## Logging in via SSO with a Bitrise account　Bitriseアカウントを使ったSSO経由でのログイン

If SAML SSO connection has been already added to your organization and you are currently logged out of Bitrise, you can easily log into your organization.　SAML SSOコネクションがすでに組織へ追加されていて、Bitriseからログアウトしている場合、簡単にあなたの組織へログインすることができます。

1. Click `Login via SSO` on our [login page](https://app.bitrise.io/users/sign_in).  Bitrise[ログインページ](https://app.bitrise.io/users/sign_in)より`Login via SSO`をクリックします。

   ![](/img/login-via-sso.jpg)
2. You will be redirected to the `Initiate Single Sign-on page`.　`Initiate Single Sign-on page`に切り替わります。
3. Provide your organization name.　組織名を入力します。
4. Click `Continue to log in`. You will be redirected to your own SSO provider's page.　`Continue to log in`をクリックすると、ご自身のSSOプロバイダページに切り替わります。
5. Provide your email address associated with the organization in Bitrise and follow your SAML SSO provider's instructions.　組織と関連のあるEメールアドレスを入力して、SAML SSOプロバイダの説明に沿ってください。

{% include message_box.html type="info" title="有効期限の切れたSAML SSO証明書" content=" SAML SSO証明書の有効期限が切れていてSAML SSO経由でBitriseにログインができない場合、Bitriseサポートチームにご一報ください。喜んでお手伝いいたします。"%}

## Logging in via SSO without a Bitrise account　Bitriseアカウントを使わないSSO経由でのログイン

If you do not have a Bitrise account yet and an org owner invites you to his/her organization via email, you can easily sign up to Bitrise and connect to the respective organization! Our `Sign In via SSO` email is organization-specific so you're just a couple of clicks away from accessing the right Bitrise organization!　まだBitriseアカウントを持っておらず、組織オーナーがEメールにて組織への招待をしてきた場合、簡単にBitriseへのサインアップ、そして招待された組織へ入ることができます。Bitriseの`Sign In via SSO` Eメールは組織に特化しているので、数回のクリックでBitrise組織にアクセスすることができます！

1. Find the invitation email you got from Bitrise (letsconnect@bitrise.io) in your mailbox.

   (If you received an URL instead of an email from the org owner, have no fear! Opening the link in a new tab will take you to the `Almost there...` page. Follow the instructions there. You will receive a confirmation email from Bitrise which will include a link to complete the sign-up procedure.)　メールボックスよりBitriseからの招待メール（letsconnect@bitrise.io)を確認します。  
   （組織オーナーからURLが送られてきた場合、新タブでリンクを開いてください。`Almost there...`ページへ遷移されるので、指示に従ってください。その後、Bitriseより確認メールが送信されますので、メールに添付されているリンクをクリックしてサインアップを完了してください。）
2. Click `Sign In via SSO` or copy the provided URL in a new tab to acknowledge the connection. You will be redirected to your own SAML SSO provider's site.　`Sign In via SSO` をクリックするか、もしくは新タブにて与えられたURLをコピーして接続を承認します。そうするとご自身のSAML SSOプロバイダサイトにページが切り替えられます。
3. Provide your email address. (It should be the same email address where you received the invitation.)　ご自身のメールアドレスを入力します。（招待メールを受け取った同じメールアドレスにしてください。）
4. Follow your SAML SSO provider's instructions.　SAML SSOプロバイダの説明に沿ってください。
5. You will be redirected to our `Almost there...` page.Bitriseの`Almost there...` ページに切り替わります。
6. Provide a username you wish to use in Bitrise.　Bitriseで使用したいユーザーネームを入力します。
7. Click `Finish Signing Up` to complete your sign up.　`Finish Signing Up` をクリックし、サインアップを完了します。

If all goes well, you land on our Bitrise Dashboard.

全てがうまくいけば、Bitrise Dashboardに到着します！

## Disabling SAML SSO　SAML SSOの無効化

Org owners can disable an established SAML SSO for the organization with a click of a button on the `Single Sign On` tab. Please note that if you delete someone from your IdP, you have to delete that org member from Bitrise as well.　組織オーナーは`Single Sign On` タブをクリックすることにより既成のSAML SSOを無効化することができます。IdPから誰かを削除する場合、Bitriseからその組織メンバーの削除を行ってください。

### Disabling an organization's SAML SSO　組織のSAML SSOの無効化

1. Go to the `Single Sign On` tab of your organization.　組織の`Single Sign On` タブへ進みます。
2. Click `Disable SSO`.　`Disable SSO` をクリックします。

   A confirmation pop-up appears where you can confirm/cancel your action. Please note that by clicking the `Disable SSO` button, you will **disable SAML SSO for all organization members**. Once it's done, org members will be able to log in through their normal Bitrise credentials.　確認のポップアップが出現するので、そこからアクションの承認・キャンセルを行います。`Disable SSO`ボタンをクリックすると、**全ての組織メンバーのSAML SSOが無効化されます**のでご留意ください。完了すると、組織メンバーは普段使いのBitrise証明書を通じてログインすることができます。

![](/img/disable-sso.png)

You will receive an `SSO has been disabled` email from Bitrise (letsconnect@bitrise.io) which confirms the disabled SAML SSO for the organization.　Bitriseより組織からSAML SSOが無効化されたことを確認するEメール（letsconnect@bitrise.io）が送信されます。

![](/img/disabled-sso-email.png)

### Disabling one org member's SAML SSO　組織メンバーのSAML SSOの無効化

Please note if you click the `x` next to an org member's name, you remove that person from the organization but his/her SAML SSO is yet to be disabled!　組織メンバーの名前の隣りにある`x`をクリックすると、組織からそのメンバーを削除することができます。ただ、そのメンバーのSAML SSOはまだ無効化されていないのでご注意ください。

1. Go to your SAML SSO provider's site.　SAML SSOプロバイダサイトに進みます。
2. Disable the org member there. Please note that if you fail to do this, the org member will able to re-authenticate again to Bitrise using the IDP connection.　組織メンバーを無効化します。これをし忘れた場合、その組織メンバーはIDP接続を使うことにより再認証できてしまうのでご注意ください。

![](/img/disbale-sso-enabled-status.png)