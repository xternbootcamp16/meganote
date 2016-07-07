(function() {
  'use strict';
  var gulp = require('gulp');
  var order = require('gulp-order');
  var concat= require('gulp-concat');
  var plumber = require('gulp-plumber');
  var sourcemaps = require('gulp-sourcemaps');
  var babel = require('gulp-babel');
  var connect =  require('gulp-connect');
  var jsFiles = ['app/**/*.js', '!app/bower_components/**/*','!app/content/bundle.js'];

  gulp.task('bundle', bundle);
  gulp.task('start-webserver', startServer);
  gulp.task('watch',watch);
  gulp.task('default', ['bundle', 'start-webserver', 'watch']);
//
  function bundle() {
    return gulp.src(jsFiles)
    .pipe(order([
      'app/app.module',
      'app/**/*.module.js',
      'app/**/*.js'
    ], {base: './'}))
    .pipe(plumber()) //allows gulp to restart
    .pipe(sourcemaps.init()) //sourcemaps can now watch this pipe
    .pipe(babel())  //transpile ES6 => ES5
    .pipe(concat('bundle.js'))//compresses the js into a single file
    .pipe(sourcemaps.write('.')) //emits sourcemap of bundle.js.map for debugging
    .pipe(gulp.dest('app/content')); //landing pad for the bundled file and map.
  }
  function startServer(){
    connect.server(
    {root: 'app',
    port: 8000});
  }
  function watch(){
    gulp.watch('app/**/*',[bundle]);
  }
})();
