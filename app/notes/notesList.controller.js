(function() {
  'use strict';

  angular
    .module('meganote.notesList')
    .controller('NotesListController', NotesListController);

  NotesListController.$inject=['$http', ];

  function NotesListController($http,) {
    var vm = this;
    vm.notes = [];

    vm.getNotes = getNotes;
    vm.addNote = addNote;


    function getNotes() {
      var notesPromise = $http.get(LocalHost);
      notesPromise.then(function(res)) {
        vm.notes = res.data;
      });
    };

    function addNote() {
      vm.notes.$add(vm.newNote);
      vm.newNote =
    }
  }
})();
