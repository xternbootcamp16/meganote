(function() {
  'use strict';

  angular
    .module('meganote.core')
    .factory('noteService', noteService); // Define a new service - pass service name and then the service function

  // Inject your dependicices using $inject
  noteService.$inject = ['$firebaseArray', 'firebaseDataService']; // Only AngularJS services start with $.

  function noteService($firebaseArray, firebaseDataService) {
    var service = {
      newNote: newNote,
      notes: notes
    };

    return service;

    ///////////////

    function newNote() {
      this.title = '';
      this.body = '';
    }

    function notes(){
      return $firebaseArray(firebaseDataService.notes);
    }
  }
})();
