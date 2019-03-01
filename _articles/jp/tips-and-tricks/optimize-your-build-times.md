---
# jp title missing
title: Optimize your build times
menu:
  tips-and-tricks:
    weight: 10
---
ビルド時間の改善には、以下のような方法が有効です。

__これ以外の改善方法のご提案をお待ちしています！__

## 依存関係をリポジトリ内に含めておく

あらかじめ、リポジトリ内に依存関係（CocoaPodsなど）を含めておくことで、ビルド時間を短縮できます。
リポジトリから`git clone`が完了した時点で必要なものがすべて揃うため、すぐにビルドが実行できるようになります。

例えばCocoaPodsを利用している場合、 `Pods`ディレクトリ**および**CocoaPodsが生成した `.xcworkspace`ファイルをリポジトリ内に含めておくことで、`Cocoapods Install`のステップは不要になります。

依存関係をリポジトリ内に含めることについてのメリットとデメリットについて詳しくは[Should I commit my dependencies into my repository?](/faq/should-i-commit-my-dependencies-into-my-repository/)をご覧ください。


## ビルドのキャッシュを利用する

[ビルドのキャッシュ](/caching/about-caching/)を利用することで、ビルドを高速化できる場合があります。
注意：ビルドのキャッシュを利用する効果は、キャッシュするファイルのサイズや数に依存します。
より詳しい情報は[Build Cache documentation](/caching/about-caching/)をご覧ください。


## Xcodeステップの"Clean build"オプションを無効にする

すべてのXcodeステップ（Xcode Test、Xcode Archive および Xcode Analyze） には "Do a clean Xcode build ...?" オプションがあります。
特に問題がない場合は、このオプションは無効にすることができます。

"clean build" オプションを無効にすることで、それ以降のXcodeステップを高速化できます。
ワークフロー内で最初のXcodeステップを実行する際には、ビルドのキャッシュがないためフルビルドが実行されますが、それ以降のXcodeステップではキャッシュが利用できるため、コンパイル時間を短縮できます。（すべてのビルドは独自のクリーンな仮想マシン上で実行されます。詳しくは [Code Security](/getting-started/code-security/)をご覧ください。）

## その他

__これ以外の改善方法のご提案をお待ちしています！__

- [Guarding Against Long Compiles](http://khanlou.com/2016/12/guarding-against-long-compiles/)
- [Stay updated with Swift compiling tips](https://github.com/fastred/Optimizing-Swift-Build-Times)
