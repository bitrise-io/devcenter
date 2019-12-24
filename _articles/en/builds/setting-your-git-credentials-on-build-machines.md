---
title: Setting your Git credentials on build machines
redirect_from: []
date: '2019-02-21T15:27:32.000+00:00'
tag:
- git
- builds
summary: 'Set your own username and e-mail address for git commands on Bitrise. You
  can set it globally so all future commits will be made using the provided user information. '
menu:
  builds-main:
    weight: 25

---
The default Git username and user email address on our Stacks are the following:

    git config --global user.email "please-set-your-email@bitrise.io"
    git config --global user.name "J. Doe (https://www.git-tower.com/learn/git/faq/change-author-name-email)"

If you want to push back  (`git push`) any commits to your own repo from Bitrise **while running your build**, you have to **set your own username and the email address**. Here is how to do it!

1. Add a **Set Git Credentials** Step as the very first step in your workflow. The Step has to come first before you'd `git commit`. This way you can make sure any changes you make to the current build will be attached to a commit associated with your username and email address.
2. In the **Git Username** field, set the value to your own user name.
3. In the **Git Email Address** field, set the value to your own email address.
4. [Start a build.](/builds/Starting-builds-manually/)

If all went well, you should see the changes in your repository in your Git provider. The new username and email address will be visible for all future commits you push from your builds to Github.

<div class="banner">
<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
<div class="deploy-text">Set your Git credentials</div>
<a target="_blank" href="https://app.bitrise.io/dashboard/builds"><button class="button">Go to your app</button></a>
</div>
