(function(){
  'use strict';

  angular
    .module('meganote.layout')
    .directive('xtNotesform', xtNotesform);

  function xtNotesform(){
    return{
      templateUrl: 'app/layout/notes-form.html',
      restrict: 'E',
      controller: 'NotesformController',
      controllerAs: 'vm',
      scope: {}
    };
  }

})();

// In this file, we define a new directive for notes-form and attach it to the layout module
