(function(){
  'use strict';

  angular
    .module('meganote.layout')
    .controller('NotesformController', NotesformController);

  NotesformController.$inject = ['$state', '$scope', 'Flash', 'NotesService'];

  function NotesformController($state, $scope, Flash, NotesService) {
    var vm = $scope;
    vm.note = note
    note = NotesService.find($state.params.noteId);
    vm.clearForm = clearForm;
    vm.save = save;
    vm.delete = delete;

    function clearForm() {
      note = { title: '', body_html: '' };
    };

    function save() {
      if (note._id) {
        NotesService.update(note)
          .then(
            function(res) {
              note = res.data.note;
              Flash.create('success', res.data.message);
            },
            function() {
              Flash.create('danger', 'Oops! Something went wrong.');
            });
      }
      else {
        NotesService.create(note)
          .then(
            function(res) {
              note = res.data.note;
              Flash.create('success', res.data.message);
            },
            function() {
              Flash.create('danger', 'Oops! Something went wrong.');
            });
      }
    };

    function delete() {
      NotesService.delete(note)
        .then(function() {
          vm.clearForm();
        });
    };
  }
}());

// In this file we define a new controller for notes-form and attach it to the layout module
