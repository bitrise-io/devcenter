---
changelog:
last_modified_at:
tag: []
title: パスワードのリセット (Resetting your password)
redirect_from: []
description: ''
published: false

---
いろいろな方法でBitriseにログインすることが可能です：

* Bitriseのユーザーネームとパスワードの使用
* GitHub/GitLab/Bitbucketアカウントの使用
* ([SAML SSO]()がご自身のBitrise組織に設定・施行されている場合のみ) Bitrise組織名の使用

## パスワードのリセット

ログインを試みたが、パスワードを忘れてしまった場合：

1. [ログインページ](https://app.bitrise.io/users/sign_in)から**Forgot your password**をクリック
2. ご自身の**メールアドレス**またか**ユーザーネーム**を入力すると、パスワードのリカバリーリンクがメールアドレス宛に送信されます。
3. letsconnectより送信された**Reset password instructions**を受信ボックスで確認します。
4. **Reset Password**をクリックするか、ブラウザへURLをコピーします。
5. 新しいパスワードを入力し**Save**を押します。
6. パスワードの変更が完了したら、**Log in**をクリックしログインページにアクセスします。
7. **ユーザーネーム**と新しい**パスワード**を入力しBitrise Dashboardにログインします。

**Account settings**では、パスワードや他のアカウントの詳細をいつでも変更することが可能です。

## ログイン時の問題

3回連続でログインを失敗すると、[reCAPTCHA](https://developers.google.com/recaptcha/)が有効化され、人間による操作であるかどうかを認証します。

一定回数以上ログインを失敗すると、自動的にアカウントはロックされます。メールの受信ボックスに**Unlock Instructions**のメールが届いているか確認して、指示に従ってください。

![{{ page.title }}](/img/lockedout.png)