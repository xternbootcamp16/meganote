(function() {
  'use strict';

  angular
    .module('meganote.notesForm')
    .config(notesFormConfig);

  notesFormConfig.$inject = ['$stateProvider'];
  function notesFormConfig($stateProvider) {
    $stateProvider
      .state('notes.form', {
        url: '/:noteId',
        templateUrl: 'notesForm/notesForm.html',
        controller: 'NotesFormController',
        controllerAs: 'vm'
      });
  }
})();
