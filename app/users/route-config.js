{
  angular.module('meganote.users')
    .config(usersConfig);

  usersConfig.$inject = ['$stateProvider'];
  function usersConfig($stateProvider) {
    $stateProvider

      .state('sign-up', {
        url: '/sign-up',
        template: '<sign-up></sign-up>',
      })

      .state('user-profile', {
        url: '/profile',
        template: '<user-profile></user-profile>',
      });
  }
}
