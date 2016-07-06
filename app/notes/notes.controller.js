(function() {
  'use strict';
  angular.module('meganote.notes')
    .controller('NotesController', NotesController);

  NotesController.$inject = ['$scope', 'NotesService'];
  function NotesController($scope, NotesService) {
    $scope.notes = NotesService.notes;
  }
}());
