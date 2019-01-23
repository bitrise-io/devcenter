---
# jp title missing
title: Frequent Android issues
redirect_from:
- "/android/frequent-android-issues/"
menu:
  troubleshooting:
    weight: 4
---
## Androidパッケージが見つけられない、もしくはライセンス契約を受け入れていない場合

### エラー

    > A problem occurred configuring project ':lib'.
       > You have not accepted the license agreements of the following SDK components:
         [Google Repository].
         Before building your project, you need to accept the license agreements and complete the installation of the missing components using the Android Studio SDK Manager.
         Alternatively, to learn how to transfer the license agreements from one workstation to another, go to http://d.android.com/r/studio-ui/export-licenses.html

または

    Could not find com.android.support:appcompat-v7:24.2.0.

### 解決策

** `**Install missing Android tools**` **ステップを使ってください。以下のセクションは参照目的のためだけに保持されています!**

エラーはビルドがまだプリインストールされていないAndroidパッケージが必要であるということを意味しています。
(_Githubではプリインストールされているパッケージを見ることができます_ [_here, on GitHub_](https://github.com/bitrise-docker/android/blob/master/Dockerfile#L30)_ -
新しくプリインストールされたパッケージを追加したいときはプルリクエストをお送りください！_),
**もしくはAndroidパッケージが古いことを意味しています。**.

解決策は非常に簡単です。
関連するパッケージをインストール/更新するだけです。これを行うには、ワークフローにスクリプトステップを追加します。それはエラーが発生したステップの前にある必要があります。それはワークフローの最初のステップになる可能性があります。

以下の内容に従ってください:

    #!/bin/bash
    # fail if any commands fails
    set -e
    # debug log
    set -x
    
    # For newer Android SDK:
    sdkmanager "extras;android;m2repository"
    sdkmanager "extras;google;m2repository"
    
    # For older Android SDK:
    echo y | android update sdk --no-ui --all --filter extra-android-m2repository | grep 'package installed'
    echo y | android update sdk --no-ui --all --filter extra-google-m2repository | grep 'package installed'

ほとんどの場合、両方のパッケージを更新する必要はないので、1つずつ削除することはできますが、
このエラーに関連するケースの大半はスクリプトの3つすべてでカバーできます。

{% include message_box.html type="note" title="We update the preinstalled Android packages every weekend" content=" So if the error is related to an outdated package, the workaround we describe here can be removed from your build after the weekend update is completed. "%} 

### ライセンスエラーの代替解決策

** `**Install missing Android tools**` **ステップを使ってください。  以下のセクションは、参照目的のためだけ保持されています!**

`You have not accepted the license agreements of the following SDK components`
エラーの代替解決策は, ログに記録されている通りです:

    Before building your project, you need to accept the license agreements and complete the installation of the missing components using the Android Studio SDK Manager.
      Alternatively, to learn how to transfer the license agreements from one workstation to another, go to http://d.android.com/r/studio-ui/export-licenses.html

このリンクからログの詳しい情報を見ることができます。
([http://d.android.com/r/studio-ui/export-licenses.html](http://d.android.com/r/studio-ui/export-licenses.html)),
要するにこれは次のようにして行うことができます：

**Mac / PCでライセンスを検索する**:

1つのワークステーションでライセンス契約に同意したが、別のワークステーションでプロジェクトをビルドする場合は、Android Sdkホームフォルダから受け入れたライセンスフォルダをコピーしてライセンスをエクスポートすることができます（これは<android sdk home path > / licenses）を現在のプロジェクトをビルドしたいマシンのAndroid Sdkホームディレクトリにコピーします。

gitリポジトリのルートディレクトリに** android-licenses ** **ディレクトリを作成し、このディレクトリにライセンスファイルをコピーします**その後、ワークフローでスクリプトステップを使用して適切な場所にライセンスをコピーします。

** Git Clone **ステップの直後に** Script **ステップを追加します（コードはビルド仮想マシンで利用可能です）。

    #!/bin/bash
    # fail if any commands fails
    set -e
    # debug log
    set -x
    
    rsync -avhP ./android-licenses/ "$ANDROID_HOME/licenses/"

つまり、このスクリプトはあなたのリポジトリからの `android-licenses`のライセンスをコピーし、
`licenses`ディレクトリにあるAndroid SDKのホームパスに移動します。

## 追加のAndroidパッケージをインストール

こちらをご覧ください。 [this section](/tips-and-tricks/android-tips-and-tricks/#how-to-install-an-additional-android-sdk-package).
