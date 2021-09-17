---
changelog:
last_modified_at:
tag: []
title: GitHub Workspace (組織) へBitriseのアクセスを許可する方法を教えて下さい。 (How to grant Bitrise
  access to a GitHub Organization?)
redirect_from: []
description: ''
published: false

---
このガイドでは、ご自身のGitHub Workspace (組織) へ[bitrise.io](https://www.bitrise.io/)のアクセスを許可する方法について説明します。

{% include message_box.html type="note" title=" GitHub上でBitriseを認証しましたか？" content=" このガイドでは、GitHubがすでにBitriseを[認証した状態](https://help.github.com/articles/authorizing-oauth-apps/)であると仮定しています。"%}

1. [https://github.com](https://github.com "https://github.com")を開きます。
2. 右上端にある自分のアバターをクリックして`Settings`を選択します。
3. 左側にある`Applications`を選択します。
4. `Authorized OAuth Apps`をクリックします。ここでご自身のアカウントにアクセスが可能なアプリのリストを確認することができます。
5. Click on `Bitrise`.  
   `Bitrise`をクリックします。
6. `Organization access`まで下にスクロールして`Grant`をクリックすると、BitriseがOrganizationのレポジトリにアクセスができるようになります。

![{{ page.title }}](/img/faq/grant-org-access.jpg)

{% include message_box.html type="important" title="`Organization access`においてアプリの隣りに`Grant`ボタンが表示されていない問題" content="`Workspace access`で、Organizationの隣りにあるはずの`Grant`ボタンがなく、赤色の☓印だけが表示されている場合があります。これは、**アクセスが以前許可されていたが、後に無効化されたということを意味しています**。左側にある`Workspace Setting`にてまずOrganizationを選択し、`Third-party access`をクリックすることによって修正することができます。そうすれば、`Denied`された`Bitrise`へのアクセスが確認できます。その後、鉛筆の形をしたアイコンをクリックして、Bitriseに`Grant access`します。これでBitrise上で`Authorized OAuth Apps`に戻ることができるので、Bitriseをクリックしてください。Organizationの隣りの赤色の☓印が緑色の✓印になっていることが確認できます。"%}

![{{ page.title }}](/img/faq/third-party-access.jpg)

[bitrise.io](https://www.bitrise.io)に戻り、アバターをクリックして、`Add new App`を選択し、`Next`を押すと、OrganizationとOrganizationのレポジトリを確認することができます。

{% include message_box.html type="note" title="レポジトリは他のプライベートレポジトリのフォーク (分岐)です" content=" もしレポジトリが**(他の)Organization**に属したプライベートレポジトリのフォークである場合、上記で説明した手順を繰り返して、**本来のレポジトリを所持する**Organization用に、Bitriseのアクセスを許可する必要があります。これはGitHubが制限しているためです：プライベートレポジトリのフォークのアクセスを許可させるには、フォーク内のレポジトリと本来のレポジトリ/Organizationの両方へサービス (Bitrise)の許可をする必要があります。"%}