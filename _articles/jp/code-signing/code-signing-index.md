---
changelog: 
last_modified_at: 
tag: []
title: コード署名
redirect_from: []
description: ''
menu:
  main:
    identifier: code-signing-main
    weight: 16

---
コード署名は、アプリへのデジタル署名のプロセスであり、署名を行ってからコードが変更されていないことを保証するものです。コード署名により、デプロイのセキュリティが確保され、また作者を識別することが可能となります。

Google Play や App Store などのオンラインストアへモバイルアプリをデプロイするためには、コード署名が必ず必要となります。Bitrise でのコード署名は、このプロセスを可能な限り簡単で便利にするものです。

## iOS コード署名

ネイティブまたはクロスプラットフォームのすべての iOS アプリにはコード署名が必要です。最低でも、以下の 2 つのファイルが要求されます：

- プロビジョニングプロファイル
- .p12 証明書

Bitrise では、手動でのコード署名だけでなく、Xcode によって管理された署名をサポートしています。さらに Bitrise では、自動プロビジョニング機能も提供しています。自動プロビジョニング機能を用いることで、Apple Developer Portal のアカウントから直接プロビジョニングプロファイルがダウンロードされます。

**詳細:**

- [iOS コード署名](/jp/code-signing/ios-code-signing/index/)

## Android コード署名

Android のコード署名は、Bitrise の専用のステップ、Android Studio、または Gradle の設定で行うことが可能です。

Android アプリに署名するには、Google Play Developer アカウントを要求する keystore ファイル、及び Google Play API へのアクセスが必要です。

**詳細:**

- [Android コード署名](/jp/code-signing/android-code-signing/index/)