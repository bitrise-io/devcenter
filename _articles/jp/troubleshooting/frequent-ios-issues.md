---
title: よくあるiOS上の問題
redirect_from:
- "/ios/frequent-ios-issues/"
- "/ios/frequent-ios-issues/#works-in-local-but-not-on-bitriseio"
- "#works-in-local-but-not-on-bitriseio"
menu:
  troubleshooting:
    weight: 5
---
## Xcode の出力からエラーと問題を見つける
_この方法は Xcode の出力をフィルターしないログのみに対応しています。
ログにエラーの理由が表示されていない場合、Xcode の`Output Tool`オプションを適切に指定しているかを確認してください。
`xcodebuild`（Xcodeのコマンドラインツール）は、非常に verbose なアウトプットをしますが、Xcode のコマンドラインツール（`xcodebuild`）によって提示される解決方法が含まれます。Bitrise 公式のすべてのステップには、`xcodebuild`のオプションとして`Output Tool`の入力を受け付けます。_

`error:`という文字列を Xcode のログから検索しましょう。その内容が99%のケースでその問題を起こしている原因です。

もしうまく見つからない場合は、`warning:`という文字列でも検索してみましょう。Xcodeは失敗しているにも関わらず、`error:`を出力しないケースがたまにあります。

自分のローカル環境でもそのログがある場合、以下のようなコマンドを使って検索できます。

```
grep --color 'error:' my.log
grep --color 'warning:' my.log
```


## Xcode Scheme が見つからない問題

ステップの途中で Xcode プロジェクトが見つからない場合やビルド中に`The project named "Foo" does not contain a scheme named "Bar"`というエラーが発生している場合、まずはじめにXcodeプロジェクトの設定を確認しましょう。

* 必要なスキームが共有されているかを確認しましょう
* スキームを共有するとき、Xcode プロジェクトは変更されます。忘れず変更を**コミット**し、**プッシュ**しましょう！
* 関連するバリデーションがBitrise上で走っている場合はAbortして再実行してください

![Xcode shared scheme](/img/ios/xcode-shared-scheme.png)

共有オプションを有効にした時は、**変更をコミット・プッシュすることを忘れないようにしましょう！**`git`リポジトリにはプロジェクトやワークスペース、具体的には `*.xcodeproj`または`*.xcworkspace/xcshareddata/xcschemes/SchemeName.xcscheme`(これはFinderではファイルのように見えますが、実際はディレクトリです)が含まれており、共有オプションの変更を反映する必要があります。

必要なスキームがまだ見つからない場合、`.gitignore`で Xcode プロジェクトの設定ファイルが無視されていないかを確認してください。


## CocoaPods の依存解決問題

### エラー

```
ld: library not found for -lPods-...
clang: error: linker command failed with exit code 1 (use -v to see invocation)
```

または

```
no such module '...'
```

### 解決方法

多くの場合は、Cocoapods を使っていてワークスペース（`.xcodeproj`）の代わりに Xcode プロジェクトを指定してしまっています。Bitrise上の App の**Workflow タブ**へ行き、**Manage Workflows**、**App Environments**の順にクリックして`BITRISE_PROJECT_PATH`の項目を変更します。これによりすべてのワークフローにおけるデフォルトのプロジェクトパスの設定を変更できます。

**以前動いていた場合**や`BITRISE_PROJECT_PATH`の修正で解決しなかった場合、Appの他の環境設定を確認しましょう。プロジェクトのファイルパスはワークフローの環境変数によって上書きされることがあります。もしくは、関連するXcodeのステップで直接プロジェクトのパスを指定してしまっている可能性もあります。


## Fastlane での出力エラー
_このセクションは[@kwoylie](https://github.com/kwoylie)からの提供で、`Gemfile`がリポジトリにあり、`fastlane`ステップを使っていて`Gemfile`を自動的に利用する場合に当てはまります。_


`Gemfile` が以下の内容のとき

```
gem "fastlane", "1.104.0"
gem "gym", "1.10.0"
gem "badge", "0.5.0"
gem "CFPropertyList","2.3.3"
gem "sqlite3", "1.3.11"
```

私は Fastlane が Bitrise のクラウドサービスでエンタープライズビルドへ出力できない問題と戦っていましたが、同僚や私のローカル環境では全く問題なく動いていました。

Fastlane 上の xcpretty を無効にすると、gym から次のエラーが出ていました。

```
$/usr/bin/xcrun /usr/local/lib/ruby/gems/2.3.0/gems/gym-1.10.0/lib/assets/wrap_xcodebuild/xcbuild-safe.sh -exportArchive -exportOptionsPlist '/var/folders/90/5stft2v13fb_m_gv3c8x9nwc0000gn/T/gym_config20161003-2206-1f0vw3k.plist' -archivePath /Users/vagrant/Library/Developer/Xcode/Archives/2016-10-03/App\ 2016-10-03\ 05.57.17.xcarchive -exportPath '/var/folders/90/5stft2v13fb_m_gv3c8x9nwc0000gn/T/gym_output20161003-2206-wjhjai'
+ xcodebuild -exportArchive -exportOptionsPlist /var/folders/90/5stft2v13fb_m_gv3c8x9nwc0000gn/T/gym_config20161003-2206-1f0vw3k.plist -archivePath '/Users/vagrant/Library/Developer/Xcode/Archives/2016-10-03/App 2016-10-03 05.57.17.xcarchive' -exportPath /var/folders/90/5stft2v13fb_m_gv3c8x9nwc0000gn/T/gym_output20161003-2206-wjhjai
2016-10-03 06:01:58.299 xcodebuild[5284:14924] [MT] IDEDistribution: -[IDEDistributionLogging _createLoggingBundleAtPath:]: Created bundle at path '/var/folders/90/5stft2v13fb_m_gv3c8x9nwc0000gn/T/App_2016-10-03_06-01-58.298.xcdistributionlogs'.
2016-10-03 06:01:59.596 xcodebuild[5284:14924] [MT] IDEDistribution: Step failed: <IDEDistributionThinningStep: 0x7f868c80f810>: Error Domain=IDEDistributionErrorDomain Code=14 "No applicable devices found." UserInfo={NSLocalizedDescription=No applicable devices found.}
error: exportArchive: No applicable devices found.

Error Domain=IDEDistributionErrorDomain Code=14 "No applicable devices found." UserInfo={NSLocalizedDescription=No applicable devices found.}

** EXPORT FAILED **
[06:01:59]: Exit status: 70
[06:01:59]: 2016-10-03 13:01:58 +0000 [MT] Running step: IDEDistributionSigningAssetsStep with <IDEDistributionContext: 0x7f868c51ed70; archive(resolved)='<IDEArchive: 0x7f868c4af8d0>', distributionTask(resolved)='2', distributionMethod(resolved)='<IDEDistributionMethodEnterprise: 0x7f868c202a00>', teamID(resolved)='(null)'>
	Chain (2, self inclusive):
	<IDEDistributionContext: 0x7f868c51ed70; archive = '(null)', distributionMethod='<IDEDistributionMethodEnterprise: 0x7f868c202a00>', teamID='(null)'>
	<IDEDistributionContext: 0x7f868c4b0e70; archive = '<IDEArchive: 0x7f868c4af8d0>', distributionMethod='(null)', teamID='(null)'>
</IDEDistributionContext: 0x7f868c51ed70>
```

このエラーは少し罠で、コード署名のエラーか Fastlane の設定の何かがおかしいという問題だと考えていました。しかし、よく見ると次の出力があることが分かります。

```
2016-10-03 13:01:58 +0000 [MT] Running /Applications/Xcode.app/Contents/Developer/usr/bin/ipatool '/var/folders/90/5stft2v13fb_m_gv3c8x9nwc0000gn/T/IDEDistributionThinningStep.s1x' '--json' '/var/folders/90/5stft2v13fb_m_gv3c8x9nwc0000gn/T/ipatool-json-filepath-RUCdRR' '--info' '--toolchain' '/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr' '--platforms' '/Applications/Xcode.app/Contents/Developer/Platforms'
2016-10-03 13:01:58 +0000  ruby 2.0.0p648 (2015-12-16 revision 53162) [universal.x86_64-darwin15]
2016-10-03 13:01:59 +0000  /usr/local/lib/ruby/gems/2.3.0/gems/bundler-1.13.1/lib/bundler/definition.rb:181:in `rescue in specs': Your bundle is locked to json (1.8.3), but that version could not be found in any of the sources listed in your Gemfile. If you haven't changed sources, that means the author of json (1.8.3) has removed it. You'll need to update your bundle to a different version of json (1.8.3) that hasn't been removed in order to install. (Bundler::GemNotFound)
	from /usr/local/lib/ruby/gems/2.3.0/gems/bundler-1.13.1/lib/bundler/definition.rb:175:in `specs'
	from /usr/local/lib/ruby/gems/2.3.0/gems/bundler-1.13.1/lib/bundler/definition.rb:235:in `specs_for'
	from /usr/local/lib/ruby/gems/2.3.0/gems/bundler-1.13.1/lib/bundler/definition.rb:224:in `requested_specs'
	from /usr/local/lib/ruby/gems/2.3.0/gems/bundler-1.13.1/lib/bundler/runtime.rb:118:in `block in definition_method'
	from /usr/local/lib/ruby/gems/2.3.0/gems/bundler-1.13.1/lib/bundler/runtime.rb:19:in `setup'
	from /usr/local/lib/ruby/gems/2.3.0/gems/bundler-1.13.1/lib/bundler.rb:99:in `setup'
	from /usr/local/lib/ruby/gems/2.3.0/gems/bundler-1.13.1/lib/bundler/setup.rb:20:in `<top (required)>'
	from /System/Library/Frameworks/Ruby.framework/Versions/2.0/usr/lib/ruby/2.0.0/rubygems/core_ext/kernel_require.rb:55:in `require'
	from /System/Library/Frameworks/Ruby.framework/Versions/2.0/usr/lib/ruby/2.0.0/rubygems/core_ext/kernel_require.rb:55:in `require'
2016-10-03 13:01:59 +0000 [MT] /Applications/Xcode.app/Contents/Developer/usr/bin/ipatool exited with 1
2016-10-03 13:01:59 +0000 [MT] ipatool JSON: (null)
```

よくよく調査すると、エクスポート時に Fastlane が MacOS のシステムRuby を使うように戻していました。しかし、システム Ruby は json 1.8.3 をインストールしていません。

### 解決方法

この問題を修正するためには、次の`Script`ステップを追加する必要があります。

```
sudo /usr/bin/gem install bundler
```

このスクリプトはシステム Ruby に bundler をインストールして、Fastlane のプラグインが bundle install を呼び、システム Ruby は必要な依存をインストールします。


## ローカルで動くが Bitrise.io 上では動かないとき
_例えば`ld: file not found ...`のようなエラー_

まずはじめに Xcode を再起動して新しくビルドをしてください。

上手くいかない場合は Xcode で**クリーンビルド**を実行してください。

エラーが表示されない場合は、シミュレーターのリセットを試してください。

他の問題であり得るのは CocoaPods のバージョンの問題です。
CocoaPods を`[sudo] gem install cocoapods`でアップデートしてください。また、`Podfile.lock`が**リポジトリにチェックインされている**ことを確認してください。このファイルが利用している Pod の厳密なバージョンを保持しているためです。*このファイルがない場合、Bitrise は常により新しいバージョンの Pod をダウンロードして利用する可能性があります*

まだエラーが表示されない場合、プロジェクトの`Pods`フォルダを削除して`pod install`コマンドの再実行を試みてください。

最後に、今までの試行でも上手く行かない場合、または、Bitrise 上で`ld: file not found`エラーが出ていて、そのパスに`DerivedData`が含まれていて他のエラーメッセージがない場合、例えば次のようなエラーの時

```
ld: file not found: /Users/vagrant/Library/Developer/Xcode/DerivedData/...
clang: error: linker command failed with exit code 1 (use -v to see invocation)
```

Xcode のローカルキャッシュを削除してみてください。実行後に、ローカル環境でそのエラーが再現するはずです。

次のコマンドで Xcode のローカルキャッシュを削除できます。

```
rm -rf ~/Library/Developer/Xcode/DerivedData
```


## ステップがハングした場合（何もログを出力しなくなってタイムアウトした場合）

スクリプトが GUI プロンプトやポップアップを呼び出したり、ユーザの入力待ちになっていないかを確認してください。
スクリプトがユーザの入力待ちになっている場合、ハングの原因になります。

よくある原因

* **共有されていない**スキームをビルドしようとしている時、`Xcode`（コマンドラインツール）はハングする可能性があります
	* __解決方法__: スキームが共有されていることを確認してください。また、リポジトリに変更をコミットしてプッシュしてください。より詳細な情報は次のリファレンスを参考にしてください。 [Xcode Scheme が見つからない問題](#Xcode Scheme が見つからない問題)
* スクリプトが OS X のキーチェーンのアイテムにアクセスしようとして、アイテムが許可を取るように設定されている。（パスワードなどのアイテムをキーチェーンに追加したときに設定される、アクセスコントロールのデフォルトです）
* OS Xがポップアップを表示して許可を求めるスクリプトやツール（例えば、`osascript`など）を使用しようとしている。手動のインタラクションなしにツールを許可できるワークアラウンドを使うことができます。例えば、[https://github.com/jacobsalmela/tccutil](https://github.com/jacobsalmela/tccutil)などです。
	* 例えば、OS Xのアクセシビリティのリストを許可する`osascript`を追加するとき、そのスクリプトから**tccutil**を呼び出すことができます。`sudo python tccutil.py -i /usr/bin/osascript`（プロジェクトのリポジトリに含めるか、即時でダウンロードするようにするかを忘れずに）
	* GitHubからスクリプトを直接ダウンロードすることができます。`wget https://raw.githubusercontent.com/jacobsalmela/tccutil/master/tccutil.py`
* **あなたのAppのコードに何か問題がある**場合もあります。例えば、**アプリの初回起動時だけにアプリ内で表示されるポップアップ**がある場合です。一度ポップアップをディスミスしたら、そのことをAppのローカルストレージに保存すると、そのポップアップはもう表示されなくなります。私たちがiOSシミュレーター上でディスミスしても、Bitrise 上では毎回新しい真っさらな環境になります。つまり、それはシミュレーターのメニューで __"Reset Content and Settings"__ を押したのと同様な状態です。
	* __解決方法__: 初回起動の体験を再現するために、Mac や PC 上でテストする前にシミュレーターやエミュレータをクリーンにしてください。

また、これらはハングもせず、単に何も出力しないということもあります。
これはいくつかの理由があって発生します。[iOS library project](https://github.com/bitrise-samples/xcodebuild-piped-output-issue-reproduction)から例を見つけることができます。

## CocoaPods フレームワークの署名での問題
次のようなエラーが発生したとき

```
=== CLEAN TARGET Pods-Xxxxxxxxx OF PROJECT Pods WITH CONFIGURATION Release ===

Check dependencies
[BEROR]Code Sign error: No code signing identities found: No valid signing identities (i.e. certificate and private key pair) matching the team ID “(null)” were found.
[BEROR]CodeSign error: code signing is required for product type 'Framework' in SDK 'iOS 8.1'
```

このエラーは、CocoaPodsが__フレームワーク__のコード署名設定をどのように期待しているかに関連します。


### 解決方法1: ワイルドカードの development プロビジョニングプロファイルをアップロード・インクルード・インストールしているかを確認する

通常、この問題は以下の理由のためローカル環境では発生しません。
Xcodeが初期のコード署名を処理する時（フレームワークプロジェクトをコンパイルする時）、CocoaPodsのフレームワークプロジェクトで利用可能な証明書やプロビジョニングプロファイルを要求するからです。

個人のMac上では、ほとんどの場合自分自身のDevelopment証明書と__ワイルドカード__のチームのプロビジョニングプロファイルを持っていて、フレームワークプロジェクトに対して初期コードの署名をするには十分です。

そのため、解決方法1 はこの通り、Development identityと証明書（.p12）とチームの__ワイルドカード__のプロビジョニングプロファイルを[bitrise.io](https://www.bitrise.io)へアップロードするとXcodeは個人のMacで動いていたのと同じように動きます。development 署名ファイルを使って初期コード署名をし、最終的なIPAを生成した際にアーカイブにもう一度サインします。


### 解決方法2: `Podfile`でコード署名の設定を変更する

あるユーザが私たちに送ってきた解決方法です。`Podfile`に`Post script`として次のスクリプトを追加します。

```
post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['EXPANDED_CODE_SIGN_IDENTITY'] = ""
      config.build_settings['CODE_SIGNING_REQUIRED'] = "NO"
      config.build_settings['CODE_SIGNING_ALLOWED'] = "NO"
    end
  end
end
```

CocoaPodsに関連する問題や議論は[https://github.com/CocoaPods/CocoaPods/issues/4331](https://github.com/CocoaPods/CocoaPods/issues/4331)で見つけることができます。

また、可能な解決方法もCocoaPodsの公式GitHub Issuesページで見ることができます。例: [https://github.com/CocoaPods/CocoaPods/issues/3063](https://github.com/CocoaPods/CocoaPods/issues/3063)


## エンタープライズAppをインストール中での`Untrusted Enterprise Developer`

Enterprise ディストリビューション署名済みAppをインストールしようとした場合、初回起動時に**Untrusted Enterprise Developer**というタイトルのポップアップが表示されることがあるかもしれません。

![iOS Untrusted Enterprise Developer popup](/img/ios/ios-untrusted-enterprise-developer.png)

iOS 9 からは、ポップアップの右側に”信頼する”というオプションがありません。

iOSの設定で開発者を信頼して App を起動できるようにできます。

1. 環境設定を iPhone または iPad で開きます
2. `General`カテゴリを選択します
3. `Profile`オプションを表示します
	* iOS 9.2 から`Profile`から`Device Management`にリネームされています
4. そのAppのエンタープライズAppオプションをタップします（ポップアップ中で言及されているもの）
5. `Trust "The Developer's Name"`ボタンをタップ
6. ポップアップが表示されるので、もう一度`信頼する`をタップ

これでAppを起動できるようになっていて、同時に同じ開発者の他のエンタープライズAppも同様に起動できるはずです。


## dSYM が見つからない
いくつかのサービスは、配置済みの App の dSYM を要求しますが、Xcode プロジェクトの設定で dSYM の生成を無効にしている場合があります。

### 解決方法

デバッグシンボル（dSYM）を生成するには、`Xcode Project's Settings -> Build Settings -> Debug Information Format` へ行き、*DWARF with dSYM File*を設定します。

## Invalid IPA: get-task-allow values in the embedded .mobileprovision don't match your binary


**解決方法:** Xcode**ではなく**、Apple デベロッパーポータルで新しい証明書を生成します。

他に考えられる解決方法として、ターゲットとプロジェクトの Xcode プロジェクト設定に適切な署名アイデンティティとプロビジョニングプロファイルがあることを確認してください。


## No identity found

正しい *Provisioning Profile* と *Certificate* ペアをアップロードして、アイデンティティハッシュを確認して、キーチェーンにあるものと一致するにも関わらず、次のようなエラーがまだ出ているケースです。


```
22...D11: no identity found
```

**解決方法**

Xcode プロジェクトの設定で、ビルドでどのキーチェーンが使われるべきかが設定されている可能性があり、`--keychain /../../xxx.keychain`のようなコード署名のフラグや*.pbxproj*で`CODE_SIGN_KEYCHAIN` 変数のようなものがスキームに含まれているかもしれません。

_これはXcode Botをベースにした設定を Bitrise に移行する場合に起きる可能性があります_

この問題を修正するには、Xcode プロジェクトの設定からキーチェーンの選択設定を削除する必要があります。


## No mobileprovision_path found / No embedded.mobileprovision found in ...

エラー:
`No embedded.mobileprovision found in ...` または `No mobileprovision_path found`


### 解決方法1: `Skip Install` Xcode Settings

Xcode のアーカイブステップでこの問題が発生する場合、Xcode プロジェクトの設定を確認する必要があります。ほとんどの場合は、`Skip Install`オプションを`YES`にセットする必要があります。

この設定は iOS フレームワークのみで必要で、**iOS Apps では`NO`をセットする必要があります。**

公式ドキュメントは[https://developer.apple.com/library/ios/technotes/tn2215/_index.html](https://developer.apple.com/library/ios/technotes/tn2215/_index.html)で確認できます。

* *Xcode がアプリケーションを正常にアーカイブしているのにも関わらず、アーカイブオーガナイザーがマイアーカイブセクションで表示されていない*ケース


### 解決方法2: `Installation Directory` Xcode Settings

**あり得る別の原因**は、あなた（または、あなたが使っているツール）が Xcode プロジェクトの`Build Setting -> Deployment -> Installation Directory` の設定を変更してしまっている場合があります。あなたのAppが標準の`Products/Applications`フォルダではなく、`Products/Users/USERNAME/...`フィルダに生成され、中間ビルドのフル絶対パスを含みます。


**解決方法:** `Installation Directory`オプションに`$(LOCAL_APPS_DIR)`（新しくiOSのXcodeプロジェクトを作成した時のデフォルト値）、または、`/Applications`（`$(LOCAL_APPS_DIR)`のデフォルト値）が設定されていることを確認し、ビルドツールがこのオプションを変更していないことを確認してください。

*この解決方法を教示いただいた**Antje**さん、ありがとうございます！*


## Duplicated Schemes

このケースはまれですが、確認する価値はあります。
Xcode プロジェクトに複数のスキームがある場合や**全く同じ名前**のワークスペースがある場合で、プロジェクトがコマンドラインツールでビルドされる時、Xcode は__ランダムに__それらのスキームやコンフィギュレーションを選択します。これによりビルドはランダムに成功・失敗をし、Xcode の出力を見ると失敗時に`xcodebuild: error: Scheme YOUR_DUPLICATED_SCHEME is not currently configured for the test action`といった表示があるでしょう。

CocoaPodsを利用してプロジェクトと同じ名前のPodがある場合に起こり得ます。

一応、Xcode のコマンドラインツールで利用可能なスキームの一覧を表示してデバッグすることができます。
プロジェクトのディレクトリで`xcodebuild -workspace ./path/to/workspace/file -list`を実行するか、ワークスペースファイルの代わりにプロジェクトファイルを使っている場合、`xcodebuild -project ./path/to/project/file -list`を実行してください。
プリントしたリストで重複するスキームが存在しないようにしてください。
このコマンドは、あなたの Mac や bitrise.io （スクリプトステップに追加するだけ）でも実行でき、理想的には同じリストを見ることができるはずです。


## System dialog blocks the tests to run

_（この問題と解決方法を教示いただいた[@AronI](https://github.com/AronI)さん、ありがとうございます）_

エラー:

```
2016-09-08 07:30:34.535 XCTRunner[6174:22447] Running tests...\
07:30:35.399 XCTRunner[6174:22454] _XCT_testBundleReadyWithProtocolVersion:minimumVersion: reply received\
07:30:35.403 XCTRunner[6174:22453] _IDE_startExecutingTestPlanWithProtocolVersion:16\
2016-09-08 07:30:46.670 XCTRunner[6174:22447] Failed to background test runner within 10.0s.\
** TEST FAILED **\
\
}
```

解決方法:

> 簡単に言えば、問題はUIテストが落ちていたということだった。

失敗するまでのステップは次の通りです。

1. ユニットテストはパスします。しかし、いくつかのユニットテストはFBSnapshotTestCase のテストで、これは UI テストの類だがユニットテストのバンドルにあります。App を起動してスクリーンの参考画像と比較します。
2. あるFBSnapshot TestCase が実行されたとき、その App が起動して Push 通知の許可を取るアラートダイアログが表示されます。（これは新規インストール後に毎回 AppDelegate で起きるような何かです）
3. UITests が開始された時、許可のダイアログはまだ表示されていて画面を覆いかぶさっています。
4. アプリケーションはある XCUIElements にアクセスしようとしますが、覆いかぶさっている許可のダイアログによって失敗します。

AppDelegate（許可のダイアログを呼び出している場所）でユニットテストを実行しているかどうかを確認するようにして、ユニットテスト実行時以外でのみ許可を取るようにして、この問題を解決しました。


```
let unitTestMode = NSProcessInfo.processInfo().environment["XCTestConfigurationFilePath"] != nil
if !unitTestMode {
// IMPORTANT: Only ask permission for push notifications (or any notifications) when not running unit tests.
// The reason for doing this is that it's causing a build failure when the CI runs unit and UI tests.
// The build failure happens like this:
// 1. FBSnapshotTestCase unit tests run and open the application
// 2. The application asks user for the permission to enable push notifications
// 3. FBSnapshotTestCase finish but the permissions dialog is still visible
// 4. UITests start with the permissions dialog overlaying the screen
// 5. UITest doesn't know what the hell is going on and eventually fails because the dialog is blocking everything

// 6.  BUILD FAILURE

askForNotificationPermission()
}
```

> これはおそらくとてもエッジケースですが、この問題にぶち当たるかもしれない人のために伝えておこうと思いました。
> 誰かのお役に立てれば幸いです。
