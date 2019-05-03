---
title: シミュレータ用iOSアプリのデプロイ (Deploying an iOS app for simulators)
redirect_from: []
published: false

---
You can build and deploy your iOS application to a simulator, to show it off in a browser, for example. On Bitrise, we have [a dedicated Step](https://www.bitrise.io/integrations/steps/xcode-build-for-simulator) to build for a simulator: the `Xcode build for simulator` Step runs the `xcodebuild` command with an iOS simulator destination and generates an .app file.

iOSアプリケーションをブラウザで表示するなど、iOSアプリをシミュレータへビルドやデプロイを行えます。Bitriseでは、シミュレータ用ビルドを行う[専用ステップ](https://www.bitrise.io/integrations/steps/xcode-build-for-simulator)があります：`Xcode build for simulator`ステップはiOS simulator destinationを使った`xcodebuild`コマンドを実行したり、.appファイルの生成を行います。

The .app file can be run on any simulator. On Bitrise, we have a Step to upload your app to Appetize.io: the `Appetize.io deploy` Step. With this Step, you can deploy your app so you can run it in a browser.

To build the app for a simulator, you do not need code signing files!

.appファイルはどんなシミュレータにおいても作動します。Bitriseでは、Appetize.ioにアプリをアップロードするステップ（`Appetize.io deploy`ステップ）があります。このステップを使えば、アプリのデプロイを行えることができ、ブラウザ上で走らせることが可能です。

シミュレータ用のアプリのビルドは、コード署名ファイルは必要ありません！

### Building an app for a simulator  
シミュレータ用のアプリのビルド

1. Log in and open the app's Workflow Editor.　  
   アプリのWorkflow Editorをログインして開きます。
2. Add the `Xcode build for simulator` Step to your workflow.

   The Step should be after the Steps that install dependencies, such as `Run Cocoapods install`.  
   ワークフローに`Xcode build for simulator`を追加します。

   このステップは依存関係のインストールを行うステップ（例：`Run Cocoapods install`）の後に配置してください。
3. Fill in the required inputs for the Step.  
   ステップの必要なインプットを記入します。

   ![](/img/build-for-simulator.png)
   * **Project (or Workspace) path**: the path to your project's `.xcodeproj` or `.xworkspace` file. By default, this is stored in an Environment Variable when you add your app to Bitrise.  
     プロジェクトの`.xcodeproj`や`.xworkspace` ファイルのパスを表します。デフォルトでは、Bitriseにアプリを追加するときに、環境変数に保存されます。
   * **Scheme name**: the Xcode scheme of your project. By default, this is stored in an Environment Variable when you add your app to Bitrise.  
     プロジェクトのXcodeスキームを表します。デフォルトでは、Bitriseにアプリを追加するときに、環境変数に保存されます。
   * **Simulator**: the type of device you want to run the app on. Set it exactly as it appears in the device selection menu in Xcode.  
     アプリを実行したいデバイスの種類を表します。Xcodeのdevice selection menuで表示されるので、それを正確に設定してください。
   * **OS version**: the version of device operating system you want to run the app on. The default value is `latest`.  
     アプリを実行したいデバイスのオペレーティング・システムのバージョンを表します。
   * **Platform**: the platform you want to run the app on. The default value is `iOS`. Make sure that the values of the Simulator input and the Platform input are compatible: for example, if you set Simulator to `Apple TV 1080p`, set Platform to `tvOS`.  
     アプリを実行したいプラットフォームを表します。デフォルト値は`iOS`となっています。シミュレータインプットとプラットフォームインプットの値が互換していることを確認してください：例えば、シミュレータを`Apple TV 1080p`とセットするなら、プラットフォームを`tvOS`と設定してください。

The Step will produce the following outputs:  
このステップは以下のアウトプットを生み出します：

* `BITRISE_APP_DIR_PATH`: the path to the generated .app file.　
* `BITRISE_APP_DIR_PATH_LIST`: the path to the generated .app file and the paths to every dependent target app. The paths are separated with the `|` character.
* `BITRISE_XCODE_BUILD_RAW_RESULT_TEXT_PATH`: the path to the log file of the raw build results.

### Deploying the app to Appetize.io  
Appetize.ioへアプリのデプロイ

An .app file built with our `Xcode build for simulator` Step works with just about any simulator. But if you want to easily and quickly integrate it to a simulator that allows you to run your app in a browser, we recommend using the `Appetize.io deploy` Step. It uploads your app to Appetize.io and provides a public URL to use the app in a browser.

Bitriseの`Xcode build for simulator`ステップを使ってビルドされた.appファイルはどんなシミュレータでも動作します。けれども、ブラウザでアプリを実行できるシミュレータへ簡単に・素早く統合させたい場合、`Appetize.io deploy`ステップを使用することをおすすめします。このステップはアプリをAppetize.ioにアップロードし、ブラウザでそのアプリを使うことができる公開URLを提供します。

1. Request an Appetize.io API token.　Appetize.ioのAPIトークンをリクエストします。
2. Log in and open the app's Workflow Editor.　アプリのWorkflow Editorにログインして開きます。
3. Add and configure the `Xcode build for simulator` Step to your workflow.　ワークフローに`Xcode build for simulator`ステップの追加・構成を行います。
4. Add the `Appetize.io deploy` Step to your workflow.　ワークフローに`Appetize.io deploy`ステップを追加します。

   ![](/img/appetize-deploy.png)
5. Add the Appetize.io API token to the `Appetize.io token` input.　`Appetize.io token`インプットにAppetize.io APIトークンを追加します。
6. Enter the path to the .app file to the `Application path` input. The easiest solution is to use the `BITRISE_APP_DIR_PATH_LIST` Environment Variable that is an output of the `Xcode build for simulator` Step. Optionally, you can also enable verbose logging for more efficient debugging.　

The `Appetize.io deploy` Step will produce one output: the `APPETIZE_APP_URL` Environment Variable. it is a public URL where you can access your app. Enjoy showing it off!

`Application path`インプットに.appファイルへのパスを入力します。最も簡単な方法として `BITRISE_APP_DIR_PATH_LIST` 環境変数を使用すれば、それが`Xcode build for simulator`ステップのアウトプットになります。任意ですが、より効率的なデバッグとしてverbose loggingを有効にすることもできます。

`Appetize.io deploy`ステップは一つのアウトプットを生み出します：`APPETIZE_APP_URL` 環境変数です。これは公開URLであり、そこからアプリへアクセスすることができます。