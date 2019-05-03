---
title: シミュレータ用iOSアプリのデプロイ (Deploying an iOS app for simulators)
redirect_from: []
published: false

---
iOSアプリケーションをブラウザで表示するなど、あなたのiOSアプリをシミュレータへビルドやデプロイを行えます。Bitriseでは、シミュレータ用ビルドを行う[専用ステップ](https://www.bitrise.io/integrations/steps/xcode-build-for-simulator)があります：`Xcode build for simulator`ステップは、iOS simulator destinationを使って`xcodebuild`コマンドを実行したり、.appファイルの生成を行います。

.appファイルはどんなシミュレータにおいても作動します。Bitriseには、Appetize.ioにアプリをアップロードするステップ (`Appetize.io deploy`) があります。このステップを使えば、アプリのデプロイを行えることができ、ブラウザ上で走らせることが可能です。

シミュレータ用アプリのビルドは、コード署名ファイルは必要ありません！

### シミュレータ用アプリのビルド

1. アプリのWorkflow Editorにログインして開きます。
2. ワークフローに`Xcode build for simulator`を追加します。

   このステップは依存関係のインストールを行うステップ（例：`Run Cocoapods install`）の後に配置してください。
3. ステップに必要なインプットを記入します。

   ![](/img/build-for-simulator.png)
   * **Project (or Workspace) path**: プロジェクトの`.xcodeproj`や`.xworkspace` ファイルへのパスを表します。デフォルトでは、Bitriseにアプリを追加する際、環境変数に保存されます。
   * **Scheme name**: プロジェクトのXcodeスキームを表します。デフォルトでは、Bitriseにアプリを追加する際、環境変数に保存されます。
   * **Simulator**: アプリを実行したいデバイスの種類を表します。Xcode内のdevice selection menuに表示されるので、それを正確に設定してください。
   * **OS version**: アプリを実行したいデバイスのオペレーティング・システムのバージョンを表します。デフォルト値は`latest`になっています。
   * **Platform**: アプリを実行したいプラットフォームを表します。デフォルト値は`iOS`となっています。シミュレータインプットとプラットフォームインプットの値が互換していることを確認してください：例えば、シミュレータを`Apple TV 1080p`とセットするなら、プラットフォームを`tvOS`と設定してください。

このステップは以下のアウトプットを生み出します：

* `BITRISE_APP_DIR_PATH`: 生成済みの.appファイルへのパスを表します。
* `BITRISE_APP_DIR_PATH_LIST`: 生成済みの.appファイルへのパスと全ての依存ターゲットアプリへのパスを表します。パスは`|`の記号で分けられています。
* `BITRISE_XCODE_BUILD_RAW_RESULT_TEXT_PATH`: ロービルド (Raw build) 結果のログファイルへのパスを表します。

### Appetize.ioへのアプリのデプロイ

Bitriseの`Xcode build for simulator`ステップを使ってビルドされた.appファイルはどんなシミュレータにおいても動作します。けれども、ブラウザでアプリを実行できるシミュレータへ簡単に・素早く統合させたい場合、`Appetize.io deploy`ステップを使用することをおすすめします。このステップはアプリをAppetize.ioにアップロードし、ブラウザでそのアプリを使うことができる公開URLを提供します。

1. Appetize.ioのAPIトークンをリクエストします。
2. アプリのWorkflow Editorにログインして開きます。
3. ワークフローに`Xcode build for simulator`ステップの追加・構成を行います。
4. ワークフローに`Appetize.io deploy`ステップを追加します。

   ![](/img/appetize-deploy.png)
5. `Appetize.io token`インプットにAppetize.io APIトークンを追加します。
6. `Application path`インプットに.appファイルへのパスを入力します。最も簡単な方法として `BITRISE_APP_DIR_PATH_LIST` 環境変数を使用すれば、それが`Xcode build for simulator`ステップのアウトプットになります。任意ですが、より効率的なデバッグとしてverbose loggingを有効にすることもできます。

`Appetize.io deploy`ステップは一つのアウトプットを生み出します：`APPETIZE_APP_URL` 環境変数です。これは公開URLであり、そこからアプリへアクセスすることができます。