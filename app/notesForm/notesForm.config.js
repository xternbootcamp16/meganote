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
        template: '<div my-notes-form></div>',
        controller: 'NotesFormController',
        controllerAs: 'vm'
      });
  }
})();
