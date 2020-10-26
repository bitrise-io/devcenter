---
changelog: 
last_modified_at: 
tag: []
title: Ship でデプロイ
redirect_from: []
description: ''
menu:
  deploy-main:
    weight: 4

---
## Ship 概要

{% include message_box.html type="important" title="ベータ版のShip" content="この機能はまだベータ版であることに注意してください。"%}

Ship はユーザーの頭痛の種を大幅に軽減することを目的としたデプロイソリューションです。Ship を使えば、配布、バージョン履歴、すべての重要なメタデータを完全にコントロールでき、すべてを1か所で管理できます。

Ship でデプロイすれば自動で再署名、アーティファクトを生成し、以前のバージョンもすべて保存します。アプリのメタデータ、すべてのマーケティングコピーとスクリーンショットもその場で編集することができ、開発者以外の人が管理できます。

{% include message_box.html type="info" title="Ship の言語" content="現時点では、Ship は英語ロケールのみサポートしています。ほかの言語での提出はサポートしていません。"%}

Ship でさまざまなことができます。

* アプリのすべてのビルドバージョンを表示します。
* 説明文、スクリーンショット、そしてアプリのサイズやサポート機種のようなもっとも重要なパラメーターなどを含めてすべてのビルドバージョンを表示および編集します。
* アプリのテスターにパブリックインストールページへのリンクを直接送ります。
* 公開設定をすれば、特定のビルドバージョンを App Store Connect や Google Play Console にデプロイします。
* クロスプラットフォームプロジェクトの場合は **Version History** ページでプラットフォームを切り替えます。

  ![{{ page.title }}](/img/ship_benefits.jpg)

## Ship の開始

Ship を開くには2つのオプションがあります。

* アプリの **Add-ons** タブ: このオプションで Ship のホームページに移動します。
* **Builds** ページ: このオプションでそのビルドの Ship のページに移動します。

初めてログインしたとき、公開できるビルドバージョンがひとつもないかもしれません。でも心配しないでください、それはすばやく解決できます。

* ワークフローの1つに、 **Xcode Archive & Export for iOS** や **Android Build** のような、アプリをビルドするステップが必要です。
* 同じワークフローには、アプリをビルドするステップのあとに、**Deploy to Bitrise.io** ステップの正しいバージョンが必要です。

{% include message_box.html type="warning" title="Ship と互換性があるステップのバージョン" content="**Deploy to Bitrise.io** ステップはバージョン 1.9.0、iOS アプリ用の **Xcode Archive & Export for iOS** ステップはバージョン 2.6.0 が必要なことに注意してください。これらより古いバージョンのステップは Ship をサポートしていません。"%}

一度アプリをビルドすると、つまり APK または IPA ファイルを生成すると、Ship を使いはじめることができます。

## Ship でアプリの設定と公開

Ship でアプリを公開するために必要なこと:

* 少なくとも1つの [公開されたワークフロー](/jp/deploy/ship/#ship-にワークフローのアーティファクトを公開) を持つアプリをビルドします。
* **Settings** ページで公開設定をします。
* **Publish** ボタンを押します。

iOS と Android アプリは **Settings** ページにそれぞれの設定があります。クロスプラットフォームアプリは iOS と Android 両方の設定が必要です。

### Ship にワークフローのアーティファクトを公開

ワークフローのアーティファクトを公開するとは、ワークフローの成果物が Ship で利用できることを意味します。たとえば、APK を生成するワークフローなら Ship を使って APK を公開することができます。デフォルトでは、正しいバージョンの **Deploy to Bitrise.io** ステップが含まれていれば、すべてのワークフローは公開されます。それが適切であればそのままにします。

ただし、ここにワークフローを追加すると、そのワークフローだけ公開されます。

Ship にワークフローのアーティファクトを公開するには:

1. アプリの Ship ページに移動します。
2. 右上の **Settings** をクリックします。
3. **General** タブに移動します。
4. **Expose Artifacts From the Selected Workflow to Ship** に必要なワークフローを追加します。

   ![{{ page.title }}](/img/Settings___android-test-test.png)

   アプリがクロスプラットフォームの場合は、テキストボックスが iOS 用と Android 用に2つあることに注意してください。別々のワークフローの名前をコンマで区切ります（例: `build, deploy, release_build_android`）。
5. ページの下部へスクロールして **Save** をクリックします。

### コード署名ファイル

**Settings** ページで、さまざまコード署名ファイルを選択できます。これらのファイル（iOS のプロビジョニングプロファイルと証明書、Android のキーストアファイルとサービスアカウント JSON ファイル）は通常の方法でアップロードできます。

* [iOS コード署名ファイル](/code-signing/ios-code-signing/code-signing-index/)
* [Android コード署名ファイル](/code-signing/android-code-signing/android-code-signing-index/)

コード署名ファイルはオンラインストアにアプリを公開したり、テストデバイスにインストールするのに要求されます。

### テストデバイスにアプリをインストール

デバイスにアプリをインストールするには、3つのオプションがあります。

* パブリックインストールページへのリンクをすべてのテスターとほかのステークホルダーに送信します。
* QR コードを送信します。スキャンするとアプリの公開されたインストールページに移動します。
* デバイスから Ship にログインして直接インストールします。

{% include message_box.html type="important" title="パブリックインストールページを有効にする" content="インストールページを公開するには、[公開された](/jp/deploy/ship/#ship-にワークフローのアーティファクトを公開) ワークフローの **Deploy to Bitrise.io** ステップを正しく構成する必要があります。ステップの **Enable public page for the App?** を `true` に設定する必要があります。"%}

{% include message_box.html type="important" title="アーティファクトタイプ" content="パブリックインストールページはすべてのタイプのアーティファクトで利用できるわけではありません。

* iOS 用は、Debug、Development または Ad-hoc タイプのプロビジョニングプロファイルで署名された .ipa ファイルをビルドするワークフローでのみ利用可能です。
* Android 用は、分割されていない APK または分割されたユニバーサル APK をビルドするワークフローでのみ利用可能です。AAB 用のパブリックインストールページのリンクはありません。"%}

パブリックインストールページへのリンクや QR コードを送信するには:

1. インストール可能なファイルを生成するワークフローを [公開](/jp/deploy/ship/#ship-にワークフローのアーティファクトを公開) し、Bitrise でそのワークフローを実行します。
2. アプリの選択されたビルドバージョンの **Details** ページを開きます。
3. 右側にある Public Install Page link または QR コードを見つけます。
4. 必要なものをコピーしてステークホルダー送信します（たとえばメールで）。

Ship から直接アプリをインストールするには:

1. サポートされたデバイスから Ship にログインします。

   特定のデバイスが登録されているかを確認するために **Devices** タブをクリックします。Bitrise の [テストデバイスの登録](/testing/registering-a-test-device/) を読んでください。
2. アプリ名の下にある **Install** ボタンをクリックします。

### オンラインでアプリを公開

<div><button type="button" class="collapsible"><p>iOS アプリの公開</p></button> <div class="collapsible-content" markdown="1"> {% include message_box.html type="important" title="アプリのビルド" content="Ship に [公開された](/jp/deploy/ship/#ship-にワークフローのアーティファクトを公開) ワークフローでビルドされている場合だけ Ship でアプリを公開することができます。iOS アプリの場合、ワークフローに **Xcode Archive & Export for iOS** ステップと **Deploy to Bitrise.io** ステップが含まれている必要があります。**Xcode Archive & Export for iOS** ステップが `Release` 設定でプロジェクトをアーカイブとエクスポートすることを確認してください。"%}

{% include message_box.html type="note" title="カスタムステップで `.xcarchive.zip` ファイル" content="iOS アプリの場合、**Deploy to Bitrise.io** ステップは Ship にエクスポートする `.xcarchive.zip` ファイルを探します。**Xcode Archive & Export for iOS** ステップを使いたくない場合は、次のことを確認する必要があります。

* 公開されたワークフローにはアプリの `.xcarchive.zip` ファイルをエクスポートするワークフローがあります。つまり、使用するステップは Xcode Archive を生成し、それを zip ファイルにパッケージ化する必要があります。
* このステップは `.xcarchive.zip` ファイルを `BITRISE_DEPLOY_DIR` ディレクトリにエクスポートします。"%}

App Store Connect（以前の iTunes Connect）へ iOS アプリを公開するには次の手順が必要です。

* 使用するプロビジョニングプロファイルとコード署名 ID を選択します。
* App specific password を設定します。
* Apple Developer Account email を設定します。
* [App SKU](https://help.apple.com/app-store-connect/#/dev219b53a88) を設定します。これは内部トラッキング用にアプリに与える一意の ID です。ユーザーには表示されません。

アプリの公開設定をすると、毎回オプションを設定する必要はなく、変更したいときだけ設定します。

iOS アプリ公開の構成をするには:

1. アプリの Ship ページを開いて右上の **Settings** をクリックします。
2. **General** タブに移動します。
3. **iOS Settings** セクションに移動します。
4. 公開したい .ipa を生成するワークフローを [公開](/jp/deploy/ship/#ship-にワークフローのアーティファクトを公開) し、Bitrise でワークフローを実行します。
5. 使いたいコード署名ファイルを選択します。

   .ipa ファイルを生成するには、適切なエクスポートメソッドを選択してください。たとえば、.ipa ファイルが `app-store` メソッドを使ってエクスポートされた場合、App Store プロビジョニングファイルと配布用証明書を選択します（code signing identity）。
6. App Store に公開するため **Apple Developer Account Email** と **App Specific Password** を入力します。
7. **App SKU** を入力します。
8. **Details** ページに戻って **Publish** をクリックします。
</div>
</div>

<div><button type="button" class="collapsible"><p>Android アプリの公開</p></button> <div class="collapsible-content" markdown="1"> {% include message_box.html type="important" title="アプリのビルド" content="Ship で Android アプリを公開する前に、次のことを確認してください。

* アプリは Ship に公開されるワークフローでビルドされます。ワークフローは APK(s) や Android App Bundle をビルドするステップ（たとえば **Android Build** や **Gradle Runner** ステップ）と **Deploy to Bitrise.io** ステップを含む必要があります。
* Ship で公開する前にアプリのリリースバージョンをビルドします。リリースバージョンなしでは Ship の **Details** ページの **Publish** ボタンは無効になることに注意してください。この場合、次のとおりビルドステップに設定されているかチェックしてください。**Android Build** ステップの **Variant** は `release` を含む必要があり（例: `release` や `demoRelease`）、**Gradle Runner** ステップの **Gradle task to run** は `Release` を含む必要があります（例: `assembleRelease` や `assembleDemoRelease`）。
* APK をビルドするためにカスタム **Script** ステップ、またはほかのカスタムステップを使う場合、ステップが `BITRISE_DEPLOY_DIR` ディレクトリに APK をエクスポートして **Deploy to Bitrise.io** ステップが公開されたワークフローに含まれていることを確認する必要があります。"%}

Google Play Console への Android アプリ公開を構成するためにできること:

* Android キーストアファイルとサービスアカウント JSON ファイルを選択します。
* アプリのリリースに使うトラックを設定します。

一度アプリ公開を設定すると毎回これらのオプションを設定する必要はなく、変更したいときだけ設定します。

アプリの公開を設定するには:

1. アプリの Ship ページを開いて右上の **Settings** をクリックします。
2. **Android Settings** セクションに移動します。
3. 公開したい APK を生成するワークフローを [Expose](/jp/deploy/ship/#ship-にワークフローのアーティファクトを公開) します。
4. Google Play Console に公開するために使用する [track](https://developers.google.com/android-publisher/tracks) を入力します。
5. Android アプリに複数のモジュールがある場合は、**Module** に正確なモジュール名を入力します。 ![{{ page.title }}](/img/module-android-settings.png)
6. 適切なキーストアファイルとサービスアカウント JSON ファイルを選択します。
7. **Version History** ページに戻って公開したいバージョンを選択します。もし複数のフレーバーがある場合は、公開用に正しいフレーバーをフィルタリングして選択することができます。 ![{{ page.title }}](/img/flavorandroid.jpg)
8. **Details** ページを入力して **Publish** をクリックします。
</div>
</div>

## ステータスとログの公開

Ship で **Publish** をクリックすると、構成された設定にしたがってプロセスが開始されます。**Details** ページの上部で公開されたプロセスのステータスを確認できます。

公開プロセスのログを見るには、**Activity** タブへ移動します。公開に失敗したあとのエラーに対処するために **Download Build Log** をクリックしてそこからログをダウンロードできます。

![{{ page.title }}](/img/downloadbuildlog.jpg)

## アプリの詳細

**Details** ページの目的はアプリのもっとも重要な情報を更新することです。たとえば、選択したオンラインストアにその情報を表示したい場合に使います。

詳細は次のとおりです。

* アプリの説明文
* さまざまなサポートデバイスによって並べられたアプリのスクリーショットとフィーチャーグラフィック
* バーション番号やサイズ、バージョンコード、SDK バージョンなどのようなメタデータ。正確なパラメーターはアプリの種類によって異なります。これは **Deploy to Bitrise.io** ステップによって自動的にエクスポートされます。

### スクリーンショットまたはフィーチャーグラフィックの追加

公開するアプリのスクリーンショットを追加できます。アプリのひとつのビルドバージョンにスクリーンショットやグラフィックを追加すると、自動でその後のすべてのバージョンに追加されます。もし異なるスクリーンショットを表示したい場合は変更できます。そうでなければそのままにできます。

アプリの詳細ページにスクリーンショットやフィーチャーグラフィックを追加するには:

1. 選択したビルドバージョンの **Details** ページを開きます。
2. アップロードしたい内容に応じて **Screenshots** または **Feature Graphic** に移動します。

   ![{{ page.title }}](/img/ship-screenshots-1.jpg)
3. ファイルをドラッグ & ドロップするか、**Browse files** をクリックしてアップロードしたいファイルを選びます。
4. 完了したら、右上の **Save** をクリックします。

### アプリ説明文の更新

アプリの説明文、またはほかのすべてのテキストの詳細を同様に更新できます。利用可能なテキストフィールドのタイプはアプリのタイプによって異なります。

1. 選択したビルドバージョンの Ship の **Details** ページを開きます。
2. 編集したいフィールドへ移動してクリックします。
3. コンテンツを編集します。
4. Detall タブの右上にある **Save** をクリックします。

## 通知

Ship は3つの別々のイベントについてメールを送信することができます。

* Ship で新しいバージョンのアプリが利用可能である。
* Ship がアプリを公開した。
* Ship がアプリの公開に失敗した。

これらの通知は任意の別々のメールアドレスに送信することができます。新しいメールアドレスが通知リストに追加されたとき、Ship はそのメールアドレスに確認メールを送信します。確認後、通知が機能します。

### 新しいメールアドレスの追加

新しいメールアドレスをアプリの通知リストに追加するには:

1. アプリの Ship ページを開きます。
2. **Settings** をクリックします。
3. **Notifications** タブに移動します。
4. **Email notifications** の下の入力欄にメールアドレスを入力します。

   ![{{ page.title }}](/img/ship-notifications.jpg)
5. **Add** をクリックします。

メールアドレスが下のリストに表示され、ステータスが **Pending** になります。メールがそのアドレスに送信されます。受信者が通知を受け取りはじめるにはメールの **Confirm Notifications** をクリックする必要があります。

### 通知の構成

さまざまな人に知らせる Ship のイベントを選択できます。たとえば、うまくいったときに通知されたくなければ、公開イベントが失敗した通知だけを送ることができます。そしてもちろん別々のメールアドレスに異なる通知を送ることができます。

通知を構成するには:

1. アプリの Ship ページを開きます。
2. **Settings** をクリックします。
3. **Notifications** タブへ移動します。
4. さまざまなイベントタイプの下にあるトグルを使います。
5. すべての通知を設定したら **Save** を押します。