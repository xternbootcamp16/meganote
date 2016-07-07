(function() {
  'use strict';
  var gulp = require('gulp');
  var order = require('gulp-order');
  var concat = require('gulp-concat');
  var plumber = require('gulp-plumber');
  var sourcemaps = require('gulp-sourcemaps');
  var babel = require('gulp-babel');
  var connect = require('gulp-connect');

  gulp.task('bundle', bundle);
  gulp.task('start-webserver', startWebServer);
  gulp.task('watch', watch);
  gulp.task('default', ['bundle', 'start-webserver', 'watch']);

  //////////////////

  var jsFiles = [
    'app/**/*.js',
    '!app/bower_components/**/*',
    '!app/content/bundle.js'
  ];

  function bundle() {
    return gulp.src(jsFiles)
    .pipe(order([
      'app/app.module.js',              // put the main module first
      'app/**/*.module.js',             // followed by all other modules
      'app/**/*.js'                     // and all other JS files
    ], { base: './' }))
      .pipe(plumber())                  // restart gulp on error
      .pipe(sourcemaps.init())          // let sourcemap watch this pipeline
      .pipe(babel({
        presets: ['es2015']
      }))                               // transpile into ES5 the browser understands
      .pipe(concat('bundle.js'))        // concatenate all JS files
      .pipe(sourcemaps.write('.'))      // emits sourcemap bundle.js.map for debugging
      .pipe(gulp.dest('app/content'));  // save bundle.js and bundle.js.map
  }

  function startWebServer() {
    connect.server({
      root: 'app',
      port: 8000,
    });
  }

  function watch() {
    gulp.watch(['app/**/*', 'gulpfile.js'], ['bundle']);
  }

})();
