(function() {
  'use strict';

  angular
    .module('meganote.notesForm')
    .directive('myNotesForm', myNotesForm);

  function myNotesForm() {
    return {
      restrict: 'AE',
      templateUrl: 'notesForm/directives/notesForm.html'
    };
  }
})();
