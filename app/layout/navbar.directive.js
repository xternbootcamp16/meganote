(function() {
  'use strict';

  angular
    .module('megaNote.layout')
    .directive('crNav', crNav);

  function crNav() {
    return {
      templateUrl: 'layout/navbar.html',
      restrict: 'E',
      controller: NavBarController,
      controllerAs: 'vm',
      scope: {},
    };
  }

  NavBarController.$inject = ['$state', 'authService'];
  function NavBarController($state, authService) {
    var vm = this;
    vm.isLoggedIn = authService.isLoggedIn;
    vm.logout = logout;

    function logout() {
      authService.logout();
      $state.go('home');
    }
  }
})();
