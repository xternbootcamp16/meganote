{
  angular.module('meganote.notes')
    .controller('NotesController', NotesController);

  NotesController.$inject = ['$scope', 'NotesService'];
  function NotesController($scope, NotesService) {
    const vm = this;
    vm.notes = NotesService.notes;
  }
}
