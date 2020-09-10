---
changelog: 
last_modified_at: 
tag: []
title: Infrastructure
redirect_from: []
description: ''
menu:
  main:
    identifier: infrastructure-main
    weight: 6

---
Bitriseはプラットフォームであり、何もダウンロードする必要がなく、自分のコンピュータやサーバーで実行する必要もありません。

つまり、Infrastructureについても心配する必要はありません。メンテナンスやツール、仮想化は私たちの仕事であり、私たちの関心ごとです。

## 仮想マシン

Bitriseでは、仮想マシン(VM)を使用してビルドを実行します。すべてのビルドは新しいVMで実行され、それぞれのVMはビルドが完了するとすぐに破棄されます。

**詳細**

* [仮想マシン](/jp/infrastructure/virtual-machines/)

## 利用可能なスタック

スタックは、ビルドの実行に使用する仮想マシンの種類です。たとえば、ネイティブiOSアプリにはXcodeスタックが最適です。スタックには必要なすべてのツールがプリインストールされており、定期的に更新され、すべてのニーズに対応できるようになっています。

**詳細**

* [利用可能なスタック](/jp/infrastructure/available-stacks/)
* [スタックの更新と削除ポリシー](/jp/infrastructure/stack-update-and-removal-policy/)
* [Android/Linux/Docker 環境](/jp/infrastructure/the-environment/)