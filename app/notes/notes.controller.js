(function() {
  'use strict'

  angular
    .module('meganote.notes', ['ui.router'])
    .controller('NotesController', NotesController);

    NotesController.$inject = ['$scope', NotesService]
    function
      NotesController($scope, NotesService) //unsure whch of these belong in quotes if at all
      $scope.notes = NotesService.notes;

}
}());
