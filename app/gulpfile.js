(function() {
  'use strict';
  var gulp = require('gulp');
  var concat= require('gulp-concat');
  var plumber = require('gulp-plumber');
  var sourcemaps = require('gulp-sourcemaps');
  var babel = require('gulp-babel');
  var connect =  require('gulp-connect');

  gulp.task('bundle', bundle);
  gulp.task('start-webserver', startServer);
  gulp.task('watch',watch);
  glulp.task('default', ['bundle', 'start-webserver', 'watch']);
//
  function bundle() {
    
  }
  function startServer(){
    connect.server({root: 'app'});
  }
  function watch(){
    gulp.watch('app/**/*',[bundle]);
  }
})();
