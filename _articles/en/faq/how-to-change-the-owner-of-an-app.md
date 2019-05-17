---
title: How to change the owner of an app?
menu:
  faq:
    weight: 1

---
It can happen that you need to transfer an Application on [Bitrise](https://www.bitrise.io) to another User or to an Organization. This can be done in a few seconds by following these quick steps:

1. Login with the **current Owner** of the App on [bitrise.io](https://www.bitrise.io)
2. Open the App's page and go to the `Team` tab
3. Make sure the new owner of the App is in the team or add her/him if you need to.
   In case if you want to transfer the ownership to an Organization,
   you have to be part of the Organization.
4. Click the `Transfer ownership` button next to your name
5. After selecting the new owner from the dropdown, click on the purple button that says
   `Transfer ownership to <Username>`, and you are done!

{% include message_box.html type="info" title="Good to know: Do you want to remain the connected services user?" content="If you enable the `Do you want to remain the connected services user?` option in the Transfer popup, then during the transfer you'll be explicitly marked as the connected services user for the app during the transfer."%}

The "connected services" user specifies which Team Member's service connections / accounts connected to his/her Bitrise user should be used when Bitrise tries to communicate with another service (GitHub, Bitbucket, ...), for example to send back build status information, or to register a new SSH key automatically.

Admins of an app can change this any time on the `Settings` tab of the app.