(function() {
  angular.module('meganote.notes')
    .config(notesConfig);

  notesConfig.$inject = ['$stateProvider'];
  function notesConfig($stateProvider) {
    $stateProvider

    .state('notes', {
      url: '/notes',
      templateUrl: 'notes/notes.html',
      controller: 'NotesController',
      resolve: {
        notesLoaded: notesLoaded
      }
    })

    .state('notes.form', {
      url: '/:noteId',
      templateUrl: 'notes/notes-form.html',
      controller: 'NotesFormController'
    });
  }

  notesLoaded.$inject = ['NotesService'];
  function notesLoaded(NotesService) {
    return NotesService.getNotes();
  }
})();
