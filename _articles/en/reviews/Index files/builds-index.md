---
tag: []
title: 'Builds index '
redirect_from: []
summary: ''
published: false

---
A build is a series of jobs, specified by the app’s Workflow which is a collection of [Steps](https://8629bcmvhs1rvw.preview.forestry.io/steps-workflows/getting-started-steps). The app’s build configuration is specified in the [bitrise.yml configuration file](https://8629bcmvhs1rvw.preview.forestry.io/bitrise-cli/basics-of-bitrise-yml) which you can modify in [bitrise.io](https://www.bitrise.io/)’s graphical Workflow Editor UI, or in a [yaml editor](http://blog.bitrise.io/2016/02/12/edit-your-yaml-files-like-a-boss.html) directly.

When a build is running, these scripts will be downloaded and executed in the order you’ve defined in your Workflow, with the input parameters you set. They will produce the predefined outputs set as [Environment Variables](https://8629bcmvhs1rvw.preview.forestry.io/builds/available-environment-variables).