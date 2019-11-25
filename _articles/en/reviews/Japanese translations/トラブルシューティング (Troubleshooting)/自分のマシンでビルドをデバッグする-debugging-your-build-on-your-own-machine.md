---
tag: []
title: 自分のマシンでビルドをデバッグする (Debugging your build on your own machine)
redirect_from: []
summary: ''
published: false

---
Bitrise上でビルドが失敗する場合、ローカルすなわちご自身のマシンで試し実行することをお勧めします。方法は以下の通りです：

* プロジェクトのオンラインレポジトリでfull clean git cloneを行う
* Bitrise CLIを使って自分のマシンでビルドを実行する

以上のことを行うことにより普遍的な問題については解決できます：コミットされていない もしくは "gitignored"ファイルが作業ディレクトリにあるが、オンラインでgitレポジトリへコミットされていないため、ビルド実行用のレポジトリをBitriseがcloneする際は、それらのファイルを使用することはできません。他の可能性のある問題は以下のとおりです：

* コード署名ファイルが自分のローカルマシン上にあるがBitriseにアップロードされていない
* ビルドに使うツールのバージョンが異なる

## full clean git cloneを使ったテスト

1. 自分のマシンでTerminal / Command Line インターフェースを開きます。
2. `cd / tmp`を打ち込みます。
3. `git clone REPOURL ./quick-repo-test --branch BRANCH-YOU-WANT-TO-TEST`を使ってレポジトリをcloneします。
   * 例：`git clone ``[https://github.com/bitrise-io/bitrise.git](https://github.com/bitrise-io/bitrise.git "https://github.com/bitrise-io/bitrise.git")`` ./quick-repo-test --branch master`
4. `cd ./quick-repo-test.`を入力します。

テストやプロジェクトのビルド、またはプロジェクトファイルを開くにはこのディレクトリよりコマンドを実行してください。

## Bitrise CLIを使用したテスト

full clean git cloneが終了したら、[Bitrise CLI](https://www.bitrise.io/cli)を使ってビルドをローカルで実行します。

1. [Bitrise CLIをインストール](/jp/bitrise-cli/installation/)します。
2. [bitrise.io](https://www.bitrise.io/)よりご自身のアプリの`bitrise.yml`ファイルを[ダウンロード](/jp/builds/bitrise-yml-online/)します。
3. ビルドを `bitrise run <workflow-name>` (例: `bitrise run primary`)を使って実行します。

この方法により、ほぼ全ての問題の再現化に役立ちます。また、自分のマシンで問題のデバッグの処理を許可します。

これでもなおBitriseでビルドが失敗する場合は、サポートまでご連絡ください！

{% include message_box.html type="important" title="iOSテストの実行" content="

* [bitrise.io](http://bitrise.io/)が実行している同じシミュレータでテストを行うようにしてください。但し、ローカルでテストを実行するのにBitrise CLIを使用している場合は例外です。
* iOSのユニットテストまたはUIテストのデバッグをする際は、**iOSシミュレータのリセット**を行う必要があります (シミュレータアプリ内にある、**Simulator**のメニューバーアイテム、**Reset Content and Setting**の順に選択してください)。"%}

{% include message_box.html type="important" title="Androidプロジェクト" content="それでもローカルで問題の再現ができない場合は、 `$HOME/.gradle` (非表示) ディレクトリを削除して、Gradleキャッシュをクリアすることもできます。(Quick Terminal / Command Line コマンド: `rm -rf $HOME/.gradle`)"%}

## ローカルでのAndroid/Linux環境の使用

プロジェクトにAndroidまたはLinux環境を使用する場合、[bitrise.io](https://www.bitrise.io/)で実行されているビルドと全く同じの環境をダウンロード・使用することができます。

この方法を試す場合、[ガイド](/jp/docker/run-your-build-locally-in-docker/)に従ってください！

{% include message_box.html type="info" title="clean git cloneからDockerを実行するには" content="まず**clean git clone**を実行し、その後そこから`docker`を実行します。この方法により、`.gitignore`にあるファイルがビルドに影響を与えることはなくなるので、[bitrise.io](https://www.bitrise.io/)上で回していた同じ方法でビルドを実行することができます。"%}