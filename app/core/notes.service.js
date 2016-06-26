(function() {
  angular.module('meganote.core')
    .service('NotesService', NotesService);

  NotesService.$inject = ['$http', 'SERVER_URL'];
  function NotesService($http, SERVER_URL) {
    var service = this;
    service.notes = [];

    service.getNotes = function() {
      var notesPromise = $http.get(SERVER_URL);

      notesPromise.then(function(res) {
        service.notes = res.data;
      });

      return notesPromise;
    };

    service.create = function(note) {
      var notesPromise = $http.post(SERVER_URL, {
        note: note
      });

      notesPromise.then(function(res) {
        service.notes.unshift(res.data.note);
      });

      return notesPromise;
    };

    service.update = function(note) {
      var notesPromise = $http.put(SERVER_URL + note._id, {
        note: note
      });

      notesPromise.then(function(res) {
        service.removeById(res.data.note._id);
        service.notes.unshift(res.data.note);
      });

      return notesPromise;
    };

    service.delete = function(note) {
      var notesPromise = $http.delete(SERVER_URL + note._id);

      notesPromise.then(function(res) {
        service.removeById(res.data.note._id);
      });

      return notesPromise;
    };

    service.removeById = function(id) {
      for (var i=0; i < service.notes.length; i++) {
        if (service.notes[i]._id === id) {
          return service.notes.splice(i, 1);
        }
      }
    };

    service.find = function(id) {
      for (var i=0; i < service.notes.length; i++) {
        if (service.notes[i]._id === id) {
          return angular.copy(service.notes[i]);
        }
      }
    };
  }
}());
