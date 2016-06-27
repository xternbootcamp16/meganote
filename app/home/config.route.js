(function() {
  'use strict';

  angular
    .module('megaNote.home')
    .config(configFunction);

  configFunction.$inject = ['$stateProvider'];
  function configFunction($stateProvider) {
    $stateProvider.state(
      'home', {
        url: '/',
        templateUrl: 'home/home.html'
      }
    );
  }
})();
