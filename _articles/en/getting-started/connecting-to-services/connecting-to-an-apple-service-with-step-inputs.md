---
tag:
- apple
- builds
- code-signing
- security
title: Connecting to an Apple Service with Step inputs
redirect_from: []
summary: ''
menu:
  connecting-to-services:
    weight: 6
    title: Connecting to an Apple service with Step inputs

---
If you wish to deploy to multiple teams or deploy to a team where authentication is different from the connected one you’ve been using, then you can add your preferred authentication into the Step’s inputs. This will override the connection previously set in Bitrise Developer Connection.

This way connection is restricted to the given Step where you set up authentication.

Please note that you can only add one type of authentication into the Step, either the API key one or the Apple ID one. In either case, make sure the **Bitrise Apple Developer** **Connection** input is set to off, otherwise the Step will go with the configured authentication method found in **Apple Service connection** (unless you decide to remove the connection on the Teams tab).

### Authenticating with API key

1. Add the Step to your Workflow.
2. Upload the API key to the **GENERIC FILE STORAGE** section of the **Code Signing** page.
3. Set the **Bitrise Apple Developer** **Connection** input to off.
4. Set the **Issuer ID** as a secret Environment Variable in the respective field of the Step.
5. Configure the **API Key path** and **API Issuer** inputs.
6. Save your changes and run a new build.

### Authenticating with Apple ID and password

1. Add the Step to your Workflow.
2. Set the **Apple ID** and **Password**.
3. Set the **Bitrise Apple Developer Connection** input to off.
4. Save your changes and run a new build.

{% include message_box.html type="important" title="2FA and Apple ID authentication" content="Please note that if 2FA is required for your Apple ID, then you must use the Apple ID authentication with the **Deploy to iTunes Connect** and the **Fastlane** Steps instead of authenticating through Step inputs."%}