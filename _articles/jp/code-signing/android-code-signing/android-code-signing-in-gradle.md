---
# jp title missing
title: Android code signing in Gradle
menu:
  android-code-signing:
    weight: 4
---
## Gradleでコード署名を手動設定する

Gradle設定でコード署名の設定をマニュアルで指定して、ビルドプロセス中にアプリケーションに署名を付けることができます。

1. モジュール階層の `build.gradle` ファイルを開きます。
2. `signingConfigs` ブロックを追加し、次の設定値を定義します。
   `storeFile`, `storePassword`, `keyAlias`, and `keyPassword`

**署名設定のサンプル**:

    android { 
       signingConfigs { 
       	   release { 
           	 keyAlias 'MyAndroidKey' 
             keyPassword '***' 
             storeFile file("/path/to/my/keystore.jks") 
             storePassword '***' 
           } 
       } ...

## 環境変数について

キーストアのパス(`storeFile`)とキーストアのパスワードの設定値に環境変数を使用することで、キーストアのパスをローカルと[bitrise.io](https://www.bitrise.io)に置くことを避けることができます。

プロジェクトのキーストアパスが `$HOME/keystores/my_keystore.jks` と設定されている場合、モジュールレベルの `build.gradle` は次のようになっているでしょう:

    android { 
       signingConfigs { 
       	   release { 
           	 keyAlias 'MyAndroidKey' 
             keyPassword '***' 
             storeFile file(System.getenv("HOME") + "/keystores/my_keystore.jks")
             storePassword '***' 
           } 
       } ...

`System.getenv("ENV_KEY")` を使い、Gradle設定ファイルから環境変数にアクセスすることができます。

`keyPassword` と `storePassword` の環境変数が `Code signing` タブで設定されている場合、モジュールレベルの `build.gradle` は次のようになります:

    android {
       signingConfigs {
           release {
             keyAlias System.getenv("BITRISEIO_ANDROID_KEYSTORE_ALIAS")
             keyPassword System.getenv("BITRISEIO_ANDROID_KEYSTORE_PRIVATE_KEY_PASSWORD")
             storeFile file(System.getenv("HOME") + "/keystores/my_keystore.jks")
             storePassword System.getenv("BITRISEIO_ANDROID_KEYSTORE_PASSWORD")
           }
       }
        ...

ワークフローエディタの `Code Signing` タブの `GENERIC FILE STORAGE` にキーストアをアップロードすることでこれらの環境変数を取得できます。

{% include message_box.html type="important" title="使用している環境変数を定義する" content="使用している環境変数を [bitrise.io](https://www.bitrise.io) にも同様に設定することを忘れないように注意してください。

`Android keystore file` セクションにキーストアファイルをアップロードし、入力フィールドをすべて埋めると、Bitriseは次の環境変数を自動的に作成しします。

* `BITRISEIO_ANDROID_KEYSTORE_ALIAS`
* `BITRISEIO_ANDROID_KEYSTORE_PASSWORD`
* `BITRISEIO_ANDROID_KEYSTORE_PRIVATE_KEY_PASSWORD`
* `BITRISEIO_ANDROID_KEYSTORE_URL`

"%}
