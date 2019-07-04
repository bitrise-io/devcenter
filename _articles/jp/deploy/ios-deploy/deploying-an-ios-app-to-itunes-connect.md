---
title: iTunes ConnectへiOSアプリのデプロイ
date: 2018-10-26T12:41:22.000+00:00
redirect_from: []
menu:
  ios-deploy:
    weight: 7

---
iTunes Connect（App Store Connectにリブランディングされました）へアプリのデプロイを行うことが可能です。以下のことができます：

* Testflightでテスターの招待
* App Storeでアプリのリリース

Bitriseでは、iTunes Connectへバイナリをアップロードする、または、バイナリをレビュー用に提出することができます。

{% include message_box.html type="important" title="Two-factor authentication２要素認証" content="２要素認証 (2FA) はすべてのApple Developer Portalアカウントに対して必須となります。万が一、ビルド中にBitriseがあなたのApple Developer Portalアカウントへのアクセスが必要になった場合、2FAを通過する必要があります。  
これがきちんと機能するよう、[Bitriseへご自身のApple Developer Accountを接続してください](/getting-started/signing-up/connecting-apple-dev-account/)。Bitriseは認証セッションを３０日間再利用するので、毎回マニュアルで2FAを経由する必要はありません。"%}

#### 始める前に

* Bitriseにご自身のApple Developer Accountを接続した
* 最低一回、ご自身のマシン上で、ローカルで.ipaファイルを生成した
* プロビジョニングプロファイルに含まれた全てのDeveloper証明書をBitriseへアップロードした
* Bitriseで[マニュアルプロビジョニング](/code-signing/ios-code-signing/ios-manual-provisioning/)を使用したい場合、アプリのDevelopment Provisioning Profileをアップロードした（オートプロビジョニングを使用する場合は、プロファイルのアップロードは必要ありません）
* アプリのDistribution証明書をアップロードした
* （マニュアルプロビジョニングを使用したい場合）Ad-hocプロビジョニングプロファイルをアップロードした

かどうか確認してください。

iTunes Connectでアプリの登録をしてください。iTunes Connectにアプリのプッシュを行う度、アプリにユニークビルドとバージョン番号がある必要があります - デプロイ前に[片方もしくは両方増える](/builds/build-numbering-and-app-versioning/)ことになります。

#### アプリのデプロイ

iTunes Connectへアプリのデプロイを行うには、２つのステップがBitriseには存在します。

* `Deploy to iTunes Connect`
* `Deploy to iTunes Connect - Application Loader`

`Deploy to iTunes Connect - Application Loader` はシンプルです：このステップはiTunes Connectに.ipaか.pkgバイナリファイルをプッシュします。このステップを使うと、一つの例として、App Storeでレビュー用のアプリを提出することは**できません**。

![](/img/itunes-connect.png)

`Deploy to iTunes Connect`ステップを使うと、

* レビュー用にApp Storeへアプリを提出すること
* ３つの異なるプラットフォーム (iOS, OS X, AppleTVOS) のアプリをアップロードすること
* Bitriseにスクリーンショットと、バイナリと共にアプリのメタデータをアップロードしたいかどうかを報告すること

が可能です。

1. ワークフローに`Certificate and profile installer`ステップまたは`iOS Auto Provision`ステップがあることを確認してください。両方は使わないでください！
2. ワークフローに`Xcode Archive & Export for iOS`ステップがあることを確認してください。
3. `Select method for export`ステップのインプットを`app-store`に設定します。このステップは$BITRISE_IPA_PATH環境変数内のエクスポート済み.ipaファイルのパスを保存します。

   ![](/img/app-store-export.png)
4. ワークフローに`Deploy to Bitrise.io`ステップを追加します。
5. 必要なインプットを記入してください。
   * **アプリのApple IDもしくはBundle IDは必要なインプットです。**２つのうち１つを記入してください。
   * `Submit for Review`を`true`に設定する場合、ステップはあなたの提出物がiTunes Connect上で処理されるのを待ち、その後レビュー用のアプリの一定のバージョンを提出します。
   * `Skip App Version Update`インプットのデフォルト値は`No`になっています。他の方法で[アプリのバージョンを増加させた](/builds/build-numbering-and-app-versioning/)場合のみ変更してください。
   * 複数のチームとリンクされたiTunes Connectアカウントを使用する場合は、**チームID**もしくは**チーム名**を入力してください！
6. ビルドを開始します。

すべてが上手く行けば、アプリはiTunes Connectへ提出され、TestflightまたはApp Store経由で配布することができます！