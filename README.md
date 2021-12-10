# CS411-Project [![CI Lint & Testing](https://github.com/blabel3/CS411-Project/actions/workflows/verify-code.yml/badge.svg)](https://github.com/blabel3/CS411-Project/actions/workflows/verify-code.yml)

## Spotify Album Cover Generator

Website that lets people generate unique album covers for their spotify playlists. Currently spotify's automatic playlist covers are just some of the album arts stitched together, and the creator has to go and make an image themself if they want something memorable for it. Our app would make an album cover that fits the playlist given the moods of the songs automatically. It will use infortmation from the Spotify API like the lyric keywords, key, bpm, dancability, and song titles to determine images, shapes and colors to use. It will also use image APIs like Unsplash or Artbreeder to find cool images to include in the playlist cover. 

# Table of Contents

* [Installing](#Installing)
* [Running](#Running)
* [Contributing](#Contributing)
* [Repo Structure Explanation](#Repo-Structure-Explanation)

# Installing

### Pre-Requisites

* This project uses Node: install [Node.js](https://nodejs.org/en/download/) (this will also install npm!)

* Know how to run things on the commandline 

Once Node is installed, open up your command line and navigate to this project folder. Node uses npm (the Node Package Manager) to install dependencies. Our dependencies are stuff like Express which lets us run a web server, or Typescript which helps us write better code. To install all the dependencies for our project, run this command:

```console
$ npm install
```

It will make a folder called node_modules with all the code from our dependencies. You only need to run npm install when we add new dependencies or remove old dependencies. If there's an error where it can't find some module, it's a good idea to run `npm install` again.

# Running

All of the scripts necessary to run the project are listed in the [package.json](package.json) file under "scripts". To run the project, we're going to use two of those scripts:

```console
$ npm run build 
```

This takes all of our source code in src/ and builds it, converting the typescript into well-optimized javascript for us. 

Then, to start the web server, run this command:

```console
$ npm run start
```

This will start the web server, and show a link to where it is running locally. Then all you have to do is click it and you're set, hooray! The terminal window will show any errors on the server, and you can test everything in the browser. 

# Contributing

To make edits to the code, first, make sure you're in a new branch! The repo is set up to not allow commits directly on main so that none of us accidentally break everything.

Then you can make your changes! Using `npm run dev` is a good way to test locally, since it will restart the server every time a change is made to the code. This way you don't have to stop the server, build again, and restart the server. 

Then, you can make your edits (probably to files in src/ and test/) and commit + push them. Then, on github make a Pull Request to get them merged in. 

It'll automatically test the code in the PR, and lets people have a chance to look at the code, add in anything that's missing, etc.

# Repo Structure Explanation

* .github/workflows/verify-code.yml: File defining the Github Action that runs our tests whenever we make a Pull Request
* docs/: Documentation and files for assignments we submit for the project.
* prototype/: Built files we made for the third assignment, making a prototype
* **src/: All the actual source code for our project! The main stuff**
  * src/views: frontend code (currently using Pug with Node to render html)
  * src/controllers: Where the code for our endpoints lives. The meat.
  * src/server.ts: Web server setup/loading configuration.
  * src/app.ts: The main application code, defining our routes and telling it what to run when people go to those endpoints of our server.
* **test/: All the tests written for our source code! Also very important.**
* .eslintignore: File saying what files the code linter should ignore
* .eslintrc.js: Config file for our code linter (eslint). The linter helps check our code for errors that might still compile but are probably not intended behavior, and also helps fix some formatting issues too.
* .gitignore: Files that will not be committed in our repo
* jest.config.js: The configuration for the tester, jest. This is what we use to run automated tests on our code.
* package-lock.json: File that defines specific versions for every package that is used in the project (*all* dependencies)
* **package.json: The project setup file for Node! Defines what packages we rely on, what scripts we run for building/testing/everything else.**
* tsconfig.json: Configuration file for the typescript compiler. This is how we build from typescript in src/ to compatible javascript in dist/ 

Also, we should all have an .env file with important variables, but this will never be checked in to source control!