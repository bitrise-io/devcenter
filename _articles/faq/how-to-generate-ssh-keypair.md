---
title: How can I generate an SSH key pair?
menu:
  faq:
    weight: 4

---
If you want to do manual SSH key configuration on [bitrise.io](https://www.bitrise.io)
you can generate an appropriate SSH keypair with a simple Command Line / Terminal command:

    ssh-keygen -t rsa -b 4096 -P '' -f ./bitrise-ssh

{% include message_box.html type="info" title="Mojave issues" content="If you are on the Mojave OS, and having difficulties with the above command, use the following: 

`ssh-keygen -t rsa -b 4096 -P '' -f ./bitrise-ssh -m PEM` "%} 

This will generate two files in the current directory (the directory where
you run the command):

* `bitrise-ssh` (private key)
* `bitrise-ssh.pub` (public key)

You should copy paste the **public key** to your Git hosting service (GitHub, Bitbucket, etc.),
and when you register your app on [bitrise.io](https://www.bitrise.io)
you'll have to provide the **private key**.