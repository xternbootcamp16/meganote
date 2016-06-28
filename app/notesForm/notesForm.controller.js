(function() {
  'use strict';

  angular
    .module('meganote.notesForm')
    .controller('NotesFormStartController', NotesFormStartController);

  NotesFormStartController.$inject = ['$state', 'NotesService'];
  function NotesFormStartController($state, NotesService) {
    var vm = this;

    vm.note = NotesService.find($state.params.noteId);
  }
})();
