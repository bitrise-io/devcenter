---
title: How to change the user.name and user.email used for git push from Bitrise
redirect_from: []
date: 2019-02-14 14:58:07 +0000
published: false

---
The default Git username and user email address on our Stacks are the following:

    git config --global user.email "please-set-your-email@bitrise.io"
    git config --global user.name "J. Doe (https://www.git-tower.com/learn/git/faq/change-author-name-email)"

Due to the `--global` flag, all commits to the Stacks have the above default author information.

## Setting your Git username and email address for every repository on your computer

If you want to "push back"  (`git push`) any changes to your own repo from Bitrise **while running your build**, you have to **set your own username and the email address**. Here is how to do it!

1. Add a `Script` step as the very first step in your workflow. The Step has to come first before you'd `git commit` in Terminal. This way you can make sure any changes you make to the current build will be attached to a commit associated with your username and email address.
2. Add the following to the `Script input` field and insert your own user name and email to the respective fields:

       git config --global user.name "User Name"
       git config --global user.email "email-for-the-commit@domain.com"

	Due to the `--global` flag, all future commits you push will affect all your repositories in your local computer.

3. Start a build.

If all went well, you should see the changes in your repository in your Git provider. The new username and email address will be visible for all future commits you pushed from the Terminal to github.