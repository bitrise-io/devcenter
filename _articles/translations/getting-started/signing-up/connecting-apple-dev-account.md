BitriseでApple Developer Accountを認証し、Apple Developer PortalとBitriseのプロジェクトを統合することができます。
これにより、iOSアプリのProvisioning Profilesの管理がとても簡単になる、 `iOS Auto Provisioning` を利用することができます！

必要なのは、[bitrise.io](https://www.bitrise.io)アカウントと有効なApple Developer Accountだけです。

### BitriseでApple Developer Accountを認証する

1. [bitrise.io](https://www.bitrise.io)にログインしてください。
2. `Dashboard` の右上にあるプロフィールをクリックし、プルダウンメニューから`アカウント設定`を選択します。

   ![Account settings menu](/img/adding-a-new-app/account-settings.png)
3. 左側のメニューバーで、`Apple Developer Account`を選択します。
4. ポップアップウィンドウでApple Developer Accountの認証情報を入力し、`Store credentials`をクリックします。

   ![Connecting Apple Developer account](/img/adding-a-new-app/apple-dev-acc-sync.png)
5. Apple Developerアカウントで2段階認証が有効になっている場合は、確認コードを入力するよう求められます。この場合、認証は30日後に期限切れになります。期限切れになる前に認証を行ってください！

### Apple Developer Portalの統合を有効にする

Apple Developer Accountが[bitrise.io](https://www.bitrise.io)アカウントに接続されると、BitriseからApple Developer Portalデータを受け取るようにすることができます。

1. [bitrise.io](https://www.bitrise.io)でプロジェクトのページを開きます。
2. `Team` タブを選択します。
3. ページの下部にある `Connected Apple Developer Portal Account` メニューでアカウントを選択します。
