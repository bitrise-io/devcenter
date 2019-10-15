---
tag: []
title: GitHub Organization (組織) へBitriseのアクセスを許可する方法はありますか？ (How to grant Bitrise
  access to a GitHub Organization?)
redirect_from: []
summary: ''
published: false

---
This guide explains how to grant access for [bitrise.io](https://www.bitrise.io/) to your GitHub Organization.

このガイドでは、ご自身のGitHub Organization (組織) へbitrise.ioのアクセスを許可する方法について説明します。

{% include message_box.html type="note" title="Have you authorized Bitrise on Github? GitHub上でBitriseを認証しましたか？" content=" This guide presumes you have already [authorized](https://help.github.com/articles/authorizing-oauth-apps/) Bitrise on GitHub. このガイドでは、GitHub上ですでにBitriseを認証した状態であると仮定しています。"%}

1. Open [https://github.com](https://github.com "https://github.com").  
   [https://github.com](https://github.com "https://github.com")を開きます。
2. In the top right corner, click your avatar and select `Settings`.  
   右上にある自分のアバターをクリックして`Settings`を選択します。
3. On the left side, select `Applications`.  
   左側にある`Applications`を選択します。
4. Click `Authorized OAuth Apps`. You will see the list of apps which can access your account.  
   `Authorized OAuth Apps`をクリックします。ここでアカウントにアクセスが可能なアプリのリストを確認することができます。
5. Click on `Bitrise`.  
   `Bitrise`をクリックします。
6. Scroll down to `Organization access` and click `Grant` so that Bitrise can access your Organization's repository.  
   `Organization access`まで下にスクロールして`Grant`をクリックすると、BitriseがOrganizationのレポジトリにアクセスができるようになります。

![Screenshot](/img/faq/grant-org-access.jpg)

{% include message_box.html type="important" title="Can't see `Grant` button next to app under `Organization access` `Organization Access`においてアプリの隣りにあるべき`Grant`ボタンが表示されていない" content="If there's no `Grant` button but only a **red cross** icon next to the Organization in the `Organization access` that means that **the access was previously granted but then it was revoked**. You can fix this by first selecting the Organization under `Organization settings` on the left side, then clicking `Third-party access`. You can see `Bitrise` with `Denied` access. Click the pencil icon and `Grant access` to Bitrise. Now you can go back to your `Authorized OAuth Apps` and click on Bitrise. You should see a green tick instead of the red cross icon next to your Organization.

`Organization access`内のOrganizationの隣りにあるべき`Grant`ボタンがないが、赤色のばつ印だけが表示されている場合があります。それは、**アクセスが以前許可されていたが、後に無効化されたということを表しています**。左側にある`Organization Setting`にて最初にOrganizationを選択し、`Third-party access`をクリックすることによって直すことができます。そうすれば、`Denied`された`Bitrise`へのアクセスが確認できます。鉛筆の形をしたアイコンをクリックして、Bitriseに`Grant access`します。これでBitrise上で`Authorized OAuth Apps`に戻ってクリックしてください。Organizationの隣りにあった赤色のばつ印が緑色のチェック印になっていることが確認できます。 "%}

![Screenshot](/img/faq/third-party-access.jpg)

You can see the Organization and its repositories if you go back to [bitrise.io](https://www.bitrise.io), click on your avatar, select `Add new App` and hit `Next`.

bitrise.ioに戻り、アバターをクリックして、`Add new App`を選択し、`Next`を押すと、OrganizationとOrganizationのレポジトリを見ることができます。

{% include message_box.html type="note" title="Repository is a fork of another private repository レポジトリは他のプライベートレポジトリのフォーク (分岐点)です" content=" If the repository is a fork of another private repository which belongs to **(another) Organization**, you have to repeat these steps and grant access for Bitrise for the Organization **which owns the original repository**. This is a GitHub limitation: to be able to access a private repository fork you have to grant access for the service (Bitrise) in both repositories; in the fork and in the original repository/Organization too. 

もしレポジトリが**(他の)Organization**に属したプライベートレポジトリに分岐している場合、上記で説明した手順を繰り返して、**本来のレポジトリを所持する**Organization用に、Bitriseのアクセスを許可する必要があります。これはGitHubの制限であります：プライベートレポジトリフォークのアクセスを許可させるには、フォークしたレポジトリと本来のレポジトリ/Organizationの両方へサービス (Bitrise)の許可をする必要があります。"%}