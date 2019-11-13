---
title: iOSアプリのデプロイについて
date: 2018-10-26T12:49:32.000+00:00
redirect_from: "/jp/ios-deploy/introduction-to-deploying-ios-apps/"
menu:
  deploy-main:
    identifier: ios-deploy
    weight: 3

---
アプリのビルドを開始し、ユニットテストとUIテストをビルド上で実行できたら、次はデプロイ作業に移ります。

いかなるプラットフォームへiOSアプリをデプロイするには、

* [コード署名ファイル](/jp/code-signing/ios-code-signing/code-signing/)
* [Xcodeプロジェクトのアーカイブと署名済み.ipaファイルのエクスポート](/jp/code-signing/ios-code-signing/create-signed-ipa-for-xcode/)

  が必要になります。

Bitriseのガイドでは２つの基本的な必要条件を掘り下げ、アプリのデプロイを正確な方法で行うことができるステップの使い方を紹介しています！

* [Bitrise.ioへiOSアプリのデプロイ（内部テスター用）](/jp/deploy/ios-deploy/deploying-an-ios-app-to-bitrise-io/)
* [外部テスト用のiOSアプリのデプロイ](/jp/deploy/ios-deploy/deploying-an-ios-app-for-external-testing/)
* [iTunes ConnectへiOSアプリのデプロイ](/jp/deploy/ios-deploy/deploying-an-ios-app-to-itunes-connect/)