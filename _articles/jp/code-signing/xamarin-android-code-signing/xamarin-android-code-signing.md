---
title: Xamarin Androidコード署名
menu:
  android-code-signing:
    weight: 9

---
## Xamarin Studioでコード署名の設定を行う

[Xamarin Studio](https://www.visualstudio.com/xamarin/)にて署名済みAPKを作成することでXamarin Androidプロジェクトのコード署名設定を指定することができます。

1. `Xamarin Studio`にログインします。
2. ご自身のXamarin Androidプロジェクトをダブルクリックして`Project Option`を開きます。
3. `Build group`内の`Android Package Signing` を選択します。
4. `Configuration - Platform`でお使いのプラットフォームを選択します。
5. `Sign .APK file using the following keystore details`をチェックします。
6. 署名情報を入力してください。

## Xamarin Androidで同一のkeystoreパスをローカルと[bitrise.io](https://www.bitrise.io)上で使用する

Xamarinプロジェクトではkeystoreパスにおいて**環境変数を使うことはできません**！keystoreパスはご自身のXamarin Androidプロジェクトのフォルダと関係性がある必要があります。絶対パスを使用することもできます。

レポジトリへkeystoreを配置することで、ローカルマシンでも[bitrise.io](https://www.bitrise.io)上でも同じパスを使用することができます。

{% include message_box.html type="important" title="keystoreのgitignore" content=" レポジトリ内でkeystoreをgitignoreするのをお忘れなく！"%}

keystoreのgitignoreが完了したら、ご自身のkeystoreをBitriseの`GENERIC FILE STORAGE`へアップロードして、ビルド内の同一のロケーションへそれをダウンロードしてください。

1. `Dashboard`で`Workflow`タブをクリックしてください。
2. `Code signing`をクリックします。
3. `GENERIC FILE STORAGE`欄までスクロールダウンします。
4. 最初の欄にご自身の環境変数名を入力します。Bitriseは`XAMARIN_KEYSTORE`を使用しています。

![Screenshot](/img/android-code-signing/generic-file-storage-xm.png) 5. `Upload file field`へご自身のkeystoreファイルをアップロードします。環境変数（例：`$BITRISEIO_XAMARIN_KEYSTORE_URL`）がkeystoreファイルのダウンロードURLを伴って自動的に利用可能になります。

![Screenshot](/img/android-code-signing/download-url.png) 6. ワークフローに戻ります。 7. `Xamarin Archive`ステップの前に`File Downloader`を挿入します。`File Downloader`ステップは`Download source url`のインプットを入手します。 8. `Download source url`欄に環境変数（例：`$BITRISEIO_XAMARIN_KEYSTORE_URL`）を入力します。 9. `Download destination path`にてkeystoreパスをセットしてください。

![Screenshot](/img/android-code-signing/file-downloader.png)

{% include message_box.html type="important" title="Bitrise keystoreパス" content=" Bitriseのkeystoreパスはお使いのプロジェクトルートと関連したローカルパスと同じなのでお確かめください。例えば、プロジェクトのルート内に`keystore.jks`がある場合、あなたのBitrise keystoreパスは `$BITRISE_SOURCE_DIR/keystore.jks`である必要があります。"%}