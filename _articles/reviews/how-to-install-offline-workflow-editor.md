---
title: How to install offline Workflow Editor
date: 2018-11-27 12:37:24 +0000
redirect_from: []
published: false

---
Bitrise Workflow Editor is designed in such a way that you can run it offline on your Mac/PC without having to sign into [https://www.bitrise.io/](). The Workflow Editor is open source, you can find its repository here. We encourage you to join the discussion around Workflow Editor.

1. Install [Go](https://golang.org/) by `brew install go`(on macOS)
2. Install the latest [Bitrise CLI](https://www.bitrise.io/cli) - it's a single binary command line tool
3. Run `bitrise setup` just to be sure everything's prepared
4. `cd` into a directory where you have your `bitrise.yml`, and run: `bitrise :workflow-editor`