---
title: How to contribute to Bitrise
date: 2018-12-13T11:31:09.000+00:00
redirect_from: []
menu:
  main:
    identifier: contributors-main
    title: For contributors
    weight: 1

---
Contributing to Bitrise is easy: write an open source integration, a guide, or a blog post, submit it and you're done! In this section, we'll be focusing on "technical" contributions: creating a new Step and creating your very own project scanner.

## Creating your own Step

Bitrise offers well over 200 Steps to our users. We maintain many of them ourselves but our users' community does an outstanding job of contributing to our Step library. Anyone can submit a Step - if approved, it will become part of the official Bitrise StepLib and available to all Bitrise users! Check out how to create your own Step and share it with the world: [Creating your own Step](/contributors/create-your-own-step/).

## Creating your own scanner

Our project scanner automatically detects the project type whenever you add a new app on Bitrise. In this context, type means the platform or framework used to create the app, for example, Android, iOS, React Native or Flutter. Based on the results, we automatically create a configuration, with at least one default Workflow that contains the most frequently used Steps for the detected type.

Our scanner might not detect your app, for a couple of reasons: either something is missing from your repository (such as a config.xml file in the case of an Ionic app, for example), or we simply don't have a scanner for your type yet. If it's the latter, you can configure your app manually, or you can create your own scanner, with its own project configuration: [Creating your own Bitrise project scanner](/contributors/creating-your-own-bitrise-project-scanner/).