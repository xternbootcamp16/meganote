(function() {
  'use strict';

  angular
    .module('meganote', [
      // Angular modules
      'ui.router',

      // Third-party modules
      'ngFlash',
      'textAngular',

      // Custom modules
      'meganote.notes',
      'meganote.notesForm',
      'meganote.layout'
    ])
    .config(configFunction);

  configFunction.$inject = ['$urlRouterProvider'];
  function configFunction($urlRouterProvider) {
    $urlRouterProvider.otherwise('/notes/');
  }
})();
