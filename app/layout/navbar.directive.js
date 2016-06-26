(function() {
  'use strict';

  angular
    .module('meganote.layout')
    .directive('xtNav', xtNav);

  function xtNav() {
    return {
      templateUrl: 'app/layout/.html',
      restrict: 'E',
      controller: NavbarController,
      controllerAs: 'vm',
      scope: {},
    };
  }


})();
