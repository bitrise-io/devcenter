---
title: 組織のアプリ管理(Managing the apps of organizations)
redirect_from: []
date: 2019-03-26 15:05:41 +0000
published: false

---
{% include not_translated_yet.html %}

Organizations can own several apps, with different (or the same, if that's what you need) groups working on different apps. Apps can be transferred between private accounts and organization accounts any time, quickly and easily.　組織は複数のアプリを所有することができ、異なる（または必要に応じて同じ）グループが異なるアプリで作業します。アプリはプライベートアカウントと組織アカウントの間でいつでも、すばやく簡単に転送できます。

## Adding new apps to an organization　新しいアプリを組織に追加

A new app can be added directly to an organization. You can do this either from the organization's `Account settings` page or from the Dashboard of an account that is a member of the organization.　新しいアプリは組織に直接追加できます。組織の `Account settings`ページから、または組織のメンバーであるアカウントのダッシュボードから行うことができます。

1. Get to the `Create New App` page.

   There are three options to get there:
   * On the top menu bar, find the `+` symbol and click it, then click the `Add App` option.　新しいアプリの作成ページにアクセスします。  3つのオプション： 上部のメニューバーで、`+`記号をクリックしタ後に、`Add App`オプションをクリックします。

     ![Screenshot](/img/team-management/organization/add-org.png)
   * Open the `Dashboard` on [bitrise.io](https://www.bitrise.io), open the dropdown menu above your app list and select your organization. Click the `+ Add new app` button.　[bitrise.io](https://www.bitrise.io)で `Dashboard`を開き、アプリリストの上にあるドロップダウンメニューを開いて組織を選択します。 `+ Add new app` ボタンをクリックします。

     ![Screenshot](/img/team-management/organization/add-new-app-org.png)
   * Open the `Account settings` page of your organization, and click the `Apps` option on the menu on the left. Click the `Add new app` button. 組織の`Account settings`ページを開き、左側のメニューから`Apps`オプションをクリックします。 `Add new app`ボタンをクリックします。
2. On `Create New App` page, make sure that the organization account is selected in the dropdown menu.　`Create New App`ページで、組織アカウントがドロップダウンメニューで選択されていることを確認します。

   ![Screenshot](/img/team-management/organization/add-app-screen.png)
3. Proceed with adding a new app as usual! It will be owned by the organization.　新しいアプリを追加してください。組織によって所有されます。

## Transferring apps to an organization 　組織へのアプリ転送

When you create an organization, you get a prompt for transferring apps from the account that you are logged in with to the organization. However, if you skipped that step, you can do it on our website at any time you wish.　

組織を作成すると、ログインしているアカウントからその組織にアプリを転送するように求められます。手順を省略した場合は、当社のWebサイトで実行できます。

You have two options to transfer app ownership.

* Several apps can be transferred at the same time from the organization profile.
* Any given app can be transferred from the app's `Team` tab.

  アプリの所有権を譲渡する方法
*   複数のアプリを組織プロファイルから同時に転送できます。
*   特定のアプリはアプリの`Team`タブから転送できます。

App ownership can be transferred **from** an organization to another account on the app's `Team` tab. Only organization owners can do this.

アプリの所有権は、アプリの`Team`タブの組織**から**別のアカウントに移管できます。組織のオーナーだけが実行できます。

### Transferring apps from the organization profile 

### 組織プロファイルからのアプリの転送

1. Sign in with an account that is a member of the organization and open the account's profile page.　組織のメンバーのアカウントでサインインして、アカウントのプロフィールページを開きます。
2. Go to your organization's profile page: click `Switch Profile` on the top left corner and select the organization you need.　組織のプロファイルページへ：左上隅にある`Switch Profile`をクリックして、必要な組織を選択します。

   　![Screenshot](/img/team-management/organization/switch-profile-2.png)
3. On the left, select `Apps` from the menu options.　左側のメニューオプションから`Apps`を選択します。
4. Click the `Transfer apps` button.　`Transfer apps`をクリックします

   ![Screenshot](/img/team-management/organization/transfer-app-org.png)
5. Find the apps you wish to transfer and toggle the switch on the right. Once you're done, click `Done`.　転送したいアプリを見つけて、右側のスイッチを切り替えます。完了したら、`Done`をクリックします。

### Transferring an app from the Team tab　チームタブからのアプリの転送

It can happen that you need to transfer an application on [Bitrise](https://www.bitrise.io) to another user. This can be done in a few seconds by following these quick steps:

Bitrise上のアプリケーションを別のユーザーに転送する必要性がある場合があります。次の簡単な手順に従って数秒で完了します：

1. Login with the **current owner of the app**.　**アプリの現在のオーナー**でログインします。
2. Open the app's page and go to the `Team` tab.　アプリのページを開き、`Team`タブに進みます。
3. Make sure the new owner of the app is in the team or add her/him if you need to.　アプリの新しいオーナーがチームに所属していることを確認するか、必要に応じて追加します。
4. Click the `Transfer ownership` button on the top right.　右上の`Transfer ownership`をクリックします。

For transferring the ownership, select the new user to transfer the app to:　所有権を譲渡するには、アプリを譲渡する新しいユーザーを選択します：

![Screenshot](/img/team-management/transfering-ownership.png)

The new user can either be another private account or an organization.新しいユーザーは、プライベートアカウントまたは組織のどちらでもかまいません。

## Assigning groups to apps　グループをアプリに割り当てる

There are two separate ways to assign one or more groups to an app that is owned by an organization.　組織が所有するアプリに1つ以上のグループを割り当てるには、2つの方法があります。

* **Assign a group from the** `**Groups**` **menu of the organization's profile page**. This way you can add a group to multiple apps simultaneously. Only **organization owners** can do this! 
* **Assign a group from the** `**Team**` **tab of the app**. If the groups you need already exist and you only need to assign groups to a single app, this method works perfectly. Organization owners and accounts that have an **admin** role on the app's team can do this.
* **組織のプロフィールページ__`**Groups**`**メニューからグループを割り当てます**。グループを複数のアプリに同時に追加することができ、また組織のオーナーだけが実行できます。 
*  アプリの`**Team**`タブからグループを割り当てます。必要なグループが既に存在していて、グループを一つのアプリケーションに割り当てるだけでよい場合は、問題なく機能します。アプリのチームの管理者ロールアカウントと組織のオーナーだけが実行できます。

### Assigning a group from the `Groups` menu.　`Groups`メニューからグループを割り当てる

1. Sign in with an account that is an **owner** of the organization and open its profile page. 組織の**オーナー**アカウントでサインインして、プロフィールページを開きます。
2. Go to your organization's profile page: click `Switch Profile` on the top left corner and select the organization you need.　組織のプロファイルページへ：左上隅にある`Switch Profile`をクリックして、必要な組織を選択します。

   ![Screenshot](/img/team-management/organization/switch-profile-2.png)
3. On the left, select `Groups` from the menu options.　左側のメニューオプションから`Groups`を選択します。
4. Choose the group you wish to assign, and click the dropdown menu indicated by the `...` symbol.　割り当てたいグループを選択して、`...`が表示されているドロップダウンメニューをクリックします。
5. Click `Assign group to apps`. `Assign group to apps`をクリックします。

   ![Screenshot](/img/team-management/organization/assign-group-to-apps.png)
6. Find the app(s) you need and select the appropriate role for the group. You can check out the role cheatsheet on any app's `Team` tab. 必要なアプリを見つけて、そのグループに適切な役割を選択します。どんなアプリの`Team`タブのロールチートシートを確認することができます。

   ![Screenshot](/img/team-management/organization/assign-group-popup.png)

### Assigning a group from the `Team` tab.　`Team`タブからグループを割り当てる

1. Go to the app's page on [bitrise.io](https://www.bitrise.io).　[bitrise.io](https://www.bitrise.io)アプリのページをひらきます。
2. Select the `Team` tab.　`Team`タブを選択します。
3. Find the `Add a group from <OrgName>` menu.　`Add a group from <OrgName>`メニューを見つけます。

   ![Screenshot](/img/team-management/organization/add-group-org.png)
4. Find the group you wish to add and click the `+` symbol.　追加したいグループを見つけて`+`記号をクリックします。
5. Select the role for the group. グループのためのロールを選択します。

For rights of roles, check out the Role Cheatsheet!

If there are no groups you can assign to the app in this menu, you will see a grey box telling you `No groups to show`. Clicking the link will take you to your organization's `Groups` page where you can create the groups you need, including removing the group from the app.

ロールの権利については、Role Cheatsheetを確認してください。 

 メニューでアプリに割り当てることができるグループがない場合は、表示するグループがないことを示す`No groups to show`灰色のボックスが表示されます。リンクをクリックすると、組織の`Groups`ページに移動します。このページで、アプリからグループを削除するなど、必要なグループを作成できます。

![Screenshot](/img/team-management/organization/add-group-from-org.png)

From the `Team` tab you can also access all the functions to manage groups. You simply have to click `MANAGE GROUP` to the right of the group members, and click the action you need in the pop-up window.

 `Team`タブから、グループを管理するためのすべての機能にアクセスすることもできます。グループメンバーの右側にある `MANAGE GROUP` をクリックし、ポップアップウィンドウで必要な操作をクリックするだけです。

![Screenshot](/img/team-management/organization/team-group-popup.png)

## Adding outside contributors to an app アプリに外部のコントリビューターを追加

You can add outside contributors to any application if you have `Admin` or `Owner` right to the app. If an organization owns the app, the outside contributor does not have to be part of the organization, of course.　アプリに対する`Admin`または`Owner`権限がある場合は、任意のアプリケーションに外部のコントリビューターを追加できますが、組織がアプリを所有している場合はもちろん組織の一部である必要はありません。

1. Go to the app's page on [bitrise.io](https://www.bitrise.io).　[bitrise.io](https://www.bitrise.io)アプリのページを開きます。
2. Select the `Team` tab.　`Team`タブを選択します。
3. Find the `Add outside contributors to this app` menu.　`Add a group from <OrgName>`メニューを見つけます。

   ![Screenshot](/img/team-management/organization/add-contributors.png)
4. Enter a username or an email address.

   The email address you enter - if you choose that option - does not have to be associated with an existing Bitrise account.　ユーザー名またはメールアドレスを入力してください。  入力したEメールアドレス - オプションを選択した場合は既存のBitriseアカウントに結びつける必要はありません。
5. Select a role for the user and then click `Grant Access`.

   For rights of roles, check out the Role Cheatsheet!  ユーザーのロールを選択し、`Grant Access`をクリックします。  ロールの権利については、Role Cheatsheetを確認します。

## Removing a group from an app　アプリからグループを削除

1. Go to the app's page on [bitrise.io](https://www.bitrise.io).　[bitrise.io](https://www.bitrise.io)アプリのページを開きます。
2. Select the `Team` tab.　`Team`タブを選択します。
3. Find the group you wish to remove, and click the `MANAGE GROUP` option next to one of the names of the group members. 削除するグループを見つけて、グループメンバーの名前の横にある`MANAGE GROUP`をクリックします。
4. Click `REMOVE FROM APP`. Click `Yes` in the pop-up window. `REMOVE FROM APP`をクリックします。ポップアップウィンドウで`Yes`をクリックします。

   ![Screenshot](/img/team-management/organization/team-group-popup.png)