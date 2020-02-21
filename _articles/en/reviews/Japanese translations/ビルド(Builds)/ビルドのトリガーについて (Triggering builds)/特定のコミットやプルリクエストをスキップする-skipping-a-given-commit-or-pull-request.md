---
tag: []
title: 特定のコミットやプルリクエストをスキップする (Skipping a given commit or pull request)
redirect_from: []
description: ''
published: false

---
ご自身の[設定](/jp/builds/triggering-builds/triggering-builds/)に応じて、レポジトリ内の全てのコード変更はBitriseビルドのトリガーが可能です。しかし必要であれば、特定のコミットやプルリクエストをスキップすることができます。スキップとは、トリガーがビルドするように設定されていても、コード変更によってビルドが開始**されない**ようにすることです。

## コミットのスキップ

指定のコミットがビルドのトリガーを実行させないようにするには、commit messageに`[skip ci]`または`[ci skip]`のどちらかを含ませます：

    This is not important, please [skip ci]

または：

    I just changed the README
    
    [ci skip]

{% include message_box.html type="warning" title="最後の (ヘッド) commit messageのみがチェックされます！" content="**一つ以上のコミットをプッシュする場合**、最後の (ヘッド) コミットのメッセージのみが`skip ci`パターンをチェックします！"%}

最終的にビルドを開始させたい場合、2つの選択肢があります：

* コミットのリベース (commit messageの変更)
* ほかのコミットのプッシュ

{% include message_box.html type="note" title="空のコミットをプッシュする" content=" Gitは空のコミットを作成しプッシュするのを許可します。スキップ済みビルドのビルドを実行する場合、関連するブランチで`git commit --allow-empty -m \"I decided to run this\"` を行いコミットをプッシュします。"%}

## プルリクエストのスキップ

プルリクエストは (仮想) コミットとして扱われます。commit messageにはプルリクエストのtitleとdescriptionが入っています。これはPRを作成するコミットそれぞれのcommit messageではありません！

プルリクエストのスキップを行うには、プルリクエストのtitleまたはdescriptionに`skip ci`パターンを含ませる必要があります。commit messageには含ませないでください！

**プルリクエストのスキップを行わない / プルリクエストにより多くのコミットを含ませるのであれば**、プルリクエストのtitleまたはdescriptionから`skip ci`パターンを削除してください。これにより最新のコミットで新規のビルドが自動的にトリガーされるようになり、(再度`skip ci`パターンを追加しない限り) 今後全てのPRのコミットがビルドされるようになります。