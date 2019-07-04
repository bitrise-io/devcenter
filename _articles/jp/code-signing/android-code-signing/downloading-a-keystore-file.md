---
title: keystoreファイルのダウンロード
date: 2018-12-11T10:30:01.000+00:00
redirect_from: []
menu:
  android-code-signing:
    weight: 10

---
`build.gradle`ファイル内にkeystoreファイルのファイルパスが定義されているが、そのkeystoreファイルそのものがパスが指し示す場所にない場合、Bitriseのfile downloadingステップを使うことでBitriseからkeystoreファイルのダウンロード及び定義した場所へ配置することができます。

Bitriseには`Code Signing`タブよりファイルのダウンロードを行えるステップが２つあります。どちらを使うかは`Code Signing`タブ内にアップロードしたkeystoreファイルの場所次第になります。

* `File Downloader`ステップ：keystoreファイルを`ANDROID KEYSTORE FILE`セクション（keystoreファイルの推奨された場所）へアップロードした場合、このステップを使用してください。一旦ファイルがアップロードされると、Bitriseが環境変数（`BITRISEIO_ANDROID_KEYSTORE_URL`）をバリューとしてファイルのダウンロードURL（期限があり、読み取り専用）に割り当てます。

  ![](/img/android-keystore.png)
* `Generic File Storage`ステップ：`Code Signing`タブ上の`GENERIC FILE STORAGE`セクションへkeystoreファイルをアップロードした場合、このステップを使用してください。Bitriseは環境変数（`$GENERIC_FILE_STORAGE`）をバリューとしてファイルのダウンロードURL（期限があり、読み取り専用）に割り当てます。`build.gradle`ファイル内で環境変数を使用する場合、`Script`ステップを使って`$GENERIC_FILE_STORAGE`環境変数で定義されたデスティネーションパス (destination path) を含んだ環境変数のバリューを上書きする事ができます。ここではシンプルエクスポートだけの使用は避け、[envman](/tips-and-tricks/expose-environment-variable/)を使用してください。

  ![](/img/keystore-generic.png)

1. ワークフローへ`File Downloader`もしくは`Generic File Storage`ステップを追加します。このステップは`Gradle Runner`ステップの前にきます。
2. `File Downloader`ステップを使用する場合、以下の２つのインプット欄を埋めてください：
   * `Download source url`：`Code Signing`タブの`ANDROID KEYSTORE FILE`セクションへファイルのアップロードを行うときに、取得した生成されたkeystoreのURLを設定してください。
   * `Download destination path`：関連したパスとしてkeystoreファイルのロケーションを設定してください。このパスは`build.gradle`ファイルにおいて定義済みのkeystoreパスと同じである必要があります。

     (例：`file://$HOME/keystores/project_release.keystore`)
3. ファイルダウンロードステップの直後に`Gradle Runner`ステップを追加します。

`build.gradle`ファイルで明記した同じロケーションへkeystoreファイルのダウンロードを行うステップの追加が成功した場合、ワークフローへ`Android Sign`ステップの追加は必要ないのでご注意ください。Bitriseの`Gradle Runner`ステップがプロジェクトの署名と収集を行います。