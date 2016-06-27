(function(){
  'use strict';

  angular
    .module('meganote.layout')
    .directive('xtNotes', xtNotes);

  function xtNotes() {
    return {
      templateUrl: 'app/layout/notes.html',
      restrict: 'E',   // To use as element only
      controller: 'NotesContoller',
      controllerAs: 'vm',
      scope: {}
    };
  }
})();

// In this file we define a new directive for notes and attach it to the layout module
