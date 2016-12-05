We're working on a Bitrise CLI plugin which will make the process even easier,
for now the fastest way to create and share your own step is:

1. Check the [Step Template](https://github.com/bitrise-steplib/step-template)
1. Create a new repository on GitHub
1. `git clone` your repository, and copy paste all the files from the [Step Template](https://github.com/bitrise-steplib/step-template)
1. Follow the [How to create your own step](https://github.com/bitrise-steplib/step-template#how-to-create-your-own-step)
   guide which you can find in the Step Template's README

The Step Template's README also described how you can run your step locally,
before you'd even commit the code, as well as how you can test your step
in any build by using the `git::` step reference, before sharing the step
in a Step Library, and finally how you can share your step with others
through the Bitrise StepLib.

_If you'd have any question, please [contact us](https://www.bitrise.io/contact)!_
