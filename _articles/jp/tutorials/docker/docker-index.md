---
changelog: 
last_modified_at: 
title: Docker
redirect_from: "/jp/tutorials/docker/index/"
menu:
  tutorials-main:
    identifier: docker
    weight: 3

---
[Docker](www.docker.com/)は、カスタム環境を作成、使用、および共有するだけでなく、一時的な環境でビルドを実行するための軽量な方法を提供する理想的なツールです。（ビルド後に環境が削除され、次のビルドの開始時に新しい環境が作成される）

残念ながら、Dockerは今のところLinuxゲストシステムの実行にしか使用できません。 Windows Server 2016以降、Windows Dockerコンテナ（ゲストシステム）を実行できるようになりました。ですが、実行できるのはWindows Server 2016およびAnniversary Updateを搭載したWindows 10のみです。

DockerはLinux、macOS、およびWindowsにインストールできますが、それが実行する環境（コンテナ）はLinux（およびWindows Server 2016、およびAnniversary Updateを搭載したWindows 10）のみです。 Linuxコンテナ（ゲスト）は `docker`をインストールできるすべてのプラットフォーム（Linux、Windows、macOSなど）で動作します。

このため、Android/Linux環境はdockerイメージとして提供されますが、macOSスタックは提供されません。

## Linux/Androidスタック

私たちのLinux/Androidスタックは `docker`を完全にサポートしています。 これはビルド中に任意の `docker`コマンドを実行できることを意味します。 ビルドがLinux/Androidスタックで実行されると、そのビルドは実際にはdockerコンテナの中で実行されます。 ただし、セキュリティ上の理由から、すべてのLinux/Androidビルドには独自の仮想マシンも用意されており、ビルドはその仮想マシン内のdockerコンテナで実行されます。

## カスタムdockerイメージを設定する

アプリのワークフローエディタの `Stack`タブでLinux/Androidのスタックを選択すれば、ビルド用に[カスタムdockerイメージを設定](/jp/tutorials/docker/use-your-own-docker-image/)することができます。 ただし、ほとんどの場合このイメージは変更しないでください。 代わりにビルド中に `script`ステップを使って`docker`コマンドを実行するべきです。