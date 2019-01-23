---
# jp title missing
title: Android code signing with Android Studio
menu:
  android-code-signing:
    weight: 3
---
[Android Studio](https://developer.android.com/studio/)を利用することで、コード署名証明書を明記することができます。

1. `Project navigator`を開きます。

2. あなたのプロジェクトを選択し、`Module Settings`を開きます。

3. `Modules`から、あなたのモジュールを選択します。

4. `Signing`タブより、署名情報を記入してください。例は、以下のようになります。

    * name: release

    * key alias: MyAndroidKey

    * key password: ***

    * store file: /path/to/my/keystore.jks

    * store password: ***

一度署名情報を記入すると、`signingConfigs`ブロックがあなたのモジュールの`build.gradle`ファイル内に作成されます。
