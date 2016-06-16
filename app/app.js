(function() {
  var app = angular.module('meganote', [
    'ui.router',
    'ngFlash',
    'meganote.notes'
  ]);

  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/notes/');
  }

  config.$inject = ['$urlRouterProvider'];
  app.config(config);
})();
