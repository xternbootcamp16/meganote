(function() {
  'use strict';

  angular.module('meganote.notes')
    .service('NotesService', NotesService);

  NotesService.$inject = ['$http'];
  function NotesService($http) {
    var service = this;
    service.getNotes = getNotes;
    service.create = create;
    service.update = update;
    service.delete = deleteService;
    service.removeById = removeById;
    service.find = find;
    service.notes = [];

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

    function deleteService(note) {
      var notesPromise = $http.delete('http://localhost:3030/' + note._id);
      notesPromise.then(function(res) {
        service.removeById(res.data.note._id);
      });
      return notesPromise;
    }

    function removeById(id){
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
