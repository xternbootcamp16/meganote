(function() {
  angular.module('meganote.notes')
    .controller('NotesController', NotesController);

  NotesController.$inject = ['NotesService'];
  function NotesController(NotesService) {
    var vm = this;
    vm.notes = NotesService.notes;
  }
}());
