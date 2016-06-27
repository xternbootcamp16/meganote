(function() {
  'use strict';

  angular
    .module('megaNote.auth')
    .config(configFunction);

  configFunction.$inject = ['$stateProvider'];

  function configFunction($stateProvider) {
    $stateProvider.state(
      'register', {
        url: '/register',
        templateUrl: 'auth/register.html',
        controller: 'AuthController',
        controllerAs: 'vm'
    });
    $stateProvider.state(
      'login', {
        url: '/login',
        templateUrl: 'auth/login.html',
        controller: 'AuthController',
        controllerAs: 'vm'
    });
  }
})();
