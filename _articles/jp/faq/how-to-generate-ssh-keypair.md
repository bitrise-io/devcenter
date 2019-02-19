---
title: SSHキーペアの生成方法を教えてください。
menu:
  faq:
    weight: 4
---
[Bitrise](https://www.bitrise.io)上で手動でSSHキーの設定を行う場合には、コマンドライン/ターミナルで以下のコマンドを実行することでSSHキーペアを生成できます。

```
ssh-keygen -t rsa -b 4096 -P '' -f ./bitrise-ssh
```

これにより、カレントディレクトリ(コマンドを実行したディレクトリ)内に以下の２つのファイルが生成されます。

- `bitrise-ssh` (秘密鍵)
- `bitrise-ssh.pub` (公開鍵)


生成された__公開鍵__をGitホスティングサービス(GitHubやBitbucketなど)にコピー＆ペーストしてください。
また、[Bitrise](https://www.bitrise.io)にアプリを登録する際には、__秘密鍵__を提供する必要があります。
