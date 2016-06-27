(function() {
  'use strict';

  angular
    .module('megaNote.core')
    .factory('firebaseDataService', firebaseDataService);

  function firebaseDataService() {
    var root = firebase.database().ref();

    var service = {
      root: root,
      users: root.child('users'),
    };
    return service;
  }
})();
