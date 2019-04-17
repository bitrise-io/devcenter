---
title: Xamarin Androidコード署名 (Xamarin Android code signing)
redirect_from: []
date: 2019-04-17 08:21:13 +0000
published: false

---
## Configuring code signing in Xamarin Studio  
Xamarin Studioでコード署名の設定を行う

You can specify the code signing configuration for your Xamarin Android project by creating a signed APK in [Xamarin Studio](https://www.visualstudio.com/xamarin/).

[Xamarin Studio](https://www.visualstudio.com/xamarin/)にて署名済みAPKを作成することでXamarin Androidプロジェクトのコード署名設定を指定することができます。

1. Log into your `Xamarin Studio`.　`Xamarin Studio`にログインします。
2. Double click on your Xamarin Android project to open `Project Option`.　ご自身のXamarin Androidプロジェクトをダブルクリックして`Project Option`を開きます。
3. Select the `Android Package Signing` in `Build group`.　`Build group`内の`Android Package Signing` を選択します。
4. Select your platform in the `Configuration - Platform`.　`Configuration - Platform`でお使いのプラットフォームを選択します。
5. Check the `Sign .APK file using the following keystore details`.　をチェックします。
6. Fill out the signing information.　署名情報を入力してください。

## Using the same keystore path locally and on [bitrise.io](https://www.bitrise.io) for Xamarin Android  
同一のkeystoreパスを使ってXamarin Androidを[bitrise.io](https://www.bitrise.io)上で使用する

You **cannot use environment variables** in your keystore path in your Xamarin project! The keystore path has to be relative to the folder of your Xamarin Android project. You can also use an absolute path.

You can use the same path on your local machine and on [bitrise.io](https://www.bitrise.io) by putting your keystore into your repository.

Xamarinプロジェクトではkeystoreパスにおいて環境変数を使うことはできません。keystoreパスはご自身のXamarin Androidプロジェクトのフォルダと関係性がある必要があります。絶対パスを使用することもできます。

ローカルマシンで同一のパスを使用することもでき、[bitrise.io](https://www.bitrise.io)においてレポジトリへkeystoreを配置することもできます。

{% include message_box.html type="important" title="Gitignore your keystoreのgitignore" content=" Don't forget to gitignore your keystore in your repository! レポジトリ内でkeystoreをgitignoreするのをお忘れなく！"%}

Since your keystore is gitignored, you have to upload your keystore to the `GENERIC FILE STORAGE` of Bitrise and download it to the same location in the build.

keystoreのgitignoreが完了したら、ご自身のkeystoreをBitriseの`GENERIC FILE STORAGE`へアップロードして、ビルドの同じロケーションへそれをダウンロードしてください。

1. On the `Dashboard`, click on your `Workflow` tab.　`Dashboard`で`Workflow`タブをクリックしてください。
2. Click on `Code signing`.　`Code signing`をクリックします。
3. Scroll down to the `GENERIC FILE STORAGE` field.　`GENERIC FILE STORAGE`欄までスクロールダウンします。
4. Type your environment variable name here in the first field. In our example, we use `XAMARIN_KEYSTORE`. 最初の欄にご自身の環境変数名を入力します。Bitriseは`XAMARIN_KEYSTORE`を使用しています。

   ![Screenshot](/img/android-code-signing/generic-file-storage-xm.png)
5. Upload your keystore file in the `Upload file field`.

   Your environment variable (for example, `$BITRISEIO_XAMARIN_KEYSTORE_URL`) will be automatically available with the download URL of your keystore file.

   `Upload file field`へご自身のkeystoreファイルをアップロードします。環境変数（例：`$BITRISEIO_XAMARIN_KEYSTORE_URL`）がkeystoreファイルのダウンロードURLを伴って自動的に利用可能になります。

   ![Screenshot](/img/android-code-signing/download-url.png)
6. Navigate back to your workflow.　ワークフローに戻ります。
7. Insert the `File Downloader` step before the `Xamarin Archive` step. The `File Downloader` step will get a `Download source url` input.

   `Xamarin Archive`ステップの前に`File Downloader`を挿入します。`File Downloader`ステップは`Download source url`のインプットを入手します。
8. Type your environment variable, for example, `$BITRISEIO_XAMARIN_KEYSTORE_URL` in the `Download source url` field.　

   `Download source url`欄に環境変数（例：`$BITRISEIO_XAMARIN_KEYSTORE_URL`）を入力します。
9. Set your keystore path in the `Download destination path`.

   `Download destination path`にてkeystoreパスをセットしてください。

![Screenshot](/img/android-code-signing/file-downloader.png)

{% include message_box.html type="important" title="Bitrise keystore pathBitrise keystoreパス" content=" Ensure that your Bitrise keystore path is the same as your local path relative to your project root. For example, if `keystore.jks` is in your project's root, then your Bitrise keystore path has to be `$BITRISE_SOURCE_DIR/keystore.jks`. Bitriseのkeystoreパスはお使いのプロジェクトルートと関連したローカルパスと同じなのでお確かめください。例えば、プロジェクトのルート内に`keystore.jks`がある場合、あなたのBitrise keystoreパスは `$BITRISE_SOURCE_DIR/keystore.jks`である必要があります。"%}