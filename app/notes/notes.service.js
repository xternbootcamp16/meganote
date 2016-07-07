(function() {
  angular.module('meganote.notes')
    .factory('NotesService', NotesService);

  NotesService.$inject = ['$http', 'noteConstants'];
  function NotesService($http, noteConstants) {
  //  let notes = [];
    const service = {
      getNotes: getNotes,
      create: create,
      update : update,
      delete : deleteNote,
      removeById:  removeById,
      find :find,
      notes : [],
    };
/////////////////////////////////////////////////
    function getNotes() {
      const notesPromise = $http.get(noteConstants.apiUrl);

      notesPromise.then(function(res) {
        service.notes = res.data;
      });

      return notesPromise;
    }

    function create(note) {
      const notesPromise = $http.post(noteConstants.apiUrl, {
        note: note
      });

      notesPromise.then(function(res) {
        service.notes.unshift(res.data.note);
      });

      return notesPromise;
    }

    function update(note) {
      const notesPromise = $http.put(noteConstants.apiUrl + note._id, {
        note: note
      });

      notesPromise.then(function(res) {
        service.removeById(res.data.note._id);
        service.notes.unshift(res.data.note);
      });

      return notesPromise;
    }

    function deleteNote(note) {
      const notesPromise = $http.delete(noteConstants.apiUrl + note._id);

      notesPromise.then(function(res) {
        service.removeById(res.data.note._id);
      });

      return notesPromise;
    }

    function removeById(id) {
      for (let i=0; i < service.notes.length; i++) {
        if (service.notes[i]._id === id) {
          return service.notes.splice(i, 1);
        }
      }
    }

    function find(id) {
      for (let i=0; i < service.notes.length; i++) {
        if (service.notes[i]._id === id) {
          return angular.copy(service.notes[i]);
        }
      }
    }
  }
}());
