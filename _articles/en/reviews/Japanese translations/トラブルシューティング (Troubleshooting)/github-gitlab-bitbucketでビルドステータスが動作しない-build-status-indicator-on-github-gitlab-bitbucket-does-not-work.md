---
changelog:
last_modified_at:
tag: []
title: GitHub/GitLab/Bitbucketでビルドステータスが動作しない (Build status indicator on GitHub/GitLab/Bitbucket
  does not work)
redirect_from: []
description: ''
published: false

---
ビルドがご自身のgitホスティングプロバイダ (GitHub, GitLab, Bitbucket) にステータスレポートを送信しない場合、問題解決に向け少し調査を行う必要があります。解決が可能な対処方法は以下のとおりです！

## Service credential Userの確認

[bitrise.io](https://www.bitrise.io)上のアプリの**Service credential User**は、gitホスティングプロバイダに接続済みアカウントを保持している必要があります。

1. [bitrise.io](https://www.bitrise.io)のアプリのページへ進みます。
2. `Team`タブをクリックします。
3. `Service credential User`メニューを探してください。デフォルトでは、アプリのオーナーはService credential Userになっています。
4. Service credential Userのアカウントの`Account Settings page`を確認します。

左側に**Connected Accounts** (接続済みアカウント)のセクションがあるので、そこから[bitrise.io](https://www.bitrise.io)のアカウントへ他のサービス (GitHub, BitbucketやGitLabなど)の接続・切断が可能です。 

{% include message_box.html type="important" title="適切なアカウントと接続していますか？" content=" 特定のサービスのアカウントを2つ以上お持ちの場合、レポジトリへのアクセスが可能なアカウントに接続されているか確認する必要があります。[bitrise.io](https://www.bitrise.io)上の[Account Settings](https://www.bitrise.io/me/profile)ページにあるサービスプロバイダ名をクリックすると、どのユーザーと接続されているか確認することができます。ご自身のgitホスティングプロバイダのウェブサイト上に接続済みユーザーのページが表示されます。"%}

{% include message_box.html type="important" title="管理者 (Admin) の権限" content=" Service credential Userは、レポジトリへの管理の権限を保持しています。gitホスティングプロバイダのウェブサイト上にある、レポジトリ設定から確認してください。"%}

## レポジトリのアクセス許可とレポジトリURLの確認

* **ご自身のWorkspace (組織)またはTeam (チーム) へBitriseのアクセスを許可しているかどうか確認してください**。Bitriseへアクセスの許可を認可していない、またはレポジトリを保持するGitHub organizationやBitbucket teamへの**アクセスを拒否している**可能性があります。更に詳しい情報は[GitHub Organizationへアクセスの許可](/jp/faq/grant-access-to-github-organization)と[Bitbucket Teamへアクセスの許可](/jp/faq/grant-access-to-bitbucket-team)のページを参照してください。
* **レポジトリのURLが最新であることを確認してください**。[bitrise.io](https://www.bitrise.io)のアプリの`Settings`タブへ進み、`Repository URL`がレポジトリの現在のロケーションを指しているかどうかチェックします。例えば、もしご自身のレポジトリをリネームしたり、違う場所へ移動させた場合、ステータスレポートは失敗します。