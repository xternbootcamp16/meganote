(function() {
  'use strict';

  angular
    .module('megaNote.notes')
    .controller('NotesController', NotesController);

  NotesController.$inject = ['noteService', 'firebaseDataService', 'user'];
  function NotesController(noteService, firebaseDataService, user) {
     var vm = this;

     vm.addNote = addNote;
     vm.newNote = new noteService.Note();
     vm.notes = noteService.notesByUser(user.uid);
     vm.deleteNote = deleteNote;
     vm.editNote = editNote;

     function addNote() {
       vm.notes.$add(vm.newNote);
       vm.newNote = new noteService.Note();
     }

     function editNote(note) {
       vm.notes.$save(note);
     }

     function deleteNote(note) {
       vm.notes.$remove(note);
     }
  }
})();
