(function() {
  angular.module('meganote.notes')
    .controller('NotesFormController', NotesFormController);

  NotesFormController.$inject = ['$state', '$scope', 'flashService', 'NotesService'];
  function NotesFormController($state, $scope, flashService, NotesService) {
    var vm = this;
    vm.clearForm = clearForm;
    vm.save = save;
    vm.delete = deleteNote;
    $scope.note = NotesService.find($state.params.noteId);
    /////////////////////////////FUNCTIONS BELOW/////////////////

    function clearForm() {
      $scope.note = { title: '', body_html: '' };
    }

    function save () {
      if ($scope.note._id) {
        NotesService.update($scope.note)
            .then(
              function(res) {
                $scope.note = res.data.note;
                flashService.success(res.data.message);//Flash.create('success', res.data.message);
              },
              function() {
                flashService.failure();//Flash.create('danger', 'Oops! Something went wrong.');
              });
      }
      else {
        NotesService.create($scope.note)
            .then(
              function(res) {
                $scope.note = res.data.note;
                flashService.success(res.data.message);//Flash.create('success', res.data.message); //MIGRATE FLASH STUFF TO SERVICE
              },
              function() {
                flashService.failure();//  Flash.create('danger', 'Oops! Something went wrong.');
              });
      }
    }

    function deleteNote() {
      NotesService.delete($scope.note)
        .then(function() {
          $scope.clearForm();
        });
    }
  }
}());
