---
title: Android/Linux/Docker 環境
menu:
  infrastructure-main:
    weight: 5

---
## ハードウェア

現在のハードウェアの仕様は以下のとおりです

* 最低 7.5GB RAM
* 最低 2 CPU コア
* 64bit CPU
* 最低10GBの空きディスクスペース

## 環境

Bitriseは[Quay](https://quay.io/organization/bitriseio)上で発行された標準の[Docker](https://quay.io)イメージと[GitHub](https://github.com/bitrise-docker)にある関連した`Dockerfile`を使用します。

{% include message_box.html type="note" title="Dockerfileとは何ですか?" content=" `Dockerfile`とはdockerにおいてのイメージ・環境が記載されており、イメージをビルドするのに直接使用される記述ファイルです。" %}

Right now we have four docker images, built on top of each other:

Bitriseには現時点で4つのdockerイメージがあります。

### Bitrise ベース・イメージ（[GitHub](https://github.com/bitrise-docker/bitrise-base)/[Quay](https://quay.io/repository/bitriseio/bitrise-base)）

* イメージネームID：`quay.io/bitriseio/bitrise-base`
* 全ての**Android以外のツールと環境構成**が含まれています。
* これは最も小さいイメージであるため、ローカルで使用される場合は、ベース・イメージとしてAndroid以外のプロジェクトに使用されるのが望ましいです。
* `Ruby`、 `Go`、 `Python`、 `git` と Bitrise[コマンドラインツール](https://www.bitrise.io/cli)が全てプリインストールされており、いつでも使用可能です。
* OS：`Ubuntu 16.04`,、64 ビット
* 関連した`Dockerfile`を[チェック](https://github.com/bitrise-docker/bitrise-base/blob/master/Dockerfile)して、このイメージ内にプリインストールされているツールをご確認ください。

### ベースAndroidイメージ([GitHub](https://github.com/bitrise-docker/android) / [Quay](https://quay.io/repository/bitriseio/android))

* イメージネームID：`quay.io/bitriseio/android`
* Androidに特化したツール・環境を使って**Bitriseベースイメージを拡張します**。
* `gradle` や `maven` と同様に、ビルドツールやシステムイメージバージョンといった複数のAndroid SDKがプリインストールされています。
* `$ANDROID_HOME` の環境変数を使用して、プリインストールされたAndroid SDKの場所を示すことができます。
* 関連した`Dockerfile`を[チェック](https://github.com/bitrise-docker/bitrise-base/blob/master/Dockerfile)すれば、このイメージ内に何がプリインストールされているか確認できます。

### Android NDKイメージ ([GitHub](https://github.com/bitrise-docker/android-ndk) / [Quay](https://quay.io/repository/bitriseio/android-ndk))

* イメージネームID：`quay.io/bitriseio/android-ndk`
* **ベースAndroidイメージ上にてビルドされ**、最新のAndroid NDKに拡張します。
* `$ANDROID_NDK_HOME` の環境変数を使用して、プリインストールされたAndroid NDKの場所を示すことができ、`$PATH` へ追加もされます。
* 関連した`Dockerfile`を[チェック](https://github.com/bitrise-docker/bitrise-base/blob/master/Dockerfile)して、このイメージ内に何がプリインストールされているか確認できます。
* [こちら](https://github.com/bitrise-io/bitrise.io/blob/master/system_reports/linux-docker-android.log)でこのスタックのプリインストール済みツールとシステムレポートが確認できます。

### Android NDK LTS イメージ ([GitHub](https://github.com/bitrise-docker/android-ndk-lts) / [Quay](https://quay.io/repository/bitriseio/android-ndk-lts))

* イメージネームID：`quay.io/bitriseio/android-ndk-lts`
* このイメージは、常に**古いAndroid NDKイメージのタグ付されたバージョン**になります。
* `$ANDROID_NDK_HOME` の環境変数を使用して、プリインストールされたAndroid NDKの場所を示すことができ、`$PATH` へ追加もされます。
* OS：Ubuntu16.04、64ビット
* [こちら](https://github.com/bitrise-io/bitrise.io/blob/master/system_reports/linux-docker-android-lts.log)でこのスタックのプリインストール済みツールとシステムレポートが確認できます。

## Docker と 仮想マシン

新しいコンテナ上だけでなく、**新しい仮想マシン上でも全てのビルドが走行されます**。その仮想マシンはビルド終了後すぐに破壊されます。これは`Docker`と環境全体のフル管理を提供します。

スタックに基づいたDocker上でビルドを開始する際、あなたのコンテナへ`/var/run/docker.sock` ソケットをボリュームマウントします。 (`docker run -v /var/run/docker.sock:/var/run/docker.sock ...`の呼び出し方に類似しています。 このアクセスの付与についての方法は[こちら](https://jpetazzo.github.io/2015/09/03/do-not-use-docker-in-docker-for-ci/)にて確認できます。）

{% include message_box.html type="note" title="Dockerバイナリのインストール" content=" `docker`バイナリはベースDockerイメージ内にてインストールされている必要があります。Dockerはシングルバイナリソリューションから装填された構成への移動が開始され、`docker`バイナリを単にシェアするだけでは不十分だからです。

BitriseがDockerイメージ一つ一つにDockerをインストールするので、Bitriseのイメージを使用する、またはBitriseのDockerイメージ上にご自身のイメージを基礎づける場合は何もする必要がありません。"%}

これであなたはコンテナ内で`docker`にアクセスができ、[docker-compose](https://docs.docker.com/compose)のようなdockerを使用する他のツールを使うことができます。例えば、`docker-compose`を使用するウェブサイトプロジェクトの設計やテスト走行、他の自動化された作業が可能となります。

`docker info`, `docker build`, `docker run`, `docker login`, `docker push` をご自身のマシンに呼び出すことができ、正確に行うことができます。

### 共有ボリューム

{% include message_box.html type="warning" title="ビルド内での`docker`の走らせ方とボリュームの共有" content="あなたのビルド内で`docker`を走らせたりボリュームを共有する場合、ベースDockerコンテナ（ビルドが動作しているコンテナ）を使って共有されたボリュームのみが共有されます。これは`docker`によるボリューム共有の処理方法からなります。`/bitrise` 以下の全てのものがボリュームとしてマウントされますが、`--volume` マッピングを使用した他のパスでは保証されません。"%}

これはボリュームマウントするうえで、標準のパスや関連したパスを使用する場合、デフォルトのソースコードディレクトリが`/bitrise`内に位置していると動作します（BitriseのDockerイメージ内はデフォルトで`/bitrise/src`になっています）。

ソースコードディレクトリを`/bitrise` の**外部**に変更したり、`/bitrise`の外部に絶対パスを使用したフォルダのマウントを行いたい場合、**動作しません**。