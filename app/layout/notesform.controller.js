(function(){
  'use strict';

  angular
    .module('meganote.layout')
    .controller('NotesformController', NotesformController);

  NotesformController.$inject = ['$state'];

  function NotesformController($state){
    $state.go('notes-form');
  }

})();

// In this file we define a new controller for notes-form and attach it to the
