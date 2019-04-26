---
title: ビルドマシンでGitの認証情報を設定
redirect_from: []
date: 2019-02-21 15:27:32 +0000
menu:
  builds:
    weight: 23

---
スタックのデフォルトGitユーザー名とユーザーのメールアドレスは以下のとおりです：

    git config --global user.email "please-set-your-email@bitrise.io"
    git config --global user.name "J. Doe (https://www.git-tower.com/learn/git/faq/change-author-name-email)"

**ビルドの実行中**にBitriseからリポジトリへのコミットを「プッシュバック」（`git push`）したい場合は、**自分のユーザ名と電子メールアドレスを設定する**必要があります。　　　　　方法は以下のとおりです：

1. `git commit`前に、ワークフローの最初のステップとして`Script`ステップを追加する必要があります。現在のビルドに加えた変更が、ユーザー名と電子メールアドレスに関連しているコミットに添付することを確認できます。
2. `Script input`フィールドに以下のスクリプトを追加し、それぞれのフィールドに独自のユーザー名と電子メールアドレスを入力します：

   git config --global user.name "User Name" git config --global user.email "email-for-the-commit@domain.com"
3. ビルドを開始します。

全て順調に進んだ場合、Gitプロバイダーのリポジトリ変更を確認する必要があります。新しいユーザー名とEメールアドレスは、ビルドからGithubにプッシュする今後すべてのコミットに対して表示されます。