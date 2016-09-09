If you want to do manual SSH key configuration on [bitrise.io](https://www.bitrise.io)
you can generate an appropriate SSH keypair with a simple Command Line / Terminal command:

```
ssh-keygen -t rsa -b 4096 -P '' -f ./bitrise-ssh
```

This will generate two files in the current directory (the directory where
you run the command):

- `bitrise-ssh` (private key)
- `bitrise-ssh.pub` (public key)

You should copy paste the __public key__ to your Git hosting service (GitHub, Bitbucket, etc.),
and when you register your app on [bitrise.io](https://www.bitrise.io)
you'll have to provide the __private key__.
