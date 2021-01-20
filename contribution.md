# Contributing to Canvasboard

Thank you for your interest in contributing to Canvasboard!🤩 We welcome all people who want to contribute in a healthy and constructive manner within our community. To help us create a safe and positive community experience for all, we require all participants to adhere to the [Code of Conduct](CODE_OF_CONDUCT.md).

This document is a guide to help you through the process of contributing to Canvasboard.

## Become a contributor

You can contribute to Canvasboard in several ways. Here are some examples:

- Contribute to the Canvasboard codebase.
- Report and triage bugs.
- Write technical documentation and blog posts, for users and contributors.
- Help others by answering questions about Canvasboard.

For more ways to contribute, check out the [Open Source Guides](https://opensource.guide/how-to-contribute/).

### Report bugs

Before submitting a new issue, try to make sure someone hasn't already reported the problem. Look through the [existing issues](https://github.com/Canvasbird/canvasboard/issues) for similar issues.

Report a bug by submitting a [bug report](https://github.com/Canvasbird/canvasboard/issues/new?assignees=&labels=&template=bug_report.md). Make sure that you provide as much information as possible on how to reproduce the bug.

Follow the issue template and add additional information that will help us replicate the problem.

### Suggest enhancements

If you have an idea of how to improve Canvasboard, submit an [enhancement request](https://github.com/Canvasbird/canvasboard/issues/new?assignees=&labels=&template=feature_request.md).

### Your first contribution

Unsure where to begin contributing to Canvasboard? Start by browsing issues labeled `good first issue` or `help wanted`.

- [Good first issue](https://github.com/Canvasbird/canvasboard/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) issues are generally straightforward to complete.
- [Help wanted](https://github.com/Canvasbird/canvasboard/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) issues are problems we would like the community to help us with regardless of complexity.

If you're looking to make a code change, see how to set up your environment for [local development](#set-up-the-development-environment) and [work on an issue](#work-on-an-issue).

When you're ready to contribute, it's time to [create a pull request](#create-a-pull-request).


## Set up the development environment 

🖥️For setting up the Canvasboard project on your local:

1. Fork the repo by clicking on the `fork` icon.

2. Clone the repo using the command
  `git clone https://github.com/<your_repo_name>/canvasboard.git`

3. Open the cloned folder via any editor.

4. Verify that you are in `canvasboard` directory.

5. Add the main repo as "upstream" using
  `git remote add upstream https://github.com/Canvasbird/canvasboard.git`

  This will be used to pull the changes from the original canvasboard repo.

6. Run `npm install` to install all the dependencies.

7. Run `ng serve -o --poll=2000` to run the frontend server.

Yayy!🌼 Your application is served locally in localhost:4200🚀


## Work on an issue 

After you set up the Canvasboard set up on your local, you can choose any of the issues from
[Issue tracker](https://github.com/Canvasbird/canvasboard/issues) of the repo to work on.👨‍💻👩‍💻

For working on an issue:

1. Create a new branch from master branch

  ```
  git checkout master
  git checkout -b "<your_branch_name>"
  ```
Try to give a meaningful branch name. For example if you are working on fixing the graph plugin,
use "fix_graph_plugin" as the branch name

2. After creating the branch, make the changes required to fix the issue you took and test it on
  your local by running the server.


## Create a Pull Request 

🚀After you are done with all the changes and have tested it, follow these steps for creating a Pull Request:

1. Add the changes to the staging using
  `git add .`

2. Commit the changes using:
  `git commit -a -m "<your_commit_msg>"`

  Please make sure to give a meaningful commit message. For example if you fixed the graph plug,
  use "fixed_graph_plugin" as the commit message.

3. Pull the changes from the upstream using
  `git pull upstream master`

4. push the branch to your forked repository using:
    `git push origin <your_branch_name>`

4. Go to your github forked repository and make the Pull Request using the pushed branch. Also make sure you don't have any merge conflicts while opening a Pull Request.

Hurray!!🎉 You have created your first Pull Request to the Canvasboard 🚀
