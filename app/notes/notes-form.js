(function() {
  angular.module('meganote.notes')
    .controller('NotesFormController', NotesFormController);

  NotesFormController.$inject = ['$state', '$scope', 'NotesService'];
  function NotesFormController($state, $scope, NotesService) {
    $scope.note = NotesService.find($state.params.noteId);
  }
}());
