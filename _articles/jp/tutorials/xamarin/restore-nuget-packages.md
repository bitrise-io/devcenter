---
title: NuGetパッケージの復元
redirect_from:
- "/xamarin/restore-nuget-packages"
menu:
  xamarin:
    weight: 2
---
[NuGet](https://www.nuget.org/)パッケージを復元するためには、
[bitrise.io](https://www.bitrise.io)のページで自身のアプリのページに行き、
ワークフローエディタを開くために`WorkFlow`タブを選択してください。

ワークフローにおいて、`Git Clone` ステップの後に`NuGet Restore`ステップを追加してください。
アプリを追加する際に, デフォルトでは自身が指定したソリューションファイルを使うようになります。
もし必要であれば, 簡単に修正することも可能です。
