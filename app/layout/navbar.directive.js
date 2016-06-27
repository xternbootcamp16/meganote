(function(){
  'use strict';

  angular
    .module('meganote.layout')
    .directive('xtNavbar', xtNavbar);

  function xtNavbar() {
    return {
      templateUrl: 'app/layout/navbar.html',
      restrict: 'E',                         // To be used as an element tag
      controller: 'NavbarController',
      controllerAs: 'vm',
      scope: {}
    };
  }
})();

// In this file, we define a new directive and attach it to the layout module
