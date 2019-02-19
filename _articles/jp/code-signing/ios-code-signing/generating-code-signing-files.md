---
title: コード署名ファイルの生成
menu:
  ios-code-signing:
    weight: 10
---
アプリの署名をするには、証明書（Certificates）とプロビジョニングプロファイルの２種類のファイルが必要になります。

## コード署名証明書を生成する

証明書はあなたが登録された開発者で、このコードをビルドし、Developer Programの一員であり、Appleがその証明書を発行したことを保証するものです。

証明書を取得するには、Keychain Accessで証明書署名要求を生成し、Appleに送信する必要があります。既に公開鍵/秘密鍵がない場合は、公開鍵/秘密鍵が作成されます。 Appleはその情報を確認し、証明書を作成します。

### Xcodeでコード署名証明書を生成する

まず、Xcodeのアカウント設定にApple IDを追加します。すでに完了している場合は、手順6に進んでください。

1. Xcodeを起動します。
2. ナビゲーションバーから[Xcode]> [環境設定]を選択します。
3. ウィンドウ上部の`Accounts`を選択します。
4. 左下の `+`をクリックして、`Add Apple ID...`を選択します。
   ！[Apple IDを追加する](/img/code-signing/ios-code-signing/xcode_adding_account.png)
5. ダイアログが表示されます。 Apple IDとパスワードを追加し、`Sign in`を選択します。アカウントをお持ちでない場合は、`Create Apple ID`を選択してApple IDを作成することができます。
   ！[Xcodeへのサインイン](/img/code-signing/ios-code-signing/xcode_sign_in.png)
6. 右側のバーからApple IDとチームを選択し、`View Details...`をクリックします。
7. Code singing identitiesとプロビジョニングプロファイルが表示されたダイアログが表示されます。
   ！[Xcodeチームの詳細](/img/code-signing/ios-code-signing/xcode_signing_files.png)
8. 署名の下で、`iOS Development`と`iOS Distribution`のプロファイルを探します。作成していない場合は、その隣に `Create`ボタンがあります。これを選択するだけで、XcodeがCode singing identitiesを発行してダウンロードします。

{% include message_box.html type="warning" title="Code singing identitiesの隣にある`Reset`をクリックする場合" content="Code Signing Identitiesがすでに発行されている場合は、その隣に`Reset`ボタンが表示されます。 Xcodeが生成してダウンロードする新しい証明書を発行することはできますが、以前の証明書は無効になるので、これらファイルを紛失した場合、またあなたがこの操作で何が起こるのか分かっている場合にのみ実行してください。
"%}

### コード署名証明書を手動で生成する

 1. macOSで `Keychain Access`を開きます。
 2. `Keychain Access`>`認証局アシスタント`>`認証局から証明書を要求する`を選択します。
 3. `ユーザのメールアドレス` と`通称`を入力し、`ディスクに保存` を選択します。 `続ける`をクリックし、生成された`certSigningRequest`ファイルをローカルに保存します。
    ！[証明書アシスタント]（/img/code-signing/ios-code-signing/certificate_assistant.png）
 4. [https://developer.apple.com](https://developer.apple.com)にアクセスし、アカウントにログインします。
 5. 左側のサイドバーから`Certificates, IDs & Profiles`を選択します。
 6. `Certificates`に行き、右上の`+`ボタンをクリックします。
 7. `iOS App Development` を選択し、「Continue」をクリックします。
 8. 次のページでは、 `certSigningRequest`ファイルを作成する手順が表示されます。続行をクリックします。
 9. 作成した `certSigningRequest`をフォームにアップロードし、続行をクリックします。あなたのコード署名証明書が生成されます。
10. 証明書をダウンロードしてダブルクリックしてインストールします。インストールされると、`Keychain Access`アプリに追加されます。

## プロビジョニングプロファイルを生成する

プロビジョニングとは、端末で起動してアプリサービスを使用するためのアプリの準備と設定のプロセスです。Development Provisioning Profileには、アプリの実行に適したデバイス識別子（UUID）が保持されます。Distribution Provisioning ProfileにはApp Storeプロファイルが含まれているため、アプリをApp Storeに配布でき、Ad-hocプロファイルはテスターに​​配布するのに適しています。

### Xcodeでプロビジョニングプロファイルを生成する

Xcodeは、プロジェクトの固有のバンドルIDと一致するプロジェクトのApp IDを自動的に生成します。アプリケーションIDは、1つ以上のアプリケーションを識別するために使用されます。 1つの一意のバンドルIDにのみ一致する _explicit App ID_ または複数のものに一致する _wildcard App ID_ にすることができます。

Xcodeはプロジェクトの _Team Provisioning Profile_ も自動的に作成するので、自動的にデバイスへのデプロイを開始できます。

問題が発生した場合は、デバイスが適格であることを確認する必要があります。たとえば、デバイスがdeployment targetと一致しない場合は、エラーが発生します。

また、アプリが正しいチームに接続されていることを確認してください。

1. Xcodeのプロジェクトナビゲータからプロジェクトファイルを選択します。
2. `Signing`に移動し、`Team`の下に正しいチームを選択します。
   ！[チーム選択](/img/code-signing/ios-code-signing/xcode_team_selector.png)

{% include message_box.html type="note" title="手動プロビジョニングプロファイルの設定" content=" 問題が発生して解決できない場合は、手動手順に進み、ドキュメントに従ってプロビジョニングプロファイルを設定します。 "%}

{% include message_box.html type="note" title="Distribution Provisioning Profile" content="Distribution Provisioning Profileをセットアップするには、手動セットアップを行ってください。"%}

### Xcodeでプロビジョニングプロファイルをダウンロードする

プロビジョニングプロファイルをすでに作成している場合は、次の操作を実行できます。

1. Xcodeを起動します。
2. ナビゲーションバーから Xcode> Preferencesを選択します。
3. ウィンドウ上部の`Accounts`を選択します。
4. あなたのApple IDとチームを選択し、`Download Manual Profiles`を選択します。
5. `~/Library/MobileDevice/Provisioning Profiles/`に移動すると、プロファイルが見つかります。

### 手動でプロビジョニングプロファイルを生成する

#### App IDを設定する

1. プロジェクトのApp IDをまだ作成していない場合は、[https://developer.apple.com](https://developer.apple.com)にアクセスしてログインします。
2. 左側のサイドバーからCertificates, Identifiers & Profilesを選択します
3. Identifiers > App IDsに移動します。
4. `App ID Description`に、あなたのApp IDの識別可能な名前を追加します
5. `Explicit App ID`を選択し、バンドルIDをフィールドに追加します。
6. 必要な追加の`App Services`を選択します。
7. continueをクリックします。

#### プロビジョニングプロファイルの生成

 1. [https://developer.apple.com](https://developer.apple.com)にアクセスしてログインします。
 2. 左側のサイドバーからCertificates, Identifiers & Profilesを選択します
 3. Provisioning Profiles > Allに移動します
 4. 右上の`+`を選択します。
 5. 開発用には、`Development`、配布用には`Distribution`を選択し、continueをクリックします。
 6. 使用するApp IDを選択します。
 7. プロビジョニングプロファイルに含める証明書を選択します。この証明書はこのプロファイルで構築できます。continueをクリックします。
 8. このプロファイルで使用するすべてのデバイスを選択し、[続行]をクリックします。
 9. プロビジョニングプロファイルに名前を付けて、continueをクリックします。
10. プロファイルが生成されます。デバイスにダウンロードしてダブルクリックすると、Macにインストールできます。

#### プロビジョニングプロファイルをダウンロードする

 1. [https://developer.apple.com](https://developer.apple.com)にアクセスしてログインします。
 2. 左側のサイドバーからCertificates, Identifiers & Profilesを選択します
 3. Provisioning Profiles > Allに移動します
 4. リストから探しているプロビジョニングプロファイルをみつけるか、検索を使用してフィルタリングします。
 5. 選択したプロビジョニングプロファイルをクリックすると、詳細が展開されます。
 6. ステータスが無効な場合は、`Edit`ボタンをクリックして再度保存することができます。
 7. `Download`ボタンをクリックしてダウンロードし、ダブルクリックしてMacにインストールします。

\[^1\]: Screenshots from https://developer.apple.com/support
