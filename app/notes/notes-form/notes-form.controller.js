{
  angular.module('meganote.notesForm')
    .controller('NotesFormController', NotesFormController);

  NotesFormController.$inject = ['$state', 'Flash', 'Note'];
  function NotesFormController($state, Flash, Note) {
    const vm = this;
    vm.note = get();
    vm.clearForm = clearForm;
    vm.save = save;
    vm.destroy = destroy;

    /////////////////

    function get() {
      if ($state.params.noteId) {
        return Note.get({ id: $state.params.noteId });
      }
      return new Note();
    }

    function clearForm() {
      vm.note = { title: '', body_html: '' };
    }

    function save() {
      // if (vm.note._id) {
      //   NotesService.update(vm.note)
      //     .then(
      //       res => {
      //         vm.note = angular.copy(res.data);
      //         Flash.create('success', 'Saved!');
      //       },
      //       () => Flash.create('danger', 'Oops! Something went wrong.')
      //     );
      // }
      // else {
      //   NotesService.create(vm.note)
      //     .then(
      //       res => {
      //         vm.note = res.data;
      //         Flash.create('success', 'Saved!');
      //         $state.go('notes.form', { noteId: vm.note._id });
      //       },
      //       () => Flash.create('danger', 'Oops! Something went wrong.')
      //     );
      // }
    }

    function destroy() {
      // NotesService.destroy(vm.note)
      //   .then(() => $state.go('notes.form', { noteId: undefined }));
    }
  }
}
