(function() {
  var app = angular.module('meganote', [
    'ui.router'
  ]);

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/notes');

    $stateProvider

      .state('notes', {
        url: '/notes',
        template: '<h1>Meganote</h1><p>{{ message }}</p>',
        controller: function($scope) {
          $scope.message = "Welcome to Meganote!";
        }
      });
  }

  config.$inject = ['$stateProvider', '$urlRouterProvider'];
  app.config(config);
})();
