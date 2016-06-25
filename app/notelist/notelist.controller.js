(function() {
  'use strict';

  angular
    .module('meganote.noteList')
    .controller('NoteListController', NoteListController);

  NoteListController.$inject=['noteService'];

  function NoteListController(mutantService) {
    var vm = this;
    vm.addMutant = addMutant;
    vm.mutants = mutantService.mutantsByUser(user.uid);
    vm.newMutant = new mutantService.Mutant();
    vm.deleteMutant = deleteMutant;
    vm.toggleComplete = toggleComplete;


  }
})();
