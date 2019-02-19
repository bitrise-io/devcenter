---
title: iOSアプリの開始
menu:
  getting-started:
    weight: 10
---
iOS の開発は時に複雑です。我々の目的は開発する上での負担をできる限り削減することです！ このガイドでは以下の説明を行います。

- Bitrise に iOS アプリを追加する
- XCode テストの実行
- アプリの署名、及び .ipa ファイルのエクスポート
- TestFlight 及び App Store へのデプロイ

## Bitrise に iOS アプリを追加する

1. [bitrise.io](https://www.bitrise.io/)にログインします。

2. ダッシュボードで`+ Add new app`をクリックします。

3. `Create new App`ページの`Choose Account`で、アプリを追加するアカウントを選択します。
4. アプリの公開設定を Private または[Public](/getting-started/adding-a-new-app/public-apps)に設定し、`Next`をクリックします。

5. リポジトリを持つ Git ホスティングサービスを選択し、リポジトリを選択します。詳細は[connecting your repository](/getting-started/adding-a-new-app/connecting-a-repository/)を参照してください。

6. リポジトリのアクセスを求めるプロンプトが表示されたら、`No, auto-add SSH key`を選択します。詳細は[SSH keys](/getting-started/adding-a-new-app/setting-up-ssh-keys/)を参照してください。

7. プロジェクトで設定したブランチ名(例えば master など)を入力し、`Next`をクリックします。

8. Bitrise がプロジェクトを検証するのでしばらくお待ちください。設定ファイルに基づいてアプリのセットアップを行います。iOS アプリの場合は XCode Project ファイル (`.xcodeproj`)、または XCode Workspace ファイル (`.xcworkspace`)を参照します。

   **重要**: プロジェクトのビルド Scheme が共有されていない場合、検証に失敗します。 あなたの XCode Scheme に手動で Bitrise を繋げることはできますが、Scheme が共有されている場合、Bitrise が自動的に検出します。詳しくは[こちらの FAQ](/troubleshooting/frequent-ios-issues/#xcode-scheme-not-found)より。

9. .ipa エキスポートのメソッドを選択。まずは `development` を選択してください（後で変更可能）。

   ![iOS project scanned](/img/ios-project-scanned.png)

   選択すれば下記情報が表示されます:

   - プロジェクト、またはワークスペースへの Path
   - Scheme 名
   - ipa エキスポートのメソッド
   - iOS stack

10. Webhook を設定することでコードがリポジトリに Push される度、または Pull Request が作成された際に Bitrise が起動されます。これは最初のビルドでも発生します。表示されるメッセージをクリックすることでビルドページに飛ばされます。

## XCode テストの実行

アプリの作成が完了したら、初回のビルドが開始されます。
初回のビルドは自動的に生成された **primary** ワークフローに沿って行われます。
ワークフローの内容は[Workflow Editor](/getting-started/getting-started-workflows)で確認できます。
ダッシュボード上にあるアプリ名をクリックして、`Workflow`タブを選択してください。

{% include message_box.html type="important" title="Test targets" content="If your app does not have test targets defined, the primary workflow will be the only automatically created workflow and it will NOT include the `Xcode Test for iOS` Step. "%}

もし、Xcode のテストターゲットが定義されていたら、そのテストを実行、および結果を出力するための下記[ステップ](/getting-started/getting-started-steps) が`primary`ワークフローに追加されます。

- `Xcode Test for iOS`
- `Deploy to Bitrise.io`

{% include message_box.html type="note" title="Code signing files" content="Running Xcode tests and deploying their results to Bitrise do not require any code signing files. So don't worry about them just yet!"%}

`Xcode Test for iOS`ステップでは、予め定義された Xcode のテストが走ります。この設定は変更する必要はありません。もしテストが正しく書かれていたら、正常に起動します。Xcode 上でも同じ設定を確認できます。

`Deploy to Bitrise.io`ステップでは下記情報を`Logs`、ビルド上にある[Apps & Artifacts](/builds/build-artifacts-online/) タブに表示します。

- あなたの Xcode テストの結果
- `xcodebuildoutput`のログ

## アプリの署名、及び .ipa ファイルのエクスポート

To install and test the app on other physical devices, you will need to create and export an .ipa file. This requires setting up code signing. In the example, we'll be exporting an .ipa with the `development` export method: you cannot upload such an app to Testflight but you can test it, for example, on the devices of your internal testers.

{% include message_box.html type="note" title="Automatic provisioning" content=" The example procedure described here uses manual provisioning, with the `Certificate and profile installer` Step. However, Bitrise also supports [automatic provisioning](/code-signing/ios-code-signing/ios-auto-provisioning/) but it is not in the scope of this guide.
"%}

You will need:

- the automatically created `deploy` workflow
- an iOS **Development** certificate (a .p12 certificate file)
- a **Development** type Provisioning Profile

1. Set the code signing type of your project in Xcode to either manual or automatic (Xcode managed), and generate an .ipa locally.

2. Collect and upload the code signing files with [the codesigndoc tool](/code-signing/ios-code-signing/collecting-files-with-codesigndoc/).

   The tool can also upload your code signing files to Bitrise - we recommend doing so! Otherwise, upload them manually: enter the Workflow Editor and select the `Code signing` tab, then upload the files in their respective fields.

3. Go to your app's Workflow Editor, and select the `deploy` workflow in the `WORKFLOW` dropdown menu in the top left corner.

4. Check that you have the `Certificate and profile installer` Step in your workflow. It must be before the `Xcode Archive & Export for iOS` Step (you can have other Steps between the two, like `Xcode Test for iOS`).

5. Check the `Select method for export` input of the `Xcode Archive & Export for iOS` Step. By default, it should be the `$BITRISE_EXPORT_METHOD` environment variable. This variable stores the export method you selected when creating the app. If you selected `development` back then, you don't need to change the input. Otherwise, manually set it to `development`.

   ![Export method env var](/img/export-method-envvar.png)

6. [Start a build](/builds/starting-builds-manually/).

If you uploaded the correct code signing files, the `Certificate and profile installer` Step should install your code signing files and the `Xcode Archive & Export for iOS` Step should export an .ipa with the development export method. If you have the `Deploy to Bitrise.io` Step in your workflow, you can find the .ipa on the `Apps & Artifacts` tab of the build page.

iOS code signing is often not this simple - read more about how [iOS code signing works on Bitrise](/code-signing/ios-code-signing/code-signing)!

## TestFlight 及び App Store へのデプロイ

If you set up your code signing files and created an .ipa for your internal testers, it is time to involve external testers and then to publish your iOS app to the App Store. Let's see how!

To deploy to Testflight and to the App Store, you will need more code signing files:

- an iOS **Distribution** Certificate
- an **App Store** type Provisioning Profile

1. On your local machine, set up App Store code signing for your project in Xcode, and export an App Store .ipa. If this fails locally, it will definitely fail on Bitrise, too!

2. Collect and upload the code signing files with [the codesigndoc tool](/code-signing/ios-code-signing/collecting-files-with-codesigndoc/).

3. Go to the app's Workflow Editor and create a [new workflow](/getting-started/getting-started-workflows/): click the `+ Workflow` button, enter the name of your new workflow and in the **BASED ON** dropdown menu, select `deploy`. This way the new workflow will be a copy of the basic `deploy` workflow.

4. Set the `Select method for export` input of the `Xcode Archive & Export for iOS` Step to `app-store`.

   ![App store export](/img/app-store-export.png)

   If you wish to distribute your app to external testers without uploading the app to Testflight, select `ad-hoc`. In that case, skip the next steps in the guide: you only need the `Deploy to Bitrise.io` Step in your workflow.

5. Add the `Deploy to iTunes Connect - Application Loader` Step to your workflow, after the `Xcode Archive & Export for iOS` Step but preferably before the `Deploy to Bitrise.io` Step.
6. Provide your Apple credentials in the `Deploy to iTunes Connect - Application Loader` Step.

   The Step will need your:

   - Apple ID
   - password or, if you use two-factor authentication on iTunes Connect, your application password.

   Don't worry, the password will not be visible in the logs or exposed - [that's why it is marked SENSITIVE](/builds/env-vars-secret-env-vars#about-secrets).

And that's it! Start a build - if everything went well, you should see your app on Testflight. From there, you can distribute it to external testers or release it to the App Store.
