(function() {
  'use strict';

  angular
    .module('meganote.notes')
    .config(notesConfig);

  notesConfig.$inject = ['$stateProvider'];
  function notesConfig($stateProvider) {
    $stateProvider
      .state('notes', {
        url: '/notes',
        templateUrl: 'notes/notes.html',
        controller: 'NotesController',
        controllerAs: 'vm',
        resolve: {
          notesLoaded: notesLoaded
        }
      })

      .state('notes.form', {
        url
      })
  }

  notesLoaded.$inject = ['NotesService'];
  function notesLoaded(NotesService) {
    return NotesService.getNotes();
  }
})();
