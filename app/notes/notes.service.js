(function() {
  angular.module('meganote.notes')
    .service('Notesservice', Notesservice);

  Notesservice.$inject = ['$http', 'URL'];
  function Notesservice($http) {
    var service = this;
    service.notes = [];

    service.getNotes = getNotes;
    service.create = create;
    service.update = update;
    service.deleteNote = deleteNote;
    service.removeById = removeById;
    service.find = find;


    function getNotes() {
      var notesPromise = $http.get(URL);
      notesPromise.then(function(res) {
        service.notes = res.data;
      });
      return notesPromise;
    }

    function create(note) {
      var notesPromise = $http.post(URL, {
        note: note
      });
      notesPromise.then(function(res) {
        service.notes.unshift(res.data.note);
      });
      return notesPromise;
    }

    function update(note){
      var notesPromise = $http.put(URL + note._id, {
        note: note
      });
      notesPromise.then(function(res) {
        service.removeById(res.data.note._id);
        service.notes.unshift(res.data.note);
      });
      return notesPromise;
    }

    function deleteNote(note) {
      var notesPromise = $http.delete(URL + note._id);
      notesPromise.then(function(res) {
        service.removeById(res.data.note._id);
      });
      return notesPromise;
    }

    function removeById(id) {
      for (var i=0; i < service.notes.length; i++) {
        if (service.notes[i]._id === id) {
          return service.notes.splice(i, 1);
        }
      }
    }

    function find(id) {
      for (var i=0; i < service.notes.length; i++) {
        if (service.notes[i]._id === id) {
          return angular.copy(service.notes[i]);
        }
      }
    }
  }
}());
