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
    .config(config);

  config.$inject = ['$urlRouterProvider'];
  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/notes/');
  }
})();
