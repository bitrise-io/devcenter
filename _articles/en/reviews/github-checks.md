---
tag: []
title: GitHub Checks
redirect_from: []
summary: ''
published: false

---
## About GitHub Checks

Bitrise's GitHub Checks is an integrated tool to provide an extended version of the classic status checks we send back to GitHub once a build has run. With the GitHub Checks toggle enabled you can have access to a more detailed summary of the CI run results and annotate lines in the code that has some issues/errors. 

![](/img/bitrise-summary-gh-checks.jpg)

* public beta version/release of
* first iteration of this feature we post the same Bitrise build summary that you can find at the bottom of the logs. no annotations just yet?

* Please note that only Organization owners can enable the GitHub Checks toggle on the **Settings** page of the app.(org owners and users with push access?)

How to enable it: (only for repos hosted on github.com, obviously)

1\. As an admin of the app, you should visit the settings page (you can use this app to try it out feel free to switch it on-off) [https://app.bitrise.io/app/21c5f1e1c7fdecf1#/settings](https://app.bitrise.io/app/21c5f1e1c7fdecf1#/settings "https://app.bitrise.io/app/21c5f1e1c7fdecf1#/settings"))

2\. Follow the link in the description of the switch to install our GitHub app to your repo in GitHub (once we make it public, you can create screenshots of it, now it's already installed to Bitrise org)

3\. Switch it on.

Whenever we send status updates, we will send them via Checks updates.

Can you see this?

[https://github.com/bitrise-io/github-checks-demo/pull/2/checks?check_run_id=164498708](https://github.com/bitrise-io/github-checks-demo/pull/2/checks?check_run_id=164498708 "https://github.com/bitrise-io/github-checks-demo/pull/2/checks?check_run_id=164498708") (edited