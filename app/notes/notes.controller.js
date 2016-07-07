{
  angular.module('meganote.notes')
    .controller('NotesController', NotesController);

  NotesController.$inject = ['NotesService'];
  function NotesController(NotesService) {
    let vm = this;
    vm.notes = NotesService.notes;
  }
}
