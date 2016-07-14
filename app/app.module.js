{
  angular.module('meganote', [
    'ui.router',
    'ngFlash',
    'textAngular',
    'ng.httpLoader',
    'meganote.notes',
    'meganote.notesForm',
    'meganote.signUp',
    'meganote.signIn',
    'meganote.users'
  ])
    .config(config)
    .run(run);

  config.$inject = ['$urlRouterProvider', 'httpMethodInterceptorProvider'];
  function config($urlRouterProvider, httpMethodInterceptorProvider) {
    $urlRouterProvider.otherwise('/notes/');
    httpMethodInterceptorProvider.whitelistDomain('localhost');
  }

  run.$inject = ['$rootScope', '$state'];
  function run($rootScope, $state) {
    $rootScope.$on('$stateChangeSuccess', () => {
      $rootScope.$state = $state;
    });

    $rootScope.$on('$stateChangeError', () => {
      $state.go('sign-in');
    });
  }
}
