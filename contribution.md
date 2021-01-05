## Hola Developers!!🤩

If you want to start contributing to our awesome Canvasboard project, along with following the [Code of conduct](https://github.com/Canvasbird/canvasbird-wiki/wiki/Code-of-Conduct), please follow the steps mentioned below:

### Set up the development environment 🖥️

For setting up the canvasboard project on your local:

1. Fork the repo by clicking on the `fork` icon.

2. Clone the repo using the command
  `git clone https://github.com/<you_repo_name>/canvasboard.git`

3. Open the cloned folder via any editor.

4. Verify that you are in `canvasboard` directory.

5. Add the main repo as "upstream" using
  `git remote add upstream https://github.com/Canvasbird/canvasboard.git`

  This will be used to pull the changes from the original canvasboard repo.

6. Run `npm install` to install all the dependencies.

7. Run `ng serve -o --poll=2000` to run the frontend server.

Yayy!🌼 Your application is served locally in localhost:4200🚀


### Work on an issue 👨‍💻👩‍💻

After you set up the Canvasboard set up on your local, you can choose any of the issues from
[Issue tracker](https://github.com/Canvasbird/canvasboard/issues) of the repo to work on.

For working on an issue:

1. Create a new branch from master branch

  ```
  git checkout master
  git checkout -b "your_branch_name>
  ```
Try to give a meaningful branch name. For example if you are working on fixing the graph plugin,
use "fix_graph_plugin" as the branch name

2. After creating the branch, make the changes required to fix the issue you took and test it on
  your local by running the server.


### Create a PR 🚀

After you are done with all the changes and have tested it, follow these steps for creating a PR:

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

4. Go to your github forked repository and make the PR using the pushed branch. Also make sure you don't have any merge conflicts while opening a PR.

Hurray!!🎉 You have created your first PR to the Canvasboard 🚀
