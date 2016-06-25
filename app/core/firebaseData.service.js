(function() {
  'use strict';

  angular
    .module('meganote.core')
    .factory('firebaseDataService', firebaseDataService);

  function firebaseDataService() {
    var root = firebase.database().ref();

    var service = {
      root: root,
      notes: root.child('notes')
    };

    return service;
  }
})();
