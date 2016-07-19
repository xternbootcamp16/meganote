# Meganote

A simple, multi-user note-taking app that saves notes in HTML and plain text.

Based on the curriculum for [Xtern Bootcamp 2016](http://bootcamp16.getfretless.com/).

** NOTE:** This is the front-end only. For the corresponding API, see [Meganote Server](https://github.com/camerongrundy/meganoteserver).

## Technical Overview
 * [AngularJS 1.x](https://angularjs.org/)
 * [UI Router]()

 In development:
  * [ECMAScript 2015 (ES6)](http://es6-features.org/)
  * [Babel](https://babeljs.io/) Convert ES6 into ES5
  * [NPM](https://github.com/npm/npm) For development dependencies
  * [Bower](https://bower.io/) For dependencies
  * [Gulp](https://npmsjs/package/gulp/) Build System


## Getting Started
> Megante uses NPM to manage development dependencies, so install [Node](https://nodejs.org/en/) if necessary.

To get started, clone the repository and run `npm start`.

```shell
$ git clone <this repository>
$ cd <this project folder>
$ npm start
```

This will install dependencies and start a web server on port 8000.

To change the URL of the API, edit `app/constants.js`.

## Deployment

To deploy Meganote, copy the contents of the `app` folder to your remote server.
