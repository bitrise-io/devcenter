---
title: Code signing iOS frameworks
menu:
  ios-code-signing:
    weight: 22

---
## Developing iOS frameworks

When you are developing an iOS framework you have to distribute a code signed version of your framework, however you don't need to sign it with your `Distribution` profile, the `Developer` profile will be enough.
After distribution the framework will be re-codesigned by the frameworks' consumer during the code signing process.

If you attempt to build it without code signing Xcode won't produce a `.framework` file and you will receive the following error:

    CodeSign error: code signing is required for product type 'Framework' in SDK 'iOS 10.2'

<div class="banner">
	<img src="/assets/images/banner-bg-888x170.png" style="border: none;">
	<div class="deploy-text">Now you know everything</div>
	<a target="_blank" href="https://app.bitrise.io/dashboard/builds"><button class="button">Go to Bitrise now</button></a>
</div>