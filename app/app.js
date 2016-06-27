(function() {
  angular
    .module('meganote', [
      'ui.router',
      'ngFlash',
      'textAngular',
      'meganote.notes'
    ])
    .config(configFunction);

  configFunction.$inject = ['$urlRouterProvider'];
  function configFunction($urlRouterProvider) {
    $urlRouterProvider.otherwise('/notes/');
  }
})();
