---
title: Adding and removing Steps
tag:
- steps
- workflows
summary: 'Steps can be added or removed any time from the Workflow Editor: all it
  takes is a couple of clicks. You can add any Step to your workflow - there are absolutely
  no restrictions.'
redirect_from: []
menu:
  steps-workflows-main:
    weight: 3

---
Steps can be added or removed any time from the Workflow Editor: all it takes is a couple of clicks.

## Adding a new Step

You can add any Step to your workflow - there are absolutely no restrictions. Please note that this means that it's possible to add a Step specific to, for example, iOS apps to a workflow of an Android app. Always make sure you only add the relevant Steps to your workflow!

1. Open your app by clicking on the app's name on your [Dashboard](https://app.bitrise.io/dashboard).
2. Click the `Workflow` tab. Note that you cannot leave the Workflow editor without either saving or discarding any changes you made.
3. Select the workflow you need in the `WORKFLOW` dropdown menu on the top left.
4. Click the `+` symbol between two Steps to insert a Step at that position.

   ![Adding a step](/img/adding-step-1.png)

This will show you a list of available Steps in our **Step Library**.
You can search and filter these steps: enter a search expression in the `Search steps` field and set the platform on the right of the field. Note that by default, you will only see the Steps that are relevant to the platform of your project: click `ALL` to search within all the available Steps.

Clicking the Step will add it to the selected workflow. Don't forget to save the workflow when you are done!

You can also clone a Step by clicking the **Clone icon** on the right side and then you can **Drag and Drop** it to its place.

## Removing a Step

You can remove a Step at any time. Be aware, however, that if you add it back at a later date, the Step inputs will be set to the default value - any custom configuration will be gone.

1. Open your app by clicking on the app's name on your [Dashboard](https://app.bitrise.io/dashboard).
2. Click the `Workflow` tab. Note that you cannot leave the Workflow editor without either saving or discarding any changes you made.
3. Select the workflow you need in the `WORKFLOW` dropdown menu on the top left.
4. Click the Step you want to remove.
5. Click the trash bin icon on the right.
6. Click Save.