{
  angular.module('meganote.notesForm')
    .controller('NotesFormController', NotesFormController);

  NotesFormController.$inject = ['$state', 'Flash', 'NotesService'];
  function NotesFormController($state, Flash, NotesService) {
    const vm = this;
    vm.note = NotesService.find($state.params.noteId);
    vm.clearForm = clearForm;
    vm.save = save;
    vm.destroy = destroy;

    /////////////////

    function clearForm() {
      vm.note = { title: '', body_html: '' };
    }

    function save() {
      if (vm.note._id) {
        NotesService.update(vm.note)
          .then(
            res => {
              vm.note = angular.copy(res.data.note);
              Flash.create('success', res.data.message);
            },
            () => Flash.create('danger', 'Oops! Something went wrong.')
          );
      }
      else {
        NotesService.create(vm.note)
          .then(
            res => {
              vm.note = res.data.note;
              Flash.create('success', res.data.message);
              $state.go('notes.form', { noteId: vm.note._id });
            },
            () => Flash.create('danger', 'Oops! Something went wrong.')
          );
      }
    }

    function destroy() {
      NotesService.destroy(vm.note)
        .then(
          () => vm.clearForm()
        );
    }
  }
}
