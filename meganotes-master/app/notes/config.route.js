(function ( {
  'use strict'

  angular
    .module('meganote.notes')
    .config(notesConfig);

    notesConfig.$inject = ['$stateProvider']
    function notesConfig($stateProvider) {
      $stateProvider

      .state('notes', {
        url: '/notes',
        templateURL: 'notes/notes.html',
        controller: 'NotesController',
        resolve: {
          notesLoaded: notesLoaded
        }

      })

      .state('notes.form', {
        url: '/:noteID' ,
        templateURL: 'notes/notes-form.html'
        controller: 'NotesFormController'
      });
    }

    notesLoaded.$inject = ['NotesService'];
    function notesLoaded(NotesService) {
      return NotesService.getNotes();
    }
}());
