# Tutorial for Pug Sass template

This package is ready to serve to build the template html/css from pug & sass.

## Tutorial begins
### Requirement
- Node/NPM
- Now - Zeit
    - Install _now_ using npm
    - Create an Zeit account with your email (yourname@namtech.com.au) or your personal email
- Visual Code Editor
- Bitbucket repository
    - Log in to your bitbucket account with your email (yourname@namtech.com.au) or your personal email

:::danger
❗️📣 **Attention**
You need to install all these thing & have a bitbucket account before you continue to read this document. Follow [the previous tutorial](/@Namtech/tutorial-setup-ubuntu) to setup your working space on Ubuntu.
:::

#### Included Package
- Bootstrap
- Jquery
- Fontawesome

#### [Pug](https://pugjs.org/api/getting-started.html)
- variables
- interpolation
- modules
- _for_ loop
- _if_ _else_ condition

#### [Sass](https://sass-lang.com/guide)
- variables
- mixins
- functions
- nesting
- heritage

### [PugSass Kit](https://bitbucket.org/namtech/pugsass-kit/src/master/)
Download this kit. Click [here]().

#### Structure
```
|-- pugsass-kit/
|------ src/
|------ ---- assets/
# 🧨 Never touch the css folder
# 🧨 This folder contains the *.css files generated from *.scss files
|------ ---- ---- css/
|------ ---- ---- ---- *.css
|------ ---- ---- fonts/
|------ ---- ---- ---- font-name/
|------ ---- ---- ---- ---- *.ott
|------ ---- ---- ---- ---- *.otf
|------ ---- ---- imgs/
|------ ---- ---- ---- *.png
|------ ---- ---- ---- *.jpg
|------ ---- ---- ---- *.svg
# 🧨 Never touch the js folder
# 🧨 This folder contains the *.js files which are generated from *.js files (scripts folder)
|------ ---- ---- js/
|------ ---- ---- ---- *.js
|------ ---- ---- webfonts/
|------ ---- ---- ---- *.woff
|------ ---- ---- ---- *.woff2
|------ ---- ---- ---- *.svg
|------ ---- ---- ---- *.ttf
|------ ---- ---- ---- *.eot
|------ ---- pugs/
|------ ---- ---- parts/
|------ ---- ---- ---- include/
|------ ---- ---- ---- ---- header.pug
|------ ---- ---- ---- ---- footer.pug
|------ ---- ---- ---- layout.pug
|------ ---- ---- 404.pug
|------ ---- ---- index.pug
|------ ---- sass/
|------ ---- ---- commom.scss
|------ ---- ---- main.scss
|------ ---- ---- variables.scss
|------ ---- scripts/
|------ ---- ---- scripts.js
# 🧨 Never touch the *.html files below
# 🧨 These *.html files which are generated from *.pug files
|------ ---- 404.html
|------ ---- index.html
|------ .env.sample
|------ .gitignore
|------ gulpfile.js
|------ package.json
|------ Readme.md
```

#### Setup
- After download the _*.zip_ file. Unzip it.
- Rename unzip folder to the project name.
- In the **bash** terminal, access to the folder (using `git bash` application on Window or `terminal` on Ubuntu/MacOs)
```bash
$ cd path/to/folder
```
- Create the _.env_ file from _.env.sample_
```bash
$ cp .env.sample .env
```
- Replace the project name in the new .env file
```bash
# Open the .env file
$ vim .env

# Edit directly in your teminal
# PROJECT_NAME=[Your project name]
# After that, save & quit by pressing Ctrl + X on Window/Ubuntu or Cmd + X on MacOs
```
- Install all of the project dependencies
```bash
$ npm i
```
- Run the project on local
```bash
$ npm run dev
```
- This task takes a while. So, after it finish  compile, you can access to the default link: http://localhost:8000

#### Working
- Open the **Visual Code** editor, ensure you are in the project folder, then:
```bash
$ code .
```
- Make sure you've already run the command `$ npm run dev` to **compile**, **watch** your modifications & **auto-reload** your browser.
- The folders where you put the basic elements
    - _**assets/fonts**_
    - _**assets/imgs**_
    - _**assets/webfonts**_
- The folders where you work everyday on:
    - _**pugs**_ 
    - _**sass**_
    - _**scripts**_


### [Git](https://www.atlassian.com/git/tutorials/learn-git-with-bitbucket-cloud)
:::danger
❗️📣 **Attention**
You need to replace all the thing in **[]** by the real path or real name.

_📯 For example:_
- _[path/to/file] 👉🏼 src/assets/image_1.png_
- _dev-[dev-name]-[feature-name] 👉🏼 dev-stephane-homepage_
- etc...
:::

- Initialize one time only if the repo are **empty**
```bash
# Initialize / create the .git file into the project
$ git init

# Add the remote location
$ git remote add origin [repository/link]

# First commit
$ git status #Check on Git status
$ git add . #Add all of your project file to git before the first commit
$ git commit -m "First commit for <project name>"

# Push the first commit to the empty repository
$ git push -u origin master
```

 - Then create branches before working
```bash
# Create the staging branch from master
$ git branch stag
$ git checkout stag
$ git push origin stag

# Create the dev branch from stag
$ git branch dev
$ git checkout dev
$ git push origin dev
```

- Then create a branch for each feature from the _dev_ branch
```bash
# Verify the current branch you're in
$ git branch

# Create new feature dev branch
$ git branch dev-[dev-name]-[feature-name]

# Switch to the new created branch
$ git checkout dev-[dev-name]-[feature-name]

# Push the new branch to the remote & start working on it
$ git push origin dev-[dev-name]-[feature-name]
```

- Or clone the **existed** repository
```bash
$ git clone [repository/link]
```

:::danger
❗️📣 **Attention**
If you start from the **existed** repository, you must create your own branch with the format _dev-[dev-name]-[feature-name]_ from the _dev_ branch before working. This is to avoid code conflict between devs.
:::

- Hourly _commit_, _push_ your modified code to your working branch
```bash
# Verify the local status (modified, deleted, ...)
$ git status

# Add all of the modified files
$ git add .

# Or you can add a specific file or directory
$ git add [path/to/file]
$ git add [path/to/directory]

# Commit, you need to describe clearly your work on each commit 
$ git commit -m "your work in message of the commit"
```

:::danger
❗️📣 **Attention**
Before you do the _**merge**_ action in your terminal, make sure you've already stop the watcher/compiler to avoid errors, by pressing `Ctrl + C` on Windows/Ubuntu or `Cmd + C` on MacOs.
:::

- Daily _merge_, merge your working branch into _dev_ branch
```bash
# Verify the local status (modified, deleted, ...)
$ git status

# If everything is ready, verify the current branch that you are on
# Output:
# * <current_branch>
#   <others_branch>
$ git branch

# Switch to dev branch
$ git checkout dev

# Merge the dev branch with your working branch
$ git merge dev-[dev-name]-[feature-name]

# Push your dev branch to the remote repository
$ git push origin dev
```

:::warning
📣 **Remember:** Update your working branch
When you work on the project with many people as the team, each member of yours merge their code to _**dev**_ branch everyday. If you don't want to miss anything that are important, you **must** update regularly your current working branch from  _**dev**_ branch to avoid the conflict. The process is a bit similar to the steps below.

```bash
# Verify the local status (modified, deleted, ...)
$ git status

# If everything is ready, verify the current branch that you are on
# Output:
# * <current_branch>
#   <others_branch>
$ git branch

# Switch to your working branch
$ git checkout dev-[dev-name]-[feature-name]

# Merge your working branch with the dev branch
$ git merge dev

# Push your working branch to the remote repository
$ git push origin dev-[dev-name]-[feature-name]
```
:::

:::info
📣 **Hint:** Merge code to stag or master branch
This process is the same as above Remember note. 
Follow it to keep your work updated.
:::

### Deploy with Now - Zeit
- You need to run these command first to build source folder
```bash
# Create a build folder containing all of the elements
$ npm run build

# Redirect to build folder
$ cd build
```

- Then, start to deploy with `now` command
```bash
# Testing before deploy
$ now dev

# Deploy staging
$ now

# Deploy production
$ now --prod
```

:::success
🎉 **Voilà!!!**
Your website has successfully deployed to live after using `now --prod` command. Everyone can see your work by accessing to this url projectname.now.sh.
:::

- Demo after deployed
https://namtech-pug-sass-kit-test.stephane-namtech.now.sh/

- To finish the process, don't forget to return back to your main folder by typing command
```bash
$ cd ../
```

## Sources
- [Beginners guide to Pug](https://www.sitepoint.com/a-beginners-guide-to-pug/)
- [Easier life with Pug](https://itnext.io/pug-js-to-make-your-life-easier-with-html-templates-9c62273626e0)
- [_Pug_ document](https://pugjs.org/api/getting-started.html)
- [_Sass_ document](https://sass-lang.com/guide)
- [_Git_ cheatsheet](https://www.atlassian.com/git/tutorials/learn-git-with-bitbucket-cloud)
- [_Zeit_ website](https://zeit.co/)
- [_Visual Code_ website](https://code.visualstudio.com/download)
