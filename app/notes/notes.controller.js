{
  angular.module('meganote.notes')
    .controller('NotesController', NotesController);

  NotesController.$inject = ['$scope', 'Note'];
  function NotesController($scope, Note) {
    const vm = this;
    vm.notes = Note.query();
  }
}
