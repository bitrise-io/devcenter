---
title: 単一ワークフローでの複数のフレーバーAPKの生成とデプロイ
date: 2018-10-26T12:56:08.000+00:00
redirect_from: []
menu:
  android-deploy:
    weight: 4

---
Bitriseの`Gradle Runner`ステップを使って、単一ワークフロー内で複数のフレーバー（マルチフレーバー）APKの生成、コード署名、ならびにデプロイを行うことができます。フレーバーとは、アプリのコアコードを機能拡張して同じアプリを異なるバージョンにすることを意味します（標準的な例：free/paid、demo/full）。詳しい情報は公式Android Studioガイドにある[build types, flavors and build variants](https://developer.android.com/studio/build/build-variants)を参照してください。このチュートリアルでは、`Sign APK`や`Google Play Deploy`ステップでの設定方法を紹介します。

## マルチフレーバーAPKの生成

Androidデプロイワークフローをお持ちであれば、次のことを行ってください：

1. Androidテストステップの後に`Gradle Runner`ステップを挿入します。`Android Build`ステップは一つのバリアントのみのビルドを行うので、このステップがあなたのワークフローの一部である場合、Bitriseの`Gradle Runner`ステップに変更することをおすすめします。
2. ステップの`Config`セクションをクリックします。
3. `assemble`[Gradleタスク](/tips-and-tricks/android-tips-and-tricks/#what-are-gradle-tasks-and-how-can-i-get-the-list-of-available-tasks-in-my-project/)を明記します。ビルドバリアントのタスク名を`Gradle task to run`ステップの入力欄に追加してください（単一ワークフローでビルドを行いたいビルドバリアントの数と同様の数のタスク名である必要があります）。タスク名それぞれがAndroid Studioの`Build Variant`ウィンドウでリストアップした**全く同じビルドバリアント名**であることを確認してください。スペースを使ってそれらを分けることができます（`,`は要りません）！下のイメージではデプロイワークフローのステップの順番、ならびに、２つのビルドバリアントを使った`Gradle Task to run`ステップインプットを確認できます。

   `assembleDemo` ＆ `assembleFull`

   ![](/img/multiflavor-1.jpg)
4. `Gradle Runner`は、上の`Gradle task to run`ステップで設定した**全ての**ビルドバリアントを含んだ `$BITRISE_APK_PATH_LIST`環境変数出力を生成します。この環境変数出力は後ほど必要になります！

## マルチフレーバーAPKの署名とデプロイ

1. `Gradle Runner`ステップの後に`Sign APK`ステップを追加します（ワークフローにない場合）
2. `apk path` 入力欄に`$BITRISE_APK_PATH_LIST`をセットします。これは全ての必要なAPKが、`Code Signing`タブへアップロード済みのkeystoreファイルを伴ったコードの署名を行うことを確実にします。[keystoreファイルをbitrise.ioへのアップロード方法](/jp/code-signing/android-code-signing/android-code-signing-using-bitrise-sign-apk-step/#create-a-signed-apk-with-the-sign-apk-step/)をご覧ください。このステップは全ての署名済みビルドバリアントをリストアップした`$BITRISE_SIGNED_APK_PATH` 環境変数出力をエクスポートします。
3. `Sign APK`ステップで以下の入力欄に記入してください：
   * `Keystore url`
   * `Keystore password`
   * `Keystore alias`
4. `Sign APK`ステップの後に`Google Play Deploy`ステップを追加します。
5. `APK or APP Bundle file path`ステップの入力欄に`$BITRISE_SIGNED_APK_PATH` 環境変数を設定します。そうすることにより、`Google Play Deploy` が全てのビルドバリアントをアプリストアへリリースすることができます。