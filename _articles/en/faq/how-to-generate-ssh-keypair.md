---
title: How can I generate an SSH key pair?
tag:
- ssh
- faq
- git
description: If you want to do manual SSH key configuration on bitrise.io, you can
  generate an appropriate SSH keypair with a simple Command Line / Terminal command.
redirect_from: []
menu:
  faq:
    weight: 7

---
If you want to do manual SSH key configuration on [bitrise.io](https://www.bitrise.io), you can generate an appropriate SSH keypair with a simple Command Line / Terminal command:

    ssh-keygen -t rsa -b 4096 -P '' -f ./bitrise-ssh -m PEM

This will generate two files in the current directory (the directory where
you run the command):

* `bitrise-ssh` (private key)
* `bitrise-ssh.pub` (public key)

You should copy paste the **public key** to your Git hosting service (GitHub, Bitbucket, etc.),
and when you register your app on [bitrise.io](https://www.bitrise.io), you'll have to provide the **private key**.

{% include banner.html banner_text="Now you know everything" url="https://app.bitrise.io/users/sign_up?utm_source=devcenter&utm_medium=bottom_cta" button_text="Go to Bitrise now" %}