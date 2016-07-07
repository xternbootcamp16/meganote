{
  angular.module('meganote.notes')
    .controller('NotesController', NotesController);

  NotesController.$inject = ['NotesService'];
  function NotesController(NotesService) {
    const vm = this;
    vm.notes = NotesService.notes;
  }
}
