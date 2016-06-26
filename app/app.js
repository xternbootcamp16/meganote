(function() {
  angular
    .module('meganote', [
      // Angular modules
      'ui.router',
      'ngFlash',
      'textAngular',

      // Custom modules
      'meganote.notes',
      'meganote.notesForm'
    ])
    .config(configFunction);

  configFunction.$inject = ['$urlRouterProvider'];
  function configFunction($urlRouterProvider) {
    $urlRouterProvider.otherwise('/notes/');
  }
})();
