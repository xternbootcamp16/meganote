(function() {
  'use strict';

  angular
    .module('meganote.note')
    .config(configFunction);

  configFunction.$inject = ['$stateProvider'];

  function configFunction($stateProvider) {
    $stateProvider.state('note', {
      url: '/notes',
      templateUrl: 'index.html',
      controller: 'NotesController',
      controllerAs: 'vm'
    });
  }
})();
