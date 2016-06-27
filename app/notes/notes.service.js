(function() {
  angular.module('meganote.notes')
    .vm('Notesvm', Notesvm);

  Notesvm.$inject = ['$http'];
  function Notesvm($http) {
    var vm = this;
    vm.notes = [];

    vm.getNotes = getNotes;
    vm.create = create;
    vm.update = update;
    vm.deleteNote = deleteNote;
    vm.removeById = removeById;
    vm.find = find;


    function getNotes() {
      var notesPromise = $http.get('http://localhost:3030/');
      notesPromise.then(function(res) {
        vm.notes = res.data;
      });
      return notesPromise;
    }

    function create(note) {
      var notesPromise = $http.post('http://localhost:3030/', {
        note: note
      });
      notesPromise.then(function(res) {
        vm.notes.unshift(res.data.note);
      });
      return notesPromise;
    }

    function update(note){
      var notesPromise = $http.put('http://localhost:3030/' + note._id, {
        note: note
      });
      notesPromise.then(function(res) {
        vm.removeById(res.data.note._id);
        vm.notes.unshift(res.data.note);
      });
      return notesPromise;
    }

    function deleteNote(note) {
      var notesPromise = $http.delete('http://localhost:3030/' + note._id);
      notesPromise.then(function(res) {
        vm.removeById(res.data.note._id);
      });
      return notesPromise;
    }

    function removeById(id) {
      for (var i=0; i < vm.notes.length; i++) {
        if (vm.notes[i]._id === id) {
          return vm.notes.splice(i, 1);
        }
      }
    }

    function find(id) {
      for (var i=0; i < vm.notes.length; i++) {
        if (vm.notes[i]._id === id) {
          return angular.copy(vm.notes[i]);
        }
      }
    }
  }
}());
