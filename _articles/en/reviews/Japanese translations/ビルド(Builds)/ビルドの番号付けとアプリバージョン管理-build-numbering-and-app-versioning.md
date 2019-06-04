---
title: ビルドの番号付けとアプリバージョン管理 (Build numbering and app versioning)
redirect_from: []
date: 2019-04-02 14:40:06 +0000
published: false

---
全てのBitriseビルドにはビルド番号が存在します。あなたのアプリの最初のビルドの場合、デフォルトで１番となっており、ビルドが行われるにつれ番号も増えていきます。ウェブサイト上でBitriseビルド番号の取得ができ、 `$BITRISE_BUILD_NUMBER` の環境変数からでも取得が可能です。この変数はBitriseビルド番号が必要になるステップやスクリプトで使用されます。

アプリのバージョン管理を自動的に行うこともBitriseでは可能です。２つのステップがあるので、[ここ](builds/build-numbering-and-app-versioning#Set-up-app-versioning-automatically-on-Bitrise)をお読みください！

## ビルド番号の変更

ウェブサイトで手動によるビルド番号の設定を行ってください。アプリが他サービス上ですでにビルドが複数回行なわれていた場合、Bitriseへ移動させる際に役立ちます。この方法により１からスタートする必要はありません！

アプリを開いて`Settings`タブへ進みます。

![build numbering](/img/builds/build-numbering.png)

`YOUR NEXT BUILD NUMBER WILL BE`の下に、次に行われるビルド番号が表示されます。この番号は新しいビルドが行われるごとに自動的に増えていきますが、手動で変更することができます。

ビルド番号は０もしくは正の整数でなくてはなりません。負の数は受け付けられないのでご注意ください。すでに使用した番号をもう一度使用することは可能です。

## Bitrise上でアプリバージョン管理のセットアップ

アプリに関する重要な情報が含まれるファイルの修正をすることでgitレポジトリ内のアプリバージョンを追跡することができます。（例：iOS アプリの場合の`Info.plist`ファイル、Androidアプリの場合の`AndroidManifest.xml`ファイル）

Bitriseにはそれを遂行する２種類のステップがあり、Bitriseビルド番号や他の特定の番号をそれぞれのファイルへ挿入することができます。

* `Set Android Manifest Version Code and Name` （Androidアプリの場合）
* `Set Xcode Project Build Number` （iOSアプリの場合）

ステップの両方において、番号（整数もしくは数字列）もしくは環境変数の使用が可能です。デフォルトでは、`$BITRISE_BUILD_NUMBER` 環境変数をビルド番号のデフォルト値として使用しています。

### Androidアプリの`versionCode`と`versionName`の設定

Androidアプリでは、内部のバージョン番号として`versionName`設定が使用されており、アプリのビルドが他のビルドよりも新しいかどうかを確かめるのに用いられます。`versionName`設定はユーザーへ表示されるバージョン番号として使用される列のことです。

Androidバージョン管理についての詳しい情報は、[こちら](https://developer.android.com/studio/publish/versioning)をご覧ください。

1. ワークフローに `Set Android Manifest Version Code and Name` ステップを追加します。
2. `AndroidManifest.xml file path` の入力欄の `AndroidManifest.xml` ファイルへファイルパスをセットします。
3. `Version Code`欄に数値を入力します。この設定は`android:versionCode` が`AndroidManifest.xml`ファイル中の明示された値へ帰属することを意味します。このデフォルト値は`$BITRISE_BUILD_NUMBER` 環境値となっております。
4. `Version Name`欄へ値を入力します。これは`android:versionName` が`AndroidManifest.xml`ファイル中の明記された値へ帰属することを意味します。

![Set android version](/img/builds/set-android-version.png)

### `CFBundleVersion`設定とiOSアプリの`CFBundleShortVersionString`

iOSアプリでは、`CFBundleVersion`キーの値（Xcodeの"_Bundle version_"）はアプリの**ビルド番号**になっており、また、`CFBundleShortVersionString`キーの値（Xcodeの"_Bundle versions string_, short"はアプリの**バージョン番号**となっております。

iOSバージョニングについての詳しい情報（`CFBundleVersion`の機能、`CFBundleShortVersionString`キーなど）は、[Apple Technical note](https://developer.apple.com/library/archive/technotes/tn2420/_index.html)や[重要キーのまとめ](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html)を参照してください。

1. ワークフローに`Set Xcode Project Build Number`ステップを追加します。
2. `Info.plist file path`中の`Info.plist`ファイルへファイルパスを設定します。
3. `Build Number`欄に値を追加します。これは`Info.plist`ファイル中の明記された値へ`CFBundleVersion`キーの設定を意味します。デフォルト値は`$BITRISE_BUILD_NUMBER`環境値となります。
4. オプションで、`Version Number`欄に値を追加できます。これは`Info.plist`ファイル中の明記された値へ`CFBundleShortVersionString`キーの設定を意味します。この入力は必須ではありません。

![Set iOS version](/img/builds/set-ios-version.png)

### ビルドバージョンのオフセット法

同一アプリで以前に異なった方法でバージョントラッキングを行っていた場合、そのアプリのビルドバージョン番号をオフセットすることができます。ビルド番号へ追加される値の設定を行ってください。この値は”固定された”整数値もしくは環境変数のどちらかになります。

ビルドがトリガーされる度にBitriseビルド番号でバージョン番号をオフセットする場合、`$BITRISE_BUILD_NUMBER` 環境変数を使用してください。

* Androidアプリの場合、`Set Android Manifest Version Code and Name`ステップの`Version Code Offset`を探してその値として`$BITRISE_BUILD_NUMBER` を設定してください。この変数の値は`Version Code`入力欄中のvalue specifiedへ追加されます。
* iOSアプリの場合、`Set Xcode Project Build Number`ステップの`Build Number Offset`入力欄を探してその値として `$BITRISE_BUILD_NUMBER` を設定してください。この変数の値は`Build Number`入力欄中のvalue specifiedへ追加されます。

#### Androidの例

アプリをお持ちで、Bitrise上で５回目のビルドをこれから行うと仮定します。Bitriseを使用する以前にそのアプリが６回ビルドが行われたので、ビルド番号を６へオフセットすると考えると、以下のような構成が使用できます：

    - Version Code: $BITRISE_BUILD_NUMBER
    - Version Code Offset: 6
    - Version Name: 1.0.5

`$BITRISE_BUILD_NUMBER`の値（例では５）が`Version Code Offset`値へ追加されます。`android:versionName`値は1.0.5 (11)とセットされ、これは1.0.5バージョンのアプリの１１回目のビルドであるという意味をなします。

#### iOSの例

アプリをお持ちで、Bitrise上で５回目のビルドをこれから行うと仮定します。Bitriseを使用する以前にそのアプリが６回ビルドが行われたので、ビルド番号を６へオフセットすると考えると、以下のような構成が使用できます：

    - Build Number: $BITRISE_BUILD_NUMBER
    - Build Number Offset: 6
    - Version Number: 1.1

`$BITRISE_BUILD_NUMBER`の値（例では５）が`Build Number Offset`値へ追加されます。`CFBundleShortVersionString`は1.1 (11)とセットされ、これは1.1バージョンのアプリの１１回目のビルドであるという意味をなします。