---
title: Detox testing - draft
redirect_from: []
date: 2019-02-20 14:19:03 +0000
published: false

---
Detox is a gray box end-to-end tests and automation library for mobile apps. Currently, it is only supported for iOS apps built with React Native. If you have a React Native app for iOS on Bitrise, you can run Detox tests. 

To see an example configuration, check out [our sample app](https://github.com/bitrise-samples/sample-project-react-native)!

Running Detox requires:

* A Mac with a macOS (El Capitan 10.11 or newer version).
* Xcode 8.3 or newer version with Xcode command line tools.
* A working React Native app.

Test an app on Bitrise, using Detox:

1. [Install and configure Detox](https://github.com/wix/detox/blob/master/docs/Introduction.GettingStarted.md#getting-started). 

   You will need to install Homebrew, Node.js and applesimutils, as well as the Detox command line tools. 
2. 