---
tag: []
title: 自分のマシンでビルドをデバッグする (Debugging your build on your own machine)
redirect_from: []
summary: ''
published: false

---
If your build fails on Bitrise, we often recommend to try and run it locally, on your machine. To do this, do the following:

Bitriseでビルドが失敗する場合、ローカルすなわちご自身のマシンで試し実行することをお勧めします。方法は以下の通りです：

* do a full clean git clone of your project's online repository
* run the build on your machine with the Bitrise CLI
* プロジェクトのオンラインレポジトリでgit cloneのフルクリーンを行う
* Bitrise CLIを使ったご自身のマシンでのビルドを実行する

This helps to eliminate, among other things, a very common issue: that uncommitted or "gitignored" files are in your working directory but they haven't been committed into your git repository online and therefore they are not available when Bitrise clones the repository for running the build. Other possible issues include:

これらのことを行うことにより普遍的な問題については解決できます：コミットされていない / "gitignored"ファイルがworking directoryにあるがオンラインでgitレポジトリへコミットされていないので、ビルドの実行のためにレポジトリをcloneしているときには使用することができません。他の可能性のある問題は以下のとおりです：

* code signing files are present on your local machine but not uploaded to Bitrise
* a difference in the version of the tool(s) used for the build
* コード署名ファイルが自分のローカルマシン上にあるがBitriseにアップロードされていない
* ビルドに使うツールのバージョンが違う

## Testing with a full clean git clone　full clean git cloneを使ったテスト

1. Open your Terminal / Command Line interface on your machine.  
   自分のマシンでTerminal / Command Line インターフェイスを開きます。
2. Type in: `cd /tmp`  
   `cd / tmp`を打ち込みます。
3. Clone your repository with: `git clone REPOURL ./quick-repo-test --branch BRANCH-YOU-WANT-TO-TEST`
   * example: `git clone ``[https://github.com/bitrise-io/bitrise.git](https://github.com/bitrise-io/bitrise.git "https://github.com/bitrise-io/bitrise.git")`` ./quick-repo-test --branch master`
4. `git clone REPOURL ./quick-repo-test --branch BRANCH-YOU-WANT-TO-TEST`を使ってレポジトリをクローンします。
   * 例：`git clone ``[https://github.com/bitrise-io/bitrise.git](https://github.com/bitrise-io/bitrise.git "https://github.com/bitrise-io/bitrise.git")`` ./quick-repo-test --branch master`
5. `cd ./quick-repo-test.`を入力します。

Run the commands you want to test, to build your project, or to open the project file from this directory.

テストやプロジェクトのビルド、プロジェクトファイルを開くにはこのディレクトリよりコマンドを実行してください。

## Testing with the Bitrise CLI　Bitrise CLIを使用したテスト

After doing a full clean git clone, run a build locally, using the [Bitrise CLI](https://www.bitrise.io/cli).

git cloneのフルスクリーンが終了したら、[Bitrise CLI](https://www.bitrise.io/cli)を使ってビルドをローカルで実行します。

1. [Install the Bitrise CLI](/jp/bitrise-cli/installation/).
2. [Download](/jp/builds/bitrise-yml-online/) your app’s `bitrise.yml` file from [bitrise.io](https://www.bitrise.io/).
3. Run the build with: `bitrise run <workflow-name>` (for example, `bitrise run primary`).
4. [Bitrise CLI](/jp/bitrise-cli/installation/)をダウンロードします。
5. [bitrise.io](https://www.bitrise.io/)よりご自身のアプリの`bitrise.yml`ファイルを[ダウンロード](/jp/builds/bitrise-yml-online/)します。
6. ビルドを `bitrise run <workflow-name>` (例: `bitrise run primary`)を使って実行します。

This should help reproducing the issues in most cases, and allows you to attempt to debug them on your own machine.

If the build succeeds under these conditions but still fails on Bitrise, contact our support!

この方法は、ほとんどのケースでの問題の再現化に役立ちます。また、自分のマシンで問題のデバッグの処理を許可します。

これでもなおBitriseでビルドが失敗する場合は、サポートまでご連絡ください！

{% include message_box.html type="important" title="Running iOS tests　iOSテストの実行" content="

* Make sure that you run the tests in the same simulator as the one [bitrise.io](http://bitrise.io/) runs. If you use the Bitrise CLI to run the tests locally this is not required, that uses the same configuration.
* If you’re debugging an iOS unit/UI test issue, please make sure to **reset the iOS Simulator** (in the Simulator app, select the **Simulator** menu bar item -> then **Reset Content and Setting**).
* [bitrise.io](http://bitrise.io/)が実行している同じシミュレータでテストを行うようにしてください。但し、ローカルでテストを実行するのにBitrise CLIを使用している場合は例外です。
* iOSのユニットテストまたはUIテストのデバッグをする際は、iOSシミュレータのリセットを行う必要があります (シミュレータアプリの場合、**Simulator**のメニューバーアイテム、**Reset Content and Setting**の順に選択してください。"%}

{% include message_box.html type="important" title="Android projects　Androidプロジェクト" content="If you still can’t reproduce the issue locally, you might also want to delete the `$HOME/.gradle` (hidden) directory, to clear your Gradle caches. (Quick Terminal / Command Line command: `rm -rf $HOME/.gradle`)

ローカルでの問題の再現化ができない際に、??? (hidden) ディレクトリを消去したい場合、Gradleキャッシュをクリアします。(Quick Terminal / Command Line command: `rm -rf $HOME/.gradle`)"%}

## Using the Android/Linux environment locally

If your project uses the Android/Linux environment, you can download and use the exact same environment as the one your build is running in on [bitrise.io](https://www.bitrise.io/).

[Follow our guide](/docker/run-your-build-locally-in-docker/) to make it work!

{% include message_box.html type="info" title="Run docker from a clean git clone" content="Ideally, you should first do a **clean git clone** and run `docker` from there, so that files which are in your `.gitignore` won’t affect the build, and the build can run the the same way as on [bitrise.io](https://www.bitrise.io/)."%}