(function() {
  'use strict';
    
  angular.module('meganote.form')
    .controller('NotesFormController', NotesFormController);

  NotesFormController.$inject = ['$state', '$scope', 'Flash', 'NotesService'];

  function NotesFormController($state, $scope, Flash, NotesService) {
    var vm = $scope;
    vm.note = NotesService.find($state.params.noteId);

    vm.clearForm = clearForm;
    vm.save = save;
    vm.remove = remove;

    function clearForm() {
      vm.note = { title: '', body_html: '' };
    }

    function save() {
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
    }

    function remove() {
      NotesService.delete(vm.note)
        .then(function() {
          vm.clearForm();
        });
    }
  }
}());
