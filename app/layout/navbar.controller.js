(function(){
  'use strict';

  angular
    .module('meganote.layout')
    .controller('NavbarController', NavbarController);

  NavbarController.$inject = ['$state'];

  function NavbarController($state) {
    $state.go('index');
  }

})();
