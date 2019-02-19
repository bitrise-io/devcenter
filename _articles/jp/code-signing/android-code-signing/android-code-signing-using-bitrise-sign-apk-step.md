---
title: Sign APKステップを使ったAndroidコード署名
redirect_from:
- "/code-signing/android-code-signing/android-code-signing-using-bitrise-sign-APK-step/"
menu:
  android-code-signing:
    weight: 2
---
## `Sign APK` ステップによるコードの署名

Bitriseの workflow にある `Sign APK` ステップにてAPKファイルに署名することができます。

Bitrise Project Scannerは `Sign APK` ステップが含まれる `deploy workflow` を提供する。 このステップを踏むことによって workflow に沿って APKの署名を行うことができます。すでに Bitrise に keystore ファイルがアップロードされている場合、このステップは自動的に行われます。 `Code signing` タブの Workflow Editor に keystore ファイルをアップロードするだけで大丈夫です。

このページでは、`android-multiple-test-results-sample` のデモアプリに沿ってコードの署名方法について説明します。

1. [bitrise.io](https://www.bitrise.io/) にログインして、`your app` をクリックする。
2. Bitrise `Dashboard` の `Workflow` を選択する。
3. `Code signing` を選択する。
4. `ANDROID KEYWSTORE FILE` の `Upload file` という箇所をクリック、またはファイルをドラッグしてアップロードする。

   ![Screenshot](/img/android-code-signing/upload-file.png)
5. 次の3つの入力フォームに記入する: `keystore password`、 `keystore alias` 、及び `private key password`。

   ![Screenshot](/img/android-code-signing/three-fields.png)
6. `Save metadata` を選択する。
   アップロードされたファイルが `Sign APK step` に取り込まれる。

上記手段を踏むことで Bitrise に keystore ファイルがアップロードされ、`BITRISEIO_ANDROID_KEYSTORE_URL` の環境変数に一時的に使用できる Read-only のダウンロードURLが設定されます。 このURLから今後のビルドで使用される keystore ファイルがダウンロードできます。workflow の `Sign APK` ステップはこの環境変数をウォッチし、セットされた場合、それが起動されます。

## ファイルのダウンロード

`File-downloader` ステップの中にある `GENERIC FILE STORAGE` から keystore ファイル等のダウンロードが行えます。

keystore ファイルをダウンロードする為の一例


```
- file-downloader:

   inputs:

   - source: $BITRISEIO_ANDROID_KEYSTORE_URL

   - destination: "$HOME/keystores/my_keystore.jks" #native android#

```

このステップを踏んだ後、 `my_keystore.jks` は `$HOME/keystores/my_keystore.jks` に格納されます。

## deploy workflow を起動する

workflow は _手動でも_ 起動することができます。

1. `Builds` ページにてアプリを開く。
2. `Start/Schedule a Build` を選択する。
3. 表示されたポップアップからWorkflow下の `deploy` を選択する。
4. `Start Build` を選択する。

更に、workflow にトリガーを設定することによって、_GIT event_ から起動させることもできます。

1. `Triggers` タブを選択する。
2. event (push/tag/pull) を設定し、`deploy` workflow を選択する。
3. `Done` を選択し、`Save` で保存する。

次にリポジトリが設定されたトリガーに沿って変更された際、`deploy` workflow が開始されます。
