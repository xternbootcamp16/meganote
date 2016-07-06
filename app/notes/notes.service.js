(function() {
  'use strict';
  angular.module('meganote.notes')
    .factory('NotesService', NotesService);

  NotesService.$inject = ['$http', 'API_BASE'];
  function NotesService($http, API_BASE) {
    var service = {
      notes: [],
      getNotes: getNotes,
      create: create,
      update: update,
      destroy: destroy,
      removeById: removeById,
      find: find,
    };

    return service;

    //////////////////////

    function getNotes() {
      var notesPromise = $http.get(API_BASE);

      notesPromise.then(function(res) {
        service.notes = res.data;
      });

      return notesPromise;
    }

    function create(note) {
      var notesPromise = $http.post(API_BASE, {
        note: note
      });

      notesPromise.then(function(res) {
        service.notes.unshift(res.data.note);
      });

      return notesPromise;
    }

    function update(note) {
      var notesPromise = $http.put(API_BASE + note._id, {
        note: note
      });

      notesPromise.then(function(res) {
        service.removeById(res.data.note._id);
        service.notes.unshift(res.data.note);
      });

      return notesPromise;
    }

    function destroy(note) {
      var notesPromise = $http.delete(API_BASE + note._id);

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
})();
