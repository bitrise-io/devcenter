---
tag: []
title: 特定のコミットやプルリクエストをスキップする (Skipping a given commit or pull request)
redirect_from: []
summary: ''
published: false

---
Depending on your [settings](/builds/triggering-builds/triggering-builds/), every code change in your repository can trigger Bitrise builds. However, if you need to, you can skip a specific commit or pull request. Skipping means, in this context, that a code change will NOT trigger a build on Bitrise, even if the triggers are set up to do so.

ご自身の設定に応じて、レポジトリ内の全てのコード変更はBitriseビルドのトリガーが可能です。けれども、必要であれば、特定のコミットやプルリクエストをスキップすることができます。スキップとは、トリガーがビルドするように設定されていても、コード変更によってビルドが開始**されない**ようになることです。

## Skipping a commit　コミットのスキップ

To make sure a specific commit does not trigger a build, include either `[skip ci]` or `[ci skip]` in the commit message:

指定のコミットがビルドのトリガーを実行させないようにするには、commit messageに`[skip ci]`または`[ci skip]`のどちらかを含ませます：

    This is not important, please [skip ci]

または：

    I just changed the README
    
    [ci skip]

{% include message_box.html type="warning" title="Only the head/last commit message is checked!　ヘッドまたは最後のcommit messageのみがチェックされます！" content="**If you push more than one commit**, only the last (head) commit's message will be checked for the `skip ci` pattern! 

一つ以上のコミットをプッシュする場合、最後の (ヘッド) コミットのメッセージのみが`skip ci`パターンをチェックします！"%}

If you do want to start a build after all, you have two choices:

最終的にビルドを開始させたい場合、2つの選択肢があります：

* rebase the commit (change the commit message)
* push another commit.
* コミットのリベース (commit messageの変更)
* ほかのコミットのプッシュ

{% include message_box.html type="note" title="Push an empty commit　空のコミットをプッシュする" content=" Git allows to create and push empty commits. If you want to build a skipped build you can do `git commit --allow-empty -m \"I decided to run this\"` on the related branch and push the commit.

Gitは空のコミットを作成しプッシュするのを許可します。スキップ済みビルドのビルドを実行する場合、関連するブランチで`git commit --allow-empty -m \"I decided to run this\"` を行いコミットをプッシュします。"%}

## Skipping a Pull Request　プルリクエストのスキップ

Pull Requests are treated as (virtual) commits themselves, where the commit message is the title + description of the Pull Request**.** It is not the commit messages of the individual commits that make up the PR!

プルリクエストは (仮想) コミットとして扱われます。commit messageにはプルリクエストのtitle + descriptionが入っています。これはPRを作成する個々のコミットのcommit messageではありません！

If you want to skip a pull request, you have to include the `skip ci` pattern in the Pull Request's title or description, and not in the commit's message!

プルリクエストのスキップを行うには、プルリクエストのtitleまたはdescriptionに`skip ci`パターンを含ませる必要があります。commit messageに含ませないでください！

**Once you decide to not to skip the Pull Request / more commits in the pull request** you can simply remove the `skip ci` pattern from the Pull Request's title or description. This should automatically trigger a new build with the latest commit, and all future commits of the PR will be built too (unless you add a `skip ci` pattern again).

プルリクエストのスキップを行わない / プルリクエストにより多くのコミットを含ませるのであれば、プルリクエストのtitleまたはdescriptionから`skip ci`パターンを削除してください。これにより最新のコミットで新規のビルドが自動的にトリガーされるようになり、(再度`skip ci`パターンを追加しない限り) PRの今後の全てのコミットもビルドされるようになります。