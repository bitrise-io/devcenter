---
title: Bitrise上のファイル管理 (Managing files on bitrise)
date: 2019-03-11 12:30:17 +0000
redirect_from: []
published: false

---
Managing files on Bitrise allows you to upload files to use in your builds. You are required to upload files for the purposes of code signing. Builds also produce files as outputs. The good news is that this is all very simple!

Bitriseのファイル管理はビルド内にファイルをアプロードできます。コード署名のためにファイルをアップロードすることを必要とし、またビルドはファイルをアウトプットとして作成できます。全ての作業がとてもシンプル！

### Uploading files to use in your build

### **ファイルをアップロードしてビルド内で活用しよう**

If your build requires any files to make it work, upload them to the Generic File Storage. The Generic File Storage accepts any file type, all you need to do is provide a unique ID and upload the file. There are two restrictions:

ビルドが何らかのファイルを要求した場合、Generic File Storageにファイルをアップロードしてください。IDとファイルをアップロードするだけでGeneric File Storageはどのようなファイルも受け付けます。

制限

* the file cannot be bigger than 5 MB
* you can only store a total of 5 different files at the same time. If you want to upload more, you need to delete one of the files in the storage.
* 5MB以下のサイズ
* 5つまで違うファイルを同時に保存可能。他のファイルをアップロードしたいときは一つ消さなければならない。

 1. Go to the Dashboard.
 2. Open the app you want to add files to.
 3. Open the Workflow Editor.
 4. Click the `Code Signing` tab.
 5. ダッシュボードへ。
 6. アプリを開きファイルを追加します。
 7. Workflow Editorを開きます。
 8. `Code Signing`をクリックします。

    ![](/img/code-signing-tab.png)
 9. Scroll down to the Generic File Storage and provide a unique ID to your file.

    The unique ID will be part of the generated download URL that Bitrise stores as an Environment Variable.
10. Upload the file by clicking **Upload file**.

    Remember that the file size cannot exceed 5 MB. 

    9\. 下にスクロールしてGeneric File Storageを開き固有IDを使ってファイルをあけます。

    ＊固有IDはBitriseが環境変数として保存している作成されたダウンロードURLの一部になります。

     10. **Upload file**をクリックしてファイルをアップロード

    ＊ファイルのサイズが5MB以上だと作動しません

Now you can use this file in a variety of ways in your build - read more in [the detailed guide about the Generic File Storage](/tutorials/how-to-use-the-generic-file-storage/).

ファイルを多様に使えるようになります。詳しく知りたい方は[ Generic File Storageガイド](/tutorials/how-to-use-the-generic-file-storage/)をクリック。

Once a file is uploaded, it can also be:

ファイルがアップロードしたら：

* downloaded by anyone who has Admin or Owner role on the app's team on Bitrise, unless [it is protected](/protecting-your-code-signing-files/)
* exposed to Pull Request builds
* bitriseのアプリチームの管理者または所有者の人がダウンロードします？？？
* Pull RequestビルドにExposeする

### Code signing files

### コード署名ファイル

###### Bitrise can do your code signing for you but we need some files to make it happen.

###### Bitriseはコード署名をすることができますが複数のファイルが必要となります。

For Android apps, upload code signing files to the [Generic File Storage]().

Androidアプリ: コード署名ファイルを[Generic File Storage]()にアップロードしてください。

For iOS files, you need to use the dedicated menu options for provisioning profiles and code signing identities.

iOsファイル: プロビジョニングプロファイルとコード署名IDには専用のメニューオプションを使用する必要があります。

* [Android code signing](/code-signing/android-code-signing/android-code-signing-procedures/)
* [iOS code signing](/code-signing/ios-code-signing/code-signing/)

{% include message_box.html type="info" title="Password protection for iOS code signing files" content="You can set a password in Xcode to store your code signing certificates securely. This password can be viewed on Bitrise: click on the eye icon next to the certificate file, in the **Password** field."%}

{% include message_box.html type="info" title="iOSコード署名ファイルのためのパスワード保護" content="Xcodeでコード署名証明書を安全に保存するためにパスワードを設定できます。パスワードはBitriseに表示できます：**パスワード**画面にある証明書ファイルの隣にある目のアイコンをクリックしてください。"%}

### Output files

### アウトプットファイル

Builds can generate and export files: for example, you can export a binary package file of your app with a Bitrise build. You can easily find these files:

ビルドはファイルを作成しエクスポートすることができます：例えば、アプリのバイナリパッケージファイルをBitriseビルドとエクスポートすることができます。簡単にファイルを見つける方法は

1. Open the build that you ran.
2. Go to the Apps & Artifacts tab.
3. View and download the generated files.
4. ビルドを開く
5. アプリ、Artifactsのタブにいく
6. 作成したファイルをチェックしてダウンロードする

You can read more about [build artifacts](/builds/build-artifacts-online/) in our detailed guide!

詳しく知りたい方は[build artifacts](/builds/build-artifacts-online/)をクリック

### Using encrypted files

### 暗号化ファイルを使う

You can use encrypted files on Bitrise, easily and securely. All you need to do is encrypt the file on your computer, upload it to your repo and use a Step to decrypt it when you need it.

Bitriseで暗号化ファイルを簡単に安全に使用することができます。まずファイルをコンピューターで暗号化、次にRepoにファイルをアップロード、最後に必要な時にファイル解読のためにStepを使うだけです！

In this example, we'll show how to do this. We use the **pwgen** password generator tool and **GPG** as the encryption software.

例では、パスワード生成ツール**PWgen**と暗号化ソフトGPGを使用しています。

{% include message_box.html type="important" title="GPG" content="Please note that the `Decrypt file` Step only decrypts files encrypted with GPG. If you use other encryption software, you will not be able to decrypt files on Bitrise."%}

{% include message_box.html type="important" title="GPG" content="`Decrypt file`ステップではGPGの暗号化されたファイルのみ解読できます。GPG以外の暗号化ソフトを使っている場合Bitriseではファイルを解読することができません。"%}

1. Open your Terminal/Command Line.
2. Create a 32 character passphrase for encryption.
   1. ターミナル/コマンドラインを開く
   2. 32文字のパスフレーズを暗号化のために作る

      pwgen -s 32 1
3. Encrypt your file.
   3\. ファイルを暗号化

       gpg -c my_secret_file

   Optionally, you can encrypt your file(s) in a non-interactive way.

   オプショナルで、ファイルをインタラクティブせずに暗号化することができる

       gpg --batch --passphrase <passphrase> -c my_secret_file
4. Upload `my_secret_file` to the Generic File Storage on Bitrise.
5. Add the `Decrypt file` Step to your workflow.
6. Add your passphrase as a [secret Environment Variable](/builds/env-vars-secret-env-vars/) and insert it to the relevant Step input.
7. Add the encrypted file path and the output file path to the relevant Step inputs.

   You can find the Environment Variable for the encrypted file path in the Generic File Storage.
   4\. Bitrise上で`my_secrefile`をGeneric File Storageにアップロードする
   5\. `Decrypt file`Stepをworkflowに追加
   6\. 作ったパスフレーズを [secret Environment Variable](/builds/env-vars-secret-env-vars/)として追加し適応なStep入力に組み込む
   1. 暗号化ファイルをとアウトプットファイルを適応なStep入力に追加する

   Generic File Storage内の暗号化ファイルのためのEnvironment Variableを見つけることができます。

That's it! Once you run the build, the Step will decrypt your file and you can use it for whatever you need it for!

以上です！ビルドを行ったらStepがファイルを解読し、必要なことに使うことができます！