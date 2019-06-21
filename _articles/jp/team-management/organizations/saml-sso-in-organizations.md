---
title: 組織内のSAML SSO
date: 2019-03-08T10:46:00.000+00:00
redirect_from: []
menu:
  organizations:
    weight: 15

---
組織のメンバーであれば、ご自身のSAML SSOプロバイダシステムを使ってBitriseへログイン・サインアップすることができます。SAML SSOがあれば、ご自身のBitrise組織へアクセスする際、組織はSAML SSOプロバイダのセキュリティガイドラインを適用することが可能です。

ここでは以下のトピックについて説明いたします：

* Bitrise組織のSAML SSOのセットアップ
* SAML SSOの有効化
* Bitrise上でSAML SSOステータスの確認
* SAML SSOの施行について
* Bitriseアカウントを使ったSSO経由でのログイン
* Bitriseアカウントを使わないSSO経由でのログイン
* SAML SSOの無効化

{% include message_box.html type="important" title="組織にSAML SSOを接続する前に" content=" 以下の点についてご留意ください：

* Bitriseへ接続が可能なSAML SSOプロバイダ（アイデンティティ・プロバイダ）を持っていること
* Bitriseのご自身のアカウントに組織があること。組織がない場合、[作成]()してください。SAML SSOのセットアップはBitrise上の**すでに存在する組織や新しい組織**と同じになります。
* 他の[組織マネジメントアクション](/jp/team-management/organizations/members-organizations/)と同じで、組織オーナーだけがBitrise組織へSAML SSOのセットアップが行えます。"%}

## Bitrise組織のSAML SSOのセットアップ

このチュートリアルでは、組織オーナーによるSAML SSOのセットアップ方法とメンバー個人個人の組織内の接続をセットアップするために必要な組織メンバーを招待する方法を説明します。

1. [bitrise.io](https://www.bitrise.io)上にある組織の`Single Sign On` タブに進みます。
2. `Single Sign-On URL`をコピーします。SAML SSOプロバイダサイトにBitriseを追加するのにこのURLが必要になります。
3. ご自身のSAML SSOプロバイダにログインします。
4. コピーしたSingle Sign-On URLを使ってBitriseを追加します。Bitrise上で必要になるSingle Sign-On（SSO）証明書をここで生成します。
5. `Single Sign On`タブより、`Identity provider sign-on URL` と`Certificate`の欄に生成されたSSO証明書を追加します。
6. `Configure SSO` のボタンをクリックします。![](/img/SSO-page.jpg)

以上のステップをクリアすれば、あなたと組織のメンバーへSAML SSOがそれぞれの組織に接続が完了したことをお知らせする確認メールが送信されます。

## SAML SSO の有効化

この時点で、組織のオーナーがSAML SSOのセットアップが完了できたら、組織のメンバー全員はSAML SSO経由で組織にログインする前に、SAML SSOを有効化しなければなりません。

1. 全ての組織メンバーへBitriseが**確認メール**を送ります。このEメールには`Sign In via SSO` ボタンとURLが含まれています。組織のメンバーは`Sign In via SSO`ボタンをクリックするか、URLを使ってBitriseへのサインインを行ってください。

   ![](/img/saml-step-up-enabling-missing.jpg)

   このEメールでは組織オーナーのEメールアドレスも表示されます（オーナーに連絡を取る場合使用してください）。
2. SAML SSOプロバイダサイトへページが切り替わるので、そこでBitrise組織と連携しているご自身のメールアドレスを入力します。

   **SAML SSOプロバイダサイトにおいて、Bitriseで使用していない異なる（特定の組織と関係のない）メールアドレス**を入力された場合、以下のようにエラーメッセージが表示されます。**組織の正確なメールアドレス**を使ってログインしてください。

   ![](/img/no-connected-sso-for-this-email-address.jpg)
3. `Allow "organization name" to sign you in` ページへ遷移されます。

* いったん`Authorize`をクリックすると、**SAML SSO経由でこのアカウントのみの認証が可能になる**のでご注意ください。  
  Bitriseアカウントのサインイン過程を操作するのにその組織を信頼するのであれば、`Authorize` をクリックしてください。
* 招待メールが信頼していないソースから届いた場合は、`Don't allow` をクリックしてください。

以上のステップが完了すると、Bitrise Dashboardへ進むことができます。

## Bitrise上でSAML SSOステータスの確認

この時点で組織オーナーは組織のSAML SSOのセットアップが完了しました。全ての組織メンバー（オーナーを含む）がSAML SSOの有効化を完了すると、メンバー全員がSAML SSOステータスの確認ができるようになります。組織オーナーのみがアクセスできる他の機能もありますので、ここでは組織メンバーと組織オーナーそれぞれが何を閲覧できるのか説明していきます。

### 組織オーナー

1. 組織のプロフィールページへ進みます。
2. 左側のメニューより`Single Sign On` をクリックします。この`Single Sign On` タブは**組織オーナーのみが利用可能**です。

   `Review Users` と `Disable SSO` ボタンを確認することができます：

   ![/img/disable-saml.jpg](https://app.forestry.io/sites/yv69yaruhkt48w/body-media//img/disable-saml.jpg)

   `Disable SSO` は全ての組織メンバーのSAML SSOを無効化します。いったん無効化されると、組織メンバーはいつもの方法でサインインができるようになります。組織メンバー個人はご自身のSAML SSOプロバイダサイトでのみ無効化されるのでご注意ください！  
   `Single Sign On` タブから`People` タブへと進むと`Review Users`へ進むことができ、そこでは組織メンバーのSAML SSOステータスを確認することができます。

   ![](/img/peopletab-org-owner.png)

* `SAML SSO IS ENABLED`：SAML SSO経由のログインが可能です。
* `SAML SSO IS DISABLED`：`Sign in via SSO` ボタン経由のSSO接続の有効化が完了していません。有効化する場合、組織メンバーはBitriseから送られてくる確認メールの指示に従ってください。

### 組織メンバー

1. 組織のプロフィールページへ進みます。
2. 左側のメニューより`People`をクリックします。
3. `Members`の下にあるご自身の（もしくは他の組織メンバーの）SAML SSOステータスを確認してください。

   ![](/img/people-org-members.jpg)

* `SAML SSO IS ENABLED`：SAML SSO経由のログインが可能です。
* `SAML SSO IS DISABLED`：`Sign in via SSO` ボタン経由のSSO接続の有効化が完了していません。有効化する場合、組織メンバーはBitriseから送られてくる確認メールの指示に従ってください。

## SAML SSOの施行について

組織でSAML SSOを施行することによって、セキュリティレベルを上げることができます：Bitrise組織にご自身のセキュリティガイドラインを施行する事が可能です（例：パスワードフォーマットの要件、二要素認証など）。これはSAML SSOを組織へログイン・サインアップができる唯一の方法にすることができます。SAMLが施行された組織へ新たな組織メンバーを招待する際、新メンバーはその組織に加わるためにまずSAML SSOコネクションを有効にしなければなりません。

### 組織上でのSAML SSOの施行

一旦組織メンバー全員が組織に関連するSAML SSOを有効にすると、オーナーはシンプルなトグル操作だけで組織のSAML SSOを施行することができます。

1. 組織の`Single Sign On` タブへ進みます。
2. 右側へトグルを動かしSAML SSOを施行します。
3. `Save Changes`をクリックします。

   ![](/img/enforce-saml-sso-toggle.png)

### 組織のSAML SSOの施行ができない場合

オーナーが組織のSAML SSOを施行できない場合があります。それは、組織メンバーがまだメンバー自身のSAML SSOを有効化していないと発生します。

* メンバー個人のパートにおいてSAML SSO有効化ができない場合：オーナーは組織からそのメンバーを外すことができるので、残りの組織の施行プロセスを完了してください。
* メンバーが他の組織においてSAML SSOを有効化しようとした場合：オーナーはそのメンバーにログインURLを送ることができるので、正しい組織にSAML SSOを有効化するよう指示に従ってください。

![](/img/cant-enforce-saml-sso.png)

## Bitriseアカウントを使ったSSO経由でのログイン

SAML SSOコネクションがすでに組織へ追加されていて、Bitriseからログアウトしている場合、簡単にあなたの組織へログインすることができます。

1. Bitrise[ログインページ](https://app.bitrise.io/users/sign_in)より`Login via SSO`をクリックします。

   ![](/img/login-via-sso.jpg)
2. `Initiate Single Sign-on page`に切り替わります。
3. 組織名を入力します。
4. `Continue to log in`をクリックすると、ご自身のSSOプロバイダページに切り替わります。
5. 組織と関連のあるEメールアドレスを入力して、SAML SSOプロバイダの説明に沿ってください。

{% include message_box.html type="info" title="有効期限の切れたSAML SSO証明書" content=" SAML SSO証明書の有効期限が切れていてSAML SSO経由でBitriseにログインができない場合、Bitriseサポートチームにご一報ください。喜んでお手伝いいたします。"%}

## Bitriseアカウントを使わないSSO経由でのログイン

まだBitriseアカウントを持っておらず、組織オーナーがEメールにて組織への招待をしてきた場合、簡単にBitriseへのサインアップ、そして招待された組織へ入ることができます。Bitriseの`Sign In via SSO` Eメールは組織に特化しているので、数回のクリックでBitrise組織にアクセスすることができます！

1. メールボックスよりBitriseからの招待メール (letsconnect@bitrise.io)を確認します。  
   （組織オーナーからURLが送られてきた場合、新タブでリンクを開いてください。`Almost there...`ページへ遷移されるので、指示に従ってください。その後、Bitriseより確認メールが送信されますので、メールに添付されているリンクをクリックしてサインアップを完了してください。）
2. `Sign In via SSO` をクリックするか、もしくは新タブにて与えられたURLをコピーして接続を承認します。そうするとご自身のSAML SSOプロバイダサイトにページが切り替えられます。
3. ご自身のメールアドレスを入力します。（招待メールを受け取った同じメールアドレスにしてください。）
4. SAML SSOプロバイダの説明に沿ってください。
5. Bitriseの`Almost there...` ページに切り替わります。
6. Bitriseで使用したいユーザーネームを入力します。
7. `Finish Signing Up` をクリックし、サインアップを完了します。

以上のステップが完了すると、Bitrise Dashboardへ進むことができます。

## SAML SSOの無効化

組織オーナーは`Single Sign On` タブをクリックすることにより既成のSAML SSOを無効化することができます。IdPから誰かを削除する場合、Bitriseからも同じようにその組織メンバーの削除を行ってください。

### 組織のSAML SSOの無効化

1. 組織の`Single Sign On` タブへ進みます。
2. `Disable SSO` をクリックします。

   確認のポップアップが出現するので、そこからアクションの承認・キャンセルを行います。`Disable SSO`ボタンをクリックすると、**全ての組織メンバーのSAML SSOが無効化されます**のでご留意ください。完了すると、組織メンバーは普段使いのBitrise証明書を通じてログインすることができます。

![](/img/disable-sso.png)

Bitriseより組織のSAML SSOが無効化されたことを確認するEメール（letsconnect@bitrise.io）が送信されます。

![](/img/disabled-sso-email.png)

### 組織メンバーのSAML SSOの無効化

組織メンバーの名前の隣りにある`x`をクリックすると、組織からそのメンバーを削除することができます。ただ、そのメンバーのSAML SSOはまだ無効化されていないのでご注意ください。

1. SAML SSOプロバイダサイトに進みます。
2. 組織メンバーを無効化します。これをし忘れた場合、その組織メンバーはIDP接続を使うことにより再認証できてしまうのでご注意ください。

![](/img/disbale-sso-enabled-status.png)