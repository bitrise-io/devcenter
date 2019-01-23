---
# jp title missing
title: Collecting and exporting code signing files with codesigndoc
menu:
  ios-code-signing:
    weight: 2
---
[codesigndoc](https://github.com/bitrise-tools/codesigndoc)は _Mac上にある_ Xcode/Xamarin Studioのアーカイブを整理し、生成されたアーカイブファイルを解析するオープンソースのツールです。このツールはXcodeもしくはXamarin Studioがアーカイブ時に使用したコード署名の設定を収集し、必要なコード署名ファイルのリストを表示します。さらに`codesigndoc`を使うことでこれらのファイルに対して検索や書き出し、アップロードの操作も行うことができます。

### codesigndocでファイルを収集する

1. `Terminal`を開きます
2. 対象とするプロジェクトの種類に応じて適切なコマンドを実行します。
   * **Xcode**のプロジェクトの場合:

     ``` bash
     bash -l -c "$(curl -sfL https://raw.githubusercontent.com/bitrise-tools/codesigndoc/master/_scripts/install_wrap-xcode.sh)"
     ```
   * **Xamarin**のプロジェクトの場合:

     ``` bash
     bash -l -c "$(curl -sfL https://raw.githubusercontent.com/bitrise-tools/codesigndoc/master/_scripts/install_wrap-xamarin.sh)"
     ```
3. `Finder.app`を開き、プロジェクトの`.xcodeproj`もしくは`.xcworkspace`のファイルを`Terminal`のコマンドラインにドラッグアンドドロップします。

### codesigndocでBitriseにファイルをアップロードする

1. 一度コード署名のファイルが収集できたら、`codesigndoc`は次のようにファイルをアップロードするか確認してきます:

       Do you want to upload the provisioning profiles and certificates to Bitrise? [yes/no] :

   もしファイルをアップロードしたければ`yes`と入力した上で`Enter`を押してください。
2. Bitriseのあなたのアクセストークンを入力してください。

       Please copy your personal access token to Bitrise.
       (To acquire a Personal Access Token for your user, sign in with that user on bitrise.io,
       go to your Account Settings page, and select the Security tab on the left side.) :
3. 収集したファイルの対象となるBitriseのプロジェクトを選択してください:

       Fetching your application list from Bitrise...
       Select the app which you want to upload the provisioning profiles
       Please select from the list:
       
これで完了です！

もしBitriseの`iOS Auto Provisioning`で自動プロビジョニングを使いたい場合は、収集するファイルは証明書のみで大丈夫です。これは`codesigndoc scan`を実行するときに`--certs-only`フラッグを設定することでできます。

`codesigndoc`をマニュアルでインストールし実行することもできます。詳しい情報は[codesigndocのReadme](https://github.com/bitrise-tools/codesigndoc)を確認してください！

### ベストプラクティス

一番正確な結果を得るには`codesigndoc`を実行する際にリポジトリと同じ状態、言い換えればコードを、ビルドサーバーが確認したあとのように、`git clone`した直後に得られる状態にしておくとよいでしょう。（例えば、`.gitignore`に指定したファイルがMac上に残っている場合、それらはあなたのMac上にはあってリポジトリや別のMacで`git clone`したものには含まれません。）

これらの理由から、一番いい結果を得るには次の方法をおすすめします:

1. Mac上で（新たなディレクトリに）__`git clone`しただけのリポジトリを用意しておきます。__

2. `codesigndoc`は（そのプロジェクトで普段つかっているディレクトリではなく）1で用意したディレクトリ上で実行します。

また`codesigndoc`は完全にアーカイブと書き出し（署名済みの`.ipa`ファイルを作成できるまで）を`Xcode.app`上で先に終えた**後に**実行してください。
これは`Xcode.app`がIPAを書き出す間にバックグラウンドでプロファイルをダウンロードもしくはアップデートしている可能性があるためです。`codesigndoc`を`.ipa`をXcodeから書き出した後に実行することで、全てのファイルを収集することができます。
