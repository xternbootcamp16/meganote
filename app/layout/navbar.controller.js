(function(){
  'use strict';

  angular
    .module('meganote.layout')
    .controller('NavbarController', NavbarController);

  NavbarController.$inject = ['$state'];

  function NavbarController($state) {
    $state.go('navbar');
  }

})();

// In this file we define a new controller for Navbar and attach it to layout module
