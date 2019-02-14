---
title: How to change the user.name and user.email used for git push from Bitrise
redirect_from: []
date: 2019-02-14 14:58:07 +0000
published: false

---

The default user name and user email on our [Base Bitrise Docker Image](https://github.com/bitrise-docker/bitrise-base) is the following:

    git config --global user.email "please-set-your-email@bitrise.io"
    git config --global user.name "J. Doe (https://www.git-tower.com/learn/git/faq/change-author-name-email)

This means that all future commits have the above default user information (due to the `--global` flag).

If you want to change the user name and user email of a commit related to our Base Bitrise Docker image (because you want to push back to the repository), follow this short tutorial:

1. Add a `Script` step as the very first step in your workflow. Make sure the Step comes first before you'd `git commit`.)
2. With the following content:

       git config --global user.name "User Name"
       git config --global user.email "email-for-the-commit@domain.com"

* would we change the user name/email before or after the commit? i think after right.