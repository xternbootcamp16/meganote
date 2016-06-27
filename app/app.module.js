(function() {
  'use strict';

  angular.module('megaNote', [
    'ui.router',
    'firebase',
    'megaNote.home',
    'megaNote.notes',
    'megaNote.auth',
    'megaNote.core',
    'megaNote.layout'
  ])
  .config(configFunction)
  .run(runFunction);

  configFunction.$inject = ['$urlRouterProvider'];

  function configFunction($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  }

  runFunction.$inject = ['$rootScope', '$state'];
  function runFunction($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      if (error === "AUTH_REQUIRED") {
        $state.go('login');
      }
    });
  }
})();
