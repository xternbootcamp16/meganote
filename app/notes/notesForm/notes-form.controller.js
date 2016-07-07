{
  angular.module('meganote.notesForm')
    .controller('NotesFormController', NotesFormController);

  NotesFormController.$inject = ['$state', 'flashService', 'NotesService'];
  function NotesFormController($state, flashService, NotesService) {
    let vm = this;
    vm.clearForm = clearForm;
    vm.save = save;
    vm.delete = deleteNote;
    vm.note = NotesService.find($state.params.noteId);
    /////////////////////////////FUNCTIONS BELOW/////////////////

    function clearForm() {
      vm.note = { title: '', body_html: '' };
    }

    function save () {
      if (vm.note._id) {
        NotesService.update(vm.note)
            .then(
              function(res) {
                vm.note = res.data.note;
                flashService.success(res.data.message);//Flash.create('success', res.data.message);
              },
              function() {
                flashService.failure();//Flash.create('danger', 'Oops! Something went wrong.');
              });
      }
      else {
        NotesService.create(vm.note)
            .then(
              function(res) {
                vm.note = res.data.note;
                flashService.success(res.data.message);//Flash.create('success', res.data.message); //MIGRATE FLASH STUFF TO SERVICE
              },
              function() {
                flashService.failure();//  Flash.create('danger', 'Oops! Something went wrong.');
              });
      }
    }

    function deleteNote() {
      NotesService.delete(vm.note)
        .then(function() {
          vm.clearForm();
        });
    }
  }
}
