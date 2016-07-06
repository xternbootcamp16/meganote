(function() {
  angular.module('meganote', [
    'ui.router',
    'ngFlash',
    'textAngular',
    'meganote.noteConst'
  ]).config(config);

  config.$inject = ['$urlRouterProvider'];
  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/notes/');
  }


})();
