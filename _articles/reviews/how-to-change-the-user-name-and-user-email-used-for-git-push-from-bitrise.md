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

## Changing the default Git username and email address

If you want to "push back" (`git push`) your changes to the one of our Stack's repository, you have to **set your own user name and the email address of your commit.** Here is how to do it!

1. Add a `Script` step as the very first step in your workflow. Make sure the Step comes first before you'd `git commit` in Terminal.
2. Add the following to the `Script input` field and insert your own user name and email to the respective fields:

       git config --global user.name "User Name"
       git config --global user.email "email-for-the-commit@domain.com"