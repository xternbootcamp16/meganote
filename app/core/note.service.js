(function() {
  'use strict';

  angular
    .module('meganote.core')
    .factory('noteService', noteService); // Define a new service - pass service name and then the service function

  // Inject your dependicices using $inject
  noteService.$inject = ['$firebaseArray', '$http', 'firebaseDataService']; // Only AngularJS services start with $.
  function noteService($firebaseArray, $http, firebaseDataService) {
    var service = {
      newNote: newNote,
      notes: notes,
      getNotes: getNotes,
      create: create,
      update: update,
      removeById: removeById,
      find: find,
      delete: delete
    };

    return service;

    ///////////////


    function getNotes() {
      var notesPromise = $http.get('http://localhost:3030/');

      notesPromise.then(function(res) {
        service.notes = res.data;
      });

      return notesPromise;
    }

    function create(note) {
      var notesPromise = $http.post('http://localhost:3030/', {
        note: note
      });

      notesPromise.then(function(res) {
        service.notes.unshift(res.data.note);
      });

      return notesPromise;
    }

    function update(note) {
      var notesPromise = $http.put('http://localhost:3030/' + note._id, {
        note: note
      });

      notesPromise.then(function(res) {
        service.removeById(res.data.note._id);
        service.notes.unshift(res.data.note);
      });

      return notesPromise;
    }

    function delete(note) {
      var notesPromise = $http.delete('http://localhost:3030/' + note._id);

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

    function newNote() {
      this.title = '';
      this.body = '';
    }

    function notes(){
      return $firebaseArray(firebaseDataService.notes);
    }

  }
})();










// In this file, we defing a new service for notes and attach it to the core module "meganote.core"
