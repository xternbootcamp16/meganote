(function() {
  'use strict';

  angular
    .module('meganote.notes', ['ui.router'])
    .config(notesConfig);

  notesConfig.$inject = ['$stateProvider'];
  function notesConfig($stateProvider) {
    $stateProvider
      .state('note', {
        url: '/notes',
        templateUrl: 'notes/notes.html',
        controller: 'NotesController',
        controllerAs: 'vm',
        resolve: {
          notesLoaded: notesLoaded
        }
      })
    .state('notes.form', {
      url: '/:noteId',
      templateUrl: 'notes/notes-form.html',
      controller: 'NotesformController',
      controllerAs: 'vm'
    });
  }

  notesLoaded.$inject = ['NotesService'];
  function notesLoaded(NotesService) {
    return NotesService.getNotes();
  }

}());
