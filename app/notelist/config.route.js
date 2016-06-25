(function() {
  'use strict';

  angular
    .module('meganote.noteList')
    .config(configFunction);

  configFunction.$inject = ['$stateProvider'];

  function configFunction($stateProvider) {
    $stateProvider.state('noteList', {
      url: '/mutantlist',
      templateUrl: 'index.html',
      controller: 'noteListController',
      controllerAs: 'vm'
    });
  }
})();
