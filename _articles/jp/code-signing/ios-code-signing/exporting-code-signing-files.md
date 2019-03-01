---
title: codesigndocを使わないコード署名ファイルのエクスポート
menu:
  ios-code-signing:
    weight: 11
---
### Xcodeを使用したエクスポート

1. Xcodeを起動します。
2. ナビゲーションバーの Xcode > Preferences を選択します。
3. ウィンドウ上部の `Accounts` を選択します。
4. 自分のApple IDとチームを右のサイドバーで選択し、 `View Details...` をクリックします。
5. ダイアログが表示され、自分のコード署名IDとプロビジョニングプロファイルが表示されます。
6. 証明書を選択し、ポップアップから `Export` を選択します。
   ![Export certificate](/img/code-signing/ios-code-signing/xcode_export_certificate.png)
7. 保存ダイアログでファイル名を入力します。パスワードと認証を使用して安全に保存することもできますが、必ずしもそうする必要はありません。
8. 選択した証明書が .p12 形式で出力されます。

### 手作業によるエクスポート

1. キーチェーンアクセスを起動します。
2. 左のサイドバー上段にある `ログイン` を選択し、下段にある `自分の証明書` を選択します。
3. すべてのインストール済みの証明書と秘密鍵がリスト表示されます。
4. エクスポートする証明書を選択し、ポップアップメニューから `書き出す` を選択します。
   ![Export certificate](/img/code-signing/ios-code-signing/keychain_access_export.png)
5. 保存ダイアログでファイル名を入力します。パスワードと認証を使用して安全に保存することもできますが、必ずしもそうする必要はありません。
6. 選択した証明書が .p12 形式で出力されます。

## プロビジョニングプロファイルのエクスポート

### Xcodeを使用したエクスポート

1. Xcodeを起動します。
2. ナビゲーションバーの Xcode > Preferences を選択します。
3. ウィンドウ上部の `Accounts` を選択します。
4. 自分のApple IDとチームを右のサイドバーで選択し、 `View Details...` をクリックします。
5. ダイアログが表示され、自分のコード署名IDとプロビジョニングプロファイルが表示されます。
6. Provisioning Profiles の方から、プロビジョニングプロファイルを探します。
7. ローカルにインストールされていない場合は、 `Download` ボタンをクリックします。
8. ポップアップメニューから `Show in finder` を選択すると、インストール済みのプロビジョニングプロファイルが表示されます。

### 手作業によるエクスポート

1. [https://developer.apple.com](https://developer.apple.com) にアクセスし、ログインします。
2. 左のサイドバーから、 Certificates, Identifiers & Profiles を選択します。
3. Provisioning Profiles > All を選択します。
4. リストから、または、検索を使用して、プロビジョニングプロファイルを探します。
5. プロビジョニングプロファイルをクリックすると、展開し、詳細が表示されます。
6. ステータスが invalid の場合は、 `Edit` をクリックし保存し直してください。
7. `Download` をクリックしてローカルに保存し、ダウンロードしたファイルをダブルクリックしてMacOSにインストールします。

{% include message_box.html type="note" title="プロビジョニングプロファイルの保存先" content=" インストール済みのすべてのプロビジョニングプロファイルはこちらに保存されます: `~/Library/MobileDevice/Provisioning Profiles/`.
"%}

\[^1\]: Screenshots from https://developer.apple.com/support
