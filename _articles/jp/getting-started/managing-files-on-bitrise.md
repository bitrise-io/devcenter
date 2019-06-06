---
title: Bitrise上のファイル管理
date: 2018-12-03T10:05:49.000+00:00
redirect_from: []
menu:
  getting-started-main:
    weight: 23

---
Bitriseのファイル管理はビルド内にファイルをアプロードできます。コード署名のためにファイルをアップロードすることを必要とし、またビルドはファイルをアウトプットとして作成できます。全ての作業がとてもシンプル！

### **ファイルをアップロードしてビルド内で活用しよう**

ビルドが何らかのファイルを要求した場合、Generic File Storageにファイルをアップロードしてください。IDとファイルをアップロードするだけでGeneric File Storageはどのようなファイルも受け付けます。

制限

* 5MB以下のサイズ
* 5つまで違うファイルを同時に保存可能。他のファイルをアップロードしたいときは一つ消さなければならない。

1. ダッシュボードへ。
2. アプリを開きファイルを追加します。
3. Workflow Editorを開きます。
4. `Code Signing`をクリックします。

   ![](/img/code-signing-tab.png)
   * 下にスクロールしてGeneric File Storageを開き固有IDを使ってファイルをあけます。

   ＊固有IDはBitriseが環境変数として保存している作成されたダウンロードURLの一部になります。
   * **Upload file**をクリックしてファイルをアップロード

   ＊ファイルのサイズが5MB以上だと作動しません

ファイルを多様に使えるようになります。詳しく知りたい方は[ Generic File Storageガイド](/tutorials/how-to-use-the-generic-file-storage/)をクリック。

ファイルがアップロードしたら：

* bitriseのアプリチームの管理者または所有者がダウンロードします,[it is protected](/protecting-your-code-signing-files/)
* Pull RequestビルドにExposeする

### コード署名ファイル

###### Bitriseはコード署名をすることができますが複数のファイルが必要となります。

Androidアプリ: コード署名ファイルを[Generic File Storage]()にアップロードしてください。

iOsファイル: プロビジョニングプロファイルとコード署名IDには専用のメニューオプションを使用する必要があります。

* [Android code signing](/code-signing/android-code-signing/android-code-signing-procedures/)
* [iOS code signing](/code-signing/ios-code-signing/code-signing/)

{% include message_box.html type="info" title="iOSコード署名ファイルのためのパスワード保護" content="Xcodeでコード署名証明書を安全に保存するためにパスワードを設定できます。パスワードはBitriseに表示できます：**パスワード**画面にある証明書ファイルの隣にある目のアイコンをクリックしてください。"%}

### アウトプットファイル

ビルドはファイルを作成しエクスポートすることができます：例えば、アプリのバイナリパッケージファイルをBitriseビルドとエクスポートすることができます。簡単にファイルを見つける方法は

1. ビルドを開きます
2. アプリ、Artifactsのタブに
3. 作成したファイルをチェックしてダウンロードします

詳しくは[build artifacts](/builds/build-artifacts-online/)参照してください

### 暗号化ファイルを使う

Bitriseで暗号化ファイルを簡単に安全に使用することができます。まずファイルをコンピューターで暗号化、次にRepoにファイルをアップロード、最後に必要な時にファイル解読のためにStepを使うだけです！

例では、パスワード生成ツール**PWgen**と暗号化ソフトGPGを使用しています。

{% include message_box.html type="important" title="GPG" content="`Decrypt file`ステップではGPGの暗号化されたファイルのみ解読できます。GPG以外の暗号化ソフトを使っている場合Bitriseではファイルを解読することができません。"%}

1. ターミナル/コマンドラインを開きます
2. 32文字のパスフレーズを暗号化のために作ります

       pwgen -s 32 1
3. ファイルを暗号化します。

       gpg -c my_secret_file

   オプショナルで、ファイルをインタラクティブせずに暗号化することができます。

       gpg --batch --passphrase <passphrase> -c my_secret_file
4. Bitrise上で`my_secrefile`をGeneric File Storageにアップロードします。
5. `Decrypt file`Stepをworkflowに追加します。
6. 作ったパスフレーズを [secret Environment Variable](/builds/env-vars-secret-env-vars/)として追加し適応なStep入力に組み込みます。
7. 暗号化ファイルをとアウトプットファイルを適応なStep入力に追加します。

   Generic File Storage内の暗号化ファイルのためのEnvironment Variableを見つけることができます。

以上です！ビルドを行ったらStepがファイルを解読し、必要に応じて使うことができます！