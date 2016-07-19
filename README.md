# Meganote

A simple note-taking app that saves notes in HTML and plain text and supports multiple users.

Based on the curriculum for [Xtern Bootcamp 2016](http://bootcamp16.getfretless.com/).

> **NOTE:** This is the front-end only. For the corresponding API, see [Meganote Server](https://github.com/xternbootcamp16/meganote-server).

## Technical Overview

* [AngularJS 1.x](https://angularjs.org/)
* [UI Router](https://github.com/angular-ui/ui-router)

In development:
* [ECMAScript 2016 (ES6)](http://es6-features.org/)
* [NPM](https://github.com/npm/npm) - development dependencies
* [Gulp](https://www.npmjs.com/package/gulp) - build system
* [Babel](http://babeljs.io/) - convert ES6 to ES5

## Getting Started

> Meganote uses NPM to manage development dependencies, so install Node if necessary.

To get started, clone the repository, and run `npm start`.

```shell
git clone <this repository>
cd <this project folder>
npm start
```

This will start a web server on port 8000.

## Deployment

To deploy Meganote, copy the `app` folder, including the `bower_components` subfolder (which is not included in the repository) to your remote server.

### [Live Example](http://bootcamp16.getfretless.com/meganote/#/sign-up)
