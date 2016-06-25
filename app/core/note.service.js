(function() {
  'use strict';

  angular
    .module('meganote.core')
    .factory('noteService', noteService);

  noteService.$inject = ['$firebaseArray', 'firebaseDataService'];

  function noteService() {
    var service = {
      note: note
    };

    return service;

    ///////////////

    function note() {
      this.title = '';
      this.body = '';
    }
  }
})();
