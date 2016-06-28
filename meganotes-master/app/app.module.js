(function() {
  var app = angular.module('meganote', [
    'ui.router',
    'ngFlash',
    'textAngular',
    'meganote.notes'
  ]);

  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/notes/');
  }

  config.$inject = ['$urlRouterProvider'];
  app.config(config);
})();
