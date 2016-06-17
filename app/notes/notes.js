(function() {
  angular.module('meganote.notes', ['ui.router'])
    .config(notesConfig)
    .controller('NotesController', NotesController);

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

  NotesController.$inject = ['$scope', 'NotesService'];
  function NotesController($scope, NotesService) {
    $scope.notes = NotesService.notes;
  }
}());
