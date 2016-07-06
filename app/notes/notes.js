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

  NotesController.$inject = ['$scope', 'Flash', 'NotesService'];
  function NotesController($scope, Flash, NotesService) {

    $scope.notes = NotesService.notes;

    $scope.clearForm = function() {
      $scope.note = { title: '', body_html: '' };
    };

    $scope.save = function() {
      if ($scope.note._id) {
        NotesService.update($scope.note)
          .then(
            function(res) {
              if (res.status === 200) {
                $scope.note = res.data.note;
                Flash.create('success', res.data.message);
              }
            },
            function() {
              Flash.create('danger', 'Oops! Something went wrong.');
            }
          );
      }
      else {
        NotesService.create($scope.note)
          .then(
            function(res) {
              $scope.note = res.data.note;
              Flash.create('success', res.data.message);
            },
            function() {
              Flash.create('danger', 'Oops! Something went wrong.');
            });
      }
    };

    $scope.edit = function(note) {
      $scope.note = angular.copy(note);
    };

    $scope.delete = function() {
      NotesService.delete($scope.note)
        .then(function() {
          $scope.clearForm();
        });
    };

    $scope.clearForm();
  }
}());
