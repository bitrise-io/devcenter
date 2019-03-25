---
title: 組織メンバーの管理(Managing organization members)
redirect_from: []
date: 2019-03-25 12:41:30 +0000
published: false

---
{% include not_translated_yet.html %}

Organizations can have multiple **Groups**. Groups form the "backbones" of organizations: they contain the members of the organizations, they can be assigned to different applications owned by the organizations, with different roles assigned to the different groups. Being a member of an organization means being a member of one of the groups belonging to the organization.

  
組織は複数の**グループ**を持つことができ、またグループは組織の「バックボーン」を形成します：グループには組織のメンバーが含まれ、組織が所有する異なるアプリケーションに割り当てられると共に、さまざまなグループにそれぞれのロールが割り当てられます。組織のメンバーになることは、その組織に属するグループの一つのメンバーになるということです。

For example, let's say the organization called _TestOrg_ owns an app called _TestApp_. _TestOrg_ has the following groups:

例、TestOrgという組織がTestAppというアプリを所有しているとします。 TestOrgには以下のグループがあります。

* `Senior Developers` - they are assigned to _TestApp_ with an `Admin` role. Members of this group can assign other groups to the app or add outside contributors, change app settings, manage roles and workflows.
* `Developers` - they are assigned to _TestApp_ with a `Developer` role. Members of this group can run builds, view build logs and view builds.
* `Testers` - they are assigned to _TestApp_ with a `Tester / QA` role. They can only view builds.
*  `Senior Developers` - `Admin`ロールでTestAppに割り当てられています。このグループのメンバーは他のグループをアプリに割り当てたり、外部の寄稿者を追加したり、アプリの設定を変更したり、ロールやワークフローを管理したりできます。
* `Developers`- `Developer`ロールでTestAppに割り当てられます。このグループのメンバーは、ビルドを実行し、ビルドログやビルドを表示できます。 
* `Testers` - `Tester / QA`ロールでTestAppに割り当てられています。彼らはビルドしか見ることができません。

## Creating groups for　organizations　

## 組織用のグループを作成

1. Sign in with an account that is an **owner** of the organization and open its profile page.　  
   組織の**オーナー**のアカウントでサインインして、そのプロフィールページを開きます。
2. Go to your organization's profile page: click `Switch Profile` on the top left corner and select the organization you need. 組織のプロファイルページに移動し,左上隅にある`Switch Profile`をクリックして、必要な組織を選択します。

   ![Screenshot](/img/team-management/organization/switch-profile-2.png)
3. On the left, select `Groups` from the menu options. 左側のメニューオプションから`Groups`を選択します。
4. Find the `Create new Group` section at the top. 上部にある`Create new Group`セクションを見つけます。

   ![Screenshot](/img/team-management/organization/create-new-group.png)
5. Enter a group name in the `Enter Group name` window, and click `Create`. `Enter Group name`ウィンドウにグループ名を入力して`Create`をクリックします。

## Adding members to organizations メンバーを組織に追加

In practice, adding members to an organization means adding members to a group belonging to an organization. Once you have the groups you need for your organization, adding members to them is very simple.

実際には、組織にメンバーを追加することは、組織に属するグループにメンバーを追加することです。組織に必要なグループを作成したら、メンバーを追加するのはとても簡単です。

1. Sign in with an account that is an **owner** of the organization and open its profile page.　組織の**オーナー**のアカウントでサインインして、そのプロフィールページを開きます。
2. Go to your organization's profile page: click `Switch Profile` on the top left corner and select the organization you need.　組織のプロファイルページに移動し,左上隅にある`Switch Profile`をクリックして、必要な組織を選択します。

   ![Screenshot](/img/team-management/organization/switch-profile-2.png)
3. On the left, select `Groups` from the menu options.　左側のメニューオプションから`Groups`を選択します。
4. Find the group you need and click the `+` sign to the right of the name of the group.   
   必要なグループを見つけて、グループ名の右側にある`+`記号をクリックします。

   ![Screenshot](/img/team-management/organization/group-name.png)
5. Enter a username or an email address.
   * If you enter a username, the system will suggest existing Bitrise users that at least partially match your input. Click the user you wish to invite.
   * If you enter an email address, click the `Enter` symbol on the right to send the invitation.

     ユーザー名またはメールアドレスを入力します。
   *   ユーザー名を入力すると、システムは既存のBitriseユーザーに少なくとも一部にあなたの入力と一致するよう提案します。招待するユーザーをクリックしてください。  
   * メールアドレスを入力した場合は、右側にある`Enter`記号をクリックして招待状を送信します。

     ![Screenshot](/img/team-management/organization/add-group-member.png)

From the `Team` tab you can also access all the functions to manage groups. You simply have to click `MANAGE GROUP` to the right of the group members, and click the action you need in the pop-up window, including removing the group from the app.

`Team`タブから、グループを管理するためのすべての機能にアクセスすることもできます。グループメンバーの右側にある`MANAGE GROUP`をクリックして、ポップアップウィンドウで必要な操作をクリックするだけで済みます（アプリからグループを削除するなど）。

![Screenshot](/img/team-management/organization/team-group-popup.png)

## Removing members from organizations　

## 組織からメンバー削除

Members can be removed from the entire organization or from one of the groups belonging to an organization. In practice, this means that a single member can be removed from working on any of the apps belonging to the organization or only from selected apps.

  
メンバーは、組織全体から、または組織に属するグループの1つから削除できます。実際には、これは個人のメンバーが組織に属するアプリのいずれかでの作業から削除されるか、選択されたアプリからのみ削除されるます。

### Removing group members　グループメンバー削除

1. Sign in with an account that is an **owner** of the organization and open its profile page.　組織の**オーナー**のアカウントでサインインして、そのプロフィールページを開きます。
2. Go to your organization's profile page: click `Switch Profile` on the top left corner and select the organization you need.組織のプロファイルページに移動し,左上隅にある`Switch Profile`をクリックして、必要な組織を選択します。

   ![Screenshot](/img/team-management/organization/switch-profile-2.png)

   ![Screenshot](/img/team-management/organization/switch-profile-2.png)
3. On the left, select `Groups` from the menu options.　左側のメニューオプションから`Groups`を選択します。
4. Find the group and the group member you are looking for, and click the little `x` in the orange square on the right of the username of the member.　探しているグループとグループメンバーを見つけ、ユーザー名の右側にあるオレンジ色の四角の中にある小さな`x`をクリックします。

   ![Screenshot](/img/team-management/organization/remove-from-group.png)

### Removing members from the entire organization　

### 組織全体からメンバーを削除する

Removing members from the entire organization removes them from all the groups they are part of in the organization and they can no longer work on any of the apps unless they are invited back, either as a group member or as an outside contributor.　組織全体からメンバーを削除すると、そのメンバーは組織内のすべてのグループから削除され、グループメンバーまたは外部の寄稿者として招待されない限り、どのアプリでも作業できなくなります。

1. Sign in with an account that is an **owner** of the organization and open its profile page.組織の**オーナー**のアカウントでサインインして、そのプロフィールページを開きます。
2. Go to your organization's profile page: click `Switch Profile` on the top left corner and select the organization you need.　組織のプロファイルページに移動し,左上隅にある`Switch Profile`をクリックして、必要な組織を選択します。

   ![Screenshot](/img/team-management/organization/switch-profile-2.png)
3. On the left, select `People` from the menu options.　左側のメニューオプションから`People`を選択します。
4. Find the member you are looking for, and click the little `x` in the orange square on the right of the username of the member.　探しているメンバーを見つけて、ユーザー名の右側にあるオレンジ色の四角の中の小さな`x`をクリックします。

   ![Screenshot](/img/team-management/organization/remove-from-org.png)
5. In the pop-up window, click `Yes`.

   This way you can remove yourself from the organization. You will lose all access rights you had to the organization. Only click `Yes` in the pop-up window if you are certain you wish to do this.   
   ポップアップウィンドウで`Yes`をクリックすると組織から自分自身を外すことができ、また組織に対して持っていたすべてのアクセス権を失うことになります。実行することが確実な場合は、ポップアップウィンドウで`Yes`をクリックしてください。

![Screenshot](/img/team-management/organization/org-are-you-sure.png)

## Deleting groups　

## グループ削除

1. Sign in with an account that is an **owner** of the organization and open its profile page.　組織の**オーナー**のアカウントでサインインして、そのプロフィールページを開きます。
2. Go to your organization's profile page: click `Switch Profile` on the top left corner and select the organization you need.　組織のプロファイルページに移動し,左上隅にある`Switch Profile`をクリックして、必要な組織を選択します。

   ![Screenshot](/img/team-management/organization/switch-profile-2.png)
3. On the left, select `Groups` from the menu options.　左側のメニューオプションから`Groups`を選択します。
4. Choose the group you wish to delete, and click the dropdown menu indicated by the `...` symbol.　削除したいグループを選択し、`...`記号が表示されているドロップダウンメニューをクリックします。
5. Click `Delete group` then click `Yes` in the pop-up window.　`Delete group`をクリックしてから、ポップアップウィンドウで`Yes`をクリックします。