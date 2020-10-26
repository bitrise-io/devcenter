---
changelog:
last_modified_at:
tag: []
title: Ship機能を使ったデプロイ (Deploying with Ship)
redirect_from: []
description: ''
published: false

---
## Shipの概要

{% include message_box.html type="important" title="Shipはベータ版です" content="この機能はまだベータ版であるということに注意してください。"%}

Shipはユーザーの悩みを解決することを目指したデプロイソリューションです。Shipがあれば、アプリ配布 (バージョン履歴や全ての重要なメタデータ) を一括管理できます。

Shipを使ったデプロイはオートの再署名やアーティファクトの生成を含まれており、全ての過去のバージョンも保管します。全てのマーケティングコピーであるアプリのメタデータやスクリーンショットもBitrise内で編集することができるので、非開発者の方でも管理が可能です。

{% include message_box.html type="info" title="Ship言語" content="今現在、英語によるロケールのみサポートしております。その他の言語による提出はサポート外です。"%}

Shipを使うと様々なことが実現します：

* アプリの全てのビルドバージョンを確認
* 特定のビルドバージョンの詳細を確認・編集 (説明・スクリーンショットや、アプリのサイズやサポートしているデバイスの種類などの重要なパラメータを含む)
* 公開インストールページへのリンクを使って、テスターへアプリを直接送信
* 公開する準備が整えば、App Store Connect / Google Play Consoleへ特定のビルドバージョンをデプロイ
* クロスプラットフォームプロジェクトの場合、**Version History** ページを確認してプラットフォームを切替

  ![{{ page.title }}](/img/ship_benefits.jpg)

## Shipの開始方法

Shipを開くには２つの方法があります。

* アプリの**Add-ons**タブ：クリックすればShipのホームページに遷移されます。
* **Builds**ページより：ビルドのShipページに遷移されます。

最初のログインの際、公開するのに利用可能な1つのビルドバージョンがない可能性があります。心配ありません、簡単に修正ができます。

* ワークフロー内に、アプリをビルドする**Xcode Archive & Export for iOS**や**Android Build**といったステップを追加します。
* そのワークフロー内に、適切なバージョンの**Deploy to Bitrise.io**ステップをアプリのビルドを実行するステップの後に追加します。

{% include message_box.html type="warning" title="Shipと互換性のあるバージョン" content="**Deploy to Bitrise.io**ステップは1.9.0バージョン以上、**Xcode Archive & Export for iOS**ステップは2.6.0バージョン以上であるかどうか確認してください。これらより古いバージョンはShipをサポートしていません。"%}

アプリのビルドがいったん終了し、APKやIPAファイルを作成していれば、Shipを使用できるようになります。

## Shipを使ったアプリの構成と公開

Ship上でアプリを公開するには：

* [エクスポーズ済みのワークフロー](/jp/deploy/ship/#ship-にワークフローのアーティファクトを公開)を最低1つ含むアプリをビルドする
* **Settings**ページにて公開に関する設定を行う
* **Publish**ボタンをクリック

iOSとAndroidアプリの**Settings**ページには、それぞれ固有の設定方法があります。これはクロスプラットフォームアプリ用であり、iOSとAndroidの両方の設定を施す必要があります。

### Shipへワークフローのアーティファクトを公開する

ワークフローのアーティファクトをエクスポーズすれば、そのワークフローのプロダクトはShip内での使用が可能です：例えば、ご自身のワークフローがAPKを生成するのであれば、Shipを使った公開ができます。デフォルトでは、**Deploy to Bitrise.io**ステップの適切なバージョンがワークフローに含まれていれば、全てのワークフローがエクスポーズされるようになっています。デフォルトの設定で大丈夫であれば、そのままにしておきましょう。

しかしShipにワークフローを追加すれば、そのワークフローのみがエクスポーズされます。

Shipにワークフローのアーティファクトをエクスポーズするには：

1. アプリのShipページに進みます。
2. 右上隅にある**Settings**をクリックします。
3. **General**タブに進みます。
4. **Expose Artifacts From the Selected Workflow to Ship**のテキストボックスに、必要なワークフロー全てを追加します。

   ![{{ page.title }}](/img/Settings___android-test-test.png)

   もしご自身のアプリがクロスプラットフォームであれば、以下のような2つのテキストボックスが表示されます：一方はiOS用、もう一方はAndroid用です。コンマを使ってワークフロー名を別々に分けてください (例： `build, deploy, release_build_android`) 。
5. ページの一番下までスクロールして**Save**をクリックします。

### コード署名ファイル

**Settings**ページでは、異なるコード署名ファイルの中から選択することができます。通常の方法でiOSプロビジョニングプロファイルや証明書、Android keystoreファイルやService Account JSONファイルといったものをアップロードすることができます：

* [iOSコード署名ファイル](/jp/code-signing/ios-code-signing/code-signing-index/)
* [Androidコード署名ファイル](/jp/code-signing/android-code-signing/android-code-signing-index/)

コード署名ファイルは、全てのオンラインストアでの公開やテストデバイスへインストールするのに必要になります。

### テストデバイスでアプリをインストールする

アプリをデバイスでインストールするには、3つの方法があります：

* パブリックインストールページのリンクをテスター全員と他の関係者へ送信する
* QRコードを送信する：読み取ることによりパブリックインストールページに遷移されます。
* デバイスからShipにログインし、そこから直接インストールする

{% include message_box.html type="important" title="パブリックインストールページを有効化する" content="パブリックインストールページでは、エクスポーズされたワークフローの**Deploy to Bitrise.io**ステップを正確に構成する必要があります：ステップの **Enable public page for the App?**のインプットを`true`に設定してください。"%}

{% include message_box.html type="important" title="アーティファクトの種類" content="The public install page is not available for all type of artifacts. パブリックインストールページは全てのアーティファクトに対応しておりません。

* **<iOS>** ワークフローがDebug, DevelopmentもしくはAd-hocタイプのプロビジョニングプロファイルで署名された.ipaファイルをビルドする場合にのみアーティファクトは利用できます。
* **<Android>** ワークフローがスプリットされていないAPKをビルドする、もしくは、スプリットされたユニバーサルAPKをビルドする場合にのみアーティファクトは利用できます。"%}

パブリックインストールページのリンクまたはQRコードを送信するには：

1. インストールが可能なファイルを作成するワークフローを[エクスポーズ](/jp/deploy/ship/#exposing-a-workflows-artifacts-to-ship)して、Bitriseでワークフローを実行します。
2. アプリの選択済みビルドバージョンの**Details**ページを開きます。
3. 右側にパブリックインストールページのリンクまたはQRコードがあることを確認します。
4. いずれかをコピーして、(メールなどを使って)関係者に送信します 。

Shipから直接インストールするには：

1. サポート済みのデバイスからShipにログインします。  
   **Devices**タブを開いて特定のデバイスが登録されているかどうか確認します。詳しくは[テストデバイスの登録](/jp/testing/registering-a-test-device/)を参照してください。
2. アプリ名の下にある**Install**ボタンをクリックします。

### アプリをオンラインで公開する

<div><button type="button" class="collapsible"><p>iOSアプリを公開する</p></button> <div class="collapsible-content" markdown="1"> {% include message_box.html type="important" title="アプリのビルド" content="Shipでアプリを公開するには、ワークフローがShipにエクスポーズされている必要があります。iOSアプリでは、ワークフローに**Xcode Archive & Export for iOS**ステップと**Deploy to Bitrise.io**ステップが含まれていなければなりません。**Xcode Archive & Export for iOS**ステップは`Release`構成を使ってプロジェクトのアーカイブとエクスポートを行うことに注意してください。"%}

{% include message_box.html type="note" title="カスタムステップを使った`.xarchive.zip`ファイル" content="The **Deploy to Bitrise.io** Step looks for an `.xcarchive.zip` file to export to Ship in the case of an iOS app. If you do not want to use the **Xcode Archive & Export for iOS** Step, you just need to make sure that:  
iOSアプリの場合、**Deploy to Bitrise.io**ステップはShipにエクスポートするために、`.xarchive.zip`ファイルを探します。万が一**Xcode Archive & Export for iOS**ステップを使いたくない場合、以下のことに注意する必要があります：

* アプリの`.xarchive.zip`ファイルをエクスポートする、エクスポーズ済みのワークフロー内にステップが存在します。これは、使用するステップがXcode Archiveを作成し、zipファイル内にパッケージする必要があります。
* このステップは`.xarchive.zip`ファイルを`BITRISE_DEPLOY_DIR`ディレクトリにエクスポートします。"%}

App Store Connect (旧 iTunes Connect) へiOSアプリの公開についての構成を行うには：

* 使用するプロビジョニングプロファイルとコード署名IDを選択します。
* アプリ専用のパスワードを設定します。
* Apple Developer Accountのメールアドレスを設定します。
* [App SKU](https://help.apple.com/app-store-connect/#/dev219b53a88)を設定します：これはユニークIDであり、内部トラッキング用にアプリに与えられます。顧客には表示されません。

アプリの公開についての設定がいったん完了すれば、以降は毎回オプションを設定する必要はありません。変更したい場合は、いつでも可能です。

iOS用アプリの公開を設定するには：

1. アプリのShipページを開き、右上端の**Settings**をクリックします。
2. **General**タブに進みます。
3. **iOS Settings**セクションに進みます。
4. 公開したい.ipaを作成するワークフローを[エクスポーズ](/jp/deploy/ship/#exposing-a-workflows-artifacts-to-ship)して、そのワークフローをBitriseで実行します。
5. 使用になりたいコード署名ファイルを選択します。  
   エクスポート方法に関して、.ipaファイル作成に使用した適切なファイルを選ぶように心がけてください。例えば、`app-store`方法を使って.ipaがエクスポートされた場合、App Storeプロビジョニングプロファイルと配布用証明書 (コード署名ID) を選んでください。
6. **Apple Developer Accountのメールアドレス**と**App Specific Password (アプリ専用パスワード)** を入力してApp Storeで公開できるようにします。
7. **App SKU**を入力します。
8. **Details**ページに戻り、**Publish**をクリックします。 </div> </div>

<div><button type="button" class="collapsible"><p>Androidアプリを公開する</p></button> <div class="collapsible-content" markdown="1"> {% include message_box.html type="important" title="アプリのビルド" content="ShipでAndroidアプリを公開する前に：

* アプリはShipにエクスポーズされたワークフローでビルドが行われます。ワークフローには、APKをビルドするステップまたは (**Android Build** / **Gradle Runner** ステップといった) Android App Bundleと、**Deploy to Bitrise.io**ステップが必要になります。
* Shipで公開する前に、アプリのリリースバージョンをビルドしておく必要があります。リリースバージョンがなければ、**Details**ページの**Publish**ボタンが動作しません。このケースでは、ステップに以下の項目が設定されているか確認してください：
  * **Android Build**ステップの**Variant**インプット欄に`release` (例: `release`, `demoRelease`)
  * **Gradle Runner**ステップの**Gradle task to run**インプット欄に `Release` (例: `assembleRelease`, `assembleDemoRelease`)
* APKをビルドするうえで、カスタムの**Script**ステップまたは他のカスタムステップを使用している場合、ステップが`BITRISE_DEPLOY_DIR`ディレクトリにAPKをエクスポートしている必要があります。また、**Deploy to Bitrise.io**ステップをエクスポーズされたワークフローに含ませてください。"%}

Google Play ConsoleへAndroidアプリの公開を設定するには：

* Android keystoreファイルとService Account JSONファイルを選択します。
* アプリのリリースに使用するtrackを設定します。

アプリの公開設定をいったん完了すると、以降は毎回オプションを設定する必要はありません。手直しが必要な場合はいつでも可能です。

Andoroidアプリの公開を設定するには：

1. Shipのページを開いて右上端の**Settings**をクリックします。
2. **Android Settings**セクションへ進みます。
3. 公開したいAPKを作成するワークフローを[エクスポーズ](/jp/deploy/ship/#exposing-a-workflows-artifacts-to-ship)します。
4. Google Play Consoleでの公開に使用する[Track](https://developers.google.com/android-publisher/tracks)を入力します。
5. 複数のモジュールがAndroidアプリに含まれている場合、**Module**の空欄に正確なモジュールを入力します。  
   ![{{ page.title }}](/img/module-android-settings.png)
6. 適切なkeystoreファイルとService Account JSONファイルを選択します。
7. **Version History**ページに戻り、公開したいバージョンを選択します。アプリに複数のフレーバーがある場合、フィルターにかけて適切なフレーバーを探すことができるので、それを選択します。  
   ![{{ page.title }}](/img/flavorandroid.jpg)
8. **Details**ページの空欄を埋めて、**Publish**をクリックします。 </div> </div>

## ステータスとログの公開

Shipで**Publish**ボタンをクリックすると、構成済みの設定に基づいてプロセスが開始されます。アプリの**Details**ページ上部でアクティブな公開プロセスのステータスを確認できます。

公開プロセスでログを表示させるには、**Activity**タブに進みます。そこから、**Download Build Log**をクリックしてログのダウンロードを行えるので、失敗後にエラーをチェックすることが可能です。

![{{ page.title }}](/img/downloadbuildlog.jpg)

## アプリの詳細

アプリの**Details**ページは、ご自身のアプリの重要な情報のアップデートを行うことを目的としています。主な活用方法としては、その情報をオンラインストアで表示させることができます。

Detailsに含まれる項目は以下のとおりです：

* アプリの説明
* 異なるサポート済みのデバイスによって配置されたアプリのスクリーンショットならびにフィーチャーグラフィック
* バージョン番号、サイズ、バージョンコード、SDKバージョンなどのメタデータ  
  アプリの種類によって正確なパラメータは異なります。これは**Deploy to Bitrise.io**ステップにより自動でShipにエクスポートされます。

### スクリーンショットやフィーチャーグラフィックを追加する

公開するアプリのスクリーンショットを追加することができます。アプリの1つのバージョンにスクリーンショットやフィーチャーグラフィックを一回追加すれば、その後の全てのバージョンに追加されます。異なるスクリーンショットを表示させたいのであれば、修正することも可能です。

アプリのDetailsページへスクリーンショットとフィーチャーグラフィックを追加するには：

1. (アプリの選択済みビルドバージョンの) ShipのDetailsページを開きます。
2. アップロードを行う**Screenshots**または**Feature Graphic**へ進みます。

   ![{{ page.title }}](/img/ship-screenshots-1.jpg)
3. ファイルをドラッグ&ドロップ、または**Browse files**をクリックしてアップロードを行うファイルを選択します。
4. 完了したら、右上端の**Save**をクリックします。

### アプリの説明文を更新する

アプリの説明文の更新や、同様に他の全てのテキスト編集を行う事ができます。使用可能なテキスト欄の種類は、アプリの種類によって異なります。

1. Shipの**Detail**sページを開きます。
2. 編集を行う欄へ進み、コンテンツ欄をクリックします。
3. コンテンツを編集します。
4. Detailsタブの右上にある**Save**をクリックします。

## 通知

Shipは次の３つの異なるイベントの発生時にメールを送信します：

* アプリの新規のビルドバージョンがShipで利用可能になったとき
* Shipでアプリの公開が成功したとき
* Shipでアプリの公開が失敗したとき

これらの通知は登録されたメールアドレス全てに送信することが可能です。新しいメールアドレスが通知リストに追加されたとき、Shipはそのアドレスに確認メールを送信します：確認後、通知が機能するようになります。

### 新規のメールアドレスを追加する

アプリの通知リストに新規のメールアドレスを追加するには：

1. アプリのShipページを開きます。
2. **Settings**をクリックします。
3. **Notifications**タブへ進みます。
4. **Email notifications**の下にあるAdd Newのインプット欄にメールアドレスを入力します。

   ![{{ page.title }}](/img/ship-notifications.jpg)
5. **Add**をクリックします。

これを行うことにより、リストの最後尾に追加されたメールアドレスが表示 (ステータス：**Pending** (保留)) されます。その後メールが追加されたアドレスの受信ボックスに届きます：受取人は**Confirm Notifications**をクリックして、通知の受け取りを許可してください。

### 通知を設定する

通知の受取人をイベント別に分けることが可能です。例えば、 (問題が一定期間生じていない場合) 公開失敗の通知のみ有効化して、不要な成功通知を無効化することができます。さらに、異なる種類のイベント発生通知を、異なるメールアドレスにグループ化して送信することもできます。

通知の設定方法：

1. アプリのShipページを開きます。
2. **Settings**をクリックします。
3. Notifications タブへ進みます。
4. イベントタイプの下にあるトグルを使用します。
5. 全ての通知設定が完了したら、**Save**をクリックします。