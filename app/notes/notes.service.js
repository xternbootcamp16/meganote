(function() {
  angular
    .module('meganote.notes')
    .service('NotesService', NotesService);

  NotesService.$inject = ['$http'];
  function NotesService($http) {
    var vm = this;
    vm.notes = [];
    vm.create = create;
    vm.delete = delete(notes);
    vm.getNotes = getNotes;
    vm.update = update;
    vm.find = find;
    vm.removeById = removeById;


    function getNotes () {
      var notesPromise = $http.get('LocalHost');

      notesPromise.then(function(res) {
        vm.notes = res.data;
      });
      return notesPromise;
    };

    function create(note) {
      var notesPromise = $http.post('LocalHost', {
        note: note
      });

      notesPromise.then(function(res) {
        vm.notes.unshift(res.data.note);
      });

      return notesPromise;
    };

    function update(note) {
      var notesPromise = $http.put('LocalHost' + note._id, {
        note: note
      });

      notesPromise.then(function(res) {
        vm.removeById(res.data.note._id);
        vm.notes.unshift(res.data.note);
      });

      return notesPromise;
    };

    function delete(note) {
      var notesPromise = $http.delete('LocalHost' + note._id);

      notesPromise.then(function(res) {
        vm.removeById(res.data.note._id);
      });
      return notesPromise;
    };

    function removeById(id) {
      for (var i=0; i < vm.notes.length; i++) {
        if (vm.notes[i]._id === id) {
          return vm.notes.splice(i, 1);
        }
      }
    };

    function find(id) {
      for (var i=0; i < vm.notes.length; i++) {
        if (vm.notes[i]._id === id) {
          return angular.copy(vm.notes[i]);
        }
      }
    };
  }
}());
