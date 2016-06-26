(function() {
  'use strict';

  angular
    .module('meganote.notesForm')
    .controller('NotesFormController', NotesFormController);

  NotesFormController.$inject = ['$state', 'Flash', 'NotesService'];
  function NotesFormController($state, Flash, NotesService) {
    var vm = this;

    vm.note = NotesService.find($state.params.noteId);

    vm.clearForm = function() {
      vm.note = { title: '', body_html: '' };
    };

    vm.save = function() {
      if (vm.note._id) {
        NotesService.update(vm.note)
          .then(
            function(res) {
              vm.note = res.data.note;
              Flash.create('success', res.data.message);
            },
            function() {
              Flash.create('danger', 'Oops! Something went wrong.');
            });
      }
      else {
        NotesService.create(vm.note)
          .then(
            function(res) {
              vm.note = res.data.note;
              Flash.create('success', res.data.message);
            },
            function() {
              Flash.create('danger', 'Oops! Something went wrong.');
            });
      }
    };

    vm.delete = function() {
      NotesService.delete(vm.note)
        .then(function() {
          vm.clearForm();
        });
    };
  }
})();
