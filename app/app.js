(function() {
  'use strict';
  
  angular.module('meganote', [
    //Angular modules
    'ui.router',
    
    //3rd Party modules
    'ngFlash',
    'textAngular',
    
    //Main modules
    'meganote.notes'
  ]);

  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/notes/');
  }

  config.$inject = ['$urlRouterProvider'];
  app.config(config);
})();
