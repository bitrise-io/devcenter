---
title: 組織のアプリ管理
menu:
  organizations:
    weight: 10

---
組織は複数のアプリを所有することができ、異なる（または必要に応じて同じ）グループが異なるアプリで作業します。アプリはプライベートアカウントと組織アカウントの間でいつでも、すばやく簡単に転送できます。

## 新しいアプリを組織に追加

新しいアプリは組織に直接追加できます。組織の `Account settings`ページから、または組織のメンバーであるアカウントのダッシュボードから行うことができます。

1. 新しいアプリの作成ページにアクセスします。

   3つのオプション：
   * 上部のメニューバーで、`+`記号をクリックしタ後に、`Add App`オプションをクリックします。

     ![Screenshot](/img/team-management/organization/add-org.png)
   * [bitrise.io](https://www.bitrise.io)で `Dashboard`を開き、アプリリストの上にあるドロップダウンメニューを開いて組織を選択します。 `+ Add new app` ボタンをクリックします。

     ![Screenshot](/img/team-management/organization/add-new-app-org.png)
   * 組織の`Account settings`ページを開き、左側のメニューから`Apps`オプションをクリックします。 `Add new app`ボタンをクリックします。
2. `Create New App`ページで、組織アカウントがドロップダウンメニューで選択されていることを確認します。

   ![Screenshot](/img/team-management/organization/add-app-screen.png)
3. 新しいアプリを追加してください。組織によって所有されます。

## 組織へのアプリ転送

組織を作成すると、ログインしているアカウントからその組織にアプリを転送するように求められます。手順を省略した場合は、当社のWebサイトで実行できます。

アプリの所有権を譲渡する方法：

* 複数のアプリを組織プロファイルから同時に転送できます。
* 特定のアプリはアプリの`Team`タブから転送できます。

アプリの所有権は、アプリの`Team`タブの組織**から**別のアカウントに移管できます。組織のオーナーだけが実行できます。

### 組織プロファイルからのアプリの転送

1. 組織のメンバーのアカウントでサインインして、アカウントのプロフィールページを開きます。
2. 組織のプロファイルページへ：左上隅にある`Switch Profile`をクリックして、必要な組織を選択します。

   ![Screenshot](/img/team-management/organization/switch-profile-2.png)
3. 左側のメニューオプションから`Apps`を選択します。
4. `Transfer apps`をクリックします

   ![Screenshot](/img/team-management/organization/transfer-app-org.png)
5. 転送したいアプリを見つけて、右側のスイッチを切り替えます。完了したら、`Done`をクリックします。

### チームタブからのアプリの転送

Bitrise上のアプリケーションを別のユーザーに転送する必要性がある場合があります。次の簡単な手順に従って数秒で完了します：

1. **アプリの現在のオーナー**でログインします。
2. アプリのページを開き、`Team`タブに進みます。
3. アプリの新しいオーナーがチームに所属していることを確認するか、必要に応じて追加します。
4. 右上の`Transfer ownership`をクリックします。

所有権を譲渡するには、アプリを譲渡する新しいユーザーを選択します：

![Screenshot](/img/team-management/transfering-ownership.png)

新しいユーザーは、プライベートアカウントまたは組織のどちらでもかまいません。

## グループをアプリに割り当てる

組織が所有するアプリに1つ以上のグループを割り当てるには、2つの方法があります。

* 組織のプロフィールページ_`**Groups**`**メニューからグループを割り当てます**。グループを複数のアプリに同時に追加することができ、また組織のオーナーだけが実行できます。
* アプリの`**Team**`タブからグループを割り当てます。必要なグループが既に存在していて、グループを一つのアプリケーションに割り当てるだけでよい場合は、問題なく機能します。アプリのチームの管理者ロールアカウントと組織のオーナーだけが実行できます。

### `Groups`メニューからグループを割り当てる

1. 組織の**オーナー**アカウントでサインインして、プロフィールページを開きます。
2. 組織のプロファイルページへ：左上隅にある`Switch Profile`をクリックして、必要な組織を選択します。

   ![Screenshot](/img/team-management/organization/switch-profile-2.png)
3. 左側のメニューオプションから`Groups`を選択します。
4. 割り当てたいグループを選択して、`...`が表示されているドロップダウンメニューをクリックします。
5. `Assign group to apps`をクリックします。

   ![Screenshot](/img/team-management/organization/assign-group-to-apps.png)
6. 必要なアプリを見つけて、そのグループに適切な役割を選択します。どんなアプリの`Team`タブのロールチートシートを確認することができます。

   ![Screenshot](/img/team-management/organization/assign-group-popup.png)

### `Team`タブからグループを割り当てる

1. [bitrise.io](https://www.bitrise.io)アプリのページをひらきます。
2. `Team`タブを選択します。
3. `Add a group from <OrgName>`メニューを見つけます。

   ![Screenshot](/img/team-management/organization/add-group-org.png)
4. 追加したいグループを見つけて`+`記号をクリックします。
5. グループのためのロールを選択します。

ロールの権利については、Role Cheatsheetを確認してください。

メニューでアプリに割り当てることができるグループがない場合は、表示するグループがないことを示す`No groups to show`灰色のボックスが表示されます。リンクをクリックすると、組織の`Groups`ページに移動します。このページで、アプリからグループを削除するなど、必要なグループを作成できます。

![Screenshot](/img/team-management/organization/add-group-from-org.png)

`Team`タブから、グループを管理するためのすべての機能にアクセスすることもできます。グループメンバーの右側にある `MANAGE GROUP` をクリックし、ポップアップウィンドウで必要な操作をクリックするだけです。

![Screenshot](/img/team-management/organization/team-group-popup.png)

## アプリに外部のコントリビューターを追加

アプリに対する`Admin`または`Owner`権限がある場合は、任意のアプリケーションに外部のコントリビューターを追加できますが、組織がアプリを所有している場合はもちろん組織の一部である必要はありません。

1. [bitrise.io](https://www.bitrise.io)アプリのページを開きます。
2. `Team`タブを選択します。
3. `Add a group from <OrgName>`メニューを見つけます。

   ![Screenshot](/img/team-management/organization/add-contributors.png)
4. ユーザー名またはメールアドレスを入力してください。  入力したEメールアドレス - オプションを選択した場合は既存のBitriseアカウントに結びつける必要はありません。
5. ユーザーのロールを選択し、`Grant Access`をクリックします。  ロールの権利については、Role Cheatsheetを確認します。

## アプリからグループを削除

1. [bitrise.io](https://www.bitrise.io)アプリのページを開きます。
2. `Team`タブを選択します。
3. 削除するグループを見つけて、グループメンバーの名前の横にある`MANAGE GROUP`をクリックします。
4. `REMOVE FROM APP`をクリックします。ポップアップウィンドウで`Yes`をクリックします。

   ![Screenshot](/img/team-management/organization/team-group-popup.png)