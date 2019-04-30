---
title: 単一ワークフローでの複数のフレーバーAPKの生成とデプロイ (Generate and deploy multiple flavor APKs in
  a single workflow)
redirect_from: []
published: false

---
You can generate, code sign and deploy multiple flavor (multi-flavor) APKs in one workflow using our `Gradle Runner` Step. Flavor means enhancing an app's core code with features resulting in different versions of the same app (just to mention the most common examples: free/paid, demo/full). Check out the official Android Studio guide on [build types, flavors and build variants](https://developer.android.com/studio/build/build-variants) for more info! In this tutorial, you will need to do some settings to `Sign APK` and `Google Play Deploy` Steps - so keep your eyes peeled!

Bitriseの`Gradle Runner`ステップを使って単一ワークフローで複数のフレーバーAPKの生成、コード署名、ならびにデプロイを行うことができます。フレーバーとは同じアプリで異なるバージョンにする機能を持ったアプリのコアコードを強化します（標準的な例：free/paid、demo/full）。詳しい情報は公式Android Studioガイドにある[build types, flavors and build variants](https://developer.android.com/studio/build/build-variants)を参照してください。このチュートリアルでは、`Sign APK`や`Google Play Deploy`ステップでの設定方法を紹介します。

## Generating multi-flavor APKs  
複数フレーバーAPKの生成

If you have an Android deploy workflow at hand, do the following:

Androidデプロイワークフローをお持ちであれば、以下のことをしてください：

1. Insert `Gradle Runner` Step after the Android testing steps. `Android Build` step can only build one variant so if this Step is part of your workflow, then we advise you to replace it with our `Gradle Runner` Step.  
   Androidテストステップの後に`Gradle Runner`ステップを挿入します。`Android Build`ステップはバリアント一つのみのビルドを行うので、このステップがあなたのワークフローの一部である場合、Bitriseの`Gradle Runner`ステップに変更することをおすすめします。
2. Click the `Config` section of the Step.  
   ステップの`Config`セクションをクリックします。
3. Specify the `assemble` [Gradle tasks](/tips-and-tricks/android-tips-and-tricks/#what-are-gradle-tasks-and-how-can-i-get-the-list-of-available-tasks-in-my-project/) by adding your build variants' task names in the `Gradle task to run` Step input field - as many task names as many build variants you want to build in one workflow. Each task name must be **exactly the same build variant name** what you have listed in the `Build Variant` window of Android Studio! Make sure you separate them only with a space, no need for `,`! In the below image, you can see the order of the Steps for the deploy workflow and the `Gradle Task to run` Step input with two build variants:  
   ビルドバリアントのタスク名を`Gradle task to run`ステップのインプット欄に追加して`assemble`[Gradleタスク](/tips-and-tricks/android-tips-and-tricks/#what-are-gradle-tasks-and-how-can-i-get-the-list-of-available-tasks-in-my-project/)を明記します（単一ワークフローでビルドを行いたいビルドバリアントの数と同様の数のタスク名）。タスク名それぞれの

   `assembleDemo` and `assembleFull`

   ![](/img/multiflavor-1.jpg)
4. `Gradle Runner` generates a `$BITRISE_APK_PATH_LIST` env var output that contains ALL the build variants you have set in `Gradle task to run` Step above. We will need this output env var later!

## Signing and deploying multi-flavor APKs

1. Add one `Sign APK` Step AFTER `Gradle Runner` Step if it's missing from your workflow.
2. Set the `$BITRISE_APK_PATH_LIST` in the `apk path` input field which will make sure all the required APKs will get code signed with the keystore file you uploaded to the `Code Signing` tab. Check out [how you can upload your keystore file to bitrise.io](/code-signing/android-code-signing/android-code-signing-using-bitrise-sign-apk-step/#create-a-signed-apk-with-the-sign-apk-step/). The Step will export a `$BITRISE_SIGNED_APK_PATH` env var output which lists all your signed build variants.
3. Make sure you set the following input fields in the `Sign APK` Step:

* `Keystore url`
* `Keystore password`
* `Keystore alias`

1. Add the `Google Play Deploy` Step AFTER the `Sign APK` step.
2. Set the `$BITRISE_SIGNED_APK_PATH` env var in the `APK or App Bundle file path` Step input field so that `Google Play Deploy` can release all your build variants to the app store.