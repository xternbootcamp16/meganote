(function() {
  'use strict';

  angular
    .module('megaNote.core')
    .factory('noteService', noteService);

  noteService.$inject = ['$firebaseArray', 'firebaseDataService'];

  function noteService($firebaseArray, firebaseDataService) {
    var service = {
      Note: Note,
      notesByUser: notesByUser,
    };

    return service;

    /*--------------------------------------------------------------*/

    function Note() {
      this.title = '';
      this.body_text = '';
    }

    function notesByUser(uid) {
      return $firebaseArray(firebaseDataService.users.child(uid).child('notes'));
    }
  }
})();
