---
title: File downloader for code signing - draft
date: 2018-12-03 15:12:09 +0000
redirect_from: []
published: false

---
If your keystore is defined in a gradle task with keystore path poining to the location of the file, you can have your project signed using our \`File Downloader\` step. build.gradleben a keystore path van meg de maga file hianyzik.

1\. Add the File Downloader step to your workflow. The step should be added before any build step you use. Our File Downloader Step will download the keystore file from the \`ANDROID KEYSTORE FILE\` section (innen ugye?)  / \`Generic File Storage\`(itt nem a keystore szokott lenni).

2\. Fill out the following 2 input fields:

 - \`Download source url\`: which is the generated keystore URL you get when you upload your file to \`ANDROID KEYSTORE FILE\` section of the \`Code Signing\` tab)

 - \`Download destination path\`: set the location where the file should be placed. In this case it is your Gradle build file's path where you want the Step to insert the keystore file. home.-ra kell h mutasson. ugyanaz legyen az eleresi utvonal mint a build.gradle file-ban van. igy mukodini fog a gradl runner vagy az android step.

3\. Add a build step to your workflow: either \`Gradle Runner\` or \`Android Build\` Steps