---
changelog: 
last_modified_at: 
title: Bitrise上でDetoxテストの実行
date: 2019-03-01T12:50:46.000+00:00
menu:
  testing-main:
    weight: 17

---
Detoxとはモバイルアプリ用グレーボックスのエンドツーエンドテストで、オートメーションライブラリのことです。現在、React Nativeを使用して開発されたiOS, Androidアプリ両方に対応しています。BitriseでReact Nativeアプリをお持ちなら、Detoxテストを実行できます。

構成例を見るには、Bitriseの[サンプルアプリ](https://github.com/bitrise-samples/sample-project-react-native)を参照してください！

Detoxを実行するには：

* macOSを使用するMac（El Capitan 10.11かそれ以上の新しいバージョン）
* Xcode command line toolsを使用するXcode 8.3かそれ以上の新しいバージョン）
* 動作するReact Nativeアプリ

が必要になります。

[プロジェクト用にDetoxをインストールとセットアップを行います](https://github.com/wix/detox/blob/master/docs/Introduction.GettingStarted.md#getting-started)。Homebrew、Node.js、applesimutil、ならびにDetox command line toolsをインストールする必要があります。ご自身のプロジェクトにDetoxを追加してから、ローカルでDetoxテストを作成・実行してください。

完了すれば、Bitrise上でDetox構成のプロジェクトのテストが行えます：

{% include message_box.html type="important" title="Detoxを使ったビデオ録画" content="Detoxを使ったビデオ録画はBitriseでは**対応しておりません**。[Detoxはハードウェアアクセラレーションが必要です](https://github.com/wix/Detox/blob/master/docs/APIRef.Artifacts.md#video-recording-issues-on-ci)が当社の（ビルドのバーチャルマシンが走る）マシンには物理的なGPUがありません。それゆえハードウェアアクセラレーションを作動させることはできません。"%}

1. `detox`セクションの下にある、`package.json`内でrelease device configurationを作成します。

   **例：**

       "detox": {
        "configurations": {
          "ios.sim.debug": {
            "binaryPath": "ios/build/Build/Products/Debug-iphonesimulator/SampleProjectReactNative.app",
            "build": "xcodebuild -project ios/SampleProjectReactNative.xcodeproj -scheme SampleProjectReactNative -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build -UseNewBuildSystem=NO",
            "type": "ios.simulator",
            "name": "iPhone 8"
          },
          "ios.sim.release": {
            "binaryPath": "ios/build/Build/Products/Release-iphonesimulator/SampleProjectReactNative.app",
            "build": "xcodebuild -project ios/SampleProjectReactNative.xcodeproj -scheme SampleProjectReactNative -configuration Release -sdk iphonesimulator -derivedDataPath ios/build -UseNewBuildSystem=NO",
            "type": "ios.simulator",
            "name": "iPhone 8"
          }
        },
2. [bitrise.io](https://app.bitrise.io/)にて、ご自身のプロジェクトに進んでWorkflow Editorを開きます。
3. 使用したいワークフローに切り替えます。
4. ワークフローに`Run npm command`を追加します。
5. `The npm command with arguments to run`インプットにDetox install commandを追加します。

       install -g detox-cli
6. test runnerをインストールします。  
   例えば、[Bitriseのサンプルアプリ](https://github.com/bitrise-samples/sample-project-react-native)では`mocha`を使用しており、`yarn`ステップを使ってインストールされます。yarn 依存性をインストールするには、`The yarn command to run`インプットの値を`install`に設定します。
7. Scriptステップを追加します。必要なutilitiesをインストールしてからDetoxを走らせてください。

       #!/bin/bash
       
       # applesimutils is a collection of utils for Apple simulators
       brew tap wix/brew
       brew install applesimutils
       
       # we are building and testing a release device configuration
       detox build --configuration ios.sim.release
       detox test --configuration ios.sim.release --cleanup

   モジュール性のために別々のScriptステップにそれぞれのコマンドを配置することも可能です。
8. ビルドを開始してください！

**ビルドが失敗する場合、Bitriseの__`**bitrise.yml**`**ファイルの例を確認してください。**

    ---
    workflows:
      primary:
        steps:
        - activate-ssh-key: {}
        - git-clone:
            inputs:
            - clone_depth: ''
            title: Git Clone Repo
        - yarn@0.0.8:
            inputs:
            - command: install
        - npm@1.0.1:
            inputs:
            - command: install -g detox-cli
            title: Install Detox CLI
        - script@1.1.5:
            inputs:
            - content: |-
                #!/bin/bash
                brew tap wix/brew
                brew install applesimutils
                
                detox build --configuration ios.sim.release
                detox test --configuration ios.sim.release --cleanup
            title: Detox - Build and Test Release App
        - deploy-to-bitrise-io@1.3.18: {}
