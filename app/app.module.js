{
  angular.module('meganote', [
    'ui.router',
    'ngFlash',
    'textAngular',
    'meganote.notes',
    'meganote.notesForm',
    'meganote.signUp',
    'meganote.signIn',
    'meganote.users'
  ])
    .config(config)
    .run(run);

  config.$inject = ['$urlRouterProvider'];
  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/notes/');
  }

  run.$inject = ['$rootScope', '$state'];
  function run($rootScope, $state) {
    $rootScope.$on('$stateChangeSuccess', () => {
      $rootScope.$state = $state;
    });
  }
}
