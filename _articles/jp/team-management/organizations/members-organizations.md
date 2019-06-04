---
title: 組織メンバーの管理
menu:
  organizations:
    weight: 8

---
組織は複数の**グループ**を持つことができ、またグループは組織の「バックボーン」を形成します：グループには組織のメンバーが含まれ、組織が所有する異なるアプリケーションに割り当てられると共に、さまざまなグループにそれぞれのロールが割り当てられます。組織のメンバーになることは、その組織に属するグループの一つのメンバーになるということです。

例、TestOrgという組織がTestAppというアプリを所有しているとします。 TestOrgには以下のグループがあります：

* `Senior Developers` - `Admin`ロールでTestAppに割り当てられています。このグループのメンバーは他のグループをアプリに割り当てたり、外部の寄稿者を追加したり、アプリの設定を変更したり、ロールやワークフローを管理したりできます。
* `Developers`- `Developer`ロールでTestAppに割り当てられます。このグループのメンバーは、ビルドを実行し、ビルドログやビルドを表示できます。
* `Testers` - `Tester / QA`ロールでTestAppに割り当てられています。彼らはビルドしか見ることができません。

## 組織用のグループを作成

1. 組織の**オーナー**アカウントでサインインして、そのプロフィールページを開きます。
2. 組織のプロファイルページに移動し,左上隅にある`Switch Profile`をクリックして、必要な組織を選択します。

   ![Screenshot](/img/team-management/organization/switch-profile-2.png)
3. 左側のメニューオプションから`Groups`を選択します。
4. 上部にある`Create new Group`セクションを見つけます。

   ![Screenshot](/img/team-management/organization/create-new-group.png)
5. `Enter Group name`ウィンドウにグループ名を入力して`Create`をクリックします。

## メンバーを組織に追加

実際には、組織にメンバーを追加することは、組織に属するグループにメンバーを追加することです。組織に必要なグループを作成したら、メンバーを追加するのはとても簡単です。

1. 組織の**オーナー**アカウントでサインインして、そのプロフィールページを開きます。
2. 組織のプロファイルページに移動し,左上隅にある`Switch Profile`をクリックして、必要な組織を選択します。

   ![Screenshot](/img/team-management/organization/switch-profile-2.png)
3. 左側のメニューオプションから`Groups`を選択します。
4. 必要なグループを見つけて、グループ名の右側にある`+`記号をクリックします。

   ![Screenshot](/img/team-management/organization/group-name.png)
5. ユーザー名またはメールアドレスを入力します。
   * ユーザー名を入力すると、システムは既存のBitriseユーザーに少なくとも一部にあなたの入力と一致するよう提案します。招待するユーザーをクリックしてください。
   * メールアドレスを入力した場合は、右側にある`Enter`記号をクリックして招待状を送信します。

     ![Screenshot](/img/team-management/organization/add-group-member.png)

`Team`タブから、グループを管理するためのすべての機能にアクセスすることもできます。グループメンバーの右側にある`MANAGE GROUP`をクリックして、ポップアップウィンドウで必要な操作をクリックするだけで済みます（アプリからグループを削除するなど）。

![Screenshot](/img/team-management/organization/team-group-popup.png)

## 組織からメンバー削除

メンバーは、組織全体から、または組織に属するグループの1つから削除できます。実際には、これは個人のメンバーが組織に属するアプリのいずれかでの作業から削除されるか、選択されたアプリからのみ削除されるます。

### グループメンバー削除

1. 組織の**オーナー**アカウントでサインインして、そのプロフィールページを開きます。
2. 組織のプロファイルページに移動し,左上隅にある`Switch Profile`をクリックして、必要な組織を選択します。

   ![Screenshot](/img/team-management/organization/switch-profile-2.png)

   ![Screenshot](/img/team-management/organization/switch-profile-2.png)
3. 左側のメニューオプションから`Groups`を選択します。
4. 探しているグループとグループメンバーを見つけ、ユーザー名の右側にあるオレンジ色の四角の中にある小さな`x`をクリックします。

   ![Screenshot](/img/team-management/organization/remove-from-group.png)

### 組織全体からメンバーを削除する

組織からメンバーを削除すると、そのメンバーは組織内のすべてのグループから削除され、グループメンバーまたは外部の寄稿者として招待されない限り、どのアプリでも作業できなくなります。

1. 組織の**オーナー**アカウントでサインインして、そのプロフィールページを開きます。
2. 組織のプロファイルページに移動し,左上隅にある`Switch Profile`をクリックして、必要な組織を選択します。

   ![Screenshot](/img/team-management/organization/switch-profile-2.png)
3. 左側のメニューオプションから`People`を選択します。
4. 探しているメンバーを見つけて、ユーザー名の右側にあるオレンジ色の四角の中の小さな`x`をクリックします。

   ![Screenshot](/img/team-management/organization/remove-from-org.png)
5. ポップアップウィンドウで`Yes`をクリックすると組織から自分自身を外すことができ、また組織に対して持っていたすべてのアクセス権を失うことになります。実行することが確実な場合は、ポップアップウィンドウで`Yes`をクリックしてください。

![Screenshot](/img/team-management/organization/org-are-you-sure.png)

## グループ削除

1. 組織の**オーナー**アカウントでサインインして、そのプロフィールページを開きます。
2. 組織のプロファイルページに移動し,左上隅にある`Switch Profile`をクリックして、必要な組織を選択します。

   ![Screenshot](/img/team-management/organization/switch-profile-2.png)
3. 左側のメニューオプションから`Groups`を選択します。
4. 削除したいグループを選択し、`...`記号が表示されているドロップダウンメニューをクリックします。
5. `Delete group`をクリックしてから、ポップアップウィンドウで`Yes`をクリックします。