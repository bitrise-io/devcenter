---
title: Xcodeアーカイブ：書き出し
menu:
  tips-and-tricks:
    weight: 8
---
[Bitrise.io](https://www.bitrise.io/)でiOS用の新しいアプリを作成した場合、
生成されたデフォルトのワークフローには`Xcode Archive`ステップが含まれます。
このステップはiOSアプリのアーカイブと書き出しを行います。

## 歴史的小話と技術的情報

`Xcode 6`を使用するステップの場合、`ipa`を生成するための以下のような(レガシーな)コマンドが生成されます。(これらはステップのログから参照できます)

    xcodebuild -exportArchive \
    	-exportFormat ipa \
    	-archivePath "/var/folders/lb/8n5bn9k975qgw662jpqdy7mm0000gn/T/bitrise-xcarchive.YnAMfpzJ/ios-simple-objc.xcarchive" \
    	-exportPath "/Users/vagrant/deploy/ios-simple-objc.ipa" \
    	-exportProvisioningProfile "Xyz"

Xcode 6の時代であれば、出力形式を`ipa`に設定し、必要ないくつかのパスとコード署名に使用するProvisioning profileを指定するだけで充分でした。

`Xcode 7`ではアーカイブの機能は拡張され、より複雑なパラメータの指定に対応しました。
Xcode 7は古いパラメータもサポートしましたが、これらは**非推奨**となったため、新しい`-exportOptionsPlist`のオプションを使用しない場合、以下のような警告が表示されるようになりました。

    xcodebuild: WARNING: -exportArchive without -exportOptionsPlist is deprecated

**新しいバージョン**の書き出し用コマンドには、アーカイブ用の全パラメータ(コード署名の種類や方法のほか、Bitcodeの有効/無効といったものなど)を含んだPlistファイル(`-exportOptionsPlist`)が必要となりました。最終的なコマンドは以下のようになります。

    xcodebuild -exportArchive \
    	-archivePath "/var/folders/lb/8n5bn9k975qgw662jpqdy7mm0000gn/T/bitrise-xcarchive.QbpHVvNx/ios-simple-objc.xcarchive" \
    	-exportPath "/var/folders/lb/8n5bn9k975qgw662jpqdy7mm0000gn/T/bitrise-xcarchive.aCvNPRAi" \
    	-exportOptionsPlist "/Users/vagrant/deploy/export_options.plist"

`Xcode Archive`ステップは、デフォルトでは書き出しのための`method`のみが定義された最小限のPlistファイルを生成します。(`export_options_path`オプションを指定しない限り、このファイルが使用されます)

    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple Computer//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
    <dict>
    	<key>method</key>
    	<string>development</string>
    </dict>
    </plist>

## Xcode Archiveステップが生成する書き出しオプションについて

デフォルトで**生成された**Plistファイルは、`.xcarchive`に組み込まれたProvisioning profileに基づく**書き出しメソッド** (`app-store`、`ad-hoc`、`enterprise`または `development`)のみを定義しています。
(.xcarchive形式のファイルは、`Xcode Archive`ステップ内の`xcodebuild archive`コマンドにより生成されます。このコマンドは、`xcodebuild -exportArchive`コマンドの直前に実行されます。)

組み込まれるProvisioning profileはプロジェクトのコード署名の設定に依存します。コード署名の設定は`Xcode Archive`ステップの`force_code_sign_identity`と`force_provisioning_profile`の指定により、強制的に変更することも可能です。 iOSのコード署名のオプションに関するより詳しい情報は[こちら](/code-signing/ios-code-signing/create-signed-ipa-for-xcode/)をご参照ください。

なお、Plist内のこれ以外の書き出しオプションは任意の設定項目です。

## 自作した書き出しオプションを使用する

デフォルトで生成されるexport_options.plistが要求に合わない場合、あらかじめ作成しておいたものを使用することも可能です。
この場合は、必要なオプションを設定したPlistファイルをリポジトリ内に作成してください。

{% include message_box.html type="note" title="利用可能な書き出しオプション" content="
`xcodebuild -h`を実行すると、**Available keys for -exportOptionsPlist:**セクション内に利用可能なオプションの一覧が表示されます。"%}

_手動でipaファイルを書き出す場合、Xcode内で選択可能なオプションがあります。

我々が**推奨する**方法は**リポジトリ内に生成されたPlistファイルを配置する**ことです。
あとは、`Xcode Archive`ステップの`export_options_path`にPlistファイルのパスを指定すれば完了です。(例: `./path/to/export-options.plist`).

### ipaのBitcodeを無効にする

Plist内で明示的に無効にしない限り、**書き出しオプションである`uploadBitcode`はデフォルトで有効**になっています。
このオプションが不要な場合は、ステップが自動生成した書き出しオプションの代わりに、自作したものを使用する必要があります。

このときの書き出しオプションは以下のようになります。

    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple Computer//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
    <dict>
    	<key>method</key>
    	<string>app-store</string>
    	<key>uploadBitcode</key>
    	<false/>
    </dict>
    </plist>

{% include message_box.html type="note" title="コード署名に関する注意" content="
もちろん、`method`に`app-store`を設定した場合は、利用可能なApp Store用の証明書とProvisioning profileをアップロードして使用する必要があります。
"%}

### 関連事項

#### ERROR ITMS-90635: Invalid Mach-O Format

    Transporter Error Output: ERROR ITMS-90635: Invalid Mach-O Format.
    ...
    Verify that all of the targets for a platform have a consistent value for the ENABLE_BITCODE build setting.
    ...

このエラーは、`ENABLE_BITCODE`の設定がプロジェクト内と異なる場合に発生します。(対象には、CocoaPodsで生成されるようなサブプロジェクトも含まれます)

CocoaPodsを使用している場合、`Podfile`内に以下を追加して、**podの** `**ENABLE_BITCODE**` **設定を上書き**することができます。

CocoaPods 1.0以上の場合

    post_install do |installer|
      installer.pods_project.targets.each do |target|
        target.build_configurations.each do |config|
          config.build_settings['ENABLE_BITCODE'] = 'NO'
        end
      end
    end

CocoaPods 0.39以下の場合

    post_install do |installer|
      installer.project.targets.each do |target|
        target.build_configurations.each do |config|
          config.build_settings['ENABLE_BITCODE'] = 'NO'
        end
      end
    end
