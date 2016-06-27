(function() {
  angular.module('meganote.notes')
    .service('NotesService', NotesService);

  NotesService.$inject = ['$http', 'DATABASE_URL'];
  function NotesService($http, DATABASE_URL) {
    var service = this;
    service.notes = [];

    service.getNotes = function() {
      var notesPromise = $http.get(DATABASE_URL);

      notesPromise.then(function(res) {
        service.notes = res.data;
      });

      return notesPromise;
    };

    service.create = function(note) {
      var notesPromise = $http.post(DATABASE_URL, {
        note: note
      });

      notesPromise.then(function(res) {
        service.notes.unshift(res.data.note);
      });

      return notesPromise;
    };

    service.update = function(note) {
      var notesPromise = $http.put(DATABASE_URL + note._id, {
        note: note
      });

      notesPromise.then(function(res) {
        service.removeById(res.data.note._id);
        service.notes.unshift(res.data.note);
      });

      return notesPromise;
    };

    service.delete = function(note) {
      var notesPromise = $http.delete(DATABASE_URL + note._id);

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
