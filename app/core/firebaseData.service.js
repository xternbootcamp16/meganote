(function() {
  'use strict';

  angular
    .module('meganote.core')
    .factory('firebaseDataService', firebaseDataService);

  function firebaseDataService() {
    var root = firebase.database().ref();          // Get the root of the the database

    // Create you nodes (tables) here
    var service = {
      root: root,
      titles: root.child('titles'),
      bodies: root.child('bodies'),
      notes: root.child('notes')
    };

    return service;
  }
})();

// In this file, we define the service for firebase and attache it to the core module.
