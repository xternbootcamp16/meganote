(function() {
  angular.module('meganote.notes', ['ui.router'])
    .controller('NotesController', NotesController);

  NotesController.$inject = ['$scope', 'NotesService'];
  function NotesController($scope, NotesService) {
    $scope.notes = NotesService.notes;
  }

})();
