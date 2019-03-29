---
title: Logging in to Bitrise
redirect_from: []
date: 2019-03-29 10:34:18 +0000
published: false

---
## Logging in

You can log into Bitrise in many ways:

* with your Bitrise username and password
* with your Gitlab/Github/Bitbucket account
* with your Bitrise organization name if SAML SSO has been set up to and enforced on it your Bitrise organization

## Resetting your password

If trying to log in but you forgot your password:

1. Click on `Forgot your password` on our [Login page](https://app.bitrise.io/users/sign_in).
2. Provide your email address or username so that we know where to send password recovery link.

   ![](/img/forgot-your-password.jpg)
3. Check your inbox for the `Reset password instructions` sent by letsconnect.
4. Click `Reset Password` or copy the URL into your browser.

   ![](/img/reset-password2.jpg)

5. 

## Issues with Logging in

If you failed to log in for the third time, [reCAPTCHA](https://developers.google.com/recaptcha/) will get enabled to check if you are a human.

If you failed to log in for an excessive amount of attempts, you will automatically get locked out. Check your inbox for our `Unlock Instructions` email!

![](/img/lockedout.png)

{% include message_box.html type="info" title="Sign up with a git provider" content=" If you would like to use your GitHub/Gitlab/ Bitbucket account, please check out the following DevCenter articles:

* [Signing up with GitHub](/getting-started/signing-up/signing-up-with-github)
* [Signing up with Gitlab](/getting-started/signing-up/signing-up-with-gitlab/)
* [Signing up with Bitbucket](/getting-started/signing-up/signing-up-with-bitbucket) " %}

  Please note that you must provide a strong password which fulfills the following requirements:
  * it should have at least 12 characters
  * at least one upper case character
  * at least one lower case character
  * at least one number
  * can not contain the same character more than 3 times in a row (aaa)
  * cannot be alphabetical order or reverse order (abcd, dcba)
  * cannot be numerical order or reverse order (1234, 4321)