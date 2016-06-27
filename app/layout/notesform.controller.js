(function(){
  'use strict';

  angular
    .module('meganote.layout')
    .controller('NotesformController', NotesformController);

  NotesformController.$inject = ['$state', '$scope', 'Flash', 'NotesService'];

  function NotesformController($state, $scope, Flash, NotesService) {
    $scope.note = NotesService.find($state.params.noteId);

    $scope.clearForm = function() {
      $scope.note = { title: '', body_html: '' };
    };

    $scope.save = function() {
      if ($scope.note._id) {
        NotesService.update($scope.note)
          .then(
            function(res) {
              $scope.note = res.data.note;
              Flash.create('success', res.data.message);
            },
            function() {
              Flash.create('danger', 'Oops! Something went wrong.');
            });
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

    $scope.delete = function() {
      NotesService.delete($scope.note)
        .then(function() {
          $scope.clearForm();
        });
    };
  }
}());

// In this file we define a new controller for notes-form and attach it to the layout module
