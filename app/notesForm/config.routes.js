(function() {
  'use strict';

  angular
    .module('meganote.notesForm')
    .config(configFunction);

  configFunction.$inject = ['$stateProvider'];
  function configFunction($stateProvider) {
    $stateProvider
      .state('notesform', {
        parent: 'notes',
        url: '/:notesId',
        templateUrl: 'notesForm/notesForm.html',
        controller: 'NotesFormController'
      });
  }
})();
